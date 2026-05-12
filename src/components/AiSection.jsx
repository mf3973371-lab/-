"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Cpu, Sparkles, ArrowRight } from "lucide-react";

const aiServices = [
  {
    title: "تحليل أشعة الصدر (الالتهاب الرئوي)",
    description: "ارفع صورة الأشعة السينية (X-ray) واحصل على تقرير تحليلي فوري لاحتمالية وجود التهاب رئوي.",
    icon: "/chest.png",
    btnText: "ارفع الأشعة الآن",
    href: "https://momenyousri-pneumonia-app.hf.space",
    color: "from-cyan-500 to-blue-500",
    imgSize: "w-36 h-36 md:w-[9.5rem] md:h-[9.5rem]"
  },
  {
    title: "تحليل أشعة المخ (الالتهابات والأورام)",
    description: "أداة متطورة لتحليل صور الرنين المغناطيسي والمقطعية لتحديد التهابات المخ والأورام بدقة.",
    icon: "/brain.png",
    btnText: "ابدأ تحليل الأشعة",
    href: "https://momenyousri-braintumorapp.hf.space",
    color: "from-indigo-500 to-purple-500",
    imgSize: "w-36 h-36 md:w-[9.5rem] md:h-[9.5rem]"
  },
  {
    title: "خدمات الذكاء الاصطناعي الأخرى",
    description: "حلول طبية ذكية متكاملة مدعومة بأحدث نماذج الذكاء الاصطناعي لمساعدتك في التشخيص والبحث.",
    icon: "/general_ai.png",
    btnText: "استكشف الخدمات الآن",
    href: "https://dereistic-laurette-alpinely.ngrok-free.dev",
    color: "from-amber-500 to-orange-500",
    imgSize: "w-28 h-28 md:w-[7.5rem] md:h-[7.5rem]"
  }
];

export default function AiSection() {
  return (
    <section id="ai-diagnosis" className="py-24 relative overflow-hidden" dir="rtl">
      {/* High-end Abstract Glowing Backgrounds */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-cyan-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[120px]" />
        
        {/* Medical Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching mock layout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-cyan-500/10 text-cyan-700 border border-cyan-500/20 font-black text-sm mb-4 shadow-sm"
          >
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>التشخيص الذكي</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight leading-tight"
          >
            التشخيص الذكي <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600">بالذكاء الاصطناعي</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            نستخدم أحدث تقنيات التعلم العميق لتحليل الأشعة وتقديم تشخيص أولي دقيق وسريع لمساعدتك في الاطمئنان على صحتك.
          </motion.p>
        </div>

        {/* Main Content Card Container (Inner Wrapper matching the mockup's blueish framing) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 md:p-10 rounded-[3.5rem] bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5 border border-white shadow-2xl relative"
        >
          {/* Decorative backdrop glow inside container */}
          <div className="absolute inset-0 rounded-[3.5rem] bg-white/40 backdrop-blur-3xl -z-10"></div>
          
          {/* The Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card p-8 rounded-[2.5rem] border border-white/80 hover:border-cyan-500/30 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/70 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Subtle colored overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.02] bg-gradient-to-br ${service.color} transition-opacity duration-500 pointer-events-none`}></div>
                
                <div className="flex flex-col items-center text-center flex-1">
                  {/* Scaled image Icon aligned with mockup */}
                  <motion.div 
                    animate={{
                      y: [0, -12, 0],
                    }}
                    transition={{
                      duration: 4 + idx * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ 
                      scale: 1.18, 
                      rotate: [0, -4, 4, 0],
                      transition: { duration: 0.5 }
                    }}
                    className="w-40 h-40 relative mb-6 flex items-center justify-center cursor-pointer group/icon"
                  >
                    {/* هالة ضوئية فخمة خلف الأيقونة تزداد توهجاً عند التمرير */}
                    <div className="absolute inset-[-15px] bg-gradient-to-tr from-cyan-400/25 via-blue-400/10 to-indigo-400/25 rounded-full blur-2xl opacity-60 group-hover/icon:opacity-100 group-hover/icon:scale-110 transition-all duration-700 animate-pulse"></div>
                    
                    {/* حلقة تكنولوجية تدور ببطء عند الاقتراب */}
                    <motion.div 
                      className="absolute inset-[-8px] border-2 border-dashed border-cyan-300/40 rounded-full pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <img 
                      src={service.icon} 
                      alt={service.title}
                      className={`${service.imgSize} object-contain relative z-10 filter drop-shadow-xl group-hover/icon:drop-shadow-[0_10px_25px_rgba(6,182,212,0.6)] transition-all duration-500`}
                    />
                  </motion.div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-4 group-hover:text-primary transition-colors duration-300 leading-snug px-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-8 px-2">
                    {service.description}
                  </p>
                </div>
                
                {/* Premium Gradient Button matching mock */}
                <a 
                  href={service.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-light via-primary to-primary-dark text-white font-black text-base md:text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/35 active:scale-98 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group/btn"
                >
                  <Upload className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                  <span>{service.btnText}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
