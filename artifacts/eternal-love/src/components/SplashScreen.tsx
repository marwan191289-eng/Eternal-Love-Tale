import { useEffect, useRef, useState } from "react";

const VERSE = "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا";
const VERSE_REF = "﴿ سورة الروم: ٢١ ﴾";

export function SplashScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");
  const [verseVisible, setVerseVisible] = useState(false);
  const [namesVisible, setNamesVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVerseVisible(true), 600);
    const t2 = setTimeout(() => setNamesVisible(true), 1800);
    const t3 = setTimeout(() => setPhase("fade"), 5200);
    const t4 = setTimeout(() => setPhase("gone"), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx = ctxRaw;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Types ─────────────────────────────────────────────────────
    type Trail = { x: number; y: number };
    type Rocket = {
      x: number; y: number;
      vx: number; vy: number;
      hue: number; sat: number;
      trail: Trail[];
      exploded: boolean;
    };
    type Spark = {
      x: number; y: number;
      vx: number; vy: number;
      life: number;
      decay: number;
      hue: number; sat: number; lit: number;
      size: number;
    };

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    // Beautiful color palettes - gold, rose, silver, blue-white
    const palettes = [
      { hue: 45,  sat: 95, lit: 72 },  // gold
      { hue: 55,  sat: 88, lit: 78 },  // warm gold
      { hue: 340, sat: 80, lit: 72 },  // rose
      { hue: 200, sat: 40, lit: 88 },  // silver-blue
      { hue: 30,  sat: 90, lit: 68 },  // amber
      { hue: 0,   sat: 0,  lit: 96 },  // white
    ];

    function launchRocket() {
      const p = palettes[Math.floor(Math.random() * palettes.length)];
      const targetX = canvas!.width * 0.15 + Math.random() * canvas!.width * 0.70;
      const targetY = canvas!.height * 0.08 + Math.random() * canvas!.height * 0.35;
      const startX = canvas!.width * 0.20 + Math.random() * canvas!.width * 0.60;
      const startY = canvas!.height;
      const distance = Math.sqrt((targetX - startX) ** 2 + (targetY - startY) ** 2);
      const speed = 16 + Math.random() * 10;
      const frames = distance / speed;
      rockets.push({
        x: startX, y: startY,
        vx: (targetX - startX) / frames,
        vy: (targetY - startY) / frames,
        hue: p.hue, sat: p.sat,
        trail: [],
        exploded: false,
      });
    }

    function explode(x: number, y: number, hue: number, sat: number) {
      const count = 240 + Math.floor(Math.random() * 160);
      const lit = 55 + Math.random() * 25;

      for (let i = 0; i < count; i++) {
        // Use multiple patterns for elegance
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;

        // Mixed burst pattern: some fast, some slow (creates layered effect)
        const ring = Math.random();
        let speed: number;
        if (ring < 0.3) speed = 0.8 + Math.random() * 1.5;       // inner cluster
        else if (ring < 0.75) speed = 3 + Math.random() * 4.5;    // main ring
        else speed = 6 + Math.random() * 5.5;                       // outer burst

        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.010 + Math.random() * 0.012,
          hue: hue + (Math.random() - 0.5) * 18,
          sat,
          lit: lit + (Math.random() - 0.5) * 25,
          size: 1.5 + Math.random() * 2.5,
        });
      }

      // Golden shimmer ring (central ring of brighter particles)
      for (let i = 0; i < 60; i++) {
        const a = (Math.PI * 2 * i) / 60;
        sparks.push({
          x, y,
          vx: Math.cos(a) * (2.5 + Math.random() * 1.5),
          vy: Math.sin(a) * (2.5 + Math.random() * 1.5),
          life: 1,
          decay: 0.008,
          hue: 45, sat: 100, lit: 90,
          size: 2.2,
        });
      }
    }

    function drawRocketTrail(r: Rocket) {
      for (let i = 1; i < r.trail.length; i++) {
        const alpha = (i / r.trail.length) * 0.7;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = `hsl(${r.hue}, ${r.sat}%, 75%)`;
        ctx.lineWidth = 2 * (i / r.trail.length);
        ctx.beginPath();
        ctx.moveTo(r.trail[i - 1].x, r.trail[i - 1].y);
        ctx.lineTo(r.trail[i].x, r.trail[i].y);
        ctx.stroke();
      }
      // rocket head glow
      ctx.globalAlpha = 0.9;
      const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 5);
      grad.addColorStop(0, `hsl(${r.hue} ${r.sat}% 95%)`);
      grad.addColorStop(1, `hsl(${r.hue} ${r.sat}% 55% / 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSpark(s: Spark) {
      ctx.globalAlpha = Math.pow(s.life, 1.6);
      // Draw trail
      ctx.strokeStyle = `hsl(${s.hue}, ${s.sat}%, ${s.lit}%)`;
      ctx.lineWidth = s.size * s.life;
      ctx.beginPath();
      ctx.moveTo(s.x - s.vx * 3, s.y - s.vy * 3);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      // Draw particle core
      ctx.fillStyle = `hsl(${s.hue + 10}, 100%, 92%)`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * 0.7 * s.life, 0, Math.PI * 2);
      ctx.fill();
    }

    let lastLaunch = 0;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      if (phase === "gone") return;

      const elapsed = now - start;

      // Slight fade trail effect
      ctx.fillStyle = "rgba(8, 4, 12, 0.20)";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      // Launch rockets at intervals (6 seconds of activity)
      if (elapsed < 6000 && elapsed - lastLaunch > 500 + Math.random() * 600) {
        const batch = 1 + (elapsed > 2000 ? 1 : 0);
        for (let i = 0; i < batch; i++) launchRocket();
        lastLaunch = elapsed;
      }

      // Update + draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 18) r.trail.shift();
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.035; // slight gravity pull during flight

        drawRocketTrail(r);

        // Explode when near apex (vy slows significantly)
        if (r.vy >= -1.2) {
          explode(r.x, r.y, r.hue, r.sat);
          rockets.splice(i, 1);
        }
      }

      // Update + draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.055; // gravity
        s.vx *= 0.988;
        s.vy *= 0.988;
        s.life -= s.decay;

        if (s.life <= 0) { sparks.splice(i, 1); continue; }

        drawSpark(s);
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #130a18 0%, #080410 60%, #050208 100%)",
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Text overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center z-10">
        {/* Quranic verse */}
        <div
          style={{
            opacity: verseVisible ? 1 : 0,
            transform: verseVisible ? "translateY(0)" : "translateY(-16px)",
            transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            className="mx-auto max-w-2xl rounded-2xl px-8 py-5"
            style={{
              border: "1px solid rgba(212,175,55,0.35)",
              background: "rgba(8,4,12,0.55)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 60px rgba(212,175,55,0.15)",
            }}
          >
            <p
              className="font-display-ar text-2xl md:text-3xl leading-relaxed"
              dir="rtl"
              style={{ color: "oklch(0.92 0.09 75)" }}
            >
              {VERSE}
            </p>
            <p
              className="mt-3 font-display text-xs tracking-[0.4em] uppercase"
              style={{ color: "oklch(0.75 0.09 75)", opacity: 0.8 }}
            >
              {VERSE_REF}
            </p>
          </div>
        </div>

        {/* Names */}
        <div
          style={{
            opacity: namesVisible ? 1 : 0,
            transform: namesVisible ? "scale(1)" : "scale(0.88)",
            transition: "all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <h1
            className="font-display-ar text-6xl md:text-8xl font-bold"
            dir="rtl"
            style={{
              background: "linear-gradient(135deg, oklch(0.91 0.10 82), oklch(0.82 0.13 75), oklch(0.91 0.10 82))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 40px oklch(0.82 0.13 75 / 0.5))",
            }}
          >
            أميرة  ❦  علاء
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: namesVisible ? 0.65 : 0,
            transition: "opacity 1.4s 0.4s ease-in-out",
          }}
        >
          <p
            className="font-display tracking-[0.55em] text-xs uppercase"
            style={{ color: "oklch(0.82 0.13 75)" }}
          >
            حكاية تبدأ · ١٤ مايو ٢٠٢٦
          </p>
        </div>
      </div>
    </div>
  );
}
