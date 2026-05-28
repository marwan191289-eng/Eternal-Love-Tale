import { useState, useEffect } from "react";
import {
  Shield, Lock, Unlock, Eye, EyeOff, Trash2, Plus, Save, LogOut,
  Images, MessageSquare, Settings, CheckCircle2, XCircle, ChevronLeft,
} from "lucide-react";
import { SEED_IMAGES, HIDDEN_PHOTOS_KEY, CUSTOM_MESSAGES_KEY, ADMIN_PASS } from "@/data/seedImages";

// ── Helpers ───────────────────────────────────────────────────────────────────
function getHiddenPhotos(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(HIDDEN_PHOTOS_KEY) ?? "[]")); } catch { return new Set(); }
}
function saveHiddenPhotos(set: Set<string>) {
  localStorage.setItem(HIDDEN_PHOTOS_KEY, JSON.stringify([...set]));
}

type CustomMessage = { id: string; author: string; content: string; visible: boolean };

function getCustomMessages(): CustomMessage[] {
  try { return JSON.parse(localStorage.getItem(CUSTOM_MESSAGES_KEY) ?? "[]"); } catch { return []; }
}
function saveCustomMessages(msgs: CustomMessage[]) {
  localStorage.setItem(CUSTOM_MESSAGES_KEY, JSON.stringify(msgs));
}

async function fetchLockStatus(): Promise<boolean> {
  try {
    const r = await fetch("/api/admin/lock-status");
    if (!r.ok) return false;
    const d = await r.json() as { locked: boolean };
    return d.locked;
  } catch { return false; }
}

async function toggleLock(locked: boolean): Promise<boolean> {
  try {
    const r = await fetch(`/api/admin/${locked ? "unlock" : "lock"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: ADMIN_PASS }),
    });
    if (!r.ok) return locked;
    const d = await r.json() as { locked: boolean };
    return d.locked;
  } catch { return locked; }
}

// ── Admin password gate ───────────────────────────────────────────────────────
function AdminGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASS) { onAuth(); }
    else { setErr(true); setTimeout(() => setErr(false), 1500); setPw(""); }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-6" dir="rtl" style={{ background: "radial-gradient(ellipse at center, #1a0b14, #08040e)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center">
            <Shield size={32} style={{ color: "oklch(0.82 0.13 75)" }} />
          </div>
          <h1 className="font-display-ar text-3xl font-bold text-gradient-gold">لوحة الإدارة</h1>
          <p className="mt-2 font-body-ar text-sm text-muted-foreground">أدخل كلمة مرور الإدارة</p>
        </div>
        <form onSubmit={submit} className="rounded-3xl border border-gold/30 bg-card/60 backdrop-blur p-8 space-y-4">
          <input
            type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="••••••••••" dir="ltr"
            className={`w-full rounded-xl border px-4 py-3 text-center tracking-widest bg-background/60 text-sm focus:outline-none transition-colors ${err ? "border-destructive text-destructive" : "border-gold/30 text-foreground focus:border-gold"}`}
          />
          {err && <p className="text-center font-body-ar text-sm text-destructive">كلمة المرور غير صحيحة</p>}
          <button type="submit" className="w-full rounded-full bg-gold py-3 font-display-ar font-bold text-primary-foreground hover:shadow-glow hover:scale-[1.02] transition-all">
            دخول
          </button>
          <a href="/" className="flex items-center justify-center gap-2 font-body-ar text-sm text-muted-foreground hover:text-gold transition-colors mt-2">
            <ChevronLeft size={16} /> العودة للموقع
          </a>
        </form>
      </div>
    </div>
  );
}

// ── Tab: Site Control ─────────────────────────────────────────────────────────
function SiteControlTab() {
  const [locked, setLocked] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLockStatus().then(v => setLocked(v));
  }, []);

  const handleToggle = async () => {
    if (locked === null) return;
    setLoading(true);
    const result = await toggleLock(locked);
    setLocked(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="rounded-2xl border border-gold/25 bg-card/40 p-6">
        <div className="flex items-center gap-3 mb-4">
          {locked ? <Lock size={20} style={{ color: "oklch(0.82 0.13 75)" }} /> : <Unlock size={20} style={{ color: "oklch(0.78 0.12 165)" }} />}
          <h3 className="font-display-ar text-xl font-bold text-gold">حالة الموقع</h3>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-body-ar text-base text-foreground/90">
              {locked === null ? "جارٍ التحقق..." : locked ? "الموقع مُغلق — الزوار يرون صفحة إغلاق" : "الموقع مفتوح — يمكن للجميع الوصول"}
            </p>
            <p className="font-body-ar text-sm text-muted-foreground mt-1">
              يؤثر على جميع زوار الموقع في اللحظة ذاتها
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={loading || locked === null}
            className={`shrink-0 flex items-center gap-2 rounded-full px-6 py-3 font-display-ar text-sm font-bold transition-all hover:scale-105 disabled:opacity-50
              ${locked ? "bg-green-700/80 text-white hover:bg-green-600" : "bg-destructive/80 text-white hover:bg-destructive"}`}
          >
            {locked ? <><Unlock size={16} /> فتح الموقع</> : <><Lock size={16} /> إغلاق الموقع</>}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gold/25 bg-card/40 p-6">
        <h3 className="font-display-ar text-xl font-bold text-gold mb-3">معلومات سريعة</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "الصور", value: `${SEED_IMAGES.length}` },
            { label: "الصور المخفية", value: `${getHiddenPhotos().size}` },
            { label: "الرسائل المحفوظة", value: `${getCustomMessages().length}` },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-gold/20 bg-background/40 p-4 text-center">
              <p className="font-display-ar text-2xl font-bold text-gold">{s.value}</p>
              <p className="font-body-ar text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Gallery ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const [hidden, setHidden] = useState<Set<string>>(getHiddenPhotos);
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setHidden(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setSaved(false);
  };

  const save = () => { saveHiddenPhotos(hidden); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const showAll = () => { setHidden(new Set()); setSaved(false); };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="font-body-ar text-sm text-muted-foreground">{hidden.size === 0 ? "جميع الصور مرئية" : `${hidden.size} صورة مخفية`}</p>
        <div className="flex gap-2">
          {hidden.size > 0 && (
            <button onClick={showAll} className="flex items-center gap-1 rounded-full border border-gold/30 px-4 py-2 font-body-ar text-xs text-gold hover:bg-gold/10 transition-all">
              <Eye size={14} /> إظهار الكل
            </button>
          )}
          <button onClick={save} className={`flex items-center gap-1 rounded-full px-4 py-2 font-body-ar text-xs font-bold transition-all ${saved ? "bg-green-700/80 text-white" : "bg-gold text-primary-foreground hover:shadow-glow"}`}>
            {saved ? <><CheckCircle2 size={14} /> تم الحفظ</> : <><Save size={14} /> حفظ التغييرات</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {SEED_IMAGES.map(img => {
          const isHidden = hidden.has(img.id);
          return (
            <div
              key={img.id}
              onClick={() => toggle(img.id)}
              className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer border-2 transition-all hover:scale-105 ${isHidden ? "border-destructive/60 opacity-50 grayscale" : "border-gold/40 hover:border-gold"}`}
            >
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                {isHidden
                  ? <EyeOff size={22} className="text-destructive" />
                  : <Eye size={22} className="text-gold opacity-0 group-hover:opacity-100" />
                }
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/70 px-2 py-1">
                <p className="text-[9px] text-gold/80 font-body-ar text-center truncate">{img.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="font-body-ar text-xs text-muted-foreground text-center">اضغط على الصورة لإخفائها أو إظهارها · لا تنسَ الحفظ</p>
    </div>
  );
}

// ── Tab: Messages ─────────────────────────────────────────────────────────────
function MessagesTab() {
  const [messages, setMessages] = useState<CustomMessage[]>(getCustomMessages);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => { saveCustomMessages(messages); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const add = () => {
    if (!content.trim()) return;
    setMessages(prev => [...prev, { id: crypto.randomUUID(), author: author.trim() || "ضيف", content: content.trim(), visible: true }]);
    setAuthor(""); setContent(""); setSaved(false);
  };

  const toggleVisible = (id: string) => setMessages(prev => prev.map(m => m.id === id ? { ...m, visible: !m.visible } : m));
  const remove = (id: string) => { setMessages(prev => prev.filter(m => m.id !== id)); setSaved(false); };

  return (
    <div className="space-y-5" dir="rtl">
      {/* Add new message */}
      <div className="rounded-2xl border border-gold/25 bg-card/40 p-5 space-y-3">
        <h4 className="font-display-ar text-lg font-bold text-gold flex items-center gap-2"><Plus size={18} /> إضافة رسالة جديدة</h4>
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="الاسم (اختياري)" dir="rtl"
          className="w-full rounded-xl border border-gold/30 bg-background/60 px-4 py-2.5 font-body-ar text-sm focus:outline-none focus:border-gold transition-colors" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="نص الرسالة..." rows={3} dir="rtl"
          className="w-full rounded-xl border border-gold/30 bg-background/60 px-4 py-2.5 font-body-ar text-sm focus:outline-none focus:border-gold transition-colors resize-none" />
        <button onClick={add} disabled={!content.trim()} className="w-full rounded-full bg-gold py-2.5 font-display-ar text-sm text-primary-foreground hover:shadow-glow disabled:opacity-50 transition-all">
          إضافة
        </button>
      </div>

      {/* Message list */}
      {messages.length > 0 ? (
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id} className={`rounded-xl border p-4 flex gap-3 transition-all ${m.visible ? "border-gold/25 bg-card/40" : "border-destructive/30 bg-destructive/5 opacity-60"}`}>
              <div className="flex-1 min-w-0">
                <p className="font-display-ar text-sm font-bold text-gold mb-1">{m.author}</p>
                <p className="font-body-ar text-sm text-muted-foreground leading-relaxed">{m.content}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => toggleVisible(m.id)} title={m.visible ? "إخفاء" : "إظهار"} className="p-1.5 rounded-lg hover:bg-gold/10 transition-colors text-muted-foreground hover:text-gold">
                  {m.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => remove(m.id)} title="حذف" className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-body-ar text-sm text-muted-foreground py-8">لا توجد رسائل مضافة حتى الآن</p>
      )}

      {messages.length > 0 && (
        <button onClick={save} className={`w-full rounded-full py-3 font-display-ar text-sm font-bold transition-all hover:scale-[1.02] ${saved ? "bg-green-700/80 text-white" : "bg-gold text-primary-foreground hover:shadow-glow"}`}>
          {saved ? "✓ تم الحفظ" : "حفظ الرسائل"}
        </button>
      )}
    </div>
  );
}

// ── Admin dashboard ───────────────────────────────────────────────────────────
const TABS = [
  { id: "control", label: "التحكم", icon: Settings },
  { id: "gallery", label: "الصور", icon: Images },
  { id: "messages", label: "الرسائل", icon: MessageSquare },
] as const;

type TabId = typeof TABS[number]["id"];

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>("control");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="fixed top-0 inset-x-0 z-40 border-b border-gold/20 bg-card/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield size={22} style={{ color: "oklch(0.82 0.13 75)" }} />
            <h1 className="font-display-ar text-xl font-bold text-gradient-gold">لوحة إدارة الموقع</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 font-body-ar text-sm text-muted-foreground hover:text-gold transition-colors">
              <ChevronLeft size={16} /> الموقع
            </a>
            <button onClick={onLogout} className="flex items-center gap-1.5 rounded-full border border-gold/25 px-4 py-2 font-body-ar text-xs text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all">
              <LogOut size={14} /> خروج
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-6 flex gap-1 pb-0">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 font-body-ar text-sm border-b-2 transition-all ${tab === t.id ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-gold"}`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {tab === "control" && <SiteControlTab />}
        {tab === "gallery" && <GalleryTab />}
        {tab === "messages" && <MessagesTab />}
      </div>
    </div>
  );
}

// ── Entry ─────────────────────────────────────────────────────────────────────
const ADMIN_AUTH_KEY = "el-admin-authed";

export function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_AUTH_KEY) === "yes");

  const onAuth = () => { sessionStorage.setItem(ADMIN_AUTH_KEY, "yes"); setAuthed(true); };
  const onLogout = () => { sessionStorage.removeItem(ADMIN_AUTH_KEY); setAuthed(false); };

  return authed ? <AdminDashboard onLogout={onLogout} /> : <AdminGate onAuth={onAuth} />;
}
