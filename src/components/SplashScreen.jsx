"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500); // Show for 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            pointerEvents: "none",
            transition: { duration: 1, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900 overflow-hidden"
        >
          {/* Animated Background Mesh for Splash */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 12,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}
              className="relative"
            >
              {/* Glowing Aura around Logo */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"
              />
              
              <div className="w-40 h-40 md:w-56 md:h-56 relative z-10">
                <img 
                  src="/Logo.png" 
                  alt="Shefaa Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(25,118,210,0.5)]"
                />
              </div>
            </motion.div>

            {/* Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
                شفاء
              </h1>
              <div className="flex items-center gap-2 justify-center">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 100 }}
                  transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
                  className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>
              <p className="text-blue-200/50 font-bold mt-4 tracking-[0.3em] uppercase text-xs md:text-sm">
                Advanced Medical Platform
              </p>
            </motion.div>

          </div>

          {/* Loading Progress Bar */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-[4px] bg-white/10 rounded-full overflow-hidden z-20">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
