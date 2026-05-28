import { Lock } from "lucide-react";

export function LockedPage() {
  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center text-center px-6"
      dir="rtl"
      style={{
        background: "radial-gradient(ellipse at center, #1a0b14 0%, #0a0408 80%)",
      }}
    >
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="star"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="relative max-w-md w-full">
        {/* Lock icon */}
        <div
          className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            border: "1px solid oklch(0.82 0.13 75 / 0.3)",
            background: "oklch(0.82 0.13 75 / 0.08)",
            boxShadow: "0 0 40px oklch(0.82 0.13 75 / 0.2)",
          }}
        >
          <Lock size={36} style={{ color: "oklch(0.82 0.13 75)" }} />
        </div>

        <div
          className="rounded-3xl p-8 md:p-12"
          style={{
            border: "1px solid oklch(0.82 0.13 75 / 0.25)",
            background: "oklch(0.21 0.055 23 / 0.80)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 30px 80px -20px oklch(0.82 0.13 75 / 0.15)",
          }}
        >
          <h1
            className="font-display-ar text-4xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, oklch(0.91 0.10 82), oklch(0.82 0.13 75))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            أميرة  ❦  علاء
          </h1>

          <div
            className="my-5 h-px w-24 mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.13 75), transparent)" }}
          />

          <p
            className="font-body-ar text-xl leading-relaxed mb-6"
            style={{ color: "oklch(0.92 0.04 62 / 0.85)" }}
          >
            الموقع مغلق مؤقتاً
          </p>
          <p
            className="font-body-ar text-base leading-relaxed"
            style={{ color: "oklch(0.78 0.055 70)" }}
          >
            هذا الموقع غير متاح في الوقت الحالي، يُرجى العودة لاحقاً.
          </p>

          <p
            className="mt-8 font-display tracking-[0.4em] text-[10px] uppercase"
            style={{ color: "oklch(0.82 0.13 75 / 0.4)" }}
          >
            ETERNAL LOVE · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
