import React, { useCallback, useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router as WouterRouter, Switch, Route } from "wouter";

import heroBg from "@/assets/hero-bg.jpg";
import { SEED_IMAGES, HIDDEN_PHOTOS_KEY, CUSTOM_MESSAGES_KEY } from "@/data/seedImages";

import { SplashScreen } from "@/components/SplashScreen";
import { StartOverlay } from "@/components/StartOverlay";
import { FloatingPetals } from "@/components/FloatingPetals";
import { BackgroundMusic, type BackgroundMusicRef } from "@/components/BackgroundMusic";
import { Fireworks } from "@/components/Fireworks";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { MemorySidebar } from "@/components/MemorySidebar";
import { PasswordGate } from "@/components/PasswordGate";
import { MediaUploader } from "@/components/MediaUploader";
import { useReveal } from "@/hooks/useReveal";
import { isUnlocked } from "@/lib/media";
import { LockedPage } from "@/pages/LockedPage";
import { AdminPage } from "@/pages/AdminPage";

const queryClient = new QueryClient();

// ── Combined literary prose ────────────────────────────────────────────────────
const LITERARY_PARAGRAPHS = [
  "يُقال أن البشر يولدون على فطرة ما يعيشون، فهل قتل لأنه كذا؟\nلا — فوالله قتل لأنه وُلِد على فطرة القتل...",
  "قلبٌ ينبض بجبنٍ كقلب الشجعان؛ والتشبيه هنا للنبض لا القلوب يا غلام.\nولما كانت الدابة التي لا تعقل أفضل من قاتل الفطرة لما رفعت حافرها عن وليدها خشية أن تصيبه.\nدابةٌ لا تعقل خشيت، فظهرت عظمة قدرة الله.",
  "أوصيك يا غلام برحمة خلق الله،\nأيجب أن تُصبح دابة لترحم وتصفح وتعفو؟\nسامح لتُسامح، اصفح لكي يُصفح عنك، وأعفُ لكي يُعفى عنك.",
  "وأعلم أن غطاء ستر الله له قدر ومقدار، خفيف كوزن جناح البعوضة لا يزن مثقال ذرة.\nحافظوا على ستركم وسركم حتى لا يضيع غطاءكم، ولو ضاقت وأستحكمت فاهرعوا إلى سعة فضاء رحمة الله.\nاللهم عزَّ علىَّ أمرٌ لك فيه أسباب.",
];

// ── Custom message type ───────────────────────────────────────────────────────
type CustomMessage = { id: string; author: string; content: string; visible: boolean };

// ── Helpers ───────────────────────────────────────────────────────────────────
function getHiddenPhotos(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(HIDDEN_PHOTOS_KEY) ?? "[]")); }
  catch { return new Set(); }
}
function getCustomMessages(): CustomMessage[] {
  try { return JSON.parse(localStorage.getItem(CUSTOM_MESSAGES_KEY) ?? "[]"); }
  catch { return []; }
}

// ── Section helpers ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-xs tracking-[0.45em] uppercase" style={{ color: "oklch(0.82 0.13 75 / 0.85)" }}>{children}</p>;
}

function GoldDivider({ className = "w-32" }: { className?: string }) {
  return <div className={`mx-auto mt-4 h-px gold-divider ${className}`} />;
}

// ── Check site lock ───────────────────────────────────────────────────────────
async function checkSiteLock(): Promise<boolean> {
  try {
    const r = await fetch("/api/admin/lock-status");
    if (!r.ok) return false;
    const d = await r.json() as { locked: boolean };
    return d.locked;
  } catch { return false; }
}

// ── Wedding page ──────────────────────────────────────────────────────────────
function WeddingPage() {
  const [siteLocked, setSiteLocked] = useState<boolean | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [hiddenPhotos, setHiddenPhotos] = useState<Set<string>>(getHiddenPhotos);
  const [customMessages, setCustomMessages] = useState<CustomMessage[]>(getCustomMessages);

  const musicRef = useRef<BackgroundMusicRef | null>(null);

  useEffect(() => {
    setUnlocked(isUnlocked());
    // Poll for admin changes every 30 seconds
    const refreshAdmin = () => {
      setHiddenPhotos(getHiddenPhotos());
      setCustomMessages(getCustomMessages());
    };
    const interval = setInterval(refreshAdmin, 30000);
    window.addEventListener("focus", refreshAdmin);
    return () => { clearInterval(interval); window.removeEventListener("focus", refreshAdmin); };
  }, []);

  useEffect(() => {
    checkSiteLock().then(locked => setSiteLocked(locked));
  }, []);

  const handleStartJourney = () => {
    setShowOverlay(false);
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 5400);
  };

  const handleMusicRef = useCallback((ref: BackgroundMusicRef) => {
    musicRef.current = ref;
  }, []);

  // Show loading briefly while checking lock status
  if (siteLocked === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "radial-gradient(ellipse at center, #1a0b14, #08040e)" }}>
        <div className="heartbeat text-4xl" style={{ color: "oklch(0.82 0.13 75)" }}>❦</div>
      </div>
    );
  }

  if (siteLocked) return <LockedPage />;

  const visibleImages = SEED_IMAGES.filter(img => !hiddenPhotos.has(img.id));
  const allMessages = [
    { id: "static-1", author: "رسالة علاء", color: "oklch(0.82 0.13 75)", content: "أميرة، أنت القصيدة التي لم أكتبها بعد، والحلم الذي أصبح حقيقة في يوم ١٤ مايو ٢٠٢٦." },
    { id: "static-2", author: "رسالة أميرة", color: "oklch(0.78 0.09 35)", content: "علاء، معك بدأت حكاية لا تنتهي، وكتبنا بيدينا أجمل فصول العمر." },
    { id: "static-3", author: "من الأهل والأحبة", color: "oklch(0.86 0.11 85)", content: "كل التهاني والتمنيات لعروسينا الغاليين — بارك الله لكم وبارك عليكم وجمع بينكم في خير وسعادة دائمة." },
    ...customMessages.filter(m => m.visible).map(m => ({ id: m.id, author: m.author, color: "oklch(0.82 0.13 75)", content: m.content })),
  ];

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden" dir="rtl">
      <div className="noise-overlay" />

      {showOverlay && <StartOverlay onStart={handleStartJourney} />}
      {showFireworks && <Fireworks />}
      <SplashScreen />
      <FloatingPetals />
      <BackgroundMusic onRef={handleMusicRef} />
      <Header />

      {/* Both sidebars — opposite scroll directions */}
      <MemorySidebar images={visibleImages} position="right" scrollDir="up" />
      <MemorySidebar images={visibleImages} position="left" scrollDir="down" />

      <ThemeSwitcher />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center justify-center pt-20">
        <img src={heroBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" style={{ opacity: 0.25 }} />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-veil)" }} />
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklab, oklch(0.82 0.13 75) 7%, transparent), transparent 70%)" }} />

        <div className="mx-auto max-w-4xl px-6 py-32 text-center relative z-10">
          <p className="font-display tracking-[0.5em] text-xs fade-in-up" style={{ color: "oklch(0.82 0.13 75 / 0.8)" }}>
            A Wedding Tribute · ١٤ مايو ٢٠٢٦
          </p>
          <div className="mt-10 flex flex-col items-center fade-in-up-delay-1">
            <h1 className="font-display-ar text-7xl font-bold leading-none text-gradient-gold md:text-9xl">أميرة</h1>
            <span className="my-5 font-display text-3xl italic float md:text-4xl" style={{ color: "oklch(0.78 0.09 35)" }}>&amp;</span>
            <h1 className="font-display-ar text-7xl font-bold leading-none text-gradient-gold md:text-9xl">علاء</h1>
          </div>
          <div className="mx-auto mt-10 h-px w-48 gold-divider fade-in-up-delay-2" />
          <p className="ornament mx-auto mt-8 max-w-2xl font-body-ar text-lg text-muted-foreground md:text-xl fade-in-up-delay-3">
            حكاية حب تبدأ، ومرجعٌ خالد لذكرى الفرح
          </p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 fade-in-up-delay-4">
            <a href="#literary" className="inline-flex items-center gap-3 rounded-full border border-gold/60 bg-card/40 px-7 py-3.5 font-body-ar text-base text-gold backdrop-blur transition-all hover:bg-gold hover:text-primary-foreground hover:shadow-glow hover:scale-105">
              اقرأ الحكاية ↓
            </a>
            <a href="#gallery" className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 font-body-ar text-base text-primary-foreground transition-all hover:shadow-glow hover:scale-105">
              <span className="heartbeat">❦</span> معرض الصور
            </a>
            <a href="#share" className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-card/20 px-7 py-3.5 font-body-ar text-base backdrop-blur transition-all hover:border-gold/60 hover:scale-105" style={{ color: "oklch(0.82 0.13 75 / 0.8)" }}>
              شارك ذكرى
            </a>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-gold/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ LITERARY — single combined box ═══════════════════════════════ */}
      <section id="literary" className="relative py-32 px-6" style={{ background: "color-mix(in oklab, var(--card) 6%, transparent)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>❦ كلامٌ يهزّ الأعماق ❦</SectionLabel>
            <h2 className="mt-5 font-display-ar text-5xl font-bold text-gradient-gold">من أعماق الروح</h2>
            <GoldDivider />
          </Reveal>

          <Reveal delay={0.2} className="mt-16 w-full">
            <div
              className="relative rounded-3xl p-8 md:p-14 text-right"
              style={{
                border: "1px solid oklch(0.82 0.13 75 / 0.22)",
                background: "color-mix(in oklab, var(--card) 50%, transparent)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 30px 80px -20px oklch(0.82 0.13 75 / 0.12), inset 0 1px 0 oklch(0.82 0.13 75 / 0.1)",
              }}
            >
              {/* Decorative corner ornaments */}
              <span className="absolute top-5 right-6 font-display text-3xl" style={{ color: "oklch(0.82 0.13 75 / 0.2)" }}>❦</span>
              <span className="absolute bottom-5 left-6 font-display text-3xl" style={{ color: "oklch(0.82 0.13 75 / 0.2)" }}>❦</span>

              <div className="space-y-8 font-display-ar text-xl md:text-2xl leading-loose" style={{ color: "oklch(0.93 0.03 62)" }}>
                {LITERARY_PARAGRAPHS.map((para, idx) => (
                  <React.Fragment key={idx}>
                    <p className="literary-text whitespace-pre-line">{para}</p>
                    {idx < LITERARY_PARAGRAPHS.length - 1 && (
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 gold-divider" />
                        <span className="text-base" style={{ color: "oklch(0.82 0.13 75 / 0.5)" }}>✦</span>
                        <div className="h-px w-12 gold-divider" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════════════════════ */}
      <section id="gallery" className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <SectionLabel>The Gallery</SectionLabel>
            <h2 className="mt-5 font-display-ar text-5xl font-bold text-gradient-gold">معرض الصور</h2>
            <GoldDivider />
          </Reveal>

          {visibleImages.length === 0 ? (
            <p className="mt-20 font-body-ar text-muted-foreground">لا توجد صور متاحة</p>
          ) : (
            <div className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleImages.map((img, idx) => (
                <Reveal key={img.id} delay={idx * 0.03} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-card/20 cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.caption}
                    onClick={() => setLightbox(img.src)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3">
                    <p className="font-body-ar text-xs text-gold/90 text-right">{img.caption}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ MESSAGES ══════════════════════════════════════════════════════ */}
      <section id="messages" className="relative py-32 px-6" style={{ background: "color-mix(in oklab, var(--card) 8%, transparent)" }}>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <SectionLabel>Words of Love</SectionLabel>
            <h2 className="mt-5 font-display-ar text-5xl font-bold text-gradient-gold">رسائل من القلب</h2>
            <GoldDivider />
          </Reveal>
          <div className="mt-20 space-y-6">
            {allMessages.map((msg, idx) => (
              <Reveal key={msg.id} delay={idx * 0.12} className="relative p-7 md:p-10 rounded-2xl text-right" style={{ border: "1px solid oklch(0.82 0.13 75 / 0.2)", background: "color-mix(in oklab, var(--card) 45%, transparent)", backdropFilter: "blur(16px)" }}>
                <h3 className="font-display-ar text-2xl font-bold mb-3" style={{ color: msg.color }}>{msg.author}</h3>
                <div className="literary-text font-body-ar text-lg leading-relaxed text-muted-foreground">{msg.content}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SHARE ═════════════════════════════════════════════════════════ */}
      <section id="share" className="relative py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>Share a Memory</SectionLabel>
            <h2 className="mt-5 font-display-ar text-5xl font-bold text-gradient-gold">شاركنا فرحتنا</h2>
            <GoldDivider />
          </Reveal>
          <div className="mt-16">
            {unlocked ? (
              <div className="p-8 rounded-2xl border border-gold/30 bg-card/40 backdrop-blur">
                <MediaUploader />
              </div>
            ) : (
              <PasswordGate onUnlocked={() => setUnlocked(true)} />
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[90] bg-black/92 backdrop-blur flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-h-[92vh] max-w-[92vw] object-contain rounded-xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}

// ── App entry ─────────────────────────────────────────────────────────────────
export default function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={base}>
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route component={WeddingPage} />
        </Switch>
      </WouterRouter>
    </QueryClientProvider>
  );
}
