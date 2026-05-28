import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, CustomCard, VideoItem } from "@/store/appStore";
import { LOGO_IMG } from "@/data/defaultAssets";

type Tab = "site" | "sections" | "cards" | "gallery" | "videos" | "music" | "logo" | "passwords";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "site",      label: "الموقع",         icon: "🌐" },
  { id: "sections",  label: "الأقسام",         icon: "📋" },
  { id: "gallery",   label: "المعرض",          icon: "🖼️" },
  { id: "videos",    label: "الفيديوهات",      icon: "🎬" },
  { id: "cards",     label: "البطاقات",        icon: "✉️" },
  { id: "music",     label: "الموسيقى",        icon: "🎵" },
  { id: "logo",      label: "الشعار",          icon: "🏷️" },
  { id: "passwords", label: "كلمات المرور",    icon: "🔑" },
];

const VARIANTS = [
  { id: "gold",   label: "ذهبي",    color: "#FFD700" },
  { id: "cyan",   label: "سماوي",   color: "#00e5ff" },
  { id: "rose",   label: "وردي",    color: "#ff80ab" },
  { id: "purple", label: "بنفسجي",  color: "#e040fb" },
] as const;

export default function AdminPage() {
  const {
    adminPassword, setAdminPassword,
    sitePassword, setSitePassword,
    sitePasswordEnabled, setSitePasswordEnabled,
    sections, toggleSection,
    images, toggleImage, addImage, removeImage,
    videos, addVideo, removeVideo, toggleVideo, updateVideo,
    customCards, addCustomCard, updateCustomCard, removeCustomCard, toggleCustomCard,
    marwanVisible, setMarwanVisible,
    saraVisible, setSaraVisible,
    musicUrl, setMusicUrl,
    logoUrl, setLogoUrl,
  } = useAppStore();

  const [inputPassword, setInputPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("site");
  const [saved, setSaved] = useState("");

  function showSaved(msg = "تم الحفظ ✓") {
    setSaved(msg);
    setTimeout(() => setSaved(""), 2200);
  }

  function handleLogin() {
    if (inputPassword === adminPassword) {
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("كلمة المرور غير صحيحة");
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse at center, #080c00 0%, #030600 55%, #000000 100%)" }} dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-8 w-full max-w-md"
          style={{
            background: "linear-gradient(135deg, rgba(200,255,0,0.05) 0%, rgba(170,220,0,0.08) 100%)",
            border: "1px solid rgba(200,255,0,0.28)",
            boxShadow: "0 0 40px rgba(200,255,0,0.08)",
          }}
        >
          <div className="text-center mb-6">
            <img src={LOGO_IMG} alt="شعار" className="h-16 mx-auto mb-4 object-contain" style={{ filter: "drop-shadow(0 0 12px rgba(200,255,0,0.5))" }} />
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Amiri', serif", color: "#C8FF00", textShadow: "0 0 16px rgba(200,255,0,0.5)" }}>
              🔐 لوحة الإدارة
            </h1>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="كلمة المرور"
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-right"
              style={{
                background: "rgba(200,255,0,0.07)",
                border: "1px solid rgba(200,255,0,0.28)",
                color: "#C8FF00",
                outline: "none",
                fontFamily: "'Cairo', sans-serif",
              }}
            />
            {loginError && <p className="text-sm text-center" style={{ color: "#ff6464", fontFamily: "'Cairo', sans-serif" }}>{loginError}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(200,255,0,0.18), rgba(170,220,0,0.28))",
                border: "1px solid rgba(200,255,0,0.45)",
                color: "#C8FF00",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "0 0 20px rgba(200,255,0,0.12)",
              }}
            >
              دخول
            </button>
          </div>
          <p className="text-center mt-6 text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif" }}>
            <a href="/" style={{ color: "rgba(200,255,0,0.5)" }}>← العودة للموقع</a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(ellipse at center, #080c00 0%, #030600 55%, #000000 100%)" }} dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-50" style={{
        background: "rgba(3,5,0,0.97)",
        borderBottom: "1px solid rgba(200,255,0,0.15)",
        backdropFilter: "blur(20px)",
      }}>
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
          background: "linear-gradient(90deg, transparent, #C8FF00 30%, #FFD700 50%, #C8FF00 70%, transparent)",
          opacity: 0.6,
        }} />
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_IMG} alt="شعار" className="h-8 object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(200,255,0,0.4))" }} />
            <h1 className="text-lg font-bold" style={{ fontFamily: "'Amiri', serif", color: "#C8FF00", textShadow: "0 0 10px rgba(200,255,0,0.4)" }}>
              ⚙️ لوحة إدارة الموقع
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm px-3 py-1 rounded-lg"
                  style={{
                    background: "rgba(200,255,0,0.12)",
                    border: "1px solid rgba(200,255,0,0.3)",
                    color: "#C8FF00",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  {saved}
                </motion.span>
              )}
            </AnimatePresence>
            <a href="/" className="text-sm px-3 py-1.5 rounded-lg" style={{
              color: "rgba(200,255,0,0.6)",
              border: "1px solid rgba(200,255,0,0.2)",
              fontFamily: "'Cairo', sans-serif",
            }}>
              ← الموقع
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 pb-0 overflow-x-auto">
          <div className="flex gap-0.5 pb-0 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-all duration-200"
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  color: activeTab === tab.id ? "#C8FF00" : "rgba(255,255,255,0.4)",
                  borderBottom: activeTab === tab.id ? "2px solid #C8FF00" : "2px solid transparent",
                  background: activeTab === tab.id ? "rgba(200,255,0,0.05)" : "transparent",
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {activeTab === "site" && (
          <SiteTab sitePasswordEnabled={sitePasswordEnabled} setSitePasswordEnabled={setSitePasswordEnabled} sitePassword={sitePassword} setSitePassword={setSitePassword} showSaved={showSaved} />
        )}
        {activeTab === "sections" && (
          <SectionsTab sections={sections} toggleSection={toggleSection} />
        )}
        {activeTab === "gallery" && (
          <GalleryTab images={images} toggleImage={toggleImage} addImage={addImage} removeImage={removeImage} showSaved={showSaved} />
        )}
        {activeTab === "videos" && (
          <VideosTab videos={videos} addVideo={addVideo} removeVideo={removeVideo} toggleVideo={toggleVideo} updateVideo={updateVideo} showSaved={showSaved} />
        )}
        {activeTab === "cards" && (
          <CardsTab
            marwanVisible={marwanVisible} setMarwanVisible={setMarwanVisible}
            saraVisible={saraVisible} setSaraVisible={setSaraVisible}
            customCards={customCards} addCustomCard={addCustomCard} updateCustomCard={updateCustomCard} removeCustomCard={removeCustomCard} toggleCustomCard={toggleCustomCard}
            showSaved={showSaved}
          />
        )}
        {activeTab === "music" && (
          <MusicTab musicUrl={musicUrl} setMusicUrl={setMusicUrl} showSaved={showSaved} />
        )}
        {activeTab === "logo" && (
          <LogoTab logoUrl={logoUrl} setLogoUrl={setLogoUrl} showSaved={showSaved} />
        )}
        {activeTab === "passwords" && (
          <PasswordsTab adminPassword={adminPassword} setAdminPassword={setAdminPassword} sitePassword={sitePassword} setSitePassword={setSitePassword} showSaved={showSaved} />
        )}
      </div>
    </div>
  );
}

/* ─── Shared UI ─── */
function Card({ children, color = "lime" }: { children: React.ReactNode; color?: "lime" | "cyan" | "rose" | "purple" | "gold" }) {
  const colors = {
    lime:   { bg: "rgba(200,255,0,0.04)",   border: "rgba(200,255,0,0.18)",  title: "#C8FF00" },
    gold:   { bg: "rgba(255,215,0,0.04)",   border: "rgba(255,215,0,0.18)",  title: "#FFD700" },
    cyan:   { bg: "rgba(0,229,255,0.04)",   border: "rgba(0,229,255,0.18)",  title: "#00e5ff" },
    rose:   { bg: "rgba(255,128,171,0.04)", border: "rgba(255,128,171,0.18)",title: "#ff80ab" },
    purple: { bg: "rgba(224,64,251,0.04)",  border: "rgba(224,64,251,0.18)", title: "#e040fb" },
  }[color];
  return (
    <div className="rounded-2xl p-6" style={{ background: colors.bg, border: `1px solid ${colors.border}`, boxShadow: "0 0 30px rgba(0,0,0,0.4)" }}>
      {children}
    </div>
  );
}

function CardTitle({ children, color = "#C8FF00" }: { children: React.ReactNode; color?: string }) {
  return (
    <h2 className="text-lg font-bold mb-5" style={{ color, fontFamily: "'Cairo', sans-serif", textShadow: `0 0 10px ${color}55` }}>
      {children}
    </h2>
  );
}

function Input({ value, onChange, placeholder, dir = "rtl", type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; dir?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#fff",
        outline: "none",
        fontFamily: "'Cairo', sans-serif",
        direction: dir as "rtl" | "ltr",
      }}
    />
  );
}

function Btn({ onClick, children, variant = "lime", disabled }: {
  onClick: () => void; children: React.ReactNode; variant?: "lime" | "gold" | "cyan" | "rose" | "danger"; disabled?: boolean;
}) {
  const styles = {
    lime:   { bg: "rgba(200,255,0,0.15)",   border: "rgba(200,255,0,0.35)",   color: "#C8FF00"  },
    gold:   { bg: "rgba(255,215,0,0.15)",   border: "rgba(255,215,0,0.35)",   color: "#FFD700"  },
    cyan:   { bg: "rgba(0,229,255,0.15)",   border: "rgba(0,229,255,0.3)",    color: "#00e5ff"  },
    rose:   { bg: "rgba(255,128,171,0.15)", border: "rgba(255,128,171,0.3)",  color: "#ff80ab"  },
    danger: { bg: "rgba(255,50,50,0.12)",   border: "rgba(255,50,50,0.28)",   color: "#ff6464"  },
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:brightness-125 disabled:opacity-40"
      style={{ background: styles.bg, border: `1px solid ${styles.border}`, color: styles.color, fontFamily: "'Cairo', sans-serif" }}
    >
      {children}
    </button>
  );
}

function ToggleBtn({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-150"
      style={{
        background: value ? "rgba(200,255,0,0.14)" : "rgba(255,100,100,0.12)",
        border: value ? "1px solid rgba(200,255,0,0.35)" : "1px solid rgba(255,100,100,0.3)",
        color: value ? "#C8FF00" : "#ff6464",
        fontFamily: "'Cairo', sans-serif",
        minWidth: "82px",
      }}
    >
      {value ? "مُظهَر ✓" : "مُخفي ✗"}
    </button>
  );
}

/* ── SiteTab ── */
function SiteTab({ sitePasswordEnabled, setSitePasswordEnabled, sitePassword, setSitePassword, showSaved }: {
  sitePasswordEnabled: boolean; setSitePasswordEnabled: (v: boolean) => void;
  sitePassword: string; setSitePassword: (v: string) => void;
  showSaved: (msg?: string) => void;
}) {
  const [pass, setPass] = useState(sitePassword);
  return (
    <Card color="lime">
      <CardTitle>🌐 إعدادات الموقع</CardTitle>
      <div className="space-y-5">
        <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <p className="font-semibold" style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>قفل الموقع بكلمة مرور</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
              عند التفعيل يحتاج الزوار إلى إدخال كلمة مرور للدخول
            </p>
          </div>
          <button
            onClick={() => setSitePasswordEnabled(!sitePasswordEnabled)}
            className="relative w-14 h-7 rounded-full transition-all duration-300"
            style={{ background: sitePasswordEnabled ? "#C8FF00" : "rgba(255,255,255,0.2)" }}
          >
            <span className="absolute top-1 rounded-full w-5 h-5 bg-white transition-all duration-300" style={{ right: sitePasswordEnabled ? "4px" : "calc(100% - 24px)" }} />
          </button>
        </div>
        <AnimatePresence>
          {sitePasswordEnabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3">
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cairo', sans-serif" }}>كلمة مرور الدخول للزوار</p>
              <div className="flex gap-3">
                <div className="flex-1"><Input value={pass} onChange={setPass} placeholder="كلمة المرور" /></div>
                <Btn onClick={() => { setSitePassword(pass); showSaved(); }}>حفظ</Btn>
              </div>
              <p className="text-xs" style={{ color: "rgba(200,255,0,0.4)", fontFamily: "'Cairo', sans-serif" }}>
                كلمة المرور الحالية: <span style={{ color: "#C8FF00" }}>{sitePassword}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

/* ── SectionsTab ── */
function SectionsTab({ sections, toggleSection }: { sections: { id: string; label: string; visible: boolean }[]; toggleSection: (id: string) => void }) {
  return (
    <Card color="cyan">
      <CardTitle color="#00e5ff">📋 إدارة الأقسام</CardTitle>
      <div className="space-y-2.5">
        {sections.map((sec) => (
          <div key={sec.id} className="flex items-center justify-between p-3.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{sec.label}</span>
            <ToggleBtn value={sec.visible} onToggle={() => toggleSection(sec.id)} />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── GalleryTab ── */
function GalleryTab({ images, toggleImage, addImage, removeImage, showSaved }: {
  images: { id: string; url: string; alt: string; visible: boolean }[];
  toggleImage: (id: string) => void;
  addImage: (img: { url: string; alt: string }) => void;
  removeImage: (id: string) => void;
  showSaved: (msg?: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [activeAdd, setActiveAdd] = useState<"link" | "file" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleAddByLink() {
    if (!url.trim()) return;
    addImage({ url: url.trim(), alt: alt.trim() || "صورة" });
    setUrl(""); setAlt(""); setActiveAdd(null);
    showSaved("تمت إضافة الصورة ✓");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) addImage({ url: dataUrl, alt: file.name.replace(/\.[^.]+$/, "") });
      };
      reader.readAsDataURL(file);
    });
    showSaved(`تمت إضافة ${files.length} صورة ✓`);
    e.target.value = "";
    setActiveAdd(null);
  }

  return (
    <Card color="cyan">
      <div className="flex items-center justify-between mb-5">
        <CardTitle color="#00e5ff">🖼️ إدارة صور المعرض ({images.length})</CardTitle>
        <div className="flex gap-2">
          <Btn onClick={() => setActiveAdd(activeAdd === "link" ? null : "link")} variant="cyan">🔗 رابط</Btn>
          <Btn onClick={() => { setActiveAdd(null); fileRef.current?.click(); }} variant="lime">📁 رفع ملف</Btn>
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

      <AnimatePresence>
        {activeAdd === "link" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="mb-5 p-4 rounded-xl space-y-3" style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.14)" }}>
            <p className="text-sm font-semibold" style={{ color: "#00e5ff", fontFamily: "'Cairo', sans-serif" }}>إضافة صورة برابط</p>
            <Input value={url} onChange={setUrl} placeholder="https://example.com/image.jpg" dir="ltr" />
            <Input value={alt} onChange={setAlt} placeholder="وصف الصورة (اختياري)" />
            <div className="flex gap-2">
              <Btn onClick={handleAddByLink} variant="cyan" disabled={!url.trim()}>+ إضافة</Btn>
              <Btn onClick={() => setActiveAdd(null)} variant="danger">إلغاء</Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-3">
        {images.map((img) => (
          <div key={img.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <img
              src={img.url}
              alt={img.alt}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              style={{ opacity: img.visible ? 0.9 : 0.3, border: img.visible ? "1px solid rgba(200,255,0,0.2)" : "1px solid rgba(255,100,100,0.2)" }}
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.15"; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{img.alt}</p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.25)", direction: "ltr" }}>
                {img.url.startsWith("data:") ? "📁 ملف محلي" : img.url.slice(0, 55) + (img.url.length > 55 ? "…" : "")}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <ToggleBtn value={img.visible} onToggle={() => toggleImage(img.id)} />
              {confirmDel === img.id ? (
                <>
                  <Btn onClick={() => { removeImage(img.id); setConfirmDel(null); showSaved("تم الحذف ✓"); }} variant="danger">تأكيد</Btn>
                  <Btn onClick={() => setConfirmDel(null)}>إلغاء</Btn>
                </>
              ) : (
                <Btn onClick={() => setConfirmDel(img.id)} variant="danger">حذف</Btn>
              )}
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className="text-center py-8" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif" }}>لا توجد صور</p>
        )}
      </div>
    </Card>
  );
}

/* ── VideosTab ── */
function VideosTab({ videos, addVideo, removeVideo, toggleVideo, updateVideo, showSaved }: {
  videos: VideoItem[];
  addVideo: (v: { url: string; title: string; type: VideoItem["type"] }) => void;
  removeVideo: (id: string) => void;
  toggleVideo: (id: string) => void;
  updateVideo: (id: string, updates: Partial<VideoItem>) => void;
  showSaved: (msg?: string) => void;
}) {
  const [addType, setAddType] = useState<"youtube" | "link" | "file">("youtube");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    if (!url.trim()) return;
    addVideo({ url: url.trim(), title: title.trim() || "فيديو", type: addType });
    setUrl(""); setTitle(""); setShowAdd(false);
    showSaved("تمت إضافة الفيديو ✓");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const objUrl = URL.createObjectURL(file);
      addVideo({ url: objUrl, title: file.name.replace(/\.[^.]+$/, ""), type: "file" });
    });
    showSaved(`تمت إضافة ${files.length} فيديو ✓`);
    e.target.value = "";
  }

  const typeLabels = { youtube: "يوتيوب", link: "رابط مباشر", file: "ملف" };

  return (
    <Card color="rose">
      <div className="flex items-center justify-between mb-5">
        <CardTitle color="#ff80ab">🎬 إدارة الفيديوهات ({videos.length})</CardTitle>
        <div className="flex gap-2">
          <Btn onClick={() => setShowAdd(!showAdd)} variant="rose">{showAdd ? "✕ إغلاق" : "+ إضافة فيديو"}</Btn>
          <Btn onClick={() => fileRef.current?.click()} variant="lime">📁 رفع ملف</Btn>
        </div>
      </div>

      <input ref={fileRef} type="file" accept="video/*" multiple className="hidden" onChange={handleFileChange} />

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="mb-5 p-4 rounded-xl space-y-3" style={{ background: "rgba(255,128,171,0.04)", border: "1px solid rgba(255,128,171,0.18)" }}>
            <p className="text-sm font-semibold" style={{ color: "#ff80ab", fontFamily: "'Cairo', sans-serif" }}>إضافة فيديو</p>

            {/* Type selector */}
            <div className="flex gap-2">
              {(["youtube", "link"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setAddType(t)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: addType === t ? "rgba(255,128,171,0.2)" : "rgba(255,255,255,0.04)",
                    border: addType === t ? "1px solid rgba(255,128,171,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    color: addType === t ? "#ff80ab" : "rgba(255,255,255,0.4)",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  {typeLabels[t]}
                </button>
              ))}
            </div>

            <Input value={url} onChange={setUrl}
              placeholder={addType === "youtube" ? "https://youtube.com/watch?v=..." : "https://example.com/video.mp4"}
              dir="ltr" />
            <Input value={title} onChange={setTitle} placeholder="عنوان الفيديو (اختياري)" />
            <div className="flex gap-2">
              <Btn onClick={handleAdd} variant="rose" disabled={!url.trim()}>+ إضافة</Btn>
              <Btn onClick={() => setShowAdd(false)} variant="danger">إلغاء</Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {videos.map((v) => (
          <div key={v.id} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {editId === v.id ? (
              <div className="p-3 flex gap-2">
                <div className="flex-1">
                  <Input value={editTitle} onChange={setEditTitle} placeholder="عنوان الفيديو" />
                </div>
                <Btn onClick={() => { updateVideo(v.id, { title: editTitle }); setEditId(null); showSaved(); }} variant="cyan">✓ حفظ</Btn>
                <Btn onClick={() => setEditId(null)} variant="danger">إلغاء</Btn>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3.5">
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{v.type === "youtube" ? "▶️" : v.type === "file" ? "📁" : "🔗"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{v.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
                      background: "rgba(255,128,171,0.12)",
                      color: "#ff80ab",
                      fontFamily: "'Cairo', sans-serif",
                    }}>
                      {typeLabels[v.type]}
                    </span>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.25)", direction: "ltr" }}>
                      {v.url.startsWith("blob:") ? "ملف محلي" : v.url.slice(0, 45) + (v.url.length > 45 ? "…" : "")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <ToggleBtn value={v.visible} onToggle={() => toggleVideo(v.id)} />
                  <Btn onClick={() => { setEditId(v.id); setEditTitle(v.title); }} variant="gold">تعديل</Btn>
                  {confirmDel === v.id ? (
                    <>
                      <Btn onClick={() => { removeVideo(v.id); setConfirmDel(null); showSaved("تم الحذف ✓"); }} variant="danger">تأكيد</Btn>
                      <Btn onClick={() => setConfirmDel(null)}>إلغاء</Btn>
                    </>
                  ) : (
                    <Btn onClick={() => setConfirmDel(v.id)} variant="danger">حذف</Btn>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {videos.length === 0 && (
          <div className="text-center py-10" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Cairo', sans-serif" }}>
            لا توجد فيديوهات — اضغط "+ إضافة فيديو" أو "رفع ملف" لإضافة أول فيديو
          </div>
        )}
      </div>
    </Card>
  );
}

/* ── CardsTab ── */
function CardsTab({
  marwanVisible, setMarwanVisible, saraVisible, setSaraVisible,
  customCards, addCustomCard, updateCustomCard, removeCustomCard, toggleCustomCard, showSaved,
}: {
  marwanVisible: boolean; setMarwanVisible: (v: boolean) => void;
  saraVisible: boolean; setSaraVisible: (v: boolean) => void;
  customCards: CustomCard[];
  addCustomCard: (c: Omit<CustomCard, "id">) => void;
  updateCustomCard: (id: string, u: Partial<CustomCard>) => void;
  removeCustomCard: (id: string) => void;
  toggleCustomCard: (id: string) => void;
  showSaved: (msg?: string) => void;
}) {
  const emptyCard: Omit<CustomCard, "id"> = { variant: "gold", titleAr: "", titleEn: "", contentAr: "", contentEn: "", visible: true };
  const [newCard, setNewCard] = useState(emptyCard);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<CustomCard>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function handleAdd() {
    if (!newCard.contentAr.trim() && !newCard.contentEn.trim()) return;
    addCustomCard(newCard);
    setNewCard(emptyCard);
    setShowAdd(false);
    showSaved("تمت إضافة البطاقة ✓");
  }

  return (
    <div className="space-y-5">
      {/* Fixed cards */}
      <Card color="purple">
        <CardTitle color="#e040fb">✉️ بطاقات ثابتة</CardTitle>
        <div className="space-y-3">
          {[
            { label: "رسالة مروان نجم",     visible: marwanVisible, toggle: () => setMarwanVisible(!marwanVisible) },
            { label: "تهنئة سارة وحمزة",    visible: saraVisible,   toggle: () => setSaraVisible(!saraVisible)   },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{item.label}</span>
              <ToggleBtn value={item.visible} onToggle={item.toggle} />
            </div>
          ))}
        </div>
      </Card>

      {/* Custom cards */}
      <Card color="gold">
        <div className="flex items-center justify-between mb-5">
          <CardTitle>💬 بطاقات مخصصة ({customCards.length})</CardTitle>
          <Btn onClick={() => setShowAdd(!showAdd)} variant="gold">{showAdd ? "✕ إغلاق" : "+ إضافة بطاقة"}</Btn>
        </div>

        <AnimatePresence>
          {showAdd && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl space-y-3" style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.18)" }}>
              <p className="font-bold text-sm" style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif" }}>بطاقة جديدة</p>
              <div className="flex gap-2 flex-wrap">
                {VARIANTS.map((v) => (
                  <button key={v.id} onClick={() => setNewCard({ ...newCard, variant: v.id })}
                    className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: newCard.variant === v.id ? `${v.color}33` : "rgba(255,255,255,0.06)",
                      border: newCard.variant === v.id ? `1px solid ${v.color}` : "1px solid rgba(255,255,255,0.15)",
                      color: v.color, fontFamily: "'Cairo', sans-serif",
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>عنوان (عربي)</label>
                  <Input value={newCard.titleAr} onChange={(v) => setNewCard({ ...newCard, titleAr: v })} placeholder="عنوان البطاقة بالعربي" />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif", direction: "ltr", textAlign: "right" }}>Title (English)</label>
                  <Input value={newCard.titleEn} onChange={(v) => setNewCard({ ...newCard, titleEn: v })} placeholder="Card title in English" dir="ltr" />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>المحتوى (عربي) *</label>
                  <textarea value={newCard.contentAr} onChange={(e) => setNewCard({ ...newCard, contentAr: e.target.value })} rows={4}
                    placeholder="نص البطاقة بالعربي..." className="w-full px-3 py-2 rounded-lg resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", outline: "none", fontFamily: "'Cairo', sans-serif", direction: "rtl" }} />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif", direction: "ltr", textAlign: "right" }}>Content (English)</label>
                  <textarea value={newCard.contentEn} onChange={(e) => setNewCard({ ...newCard, contentEn: e.target.value })} rows={4}
                    placeholder="Card content in English..." className="w-full px-3 py-2 rounded-lg resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", outline: "none", fontFamily: "'Cairo', sans-serif", direction: "ltr" }} />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Btn onClick={() => setShowAdd(false)} variant="danger">إلغاء</Btn>
                <Btn onClick={handleAdd} variant="cyan" disabled={!newCard.contentAr.trim() && !newCard.contentEn.trim()}>✓ إضافة</Btn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {customCards.length === 0 && !showAdd && (
          <div className="text-center py-10" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Cairo', sans-serif" }}>
            لا توجد بطاقات مخصصة بعد — اضغط "+ إضافة بطاقة" لإنشاء أول بطاقة
          </div>
        )}

        <div className="space-y-3">
          {customCards.map((card) => (
            <div key={card.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              {editId === card.id ? (
                <div className="p-4 space-y-3">
                  <div className="flex gap-2 flex-wrap mb-2">
                    {VARIANTS.map((v) => (
                      <button key={v.id} onClick={() => setEditData({ ...editData, variant: v.id })}
                        className="px-3 py-1 rounded-lg text-xs font-bold"
                        style={{
                          background: editData.variant === v.id ? `${v.color}33` : "rgba(255,255,255,0.06)",
                          border: editData.variant === v.id ? `1px solid ${v.color}` : "1px solid rgba(255,255,255,0.15)",
                          color: v.color, fontFamily: "'Cairo', sans-serif",
                        }}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>عنوان (عربي)</label>
                      <Input value={editData.titleAr ?? ""} onChange={(v) => setEditData({ ...editData, titleAr: v })} />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif", direction: "ltr", textAlign: "right" }}>Title (English)</label>
                      <Input value={editData.titleEn ?? ""} onChange={(v) => setEditData({ ...editData, titleEn: v })} dir="ltr" />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>المحتوى (عربي)</label>
                      <textarea value={editData.contentAr ?? ""} onChange={(e) => setEditData({ ...editData, contentAr: e.target.value })} rows={3}
                        className="w-full px-3 py-2 rounded-lg resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", outline: "none", fontFamily: "'Cairo', sans-serif", direction: "rtl" }} />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif", direction: "ltr", textAlign: "right" }}>Content (English)</label>
                      <textarea value={editData.contentEn ?? ""} onChange={(e) => setEditData({ ...editData, contentEn: e.target.value })} rows={3}
                        className="w-full px-3 py-2 rounded-lg resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", outline: "none", fontFamily: "'Cairo', sans-serif", direction: "ltr" }} />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Btn onClick={() => setEditId(null)} variant="danger">إلغاء</Btn>
                    <Btn onClick={() => { updateCustomCard(editId!, editData); setEditId(null); setEditData({}); showSaved(); }} variant="cyan">✓ حفظ</Btn>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 p-3.5">
                  <div className="w-3 rounded-full flex-shrink-0 self-stretch" style={{ background: VARIANTS.find((v) => v.id === card.variant)?.color ?? "#C8FF00", minHeight: "40px" }} />
                  <div className="flex-1 min-w-0">
                    {card.titleAr && <p className="font-semibold text-sm mb-0.5 truncate" style={{ color: "#C8FF00", fontFamily: "'Cairo', sans-serif" }}>{card.titleAr}</p>}
                    <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cairo', sans-serif" }}>{card.contentAr || card.contentEn}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <ToggleBtn value={card.visible} onToggle={() => toggleCustomCard(card.id)} />
                    <Btn onClick={() => { setEditId(card.id); setEditData({ ...card }); }} variant="gold">تعديل</Btn>
                    {confirmDelete === card.id ? (
                      <>
                        <Btn onClick={() => { removeCustomCard(card.id); setConfirmDelete(null); showSaved("تم الحذف ✓"); }} variant="danger">تأكيد الحذف</Btn>
                        <Btn onClick={() => setConfirmDelete(null)}>إلغاء</Btn>
                      </>
                    ) : (
                      <Btn onClick={() => setConfirmDelete(card.id)} variant="danger">حذف</Btn>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── MusicTab ── */
function MusicTab({ musicUrl, setMusicUrl, showSaved }: {
  musicUrl: string; setMusicUrl: (v: string) => void; showSaved: (msg?: string) => void;
}) {
  const [url, setUrl] = useState(musicUrl);
  return (
    <Card color="lime">
      <CardTitle>🎵 إعدادات الموسيقى</CardTitle>
      <div className="space-y-4">
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
          أدخل رابط ملف MP3 مباشر (يُشغَّل تلقائياً في مشغّل الموسيقى)
        </p>
        <div className="flex gap-3">
          <div className="flex-1"><Input value={url} onChange={setUrl} placeholder="https://example.com/music.mp3" dir="ltr" /></div>
          <Btn onClick={() => { setMusicUrl(url.trim()); showSaved(); }} disabled={!url.trim()}>حفظ</Btn>
        </div>
        {musicUrl && (
          <div className="p-3 rounded-lg" style={{ background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.14)" }}>
            <p className="text-xs mb-1" style={{ color: "rgba(200,255,0,0.5)", fontFamily: "'Cairo', sans-serif" }}>الرابط الحالي:</p>
            <p className="text-xs break-all" style={{ color: "#C8FF00", direction: "ltr", fontFamily: "monospace" }}>{musicUrl}</p>
          </div>
        )}
        <Btn onClick={() => { setMusicUrl(""); setUrl(""); showSaved("تم حذف الموسيقى ✓"); }} variant="danger" disabled={!musicUrl}>
          🗑️ إزالة الموسيقى
        </Btn>
      </div>
    </Card>
  );
}

/* ── LogoTab ── */
function LogoTab({ logoUrl, setLogoUrl, showSaved }: {
  logoUrl: string; setLogoUrl: (v: string) => void; showSaved: (msg?: string) => void;
}) {
  const [url, setUrl] = useState(logoUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) { setLogoUrl(dataUrl); setUrl(dataUrl); showSaved("تم رفع الشعار ✓"); }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  const currentLogo = logoUrl || LOGO_IMG;

  return (
    <Card color="lime">
      <CardTitle>🏷️ إدارة شعار الموقع</CardTitle>
      <div className="space-y-5">
        <div className="flex justify-center">
          <div className="rounded-2xl p-6 flex flex-col items-center gap-3" style={{ background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.18)" }}>
            <p className="text-xs" style={{ color: "rgba(200,255,0,0.5)", fontFamily: "'Cairo', sans-serif" }}>الشعار الحالي</p>
            <img src={currentLogo} alt="الشعار الحالي" style={{ height: "80px", objectFit: "contain", filter: "drop-shadow(0 0 16px rgba(200,255,0,0.5))" }} />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: "#C8FF00", fontFamily: "'Cairo', sans-serif" }}>رفع شعار جديد</p>
          <div className="flex gap-3">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <Btn onClick={() => fileRef.current?.click()} variant="lime">📁 اختيار ملف</Btn>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: "#C8FF00", fontFamily: "'Cairo', sans-serif" }}>أو أدخل رابط الشعار</p>
          <div className="flex gap-3">
            <div className="flex-1"><Input value={url} onChange={setUrl} placeholder="https://example.com/logo.png" dir="ltr" /></div>
            <Btn onClick={() => { setLogoUrl(url.trim()); showSaved(); }} disabled={!url.trim()}>حفظ</Btn>
          </div>
        </div>

        {logoUrl && (
          <Btn onClick={() => { setLogoUrl(""); setUrl(""); showSaved("تمت إعادة الشعار الافتراضي ✓"); }} variant="danger">
            🔄 إعادة الشعار الافتراضي
          </Btn>
        )}
      </div>
    </Card>
  );
}

/* ── PasswordsTab ── */
function PasswordsTab({ adminPassword, setAdminPassword, sitePassword, setSitePassword, showSaved }: {
  adminPassword: string; setAdminPassword: (v: string) => void;
  sitePassword: string; setSitePassword: (v: string) => void;
  showSaved: (msg?: string) => void;
}) {
  const [newAdmin, setNewAdmin] = useState("");
  const [newSite, setNewSite] = useState("");
  return (
    <div className="space-y-5">
      <Card color="lime">
        <CardTitle>🔑 كلمة مرور الإدارة</CardTitle>
        <div className="space-y-3">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
            كلمة المرور الحالية: <span style={{ color: "#C8FF00", fontFamily: "monospace" }}>{adminPassword}</span>
          </p>
          <div className="flex gap-3">
            <div className="flex-1"><Input value={newAdmin} onChange={setNewAdmin} placeholder="كلمة مرور جديدة" type="password" /></div>
            <Btn onClick={() => { if (newAdmin.trim()) { setAdminPassword(newAdmin.trim()); setNewAdmin(""); showSaved(); } }}>حفظ</Btn>
          </div>
        </div>
      </Card>
      <Card color="cyan">
        <CardTitle color="#00e5ff">🔒 كلمة مرور الموقع</CardTitle>
        <div className="space-y-3">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
            كلمة المرور الحالية: <span style={{ color: "#00e5ff", fontFamily: "monospace" }}>{sitePassword}</span>
          </p>
          <div className="flex gap-3">
            <div className="flex-1"><Input value={newSite} onChange={setNewSite} placeholder="كلمة مرور جديدة للزوار" type="password" /></div>
            <Btn onClick={() => { if (newSite.trim()) { setSitePassword(newSite.trim()); setNewSite(""); showSaved(); } }} variant="cyan">حفظ</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}
