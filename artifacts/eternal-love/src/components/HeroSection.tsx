import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      {/* Radial glow behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,215,0,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Decorative top ornament */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-6"
        style={{ color: "#da70d6", textShadow: "0 0 16px #da70d688", letterSpacing: "0.5em", fontSize: "1.1rem" }}
      >
        ✦ ✦ ✦
      </motion.div>

      {/* Names */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-4"
        style={{ animation: "name-float 5s ease-in-out infinite" }}
      >
        <style>{`
          @keyframes name-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
        <h1
          style={{
            fontSize: "clamp(2.8rem, 9vw, 6rem)",
            fontFamily: "'Amiri', serif",
            fontWeight: 700,
            background:
              "linear-gradient(90deg, #DAA520 0%, #FFD700 25%, #FFFACD 50%, #FFD700 75%, #DAA520 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer-text 4s linear infinite",
            letterSpacing: "0.05em",
          }}
        >
          أميرة & علاء
        </h1>
        <style>{`
          @keyframes shimmer-text {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </motion.div>

      {/* Date */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg mb-3 tracking-widest"
        style={{
          color: "#da70d6",
          textShadow: "0 0 16px #da70d688, 0 0 32px #da70d644",
          letterSpacing: "0.2em",
          animation: "neon-pulse-purple 3s ease-in-out infinite",
        }}
      >
        <style>{`
          @keyframes neon-pulse-purple {
            0%, 100% { text-shadow: 0 0 8px #da70d6, 0 0 16px #da70d688, 0 0 32px #7b1fa244; }
            50% { text-shadow: 0 0 4px #da70d6, 0 0 8px #da70d688; }
          }
        `}</style>
        ✦ ١٤ مايو ٢٠٢٦ ✦
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-base tracking-[0.3em]"
        style={{
          color: "#00e5ff",
          textShadow: "0 0 12px #00e5ff88",
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 300,
        }}
      >
        Celebration — احتفال
      </motion.p>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-8"
        style={{ color: "#da70d6", opacity: 0.5, letterSpacing: "0.5em", fontSize: "1.1rem" }}
      >
        ✦ ✦ ✦
      </motion.div>
    </section>
  );
}
