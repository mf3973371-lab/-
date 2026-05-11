"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Star,
  ShieldCheck,
  MessageCircle,
  Loader2,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedDate, setSelectedDate] = useState("");
  const [availabilities, setAvailabilities] = useState([]);
  const [availLoading, setAvailLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/detail/${id}`);
        const data = await response.json();
        
        if (response.ok || data.message === "Done") {
          setDoctor(data.doctor);
        } else {
          setError("لم يتم العثور على بيانات هذا الطبيب");
        }
      } catch (err) {
        setError("خطأ في الاتصال بالسيرفر");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  useEffect(() => {
    if (selectedDate && id) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, id]);

  const fetchAvailability = async (date) => {
    setAvailLoading(true);
    setSelectedSlot(null);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") || "patient";
    try {
      const response = await fetch(`/api/patient/availability/${id}?date=${date}`, {
        method: "GET",
        headers: {
          "authorization": `${role.toLowerCase()} ${token}`
        }
      });
      const data = await response.json();
      console.log("Availability Data:", data); // لتتبع الرد في الكونسول

      if (response.ok || data.message === "Done") {
        // التحقق من وجود المواعيد في أي من المفاتيح المتوقعة
        const slots = data.availableTime || data.availableTimes || data.available || [];
        setAvailabilities(slots);
      } else {
        setAvailabilities([]);
      }
    } catch (err) {
      console.error("Error fetching availability:", err);
      setAvailabilities([]);
    } finally {
      setAvailLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;
    
    setBookingLoading(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") || "patient";

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/appointment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${role.toLowerCase()} ${token}`
        },
        body: JSON.stringify({ availableId: selectedSlot._id })
      });

      const data = await response.json();
      if (response.ok || data.message === "Done") {
        alert("تم حجز الموعد بنجاح! 🎉");
        router.push("/profile"); // التوجه للملف الشخصي لرؤية الحجز
      } else {
        alert(data.message || "فشل حجز الموعد");
      }
    } catch (err) {
      alert("خطأ في الاتصال بالسيرفر");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold">جاري تحميل ملف الطبيب...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6" dir="rtl">
        <div className="text-center bg-white p-10 rounded-[2.5rem] shadow-xl max-w-md border border-slate-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
            <Stethoscope className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">عذراً!</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold">
            <ArrowRight className="w-4 h-4 rotate-180" />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Back Button */}
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors">
          <ArrowRight className="w-5 h-5 rotate-180" />
          العودة للقائمة
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-primary/5 border border-slate-100 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem]"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                <div className="w-48 h-48 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden shrink-0">
                  <img 
                    src={doctor.gender === "female" ? "https://i.postimg.cc/Gh4sP8C1/signup-icon.png" : "https://i.postimg.cc/Gh4sP8C1/signup-icon.png"} 
                    alt={doctor.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center md:text-right flex-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800">د. {doctor.userName}</h1>
                    <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400/10 text-yellow-600 rounded-full text-sm font-bold border border-yellow-400/20">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      4.9
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold border border-primary/20">
                      <Stethoscope className="w-5 h-5" />
                      {doctor.specialization?.trim()}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-xl font-bold border border-green-500/20">
                      <ShieldCheck className="w-5 h-5" />
                      طبيب معتمد
                    </div>
                  </div>

                  <p className="text-slate-500 leading-relaxed text-lg mb-8">
                    متخصص في {doctor.specialization?.trim()}، خبرة تزيد عن 10 سنوات في تقديم الرعاية الطبية المتميزة. يسعى دائماً لتوفير أفضل سبل العلاج والراحة للمرضى.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailItem icon={<MapPin />} label="العنوان" value={doctor.address} />
                    <DetailItem icon={<Phone />} label="رقم التواصل" value={doctor.phone} isPhone />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Side Card */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-primary/10 pointer-events-none"></div>
              
              <h3 className="text-2xl font-black mb-8 relative z-10">احجز موعدك</h3>
              
              <div className="space-y-6 mb-8 relative z-10">
                {/* اختيار التاريخ */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> اختر تاريخ الزيارة
                  </label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-bold text-white"
                  />
                </div>

                {/* عرض المواعيد المتاحة */}
                {selectedDate && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> المواعيد المتاحة
                    </label>
                    {availLoading ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : availabilities.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {availabilities.map((slot) => (
                          <button
                            key={slot._id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-4 rounded-2xl border transition-all text-right flex items-center justify-between group ${
                              selectedSlot?._id === slot._id 
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" 
                              : "bg-white/5 border-white/10 text-slate-300 hover:border-primary/50 hover:bg-white/10"
                            }`}
                          >
                            <span className="font-bold">{slot.start} - {slot.end}</span>
                            {selectedSlot?._id === slot._id && <CheckCircle2 className="w-5 h-5" />}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                        لا توجد مواعيد متاحة في هذا اليوم
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-slate-400">سعر الكشف:</span>
                    <span className="text-2xl font-black text-white">{doctor.price} جنيه</span>
                  </div>
                </div>
              </div>

              <button 
                disabled={!selectedSlot || bookingLoading}
                onClick={handleBookAppointment}
                className={`w-full py-5 font-black text-xl rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 relative z-10 ${
                  !selectedSlot 
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed" 
                  : "bg-primary hover:bg-primary-dark text-white shadow-primary/20 hover:-translate-y-1"
                }`}
              >
                {bookingLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                تأكيد الحجز الآن
              </button>
              
              <button className="w-full mt-4 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10">
                <MessageCircle className="w-5 h-5" />
                تواصل مع الطبيب
              </button>
            </motion.div>

            <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary w-5 h-5" />
                حجز آمن ومضمون
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                جميع بياناتك محمية بشكل كامل، ويمكنك إلغاء الحجز أو تعديله قبل الموعد بـ 24 ساعة مجاناً.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value, isPhone = false }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-bold mb-1">{label}</p>
        <p className={`text-slate-800 font-black ${isPhone ? "text-left" : ""}`} dir={isPhone ? "ltr" : "rtl"}>{value}</p>
      </div>
    </div>
  );
}
