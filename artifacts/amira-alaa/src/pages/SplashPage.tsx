import { motion } from "framer-motion";
import Fireworks from "@/components/Fireworks";

interface SplashPageProps {
  onEnter: () => void;
}

export default function SplashPage({ onEnter }: SplashPageProps) {
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
        @keyframes name-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.01); }
        }
        @keyframes ring-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ring-spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes shimmer-splash {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 17 + 3) % 100}%`,
              width: `${0.5 + (i % 3) * 0.7}px`,
              height: `${0.5 + (i % 3) * 0.7}px`,
              background: `rgba(255,255,255,${0.3 + (i % 4) * 0.15})`,
              animation: `twinkle ${2 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.13) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Fireworks canvas layer */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <Fireworks active={true} />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative text-center px-6 max-w-3xl mx-auto"
        style={{ zIndex: 10 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative ring */}
        <div className="relative mx-auto mb-8 w-28 h-28 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid #ffd70055",
              animation: "ring-spin-cw 8s linear infinite",
            }}
          />
          <div
            className="absolute inset-3 rounded-full"
            style={{
              border: "1px solid #da70d644",
              animation: "ring-spin-ccw 5s linear infinite",
            }}
          />
          <div
            className="absolute inset-6 rounded-full"
            style={{
              border: "1px solid #00e5ff33",
              animation: "ring-spin-cw 3s linear infinite",
            }}
          />
          <span style={{ fontSize: "2.5rem", position: "relative", zIndex: 2 }}>💍</span>
        </div>

        {/* Main names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-5"
        >
          <h1
            style={{
              fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
              fontFamily: "'Amiri', serif",
              fontWeight: 700,
              background: "linear-gradient(90deg, #DAA520 0%, #FFD700 25%, #FFFACD 50%, #FFD700 75%, #DAA520 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-splash 4s linear infinite, name-float 5s ease-in-out infinite",
              letterSpacing: "0.04em",
            }}
          >
            أميرة & علاء
          </h1>
        </motion.div>

        {/* Date line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-2 text-lg tracking-widest"
          style={{
            color: "#da70d6",
            textShadow: "0 0 16px #da70d688, 0 0 32px #da70d644",
            fontFamily: "'Cairo', sans-serif",
            letterSpacing: "0.2em",
          }}
        >
          ✦ ١٤ مايو ٢٠٢٦ ✦
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-10 text-base tracking-[0.25em]"
          style={{ color: "#00e5ff88", fontFamily: "'Cairo', sans-serif", fontWeight: 300 }}
        >
          Celebration — احتفال
        </motion.p>

        {/* Enter button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          onClick={onEnter}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="relative px-12 py-4 rounded-full text-lg font-semibold cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(184,134,11,0.18))",
            border: "1px solid rgba(255,215,0,0.55)",
            color: "#FFD700",
            boxShadow: "0 0 28px rgba(255,215,0,0.22), 0 0 70px rgba(255,215,0,0.08), inset 0 0 24px rgba(255,215,0,0.04)",
            fontFamily: "'Cairo', sans-serif",
            letterSpacing: "0.1em",
            textShadow: "0 0 14px #ffd700, 0 0 28px #ffd70066",
          }}
        >
          ✨ ادخل إلى الاحتفال ✨
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-8 text-sm"
          style={{ color: "#ffffff60", fontFamily: "'Cairo', sans-serif" }}
        >
          أو اضغط في أي مكان للدخول
        </motion.p>
      </motion.div>
    </div>
  );
}
