"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Stethoscope,
  Users,
  ArrowRight,
  Mail,
  Lock,
  Phone,
  MapPin,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RoleSelectionModal from "@/components/RoleSelectionModal";
import CompleteProfileModal from "@/components/CompleteProfileModal";
import { GoogleLogin } from "@react-oauth/google";

const specializations = [
  "الباطنة العامة", "أمراض القلب", "أمراض الصدر", "الجراحة العامة",
  "أمراض الكلى", "الطب الطارئ", "أمراض الدم", "الأمراض الجلدية",
  "الطب النفسي", "التخدير", "العلاج الطبيعي"
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Role, 2: Info, 3: OTP, 4: Success
  const [role, setRole] = useState(""); // Doctor, Patient, Companion
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
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

    // If role is already selected in the register flow, use it.
    if (role) {
      // Call backend immediately with selected role
      handleRoleSelectCallback(idToken, role);
    } else {
      setShowRoleModal(true);
    }
  };

  const handleGoogleError = () => {
    setError("فشل تسجيل الدخول بجوجل.");
  };

  // We need a slightly separate helper to explicitly pass token to skip state delay if needed
  const handleRoleSelectCallback = async (explicitToken, selectedRole) => {
    setLoading(true);
    setUserRole(selectedRole);

    try {
      const response = await fetch("/api/auth/loginWithGmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: explicitToken,
          role: selectedRole
        }),
      });

      const data = await response.json();

      if (response.ok || data.message === "Done") {
        const token = data.access_token;
        setAuthToken(token);
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
    localStorage.setItem("token", authToken);
    localStorage.setItem("refresh_token", data?.refresh_token || data?.refreshToken || authToken);
    localStorage.setItem("role", userRole);
    router.push("/profile");
  };

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    cPassword: "",
    address: "",
    phone: "",
    gender: "male",
    price: "",
    specialization: "",
    blood: "",
    disease: "",
    age: "",
    currentMedication: "",
    companion: "",
    doctor: "",
    experienceLevel: "",
    relationPatient: "",
    patientId: "",
  });

  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [token, setToken] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.cPassword) {
      setError("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      setLoading(false);
      return;
    }

    const userData = {
      role: role,
      fName: formData.fName.trim(),
      lName: formData.lName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      cPassword: formData.cPassword,
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      gender: formData.gender,
    };

    if (role === "Doctor") {
      userData.specialization = formData.specialization;
      userData.price = parseFloat(formData.price) || 0;
    }

    if (role === "Patient") {
      userData.blood = formData.blood;
      userData.disease = formData.disease || "none";
      userData.age = parseInt(formData.age) || 0;
      userData.currentMedication = formData.currentMedication || "none";
      if (formData.companion && formData.companion.trim() !== "") {
        userData.companionId = formData.companion.trim();
      }
      if (formData.doctor && formData.doctor.trim() !== "") {
        userData.doctorId = formData.doctor.trim();
      }

      console.log("Registration Payload:", userData);
    }

    if (role === "Companion") {
      userData.age = parseInt(formData.age) || 0;
      userData.experienceLevel = formData.experienceLevel;
      userData.relationPatient = formData.relationPatient;
      if (formData.patientId && formData.patientId.trim() !== "") {
        userData.patientId = formData.patientId.trim();
      }
      console.log("Companion Registration Payload:", userData);
    }

    try {
      console.log("Sending userData to Proxy:", userData);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Proxy Response:", data);

      if (response.ok || data.message === "Done" || data.status === "Success" || data.id) {
        const newToken = data.token || data.accessToken || data.access_token || data.access_token_email;
        if (newToken) setToken(newToken);
        setStep(3); // Go to OTP
      } else {
        setError(data.message || "حدث خطأ أثناء التسجيل. تأكد من صحة البيانات.");
      }
    } catch (err) {
      console.error("SignUp Error:", err);
      setError("فشل الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/confirm", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authentication": token ? `user ${token}` : ""
        },
        body: JSON.stringify({
          email: formData.email,
          code: otp
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessData(data);
        setStep(4); // Success
      } else {
        setError(data.message || "رمز التأكيد غير صحيح");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authentication": token ? `user ${token}` : ""
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("تم إعادة إرسال الرمز إلى بريدك الإلكتروني بنجاح.");
      } else {
        setError(data.message || "فشل إعادة إرسال الرمز");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم.");
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
      {/* Premium Glassmorphic Backdrop Blur Overlay - Lightened */}
      <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[5px] z-0 pointer-events-none"></div>

      {/* Modals */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onSelect={handleRoleSelect}
        onClose={() => setShowRoleModal(false)}
      />

      <CompleteProfileModal
        isOpen={showProfileModal}
        token={authToken}
        role={userRole || role}
        onComplete={handleProfileComplete}
        onClose={() => setShowProfileModal(false)}
      />

      {/* Dynamic Background Elements for Extra Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-secondary/15 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        layout
        className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden relative z-10"
      >
        <div className="flex flex-col md:flex-row">

          {/* Sidebar - Decorative */}
          <div className="md:w-1/3 bg-gradient-to-br from-primary/60 to-primary-dark/70 backdrop-blur-2xl p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100" fill="white" />
              </svg>
            </div>

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tight">شفاء</span>
              </Link>

              <h2 className="text-3xl font-extrabold mb-4 leading-tight">
                {step === 1 && "ابدأ رحلتك معنا"}
                {step === 2 && "أكمل بياناتك"}
                {step === 3 && "تأكيد الحساب"}
                {step === 4 && "تم بنجاح!"}
              </h2>
              <p className="text-white/70">
                {step === 1 && "اختر نوع الحساب الذي تود إنشاؤه للبدء في استخدام خدماتنا الطبية المتميزة."}
                {step === 2 && "نحن نهتم بخصوصيتك، جميع بياناتك محمية بأعلى معايير الأمان."}
                {step === 3 && "لقد أرسلنا رمز التأكيد إلى بريدك الإلكتروني لضمان أمان حسابك."}
                {step === 4 && "أهلاً بك في عائلة شفاء، حسابك الآن جاهز للاستخدام."}
              </p>
            </div>

            <div className="relative z-10 pt-12">
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${step >= i ? "bg-white w-8" : "bg-white/20 w-3"}`}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 md:p-12 bg-white/25 backdrop-blur-3xl border-r border-white/10">
            <AnimatePresence mode="wait">

              {/* STEP 1: Role Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="text-center md:text-right">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">من أنت؟</h3>
                    <p className="text-slate-500">اختر الفئة التي تنتمي إليها</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: "Doctor", label: "طبيب", icon: <Stethoscope className="w-6 h-6" />, desc: "لتقديم الرعاية الطبية وإدارة مواعيدك" },
                      { id: "Patient", label: "مريض", icon: <User className="w-6 h-6" />, desc: "لحجز المواعيد ومتابعة حالتك الصحية" },
                      { id: "Companion", label: "مرافق مريض", icon: <Users className="w-6 h-6" />, desc: "لمساعدة المرضى في إدارة رحلتهم العلاجية" }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => { setRole(item.id); setStep(2); }}
                        className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/40 border border-white hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all group text-right backdrop-blur-md"
                      >
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-800">{item.label}</h4>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                        <ArrowRight className="mr-auto w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-400 font-bold">أو سجل عبر</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      theme="outline"
                      shape="pill"
                      size="large"
                      locale="ar"
                    />
                  </div>

                  <div className="text-center text-slate-500">
                    لديك حساب بالفعل؟ <Link href="/login" className="text-primary font-bold hover:underline">سجل دخولك</Link>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Main Form */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button onClick={() => setStep(1)} className="text-primary font-bold flex items-center gap-2 mb-6 hover:gap-3 transition-all">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>رجوع</span>
                  </button>

                  <h3 className="text-2xl font-bold text-slate-800 mb-6">إنشاء حساب {role === "Doctor" ? "طبيب" : role === "Patient" ? "مريض" : "مرافق"}</h3>

                  {error && <div className="p-4 mb-6 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100">{error}</div>}

                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">الاسم الأول</label>
                        <input required name="fName" value={formData.fName} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" placeholder="مثال: لجين" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">اسم العائلة</label>
                        <input required name="lName" value={formData.lName} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" placeholder="مثال: إبراهيم" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
                      <div className="relative">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors z-10" />
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pr-12 pl-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right" placeholder="name@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">كلمة المرور</label>
                        <div className="relative">
                          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors z-10" />
                          <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pr-12 pl-12 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors z-10 p-1"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">تأكيد كلمة المرور</label>
                        <div className="relative">
                          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors z-10" />
                          <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="cPassword"
                            value={formData.cPassword}
                            onChange={handleChange}
                            className="w-full pr-12 pl-12 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors z-10 p-1"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">رقم الهاتف</label>
                        <div className="relative">
                          <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                          <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full pr-12 pl-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right" placeholder="010XXXXXXXX" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">النوع</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: "male" }))}
                            className={`flex-1 py-3 rounded-xl border font-bold transition-all ${formData.gender === "male" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-500 border-slate-100"}`}
                          >
                            ذكر
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: "female" }))}
                            className={`flex-1 py-3 rounded-xl border font-bold transition-all ${formData.gender === "female" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-500 border-slate-100"}`}
                          >
                            أنثى
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700">العنوان</label>
                      <div className="relative">
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                        <input required name="address" value={formData.address} onChange={handleChange} className="w-full pr-12 pl-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right" placeholder="مثال: شارع 25، القاهرة" />
                      </div>
                    </div>

                    {role === "Patient" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-6 pt-4 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">فصيلة الدم</label>
                            <select required name="blood" value={formData.blood} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold appearance-none">
                              <option value="">اختر الفصيلة...</option>
                              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">العمر</label>
                            <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" placeholder="مثال: 23" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-slate-700">الأمراض المزمنة (إن وجدت)</label>
                          <input name="disease" value={formData.disease} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" placeholder="مثال: السكري، الضغط..." />
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-slate-700">الأدوية الحالية</label>
                          <input name="currentMedication" value={formData.currentMedication} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" placeholder="مثال: بنادول، أنسولين..." />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">رقم معرف المرافق (اختياري)</label>
                            <div className="relative">
                              <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                              <input name="companion" value={formData.companion} onChange={handleChange} className="w-full pr-12 pl-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right" placeholder="ID المرافق..." />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">رقم معرف الدكتور المعالج (اختياري)</label>
                            <div className="relative">
                              <Stethoscope className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                              <input name="doctor" value={formData.doctor} onChange={handleChange} className="w-full pr-12 pl-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right" placeholder="ID الطبيب..." />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {role === "Doctor" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-slate-700">التخصص الطبي</label>
                          <select required name="specialization" value={formData.specialization} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold appearance-none">
                            <option value="">اختر التخصص...</option>
                            {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-slate-700">سعر الكشف (جنيه)</label>
                          <div className="relative">
                            <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full pr-12 pl-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right" placeholder="مثال: 850" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {role === "Companion" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-6 pt-4 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">صلة القرابة بالمريض</label>
                            <select required name="relationPatient" value={formData.relationPatient} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold appearance-none">
                              <option value="">اختر العلاقة...</option>
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
                            <label className="text-sm font-bold text-slate-700">مستوى الخبرة</label>
                            <select required name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold appearance-none">
                              <option value="">اختر مستوى الخبرة...</option>
                              <option value="junior">مبتدئ (Junior)</option>
                              <option value="mid-level">متوسط الخبرة (Mid-level)</option>
                              <option value="senior">خبير (Senior)</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">العمر</label>
                            <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold" placeholder="مثال: 35" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">رقم معرف المريض (اختياري)</label>
                            <div className="relative">
                              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                              <input name="patientId" value={formData.patientId} onChange={handleChange} className="w-full pr-12 pl-4 py-3 bg-white/50 backdrop-blur-sm border border-white rounded-xl focus:ring-4 focus:ring-primary/20 focus:outline-none font-bold text-right" placeholder="ID المريض..." />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "إنشاء الحساب الآن"}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: OTP Verification */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">تفعيل الحساب</h3>
                  <p className="text-slate-500 mb-8">أدخل الرمز المكون من 6 أرقام المرسل إلى <br /> <strong className="text-slate-800">{formData.email}</strong></p>

                  {error && <div className="p-4 mb-6 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100">{error}</div>}

                  <form onSubmit={handleConfirmOtp} className="space-y-6">
                    <input
                      required
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full text-center text-4xl font-black tracking-[1rem] py-4 bg-white/50 backdrop-blur-sm border border-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none"
                      placeholder="000000"
                    />
                    <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "تأكيد الرمز"}
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-slate-400 text-sm hover:text-primary transition-colors disabled:opacity-50"
                    >
                      إعادة إرسال الرمز؟
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-green-500/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-800 mb-4">تم تفعيل حسابك بنجاح!</h3>
                  <p className="text-slate-500 mb-8 text-lg">أهلاً بك يا {role === "Doctor" ? "دكتور" : role === "Patient" ? "مريض" : "مرافق"} <strong className="text-primary">{formData.fName} {formData.lName}</strong></p>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 text-right">
                    <p className="text-sm text-slate-500 mb-1 font-bold">رقم المعرف الخاص بك (ID):</p>
                    <code className="text-lg font-black text-slate-800 block select-all">{successData?.id || successData?.user?.id || successData?.doctor?.id || "69e1c8ef98edd507900c5600"}</code>
                  </div>

                  <Link href="/" className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
                    <span>الذهاب للرئيسية</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
