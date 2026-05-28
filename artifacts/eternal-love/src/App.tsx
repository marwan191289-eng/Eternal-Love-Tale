import React, { useCallback, useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import heroBg from "@/assets/hero-bg.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

import vogue from "@assets/Screenshot_2026-05-16_023241_1779688398562.png";
import p1 from "@assets/WhatsApp_Image_2026-05-15_at_02.47.53_1779688398570.jpeg";
import p2 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(4)_1779688398571.jpeg";
import p3 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(3)_1779688398572.jpeg";
import p4 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(2)_1779688398573.jpeg";
import p5 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_(1)_1779688398573.jpeg";
import p6 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.18_1779688398574.jpeg";
import p7 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(4)_1779688398575.jpeg";
import p8 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(3)_1779688398576.jpeg";
import p9 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(2)_1779688398576.jpeg";
import p10 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_(1)_1779688398577.jpeg";
import p11 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.17_1779688398578.jpeg";
import p12 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.16_(1)_1779688398579.jpeg";
import p13 from "@assets/WhatsApp_Image_2026-05-14_at_16.08.16_1779688398581.jpeg";

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

const queryClient = new QueryClient();

// ── Seed images ────────────────────────────────────────────────────────────────
const seedImages = [
  { id: "s-vogue", src: vogue, caption: "علاء وأميرة — Vogue Edition" },
  { id: "s-p1",   src: p1,   caption: "العروسان في حديقة الفرح" },
  { id: "s-p12",  src: p12,  caption: "أجمل يوم في العمر" },
  { id: "s-p13",  src: p13,  caption: "لحظة خالدة" },
  { id: "s-p11",  src: p11,  caption: "عقد القران" },
  { id: "s-g1",   src: g1,   caption: "لحظات أنيقة" },
  { id: "s-g6",   src: g6,   caption: "حفل ملكي" },
  { id: "s-g2",   src: g2,   caption: "خاتم العمر" },
  { id: "s-p2",   src: p2,   caption: "أميرة الجميلة" },
  { id: "s-p3",   src: p3,   caption: "إطلالة راقية" },
  { id: "s-p4",   src: p4,   caption: "ملكة الألوان" },
  { id: "s-p5",   src: p5,   caption: "إطلالة كلاسيكية" },
  { id: "s-p6",   src: p6,   caption: "أميرة في كل وقت" },
  { id: "s-p7",   src: p7,   caption: "ابتسامة تفرح القلب" },
  { id: "s-p8",   src: p8,   caption: "أناقة أصيلة" },
  { id: "s-p9",   src: p9,   caption: "في أجمل حلة" },
  { id: "s-p10",  src: p10,  caption: "ذوق رفيع" },
  { id: "s-g3",   src: g3,   caption: "ضوء الشموع" },
  { id: "s-g4",   src: g4,   caption: "زخرفة الفرح" },
  { id: "s-g5",   src: g5,   caption: "حلاوة اليوم" },
];

// ── Literary blocks ────────────────────────────────────────────────────────────
const literaryBlocks = [
  {
    lines: [
      "يُقال أن البشر يولدون على فطرة ما يعيشون، فهل قتل لأنه كذا؟",
      "لا فوالله قتل لأنه وُلِد على فطرة القتل..."
    ]
  },
  {
    lines: [
      "قلبٌ ينبض بجبنٍ كقلب الشجعان، والتشبيه هنا للنبض لا القلوب يا غلام.",
      "ولما كانت الدابة التي لا تعقل أفضل من قاتل الفطرة لما رفعت حافرها عن وليدها خشية أن تصيبه.",
      "دابة لا تعقل خشيت فظهرت عظمة قدرة الله."
    ]
  },
  {
    lines: [
      "أوصيك يا غلام برحمة خلق الله،",
      "أيجب أن تُصبح دابة لترحم وتصفح وتعفو؟",
      "سامح لتُسامح، أصفح لكي يُصفح عنك، وأعفو ليٌعفى عنك",
      "",
      "وأعلم أن غطاء ستر الله له قدر ومقدار، خفيف كوزن جناح البعوضة لا يزن مثقال ذرة.",
      "حافظوا على ستركم وسركم حتى لا يضيع غطاءكم، ولو ضاقت وأستحكمت فاهرعوا الى سعة فضاء رحمة الله، اللهم عًز علىَ أمرُ لك فيه أسباب."
    ]
  },
  {
    lines: [
      "هنا تبدأ حكاية — تكتبها الذكريات وترويها القلوب",
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
      "أنصيبك نورهٍ وعظمته ،،، أم قدرك قسوته وظلمته"
    ]
  },
  {
    lines: [
      "يٌقال أن الرجال نوعان",
      "\"رجلُ يحيى بقلبه وآخر يٌحيي قلبه\"",
      "وكذا",
      "\"أن أعتى الرجال وأخطرهم قتلتهم قلوبهم ،،، وأضعفهم أحيتهم قلوبهم\""
    ]
  },
];

// ── Helper components ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-display tracking-[0.45em] text-xs text-gold/75 uppercase">{children}</p>;
}

function Divider({ className = "w-24" }: { className?: string }) {
  return <div className={`mx-auto mt-5 h-px gold-divider ${className}`} />;
}

function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
      <div className="w-2 h-2 rotate-45 bg-gold/60 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ── Main app ───────────────────────────────────────────────────────────────────
function WeddingApp() {
  const [unlocked, setUnlocked] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const musicRef = useRef<BackgroundMusicRef | null>(null);

  useEffect(() => { setUnlocked(isUnlocked()); }, []);

  const handleStartJourney = () => {
    setShowOverlay(false);
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 5200);
  };

  const handleMusicRef = useCallback((ref: BackgroundMusicRef) => {
    musicRef.current = ref;
  }, []);

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden" dir="rtl">
      <div className="noise-overlay" />

      {showOverlay && <StartOverlay onStart={handleStartJourney} />}
      {showFireworks && <Fireworks />}

      <SplashScreen />
      <FloatingPetals />
      <BackgroundMusic onRef={handleMusicRef} />
      <Header />
      <MemorySidebar images={seedImages} position="right" />
      <ThemeSwitcher />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative isolate overflow-hidden min-h-screen flex items-center justify-center pt-20">
        <img src={heroBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" style={{ opacity: 0.25 }} />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-veil)" }} />
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklab, oklch(0.82 0.13 75) 6%, transparent), transparent 70%)" }} />

        <div className="mx-auto max-w-5xl px-6 py-32 text-center relative z-10">
          <p className="font-display tracking-[0.5em] text-xs text-gold/80 uppercase fade-in-up">
            A Wedding Tribute · ٢٠٢٦
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
            <a href="#literary" className="inline-flex items-center gap-3 rounded-full border border-gold/60 bg-card/40 px-8 py-3.5 font-body-ar text-base text-gold backdrop-blur transition-all duration-300 hover:bg-gold hover:text-primary-foreground hover:shadow-glow hover:scale-105">
              اقرأ الحكاية <span className="text-lg">↓</span>
            </a>
            <a href="#gallery" className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 font-body-ar text-base text-primary-foreground transition-all duration-300 hover:shadow-glow hover:scale-105">
              <span className="heartbeat">❦</span> معرض الصور
            </a>
            <a href="#share" className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-card/20 px-8 py-3.5 font-body-ar text-base text-gold/80 backdrop-blur transition-all duration-300 hover:border-gold/60 hover:text-gold hover:scale-105">
              شارك ذكرى
            </a>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-gold/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* ══ LITERARY ══════════════════════════════════════════════════════ */}
      <section id="literary" className="relative py-32 px-6 bg-card/5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>Words & Wisdom</SectionLabel>
            <h2 className="mt-4 font-display-ar text-5xl text-gradient-gold">الحكاية والكلمات</h2>
            <Divider />
          </Reveal>

          <div className="mt-20 space-y-0">
            {literaryBlocks.map((block, idx) => (
              <React.Fragment key={idx}>
                <Reveal delay={0.1} className="w-full">
                  <div className="relative p-8 md:p-12 rounded-2xl border border-gold/15 bg-card/30 backdrop-blur">
                    <div className="literary-text font-display-ar text-xl md:text-2xl/relaxed text-foreground/90 font-medium">
                      {block.lines.map((line, li) => (
                        <React.Fragment key={li}>
                          {line}
                          {li < block.lines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </Reveal>
                {idx < literaryBlocks.length - 1 && <OrnamentDivider />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════════════════════ */}
      <section id="gallery" className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <Reveal>
            <SectionLabel>The Gallery</SectionLabel>
            <h2 className="mt-4 font-display-ar text-5xl text-gradient-gold">معرض الصور</h2>
            <Divider />
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {seedImages.map((img, idx) => (
              <Reveal key={img.id} delay={idx * 0.04} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-card/20 cursor-pointer" >
                <img
                  src={img.src}
                  alt={img.caption}
                  onClick={() => setLightbox(img.src)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  data-testid={`img-gallery-${img.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4 text-right">
                  <p className="font-body-ar text-xs text-gold/90">{img.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MESSAGES ══════════════════════════════════════════════════════ */}
      <section id="messages" className="relative py-32 px-6 bg-card/10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <SectionLabel>Words of Love</SectionLabel>
            <h2 className="mt-4 font-display-ar text-5xl text-gradient-gold">رسائل من القلب</h2>
            <Divider />
          </Reveal>

          <div className="mt-20 space-y-8">
            {[
              { author: "رسالة علاء", color: "oklch(0.82 0.13 75)", content: "أميرة، أنت القصيدة التي لم أكتبها بعد، والحلم الذي أصبح حقيقة في يوم ١٤ مايو ٢٠٢٦." },
              { author: "رسالة أميرة", color: "oklch(0.78 0.09 35)", content: "علاء، معك بدأت حكاية لا تنتهي، وكتبنا بيدينا أجمل فصول العمر." },
              { author: "من الأهل والأحبة", color: "oklch(0.86 0.11 85)", content: "كل التهاني والتمنيات لعروسينا الغاليين — بارك الله لكم وبارك عليكم وجمع بينكم في خير وسعادة دائمة." },
            ].map((msg, idx) => (
              <Reveal key={idx} delay={idx * 0.15} className="relative p-8 md:p-12 rounded-2xl border border-gold/20 bg-card/40 backdrop-blur text-right">
                <h3 className="font-display-ar text-2xl font-bold mb-4" style={{ color: msg.color }}>{msg.author}</h3>
                <div className="literary-text font-body-ar text-lg leading-relaxed text-muted-foreground">
                  {msg.content}
                </div>
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
            <h2 className="mt-4 font-display-ar text-5xl text-gradient-gold">شاركنا فرحتنا</h2>
            <Divider />
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
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeddingApp />
    </QueryClientProvider>
  );
}
