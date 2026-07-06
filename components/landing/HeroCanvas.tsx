'use client';
import React, { useEffect, useRef } from 'react';
import type { Vector3, Mesh, Material } from 'three';

export default function HeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let animId: number;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const THREE = await import('three');
      const { gsap } = await import('gsap');

      if (disposed || !root) return;

      const W = root.clientWidth || 600;
      const H = root.clientHeight || 400;

      // Transparent renderer — card's light bg shows through
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      root.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, 12);

      const group = new THREE.Group();
      scene.add(group);

      // — Node positions —
      const NODE_COUNT = 75;
      const LEADER_INDICES = [2, 5, 9, 15, 22, 30, 42, 58];
      const leaderSet = new Set(LEADER_INDICES);
      const positions: Vector3[] = [];

      // Seed with deterministic-ish positions so layout looks intentional
      for (let i = 0; i < NODE_COUNT; i++) {
        const theta = (i / NODE_COUNT) * Math.PI * 2 + Math.sin(i * 1.618) * 2;
        const phi = Math.acos(Math.cos(i * 0.9) * 0.85);
        const r = 2.8 + Math.abs(Math.sin(i * 0.4)) * 1.6;
        positions.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta) * 1.3,
          r * Math.sin(phi) * Math.sin(theta) * 0.48,
          r * Math.cos(phi) * 0.35
        ));
      }

      // — Regular node point cloud —
      const ptPos = new Float32Array(NODE_COUNT * 3);
      positions.forEach((p, i) => { ptPos[i*3]=p.x; ptPos[i*3+1]=p.y; ptPos[i*3+2]=p.z; });
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
      const ptMat = new THREE.PointsMaterial({
        color: 0x312e81, size: 0.07, transparent: true, opacity: 0.88, sizeAttenuation: true,
      });
      group.add(new THREE.Points(ptGeo, ptMat));

      // — Leader nodes (blue spheres + glow rings) —
      const leaderMeshes: Mesh[] = [];
      LEADER_INDICES.forEach(idx => {
        if (idx >= positions.length) return;

        const geo = new THREE.SphereGeometry(0.115, 12, 12);
        const mat = new THREE.MeshBasicMaterial({ color: 0x4B4DF7 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(positions[idx]);
        group.add(mesh);
        leaderMeshes.push(mesh);

        // Outer glow ring
        const ringGeo = new THREE.RingGeometry(0.17, 0.26, 28);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x4B4DF7, transparent: true, opacity: 0.20, side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(positions[idx]);
        group.add(ring);
      });

      // — Connections —
      const THRESHOLD = 2.7;
      const orangePts: number[] = [];
      const bluePts: number[] = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const d = positions[i].distanceTo(positions[j]);
          if (d < THRESHOLD) {
            const hasLeader = leaderSet.has(i) || leaderSet.has(j);
            const list = hasLeader && Math.sin(i * j) > 0.2 ? orangePts : bluePts;
            list.push(
              positions[i].x, positions[i].y, positions[i].z,
              positions[j].x, positions[j].y, positions[j].z
            );
          }
        }
      }

      const addLines = (pts: number[], hex: number, opacity: number) => {
        if (!pts.length) return;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        group.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity })));
      };
      addLines(orangePts, 0xF2682E, 0.40);
      addLines(bluePts, 0x818cf8, 0.18);

      // — Mouse parallax —
      let mx = 0, my = 0, tmx = 0, tmy = 0;
      const onMove = (e: MouseEvent) => {
        const rect = root.getBoundingClientRect();
        tmx = ((e.clientX - rect.left) / (rect.width || 1) - 0.5) * 2;
        tmy = -((e.clientY - rect.top) / (rect.height || 1) - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMove);

      // — Resize —
      const onResize = () => {
        if (disposed) return;
        const nW = root.clientWidth, nH = root.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(root);

      // — Animation loop —
      let t = 0;
      const tick = () => {
        if (disposed) return;
        animId = requestAnimationFrame(tick);
        t += 0.003;
        mx += (tmx - mx) * 0.03;
        my += (tmy - my) * 0.03;

        group.rotation.y = t * 0.09 + mx * 0.28;
        group.rotation.x = Math.sin(t * 0.06) * 0.05 + my * 0.12;

        leaderMeshes.forEach((mesh, i) => {
          const s = 1 + Math.sin(t * 1.6 + i * 0.85) * 0.11;
          mesh.scale.setScalar(s);
        });

        renderer.render(scene, camera);
      };
      tick();

      // Fade in
      gsap.fromTo(renderer.domElement,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, delay: 0.7, ease: 'power2.out' }
      );

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMove);
        ro.disconnect();
        scene.traverse(obj => {
          const o = obj as Mesh;
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            const m = o.material as Material | Material[];
            Array.isArray(m) ? m.forEach(x => x.dispose()) : m.dispose();
          }
        });
        renderer.dispose();
        try { root.removeChild(renderer.domElement); } catch {}
      };
    };

    run();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={rootRef} className="absolute inset-0" />;
}
