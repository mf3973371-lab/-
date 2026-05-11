"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  MapPin, 
  Phone, 
  Stethoscope, 
  DollarSign, 
  Loader2, 
  CheckCircle2,
  User,
  Users
} from "lucide-react";

const specializations = [
  "الباطنة العامة", "أمراض القلب", "أمراض الصدر", "الجراحة العامة", 
  "أمراض الكلى", "الطب الطارئ", "أمراض الدم", "الأمراض الجلدية", 
  " الطب النفسي", " التخدير", " العلاج الطبيعي"
];

export default function CompleteProfileModal({ isOpen, onClose, token, role, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    gender: "male",
    phone: "",
    address: "",
    specialization: "",
    price: "",
    blood: "",
    disease: "",
    age: "",
    currentMedication: "",
    companionId: "",
    doctorId: "",
    experienceLevel: "",
    relationPatient: "",
    patientId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
      };

      if (role === "Doctor") {
        payload.specialization = formData.specialization;
        payload.price = parseFloat(formData.price) || 0;
      }

      if (role === "Patient") {
        payload.blood = formData.blood;
        payload.age = parseInt(formData.age) || 0;
        payload.disease = formData.disease || "none";
        payload.currentMedication = formData.currentMedication || "none";
        if (formData.companionId?.trim()) payload.companionId = formData.companionId.trim();
        if (formData.doctorId?.trim()) payload.doctorId = formData.doctorId.trim();
      }

      if (role === "Companion") {
        payload.age = parseInt(formData.age) || 0;
        payload.experienceLevel = formData.experienceLevel;
        payload.relationPatient = formData.relationPatient;
        if (formData.patientId?.trim()) payload.patientId = formData.patientId.trim();
      }

      const response = await fetch("/api/auth/completeProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${role.toLowerCase()} ${token}` 
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok || data.message === "Done") {
        setSuccess(true);
        setTimeout(() => {
          onComplete(data);
          onClose();
        }, 2000);
      } else {
        setError(data.message || "فشل إكمال البيانات. يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg glass-card rounded-[2.5rem] shadow-2xl border border-white relative max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute left-6 top-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        <div className="p-8 md:p-10">
          {!success ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-800">أكمل ملفك الشخصي</h2>
                <p className="text-slate-500 mt-2">نحتاج لبعض المعلومات الإضافية لنقدم لك أفضل تجربة</p>
              </div>

              {error && (
                <div className="p-4 mb-6 bg-red-50 text-red-500 rounded-2xl text-sm border border-red-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 mr-2">النوع</label>
                  <div className="flex gap-2">
                    {["male", "female"].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, gender: g }))}
                        className={`flex-1 py-3 rounded-xl border font-bold transition-all ${formData.gender === g ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-500 border-slate-100 hover:border-primary/30"}`}
                      >
                        {g === "male" ? "ذكر" : "أنثى"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 mr-2">رقم الهاتف</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="010XXXXXXXX"
                      className="w-full pl-4 pr-12 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-bold text-left" 
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 mr-2">العنوان</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      required 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="مثال: مدينة نصر، القاهرة"
                      className="w-full pl-4 pr-12 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-bold" 
                    />
                  </div>
                </div>

                {role === "Doctor" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-5 pt-2">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">التخصص الطبي</label>
                      <div className="relative">
                        <Stethoscope className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <select 
                          required 
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          className="w-full pl-4 pr-12 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-bold appearance-none"
                        >
                          <option value="">اختر التخصص...</option>
                          {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">سعر الكشف (جنيه)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                          required 
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="مثال: 500"
                          className="w-full pl-4 pr-12 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all font-bold" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {role === "Patient" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-5 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 mr-2">فصيلة الدم</label>
                        <select 
                          required 
                          name="blood" 
                          value={formData.blood} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold appearance-none"
                        >
                          <option value="">الفصيلة...</option>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 mr-2">العمر</label>
                        <input 
                          required 
                          type="number" 
                          name="age" 
                          value={formData.age} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" 
                          placeholder="العمر" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">الأمراض المزمنة</label>
                      <input 
                        name="disease" 
                        value={formData.disease} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" 
                        placeholder="مثال: السكري، الضغط..." 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">الأدوية الحالية</label>
                      <input 
                        name="currentMedication" 
                        value={formData.currentMedication} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" 
                        placeholder="الأدوية الحالية..." 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">رقم معرّف المرافق (اختياري)</label>
                      <input 
                        name="companionId" 
                        value={formData.companionId} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" 
                        placeholder="ID المرافق" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">رقم معرّف الطبيب (اختياري)</label>
                      <input 
                        name="doctorId" 
                        value={formData.doctorId} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" 
                        placeholder="ID الطبيب" 
                      />
                    </div>
                  </motion.div>
                )}

                {role === "Companion" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-5 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 mr-2">العلاقة بالمريض</label>
                        <select 
                          required 
                          name="relationPatient" 
                          value={formData.relationPatient} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold appearance-none"
                        >
                          <option value="">العلاقة...</option>
                          <option value="father">أب</option>
                          <option value="mother">أم</option>
                          <option value="brother">أخ</option>
                          <option value="sister">أخت</option>
                          <option value="husband">زوج</option>
                          <option value="wife">زوجة</option>
                          <option value="friend">صديق</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 mr-2">الخبرة</label>
                        <select 
                          required 
                          name="experienceLevel" 
                          value={formData.experienceLevel} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold appearance-none"
                        >
                          <option value="">الخبرة...</option>
                          <option value="junior">مبتدئ</option>
                          <option value="mid-level">متوسط</option>
                          <option value="senior">خبير</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">العمر</label>
                      <input 
                        required 
                        type="number" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" 
                        placeholder="مثال: 30" 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700 mr-2">رقم معرف المريض المرافق له (ID) - اختياري</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                          name="patientId" 
                          value={formData.patientId} 
                          onChange={handleChange} 
                          className="w-full pl-4 pr-12 py-3.5 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" 
                          placeholder="ادخل ID المريض..." 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-4 mt-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "حفظ والبدء"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">تم بنجاح!</h3>
              <p className="text-slate-500">تم تحديث بياناتك، جارِ تحويلك...</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
