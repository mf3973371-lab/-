"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, CheckCircle, Activity } from "lucide-react";
import { useState } from "react";

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent z-10">
      {/* Artistic Gradient Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-[100%] blur-[120px] rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-primary font-bold text-sm mb-5"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>اكتشف "شفاء" في دقيقتين</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            شاهد كيف غيّرنا <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-secondary">
              مفهوم الرعاية الصحية
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-slate-600 font-medium"
          >
            رحلة سريعة تأخذك داخل منصة شفاء لتعرف كيف نربطك بأفضل الاستشاريين، ونتابع حالتك بذكاء.
          </motion.p>
        </div>

        {/* Cinematic Video Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Glowing backdrop border aura */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 via-indigo-400/30 to-secondary/30 rounded-[3rem] blur-xl opacity-70 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"></div>
          
          {/* The Main Wrapper frame */}
          <div className="relative bg-slate-900 aspect-[16/9] rounded-[2.8rem] overflow-hidden shadow-2xl border-[6px] border-white/40 backdrop-blur-sm group cursor-pointer">
            
            {!isPlaying ? (
              <>
                {/* Thumbnail cover with beautiful medical tech image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80" 
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent transition-opacity group-hover:opacity-80"></div>
                </div>

                {/* Floating Play Button Mechanism */}
                <div 
                  className="absolute inset-0 flex items-center justify-center z-20"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="relative">
                    {/* Outer ringing radar waves */}
                    <div className="absolute inset-0 w-full h-full rounded-full bg-white animate-ping opacity-20"></div>
                    <div className="absolute -inset-4 rounded-full bg-primary/30 blur-md animate-pulse"></div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative w-24 h-24 md:w-32 md:h-32 bg-white text-primary rounded-full shadow-2xl flex items-center justify-center group/btn hover:text-indigo-600 transition-all"
                    >
                      <Play size={40} fill="currentColor" className="ml-2 md:scale-125 group-hover/btn:scale-110 transition-transform" />
                    </motion.button>
                  </div>
                </div>

                {/* Corner Content Overlay */}
                <div className="absolute bottom-10 right-10 left-10 z-10 flex flex-col md:flex-row items-end justify-between gap-6 text-white pointer-events-none">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-indigo-200 font-bold">
                      <Activity className="w-5 h-5 animate-pulse" />
                      <span className="text-sm tracking-widest uppercase">شاهد الفيديو التعريفي</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black tracking-tight">انتقل بمستقبلك الصحي لعصر رقمي جديد</h3>
                  </div>
                  
                  <div className="hidden md:flex gap-4">
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-2 text-sm font-bold">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>عالي الدقة 4K</span>
                    </div>
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-2 text-sm font-bold">
                      <span>⏱️ 2:30 دقيقة</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Local Branding Video Implementation - High Performance Zero Latency */
              <video 
                className="w-full h-full object-cover bg-black"
                src="/Video.mp4"
                autoPlay
                controls
                loop
                playsInline
              ></video>
            )}
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
