"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, ChevronDown, Brain, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAiDropdown, setShowAiDropdown] = useState(false);
  const [showMobileAi, setShowMobileAi] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, children }) => (
    <a href={href} className="text-slate-600 hover:text-primary transition-colors font-medium flex items-center gap-1">
      {children}
    </a>
  );

  const aiMenuItems = [
    { label: "كشف عن أورام المخ", icon: <Brain className="w-4 h-4 text-indigo-500" />, href: "https://momenyousri-braintumorapp.hf.space", target: "_blank" },
    { label: "الكشف عن الالتهاب الرئوي", icon: <ShieldAlert className="w-4 h-4 text-red-500" />, href: "https://momenyousri-pneumonia-app.hf.space", target: "_blank" },
    { label: "خدمات AI أخرى", icon: <Sparkles className="w-4 h-4 text-amber-500" />, href: "https://dereistic-laurette-alpinely.ngrok-free.dev", target: "_blank" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/20 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md group-hover:rotate-6 transition-transform duration-300 relative flex items-center justify-center border border-slate-100">
              <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-800">
              شفا<span className="text-primary">ء</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/">الرئيسية</NavLink>
            
            {/* AI Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowAiDropdown(true)}
              onMouseLeave={() => setShowAiDropdown(false)}
            >
              <button className="text-slate-600 hover:text-primary transition-colors font-black flex items-center gap-1 cursor-pointer py-2 group">
                <span className="bg-gradient-to-r from-indigo-600 to-primary bg-clip-text text-transparent">الذكاء الاصطناعي</span>
                <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${showAiDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showAiDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -right-4 pt-2 w-64 drop-shadow-2xl"
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white overflow-hidden shadow-xl py-2">
                      {aiMenuItems.map((item, idx) => (
                        <a 
                          key={idx} 
                          href={item.href} 
                          target={item.target}
                          className="flex items-center gap-3 px-4 py-3.5 text-slate-700 hover:bg-primary/5 hover:text-primary transition-all font-bold text-sm group/item border-b border-slate-50 last:border-none"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover/item:scale-110 transition-transform shadow-inner">
                            {item.icon}
                          </div>
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="#doctors">الأطباء</NavLink>
            <NavLink href="#services">خدماتنا</NavLink>
            <NavLink href="#about">من نحن</NavLink>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Link 
                href="/profile" 
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                الملف الشخصي
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 font-bold hover:text-primary transition-colors px-4">
                  تسجيل الدخول
                </Link>
                <Link 
                  href="/register" 
                  className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  ابدأ الآن مجاناً
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100/50">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/20 absolute w-full bg-white shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
              <a href="#" className="block px-3 py-3 text-foreground font-medium hover:bg-primary/5 rounded-md">الرئيسية</a>
              
              {/* Mobile AI Collapsible */}
              <div>
                <button 
                  onClick={() => setShowMobileAi(!showMobileAi)} 
                  className="w-full flex justify-between items-center px-3 py-3 text-primary font-black bg-primary/5 rounded-md"
                >
                  <span>الذكاء الاصطناعي</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showMobileAi ? 'rotate-180' : ''}`} />
                </button>
                {showMobileAi && (
                  <div className="mr-4 mt-1 mb-2 border-r-2 border-primary/20 pr-2">
                    {aiMenuItems.map((item, idx) => (
                      <a 
                        key={idx} 
                        href={item.href} 
                        target={item.target}
                        className="flex items-center gap-3 px-3 py-3 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-lg"
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#services" className="block px-3 py-3 text-foreground font-medium hover:bg-primary/5 rounded-md">خدماتنا</a>
              <a href="#features" className="block px-3 py-3 text-foreground font-medium hover:bg-primary/5 rounded-md">لماذا نحن</a>
              <a href="#doctors" className="block px-3 py-3 text-foreground font-medium hover:bg-primary/5 rounded-md">أطبائنا</a>
              <a href="#about" className="block px-3 py-3 text-foreground font-medium hover:bg-primary/5 rounded-md">من نحن</a>
              <a href="#contact" className="block px-3 py-3 text-foreground font-medium hover:bg-primary/5 rounded-md">اتصل بنا</a>
              <div className="flex flex-col gap-3 p-3 mt-2 border-t border-gray-200/50">
                {isLoggedIn ? (
                  <Link href="/profile" className="w-full text-center bg-primary text-white py-2.5 rounded-full font-bold shadow-md">
                    الملف الشخصي
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="w-full text-center text-primary font-bold py-2.5 rounded-full border border-primary/20 hover:bg-primary/5">تسجيل الدخول</Link>
                    <Link href="/register" className="w-full text-center bg-gradient-to-r from-primary to-primary-dark text-white py-2.5 rounded-full font-bold shadow-md">إنشاء حساب</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
