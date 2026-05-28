import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import {
  useAppStore,
  TEXT_PALETTES,
  BG_PALETTES,
  COMBINED_THEMES,
} from "@/store/appStore";

export default function ThemePicker() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const {
    themeMode, setThemeMode,
    selectedTextPalette, setSelectedTextPalette,
    selectedBgPalette, setSelectedBgPalette,
    selectedCombinedTheme, setSelectedCombinedTheme,
  } = useAppStore();

  const tabs = [
    { id: "default",  label: lang === "ar" ? "افتراضي" : "Default" },
    { id: "text",     label: lang === "ar" ? "نص فقط" : "Text Only" },
    { id: "bg",       label: lang === "ar" ? "خلفية فقط" : "BG Only" },
    { id: "combined", label: lang === "ar" ? "مدمج" : "Combined" },
  ] as const;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(218,112,214,0.12))",
          border: "1px solid rgba(255,215,0,0.35)",
          boxShadow: open
            ? "0 0 28px rgba(255,215,0,0.45), 0 0 60px rgba(255,215,0,0.15)"
            : "0 0 16px rgba(255,215,0,0.2)",
          backdropFilter: "blur(12px)",
        }}
        title={lang === "ar" ? "تغيير الألوان" : "Color Themes"}
      >
        <span style={{ fontSize: "1.3rem" }}>🎨</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-40 left-4 z-50 w-72 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(5,3,15,0.97)",
              border: "1px solid rgba(255,215,0,0.2)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.8), 0 0 40px rgba(255,215,0,0.05)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,215,0,0.1)" }}
            >
              <span
                className="text-sm font-bold"
                style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", textShadow: "0 0 10px rgba(255,215,0,0.4)" }}
              >
                🎨 {lang === "ar" ? "تغيير الألوان" : "Color Themes"}
              </span>
              <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}>✕</button>
            </div>

            <div className="p-4">
              {/* Mode tabs */}
              <div className="grid grid-cols-4 gap-1 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setThemeMode(tab.id as typeof themeMode)}
                    className="py-1.5 px-1 rounded-lg text-xs transition-all duration-200"
                    style={{
                      background: themeMode === tab.id ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.04)",
                      border: themeMode === tab.id ? "1px solid rgba(255,215,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: themeMode === tab.id ? "#FFD700" : "rgba(255,255,255,0.35)",
                      fontFamily: "'Cairo', sans-serif",
                      textShadow: themeMode === tab.id ? "0 0 8px rgba(255,215,0,0.4)" : "none",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Text palettes */}
              {themeMode === "text" && (
                <div>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "اختر لون النصوص" : "Choose text color"}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {TEXT_PALETTES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedTextPalette(p.id)}
                        className="py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200"
                        style={{
                          background: selectedTextPalette === p.id ? `${p.textColor}20` : "rgba(255,255,255,0.04)",
                          border: `1px solid ${selectedTextPalette === p.id ? p.textColor + "60" : "rgba(255,255,255,0.1)"}`,
                          color: p.textColor,
                          textShadow: selectedTextPalette === p.id ? `0 0 8px ${p.textColor}80` : "none",
                          fontFamily: "'Cairo', sans-serif",
                          boxShadow: selectedTextPalette === p.id ? `0 0 12px ${p.textColor}20` : "none",
                        }}
                      >
                        {lang === "ar" ? p.name : p.nameEn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BG palettes */}
              {themeMode === "bg" && (
                <div>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "اختر لون الخلفية" : "Choose background"}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {BG_PALETTES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedBgPalette(p.id)}
                        className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-3"
                        style={{
                          background: selectedBgPalette === p.id ? "rgba(255,215,0,0.08)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selectedBgPalette === p.id ? "rgba(255,215,0,0.35)" : "rgba(255,255,255,0.08)"}`,
                          color: selectedBgPalette === p.id ? "#FFD700" : "rgba(255,255,255,0.45)",
                          fontFamily: "'Cairo', sans-serif",
                        }}
                      >
                        {/* Preview swatch */}
                        <span
                          className="w-6 h-6 rounded-lg flex-shrink-0"
                          style={{ background: p.value, border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                        {lang === "ar" ? p.name : p.nameEn}
                        {selectedBgPalette === p.id && (
                          <span className="mr-auto" style={{ color: "#FFD700" }}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Combined themes */}
              {themeMode === "combined" && (
                <div>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "اختر الثيم المدمج" : "Choose combined theme"}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {COMBINED_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedCombinedTheme(theme.id)}
                        className="py-3 px-3 rounded-xl text-xs font-bold transition-all duration-200"
                        style={{
                          background: selectedCombinedTheme === theme.id ? `${theme.textColor}18` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selectedCombinedTheme === theme.id ? theme.textColor + "55" : "rgba(255,255,255,0.1)"}`,
                          color: theme.textColor,
                          fontFamily: "'Cairo', sans-serif",
                          boxShadow: selectedCombinedTheme === theme.id ? `0 0 16px ${theme.textColor}15` : "none",
                        }}
                      >
                        <div
                          className="w-full h-1.5 rounded-full mb-2 mx-auto"
                          style={{ background: theme.textColor, opacity: 0.6 }}
                        />
                        {lang === "ar" ? theme.name : theme.nameEn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {themeMode === "default" && (
                <p
                  className="text-xs text-center py-4"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif" }}
                >
                  {lang === "ar" ? "الثيم الافتراضي — الذهبي الكلاسيكي" : "Default theme — Classic Gold"}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
