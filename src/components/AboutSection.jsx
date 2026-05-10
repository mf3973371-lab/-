"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye, Award, Microscope, HeartPulse } from "lucide-react";
import FloatingAccent from "./FloatingAccent";

const values = [
// ... rest of the static arrays
  {
    title: "الجودة العالية",
    desc: "نلتزم بمعايير سريرية عالمية لضمان أفضل نتائج علاجية لمراجعينا.",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "السرعة والدقة",
    desc: "تكنولوجيا متطورة تتيح لك الوصول لخدماتنا في دقائق معدودة بكل دقة.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "الأمان والخصوصية",
    desc: "بياناتك الصحية محمية بأحدث بروتوكولات التشفير لخصوصية تامة.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent z-10">
      {/* Background Shapes and Floating Accents */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>
        <FloatingAccent Icon={Microscope} size={100} top="15%" right="5%" duration={22} delay={1} color="text-indigo-500/35" stroke={1.4} />
        <FloatingAccent Icon={HeartPulse} size={90} bottom="15%" left="5%" duration={26} delay={2} color="text-red-500/35" stroke={1.4} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image/Graphic Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white/50 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                alt="الرعاية الطبية" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 glass-card p-8 rounded-[2rem] z-20 hidden md:block max-w-[280px] shadow-2xl shadow-primary/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary/30">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-foreground">رؤيتنا</h4>
              </div>
              <p className="text-slate-600 leading-relaxed">
                أن نكون المنصة الرائدة عربياً في تقديم رعاية صحية رقمية موثوقة في متناول الجميع.
              </p>
            </motion.div>
          </motion.div>

          {/* Text Content Side */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-black text-lg mb-4 block tracking-wider">من نحن – شفاء</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-8 tracking-tight leading-tight">
                رعاية صحية موثوقة، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">بجودة عالمية وهوية عربية</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                نحن نؤمن أن التكنولوجيا وُجدت لتُحسن تجربة المريض والطبيب معاً. في "شفاء"، نجمع بين الخبرة الطبية والحلول التقنية لنقدم لك رعاية لا تعرف الحدود.
              </p>
            </motion.div>

            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-5 p-6 rounded-[2rem] glass-card hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group border border-transparent hover:border-white"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-1">{value.title}</h4>
                    <p className="text-slate-500">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
