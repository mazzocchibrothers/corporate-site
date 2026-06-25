// @ts-nocheck
'use client';
import React, { useEffect, useRef } from 'react';

export default function ScienceHeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let animId = 0;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const THREE = await import('three');
      const { gsap } = await import('gsap');
      if (disposed || !root) return;

      /* ── REDUCED MOTION + QUALITY ─────────────────────────────── */
      const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = root.clientWidth < 860;
      const Q = isMobile
        ? { points: 1100, curveSeg: 120 }
        : { points: 3000, curveSeg: 190 };

      const COL = {
        peri:  new THREE.Color('#7376ff'),
        peach: new THREE.Color('#ff8766'),
      };

      /* ── DISTRIBUTION CONSTANTS ───────────────────────────────── */
      const SIGMA_MAX = 3.4;
      const SX       = 0.92;
      const NORM     = 1 / Math.sqrt(2 * Math.PI);
      const SY       = 2.05 / NORM;
      const PEAK     = NORM * SY;
      const Y_BASE   = -PEAK / 2;
      const DEPTH    = 0.55;
      const X_MAX    = SIGMA_MAX * SX;
      const pdf      = (s) => Math.exp(-s * s / 2) * NORM;
      const curveY   = (s) => pdf(s) * SY;
      const wX       = (s) => s * SX;

      /* ── RENDERER / SCENE / CAMERA ────────────────────────────── */
      const W = root.clientWidth  || 800;
      const H = root.clientHeight || 600;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      Object.assign(renderer.domElement.style, {
        position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block',
      });
      root.appendChild(renderer.domElement);

      const scene  = new THREE.Scene();
      const CAM_Z  = 8.0;
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, CAM_Z);

      const stage = new THREE.Group();  // responsive placement + parallax
      const field = new THREE.Group();  // distribution field (slight tilt)
      stage.add(field);
      scene.add(stage);

      /* ── GLOW SPRITE TEXTURE ──────────────────────────────────── */
      function makeGlow() {
        const s = 64;
        const cv = document.createElement('canvas');
        cv.width = cv.height = s;
        const ctx = cv.getContext('2d');
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0,    'rgba(255,255,255,1)');
        g.addColorStop(0.28, 'rgba(255,255,255,0.55)');
        g.addColorStop(1,    'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
        const t = new THREE.CanvasTexture(cv);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
      }
      const GLOW = makeGlow();

      /* Box-Muller normal sample, clamped to ±SIGMA_MAX */
      function gauss() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        const s = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        return THREE.MathUtils.clamp(s, -SIGMA_MAX, SIGMA_MAX);
      }

      /* ── DATA-POINT CLOUD ─────────────────────────────────────── */
      const N      = Q.points;
      const pos    = new Float32Array(N * 3);
      const start  = new Float32Array(N * 3);
      const aColor = new Float32Array(N * 3);
      const aPhase = new Float32Array(N);
      const aScale = new Float32Array(N);
      const aDelay = new Float32Array(N);

      for (let i = 0; i < N; i++) {
        const s  = gauss();
        const fx = wX(s);
        const fy = Y_BASE + Math.random() * curveY(s);
        const fz = (Math.random() * 2 - 1) * DEPTH;
        pos[i*3] = fx;  pos[i*3+1] = fy;  pos[i*3+2] = fz;

        start[i*3]   = fx + (Math.random() - 0.5) * 3.6;
        start[i*3+1] = Y_BASE + PEAK + 1.0 + Math.random() * 3.4;
        start[i*3+2] = fz + (Math.random() - 0.5) * 3.0;

        const t   = THREE.MathUtils.clamp(Math.abs(s) / SIGMA_MAX, 0, 1);
        const col = COL.peri.clone().lerp(COL.peach, t * t);
        aColor[i*3] = col.r;  aColor[i*3+1] = col.g;  aColor[i*3+2] = col.b;

        aPhase[i] = Math.random() * Math.PI * 2;
        aScale[i] = 0.75 + Math.random() * 0.7;
        aDelay[i] = Math.random();
      }

      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute('position', new THREE.BufferAttribute(pos,    3));
      ptGeo.setAttribute('aStart',   new THREE.BufferAttribute(start,  3));
      ptGeo.setAttribute('aColor',   new THREE.BufferAttribute(aColor, 3));
      ptGeo.setAttribute('aPhase',   new THREE.BufferAttribute(aPhase, 1));
      ptGeo.setAttribute('aScale',   new THREE.BufferAttribute(aScale, 1));
      ptGeo.setAttribute('aDelay',   new THREE.BufferAttribute(aDelay, 1));

      const ptUniforms = {
        uTime:   { value: 0 },
        uReveal: { value: REDUCED ? 1 : 0 },
        uScale:  { value: 600 },
        uPoint:  { value: 0.044 },
        uScanX:  { value: -X_MAX * 1.3 },
      };

      const ptMat = new THREE.ShaderMaterial({
        uniforms: ptUniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */`
          uniform float uTime, uReveal, uScale, uPoint, uScanX;
          attribute vec3  aStart, aColor;
          attribute float aPhase, aScale, aDelay;
          varying vec3  vColor;
          varying float vSettle, vScan;
          float easeOut(float t){ return 1.0 - pow(1.0 - t, 3.0); }
          void main(){
            vColor = aColor;
            float span = 0.5;
            float p = clamp((uReveal - aDelay * (1.0 - span)) / span, 0.0, 1.0);
            p = easeOut(p);
            vSettle = p;
            vec3 pp = mix(aStart, position, p);
            pp.x += sin(uTime * 1.2 + aPhase) * 0.012 * p;
            pp.y += cos(uTime * 1.0 + aPhase * 1.3) * 0.012 * p;
            float scan = exp(-pow((position.x - uScanX) / 0.5, 2.0)) * p;
            vScan = scan;
            float pulse = 1.0 + 0.12 * sin(uTime * 1.5 + aPhase) + scan * 1.1;
            vec4 mv = modelViewMatrix * vec4(pp, 1.0);
            gl_PointSize = aScale * uPoint * pulse * (uScale / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */`
          precision highp float;
          varying vec3  vColor;
          varying float vSettle, vScan;
          void main(){
            vec2  c    = gl_PointCoord - 0.5;
            float d    = length(c);
            if (d > 0.5) discard;
            float glow = smoothstep(0.5,  0.0, d);
            float core = smoothstep(0.22, 0.0, d);
            vec3  col  = mix(vColor, vec3(1.0), core * 0.5 + vScan * 0.5);
            float a    = glow * (0.24 + 0.58 * vSettle);
            gl_FragColor = vec4(col * (0.5 + glow * 0.55 + vScan * 0.6), a);
          }
        `,
      });

      const points = new THREE.Points(ptGeo, ptMat);
      points.renderOrder = 3;
      field.add(points);

      /* ── GAUSSIAN CURVES ──────────────────────────────────────── */
      const CN = Q.curveSeg;

      function curveGeometry(z) {
        const p = new Float32Array((CN + 1) * 3);
        const c = new Float32Array((CN + 1) * 3);
        for (let i = 0; i <= CN; i++) {
          const s   = -SIGMA_MAX + (i / CN) * (SIGMA_MAX * 2);
          const t   = THREE.MathUtils.clamp(Math.abs(s) / SIGMA_MAX, 0, 1);
          const col = COL.peri.clone().lerp(COL.peach, t * t);
          p[i*3] = wX(s);  p[i*3+1] = Y_BASE + curveY(s);  p[i*3+2] = z;
          c[i*3] = col.r;  c[i*3+1] = col.g;                c[i*3+2] = col.b;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(p, 3));
        g.setAttribute('color',    new THREE.BufferAttribute(c, 3));
        return g;
      }

      const curveLines = [];
      function addCurve(z, opacity) {
        const mat  = new THREE.LineBasicMaterial({
          vertexColors: true, transparent: true,
          opacity: REDUCED ? opacity : 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false, depthTest: false,
        });
        const line = new THREE.Line(curveGeometry(z), mat);
        line.renderOrder  = 4;
        line._targetOpacity = opacity;
        field.add(line);
        curveLines.push(line);
        return line;
      }
      addCurve( DEPTH * 0.9, 0.28);   // ghost front
      addCurve(-DEPTH * 0.9, 0.28);   // ghost back
      addCurve(0, 1.0);               // main curve

      function setCurveDraw(p) {
        const n = Math.max(2, Math.ceil(p * (CN + 1)));
        curveLines.forEach(l => l.geometry.setDrawRange(0, n));
      }
      setCurveDraw(REDUCED ? 1 : 0);

      /* ── SCORE AXIS + σ GRIDLINES ─────────────────────────────── */
      const axisGroup = new THREE.Group();
      field.add(axisGroup);
      const axisMats = [];

      function lineSeg(ax, ay, bx, by, color, opacity, z = 0) {
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(ax, ay, z),
          new THREE.Vector3(bx, by, z),
        ]);
        const m = new THREE.LineBasicMaterial({
          color, transparent: true,
          opacity: REDUCED ? opacity : 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false, depthTest: false,
        });
        m._targetOpacity = opacity;
        const l = new THREE.Line(g, m);
        l.renderOrder = 2;
        axisGroup.add(l);
        axisMats.push(m);
        return l;
      }

      lineSeg(wX(-SIGMA_MAX) - 0.15, Y_BASE, wX(SIGMA_MAX) + 0.15, Y_BASE, 0x9aa0b5, 0.45);
      for (let s = -3; s <= 3; s++) {
        const isMu = s === 0;
        lineSeg(wX(s), Y_BASE, wX(s), Y_BASE + curveY(s),
          isMu ? 0xffffff : 0x7376ff, isMu ? 0.5 : 0.22);
      }

      /* ── MEASURED-SCORE MARKER (score at +1σ + CI bracket) ───── */
      const markerGroup = new THREE.Group();
      field.add(markerGroup);
      const markerMats = [];
      const MS   = 1.0;
      const mxW  = wX(MS);
      const mTop = Y_BASE + curveY(MS);
      const CI   = 0.26;

      function mLine(ax, ay, bx, by, color, opacity, z = 0.03) {
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(ax, ay, z),
          new THREE.Vector3(bx, by, z),
        ]);
        const m = new THREE.LineBasicMaterial({
          color, transparent: true,
          opacity: REDUCED ? opacity : 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false, depthTest: false,
        });
        m._targetOpacity = opacity;
        const l = new THREE.Line(g, m);
        l.renderOrder = 6;
        markerGroup.add(l);
        markerMats.push(m);
        return l;
      }
      mLine(mxW,       Y_BASE,       mxW,       mTop,       0xffffff, 0.60);
      mLine(mxW - CI,  Y_BASE,       mxW + CI,  Y_BASE,     0xff8766, 0.85);
      mLine(mxW - CI,  Y_BASE - 0.07, mxW - CI, Y_BASE + 0.07, 0xff8766, 0.85);
      mLine(mxW + CI,  Y_BASE - 0.07, mxW + CI, Y_BASE + 0.07, 0xff8766, 0.85);

      const dotMat = new THREE.SpriteMaterial({
        map: GLOW, transparent: true,
        opacity: REDUCED ? 1 : 0,
        depthWrite: false, depthTest: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
      });
      dotMat._targetOpacity = 1;
      const dot = new THREE.Sprite(dotMat);
      dot.scale.setScalar(0.34);
      dot.position.set(mxW, mTop, 0.05);
      dot.renderOrder = 7;
      markerGroup.add(dot);
      markerMats.push(dotMat);

      const baseDotMat = new THREE.SpriteMaterial({
        map: GLOW, transparent: true,
        opacity: REDUCED ? 1 : 0,
        depthWrite: false, depthTest: false,
        blending: THREE.AdditiveBlending,
        color: 0xff8766,
      });
      baseDotMat._targetOpacity = 1;
      const baseDot = new THREE.Sprite(baseDotMat);
      baseDot.scale.setScalar(0.26);
      baseDot.position.set(mxW, Y_BASE, 0.06);
      baseDot.renderOrder = 7;
      markerGroup.add(baseDot);
      markerMats.push(baseDotMat);

      /* ── RESIZE + LAYOUT ──────────────────────────────────────── */
      field.rotation.x = -0.06;

      function computeUScale() {
        const fbH = renderer.domElement.height;
        ptUniforms.uScale.value =
          fbH / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5));
      }

      function layout(w) {
        // stage.y = -3.314 + 1.025 * scale anchors the baseline to the bottom of the viewport
        if (w < 860) {
          stage.position.set(0, -2.65, 0);
          stage.scale.setScalar(0.65);
        } else if (w < 1100) {
          stage.position.set(0.6, -2.24, 0);
          stage.scale.setScalar(1.05);
        } else {
          stage.position.set(1.95, -1.93, 0);
          stage.scale.setScalar(1.35);
        }
      }

      function doResize() {
        if (disposed) return;
        const w = root.clientWidth, h = root.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        computeUScale();
        layout(w);
      }
      doResize();

      const ro = new ResizeObserver(doResize);
      ro.observe(root);

      /* ── PARALLAX (pointer relative to canvas rect) ───────────── */
      const aim = { x: 0, y: 0 };
      const par = { x: 0, y: 0 };

      const onPointerMove = (e) => {
        const rect = root.getBoundingClientRect();
        aim.x = ((e.clientX - rect.left)  / (rect.width  || 1)) * 2 - 1;
        aim.y = ((e.clientY - rect.top)   / (rect.height || 1)) * 2 - 1;
      };
      const onOrient = (e) => {
        if (e.gamma == null || e.beta == null) return;
        aim.x = THREE.MathUtils.clamp(e.gamma / 35, -1, 1);
        aim.y = THREE.MathUtils.clamp((e.beta - 45) / 35, -1, 1);
      };
      if (!REDUCED) {
        window.addEventListener('pointermove',      onPointerMove, { passive: true });
        window.addEventListener('deviceorientation', onOrient,     { passive: true });
      }

      /* ── ENTRANCE CHOREOGRAPHY ────────────────────────────────── */
      if (!REDUCED && gsap) {
        camera.position.z = CAM_Z + 1.7;
        const drawProxy = { p: 0 };
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .to(camera.position, { z: CAM_Z, duration: 2.0, ease: 'power2.out' }, 0)
          .to(ptUniforms.uReveal, { value: 1, duration: 1.9, ease: 'power2.out' }, 0)
          .to(drawProxy, {
            p: 1, duration: 1.3, ease: 'power1.inOut',
            onUpdate: () => setCurveDraw(drawProxy.p),
          }, 1.15)
          .to(axisMats, {
            opacity: (i) => axisMats[i]._targetOpacity, duration: 1.0,
          }, 1.0)
          .to(curveLines.map(l => l.material), {
            opacity: (i) => curveLines[i]._targetOpacity, duration: 1.0,
          }, 1.2)
          .to(markerMats, {
            opacity: (i) => markerMats[i]._targetOpacity, duration: 0.9,
          }, 1.9);
      }

      /* ── RENDER LOOP ──────────────────────────────────────────── */
      // THREE.Timer (preferred over deprecated THREE.Clock in r168+)
      const timer = new THREE.Timer();
      let running = false;

      function stepMotion(t) {
        ptUniforms.uTime.value = t;
        if (REDUCED) return;
        const sweep = (t * 0.16) % 1;
        ptUniforms.uScanX.value = (sweep * 2 - 1) * X_MAX * 1.15;
        par.x += (aim.x - par.x) * 0.045;
        par.y += (aim.y - par.y) * 0.045;
        field.rotation.y = Math.sin(t * 0.22) * 0.10 + par.x * 0.28;
        field.rotation.x = -0.06 + par.y * 0.16;
      }

      function frame() {
        if (!running || disposed) return;
        animId = requestAnimationFrame(frame);
        timer.update();
        stepMotion(timer.getElapsed());
        renderer.render(scene, camera);
      }

      function startLoop() {
        if (!running && !disposed) {
          running = true;
          timer.update(); // reset delta before first frame
          frame();
        }
      }

      /* ── INTERSECTION OBSERVER (pause off-screen) ─────────────── */
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            running = false;
            cancelAnimationFrame(animId);
          }
        },
        { threshold: 0.05 },
      );
      io.observe(root);
      startLoop();

      /* ── CLEANUP ─────────────────────────────────────────────── */
      cleanup = () => {
        running = false;
        cancelAnimationFrame(animId);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointermove',       onPointerMove);
        window.removeEventListener('deviceorientation', onOrient);
        scene.traverse((obj) => {
          if ((obj as any).geometry) (obj as any).geometry.dispose();
          if ((obj as any).material) {
            const m = (obj as any).material;
            Array.isArray(m) ? m.forEach((x) => x.dispose()) : m.dispose();
          }
        });
        GLOW.dispose();
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

  return <div ref={rootRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.75 }} />;
}
