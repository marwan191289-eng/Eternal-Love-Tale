import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
  exploded: boolean;
}

const ELEGANT_PALETTES = [
  ["#FFD700", "#FFF8DC", "#DAA520", "#FFFACD"],
  ["#E8D5B7", "#C9A84C", "#FFE4B5", "#F4E4C1"],
  ["#B0E0E6", "#87CEEB", "#E0F7FA", "#B2EBF2"],
  ["#DDA0DD", "#EE82EE", "#F8BBD9", "#E1BEE7"],
  ["#98FB98", "#90EE90", "#E8F5E9", "#C8E6C9"],
  ["#FFB6C1", "#FFC0CB", "#FCE4EC", "#F8BBD9"],
  ["#F0E68C", "#FFFACD", "#FFF9C4", "#FFEE58"],
  ["#D4AF37", "#C5A028", "#FFE57A", "#FFF176"],
];

export default function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastRocketRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function launchRocket() {
      if (!canvas) return;
      const palette = ELEGANT_PALETTES[Math.floor(Math.random() * ELEGANT_PALETTES.length)];
      const x = canvas.width * (0.15 + Math.random() * 0.7);
      const targetY = canvas.height * (0.1 + Math.random() * 0.35);
      const speed = 12 + Math.random() * 8;
      rocketsRef.current.push({
        x,
        y: canvas.height + 10,
        vy: -speed,
        targetY,
        color: palette[0],
        trail: [],
        exploded: false,
      });
    }

    function explode(rocket: Rocket) {
      const palette = ELEGANT_PALETTES[Math.floor(Math.random() * ELEGANT_PALETTES.length)];
      const count = 80 + Math.floor(Math.random() * 60);
      const style = Math.random();

      for (let i = 0; i < count; i++) {
        let angle: number;
        let speed: number;

        if (style < 0.33) {
          // Spherical burst
          angle = (Math.PI * 2 * i) / count;
          speed = 3 + Math.random() * 4;
        } else if (style < 0.66) {
          // Star burst
          angle = (Math.PI * 2 * i) / count;
          const isPetal = i % 5 === 0;
          speed = isPetal ? 6 + Math.random() * 3 : 2 + Math.random() * 2;
        } else {
          // Random spray
          angle = Math.random() * Math.PI * 2;
          speed = 1 + Math.random() * 5;
        }

        const color = palette[Math.floor(Math.random() * palette.length)];
        particlesRef.current.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          alpha: 1,
          color,
          size: 1.5 + Math.random() * 2.5,
          decay: 0.012 + Math.random() * 0.015,
          gravity: 0.06 + Math.random() * 0.04,
          trail: [],
        });
      }

      // Add glitter sparks
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2;
        particlesRef.current.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: "#FFFFFF",
          size: 0.8 + Math.random() * 1.5,
          decay: 0.02 + Math.random() * 0.02,
          gravity: 0.03,
          trail: [],
        });
      }
    }

    function animate(ts: number) {
      if (!canvas || !ctx) return;

      // Dark fade trail
      ctx.fillStyle = "rgba(10, 8, 20, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Launch rockets periodically
      if (ts - lastRocketRef.current > 600 + Math.random() * 800) {
        launchRocket();
        if (Math.random() > 0.5) launchRocket();
        lastRocketRef.current = ts;
      }

      // Update & draw rockets
      rocketsRef.current = rocketsRef.current.filter((r) => {
        if (!canvas) return false;
        if (r.exploded) return false;

        r.trail.unshift({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 18) r.trail.pop();

        // Draw trail
        r.trail.forEach((t, i) => {
          const a = (1 - i / r.trail.length) * 0.7;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2 - (i / r.trail.length) * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.fill();
          ctx.restore();
        });

        // Draw rocket head
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 8;
        ctx.shadowColor = r.color;
        ctx.fill();
        ctx.restore();

        r.y += r.vy;
        r.vy += 0.15;

        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r);
          r.exploded = true;
          return false;
        }
        return true;
      });

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.pop();

        // Draw trail
        p.trail.forEach((t, i) => {
          ctx.save();
          ctx.globalAlpha = p.alpha * (1 - i / p.trail.length) * 0.4;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.size * (1 - i / p.trail.length) * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.restore();
        });

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        return p.alpha > 0.02;
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      rocketsRef.current = [];
      particlesRef.current = [];
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
}
