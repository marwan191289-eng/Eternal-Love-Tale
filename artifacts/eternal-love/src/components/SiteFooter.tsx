import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function SiteFooter() {
  const { lang, t, dir } = useLang();

  return (
    <footer
      className="relative mt-24 pb-8 pt-16 overflow-hidden"
      style={{ direction: dir }}
    >
      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(5,3,15,0.6))" }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,215,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Ornament divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,215,0,0.4))" }} />
          <div className="flex items-center gap-2">
            <span style={{ color: "rgba(218,112,214,0.6)", fontSize: "0.8rem" }}>✦</span>
            <span style={{ color: "rgba(255,215,0,0.7)", fontSize: "1.2rem" }}>✦</span>
            <span style={{ color: "rgba(218,112,214,0.6)", fontSize: "0.8rem" }}>✦</span>
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,215,0,0.4))" }} />
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h2
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              background: "linear-gradient(90deg, #DAA520 0%, #FFD700 30%, #FFFACD 50%, #FFD700 70%, #DAA520 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-text 4s linear infinite",
              opacity: 0.85,
            }}
          >
            {lang === "ar" ? "أميرة & علاء" : "Amira & Alaa"}
          </h2>
        </motion.div>

        {/* Blessing */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-3 text-base md:text-lg"
          style={{
            color: "rgba(255,215,0,0.5)",
            fontFamily: "'Amiri', serif",
            lineHeight: "2",
            textShadow: "0 0 20px rgba(255,215,0,0.2)",
          }}
        >
          {t("footer.blessing")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mb-10 text-sm tracking-widest"
          style={{ color: "rgba(218,112,214,0.45)", fontFamily: "'Cairo', sans-serif", letterSpacing: "0.2em" }}
        >
          {t("footer.date")}
        </motion.p>

        {/* Three columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {/* Column 1 — Hearts */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,215,0,0.03)",
              border: "1px solid rgba(255,215,0,0.1)",
            }}
          >
            <p style={{ color: "#FFD70055", fontSize: "1.5rem", marginBottom: "0.5rem" }}>💛</p>
            <p
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Cairo', sans-serif", lineHeight: "1.8" }}
            >
              {lang === "ar"
                ? "يوم يُكتب بحروف من الذهب"
                : "A day written in letters of gold"}
            </p>
          </div>

          {/* Column 2 — Rings */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(218,112,214,0.03)",
              border: "1px solid rgba(218,112,214,0.1)",
            }}
          >
            <p style={{ color: "#da70d655", fontSize: "1.5rem", marginBottom: "0.5rem" }}>💍</p>
            <p
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Cairo', sans-serif", lineHeight: "1.8" }}
            >
              {lang === "ar"
                ? "لحظة تبقى في القلوب إلى الأبد"
                : "A moment that lives in hearts forever"}
            </p>
          </div>

          {/* Column 3 — Stars */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(0,229,255,0.03)",
              border: "1px solid rgba(0,229,255,0.1)",
            }}
          >
            <p style={{ color: "#00e5ff55", fontSize: "1.5rem", marginBottom: "0.5rem" }}>✨</p>
            <p
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Cairo', sans-serif", lineHeight: "1.8" }}
            >
              {lang === "ar"
                ? "حكاية تبدأ… وتستمر إلى الأبد"
                : "A story that begins… and never ends"}
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,215,0,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Cairo', sans-serif" }}>
            © 2026 {t("footer.rights")}
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Cairo', sans-serif" }}>
            {t("footer.dev")}
            <span
              className="font-bold"
              style={{
                color: "rgba(255,215,0,0.45)",
                textShadow: "0 0 8px rgba(255,215,0,0.2)",
              }}
            >
              Marwan Negm
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
