import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, Award, UserPlus, Eye, EyeOff, BookOpen, CheckCircle2, Lock, Mail, Phone, User, Calendar, Briefcase, ShieldCheck, Sparkles, KeyRound, AlertCircle, X, Loader2, Shield } from 'lucide-react';
import { authApi } from '../../services/api';

const ImsLoginPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
    
    // Forgot Password Modal State
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: Code & New Password
    const [forgotData, setForgotData] = useState({ email: '', code: '', newPassword: '' });
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotMsg, setForgotMsg] = useState({ type: '', text: '' });

    // Staff PIN Gate State
    const STAFF_ACCESS_PIN = '2580'; // Secret 4-digit PIN required to authenticate staff login or create staff accounts
    const [staffLoginPin, setStaffLoginPin] = useState('');
    const [showStaffPinModal, setShowStaffPinModal] = useState(false);
    const [staffPinInput, setStaffPinInput] = useState(['', '', '', '']);
    const [staffPinError, setStaffPinError] = useState('');
    const [staffPinLoading, setStaffPinLoading] = useState(false);
    const pinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    // Staff Account Creation Verification State
    const [signupRole, setSignupRole] = useState('student'); // 'student' | 'staff'
    const [staffVerificationPin, setStaffVerificationPin] = useState('');

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

    const handleStaffPinDigit = (value, idx) => {
        const digit = value.replace(/\D/, '').slice(-1);
        const newPin = [...staffPinInput];
        newPin[idx] = digit;
        setStaffPinInput(newPin);
        setStaffPinError('');
        if (digit && idx < 3) {
            pinRefs[idx + 1].current?.focus();
        }
        // Auto-submit when last digit is filled
        if (idx === 3 && digit) {
            const fullPin = [...newPin.slice(0, 3), digit].join('');
            verifyStaffPin(fullPin);
        }
    };

    const handleStaffPinKeyDown = (e, idx) => {
        if (e.key === 'Backspace' && !staffPinInput[idx] && idx > 0) {
            pinRefs[idx - 1].current?.focus();
        }
    };

    const executeStaffLogin = async (pinValue = staffLoginPin) => {
        setLoading(true);
        setStatusMsg({ type: '', text: '' });
        try {
            const identifier = formData.staffId || formData.email;
            const res = await authApi.login({
                identifier,
                email: formData.email,
                password: formData.password,
                loginType: 'staff'
            });

            if (res.token) {
                localStorage.setItem('aayush_token', res.token);
                localStorage.setItem('aayush_user', JSON.stringify(res.user));
                window.dispatchEvent(new Event('authChange'));
            }

            setStatusMsg({
                type: 'success',
                text: `Hi ${res.user?.name || 'Staff Member'}, Staff Security Verified! Welcome!`
            });

            const adminUrl = import.meta.env.VITE_ADMIN_PANEL_URL || 'http://localhost:5173';
            setTimeout(() => {
                window.location.href = `${adminUrl}/panel`;
            }, 1200);
        } catch (err) {
            setStatusMsg({
                type: 'error',
                text: err.message || 'Staff authentication failed. Please check your credentials.'
            });
        } finally {
            setLoading(false);
        }
    };

    const verifyStaffPin = (pin) => {
        setStaffPinLoading(true);
        setTimeout(async () => {
            if (pin === STAFF_ACCESS_PIN) {
                setShowStaffPinModal(false);
                setStaffLoginPin(pin);
                setStaffPinInput(['', '', '', '']);
                setStaffPinError('');
                await executeStaffLogin(pin);
            } else {
                setStaffPinError('Incorrect 4-digit PIN. Authorized faculty and staff only.');
                setStaffPinInput(['', '', '', '']);
                setTimeout(() => pinRefs[0].current?.focus(), 50);
            }
            setStaffPinLoading(false);
        }, 600);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (statusMsg.text) setStatusMsg({ type: '', text: '' });
    };

    const fillDemoCredentials = () => {
        if (statusMsg.text) setStatusMsg({ type: '', text: '' });
        if (loginType === 'student') {
            setFormData(prev => ({
                ...prev,
                studentId: 'AAY-2024-1082',
                email: 'student@aayush.com',
                password: 'password123'
            }));
        } else if (loginType === 'staff') {
            setFormData(prev => ({
                ...prev,
                staffId: 'STF-001',
                email: 'staff@aayush.com',
                password: 'password123'
            }));
            setStaffLoginPin('2580');
        } else if (loginType === 'alumni') {
            setFormData(prev => ({
                ...prev,
                alumniId: 'ALM-2022',
                email: 'alumni@aayush.com',
                password: 'password123'
            }));
        } else if (loginType === 'signup') {
            setFormData(prev => ({
                ...prev,
                name: 'Priya Sharma',
                phone: '9876543210',
                email: 'priya.sharma@example.com',
                course: 'MERN Stack Development',
                password: 'password123'
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg({ type: '', text: '' });

        try {
            if (loginType === 'signup') {
                // If creating staff account, require valid authorization PIN
                if (signupRole === 'staff') {
                    if (staffVerificationPin.trim() !== STAFF_ACCESS_PIN) {
                        setStatusMsg({
                            type: 'error',
                            text: 'Security verification failed: Valid 4-digit Staff PIN is required to create a Faculty/Staff account.'
                        });
                        setLoading(false);
                        return;
                    }
                }

                // Register / Sign Up
                const res = await authApi.register({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    course: signupRole === 'student' ? formData.course : undefined,
                    department: signupRole === 'staff' ? formData.department : undefined,
                    role: signupRole === 'staff' ? 'staff' : 'student'
                });

                if (res.token) {
                    localStorage.setItem('aayush_token', res.token);
                    localStorage.setItem('aayush_user', JSON.stringify(res.user));
                    window.dispatchEvent(new Event('authChange'));
                }

                setStatusMsg({
                    type: 'success',
                    text: `Hi ${res.user?.name || formData.name || 'User'}, Account Verified & Created!`
                });

                setTimeout(() => {
                    if (signupRole === 'staff' || res.user?.role === 'staff' || res.user?.role === 'admin') {
                        navigate('/courses');
                    } else {
                        navigate('/profile');
                    }
                }, 1500);

            } else if (loginType === 'staff') {
                // When logging in as staff: verify 4-digit PIN lock
                if (!staffLoginPin || staffLoginPin.length !== 4) {
                    setStaffPinInput(['', '', '', '']);
                    setStaffPinError('');
                    setShowStaffPinModal(true);
                    setLoading(false);
                    return;
                }
                if (staffLoginPin.trim() !== STAFF_ACCESS_PIN) {
                    setStatusMsg({
                        type: 'error',
                        text: 'Security verification failed: Valid 4-digit Staff PIN is required to log in.'
                    });
                    setLoading(false);
                    return;
                }
                await executeStaffLogin(staffLoginPin);
                return;
            } else {
                // Sign In (student, alumni)
                let identifier = formData.email;
                if (loginType === 'student' && formData.studentId) identifier = formData.studentId;
                if (loginType === 'alumni' && formData.alumniId) identifier = formData.alumniId;

                const res = await authApi.login({
                    identifier,
                    email: formData.email,
                    password: formData.password,
                    loginType
                });

                if (res.token) {
                    localStorage.setItem('aayush_token', res.token);
                    localStorage.setItem('aayush_user', JSON.stringify(res.user));
                    window.dispatchEvent(new Event('authChange'));
                }

                setStatusMsg({
                    type: 'success',
                    text: `Hi ${res.user?.name || 'User'}, Welcome!`
                });

                const adminUrl = import.meta.env.VITE_ADMIN_PANEL_URL || 'http://localhost:5173';
                setTimeout(() => {
                    if (loginType === 'staff' || res.user?.role === 'staff' || res.user?.role === 'admin') {
                        window.location.href = `${adminUrl}/panel`;
                    } else {
                        // 🎓 Student & Alumni navigate to their Student Profile on School-Web
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
                text: `${res.message} ${res.resetCode ? `(Testing Code: ${res.resetCode})` : ''}`
            });
            if (res.resetCode) {
                setForgotData(prev => ({ ...prev, code: res.resetCode }));
            }
            setForgotStep(2);
        } catch (err) {
            setForgotMsg({
                type: 'error',
                text: err.message || 'Failed to request password reset code.'
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
                resetCode: forgotData.code,
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
                text: err.message || 'Failed to reset password. Please check your code.'
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
                                Career networking &amp; events
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
                            <h4 className="font-semibold text-sm mb-0.5">Sign Up</h4>
                            <p className={`text-[11px] leading-tight ${loginType === 'signup' ? 'text-emerald-100' : 'text-slate-500'}`}>
                                New admission &amp; enrollment
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

                        {/* Demo Credentials Quick Autofill Pill */}
                        <div className="mb-4 px-3 py-2 bg-blue-50/80 border border-blue-200/70 rounded-xl flex items-center justify-between text-[11px] text-[#003882]">
                            <span className="flex items-center gap-1.5 font-medium">
                                <KeyRound className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                                <span>Demo credentials ready</span>
                            </span>
                            <button
                                type="button"
                                onClick={fillDemoCredentials}
                                className="px-2.5 py-1 bg-white hover:bg-blue-100/70 text-[#0055cc] font-semibold text-[10.5px] rounded-lg border border-blue-200 shadow-2xs transition-colors cursor-pointer"
                            >
                                Auto-fill Details
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
                                                onClick={() => { setSignupRole('student'); setStaffVerificationPin(''); }}
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
                                                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
                                                    signupRole === 'staff'
                                                        ? 'bg-white text-purple-700 shadow-xs'
                                                        : 'text-slate-600 hover:text-slate-900'
                                                }`}
                                            >
                                                <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                                                <span>Faculty / Staff</span>
                                                <Lock className="w-2.5 h-2.5 text-purple-500 absolute top-1.5 right-1.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* If Faculty / Staff Account: Require Verification PIN */}
                                    {signupRole === 'staff' && (
                                        <div className="p-3 bg-purple-50/90 border border-purple-200 rounded-xl space-y-2.5">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-xs font-bold text-purple-900 flex items-center gap-1">
                                                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                                                    <span>Staff Verification PIN *</span>
                                                </label>
                                                <span className="text-[10px] text-purple-600 font-semibold bg-purple-100/80 px-2 py-0.5 rounded-full">
                                                    Required
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    maxLength={4}
                                                    required
                                                    value={staffVerificationPin}
                                                    onChange={(e) => setStaffVerificationPin(e.target.value)}
                                                    placeholder="Enter 4-digit Security PIN"
                                                    className="w-full pl-9 pr-3 py-2 text-xs font-bold tracking-widest bg-white border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-purple-800"
                                                />
                                                <Lock className="w-4 h-4 text-purple-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                            <p className="text-[10.5px] text-purple-600/90 leading-tight">
                                                Institute staff registration is restricted. Enter the 4-digit authorization PIN provided by administration.
                                            </p>
                                        </div>
                                    )}

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

                            {/* Student Specific ID */}
                            {loginType === 'student' && (
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Student ID / Roll Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="studentId"
                                            value={formData.studentId}
                                            onChange={handleInputChange}
                                            placeholder="e.g. AAY-2024-1082"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                        <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>
                            )}

                            {/* Staff Specific ID, Department & Security PIN */}
                            {loginType === 'staff' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Staff ID / Employee Code
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="staffId"
                                                value={formData.staffId}
                                                onChange={handleInputChange}
                                                placeholder="e.g. AAY-FAC-104 or STF-001"
                                                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                            />
                                            <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Department / Role
                                        </label>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-700"
                                        >
                                            <option value="Faculty / Instructor">Faculty / Instructor</option>
                                            <option value="Administration">Administration</option>
                                            <option value="Admission & Counselling">Admission &amp; Counselling</option>
                                            <option value="Examination & Records">Examination &amp; Records</option>
                                            <option value="Placement Cell">Placement Cell</option>
                                        </select>
                                    </div>

                                    {/* Staff Security PIN Field */}
                                    <div className="p-3 bg-purple-50/80 border border-purple-200/90 rounded-xl space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-xs font-bold text-purple-900 flex items-center gap-1.5">
                                                <Shield className="w-3.5 h-3.5 text-purple-600" />
                                                <span>Staff Security PIN *</span>
                                            </label>
                                            <span className="text-[10px] text-purple-700 font-semibold bg-purple-100/90 px-2 py-0.5 rounded-full border border-purple-300/60">
                                                PIN Required
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                maxLength={4}
                                                name="staffLoginPin"
                                                value={staffLoginPin}
                                                onChange={(e) => {
                                                    setStaffLoginPin(e.target.value.replace(/\D/g, ''));
                                                    if (statusMsg.text) setStatusMsg({ type: '', text: '' });
                                                }}
                                                placeholder="Enter 4-digit Security PIN (2580)"
                                                className="w-full pl-9 pr-3 py-2 text-xs font-bold tracking-widest bg-white border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-purple-900 placeholder:tracking-normal placeholder:font-normal"
                                            />
                                            <Lock className="w-4 h-4 text-purple-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                        <p className="text-[10.5px] text-purple-600/90 leading-tight">
                                            Security lock: Authorized 4-digit PIN is required to complete staff login.
                                        </p>
                                    </div>

                                    <div className="flex justify-end pt-0.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setLoginType('signup');
                                                setSignupRole('staff');
                                            }}
                                            className="text-[11px] font-semibold text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                            <Lock className="w-3 h-3 text-purple-500" />
                                            <span>New Faculty? Register with Staff PIN</span>
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Alumni Specific ID / Year */}
                            {loginType === 'alumni' && (
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Alumni ID / Graduation Year
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="alumniId"
                                            value={formData.alumniId}
                                            onChange={handleInputChange}
                                            placeholder="e.g. ALM-2022 or Year"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                        />
                                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>
                            )}

                            {/* Common Email Field */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={loginType === 'staff' ? 'staff@aayushinstitute.in' : 'yourname@email.com'}
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
                                        ? 'Enter your email to receive a password reset verification code.'
                                        : 'Enter verification code and choose a new password.'}
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
                                            placeholder="Enter your registered email"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(false)}
                                        className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={forgotLoading}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70"
                                    >
                                        {forgotLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                        <span>Send Reset Code</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        6-Digit Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={forgotData.code}
                                        onChange={(e) => setForgotData({ ...forgotData, code: e.target.value })}
                                        placeholder="e.g. 123456"
                                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono tracking-wider text-center text-sm font-bold"
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

            {/* ===== STAFF PIN ACCESS MODAL ===== */}
            {showStaffPinModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{backdropFilter:'blur(12px)', background:'rgba(0,0,0,0.55)'}}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 relative border border-purple-100 animate-in fade-in zoom-in duration-200">
                        {/* Close */}
                        <button
                            onClick={() => setShowStaffPinModal(false)}
                            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4 text-slate-500" />
                        </button>

                        {/* Icon & Heading */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/25 mb-3">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#00285e]">Staff Login Authorization</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
                                Enter your 4-digit Staff Security PIN to authorize this faculty login session.
                            </p>
                        </div>

                        {/* 4-Digit PIN Inputs */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            {[0, 1, 2, 3].map((idx) => (
                                <input
                                    key={idx}
                                    ref={pinRefs[idx]}
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={staffPinInput[idx]}
                                    onChange={(e) => handleStaffPinDigit(e.target.value, idx)}
                                    onKeyDown={(e) => handleStaffPinKeyDown(e, idx)}
                                    autoFocus={idx === 0}
                                    className={`w-13 h-13 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200 bg-purple-50/60 focus:bg-white
                                        ${staffPinError ? 'border-rose-400 focus:border-rose-500 text-rose-600' : 'border-purple-200 focus:border-purple-500 text-purple-700'}
                                    `}
                                    style={{width:'52px', height:'52px'}}
                                />
                            ))}
                        </div>

                        {/* Error Message */}
                        {staffPinError && (
                            <div className="flex items-center justify-center gap-1.5 text-rose-600 text-xs font-medium mb-3">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{staffPinError}</span>
                            </div>
                        )}

                        {/* Manual Submit Button */}
                        <button
                            type="button"
                            disabled={staffPinLoading || staffPinInput.some(d => !d)}
                            onClick={() => verifyStaffPin(staffPinInput.join(''))}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-sm shadow-md shadow-purple-500/25 hover:from-purple-700 hover:to-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {staffPinLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {staffPinLoading ? 'Verifying...' : 'Authorize & Sign In'}
                        </button>

                        <p className="text-center text-[10.5px] text-slate-400 mt-3">
                            This PIN is provided only to authorized Aayush Institute faculty &amp; staff.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImsLoginPage;
