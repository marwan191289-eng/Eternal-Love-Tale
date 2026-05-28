import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useAppStore } from "@/store/appStore";

export default function MusicPlayer() {
  const { lang } = useLang();
  const { musicUrl } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const triedAutoplay = useRef(false);

  const startPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;
    audio.play()
      .then(() => {
        setPlaying(true);
        setWaitingForInteraction(false);
      })
      .catch(() => {
        setPlaying(false);
      });
  }, [musicUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnd = () => setPlaying(false);
    audio.addEventListener("ended", handleEnd);
    return () => audio.removeEventListener("ended", handleEnd);
  }, []);

  useEffect(() => {
    if (!musicUrl || triedAutoplay.current) return;
    triedAutoplay.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoplay = () => {
      audio.play()
        .then(() => {
          setPlaying(true);
          setWaitingForInteraction(false);
        })
        .catch(() => {
          setWaitingForInteraction(true);
          const onInteract = () => {
            audio.play()
              .then(() => {
                setPlaying(true);
                setWaitingForInteraction(false);
              })
              .catch(() => {});
            document.removeEventListener("click", onInteract);
            document.removeEventListener("touchstart", onInteract);
            document.removeEventListener("keydown", onInteract);
          };
          document.addEventListener("click", onInteract, { once: true });
          document.addEventListener("touchstart", onInteract, { once: true });
          document.addEventListener("keydown", onInteract, { once: true });
        });
    };

    const timer = setTimeout(tryAutoplay, 800);
    return () => clearTimeout(timer);
  }, [musicUrl]);

  useEffect(() => {
    triedAutoplay.current = false;
  }, [musicUrl]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      setWaitingForInteraction(false);
    } else {
      startPlay();
    }
  };

  return (
    <>
      {musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          preload="auto"
        />
      )}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {(showTooltip || waitingForInteraction) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-1.5 rounded-xl text-xs whitespace-nowrap"
              style={{
                background: "rgba(5,3,15,0.96)",
                border: `1px solid ${waitingForInteraction ? "rgba(218,112,214,0.4)" : "rgba(255,215,0,0.25)"}`,
                color: waitingForInteraction ? "rgba(218,112,214,0.9)" : "rgba(255,215,0,0.8)",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              {waitingForInteraction
                ? (lang === "ar" ? "🎵 انقر في أي مكان لتشغيل الموسيقى" : "🎵 Tap anywhere to start music")
                : !musicUrl
                ? (lang === "ar" ? "لا توجد موسيقى — اضبطها من الإدارة" : "No music — set it from Admin")
                : playing
                ? (lang === "ar" ? "إيقاف الموسيقى" : "Pause Music")
                : (lang === "ar" ? "تشغيل الموسيقى" : "Play Music")}
            </motion.div>
          )}
        </AnimatePresence>

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
              : waitingForInteraction
              ? "linear-gradient(135deg, rgba(218,112,214,0.15), rgba(255,215,0,0.08))"
              : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,215,0,0.08))",
            border: playing
              ? "1px solid rgba(255,215,0,0.55)"
              : waitingForInteraction
              ? "1px solid rgba(218,112,214,0.5)"
              : "1px solid rgba(255,255,255,0.18)",
            boxShadow: playing
              ? "0 0 28px rgba(255,215,0,0.3), 0 0 56px rgba(255,215,0,0.1)"
              : waitingForInteraction
              ? "0 0 20px rgba(218,112,214,0.25)"
              : "0 0 14px rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
            transition: "all 0.3s ease",
          }}
        >
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

          {waitingForInteraction && !playing && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(218,112,214,0.4)",
                animation: "music-pulse 2.2s ease-out infinite",
              }}
            />
          )}

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
            <span
              style={{
                fontSize: "1.4rem",
                filter: waitingForInteraction
                  ? "drop-shadow(0 0 6px rgba(218,112,214,0.6))"
                  : "drop-shadow(0 0 4px rgba(255,215,0,0.4))",
                animation: waitingForInteraction ? "float-gentle 2s ease-in-out infinite" : "none",
              }}
            >
              🎵
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
