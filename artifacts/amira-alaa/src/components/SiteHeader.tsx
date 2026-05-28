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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(5, 3, 15, 0.92)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,215,0,0.12)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,215,0,0.03)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #C8FF00 15%, #FFD700 35%, #da70d6 55%, #00e5ff 80%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between" dir={dir}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: "0 0 20px rgba(200,255,0,0.2), 0 0 40px rgba(200,255,0,0.08)" }}
            />
            <img
              src={displayLogo}
              alt="شعار أميرة وعلاء"
              className="object-contain"
              style={{
                height: "44px",
                width: "auto",
                filter: "drop-shadow(0 0 8px rgba(200,255,0,0.4)) drop-shadow(0 0 16px rgba(255,215,0,0.25))",
              }}
            />
          </div>
          <div>
            <h1
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "1.2rem",
                background: "linear-gradient(90deg, #AADD00, #C8FF00, #FFFDE7, #C8FF00, #AADD00)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 4s linear infinite",
                letterSpacing: lang === "ar" ? "0" : "0.04em",
              }}
            >
              {lang === "ar" ? "أميرة & علاء" : "Amira & Alaa"}
            </h1>
            <p
              className="text-xs tracking-widest"
              style={{ color: "rgba(200,255,0,0.55)", fontFamily: "'Cairo', sans-serif" }}
            >
              {lang === "ar" ? "١٤ مايو ٢٠٢٦" : "May 14, 2026"}
            </p>
          </div>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          {[
            { key: "hero",             label: lang === "ar" ? "الرئيسية"  : "Home"        },
            { key: "gallery-section",  label: lang === "ar" ? "المعرض"    : "Gallery"     },
            { key: "celebration-section", label: lang === "ar" ? "الاحتفال" : "Celebration" },
            { key: "messages-section", label: lang === "ar" ? "الرسائل"   : "Messages"    },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.key)}
              className="text-sm px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                color: "rgba(200,255,0,0.6)",
                fontFamily: "'Cairo', sans-serif",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#C8FF00";
                el.style.borderColor = "rgba(200,255,0,0.3)";
                el.style.background = "rgba(200,255,0,0.06)";
                el.style.boxShadow = "0 0 12px rgba(200,255,0,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(200,255,0,0.6)";
                el.style.borderColor = "transparent";
                el.style.background = "transparent";
                el.style.boxShadow = "none";
              }}
            >
              {item.label}
            </button>
          ))}

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

          <a
            href="/admin"
            className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "'Cairo', sans-serif",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,0.6)";
              el.style.borderColor = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,0.3)";
              el.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            {lang === "ar" ? "الإدارة" : "Admin"}
          </a>
        </nav>

        {/* Mobile */}
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
            className="p-2 rounded-lg"
            style={{ color: "#C8FF00" }}
          >
            <span style={{ fontSize: "1.2rem" }}>{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t px-4 py-3 space-y-1"
            style={{
              borderColor: "rgba(200,255,0,0.1)",
              background: "rgba(5,3,15,0.98)",
            }}
            dir={dir}
          >
            {[
              { key: "hero",             label: lang === "ar" ? "الرئيسية"  : "Home"        },
              { key: "gallery-section",  label: lang === "ar" ? "المعرض"    : "Gallery"     },
              { key: "celebration-section", label: lang === "ar" ? "الاحتفال" : "Celebration" },
              { key: "messages-section", label: lang === "ar" ? "الرسائل"   : "Messages"    },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.key)}
                className="block w-full text-start py-2.5 px-3 rounded-xl text-sm"
                style={{
                  color: "rgba(200,255,0,0.75)",
                  fontFamily: "'Cairo', sans-serif",
                  background: "rgba(200,255,0,0.04)",
                  border: "1px solid rgba(200,255,0,0.08)",
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
