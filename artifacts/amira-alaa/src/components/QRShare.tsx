import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import { useLang } from "@/context/LangContext";
import { useAppStore, COMBINED_THEMES, TEXT_PALETTES } from "@/store/appStore";

function useAccent() {
  const { themeMode, selectedTextPalette, selectedCombinedTheme } = useAppStore();
  if (themeMode === "text") {
    const p = TEXT_PALETTES.find((x) => x.id === selectedTextPalette);
    return p?.textColor ?? "#C8FF00";
  }
  if (themeMode === "combined") {
    const t = COMBINED_THEMES.find((x) => x.id === selectedCombinedTheme);
    return t?.textColor ?? "#C8FF00";
  }
  return themeMode === "default" ? "#FFD700" : "#C8FF00";
}

export default function QRShare() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const accent = useAccent();

  const siteUrl = window.location.origin + window.location.pathname.replace(/\/$/, "") || window.location.href;

  function copyLink() {
    navigator.clipboard.writeText(siteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: open
            ? `linear-gradient(135deg, ${accent}25, ${accent}18)`
            : `linear-gradient(135deg, ${accent}12, ${accent}08)`,
          border: `1px solid ${open ? accent + "55" : accent + "30"}`,
          boxShadow: open
            ? `0 0 28px ${accent}35, 0 0 60px ${accent}12`
            : `0 0 16px ${accent}15`,
          backdropFilter: "blur(12px)",
        }}
        title={lang === "ar" ? "مشاركة الموقع" : "Share site"}
      >
        <span style={{ fontSize: "1.25rem" }}>📲</span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setOpen(false)}
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed bottom-20 right-4 z-[70] rounded-2xl overflow-hidden"
              style={{
                background: "rgba(3, 5, 0, 0.97)",
                border: `1px solid ${accent}30`,
                boxShadow: `0 8px 48px rgba(0,0,0,0.8), 0 0 40px ${accent}08`,
                width: "280px",
              }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {/* Header */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{
                  background: `linear-gradient(135deg, ${accent}10, ${accent}06)`,
                  borderBottom: `1px solid ${accent}18`,
                }}
              >
                <div>
                  <p className="text-sm font-bold" style={{ color: accent, fontFamily: "'Cairo', sans-serif", textShadow: `0 0 8px ${accent}55` }}>
                    {lang === "ar" ? "📲 شارك الموقع" : "📲 Share the Site"}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: `${accent}66`, fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "امسح الكود أو انسخ الرابط" : "Scan the code or copy the link"}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{ color: `${accent}55`, fontSize: "1rem", lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center gap-4 px-5 py-5">
                <div
                  className="rounded-2xl p-3"
                  style={{
                    background: "#ffffff",
                    boxShadow: `0 0 32px ${accent}30, 0 0 64px ${accent}10`,
                    border: `3px solid ${accent}`,
                  }}
                >
                  <QRCode
                    value={siteUrl}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#040800"
                    level="M"
                  />
                </div>

                {/* Names below QR */}
                <p
                  className="text-sm font-bold text-center"
                  style={{
                    fontFamily: "'Amiri', serif",
                    color: accent,
                    textShadow: `0 0 12px ${accent}66`,
                    letterSpacing: lang === "ar" ? "0" : "0.05em",
                  }}
                >
                  {lang === "ar" ? "أميرة & علاء — ١٤ مايو ٢٠٢٦" : "Amira & Alaa — May 14, 2026"}
                </p>

                {/* URL preview */}
                <div
                  className="w-full rounded-xl px-3 py-2"
                  style={{ background: `${accent}08`, border: `1px solid ${accent}18` }}
                >
                  <p
                    className="text-[11px] truncate text-center"
                    style={{ color: `${accent}88`, fontFamily: "monospace", direction: "ltr" }}
                  >
                    {siteUrl}
                  </p>
                </div>

                {/* Copy button */}
                <motion.button
                  onClick={copyLink}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: copied
                      ? "rgba(0,229,150,0.18)"
                      : `linear-gradient(135deg, ${accent}18, ${accent}10)`,
                    border: `1px solid ${copied ? "rgba(0,229,150,0.45)" : accent + "40"}`,
                    color: copied ? "#00e596" : accent,
                    fontFamily: "'Cairo', sans-serif",
                    boxShadow: copied ? "0 0 16px rgba(0,229,150,0.2)" : `0 0 12px ${accent}10`,
                  }}
                >
                  {copied
                    ? (lang === "ar" ? "✓ تم النسخ!" : "✓ Copied!")
                    : (lang === "ar" ? "📋 نسخ الرابط" : "📋 Copy Link")}
                </motion.button>

                {/* Social share hints */}
                <div className="flex items-center gap-2 w-full justify-center flex-wrap">
                  {[
                    { icon: "💬", label: lang === "ar" ? "واتساب" : "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent((lang === "ar" ? "احتفال أميرة وعلاء 🎉 " : "Amira & Alaa Ceremony 🎉 ") + siteUrl)}` },
                    { icon: "✈️", label: lang === "ar" ? "تيليجرام" : "Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(lang === "ar" ? "احتفال أميرة وعلاء" : "Amira & Alaa Ceremony")}` },
                    { icon: "🐦", label: lang === "ar" ? "تويتر" : "Twitter",   href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(lang === "ar" ? "احتفال أميرة وعلاء 🎉" : "Amira & Alaa Ceremony 🎉")}` },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        background: `${accent}08`,
                        border: `1px solid ${accent}22`,
                        color: `${accent}99`,
                        fontFamily: "'Cairo', sans-serif",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${accent}18`;
                        el.style.color = accent;
                        el.style.borderColor = `${accent}45`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${accent}08`;
                        el.style.color = `${accent}99`;
                        el.style.borderColor = `${accent}22`;
                      }}
                    >
                      <span>{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
