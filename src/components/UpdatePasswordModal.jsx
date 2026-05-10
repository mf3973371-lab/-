"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Loader2, CheckCircle2 } from "lucide-react";

export default function UpdatePasswordModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    cPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setLoading(false);
    setError("");
    setSuccess(false);
    setFormData({ oldPassword: "", newPassword: "", cPassword: "" });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.cPassword) {
      setError("كلمات المرور الجديدة غير متطابقة!");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role") || "patient";

      const response = await fetch("/api/auth/update-password", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "authorization": `${role.toLowerCase()} ${token}`
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          cPassword: formData.cPassword,
        }),
      });

      const data = await response.json();

      if (response.ok || data.message === "Done") {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setError(data.message || "فشل تحديث كلمة المرور. تأكد من كلمة المرور الحالية.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
            <span className="text-sm font-bold text-slate-400">تحديث الأمان</span>
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
                <h3 className="text-3xl font-black text-slate-800 mb-2">تم بنجاح!</h3>
                <p className="text-slate-500 font-medium">تم تحديث كلمة المرور الخاصة بك بنجاح.</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">تغيير كلمة المرور</h2>
                  <p className="text-slate-500 mt-2 font-medium">أدخل كلمة المرور الحالية ثم كلمة المرور الجديدة لتحديث حسابك.</p>
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
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">كلمة المرور الحالية</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input 
                        required 
                        type="password" 
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-slate-800 text-left" 
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">كلمة المرور الجديدة</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input 
                        required 
                        type="password" 
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-slate-800 text-left" 
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">تأكيد كلمة المرور الجديدة</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input 
                        required 
                        type="password" 
                        name="cPassword"
                        value={formData.cPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-slate-800 text-left" 
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full py-4 mt-2 bg-primary text-white font-black text-lg rounded-[1.25rem] shadow-xl shadow-primary/25 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "تحديث كلمة المرور"}
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
