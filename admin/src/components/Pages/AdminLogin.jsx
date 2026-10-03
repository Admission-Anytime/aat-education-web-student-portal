import React, { useState, useEffect } from "react";
import {
  LogIn,
  Mail,
  Lock,
  User,
  GraduationCap,
  Users,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Building,
  Briefcase,
  ArrowRight,
  ShieldAlert,
  X
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mode: "login" or "register"
  const [mode, setMode] = useState("login");
  const [selectedRole, setSelectedRole] = useState("admin"); // "admin", "staff", "alumni", "student"

  // Login Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register Form (for Staff, Alumni, Student)
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
    phone: "",
    department: "",
    course: "",
    company: "",
    batch: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Auto-redirect if already logged in with valid token & role
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");

    if (token) {
      try {
        const user = JSON.parse(userStr);
        if (user?.role === "student" || user?.role === "alumni") {
          navigate("/student");
          return;
        }
        if (user?.role === "admin") {
          navigate("/panel");
          return;
        }
        if (user?.role === "staff" && user?.isApproved === true && user?.status === "active") {
          navigate("/panel");
          return;
        }
      } catch (err) {}
    }

    if (searchParams.get("pending")) {
      setMessage({
        type: "pending",
        text: "Your account is currently pending Administrator approval. You cannot access the Admin Panel until verified.",
      });
    }
  }, [navigate, searchParams]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      let res;
      try {
        res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, roleHint: selectedRole }),
        });
      } catch (networkErr) {
        const backendBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:4001";
        res = await fetch(`${backendBase}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, roleHint: selectedRole }),
        });
      }

      const result = await res.json();

      // Check if account is blocked due to pending admin approval
      if (res.status === 403 || result.accountPending) {
        setMessage({
          type: "pending",
          text:
            result.message ||
            "Approval Required: Your account is pending Administrator approval. Please wait for an admin to verify your profile.",
        });
        return;
      }

      if (!res.ok) {
        throw new Error(result.message || "Invalid email or password");
      }

      // Store authentic credentials
      localStorage.setItem("adminToken", result.token || "logged_in");
      const userData = result.user || result.admin || { email, role: result.role || selectedRole };
      localStorage.setItem("adminUser", JSON.stringify(userData));

      // 🔒 STRICT NAVIGATION ENFORCEMENT
      const finalRole = result.role || userData.role || selectedRole;
      if (finalRole === "student") {
        userData.role = "student";
        localStorage.setItem("adminUser", JSON.stringify(userData));
        setMessage({
          type: "success",
          text: "Student login successful! Redirecting to Student Portal...",
        });
        setTimeout(() => navigate("/student"), 400);
      } else {
        setMessage({
          type: "success",
          text: `${result.role ? result.role.toUpperCase() : "Admin"} login successful! Redirecting to Management Panel...`,
        });
        setTimeout(() => navigate("/panel"), 400);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Login failed. Please check credentials." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Self Registration (Staff / Alumni / Student)
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      let res;
      const payload = {
        name: regForm.name,
        email: regForm.email,
        password: regForm.password,
        role: regForm.role,
        phone: regForm.phone,
        department: regForm.department,
        course: regForm.course,
        company: regForm.company,
        batch: regForm.batch,
      };

      try {
        res = await fetch("/api/auth/register-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        const backendBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:4001";
        res = await fetch(`${backendBase}/api/auth/register-request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to submit registration");
      }

      if (regForm.role === "staff" || regForm.role === "alumni") {
        setMessage({
          type: "pending",
          text: `Application Submitted! Your ${regForm.role} account has been registered and is now PENDING ADMINISTRATOR APPROVAL. Once approved by an admin, you will be able to log in.`,
        });
      } else {
        setMessage({
          type: "success",
          text: "Student account registered successfully! You can now log in to the Student Portal.",
        });
      }

      // Switch back to login form with pre-filled email
      setEmail(regForm.email);
      setPassword("");
      setMode("login");
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Registration failed." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in my-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 mb-3 ring-4 ring-white/10">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Aayush Institute
          </h1>
          <p className="text-xs text-indigo-200 mt-1">
            Enterprise Portal & Institutional Management
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">

          {/* Mode Tabs: Sign In vs Request Account */}
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === "register"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Staff / Alumni Registration
            </button>
          </div>

          {/* Alert Message Box */}
          {message && (
            <div
              className={`mb-5 p-4 rounded-2xl text-xs flex items-start gap-3 border animate-fade-in ${
                message.type === "pending"
                  ? "bg-amber-50 text-amber-900 border-amber-300"
                  : message.type === "error"
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
            >
              {message.type === "pending" ? (
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              ) : message.type === "error" ? (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold leading-relaxed">{message.text}</p>
              </div>
              <button onClick={() => setMessage(null)} className="opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* LOGIN FORM                                                                */}
          {/* ========================================================================= */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Indicator Pills */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Select Your Portal Role
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("admin")}
                    className={`py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                      selectedRole === "admin"
                        ? "bg-[#6d28d9] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin/Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("alumni")}
                    className={`py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                      selectedRole === "alumni"
                        ? "bg-[#6d28d9] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    Alumni
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("student")}
                    className={`py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                      selectedRole === "student"
                        ? "bg-[#6d28d9] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Student
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      selectedRole === "admin"
                        ? "aastechit@admin.com"
                        : selectedRole === "student"
                        ? "student@aayushinstitute.com"
                        : "alumni@techcorp.com"
                    }
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Password
                  </label>
                  <span className="text-[11px] text-[#6d28d9] font-medium">
                    Default: password123
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] transition-all"
                  />
                </div>
              </div>

              {/* Policy note */}
              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-[11px] text-purple-900 leading-relaxed">
                <span className="font-bold">Security & Role Notice:</span> Staff and Alumni accounts require explicit Admin Approval before login is permitted. Students log in directly to the Student Portal.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#6d28d9] hover:bg-[#5b21b6] shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Secure Sign In</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ========================================================================= */}
          {/* REGISTRATION FORM (Staff / Alumni Approval Request)                       */}
          {/* ========================================================================= */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Admin Approval Workflow:</strong> Staff & Alumni registration will be queued for administrator review. You cannot access the admin panel until approved.
                </span>
              </div>

              {/* Role selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Registering As *
                </label>
                <select
                  value={regForm.role}
                  onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                >
                  <option value="staff">Faculty / Staff Member (Requires Admin Approval)</option>
                  <option value="alumni">Alumnus / Former Graduate (Requires Admin Approval)</option>
                  <option value="student">Student (Direct Student Portal Access)</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  placeholder="e.g. Dr. Ramesh Sharma"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  placeholder="ramesh.sharma@aayushinstitute.com"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Set Password *
                </label>
                <input
                  type="password"
                  required
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  placeholder="Create a strong password"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  placeholder="+91-9876543210"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                />
              </div>

              {/* Department or Course / Company */}
              {regForm.role === "staff" ? (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Faculty Department
                  </label>
                  <input
                    type="text"
                    value={regForm.department}
                    onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                    placeholder="e.g. Computer Science & AI"
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                  />
                </div>
              ) : regForm.role === "alumni" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Graduation Batch
                    </label>
                    <input
                      type="text"
                      value={regForm.batch}
                      onChange={(e) => setRegForm({ ...regForm, batch: e.target.value })}
                      placeholder="e.g. 2022-2023"
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Current Company
                    </label>
                    <input
                      type="text"
                      value={regForm.company}
                      onChange={(e) => setRegForm({ ...regForm, company: e.target.value })}
                      placeholder="e.g. Infosys / TCS"
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Enrolled Course
                  </label>
                  <input
                    type="text"
                    value={regForm.course}
                    onChange={(e) => setRegForm({ ...regForm, course: e.target.value })}
                    placeholder="e.g. Software & Full Stack Development"
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Submit for Admin Approval</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-4">
          © {new Date().getFullYear()} Aayush Institute • Strict Role-Based Access Control
        </p>
      </div>
    </div>
  );
}
