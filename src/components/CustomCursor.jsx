"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Different spring configs for layered effect
  const mainSpringX = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const mainSpringY = useSpring(cursorY, { damping: 30, stiffness: 200 });
  
  const outerSpringX = useSpring(cursorX, { damping: 20, stiffness: 100 });
  const outerSpringY = useSpring(cursorY, { damping: 20, stiffness: 100 });

  const glowSpringX = useSpring(cursorX, { damping: 15, stiffness: 50 });
  const glowSpringY = useSpring(cursorY, { damping: 15, stiffness: 50 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      {/* 1. Main Precision Dot */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(25,118,210,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 2. Magnetic Fluid Ring */}
      <motion.div
        className="absolute rounded-full border border-primary/40 bg-primary/5"
        style={{
          x: mainSpringX,
          y: mainSpringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
        }}
        animate={{
          scale: isClicked ? 0.8 : 1,
          rotate: isHovering ? 90 : 0,
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      {/* 3. Outer Trailing Orbit */}
      <motion.div
        className="absolute h-10 w-10 rounded-full border-[0.5px] border-secondary/30"
        style={{
          x: outerSpringX,
          y: outerSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />

      {/* 4. Nebula Glow Effect (The "Wow" part) */}
      <motion.div
        className="absolute h-40 w-40 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-cyan-400/10 blur-3xl"
        style={{
          x: glowSpringX,
          y: glowSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering ? 0.6 : 0.3,
          scale: isHovering ? 1.5 : 1,
        }}
      />
      
      {/* 5. Interactive Particle (Inner Ring) */}
      <motion.div
        className="absolute h-4 w-4 rounded-full bg-secondary/20"
        style={{
          x: mainSpringX,
          y: mainSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0.5 : 0,
        }}
      />
    </div>
  );
}
