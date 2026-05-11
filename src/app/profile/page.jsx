"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  DollarSign,
  Calendar,
  Clock,
  Shield,
  Loader2,
  LogOut,
  Search,
  CheckCircle2,
  Home,
  Users,
  HeartPulse,
  Droplet,
  Activity,
  Heart,
  Award
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UpdatePasswordModal from "@/components/UpdatePasswordModal";
import EditPatientModal from "@/components/EditPatientModal";



export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const handleLogout = async (type = "current") => {
    setLogoutLoading(true);
    try {
      const token = localStorage.getItem("refresh_token") || localStorage.getItem("token");
      const role = localStorage.getItem("role") || "patient";

      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `${role.toLowerCase()} ${token}`
          },
          body: JSON.stringify({ flag: type })
        });
      }
    } catch (err) {
      console.error("Logout API Error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");
      setLogoutLoading(false);
      setShowLogoutModal(false);
      window.location.href = "/login";
    }
  };



  const [editForm, setEditForm] = useState({
    fName: "",
    lName: "",
    address: "",
    phone: "",
    specialization: "",
    price: ""
  });

  const [appointmentForm, setAppointmentForm] = useState({
    start: "",
    end: "",
    date: typeof window !== 'undefined' ? new Date().toISOString().split('T')[0] : ""
  });
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [availLoading, setAvailLoading] = useState(false);
  const [myAppointments, setMyAppointments] = useState([]);
  const [myAppLoading, setMyAppLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [router]);

  useEffect(() => {
    if (userData?.role === "Doctor" && appointmentForm.date) {
      fetchAvailability(appointmentForm.date);
    }
  }, [appointmentForm.date, userData?.role]);

  const fetchAvailability = async (date) => {
    setAvailLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/doctor/availability?date=${date}`, {
        method: "GET",
        headers: {
          "authorization": `doctor ${token}`
        }
      });
      const data = await response.json();
      if (response.ok || data.message === "Done") {
        setAvailabilities(data.availableTime || []);
      }
    } catch (err) {
      console.error("Error fetching availability:", err);
    } finally {
      setAvailLoading(false);
    }
  };

  const fetchMyAppointments = async () => {
    setMyAppLoading(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    try {
      const response = await fetch("/api/appointment/list", {
        method: "GET",
        headers: {
          "authorization": `${role.toLowerCase()} ${token}`
        }
      });
      const data = await response.json();
      console.log("My Appointments Data (Full):", data);

      if (response.ok || data.message === "Done") {
        const apps = data.appointments || data.appointment || data.allAppointments || data.results || data.companionAppointments || (Array.isArray(data) ? data : []);
        setMyAppointments(apps);
      } else {
        setMyAppointments([]);
      }
    } catch (err) {
      console.error("Error fetching my appointments:", err);
      setMyAppointments([]);
    } finally {
      setMyAppLoading(false);
    }
  };

  const handleCancelAppointment = async (appointment) => {
    console.log("=== Hitting handleCancelAppointment ===", appointment);
    
    if (!appointment) {
      alert("خطأ داخلي: لم يتم العثور على بيانات الحجز");
      return;
    }

    // Safely resolve the reservation ID from multiple potential formats
    // Extensive fallback mechanism covering every potential identifier string format returned by standard and companion APIs
    const appointmentId = appointment._id || appointment.id || appointment.appointmentId || appointment.bookingId || appointment.reservationId || (appointment.availableId && typeof appointment.availableId === 'string' ? appointment.availableId : null);
    
    if (!appointmentId) {
      const keys = Object.keys(appointment).join(", ");
      alert(`لم يتم العثور على معرّف للحجز! الحقول المتوفرة: ${keys}\nالرجاء تصوير هذه الرسالة للمبرمج.`);
      console.error("Appointment missing ID field. Available fields:", Object.keys(appointment));
      return;
    }

    // Permanently removed blocking dialog as it halts the client execution thread in this environment
    const isConfirmed = true;

    setCancelLoading(appointmentId);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const role = typeof window !== "undefined" ? (localStorage.getItem("role") || "patient") : "patient";
    
    console.log("INITIATING PATCH CALL to /api/appointment/cancel/" + appointmentId);
    
    try {
      const response = await fetch(`/api/appointment/cancel/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "authorization": `${role.toLowerCase()} ${token}`
        }
      });
      
      console.log("HTTP Network level RESPONSE received!", response.status);
      
      const data = await response.json();
      console.log("Received cancellation parsed JSON result:", data);

      if (response.ok || data.message === "Done" || data.message?.includes("Done")) {
        alert("تم إلغاء الموعد بنجاح");
        fetchMyAppointments(); // Update UI
      } else {
        alert(data.message || "فشل إلغاء الموعد");
      }
    } catch (err) {
      console.error("Cancellation process error:", err);
      alert("خطأ في الاتصال بالسيرفر أثناء محاولة الإلغاء");
    } finally {
      setCancelLoading(null);
    }
  };

  const handleSearchPatient = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setSearchLoading(true);
    setSearchResult(null);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    try {
      const response = await fetch(`/api/user/getProfile/${searchId.trim()}`, {
        method: "GET",
        headers: {
          "authorization": `${role.toLowerCase()} ${token}`
        }
      });
      const data = await response.json();
      if (response.ok || data.message === "Done") {
        setSearchResult(data.user);
      } else {
        alert(data.message || "لم يتم العثور على مريض بهذا الرقم");
      }
    } catch (err) {
      alert("خطأ في الاتصال بالسيرفر");
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchPatients = async (role, token) => {
    if (role.toLowerCase() !== "doctor") return;
    setPatientsLoading(true);
    try {
      const response = await fetch("/api/doctor/patients", {
        method: "GET",
        headers: {
          "authorization": `${role.toLowerCase()} ${token}`
        }
      });
      const data = await response.json();
      console.log("Doctor Patients Data:", data);
      if (response.ok || data.message === "Done") {
        const patientsList = data.patients || data.results || data.patient || data.data || (Array.isArray(data) ? data : []);
        setPatients(patientsList);
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setPatientsLoading(false);
    }
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          "authorization": `${role.toLowerCase()} ${token}`
        }
      });

      const data = await response.json();
      if (response.ok || data.message === "Done") {
        setUserData(data.user);
        setEditForm({
          fName: data.user.fName,
          lName: data.user.lName,
          address: data.user.address,
          phone: data.user.phone,
          specialization: data.user.specialization || "",
          price: data.user.price || ""
        });

        // جلب البيانات الإضافية بناءً على الدور
        if (role.toLowerCase() === "doctor") {
          fetchPatients(role, token);
        }
        fetchMyAppointments();
      } else {
        setError("فشل في جلب بيانات الملف الشخصي");
        if (response.status === 401) handleLogout();
      }
    } catch (err) {
      setError("خطأ في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // تجهيز البيانات الأساسية فقط التي يقبلها السيرفر غالباً في التعديل
    const payload = {
      fName: editForm.fName.trim(),
      lName: editForm.lName.trim(),
      address: editForm.address.trim(),
      phone: editForm.phone.trim(),
    };

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${role.toLowerCase()} ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok || data.message.includes("Done")) {
        setUserData(data.user);
        setIsEditing(false);
        alert("تم تحديث بياناتك بنجاح! ✨");
      } else {
        alert(data.message || "فشل تحديث البيانات");
      }
    } catch (err) {
      alert("خطأ في الاتصال بالسيرفر");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    setAppointmentLoading(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (role.toLowerCase() !== "doctor") return;

    try {
      const response = await fetch("/api/doctor/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `doctor ${token}`
        },
        body: JSON.stringify(appointmentForm)
      });

      const data = await response.json();
      if (response.ok || data.message === "Done") {
        alert("تم إضافة الموعد بنجاح! ✅");
        fetchAvailability(appointmentForm.date); // تحديث القائمة
        setAppointmentForm({ ...appointmentForm, start: "", end: "" });
      } else {
        alert(data.message || "فشل إضافة الموعد");
      }
    } catch (err) {
      alert("خطأ في الاتصال بالسيرفر");
    } finally {
      setAppointmentLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold">جاري تحميل بياناتك...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-red-100 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">عذراً، حدث خطأ</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <div className="space-y-3 relative z-[100]">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              إعادة المحاولة
            </button>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-center hover:bg-slate-200 transition-all cursor-pointer"
              >
                الرئيسية
              </Link>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="py-3 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-all cursor-pointer"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>

        {/* Logout Modal for Error State */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <LogOut className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">تأكيد تسجيل الخروج</h3>
              <p className="text-slate-500 font-bold mb-6 text-sm leading-relaxed">
                يرجى اختيار طريقة تسجيل الخروج المفضلة لديك لتأمين حسابك:
              </p>

              <div className="space-y-3">
                <button
                  disabled={logoutLoading}
                  onClick={() => handleLogout("current")}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-black text-base shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                >
                  {logoutLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                  تسجيل الخروج من هذا الجهاز فقط
                </button>

                <button
                  disabled={logoutLoading}
                  onClick={() => handleLogout("all")}
                  className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {logoutLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                  تسجيل الخروج من جميع الأجهزة الأخرى
                </button>

                <button
                  disabled={logoutLoading}
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all"
                >
                  إلغاء الأمر
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  const calculateWorkHoursTotal = (slots) => {
    if (!slots || slots.length === 0) return "0 ساعة";
    let totalMin = 0;
    slots.forEach(s => {
      if (!s.start || !s.end) return;
      const [sH, sM] = s.start.split(':').map(Number);
      const [eH, eM] = s.end.split(':').map(Number);
      const duration = (eH * 60 + eM) - (sH * 60 + sM);
      if (duration > 0) totalMin += duration;
    });
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    if (h === 0 && m === 0) return "0 ساعة";
    if (m === 0) return `${h} ساعة`;
    return `${h} س و ${m} د`;
  };

  return (
    <div className="min-h-screen bg-mesh py-12 md:py-20 px-4 relative overflow-hidden" dir="rtl">
      {/* Premium Full-Screen Sharp Medical Background for All Users */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Sharp clinical background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.25] scale-100 saturate-125"
          style={{ backgroundImage: `url('/background.png.png')` }}
        ></div>
        {/* Cyan/Blue Medical Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#e0f2fe]/40 via-white/5 to-[#ecfeff]/40 mix-blend-overlay"></div>
        {/* Ambient Light circles */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-300/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-300/20 rounded-full blur-[120px]"></div>
      </div>
      <UpdatePasswordModal
        isOpen={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
      />
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden p-8 text-center"
          >
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <LogOut className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">تأكيد تسجيل الخروج</h3>
            <p className="text-slate-500 font-bold mb-6 text-sm leading-relaxed">
              يرجى اختيار طريقة تسجيل الخروج المفضلة لديك لتأمين حسابك:
            </p>

            <div className="space-y-3">
              <button
                disabled={logoutLoading}
                onClick={() => handleLogout("current")}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-black text-base shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                {logoutLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                تسجيل الخروج من هذا الجهاز فقط
              </button>

              <button
                disabled={logoutLoading}
                onClick={() => handleLogout("all")}
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {logoutLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                تسجيل الخروج من جميع الأجهزة الأخرى
              </button>

              <button
                disabled={logoutLoading}
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all"
              >
                إلغاء الأمر
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <EditPatientModal
        isOpen={!!editingPatient}
        onClose={() => setEditingPatient(null)}
        patient={editingPatient}
        onUpdate={(updatedData) => {
          if (searchResult && searchResult._id === updatedData._id) {
            setSearchResult(updatedData);
          }
          setPatients(prev => prev.map(p => p._id === updatedData._id ? updatedData : p));
        }}
      />
      {userData.role?.toLowerCase() === "doctor" ? (
        <div id="doctor-dashboard" className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
          {/* ========================================================================= */}
          {/* ULTRA-PREMIUM DOCTOR BANNER (MATCHING THE USER'S MOCKUP)                  */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#0a1e3f] via-[#115293] to-cyan-900 text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/10 group"
          >
            {/* Animated Glow overlays */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700"></div>
            {/* Modern Medical Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.2)_1px,_transparent_0)] bg-[length:24px_24px]"></div>

            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative z-10">

              {/* Left Side: Welcome and brand details */}
              <div className="text-center md:text-right flex-1 space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest">
                  <HeartPulse className="w-5 h-5 animate-pulse" />
                  <span>منصة شفاء الطبية • SHEFAA MEDICAL</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                    أهلاً بك دكتور <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">{userData.fName} {userData.lName}</span>
                  </h1>
                  <p className="text-cyan-50 font-bold text-base md:text-lg max-w-2xl leading-relaxed">
                    مرحباً بك في لوحتك الاستشارية الذكية. هنا يمكنك إدارة المواعيد اليومية وعيادتك ومتابعة تحديث ملفات المرضى بكل دقة وسرعة.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-xs font-black border border-white/10 uppercase tracking-widest">
                    طبيب متخصص • {userData.specialization?.trim() || "الطب العام"}
                  </span>
                  <div className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 px-4 py-1.5 rounded-xl text-xs font-bold">
                    <Shield className="w-4 h-4" />
                    <span>حساب مؤكد</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-xl text-xs font-bold">
                    <User className="w-4 h-4 text-cyan-300" />
                    <span>الرقم التعريفي (ID): <code className="select-all text-cyan-200 font-black">{userData._id}</code></span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                  <button
                    onClick={() => {
                      document.getElementById("appointments-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 rounded-2xl font-black text-sm shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    عرض جدول اليوم
                  </button>
                  <div className="flex gap-2">
                    <Link
                      href="/"
                      className="px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      الرئيسية
                    </Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="px-5 py-4 bg-red-500/20 hover:bg-red-500/40 border border-red-500/20 rounded-2xl text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Stylized Doctor Avatar Framed with glowing teal ring */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center shrink-0">
                {/* Glow behind ring */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-2xl animate-pulse"></div>
                {/* Thick background ring */}
                <div className="absolute inset-0 rounded-full border-[12px] border-cyan-400/20 scale-95"></div>
                {/* Animated spinning segments for mechanical premium effect */}
                <div className="absolute inset-0 rounded-full border-[12px] border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-transparent rotate-45 animate-[spin_10s_linear_infinite] scale-95"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-b-cyan-300 border-l-cyan-300 border-t-transparent border-r-transparent -rotate-45 animate-[spin_15s_linear_infinite] scale-95"></div>

                {/* Main Image Frame with cyan border */}
                <div className="absolute inset-3 rounded-full border-[8px] border-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.5)] overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src={userData.gender?.toLowerCase() === "female" ? "/doctorgirl.png" : "/doctorman.png"}
                    alt="Doctor Profile"
                    className="w-full h-full object-cover scale-105 object-top hover:scale-120 transition-transform duration-500"
                  />
                </div>

                {/* Active Green Dot indicator */}
                <div className="absolute bottom-6 right-6 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
              </div>

            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* TWO-COLUMN GRID LAYOUT (CARDS ON THE LEFT SIDE AS REQUESTED)               */}
          {/* ========================================================================= */}
          <div className="relative rounded-[3.5rem] p-6 md:p-10 overflow-hidden border border-white/30 shadow-2xl bg-white/10 backdrop-blur-md">

            {/* Soft tint gradient overlay to blend nicely */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/10 via-white/5 to-blue-50/10 mix-blend-overlay pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">

              {/* ----------------------------------------------------------------------- */}
              {/* LEFT COLUMN: MANAGEMENT & INFO CARDS (lg:col-span-1)                    */}
              {/* ----------------------------------------------------------------------- */}
              <div className="lg:col-span-1 space-y-8 lg:order-1">

                {/* Card 1: Quick Stats Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-950/75 backdrop-blur-2xl text-white rounded-[2.5rem] p-8 shadow-2xl border border-white/10 relative overflow-hidden group hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                  <h3 className="text-xl font-black md:text-2xl mb-4 flex items-center gap-2 relative z-10">
                    <Activity className="text-cyan-400 w-5 h-5 animate-pulse" />
                    <span>إحصائيات سريعة</span>
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full mb-6 relative z-10"></div>
                  <div className="space-y-4 relative z-10">
                    <StatRow label="المرضى المتابعين" value={patients.length.toString()} />
                    <StatRow label="الحجوزات المؤكدة" value={myAppointments.length.toString()} />
                    <StatRow label="قيمة الكشف" value={`${userData.price || "0"} ج.م`} />
                  </div>
                </motion.div>

                {/* Card 2: Personal & Professional Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="flex justify-between items-center relative z-10">
                    <h3 className="text-xl font-black md:text-2xl text-slate-800 flex items-center gap-2.5">
                      <User className="text-primary w-5 h-5" />
                      <span>الملف المهني</span>
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full -mt-2"></div>
                    {!isEditing && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowUpdatePasswordModal(true)}
                          className="px-4 py-2 bg-slate-100 hover:bg-secondary text-slate-600 hover:text-white rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
                        >
                          تغيير كلمة المرور
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
                        >
                          تعديل البيانات
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-5 relative z-10">
                      <EditInput label="الاسم الأول" value={editForm.fName} onChange={(v) => setEditForm({ ...editForm, fName: v })} />
                      <EditInput label="اسم العائلة" value={editForm.lName} onChange={(v) => setEditForm({ ...editForm, lName: v })} />
                      <EditInput label="العنوان" value={editForm.address} onChange={(v) => setEditForm({ ...editForm, address: v })} />
                      <EditInput label="رقم الهاتف" value={editForm.phone} onChange={(v) => setEditForm({ ...editForm, phone: v })} />
                      <div className="flex gap-2 pt-4">
                        <button
                          type="submit"
                          disabled={updateLoading}
                          className="flex-1 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-xs shadow-md"
                        >
                          {updateLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "حفظ"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-xs"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4 relative z-10">
                      <InfoItem icon={<Shield />} label="الرقم التعريفي الخاص بك (ID)" value={userData._id} />
                      <InfoItem icon={<Stethoscope />} label="التخصص الحالي" value={userData.specialization?.trim()} />
                      <InfoItem icon={<DollarSign />} label="قيمة الكشف" value={`${userData.price} جنيه مصري`} />
                      <InfoItem icon={<Phone />} label="رقم الهاتف" value={userData.phone} />
                      <InfoItem icon={<Mail />} label="البريد الإلكتروني" value={userData.email} />
                      <InfoItem icon={<MapPin />} label="العنوان" value={userData.address} />
                    </div>
                  )}
                </motion.div>

                {/* Card 3: Quick Patient Search Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2.5 relative z-10">
                    <Search className="text-primary w-5 h-5" />
                    البحث السريع عن مريض
                  </h3>
                  <form onSubmit={handleSearchPatient} className="space-y-3 relative z-10">
                    <input
                      type="text"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="أدخل معرف المريض (ID)..."
                      className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-sm"
                    />
                    <button
                      disabled={searchLoading}
                      className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {searchLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-4 h-4" />}
                      بحث الآن
                    </button>
                  </form>

                  {searchResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-primary/10 shadow-inner space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-black text-slate-800 text-base">{searchResult.fName} {searchResult.lName}</h4>
                          <p className="text-slate-400 text-[10px] font-bold">ID: {searchResult._id}</p>
                        </div>
                        <button onClick={() => setSearchResult(null)} className="p-1 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-all cursor-pointer">
                          <LogOut className="w-4 h-4 rotate-180" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <SearchStat label="العمر" value={searchResult.age} />
                        <SearchStat label="فصيلة الدم" value={searchResult.blood} />
                      </div>
                      <button
                        onClick={() => setEditingPatient(searchResult)}
                        className="w-full py-2.5 bg-slate-100 hover:bg-primary hover:text-white rounded-xl font-bold text-xs text-slate-600 transition-all cursor-pointer"
                      >
                        تعديل الملف الطبي
                      </button>
                    </motion.div>
                  )}
                </motion.div>

                {/* Help Box */}
                <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10 text-center space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm">هل تحتاج لمساعدة؟</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">فريق دعم شفاء متواجد دائماً لمساعدتك في إدارة حسابك وعيادتك.</p>
                  <button className="text-primary font-bold text-xs hover:underline cursor-pointer">تحدث مع الدعم الفني</button>
                </div>

              </div>

              {/* ----------------------------------------------------------------------- */}
              {/* RIGHT COLUMN: WORKSPACE PANELS (lg:col-span-2)                           */}
              {/* ----------------------------------------------------------------------- */}
              <div className="lg:col-span-2 space-y-10 lg:order-2">

                {/* Panel 1: Clinic Appointments Scheduler */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-8 md:p-10 shadow-2xl border border-white hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-100 rounded-2xl">
                        <Calendar className="text-emerald-600 w-6 h-6" />
                      </div>
                      <span>إدارة مواعيد العيادة والجدول</span>
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mt-3"></div>
                  </div>

                  <form onSubmit={handleCreateAppointment} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 mr-2 uppercase tracking-wider">التاريخ</label>
                        <input
                          required
                          type="date"
                          value={appointmentForm.date}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                          className="w-full px-6 py-4 bg-white/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 focus:outline-none transition-all font-black text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 mr-2 uppercase tracking-wider">وقت البدء</label>
                        <input
                          required
                          type="time"
                          value={appointmentForm.start}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, start: e.target.value })}
                          className="w-full px-6 py-4 bg-white/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 focus:outline-none transition-all font-black text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 mr-2 uppercase tracking-wider">وقت الانتهاء</label>
                        <input
                          required
                          type="time"
                          value={appointmentForm.end}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, end: e.target.value })}
                          className="w-full px-6 py-4 bg-white/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 focus:outline-none transition-all font-black text-slate-800"
                        />
                      </div>
                    </div>
                    <button
                      disabled={appointmentLoading}
                      className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {appointmentLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
                      إضافة الموعد للجدول المتاح للجمهور
                    </button>
                  </form>

                  {/* Registered available slots list */}
                  <div className="mt-10 space-y-4">
                    <h4 className="text-base font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      المواعيد المسجلة المتاحة للحجز اليوم:
                    </h4>

                    {availLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      </div>
                    ) : availabilities.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {availabilities.map((avail, index) => (
                          <motion.div
                            whileHover={{ scale: 1.03, y: -2 }}
                            key={index}
                            className="p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-100 shadow-sm flex items-center justify-between hover:border-emerald-300 hover:shadow-lg transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                <Clock className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors">{avail.start} - {avail.end}</p>
                                <p className="text-[10px] text-slate-400 font-bold mt-0.5">{avail.date}</p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-black">
                              متاح
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white/30 backdrop-blur-md rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center p-8">
                        <Clock className="w-8 h-8 text-slate-300 mb-3" />
                        <p className="text-slate-500 font-bold text-sm">لا توجد مواعيد متاحة مسجلة بعد</p>
                        <p className="text-slate-400 text-xs mt-1">يرجى تحديد التاريخ والوقت أعلاه وإضافته للجدول.</p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Panel 2: Confirmed Appointments Booked with Me */}
                <motion.div
                  id="appointments-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-8 md:p-10 shadow-2xl border border-white hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-100 rounded-2xl">
                          <Calendar className="text-indigo-600 w-6 h-6" />
                        </div>
                        <span>الحجوزات المؤكدة مع المرضى</span>
                      </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-full mt-3"></div>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-2xl text-xs font-black">
                      {myAppointments.length} حجز مؤكد
                    </span>
                  </div>

                  {myAppLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                  ) : myAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {myAppointments.map((app) => (
                        <div key={app._id} className="p-6 rounded-3xl bg-white/50 border border-slate-100 hover:shadow-xl hover:bg-white/80 transition-all group relative overflow-hidden">
                          <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
                            <div className="flex gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">
                                <User className="w-7 h-7" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-black text-slate-800 text-lg">
                                  {app.patientId ? "المريض" : "المرافق"}: {app.patientId?.userName || app.companionId?.userName || "غير معروف"}
                                </h4>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 text-xs font-bold">
                                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {app.availableId?.start} - {app.availableId?.end}</span>
                                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {app.availableId?.date}</span>
                                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> {app.patientId?.phone || app.companionId?.phone || "غير متوفر"}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
                              <Badge label="العمر" value={app.patientId?.age || app.companionId?.age || "--"} color="bg-blue-100 text-blue-700" />
                              <Badge label="الحالة" value={app.patientId?.disease || app.companionId?.disease || "متابعة"} color="bg-emerald-100 text-emerald-700" />
                              
                              <button
                                type="button"
                                onClick={() => handleCancelAppointment(app)}
                                disabled={cancelLoading === (app._id || app.id)}
                                className="mr-auto lg:mr-4 px-4 py-2 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer z-50 relative"
                              >
                                {(cancelLoading === (app._id || app.id)) ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                                إلغاء
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/30 backdrop-blur-md rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center p-8">
                      <Calendar className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-slate-500 font-bold text-sm">سجل الحجوزات فارغ حالياً</p>
                      <p className="text-slate-400 text-xs mt-1">لم يتم حجز أي مواعيد معك من قبل المرضى حتى الآن.</p>
                    </div>
                  )}
                </motion.div>

                {/* Panel 3: Followed Patients and Medical Records */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-8 md:p-10 shadow-2xl border border-white hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                        <div className="p-2.5 bg-purple-100 rounded-2xl">
                          <Users className="text-purple-600 w-6 h-6" />
                        </div>
                        <span>سجل المرضى المتابعين والحالات</span>
                      </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full mt-3"></div>
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-2xl text-xs font-black">
                      {patients.length} حالة مسجلة
                    </span>
                  </div>

                  {patientsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                  ) : patients.length > 0 ? (
                    <div className="space-y-4">
                      {patients.map((patient) => (
                        <motion.div
                          whileHover={{ y: -2 }}
                          key={patient._id}
                          className="p-6 rounded-3xl bg-white/50 border border-slate-100 hover:shadow-lg hover:bg-white/80 transition-all group relative overflow-hidden"
                        >
                          <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
                            <div className="flex gap-4 items-center">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary shrink-0">
                                <User className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="font-black text-slate-800 text-lg mb-0.5">{patient.fName} {patient.lName}</h4>
                                <p className="text-slate-400 text-xs font-bold flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5" /> {patient.phone}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto justify-end">
                              <Badge label="العمر" value={patient.age ? `${patient.age} سنة` : "غير محدد"} color="bg-blue-50 text-blue-600" />
                              <Badge label="فصيلة" value={patient.blood || "غير محدد"} color="bg-red-50 text-red-600" />
                              <Badge label="التشخيص" value={patient.disease || "سليم"} color="bg-purple-50 text-purple-600" />
                              <button
                                onClick={() => setEditingPatient(patient)}
                                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Activity className="w-3.5 h-3.5" />
                                تحديث الملف
                              </button>
                            </div>
                          </div>

                          {patient.currentMedication && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
                                <HeartPulse className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-[10px] text-blue-500 font-black uppercase mb-0.5">الخطة العلاجية الحالية:</p>
                                  <p className="text-slate-700 font-bold text-xs leading-relaxed">{patient.currentMedication}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/30 backdrop-blur-md rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center p-8">
                      <Users className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-slate-500 font-bold text-sm">سجل المرضى المتابعين فارغ</p>
                      <p className="text-slate-400 text-xs mt-1">لا توجد حالات مسجلة تحت متابعتك في الوقت الحالي.</p>
                    </div>
                  )}
                </motion.div>

              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#0a1e3f] via-[#115293] to-cyan-900 text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/10 group mb-12"
          >
            {/* Animated Glow overlays */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700"></div>
            {/* Modern Medical Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.2)_1px,_transparent_0)] bg-[length:24px_24px]"></div>

            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative z-10">

              {/* Left Side: Welcome and brand details */}
              <div className="text-center md:text-right flex-1 space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest">
                  <HeartPulse className="w-5 h-5 animate-pulse" />
                  <span>منصة شفاء الطبية • SHEFAA MEDICAL</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                    أهلاً بك <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">{userData.fName} {userData.lName}</span>
                  </h1>
                  <p className="text-cyan-50 font-bold text-base md:text-lg max-w-2xl leading-relaxed">
                    {userData.role?.toLowerCase() === "companion" ?
                      "مرحباً بك في لوحتك الاستشارية الخاصة بالمرافق. هنا يمكنك مراجعة المواعيد ومتابعة ملفات المرضى الذين تقوم بمرافقتهم بكل دقة وسهولة." :
                      "مرحباً بك في ملفك الطبي الذكي. هنا يمكنك حجز مواعيد العيادات، مراجعة استشاراتك الطبية، ومتابعة جدولك الزمني وصحتك بكل سهولة."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-xs font-black border border-white/10 uppercase tracking-widest">
                    {userData.role?.toLowerCase() === "companion" ? "مرافق معتمد" : "مريض مسجل"}
                  </span>
                  <div className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 px-4 py-1.5 rounded-xl text-xs font-bold">
                    <Shield className="w-4 h-4" />
                    <span>معرف: <code className="select-all">{userData._id}</code></span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Link
                      href="/"
                      className="px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      الرئيسية
                    </Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="px-5 py-4 bg-red-500/20 hover:bg-red-500/40 border border-red-500/20 rounded-2xl text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Stylized Avatar Framed with glowing teal ring */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center shrink-0">
                {/* Glow behind ring */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-2xl animate-pulse"></div>
                {/* Thick background ring */}
                <div className="absolute inset-0 rounded-full border-[12px] border-cyan-400/20 scale-95"></div>
                {/* Animated spinning segments */}
                <div className="absolute inset-0 rounded-full border-[12px] border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-transparent rotate-45 animate-[spin_10s_linear_infinite] scale-95"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-b-cyan-300 border-l-cyan-300 border-t-transparent border-r-transparent -rotate-45 animate-[spin_15s_linear_infinite] scale-95"></div>

                {/* Main Image Frame with cyan border */}
                <div className="absolute inset-3 rounded-full border-[8px] border-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.5)] overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src={userData.gender?.toLowerCase() === "female" ? "/person2.png" : "/person1.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover scale-105 object-top hover:scale-120 transition-transform duration-500"
                  />
                </div>
                {/* Active Green Dot indicator */}
                <div className="absolute bottom-6 right-6 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
              </div>

            </div>
          </motion.div>

          {/* Detailed Stats & Info */}
          <div className="relative rounded-[3.5rem] p-6 md:p-10 overflow-hidden border border-white/30 shadow-2xl bg-white/10 backdrop-blur-md">
            {/* Soft tint gradient overlay to blend nicely */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/10 via-white/5 to-blue-50/10 mix-blend-overlay pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

              {/* Main Info Column */}
              <div className="md:col-span-2 space-y-10">

                {/* Search Patient Section for Doctors & Companions */}
                {(userData.role?.toLowerCase() === "doctor" || userData.role?.toLowerCase() === "companion") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-10 border border-white shadow-2xl relative overflow-hidden group hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                    <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 relative z-10">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <Search className="text-primary w-6 h-6" />
                      </div>
                      البحث السريع عن مريض
                    </h3>
                    <form onSubmit={handleSearchPatient} className="flex flex-col sm:flex-row gap-4 relative z-10">
                      <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="أدخل الرقم التعريفي (ID)..."
                        className="flex-1 px-8 py-6 bg-white/50 backdrop-blur-md border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:outline-none transition-all font-bold text-xl"
                      />
                      <button
                        disabled={searchLoading}
                        className="px-10 py-5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
                      >
                        {searchLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
                        بحث الآن
                      </button>
                    </form>

                    {searchResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 bg-gradient-to-br from-white to-slate-50/50 p-8 rounded-[2.5rem] border border-primary/10 shadow-inner relative z-10"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-5 items-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
                              <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div>
                              <h4 className="font-black text-slate-800 text-xl">{searchResult.fName} {searchResult.lName}</h4>
                              <p className="text-slate-400 text-sm font-bold tracking-widest">ID: {searchResult._id}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingPatient(searchResult)}
                              className="px-4 py-2 bg-slate-100 hover:bg-primary hover:text-white rounded-xl font-bold text-xs text-slate-600 transition-all shadow-sm"
                            >
                              تعديل الملف الطبي
                            </button>
                            <button onClick={() => setSearchResult(null)} className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-xl transition-all">
                              <LogOut className="w-6 h-6 rotate-180" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <SearchStat label="العمر" value={searchResult.age} />
                          <SearchStat label="فصيلة الدم" value={searchResult.blood} />
                          <SearchStat label="الحالة" value={searchResult.disease} />
                          <SearchStat label="الهاتف" value={searchResult.phone} />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {(userData.role?.toLowerCase() === "patient" || userData.role?.toLowerCase() === "companion") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl border border-white"
                  >
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-xl">
                          <Calendar className="text-blue-600 w-6 h-6" />
                        </div>
                        مواعيدي المحجوزة
                      </h3>
                      <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-2xl text-sm font-black shadow-sm">
                        {myAppointments.length} موعد قادم
                      </span>
                    </div>

                    {myAppLoading ? (
                      <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                      </div>
                    ) : myAppointments.length > 0 ? (
                      <div className="space-y-6">
                        {myAppointments.map((app) => (
                          <div key={app._id} className="p-8 rounded-[2.5rem] bg-white/40 border border-white shadow-sm hover:shadow-xl hover:bg-white/60 transition-all group relative overflow-hidden">
                            <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
                              <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">
                                  <Stethoscope className="w-8 h-8" />
                                </div>
                                <div>
                                  <h4 className="font-black text-slate-800 text-xl mb-1">د. {app.doctorId?.userName || "طبيب"}</h4>
                                  <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {app.availableId?.start} - {app.availableId?.end}
                                  </p>
                                  <p className="text-slate-400 text-sm font-bold flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4" /> {app.availableId?.date}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => handleCancelAppointment(app)}
                                  disabled={cancelLoading === (app._id || app.id)}
                                  className="relative z-50 cursor-pointer px-6 py-3 bg-red-50 text-red-500 rounded-xl font-black text-sm hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center gap-2"
                                >
                                  {(cancelLoading === (app._id || app.id)) ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                                  إلغاء الحجز
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">لا توجد لديك مواعيد محجوزة حالياً.</p>
                        <Link href="/#doctors" className="inline-block mt-4 text-primary font-bold hover:underline">ابحث عن طبيب واحجز الآن</Link>
                      </div>
                    )}
                  </motion.div>
                )}

                {userData.role?.toLowerCase() === "doctor" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl border border-white"
                  >
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-xl">
                          <Calendar className="text-indigo-600 w-6 h-6" />
                        </div>
                        الحجوزات التي تمت معي
                      </h3>
                      <span className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-2xl text-sm font-black shadow-sm">
                        {myAppointments.length} حجز مؤكد
                      </span>
                    </div>

                    {myAppLoading ? (
                      <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                      </div>
                    ) : myAppointments.length > 0 ? (
                      <div className="space-y-6">
                        {myAppointments.map((app) => (
                          <div key={app._id} className="p-8 rounded-[2.5rem] bg-white/40 border border-white shadow-sm hover:shadow-xl hover:bg-white/60 transition-all group relative overflow-hidden">
                            <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
                              <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">
                                  <User className="w-8 h-8" />
                                </div>
                                <div>
                                  <h4 className="font-black text-slate-800 text-xl mb-1">
                                    {app.patientId ? "المريض" : "المرافق"}: {app.patientId?.userName || app.companionId?.userName || "غير معروف"}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                                    <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-primary" /> {app.availableId?.start} - {app.availableId?.end}
                                    </p>
                                    <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-primary" /> {app.availableId?.date}
                                    </p>
                                    <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                                      <Phone className="w-4 h-4 text-primary" /> {app.patientId?.phone || app.companionId?.phone || "غير متوفر"}
                                    </p>
                                  </div>

                                  {/* تفاصيل طبية إضافية */}
                                  <div className="flex flex-wrap gap-3 mt-4">
                                    <Badge label="العمر" value={app.patientId?.age || app.companionId?.age || "--"} color="bg-blue-100 text-blue-700" />
                                    <Badge label="فصيلة" value={app.patientId?.blood || app.companionId?.blood || "--"} color="bg-red-100 text-red-700" />
                                    <Badge label="الحالة" value={app.patientId?.disease || app.companionId?.disease || "متابعة عامة"} color="bg-emerald-100 text-emerald-700" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col justify-center items-end gap-3">
                                <div>
                                  <span className="text-xs font-black text-slate-400 mb-1 uppercase block text-left">الدور المحجوز</span>
                                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 rounded-lg text-[10px] font-black border border-indigo-500/20">
                                    {app.patientId ? "مريض" : "مرافق"}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCancelAppointment(app)}
                                  disabled={cancelLoading === (app._id || app.id)}
                                  className="px-4 py-2 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer z-50 relative"
                                >
                                  {(cancelLoading === (app._id || app.id)) ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                                  إلغاء الموعد
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-white/20 backdrop-blur-md rounded-[2.5rem] border border-white/30 shadow-inner flex flex-col items-center justify-center p-8">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-4 shadow-sm animate-bounce">
                          <Calendar className="w-8 h-8" />
                        </div>
                        <p className="text-slate-600 font-extrabold text-lg">جدول الحجوزات فارغ</p>
                        <p className="text-slate-400 text-sm font-bold mt-1">لم يتم حجز أي مواعيد معك من قبل المرضى حتى الآن.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl border border-white"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                      <div className="p-2 bg-secondary/10 rounded-xl">
                        <User className="text-secondary w-6 h-6" />
                      </div>
                      المعلومات الأساسية
                    </h3>
                    {!isEditing && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowUpdatePasswordModal(true)}
                          className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-black text-sm hover:bg-secondary hover:text-white transition-all shadow-sm"
                        >
                          تغيير كلمة المرور
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          تعديل البيانات
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <EditInput label="الاسم الأول" value={editForm.fName} onChange={(v) => setEditForm({ ...editForm, fName: v })} />
                        <EditInput label="اسم العائلة" value={editForm.lName} onChange={(v) => setEditForm({ ...editForm, lName: v })} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <EditInput label="العنوان" value={editForm.address} onChange={(v) => setEditForm({ ...editForm, address: v })} />
                        <EditInput label="رقم الهاتف" value={editForm.phone} onChange={(v) => setEditForm({ ...editForm, phone: v })} />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <button
                          type="submit"
                          disabled={updateLoading}
                          className="flex-1 py-5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          {updateLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "حفظ التغييرات الجديدة"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-10 py-5 bg-slate-100 text-slate-500 rounded-[2rem] font-black hover:bg-slate-200 transition-all"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <InfoItem icon={<Shield />} label="الرقم التعريفي الخاص بك (ID)" value={userData._id} />
                      <InfoItem icon={<Phone />} label="رقم الهاتف" value={userData.phone} />
                      <InfoItem icon={<MapPin />} label="العنوان" value={userData.address} />
                      <InfoItem icon={<Calendar />} label="تاريخ الانضمام" value={new Date(userData.createdAt).toLocaleDateString("ar-EG")} />
                      <InfoItem icon={<Shield />} label="حالة الحساب" value={userData.confirmed ? "نشط ومؤكد" : "غير مؤكد"} color="text-green-500" />

                      {userData.role?.toLowerCase() === "doctor" && (
                        <>
                          <InfoItem icon={<Stethoscope />} label="التخصص الحالي" value={userData.specialization?.trim()} />
                          <InfoItem icon={<DollarSign />} label="قيمة الكشف" value={`${userData.price} جنيه مصري`} />
                        </>
                      )}

                      {(userData.role?.toLowerCase() === "patient" || userData.role?.toLowerCase() === "companion") && (
                        <>
                          <InfoItem icon={<User />} label="العمر" value={userData.age ? `${userData.age} سنة` : "غير حدد"} />
                          <InfoItem icon={<User />} label="الجنس" value={userData.gender === "male" ? "ذكر" : userData.gender === "female" ? "أنثى" : userData.gender || "غير محدد"} />
                        </>
                      )}

                      {userData.email && (
                        <InfoItem icon={<Mail />} label="البريد الإلكتروني" value={userData.email} />
                      )}

                      {userData.patientId && (
                        <InfoItem icon={<User />} label="المريض المرافق له" value={typeof userData.patientId === 'object' ? `${userData.patientId.fName || ''} ${userData.patientId.lName || ''}`.trim() : userData.patientId} />
                      )}

                      {userData.doctorId && (
                        <InfoItem icon={<Stethoscope />} label="الطبيب المتابع" value={typeof userData.doctorId === 'object' ? `د. ${userData.doctorId.fName || ''} ${userData.doctorId.lName || ''}`.trim() : `ID: ${userData.doctorId}`} />
                      )}

                      {userData.companionId && (
                        <InfoItem icon={<Users />} label="المرافق الخاص" value={typeof userData.companionId === 'object' ? `${userData.companionId.fName || ''} ${userData.companionId.lName || ''}`.trim() : `ID: ${userData.companionId}`} />
                      )}

                      {userData.role?.toLowerCase() === "companion" && (
                        <>
                          <InfoItem
                            icon={<Heart />}
                            label="صلة القرابة بالمريض"
                            value={
                              userData.relationPatient === "sister" ? "أخت" :
                                userData.relationPatient === "brother" ? "أخ" :
                                  userData.relationPatient === "father" ? "أب" :
                                    userData.relationPatient === "mother" ? "أم" :
                                      userData.relationPatient === "husband" ? "زوج" :
                                        userData.relationPatient === "wife" ? "زوجة" :
                                          userData.relationPatient === "friend" ? "صديق" :
                                            userData.relationPatient || "غير محدد"
                            }
                          />
                          <InfoItem
                            icon={<Award />}
                            label="مستوى الخبرة"
                            value={
                              userData.experienceLevel === "junior" ? "مبتدئ (Junior)" :
                                userData.experienceLevel === "mid-level" ? "متوسط الخبرة (Mid-level)" :
                                  userData.experienceLevel === "senior" ? "خبير (Senior)" :
                                    userData.experienceLevel || "غير محدد"
                            }
                          />
                        </>
                      )}

                      {userData.role?.toLowerCase() === "patient" && (
                        <>
                          <InfoItem icon={<Droplet />} label="فصيلة الدم" value={userData.blood || "غير محدد"} />
                          <InfoItem icon={<HeartPulse />} label="الحالة الصحية" value={userData.disease || "لا توجد"} />
                          <InfoItem icon={<Activity />} label="الخطة العلاجية الحالية" value={userData.currentMedication || "لا توجد"} />
                        </>
                      )}
                    </div>
                  )}
                </motion.div>

                {userData.role?.toLowerCase() === "doctor" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl border border-white"
                  >
                    <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-xl">
                        <Calendar className="text-emerald-600 w-6 h-6" />
                      </div>
                      إدارة مواعيد العيادة
                    </h3>

                    <form onSubmit={handleCreateAppointment} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-500 mr-2 uppercase tracking-wider">التاريخ</label>
                          <input
                            required
                            type="date"
                            value={appointmentForm.date}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                            className="w-full px-6 py-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-500 mr-2 uppercase tracking-wider">وقت البدء</label>
                          <input
                            required
                            type="time"
                            value={appointmentForm.start}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, start: e.target.value })}
                            className="w-full px-6 py-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-500 mr-2 uppercase tracking-wider">وقت الانتهاء</label>
                          <input
                            required
                            type="time"
                            value={appointmentForm.end}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, end: e.target.value })}
                            className="w-full px-6 py-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 focus:outline-none transition-all font-black text-slate-800 shadow-inner"
                          />
                        </div>
                      </div>
                      <button
                        disabled={appointmentLoading}
                        className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
                      >
                        {appointmentLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
                        إضافة الموعد للجدول
                      </button>
                    </form>

                    {/* عرض المواعيد المضافة */}
                    <div className="mt-12 space-y-4">
                      <h4 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        المواعيد المسجلة لهذا اليوم:
                      </h4>

                      {availLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                      ) : availabilities.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {availabilities.map((avail, index) => (
                            <motion.div
                              whileHover={{ scale: 1.03, y: -2 }}
                              key={index}
                              className="p-5 rounded-2xl bg-gradient-to-br from-white/85 to-slate-50/50 backdrop-blur-md border border-slate-100/80 shadow-sm flex items-center justify-between hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                  <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                  <p className="text-base font-black text-slate-800 group-hover:text-emerald-700 transition-colors">{avail.start} - {avail.end}</p>
                                  <p className="text-[11px] text-slate-400 font-bold mt-0.5">{avail.date}</p>
                                </div>
                              </div>
                              <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300">
                                متاح للحجز
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 bg-white/20 backdrop-blur-md rounded-[2.5rem] border border-white/30 shadow-inner flex flex-col items-center justify-center p-8">
                          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 shadow-sm animate-bounce">
                            <Clock className="w-8 h-8" />
                          </div>
                          <p className="text-slate-600 font-extrabold text-lg">لا توجد مواعيد مسجلة</p>
                          <p className="text-slate-400 text-sm font-bold mt-1">يرجى تحديد التاريخ والوقت بالأعلى وإضافته لجدول العيادة.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {userData.role?.toLowerCase() === "doctor" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card bg-white/30 border-white/50 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl border border-white"
                  >
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-xl">
                          <Users className="text-purple-600 w-6 h-6" />
                        </div>
                        سجل المرضى المتابعين
                      </h3>
                      <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-2xl text-sm font-black shadow-sm">
                        {patients.length} حالة مسجلة
                      </span>
                    </div>

                    {patientsLoading ? (
                      <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                      </div>
                    ) : patients.length > 0 ? (
                      <div className="space-y-6">
                        {patients.map((patient) => (
                          <motion.div
                            whileHover={{ y: -4, scale: 1.01 }}
                            key={patient._id}
                            className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/70 via-white/50 to-slate-50/30 backdrop-blur-md border border-slate-100/80 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 hover:bg-white/90 transition-all group relative overflow-hidden"
                          >
                            {/* Interactive light trails */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500"></div>

                            <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
                              <div className="flex gap-6 items-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                                  <User className="w-8 h-8" />
                                </div>
                                <div>
                                  <h4 className="font-black text-slate-800 text-2xl mb-1.5 group-hover:text-primary transition-colors">{patient.fName} {patient.lName}</h4>
                                  <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" /> {patient.phone}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-3 items-center">
                                <Badge label="العمر" value={patient.age ? `${patient.age} سنة` : "غير محدد"} color="bg-blue-50 text-blue-600 border border-blue-100" />
                                <Badge label="فصيلة" value={patient.blood || "غير محدد"} color="bg-red-50 text-red-600 border border-red-100" />
                                <Badge label="التشخيص" value={patient.disease || "سليم"} color="bg-purple-50 text-purple-600 border border-purple-100" />
                                <button
                                  onClick={() => setEditingPatient(patient)}
                                  className="px-5 py-2 bg-slate-100 hover:bg-primary hover:text-white rounded-xl font-black text-xs text-slate-600 transition-all border border-slate-200/50 flex items-center gap-1.5 hover:shadow-lg hover:shadow-primary/20"
                                >
                                  <Activity className="w-4 h-4" />
                                  <span>تحديث الملف</span>
                                </button>
                              </div>
                            </div>

                            {patient.currentMedication && (
                              <div className="mt-6 pt-6 border-t border-slate-100 relative z-10">
                                <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100/30 flex items-start gap-4 hover:bg-blue-50/60 transition-colors">
                                  <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl shrink-0 mt-0.5">
                                    <HeartPulse className="w-5 h-5 animate-pulse" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-blue-500 font-black mb-1 uppercase tracking-widest">الخطة العلاجية الحالية والأدوية:</p>
                                    <p className="text-slate-700 font-bold leading-relaxed text-sm">{patient.currentMedication}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-white/20 backdrop-blur-md rounded-[2.5rem] border border-white/30 shadow-inner flex flex-col items-center justify-center p-8">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 shadow-sm animate-bounce">
                          <Users className="w-8 h-8" />
                        </div>
                        <p className="text-slate-600 font-extrabold text-lg">سجل المرضى فارغ</p>
                        <p className="text-slate-400 text-sm font-bold mt-1">لا توجد حالات مسجلة تحت متابعتك في الوقت الحالي.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {userData.role?.toLowerCase() === "doctor" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-slate-900/85 to-slate-950/90 backdrop-blur-xl rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden group"
                  >
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/35 transition-all duration-500"></div>
                    <h3 className="text-xl font-black mb-6 relative z-10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      إحصائيات سريعة
                    </h3>
                    <div className="space-y-6">
                      <StatRow label="عدد المراجعات" value="0" />
                      <StatRow label="المواعيد القادمة" value={userData.role?.toLowerCase() === "doctor" ? "0" : myAppointments.length.toString()} />
                      <StatRow label="المرضى المسجلين" value={patients.length.toString()} />
                    </div>
                  </motion.div>
                )}

                <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                  <h4 className="font-bold text-slate-800 mb-4">هل تحتاج لمساعدة؟</h4>
                  <p className="text-slate-500 text-sm mb-4">فريق دعم شفاء متواجد دائماً لمساعدتك في إدارة حسابك.</p>
                  <button className="text-primary font-bold text-sm hover:underline">تحدث مع الدعم الفني</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditInput({ label, value, onChange, type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-400 mr-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all font-bold text-slate-700"
      />
    </div>
  );
}
function SearchStat({ label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-4 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm hover:border-green-300 transition-all duration-300"
    >
      <p className="text-[10px] text-slate-400 font-extrabold mb-1 uppercase tracking-widest">{label}</p>
      <p className="text-slate-800 font-black text-base">{value || "---"}</p>
    </motion.div>
  );
}

function InfoItem({ icon, label, value, color = "text-slate-800" }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 hover:border-primary/30 hover:bg-white/60 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-slate-400 font-extrabold mb-1 tracking-wider uppercase">{label}</p>
        <p className={`font-black text-sm md:text-base ${color}`}>{value || "---"}</p>
      </div>
    </motion.div>
  );
}

function StatRow({ label, value }) {
  return (
    <motion.div
      whileHover={{ x: -4 }}
      className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group/stat cursor-pointer"
    >
      <span className="text-slate-300 text-sm font-bold group-hover/stat:text-white transition-colors">{label}</span>
      <span className="text-2xl font-black text-primary group-hover/stat:scale-110 transition-transform">{value}</span>
    </motion.div>
  );
}

function Badge({ label, value, color }) {
  return (
    <div className={`px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 border border-white/10 shadow-sm ${color}`}>
      <span className="opacity-60">{label}:</span>
      <span>{value || "---"}</span>
    </div>
  );
}

