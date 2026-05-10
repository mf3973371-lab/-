"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-2xl text-slate-300 py-16 border-t border-white/10 relative overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">شفاء</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              منصتك الأولى للرعاية الصحية الرقمية. نجمع بين أفضل الأطباء وأحدث التقنيات لنوفر لك تجربة علاجية لا مثيل لها.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">الرئيسية</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">خدماتنا</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">المميزات</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">من نحن</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-2 text-slate-400">
              <li>support@shefaa.com</li>
              <li>+966 50 123 4567</li>
              <li>الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} منصة شفاء. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            صُنع بحب <Heart className="w-4 h-4 text-red-500 fill-red-500" /> لخدمتكم
          </p>
        </div>
      </div>
    </footer>
  );
}
