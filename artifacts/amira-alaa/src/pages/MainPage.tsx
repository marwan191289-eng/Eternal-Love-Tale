import { motion } from "framer-motion";
import NeonCard from "@/components/NeonCard";
import HeroSection from "@/components/HeroSection";
import ImageStrip from "@/components/ImageStrip";
import { useAppStore } from "@/store/appStore";

function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  const { sections } = useAppStore();
  const sec = sections.find((s) => s.id === id);
  if (!sec || !sec.visible) return null;
  return <>{children}</>;
}

function Divider({ color = "#ffd70033" }: { color?: string }) {
  return (
    <div className="flex items-center gap-4 my-8 px-8">
      <div className="flex-1 h-px" style={{ background: color }} />
      <span style={{ color, fontSize: "1.2rem" }}>✦</span>
      <div className="flex-1 h-px" style={{ background: color }} />
    </div>
  );
}

export default function MainPage() {
  const { messages } = useAppStore();

  const marwan = messages.find((m) => m.id === "marwan-msg");
  const sara = messages.find((m) => m.id === "sara-msg");

  return (
    <div
      className="min-h-screen stars-bg"
      style={{ direction: "rtl" }}
    >
      {/* Nav bar */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(10,8,20,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,215,0,0.12)",
        }}
      >
        <span
          className="text-lg font-bold"
          style={{
            fontFamily: "'Amiri', serif",
            color: "#FFD700",
            textShadow: "0 0 12px rgba(255,215,0,0.5)",
          }}
        >
          أميرة & علاء
        </span>
        <a
          href="/admin"
          className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
          style={{
            color: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          الإدارة
        </a>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-24">
        {/* HERO */}
        <SectionWrapper id="hero">
          <HeroSection />
        </SectionWrapper>

        {/* CELEBRATION TEXT */}
        <SectionWrapper id="celebration">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
          >
            <NeonCard variant="gold" className="mb-6">
              <div className="text-center mb-5">
                <span
                  className="text-2xl font-bold tracking-widest"
                  style={{
                    color: "#FFD700",
                    textShadow: "0 0 20px #FFD700aa, 0 0 40px #FFD70055",
                    fontFamily: "'Amiri', serif",
                    letterSpacing: "0.2em",
                  }}
                >
                  Celebration
                </span>
              </div>
              <h2
                className="text-2xl font-bold text-center mb-6"
                style={{
                  fontFamily: "'Amiri', serif",
                  color: "#FFD700",
                  textShadow: "0 0 16px #FFD700aa",
                }}
              >
                احتفالٌ بالأميرة أميرة
              </h2>
              <p
                className="arabic-justify text-base md:text-lg leading-loose"
                style={{
                  color: "#F5E6C8",
                  fontFamily: "'Amiri', serif",
                  lineHeight: "2.4",
                  textAlign: "justify",
                  textAlignLast: "right",
                }}
              >
                في هذا اليوم المبارك، نجتمع — ولو من بعيد — لنحتفي بكِ يا أميرة، وبشريك عمركِ علاء. هذا الموقع هديّة من القلب: مرجعٌ تعودين إليه دائماً لترَيْ كم أنتِ محبوبة، وكم كانت لحظات يومكِ ساحرة.
              </p>
            </NeonCard>
          </motion.div>
        </SectionWrapper>

        {/* POETRY 1 */}
        <SectionWrapper id="poetry1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
          >
            <NeonCard variant="cyan" className="mb-6">
              <h3
                className="text-xl font-bold text-center mb-6"
                style={{
                  color: "#00e5ff",
                  textShadow: "0 0 16px #00e5ffaa",
                  fontFamily: "'Amiri', serif",
                }}
              >
                هنا تبدأ حكاية — تكتبها الذكريات وترويها القلوب
              </h3>
              <div
                className="space-y-1"
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "1.05rem",
                  lineHeight: "2.5",
                  color: "#E0F7FA",
                  textAlign: "justify",
                  textAlignLast: "right",
                  direction: "rtl",
                }}
              >
                {[
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
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    style={{ textAlign: "right" }}
                  >
                    {line}
                  </motion.p>
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="mt-4 text-center font-bold"
                  style={{
                    color: "#FFD700",
                    textShadow: "0 0 16px #FFD700aa",
                    fontSize: "1.1rem",
                  }}
                >
                  أنصيبك نورهٍ وعظمته ،،، أم قدرك قسوته وظلمته
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-center mt-3 italic"
                  style={{ color: "#00e5ffaa", fontSize: "0.95rem" }}
                >
                  من أعماق الروح
                </motion.p>
              </div>
            </NeonCard>
          </motion.div>
        </SectionWrapper>

        {/* PHILOSOPHY 1 */}
        <SectionWrapper id="philosophy1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
          >
            <NeonCard variant="purple" className="mb-6">
              <div
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "1.05rem",
                  lineHeight: "2.5",
                  color: "#F3E5F5",
                  textAlign: "justify",
                  textAlignLast: "right",
                  direction: "rtl",
                }}
              >
                {[
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
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    style={{ marginBottom: "0.3rem" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </NeonCard>
          </motion.div>
        </SectionWrapper>

        {/* PHILOSOPHY 2 */}
        <SectionWrapper id="philosophy2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
          >
            <NeonCard variant="rose" className="mb-6">
              <div
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "1.1rem",
                  lineHeight: "2.6",
                  color: "#FCE4EC",
                  textAlign: "justify",
                  textAlignLast: "center",
                  direction: "rtl",
                }}
              >
                <p className="text-center mb-4" style={{ color: "#ff80ab", textShadow: "0 0 12px #ff80ab88" }}>
                  يٌقال أن الرجال نوعان
                </p>
                <p className="text-center font-bold mb-3" style={{ color: "#fff", fontSize: "1.15rem" }}>
                  "رجلُ يحيى بقلبه وآخر يٌحيي قلبه"
                </p>
                <p className="text-center mb-4" style={{ color: "#ff80ab88" }}>وكذا</p>
                <p
                  className="text-center font-bold"
                  style={{ color: "#FFD700", textShadow: "0 0 16px #FFD700aa", fontSize: "1.05rem" }}
                >
                  "أن أعتى الرجال وأخطرهم قتلتهم قلوبهم ،،، وأضعفهم أحيتهم قلوبهم"
                </p>
              </div>
            </NeonCard>
          </motion.div>
        </SectionWrapper>

        {/* IMAGE STRIP */}
        <SectionWrapper id="imagestrip">
          <div className="mb-6">
            <Divider color="#ffd70022" />
            <ImageStrip />
            <Divider color="#ffd70022" />
          </div>
        </SectionWrapper>

        {/* MESSAGES SECTION HEADER */}
        <SectionWrapper id="messages">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: "'Amiri', serif",
                color: "#FFD700",
                textShadow: "0 0 24px #FFD700aa, 0 0 48px #FFD70055",
              }}
            >
              رسائل من القلب
            </h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Cairo', sans-serif" }}>
              ✦ كلمات تُحفر في الذاكرة وتبقى في القلب ✦
            </p>
          </motion.div>
        </SectionWrapper>

        {/* AMIRA CARD */}
        <SectionWrapper id="amira-card">
          <NeonCard variant="rose" className="mb-6" delay={0.1}>
            <p
              className="text-center text-lg font-bold leading-loose"
              style={{
                fontFamily: "'Amiri', serif",
                color: "#FCE4EC",
                textAlign: "justify",
                textAlignLast: "center",
                direction: "rtl",
                lineHeight: "2.5",
              }}
            >
              أميرة، أنت القصيدة التي لم أكتبها بعد، والحلم الذي أصبح حقيقة في يوم ١٤ مايو ٢٠٢٦.
            </p>
          </NeonCard>
        </SectionWrapper>

        {/* ALAA CARD */}
        <SectionWrapper id="alaa-card">
          <NeonCard variant="cyan" className="mb-6" delay={0.15}>
            <p
              className="text-center text-lg font-bold leading-loose"
              style={{
                fontFamily: "'Amiri', serif",
                color: "#E0F7FA",
                textAlign: "justify",
                textAlignLast: "center",
                direction: "rtl",
                lineHeight: "2.5",
              }}
            >
              علاء، معك بدأت حكاية لا تنتهي، وكتبنا بيدينا أجمل فصول العمر.
            </p>
          </NeonCard>
        </SectionWrapper>

        {/* FAMILY CARD */}
        <SectionWrapper id="family-card">
          <NeonCard variant="gold" className="mb-6" delay={0.2}>
            <p
              className="text-center text-lg leading-loose"
              style={{
                fontFamily: "'Amiri', serif",
                color: "#FFF8DC",
                textAlign: "justify",
                textAlignLast: "center",
                direction: "rtl",
                lineHeight: "2.5",
              }}
            >
              كل التهاني والتمنيات لعروسينا الغاليين — بارك الله لكم وبارك عليكم وجمع بينكم في خير وسعادة دائمة.
            </p>
          </NeonCard>
        </SectionWrapper>

        {/* MARWAN CARD */}
        {marwan?.visible && (
          <SectionWrapper id="marwan-card">
            <NeonCard variant="purple" className="mb-6" delay={0.25}>
              <div
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "1rem",
                  lineHeight: "2.4",
                  color: "#F3E5F5",
                  direction: "rtl",
                }}
              >
                <h4
                  className="text-xl font-bold mb-4 text-center"
                  style={{ color: "#e040fb", textShadow: "0 0 12px #e040fb88" }}
                >
                  ✉︎ رسالة مروان
                </h4>
                <p className="mb-2" style={{ color: "#ce93d8" }}>إلى أختي وحبيبتي العروسة، أرقى وأجمل أميرة نجم</p>
                <div
                  style={{
                    textAlign: "justify",
                    textAlignLast: "right",
                  }}
                >
                  <p className="mb-3">
                    عايزك بس تكوني متأكدة أني والله ما منعني عن حضور غير العذر القهري، الخارج عن الإرادة المنفردة، بس أكيد في يوم من الأيام هنتقابل وهقدر أشرحلك الموقف كامل.
                  </p>
                  <p className="mb-3">سامحيني يا حبيبتي.</p>
                  <p className="mb-3">وسلامي لعلاء زوجك.</p>
                  <p className="mb-3">أترككم في رعاية الله وحفظه.</p>
                  <p className="mb-4">ألف مبروك يا أميرة، وربنا يسعدك ويبارك في عمرك.</p>
                  <p style={{ color: "#ce93d8" }}>مع أطيب التمنيات،</p>
                  <p className="font-bold" style={{ color: "#e040fb", textShadow: "0 0 8px #e040fb66" }}>
                    — مروان نجم
                  </p>
                </div>
              </div>
            </NeonCard>
          </SectionWrapper>
        )}

        {/* SARA CARD */}
        {sara?.visible && (
          <SectionWrapper id="sara-card">
            <NeonCard variant="cyan" className="mb-6" delay={0.3}>
              <div
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "1rem",
                  lineHeight: "2.4",
                  color: "#E0F7FA",
                  direction: "rtl",
                }}
              >
                <h4
                  className="text-xl font-bold mb-4 text-center"
                  style={{ color: "#00e5ff", textShadow: "0 0 12px #00e5ff88" }}
                >
                  ✦ تهنئة سارة نجم وحمزة نجم
                </h4>
                <div
                  style={{
                    textAlign: "justify",
                    textAlignLast: "right",
                  }}
                >
                  <p className="mb-3">
                    مبروك يا الأميرة عمتو! أتمنالك السعادة والتوفيق في كل لحظات حياتك الجاية. السلام لحين اللقاء يا حبيبة قلبي أنا وحمزة، أنا بتكلم بلساني وبلسان حمزة علشان هو لسه صغير ومبيعرفش يتكلم.
                  </p>
                  <p className="mb-3">
                    مروان دايماً يقولي إني نسخة منك وأنا بقوله لأ، هي أجمل كتير بصراحة، بس لما شفت الفيديوهات والصور حسيت إن فعلاً ممكن أكون أنا في يوم من الأيام شبهك، وده أكيد هيكون أكبر ضربة حظ ليا في حياتي إني أكون حتى في نص جمالك يا الأميرة أميرة. بحبك أوي يا عمتو، وحمزة بيقولك "ها اه اه"، أكيد يقصد إنه بيحبك هو كمان. مين يشوفك ومايحبكيش يا عمتو؟
                  </p>
                  <p
                    className="mb-3 text-sm"
                    style={{ color: "#80deea", fontStyle: "italic" }}
                  >
                    (ملحوظة: متستغربيش إني بناديه باسمه، احنا أصحاب. أنا بقوله "يا بابا" بس لما بيكون زعلان مني، لأننا ساعتها مبنبقاش صحاب.)
                  </p>
                  <p className="mb-2">السلام لحين اللقاء.</p>
                  <p className="mb-4">باي باي يا الأميرة عمتو أميرة.</p>
                  <p className="mb-1">بحبك جداً وحمزة كمان بيحبك جداً.</p>
                  <p className="font-bold mt-3" style={{ color: "#00e5ff", textShadow: "0 0 8px #00e5ff66" }}>
                    — سارة نجم & حمزة نجم
                  </p>
                </div>
              </div>
            </NeonCard>
          </SectionWrapper>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mt-16 pb-8"
        >
          <Divider color="#ffd70022" />
          <p
            style={{
              color: "#FFD70055",
              fontFamily: "'Amiri', serif",
              fontSize: "1.1rem",
              letterSpacing: "0.15em",
            }}
          >
            ✦ بارك الله لكم وبارك عليكم وجمع بينكم في خير ✦
          </p>
          <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Cairo', sans-serif" }}>
            ١٤ مايو ٢٠٢٦
          </p>
        </motion.div>
      </div>
    </div>
  );
}
