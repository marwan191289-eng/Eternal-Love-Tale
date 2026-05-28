import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonCard from "@/components/NeonCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DevCard from "@/components/DevCard";
import ThemePicker from "@/components/ThemePicker";
import VerticalImageStrips from "@/components/VerticalImageStrips";
import MusicPlayer from "@/components/MusicPlayer";
import { useAppStore, TEXT_PALETTES, BG_PALETTES, COMBINED_THEMES, VideoItem } from "@/store/appStore";
import { useLang } from "@/context/LangContext";

function useThemeStyles() {
  const { themeMode, selectedTextPalette, selectedBgPalette, selectedCombinedTheme } = useAppStore();
  const defaultBg = "radial-gradient(ellipse at center, #0d0b1e 0%, #05030f 60%, #000008 100%)";
  if (themeMode === "default") return { bg: defaultBg, accent: "#FFD700" };
  if (themeMode === "text") {
    const p = TEXT_PALETTES.find((x) => x.id === selectedTextPalette) ?? TEXT_PALETTES[0];
    return { bg: defaultBg, accent: p.textColor };
  }
  if (themeMode === "bg") {
    const p = BG_PALETTES.find((x) => x.id === selectedBgPalette) ?? BG_PALETTES[0];
    return { bg: p.value, accent: "#FFD700" };
  }
  const t = COMBINED_THEMES.find((x) => x.id === selectedCombinedTheme) ?? COMBINED_THEMES[0];
  return { bg: t.bgColor, accent: t.textColor };
}

function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  const { sections } = useAppStore();
  const sec = sections.find((s) => s.id === id);
  if (!sec || !sec.visible) return null;
  return <>{children}</>;
}

function Divider({ color }: { color?: string }) {
  const { accent } = useThemeStyles();
  const c = color ?? `${accent}33`;
  return (
    <div className="flex items-center gap-4 my-8 px-4">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${c})` }} />
      <span style={{ color: c, fontSize: "1.2rem" }}>✦</span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${c})` }} />
    </div>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, delay },
  };
}

const centeredText: React.CSSProperties = { textAlign: "center", textAlignLast: "center" };
const justifyText: React.CSSProperties = { textAlign: "justify", textAlignLast: "center" };

/* ── Days-since counter ── */
function DaysSinceCounter({ accent }: { accent: string }) {
  const { lang } = useLang();
  const WEDDING_DATE = new Date("2026-05-14T00:00:00");

  function getDays() {
    const now = new Date();
    const diff = now.getTime() - WEDDING_DATE.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }

  const [days, setDays] = useState(getDays);

  useEffect(() => {
    const t = setInterval(() => setDays(getDays()), 60000);
    return () => clearInterval(t);
  }, []);

  const label = lang === "ar"
    ? `يوم من يوم الاحتفال 💛`
    : `days since the celebration 💛`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.9 }}
      className="flex flex-col items-center gap-2 my-6"
    >
      <div className="flex items-baseline gap-3">
        <span
          style={{
            fontFamily: "'Amiri', serif",
            fontSize: "clamp(3.5rem, 12vw, 6rem)",
            fontWeight: 700,
            color: accent,
            textShadow: `0 0 24px ${accent}99, 0 0 48px ${accent}44`,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {days.toLocaleString("ar-EG")}
        </span>
      </div>
      <p
        className="text-base tracking-wide"
        style={{
          color: `${accent}bb`,
          fontFamily: "'Cairo', sans-serif",
          textShadow: `0 0 12px ${accent}44`,
          ...centeredText,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

/* ── YouTube helper ── */
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function VideoCard({ video, accent }: { video: VideoItem; accent: string }) {
  const ytId = getYouTubeId(video.url);
  return (
    <motion.div {...fadeUp(0.05)} className="rounded-2xl overflow-hidden" style={{
      background: `linear-gradient(135deg, ${accent}08 0%, ${accent}04 100%)`,
      border: `1px solid ${accent}30`,
      boxShadow: `0 0 20px ${accent}08`,
    }}>
      {ytId ? (
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${ytId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      ) : (
        <video src={video.url} controls className="w-full" style={{ maxHeight: "340px", background: "#000" }} />
      )}
      {video.title && (
        <div className="px-4 py-3">
          <p className="text-sm font-semibold text-center" style={{
            color: accent,
            fontFamily: "'Cairo', sans-serif",
            textShadow: `0 0 10px ${accent}66`,
          }}>
            {video.title}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ── Gallery grid + lightbox ── */
function GalleryGrid({ accent }: { accent: string }) {
  const { images } = useAppStore();
  const { lang } = useLang();
  const visibleImages = images.filter((img) => img.visible);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  if (visibleImages.length === 0) return null;

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {visibleImages.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="break-inside-avoid cursor-pointer rounded-xl overflow-hidden group"
            onClick={() => { setLightbox(img.url); setLightboxAlt(img.alt); }}
            style={{ border: `1px solid ${accent}22`, boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
            whileHover={{ scale: 1.02, boxShadow: `0 8px 32px ${accent}20, 0 0 0 1px ${accent}30` }}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full object-cover"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to top, ${accent}15, transparent)` }}>
              <p className="text-xs text-center" style={{ color: accent, fontFamily: "'Cairo', sans-serif" }}>{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox}
                alt={lightboxAlt}
                className="w-full h-auto rounded-2xl"
                style={{ maxHeight: "85vh", objectFit: "contain", boxShadow: `0 0 60px ${accent}30`, border: `1px solid ${accent}30` }}
              />
              {lightboxAlt && (
                <p className="text-center mt-3 text-sm" style={{ color: accent, fontFamily: "'Cairo', sans-serif" }}>{lightboxAlt}</p>
              )}
              <button onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ background: "rgba(5,3,15,0.95)", border: `1px solid ${accent}40`, color: accent }}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-6">
        <a href="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${accent}15, ${accent}08)`,
            border: `1px solid ${accent}35`,
            color: accent,
            fontFamily: "'Cairo', sans-serif",
            boxShadow: `0 0 16px ${accent}10`,
          }}>
          <span>📸</span>
          {lang === "ar" ? "إضافة صور أو فيديوهات" : "Add Photos or Videos"}
        </a>
      </div>
    </>
  );
}

export default function MainPage() {
  const { marwanVisible, saraVisible, customCards, videos } = useAppStore();
  const { lang, dir } = useLang();
  const { bg, accent } = useThemeStyles();

  const bodyFont: React.CSSProperties = {
    fontFamily: lang === "ar" ? "'Amiri', serif" : "Georgia, serif",
  };

  const poetryLines = lang === "ar"
    ? [
        "قصة حب تُفتَح صفحتها الأولى،",
        "وفصل جديد يُكتب بحروف من الذهب",
        "لرواية لامعة سطع بريقها",
        "حتى رآها الكفيف في وضح النهار",
        "وسمع لحنها الأصم في أحلك عتمة وظلام",
        "هنا يولد الحب الجديد…",
        "ذكرى تشهد ... حكاية تبقى،",
        "لتضئ عيوناً مُظلمة، وروحٍ هائمة، وقلوبٍ لا نابضة",
        "فيا لعظمة الحب وقسوته...",
        "نورٌ في الظلام... وظلامٌ في النور...",
      ]
    : [
        "A love story whose first page opens,",
        "A new chapter written in letters of gold",
        "For a luminous novel whose brilliance blazed",
        "Until the blind could see it in broad daylight",
        "And the deaf heard its melody in the deepest dark",
        "Here new love is born…",
        "A memory bears witness... a story endures,",
        "To illuminate darkened eyes, wandering souls, and still hearts",
        "Oh, the grandeur and cruelty of love...",
        "Light in the darkness... and darkness in the light...",
      ];

  const philosophy1Lines = lang === "ar"
    ? [
        "يُقال أن البشر يولدون على فطرة ما يعيشون، فهل قتل لأنه كذا؟",
        "لا فوالله قتل لأنه وُلِد على فطرة القتل...",
        "قلبٌ ينبض بجبنٍ كقلب الشجعان، والتشبيه هنا للنبض لا القلوب يا غلام.",
        "ولما كانت الدابة التي لا تعقل أفضل من قاتل الفطرة لما رفعت حافرها عن وليدها خشية أن تصيبه.",
        "دابة لا تعقل خشيت فظهرت عظمة قدرة الله.",
        "أوصيك يا غلام برحمة خلق الله،",
        "أيجب أن تُصبح دابة لترحم وتصفح وتعفو؟",
        "سامح لتُسامح، أصفح لكي يُصفح عنك، وأعفو ليٌعفى عنك",
        "وأعلم أن غطاء ستر الله له قدر ومقدار، خفيف كوزن جناح البعوضة لا يزن مثقال ذرة.",
        "حافظوا على ستركم وسركم حتى لا يضيع غطاءكم، ولو ضاقت وأستحكمت فاهرعوا الى سعة فضاء رحمة الله، اللهم عًز علىَ أمرُ لك فيه أسباب.",
      ]
    : [
        "It is said that people are born on the nature of what they live — so did he kill because of that?",
        "No, by God, he killed because he was born on the nature of killing...",
        "A heart that beats with cowardice like the heart of the brave — the comparison here is to the beat, not the hearts, young man.",
        "For when the irrational beast was better than a killer of nature — it lifted its hoof away from its young fearing it would harm them.",
        "A creature without reason feared, and thus the greatness of God's power was revealed.",
        "I advise you, young man, to show mercy to God's creation,",
        "Must you become a beast to show mercy, forgiveness, and pardon?",
        "Forgive so you may be forgiven, pardon so pardon may be granted, and excuse so you may be excused.",
        "Know that God's veil of protection has a measure — as light as the weight of a mosquito's wing, not the weight of an atom.",
        "And if things become too tight, rush to the expanse of God's infinite mercy.",
      ];

  const variantTextColor: Record<string, string> = {
    gold: "#FFF8DC", cyan: "#E0F7FA", rose: "#FCE4EC", purple: "#F3E5F5",
  };

  const visibleVideos = videos.filter((v) => v.visible);

  return (
    <div className="min-h-screen" style={{ background: bg, direction: dir }}>
      <VerticalImageStrips />
      <ThemePicker />
      <MusicPlayer />
      <SiteHeader />

      <div className="fixed inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse at 10% 20%, rgba(200,255,0,0.015) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 90% 80%, rgba(0,229,255,0.015) 0%, transparent 50%)",
        zIndex: 0,
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-8">

        {/* ── HERO ── */}
        <SectionWrapper id="hero">
          <div id="hero">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center py-12 mb-4"
            >
              <div className="relative inline-block mb-4">
                <h1 style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "clamp(2.8rem, 10vw, 6rem)",
                  fontWeight: 700,
                  background: `linear-gradient(90deg, ${accent}aa 0%, ${accent} 30%, #fff8 50%, ${accent} 70%, ${accent}aa 100%)`,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer-text 4s linear infinite, float-gentle 5s ease-in-out infinite",
                  letterSpacing: lang === "ar" ? "0" : "0.04em",
                }}>
                  {lang === "ar" ? "أميرة & علاء" : "Amira & Alaa"}
                </h1>
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg tracking-widest mb-2"
                style={{ color: accent, opacity: 0.8, textShadow: `0 0 16px ${accent}88`, fontFamily: "'Cairo', sans-serif", letterSpacing: "0.2em", textAlign: "center" }}>
                {lang === "ar" ? "✦ ١٤ مايو ٢٠٢٦ ✦" : "✦ May 14, 2026 ✦"}
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
                className="text-sm tracking-[0.25em] mb-2"
                style={{ color: `${accent}55`, fontFamily: "'Cairo', sans-serif", textAlign: "center" }}>
                Celebration — احتفال
              </motion.p>

              {/* Days counter */}
              <DaysSinceCounter accent={accent} />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ── CELEBRATION ── */}
        <SectionWrapper id="celebration">
          <div id="celebration-section">
            <motion.div {...fadeUp()}>
              <NeonCard variant="gold" className="mb-6">
                <div style={{ ...centeredText, marginBottom: "1.25rem" }}>
                  <span className="text-lg font-bold tracking-widest" style={{
                    color: accent,
                    textShadow: `0 0 20px ${accent}aa, 0 0 40px ${accent}55`,
                    fontFamily: "'Cairo', sans-serif", letterSpacing: "0.2em",
                  }}>
                    ✦ Celebration ✦
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-5" style={{ ...bodyFont, color: accent, textShadow: `0 0 16px ${accent}aa`, ...centeredText }}>
                  {lang === "ar" ? "احتفالٌ بالأميرة أميرة" : "A Celebration for Princess Amira"}
                </h2>
                <p className="text-base md:text-lg" style={{ ...bodyFont, color: "#F5E6C8", lineHeight: "2.5", ...justifyText }}>
                  {lang === "ar"
                    ? "في هذا اليوم المبارك، نجتمع — ولو من بعيد — لنحتفي بكِ يا أميرة، وبشريك عمركِ علاء. هذا الموقع هديّة من القلب: مرجعٌ تعودين إليه دائماً لترَيْ كم أنتِ محبوبة، وكم كانت لحظات يومكِ ساحرة."
                    : "On this blessed day, we gather — even from afar — to celebrate you, dear Amira, and your life partner Alaa. This website is a heartfelt gift: a place you can always return to and see how deeply you are loved, and how magical your special day truly was."}
                </p>
              </NeonCard>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ── POETRY ── */}
        <SectionWrapper id="poetry1">
          <motion.div {...fadeUp()}>
            <NeonCard variant="cyan" className="mb-6">
              <h3 className="text-xl font-bold mb-6" style={{ color: "#00e5ff", textShadow: "0 0 16px #00e5ffaa", ...bodyFont, ...centeredText }}>
                {lang === "ar"
                  ? "هنا تبدأ حكاية — تكتبها الذكريات وترويها القلوب"
                  : "Here a Story Begins — Written by Memories, Told by Hearts"}
              </h3>
              <div style={{ ...bodyFont, fontSize: "1.05rem", lineHeight: "2.6", color: "#E0F7FA", ...centeredText }}>
                {poetryLines.map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }} style={{ marginBottom: "0.15rem" }}>
                    {line}
                  </motion.p>
                ))}
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-5 font-bold" style={{ color: accent, textShadow: `0 0 16px ${accent}aa`, fontSize: "1.1rem", ...centeredText }}>
                  {lang === "ar" ? "أم قدرك ظلمته وقسوته" : "Or your fate — its darkness and cruelty?"}
                </motion.p>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-3 italic" style={{ color: "#00e5ffaa", fontSize: "0.9rem", ...centeredText }}>
                  {lang === "ar" ? "من أعماق الروح" : "From the depths of the soul"}
                </motion.p>
              </div>
            </NeonCard>
          </motion.div>
        </SectionWrapper>

        <Divider />

        {/* ── GALLERY ── */}
        <SectionWrapper id="gallery">
          <div id="gallery-section">
            <motion.div {...fadeUp()}>
              {/* Only show "لحظات لا تنسى" — no "معرض الصور" title */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8 tracking-widest"
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
                  color: accent,
                  textShadow: `0 0 24px ${accent}88, 0 0 48px ${accent}44`,
                  ...centeredText,
                  letterSpacing: "0.15em",
                }}
              >
                ✦ {lang === "ar" ? "لحظات لا تُنسى" : "Unforgettable Moments"} ✦
              </motion.p>
              <GalleryGrid accent={accent} />
            </motion.div>
          </div>
        </SectionWrapper>

        <Divider />

        {/* ── PHILOSOPHY 1 ── */}
        <SectionWrapper id="philosophy1">
          <motion.div {...fadeUp()}>
            <NeonCard variant="purple" className="mb-6">
              <div style={{ ...bodyFont, fontSize: "1.05rem", lineHeight: "2.6", color: "#F3E5F5", ...justifyText }}>
                {philosophy1Lines.map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} style={{ marginBottom: "0.3rem" }}>
                    {line}
                  </motion.p>
                ))}
              </div>
            </NeonCard>
          </motion.div>
        </SectionWrapper>

        {/* ── PHILOSOPHY 2 ── */}
        <SectionWrapper id="philosophy2">
          <motion.div {...fadeUp()}>
            <NeonCard variant="rose" className="mb-6">
              <div style={{ ...bodyFont, fontSize: "1.1rem", lineHeight: "2.6", color: "#FCE4EC" }}>
                <p className="mb-4 font-bold" style={{ color: "#ff80ab", textShadow: "0 0 12px #ff80ab88", ...centeredText }}>
                  {lang === "ar" ? "يٌقال أن الرجال نوعان" : "It is said that men are of two kinds"}
                </p>
                <p className="font-bold mb-3" style={{ color: "#fff", fontSize: "1.15rem", ...centeredText }}>
                  {lang === "ar" ? '"رجلُ يحيى بقلبه وآخر يٌحيي قلبه"' : '"A man who lives by his heart, and another who gives life to his heart"'}
                </p>
                <p className="mb-4" style={{ color: "#ff80ab88", ...centeredText }}>
                  {lang === "ar" ? "وكذا" : "And likewise"}
                </p>
                <p className="font-bold" style={{ color: accent, textShadow: `0 0 16px ${accent}aa`, fontSize: "1.05rem", ...centeredText }}>
                  {lang === "ar"
                    ? '"أن أعتى الرجال وأخطرهم قتلتهم قلوبهم ،،، وأضعفهم أحيتهم قلوبهم"'
                    : '"The fiercest and most dangerous of men were slain by their hearts… and the weakest were given life by theirs"'}
                </p>
              </div>
            </NeonCard>
          </motion.div>
        </SectionWrapper>

        <Divider />

        {/* ── VIDEOS ── */}
        <SectionWrapper id="videos">
          {visibleVideos.length > 0 && (
            <div className="mb-8">
              <motion.div {...fadeUp()} className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-1" style={{ ...bodyFont, color: accent, textShadow: `0 0 20px ${accent}88`, ...centeredText }}>
                  {lang === "ar" ? "🎬 معرض الفيديوهات" : "🎬 Video Gallery"}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif", fontSize: "0.85rem" }}>
                  {lang === "ar" ? "✦ ذكريات متحركة ✦" : "✦ Moving memories ✦"}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {visibleVideos.map((v) => (
                  <VideoCard key={v.id} video={v} accent={accent} />
                ))}
              </div>
              <Divider />
            </div>
          )}
        </SectionWrapper>

        {/* ── MESSAGES HEADER ── */}
        <SectionWrapper id="messages">
          <motion.div {...fadeUp()} className="text-center mb-10" id="messages-section">
            <h2 className="text-3xl font-bold mb-3" style={{ ...bodyFont, color: accent, textShadow: `0 0 24px ${accent}aa, 0 0 48px ${accent}55`, ...centeredText }}>
              {lang === "ar" ? "رسائل من القلب" : "Messages From The Heart"}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Cairo', sans-serif", ...centeredText }}>
              {lang === "ar" ? "✦ كلمات تُحفر في الذاكرة وتبقى في القلب ✦" : "✦ Words carved in memory, forever in the heart ✦"}
            </p>
          </motion.div>
        </SectionWrapper>

        {/* ── MARWAN CARD ── */}
        {marwanVisible && (
          <SectionWrapper id="marwan-card">
            <NeonCard variant="purple" className="mb-6" delay={0.1}>
              <div style={{ ...bodyFont, fontSize: "1rem", lineHeight: "2.4", color: "#F3E5F5" }}>
                <h4 className="text-xl font-bold mb-4" style={{ color: "#e040fb", textShadow: "0 0 12px #e040fb88", ...centeredText }}>
                  ✉︎ {lang === "ar" ? "رسالة مروان" : "Marwan's Letter"}
                </h4>
                {lang === "en" && (
                  <p className="text-xs mb-3 italic" style={{ color: "rgba(255,255,255,0.3)", ...centeredText }}>(Written in Arabic — a personal message)</p>
                )}
                <p className="mb-2" style={{ color: "#ce93d8", ...centeredText }}>إلى أختي وحبيبتي العروسة، أرقى وأجمل أميرة نجم</p>
                <div style={{ ...justifyText }}>
                  <p className="mb-3">عايزك بس تكوني متأكدة أني والله ما منعني عن حضور غير العذر القهري، الخارج عن الإرادة المنفردة، بس أكيد في يوم من الأيام هنتقابل وهقدر أشرحلك الموقف كامل.</p>
                  <p className="mb-3">سامحيني يا حبيبتي.</p>
                  <p className="mb-3">وسلامي لعلاء زوجك.</p>
                  <p className="mb-3">أترككم في رعاية الله وحفظه.</p>
                  <p className="mb-4">ألف مبروك يا أميرة، وربنا يسعدك ويبارك في عمرك.</p>
                  <p style={{ color: "#ce93d8", ...centeredText }}>مع أطيب التمنيات،</p>
                  <p className="font-bold mt-1" style={{ color: "#e040fb", textShadow: "0 0 8px #e040fb66", ...centeredText }}>— مروان نجم</p>
                </div>
              </div>
            </NeonCard>
          </SectionWrapper>
        )}

        {/* ── SARA CARD ── */}
        {saraVisible && (
          <SectionWrapper id="sara-card">
            <NeonCard variant="cyan" className="mb-6" delay={0.15}>
              <div style={{ ...bodyFont, fontSize: "1rem", lineHeight: "2.4", color: "#E0F7FA" }}>
                <h4 className="text-xl font-bold mb-4" style={{ color: "#00e5ff", textShadow: "0 0 12px #00e5ff88", ...centeredText }}>
                  ✉︎ {lang === "ar" ? "تهنئة سارة وحمزة" : "Sara & Hamza's Congratulations"}
                </h4>
                {lang === "en" ? (
                  <div style={{ ...justifyText }}>
                    <p className="mb-3" style={{ color: "#80deea", ...centeredText }}>To the dearest couple Amira & Alaa</p>
                    <p className="mb-3">A thousand congratulations! Wishing you happiness and success in every moment of your life ahead.</p>
                    <p className="mb-3">Until we meet again, my dear. I speak on behalf of myself and Hamza — he's still too young to talk.</p>
                    <p className="mb-4">Marwan always tells me I'm a copy of you. I tell him: No… she's much more beautiful, honestly. But seeing the videos and photos, I thought — maybe one day I'll look like you, and that would be the greatest stroke of luck in my life.</p>
                    <p className="mb-3">We love you very much.</p>
                    <p className="mb-3" style={{ color: "#80deea", ...centeredText }}>— Sara & Hamza 🤍</p>
                  </div>
                ) : (
                  <div style={{ ...justifyText }}>
                    <p className="mb-3" style={{ color: "#80deea", ...centeredText }}>إلى العزيزين أميرة وعلاء</p>
                    <p className="mb-3 font-bold" style={{ color: "#00e5ff", ...centeredText }}>مبروك يا الأميرة عمتو! 🎉</p>
                    <p className="mb-3">أتمنالك السعادة والتوفيق في كل لحظات حياتك الجاية.</p>
                    <p className="mb-3">السلام لحين اللقاء يا حبيبة قلبي أنا وحمزة.</p>
                    <p className="mb-3">أنا بتكلم بلساني وبلسان حمزة علشان هو لسه صغير ومبيعرفش يتكلم.</p>
                    <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Cairo', sans-serif", textAlign: "center" }}>— — —</p>
                    <p className="mb-3">مروان دايمًا يقولي إني نسخة منك، وأنا بقوله: لأ… هي أجمل كتير بصراحة.</p>
                    <p className="mb-3">بس لما شفت الفيديوهات والصور حسّيت إن فعلاً ممكن أكون في يوم من الأيام شبهِك، وده أكيد هيكون أكبر ضربة حظ ليا في حياتي… إني أكون حتى في نص جمالك يا الأميرة أميرة.</p>
                    <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Cairo', sans-serif", textAlign: "center" }}>— — —</p>
                    <p className="mb-2">بحبك أوي يا عمتو،</p>
                    <p className="mb-3">وحمزة بيقولك: <span style={{ color: "#00e5ff" }}>"ها اه اه"</span> — أكيد يقصد إنه بيحبك هو كمان.</p>
                    <p className="mb-4">مين يشوفك وما يحبكيش يا عمتو؟ 🤍</p>
                    <div className="text-sm rounded-xl p-3 mb-4" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.12)", fontFamily: "'Cairo', sans-serif" }}>
                      <p className="font-bold mb-1" style={{ color: "rgba(0,229,255,0.7)" }}>(ملحوظة):</p>
                      <p className="mb-1">متستغربيش إني بناديه باسمه… إحنا أصحاب.</p>
                      <p>أنا بقوله "يا بابا" بس لما بيكون زعلان مني، لأننا ساعتها مبنبقاش صحاب.</p>
                    </div>
                    <p className="mb-2">السلام لحين اللقاء.</p>
                    <p className="mb-3">باي باي يا الأميرة عمتو أميرة. 👋</p>
                    <p className="mb-1" style={{ color: "#80deea", ...centeredText }}>بحبك جدًا… وحمزة كمان بيحبك جدًا.</p>
                    <p className="font-bold mt-2" style={{ color: "#00e5ff", textShadow: "0 0 8px #00e5ff66", ...centeredText }}>— سارة وحمزة 🤍</p>
                  </div>
                )}
              </div>
            </NeonCard>
          </SectionWrapper>
        )}

        {/* ── CUSTOM CARDS ── */}
        {customCards.filter((c) => c.visible).map((card, i) => (
          <motion.div key={card.id} {...fadeUp(i * 0.05)}>
            <NeonCard variant={card.variant} className="mb-6">
              <div style={{ ...bodyFont, fontSize: "1rem", lineHeight: "2.4", color: variantTextColor[card.variant] }}>
                {(lang === "ar" ? card.titleAr : card.titleEn) && (
                  <h4 className="text-xl font-bold mb-4" style={{ ...centeredText }}>
                    {lang === "ar" ? card.titleAr : card.titleEn}
                  </h4>
                )}
                <p style={{ ...justifyText, whiteSpace: "pre-wrap" }}>
                  {lang === "ar" ? card.contentAr : card.contentEn}
                </p>
              </div>
            </NeonCard>
          </motion.div>
        ))}

        <Divider />
        <DevCard />
        <SiteFooter />
      </div>
    </div>
  );
}
