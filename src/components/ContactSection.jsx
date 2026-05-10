"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "البريد الإلكتروني",
    content: "info@shefaa-app.com",
    desc: "رد خلال 24 ساعة",
    color: "bg-blue-500",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "رقم الهاتف",
    content: "+20 123 456 7890",
    desc: "متاح على مدار الساعة",
    color: "bg-green-500",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "الموقع",
    content: "القاهرة، مصر",
    desc: "زيارة بموعد مسبق",
    color: "bg-red-500",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative bg-transparent overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold text-lg mb-4 block"
          >
            تواصل معنا
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight"
          >
            نحن هنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">لخدمتكم دائماً</span>
          </motion.h2>
          <p className="text-lg text-slate-600">
            لديك سؤال أو استفسار؟ لا تتردد في مراسلتنا، فريقنا جاهز للرد عليك في أسرع وقت.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 glass-card p-4 rounded-[3rem] shadow-2xl shadow-primary/10">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-[1.5] p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">أرسل رسالة</h3>
                <p className="text-slate-500">املأ الحقول وسنعاود الاتصال بك.</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">الاسم</label>
                  <input 
                    type="text" 
                    placeholder="اسمك الكامل"
                    className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:bg-white transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    placeholder="example@mail.com"
                    className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 mr-2">موضوع الرسالة</label>
                <input 
                  type="text" 
                  placeholder="كيف يمكننا مساعدتك؟"
                  className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:bg-white transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 mr-2">رسالتك</label>
                <textarea 
                  rows="4" 
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:bg-white transition-all resize-none font-bold"
                ></textarea>
              </div>
              <button className="w-full py-5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                <span>إرسال الرسالة</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden border border-slate-700"
          >
            {/* Glow in dark card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            <div>
              <h3 className="text-3xl font-extrabold mb-4">قنوات التواصل</h3>
              <p className="text-slate-400 mb-12">اختر الطريقة الأنسب لك، نحن متاحون دائماً للإجابة على استفساراتكم.</p>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-slate-400 text-sm mb-1">{info.title}</h4>
                      <p className="text-xl font-bold">{info.content}</p>
                      <span className="text-xs text-slate-500">{info.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-sm text-slate-300 leading-relaxed">
                هل أنت طبيب وترغب في الانضمام إلينا؟ <br />
                <a href="#" className="text-primary font-bold hover:underline">انضم لفريقنا الآن ←</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
