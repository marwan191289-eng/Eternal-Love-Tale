import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_GALLERY_IMAGES, DEFAULT_MUSIC_URL } from "@/data/defaultAssets";

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

export interface CustomCard {
  id: string;
  variant: "gold" | "cyan" | "rose" | "purple";
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
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
  { id: "bg-navy",     name: "أزرق ليلي",   nameEn: "Deep Navy",    value: "radial-gradient(ellipse at 10% 20%, #0a0e2a 0%, #060818 60%, #020510 100%)" },
  { id: "bg-black",    name: "أسود نقي",    nameEn: "Pure Black",   value: "radial-gradient(ellipse at center, #0d0d0d 0%, #000000 70%)" },
  { id: "bg-violet",   name: "بنفسجي عميق", nameEn: "Deep Violet",  value: "radial-gradient(ellipse at 30% 40%, #120a2a 0%, #06040f 70%, #000000 100%)" },
  { id: "bg-emerald",  name: "أخضر ليلي",   nameEn: "Dark Emerald", value: "radial-gradient(ellipse at 70% 30%, #041a0e 0%, #010c06 70%, #000000 100%)" },
  { id: "bg-dark-rose",name: "ورد ليلي",    nameEn: "Dark Rose",    value: "radial-gradient(ellipse at 50% 30%, #1a0610 0%, #0a0308 70%, #000000 100%)" },
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
  adminPassword: string;
  setAdminPassword: (p: string) => void;

  sitePassword: string;
  setSitePassword: (p: string) => void;
  sitePasswordEnabled: boolean;
  setSitePasswordEnabled: (v: boolean) => void;

  sections: Section[];
  toggleSection: (id: string) => void;
  setSectionVisible: (id: string, v: boolean) => void;

  images: ImageItem[];
  toggleImage: (id: string) => void;
  addImage: (img: { url: string; alt: string }) => void;
  removeImage: (id: string) => void;
  reorderImages: (from: number, to: number) => void;

  customCards: CustomCard[];
  addCustomCard: (card: Omit<CustomCard, "id">) => void;
  updateCustomCard: (id: string, updates: Partial<CustomCard>) => void;
  removeCustomCard: (id: string) => void;
  toggleCustomCard: (id: string) => void;

  marwanVisible: boolean;
  setMarwanVisible: (v: boolean) => void;
  saraVisible: boolean;
  setSaraVisible: (v: boolean) => void;

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
      adminPassword: "amira2026",
      setAdminPassword: (p) => set({ adminPassword: p }),

      sitePassword: "amira2026",
      setSitePassword: (p) => set({ sitePassword: p }),
      sitePasswordEnabled: false,
      setSitePasswordEnabled: (v) => set({ sitePasswordEnabled: v }),

      sections: [
        { id: "hero",         label: "قسم الهيرو",           visible: true },
        { id: "celebration",  label: "نص الاحتفال",          visible: true },
        { id: "poetry1",      label: "قصيدة الحكاية",        visible: true },
        { id: "philosophy1",  label: "نص فطرة البشر",        visible: true },
        { id: "philosophy2",  label: "نص الرجال نوعان",      visible: true },
        { id: "messages",     label: "قسم الرسائل",          visible: true },
        { id: "marwan-card",  label: "رسالة مروان",          visible: true },
        { id: "sara-card",    label: "تهنئة سارة وحمزة",     visible: true },
      ],
      toggleSection: (id) =>
        set((s) => ({
          sections: s.sections.map((sec) =>
            sec.id === id ? { ...sec, visible: !sec.visible } : sec
          ),
        })),
      setSectionVisible: (id, v) =>
        set((s) => ({
          sections: s.sections.map((sec) =>
            sec.id === id ? { ...sec, visible: v } : sec
          ),
        })),

      images: DEFAULT_GALLERY_IMAGES,
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
      reorderImages: (from, to) =>
        set((s) => {
          const imgs = [...s.images];
          const [moved] = imgs.splice(from, 1);
          imgs.splice(to, 0, moved);
          return { images: imgs };
        }),

      customCards: [],
      addCustomCard: (card) =>
        set((s) => ({
          customCards: [
            ...s.customCards,
            { ...card, id: `card-${Date.now()}-${Math.random()}` },
          ],
        })),
      updateCustomCard: (id, updates) =>
        set((s) => ({
          customCards: s.customCards.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      removeCustomCard: (id) =>
        set((s) => ({ customCards: s.customCards.filter((c) => c.id !== id) })),
      toggleCustomCard: (id) =>
        set((s) => ({
          customCards: s.customCards.map((c) =>
            c.id === id ? { ...c, visible: !c.visible } : c
          ),
        })),

      marwanVisible: true,
      setMarwanVisible: (v) => set({ marwanVisible: v }),
      saraVisible: true,
      setSaraVisible: (v) => set({ saraVisible: v }),

      themeMode: "default",
      setThemeMode: (m) => set({ themeMode: m }),
      selectedTextPalette: "text-gold",
      setSelectedTextPalette: (id) => set({ selectedTextPalette: id }),
      selectedBgPalette: "bg-navy",
      setSelectedBgPalette: (id) => set({ selectedBgPalette: id }),
      selectedCombinedTheme: "royal-gold",
      setSelectedCombinedTheme: (id) => set({ selectedCombinedTheme: id }),

      musicUrl: DEFAULT_MUSIC_URL,
      setMusicUrl: (url) => set({ musicUrl: url }),
    }),
    { name: "amira-alaa-store-v3" }
  )
);
