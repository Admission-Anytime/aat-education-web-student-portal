import React, { useState, useEffect } from "react";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Auto-redirect if already logged in with valid token & role
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");

    if (token) {
      try {
        const user = JSON.parse(userStr);
        const role = String(user?.role || "").toLowerCase();
        if (role === "admin" || role === "super admin" || role === "staff") {
          navigate("/panel");
          return;
        }
      } catch (err) {}
    }

    if (searchParams.get("pending")) {
      setMessage({
        type: "error",
        text: "Your account is pending administrator approval before panel access is granted.",
      });
    }
  }, [navigate, searchParams]);

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const cleanEmail = email.trim();
      if (!cleanEmail || !password) {
        throw new Error("Please enter both email address and password");
      }

      const backendBase = import.meta.env.VITE_BACKEND_URL || "https://aayushinstitute.onrender.com";
      const targetUrl = `${backendBase}/api/auth/login`;

      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(
          "Backend server is starting up or not reachable. Please wait 20-30 seconds and try again."
        );
      }

      if (!res.ok) {
        throw new Error(result.message || "Invalid email or password");
      }

      const finalRole = String(result.role || result.user?.role || result.admin?.role || "").toLowerCase();

      // Block students from admin panel
      if (finalRole === "student") {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        throw new Error("Access Denied: Students must log in via the student portal on the main website.");
      }

      // Save authentic credentials
      localStorage.setItem("adminToken", result.token || "logged_in");
      const userData = result.user || result.admin || { email: cleanEmail, role: finalRole || "admin" };
      localStorage.setItem("adminUser", JSON.stringify(userData));

      setMessage({
        type: "success",
        text: "Login successful! Redirecting to dashboard...",
      });

      setTimeout(() => {
        navigate("/panel");
      }, 500);

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#030712] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Background Ambience Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10 animate-fade-in my-6">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/20 mb-3 ring-4 ring-white/5">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Aayush Institute
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Administrative Management &amp; Enterprise Control Panel
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 sm:p-8 border border-white/10">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Sign In
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your administrative credentials to access the panel.
            </p>
          </div>

          {/* Alert Message Box */}
          {message && (
            <div
              className={`mb-5 p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                message.type === "error"
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
            >
              {message.type === "error" ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <p className="font-semibold leading-relaxed flex-1">{message.text}</p>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aayushinstitute.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all font-medium text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2 transform active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Security Badge */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authorized Personnel Only • 256-Bit SSL Encrypted</span>
          </div>

        </div>

        {/* Bottom Link to Main Website */}
        <div className="mt-5 text-center">
          <a
            href={import.meta.env.VITE_WEBSITE_URL || "https://aayushinstitute.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <span>&larr; Back to Main Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
