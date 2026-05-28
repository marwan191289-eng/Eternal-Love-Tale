import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function SiteFooter() {
  const { lang, t, dir } = useLang();

  const footerCards = [
    {
      icon: "💛",
      color: "#FFD700",
      text: lang === "ar" ? "يوم يُكتب بحروف من الذهب" : "A day written in letters of gold",
    },
    {
      icon: "💍",
      color: "#da70d6",
      text: lang === "ar" ? "لحظة تبقى في القلوب إلى الأبد" : "A moment that lives in hearts forever",
    },
    {
      icon: "✨",
      color: "#00e5ff",
      text: lang === "ar" ? "حكاية تبدأ… وتستمر إلى الأبد" : "A story that begins… and never ends",
    },
  ];

  return (
    <footer className="relative mt-28 pb-10 pt-20 overflow-hidden" style={{ direction: dir }}>
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(5,3,15,0.70))" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 105%, rgba(200,255,0,0.10) 0%, transparent 70%), radial-gradient(ellipse 34% 20% at 18% 80%, rgba(0,229,255,0.055), transparent 70%), radial-gradient(ellipse 34% 20% at 82% 78%, rgba(218,112,214,0.055), transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.35, ease: "easeOut" }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(200,255,0,0.42), rgba(255,215,0,0.18))" }} />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full" style={{ border: "1px solid rgba(200,255,0,0.22)", boxShadow: "0 0 26px rgba(200,255,0,0.12), inset 0 0 20px rgba(200,255,0,0.035)" }}>
            <div className="absolute inset-1 rounded-full" style={{ border: "1px solid rgba(0,229,255,0.12)", animation: "soft-orbit 14s linear infinite" }} />
            <span style={{ color: "rgba(200,255,0,0.80)", fontSize: "1.35rem", textShadow: "0 0 14px rgba(200,255,0,0.48)" }}>✦</span>
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(200,255,0,0.42), rgba(255,215,0,0.18))" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="mb-7"
        >
          <h2
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: "clamp(2rem, 5.6vw, 3.55rem)",
              background: "linear-gradient(90deg, #AADD00 0%, #C8FF00 22%, #FFFDE7 48%, #FFD700 70%, #C8FF00 100%)",
              backgroundSize: "240% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-text 5s linear infinite",
              filter: "drop-shadow(0 0 18px rgba(200,255,0,0.16))",
            }}
          >
            {lang === "ar" ? "أميرة & علاء" : "Amira & Alaa"}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.85 }}
          className="mb-3 text-base md:text-xl mx-auto max-w-3xl premium-text-justify"
          style={{
            color: "rgba(255,235,170,0.62)",
            fontFamily: "'Amiri', serif",
            lineHeight: "2.15",
            textShadow: "0 0 22px rgba(255,215,0,0.20)",
          }}
        >
          {t("footer.blessing")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.85 }}
          className="mb-11 text-sm tracking-[0.24em]"
          style={{ color: "rgba(200,255,0,0.45)", fontFamily: "'Cairo', sans-serif" }}
        >
          {t("footer.date")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.42, duration: 0.85 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
        >
          {footerCards.map((card, index) => (
            <motion.div
              key={card.color}
              whileHover={{ y: -6, scale: 1.018 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="premium-glass luxury-sheen rounded-3xl p-6"
              style={{ borderColor: `${card.color}35`, boxShadow: `0 18px 55px rgba(0,0,0,0.36), 0 0 28px ${card.color}12, inset 0 1px 0 rgba(255,255,255,0.05)` }}
            >
              <motion.p
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.4 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: `${card.color}AA`, fontSize: "1.75rem", marginBottom: "0.8rem", textShadow: `0 0 18px ${card.color}55` }}
              >
                {card.icon}
              </motion.p>
              <p className="text-sm md:text-base premium-text-justify" style={{ color: "rgba(255,255,255,0.48)", fontFamily: "'Cairo', sans-serif", lineHeight: "2" }}>
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="premium-glass rounded-2xl px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(200,255,0,0.13)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Cairo', sans-serif" }}>
            © 2026 {t("footer.rights")}
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Cairo', sans-serif" }}>
            {t("footer.dev")}
            <span className="font-bold" style={{ color: "rgba(200,255,0,0.62)", textShadow: "0 0 10px rgba(200,255,0,0.25)" }}>
              Marwan Negm
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
