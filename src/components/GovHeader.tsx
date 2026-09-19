import React from "react";
import { OfficialProfile } from "../types";
import { UserCheck, ShieldCheck, Globe, Volume2, Search, ArrowRightLeft } from "lucide-react";

interface GovHeaderProps {
  currentProfile: OfficialProfile;
  profiles: OfficialProfile[];
  onSelectProfile: (profile: OfficialProfile) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fontSize: "sm" | "md" | "lg";
  setFontSize: (size: "sm" | "md" | "lg") => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  onOpenSahayak: () => void;
}

export const GovHeader: React.FC<GovHeaderProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  activeTab,
  setActiveTab,
  fontSize,
  setFontSize,
  language,
  setLanguage,
  onOpenSahayak,
}) => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      {/* 1. Tricolor Accent Line */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* 2. Top Accessibility & Official Gov Bar */}
      <div className="bg-[#0b2545] text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="font-semibold tracking-wide text-amber-400">
            {language === "hi" ? "भारत सरकार" : "GOVERNMENT OF INDIA"}
          </span>
          <span className="text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">
            {language === "hi"
              ? "सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI)"
              : "Ministry of Statistics & Programme Implementation (MoSPI)"}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Screen Reader & Text Sizing */}
          <div className="hidden sm:flex items-center space-x-2 text-slate-300 border-r border-slate-700 pr-3">
            <span className="text-[11px] flex items-center gap-1 text-slate-400">
              <Volume2 className="w-3.5 h-3.5" />
              Screen Reader
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px]">Font:</span>
            <button
              onClick={() => setFontSize("sm")}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                fontSize === "sm" ? "bg-amber-500 text-slate-900" : "hover:text-white"
              }`}
              title="Small Text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("md")}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                fontSize === "md" ? "bg-amber-500 text-slate-900" : "hover:text-white"
              }`}
              title="Standard Text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                fontSize === "lg" ? "bg-amber-500 text-slate-900" : "hover:text-white"
              }`}
              title="Large Text"
            >
              A+
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700 transition"
            >
              {language === "en" ? "हिन्दी (HI)" : "English (EN)"}
            </button>
          </div>

          {/* Profile Quick Switcher (For Demo & Verification) */}
          <div className="flex items-center space-x-1.5 bg-slate-800/90 rounded px-2 py-0.5 border border-slate-700 text-[11px]">
            <span className="text-slate-400 hidden lg:inline">Cadre Officer:</span>
            <select
              value={currentProfile.id}
              onChange={(e) => {
                const found = profiles.find((p) => p.id === e.target.value);
                if (found) onSelectProfile(found);
              }}
              className="bg-transparent text-amber-200 text-xs font-medium focus:outline-none cursor-pointer pr-1"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name} ({p.designation.split("(")[0].trim()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Brand & Identity Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Ashoka Emblem + MoSPI / NSSTA Branding */}
        <div className="flex items-center space-x-4">
          {/* Ashoka Emblem Vector representation */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center p-1 bg-amber-50/50 rounded-lg border border-amber-200/60">
            <svg
              className="w-10 h-12 text-[#133054]"
              viewBox="0 0 24 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ashoka Stambha Lion & Chakra stylized silhouette */}
              <circle cx="12" cy="5" r="3.5" fill="#133054" />
              <path d="M8 8.5C8 7.5 16 7.5 16 8.5V11H8V8.5Z" fill="#133054" />
              <rect x="7" y="11" width="10" height="5" rx="1" fill="#c2410c" />
              <circle cx="12" cy="19" r="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="0.8" />
              <path d="M6 24C6 22.5 18 22.5 18 24V26H6V24Z" fill="#133054" />
              <text x="12" y="27.5" fontSize="2.8" textAnchor="middle" fill="#0b2545" fontWeight="bold">
                सत्यमेव जयते
              </text>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest bg-amber-100/80 px-2 py-0.5 rounded">
                {language === "hi" ? "सांख्यिकी उत्कृष्टता मंच" : "Statistical Skill Intelligence"}
              </span>
              <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                NSSTA & MoSPI
              </span>
            </div>
            <h1 id="app-title-heading" className="text-xl sm:text-2xl font-extrabold text-[#0B4F9C] tracking-tight leading-tight">
              {language === "hi" ? "स्किलसेतु" : "SkillSetu"}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              {language === "hi"
                ? "राष्ट्रीय सांख्यिकी प्रणाली प्रशिक्षण अकादमी (NSSTA) एवं iGOT कर्मयोगी एकीकरण"
                : "National Statistical Systems Training Academy & iGOT Karmayogi Ecosystem"}
            </p>
          </div>
        </div>

        {/* Right: Karmayogi Bharat Branding & Logged-in Officer Pill */}
        <div className="flex items-center space-x-4">
          {/* Karmayogi Bharat Emblem Tag */}
          <div className="hidden lg:flex items-center space-x-2.5 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              क
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">कर्मयोगी भारत</div>
              <div className="text-[10px] text-amber-800 font-serif italic">लोकहितं मम करणीयम्</div>
            </div>
          </div>

          {/* Active Officer Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center space-x-3 text-left shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#0B4F9C] text-white flex items-center justify-center font-bold text-sm shadow-inner">
              {currentProfile.name.split(" ")[1]?.[0] || "O"}
            </div>
            <div className="text-xs leading-tight">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                {currentProfile.name}
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <div className="text-slate-600 text-[11px] font-medium">{currentProfile.designation}</div>
              <div className="text-[10px] text-[#0B4F9C] font-semibold">{currentProfile.cadre}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Primary Navigation Bar */}
      <nav className="bg-[#0B4F9C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto">
          <div className="flex space-x-1 sm:space-x-2 py-1">
            {[
              { id: "overview", label: language === "hi" ? "राष्ट्रीय अवलोकन" : "National Overview" },
              { id: "competency", label: language === "hi" ? "दक्षता एवं कौशल अंतर" : "Competency & Skill Gap" },
              { id: "pathways", label: language === "hi" ? "iGOT व NSSTA पाठ्यक्रम" : "iGOT & NSSTA Pathways" },
              { id: "assessment", label: language === "hi" ? "AI प्रश्नोत्तरी एवं मूल्यांकन" : "AI Assessment & MCQ Engine" },
              { id: "analytics", label: language === "hi" ? "प्रशासनिक विश्लेषिकी" : "Analytics & Cadre Intelligence" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-md transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-[#0B4F9C] shadow-sm"
                    : "text-blue-100 hover:bg-[#083a75] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick AI Assistant Trigger in Nav */}
          <button
            onClick={onOpenSahayak}
            className="hidden sm:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded shadow-sm transition"
          >
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-ping"></span>
            {language === "hi" ? "सांख्यिकी AI सहायक" : "Statistical AI Sahayak"}
          </button>
        </div>
      </nav>
    </header>
  );
};
