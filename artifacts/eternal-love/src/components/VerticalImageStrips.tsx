import { useAppStore } from "@/store/appStore";
import { useRef, useEffect, useState } from "react";

const PLACEHOLDER_STRIPS = [
  { gradient: "linear-gradient(160deg,#2a1a00,#6b3f00)", label: "🌹" },
  { gradient: "linear-gradient(160deg,#0a0020,#280060)", label: "💜" },
  { gradient: "linear-gradient(160deg,#001a2a,#003355)", label: "💙" },
  { gradient: "linear-gradient(160deg,#1a0010,#4a0030)", label: "🌸" },
  { gradient: "linear-gradient(160deg,#001a0a,#003320)", label: "💚" },
  { gradient: "linear-gradient(160deg,#1a1a00,#4a4a00)", label: "⭐" },
  { gradient: "linear-gradient(160deg,#0a0020,#380028)", label: "✨" },
  { gradient: "linear-gradient(160deg,#1a0008,#500010)", label: "🌺" },
];

function buildItems(images: { id: string; url: string; alt: string; visible: boolean }[]) {
  const visible = images.filter((i) => i.visible);
  if (visible.length >= 4) return [...visible, ...visible];
  return [...PLACEHOLDER_STRIPS, ...PLACEHOLDER_STRIPS];
}

interface StripItemData {
  id?: string;
  url?: string;
  alt?: string;
  gradient?: string;
  label?: string;
}

function StripItem({ item, size }: { item: StripItemData; size: number }) {
  const commonStyle: React.CSSProperties = {
    width: size,
    height: size * 1.42,
    marginBottom: 14,
    border: "1px solid rgba(200,255,0,0.16)",
    boxShadow: "0 12px 34px rgba(0,0,0,0.48), 0 0 18px rgba(200,255,0,0.08), inset 0 1px 0 rgba(255,255,255,0.045)",
  };

  if (item.url) {
    return (
      <div className="flex-shrink-0 rounded-2xl overflow-hidden relative" style={commonStyle}>
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ boxShadow: "inset 0 0 28px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.04)" }} />
        <img
          src={item.url}
          alt={item.alt || ""}
          className="w-full h-full object-cover"
          style={{ filter: "saturate(1.12) contrast(1.05)", opacity: 0.78 }}
        />
      </div>
    );
  }
  return (
    <div
      className="flex-shrink-0 rounded-2xl flex items-center justify-center"
      style={{
        ...commonStyle,
        background: item.gradient,
        fontSize: "1.65rem",
        opacity: 0.62,
      }}
    >
      {item.label}
    </div>
  );
}

function VerticalStrip({
  direction,
  side,
  items,
  size,
  speed,
}: {
  direction: "up" | "down";
  side: "left" | "right";
  items: StripItemData[];
  size: number;
  speed: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(direction === "down" ? -90 : 0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalH = el.scrollHeight / 2;

    const step = () => {
      if (direction === "up") {
        posRef.current -= speed;
        if (Math.abs(posRef.current) >= totalH) posRef.current = 0;
      } else {
        posRef.current += speed;
        if (posRef.current >= totalH) posRef.current = 0;
      }
      el.style.transform = `translateY(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  return (
    <div
      className="fixed top-0 bottom-0 overflow-hidden pointer-events-none"
      style={{
        [side]: 0,
        width: size + 28,
        zIndex: 5,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 94%, transparent 100%)",
      }}
    >
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          [side]: 0,
          width: "100%",
          background: side === "right"
            ? "linear-gradient(to left, rgba(200,255,0,0.055), transparent)"
            : "linear-gradient(to right, rgba(0,229,255,0.045), transparent)",
        }}
      />
      <div ref={trackRef} className="relative flex flex-col items-center" style={{ willChange: "transform", paddingTop: side === "left" ? 18 : 52, paddingLeft: 12, paddingRight: 12 }}>
        {items.map((item, i) => <StripItem key={`a-${i}`} item={item} size={size} />)}
        {items.map((item, i) => <StripItem key={`b-${i}`} item={item} size={size} />)}
      </div>
    </div>
  );
}

export default function VerticalImageStrips() {
  const { images } = useAppStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.innerWidth >= 1100);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!show) return null;

  const items = buildItems(images);

  return (
    <>
      <VerticalStrip direction="up" side="right" items={items} size={84} speed={0.32} />
      <VerticalStrip direction="down" side="left" items={items} size={84} speed={0.22} />
    </>
  );
}
