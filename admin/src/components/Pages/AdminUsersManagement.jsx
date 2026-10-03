import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  RefreshCw,
  Copy,
  ShieldAlert,
  UserCheck,
  Users,
  Clock,
  AlertCircle,
  Check,
  Search,
  Filter,
  User,
  Shield,
} from "lucide-react";

const AdminUsersManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | pending | suspended
  const [searchTerm, setSearchTerm] = useState("");

  // New admin form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
    status: "active",
  });

  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3500);
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth/admins");
      if (res.data?.data) {
        setAdmins(res.data.data);
      } else if (Array.isArray(res.data)) {
        setAdmins(res.data);
      }
    } catch (err) {
      console.error("Error fetching admins:", err);
      showToast("Failed to fetch admin accounts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin",
      status: "active",
    });
    setShowPassword(false);
    setShowModal(true);
  };

  const handleDelete = async (id, email) => {
    if (admins.length <= 1) {
      alert("Cannot delete the only remaining admin account! At least one admin is required.");
      return;
    }
    if (!window.confirm(`Are you sure you want to revoke admin access for ${email}?`)) return;

    try {
      await axios.delete(`/api/auth/admins/${id}`);
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      showToast(`Admin ${email} removed successfully`);
    } catch (err) {
      console.error("Error deleting admin:", err);
      showToast("Failed to delete admin account", "error");
    }
  };

  const handleUpdateStatus = async (id, newStatus, email) => {
    try {
      const res = await axios.patch(`/api/auth/admins/${id}/status`, { status: newStatus });
      if (res.data?.success) {
        showToast(`Admin ${email} status set to ${newStatus.toUpperCase()}`);
        setAdmins((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
      showToast("Failed to update status", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    if (formData.password.length < 6) {
      showToast("Password must be at least 6 characters long", "error");
      return;
    }

    try {
      const res = await axios.post("/api/auth/admins", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status,
      });

      if (res.data?.success) {
        showToast("New admin account created successfully!");
        setShowModal(false);
        fetchAdmins();
      } else {
        showToast(res.data?.message || "Failed to create admin", "error");
      }
    } catch (err) {
      console.error("Error creating admin:", err);
      showToast(err.response?.data?.message || "Error creating admin account", "error");
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  // Status Counts
  const activeCount = admins.filter((a) => (a.status || "active") === "active").length;
  const pendingCount = admins.filter((a) => a.status === "pending").length;
  const suspendedCount = admins.filter((a) => a.status === "suspended").length;

  // Filtered Admins
  const filteredAdmins = admins.filter((admin) => {
    const status = admin.status || "active";
    const matchesFilter =
      statusFilter === "all" ? true : status.toLowerCase() === statusFilter.toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (admin.email && admin.email.toLowerCase().includes(query)) ||
      (admin.name && admin.name.toLowerCase().includes(query)) ||
      (admin.role && admin.role.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

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
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-400/30 backdrop-blur-md">
              <ShieldCheck className="w-7 h-7 text-blue-400" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Admin Accounts & Security</h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-2xl">
            Control administrator privileges, review pending admin requests, manage active permissions, and monitor access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <UserPlus className="w-4 h-4" />
            + Create Admin Account
          </button>
          <button
            onClick={fetchAdmins}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Dynamic Status KPI Cards (Replaced static encryption/jwt cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Admins */}
        <div
          onClick={() => setStatusFilter("all")}
          className={`cursor-pointer p-6 rounded-2xl border transition-all ${
            statusFilter === "all"
              ? "bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-md"
              : "bg-white border-gray-100 shadow-sm hover:border-gray-200"
          } flex items-center justify-between`}
        >
          <div>
            <p className="text-xs uppercase font-semibold text-gray-500">Total Administrators</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{admins.length}</p>
            <p className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> All registered accounts
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-7 h-7" />
          </div>
        </div>

        {/* Active Admins */}
        <div
          onClick={() => setStatusFilter("active")}
          className={`cursor-pointer p-6 rounded-2xl border transition-all ${
            statusFilter === "active"
              ? "bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20 shadow-md"
              : "bg-white border-gray-100 shadow-sm hover:border-gray-200"
          } flex items-center justify-between`}
        >
          <div>
            <p className="text-xs uppercase font-semibold text-gray-500">Active Admins</p>
            <p className="text-3xl font-black text-emerald-600 mt-1">{activeCount}</p>
            <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Full Portal Privileges
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-7 h-7" />
          </div>
        </div>

        {/* Pending Approvals */}
        <div
          onClick={() => setStatusFilter("pending")}
          className={`cursor-pointer p-6 rounded-2xl border transition-all ${
            statusFilter === "pending"
              ? "bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/20 shadow-md"
              : "bg-white border-gray-100 shadow-sm hover:border-gray-200"
          } flex items-center justify-between`}
        >
          <div>
            <p className="text-xs uppercase font-semibold text-gray-500">Pending Approvals</p>
            <p className="text-3xl font-black text-amber-600 mt-1">{pendingCount}</p>
            <p className="text-xs text-amber-700 font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {pendingCount > 0 ? "Requires Authorization" : "All Approved"}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Admin Accounts Table with Filter Tabs and Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filter and Search Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Admins ({admins.length})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === "active"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === "pending"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
              }`}
            >
              Pending Approval ({pendingCount})
            </button>
            {suspendedCount > 0 && (
              <button
                onClick={() => setStatusFilter("suspended")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === "suspended"
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-white text-red-700 hover:bg-red-50 border border-red-200"
                }`}
              >
                Suspended ({suspendedCount})
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search admin user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3"></div>
            <p className="text-gray-500 font-medium text-sm">Loading administrator list...</p>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-bold text-sm">No administrators found</p>
            <p className="text-xs text-gray-400 mt-1">
              {statusFilter !== "all"
                ? `No accounts with '${statusFilter}' status.`
                : "No matching administrator accounts found."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-bold text-gray-500 tracking-wider">
                  <th className="py-4 px-6">Admin User</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Account Status</th>
                  <th className="py-4 px-6">Created On</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredAdmins.map((admin, idx) => {
                  const currentStatus = admin.status || "active";
                  return (
                    <tr key={admin._id || idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow">
                            {(admin.name?.charAt(0) || admin.email.charAt(0)).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">
                                {admin.name || admin.email}
                              </span>
                              <button
                                onClick={() => handleCopy(admin.email, "Admin email")}
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy Email"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-xs text-gray-400">{admin.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          {admin.role || "Admin"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {currentStatus === "active" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </span>
                          )}
                          {currentStatus === "pending" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                              Pending Approval
                            </span>
                          )}
                          {currentStatus === "suspended" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                              <span className="w-2 h-2 rounded-full bg-red-500"></span>
                              Suspended
                            </span>
                          )}

                          {/* Quick Status Toggle */}
                          <select
                            value={currentStatus}
                            onChange={(e) => handleUpdateStatus(admin._id, e.target.value, admin.email)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                          >
                            <option value="active">Set Active</option>
                            <option value="pending">Set Pending</option>
                            <option value="suspended">Set Suspended</option>
                          </select>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-gray-500 text-xs">
                        {admin.createdAt
                          ? new Date(admin.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Verified"}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {currentStatus === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(admin._id, "active", admin.email)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition inline-flex items-center gap-1 text-xs font-bold shadow-sm"
                              title="Approve Admin"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Approve
                            </button>
                          )}

                          {admins.length > 1 ? (
                            <button
                              onClick={() => handleDelete(admin._id, admin.email)}
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition inline-flex items-center gap-1 text-xs font-bold"
                              title="Delete Admin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Revoke
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Primary Account</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-blue-600 text-white rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Create Admin Account</h3>
                  <p className="text-xs text-gray-500">Configure administrative profile & permissions</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Admin Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="admin2@aayushinstitute.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff Admin">Staff Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="active">Active (Immediate)</option>
                    <option value="pending">Pending Approval</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Admin accounts possess access to manage courses, student leads, staff approvals, and website content.
                </span>
              </div>

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
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersManagement;
