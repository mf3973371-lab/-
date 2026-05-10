"use client";

import { motion } from "framer-motion";
import { Lock, HeartPulse, CreditCard, Stethoscope } from "lucide-react";

const features = [
  {
    icon: <HeartPulse className="w-8 h-8 text-secondary" />,
    title: "استجابة على مدار الساعة",
    description: "تواصل مع مسار الرعاية في الوقت الذي يناسبك، مع تقليل الانتظار والتنقل غير الضروري.",
    number: "01",
    bgColor: "bg-green-50"
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "خصوصية وبيانات محمية",
    description: "ممارسات حديثة لحماية بياناتك الصحية، مع شفافية في الاستخدام والوصول.",
    number: "02",
    bgColor: "bg-blue-50"
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-purple-600" />,
    title: "شبكة أطباء معتمدين",
    description: "تصفح التخصصات واحجز مع مختصين يناسبون حالتك – رحلة واضحة من البداية للنهاية.",
    number: "03",
    bgColor: "bg-purple-50"
  },
  {
    icon: <CreditCard className="w-8 h-8 text-orange-500" />,
    title: "باقات وتكلفة مرنة",
    description: "خيارات تسعير تساعدك بتخطيط لميزانيتك دون مفاجآت تؤثر على قرارك العلاجي.",
    number: "04",
    bgColor: "bg-orange-50"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-4"
          >
            لماذا تختار شفاء؟
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight"
          >
            تجربة صحية مبنية على <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">الثقة والوضوح</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            أربعة محاور نركز عليها كل يوم: سرعة الوصول، أمان البيانات، أطباء موثوقون، وتسعير يفهمك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] hover:-translate-y-3 transition-all duration-500 group border border-white hover:border-primary/30 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden"
            >
              {/* Background Glow on Hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-[2.5] transition-transform duration-700"></div>

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className={`p-5 rounded-[1.5rem] ${feature.bgColor} shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {feature.icon}
                </div>
                <span className="text-6xl font-black text-slate-100/50 group-hover:text-primary/10 transition-colors drop-shadow-sm">
                  {feature.number}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4 relative z-10">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-medium relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
