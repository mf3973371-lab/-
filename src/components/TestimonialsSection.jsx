"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle, Stethoscope, Brain } from "lucide-react";
import FloatingAccent from "./FloatingAccent";

const testimonials = [
  {
    name: "مها القحطاني",
    role: "مستخدمة للتطبيق",
    time: "منذ يومين",
    rating: 5,
    text: "التطبيق ساعدني أتواصل مع دكتور خصوصاً وقت الطوارئ، وسهل عليّ حجز موعد مناسب لي بكل يسر وسهولة.",
    avatar: "https://i.pravatar.cc/150?u=maha",
  },
  {
    name: "أحمد الجبيري",
    role: "مستخدم منذ 6 شهور",
    time: "منذ شهر",
    rating: 5,
    text: "تواصلت مع طبيب عبر التطبيق، الرد كان سريع جداً والطبيب متعاون والمواعيد كانت مرنة للغاية.",
    avatar: "https://i.pravatar.cc/150?u=ahmed",
  },
  {
    name: "سارة حسن",
    role: "مستخدمة للتطبيق",
    time: "منذ أسبوع",
    rating: 5,
    text: "كنت مترددة من مشاركة بياناتي، لكن بعد التجربة والتواصل مع الطبيب شعرت بالأمان والخصوصية التامة.",
    avatar: "https://i.pravatar.cc/150?u=sara",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-transparent relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <FloatingAccent Icon={Stethoscope} size={120} top="15%" left="5%" duration={26} delay={0.5} color="text-indigo-500/35" stroke={1.4} />
        <FloatingAccent Icon={Brain} size={130} bottom="15%" right="5%" duration={30} delay={1.5} color="text-purple-500/35" stroke={1.4} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary font-bold text-sm mb-4"
            >
              <CheckCircle className="w-4 h-4" />
              <span>آراء موثقة من مستخدمين</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight"
            >
              آراء المستخدمين <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">عن تجربتهم</span>
            </motion.h2>
            <p className="text-lg text-slate-600">
              تقييمات تساعدك تختار بثقة – تصميم آمن، تجربة سلسة، واستجابة سريعة جداً.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 rounded-[2.5rem] border border-white flex items-center gap-6 shadow-2xl shadow-primary/10 hover:scale-105 transition-transform duration-500"
          >
            <div>
              <div className="text-4xl font-black text-foreground mb-1">5.0/5</div>
              <div className="flex text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <div className="text-sm text-slate-500 font-medium">متوسط التقييم</div>
            </div>
            <div className="flex -space-x-3 space-x-reverse">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="user" />
              ))}
              <div className="w-10 h-10 rounded-full bg-primary text-white text-xs flex items-center justify-center border-2 border-white font-bold">+1k</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] border border-white hover:border-primary/30 hover:bg-white/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group relative overflow-hidden hover:-translate-y-3"
            >
              {/* Subtle Hover Glow */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] -ml-16 -mt-16 group-hover:bg-secondary/20 transition-colors duration-500"></div>

              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors relative z-10" />
              
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                <div>
                  <h4 className="font-bold text-foreground text-lg">{t.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                </div>
                <div className="mr-auto hidden sm:block">
                  <div className="px-2 py-1 rounded bg-green-50 text-green-600 text-[10px] font-bold">Verified</div>
                </div>
              </div>

              <div className="flex text-amber-400 mb-4 scale-90 origin-right">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>

              <p className="text-slate-600 leading-relaxed font-medium">
                "{t.text}"
              </p>
              
              <div className="mt-6 pt-6 border-t border-slate-200/50 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">{t.time}</span>
                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
