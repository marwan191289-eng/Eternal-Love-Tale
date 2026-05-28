import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function SiteHeader() {
  const { lang, setLang, t, dir } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(5, 3, 15, 0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,215,0,0.14)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,215,0,0.04)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #FFD700 20%, #da70d6 50%, #00e5ff 80%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between" dir={dir}>
        {/* Logo / Names */}
        <motion.div
          initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <span style={{ fontSize: "1.4rem" }}>💍</span>
          <div>
            <h1
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "1.3rem",
                background: "linear-gradient(90deg, #DAA520, #FFD700, #FFFACD, #FFD700, #DAA520)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 4s linear infinite",
                letterSpacing: "0.04em",
              }}
            >
              {lang === "ar" ? "أميرة & علاء" : "Amira & Alaa"}
            </h1>
            <p
              className="text-xs tracking-widest"
              style={{ color: "rgba(218,112,214,0.7)", fontFamily: "'Cairo', sans-serif" }}
            >
              {lang === "ar" ? "١٤ مايو ٢٠٢٦" : "May 14, 2026"}
            </p>
          </div>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {[
            { key: "hero", label: lang === "ar" ? "الرئيسية" : "Home" },
            { key: "celebration-section", label: lang === "ar" ? "الاحتفال" : "Celebration" },
            { key: "messages-section", label: lang === "ar" ? "الرسائل" : "Messages" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.key)}
              className="text-sm px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                color: "rgba(255,215,0,0.65)",
                fontFamily: "'Cairo', sans-serif",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#FFD700";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,215,0,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(255,215,0,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,215,0,0.65)";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,188,212,0.18))",
              border: "1px solid rgba(0,229,255,0.4)",
              color: "#00e5ff",
              fontFamily: "'Cairo', sans-serif",
              boxShadow: "0 0 12px rgba(0,229,255,0.15)",
              textShadow: "0 0 8px rgba(0,229,255,0.6)",
              letterSpacing: "0.1em",
            }}
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>

          {/* Admin link */}
          <a
            href="/admin"
            className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {lang === "ar" ? "الإدارة" : "Admin"}
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Language toggle mobile */}
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
            className="p-2 rounded-lg"
            style={{ color: "#FFD700" }}
          >
            <span style={{ fontSize: "1.2rem" }}>{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t px-4 py-3 space-y-2"
            style={{
              borderColor: "rgba(255,215,0,0.12)",
              background: "rgba(5,3,15,0.96)",
            }}
            dir={dir}
          >
            {[
              { key: "hero", label: lang === "ar" ? "الرئيسية" : "Home" },
              { key: "celebration-section", label: lang === "ar" ? "الاحتفال" : "Celebration" },
              { key: "messages-section", label: lang === "ar" ? "الرسائل" : "Messages" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.key)}
                className="block w-full text-start py-2 px-3 rounded-lg text-sm"
                style={{
                  color: "rgba(255,215,0,0.7)",
                  fontFamily: "'Cairo', sans-serif",
                  background: "rgba(255,215,0,0.04)",
                }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/admin"
              className="block text-center py-2 px-3 rounded-lg text-xs"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              {lang === "ar" ? "الإدارة" : "Admin"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
