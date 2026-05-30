import { create } from "zustand";
import { normalizeImageUrl } from "@/lib/urlUtils";
import { DEFAULT_GALLERY_IMAGES, DEFAULT_MUSIC_URL } from "@/data/defaultAssets";
import { supabase } from "@/lib/supabaseClient";

export interface Section {
  id: string;
  label: string;
  visible: boolean;
}

export interface ImageItem {
  id: string;
  url: string;
  alt: string;
  visible: boolean;
}

export type VideoSourceType =
  | "youtube"
  | "vimeo"
  | "google-drive"
  | "dropbox"
  | "onedrive"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "dailymotion"
  | "twitch"
  | "direct"
  | "motion"
  | "link"
  | "file";

export interface VideoItem {
  id: string;
  url: string;
  title: string;
  type: VideoSourceType;
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
  { id: "text-lime",    name: "ليموني",    nameEn: "Lime",       textColor: "#C8FF00", bgColor: "", accentColor: "#AADD00", cardBorder: "rgba(200,255,0,0.35)",  cardBg: "rgba(200,255,0,0.04)"  },
  { id: "text-gold",    name: "ذهبي",      nameEn: "Gold",       textColor: "#FFD700", bgColor: "", accentColor: "#DAA520", cardBorder: "rgba(255,215,0,0.35)",  cardBg: "rgba(255,215,0,0.04)"  },
  { id: "text-cyan",    name: "سماوي",     nameEn: "Cyan",       textColor: "#00E5FF", bgColor: "", accentColor: "#00BCD4", cardBorder: "rgba(0,229,255,0.35)",  cardBg: "rgba(0,229,255,0.04)"  },
  { id: "text-rose",    name: "وردي",      nameEn: "Rose",       textColor: "#FF80AB", bgColor: "", accentColor: "#E91E63", cardBorder: "rgba(255,128,171,0.35)",cardBg: "rgba(255,128,171,0.04)" },
  { id: "text-purple",  name: "بنفسجي",   nameEn: "Purple",     textColor: "#E040FB", bgColor: "", accentColor: "#7B1FA2", cardBorder: "rgba(224,64,251,0.35)", cardBg: "rgba(224,64,251,0.04)" },
  { id: "text-silver",  name: "فضي",       nameEn: "Silver",     textColor: "#CFD8DC", bgColor: "", accentColor: "#90A4AE", cardBorder: "rgba(207,216,220,0.3)", cardBg: "rgba(207,216,220,0.04)" },
  { id: "text-emerald", name: "زمردي",    nameEn: "Emerald",    textColor: "#69F0AE", bgColor: "", accentColor: "#1B5E20", cardBorder: "rgba(105,240,174,0.35)",cardBg: "rgba(105,240,174,0.04)" },
  { id: "text-orange",  name: "برتقالي",  nameEn: "Orange",     textColor: "#FFB300", bgColor: "", accentColor: "#E65100", cardBorder: "rgba(255,179,0,0.35)",  cardBg: "rgba(255,179,0,0.04)"  },
  { id: "text-peach",   name: "خوخي",     nameEn: "Peach",      textColor: "#FFAB91", bgColor: "", accentColor: "#FF5722", cardBorder: "rgba(255,171,145,0.35)",cardBg: "rgba(255,171,145,0.04)" },
];

export const BG_PALETTES = [
  { id: "bg-dark-lime",  name: "أسود ليموني",  nameEn: "Dark Lime",    value: "radial-gradient(ellipse at 30% 20%, #0a0f00 0%, #040800 65%, #000000 100%)" },
  { id: "bg-navy",       name: "أزرق ليلي",    nameEn: "Deep Navy",    value: "radial-gradient(ellipse at 10% 20%, #0a0e2a 0%, #060818 60%, #020510 100%)" },
  { id: "bg-black",      name: "أسود نقي",     nameEn: "Pure Black",   value: "radial-gradient(ellipse at center, #0d0d0d 0%, #000000 70%)" },
  { id: "bg-violet",     name: "بنفسجي عميق",  nameEn: "Deep Violet",  value: "radial-gradient(ellipse at 30% 40%, #120a2a 0%, #06040f 70%, #000000 100%)" },
  { id: "bg-emerald",    name: "أخضر ليلي",    nameEn: "Dark Emerald", value: "radial-gradient(ellipse at 70% 30%, #041a0e 0%, #010c06 70%, #000000 100%)" },
  { id: "bg-dark-rose",  name: "ورد ليلي",     nameEn: "Dark Rose",    value: "radial-gradient(ellipse at 50% 30%, #1a0610 0%, #0a0308 70%, #000000 100%)" },
  { id: "bg-midnight",   name: "منتصف الليل",  nameEn: "Midnight",     value: "radial-gradient(ellipse at 20% 50%, #05030f 0%, #020108 70%, #000000 100%)" },
];

export const COMBINED_THEMES: ColorTheme[] = [
  { id: "lime-celebration", name: "احتفال النيون", nameEn: "Neon Celebration", textColor: "#C8FF00", bgColor: "radial-gradient(ellipse at 30% 20%, #0a0f00 0%, #040800 65%, #000000 100%)", accentColor: "#AADD00", cardBorder: "rgba(200,255,0,0.3)",   cardBg: "rgba(200,255,0,0.05)"   },
  { id: "royal-gold",       name: "ذهب ملكي",     nameEn: "Royal Gold",        textColor: "#FFD700", bgColor: "radial-gradient(ellipse at 20% 30%, #0d0a00 0%, #050300 70%)",            accentColor: "#DAA520", cardBorder: "rgba(255,215,0,0.3)",   cardBg: "rgba(255,215,0,0.05)"   },
  { id: "ocean-blue",       name: "المحيط",        nameEn: "Ocean Blue",        textColor: "#00E5FF", bgColor: "radial-gradient(ellipse at 30% 40%, #00060d 0%, #000408 70%)",            accentColor: "#0288D1", cardBorder: "rgba(0,229,255,0.3)",   cardBg: "rgba(0,229,255,0.05)"   },
  { id: "rose-garden",      name: "حديقة الورد",  nameEn: "Rose Garden",       textColor: "#FF80AB", bgColor: "radial-gradient(ellipse at 50% 30%, #120309 0%, #080105 70%)",            accentColor: "#E91E63", cardBorder: "rgba(255,128,171,0.3)", cardBg: "rgba(255,128,171,0.05)" },
  { id: "emerald-night",    name: "زمرد الليل",   nameEn: "Emerald Night",     textColor: "#69F0AE", bgColor: "radial-gradient(ellipse at 70% 40%, #011208 0%, #000805 70%)",            accentColor: "#00E676", cardBorder: "rgba(105,240,174,0.3)", cardBg: "rgba(105,240,174,0.05)" },
  { id: "silver-moon",      name: "القمر الفضي",  nameEn: "Silver Moon",       textColor: "#E0E0E0", bgColor: "radial-gradient(ellipse at 40% 20%, #0a0a0f 0%, #050508 70%)",            accentColor: "#BDBDBD", cardBorder: "rgba(224,224,224,0.3)", cardBg: "rgba(224,224,224,0.04)" },
  { id: "violet-dream",     name: "حلم بنفسجي",  nameEn: "Violet Dream",      textColor: "#CE93D8", bgColor: "radial-gradient(ellipse at 60% 30%, #0d0015 0%, #06000a 70%)",            accentColor: "#AB47BC", cardBorder: "rgba(206,147,216,0.3)", cardBg: "rgba(206,147,216,0.05)" },
  { id: "orange-sunset",    name: "غروب برتقالي", nameEn: "Orange Sunset",     textColor: "#FFB300", bgColor: "radial-gradient(ellipse at 50% 20%, #0f0800 0%, #060400 70%)",            accentColor: "#E65100", cardBorder: "rgba(255,179,0,0.3)",   cardBg: "rgba(255,179,0,0.05)"   },
  { id: "cherry-blossom",   name: "زهر الكرز",   nameEn: "Cherry Blossom",    textColor: "#F48FB1", bgColor: "radial-gradient(ellipse at 40% 30%, #1a0510 0%, #0d0209 70%)",            accentColor: "#AD1457", cardBorder: "rgba(244,143,177,0.3)", cardBg: "rgba(244,143,177,0.05)" },
];

type ThemeMode = "default" | "text" | "bg" | "combined";

const DEFAULT_SECTIONS: Section[] = [
  { id: "hero",         label: "قسم الهيرو",           visible: true },
  { id: "celebration",  label: "نص الاحتفال",          visible: true },
  { id: "poetry1",      label: "قصيدة الحكاية",        visible: true },
  { id: "philosophy1",  label: "نص فطرة البشر",        visible: true },
  { id: "philosophy2",  label: "نص الرجال نوعان",      visible: true },
  { id: "gallery",      label: "معرض الصور",           visible: true },
  { id: "videos",       label: "نبض الحكاية",          visible: true },
  { id: "messages",     label: "قسم الرسائل",          visible: true },
  { id: "marwan-card",  label: "رسالة مروان",          visible: true },
  { id: "sara-card",    label: "تهنئة سارة وحمزة",     visible: true },
];

const DEFAULT_SETTINGS = {
  adminPassword: "amira2026",
  sitePassword: "amira2026",
  sitePasswordEnabled: false,
  marwanVisible: true,
  saraVisible: true,
  themeMode: "combined" as ThemeMode,
  selectedTextPalette: "text-lime",
  selectedBgPalette: "bg-dark-lime",
  selectedCombinedTheme: "lime-celebration",
  musicUrl: DEFAULT_MUSIC_URL,
  volume: 0.7,
  logoUrl: "",
};

type SettingKey = keyof typeof DEFAULT_SETTINGS;

interface AppStore {
  hydrated: boolean;
  loading: boolean;
  syncError: string;
  loadRemoteData: () => Promise<void>;
  subscribeRemoteData: () => () => void;

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

  videos: VideoItem[];
  addVideo: (v: { url: string; title: string; type: VideoItem["type"] }) => void;
  removeVideo: (id: string) => void;
  toggleVideo: (id: string) => void;
  updateVideo: (id: string, updates: Partial<VideoItem>) => void;

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
  volume: number;
  setVolume: (v: number) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

function logSyncError(context: string, error: unknown) {
  console.error(`[Supabase sync] ${context}`, error);
}

function remoteWrite<T>(context: string, promise: PromiseLike<{ error: unknown } | unknown>) {
  void Promise.resolve(promise).then((result) => {
    if (result && typeof result === "object" && "error" in result && result.error) {
      logSyncError(context, result.error);
    }
  }).catch((error) => logSyncError(context, error));
}

function upsertSetting(key: SettingKey, value: unknown) {
  if (!supabase) return;
  remoteWrite(`settings.${key}`, supabase.from("el_settings").upsert({ key, value }, { onConflict: "key" }));
}

function settingsPatch(rows: { key: string; value: unknown }[]) {
  const patch: Partial<typeof DEFAULT_SETTINGS> = {};
  for (const row of rows) {
    if (row.key in DEFAULT_SETTINGS) {
      if (row.key === "logoUrl") {
        (patch as Record<string, unknown>)[row.key] = normalizeImageUrl(row.value);
      } else {
        (patch as Record<string, unknown>)[row.key] = row.value;
      }
    }
  }
  return patch;
}

const toImageRow = (img: ImageItem, position: number) => ({ id: img.id, url: normalizeImageUrl(img.url), alt: img.alt, visible: img.visible, position });
const fromImageRow = (row: any): ImageItem => ({ id: row.id, url: normalizeImageUrl(row.url), alt: row.alt ?? "", visible: Boolean(row.visible) });
const toVideoRow = (video: VideoItem, position: number) => ({ id: video.id, url: video.url, title: video.title, type: video.type, visible: video.visible, position });
const normalizeVideoType = (type: string): VideoSourceType => {
  const allowed: VideoSourceType[] = ["youtube", "vimeo", "google-drive", "dropbox", "onedrive", "tiktok", "instagram", "facebook", "dailymotion", "twitch", "direct", "motion", "link", "file"];
  return allowed.includes(type as VideoSourceType) ? (type as VideoSourceType) : "link";
};
const fromVideoRow = (row: any): VideoItem => ({ id: row.id, url: row.url, title: row.title ?? "", type: normalizeVideoType(row.type), visible: Boolean(row.visible) });
const toCardRow = (card: CustomCard, position: number) => ({ id: card.id, variant: card.variant, title_ar: card.titleAr, title_en: card.titleEn, content_ar: card.contentAr, content_en: card.contentEn, visible: card.visible, position });
const fromCardRow = (row: any): CustomCard => ({ id: row.id, variant: row.variant, titleAr: row.title_ar ?? "", titleEn: row.title_en ?? "", contentAr: row.content_ar ?? "", contentEn: row.content_en ?? "", visible: Boolean(row.visible) });
const toSectionRow = (section: Section, position: number) => ({ id: section.id, label: section.label, visible: section.visible, position });
const fromSectionRow = (row: any): Section => ({ id: row.id, label: row.label, visible: Boolean(row.visible) });

export const useAppStore = create<AppStore>()((set, get) => ({
  hydrated: false,
  loading: false,
  syncError: "",

  ...DEFAULT_SETTINGS,
  sections: DEFAULT_SECTIONS,
  images: DEFAULT_GALLERY_IMAGES,
  videos: [],
  customCards: [],

  loadRemoteData: async () => {
    if (!supabase) {
      set({ hydrated: true, loading: false, syncError: "" });
      return;
    }

    set({ loading: true, syncError: "" });
    try {
      const [sectionsRes, imagesRes, videosRes, cardsRes, settingsRes] = await Promise.all([
        supabase.from("el_sections").select("id,label,visible,position").order("position", { ascending: true }),
        supabase.from("el_gallery_images").select("id,url,alt,visible,position").order("position", { ascending: true }),
        supabase.from("el_videos").select("id,url,title,type,visible,position").order("position", { ascending: true }),
        supabase.from("el_custom_cards").select("id,variant,title_ar,title_en,content_ar,content_en,visible,position").order("position", { ascending: true }),
        supabase.from("el_settings").select("key,value"),
      ]);

      for (const res of [sectionsRes, imagesRes, videosRes, cardsRes, settingsRes]) {
        if (res.error) throw res.error;
      }

      let sections = (sectionsRes.data ?? []).map(fromSectionRow);
      let images = (imagesRes.data ?? []).map(fromImageRow);
      const videos = (videosRes.data ?? []).map(fromVideoRow);
      const customCards = (cardsRes.data ?? []).map(fromCardRow);
      let remoteSettings = settingsPatch(settingsRes.data ?? []);

      if (sections.length === 0) {
        sections = DEFAULT_SECTIONS;
        await supabase.from("el_sections").upsert(sections.map(toSectionRow), { onConflict: "id" });
      }
      if (images.length === 0) {
        images = DEFAULT_GALLERY_IMAGES;
        await supabase.from("el_gallery_images").upsert(images.map(toImageRow), { onConflict: "id" });
      }

      const existingSettingKeys = new Set((settingsRes.data ?? []).map((row) => row.key));
      const missingSettings = (Object.keys(DEFAULT_SETTINGS) as SettingKey[])
        .filter((key) => !existingSettingKeys.has(key))
        .map((key) => ({ key, value: DEFAULT_SETTINGS[key] }));
      if (missingSettings.length > 0) {
        await supabase.from("el_settings").upsert(missingSettings, { onConflict: "key" });
        remoteSettings = { ...DEFAULT_SETTINGS, ...remoteSettings };
      }

      set({
        ...remoteSettings,
        sections,
        images,
        videos,
        customCards,
        hydrated: true,
        loading: false,
        syncError: "",
      });
    } catch (error) {
      logSyncError("loadRemoteData", error);
      set({ hydrated: true, loading: false, syncError: "تعذر تحميل بيانات Supabase، يتم عرض البيانات الافتراضية مؤقتًا." });
    }
  },

  subscribeRemoteData: () => {
    if (!supabase) return () => {};
    let timer: ReturnType<typeof setTimeout> | null = null;
    const refresh = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => { void get().loadRemoteData(); }, 250);
    };
    const channel = supabase
      .channel("eternal-love-shared-content")
      .on("postgres_changes", { event: "*", schema: "public", table: "el_sections" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "el_gallery_images" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "el_videos" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "el_custom_cards" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "el_settings" }, refresh)
      .subscribe();

    return () => {
      if (timer) clearTimeout(timer);
      const client = supabase;
      if (client) void client.removeChannel(channel);
    };
  },

  setAdminPassword: (p) => { set({ adminPassword: p }); upsertSetting("adminPassword", p); },
  setSitePassword: (p) => { set({ sitePassword: p }); upsertSetting("sitePassword", p); },
  setSitePasswordEnabled: (v) => { set({ sitePasswordEnabled: v }); upsertSetting("sitePasswordEnabled", v); },

  toggleSection: (id) => {
    const next = get().sections.map((sec) => sec.id === id ? { ...sec, visible: !sec.visible } : sec);
    set({ sections: next });
    const section = next.find((sec) => sec.id === id);
    if (supabase && section) remoteWrite("toggleSection", supabase.from("el_sections").update({ visible: section.visible }).eq("id", id));
  },
  setSectionVisible: (id, v) => {
    const next = get().sections.map((sec) => sec.id === id ? { ...sec, visible: v } : sec);
    set({ sections: next });
    if (supabase) remoteWrite("setSectionVisible", supabase.from("el_sections").update({ visible: v }).eq("id", id));
  },

  addImage: (img) => {
    const item: ImageItem = { ...img, id: `img-${Date.now()}-${Math.random().toString(36).slice(2)}`, visible: true, url: normalizeImageUrl(img.url) };
    const next = [...get().images, item];
    set({ images: next });
    if (supabase) remoteWrite("addImage", supabase.from("el_gallery_images").insert(toImageRow(item, next.length - 1)));
  },
  toggleImage: (id) => {
    const next = get().images.map((img) => img.id === id ? { ...img, visible: !img.visible } : img);
    set({ images: next });
    const image = next.find((img) => img.id === id);
    if (supabase && image) remoteWrite("toggleImage", supabase.from("el_gallery_images").update({ visible: image.visible }).eq("id", id));
  },
  removeImage: (id) => {
    set({ images: get().images.filter((img) => img.id !== id) });
    if (supabase) remoteWrite("removeImage", supabase.from("el_gallery_images").delete().eq("id", id));
  },
  reorderImages: (from, to) => {
    const imgs = [...get().images];
    const [moved] = imgs.splice(from, 1);
    imgs.splice(to, 0, moved);
    set({ images: imgs });
    if (supabase) remoteWrite("reorderImages", supabase.from("el_gallery_images").upsert(imgs.map(toImageRow), { onConflict: "id" }));
  },

  addVideo: (v) => {
    const item: VideoItem = { ...v, id: `vid-${Date.now()}-${Math.random().toString(36).slice(2)}`, visible: true };
    const next = [...get().videos, item];
    set({ videos: next });
    if (supabase) remoteWrite("addVideo", supabase.from("el_videos").insert(toVideoRow(item, next.length - 1)));
  },
  removeVideo: (id) => {
    set({ videos: get().videos.filter((v) => v.id !== id) });
    if (supabase) remoteWrite("removeVideo", supabase.from("el_videos").delete().eq("id", id));
  },
  toggleVideo: (id) => {
    const next = get().videos.map((v) => v.id === id ? { ...v, visible: !v.visible } : v);
    set({ videos: next });
    const video = next.find((v) => v.id === id);
    if (supabase && video) remoteWrite("toggleVideo", supabase.from("el_videos").update({ visible: video.visible }).eq("id", id));
  },
  updateVideo: (id, updates) => {
    const next = get().videos.map((v) => v.id === id ? { ...v, ...updates } : v);
    set({ videos: next });
    const payload: Record<string, unknown> = {};
    if (updates.url !== undefined) payload.url = updates.url;
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.type !== undefined) payload.type = updates.type;
    if (updates.visible !== undefined) payload.visible = updates.visible;
    if (supabase) remoteWrite("updateVideo", supabase.from("el_videos").update(payload).eq("id", id));
  },

  addCustomCard: (card) => {
    const item: CustomCard = { ...card, id: `card-${Date.now()}-${Math.random().toString(36).slice(2)}` };
    const next = [...get().customCards, item];
    set({ customCards: next });
    if (supabase) remoteWrite("addCustomCard", supabase.from("el_custom_cards").insert(toCardRow(item, next.length - 1)));
  },
  updateCustomCard: (id, updates) => {
    const next = get().customCards.map((c) => c.id === id ? { ...c, ...updates } : c);
    set({ customCards: next });
    const payload: Record<string, unknown> = {};
    if (updates.variant !== undefined) payload.variant = updates.variant;
    if (updates.titleAr !== undefined) payload.title_ar = updates.titleAr;
    if (updates.titleEn !== undefined) payload.title_en = updates.titleEn;
    if (updates.contentAr !== undefined) payload.content_ar = updates.contentAr;
    if (updates.contentEn !== undefined) payload.content_en = updates.contentEn;
    if (updates.visible !== undefined) payload.visible = updates.visible;
    if (supabase) remoteWrite("updateCustomCard", supabase.from("el_custom_cards").update(payload).eq("id", id));
  },
  removeCustomCard: (id) => {
    set({ customCards: get().customCards.filter((c) => c.id !== id) });
    if (supabase) remoteWrite("removeCustomCard", supabase.from("el_custom_cards").delete().eq("id", id));
  },
  toggleCustomCard: (id) => {
    const next = get().customCards.map((c) => c.id === id ? { ...c, visible: !c.visible } : c);
    set({ customCards: next });
    const card = next.find((c) => c.id === id);
    if (supabase && card) remoteWrite("toggleCustomCard", supabase.from("el_custom_cards").update({ visible: card.visible }).eq("id", id));
  },

  setMarwanVisible: (v) => { set({ marwanVisible: v }); upsertSetting("marwanVisible", v); },
  setSaraVisible: (v) => { set({ saraVisible: v }); upsertSetting("saraVisible", v); },
  setThemeMode: (m) => { set({ themeMode: m }); upsertSetting("themeMode", m); },
  setSelectedTextPalette: (id) => { set({ selectedTextPalette: id }); upsertSetting("selectedTextPalette", id); },
  setSelectedBgPalette: (id) => { set({ selectedBgPalette: id }); upsertSetting("selectedBgPalette", id); },
  setSelectedCombinedTheme: (id) => { set({ selectedCombinedTheme: id }); upsertSetting("selectedCombinedTheme", id); },
  setMusicUrl: (url) => { set({ musicUrl: url }); upsertSetting("musicUrl", url); },
  setVolume: (v) => { set({ volume: v }); upsertSetting("volume", v); },
  setLogoUrl: (url) => { const normalizedUrl = normalizeImageUrl(url); set({ logoUrl: normalizedUrl }); upsertSetting("logoUrl", normalizedUrl); },
}));
