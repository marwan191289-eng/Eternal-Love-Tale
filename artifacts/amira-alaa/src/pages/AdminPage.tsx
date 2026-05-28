import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/appStore";

const ADMIN_PASSWORD = "amira2026";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const {
    sitePassword,
    setSitePassword,
    sitePasswordEnabled,
    setSitePasswordEnabled,
    sections,
    toggleSection,
    images,
    toggleImage,
    addImage,
    removeImage,
    messages,
    toggleMessage,
  } = useAppStore();

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [newSitePassword, setNewSitePassword] = useState(sitePassword);

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  }

  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "radial-gradient(ellipse at center, #0d0b1e 0%, #05030f 60%, #000008 100%)" }}
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
          <h1 className="text-2xl font-bold text-center mb-8 neon-gold" style={{ fontFamily: "'Amiri', serif" }}>
            🔐 لوحة الإدارة
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="كلمة المرور"
              className="w-full px-4 py-3 rounded-xl text-right"
              style={{
                background: "rgba(255,215,0,0.08)",
                border: "1px solid rgba(255,215,0,0.3)",
                color: "#FFD700",
                outline: "none",
                fontFamily: "'Cairo', sans-serif",
              }}
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
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
          <p className="text-center mt-6 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            <a href="/" style={{ color: "rgba(0,229,255,0.5)" }}>← العودة للموقع</a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: "radial-gradient(ellipse at center, #0d0b1e 0%, #05030f 60%, #000008 100%)" }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold neon-gold mb-2" style={{ fontFamily: "'Amiri', serif" }}>
            لوحة إدارة الموقع
          </h1>
          <a href="/" style={{ color: "rgba(0,229,255,0.6)", fontSize: "0.9rem" }}>← العودة للموقع</a>
        </div>

        {/* Site Lock */}
        <AdminSection title="🔒 قفل الموقع بكلمة مرور">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gold-300 flex items-center gap-2 cursor-pointer" style={{ color: "#FFD700" }}>
                <input
                  type="checkbox"
                  checked={sitePasswordEnabled}
                  onChange={(e) => setSitePasswordEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                تفعيل قفل الموقع
              </label>
            </div>
            {sitePasswordEnabled && (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSitePassword}
                  onChange={(e) => setNewSitePassword(e.target.value)}
                  placeholder="كلمة مرور الموقع"
                  className="flex-1 px-3 py-2 rounded-lg text-right"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,215,0,0.25)",
                    color: "#fff",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                />
                <button
                  onClick={() => setSitePassword(newSitePassword)}
                  className="px-4 py-2 rounded-lg"
                  style={{
                    background: "rgba(255,215,0,0.2)",
                    border: "1px solid rgba(255,215,0,0.4)",
                    color: "#FFD700",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  حفظ
                </button>
              </div>
            )}
          </div>
        </AdminSection>

        {/* Sections */}
        <AdminSection title="📋 إدارة الأقسام">
          <div className="space-y-3">
            {sections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{section.label}</span>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200"
                  style={{
                    background: section.visible
                      ? "rgba(0,229,255,0.2)"
                      : "rgba(255,100,100,0.2)",
                    border: section.visible
                      ? "1px solid rgba(0,229,255,0.4)"
                      : "1px solid rgba(255,100,100,0.4)",
                    color: section.visible ? "#00e5ff" : "#ff6464",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  {section.visible ? "مُظهَر ✓" : "مُخفي ✗"}
                </button>
              </div>
            ))}
          </div>
        </AdminSection>

        {/* Images */}
        <AdminSection title="🖼️ إدارة الصور">
          <div className="space-y-4">
            {/* Add image */}
            <div
              className="p-4 rounded-xl space-y-3"
              style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.15)" }}
            >
              <p className="text-sm" style={{ color: "#00e5ff" }}>إضافة صورة جديدة</p>
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="رابط الصورة (URL)"
                className="w-full px-3 py-2 rounded-lg text-right"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  color: "#fff",
                  fontFamily: "'Cairo', sans-serif",
                  direction: "ltr",
                }}
              />
              <input
                type="text"
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
                placeholder="وصف الصورة"
                className="w-full px-3 py-2 rounded-lg text-right"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  color: "#fff",
                  fontFamily: "'Cairo', sans-serif",
                }}
              />
              <button
                onClick={() => {
                  if (newImageUrl.trim()) {
                    addImage({ url: newImageUrl.trim(), alt: newImageAlt.trim() || "صورة" });
                    setNewImageUrl("");
                    setNewImageAlt("");
                  }
                }}
                className="w-full py-2 rounded-lg"
                style={{
                  background: "rgba(0,229,255,0.15)",
                  border: "1px solid rgba(0,229,255,0.35)",
                  color: "#00e5ff",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                + إضافة صورة
              </button>
            </div>

            {/* Image list */}
            <div className="space-y-2">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    style={{ opacity: 0.7 }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect width='56' height='56' fill='%23333'/%3E%3Ctext x='50%25' y='55%25' font-size='20' text-anchor='middle' fill='%23666'%3E🖼%3C/text%3E%3C/svg%3E"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate" style={{ color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{img.alt}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.3)", direction: "ltr" }}>{img.url}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleImage(img.id)}
                      className="px-3 py-1 rounded-lg text-xs"
                      style={{
                        background: img.visible ? "rgba(0,229,255,0.15)" : "rgba(255,100,100,0.15)",
                        border: img.visible ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,100,100,0.3)",
                        color: img.visible ? "#00e5ff" : "#ff6464",
                        fontFamily: "'Cairo', sans-serif",
                      }}
                    >
                      {img.visible ? "مُظهَر" : "مُخفي"}
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="px-3 py-1 rounded-lg text-xs"
                      style={{
                        background: "rgba(255,50,50,0.15)",
                        border: "1px solid rgba(255,50,50,0.3)",
                        color: "#ff6464",
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <p className="text-center py-6" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif" }}>
                  لا توجد صور بعد
                </p>
              )}
            </div>
          </div>
        </AdminSection>

        {/* Messages */}
        <AdminSection title="✉️ إدارة الرسائل">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex-1 min-w-0 ml-3">
                  <p className="font-semibold mb-1" style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif" }}>{msg.sender}</p>
                  <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Cairo', sans-serif" }}>{msg.preview}</p>
                </div>
                <button
                  onClick={() => toggleMessage(msg.id)}
                  className="px-4 py-1.5 rounded-lg text-sm font-bold flex-shrink-0"
                  style={{
                    background: msg.visible ? "rgba(0,229,255,0.2)" : "rgba(255,100,100,0.2)",
                    border: msg.visible ? "1px solid rgba(0,229,255,0.4)" : "1px solid rgba(255,100,100,0.4)",
                    color: msg.visible ? "#00e5ff" : "#ff6464",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  {msg.visible ? "مُظهَر ✓" : "مُخفي ✗"}
                </button>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </div>
  );
}

function AdminSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "linear-gradient(135deg, rgba(255,215,0,0.04) 0%, rgba(184,134,11,0.06) 100%)",
        border: "1px solid rgba(255,215,0,0.2)",
        boxShadow: "0 0 30px rgba(255,215,0,0.05)",
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", textShadow: "0 0 12px rgba(255,215,0,0.5)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
