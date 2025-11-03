import React, { useState, useEffect } from 'react'; 
import { LogIn, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";
// --- Custom Components ---
const PrimaryButton = ({ children, icon: Icon, onClick, className = '', disabled = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ease-in-out shadow-lg transform active:scale-98
      bg-indigo-600 hover:bg-indigo-700 text-white
      hover:shadow-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 ${className}`}
    disabled={disabled}
  >
    {Icon && <Icon className="w-5 h-5" />}
    <span>{children}</span>
  </button>
);

const InputField = ({ id, type, placeholder, icon: Icon, value, onChange }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-3 text-gray-800 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition duration-150 shadow-inner bg-white/90"
      required
    />
  </div>
);

// --- Main Admin Login Component ---
const AdminLogin = () => {
  const navigate = useNavigate(); // ✅ must be inside the component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isForgot, setIsForgot] = useState(false);
useEffect(() => {
  const token = localStorage.getItem("adminToken");
  if (token) navigate("/panel");
}, [navigate]);
  // 🔹 Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch(  `${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setMessage({ type: "success", text: result.message + " Redirecting to Dashboard..." });
  localStorage.setItem("adminToken", result.token); // save token or just "true" as a flag
console.log("Token saved in localStorage:", localStorage.getItem("adminToken"));


      // Navigate to AdminPanel after 1 second so user sees message
      setTimeout(() => navigate("/panel"), 1000);

    } catch (error) {
      setMessage({ type: "error", text: error.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Forgot Password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setMessage({ type: "success", text: result.message });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Error sending reset link" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-8 font-inter">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100/70 transform transition-all duration-500 ease-in-out">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">Admin Portal</h1>
          <p className="text-gray-500 font-medium">Secure Access to the Management Dashboard</p>
        </div>

        {/* Message Box */}
        {message && (
          <div
            className={`p-4 mb-8 rounded-xl text-white font-medium ${
              message.type === 'success'
                ? 'bg-green-600 shadow-lg shadow-green-500/30'
                : 'bg-red-600 shadow-lg shadow-red-500/30'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={isForgot ? handleForgotPassword : handleLogin} className="space-y-6">
          <InputField
            id="email"
            type="email"
            placeholder="Admin Email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isForgot && (
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {/* Toggle Forgot Password */}
          {!isForgot ? (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgot(true)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150"
              >
                Forgot Password?
              </button>
            </div>
          ) : (
            <div className="text-left">
              <button
                type="button"
                onClick={() => setIsForgot(false)}
                className="text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-150"
              >
                ← Back to Login
              </button>
            </div>
          )}

          <PrimaryButton
            icon={LogIn}
            className={isLoading ? 'opacity-70 cursor-not-allowed' : ''}
            disabled={isLoading}
          >
            {isLoading
              ? (isForgot ? "Sending..." : "Logging In...")
              : (isForgot ? "Send Reset Link" : "Secure Login")}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
