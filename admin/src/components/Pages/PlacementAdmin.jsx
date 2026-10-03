import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Briefcase,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Phone,
  Trash2,
  RefreshCw,
  Download,
  Plus,
  Edit3,
  Award,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Calendar,
  Building2,
  Send,
  X,
  AlertCircle
} from "lucide-react";

export default function PlacementAdmin() {
  const [activeSubTab, setActiveSubTab] = useState("registrations"); // "registrations" | "roles"
  const [registrations, setRegistrations] = useState([]);
  const [loadingRegs, setLoadingRegs] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notification, setNotification] = useState({ type: "", text: "" });

  const showNotice = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: "", text: "" }), 4000);
  };

  // Fetch placement candidate registrations from MongoDB
  const fetchRegistrations = async (silent = false) => {
    if (!silent) setLoadingRegs(true);
    try {
      const res = await axios.get("/api/inquiry/all-submissions");
      const list = Array.isArray(res.data) ? res.data : [];
      // Filter for Placement Support candidates
      const placementLeads = list.filter(
        (r) =>
          r.inquiryType === "Placement Support" ||
          (r.className && r.className.toLowerCase().includes("placement")) ||
          !!r.careerDomain ||
          !!r.qualification
      );
      setRegistrations(placementLeads);
    } catch (err) {
      console.error("Failed to load placement candidates:", err);
    } finally {
      if (!silent) setLoadingRegs(false);
    }
  };

  useEffect(() => {
    fetchRegistrations(false);
    const interval = setInterval(() => fetchRegistrations(true), 4000);
    return () => clearInterval(interval);
  }, []);

  // Update candidate status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/api/inquiry/${id}`, { status: newStatus });
      setRegistrations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
      showNotice("success", `Candidate status marked as ${newStatus}!`);
    } catch (err) {
      showNotice("error", "Failed to update status.");
    }
  };

  // Delete candidate
  const handleDeleteRegistration = async (id, name) => {
    if (!window.confirm(`Delete placement registration for ${name}?`)) return;
    try {
      await axios.delete(`/api/inquiry/${id}`);
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
      showNotice("success", `Registration for ${name} removed.`);
    } catch (err) {
      showNotice("error", "Failed to delete record.");
    }
  };

  // Export registrations to CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) return alert("No candidate records to export.");
    const headers = [
      "Candidate Name",
      "Phone",
      "Email",
      "Highest Qualification",
      "Passing Year",
      "Target Domain",
      "Comments / Goals",
      "Registered Date",
      "Status"
    ];
    const rows = registrations.map((r) => [
      `"${r.name || ""}"`,
      r.phone || "",
      r.email || "",
      `"${r.qualification || r.degree || ""}"`,
      `"${r.passingYear || ""}"`,
      `"${r.careerDomain || r.preferredRole || ""}"`,
      `"${(r.notes || r.message || "").replace(/"/g, '""')}"`,
      r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB") : "",
      r.status || "New"
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Placement_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered candidate list
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const matchStatus =
        statusFilter === "All" ||
        (r.status && r.status.toLowerCase() === statusFilter.toLowerCase());
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.phone && r.phone.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.careerDomain && r.careerDomain.toLowerCase().includes(q)) ||
        (r.qualification && r.qualification.toLowerCase().includes(q)) ||
        (r.notes && r.notes.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [registrations, statusFilter, searchTerm]);

  // Initial Placement Roles catalog data
  const defaultPlacementRoles = {
    it: [
      { name: "Software Development", subgroup: "Core Development", duration: "Full-Time / Hybrid", targetRole: "Junior Software Engineer / SDE-1", popular: true },
      { name: "Web Development", subgroup: "Web & Frontend", duration: "Full-Time / Hybrid", targetRole: "Web Developer / Frontend Associate", popular: true },
      { name: "Full Stack Development", subgroup: "Full Stack Engineering", duration: "Full-Time / On-Site", targetRole: "Full Stack Engineer", popular: true },
      { name: "Python Development", subgroup: "Backend Engineering", duration: "Full-Time / Hybrid", targetRole: "Python Developer / Backend Engineer", popular: true },
      { name: "Java Development", subgroup: "Backend Engineering", duration: "Full-Time / On-Site", targetRole: "Java Developer / Spring Boot Engineer", popular: true },
    ],
    data: [
      { name: "Data Analyst", subgroup: "Analytics & BI", duration: "Full-Time / Hybrid", targetRole: "Junior Data Analyst", popular: true },
      { name: "Power BI Developer", subgroup: "Analytics & BI", duration: "Full-Time / Hybrid", targetRole: "BI Developer / Dashboard Specialist", popular: true },
      { name: "AI & Machine Learning", subgroup: "Intelligent Systems", duration: "Full-Time / Hybrid", targetRole: "ML Associate / AI Engineer", popular: true },
      { name: "Cloud & DevOps", subgroup: "Infrastructure", duration: "Full-Time / On-Site", targetRole: "Cloud Engineer / DevOps Associate", popular: true },
    ],
    digital: [
      { name: "Digital Marketing Specialist", subgroup: "Marketing & Growth", duration: "Full-Time / Hybrid", targetRole: "Digital Marketer / Performance Lead", popular: true },
      { name: "SEO Specialist", subgroup: "Marketing & Growth", duration: "Full-Time / Hybrid", targetRole: "SEO Strategist", popular: true },
      { name: "E-Commerce Executive", subgroup: "Business Operations", duration: "Full-Time / Hybrid", targetRole: "Catalog & E-Com Specialist", popular: true },
    ],
    design: [
      { name: "UI/UX Designer", subgroup: "Product Design", duration: "Full-Time / Hybrid", targetRole: "UI/UX Product Designer", popular: true },
      { name: "Graphic Designer", subgroup: "Visual Design", duration: "Full-Time / Hybrid", targetRole: "Visual Artist / Graphic Designer", popular: true },
    ],
    support: [
      { name: "Hardware & Network Engineer", subgroup: "Infrastructure", duration: "Full-Time / On-Site", targetRole: "Hardware & Network Engineer", popular: true },
      { name: "IT Desktop Support", subgroup: "Technical Services", duration: "Full-Time / On-Site", targetRole: "Desktop Support Engineer", popular: true },
    ]
  };

  const [rolesData, setRolesData] = useState(() => {
    try {
      const saved = localStorage.getItem("aayush_placement_roles_custom");
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultPlacementRoles;
  });

  const [activeCategory, setActiveCategory] = useState("it");
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleForm, setNewRoleForm] = useState({
    name: "",
    category: "it",
    subgroup: "Core Engineering",
    duration: "Full-Time / Hybrid",
    targetRole: "",
    popular: true
  });

  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!newRoleForm.name.trim()) return;
    const cat = newRoleForm.category || "it";
    const updated = {
      ...rolesData,
      [cat]: [
        {
          name: newRoleForm.name.trim(),
          subgroup: newRoleForm.subgroup.trim() || "Core Engineering",
          duration: newRoleForm.duration || "Full-Time / Hybrid",
          targetRole: newRoleForm.targetRole.trim() || newRoleForm.name.trim(),
          popular: !!newRoleForm.popular
        },
        ...(rolesData[cat] || [])
      ]
    };
    setRolesData(updated);
    try {
      localStorage.setItem("aayush_placement_roles_custom", JSON.stringify(updated));
      window.dispatchEvent(new Event("placementRolesUpdated"));
      window.dispatchEvent(new Event("storage"));
    } catch {}
    setShowAddRoleModal(false);
    setNewRoleForm({
      name: "",
      category: "it",
      subgroup: "Core Engineering",
      duration: "Full-Time / Hybrid",
      targetRole: "",
      popular: true
    });
    showNotice("success", `Career path "${newRoleForm.name}" added to placement catalog!`);
  };

  const handleDeleteRole = (catKey, roleName) => {
    if (!window.confirm(`Delete career path "${roleName}" from placement catalog?`)) return;
    const updated = {
      ...rolesData,
      [catKey]: (rolesData[catKey] || []).filter((r) => r.name !== roleName)
    };
    setRolesData(updated);
    try {
      localStorage.setItem("aayush_placement_roles_custom", JSON.stringify(updated));
      window.dispatchEvent(new Event("placementRolesUpdated"));
      window.dispatchEvent(new Event("storage"));
    } catch {}
    showNotice("success", `Career path "${roleName}" removed.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification.text && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border animate-in slide-in-from-top-3 ${
            notification.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          )}
          <span className="text-xs font-bold">{notification.text}</span>
          <button onClick={() => setNotification({ type: "", text: "" })}>
            <X className="w-4 h-4 ml-1 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Briefcase className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Placement & Career Support
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage student placement registrations, career opportunities, and partner recruiter pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchRegistrations(false)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingRegs ? "animate-spin" : ""}`} />
            <span>Sync Live</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Candidates</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Placement Registrations</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{registrations.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Approved / Contacted</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">
              {registrations.filter((r) => r.status === "Approved" || r.status === "Contacted").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">New / Reviewing</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">
              {registrations.filter((r) => !r.status || r.status === "New" || r.status === "Pending").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Career Paths Available</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">
              {Object.values(rolesData).reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Switcher Tabs: Registrations vs Roles */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab("registrations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeSubTab === "registrations"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Registrations ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("roles")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeSubTab === "roles"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Career Paths & Opportunities Catalog</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CANDIDATE REGISTRATIONS TABLE                                  */}
      {/* ========================================================================= */}
      {activeSubTab === "registrations" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate name, phone, email, qualification, target domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
              {["All", "New", "Pending", "Approved", "Contacted", "Placed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    statusFilter === status
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">CANDIDATE</th>
                  <th className="py-3.5 px-4">CONTACT & WHATSAPP</th>
                  <th className="py-3.5 px-4">QUALIFICATION & YEAR</th>
                  <th className="py-3.5 px-4">TARGET DOMAIN</th>
                  <th className="py-3.5 px-4">COMMENTS / GOALS</th>
                  <th className="py-3.5 px-4">DATE</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {loadingRegs ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-400">
                      <div className="inline-block animate-spin rounded-full h-7 w-7 border-3 border-blue-600 border-t-transparent mb-2"></div>
                      <p>Loading candidate registrations...</p>
                    </td>
                  </tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-16 text-center text-slate-400">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-slate-800 text-sm">No Placement Registrations Found</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        Candidates submitting the "Register for Placement Support" form on the website will be shown here in real-time.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((r) => {
                    const cleanPhone = (r.phone || "").replace(/\D/g, "");
                    return (
                      <tr key={r._id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Candidate */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                              {(r.name || "ST").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-xs">{r.name}</p>
                              <span className="text-[10px] text-blue-600 font-semibold">{r.admissionId || "PLACEMENT-REG"}</span>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <p className="text-slate-800 font-semibold text-xs">{r.phone}</p>
                            <p className="text-slate-400 text-[11px] truncate max-w-[140px]">{r.email}</p>
                            {cleanPhone && (
                              <a
                                href={`https://wa.me/91${cleanPhone.slice(-10)}?text=Hello%20${encodeURIComponent(r.name)},%20we%20reviewed%20your%20placement%20support%20application%20at%20Aayush%20Institute.`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold hover:underline pt-0.5"
                              >
                                <MessageCircle className="w-3 h-3" /> WhatsApp Candidate
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Qualification & Year */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="space-y-0.5">
                            <span className="inline-block px-2 py-0.5 rounded-md font-bold text-[11px] bg-slate-100 text-slate-700">
                              {r.qualification || r.degree || "B.Sc. IT / CS"}
                            </span>
                            <p className="text-[10px] text-slate-500 font-medium">
                              Year: {r.passingYear || "Pursuing Final Year"}
                            </p>
                          </div>
                        </td>

                        {/* Target Domain */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            💼 {r.careerDomain || r.preferredRole || "Web Development"}
                          </span>
                        </td>

                        {/* Comments */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-xs text-slate-600 italic line-clamp-2">
                            "{r.notes || r.message || "Interview drills & job updates"}"
                          </p>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB") : "Recently"}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={r.status || "New"}
                            onChange={(e) => handleStatusChange(r._id, e.target.value)}
                            className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                              r.status === "Approved" || r.status === "Placed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : r.status === "Contacted"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Approved">Approved</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Placed">Placed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteRegistration(r._id, r.name)}
                            title="Delete registration"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: CAREER ROLES & PATHS CATALOG                                   */}
      {/* ========================================================================= */}
      {activeSubTab === "roles" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Career Paths Catalog</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize industry roles visible under each domain on the Placement Opportunities page.
              </p>
            </div>
            <button
              onClick={() => setShowAddRoleModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Career Path</span>
            </button>
          </div>

          {/* Domain tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
            {[
              { id: "it", label: "IT & Software" },
              { id: "data", label: "Data, AI & Tech" },
              { id: "digital", label: "Digital & Business" },
              { id: "design", label: "Design & Creative" },
              { id: "support", label: "Technical & IT Support" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.label} ({Array.isArray(rolesData[cat.id]) ? rolesData[cat.id].length : 0})
              </button>
            ))}
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(rolesData[activeCategory] || []).map((role, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">
                      {role.subgroup || "Engineering"}
                    </span>
                    {role.popular && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ★ POPULAR
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{role.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">Target: {role.targetRole || role.name}</p>
                  <p className="text-[11px] text-slate-400">Duration: {role.duration || "Full-Time / Hybrid"}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-end">
                  <button
                    onClick={() => handleDeleteRole(activeCategory, role.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete path"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add New Career Path */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Career Path</h3>
              <button
                onClick={() => setShowAddRoleModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Career Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Security Analyst"
                  value={newRoleForm.name}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Domain Category</label>
                <select
                  value={newRoleForm.category}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                >
                  <option value="it">IT & Software</option>
                  <option value="data">Data, AI & Tech</option>
                  <option value="digital">Digital & Business</option>
                  <option value="design">Design & Creative</option>
                  <option value="support">Technical & IT Support</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subgroup</label>
                <input
                  type="text"
                  placeholder="e.g. Cloud & Infrastructure"
                  value={newRoleForm.subgroup}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, subgroup: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Security Engineer"
                  value={newRoleForm.targetRole}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, targetRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddRoleModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Save Career Path
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
