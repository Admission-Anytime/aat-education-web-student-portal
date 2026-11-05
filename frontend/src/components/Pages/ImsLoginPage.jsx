import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    Award,
    UserPlus,
    Eye,
    EyeOff,
    CheckCircle2,
    Lock,
    Mail,
    Phone,
    User,
    Calendar,
    Briefcase,
    ShieldCheck,
    Sparkles,
    KeyRound,
    AlertCircle,
    X,
    Loader2
} from 'lucide-react';
import { authApi } from '../../services/api';

const ImsLoginPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('student'); // 'student' | 'staff' | 'alumni' | 'signup'
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    // Forgot Password Modal State
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: Code & New Password
    const [forgotData, setForgotData] = useState({ email: '', code: '', newPassword: '' });
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotMsg, setForgotMsg] = useState({ type: '', text: '' });

    // Staff Account Creation Role
    const [signupRole, setSignupRole] = useState('student'); // 'student' | 'staff'

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        studentId: '',
        alumniId: '',
        staffId: '',
        department: 'Faculty / Instructor',
        course: ''
    });

    useEffect(() => {
        const typeParam = searchParams.get('type');
        if (typeParam && ['student', 'staff', 'alumni', 'signup'].includes(typeParam.toLowerCase())) {
            setLoginType(typeParam.toLowerCase());
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (statusMsg.text) setStatusMsg({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg({ type: '', text: '' });

        try {
            if (loginType === 'signup') {
                const targetRole = signupRole === 'staff' ? 'staff' : 'student';
                const res = await authApi.register({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    course: targetRole === 'student' ? formData.course : undefined,
                    department: targetRole === 'staff' ? formData.department : undefined,
                    role: targetRole
                });

                if (targetRole === 'staff') {
                    setStatusMsg({
                        type: 'success',
                        text: res.message || 'Staff registration submitted! Awaiting administrator approval.'
                    });
                    setTimeout(() => {
                        setLoginType('staff');
                    }, 2500);
                } else {
                    setStatusMsg({
                        type: 'success',
                        text: `Welcome, ${res.user?.name || formData.name}! Account created successfully.`
                    });
                    setTimeout(() => {
                        navigate('/profile');
                    }, 1200);
                }

            } else {
                // Sign In (student, staff, alumni)
                const cleanId = (formData.email || '').trim();

                const res = await authApi.login({
                    identifier: cleanId,
                    email: cleanId,
                    password: formData.password,
                    loginType
                });

                window.dispatchEvent(new Event('authChange'));

                setStatusMsg({
                    type: 'success',
                    text: `Hi ${res.user?.name || 'User'}, login successful!`
                });

                const adminUrl = import.meta.env.VITE_ADMIN_PANEL_URL || 'http://localhost:5173';
                setTimeout(() => {
                    if (loginType === 'staff' || res.user?.role === 'staff' || res.user?.role === 'admin' || res.role === 'admin') {
                        window.location.href = `${adminUrl}/panel`;
                    } else {
                        navigate('/profile');
                    }
                }, 800);
            }
        } catch (err) {
            setStatusMsg({
                type: 'error',
                text: err.message || 'Authentication failed. Please check your credentials.'
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle Forgot Password Step 1: Request Code
    const handleRequestForgotCode = async (e) => {
        e.preventDefault();
        if (!forgotData.email) return;
        setForgotLoading(true);
        setForgotMsg({ type: '', text: '' });

        try {
            const res = await authApi.forgotPassword(forgotData.email);
            setForgotMsg({
                type: 'success',
                text: res.message || 'Password reset link generated.'
            });
            if (res.resetToken) {
                setForgotData(prev => ({ ...prev, code: res.resetToken }));
            }
            setForgotStep(2);
        } catch (err) {
            setForgotMsg({
                type: 'error',
                text: err.message || 'Failed to request password reset.'
            });
        } finally {
            setForgotLoading(false);
        }
    };

    // Handle Forgot Password Step 2: Reset Password
    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!forgotData.code || !forgotData.newPassword) return;
        setForgotLoading(true);
        setForgotMsg({ type: '', text: '' });

        try {
            const res = await authApi.resetPassword({
                email: forgotData.email,
                resetToken: forgotData.code,
                newPassword: forgotData.newPassword
            });

            setForgotMsg({
                type: 'success',
                text: res.message || 'Password reset successfully!'
            });

            setTimeout(() => {
                setShowForgotModal(false);
                setForgotStep(1);
                setForgotData({ email: '', code: '', newPassword: '' });
                setStatusMsg({
                    type: 'success',
                    text: 'Password updated! Please login with your new password.'
                });
            }, 1800);
        } catch (err) {
            setForgotMsg({
                type: 'error',
                text: err.message || 'Failed to reset password. Please check your token or try again.'
            });
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center p-4 py-8 sm:py-12">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                {/* Left Side - Branding */}
                <div className="hidden lg:flex flex-col items-start justify-center space-y-6">
                    <div className="space-y-2.5">
                        <span className="inline-flex items-center gap-1.5 bg-blue-100/70 text-[#00488f] font-semibold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-[#0055ff]" />
                            <span>Institutional Portal</span>
                        </span>
                        <h1 className="text-3xl xl:text-4xl font-bold text-[#00285e] leading-tight">
                            Access Your Learning &amp; Career Hub
                        </h1>
                        <p className="text-sm text-slate-600 max-w-md leading-relaxed font-normal">
                            Sign in to access study materials, track course progress, connect with alumni, or sign into the faculty &amp; staff portal.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 w-full">
                        {/* 1. Student Card */}
                        <div
                            onClick={() => setLoginType('student')}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                loginType === 'student'
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-blue-600 -translate-y-1'
                                    : 'bg-white/95 text-slate-800 border-slate-200/80 shadow-xs hover:border-blue-300'
                            }`}
                        >
                            <GraduationCap className={`w-6 h-6 mb-2 ${loginType === 'student' ? 'text-white' : 'text-blue-600'}`} />
                            <h4 className="font-semibold text-sm mb-0.5">Student</h4>
                            <p className={`text-[11px] leading-tight ${loginType === 'student' ? 'text-blue-100' : 'text-slate-500'}`}>
                                Batch classes, syllabus &amp; exams
                            </p>
                        </div>

                        {/* 2. Staff Card */}
                        <div
                            onClick={() => setLoginType('staff')}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                loginType === 'staff'
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 border-purple-600 -translate-y-1'
                                    : 'bg-white/95 text-slate-800 border-slate-200/80 shadow-xs hover:border-purple-300'
                            }`}
                        >
                            <Briefcase className={`w-6 h-6 mb-2 ${loginType === 'staff' ? 'text-white' : 'text-purple-600'}`} />
                            <h4 className="font-semibold text-sm mb-0.5">Staff &amp; Faculty</h4>
                            <p className={`text-[11px] leading-tight ${loginType === 'staff' ? 'text-purple-100' : 'text-slate-500'}`}>
                                Management, grading &amp; records
                            </p>
                        </div>

                        {/* 3. Alumni Card */}
                        <div
                            onClick={() => setLoginType('alumni')}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                loginType === 'alumni'
                                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 border-amber-500 -translate-y-1'
                                    : 'bg-white/95 text-slate-800 border-slate-200/80 shadow-xs hover:border-amber-300'
                            }`}
                        >
                            <Award className={`w-6 h-6 mb-2 ${loginType === 'alumni' ? 'text-white' : 'text-amber-600'}`} />
                            <h4 className="font-semibold text-sm mb-0.5">Alumni</h4>
                            <p className={`text-[11px] leading-tight ${loginType === 'alumni' ? 'text-amber-100' : 'text-slate-500'}`}>
                                Professional networking &amp; guidance
                            </p>
                        </div>

                        {/* 4. Sign Up Card */}
                        <div
                            onClick={() => setLoginType('signup')}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                loginType === 'signup'
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 border-emerald-600 -translate-y-1'
                                    : 'bg-white/95 text-slate-800 border-slate-200/80 shadow-xs hover:border-emerald-300'
                            }`}
                        >
                            <UserPlus className={`w-6 h-6 mb-2 ${loginType === 'signup' ? 'text-white' : 'text-emerald-600'}`} />
                            <h4 className="font-semibold text-sm mb-0.5">New Registration</h4>
                            <p className={`text-[11px] leading-tight ${loginType === 'signup' ? 'text-emerald-100' : 'text-slate-500'}`}>
                                Enroll for courses or faculty access
                            </p>
                        </div>
                    </div>

                    {/* Trust & Security Footnote */}
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium text-slate-700">256-Bit SSL Encrypted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-slate-700">Official Institutional Portal</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Card */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-200/80">

                        {/* Top Brand on mobile */}
                        <div className="flex lg:hidden justify-end items-center mb-5 pb-3 border-b border-slate-100">
                            <span className="text-[11px] font-semibold text-[#00488f] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                                Institutional Portal
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-5">
                            <h2 className="text-2xl font-bold text-[#00285e]">
                                {loginType === 'signup' ? 'Create an Account' : loginType === 'staff' ? 'Staff Login' : 'Welcome Back'}
                            </h2>
                            <p className="text-xs text-slate-500 mt-1 font-normal">
                                {loginType === 'student' && 'Sign in with your Student ID to access your portal.'}
                                {loginType === 'staff' && 'Sign in with your Employee ID to access faculty & admin tools.'}
                                {loginType === 'alumni' && 'Connect with the alumni network and career opportunities.'}
                                {loginType === 'signup' && 'Register now for upcoming training batches and certification.'}
                            </p>
                            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#00488f] font-medium bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100/60">
                                <Sparkles className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                <span>Official Student &amp; Staff Gateway • Aayush Institute</span>
                            </div>
                        </div>

                        {/* 4 Options Tabs: Sign Up, Student, Alumni, Staff */}
                        <div className="grid grid-cols-4 bg-slate-100 p-1 rounded-2xl mb-6 gap-1">
                            {/* Sign Up */}
                            <button
                                type="button"
                                onClick={() => setLoginType('signup')}
                                className={`flex flex-col sm:flex-row items-center justify-center py-2 px-1 rounded-xl text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                                    loginType === 'signup'
                                        ? 'bg-white text-emerald-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <UserPlus className="w-3.5 h-3.5 sm:mr-1 mb-0.5 sm:mb-0" />
                                <span>Sign Up</span>
                            </button>

                            {/* Student */}
                            <button
                                type="button"
                                onClick={() => setLoginType('student')}
                                className={`flex flex-col sm:flex-row items-center justify-center py-2 px-1 rounded-xl text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                                    loginType === 'student'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <GraduationCap className="w-3.5 h-3.5 sm:mr-1 mb-0.5 sm:mb-0" />
                                <span>Student</span>
                            </button>

                            {/* Alumni */}
                            <button
                                type="button"
                                onClick={() => setLoginType('alumni')}
                                className={`flex flex-col sm:flex-row items-center justify-center py-2 px-1 rounded-xl text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                                    loginType === 'alumni'
                                        ? 'bg-white text-amber-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <Award className="w-3.5 h-3.5 sm:mr-1 mb-0.5 sm:mb-0" />
                                <span>Alumni</span>
                            </button>

                            {/* Staff */}
                            <button
                                type="button"
                                onClick={() => setLoginType('staff')}
                                className={`flex flex-col sm:flex-row items-center justify-center py-2 px-1 rounded-xl text-[11px] font-semibold transition-all duration-200 cursor-pointer relative ${
                                    loginType === 'staff'
                                        ? 'bg-white text-purple-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <Briefcase className="w-3.5 h-3.5 sm:mr-1 mb-0.5 sm:mb-0" />
                                <span>Staff</span>
                            </button>
                        </div>

                        {statusMsg.text && (
                            <div className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
                                statusMsg.type === 'error'
                                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            }`}>
                                {statusMsg.type === 'error' ? (
                                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                ) : (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                )}
                                <span>{statusMsg.text}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            {/* Sign Up Specific Fields */}
                            {loginType === 'signup' && (
                                <>
                                    {/* Account Type Toggle */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                            Account Type
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                                            <button
                                                type="button"
                                                onClick={() => setSignupRole('student')}
                                                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                                    signupRole === 'student'
                                                        ? 'bg-white text-emerald-600 shadow-xs'
                                                        : 'text-slate-600 hover:text-slate-900'
                                                }`}
                                            >
                                                <GraduationCap className="w-3.5 h-3.5" />
                                                <span>Student</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSignupRole('staff')}
                                                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                                    signupRole === 'staff'
                                                        ? 'bg-white text-purple-700 shadow-xs'
                                                        : 'text-slate-600 hover:text-slate-900'
                                                }`}
                                            >
                                                <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                                                <span>Faculty / Staff</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder={signupRole === 'staff' ? 'e.g. Prof. Rajesh Kumar' : 'Enter your full name'}
                                                className={`w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 ${
                                                    signupRole === 'staff' ? 'focus:ring-purple-500' : 'focus:ring-emerald-500'
                                                } focus:border-transparent outline-none transition-all`}
                                            />
                                            <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter 10-digit mobile number"
                                                className={`w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 ${
                                                    signupRole === 'staff' ? 'focus:ring-purple-500' : 'focus:ring-emerald-500'
                                                } focus:border-transparent outline-none transition-all`}
                                            />
                                            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>

                                    {/* Course (if student) OR Department (if staff) */}
                                    {signupRole === 'student' ? (
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Select Course
                                            </label>
                                            <select
                                                name="course"
                                                value={formData.course}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-700"
                                            >
                                                <option value="">-- Choose Course --</option>
                                                <option value="Graphic Designing">Graphic Designing</option>
                                                <option value="Web Designing & Development">Web Designing &amp; Development</option>
                                                <option value="UI/UX Designing">UI/UX Designing</option>
                                                <option value="MERN Stack Development">MERN Stack Development</option>
                                                <option value="Python Programming">Python Programming</option>
                                                <option value="Tally Prime & Accounting">Tally Prime &amp; Accounting</option>
                                                <option value="MS Office & Advanced Excel">MS Office &amp; Advanced Excel</option>
                                                <option value="University Programs">University Programs (UG / PG)</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Department / Designation
                                            </label>
                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-700"
                                            >
                                                <option value="Faculty / Instructor">Faculty / Instructor</option>
                                                <option value="Senior Lecturer">Senior Lecturer</option>
                                                <option value="Course Coordinator">Course Coordinator</option>
                                                <option value="Administration">Administration</option>
                                                <option value="Placement Cell">Placement Cell</option>
                                            </select>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Common Email / User ID Field */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    {loginType === 'signup' ? 'Email Address' : 'Email Address / User ID'}
                                </label>
                                <div className="relative">
                                    <input
                                        type={loginType === 'signup' ? 'email' : 'text'}
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={
                                            loginType === 'signup'
                                                ? 'yourname@email.com'
                                                : loginType === 'staff'
                                                ? 'Staff email or employee code'
                                                : loginType === 'student'
                                                ? 'Student email or Student ID'
                                                : 'Alumni email or ID'
                                        }
                                        className={`w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 ${
                                            loginType === 'signup' ? 'focus:ring-emerald-500' :
                                            loginType === 'staff' ? 'focus:ring-purple-500' :
                                            loginType === 'alumni' ? 'focus:ring-amber-500' :
                                            'focus:ring-blue-500'
                                        } focus:border-transparent outline-none transition-all`}
                                    />
                                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Common Password Field with Forgot Link */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-xs font-semibold text-gray-700">
                                        {loginType === 'signup' ? 'Create Password' : 'Password'}
                                    </label>
                                    {loginType !== 'signup' && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setForgotData(prev => ({ ...prev, email: formData.email }));
                                                setShowForgotModal(true);
                                                setForgotMsg({ type: '', text: '' });
                                                setForgotStep(1);
                                            }}
                                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                        >
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className={`w-full pl-9 pr-10 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 ${
                                            loginType === 'signup' ? 'focus:ring-emerald-500' :
                                            loginType === 'staff' ? 'focus:ring-purple-500' :
                                            loginType === 'alumni' ? 'focus:ring-amber-500' :
                                            'focus:ring-blue-500'
                                        } focus:border-transparent outline-none transition-all`}
                                    />
                                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-xl font-semibold text-xs text-white shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-2 ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                } ${
                                    loginType === 'signup'
                                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600'
                                        : loginType === 'staff'
                                        ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600'
                                        : loginType === 'alumni'
                                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600'
                                        : 'bg-gradient-to-r from-[#0059b3] to-[#003875] hover:from-[#0066cc] hover:to-[#00448d]'
                                }`}
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>
                                    {loginType === 'signup' && (loading ? 'Creating Account...' : 'Register & Create Account')}
                                    {loginType === 'student' && (loading ? 'Signing In...' : 'Sign In as Student')}
                                    {loginType === 'staff' && (loading ? 'Authenticating...' : 'Sign In as Staff / Faculty')}
                                    {loginType === 'alumni' && (loading ? 'Signing In...' : 'Sign In as Alumni')}
                                </span>
                            </button>
                        </form>

                        {/* Footer Switcher */}
                        <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-500 flex flex-wrap justify-center gap-3">
                            {loginType !== 'staff' && (
                                <button
                                    type="button"
                                    onClick={() => setLoginType('staff')}
                                    className="text-purple-700 font-semibold hover:underline cursor-pointer"
                                >
                                    Staff Login &rarr;
                                </button>
                            )}
                            {loginType !== 'student' && (
                                <button
                                    type="button"
                                    onClick={() => setLoginType('student')}
                                    className="text-[#00488f] font-semibold hover:underline cursor-pointer"
                                >
                                    Student Login &rarr;
                                </button>
                            )}
                            {loginType !== 'signup' && (
                                <button
                                    type="button"
                                    onClick={() => setLoginType('signup')}
                                    className="text-emerald-700 font-semibold hover:underline cursor-pointer"
                                >
                                    Register / Sign Up &rarr;
                                </button>
                            )}
                        </div>

                    </div>

                    {/* Trust Footnote */}
                    <div className="mt-4 text-center">
                        <p className="text-[11px] text-slate-500 font-normal flex items-center justify-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            Official &amp; Secure Portal • Aayush Institute of Professional Studies
                        </p>
                    </div>
                </div>

            </div>

            {/* FORGOT PASSWORD MODAL */}
            {showForgotModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-7 relative animate-in fade-in zoom-in duration-200">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setShowForgotModal(false)}
                            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                <KeyRound className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Forgot Password</h3>
                                <p className="text-xs text-slate-500">
                                    {forgotStep === 1
                                        ? 'Enter your email to receive a password reset verification token.'
                                        : 'Enter verification token and choose a new password.'}
                                </p>
                            </div>
                        </div>

                        {forgotMsg.text && (
                            <div className={`mb-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
                                forgotMsg.type === 'error'
                                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            }`}>
                                {forgotMsg.type === 'error' ? (
                                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                ) : (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                )}
                                <span>{forgotMsg.text}</span>
                            </div>
                        )}

                        {forgotStep === 1 ? (
                            <form onSubmit={handleRequestForgotCode} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Registered Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={forgotData.email}
                                            onChange={(e) => setForgotData({ ...forgotData, email: e.target.value })}
                                            placeholder="yourname@email.com"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(false)}
                                        className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={forgotLoading}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70"
                                    >
                                        {forgotLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                        <span>Send Reset Token</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Reset Token
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={forgotData.code}
                                        onChange={(e) => setForgotData({ ...forgotData, code: e.target.value })}
                                        placeholder="Paste reset token here"
                                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono tracking-wider text-center text-xs font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            minLength={6}
                                            value={forgotData.newPassword}
                                            onChange={(e) => setForgotData({ ...forgotData, newPassword: e.target.value })}
                                            placeholder="Enter minimum 6 characters"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setForgotStep(1)}
                                        className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                    >
                                        &larr; Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={forgotLoading}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70"
                                    >
                                        {forgotLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                        <span>Update Password</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImsLoginPage;
