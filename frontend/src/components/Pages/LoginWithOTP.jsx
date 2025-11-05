import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Phone, Lock, GraduationCap, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4001";

function LoginWithOTP() {
  const navigate = useNavigate();
  
  // State management
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Program
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [programmeName, setProgrammeName] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // OTP input refs
  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Program options
  const programs = [
    "B.Tech",
    "M.Tech",
    "MBA",
    "MCA",
    "BCA",
    "B.Sc",
    "M.Sc",
    "BBA",
    "B.Com",
    "M.Com",
  ];

  // Specialisation options based on program
  const specialisations = {
    "B.Tech": ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"],
    "M.Tech": ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"],
    "MBA": ["Finance", "Marketing", "HR", "Operations", "IT"],
    "MCA": ["Software Development", "Data Science", "Cyber Security", "Cloud Computing"],
    "BCA": ["Software Development", "Web Development", "Mobile App Development"],
    "B.Sc": ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology"],
    "M.Sc": ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology"],
    "BBA": ["Finance", "Marketing", "HR", "Operations"],
    "B.Com": ["Accounting", "Finance", "Taxation", "Banking"],
    "M.Com": ["Accounting", "Finance", "Taxation", "Banking"],
  };

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && step === 2) {
      setCanResend(true);
    }
  }, [timer, step]);

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${BASE_URL}/api/otp/send`, {
        phoneNumber,
      });

      if (response.data.success) {
        setSuccess("OTP sent successfully! Check your console.");
        setStep(2);
        setTimer(300); // 5 minutes
        setCanResend(false);
        setTimeout(() => otpRefs[0].current?.focus(), 100);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${BASE_URL}/api/otp/verify`, {
        phoneNumber,
        otp: otpString,
      });

      if (response.data.success) {
        setSuccess("OTP verified successfully!");
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      otpRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${BASE_URL}/api/otp/resend`, {
        phoneNumber,
      });

      if (response.data.success) {
        setSuccess("OTP resent successfully!");
        setOtp(["", "", "", "", "", ""]);
        setTimer(300);
        setCanResend(false);
        otpRefs[0].current?.focus();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Complete login and navigate to registration
  const handleCompleteLogin = async () => {
    if (!programmeName || !specialisation) {
      setError("Please select both program and specialisation");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/api/otp/complete-login`, {
        phoneNumber,
        programmeName,
        specialisation,
      });

      if (response.data.success) {
        // Navigate to registration form with pre-filled data
        navigate("/apply-now", {
          state: {
            phoneNumber,
            programmeName,
            specialisation,
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete login.");
    } finally {
      setLoading(false);
    }
  };

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-2">Student Login</h2>
            <p className="text-blue-100">Verify your phone to continue</p>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-between mt-6 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-400 -translate-y-1/2"></div>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? "bg-white text-blue-600"
                    : "bg-blue-400 text-white"
                }`}
              >
                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Step 1: Phone Number */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Enter Phone Number</h3>
                  <p className="text-sm text-gray-500">We'll send you an OTP</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-700 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    className="flex-1 border border-gray-300 rounded-r-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={loading || phoneNumber.length !== 10}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                  loading || phoneNumber.length !== 10
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Enter OTP</h3>
                  <p className="text-sm text-gray-500">Sent to +91-{phoneNumber}</p>
                </div>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    maxLength={1}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                ))}
              </div>

              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in <span className="font-bold text-blue-600">{formatTime(timer)}</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={loading || !canResend}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.join("").length !== 6}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                  loading || otp.join("").length !== 6
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setOtp(["", "", "", "", "", ""]);
                  setTimer(0);
                }}
                className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium"
              >
                Change Phone Number
              </button>
            </div>
          )}

          {/* Step 3: Program Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Select Program</h3>
                  <p className="text-sm text-gray-500">Choose your course details</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Name *
                </label>
                <select
                  value={programmeName}
                  onChange={(e) => {
                    setProgrammeName(e.target.value);
                    setSpecialisation("");
                    setError("");
                  }}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                >
                  <option value="">Select Program</option>
                  {programs.map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>
              </div>

              {programmeName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialisation *
                  </label>
                  <select
                    value={specialisation}
                    onChange={(e) => {
                      setSpecialisation(e.target.value);
                      setError("");
                    }}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  >
                    <option value="">Select Specialisation</option>
                    {specialisations[programmeName]?.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleCompleteLogin}
                disabled={loading || !programmeName || !specialisation}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                  loading || !programmeName || !specialisation
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Registration</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginWithOTP;