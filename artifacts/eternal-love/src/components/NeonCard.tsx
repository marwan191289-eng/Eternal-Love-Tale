import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  variant?: "gold" | "cyan" | "rose" | "purple";
  className?: string;
  delay?: number;
}

export default function NeonCard({ children, variant = "gold", className = "", delay = 0 }: NeonCardProps) {
  const cardClass = variant === "gold" ? "neon-card-gold" : "neon-card-cyan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={`rounded-2xl p-6 md:p-8 ${cardClass} ${className}`}
      style={{
        background:
          variant === "gold"
            ? "linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(184,134,11,0.08) 50%, rgba(255,215,0,0.03) 100%)"
            : variant === "cyan"
            ? "linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(0,188,212,0.08) 50%, rgba(0,229,255,0.03) 100%)"
            : variant === "rose"
            ? "linear-gradient(135deg, rgba(255,105,180,0.05) 0%, rgba(194,24,91,0.08) 50%, rgba(255,105,180,0.03) 100%)"
            : "linear-gradient(135deg, rgba(218,112,214,0.05) 0%, rgba(123,31,162,0.08) 50%, rgba(218,112,214,0.03) 100%)",
        border:
          variant === "gold"
            ? "1px solid rgba(255,215,0,0.35)"
            : variant === "cyan"
            ? "1px solid rgba(0,229,255,0.35)"
            : variant === "rose"
            ? "1px solid rgba(255,105,180,0.35)"
            : "1px solid rgba(218,112,214,0.35)",
        boxShadow:
          variant === "gold"
            ? "0 0 20px rgba(255,215,0,0.08), 0 0 60px rgba(255,215,0,0.04), inset 0 0 20px rgba(255,215,0,0.03)"
            : variant === "cyan"
            ? "0 0 20px rgba(0,229,255,0.08), 0 0 60px rgba(0,229,255,0.04), inset 0 0 20px rgba(0,229,255,0.03)"
            : variant === "rose"
            ? "0 0 20px rgba(255,105,180,0.08), 0 0 60px rgba(255,105,180,0.04), inset 0 0 20px rgba(255,105,180,0.03)"
            : "0 0 20px rgba(218,112,214,0.08), 0 0 60px rgba(218,112,214,0.04), inset 0 0 20px rgba(218,112,214,0.03)",
        backdropFilter: "blur(16px)",
      }}
    >
      {children}
    </motion.div>
  );
}
