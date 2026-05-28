import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MemorySidebarProps {
  images: Array<{ id: string; src: string; caption: string }>;
  position?: 'left' | 'right';
  scrollDir?: 'up' | 'down';
}

export function MemorySidebar({ images, position = 'right', scrollDir = 'up' }: MemorySidebarProps) {
  const [pos, setPos] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const maxScroll = images.length * 224;

  useEffect(() => {
    if (!autoScroll || images.length === 0) return;
    const interval = setInterval(() => {
      setPos((prev) => (prev + 1) % maxScroll);
    }, 40);
    return () => clearInterval(interval);
  }, [autoScroll, maxScroll, images.length]);

  const handleScroll = (direction: 'up' | 'down') => {
    setAutoScroll(false);
    const step = 80;
    setPos((prev) => {
      const delta = direction === 'down' ? step : -step;
      return ((prev + delta) % maxScroll + maxScroll) % maxScroll;
    });
  };

  // 'up' direction: content moves up (translateY goes negative as pos increases)
  // 'down' direction: content moves down (reverse: use maxScroll - pos)
  const translateY = scrollDir === 'up'
    ? -pos
    : -(maxScroll - pos);

  if (images.length === 0) return null;

  const edgeClass = position === 'right' ? 'right-0 border-l' : 'left-0 border-r';
  const expandClass = position === 'right' ? 'hover:w-44' : 'hover:w-44';

  return (
    <div
      className={`fixed top-28 ${edgeClass} h-[calc(100vh-220px)] w-28 ${expandClass}
        bg-gradient-to-b from-gold/15 via-card/60 to-gold/15
        backdrop-blur-md border-gold/25 flex flex-col items-center justify-between
        py-4 z-20 transition-all duration-300 group shadow-lg`}
      onMouseEnter={() => setAutoScroll(false)}
      onMouseLeave={() => setAutoScroll(true)}
    >
      <button
        onClick={() => handleScroll('up')}
        className="p-2 text-gold hover:text-gold/80 transition-all opacity-50 group-hover:opacity-100 hover:bg-gold/10 rounded-lg"
      >
        <ChevronUp size={20} />
      </button>

      <div className="flex-1 overflow-hidden relative w-full px-2">
        <div
          className="flex flex-col gap-3 will-change-transform"
          style={{ transform: `translateY(${translateY}px)`, transition: "transform 0.08s linear" }}
        >
          {[...images, ...images].map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              className="relative flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden border border-gold/35 hover:border-gold/75
                transition-all cursor-pointer group/img hover:shadow-2xl hover:shadow-gold/40 transform hover:scale-105"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-2">
                <p className="text-xs text-gold/90 text-center px-1 line-clamp-2 font-body-ar">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleScroll('down')}
        className="p-2 text-gold hover:text-gold/80 transition-all opacity-50 group-hover:opacity-100 hover:bg-gold/10 rounded-lg"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
}
