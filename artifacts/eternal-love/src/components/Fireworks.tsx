import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  gravity: number;
}

interface Shot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
}

const PALETTES = [
  ["#FFD86B", "#FFF7D6", "#FFFFFF", "#7DEBFF"],
  ["#FFFFFF", "#D7F7FF", "#FFDFA3", "#B8FFF2"],
  ["#FFE57A", "#FFF4BF", "#F8C66A", "#FFFFFF"],
];

const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

export default function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const shotsRef = useRef<Shot[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const lastLaunchRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;
    const ctx = canvasEl.getContext("2d", { alpha: true });
    if (!ctx) return;
    const context = ctx;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);
    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;

    function resize() {
      const ratio = dpr();
      canvasEl.width = Math.floor(vw() * ratio);
      canvasEl.height = Math.floor(vh() * ratio);
      canvasEl.style.width = `${vw()}px`;
      canvasEl.style.height = `${vh()}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    function launch(xRatio = 0.12 + Math.random() * 0.76) {
      const palette = pick(PALETTES);
      shotsRef.current.push({
        x: vw() * xRatio + (Math.random() - 0.5) * 22,
        y: vh() + 10,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -(22 + Math.random() * 9),
        targetY: vh() * (0.08 + Math.random() * 0.28),
        color: pick(palette),
      });
    }

    function burst(x: number, y: number, palette = pick(PALETTES)) {
      const current = sparksRef.current;
      const maxRoom = 380 - current.length;
      if (maxRoom <= 0) return;
      const count = Math.min(maxRoom, 58 + ((Math.random() * 30) | 0));
      const ring = Math.random() > 0.35;

      for (let i = 0; i < count; i++) {
        const angle = ring ? (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.1 : Math.random() * Math.PI * 2;
        const speed = (ring ? 7.5 + Math.random() * 6 : 4 + Math.random() * 9) * 1.38;
        const life = 26 + Math.random() * 22;
        current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          color: pick(palette),
          size: 1.15 + Math.random() * 1.9,
          gravity: 0.24 + Math.random() * 0.12,
        });
      }

      // Quick premium golden rain without heavy per-particle trails.
      for (let i = 0; i < Math.min(28, 380 - current.length); i++) {
        const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.78;
        const speed = 4 + Math.random() * 7;
        const life = 22 + Math.random() * 18;
        current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          color: pick(["#FFD86B", "#FFF7D6", "#FFFFFF"]),
          size: 0.95 + Math.random() * 1.25,
          gravity: 0.32 + Math.random() * 0.13,
        });
      }
    }

    function animate(ts: number) {
      // Draw at ~40 FPS instead of 60 FPS to lower CPU without feeling slow.
      if (ts - frameRef.current < 24) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const dt = Math.min(1.8, (ts - frameRef.current) / 24 || 1);
      frameRef.current = ts;

      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, vw(), vh());
      context.fillStyle = "rgba(0,0,10,0.10)";
      context.fillRect(0, 0, vw(), vh());
      context.globalCompositeOperation = "lighter";

      if (ts - lastLaunchRef.current > 120 + Math.random() * 120) {
        const choreography = Math.random();
        if (choreography > 0.62) {
          [0.2, 0.38, 0.56, 0.74].forEach((x, i) => window.setTimeout(() => launch(x), i * 34));
        } else {
          launch();
          if (Math.random() > 0.3) launch();
        }
        lastLaunchRef.current = ts;
      }

      shotsRef.current = shotsRef.current.filter((shot) => {
        context.save();
        context.globalAlpha = 0.95;
        context.shadowBlur = 16;
        context.shadowColor = shot.color;
        context.strokeStyle = shot.color;
        context.lineWidth = 2.2;
        context.beginPath();
        context.moveTo(shot.x, shot.y + 18);
        context.lineTo(shot.x, shot.y);
        context.stroke();
        context.fillStyle = "#fff";
        context.beginPath();
        context.arc(shot.x, shot.y, 2.6, 0, Math.PI * 2);
        context.fill();
        context.restore();

        shot.x += shot.vx * dt;
        shot.y += shot.vy * dt;
        shot.vy += 0.62 * dt;
        if (shot.y <= shot.targetY || shot.vy >= -1.2) {
          burst(shot.x, shot.y);
          return false;
        }
        return shot.y > -80;
      });

      sparksRef.current = sparksRef.current.filter((p) => {
        const alpha = Math.max(0, p.life / p.maxLife);
        context.save();
        context.globalAlpha = alpha;
        context.shadowBlur = 10;
        context.shadowColor = p.color;
        context.strokeStyle = p.color;
        context.lineWidth = Math.max(0.45, p.size * alpha);
        context.beginPath();
        context.moveTo(p.x, p.y);
        context.lineTo(p.x - p.vx * 1.45, p.y - p.vy * 1.45);
        context.stroke();
        context.fillStyle = p.color;
        context.beginPath();
        context.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        context.fill();
        context.restore();

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.965;
        p.vy = p.vy * 0.965 + p.gravity * dt;
        p.life -= 1.85 * dt;
        return p.life > 0;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      shotsRef.current = [];
      sparksRef.current = [];
      context.clearRect(0, 0, vw(), vh());
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 50 }} />;
}
