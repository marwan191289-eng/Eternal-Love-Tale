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
  drag: number;
  shimmer: number;
  trail: { x: number; y: number; alpha: number }[];
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
  exploded: boolean;
}

const BURJ_KHALIFA_PALETTES = [
  ["#FFD76A", "#FFF4C2", "#FFFFFF", "#C9A54A", "#8DEBFF"],
  ["#D7F7FF", "#FFFFFF", "#9FE7FF", "#FFE8A3", "#B6F3FF"],
  ["#F7D77B", "#FFF9E6", "#D6B15E", "#FFFFFF", "#B9FFF4"],
  ["#E8F4FF", "#FFFFFF", "#C6D9FF", "#FFE7B8", "#D2FFEE"],
];

function randomFrom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "lighter";
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    function launchRocket(column?: number) {
      const palette = randomFrom(BURJ_KHALIFA_PALETTES);
      const baseX = column === undefined ? 0.12 + Math.random() * 0.76 : column;
      const x = w() * baseX + (Math.random() - 0.5) * 28;
      const targetY = h() * (0.08 + Math.random() * 0.34);
      const speed = 17 + Math.random() * 8;
      rocketsRef.current.push({
        x,
        y: h() + 18,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -speed,
        targetY,
        color: randomFrom(palette),
        trail: [],
        exploded: false,
      });
    }

    function addParticle(x: number, y: number, angle: number, speed: number, color: string, size: number, decay: number, gravity: number, drag = 0.986) {
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size,
        decay,
        gravity,
        drag,
        shimmer: 0.72 + Math.random() * 0.7,
        trail: [],
      });
    }

    function explode(rocket: Rocket) {
      const palette = randomFrom(BURJ_KHALIFA_PALETTES);
      const style = Math.random();
      const count = style < 0.38 ? 210 : style < 0.72 ? 170 : 140;
      const ringCount = style < 0.72 ? 2 : 3;

      for (let ring = 0; ring < ringCount; ring++) {
        const radiusBoost = 1 + ring * 0.36;
        for (let i = 0; i < count / ringCount; i++) {
          const even = (Math.PI * 2 * i) / (count / ringCount);
          const angle = style < 0.72 ? even + (Math.random() - 0.5) * 0.06 : Math.random() * Math.PI * 2;
          const chrysanthemum = 2.4 + Math.random() * 3.2;
          const palm = i % 18 === 0 ? 7.2 + Math.random() * 2.6 : chrysanthemum;
          const speed = (style < 0.38 ? chrysanthemum : palm) * radiusBoost * 1.38;
          const color = randomFrom(palette);
          addParticle(rocket.x, rocket.y, angle, speed, color, 0.9 + Math.random() * 2.3, 0.014 + Math.random() * 0.018, 0.052 + Math.random() * 0.048);
        }
      }

      // Cascading golden rain, similar to premium skyline displays.
      for (let i = 0; i < 56; i++) {
        const angle = Math.PI / 2 + (Math.random() - 0.5) * 1.05;
        addParticle(rocket.x, rocket.y, angle, 2.4 + Math.random() * 4.4, randomFrom(["#FFD76A", "#FFF4C2", "#FFFFFF"]), 0.7 + Math.random() * 1.5, 0.018 + Math.random() * 0.02, 0.095 + Math.random() * 0.06, 0.992);
      }

      // Flash core.
      for (let i = 0; i < 18; i++) {
        addParticle(rocket.x, rocket.y, Math.random() * Math.PI * 2, 0.2 + Math.random() * 1.6, "#FFFFFF", 1.8 + Math.random() * 2.8, 0.04 + Math.random() * 0.02, 0.01, 0.97);
      }
    }

    function animate(ts: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 8, 0.16)";
      ctx.fillRect(0, 0, w(), h());
      ctx.restore();
      ctx.globalCompositeOperation = "lighter";

      if (ts - lastRocketRef.current > 120 + Math.random() * 220) {
        const sequence = Math.random();
        if (sequence > 0.72) {
          [0.18, 0.32, 0.5, 0.68, 0.82].forEach((x, i) => setTimeout(() => launchRocket(x), i * 52));
        } else {
          launchRocket();
          if (Math.random() > 0.12) launchRocket();
          if (Math.random() > 0.58) launchRocket();
        }
        lastRocketRef.current = ts;
      }

      rocketsRef.current = rocketsRef.current.filter((r) => {
        if (r.exploded) return false;
        r.trail.unshift({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 26) r.trail.pop();

        r.trail.forEach((t, i) => {
          const a = (1 - i / r.trail.length) * 0.8;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.shadowBlur = 12;
          ctx.shadowColor = r.color;
          ctx.fillStyle = r.color;
          ctx.beginPath();
          ctx.arc(t.x, t.y, Math.max(0.7, 2.5 - i * 0.08), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 24;
        ctx.shadowColor = r.color;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.22;
        if (r.y <= r.targetY || r.vy >= -0.5) {
          explode(r);
          r.exploded = true;
          return false;
        }
        return true;
      });

      particlesRef.current = particlesRef.current.filter((p) => {
        p.trail.unshift({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > 9) p.trail.pop();

        p.trail.forEach((t, i) => {
          const a = p.alpha * (1 - i / p.trail.length) * 0.48;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(0.5, p.size * (1 - i / p.trail.length));
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.moveTo(t.x, t.y);
          const next = p.trail[i + 1];
          ctx.lineTo(next?.x ?? p.x, next?.y ?? p.y);
          ctx.stroke();
          ctx.restore();
        });

        const sparkle = 0.65 + Math.sin(Date.now() * 0.018 * p.shimmer) * 0.35;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha * sparkle);
        ctx.shadowBlur = 18;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.alpha -= p.decay;
        return p.alpha > 0.015;
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, w(), h());
      rocketsRef.current = [];
      particlesRef.current = [];
    };
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 50 }}
    />
  );
}
