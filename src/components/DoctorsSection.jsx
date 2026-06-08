"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, DollarSign, Loader2, Stethoscope, Phone, ChevronLeft, ChevronRight, Star, ShieldCheck, Heart, CheckCircle2, HeartPulse, Activity } from "lucide-react";
import Link from "next/link";
import FloatingAccent from "./FloatingAccent";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const getDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
export default function DoctorsSection() {
  const [rawDoctors, setRawDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering states
  const [filters, setFilters] = useState({
    specialty: "",
    area: "",
    minRating: 0
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [allDoctors, setAllDoctors] = useState([]);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);
  
  // Slider states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [favorites, setFavorites] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [isSortingByDistance, setIsSortingByDistance] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationsMap, setLocationsMap] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.specialty) queryParams.append("specialty", filters.specialty);
        if (filters.area) queryParams.append("area", filters.area);
        if (filters.minRating > 0) queryParams.append("minRating", filters.minRating);
        if (searchQuery) queryParams.append("search", searchQuery);

        const response = await fetch(`/api/doctors/list?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error("حدث خطأ أثناء جلب بيانات الأطباء");
        }
        const data = await response.json();
        const doctorsList = data.doctors || data.results || data.allDoctor || data.allDoctors || data.data || (Array.isArray(data) ? data : []);
        
        setRawDoctors(doctorsList);
        setCurrentIndex(0); // Reset slider to start on new filter

        // If this is the first load (no filters), extract specialties and areas
        if (!filters.specialty && !filters.area && filters.minRating === 0 && !searchQuery) {
          setAllDoctors(doctorsList);
          
          const specs = [...new Set(doctorsList.map(d => d.specialization?.trim()).filter(Boolean))].sort();
          setAvailableSpecialties(specs);
          
          const areas = [...new Set(doctorsList.map(d => {
            // Try to extract city/area from address if possible, or just use the address
            const addr = d.address?.trim();
            if (!addr) return null;
            // Simple logic: take the first or last part of the address as area if comma exists
            return addr.split(',').pop().trim();
          }).filter(Boolean))].sort();
          setAvailableAreas(areas);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [filters, searchQuery]);

  // Responsive visible slides count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const processedDoctors = useMemo(() => {
    let list = [...rawDoctors];
    
    if (isSortingByDistance && userLocation) {
      list = list.map(doc => {
        const docNameKey = doc.userName ? doc.userName.trim().toLowerCase() : `${doc.fName?.trim().toLowerCase()} ${doc.lName?.trim().toLowerCase()}`;
        const docLocation = 
          locationsMap[doc.email?.toLowerCase()] || 
          locationsMap[doc._id] || 
          locationsMap[doc.id] ||
          locationsMap[docNameKey];

        const dLat = doc.latitude !== undefined && doc.latitude !== null ? doc.latitude : (docLocation ? docLocation.lat : null);
        const dLon = doc.longitude !== undefined && doc.longitude !== null ? doc.longitude : (docLocation ? docLocation.lon : null);
        
        const dist = (dLat && dLon) ? getDistance(userLocation.latitude, userLocation.longitude, dLat, dLon) : Infinity;
        return { ...doc, distance: dist };
      })
      .filter(doc => doc.distance !== Infinity)
      .sort((a, b) => a.distance - b.distance);
    }
    
    return list;
  }, [rawDoctors, isSortingByDistance, userLocation, locationsMap]);

  const totalDoctors = processedDoctors.length;
  const maxIndex = Math.max(0, totalDoctors - visibleCount);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNearMe = async () => {
    if (isSortingByDistance) {
      setIsSortingByDistance(false);
      return;
    }

    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setIsSortingByDistance(true);
        setIsLocating(false);
      }, (error) => {
        setIsLocating(false);
        alert("يرجى تفعيل الـ GPS (الموقع الجغرافي) في المتصفح الخاص بك أولاً");
      });
    } else {
      setIsLocating(false);
      alert("المتصفح الخاص بك لا يدعم هذه الخاصية");
    }
  };

  // Get active doctors to display
  const displayedDoctors = processedDoctors.slice(currentIndex, currentIndex + visibleCount);

  // If there are not enough doctors to fill the slice (looping around), pad it
  if (displayedDoctors.length < visibleCount && totalDoctors > visibleCount) {
    const paddingCount = visibleCount - displayedDoctors.length;
    displayedDoctors.push(...processedDoctors.slice(0, paddingCount));
  }

  return (
    <section id="doctors" className="py-32 bg-gradient-to-b from-white via-[#f1f7ff] to-white relative z-10 overflow-hidden">
      {/* Dynamic Animated Ambient Lights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[-15%] w-[600px] h-[600px] bg-gradient-to-br from-blue-300/30 to-transparent rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[15%] right-[-15%] w-[600px] h-[600px] bg-gradient-to-tl from-indigo-300/30 to-transparent rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "10s" }}></div>
        <div className="absolute top-[45%] left-[25%] w-[350px] h-[350px] bg-cyan-300/20 rounded-full blur-[110px]"></div>
        
        <FloatingAccent Icon={HeartPulse} size={110} top="15%" right="10%" duration={29} delay={0} color="text-blue-500/35" stroke={1.4} />
        <FloatingAccent Icon={Activity} size={100} bottom="20%" left="10%" duration={25} delay={1.5} color="text-cyan-500/35" stroke={1.4} />

        {/* Medical Grid Motif */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f604_1.5px,transparent_1.5px),linear-gradient(to_bottom,#3b82f604_1.5px,transparent_1.5px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Premium navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
          <div className="text-right max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/80 border border-blue-100 shadow-[0_8px_20px_rgba(59,130,246,0.06)] text-blue-600 font-black text-xs uppercase tracking-wider mb-6"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-500 animate-pulse" />
              <span>أطباء شفاء المعتمدون والموثقون</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-8"
            >
              احجز موعدك مع <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                أطباء شفاء المعتمدين
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500/90 font-bold leading-relaxed"
            >
              تصفح قائمة كبار الاستشاريين والأخصائيين المعتمدين، واطلع على تفاصيل عياداتهم وحجوزاتهم لحياة صحية أفضل.
            </motion.p>
          </div>

          {/* Luxury Navigation controls */}
          {totalDoctors > visibleCount && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 self-end"
            >
              <button 
                onClick={handlePrev}
                className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 transition-all cursor-pointer shadow-md group"
              >
                <ChevronRight className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={handleNext}
                className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 transition-all cursor-pointer shadow-md group"
              >
                <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Advanced Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-6 mb-16 relative z-20 flex flex-wrap items-center gap-6"
        >
          {/* Search Input */}
          <div className="flex-1 min-w-[280px] relative group">
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="ابحث عن اسم الطبيب أو العيادة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pr-14 pl-6 bg-slate-50/50 border border-slate-200/60 rounded-2xl text-slate-700 font-bold focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            />
          </div>

          {/* Specialty Filter */}
          <div className="relative min-w-[200px]">
            <select 
              value={filters.specialty}
              onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
              className="w-full h-14 pr-12 pl-10 bg-slate-50/50 border border-slate-200/60 rounded-2xl text-slate-700 font-bold appearance-none cursor-pointer focus:bg-white focus:border-blue-400 outline-none transition-all"
            >
              <option value="">كل التخصصات</option>
              {availableSpecialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <Stethoscope className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>

          {/* Area Filter */}
          <div className="relative min-w-[180px]">
            <select 
              value={filters.area}
              onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))}
              className="w-full h-14 pr-12 pl-10 bg-slate-50/50 border border-slate-200/60 rounded-2xl text-slate-700 font-bold appearance-none cursor-pointer focus:bg-white focus:border-blue-400 outline-none transition-all"
            >
              <option value="">كل المناطق</option>
              {availableAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>

          {/* Near Me Toggle */}
          <button
            onClick={handleNearMe}
            disabled={isLocating}
            className={`h-14 px-8 rounded-2xl font-black text-sm transition-all flex items-center gap-3 border shadow-sm ${isSortingByDistance ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
          >
            {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className={`w-5 h-5 ${isSortingByDistance ? "animate-bounce" : ""}`} />}
            {isSortingByDistance ? "الأقرب إليك أولاً" : "ابحث عن الأقرب"}
          </button>

          {/* Rating Filter */}
          <div className="relative min-w-[160px]">
            <select 
              value={filters.minRating}
              onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
              className="w-full h-14 pr-12 pl-10 bg-slate-50/50 border border-slate-200/60 rounded-2xl text-slate-700 font-bold appearance-none cursor-pointer focus:bg-white focus:border-blue-400 outline-none transition-all"
            >
              <option value="0">كل التقييمات</option>
              <option value="4">4 نجوم فأعلى</option>
              <option value="4.5">4.5 نجوم فأعلى</option>
              <option value="3">3 نجوم فأعلى</option>
            </select>
            <Star className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </motion.div>

        {/* Dynamic States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-36 bg-white/60 backdrop-blur-md rounded-[3.5rem] border border-slate-100 max-w-4xl mx-auto shadow-sm">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
            <p className="text-slate-600 font-black text-2xl">جاري تحميل نخبة الأطباء الفاخرة...</p>
            <p className="text-slate-400 text-sm font-bold mt-2">نعمل على جلب أفضل الكوادر الطبية لخدمتك</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-500/5 rounded-3xl border border-red-500/10 max-w-2xl mx-auto p-8 shadow-sm">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
              <Loader2 className="w-8 h-8" />
            </div>
            <p className="text-red-600 font-black text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 hover:shadow-lg transition-all"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : totalDoctors === 0 ? (
          <div className="text-center py-24 bg-white/50 backdrop-blur-md rounded-[3.5rem] border border-slate-100 max-w-2xl mx-auto shadow-sm">
            <p className="text-slate-500 font-black text-xl">لا يوجد أطباء متاحون حالياً في هذه اللحظة.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Massive Luxury Cards Slider */}
            <div className="px-1 py-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch"
                >
                  {displayedDoctors.map((doctor, index) => {
                    const nameLower = doctor.userName?.toLowerCase() || "";
                    const isFemale = doctor.gender?.toLowerCase() === "female" || 
                                     nameLower.includes("mrehan") || 
                                     nameLower.includes("loujain") || 
                                     nameLower.includes("sara") || 
                                     nameLower.includes("salma") || 
                                     doctor.userName?.includes("نهى") || 
                                     doctor.userName?.includes("سارة") || 
                                     doctor.userName?.includes("فاطمة") || 
                                     doctor.userName?.includes("أميرة") ||
                                     doctor.userName?.includes("هند") ||
                                     doctor.userName?.includes("ميريهان") ||
                                     doctor.userName?.includes("سلمى") ||
                                     (doctor.specialization && doctor.specialization.includes("نساء"));
                    
                    const avatarSrc = isFemale ? "/doctorgirl.png" : "/doctorman.png";
                    const isFav = !!favorites[doctor._id];

                    return (
                      <motion.div
                        key={`${doctor._id}-${index}`}
                        whileHover={{ y: -15, scale: 1.02 }}
                        className="bg-white border border-slate-100/80 rounded-[4rem] p-8 hover:border-blue-300 hover:shadow-[0_45px_90px_rgba(59,130,246,0.18)] shadow-[0_15px_50px_rgba(0,0,0,0.015)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-between min-h-[780px] h-full"
                      >
                        {/* Interactive Inner Card Mesh Backdrop */}
                        <div className="absolute inset-0 bg-[radial-gradient(#3b82f605_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        {/* 1. Large Covers Banner Inside the Card */}
                        <div className="h-36 w-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 rounded-[3rem] relative overflow-hidden shrink-0">
                          
                          {/* Verified Pulsing Pill Badge */}
                          <div className="absolute top-5 right-5 flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-2xl text-xs font-black shadow-md z-10">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                            <span>طبيب معتمد لشفاء</span>
                          </div>

                          {/* Heart Icon Button with Ripple */}
                          <button 
                            onClick={() => toggleFavorite(doctor._id)}
                            className="absolute top-5 left-5 w-11 h-11 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-md z-10 cursor-pointer"
                          >
                            <Heart className={`w-5.5 h-5.5 transition-colors ${isFav ? "fill-red-500 text-red-500 scale-110" : ""}`} />
                          </button>

                          {/* SVG EKG Medical Pulse Wave Drawn in Cover Background */}
                          <svg className="absolute bottom-[-5px] left-0 w-full h-20 text-blue-500/15 group-hover:text-blue-500/25 transition-colors duration-500 pointer-events-none" viewBox="0 0 300 60" preserveAspectRatio="none">
                            <path d="M0,30 L60,30 L70,10 L80,50 L90,30 L150,30 L160,5 L170,55 L180,30 L240,30 L250,20 L260,40 L270,30 L300,30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          {/* Cover Abstract Art */}
                          <div className="absolute right-[-10%] bottom-[-20%] w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
                        </div>

                        {/* 2. Symmetrical Body Wrapper */}
                        <div className="px-2 pb-2 pt-0 relative flex-1 flex flex-col justify-between mt-6">
                          
                          {/* Symmetrical Top Section - Fully Centered to give 100% full width to Doctor's Name */}
                          <div className="flex flex-col items-center -mt-20 mb-4 relative z-10 text-center">
                            
                            {/* Overlapping Avatar Profile - Enlarged to w-32 h-32 with Double Glowing Radar Pulse Aura */}
                            <motion.div 
                              animate={{ 
                                boxShadow: [
                                  "0 0 0 0px rgba(59, 130, 246, 0.4)", 
                                  "0 0 0 12px rgba(59, 130, 246, 0.15)", 
                                  "0 0 0 24px rgba(59, 130, 246, 0)"
                                ] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 3, 
                                ease: "easeInOut" 
                              }}
                              className="w-28 h-28 rounded-full bg-white p-[5px] shadow-xl shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 ring-4 ring-blue-500/10 mb-3"
                            >
                              <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 relative">
                                <img 
                                  src={avatarSrc} 
                                  alt={doctor.userName}
                                  className="w-full h-full object-cover scale-105 group-hover:scale-115 group-hover:rotate-3 transition-transform duration-500"
                                />
                              </div>
                            </motion.div>

                            <div className="flex justify-between items-center mt-2 pt-4 border-t border-slate-200/50 w-full px-4 mb-2">
                              <div className="flex items-center gap-1 text-amber-500">
                                {doctor.rating ? (
                                  <>
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-xs font-black">{Number(doctor.rating).toFixed(1)}</span>
                                    <span className="text-[10px] text-slate-400 mr-1 font-bold">({doctor.ratingCount} تقييم)</span>
                                  </>
                                ) : (
                                  <span className="text-xs font-bold text-slate-400">لا توجد تقييمات</span>
                                )}
                                {doctor.distance && doctor.distance !== Infinity && (
                                  <span className="text-[10px] text-slate-400 mr-2 font-bold flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {doctor.distance.toFixed(1)} كم
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Doctor's Name - Bold, centered, and fully visible with no horizontal squeezing! */}
                            <Link href={`/doctors/${doctor._id}`} className="text-2xl md:text-3xl font-black text-slate-900 hover:text-blue-600 transition-colors leading-tight block w-full pb-1">
                              د. {doctor.userName}
                            </Link>
                          </div>

                          {/* Large Elegant Pill Specialization Badge - Symmetrical Height */}
                          <div className="mb-6 relative z-10 h-10 flex items-center justify-center">
                            <div className="flex items-center gap-2 text-blue-600 text-sm font-black bg-gradient-to-r from-blue-50 to-blue-100/40 border border-blue-100/60 px-5 py-3 rounded-2xl inline-flex shadow-[0_4px_15px_rgba(59,130,246,0.02)] max-w-full">
                              <Stethoscope className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                              <span className="truncate">{doctor.specialization?.trim()}</span>
                            </div>
                          </div>

                          {/* Symmetrical Detail Boxes (Fixed heights & Line clamping) */}
                          <div className="grid grid-cols-1 gap-4 mb-6 relative z-10">
                            
                            {/* Address Box */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 group/item h-16">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover/item:text-blue-500 group-hover/item:border-blue-200 transition-colors shrink-0 shadow-sm">
                                <MapPin className="w-4.5 h-4.5" />
                              </div>
                              <span className="text-slate-700 text-sm font-black truncate max-w-[210px] sm:max-w-[250px]">{doctor.address || "العنوان غير محدد"}</span>
                            </div>

                            {/* Phone Box */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 group/item h-16">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover/item:text-blue-500 group-hover/item:border-blue-200 transition-colors shrink-0 shadow-sm">
                                <Phone className="w-4.5 h-4.5" />
                              </div>
                              <span dir="ltr" className="text-slate-700 text-sm font-black truncate max-w-[210px] sm:max-w-[250px]">{doctor.phone || "لا يوجد هاتف للعيادة"}</span>
                            </div>

                            {/* Price Box with Luxury Emerald Highlights */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 hover:bg-emerald-500/[0.05] hover:border-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 group/item h-16">
                              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 shadow-sm">
                                <DollarSign className="w-4.5 h-4.5" />
                              </div>
                              <span className="text-slate-700 text-sm font-black truncate">
                                سعر الكشف: <strong className="text-emerald-600 text-base font-black">{doctor.price || "0"} جنيه</strong>
                              </span>
                            </div>
                          </div>

                          {/* Action Button - Symmetrically Baseline Aligned */}
                          <Link 
                            href={`/doctors/${doctor._id}`}
                            className="w-full block text-center py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all relative z-10 text-lg shrink-0"
                          >
                            عرض الملف وحجز موعد الآن
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Bullet Indicators */}
            {totalDoctors > visibleCount && (
              <div className="flex justify-center gap-2.5 mt-16 relative z-10">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? "bg-blue-500 w-10 shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "bg-slate-200 hover:bg-slate-300 w-2.5"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
