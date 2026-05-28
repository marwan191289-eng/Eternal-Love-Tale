import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function DevCard() {
  const { lang, t, dir } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="my-10 flex justify-center"
      dir={dir}
    >
      <div
        className="relative rounded-3xl overflow-hidden max-w-sm w-full"
        style={{
          background: "linear-gradient(135deg, rgba(5,3,15,0.95) 0%, rgba(12,8,30,0.9) 100%)",
          border: "1px solid rgba(255,215,0,0.25)",
          boxShadow: "0 0 40px rgba(255,215,0,0.08), 0 0 80px rgba(224,64,251,0.06), inset 0 0 40px rgba(255,215,0,0.02)",
        }}
      >
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #FFD700 30%, #e040fb 70%, transparent 100%)",
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,215,0,0.04) 0%, transparent 70%)",
          }}
        />


        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.2) 50%, transparent 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
