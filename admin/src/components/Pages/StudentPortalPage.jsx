import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  Calendar,
  Phone,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ExternalLink,
  Lock,
  Printer,
  Sparkles,
  QrCode,
  Building2,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export default function StudentPortalPage() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "Student Aspirant",
    email: "student@aayushinstitute.com",
    role: "student",
    course: "Software & Full Stack Development",
    memberId: "AAY-STU-2024",
    phone: "+91-9876543210",
    batch: "2024-2025",
    admissionDate: "15 Jan 2024",
  });
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("adminUser");
      if (stored) {
        const parsed = JSON.parse(stored);
        setStudent((prev) => ({
          ...prev,
          name: parsed.name || prev.name,
          email: parsed.email || prev.email,
          role: parsed.role || "student",
          course: parsed.course || prev.course,
          memberId: parsed.memberId || prev.memberId,
          phone: parsed.phone || prev.phone,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-16 font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-gray-900 text-base tracking-tight leading-none">
                Aayush Institute
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#6d28d9] mt-0.5">
                Official Student Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Enrolled Student
            </span>

            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6d28d9] font-bold text-xs flex items-center justify-center border border-purple-200">
                {student.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gray-900">{student.name}</p>
                <p className="text-[11px] text-gray-500">{student.memberId}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout from Student Portal"
              className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* Strict Auth Notice Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-[#1e1b4b] to-purple-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-purple-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Student Account
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back, {student.name}!
              </h2>
              <p className="text-sm text-purple-200 max-w-2xl leading-relaxed">
                You are currently enrolled in <strong className="text-white">{student.course}</strong>. Access your lecture materials, fee receipts, digital ID card, and academic guidelines below.
              </p>
            </div>

            {/* Security Alert Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 max-w-xs text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Student Access Boundary</span>
              </div>
              <p className="text-purple-100 text-[11px] leading-relaxed">
                Student accounts are strictly restricted to learning materials and profile tracking. Admin controls are protected.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
            <div>
              <span className="text-purple-300 block">Roll / Member ID</span>
              <span className="font-bold text-white text-sm">{student.memberId}</span>
            </div>
            <div>
              <span className="text-purple-300 block">Overall Attendance</span>
              <span className="font-bold text-emerald-400 text-sm">88.5% (Eligible)</span>
            </div>
            <div>
              <span className="text-purple-300 block">Fee Clearance</span>
              <span className="font-bold text-white text-sm">Completed (100%)</span>
            </div>
            <div>
              <span className="text-purple-300 block">Batch Year</span>
              <span className="font-bold text-white text-sm">2024 – 2025</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: "overview", label: "Course Curriculum", icon: BookOpen },
            { id: "attendance", label: "Attendance & Lab", icon: Clock },
            { id: "idcard", label: "Digital Student ID", icon: QrCode },
            { id: "fees", label: "Fee Receipts", icon: CreditCard },
            { id: "rules", label: "Institute Rules & Policies", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#6d28d9] text-white shadow-sm font-bold"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & COURSE */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-purple-50 text-[#6d28d9] border border-purple-100">
                      Active Course Program
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">{student.course}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                    In Progress
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Comprehensive industry curriculum covering practical hands-on software development, live capstone projects, automated testing, and career placement preparation.
                </p>

                <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-100 text-xs text-center">
                  <div>
                    <span className="text-gray-400 block">Total Duration</span>
                    <span className="font-bold text-gray-800 text-sm">6 Months</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Learning Mode</span>
                    <span className="font-bold text-gray-800 text-sm">Hybrid / Lab</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Faculty Mentor</span>
                    <span className="font-bold text-gray-800 text-sm">Er. Arjun Mehta</span>
                  </div>
                </div>

                {/* Modules list */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Course Syllabus & Progress</h4>
                  {[
                    { module: "Module 1: Foundations & Core Logic", status: "Completed", progress: 100 },
                    { module: "Module 2: Advanced Frontend & Responsive Layouts", status: "Completed", progress: 100 },
                    { module: "Module 3: Backend APIs & Database Architecture", status: "Ongoing", progress: 75 },
                    { module: "Module 4: Industry Capstone Project & Mock Interviews", status: "Upcoming", progress: 0 },
                  ].map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-800">{m.module}</p>
                        <div className="w-48 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#6d28d9] h-full rounded-full transition-all"
                            style={{ width: `${m.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        m.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                        m.status === "Ongoing" ? "bg-indigo-100 text-indigo-800" : "bg-gray-200 text-gray-600"
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#6d28d9]" />
                  Student Profile Details
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-gray-400 block">Full Name</span>
                    <span className="font-semibold text-gray-800">{student.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Registered Email</span>
                    <span className="font-semibold text-gray-800">{student.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Mobile Phone</span>
                    <span className="font-semibold text-gray-800">{student.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Campus Center</span>
                    <span className="font-semibold text-gray-800">Aayush Institute Main Campus</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 p-5 shadow-sm text-xs space-y-3">
                <div className="flex items-center gap-2 text-[#6d28d9] font-bold">
                  <Award className="w-4 h-4" />
                  <span>Certification Criteria</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Students maintaining 75%+ attendance and successfully completing all project submissions are awarded the Government/Skill Partner recognized completion certificate.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE */}
        {activeTab === "attendance" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Attendance & Practical Lab Log</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Minimum 75% attendance is required to be eligible for certification assessments.
                </p>
              </div>
              <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 self-start">
                Current: 88.5% (Compliant)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 text-center">
                <span className="text-xs text-gray-400 block">Total Lectures</span>
                <span className="text-2xl font-bold text-gray-900">48</span>
              </div>
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 text-center">
                <span className="text-xs text-emerald-600 block">Lectures Attended</span>
                <span className="text-2xl font-bold text-emerald-700">42</span>
              </div>
              <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 text-center">
                <span className="text-xs text-rose-600 block">Authorized Leaves</span>
                <span className="text-2xl font-bold text-rose-700">6</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIGITAL STUDENT ID CARD */}
        {activeTab === "idcard" && (
          <div className="max-w-md mx-auto bg-white rounded-3xl border-2 border-indigo-600/30 p-6 shadow-xl space-y-6 text-center animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#6d28d9]" />
                <span className="font-extrabold text-sm text-gray-900">AAYUSH INSTITUTE</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-[#6d28d9]">STUDENT ID</span>
            </div>

            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md ring-4 ring-purple-100">
              {student.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
              <p className="text-xs font-semibold text-[#6d28d9] mt-0.5">{student.course}</p>
              <p className="text-xs text-gray-400 mt-1 font-mono">{student.memberId}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 text-left border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-400">Batch:</span>
                <span className="font-semibold text-gray-800">2024-2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-semibold text-emerald-600">Active & Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Valid Till:</span>
                <span className="font-semibold text-gray-800">December 2025</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6d28d9] text-white font-semibold hover:bg-[#5b21b6] transition-all shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                Print ID Card
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: FEE RECEIPTS */}
        {activeTab === "fees" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900">Tuition Fee Receipts & Statements</h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Receipt No.</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Particulars</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-mono font-bold text-gray-800">RCP-2024-889</td>
                    <td className="p-3 text-gray-600">15 Jan 2024</td>
                    <td className="p-3 text-gray-800 font-medium">Semester Tuition & Practical Lab Fee</td>
                    <td className="p-3 font-bold text-gray-900">₹25,000</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px]">
                        Paid
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1 text-[#6d28d9] hover:underline font-semibold"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: RULES & POLICIES */}
        {activeTab === "rules" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900">Institute Policies & Code of Conduct</h3>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
                <h4 className="font-bold text-blue-900">1. Attendance Compliance (75% Rule)</h4>
                <p>All enrolled students must clock at least 75% attendance in theory lectures and lab sessions to be eligible for the end-of-course capstone certification.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <h4 className="font-bold text-emerald-900">2. Placement Assistance Rules</h4>
                <p>Placement assistance is provided to candidates who have completed all project reviews and cleared mock technical rounds conducted by the placement cell.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
                <h4 className="font-bold text-purple-900">3. Lab Ethics & Hardware Security</h4>
                <p>Computer workstations and testing devices must be operated responsibly. Installing unauthorized executables is prohibited.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
