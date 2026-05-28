import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function DevCard() {
  const { lang, t, dir } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="my-10 flex justify-center"
      dir={dir}
    >
      <div
        className="relative rounded-3xl overflow-hidden max-w-sm w-full"
        style={{
          background: "linear-gradient(135deg, rgba(5,3,15,0.95) 0%, rgba(12,8,30,0.9) 100%)",
          border: "1px solid rgba(255,215,0,0.25)",
          boxShadow: "0 0 40px rgba(255,215,0,0.08), 0 0 80px rgba(224,64,251,0.06), inset 0 0 40px rgba(255,215,0,0.02)",
        }}
      >
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #FFD700 30%, #e040fb 70%, transparent 100%)",
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,215,0,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative p-6 text-center">
          {/* DEV Badge */}
          <div className="flex justify-center mb-4">
            <span
              className="px-4 py-1 rounded-full text-xs font-bold tracking-[0.25em] uppercase"
              style={{
                background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(218,165,32,0.2))",
                border: "1px solid rgba(255,215,0,0.4)",
                color: "#FFD700",
                textShadow: "0 0 8px rgba(255,215,0,0.5)",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "0 0 16px rgba(255,215,0,0.1)",
              }}
            >
              ⌨ DEV
            </span>
          </div>

          {/* Avatar ring */}
          <div className="relative mx-auto mb-4 w-20 h-20 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(255,215,0,0.35)",
                animation: "ring-spin-cw 8s linear infinite",
              }}
            />
            <div
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(224,64,251,0.25)",
                animation: "ring-spin-ccw 5s linear infinite",
              }}
            />
            <span style={{ fontSize: "2.2rem", position: "relative", zIndex: 2 }}>👨‍💻</span>
          </div>

          {/* Name */}
          <h3
            className="text-xl font-bold mb-1"
            style={{
              fontFamily: "'Cairo', sans-serif",
              background: "linear-gradient(90deg, #DAA520, #FFD700, #FFFACD, #FFD700, #DAA520)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-text 4s linear infinite",
              letterSpacing: "0.05em",
            }}
          >
            Marwan Negm
          </h3>

          {/* Role */}
          <p
            className="text-sm mb-5"
            style={{ color: "rgba(224,64,251,0.7)", fontFamily: "'Cairo', sans-serif", letterSpacing: "0.08em" }}
          >
            {lang === "ar" ? "مطوّر متكامل" : "Full Stack Developer"}
          </p>

          {/* Skills row */}
          <div className="flex justify-center gap-2 flex-wrap mb-5">
            {["React", "TypeScript", "Node.js", "UI/UX"].map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-full text-xs"
                style={{
                  background: "rgba(255,215,0,0.06)",
                  border: "1px solid rgba(255,215,0,0.15)",
                  color: "rgba(255,215,0,0.55)",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            className="text-xs leading-relaxed mb-4"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "inherit",
              lineHeight: "1.9",
              textAlign: "center",
            }}
          >
            {lang === "ar"
              ? "هذا الموقع صُمِّم وطُوِّر بالكامل كهديّة خاصة من القلب"
              : "This website was fully designed & developed as a heartfelt personal gift"}
          </p>

          {/* Bottom accent */}
          <div
            className="mt-4 pt-4 flex items-center justify-center gap-2"
            style={{ borderTop: "1px solid rgba(255,215,0,0.08)" }}
          >
            <span style={{ fontSize: "0.7rem", color: "rgba(255,215,0,0.4)" }}>★ Made with</span>
            <span style={{ fontSize: "0.85rem" }}>💛</span>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,215,0,0.4)" }}>& code</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.2) 50%, transparent 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
