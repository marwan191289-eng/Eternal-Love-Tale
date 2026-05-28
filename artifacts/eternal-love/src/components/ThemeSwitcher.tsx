import { useEffect, useState } from "react";
import { Palette, Check, Type, Image, Layers } from "lucide-react";

type Mode = "text" | "background" | "both";

const TEXT_OPTIONS = [
  { key: "gold", name: "ذهبي", swatch: "#c8a84b", vars: { "--foreground": "oklch(0.82 0.13 75)", "--gold": "oklch(0.82 0.13 75)", "--gold-soft": "oklch(0.90 0.10 80)", "--primary": "oklch(0.82 0.13 75)" } },
  { key: "rose", name: "وردي", swatch: "#c97b8a", vars: { "--foreground": "oklch(0.78 0.12 10)", "--gold": "oklch(0.78 0.12 10)", "--gold-soft": "oklch(0.88 0.09 15)", "--primary": "oklch(0.78 0.12 10)" } },
  { key: "silver", name: "فضي", swatch: "#aaaacc", vars: { "--foreground": "oklch(0.85 0.02 280)", "--gold": "oklch(0.85 0.02 280)", "--gold-soft": "oklch(0.92 0.01 280)", "--primary": "oklch(0.85 0.02 280)" } },
  { key: "cyan", name: "سماوي", swatch: "#4ab8c8", vars: { "--foreground": "oklch(0.80 0.10 200)", "--gold": "oklch(0.80 0.10 200)", "--gold-soft": "oklch(0.90 0.08 205)", "--primary": "oklch(0.80 0.10 200)" } },
];

const BG_OPTIONS = [
  { key: "wine", name: "نبيذي", swatch: "#3a0e14", vars: { "--background": "oklch(0.17 0.048 22)", "--card": "oklch(0.21 0.055 23)", "--muted": "oklch(0.25 0.052 24)" } },
  { key: "midnight", name: "ليلي", swatch: "#0c1530", vars: { "--background": "oklch(0.17 0.04 260)", "--card": "oklch(0.22 0.05 260)", "--muted": "oklch(0.26 0.04 260)" } },
  { key: "emerald", name: "زمردي", swatch: "#0a2e22", vars: { "--background": "oklch(0.18 0.05 165)", "--card": "oklch(0.22 0.055 165)", "--muted": "oklch(0.26 0.05 165)" } },
  { key: "noir", name: "أسود", swatch: "#0a0a0a", vars: { "--background": "oklch(0.12 0.005 0)", "--card": "oklch(0.18 0.01 60)", "--muted": "oklch(0.22 0.01 60)" } },
];

const BOTH_OPTIONS = [
  {
    key: "wine-gold", name: "نبيذ وذهب", swatch: "#3a0e14", textSwatch: "#c8a84b",
    vars: { "--background": "oklch(0.17 0.048 22)", "--card": "oklch(0.21 0.055 23)", "--muted": "oklch(0.25 0.052 24)", "--foreground": "oklch(0.92 0.04 62)", "--gold": "oklch(0.82 0.13 75)", "--gold-soft": "oklch(0.91 0.10 82)", "--primary": "oklch(0.82 0.13 75)" },
  },
  {
    key: "midnight-silver", name: "ليل فضي", swatch: "#0c1530", textSwatch: "#aaaacc",
    vars: { "--background": "oklch(0.17 0.04 260)", "--card": "oklch(0.22 0.05 260)", "--muted": "oklch(0.26 0.04 260)", "--foreground": "oklch(0.93 0.03 80)", "--gold": "oklch(0.86 0.11 85)", "--gold-soft": "oklch(0.92 0.09 90)", "--primary": "oklch(0.86 0.11 85)" },
  },
  {
    key: "emerald-gold", name: "زمرد ذهبي", swatch: "#0a2e22", textSwatch: "#c8a840",
    vars: { "--background": "oklch(0.18 0.05 165)", "--card": "oklch(0.22 0.055 165)", "--muted": "oklch(0.26 0.05 165)", "--foreground": "oklch(0.93 0.03 90)", "--gold": "oklch(0.84 0.12 85)", "--gold-soft": "oklch(0.92 0.10 90)", "--primary": "oklch(0.84 0.12 85)" },
  },
  {
    key: "noir-gold", name: "أسود وذهب", swatch: "#0a0a0a", textSwatch: "#d4a830",
    vars: { "--background": "oklch(0.12 0.005 0)", "--card": "oklch(0.18 0.01 60)", "--muted": "oklch(0.22 0.01 60)", "--foreground": "oklch(0.94 0.02 80)", "--gold": "oklch(0.85 0.13 80)", "--gold-soft": "oklch(0.93 0.10 85)", "--primary": "oklch(0.85 0.13 80)" },
  },
];

const STORAGE_KEY_MODE = "el-theme-mode";
const STORAGE_KEY_ACTIVE = "el-theme-active";

function applyVars(vars: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("both");
  const [activeKey, setActiveKey] = useState("wine-gold");

  useEffect(() => {
    const savedMode = (localStorage.getItem(STORAGE_KEY_MODE) as Mode) ?? "both";
    const savedKey = localStorage.getItem(STORAGE_KEY_ACTIVE) ?? "wine-gold";
    setMode(savedMode);
    setActiveKey(savedKey);
    const options = savedMode === "text" ? TEXT_OPTIONS : savedMode === "background" ? BG_OPTIONS : BOTH_OPTIONS;
    const found = options.find(o => o.key === savedKey) ?? options[0];
    if (found) applyVars(found.vars);
  }, []);

  const pick = (key: string, vars: Record<string, string>) => {
    applyVars(vars);
    setActiveKey(key);
    localStorage.setItem(STORAGE_KEY_ACTIVE, key);
    setOpen(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    localStorage.setItem(STORAGE_KEY_MODE, m);
    const defaultKey = m === "text" ? "gold" : m === "background" ? "wine" : "wine-gold";
    const options = m === "text" ? TEXT_OPTIONS : m === "background" ? BG_OPTIONS : BOTH_OPTIONS;
    const found = options[0];
    if (found) { pick(defaultKey, found.vars); }
  };

  const currentOptions = mode === "text" ? TEXT_OPTIONS : mode === "background" ? BG_OPTIONS : BOTH_OPTIONS;

  const modeLabels: Record<Mode, { icon: React.ReactNode; label: string }> = {
    text: { icon: <Type className="h-3 w-3" />, label: "النصوص" },
    background: { icon: <Image className="h-3 w-3" />, label: "الخلفية" },
    both: { icon: <Layers className="h-3 w-3" />, label: "معاً" },
  };

  return (
    <div className="fixed bottom-24 left-6 z-40">
      {open && (
        <div className="mb-3 rounded-2xl border border-gold/40 bg-card/95 p-4 shadow-elegant backdrop-blur w-64">
          {/* Mode selector */}
          <p className="mb-2 text-center font-display-ar text-xs text-muted-foreground">نوع التغيير</p>
          <div className="flex gap-1 mb-4 rounded-xl bg-background/40 p-1 border border-gold/20">
            {(["text", "background", "both"] as Mode[]).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-body-ar transition-all ${mode === m ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:text-gold"}`}
              >
                {modeLabels[m].icon}
                {modeLabels[m].label}
              </button>
            ))}
          </div>

          {/* Color options */}
          <p className="mb-2 text-center font-display-ar text-xs text-muted-foreground">
            {mode === "text" ? "اختر لون النص" : mode === "background" ? "اختر لون الخلفية" : "اختر الثيم"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {currentOptions.map(opt => (
              <button
                key={opt.key}
                type="button"
                onClick={() => pick(opt.key, opt.vars)}
                className={`group flex items-center gap-2 rounded-xl border px-2 py-2 text-right transition-all ${activeKey === opt.key ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/60"}`}
              >
                <div className="relative shrink-0">
                  <span className="block h-6 w-6 rounded-full border border-gold/30" style={{ background: opt.swatch }} />
                  {"textSwatch" in opt && (
                    <span className="absolute -bottom-1 -right-1 block h-3 w-3 rounded-full border border-card" style={{ background: (opt as typeof BOTH_OPTIONS[0]).textSwatch }} />
                  )}
                </div>
                <span className="flex-1 font-body-ar text-xs text-foreground">{opt.name}</span>
                {activeKey === opt.key && <Check className="h-3 w-3 text-gold shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        data-testid="button-theme-switcher"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-card/80 text-gold shadow-elegant backdrop-blur transition-all hover:bg-gold hover:text-primary-foreground hover:shadow-glow"
        aria-label="تغيير لون الموقع"
        title="تغيير لون الموقع"
      >
        <Palette className="h-5 w-5" />
      </button>
    </div>
  );
}
