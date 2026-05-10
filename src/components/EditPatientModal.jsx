"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";

export default function EditPatientModal({ isOpen, onClose, patient, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    blood: "",
    disease: "",
    currentMedication: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        blood: patient.blood || "",
        disease: patient.disease || "",
        currentMedication: patient.currentMedication || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setError("");
    setSuccess(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role") || "companion";

      const response = await fetch(`/api/patient/update/${patient._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${role.toLowerCase()} ${token}`
        },
        body: JSON.stringify({
          blood: formData.blood,
          disease: formData.disease,
          currentMedication: formData.currentMedication,
        }),
      });

      const data = await response.json();

      if (response.ok || data.message === "Done") {
        setSuccess(true);
        setTimeout(() => {
          if (onUpdate) onUpdate({ ...patient, ...formData });
          handleClose();
        }, 2000);
      } else {
        setError(data.message || "فشل تعديل بيانات المريض. يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !patient) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-6 pb-0 flex justify-between items-center relative z-10">
            <button 
              onClick={handleClose}
              className="p-2 rounded-full bg-slate-100/50 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-slate-400">تعديل ملف طبي</span>
          </div>

          <div className="p-8 pt-4">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center py-8"
              >
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-2">تم التحديث!</h3>
                <p className="text-slate-500 font-medium">تم تعديل الملف الطبي للمريض بنجاح.</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">تعديل بيانات: {patient.fName}</h2>
                  <p className="text-slate-400 text-xs font-bold mt-1 tracking-wider">ID: {patient._id}</p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 mb-6 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 flex items-center gap-3 font-bold"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 mr-2">فصيلة الدم</label>
                    <select 
                      name="blood"
                      value={formData.blood}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-slate-700"
                    >
                      <option value="">اختر الفصيلة...</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 mr-2">التشخيص الطبي / الحالة</label>
                    <input 
                      type="text" 
                      name="disease"
                      value={formData.disease}
                      onChange={handleChange}
                      placeholder="مثال: ضغط، سكري، الخ"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-slate-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 mr-2">الخطة العلاجية الحالية</label>
                    <textarea 
                      name="currentMedication"
                      value={formData.currentMedication}
                      onChange={handleChange}
                      placeholder="اكتب الأدوية ومواعيدها هنا..."
                      rows="3"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-slate-700 resize-none"
                    />
                  </div>

                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full py-4 mt-2 bg-primary text-white font-black text-lg rounded-[1.25rem] shadow-xl shadow-primary/25 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "حفظ التعديلات الطبية"}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
