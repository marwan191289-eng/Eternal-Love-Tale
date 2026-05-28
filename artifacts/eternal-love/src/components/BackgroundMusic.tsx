import { useEffect, useRef, useState, useCallback } from "react";
import musicFile from "@assets/background-music_1779687276994.mp3";

interface BackgroundMusicProps {
  onRef?: (ref: BackgroundMusicRef) => void;
}

export interface BackgroundMusicRef {
  pauseForVideo: () => void;
  resumeAfterVideo: () => void;
}

export function BackgroundMusic({ onRef }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showSlider, setShowSlider] = useState(false);
  const [started, setStarted] = useState(false);
  const pausedByVideoRef = useRef(false);

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || started) return;
    try {
      audio.volume = volume;
      audio.muted = false;
      audio.currentTime = 0;
      await audio.play();
      setIsPlaying(true);
      setStarted(true);
    } catch { /* autoplay blocked — will play on first interaction */ }
  }, [started, volume]);

  useEffect(() => {
    const timer = setTimeout(() => tryPlay(), 150);
    const onInteraction = () => {
      tryPlay();
      ["click", "touchstart", "keydown"].forEach(e => document.removeEventListener(e, onInteraction));
    };
    ["click", "touchstart", "keydown", "mousemove"].forEach(e => document.addEventListener(e, onInteraction));
    return () => {
      clearTimeout(timer);
      ["click", "touchstart", "keydown", "mousemove"].forEach(e => document.removeEventListener(e, onInteraction));
    };
  }, [tryPlay]);

  useEffect(() => {
    if (!onRef) return;
    onRef({
      pauseForVideo: () => {
        const a = audioRef.current;
        if (!a || a.paused) return;
        pausedByVideoRef.current = true;
        a.pause(); setIsPlaying(false);
      },
      resumeAfterVideo: () => {
        const a = audioRef.current;
        if (!a || !pausedByVideoRef.current) return;
        pausedByVideoRef.current = false;
        a.play().then(() => setIsPlaying(true)).catch(() => {});
      },
    });
  }, [onRef]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!started) { tryPlay(); return; }
    if (isPlaying) { a.pause(); setIsPlaying(false); }
    else { a.play().then(() => setIsPlaying(true)).catch(() => {}); }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (!isPlaying && v > 0) audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const WaveIcon = () => (
    <span className="flex items-end gap-0.5 h-4 w-5">
      {[0.6, 1, 0.75, 1, 0.6].map((h, i) => (
        <span key={i} className="wave-bar" style={{ height: `${h * 14}px`, animationDuration: `${0.5 + i * 0.15}s`, animationDelay: `${i * 0.1}s` }} />
      ))}
    </span>
  );

  const MuteIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );

  return (
    <>
      <audio ref={audioRef} src={musicFile} loop preload="auto" autoPlay playsInline style={{ display: "none" }} />

      {/* Centered-bottom music control — visible between both sidebars */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        {showSlider && (
          <div
            className="glass rounded-2xl border border-gold/30 px-4 py-3 shadow-elegant flex flex-col items-center gap-2"
            style={{ animation: "fadeInUp 0.2s ease-out" }}
          >
            <span className="font-display text-[10px] tracking-widest text-gold/70 uppercase">Volume</span>
            <input
              type="range" min="0" max="1" step="0.01" value={volume}
              onChange={handleVolume}
              className="w-28 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                accentColor: "oklch(0.82 0.13 75)",
                background: `linear-gradient(to right, oklch(0.82 0.13 75) ${volume * 100}%, oklch(0.82 0.13 75 / 25%) ${volume * 100}%)`,
              }}
            />
            <span className="font-display text-[10px] text-gold/50">{Math.round(volume * 100)}%</span>
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
          aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
          data-testid="button-music-toggle"
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur hover:shadow-glow cursor-pointer
            ${isPlaying
              ? "bg-gold/20 border-gold/60 text-gold hover:bg-gold/30 pulse-glow"
              : "bg-card/70 border-gold/35 text-muted-foreground hover:border-gold/60 hover:text-gold"
            }`}
        >
          {isPlaying ? <WaveIcon /> : <MuteIcon />}
        </button>
      </div>
    </>
  );
}
