import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useAppStore } from "@/store/appStore";

export default function MusicPlayer() {
  const { lang } = useLang();
  const { musicUrl } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnd = () => setPlaying(false);
    audio.addEventListener("ended", handleEnd);
    return () => audio.removeEventListener("ended", handleEnd);
  }, []);

  return (
    <>
      {musicUrl && <audio ref={audioRef} src={musicUrl} loop preload="none" />}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-1.5 rounded-xl text-xs whitespace-nowrap"
              style={{
                background: "rgba(5,3,15,0.96)",
                border: "1px solid rgba(255,215,0,0.25)",
                color: "rgba(255,215,0,0.8)",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              {!musicUrl
                ? (lang === "ar" ? "لا توجد موسيقى — اضبطها من الإدارة" : "No music — set it from Admin")
                : playing
                ? (lang === "ar" ? "إيقاف الموسيقى" : "Pause Music")
                : (lang === "ar" ? "تشغيل الموسيقى" : "Play Music")}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={toggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: playing
              ? "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(218,112,214,0.18))"
              : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,215,0,0.08))",
            border: playing
              ? "1px solid rgba(255,215,0,0.55)"
              : "1px solid rgba(255,255,255,0.18)",
            boxShadow: playing
              ? "0 0 28px rgba(255,215,0,0.3), 0 0 56px rgba(255,215,0,0.1)"
              : "0 0 14px rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Pulsing ring when playing */}
          {playing && (
            <>
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(255,215,0,0.3)",
                  animation: "music-pulse 1.8s ease-out infinite",
                }}
              />
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(218,112,214,0.2)",
                  animation: "music-pulse 1.8s ease-out infinite 0.6s",
                }}
              />
            </>
          )}

          {/* Waveform bars (visible when playing) */}
          {playing ? (
            <div className="flex items-end gap-0.5 h-5">
              {[1, 2, 3, 4, 3].map((h, i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 3,
                    background: "#FFD700",
                    boxShadow: "0 0 4px #FFD70088",
                    animation: `wave-bar ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.1}s`,
                    height: `${h * 4}px`,
                  }}
                />
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "1.4rem", filter: "drop-shadow(0 0 4px rgba(255,215,0,0.4))" }}>
              🎵
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
