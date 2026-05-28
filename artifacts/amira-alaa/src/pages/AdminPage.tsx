import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, CustomCard } from "@/store/appStore";

type Tab = "site" | "sections" | "cards" | "gallery" | "music" | "passwords";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "site",      label: "الموقع",         icon: "🌐" },
  { id: "sections",  label: "الأقسام",         icon: "📋" },
  { id: "cards",     label: "البطاقات",        icon: "✉️" },
  { id: "gallery",   label: "المعرض",          icon: "🖼️" },
  { id: "music",     label: "الموسيقى",        icon: "🎵" },
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
    customCards, addCustomCard, updateCustomCard, removeCustomCard, toggleCustomCard,
    marwanVisible, setMarwanVisible,
    saraVisible, setSaraVisible,
    musicUrl, setMusicUrl,
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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "radial-gradient(ellipse at center, #0d0b1e 0%, #05030f 60%, #000008 100%)" }}
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-8 w-full max-w-md"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.06) 0%, rgba(184,134,11,0.09) 100%)",
            border: "1px solid rgba(255,215,0,0.3)",
            boxShadow: "0 0 40px rgba(255,215,0,0.1)",
          }}
        >
          <h1
            className="text-2xl font-bold text-center mb-8"
            style={{ fontFamily: "'Amiri', serif", color: "#FFD700", textShadow: "0 0 16px rgba(255,215,0,0.6)" }}
          >
            🔐 لوحة الإدارة
          </h1>
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
                background: "rgba(255,215,0,0.08)",
                border: "1px solid rgba(255,215,0,0.3)",
                color: "#FFD700",
                outline: "none",
                fontFamily: "'Cairo', sans-serif",
              }}
            />
            {loginError && (
              <p className="text-sm text-center" style={{ color: "#ff6464", fontFamily: "'Cairo', sans-serif" }}>
                {loginError}
              </p>
            )}
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(184,134,11,0.3))",
                border: "1px solid rgba(255,215,0,0.5)",
                color: "#FFD700",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "0 0 20px rgba(255,215,0,0.15)",
              }}
            >
              دخول
            </button>
          </div>
          <p className="text-center mt-6 text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif" }}>
            <a href="/" style={{ color: "rgba(0,229,255,0.5)" }}>← العودة للموقع</a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "radial-gradient(ellipse at center, #0d0b1e 0%, #05030f 60%, #000008 100%)" }}
      dir="rtl"
    >
      {/* Header */}
      <div
        className="sticky top-0 z-50"
        style={{
          background: "rgba(5,3,15,0.95)",
          borderBottom: "1px solid rgba(255,215,0,0.18)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold" style={{ fontFamily: "'Amiri', serif", color: "#FFD700" }}>
            ⚙️ لوحة إدارة الموقع
          </h1>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm px-3 py-1 rounded-lg"
                  style={{
                    background: "rgba(0,229,255,0.15)",
                    border: "1px solid rgba(0,229,255,0.3)",
                    color: "#00e5ff",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  {saved}
                </motion.span>
              )}
            </AnimatePresence>
            <a
              href="/"
              className="text-sm px-3 py-1.5 rounded-lg"
              style={{
                color: "rgba(0,229,255,0.6)",
                border: "1px solid rgba(0,229,255,0.2)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              ← الموقع
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 pb-0 overflow-x-auto">
          <div className="flex gap-1 pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200"
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  color: activeTab === tab.id ? "#FFD700" : "rgba(255,255,255,0.45)",
                  borderBottom: activeTab === tab.id ? "2px solid #FFD700" : "2px solid transparent",
                  background: activeTab === tab.id ? "rgba(255,215,0,0.06)" : "transparent",
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
        {/* ─── TAB: SITE ─── */}
        {activeTab === "site" && (
          <SiteTab
            sitePasswordEnabled={sitePasswordEnabled}
            setSitePasswordEnabled={setSitePasswordEnabled}
            sitePassword={sitePassword}
            setSitePassword={setSitePassword}
            showSaved={showSaved}
          />
        )}

        {/* ─── TAB: SECTIONS ─── */}
        {activeTab === "sections" && (
          <SectionsTab sections={sections} toggleSection={toggleSection} />
        )}

        {/* ─── TAB: CARDS ─── */}
        {activeTab === "cards" && (
          <CardsTab
            marwanVisible={marwanVisible}
            setMarwanVisible={setMarwanVisible}
            saraVisible={saraVisible}
            setSaraVisible={setSaraVisible}
            customCards={customCards}
            addCustomCard={addCustomCard}
            updateCustomCard={updateCustomCard}
            removeCustomCard={removeCustomCard}
            toggleCustomCard={toggleCustomCard}
            showSaved={showSaved}
          />
        )}

        {/* ─── TAB: GALLERY ─── */}
        {activeTab === "gallery" && (
          <GalleryTab
            images={images}
            toggleImage={toggleImage}
            addImage={addImage}
            removeImage={removeImage}
            showSaved={showSaved}
          />
        )}

        {/* ─── TAB: MUSIC ─── */}
        {activeTab === "music" && (
          <MusicTab musicUrl={musicUrl} setMusicUrl={setMusicUrl} showSaved={showSaved} />
        )}

        {/* ─── TAB: PASSWORDS ─── */}
        {activeTab === "passwords" && (
          <PasswordsTab
            adminPassword={adminPassword}
            setAdminPassword={setAdminPassword}
            sitePassword={sitePassword}
            setSitePassword={setSitePassword}
            showSaved={showSaved}
          />
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────── */
/* Sub-tabs                                   */
/* ────────────────────────────────────────── */

function Card({ children, color = "gold" }: { children: React.ReactNode; color?: "gold" | "cyan" | "rose" | "purple" }) {
  const colors = {
    gold:   { bg: "rgba(255,215,0,0.04)",   border: "rgba(255,215,0,0.2)",   title: "#FFD700" },
    cyan:   { bg: "rgba(0,229,255,0.04)",   border: "rgba(0,229,255,0.2)",   title: "#00e5ff" },
    rose:   { bg: "rgba(255,128,171,0.04)", border: "rgba(255,128,171,0.2)", title: "#ff80ab" },
    purple: { bg: "rgba(224,64,251,0.04)",  border: "rgba(224,64,251,0.2)",  title: "#e040fb" },
  }[color];
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: colors.bg, border: `1px solid ${colors.border}`, boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children, color = "#FFD700" }: { children: React.ReactNode; color?: string }) {
  return (
    <h2 className="text-lg font-bold mb-5" style={{ color, fontFamily: "'Cairo', sans-serif", textShadow: `0 0 10px ${color}66` }}>
      {children}
    </h2>
  );
}

function Input({
  value, onChange, placeholder, dir = "rtl", type = "text",
}: { value: string; onChange: (v: string) => void; placeholder?: string; dir?: string; type?: string }) {
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
        direction: dir,
      }}
    />
  );
}

function Btn({
  onClick, children, variant = "gold", disabled,
}: { onClick: () => void; children: React.ReactNode; variant?: "gold" | "cyan" | "rose" | "danger"; disabled?: boolean }) {
  const styles = {
    gold:   { bg: "rgba(255,215,0,0.18)",   border: "rgba(255,215,0,0.4)",   color: "#FFD700" },
    cyan:   { bg: "rgba(0,229,255,0.15)",   border: "rgba(0,229,255,0.35)",  color: "#00e5ff" },
    rose:   { bg: "rgba(255,128,171,0.15)", border: "rgba(255,128,171,0.35)", color: "#ff80ab" },
    danger: { bg: "rgba(255,50,50,0.15)",   border: "rgba(255,50,50,0.3)",   color: "#ff6464" },
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
        background: value ? "rgba(0,229,255,0.18)" : "rgba(255,100,100,0.15)",
        border: value ? "1px solid rgba(0,229,255,0.4)" : "1px solid rgba(255,100,100,0.35)",
        color: value ? "#00e5ff" : "#ff6464",
        fontFamily: "'Cairo', sans-serif",
        minWidth: "82px",
      }}
    >
      {value ? "مُظهَر ✓" : "مُخفي ✗"}
    </button>
  );
}

/* ── SiteTab ── */
function SiteTab({
  sitePasswordEnabled, setSitePasswordEnabled, sitePassword, setSitePassword, showSaved,
}: {
  sitePasswordEnabled: boolean; setSitePasswordEnabled: (v: boolean) => void;
  sitePassword: string; setSitePassword: (v: string) => void;
  showSaved: (msg?: string) => void;
}) {
  const [pass, setPass] = useState(sitePassword);
  return (
    <Card color="gold">
      <CardTitle>🌐 إعدادات الموقع</CardTitle>
      <div className="space-y-5">
        <div
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <p className="font-semibold" style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>قفل الموقع بكلمة مرور</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
              عند التفعيل يحتاج الزوار إلى إدخال كلمة مرور للدخول
            </p>
          </div>
          <button
            onClick={() => setSitePasswordEnabled(!sitePasswordEnabled)}
            className="relative w-14 h-7 rounded-full transition-all duration-300"
            style={{ background: sitePasswordEnabled ? "#00e5ff" : "rgba(255,255,255,0.2)" }}
          >
            <span
              className="absolute top-1 rounded-full w-5 h-5 bg-white transition-all duration-300"
              style={{ right: sitePasswordEnabled ? "4px" : "calc(100% - 24px)" }}
            />
          </button>
        </div>

        <AnimatePresence>
          {sitePasswordEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cairo', sans-serif" }}>
                كلمة مرور الدخول للزوار
              </p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input value={pass} onChange={setPass} placeholder="كلمة المرور" type="text" />
                </div>
                <Btn onClick={() => { setSitePassword(pass); showSaved(); }} variant="gold">حفظ</Btn>
              </div>
              <p className="text-xs" style={{ color: "rgba(255,215,0,0.4)", fontFamily: "'Cairo', sans-serif" }}>
                كلمة المرور الحالية: <span style={{ color: "#FFD700" }}>{sitePassword}</span>
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
          <div
            key={sec.id}
            className="flex items-center justify-between p-3.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{sec.label}</span>
            <ToggleBtn value={sec.visible} onToggle={() => toggleSection(sec.id)} />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── CardsTab ── */
function CardsTab({
  marwanVisible, setMarwanVisible,
  saraVisible, setSaraVisible,
  customCards, addCustomCard, updateCustomCard, removeCustomCard, toggleCustomCard,
  showSaved,
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
  const emptyCard: Omit<CustomCard, "id"> = {
    variant: "gold", titleAr: "", titleEn: "",
    contentAr: "", contentEn: "", visible: true,
  };
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

  function handleEdit(card: CustomCard) {
    setEditId(card.id);
    setEditData({ ...card });
  }

  function handleSaveEdit() {
    if (editId) {
      updateCustomCard(editId, editData);
      setEditId(null);
      setEditData({});
      showSaved();
    }
  }

  return (
    <div className="space-y-5">
      {/* Fixed cards */}
      <Card color="purple">
        <CardTitle color="#e040fb">✉️ بطاقات ثابتة</CardTitle>
        <div className="space-y-3">
          {[
            { label: "رسالة مروان نجم", visible: marwanVisible, toggle: () => setMarwanVisible(!marwanVisible) },
            { label: "تهنئة سارة وحمزة", visible: saraVisible, toggle: () => setSaraVisible(!saraVisible) },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
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
          <Btn onClick={() => setShowAdd(!showAdd)} variant="gold">
            {showAdd ? "✕ إغلاق" : "+ إضافة بطاقة"}
          </Btn>
        </div>

        {/* Add form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl space-y-3"
              style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)" }}
            >
              <p className="font-bold text-sm" style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif" }}>بطاقة جديدة</p>

              {/* Variant picker */}
              <div className="flex gap-2 flex-wrap">
                {VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setNewCard({ ...newCard, variant: v.id })}
                    className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: newCard.variant === v.id ? `${v.color}33` : "rgba(255,255,255,0.06)",
                      border: newCard.variant === v.id ? `1px solid ${v.color}` : "1px solid rgba(255,255,255,0.15)",
                      color: v.color,
                      fontFamily: "'Cairo', sans-serif",
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
                  <textarea
                    value={newCard.contentAr}
                    onChange={(e) => setNewCard({ ...newCard, contentAr: e.target.value })}
                    rows={4}
                    placeholder="نص البطاقة بالعربي..."
                    className="w-full px-3 py-2 rounded-lg resize-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                      outline: "none",
                      fontFamily: "'Cairo', sans-serif",
                      direction: "rtl",
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif", direction: "ltr", textAlign: "right" }}>Content (English)</label>
                  <textarea
                    value={newCard.contentEn}
                    onChange={(e) => setNewCard({ ...newCard, contentEn: e.target.value })}
                    rows={4}
                    placeholder="Card content in English..."
                    className="w-full px-3 py-2 rounded-lg resize-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                      outline: "none",
                      fontFamily: "'Cairo', sans-serif",
                      direction: "ltr",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Btn onClick={() => setShowAdd(false)} variant="danger">إلغاء</Btn>
                <Btn onClick={handleAdd} variant="cyan" disabled={!newCard.contentAr.trim() && !newCard.contentEn.trim()}>
                  ✓ إضافة
                </Btn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        {customCards.length === 0 && !showAdd && (
          <div className="text-center py-10" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Cairo', sans-serif" }}>
            لا توجد بطاقات مخصصة بعد — اضغط "+ إضافة بطاقة" لإنشاء أول بطاقة
          </div>
        )}

        <div className="space-y-3">
          {customCards.map((card) => (
            <div
              key={card.id}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            >
              {editId === card.id ? (
                /* Edit mode */
                <div className="p-4 space-y-3">
                  <div className="flex gap-2 flex-wrap mb-2">
                    {VARIANTS.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setEditData({ ...editData, variant: v.id })}
                        className="px-3 py-1 rounded-lg text-xs font-bold"
                        style={{
                          background: editData.variant === v.id ? `${v.color}33` : "rgba(255,255,255,0.06)",
                          border: editData.variant === v.id ? `1px solid ${v.color}` : "1px solid rgba(255,255,255,0.15)",
                          color: v.color,
                          fontFamily: "'Cairo', sans-serif",
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
                      <textarea
                        value={editData.contentAr ?? ""}
                        onChange={(e) => setEditData({ ...editData, contentAr: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", outline: "none", fontFamily: "'Cairo', sans-serif", direction: "rtl" }}
                      />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif", direction: "ltr", textAlign: "right" }}>Content (English)</label>
                      <textarea
                        value={editData.contentEn ?? ""}
                        onChange={(e) => setEditData({ ...editData, contentEn: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", outline: "none", fontFamily: "'Cairo', sans-serif", direction: "ltr" }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Btn onClick={() => setEditId(null)} variant="danger">إلغاء</Btn>
                    <Btn onClick={handleSaveEdit} variant="cyan">✓ حفظ</Btn>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div className="flex items-start gap-3 p-3.5">
                  <div
                    className="w-3 h-full rounded-full flex-shrink-0 self-stretch"
                    style={{ background: VARIANTS.find((v) => v.id === card.variant)?.color ?? "#FFD700", minHeight: "40px" }}
                  />
                  <div className="flex-1 min-w-0">
                    {card.titleAr && (
                      <p className="font-semibold text-sm mb-0.5 truncate" style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif" }}>
                        {card.titleAr}
                      </p>
                    )}
                    <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Cairo', sans-serif" }}>
                      {card.contentAr || card.contentEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <ToggleBtn value={card.visible} onToggle={() => toggleCustomCard(card.id)} />
                    <Btn onClick={() => handleEdit(card)} variant="gold">تعديل</Btn>
                    {confirmDelete === card.id ? (
                      <>
                        <Btn onClick={() => { removeCustomCard(card.id); setConfirmDelete(null); }} variant="danger">تأكيد الحذف</Btn>
                        <Btn onClick={() => setConfirmDelete(null)} variant="gold">إلغاء</Btn>
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

/* ── GalleryTab ── */
function GalleryTab({
  images, toggleImage, addImage, removeImage, showSaved,
}: {
  images: { id: string; url: string; alt: string; visible: boolean }[];
  toggleImage: (id: string) => void;
  addImage: (img: { url: string; alt: string }) => void;
  removeImage: (id: string) => void;
  showSaved: (msg?: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [confirmDel, setConfirmDel] = useState<string | null>(null);

  function handleAdd() {
    if (!url.trim()) return;
    addImage({ url: url.trim(), alt: alt.trim() || "صورة" });
    setUrl(""); setAlt("");
    showSaved("تمت إضافة الصورة ✓");
  }

  return (
    <Card color="cyan">
      <CardTitle color="#00e5ff">🖼️ إدارة صور المعرض ({images.length})</CardTitle>
      <div className="space-y-4">
        <div
          className="p-4 rounded-xl space-y-3"
          style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.15)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#00e5ff", fontFamily: "'Cairo', sans-serif" }}>إضافة صورة برابط</p>
          <Input value={url} onChange={setUrl} placeholder="https://example.com/image.jpg" dir="ltr" />
          <Input value={alt} onChange={setAlt} placeholder="وصف الصورة" />
          <Btn onClick={handleAdd} variant="cyan" disabled={!url.trim()}>+ إضافة</Btn>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                style={{ opacity: img.visible ? 0.9 : 0.35 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23333' width='64' height='64'/%3E%3Ctext x='50%25' y='60%25' font-size='24' text-anchor='middle' fill='%23777'%3E🖼%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{img.alt}</p>
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.28)", direction: "ltr" }}>{img.url.slice(0, 55)}{img.url.length > 55 ? "…" : ""}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <ToggleBtn value={img.visible} onToggle={() => toggleImage(img.id)} />
                {confirmDel === img.id ? (
                  <>
                    <Btn onClick={() => { removeImage(img.id); setConfirmDel(null); }} variant="danger">تأكيد</Btn>
                    <Btn onClick={() => setConfirmDel(null)} variant="gold">إلغاء</Btn>
                  </>
                ) : (
                  <Btn onClick={() => setConfirmDel(img.id)} variant="danger">حذف</Btn>
                )}
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <p className="text-center py-8" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif" }}>
              لا توجد صور
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ── MusicTab ── */
function MusicTab({ musicUrl, setMusicUrl, showSaved }: {
  musicUrl: string; setMusicUrl: (v: string) => void; showSaved: (msg?: string) => void;
}) {
  const [url, setUrl] = useState(musicUrl);

  return (
    <Card color="gold">
      <CardTitle>🎵 إعدادات الموسيقى</CardTitle>
      <div className="space-y-4">
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
          أدخل رابط ملف MP3 مباشر (يُشغَّل تلقائياً في مشغّل الموسيقى)
        </p>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input value={url} onChange={setUrl} placeholder="https://example.com/music.mp3" dir="ltr" />
          </div>
          <Btn onClick={() => { setMusicUrl(url.trim()); showSaved(); }} variant="gold" disabled={!url.trim()}>
            حفظ
          </Btn>
        </div>
        {musicUrl && (
          <div
            className="p-3 rounded-lg"
            style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
          >
            <p className="text-xs mb-1" style={{ color: "rgba(255,215,0,0.5)", fontFamily: "'Cairo', sans-serif" }}>الرابط الحالي:</p>
            <p className="text-xs break-all" style={{ color: "#FFD700", direction: "ltr", fontFamily: "monospace" }}>{musicUrl}</p>
          </div>
        )}
        <Btn onClick={() => { setMusicUrl(""); setUrl(""); showSaved("تم حذف الموسيقى ✓"); }} variant="danger" disabled={!musicUrl}>
          🗑️ إزالة الموسيقى
        </Btn>
      </div>
    </Card>
  );
}

/* ── PasswordsTab ── */
function PasswordsTab({
  adminPassword, setAdminPassword, sitePassword, setSitePassword, showSaved,
}: {
  adminPassword: string; setAdminPassword: (v: string) => void;
  sitePassword: string; setSitePassword: (v: string) => void;
  showSaved: (msg?: string) => void;
}) {
  const [newAdmin, setNewAdmin] = useState("");
  const [newAdmin2, setNewAdmin2] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [newSite, setNewSite] = useState("");

  function handleAdminChange() {
    if (!newAdmin.trim()) { setAdminErr("أدخل كلمة المرور الجديدة"); return; }
    if (newAdmin !== newAdmin2) { setAdminErr("كلمتا المرور غير متطابقتين"); return; }
    setAdminPassword(newAdmin.trim());
    setNewAdmin(""); setNewAdmin2("");
    setAdminErr("");
    showSaved("تم تغيير كلمة مرور الإدارة ✓");
  }

  return (
    <div className="space-y-5">
      <Card color="purple">
        <CardTitle color="#e040fb">🔐 تغيير كلمة مرور الإدارة</CardTitle>
        <div className="space-y-3">
          <div>
            <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
              كلمة المرور الجديدة
            </label>
            <Input value={newAdmin} onChange={(v) => { setNewAdmin(v); setAdminErr(""); }} placeholder="كلمة المرور الجديدة" type="password" />
          </div>
          <div>
            <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
              تأكيد كلمة المرور
            </label>
            <Input value={newAdmin2} onChange={(v) => { setNewAdmin2(v); setAdminErr(""); }} placeholder="أعد إدخال كلمة المرور" type="password" />
          </div>
          {adminErr && <p className="text-sm" style={{ color: "#ff6464", fontFamily: "'Cairo', sans-serif" }}>{adminErr}</p>}
          <Btn onClick={handleAdminChange} variant="rose" disabled={!newAdmin || !newAdmin2}>
            تغيير كلمة مرور الإدارة
          </Btn>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Cairo', sans-serif" }}>
            ⚠️ تأكد من حفظ كلمة المرور الجديدة قبل تسجيل الخروج
          </p>
        </div>
      </Card>

      <Card color="gold">
        <CardTitle>🔒 تغيير كلمة مرور الموقع</CardTitle>
        <div className="space-y-3">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}>
            كلمة المرور المطلوبة من الزوار عند تفعيل قفل الموقع
          </p>
          <Input value={newSite} onChange={setNewSite} placeholder="كلمة مرور الموقع الجديدة" type="text" />
          <Btn onClick={() => { setSitePassword(newSite.trim()); setNewSite(""); showSaved("تم تغيير كلمة مرور الموقع ✓"); }} variant="gold" disabled={!newSite.trim()}>
            حفظ
          </Btn>
          <p className="text-xs" style={{ color: "rgba(255,215,0,0.4)", fontFamily: "'Cairo', sans-serif" }}>
            كلمة مرور الموقع الحالية: <span style={{ color: "#FFD700" }}>{sitePassword}</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
