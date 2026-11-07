"use client";
import { useEffect, useRef } from "react";

/**
 * Aether flow: tiny luminous particles drifting along a smooth flow field in the
 * top-left and bottom-right corners. They gently swirl away from the cursor.
 * Perf: one fixed canvas, ~40 particles per corner, DPR capped, paused when the
 * tab is hidden, static (no animation) with prefers-reduced-motion. On small screens:
 * ~12 particles per corner, DPR 1, capped at ~30fps, touch-driven interaction.
 */

const PER_CORNER = 42;
const PER_CORNER_MOBILE = 12; // lighter on phones
const MOUSE_RADIUS = 170;
const COLORS: [number, number, number][] = [
  [91, 140, 255], // accent
  [58, 95, 207], // deep blue
  [200, 215, 255], // pale highlight
];

type P = {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; c: number; corner: 0 | 1; seed: number;
};

export default function AetherParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, R = 0, dpr = 1, small = false;
    let raf = 0;
    let running = false;
    let last = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };
    const parts: P[] = [];

    const anchor = (corner: 0 | 1) => (corner === 0 ? { x: 0, y: 0 } : { x: w, y: h });

    const spawn = (p: P, initial: boolean) => {
      const a = anchor(p.corner);
      // Denser near the corner: square the random radius.
      const r = Math.random() ** 1.6 * R;
      const ang = Math.random() * Math.PI / 2; // quarter disc toward the screen interior
      const dirx = p.corner === 0 ? 1 : -1;
      p.x = a.x + dirx * Math.cos(ang) * r;
      p.y = a.y + dirx * Math.sin(ang) * r;
      p.vx = p.vy = 0;
      p.max = 6 + Math.random() * 7;
      p.life = initial ? Math.random() * p.max : 0;
      p.size = 0.6 + Math.random() * 1.3;
      p.c = (Math.random() * COLORS.length) | 0;
      p.seed = Math.random() * 100;
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      small = w < 768;
      dpr = small ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      R = small ? Math.min(w * 0.75, 300) : Math.min(Math.max(w, h) * 0.34, 520);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "lighter";
      parts.length = 0;
      const n = (small ? PER_CORNER_MOBILE : PER_CORNER) * 2;
      for (let i = 0; i < n; i++) {
        const p = { corner: (i % 2) as 0 | 1 } as P;
        spawn(p, true);
        parts.push(p);
      }
      if (reduced || !running) frame(0);
    };

    // Smooth pseudo-curl flow field (cheap: a few trig calls).
    const field = (x: number, y: number, seed: number) =>
      Math.sin(x * 0.0042 + t * 0.35 + seed * 0.05) * 1.8 +
      Math.cos(y * 0.0051 - t * 0.28) * 1.8 +
      Math.sin((x + y) * 0.0025 + t * 0.2) * 1.2;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0.016, 0.05);
      last = now;
      if (!reduced) t += dt;

      ctx.clearRect(0, 0, w, h);

      for (const p of parts) {
        const a = anchor(p.corner);
        if (!reduced) {
          p.life += dt;
          const ang = field(p.x, p.y, p.seed);
          const sp = 16 + p.size * 7;
          // Steer velocity toward the flow direction (smooth, no jitter).
          p.vx += (Math.cos(ang) * sp - p.vx) * Math.min(dt * 1.6, 1);
          p.vy += (Math.sin(ang) * sp - p.vy) * Math.min(dt * 1.6, 1);

          // Cursor interaction: soft radial push + swirl.
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 1) {
            const d = Math.sqrt(d2);
            const k = (1 - d / MOUSE_RADIUS) ** 2;
            p.vx += ((dx / d) * 120 + (-dy / d) * 90) * k * dt * 6;
            p.vy += ((dy / d) * 120 + (dx / d) * 90) * k * dt * 6;
          }
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        }

        const ddx = p.x - a.x;
        const ddy = p.y - a.y;
        const dist = Math.hypot(ddx, ddy);
        const inside = (p.corner === 0 ? ddx > -40 && ddy > -40 : ddx < 40 && ddy < 40);
        if (p.life > p.max || dist > R * 1.05 || !inside) {
          spawn(p, false);
          continue;
        }

        // Fade in/out over life and with distance from the corner.
        const lf = Math.min(p.life / 1.5, 1) * Math.min((p.max - p.life) / 1.5, 1);
        const falloff = (1 - dist / R) ** 1.4;
        let alpha = Math.max(lf, reduced ? 1 : 0) * falloff * 0.6;

        // Brighten slightly near the cursor.
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = mdx * mdx + mdy * mdy;
        if (md < MOUSE_RADIUS * MOUSE_RADIUS) alpha = Math.min(alpha + (1 - Math.sqrt(md) / MOUSE_RADIUS) * 0.35, 0.9);
        if (alpha < 0.01) continue;

        const [r, g, b] = COLORS[p.c];
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        // Short comet tail along the velocity.
        ctx.moveTo(p.x - p.vx * 0.12, p.y - p.vy * 0.12);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      // ~30fps on phones: skip frames until enough time has elapsed.
      if (!small || now - last >= 30) frame(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onVis = () => (document.hidden ? stop() : start());
    const onTouch = (e: TouchEvent) => {
      const t0 = e.touches[0];
      if (t0) { mouse.x = t0.clientX; mouse.y = t0.clientY; }
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave, { passive: true });
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
