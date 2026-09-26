import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
}

/** Slow-rising gold dust behind the whole invitation. */
export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (initial: boolean): Particle => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      r: Math.random() * 1.8 + 0.6,
      vy: Math.random() * 0.45 + 0.15,
      vx: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.2,
    });
    const particles = Array.from({ length: width < 600 ? 22 : 36 }, () => spawn(true));

    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) Object.assign(p, spawn(false));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 208, 143, ${p.a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ecd08f';
        ctx.fill();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}
