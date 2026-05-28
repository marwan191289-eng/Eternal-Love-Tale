import { useEffect, useRef } from 'react';

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctxRaw = canvas.getContext('2d', { alpha: true });
    if (!ctxRaw) return;
    const ctx = ctxRaw;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; color: string; size: number;
    }

    const particles: Particle[] = [];

    const colorSchemes = [
      { main: '#FFD700', accent: '#FFA500', bright: '#FFFF00' },
      { main: '#FF1493', accent: '#FF69B4', bright: '#FFB6C1' },
      { main: '#00CED1', accent: '#00BFFF', bright: '#87CEEB' },
      { main: '#9370DB', accent: '#BA55D3', bright: '#DA70D6' },
      { main: '#FFE4E1', accent: '#FFDAB9', bright: '#FFD700' },
    ];

    function createExplosion(x: number, y: number) {
      const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
      const count = 180 + Math.random() * 200;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 1.5;
        const speed = 1 + Math.random() * 10;
        const colors = [scheme.main, scheme.accent, scheme.bright];
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1, maxLife: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1.5 + Math.random() * 4,
        });
      }
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx.globalAlpha = 1;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.22; p.vx *= 0.98;
        p.life -= 0.006;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const alpha = Math.pow(p.life, 1.8);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = Math.pow(p.life, 2.5) * 0.8;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    const start = Date.now();
    const duration = 5000;
    let lastBurst = 0;

    const loop = () => {
      const elapsed = Date.now() - start;
      if (elapsed < duration) {
        if (elapsed - lastBurst > 320) {
          const num = 1 + Math.floor(Math.random() * 3);
          for (let i = 0; i < num; i++) {
            createExplosion(
              100 + Math.random() * (canvas!.width - 200),
              80 + Math.random() * (canvas!.height * 0.5)
            );
          }
          lastBurst = elapsed;
        }
        animate();
        requestAnimationFrame(loop);
      }
    };
    loop();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
