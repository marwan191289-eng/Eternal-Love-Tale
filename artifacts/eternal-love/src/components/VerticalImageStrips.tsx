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
  if (visible.length >= 4) return [...visible, ...visible]; // duplicate for infinite scroll
  // fill with placeholders
  const items = [...PLACEHOLDER_STRIPS, ...PLACEHOLDER_STRIPS];
  return items;
}

interface StripItemData {
  id?: string;
  url?: string;
  alt?: string;
  gradient?: string;
  label?: string;
}

function StripItem({ item, size }: { item: StripItemData; size: number }) {
  if (item.url) {
    return (
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden"
        style={{
          width: size,
          height: size * 1.35,
          marginBottom: 10,
          border: "1px solid rgba(255,215,0,0.12)",
          boxShadow: "0 0 12px rgba(0,0,0,0.5)",
        }}
      >
        <img src={item.url} alt={item.alt || ""} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="flex-shrink-0 rounded-xl flex items-center justify-center"
      style={{
        width: size,
        height: size * 1.35,
        marginBottom: 10,
        background: item.gradient,
        border: "1px solid rgba(255,215,0,0.08)",
        fontSize: "1.4rem",
        opacity: 0.55,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
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
  const posRef = useRef(0);
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
        width: size + 16,
        zIndex: 5,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className="flex flex-col items-center pt-20"
        style={{ willChange: "transform", paddingLeft: 8, paddingRight: 8 }}
      >
        {/* Two full copies for infinite scroll */}
        {items.map((item, i) => (
          <StripItem key={`a-${i}`} item={item} size={size} />
        ))}
        {items.map((item, i) => (
          <StripItem key={`b-${i}`} item={item} size={size} />
        ))}
      </div>
    </div>
  );
}

export default function VerticalImageStrips() {
  const { images } = useAppStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on larger screens
    const check = () => setShow(window.innerWidth >= 1100);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!show) return null;

  const items = buildItems(images);

  return (
    <>
      <VerticalStrip direction="up"   side="right" items={items} size={72} speed={0.4} />
      <VerticalStrip direction="down" side="left"  items={items} size={72} speed={0.4} />
    </>
  );
}
