import React, { useState } from "react";
import { GovHeader } from "./components/GovHeader";
import { StatsBanner } from "./components/StatsBanner";
import { CompetencyAssessment } from "./components/CompetencyAssessment";
import { LearningPathways } from "./components/LearningPathways";
import { AssessmentEngine } from "./components/AssessmentEngine";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { AiSahayakModal } from "./components/AiSahayakModal";
import { KarmayogiCertificateModal } from "./components/KarmayogiCertificateModal";

import { 
  INITIAL_OFFICIAL_PROFILES, 
  INITIAL_SKILLS, 
  IGOT_COURSE_CATALOGUE, 
  TRAINING_MATERIAL_PRESETS 
} from "./data/curriculumData";
import { OfficialProfile, SkillItem, IGOTCourse } from "./types";
import { 
  Bot, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  FileText
} from "lucide-react";

export default function App() {
  // Global Profile state (defaults to Senior Statistical Officer Dr. Rajesh Sharma)
  const [profiles, setProfiles] = useState<OfficialProfile[]>(INITIAL_OFFICIAL_PROFILES);
  const [currentProfile, setCurrentProfile] = useState<OfficialProfile>(INITIAL_OFFICIAL_PROFILES[0]);

  // Skills state for current profile
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);

  // Courses state
  const [courses, setCourses] = useState<IGOTCourse[]>(IGOT_COURSE_CATALOGUE);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>("overview");

  // UI preferences
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [language, setLanguage] = useState<"en" | "hi">("en");

  // Pathways filter pass-through
  const [pathwayFilterKeyword, setPathwayFilterKeyword] = useState<string>("");

  // Modals state
  const [isSahayakOpen, setIsSahayakOpen] = useState<boolean>(false);
  const [certificateModalCourse, setCertificateModalCourse] = useState<IGOTCourse | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Switch officer profile
  const handleSelectProfile = (newProfile: OfficialProfile) => {
    setCurrentProfile(newProfile);
  };

  // Adjust skill level manually via slider
  const handleUpdateSkillLevel = (skillId: string, newLevel: number) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, currentLevel: Math.round(newLevel * 10) / 10 } : s))
    );
  };

  // Course enrollment
  const handleEnrollCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, status: "In Progress", progressPercentage: 25 }
          : c
      )
    );
  };

  // Course completion & update profile hours
  const handleCompleteCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, status: "Completed", progressPercentage: 100 }
          : c
      )
    );

    // Increment profile learning hours and certificates
    setCurrentProfile((prev) => ({
      ...prev,
      completedHours: prev.completedHours + course.durationHours,
      certificatesEarned: prev.certificatesEarned + 1,
    }));

    // Also boost mapped skills
    setSkills((prev) =>
      prev.map((s) => {
        if (course.competencyMapped.some((m) => s.name.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(s.name.toLowerCase()))) {
          return { ...s, currentLevel: Math.min(5.0, Math.round((s.currentLevel + 0.4) * 10) / 10) };
        }
        return s;
      })
    );
  };

  // Boost skill when passing an assessment
  const handleCompetencyGain = (competencyName: string, scoreGained: number) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name.toLowerCase().includes(competencyName.toLowerCase()) || competencyName.toLowerCase().includes(s.name.toLowerCase())) {
          return { ...s, currentLevel: Math.min(5.0, Math.round((s.currentLevel + scoreGained) * 10) / 10) };
        }
        return s;
      })
    );
    setCurrentProfile((prev) => ({
      ...prev,
      completedHours: prev.completedHours + 2,
    }));
  };

  // View certificate for course
  const handleViewCertificate = (course: IGOTCourse) => {
    setCertificateModalCourse(course);
    setIsCertificateOpen(true);
  };

  // Navigate to pathways with specific search keyword
  const handleNavigateToPathways = (keyword?: string) => {
    if (keyword) setPathwayFilterKeyword(keyword);
    setActiveTab("pathways");
  };

  const getFontSizeClass = () => {
    if (fontSize === "sm") return "text-[13px]";
    if (fontSize === "lg") return "text-[17px]";
    return "text-[15px]";
  };

  return (
    <div className={`min-h-screen bg-[#f4f7fa] text-slate-800 flex flex-col ${getFontSizeClass()}`}>
      {/* 1. Official Government Top Header */}
      <GovHeader
        currentProfile={currentProfile}
        profiles={profiles}
        onSelectProfile={handleSelectProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontSize={fontSize}
        setFontSize={setFontSize}
        language={language}
        setLanguage={setLanguage}
        onOpenSahayak={() => setIsSahayakOpen(true)}
      />

      {/* 2. Main Body Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* TAB 1: OVERVIEW & NATIONAL STATS BANNER */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <StatsBanner
              language={language}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />

            {/* Quick Officer Snapshot Card */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#0B4F9C] flex items-center justify-center font-extrabold text-lg">
                  {currentProfile.name.split(" ")[1]?.[0] || "O"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {currentProfile.cadre}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Karmayogi ID: {currentProfile.karmayogiId}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    Welcome back, {currentProfile.name}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {currentProfile.designation} • {currentProfile.department}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab("competency")}
                  className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-2xs"
                >
                  View My Competency Gaps →
                </button>
                <button
                  onClick={() => setActiveTab("assessment")}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg transition shadow-2xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  Take AI Assessment
                </button>
              </div>
            </div>

            {/* Core Capability Spotlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                onClick={() => setActiveTab("competency")}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#0B4F9C] hover:shadow-md transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B4F9C] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0B4F9C] transition">
                  1. Competency Gap Diagnostics
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluate current proficiency across Statistical, Technical, Digital Governance, and Managerial
                  domains against target promotion benchmarks.
                </p>
                <div className="text-xs font-bold text-[#0B4F9C] pt-2 flex items-center gap-1">
                  Explore Matrix <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("pathways")}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#0B4F9C] hover:shadow-md transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0B4F9C] transition">
                  2. iGOT & NSSTA Pathways
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Personalized training trajectories with courses approved by NSSTA's Training Programme Advisory
                  Committee (TPAC) and CBC.
                </p>
                <div className="text-xs font-bold text-[#0B4F9C] pt-2 flex items-center gap-1">
                  Browse Courses <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("assessment")}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#0B4F9C] hover:shadow-md transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0B4F9C] transition">
                  3. Intelligent Assessment Engine
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automatically generate objective MCQs and case studies from uploaded MoSPI circulars, survey
                  instructions, and NSS guidelines.
                </p>
                <div className="text-xs font-bold text-[#0B4F9C] pt-2 flex items-center gap-1">
                  Launch Engine <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPETENCY & SKILL GAP */}
        {activeTab === "competency" && (
          <CompetencyAssessment
            profile={currentProfile}
            skills={skills}
            onUpdateSkillLevel={handleUpdateSkillLevel}
            onNavigateToPathways={handleNavigateToPathways}
            language={language}
          />
        )}

        {/* TAB 3: iGOT & NSSTA PATHWAYS */}
        {activeTab === "pathways" && (
          <LearningPathways
            courses={courses}
            profile={currentProfile}
            onEnrollCourse={handleEnrollCourse}
            onCompleteCourse={handleCompleteCourse}
            onViewCertificate={handleViewCertificate}
            filterKeyword={pathwayFilterKeyword}
            language={language}
          />
        )}

        {/* TAB 4: AI ASSESSMENT & MCQ ENGINE */}
        {activeTab === "assessment" && (
          <AssessmentEngine
            presets={TRAINING_MATERIAL_PRESETS}
            onCompetencyGain={handleCompetencyGain}
            language={language}
          />
        )}

        {/* TAB 5: ANALYTICS DASHBOARD */}
        {activeTab === "analytics" && (
          <AnalyticsDashboard
            profile={currentProfile}
            skills={skills}
            courses={courses}
            language={language}
          />
        )}
      </main>

      {/* Floating AI Sahayak Trigger Button */}
      <button
        onClick={() => setIsSahayakOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-[#0B4F9C] hover:bg-[#083a75] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg border-2 border-amber-400 flex items-center gap-2 cursor-pointer transition hover:scale-105"
        title="Open Karmayogi Statistical AI Sahayak"
      >
        <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
          क
        </div>
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          Statistical AI Sahayak
        </span>
      </button>

      {/* 3. Official Government Footer */}
      <footer className="bg-[#0b2545] text-slate-300 border-t-4 border-[#FF9933] mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">SkillSetu (स्किलसेतु)</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An AI-enabled competency intelligence and personalized capacity building portal for the Official
              Statistical System of India.
            </p>
            <div className="text-amber-400 text-[11px] font-semibold">
              Aligned with National Programme for Civil Services Capacity Building (NPCSCB)
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">Related Official Portals</div>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>
                <a href="https://igotkarmayogi.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  iGOT Karmayogi Bharat <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  Ministry of Statistics & PI (MoSPI) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="http://nssta.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  NSSTA Greater Noida <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://cbc.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  Capacity Building Commission (CBC) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">Competency Frameworks</div>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Statistical & Methodological Competencies</li>
              <li>• Technical & Data Science Competencies</li>
              <li>• Digital Governance & DPDP Act 2023</li>
              <li>• Leadership & Behavioural Competencies</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">Security & Compliance</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Hosted on MeghRaj Cloud Infrastructure. Compliant with Government of India Cyber Security Guidelines and
              GIGW (Guidelines for Indian Government Websites) 3.0.
            </p>
            <div className="pt-2 text-[10px] text-slate-500 font-mono">
              Applet Build Version: 2026.4.1-MoSPI
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="bg-[#07172b] py-3 text-center text-slate-400 text-[11px] border-t border-slate-800">
          © {new Date().getFullYear()} National Statistical Systems Training Academy (NSSTA), Ministry of Statistics &
          Programme Implementation, Government of India. All Rights Reserved.
        </div>
      </footer>

      {/* AI Assistant Modal */}
      <AiSahayakModal
        isOpen={isSahayakOpen}
        onClose={() => setIsSahayakOpen(false)}
        profile={currentProfile}
        language={language}
      />

      {/* Official Certificate Modal */}
      <KarmayogiCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        profile={currentProfile}
        course={certificateModalCourse}
      />
    </div>
  );
}

