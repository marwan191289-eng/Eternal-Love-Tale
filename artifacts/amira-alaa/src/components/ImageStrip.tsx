import { motion } from "framer-motion";
import { useAppStore } from "@/store/appStore";

export default function ImageStrip() {
  const { images } = useAppStore();
  const visibleImages = images.filter((img) => img.visible);

  if (visibleImages.length === 0) {
    return (
      <div
        className="py-8 text-center"
        style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Cairo', sans-serif" }}
      >
        لا توجد صور مضافة — يمكن إضافتها من لوحة الإدارة
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-4">
      {/* Left/Right fade gradients */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(10,8,20,1) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(10,8,20,1) 0%, transparent 100%)",
        }}
      />

      <motion.div
        className="flex gap-4"
        style={{
          width: `${visibleImages.length * 240}px`,
          animation: visibleImages.length > 2 ? "strip-scroll 30s linear infinite" : "none",
        }}
      >
        <style>{`
          @keyframes strip-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        {[...visibleImages, ...visibleImages].map((img, i) => (
          <div
            key={`${img.id}-${i}`}
            className="flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
            style={{
              width: "220px",
              height: "160px",
              opacity: 0.4,
              transition: "opacity 0.3s, transform 0.3s",
              border: "1px solid rgba(255,215,0,0.15)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.9";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.4";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
