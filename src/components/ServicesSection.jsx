"use client";

import { motion } from "framer-motion";
import { Brain, Heart, Stethoscope, Baby, Eye, Activity, Pill, Bone, Syringe } from "lucide-react";
import FloatingAccent from "./FloatingAccent";

const services = [
  { name: "الباطنة العامة", icon: <Stethoscope className="w-10 h-10" />, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "أمراض القلب", icon: <Heart className="w-10 h-10" />, color: "text-red-500", bg: "bg-red-50" },
  { name: "الجراحة العامة", icon: <Activity className="w-10 h-10" />, color: "text-teal-500", bg: "bg-teal-50" },
  { name: "طب الأطفال", icon: <Baby className="w-10 h-10" />, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "الأمراض الجلدية", icon: <Eye className="w-10 h-10" />, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "الطب النفسي", icon: <Brain className="w-10 h-10" />, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "الصيدلة السريرية", icon: <Pill className="w-10 h-10" />, color: "text-green-500", bg: "bg-green-50" },
  { name: "جراحة العظام", icon: <Bone className="w-10 h-10" />, color: "text-slate-600", bg: "bg-slate-100" },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-transparent relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <FloatingAccent Icon={Syringe} size={100} top="12%" left="6%" duration={27} delay={0.5} color="text-yellow-500/35" stroke={1.4} />
        <FloatingAccent Icon={Pill} size={90} bottom="15%" right="8%" duration={23} delay={1} color="text-green-500/35" stroke={1.4} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            تخصصات طبية
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight">
            خدماتنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">الطبية</span>
          </h2>
          <p className="text-lg text-slate-600">
            تصفح التخصصات واختر ما يناسبك - كل بطاقة تفتح قائمة الأطباء في هذا الفرع مباشرة.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-8 rounded-[2.5rem] text-center cursor-pointer hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group border border-white"
            >
              <div className={`mx-auto w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6 ${service.bg} ${service.color} shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 group-hover:text-primary transition-colors">{service.name}</h3>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-5 bg-white/50 backdrop-blur-md border border-white text-slate-700 rounded-[2rem] font-black text-lg hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            عرض كل التخصصات
          </button>
        </div>
      </div>
    </section>
  );
}
