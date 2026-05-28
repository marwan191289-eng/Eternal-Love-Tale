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
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const {
    themeMode, setThemeMode,
    selectedTextPalette, setSelectedTextPalette,
    selectedBgPalette, setSelectedBgPalette,
    selectedCombinedTheme, setSelectedCombinedTheme,
  } = useAppStore();

  const tabs = [
    { id: "default",  label: lang === "ar" ? "افتراضي" : "Default" },
    { id: "text",     label: lang === "ar" ? "نص فقط"  : "Text"    },
    { id: "bg",       label: lang === "ar" ? "خلفية"   : "BG"      },
    { id: "combined", label: lang === "ar" ? "مدمج"    : "Mixed"   },
  ] as const;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-36 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: open
            ? "linear-gradient(135deg, rgba(200,255,0,0.2), rgba(170,220,0,0.15))"
            : "linear-gradient(135deg, rgba(200,255,0,0.1), rgba(255,215,0,0.08))",
          border: open ? "1px solid rgba(200,255,0,0.55)" : "1px solid rgba(200,255,0,0.3)",
          boxShadow: open
            ? "0 0 28px rgba(200,255,0,0.4), 0 0 60px rgba(200,255,0,0.12)"
            : "0 0 16px rgba(200,255,0,0.15)",
          backdropFilter: "blur(12px)",
        }}
        title={lang === "ar" ? "تغيير الألوان" : "Color Themes"}
      >
        <span style={{ fontSize: "1.3rem" }}>🎨</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-[212px] right-4 z-50 w-80 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(3,5,0,0.98)",
              border: "1px solid rgba(200,255,0,0.18)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.85), 0 0 40px rgba(200,255,0,0.04)",
              backdropFilter: "blur(24px)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between sticky top-0 z-10" style={{
              background: "rgba(3,5,0,0.98)",
              borderBottom: "1px solid rgba(200,255,0,0.1)",
            }}>
              <span className="text-sm font-bold" style={{
                color: "#C8FF00",
                fontFamily: "'Cairo', sans-serif",
                textShadow: "0 0 10px rgba(200,255,0,0.4)",
              }}>
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
                      background: themeMode === tab.id ? "rgba(200,255,0,0.14)" : "rgba(255,255,255,0.04)",
                      border: themeMode === tab.id ? "1px solid rgba(200,255,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: themeMode === tab.id ? "#C8FF00" : "rgba(255,255,255,0.35)",
                      fontFamily: "'Cairo', sans-serif",
                      textShadow: themeMode === tab.id ? "0 0 8px rgba(200,255,0,0.4)" : "none",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Default */}
              {themeMode === "default" && (
                <div className="py-4 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{
                    background: "linear-gradient(135deg, rgba(200,255,0,0.15), rgba(255,215,0,0.1))",
                    border: "1px solid rgba(200,255,0,0.4)",
                    boxShadow: "0 0 20px rgba(200,255,0,0.2)",
                  }}>
                    <span style={{ fontSize: "1.4rem" }}>🌟</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(200,255,0,0.6)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "ثيم الذهب الكلاسيكي" : "Classic Gold Theme"}
                  </p>
                </div>
              )}

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
                        className="py-2 px-2 rounded-xl text-xs font-bold transition-all duration-200"
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
                          background: selectedBgPalette === p.id ? "rgba(200,255,0,0.07)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selectedBgPalette === p.id ? "rgba(200,255,0,0.35)" : "rgba(255,255,255,0.08)"}`,
                          color: selectedBgPalette === p.id ? "#C8FF00" : "rgba(255,255,255,0.45)",
                          fontFamily: "'Cairo', sans-serif",
                        }}
                      >
                        <span className="w-6 h-6 rounded-lg flex-shrink-0" style={{ background: p.value, border: "1px solid rgba(255,255,255,0.1)" }} />
                        {lang === "ar" ? p.name : p.nameEn}
                        {selectedBgPalette === p.id && <span className="mr-auto" style={{ color: "#C8FF00" }}>✓</span>}
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
                        className="py-3 px-3 rounded-xl text-xs font-bold transition-all duration-200 relative"
                        style={{
                          background: selectedCombinedTheme === theme.id ? `${theme.textColor}18` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selectedCombinedTheme === theme.id ? theme.textColor + "55" : "rgba(255,255,255,0.1)"}`,
                          color: theme.textColor,
                          fontFamily: "'Cairo', sans-serif",
                          boxShadow: selectedCombinedTheme === theme.id ? `0 0 16px ${theme.textColor}15` : "none",
                        }}
                      >
                        <div className="w-full h-1.5 rounded-full mb-2 mx-auto" style={{ background: theme.textColor, opacity: 0.6 }} />
                        {lang === "ar" ? theme.name : theme.nameEn}
                        {selectedCombinedTheme === theme.id && (
                          <span className="absolute top-1.5 left-1.5 text-[10px]" style={{ color: theme.textColor }}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
