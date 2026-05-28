import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useAppStore } from "@/store/appStore";
import { LOGO_IMG } from "@/data/defaultAssets";

export default function SiteHeader() {
  const { lang, setLang, dir } = useLang();
  const { logoUrl } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayLogo = logoUrl || LOGO_IMG;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { key: "hero", label: lang === "ar" ? "الرئيسية" : "Home" },
    { key: "gallery-section", label: lang === "ar" ? "المعرض" : "Gallery" },
    { key: "celebration-section", label: lang === "ar" ? "الاحتفال" : "Celebration" },
    { key: "messages-section", label: lang === "ar" ? "الرسائل" : "Messages" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background:
          "linear-gradient(180deg, rgba(2,5,0,0.94), rgba(5,3,15,0.82)), radial-gradient(ellipse at 50% 0%, rgba(200,255,0,0.11), transparent 62%)",
        backdropFilter: "blur(26px)",
        borderBottom: "1px solid rgba(200,255,0,0.16)",
        boxShadow: "0 10px 42px rgba(0,0,0,0.54), 0 0 32px rgba(200,255,0,0.045)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #C8FF00 16%, #FFD700 38%, #da70d6 58%, #00e5ff 82%, transparent 100%)",
          backgroundSize: "220% 100%",
          animation: "premium-border-flow 8s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.32), transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between" dir={dir}>
        <motion.div
          initial={{ opacity: 0, x: dir === "rtl" ? 24 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="flex items-center gap-3 min-w-0"
        >
          <motion.div
            className="relative flex-shrink-0 rounded-2xl p-1"
            whileHover={{ scale: 1.05 }}
            style={{
              background: "linear-gradient(135deg, rgba(200,255,0,0.13), rgba(255,215,0,0.055))",
              border: "1px solid rgba(200,255,0,0.18)",
              boxShadow: "0 0 22px rgba(200,255,0,0.16), inset 0 0 16px rgba(255,255,255,0.035)",
            }}
          >
            <div className="absolute -inset-2 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,255,0,0.18), transparent 60%)", animation: "neon-drift 4.6s ease-in-out infinite" }} />
            <img
              src={displayLogo}
              alt="شعار أميرة وعلاء"
              className="relative object-contain rounded-xl"
              style={{
                height: "48px",
                width: "auto",
                filter: "drop-shadow(0 0 10px rgba(200,255,0,0.45)) drop-shadow(0 0 20px rgba(255,215,0,0.22))",
              }}
            />
          </motion.div>
          <div className="min-w-0">
            <h1
              className="font-bold leading-tight truncate"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "clamp(1.08rem, 2.8vw, 1.35rem)",
                background: "linear-gradient(90deg, #AADD00, #C8FF00, #FFFDE7, #FFD700, #C8FF00)",
                backgroundSize: "240% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 5s linear infinite",
                letterSpacing: lang === "ar" ? "0" : "0.04em",
              }}
            >
              {lang === "ar" ? "أميرة & علاء" : "Amira & Alaa"}
            </h1>
            <p className="text-[11px] tracking-widest truncate" style={{ color: "rgba(200,255,0,0.58)", fontFamily: "'Cairo', sans-serif" }}>
              {lang === "ar" ? "١٤ مايو ٢٠٢٦ • حكاية مضيئة" : "May 14, 2026 • A luminous tale"}
            </p>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-2 p-1 rounded-full" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(200,255,0,0.10)" }}>
          {navItems.map((item) => (
            <motion.button
              key={item.key}
              onClick={() => scrollTo(item.key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm px-3.5 py-2 rounded-full transition-all duration-200"
              style={{
                color: "rgba(200,255,0,0.72)",
                fontFamily: "'Cairo', sans-serif",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#C8FF00";
                el.style.borderColor = "rgba(200,255,0,0.42)";
                el.style.background = "rgba(200,255,0,0.09)";
                el.style.boxShadow = "0 0 16px rgba(200,255,0,0.17), inset 0 0 12px rgba(200,255,0,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(200,255,0,0.72)";
                el.style.borderColor = "transparent";
                el.style.background = "transparent";
                el.style.boxShadow = "none";
              }}
            >
              {item.label}
            </motion.button>
          ))}

          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="px-3.5 py-2 rounded-full text-sm font-black transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(0,229,255,0.14), rgba(0,188,212,0.22))",
              border: "1px solid rgba(0,229,255,0.45)",
              color: "#00e5ff",
              fontFamily: "'Cairo', sans-serif",
              boxShadow: "0 0 14px rgba(0,229,255,0.18)",
              textShadow: "0 0 8px rgba(0,229,255,0.65)",
              letterSpacing: "0.1em",
            }}
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>

          <a
            href="/admin"
            className="px-3.5 py-2 rounded-full text-xs transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.38)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {lang === "ar" ? "الإدارة" : "Admin"}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="px-3 py-1.5 rounded-full text-sm font-bold"
            style={{
              background: "rgba(0,229,255,0.12)",
              border: "1px solid rgba(0,229,255,0.35)",
              color: "#00e5ff",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl"
            style={{ color: "#C8FF00", border: "1px solid rgba(200,255,0,0.20)", background: "rgba(200,255,0,0.055)" }}
          >
            <span style={{ fontSize: "1.25rem" }}>{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t px-4 py-3 space-y-2"
            style={{
              borderColor: "rgba(200,255,0,0.13)",
              background: "rgba(5,3,15,0.98)",
            }}
            dir={dir}
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.key)}
                className="block w-full text-start py-2.5 px-3 rounded-xl text-sm"
                style={{
                  color: "rgba(200,255,0,0.8)",
                  fontFamily: "'Cairo', sans-serif",
                  background: "rgba(200,255,0,0.055)",
                  border: "1px solid rgba(200,255,0,0.11)",
                }}
              >
                {item.label}
              </button>
            ))}
            <a href="/admin" className="block text-center py-2 px-3 rounded-lg text-xs" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Cairo', sans-serif" }}>
              {lang === "ar" ? "الإدارة" : "Admin"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
