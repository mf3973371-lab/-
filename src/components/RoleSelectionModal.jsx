"use client";

import { motion } from "framer-motion";
import { Stethoscope, User, Users, ArrowRight, X } from "lucide-react";

export default function RoleSelectionModal({ isOpen, onSelect, onClose }) {
  if (!isOpen) return null;

  const roles = [
    { id: "Doctor", label: "طبيب", icon: <Stethoscope className="w-6 h-6" />, desc: "لتقديم الرعاية الطبية وإدارة مواعيدك" },
    { id: "Patient", label: "مريض", icon: <User className="w-6 h-6" />, desc: "لحجز المواعيد ومتابعة حالتك الصحية" },
    { id: "Companion", label: "مرافق مريض", icon: <Users className="w-6 h-6" />, desc: "لمساعدة المرضى في إدارة رحلتهم العلاجية" }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute left-6 top-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">من أنت؟</h3>
          <p className="text-slate-500">اختر نوع حسابك للمتابعة مع جوجل</p>
        </div>

        <div className="space-y-4">
          {roles.map(item => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="w-full flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/50 hover:bg-white hover:shadow-xl transition-all group text-right"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-slate-800">{item.label}</h4>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
