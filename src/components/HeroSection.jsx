"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Users, 
  HeartPulse, 
  Stethoscope, 
  Syringe, 
  Pill, 
  Brain, 
  Activity 
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Extremely Subtle Ambient Floating Medical Accents */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <FloatingIcon Icon={HeartPulse} size={120} top="10%" left="5%" duration={25} delay={0} color="text-blue-500/25" />
        <FloatingIcon Icon={Brain} size={140} top="15%" left="85%" duration={30} delay={1} color="text-purple-500/25" />
        <FloatingIcon Icon={Stethoscope} size={130} top="75%" left="10%" duration={28} delay={2} color="text-emerald-500/25" />
        <FloatingIcon Icon={Activity} size={110} top="70%" left="80%" duration={22} delay={3} color="text-cyan-500/25" />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-8 border border-primary/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            منصة رعاية صحية رقمية – شفاء
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-12">
            {/* Logo with Professional Aura */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1000 }}
              className="relative"
            >
              <motion.div
                whileHover={{ 
                  rotateX: 15, 
                  rotateY: 15,
                  scale: 1.1 
                }}
                animate={{ 
                  y: [0, -40, 0],
                  rotateZ: [-3, 3, -3]
                }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  rotateX: { type: "spring", stiffness: 300, damping: 20 },
                  rotateY: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative w-56 h-56 md:w-72 md:h-72 z-10"
              >
                <img 
                  src="/Logo.png" 
                  alt="Shefaa Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_40px_60px_rgba(25,118,210,0.4)]"
                />
              </motion.div>
            </motion.div>

            <div className="text-center lg:text-right max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block h-1 w-24 bg-gradient-to-r from-primary to-transparent mb-6 rounded-full"
              />
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight"
              >
                صحتك <span className="text-primary">أمانة</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-secondary">نرعاها بذكاء</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[1px] bg-slate-200 mt-6"
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            احجز مع أطباء موثوقين، تابع مؤشراتك الصحية، وتواصل مع الدعم في أي وقت – بنفس روح تسجيل الدخول: بساطة، أمان، وهوية مميزة واضحة.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          >
            {isLoggedIn ? (
              <Link href="/profile" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                <span>ملفي الشخصي</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                <span>انضم إلينا الآن</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            )}
            <a href="#doctors" className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-md text-primary border-2 border-white/50 rounded-full font-bold text-lg hover:bg-white/80 hover:shadow-lg transition-all text-center shadow-sm">
              تصفح الأطباء
            </a>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-4 rounded-2xl text-primary mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
              <ShieldCheck size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">آمن وموثوق</h3>
            <p className="text-slate-500 text-sm font-medium">بياناتك محمية بالكامل بتشفير متقدم</p>
          </div>

          <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-br from-secondary/20 to-green-400/20 p-4 rounded-2xl text-secondary mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-inner">
              <Clock size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">24/7</h3>
            <p className="text-slate-500 text-sm font-medium">دعم متواصل ورعاية على مدار الساعة</p>
          </div>

          <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-2xl text-purple-600 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
              <Users size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">+100</h3>
            <p className="text-slate-500 text-sm font-medium">طبيب مختص ومعتمد في شبكتنا</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingIcon({ Icon, size, top, left, duration, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        y: [0, -60, 0],
        x: [0, 30, 0],
        rotate: [0, 360]
      }}
      transition={{
        opacity: { duration: 3 },
        y: { repeat: Infinity, duration: duration, ease: "easeInOut" },
        x: { repeat: Infinity, duration: duration * 1.3, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: duration * 4, ease: "linear" },
        delay: delay
      }}
      style={{ position: 'absolute', top, left }}
      className={`filter blur-[1px] select-none ${color}`}
    >
      <Icon size={size} strokeWidth={1.2} className="opacity-80" />
    </motion.div>
  );
}
