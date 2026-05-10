"use client";

import { motion } from "framer-motion";

export default function FloatingAccent({ Icon, size = 120, top, left, right, bottom, duration = 25, delay = 0, color = "text-primary/20", blur = 1, stroke = 1.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        y: [0, -50, 0],
        x: [0, 25, 0],
        rotate: [0, 180, 360]
      }}
      transition={{
        opacity: { duration: 3 },
        y: { repeat: Infinity, duration: duration, ease: "easeInOut" },
        x: { repeat: Infinity, duration: duration * 1.4, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: duration * 3, ease: "linear" },
        delay: delay
      }}
      style={{ position: 'absolute', top, left, right, bottom }}
      className={`filter blur-[1px] select-none pointer-events-none z-0 ${color}`}
    >
      <Icon size={size} strokeWidth={stroke} className="opacity-100" />
    </motion.div>
  );
}
