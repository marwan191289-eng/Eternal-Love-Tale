import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useAppStore } from "@/store/appStore";

export default function MusicPlayer() {
  const { lang } = useLang();
  const { musicUrl, volume, setVolume } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const triedAutoplay = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  const startPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;
    audio.volume = volume;
    audio.play()
      .then(() => {
        setPlaying(true);
        setWaitingForInteraction(false);
      })
      .catch(() => setPlaying(false));
  }, [musicUrl, volume]);

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
    audio.volume = volume;
    const tryAutoplay = () => {
      audio.play()
        .then(() => { setPlaying(true); setWaitingForInteraction(false); })
        .catch(() => {
          setWaitingForInteraction(true);
          const onInteract = () => {
            audio.play().then(() => { setPlaying(true); setWaitingForInteraction(false); }).catch(() => {});
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

  useEffect(() => { triedAutoplay.current = false; }, [musicUrl]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); setWaitingForInteraction(false); }
    else startPlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const isMuted = volume === 0;

  return (
    <>
      {musicUrl && <audio ref={audioRef} src={musicUrl} loop preload="auto" />}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {(showTooltip || waitingForInteraction) && !showVolume && (
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
                : playing
                ? (lang === "ar" ? "إيقاف الموسيقى" : "Pause Music")
                : (lang === "ar" ? "تشغيل الموسيقى" : "Play Music")}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume panel */}
        <AnimatePresence>
          {showVolume && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-3 rounded-2xl flex flex-col items-center gap-2"
              style={{
                background: "rgba(5,3,15,0.97)",
                border: "1px solid rgba(255,215,0,0.25)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                backdropFilter: "blur(20px)",
                minWidth: "160px",
              }}
            >
              <span className="text-xs" style={{ color: "rgba(255,215,0,0.7)", fontFamily: "'Cairo', sans-serif" }}>
                {lang === "ar" ? "مستوى الصوت" : "Volume"}
              </span>
              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={() => { setVolume(0); if (audioRef.current) audioRef.current.volume = 0; }}
                  style={{ color: isMuted ? "#ff6464" : "rgba(255,215,0,0.5)", fontSize: "1rem", transition: "color 0.2s" }}
                >
                  🔇
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1"
                  style={{
                    WebkitAppearance: "none",
                    height: "4px",
                    borderRadius: "2px",
                    background: `linear-gradient(to right, #FFD700 ${volume * 100}%, rgba(255,255,255,0.15) ${volume * 100}%)`,
                    outline: "none",
                    cursor: "pointer",
                  }}
                />
                <button
                  onClick={() => { setVolume(1); if (audioRef.current) audioRef.current.volume = 1; }}
                  style={{ color: "rgba(255,215,0,0.5)", fontSize: "1rem" }}
                >
                  🔊
                </button>
              </div>
              <span className="text-xs font-bold" style={{ color: "#FFD700", fontFamily: "monospace" }}>
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {/* Volume toggle button */}
          <motion.button
            onClick={() => setShowVolume(!showVolume)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: showVolume
                ? "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(218,112,214,0.15))"
                : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,215,0,0.06))",
              border: showVolume ? "1px solid rgba(255,215,0,0.5)" : "1px solid rgba(255,255,255,0.14)",
              boxShadow: showVolume ? "0 0 16px rgba(255,215,0,0.25)" : "0 0 10px rgba(0,0,0,0.4)",
              backdropFilter: "blur(16px)",
              transition: "all 0.3s ease",
              fontSize: "1rem",
            }}
            title={lang === "ar" ? "مستوى الصوت" : "Volume"}
          >
            {isMuted ? "🔇" : volume < 0.4 ? "🔉" : "🔊"}
          </motion.button>

          {/* Play/pause button */}
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
                <span className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(255,215,0,0.3)", animation: "music-pulse 1.8s ease-out infinite" }} />
                <span className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(218,112,214,0.2)", animation: "music-pulse 1.8s ease-out infinite 0.6s" }} />
              </>
            )}
            {waitingForInteraction && !playing && (
              <span className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(218,112,214,0.4)", animation: "music-pulse 2.2s ease-out infinite" }} />
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
              <span style={{
                fontSize: "1.4rem",
                filter: waitingForInteraction ? "drop-shadow(0 0 6px rgba(218,112,214,0.6))" : "drop-shadow(0 0 4px rgba(255,215,0,0.4))",
                animation: waitingForInteraction ? "float-gentle 2s ease-in-out infinite" : "none",
              }}>
                🎵
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
}
