import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const blocks = [
  [
    "يُقال أن البشر يولدون على فطرة ما يعيشون، فهل قتل لأنه كذا؟",
    "لا فوالله قتل لأنه وُلِد على فطرة القتل..."
  ],
  [
    "قلبٌ ينبض بجبنٍ كقلب الشجعان، والتشبيه هنا للنبض لا القلوب يا غلام.",
    "ولما كانت الدابة التي لا تعقل أفضل من قاتل الفطرة لما رفعت حافرها عن وليدها خشية أن تصيبه.",
    "دابة لا تعقل خشيت فظهرت عظمة قدرة الله."
  ],
  [
    "أوصيك يا غلام برحمة خلق الله،",
    "أيجب أن تُصبح دابة لترحم وتصفح وتعفو؟",
    "سامح لتُسامح، أصفح لكي يُصفح عنك، وأعفو ليٌعفى عنك",
    "",
    "وأعلم أن غطاء ستر الله له قدر ومقدار، خفيف كوزن جناح البعوضة لا يزن مثقال ذرة.",
    "حافظوا على ستركم وسركم حتى لا يضيع غطاءكم، ولو ضاقت وأستحكمت فاهرعوا الى سعة فضاء رحمة الله، اللهم عًز علىَ أمرُ لك فيه أسباب."
  ],
  [
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
  ],
  [
    "يٌقال أن الرجال نوعان",
    "\"رجلُ يحيى بقلبه وآخر يٌحيي قلبه\"",
    "وكذا",
    "\"أن أعتى الرجال وأخطرهم قتلتهم قلوبهم ،،، وأضعفهم أحيتهم قلوبهم\""
  ]
];

function Divider() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex justify-center items-center py-20"
    >
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/40"></div>
        <div className="w-2 h-2 rotate-45 bg-primary/60 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/40"></div>
      </div>
    </motion.div>
  );
}

function Home() {
  return (
    <div dir="rtl" className="min-h-[100dvh] w-full bg-background relative selection:bg-primary/30 selection:text-primary">
      <div className="noise-overlay"></div>
      <div className="dust-overlay"></div>

      {/* Atmospheric lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center">
        {blocks.map((block, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ 
                duration: 1.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 
              }}
              className="w-full"
            >
              <div className="literary-text text-2xl md:text-3xl/relaxed lg:text-4xl/relaxed text-foreground/90 font-medium tracking-wide">
                {block.map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    {lineIndex < block.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
            
            {index < blocks.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-32 pt-20 border-t border-primary/10 w-full text-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mx-auto mb-8"></div>
        </motion.div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
