"use client";

import { motion } from "framer-motion";
import { 
  HeartPulse, 
  Stethoscope, 
  Syringe, 
  Pill, 
  Activity, 
  Microscope, 
  ShieldCheck
} from "lucide-react";

const icons = [
  { Icon: HeartPulse, color: "text-blue-500/80", bg: "bg-blue-400/5", size: 36, duration: 25 },
  { Icon: Stethoscope, color: "text-indigo-500/80", bg: "bg-indigo-400/5", size: 45, duration: 35 },
  { Icon: Syringe, color: "text-orange-500/80", bg: "bg-orange-400/5", size: 34, duration: 28 },
  { Icon: Pill, color: "text-green-500/80", bg: "bg-green-400/5", size: 28, duration: 22 },
  { Icon: Activity, color: "text-teal-500/80", bg: "bg-teal-400/5", size: 40, duration: 32 },
  { Icon: Microscope, color: "text-violet-500/80", bg: "bg-violet-400/5", size: 50, duration: 40 },
  { Icon: ShieldCheck, color: "text-cyan-500/80", bg: "bg-cyan-400/5", size: 38, duration: 30 },
];

// Generates stable random items for layout without hydration mismatch
const items = [
  { i: 0, top: "10%", left: "5%" },
  { i: 1, top: "25%", left: "85%" },
  { i: 2, top: "40%", left: "12%" },
  { i: 3, top: "55%", left: "75%" },
  { i: 4, top: "70%", left: "8%" },
  { i: 5, top: "85%", left: "90%" },
  { i: 6, top: "95%", left: "20%" },
  { i: 1, top: "15%", left: "65%" },
  { i: 4, top: "35%", left: "92%" },
  { i: 2, top: "60%", left: "88%" },
  { i: 0, top: "78%", left: "60%" },
];

export default function FloatingMedicalBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      {items.map((item, idx) => {
        const config = icons[item.i];
        const IconComponent = config.Icon;
        
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              y: [0, -80, 0],
              x: [0, idx % 2 === 0 ? 30 : -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              opacity: { duration: 2 },
              y: { repeat: Infinity, ease: "easeInOut", duration: config.duration },
              x: { repeat: Infinity, ease: "easeInOut", duration: config.duration * 1.5 },
              rotate: { repeat: Infinity, ease: "linear", duration: config.duration * 3 },
              delay: idx * 0.3
            }}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
            }}
          >
            <div className={`relative flex items-center justify-center rounded-full p-6 ${config.bg} border border-white/20 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.05)] backdrop-blur-[2px]`}>
              {/* Outer atmospheric glow */}
              <div className={`absolute inset-0 rounded-full opacity-10 blur-xl ${config.bg.replace('5', '40')}`} />
              <IconComponent size={config.size} className={`${config.color} relative z-10 drop-shadow-sm`} strokeWidth={1.5} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
