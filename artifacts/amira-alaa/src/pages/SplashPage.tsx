import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Fireworks from "@/components/Fireworks";
import { useLang } from "@/context/LangContext";

interface SplashPageProps {
  onEnter: () => void;
}

function TypewriterNames() {
  const { lang } = useLang();
  const fullText = lang === "ar" ? "أميرة & علاء" : "Amira & Alaa";
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
    setDone(false);
  }, [lang]);

  useEffect(() => {
    if (idx < fullText.length) {
      const t = setTimeout(() => {
        setDisplayed(fullText.slice(0, idx + 1));
        setIdx((i) => i + 1);
      }, 110);
      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [idx, fullText]);

  return (
    <div className="relative inline-block">
      <style>{`
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      <h1
        style={{
          fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
          fontFamily: "'Amiri', serif",
          fontWeight: 700,
          color: "#FFD700",
          textShadow:
            "0 0 20px rgba(255,215,0,0.9), 0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(255,215,0,0.2)",
          letterSpacing: lang === "ar" ? "0" : "0.04em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {displayed}
        {!done && (
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "0.85em",
              background: "#FFD700",
              verticalAlign: "middle",
              marginInlineStart: "4px",
              boxShadow: "0 0 8px #FFD700",
              animation: "cursor-blink 0.7s infinite",
            }}
          />
        )}
      </h1>
      {done && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 30% at 50% 80%, rgba(255,215,0,0.18) 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

export default function SplashPage({ onEnter }: SplashPageProps) {
  const { lang, setLang } = useLang();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      style={{
        background: "radial-gradient(ellipse at center, #0d0b1e 0%, #05030f 60%, #000008 100%)",
      }}
      onClick={onEnter}
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes ring-spin-cw  { from { transform: rotate(0deg); }   to { transform: rotate(360deg);  } }
        @keyframes ring-spin-ccw { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        @keyframes quran-glow {
          0%, 100% { text-shadow: 0 0 16px rgba(218,112,214,0.5), 0 0 32px rgba(218,112,214,0.2); }
          50%       { text-shadow: 0 0 28px rgba(218,112,214,0.8), 0 0 56px rgba(218,112,214,0.35); }
        }
        @keyframes float-soft {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes shimmer-text {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {Array.from({ length: 130 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 17 + 3) % 100}%`,
              width: `${0.5 + (i % 3) * 0.7}px`,
              height: `${0.5 + (i % 3) * 0.7}px`,
              background: `rgba(255,255,255,${0.3 + (i % 4) * 0.12})`,
              animation: `twinkle ${2 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.13) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Fireworks */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <Fireworks active={true} />
      </div>

      {/* Language toggle */}
      <button
        className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-sm font-bold"
        style={{
          background: "rgba(0,229,255,0.1)",
          border: "1px solid rgba(0,229,255,0.35)",
          color: "#00e5ff",
          fontFamily: "'Cairo', sans-serif",
          backdropFilter: "blur(12px)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setLang(lang === "ar" ? "en" : "ar");
        }}
      >
        {lang === "ar" ? "EN" : "عربي"}
      </button>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative text-center px-6 max-w-2xl mx-auto"
        style={{ zIndex: 10 }}
        onClick={(e) => e.stopPropagation()}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Quran verse */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.2 }}
          className="mb-8"
        >
          <div
            className="relative rounded-2xl px-6 py-5 mx-auto max-w-lg"
            style={{
              background: "rgba(218,112,214,0.06)",
              border: "1px solid rgba(218,112,214,0.2)",
              boxShadow: "0 0 32px rgba(218,112,214,0.08)",
            }}
          >
            <div className="flex justify-center mb-3">
              <span style={{ color: "rgba(218,112,214,0.6)", fontSize: "1rem", letterSpacing: "0.5em" }}>
                ❖ ✦ ❖
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "clamp(1rem, 2.8vw, 1.25rem)",
                color: "rgba(218,112,214,0.9)",
                lineHeight: "2",
                animation: "quran-glow 3s ease-in-out infinite",
                textAlign: "center",
              }}
            >
              {lang === "ar"
                ? "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴾"
                : "﴿ And of His signs is that He created for you from yourselves mates that you may find tranquility in them ﴾"}
            </p>
            <p
              className="mt-2 text-xs tracking-widest"
              style={{
                color: "rgba(218,112,214,0.45)",
                fontFamily: "'Cairo', sans-serif",
                letterSpacing: "0.15em",
                textAlign: "center",
              }}
            >
              {lang === "ar" ? "سورة الروم — الآية ٢١" : "Surah Ar-Rum — Verse 21"}
            </p>
            <div className="flex justify-center mt-3">
              <span style={{ color: "rgba(218,112,214,0.6)", fontSize: "1rem", letterSpacing: "0.5em" }}>
                ❖ ✦ ❖
              </span>
            </div>
          </div>
        </motion.div>

        {/* Decorative ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative mx-auto mb-6 w-24 h-24 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(255,215,0,0.45)", animation: "ring-spin-cw 8s linear infinite" }}
          />
          <div
            className="absolute inset-3 rounded-full"
            style={{ border: "1px solid rgba(218,112,214,0.35)", animation: "ring-spin-ccw 5s linear infinite" }}
          />
          <div
            className="absolute inset-6 rounded-full"
            style={{ border: "1px solid rgba(0,229,255,0.25)", animation: "ring-spin-cw 3s linear infinite" }}
          />
          <span style={{ fontSize: "2.4rem", position: "relative", zIndex: 2, animation: "float-soft 4s ease-in-out infinite" }}>💍</span>
        </motion.div>

        {/* Typewriter names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-4"
          style={{ animation: "float-soft 5s ease-in-out infinite" }}
        >
          <TypewriterNames />
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-2 text-lg tracking-widest"
          style={{
            color: "#da70d6",
            textShadow: "0 0 16px #da70d688, 0 0 32px #da70d644",
            fontFamily: "'Cairo', sans-serif",
            letterSpacing: "0.2em",
          }}
        >
          {lang === "ar" ? "✦ ١٤ مايو ٢٠٢٦ ✦" : "✦ May 14, 2026 ✦"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mb-8 text-sm tracking-[0.2em]"
          style={{ color: "#00e5ff88", fontFamily: "'Cairo', sans-serif", fontWeight: 300 }}
        >
          Celebration — احتفال
        </motion.p>

        {/* Enter button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          onClick={onEnter}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-10 py-4 rounded-full text-lg font-semibold cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.13), rgba(184,134,11,0.18))",
            border: "1px solid rgba(255,215,0,0.55)",
            color: "#FFD700",
            boxShadow: "0 0 32px rgba(255,215,0,0.22), 0 0 72px rgba(255,215,0,0.08), inset 0 0 28px rgba(255,215,0,0.04)",
            fontFamily: "'Cairo', sans-serif",
            letterSpacing: "0.1em",
            textShadow: "0 0 14px #ffd700, 0 0 28px #ffd70066",
          }}
        >
          {lang === "ar" ? "✨ ادخل إلى الاحتفال ✨" : "✨ Enter the Celebration ✨"}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-6 text-sm"
          style={{ color: "#ffffff60", fontFamily: "'Cairo', sans-serif" }}
        >
          {lang === "ar" ? "أو اضغط في أي مكان للدخول" : "Or click anywhere to enter"}
        </motion.p>
      </motion.div>
    </div>
  );
}
