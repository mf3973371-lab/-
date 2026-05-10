"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, Sparkles, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { AR_LETTERS, EN_LETTERS, diseasesData } from "@/data/diseases";

export default function DiseaseSearch() {
  const [lang, setLang] = useState("ar");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const letters = lang === "ar" ? AR_LETTERS : EN_LETTERS;

  // Real-time live search logic across all letters
  const filteredDiseases = useMemo(() => {
    const allDiseasesForLang = diseasesData[lang] || {};
    
    // If a specific letter is selected, filter by that letter
    if (selectedLetter) {
      const list = allDiseasesForLang[selectedLetter] || [];
      if (!searchQuery.trim()) return list;
      return list.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // If no letter is selected but there is a search query, search all letters
    if (searchQuery.trim()) {
      let results = [];
      Object.keys(allDiseasesForLang).forEach(letKey => {
        results = [...results, ...allDiseasesForLang[letKey]];
      });
      return results.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return [];
  }, [lang, selectedLetter, searchQuery]);

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
    setSelectedLetter(null);
    setSearchQuery("");
  };

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-[#f3f8ff]/30 to-white text-slate-800 min-h-[900px] border-y border-slate-100 shadow-sm">
      {/* Soft, Luxurious Glowing Backdrops */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-indigo-200/30 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "8s" }}></div>
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-cyan-200/20 rounded-full blur-[100px]"></div>
        
        {/* Subtle Elegant Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={lang === "ar" ? "rtl" : "ltr"}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-blue-50 border border-blue-100 mb-8 shadow-sm hover:border-blue-200 transition-colors group"
          >
            <Sparkles className="w-5 h-5 text-blue-500 animate-spin" style={{ animationDuration: "4s" }} />
            <span className="text-sm font-black text-blue-600 tracking-wide">
              {lang === "ar" ? "الموسوعة الطبية الذكية لشفاء" : "Shefaa Smart Medical Encyclopedia"}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-slate-900"
          >
            {lang === "ar" ? "استكشف الأمراض " : "Search Diseases "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500">
              {lang === "ar" ? "أبجدياً وبسهولة" : "Alphabetically & Instantly"}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 leading-relaxed font-semibold mb-12"
          >
            {lang === "ar" 
              ? "بوابة طبية تفاعلية تمكنك من البحث بالحرف الأول أو كتابة اسم المرض مباشرة للوصول لشرح علمي دقيق وموثق."
              : "An interactive medical portal allowing you to search by first letter or type directly to access verified clinical descriptions."}
          </motion.p>

          {/* Premium Sliding Language Tabs */}
          <div className="relative flex justify-center gap-2 p-1.5 bg-slate-100 border border-slate-200/50 rounded-3xl w-fit mx-auto mb-12 shadow-sm">
            <button 
              onClick={() => handleLanguageChange("en")}
              className={`relative px-8 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 z-10 ${lang === "en" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
            >
              {lang === "en" && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-2xl shadow-sm -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              English
            </button>
            <button 
              onClick={() => handleLanguageChange("ar")}
              className={`relative px-8 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 z-10 ${lang === "ar" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
            >
              {lang === "ar" && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-2xl shadow-sm -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              العربية
            </button>
          </div>

          {/* Live Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-md opacity-20 group-focus-within:opacity-30 transition-opacity"></div>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-3xl overflow-hidden group-focus-within:border-blue-500/50 transition-all shadow-md">
              <div className="flex items-center justify-center w-16 h-16 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Search className="w-6 h-6 animate-pulse" />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "ar" ? "اكتب اسم المرض للبحث الفوري... (مثال: الأنفلونزا)" : "Type disease name for instant search... (e.g. Asthma)"}
                className="w-full bg-transparent border-none py-5 px-2 text-slate-800 placeholder-slate-400 focus:outline-none font-bold text-lg"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="p-3 mr-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Alphabet Wheel / Floating Letter Bubbles */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
              {lang === "ar" ? "تصفح أبجدياً" : "Browse Alphabetically"}
            </span>
          </div>
          <motion.div 
            layout
            className="flex flex-wrap justify-center gap-3.5 max-w-5xl mx-auto"
          >
            {letters.map((letter, index) => {
              const hasData = diseasesData[lang][letter]?.length > 0;
              const isSelected = selectedLetter === letter;

              return (
                <motion.button
                  key={`${lang}-${letter}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.015, type: "spring", stiffness: 200 }}
                  whileHover={hasData ? { scale: 1.15, y: -4 } : {}}
                  whileTap={hasData ? { scale: 0.95 } : {}}
                  onClick={() => {
                    setSelectedLetter(isSelected ? null : letter);
                  }}
                  className={`
                    relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-black rounded-2xl transition-all duration-500
                    ${isSelected 
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-none text-white shadow-md shadow-blue-500/20 scale-110 ring-4 ring-blue-500/10" 
                      : hasData 
                        ? "bg-white border border-slate-200 text-slate-700 hover:bg-blue-50/50 hover:border-blue-400/40 hover:shadow-sm" 
                        : "bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed"}
                  `}
                  disabled={!hasData}
                >
                  {letter}
                  
                  {/* Glowing active indicator under letters with data */}
                  {hasData && !isSelected && (
                    <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)] animate-pulse"></span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {filteredDiseases.length > 0 ? (
            <motion.div
              key={selectedLetter || searchQuery}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="max-w-5xl mx-auto"
            >
              {/* Category Subtitle */}
              <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200/50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl font-black shadow-sm">
                  {selectedLetter || <Search className="w-6 h-6 animate-bounce" />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800">
                    {selectedLetter 
                      ? (lang === "ar" ? `الأمراض التي تبدأ بحرف "${selectedLetter}"` : `Diseases starting with "${selectedLetter}"`)
                      : (lang === "ar" ? `نتائج البحث عن "${searchQuery}"` : `Search results for "${searchQuery}"`)
                    }
                  </h3>
                  <p className="text-slate-500 font-bold text-sm mt-1">
                    {lang === "ar" ? `تم العثور على (${filteredDiseases.length}) مرض مستهدف` : `Found (${filteredDiseases.length}) medical results`}
                  </p>
                </div>
              </div>

              {/* Grid of Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDiseases.map((disease, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 150 }}
                    className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-300 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/10 transition-all duration-500 shadow-sm hover:shadow-md hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Hover Glow Light */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-blue-500/[0.02] to-indigo-500/[0.02] rounded-full blur-[40px] -mr-16 -mt-16 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                    
                    <div className="flex items-start gap-5 relative z-10">
                      {/* Circle Initial-Badge */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(59,130,246,0.15)] transition-all duration-500 font-black text-lg">
                        {disease.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {disease.name}
                        </h4>
                        <p className="text-slate-600 leading-relaxed font-semibold text-sm">
                          {disease.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer decoration */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                      <span className="text-xs font-black text-slate-400 group-hover:text-blue-500/80 transition-colors flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {lang === "ar" ? "موسوعة شفاء المعتمدة" : "Verified Shefaa Encyclopedia"}
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500/20 group-hover:bg-blue-500 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-500"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Cinematic Light Empty State
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto text-center py-24 rounded-[3.5rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.01] to-transparent pointer-events-none"></div>
              <div className="relative z-10 max-w-sm mx-auto">
                <div className="relative w-24 h-24 bg-slate-50 rounded-[2rem] border border-slate-200/50 flex items-center justify-center text-slate-400 mx-auto mb-8 shadow-sm group">
                  <div className="absolute inset-0 rounded-[2rem] bg-blue-500/5 blur-lg group-hover:bg-blue-500/10 transition-colors animate-pulse"></div>
                  <Search className="w-10 h-10 animate-bounce" />
                </div>
                <h4 className="text-2xl font-black text-slate-700 mb-3">
                  {searchQuery 
                    ? (lang === "ar" ? "لم يتم العثور على نتائج" : "No results found")
                    : (lang === "ar" ? "ابدأ استكشاف الموسوعة" : "Begin exploration")
                  }
                </h4>
                <p className="text-slate-500 font-bold leading-relaxed mb-6">
                  {searchQuery 
                    ? (lang === "ar" ? "جرب كتابة اسم مرض آخر أو اختر حرفاً أبجدياً مختلفاً لتصفح الأمراض." : "Try typing another disease or click on any active letter to browse.")
                    : (lang === "ar" ? "اختر أحد الحروف الأبجدية التي تحتها نقطة مضيئة، أو اكتب اسم المرض في شريط البحث بالأعلى." : "Click on any active letter with a glowing dot below it, or type a disease name above.")
                  }
                </p>
                
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl font-black text-sm text-slate-700 transition-all hover:scale-105 active:scale-95"
                  >
                    {lang === "ar" ? "إعادة تعيين البحث" : "Reset Search"}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
