import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  RefreshCw,
  Upload,
  Download,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Phone,
  MessageCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Eye,
  Copy,
  Check,
  GraduationCap,
  Briefcase,
  Calendar,
  User,
  FileText,
  X,
  Sparkles,
  MapPin,
} from "lucide-react";

const LeadsAdmin = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("all"); // "all", "admission", "placement"
  const [sessionFilter, setSessionFilter] = useState("All");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null); // { id, record, top, right }
  const [viewModalRecord, setViewModalRecord] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Close menu on scroll or resize so it stays locked with UI
  useEffect(() => {
    const handleClose = () => setActiveMenu(null);
    window.addEventListener("scroll", handleClose, true);
    window.addEventListener("resize", handleClose);
    return () => {
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("resize", handleClose);
    };
  }, []);

  // New Registration Modal
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    className: "Software & Full Stack Development",
    email: "",
    phone: "",
    status: "Pending",
    session: "2026–27",
    notes: "",
  });

  const fetchRecords = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const res = await axios.get("/api/inquiry/all-submissions");
      if (Array.isArray(res.data)) {
        setRecords(res.data);
      }
    } catch (err) {
      console.error("Error fetching registration records:", err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords(false);
    // Realtime live polling from MongoDB every 3.5 seconds
    const interval = setInterval(() => {
      fetchRecords(true);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Update Status handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/api/inquiry/${id}`, { status: newStatus });
      setRecords((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
      setActiveMenu(null);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete Handler
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the record for ${name}?`)) return;
    try {
      await axios.delete(`/api/inquiry/${id}`);
      setRecords((prev) => prev.filter((r) => r._id !== id));
      setActiveMenu(null);
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  // Create New Registration
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/inquiry/submit-form", formData);
      const newRec = res.data?.data || res.data?.inquiry || formData;
      setRecords((prev) => [newRec, ...prev]);
      setShowModal(false);
      setFormData({
        name: "",
        fatherName: "",
        className: "Software & Full Stack Development",
        email: "",
        phone: "",
        status: "Pending",
        session: "2026–27",
        notes: "",
      });
      fetchRecords();
    } catch (err) {
      console.error("Error creating registration:", err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (records.length === 0) return alert("No records to export");
    const headers = ["Admission ID", "Student Name", "Guardian", "Course / Program", "Email", "Phone", "Reg. Date", "Status"];
    const rows = records.map((r) => [
      (r.admissionId || "N/A").replace(/ADM-\s+/g, 'ADM-'),
      `"${r.name || ""}"`,
      `"${r.fatherName || ""}"`,
      `"${r.careerDomain || r.className || r.course || r.program || ""}"`,
      r.email || "",
      r.phone || "",
      r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB") : "",
      r.status || "Pending",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Registration_Records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filteredRecords = records.filter((r) => {
    // Type Filter (Placement Support vs Course Admissions)
    const isPlacement =
      r.inquiryType === "Placement Support" ||
      (r.className && r.className.toLowerCase().includes("placement")) ||
      !!r.careerDomain;
    if (typeFilter === "placement" && !isPlacement) return false;
    if (typeFilter === "admission" && isPlacement) return false;

    // Status Filter
    const matchesStatus =
      statusFilter === "All" ||
      (r.status && r.status.toLowerCase() === statusFilter.toLowerCase());

    // Search Term Filter
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      r.name?.toLowerCase().includes(q) ||
      r.admissionId?.toLowerCase().includes(q) ||
      r.fatherName?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.phone?.toLowerCase().includes(q) ||
      r.className?.toLowerCase().includes(q) ||
      r.course?.toLowerCase().includes(q) ||
      r.careerDomain?.toLowerCase().includes(q) ||
      r.qualification?.toLowerCase().includes(q) ||
      r.notes?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Pagination
  const totalResults = filteredRecords.length;
  const totalPages = Math.ceil(totalResults / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + pageSize);

  // Status configuration mapping matching the screenshot
  const getStatusBadge = (status = "Pending") => {
    const s = status.toLowerCase();
    if (s === "approved" || s === "enrolled") {
      return (
        <span className="inline-flex items-center gap-1.5 font-bold text-xs text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Approved
        </span>
      );
    }
    if (s === "pending" || s === "new" || s === "contacted") {
      return (
        <span className="inline-flex items-center gap-1.5 font-bold text-xs text-amber-500">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Pending
        </span>
      );
    }
    if (s === "waiting" || s === "follow up") {
      return (
        <span className="inline-flex items-center gap-1.5 font-bold text-xs text-blue-500">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Waiting
        </span>
      );
    }
    if (s === "rejected" || s === "closed") {
      return (
        <span className="inline-flex items-center gap-1.5 font-bold text-xs text-rose-500">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 font-bold text-xs text-slate-500">
        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
        {status}
      </span>
    );
  };

  // Avatar colors
  const avatarColors = [
    "bg-indigo-600",
    "bg-emerald-600",
    "bg-amber-500",
    "bg-rose-500",
    "bg-blue-600",
    "bg-purple-600",
    "bg-teal-600",
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
      {/* ── Top Header Section (Title + Action Buttons) ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Registration Records
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-slate-500 font-medium">
              {records.length} records found
            </p>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchRecords}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={async () => {
              if (!window.confirm("Delete all registration records from MongoDB? Only real incoming submissions will be shown afterwards.")) return;
              try {
                await axios.delete("/api/inquiry/clear-all/records");
                fetchRecords();
              } catch (err) {
                console.error("Failed to delete records:", err);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition"
            title="Clean all records"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Records</span>
          </button>

          <button
            onClick={() => alert("Ready to import CSV / Excel files")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition transform hover:scale-102 active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Registration</span>
          </button>
        </div>
      </div>

      {/* ── Type Filter Tabs: All, Course Admissions, Placement Support ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "all", label: "All Inquiries", count: records.length, icon: "🌟" },
          {
            id: "admission",
            label: "Course Admissions",
            count: records.filter(
              (r) =>
                r.inquiryType !== "Placement Support" &&
                !r.careerDomain &&
                !(r.className && r.className.toLowerCase().includes("placement"))
            ).length,
            icon: "🎓",
          },
          {
            id: "placement",
            label: "Placement Support Registrations",
            count: records.filter(
              (r) =>
                r.inquiryType === "Placement Support" ||
                r.careerDomain ||
                (r.className && r.className.toLowerCase().includes("placement"))
            ).length,
            icon: "💼",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setTypeFilter(tab.id);
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              typeFilter === tab.id
                ? "bg-indigo-600 text-white shadow-indigo-200"
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                typeFilter === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Search & Filter Controls Bar ── */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center pt-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, ID, father..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-2xs"
          />
        </div>

        {/* Status Pill Filters (All, Approved, Pending, Waiting, Rejected) */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl overflow-x-auto">
          {["All", "Approved", "Pending", "Waiting", "Rejected"].map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Session Dropdown & Show Entries */}
        <div className="flex items-center gap-3">
          <select
            value={sessionFilter}
            onChange={(e) => {
              setSessionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-2xs focus:outline-none cursor-pointer"
          >
            <option value="All">All Sessions</option>
            <option value="2026–27">2026–27</option>
            <option value="2025–26">2025–26</option>
            <option value="2024–25">2024–25</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
        </div>
      </div>

      {/* ── Registration Records Table ── */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs min-h-[160px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-4 px-4 font-semibold">STUDENT & GUARDIAN</th>
              <th className="py-4 px-4 font-semibold">ADMISSION ID</th>
              <th className="py-4 px-4 font-semibold">COURSE / PROGRAM</th>
              <th className="py-4 px-4 font-semibold">CONTACT DETAILS</th>
              <th className="py-4 px-4 font-semibold">REG. DATE</th>
              <th className="py-4 px-4 font-semibold">STATUS</th>
              <th className="py-4 px-4 font-semibold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {loading ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent mb-2"></div>
                  <p>Loading database registrations...</p>
                </td>
              </tr>
            ) : paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-16 text-center text-slate-400">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-slate-800 text-sm">No Website Submissions Found</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Real-time admissions and inquiries submitted via the Aayush website will appear here automatically.
                  </p>
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r, idx) => {
                const colorClass = avatarColors[idx % avatarColors.length];
                const initials = r.name
                  ? r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "ST";
                const cleanPhone = (r.phone || "").replace(/\D/g, "");
                const cleanAdmId = (r.admissionId || `ADM-2026-${String(idx + 1).padStart(3, "0")}`).replace(/ADM-\s+/g, "ADM-");

                return (
                  <tr
                    key={r._id || idx}
                    onClick={() => setViewModalRecord(r)}
                    className="hover:bg-slate-50/90 transition-colors group cursor-pointer"
                  >
                    {/* 1. Student Avatar + Name + Guardian */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${colorClass} text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs`}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                            {r.name}
                          </p>
                          {r.fatherName && r.fatherName !== "N/A" ? (
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                              Guardian: <span className="text-slate-600 font-semibold">{r.fatherName}</span>
                            </p>
                          ) : (
                            <p className="text-[10.5px] text-slate-400 font-normal">Student Applicant</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 2. Admission ID */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80">
                        {cleanAdmId}
                      </span>
                    </td>

                    {/* 3. Course / Program (Replaces Class) */}
                    <td className="py-4 px-4 min-w-[210px]" onClick={(e) => e.stopPropagation()}>
                      {r.inquiryType === "Placement Support" || r.careerDomain || (r.className && r.className.includes("Placement")) ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                              <Briefcase className="w-3 h-3 text-blue-600" />
                              <span>{r.careerDomain || r.preferredRole || "Web Development"}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              Placement Support
                            </span>
                          </div>
                          {(r.qualification || r.degree || r.passingYear) && (
                            <p className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                              <span>{r.qualification || r.degree || "B.Sc. IT / CS"}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-500 font-normal">{r.passingYear || "Pursuing Final Year"}</span>
                            </p>
                          )}
                          {r.notes && (
                            <p className="text-[11px] text-slate-500 italic line-clamp-1 max-w-xs">
                              "{r.notes}"
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#ede9fe] text-[#6d28d9] border border-purple-200 shadow-2xs">
                          <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                          <span>{r.className || r.course || r.program || "Course"}</span>
                        </span>
                      )}
                    </td>

                    {/* 4. Contact (Email + Phone with WhatsApp direct link) */}
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-1">
                        <a
                          href={`mailto:${r.email || ''}`}
                          className="text-slate-700 hover:text-indigo-600 text-xs font-medium flex items-center gap-1.5 truncate max-w-[190px]"
                        >
                          <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{r.email || "student@aayush.com"}</span>
                        </a>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${r.phone || ''}`}
                            className="text-slate-600 hover:text-indigo-600 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{r.phone || "+91 98765 43210"}</span>
                          </a>
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/91${cleanPhone.slice(-10)}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              className="inline-flex items-center justify-center p-1 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 5. Reg Date */}
                    <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>
                          {r.createdAt
                            ? new Date(r.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "3 Oct 2026"}
                        </span>
                      </div>
                    </td>

                    {/* 6. Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(r.status)}
                    </td>

                    {/* 7. Actions */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setViewModalRecord(r)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeMenu?.id === r._id) {
                              setActiveMenu(null);
                            } else {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const openUpwards = rect.bottom + 270 > window.innerHeight;
                              setActiveMenu({
                                id: r._id,
                                record: r,
                                top: openUpwards ? Math.max(10, rect.top - 250) : rect.bottom + 6,
                                right: Math.max(16, window.innerWidth - rect.right),
                              });
                            }
                          }}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            activeMenu?.id === r._id
                              ? "bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200"
                              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200"
                          }`}
                          title="Actions"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Fixed Floating 3-Dot Action Menu (No overflow clipping, No scrollbars) ── */}
      {activeMenu && (
        <>
          {/* Backdrop to close when clicking outside */}
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setActiveMenu(null)}
          />

          <div
            style={{
              position: "fixed",
              top: `${activeMenu.top}px`,
              right: `${activeMenu.right}px`,
            }}
            className="z-50 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 text-left text-xs animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-2.5 py-1 mb-1 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Update Status
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeMenu.record.status || "Pending"}
              </span>
            </div>

            <button
              onClick={() => handleStatusChange(activeMenu.id, "Approved")}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-emerald-50 text-emerald-700 font-bold flex items-center gap-2 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Mark Approved
            </button>

            <button
              onClick={() => handleStatusChange(activeMenu.id, "Pending")}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-amber-50 text-amber-700 font-bold flex items-center gap-2 transition"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Mark Pending
            </button>

            <button
              onClick={() => handleStatusChange(activeMenu.id, "Waiting")}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-blue-50 text-blue-700 font-bold flex items-center gap-2 transition"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Mark Waiting
            </button>

            <button
              onClick={() => handleStatusChange(activeMenu.id, "Rejected")}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-rose-50 text-rose-700 font-bold flex items-center gap-2 transition"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Mark Rejected
            </button>

            <div className="h-px bg-slate-100 my-1.5"></div>

            {/* Quick WhatsApp / Call */}
            {activeMenu.record.phone && (
              <div className="flex items-center gap-1.5 px-1 mb-1.5">
                <a
                  href={`https://wa.me/91${activeMenu.record.phone.replace(/\D/g, "").slice(-10)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-center hover:bg-emerald-100 transition flex items-center justify-center gap-1 text-[11px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${activeMenu.record.phone.replace(/\D/g, "")}`}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-blue-50 text-blue-700 font-semibold text-center hover:bg-blue-100 transition flex items-center justify-center gap-1 text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
              </div>
            )}

            <button
              onClick={() => {
                const rec = activeMenu.record;
                handleDelete(rec._id, rec.name);
              }}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-red-50 text-red-600 font-bold flex items-center gap-2 transition"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              Delete Record
            </button>
          </div>
        </>
      )}

      {/* ── Bottom Pagination Controls ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs font-semibold text-slate-500">
        <div>
          Showing <span className="text-slate-900 font-bold">{startIndex + 1}</span>-
          <span className="text-slate-900 font-bold">
            {Math.min(startIndex + pageSize, totalResults)}
          </span>{" "}
          of <span className="text-slate-900 font-bold">{totalResults}</span> results
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(Math.min(totalPages, 5))].map((_, i) => {
            const pageNum = i + 1;
            const isActive = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl font-bold transition ${
                  isActive
                    ? "bg-[#6d28d9] text-white shadow-sm"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── New Registration Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    New Student Registration
                  </h3>
                  <p className="text-xs text-slate-500">
                    Syncs directly with Aayush Institute database
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Kumar"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Father / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Select Course / Program *
                  </label>
                  <input
                    list="institute-courses-list"
                    type="text"
                    required
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    placeholder="Choose or type course..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                  <datalist id="institute-courses-list">
                    <option value="Software & Full Stack Development" />
                    <option value="Web Development (MERN / Next.js)" />
                    <option value="Cyber Security & Networking" />
                    <option value="Mobile App Development (Flutter / React Native)" />
                    <option value="Design, UI/UX & Media" />
                    <option value="AI, Data Science & Machine Learning" />
                    <option value="Digital Marketing & E-Commerce" />
                    <option value="Accounting & Business Skills" />
                    <option value="Placement Support Program" />
                  </datalist>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Academic Session
                  </label>
                  <select
                    value={formData.session}
                    onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-semibold"
                  >
                    <option value="2026–27">2026–27</option>
                    <option value="2025–26">2025–26</option>
                    <option value="2024–25">2024–25</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Registration Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-semibold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer"
                >
                  Save Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Student Full Details Modal ── */}
      {viewModalRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-indigo-50/30 to-purple-50/20">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-500/20">
                  {viewModalRecord.name
                    ? viewModalRecord.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "ST"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">
                      {viewModalRecord.name}
                    </h3>
                    {getStatusBadge(viewModalRecord.status)}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {(viewModalRecord.admissionId || "ADM-2026-001").replace(/ADM-\s+/g, "ADM-")}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          (viewModalRecord.admissionId || "ADM-2026-001").replace(/ADM-\s+/g, "ADM-"),
                          "admId"
                        )
                      }
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded transition"
                      title="Copy Admission ID"
                    >
                      {copiedField === "admId" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setViewModalRecord(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto text-xs">
              {/* Quick Status Bar */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Change Registration Status:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {["Approved", "Pending", "Waiting", "Rejected"].map((st) => {
                    const isSelected = (viewModalRecord.status || "Pending").toLowerCase() === st.toLowerCase();
                    return (
                      <button
                        key={st}
                        onClick={async () => {
                          await handleStatusChange(viewModalRecord._id, st);
                          setViewModalRecord((prev) => ({ ...prev, status: st }));
                        }}
                        className={`py-1.5 px-2 rounded-xl font-bold text-[11px] border transition cursor-pointer text-center ${
                          isSelected
                            ? st === "Approved"
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : st === "Pending"
                              ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                              : st === "Waiting"
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-rose-600 text-white border-rose-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Two Column Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Contact Card */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Contact Information</span>
                  </p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Mobile Phone</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-bold text-slate-800 text-sm">
                          {viewModalRecord.phone || "N/A"}
                        </span>
                        {viewModalRecord.phone && (
                          <div className="flex items-center gap-1">
                            <a
                              href={`https://wa.me/91${viewModalRecord.phone.replace(/\D/g, "").slice(-10)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`tel:${viewModalRecord.phone}`}
                              className="p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                              title="Direct Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Email Address</span>
                      <a
                        href={`mailto:${viewModalRecord.email}`}
                        className="font-semibold text-indigo-600 hover:underline block truncate mt-0.5"
                      >
                        {viewModalRecord.email || "No email provided"}
                      </a>
                    </div>

                    {(viewModalRecord.city || viewModalRecord.state) && (
                      <div>
                        <span className="text-slate-400 text-[10px] block">Location</span>
                        <p className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{[viewModalRecord.city, viewModalRecord.state].filter(Boolean).join(", ")}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Academic & Course Card */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Course & Academic</span>
                  </p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Enrolled Program</span>
                      <p className="font-bold text-indigo-700 mt-0.5">
                        {viewModalRecord.careerDomain ||
                          viewModalRecord.className ||
                          viewModalRecord.course ||
                          viewModalRecord.program ||
                          "General Registration"}
                      </p>
                    </div>

                    {viewModalRecord.fatherName && viewModalRecord.fatherName !== "N/A" && (
                      <div>
                        <span className="text-slate-400 text-[10px] block">Guardian / Father</span>
                        <p className="font-semibold text-slate-800 mt-0.5">
                          {viewModalRecord.fatherName}
                        </p>
                      </div>
                    )}

                    <div>
                      <span className="text-slate-400 text-[10px] block">Inquiry Type / Track</span>
                      <p className="font-semibold text-slate-700 mt-0.5">
                        {viewModalRecord.inquiryType || "Course Admission"}
                      </p>
                    </div>

                    {(viewModalRecord.qualification || viewModalRecord.degree || viewModalRecord.passingYear) && (
                      <div>
                        <span className="text-slate-400 text-[10px] block">Prior Education / Year</span>
                        <p className="font-semibold text-slate-700 mt-0.5">
                          {[viewModalRecord.qualification || viewModalRecord.degree, viewModalRecord.passingYear]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Student Query / Notes if any */}
              {(viewModalRecord.notes || viewModalRecord.message) && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <p className="text-[11px] font-extrabold text-indigo-900 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Candidate Inquiry Note:</span>
                  </p>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{viewModalRecord.notes || viewModalRecord.message}"
                  </p>
                </div>
              )}

              {/* Registration Timestamp */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Registered on{" "}
                    {viewModalRecord.createdAt
                      ? new Date(viewModalRecord.createdAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "3 Oct 2026"}
                  </span>
                </span>
                <span className="font-mono text-[10px]">
                  MongoDB ID: {viewModalRecord._id?.slice(-8)}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  handleDelete(viewModalRecord._id, viewModalRecord.name);
                  setViewModalRecord(null);
                }}
                className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                {viewModalRecord.phone && (
                  <a
                    href={`https://wa.me/91${viewModalRecord.phone.replace(/\D/g, "").slice(-10)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={() => setViewModalRecord(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 font-bold text-slate-700 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsAdmin;
