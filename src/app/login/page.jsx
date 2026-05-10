"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, Stethoscope, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RoleSelectionModal from "@/components/RoleSelectionModal";
import CompleteProfileModal from "@/components/CompleteProfileModal";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [tempGoogleData, setTempGoogleData] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      setError("فشل في استلام البيانات من جوجل.");
      return;
    }
    setTempGoogleData({ idToken });
    setShowRoleModal(true);
  };

  const handleGoogleError = () => {
    setError("فشل تسجيل الدخول بجوجل.");
  };

  const handleRoleSelect = async (selectedRole) => {
    setShowRoleModal(false);
    setLoading(true);
    setUserRole(selectedRole);

    try {
      const response = await fetch("/api/auth/loginWithGmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: tempGoogleData.idToken,
          role: selectedRole
        }),
      });

      const data = await response.json();

      if (response.ok || data.message === "Done") {
        const token = data.access_token;
        setAuthToken(token);

        // If profile is incomplete, show the modal
        // Note: You should check if the user is new or if data is missing.
        // For now, let's assume we might need to complete it.
        setShowProfileModal(true);
      } else {
        setError(data.message || "فشل تسجيل الدخول بجوجل.");
      }
    } catch (err) {
      setError("فشل الاتصال بالسيرفر.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = (data) => {
    // Save token and role
    localStorage.setItem("token", authToken);
    localStorage.setItem("role", userRole);
    router.push("/profile");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok || data.message === "Done") {
        // حفظ البيانات في localStorage
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token || data.refreshToken || data.access_token);
        localStorage.setItem("role", data.role); // مثلاً: Doctor

        // التوجيه لصفحة البروفايل
        router.push("/profile");
      } else {
        setError(data.message || "فشل تسجيل الدخول. تأكد من البريد وكلمة المرور.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80')` }}
      dir="rtl"
    >
      {/* Premium Glassmorphic Backdrop Blur Overlay - Lightened to show the beautiful medical background */}
      <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[5px] z-0 pointer-events-none"></div>

      {/* Dynamic Background Elements for Extra Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/15 rounded-full blur-[140px]"
        />
      </div>

      {/* Modals */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onSelect={handleRoleSelect}
        onClose={() => setShowRoleModal(false)}
      />

      <CompleteProfileModal
        isOpen={showProfileModal}
        token={authToken}
        role={userRole}
        onComplete={handleProfileComplete}
        onClose={() => setShowProfileModal(false)}
      />

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl border border-white/20 overflow-hidden relative z-10"
      >
        {/* Left Side: Brand & Visuals (Visible on LG) */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-primary/60 via-primary-dark/70 to-slate-950/80 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <Stethoscope className="w-8 h-8" />
              </div>
              <span className="text-4xl font-black text-white tracking-tight">شفاء</span>
            </Link>

            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              رعاية طبية <br />
              <span className="text-primary-light bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">بلمسة تكنولوجية</span>
            </h2>
            <p className="text-blue-100/70 text-xl leading-relaxed max-w-sm font-medium">
              انضم لأكثر من ١٠,٠٠٠ مستخدم يثقون في منصة شفاء لإدارة صحتهم اليومية.
            </p>
          </div>

          <div className="relative z-10 pt-12">
            <div className="flex gap-4 items-center">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-sm font-bold">يثق بنا آلاف المرضى والأطباء</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 bg-white/25 backdrop-blur-3xl border-r border-white/10">
          <div className="mb-12">
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-800">شفاء</span>
              </Link>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-2">أهلاً بك مجدداً</h3>
            <p className="text-slate-500 font-bold">سجل دخولك للمتابعة في حسابك</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 mb-8 bg-red-500/10 text-red-600 rounded-2xl text-sm border border-red-500/20 flex items-center gap-3 font-bold"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 mr-2 uppercase tracking-wider">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pr-12 pl-4 py-4 bg-white/30 border border-white/20 rounded-[1.5rem] focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:bg-white/55 focus:outline-none transition-all font-bold text-slate-800 shadow-sm text-right"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-sm font-black text-slate-700 uppercase tracking-wider">كلمة المرور</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-primary font-black hover:underline tracking-tight"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pr-12 pl-12 py-4 bg-white/30 border border-white/20 rounded-[1.5rem] focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:bg-white/55 focus:outline-none transition-all font-bold text-slate-800 shadow-sm text-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors z-10 p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4.5 bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xl rounded-[1.5rem] shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 mt-8 group"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  <span>تسجيل الدخول</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-[-5px] transition-transform rotate-180" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/60"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-6 bg-transparent text-slate-400 font-bold">أو عبر المنصات الاجتماعية</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col items-center justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              shape="pill"
              size="large"
              locale="ar"
            />
          </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-bold">
              ليس لديك حساب؟{" "}
              <Link href="/register" className="text-primary font-black hover:underline decoration-2 underline-offset-4">ابدأ الآن مجاناً</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
