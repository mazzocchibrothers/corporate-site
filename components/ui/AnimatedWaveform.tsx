// @ts-nocheck
import React, { useRef, useEffect } from 'react';

export default function AnimatedWaveform({
  playing = true,
  barCount = 100,
  barWidth = 2.5,
  barGap = 2,
  maxHeight = 26,
  color = '#ffffff',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W = 0;
    let H = 0;

    const fit = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas.parentElement);

    const frame = (now) => {
      rafRef.current = requestAnimationFrame(frame);

      // Time
      const dt = prevRef.current ? (now - prevRef.current) / 1000 : 0.016;
      prevRef.current = now;
      if (playing) tRef.current += dt;
      const t = tRef.current;

      // Clear
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const step = barWidth + barGap;
      const n = Math.min(barCount, Math.floor(W / step));
      const x0 = (W - n * step + barGap) * 0.5;
      const cy = H * 0.5;
      const r = barWidth * 0.5;

      ctx.fillStyle = color;

      for (let i = 0; i < n; i++) {
        const p = i / n;               // 0→1 normalized position
        const idx = p * 12;            // spatial frequency base

        // ── Core traveling wave (left→right) ──
        //   Several sine layers at different speeds & frequencies
        //   all moving in the SAME direction so it reads as one coherent wave
        const a = Math.sin(idx - t * 2.0)          * 0.35;
        const b = Math.sin(idx * 1.6 - t * 1.4 + 1.0) * 0.25;
        const c = Math.sin(idx * 0.5 - t * 0.7 + 3.0) * 0.20;
        const d = Math.sin(idx * 2.8 - t * 2.6 + 5.0) * 0.12;
        const e = Math.sin(idx * 0.3 - t * 0.3)      * 0.08;

        // Sum → range roughly ‑1 … +1, map to 0 … 1
        const sum = a + b + c + d + e;        // –1 … 1
        const norm = (sum + 1) * 0.5;         //  0 … 1

        // Soft edge envelope (bars at the very start/end slightly shorter)
        const env = Math.pow(Math.sin(p * Math.PI), 0.25);

        // Final bar half‑height
        const h = Math.max(1.5, norm * env * maxHeight);

        // Draw symmetric pill bar
        const bx = x0 + i * step;
        ctx.beginPath();
        ctx.roundRect(bx, cy - h, barWidth, h * 2, r);
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [playing, barCount, barWidth, barGap, maxHeight, color]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
