import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  variant?: "gold" | "cyan" | "rose" | "purple";
  className?: string;
  delay?: number;
}

const palette = {
  gold: {
    color: "#FFD700",
    glow: "rgba(255,215,0,0.28)",
    soft: "rgba(255,215,0,0.06)",
    bg: "linear-gradient(145deg, rgba(255,215,0,0.065), rgba(184,134,11,0.085) 48%, rgba(5,3,15,0.58))",
  },
  cyan: {
    color: "#00e5ff",
    glow: "rgba(0,229,255,0.24)",
    soft: "rgba(0,229,255,0.055)",
    bg: "linear-gradient(145deg, rgba(0,229,255,0.055), rgba(0,188,212,0.080) 48%, rgba(5,3,15,0.58))",
  },
  rose: {
    color: "#ff80ab",
    glow: "rgba(255,128,171,0.24)",
    soft: "rgba(255,128,171,0.055)",
    bg: "linear-gradient(145deg, rgba(255,128,171,0.060), rgba(194,24,91,0.085) 48%, rgba(5,3,15,0.58))",
  },
  purple: {
    color: "#e040fb",
    glow: "rgba(224,64,251,0.24)",
    soft: "rgba(224,64,251,0.055)",
    bg: "linear-gradient(145deg, rgba(224,64,251,0.060), rgba(123,31,162,0.085) 48%, rgba(5,3,15,0.58))",
  },
} as const;

export default function NeonCard({ children, variant = "gold", className = "", delay = 0 }: NeonCardProps) {
  const p = palette[variant];
  const cardClass = variant === "gold" ? "neon-card-gold" : "neon-card-cyan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 38, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.82, delay, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.006 }}
      className={`relative rounded-[1.45rem] p-6 md:p-8 luxury-sheen ${cardClass} ${className}`}
      style={{
        background: `${p.bg}, radial-gradient(ellipse at 18% 0%, ${p.soft}, transparent 44%), radial-gradient(ellipse at 90% 100%, ${p.soft}, transparent 45%)`,
        border: `1px solid ${p.color}55`,
        boxShadow: `0 20px 70px rgba(0,0,0,0.42), 0 0 28px ${p.glow}, inset 0 1px 0 rgba(255,255,255,0.055), inset 0 0 34px ${p.soft}`,
        backdropFilter: "blur(20px)",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-x-7 top-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${p.color}AA, transparent)` }}
      />
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${p.soft}, transparent 70%)`, animation: "neon-drift 6s ease-in-out infinite" }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
