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
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      sitePassword: "amira2026",
      sitePasswordEnabled: false,
      setSitePassword: (p) => set({ sitePassword: p }),
      setSitePasswordEnabled: (v) => set({ sitePasswordEnabled: v }),

      sections: [
        { id: "hero", label: "قسم الهيرو (أميرة وعلاء)", visible: true },
        { id: "celebration", label: "نص الاحتفال", visible: true },
        { id: "poetry1", label: "قصيدة الحكاية", visible: true },
        { id: "philosophy1", label: "نص الفلسفة (فطرة البشر)", visible: true },
        { id: "philosophy2", label: "نص الرجال", visible: true },
        { id: "imagestrip", label: "شريط الصور", visible: true },
        { id: "messages", label: "قسم الرسائل", visible: true },
        { id: "amira-card", label: "بطاقة أميرة", visible: true },
        { id: "alaa-card", label: "بطاقة علاء", visible: true },
        { id: "family-card", label: "بطاقة الأهل والأحبة", visible: true },
        { id: "marwan-card", label: "رسالة مروان", visible: true },
        { id: "sara-card", label: "تهنئة سارة وحمزة", visible: true },
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
        {
          id: "amira-msg",
          sender: "أميرة",
          preview: "بطاقة أميرة",
          visible: false,
        },
        {
          id: "alaa-msg",
          sender: "علاء",
          preview: "بطاقة علاء",
          visible: false,
        },
        {
          id: "family-msg",
          sender: "الاهل والاحبة",
          preview: "بطاقة الأهل",
          visible: false,
        },
        {
          id: "marwan-msg",
          sender: "مروان نجم",
          preview: "رسالة مروان إلى أميرة",
          visible: true,
        },
        {
          id: "sara-msg",
          sender: "سارة نجم وحمزة نجم",
          preview: "تهنئة سارة وحمزة",
          visible: true,
        },
      ],
      toggleMessage: (id) =>
        set((s) => ({
          messages: s.messages.map((m) =>
            m.id === id ? { ...m, visible: !m.visible } : m
          ),
        })),
    }),
    { name: "amira-alaa-store" }
  )
);
