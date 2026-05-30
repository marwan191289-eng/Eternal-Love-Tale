import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Fireworks from "@/components/Fireworks";
import { useLang } from "@/context/LangContext";
import { useAppStore } from "@/store/appStore";
import { LOGO_IMG } from "@/data/defaultAssets";

interface SplashPageProps {
  onEnter: () => void;
}

function TypewriterNames() {
  const { lang } = useLang();
  const fullText = lang === "ar" ? "أميرة & علاء" : "Amira & Alaa";
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { setDisplayed(""); setIdx(0); setDone(false); }, [lang]);

  useEffect(() => {
    if (idx < fullText.length) {
      const t = setTimeout(() => { setDisplayed(fullText.slice(0, idx + 1)); setIdx((i) => i + 1); }, 110);
      return () => clearTimeout(t);
    } else {
      setDone(true);
      return undefined;
    }
  }, [idx, fullText]);

  return (
    <div className="relative inline-block">
      <style>{`
        @keyframes cursor-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes lime-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(200,255,0,0.9), 0 0 40px rgba(200,255,0,0.5), 0 0 80px rgba(200,255,0,0.2); }
          50% { text-shadow: 0 0 30px rgba(200,255,0,1), 0 0 60px rgba(200,255,0,0.7), 0 0 120px rgba(200,255,0,0.3); }
        }
      `}</style>
      <h1 style={{
        fontSize: "clamp(3.4rem, 11vw, 7.2rem)",
        fontFamily: "'Amiri', serif",
        fontWeight: 700,
        color: "#C8FF00",
        animation: "lime-glow 2.5s ease-in-out infinite",
        letterSpacing: lang === "ar" ? "0" : "0.04em",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}>
        {displayed}
        {!done && (
          <span style={{
            display: "inline-block", width: "3px", height: "0.85em",
            background: "#C8FF00", verticalAlign: "middle", marginInlineStart: "4px",
            boxShadow: "0 0 8px #C8FF00", animation: "cursor-blink 0.7s infinite",
          }} />
        )}
      </h1>
    </div>
  );
}

export default function SplashPage({ onEnter }: SplashPageProps) {
  const { lang, setLang } = useLang();
  const { logoUrl } = useAppStore();
  const displayLogo = logoUrl || LOGO_IMG;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      style={{ background: "radial-gradient(ellipse at center, #080c00 0%, #030600 55%, #000000 100%)" }}
      onClick={onEnter}
    >
      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes ring-spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);   } }
        @keyframes ring-spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg);  } }
        @keyframes quran-glow {
          0%, 100% { text-shadow: 0 0 16px rgba(200,255,0,0.45), 0 0 32px rgba(200,255,0,0.2); }
          50%       { text-shadow: 0 0 28px rgba(200,255,0,0.75), 0 0 56px rgba(200,255,0,0.35); }
        }
        @keyframes float-soft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes shimmer-text { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        @keyframes logo-pulse { 0%, 100% { filter: drop-shadow(0 0 12px rgba(200,255,0,0.6)) drop-shadow(0 0 24px rgba(200,255,0,0.3)); } 50% { filter: drop-shadow(0 0 20px rgba(200,255,0,0.9)) drop-shadow(0 0 40px rgba(200,255,0,0.5)); } }
      `}</style>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {Array.from({ length: 130 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            left: `${(i * 13 + 7) % 100}%`,
            top: `${(i * 17 + 3) % 100}%`,
            width: `${0.5 + (i % 3) * 0.7}px`,
            height: `${0.5 + (i % 3) * 0.7}px`,
            background: i % 5 === 0 ? `rgba(200,255,0,${0.3 + (i % 3) * 0.2})` : `rgba(255,255,255,${0.2 + (i % 4) * 0.1})`,
            animation: `twinkle ${2 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.13) % 3}s`,
          }} />
        ))}
      </div>

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
        onClick={(e) => { e.stopPropagation(); setLang(lang === "ar" ? "en" : "ar"); }}
      >
        {lang === "ar" ? "EN" : "عربي"}
      </button>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative text-center px-4 sm:px-6 max-w-4xl mx-auto"
        style={{ zIndex: 10 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Quran verse */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.2 }} className="mb-5 sm:mb-7">
          <div className="relative rounded-2xl px-6 py-5 mx-auto max-w-lg" style={{
            background: "rgba(200,255,0,0.04)",
            border: "1px solid rgba(200,255,0,0.18)",
            boxShadow: "0 0 32px rgba(200,255,0,0.06)",
          }}>
            <div className="flex justify-center mb-3">
              <span style={{ color: "rgba(200,255,0,0.5)", fontSize: "1rem", letterSpacing: "0.5em" }}>❖ ✦ ❖</span>
            </div>
            <p style={{
              fontFamily: "'Amiri', serif",
              fontSize: "clamp(1.05rem, 2.4vw, 1.55rem)",
              color: "rgba(200,255,0,0.85)",
              lineHeight: "2",
              animation: "quran-glow 3s ease-in-out infinite",
              textAlign: "center",
            }}>
              {lang === "ar"
                ? "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴾"
                : "﴿ And of His signs is that He created for you from yourselves mates that you may find tranquility in them ﴾"}
            </p>
            <p className="mt-2 text-xs tracking-widest" style={{
              color: "rgba(200,255,0,0.4)",
              fontFamily: "'Cairo', sans-serif",
              letterSpacing: "0.15em",
              textAlign: "center",
            }}>
              {lang === "ar" ? "سورة الروم — الآية ٢١" : "Surah Ar-Rum — Verse 21"}
            </p>
            <div className="flex justify-center mt-3">
              <span style={{ color: "rgba(200,255,0,0.5)", fontSize: "1rem", letterSpacing: "0.5em" }}>❖ ✦ ❖</span>
            </div>
          </div>
        </motion.div>

        {/* Logo + spinning rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative mx-auto mb-5 sm:mb-7 flex items-center justify-center"
          style={{ width: "clamp(330px, 46vw, 520px)", height: "clamp(330px, 46vw, 520px)" }}
        >
          <div className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(200,255,0,0.35)", animation: "ring-spin-cw 10s linear infinite" }} />
          <div className="absolute inset-4 rounded-full" style={{ border: "1.5px solid rgba(200,255,0,0.2)", animation: "ring-spin-ccw 6s linear infinite" }} />
          <div className="absolute inset-8 rounded-full" style={{ border: "1px solid rgba(0,229,255,0.18)", animation: "ring-spin-cw 4s linear infinite" }} />
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(200,255,0,0.06) 0%, transparent 70%)" }} />
          <img
            src={displayLogo}
            alt="شعار"
            style={{
              height: "clamp(260px, 36vw, 430px)",
              width: "auto",
              objectFit: "contain",
              position: "relative",
              zIndex: 2,
              animation: "logo-pulse 3s ease-in-out infinite, float-soft 4s ease-in-out infinite",
            }}
          />
        </motion.div>

        {/* Typewriter names */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="mb-4" style={{ animation: "float-soft 5s ease-in-out infinite" }}>
          <TypewriterNames />
        </motion.div>

        {/* Date */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mb-2 text-lg tracking-widest" style={{
          color: "#C8FF00",
          opacity: 0.8,
          textShadow: "0 0 16px rgba(200,255,0,0.7), 0 0 32px rgba(200,255,0,0.3)",
          fontFamily: "'Cairo', sans-serif",
          letterSpacing: "0.2em",
        }}>
          {lang === "ar" ? "✦ ١٤ مايو ٢٠٢٦ ✦" : "✦ May 14, 2026 ✦"}
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }} className="mb-8 text-sm tracking-[0.2em]" style={{ color: "rgba(200,255,0,0.4)", fontFamily: "'Cairo', sans-serif", fontWeight: 300 }}>
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
            background: "linear-gradient(135deg, rgba(200,255,0,0.12), rgba(170,220,0,0.18))",
            border: "1px solid rgba(200,255,0,0.55)",
            color: "#C8FF00",
            boxShadow: "0 0 32px rgba(200,255,0,0.22), 0 0 72px rgba(200,255,0,0.08), inset 0 0 28px rgba(200,255,0,0.04)",
            fontFamily: "'Cairo', sans-serif",
            letterSpacing: "0.1em",
            textShadow: "0 0 14px #C8FF00, 0 0 28px rgba(200,255,0,0.5)",
          }}
        >
          {lang === "ar" ? "✨ ادخل إلى الاحتفال ✨" : "✨ Enter the Celebration ✨"}
        </motion.button>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2, duration: 0.8 }} className="mt-6 text-sm" style={{ color: "#ffffff60", fontFamily: "'Cairo', sans-serif" }}>
          {lang === "ar" ? "أو اضغط في أي مكان للدخول" : "Or click anywhere to enter"}
        </motion.p>
      </motion.div>
    </div>
  );
}
