import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Section {
  id: string;
  label: string;
  visible: boolean;
}

interface ImageItem {
  id: string;
  url: string;
  alt: string;
  visible: boolean;
}

interface MessageItem {
  id: string;
  sender: string;
  preview: string;
  visible: boolean;
}

export interface ColorTheme {
  id: string;
  name: string;
  nameEn: string;
  textColor: string;
  bgColor: string;
  accentColor: string;
  cardBorder: string;
  cardBg: string;
}

export const TEXT_PALETTES: ColorTheme[] = [
  { id: "text-gold",    name: "ذهبي",      nameEn: "Gold",       textColor: "#FFD700", bgColor: "", accentColor: "#DAA520", cardBorder: "rgba(255,215,0,0.35)",  cardBg: "rgba(255,215,0,0.04)"  },
  { id: "text-cyan",    name: "سماوي",     nameEn: "Cyan",       textColor: "#00E5FF", bgColor: "", accentColor: "#00BCD4", cardBorder: "rgba(0,229,255,0.35)",  cardBg: "rgba(0,229,255,0.04)"  },
  { id: "text-rose",    name: "وردي",      nameEn: "Rose",       textColor: "#FF80AB", bgColor: "", accentColor: "#E91E63", cardBorder: "rgba(255,128,171,0.35)",cardBg: "rgba(255,128,171,0.04)" },
  { id: "text-purple",  name: "بنفسجي",   nameEn: "Purple",     textColor: "#E040FB", bgColor: "", accentColor: "#7B1FA2", cardBorder: "rgba(224,64,251,0.35)", cardBg: "rgba(224,64,251,0.04)" },
  { id: "text-silver",  name: "فضي",       nameEn: "Silver",     textColor: "#CFD8DC", bgColor: "", accentColor: "#90A4AE", cardBorder: "rgba(207,216,220,0.3)", cardBg: "rgba(207,216,220,0.04)" },
  { id: "text-emerald", name: "زمردي",    nameEn: "Emerald",    textColor: "#69F0AE", bgColor: "", accentColor: "#1B5E20", cardBorder: "rgba(105,240,174,0.35)",cardBg: "rgba(105,240,174,0.04)" },
];

export const BG_PALETTES = [
  { id: "bg-navy",    name: "أزرق ليلي",  nameEn: "Deep Navy",    value: "radial-gradient(ellipse at 10% 20%, #0a0e2a 0%, #060818 60%, #020510 100%)" },
  { id: "bg-black",   name: "أسود نقي",   nameEn: "Pure Black",   value: "radial-gradient(ellipse at center, #0d0d0d 0%, #000000 70%)" },
  { id: "bg-violet",  name: "بنفسجي عميق",nameEn: "Deep Violet",  value: "radial-gradient(ellipse at 30% 40%, #120a2a 0%, #06040f 70%, #000000 100%)" },
  { id: "bg-emerald", name: "أخضر ليلي",  nameEn: "Dark Emerald", value: "radial-gradient(ellipse at 70% 30%, #041a0e 0%, #010c06 70%, #000000 100%)" },
  { id: "bg-dark-rose",name: "ورد ليلي",  nameEn: "Dark Rose",    value: "radial-gradient(ellipse at 50% 30%, #1a0610 0%, #0a0308 70%, #000000 100%)" },
];

export const COMBINED_THEMES: ColorTheme[] = [
  { id: "royal-gold",    name: "ذهب ملكي",    nameEn: "Royal Gold",    textColor: "#FFD700", bgColor: "radial-gradient(ellipse at 20% 30%, #0d0a00 0%, #050300 70%)", accentColor: "#DAA520", cardBorder: "rgba(255,215,0,0.3)",   cardBg: "rgba(255,215,0,0.05)"   },
  { id: "ocean-blue",    name: "المحيط",       nameEn: "Ocean Blue",    textColor: "#00E5FF", bgColor: "radial-gradient(ellipse at 30% 40%, #00060d 0%, #000408 70%)", accentColor: "#0288D1", cardBorder: "rgba(0,229,255,0.3)",   cardBg: "rgba(0,229,255,0.05)"   },
  { id: "rose-garden",   name: "حديقة الورد", nameEn: "Rose Garden",   textColor: "#FF80AB", bgColor: "radial-gradient(ellipse at 50% 30%, #120309 0%, #080105 70%)", accentColor: "#E91E63", cardBorder: "rgba(255,128,171,0.3)", cardBg: "rgba(255,128,171,0.05)" },
  { id: "emerald-night", name: "زمرد الليل",  nameEn: "Emerald Night", textColor: "#69F0AE", bgColor: "radial-gradient(ellipse at 70% 40%, #011208 0%, #000805 70%)", accentColor: "#00E676", cardBorder: "rgba(105,240,174,0.3)", cardBg: "rgba(105,240,174,0.05)" },
  { id: "silver-moon",   name: "القمر الفضي", nameEn: "Silver Moon",   textColor: "#E0E0E0", bgColor: "radial-gradient(ellipse at 40% 20%, #0a0a0f 0%, #050508 70%)", accentColor: "#BDBDBD", cardBorder: "rgba(224,224,224,0.3)", cardBg: "rgba(224,224,224,0.04)" },
  { id: "violet-dream",  name: "حلم بنفسجي", nameEn: "Violet Dream",  textColor: "#CE93D8", bgColor: "radial-gradient(ellipse at 60% 30%, #0d0015 0%, #06000a 70%)", accentColor: "#AB47BC", cardBorder: "rgba(206,147,216,0.3)", cardBg: "rgba(206,147,216,0.05)" },
];

type ThemeMode = "default" | "text" | "bg" | "combined";

interface AppStore {
  sitePassword: string;
  sitePasswordEnabled: boolean;
  setSitePassword: (p: string) => void;
  setSitePasswordEnabled: (v: boolean) => void;

  sections: Section[];
  toggleSection: (id: string) => void;

  images: ImageItem[];
  toggleImage: (id: string) => void;
  addImage: (img: { url: string; alt: string }) => void;
  removeImage: (id: string) => void;

  messages: MessageItem[];
  toggleMessage: (id: string) => void;

  themeMode: ThemeMode;
  setThemeMode: (m: ThemeMode) => void;
  selectedTextPalette: string;
  setSelectedTextPalette: (id: string) => void;
  selectedBgPalette: string;
  setSelectedBgPalette: (id: string) => void;
  selectedCombinedTheme: string;
  setSelectedCombinedTheme: (id: string) => void;

  musicUrl: string;
  setMusicUrl: (url: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      sitePassword: "amira2026",
      sitePasswordEnabled: false,
      setSitePassword: (p) => set({ sitePassword: p }),
      setSitePasswordEnabled: (v) => set({ sitePasswordEnabled: v }),

      sections: [
        { id: "hero",         label: "قسم الهيرو",           visible: true },
        { id: "celebration",  label: "نص الاحتفال",          visible: true },
        { id: "poetry1",      label: "قصيدة الحكاية",        visible: true },
        { id: "philosophy1",  label: "نص فطرة البشر",        visible: true },
        { id: "philosophy2",  label: "نص الرجال نوعان",      visible: true },
        { id: "imagestrip",   label: "شريط الصور",           visible: true },
        { id: "messages",     label: "قسم الرسائل",          visible: true },
        { id: "amira-card",   label: "بطاقة أميرة",          visible: true },
        { id: "alaa-card",    label: "بطاقة علاء",           visible: true },
        { id: "family-card",  label: "بطاقة الأهل",          visible: true },
        { id: "marwan-card",  label: "رسالة مروان",          visible: true },
        { id: "sara-card",    label: "تهنئة سارة وحمزة",     visible: true },
      ],
      toggleSection: (id) =>
        set((s) => ({
          sections: s.sections.map((sec) =>
            sec.id === id ? { ...sec, visible: !sec.visible } : sec
          ),
        })),

      images: [],
      toggleImage: (id) =>
        set((s) => ({
          images: s.images.map((img) =>
            img.id === id ? { ...img, visible: !img.visible } : img
          ),
        })),
      addImage: (img) =>
        set((s) => ({
          images: [
            ...s.images,
            { ...img, id: `img-${Date.now()}-${Math.random()}`, visible: true },
          ],
        })),
      removeImage: (id) =>
        set((s) => ({ images: s.images.filter((img) => img.id !== id) })),

      messages: [
        { id: "amira-msg",  sender: "أميرة",               preview: "بطاقة أميرة",                visible: false },
        { id: "alaa-msg",   sender: "علاء",                 preview: "بطاقة علاء",                 visible: false },
        { id: "family-msg", sender: "الأهل والأحبة",        preview: "بطاقة الأهل",                visible: false },
        { id: "marwan-msg", sender: "مروان نجم",            preview: "رسالة مروان إلى أميرة",      visible: true  },
        { id: "sara-msg",   sender: "سارة نجم وحمزة نجم",  preview: "تهنئة سارة وحمزة",           visible: true  },
      ],
      toggleMessage: (id) =>
        set((s) => ({
          messages: s.messages.map((m) =>
            m.id === id ? { ...m, visible: !m.visible } : m
          ),
        })),

      themeMode: "default",
      setThemeMode: (m) => set({ themeMode: m }),
      selectedTextPalette: "text-gold",
      setSelectedTextPalette: (id) => set({ selectedTextPalette: id }),
      selectedBgPalette: "bg-navy",
      setSelectedBgPalette: (id) => set({ selectedBgPalette: id }),
      selectedCombinedTheme: "royal-gold",
      setSelectedCombinedTheme: (id) => set({ selectedCombinedTheme: id }),

      musicUrl: "",
      setMusicUrl: (url) => set({ musicUrl: url }),
    }),
    { name: "amira-alaa-store-v2" }
  )
);
