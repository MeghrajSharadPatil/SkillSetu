import React from "react";
import { OfficialProfile } from "../types";
import { 
  X, 
  User, 
  Mail, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Award, 
  Clock, 
  LogOut, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRightLeft,
  ChevronRight,
  Target
} from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OfficialProfile;
  profiles: OfficialProfile[];
  onSelectProfile: (profile: OfficialProfile) => void;
  onSignOut: () => void;
  language: "en" | "hi";
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  profiles,
  onSelectProfile,
  onSignOut,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with National Theme */}
        <div className="bg-gradient-to-r from-[#0B4F9C] to-[#133054] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-[#0B4F9C] flex items-center justify-center font-black text-2xl shadow-md border-2 border-amber-400 shrink-0">
              {profile.name.split(" ")[1]?.[0] || profile.name[0] || "U"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  {profile.cadre}
                </span>
                <span className="text-xs text-white/80 font-mono">
                  ID: {profile.karmayogiId}
                </span>
              </div>
              <h3 className="text-xl font-extrabold">{profile.name}</h3>
              <p className="text-xs text-white/90">{profile.designation}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics / Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Training</span>
              </div>
              <div className="text-base font-black text-slate-900 mt-1">
                {profile.completedHours}/{profile.allocatedHours} <span className="text-xs font-normal text-slate-500">hrs</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                {Math.round((profile.completedHours / profile.allocatedHours) * 100)}% Completed
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Certificates</span>
              </div>
              <div className="text-base font-black text-slate-900 mt-1">
                {profile.certificatesEarned}
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                iGOT Verified
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs font-medium">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>Experience</span>
              </div>
              <div className="text-base font-black text-slate-900 mt-1">
                {profile.experienceYears} <span className="text-xs font-normal text-slate-500">yrs</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                MoSPI Cadre
              </div>
            </div>
          </div>

          {/* Official Information Details */}
          <div className="space-y-3 bg-slate-50/70 border border-slate-200 rounded-xl p-4 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#0B4F9C]" />
              Official Cadre & Deployment Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-slate-500 block text-[11px]">Email Address</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {profile.email}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Ministry</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {profile.ministry}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Department / Division</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {profile.department}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Current Assignment</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {profile.currentAssignment}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Academic Qualifications</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  {profile.education}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Next Cadre Benchmark</span>
                <span className="font-semibold text-[#0B4F9C] flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {profile.targetRole}
                </span>
              </div>
            </div>
          </div>

          {/* Switch Profile Persona (Convenience for Demonstration) */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
                Switch Cadre Officer Account:
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                {profiles.length} Profiles Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {profiles.map((p) => {
                const isCurrent = p.id === profile.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectProfile(p)}
                    className={`p-2 rounded-lg text-left text-xs border transition flex items-center justify-between cursor-pointer ${
                      isCurrent
                        ? "bg-blue-50 border-[#0B4F9C] text-[#0B4F9C] font-bold"
                        : "bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="truncate font-medium">{p.name}</div>
                      <div className="text-[10px] text-slate-500">{p.designation.split("(")[0].trim()}</div>
                    </div>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-[#0B4F9C] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out of Portal
          </button>

          <button
            onClick={onClose}
            className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
