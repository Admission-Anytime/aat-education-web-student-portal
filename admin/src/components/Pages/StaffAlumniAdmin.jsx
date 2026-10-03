import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Building,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Copy,
  RefreshCw,
  ExternalLink,
  Shield,
  Award,
  Clock,
  AlertTriangle,
} from "lucide-react";

const StaffAlumniAdmin = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'staff', 'alumni'
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "staff",
    phone: "",
    department: "",
    course: "",
    memberId: "",
    batch: "",
    company: "",
    designation: "",
    qualification: "",
    experience: "",
    bio: "",
    image: "",
    status: "active",
    password: "",
  });

  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3500);
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");
      if (res.data?.data) {
        setMembers(res.data.data);
      } else if (Array.isArray(res.data)) {
        setMembers(res.data);
      }
    } catch (err) {
      console.error("Error fetching staff/alumni:", err);
      showToast("Failed to fetch members list", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenAdd = (defaultRole = "staff") => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      name: "",
      email: "",
      role: defaultRole,
      phone: "",
      department: "",
      course: "",
      memberId: "",
      batch: "",
      company: "",
      designation: defaultRole === "staff" ? "Faculty Instructor" : "",
      qualification: "",
      experience: "",
      bio: "",
      image: "",
      status: "active",
      password: "password123",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (member) => {
    setIsEditing(true);
    setCurrentId(member._id);
    setFormData({
      name: member.name || "",
      email: member.email || "",
      role: member.role || "staff",
      phone: member.phone || "",
      department: member.department || "",
      course: member.course || "",
      memberId: member.memberId || "",
      batch: member.batch || "",
      company: member.company || "",
      designation: member.designation || "",
      qualification: member.qualification || "",
      experience: member.experience || "",
      bio: member.bio || "",
      image: member.image || "",
      status: member.status || "active",
      password: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove ${name}?`)) return;
    try {
      await axios.delete(`/api/users/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
      showToast(`${name} removed successfully`);
    } catch (err) {
      console.error("Error deleting member:", err);
      showToast("Failed to delete member", "error");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all staff and alumni records from the database?")) return;
    try {
      await axios.delete("/api/users/clear-all");
      setMembers([]);
      showToast("All records cleared from database successfully");
    } catch (err) {
      console.error("Error clearing records:", err);
      showToast("Failed to clear records", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await axios.put(`/api/users/${currentId}`, formData);
        setMembers((prev) =>
          prev.map((m) => (m._id === currentId ? (res.data?.data || res.data) : m))
        );
        showToast("Member details updated successfully");
      } else {
        const res = await axios.post("/api/users", formData);
        const newMember = res.data?.data || res.data;
        setMembers((prev) => [newMember, ...prev]);
        showToast("New member added successfully");
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error saving member:", err);
      showToast(err.response?.data?.message || "Failed to save member details", "error");
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  // Quick Admin Approval Handler
  const handleApproveMember = async (id, memberName) => {
    try {
      const res = await axios.put(`/api/auth/approve-user/${id}`, { action: "approve" });
      showToast(res.data?.message || `Approved ${memberName}'s account!`);
      setMembers((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: "active", isApproved: true } : m))
      );
    } catch (err) {
      showToast("Failed to approve account", "error");
    }
  };

  // Quick Admin Rejection Handler
  const handleRejectMember = async (id, memberName) => {
    if (!window.confirm(`Reject / Deactivate account request for ${memberName}?`)) return;
    try {
      const res = await axios.put(`/api/auth/approve-user/${id}`, { action: "reject" });
      showToast(res.data?.message || `Rejected ${memberName}'s account`);
      setMembers((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: "inactive", isApproved: false } : m))
      );
    } catch (err) {
      showToast("Failed to update status", "error");
    }
  };

  // Filter logic
  const filteredMembers = members.filter((m) => {
    let matchesTab = true;
    if (activeTab === "staff") matchesTab = m.role === "staff";
    else if (activeTab === "alumni") matchesTab = m.role === "alumni";
    else if (activeTab === "pending") matchesTab = m.status === "pending" || m.isApproved === false;
    else matchesTab = true;

    const matchesDept =
      departmentFilter === "all" ||
      (m.department && m.department.toLowerCase().includes(departmentFilter.toLowerCase()));
    const matchesSearch =
      searchTerm === "" ||
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.memberId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.department?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesDept && matchesSearch;
  });

  const staffCount = members.filter((m) => m.role === "staff").length;
  const alumniCount = members.filter((m) => m.role === "alumni").length;
  const activeCount = members.filter((m) => m.status === "active").length;
  const pendingCount = members.filter((m) => m.status === "pending" || m.isApproved === false).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-2xl text-white font-medium flex items-center gap-2 transform transition-all duration-300 ${
            notification.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {notification.type === "error" ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md">
              <Users className="w-7 h-7 text-white" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Staff & Alumni Directory</h1>
          </div>
          <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-2xl">
            Manage faculty staff profiles, login access credentials, pending registration approvals, and alumni records.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => handleOpenAdd("staff")}
            className="flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <UserPlus className="w-4 h-4 text-blue-700" />
            + Add Staff
          </button>
          <button
            onClick={() => handleOpenAdd("alumni")}
            className="flex items-center gap-2 bg-indigo-500/80 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
          >
            <GraduationCap className="w-4 h-4 text-white" />
            + Add Alumni
          </button>
          <button
            onClick={fetchMembers}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          {members.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold transition"
              title="Clear all staff and alumni from database"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold text-gray-500">Total Members</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{members.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold text-gray-500">Staff & Faculty</p>
            <p className="text-2xl font-black text-indigo-600 mt-1">{staffCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold text-gray-500">Alumni Network</p>
            <p className="text-2xl font-black text-sky-600 mt-1">{alumniCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* 4th Card: Pending Approvals */}
        <div
          onClick={() => setActiveTab("pending")}
          className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between cursor-pointer transition-all ${
            pendingCount > 0
              ? "bg-amber-50/70 border-amber-200 hover:bg-amber-100/60"
              : "bg-white border-gray-100"
          }`}
        >
          <div>
            <p className="text-xs uppercase font-semibold text-amber-700 flex items-center gap-1.5">
              <span>Pending Approvals</span>
              {pendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              )}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{pendingCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs & Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Role Segmented Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All Members ({members.length})
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "staff"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Staff & Faculty ({staffCount})
          </button>
          <button
            onClick={() => setActiveTab("alumni")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "alumni"
                ? "bg-white text-sky-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Alumni ({alumniCount})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "pending"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-amber-800 hover:bg-amber-100/60"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Pending Approval ({pendingCount})
          </button>
        </div>

        {/* Search & Filter Inputs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search name, ID, email, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <button
            onClick={fetchMembers}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Members Grid / Cards */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-500 font-medium">Loading staff & alumni records...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">No Members Found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
            No profiles match your current search or tab filter. Try changing filters or add a new member.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => { setSearchTerm(""); setActiveTab("all"); }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-700"
            >
              Clear Filters
            </button>
            <button
              onClick={() => handleOpenAdd("staff")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow"
            >
              + Add First Member
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMembers.map((member) => {
            const isStaff = member.role === "staff";
            const isAlumni = member.role === "alumni";
            
            return (
              <div
                key={member._id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header with Role Banner */}
                <div>
                  <div
                    className={`h-2 w-full ${
                      isStaff
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                        : isAlumni
                        ? "bg-gradient-to-r from-sky-500 to-teal-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-xs shrink-0"
                          />
                        ) : (
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${
                              isStaff
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                : "bg-sky-50 text-sky-700 border border-sky-100"
                            }`}
                          >
                            {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition">
                              {member.name}
                            </h3>
                          </div>
                          {member.designation && (
                            <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                              {member.designation}
                            </p>
                          )}
                          <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                            ID: {member.memberId || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Role Pill */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                          isStaff
                            ? "bg-indigo-100 text-indigo-800"
                            : isAlumni
                            ? "bg-sky-100 text-sky-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {isStaff ? <Briefcase className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                        {member.role || "Member"}
                      </span>
                    </div>

                    {/* Details Box */}
                    <div className="mt-4 space-y-2 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 text-xs">
                      {member.department && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Building className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-semibold text-gray-500">Dept:</span>
                          <span className="truncate font-medium">{member.department}</span>
                        </div>
                      )}

                      {member.course && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <GraduationCap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-semibold text-gray-500">Specialization:</span>
                          <span className="truncate font-medium">{member.course}</span>
                        </div>
                      )}

                      {member.batch && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Award className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-semibold text-gray-500">Batch:</span>
                          <span className="font-medium">{member.batch}</span>
                        </div>
                      )}

                      {member.company && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Briefcase className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="font-semibold text-gray-500">Placed at:</span>
                          <span className="font-semibold text-emerald-700 truncate">{member.company}</span>
                        </div>
                      )}

                      {/* Email with copy */}
                      <div className="flex items-center justify-between text-gray-700 pt-1 border-t border-gray-200/60">
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(member.email, "Email")}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500"
                          title="Copy Email"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Phone with copy */}
                      {member.phone && (
                        <div className="flex items-center justify-between text-gray-700">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span>{member.phone}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(member.phone, "Phone")}
                            className="p-1 hover:bg-gray-200 rounded text-gray-500"
                            title="Copy Phone"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  {member.status === "pending" || member.isApproved === false ? (
                    <div className="flex items-center justify-between w-full gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending Approval
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleApproveMember(member._id, member.name)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
                          title="Approve this member for login access"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectMember(member._id, member.name)}
                          className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold border border-rose-200 transition"
                          title="Reject request"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === "active" ? "bg-emerald-500" : "bg-gray-400"
                          }`}
                        />
                        <span className="text-[11px] font-semibold text-gray-600 capitalize">
                          {member.status === "active" ? "Approved & Active" : member.status || "Active"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(member)}
                          className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition"
                          title="Edit Profile"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id, member.name)}
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-blue-600 text-white rounded-xl">
                  {formData.role === "staff" ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {isEditing ? "Edit Member Profile" : "Add New Staff / Alumni"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formData.role === "staff" ? "Faculty & Staff Member" : "Alumni Network Member"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Role Toggle */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Member Type / Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "staff" })}
                    className={`py-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition ${
                      formData.role === "staff"
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Staff / Faculty
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "alumni" })}
                    className={`py-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition ${
                      formData.role === "alumni"
                        ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Alumni
                  </button>
                </div>
              </div>

              {/* Full Name & Member ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Sharma"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Member / Staff ID</label>
                  <input
                    type="text"
                    value={formData.memberId}
                    onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                    placeholder={formData.role === "staff" ? "e.g. STF-105" : "e.g. ALM-2023-01"}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@aayushinstitute.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91-9876543210"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Department & Specialization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Specialization / Subject</label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    placeholder="e.g. MERN Stack & AI"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Designation & Qualification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Designation / Role Title</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Senior Faculty / Head of Dept"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. M.Tech in CS, Ph.D., CA"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Experience & Photo Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Teaching / Industry Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 10+ Years Experience"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://... photo link"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Conditional Alumni fields */}
              {formData.role === "alumni" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-sky-50/60 rounded-xl border border-sky-100">
                  <div>
                    <label className="block text-xs font-semibold text-sky-900 mb-1">Graduation Batch</label>
                    <input
                      type="text"
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                      placeholder="e.g. 2022-2023"
                      className="w-full px-3 py-2 bg-white border border-sky-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sky-900 mb-1">Current Company & Role</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. TCS • Software Engineer"
                      className="w-full px-3 py-2 bg-white border border-sky-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Account Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive / On Leave</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
                >
                  {isEditing ? "Save Changes" : "Create Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAlumniAdmin;
