import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import SplashPage from "@/pages/SplashPage";
import MainPage from "@/pages/MainPage";
import AdminPage from "@/pages/AdminPage";
import Fireworks from "@/components/Fireworks";
import { useAppStore } from "@/store/appStore";
import { LangProvider, useLang } from "@/context/LangContext";

const queryClient = new QueryClient();

function SiteLock({ children }: { children: React.ReactNode }) {
  const { sitePassword, sitePasswordEnabled } = useAppStore();
  const { lang } = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  if (!sitePasswordEnabled || unlocked) return <>{children}</>;

  const tryUnlock = () => {
    if (input === sitePassword) setUnlocked(true);
    else setError(lang === "ar" ? "كلمة المرور غير صحيحة" : "Incorrect password");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at center, #0d0b1e 0%, #05030f 100%)" }}
    >
      <div
        className="rounded-2xl p-8 w-full max-w-sm text-center"
        style={{
          background: "rgba(255,215,0,0.05)",
          border: "1px solid rgba(255,215,0,0.3)",
          boxShadow: "0 0 40px rgba(255,215,0,0.1)",
        }}
      >
        <p className="text-5xl mb-6">🔒</p>
        <h2
          className="text-xl font-bold mb-6"
          style={{
            color: "#FFD700",
            fontFamily: lang === "ar" ? "'Amiri', serif" : "Georgia, serif",
            textShadow: "0 0 12px rgba(255,215,0,0.5)",
          }}
        >
          {lang === "ar" ? "الموقع محمي بكلمة مرور" : "Site Protected by Password"}
        </h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") tryUnlock(); }}
          placeholder={lang === "ar" ? "أدخل كلمة المرور" : "Enter password"}
          className="w-full px-4 py-3 rounded-xl mb-3 text-center"
          style={{
            background: "rgba(255,215,0,0.08)",
            border: "1px solid rgba(255,215,0,0.3)",
            color: "#FFD700",
            outline: "none",
            fontFamily: "'Cairo', sans-serif",
            direction: lang === "ar" ? "rtl" : "ltr",
          }}
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <button
          onClick={tryUnlock}
          className="w-full py-2 rounded-xl"
          style={{
            background: "rgba(255,215,0,0.15)",
            border: "1px solid rgba(255,215,0,0.4)",
            color: "#FFD700",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          {lang === "ar" ? "دخول" : "Enter"}
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [fireworksActive, setFireworksActive] = useState(false);

  const handleEnter = () => {
    setShowSplash(false);
    setFireworksActive(true);
    setTimeout(() => setFireworksActive(false), 8000);
  };

  return (
    <>
      <Fireworks active={fireworksActive} />
      {showSplash ? (
        <SplashPage onEnter={handleEnter} />
      ) : (
        <Switch>
          <Route path="/" component={MainPage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFound} />
        </Switch>
      )}
    </>
  );
}

function App() {
  return (
    <LangProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <SiteLock>
              <AppContent />
            </SiteLock>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LangProvider>
  );
}

export default App;
