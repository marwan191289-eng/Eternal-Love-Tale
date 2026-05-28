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
    { id: "default",  label: lang === "ar" ? "افتراضي" : "Default", icon: "✦" },
    { id: "text",     label: lang === "ar" ? "نص فقط"  : "Text",    icon: "ن" },
    { id: "bg",       label: lang === "ar" ? "خلفية"   : "BG",      icon: "◐" },
    { id: "combined", label: lang === "ar" ? "مدمج"    : "Mixed",   icon: "✺" },
  ] as const;

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-36 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: open
            ? "linear-gradient(135deg, rgba(200,255,0,0.25), rgba(255,215,0,0.18), rgba(0,229,255,0.12))"
            : "linear-gradient(135deg, rgba(200,255,0,0.13), rgba(255,215,0,0.09))",
          border: open ? "1px solid rgba(200,255,0,0.7)" : "1px solid rgba(200,255,0,0.34)",
          boxShadow: open
            ? "0 0 30px rgba(200,255,0,0.44), 0 0 90px rgba(200,255,0,0.16), inset 0 0 18px rgba(255,255,255,0.06)"
            : "0 0 18px rgba(200,255,0,0.18), inset 0 0 12px rgba(255,255,255,0.04)",
          backdropFilter: "blur(18px)",
        }}
        title={lang === "ar" ? "تغيير الألوان" : "Color Themes"}
      >
        <span style={{ fontSize: "1.55rem", filter: "drop-shadow(0 0 10px rgba(200,255,0,0.7))" }}>🎨</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 28, y: 18 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, x: 28, y: 18 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="theme-panel-premium fixed bottom-[214px] right-4 z-50 w-[min(92vw,430px)] rounded-[1.35rem] overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(3,7,0,0.985), rgba(3,5,0,0.965) 42%, rgba(8,10,2,0.985)), radial-gradient(ellipse at 15% 0%, rgba(200,255,0,0.12), transparent 42%), radial-gradient(ellipse at 90% 18%, rgba(0,229,255,0.08), transparent 46%)",
              border: "1px solid rgba(200,255,0,0.28)",
              boxShadow: "0 22px 70px rgba(0,0,0,0.88), 0 0 42px rgba(200,255,0,0.11), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(28px)",
              maxHeight: "min(76vh, 690px)",
              overflowY: "auto",
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.035) 48%, transparent 58%)" }} />
            <div className="px-5 py-4 flex items-center justify-between sticky top-0 z-10" style={{
              background: "linear-gradient(180deg, rgba(3,5,0,0.99), rgba(3,5,0,0.92))",
              borderBottom: "1px solid rgba(200,255,0,0.16)",
            }}>
              <div>
                <span className="text-base font-black" style={{
                  color: "#C8FF00",
                  fontFamily: "'Cairo', sans-serif",
                  textShadow: "0 0 12px rgba(200,255,0,0.65)",
                }}>
                  🎨 {lang === "ar" ? "تغيير الألوان" : "Color Themes"}
                </span>
                <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.36)", fontFamily: "'Cairo', sans-serif" }}>
                  {lang === "ar" ? "اختيارات أكبر ولمسة نيون فاخرة" : "Larger controls with elegant neon styling"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.035)" }}
              >
                ✕
              </button>
            </div>

            <div className="relative p-5">
              <div className="grid grid-cols-4 gap-2 mb-5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setThemeMode(tab.id as typeof themeMode)}
                    className="py-2.5 px-2 rounded-2xl text-xs transition-all duration-200"
                    style={{
                      background: themeMode === tab.id ? "rgba(200,255,0,0.16)" : "rgba(255,255,255,0.045)",
                      border: themeMode === tab.id ? "1px solid rgba(200,255,0,0.55)" : "1px solid rgba(255,255,255,0.09)",
                      color: themeMode === tab.id ? "#C8FF00" : "rgba(255,255,255,0.42)",
                      fontFamily: "'Cairo', sans-serif",
                      textShadow: themeMode === tab.id ? "0 0 10px rgba(200,255,0,0.5)" : "none",
                      boxShadow: themeMode === tab.id ? "0 0 18px rgba(200,255,0,0.16), inset 0 0 14px rgba(200,255,0,0.04)" : "none",
                    }}
                  >
                    <span className="block text-sm mb-0.5">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {themeMode === "default" && (
                <div className="py-8 text-center rounded-3xl" style={{ background: "rgba(200,255,0,0.035)", border: "1px solid rgba(200,255,0,0.12)" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: "radial-gradient(circle, rgba(200,255,0,0.25), rgba(255,215,0,0.10) 48%, transparent 70%)",
                      border: "1px solid rgba(200,255,0,0.48)",
                      boxShadow: "0 0 32px rgba(200,255,0,0.22)",
                    }}
                  >
                    <span style={{ fontSize: "2rem" }}>🌟</span>
                  </motion.div>
                  <p className="text-sm font-bold" style={{ color: "rgba(200,255,0,0.72)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "ثيم الذهب الكلاسيكي" : "Classic Gold Theme"}
                  </p>
                </div>
              )}

              {themeMode === "text" && (
                <div>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "اختر لون النصوص" : "Choose text color"}
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {TEXT_PALETTES.map((p) => {
                      const selected = selectedTextPalette === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedTextPalette(p.id)}
                          className="relative py-3.5 px-3 rounded-2xl text-sm font-black transition-all duration-200 overflow-hidden"
                          style={{
                            background: selected ? `${p.textColor}22` : "rgba(255,255,255,0.045)",
                            border: `1px solid ${selected ? p.textColor + "88" : "rgba(255,255,255,0.10)"}`,
                            color: p.textColor,
                            textShadow: `0 0 ${selected ? 12 : 7}px ${p.textColor}99`,
                            fontFamily: "'Cairo', sans-serif",
                            boxShadow: selected ? `0 0 22px ${p.textColor}22, inset 0 0 18px ${p.textColor}12` : "none",
                          }}
                        >
                          {selected && <span className="absolute top-1.5 left-2 text-xs">✓</span>}
                          {lang === "ar" ? p.name : p.nameEn}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {themeMode === "bg" && (
                <div>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "اختر لون الخلفية" : "Choose background"}
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {BG_PALETTES.map((p) => {
                      const selected = selectedBgPalette === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedBgPalette(p.id)}
                          className="py-3.5 px-4 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center gap-3"
                          style={{
                            background: selected ? "rgba(200,255,0,0.085)" : "rgba(255,255,255,0.035)",
                            border: `1px solid ${selected ? "rgba(200,255,0,0.52)" : "rgba(255,255,255,0.09)"}`,
                            color: selected ? "#C8FF00" : "rgba(255,255,255,0.55)",
                            fontFamily: "'Cairo', sans-serif",
                            boxShadow: selected ? "0 0 22px rgba(200,255,0,0.14), inset 0 0 18px rgba(200,255,0,0.04)" : "none",
                          }}
                        >
                          <span className="w-9 h-9 rounded-xl flex-shrink-0" style={{ background: p.value, border: "1px solid rgba(255,255,255,0.14)", boxShadow: "inset 0 0 14px rgba(255,255,255,0.05)" }} />
                          <span>{lang === "ar" ? p.name : p.nameEn}</span>
                          {selected && <span className="mr-auto text-base" style={{ color: "#C8FF00" }}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {themeMode === "combined" && (
                <div>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "اختر الثيم المدمج" : "Choose combined theme"}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {COMBINED_THEMES.map((theme) => {
                      const selected = selectedCombinedTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedCombinedTheme(theme.id)}
                          className="py-4 px-3 rounded-2xl text-sm font-black transition-all duration-200 relative overflow-hidden text-center"
                          style={{
                            background: selected ? `${theme.textColor}1F` : "rgba(255,255,255,0.035)",
                            border: `1px solid ${selected ? theme.textColor + "77" : "rgba(255,255,255,0.10)"}`,
                            color: theme.textColor,
                            fontFamily: "'Cairo', sans-serif",
                            boxShadow: selected ? `0 0 24px ${theme.textColor}22, inset 0 0 18px ${theme.textColor}10` : "none",
                          }}
                        >
                          <div className="absolute inset-x-0 top-0 h-1" style={{ background: theme.textColor, opacity: 0.8 }} />
                          <div className="w-full h-8 rounded-xl mb-3" style={{ background: theme.bgColor, border: `1px solid ${theme.textColor}44` }} />
                          {lang === "ar" ? theme.name : theme.nameEn}
                          {selected && <span className="absolute top-2 left-2 text-xs">✓</span>}
                        </button>
                      );
                    })}
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
