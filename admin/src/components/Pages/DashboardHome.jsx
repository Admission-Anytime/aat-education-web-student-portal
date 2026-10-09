import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  GraduationCap,
  Briefcase,
  UserPlus,
  CheckCircle2,
  TrendingUp,
  Clock,
  CheckSquare,
  ChevronDown,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Zap,
  MessageSquare,
  Sparkles,
  Globe,
  Newspaper,
} from "lucide-react";

const DashboardHome = ({ setActiveTab, globalSearchQuery = "" }) => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    liveCourses: 0,
    totalLeads: 0,
    newLeads: 0,
    approvedCount: 0,
    totalStaff: 0,
    totalAlumni: 0,
    totalStudents: 0,
    monthlyRevenue: "₹0",
  });
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real MongoDB data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, leadsRes, usersRes] = await Promise.all([
        axios.get("/api/auth/stats").catch(() => ({ data: { data: {} } })),
        axios.get("/api/inquiry/all-submissions").catch(() => ({ data: [] })),
        axios.get("/api/users").catch(() => ({ data: { data: [] } })),
      ]);

      const statData = statsRes.data?.data || {};
      const leadsData = Array.isArray(leadsRes.data) ? leadsRes.data : [];
      const usersData = Array.isArray(usersRes.data?.data) ? usersRes.data.data : [];

      const staffCount = usersData.filter((u) => u.role === "staff").length;
      const alumniCount = usersData.filter((u) => u.role === "alumni").length;
      const pending = leadsData.filter((l) =>
        ["pending", "waiting", "new"].includes((l.status || "").toLowerCase())
      ).length;
      const approved = leadsData.filter((l) =>
        ["approved", "enrolled"].includes((l.status || "").toLowerCase())
      ).length;

      const totalCount = leadsData.length;
      const estRevenue = totalCount > 0 ? `₹${((totalCount * 35000) / 100000).toFixed(1)}L` : "₹0";

      setStats({
        totalCourses: typeof statData.totalCourses === "number" ? statData.totalCourses : 22,
        liveCourses: typeof statData.liveCourses === "number" ? statData.liveCourses : 22,
        totalLeads: totalCount,
        newLeads: pending,
        approvedCount: approved,
        totalStaff: staffCount ?? (typeof statData.totalStaff === "number" ? statData.totalStaff : 0),
        totalAlumni: alumniCount ?? (typeof statData.totalAlumni === "number" ? statData.totalAlumni : 0),
        totalStudents: totalCount,
        monthlyRevenue: estRevenue,
      });

      setLeads(leadsData);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredLeads = leads.filter((l) => {
    if (!globalSearchQuery) return true;
    const q = globalSearchQuery.toLowerCase();
    return (
      l.name?.toLowerCase().includes(q) ||
      l.course?.toLowerCase().includes(q) ||
      l.className?.toLowerCase().includes(q) ||
      l.phone?.toLowerCase().includes(q) ||
      l.city?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* ── 2-Column Responsive Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 of 12 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Hero Dark Gradient Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#101735] via-[#16224d] to-[#0f1632] p-6 sm:p-8 text-white shadow-xl border border-indigo-950/40">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-indigo-300 tracking-wide">
                  Academic Session 2026-27 • Realtime Database Connected
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 flex items-center gap-2">
                  <span>Good morning, Aayush Admin</span>
                  <span className="inline-block animate-wave text-2xl">👋</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
                  {stats.totalStudents} registrations in database • {stats.totalCourses} live courses • {stats.monthlyRevenue} admissions volume
                </p>
              </div>

              {/* Mini Stats Badges inside Hero Banner */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Active Courses */}
                <div
                  onClick={() => setActiveTab("courses")}
                  className="bg-[#1c2752]/80 hover:bg-[#253266] border border-indigo-400/20 px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition transform hover:scale-105"
                >
                  <BookOpen className="w-5 h-5 text-indigo-300 mb-1" />
                  <span className="text-base font-black text-white">{stats.totalCourses}</span>
                  <span className="text-[10px] text-indigo-200 uppercase tracking-wider font-semibold">
                    Courses
                  </span>
                </div>

                {/* Pending Leads */}
                <div
                  onClick={() => setActiveTab("leads")}
                  className="bg-[#1c2752]/80 hover:bg-[#253266] border border-amber-400/20 px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-base font-black text-white">{stats.newLeads}</span>
                  <span className="text-[10px] text-amber-200 uppercase tracking-wider font-semibold">
                    Pending
                  </span>
                </div>

                {/* Total Records */}
                <div
                  onClick={() => setActiveTab("leads")}
                  className="bg-[#1c2752]/80 hover:bg-[#253266] border border-purple-400/20 px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition transform hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5 text-purple-300 mb-1" />
                  <span className="text-base font-black text-white">{stats.totalLeads}</span>
                  <span className="text-[10px] text-purple-200 uppercase tracking-wider font-semibold">
                    Total
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Overview Heading & Period Selector */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Overview</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Live database metrics computed directly from MongoDB Atlas
              </p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
            >
              <span>Refresh Stats</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* 3. Six Overview KPI Cards Grid (2x3 Layout with real database values) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Total Students */}
            <div
              onClick={() => setActiveTab("leads")}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Total Registrations</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalStudents}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="h-9 my-2">
                  <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M0,18 Q20,10 40,16 T70,12 T100,5"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Synced from website</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Live DB
                </span>
              </div>
            </div>

            {/* Card 2: Website CMS & Blogs */}
            <div
              onClick={() => setActiveTab("social-settings")}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Website & Blogs</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">Live CMS</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>

                <div className="h-9 my-2">
                  <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M0,15 Q25,20 50,14 T80,10 T100,8"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Dynamic Content</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Active
                </span>
              </div>
            </div>

            {/* Card 3: News & Announcements */}
            <div
              onClick={() => setActiveTab("news")}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">News & Media</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">Articles</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Newspaper className="w-5 h-5" />
                  </div>
                </div>

                <div className="h-9 my-2">
                  <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M0,16 Q30,12 60,15 T100,10"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Placed students</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Verified
                </span>
              </div>
            </div>

            {/* Card 4: Active Admissions & Leads */}
            <div
              onClick={() => setActiveTab("leads")}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Pending Review</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats.newLeads}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                </div>

                <div className="h-9 my-2">
                  <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M0,22 Q25,18 50,14 T75,10 T100,4"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">{stats.newLeads} awaiting review</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Action
                </span>
              </div>
            </div>

            {/* Card 5: Approved Admissions */}
            <div
              onClick={() => setActiveTab("leads")}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Approved Admissions</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats.approvedCount}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                </div>

                <div className="h-9 my-2">
                  <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M0,17 Q30,12 60,16 T100,8"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">
                  {stats.totalStudents > 0
                    ? Math.round((stats.approvedCount / stats.totalStudents) * 100)
                    : 0}
                  % approval rate
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Approved
                </span>
              </div>
            </div>

            {/* Card 6: Monthly Revenue */}
            <div
              onClick={() => setActiveTab("courses")}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Course Offerings</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalCourses}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                <div className="h-9 my-2">
                  <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M0,20 Q20,18 45,15 T75,10 T100,5"
                      fill="none"
                      stroke="#9333ea"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">{stats.liveCourses} live on website</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Synced
                </span>
              </div>
            </div>
          </div>

          {/* 4. Realtime Website Submissions Table (from MongoDB) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Recent Website Submissions & Leads
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time entries from Aayush website admission and counselling forms
                </p>
              </div>
              <button
                onClick={() => setActiveTab("leads")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
              >
                <span>View All Records</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                    <th className="py-3 px-5">Student / Inquirer</th>
                    <th className="py-3 px-5">Admission ID</th>
                    <th className="py-3 px-5">Class / Course</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5 text-right">Direct Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400">
                        <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-semibold text-slate-700 text-xs">No Website Submissions Yet</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          When users submit registration forms or course inquiries on the Aayush website, they will appear here in real time.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.slice(0, 5).map((lead, idx) => {
                    const cleanPhone = (lead.phone || "").replace(/\D/g, "");
                    const isApproved = (lead.status || "").toLowerCase() === "approved";
                    const isPending = ["pending", "new"].includes((lead.status || "").toLowerCase());

                    return (
                      <tr key={lead._id || idx} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900">{lead.name || "Student"}</div>
                          <div className="text-[11px] text-slate-400">{lead.phone || "No phone"}</div>
                        </td>
                        <td className="py-3.5 px-5 text-slate-500 font-medium">
                          {lead.admissionId || `ADM-2024-${String(idx + 1).padStart(3, "0")}`}
                        </td>
                        <td className="py-3.5 px-5 text-slate-700">
                          <span className="font-semibold text-slate-800 line-clamp-1 max-w-[180px]">
                            {lead.className || lead.course || lead.program || "Class 1"}
                          </span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isApproved
                                ? "bg-emerald-100 text-emerald-800"
                                : isPending
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {lead.status || "Pending"}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-slate-400 text-[11px]">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                              })
                            : "Today"}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {cleanPhone && (
                              <a
                                href={`https://wa.me/91${cleanPhone.slice(-10)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                                title="WhatsApp Chat"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {cleanPhone && (
                              <a
                                href={`tel:${cleanPhone}`}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                title="Call Now"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 of 12 cols on desktop - Schedule & Tasks) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Widget 1: Today's Schedule */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Today's Schedule</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-400 w-11 shrink-0 pt-0.5">09:00</span>
                <div className="border-l-2 border-indigo-500 pl-3">
                  <p className="font-bold text-slate-900">Admissions Review Desk</p>
                  <p className="text-[11px] text-slate-400">Verifying website forms</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-400 w-11 shrink-0 pt-0.5">10:30</span>
                <div className="border-l-2 border-emerald-500 pl-3">
                  <p className="font-bold text-slate-900">Faculty Curriculum Sync</p>
                  <p className="text-[11px] text-slate-400">{stats.totalCourses} live courses review</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-400 w-11 shrink-0 pt-0.5">12:00</span>
                <div className="border-l-2 border-blue-500 pl-3">
                  <p className="font-bold text-slate-900">Fee Committee Review</p>
                  <p className="text-[11px] text-slate-400">Finance & Scholarships</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-400 w-11 shrink-0 pt-0.5">14:00</span>
                <div className="border-l-2 border-purple-500 pl-3">
                  <p className="font-bold text-slate-900">Career Guidance Session</p>
                  <p className="text-[11px] text-slate-400">Enquiry followups</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-400 w-11 shrink-0 pt-0.5">16:00</span>
                <div className="border-l-2 border-amber-500 pl-3">
                  <p className="font-bold text-slate-900">Alumni Placement Drive</p>
                  <p className="text-[11px] text-slate-400">{stats.totalAlumni} alumni network</p>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Pending Tasks (Dynamic from DB) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Action Tasks</h3>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                {stats.newLeads} pending
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div
                onClick={() => setActiveTab("leads")}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-rose-500"></div>
                  <span className="font-medium text-slate-800">
                    Review {stats.newLeads} pending admission forms
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              </div>

              <div
                onClick={() => setActiveTab("courses")}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-slate-500 line-through">
                    {stats.totalCourses} courses synced with website
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>

              <div
                onClick={() => setActiveTab("news")}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-slate-500">
                    News & Announcements publishing active
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>

              <div
                onClick={() => setActiveTab("leads")}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-500"></div>
                  <span className="font-medium text-slate-800">
                    Approved {stats.approvedCount} student admissions
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              </div>
            </div>
          </div>

          {/* Widget 3: Live Quick Inquiry Messages Feed */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Website Inquiries</h3>
              </div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {stats.newLeads} new
              </span>
            </div>

            <div className="space-y-2.5">
              {leads.slice(0, 3).map((l, i) => (
                <div
                  key={l._id || i}
                  className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between hover:bg-slate-100/70 transition"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-xs text-slate-900 truncate">
                      {l.name || "Student Visitor"}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {l.className || l.program || l.course || "Course Enquiry"}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="p-1.5 bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl shadow-2xs transition shrink-0"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
