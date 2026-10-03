import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    Award,
    BookOpen,
    Clock,
    Calendar,
    Phone,
    Mail,
    User,
    CheckCircle2,
    AlertCircle,
    FileText,
    Download,
    CreditCard,
    ShieldCheck,
    HelpCircle,
    ChevronRight,
    Edit3,
    QrCode,
    Printer,
    Sparkles,
    Building2,
    DollarSign,
    LogOut,
    Plus,
    Trash2,
    Send,
    ExternalLink,
    Lock,
    MapPin
} from 'lucide-react';
import { authApi, studentApi, courseApi } from '../../services/api';

const defaultPolicies = [
    {
        id: 'attendance',
        title: '75% Mandatory Attendance Policy',
        tag: 'Academic Compliance',
        color: 'border-blue-500 bg-blue-50/50 text-blue-900',
        points: [
            'Every student must maintain at least 75% overall classroom/lab attendance to be eligible for internal assessments and semester-end examinations.',
            'Attendance below 65% may lead to debarment from the current batch or mandatory make-up practical hours on weekends.',
            'Medical leave requires submission of a certified medical certificate within 3 working days of resumption.'
        ]
    },
    {
        id: 'placement',
        title: 'Placement & Internship Assistance Policy',
        tag: 'Career Cell',
        color: 'border-emerald-500 bg-emerald-50/50 text-emerald-900',
        points: [
            'Students who achieve 80%+ attendance and successfully submit at least 2 capstone projects are eligible for 100% Placement Assistance.',
            'Students must clear the internal Mock Technical & HR Interview screening conducted by the training cell.',
            'Once an offer letter is accepted through campus placement, the candidate is considered placed and cannot appear in subsequent on-campus drives without special dean permission.'
        ]
    },
    {
        id: 'certification',
        title: 'Examination, Projects & Certification Criteria',
        tag: 'Examination Cell',
        color: 'border-purple-500 bg-purple-50/50 text-purple-900',
        points: [
            'Certificates are issued only upon successful completion of curriculum modules, lab practicals, and capstone project review.',
            'Minimum 50% marks in theory and 60% in practical evaluations are necessary for passing.',
            'Digital verification certificates with unique certificate QR code are delivered within 15 working days post-completion.'
        ]
    },
    {
        id: 'fees',
        title: 'Fee Payment, Installments & Refund Terms',
        tag: 'Accounts & Finance',
        color: 'border-amber-500 bg-amber-50/50 text-amber-900',
        points: [
            'All course fee installments must be cleared on or before the 10th of the scheduled calendar month.',
            'Registration & Admission Processing fees are strictly non-refundable once batch allocation has been initiated.',
            'Any fee receipt discrepancies must be formally escalated to the accounts desk within 7 working days.'
        ]
    },
    {
        id: 'conduct',
        title: 'Campus Code of Conduct & Lab Discipline',
        tag: 'Student Affairs',
        color: 'border-rose-500 bg-rose-50/50 text-rose-900',
        points: [
            'Physical or digital Institute ID Card must be carried/displayed at all times inside campus premises and high-tech computer labs.',
            'Damage to lab hardware, unauthorized software installations, or misuse of high-speed campus internet is strictly penalized.',
            'Professional decorum, mutual respect towards peers, faculty, and support staff is mandatory.'
        ]
    }
];

const availableCatalogCourses = [
    { name: 'Software & Full Stack Development', category: 'Software & Web', fee: 35000, duration: '4–6 Months' },
    { name: 'Artificial Intelligence & Generative AI', category: 'AI, Data & Cloud', fee: 42000, duration: '3–6 Months' },
    { name: 'UI/UX & Product Design', category: 'Design & Media', fee: 28000, duration: '3–4 Months' },
    { name: 'Data Science & Business Intelligence', category: 'AI, Data & Cloud', fee: 38000, duration: '4–6 Months' },
    { name: 'Digital Marketing & Performance Ads', category: 'Digital Marketing', fee: 25000, duration: '3–4 Months' },
    { name: 'AutoCAD 2D/3D & Technical Design', category: 'Technical CAD', fee: 22000, duration: '2–4 Months' },
    { name: 'Accounting & GST with TallyPrime', category: 'Business Skills', fee: 18000, duration: '2–3 Months' },
    { name: 'Cyber Security & Ethical Hacking', category: 'AI, Data & Cloud', fee: 36000, duration: '4–6 Months' },
    { name: 'Distance University Degree (BCA / BBA / MBA)', category: 'University Degree', fee: 45000, duration: '2–3 Years' }
];

const StudentProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // overview | courses | fees | policies | helpdesk
    const [showIdCardModal, setShowIdCardModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [notification, setNotification] = useState({ type: '', text: '' });
    const [dynamicCatalog, setDynamicCatalog] = useState(availableCatalogCourses);
    const extractNameFromEmail = (mail) => {
        if (!mail) return 'Student';
        const prefix = mail.split('@')[0];
        const clean = prefix.replace(/[0-9]/g, '').replace(/[._-]/g, ' ').trim();
        if (!clean) return 'Student';
        return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    };

    // Profile state stored locally and synchronized with backend API
    const [studentProfile, setStudentProfile] = useState({
        rollNumber: 'Pending Enrollment',
        batchYear: '2026–2027',
        phone: '',
        city: '',
        bloodGroup: '',
        careerGoal: '',
        enrolledCourse: '',
        enrollmentDate: '',
        mentor: '',
        batchTiming: '',
        attendancePct: 0,
        totalFees: 0,
        paidFees: 0,
        dueFees: 0,
        nextDueDate: 'N/A',
        interestedCourses: [],
        buyList: [],
        supportTickets: []
    });

    const [editFormData, setEditFormData] = useState({
        name: '',
        phone: '',
        city: '',
        careerGoal: '',
        bloodGroup: ''
    });

    const [newTicket, setNewTicket] = useState({ category: 'Academic Query', subject: '', message: '' });

    // Load active user and dynamic courses on mount
    useEffect(() => {
        const loadInitialData = async () => {
            const storedUser = localStorage.getItem('aayush_user');
            if (storedUser) {
                try {
                    let parsed = JSON.parse(storedUser);
                    const isDemo = parsed.email === 'student@aayush.com';

                    // Fix auto-generated mock name if real user logged in
                    if (!parsed.name || (parsed.name === 'Aayush Student' && !isDemo)) {
                        parsed.name = extractNameFromEmail(parsed.email);
                        localStorage.setItem('aayush_user', JSON.stringify(parsed));
                    }

                    setUser(parsed);
                    setEditFormData({
                        name: parsed.name || '',
                        phone: parsed.phone || '',
                        city: '',
                        careerGoal: '',
                        bloodGroup: ''
                    });

                    // Set baseline profile according to whether it's demo or real new student
                    if (isDemo) {
                        setStudentProfile({
                            rollNumber: 'AAY-2024-1082',
                            batchYear: '2024–2025',
                            phone: '+91 98765 43210',
                            city: 'New Delhi, India',
                            bloodGroup: 'B+',
                            careerGoal: 'Full Stack Software Engineer in MNC',
                            enrolledCourse: 'Software & Full Stack Development',
                            enrollmentDate: '15 Jan 2024',
                            mentor: 'Er. Rahul Singh (Lead Technical Architect)',
                            batchTiming: 'Mon – Fri • 10:00 AM – 12:30 PM (Morning Lab 02)',
                            attendancePct: 88,
                            totalFees: 35000,
                            paidFees: 25000,
                            dueFees: 10000,
                            nextDueDate: '10 Oct 2026',
                            interestedCourses: [],
                            buyList: [],
                            supportTickets: []
                        });
                    } else {
                        setStudentProfile({
                            rollNumber: parsed.studentId && parsed.studentId !== 'AAY-2024-1082' ? parsed.studentId : 'Pending Enrollment',
                            batchYear: '2026–2027',
                            phone: parsed.phone || '',
                            city: '',
                            bloodGroup: 'Not Specified',
                            careerGoal: '',
                            enrolledCourse: parsed.course || '',
                            enrollmentDate: parsed.course ? 'Pending Verification' : '',
                            mentor: parsed.course ? 'Will be assigned on batch start' : '',
                            batchTiming: parsed.course ? 'Batch Allocation in Progress' : '',
                            attendancePct: 0,
                            totalFees: 0,
                            paidFees: 0,
                            dueFees: 0,
                            nextDueDate: 'N/A',
                            interestedCourses: [],
                            buyList: [],
                            supportTickets: []
                        });
                    }

                    // Fetch dynamic profile from backend API
                    try {
                        const apiProf = await studentApi.getProfile();
                        if (apiProf) {
                            setStudentProfile(prev => ({
                                ...prev,
                                rollNumber: (apiProf.studentId && apiProf.studentId !== 'AAY-2024-1082') ? apiProf.studentId : prev.rollNumber,
                                enrolledCourse: apiProf.course || prev.enrolledCourse,
                                phone: apiProf.phone || prev.phone,
                                city: apiProf.city || prev.city,
                                bloodGroup: apiProf.bloodGroup || prev.bloodGroup,
                                careerGoal: apiProf.careerGoal || prev.careerGoal,
                                batchYear: apiProf.batchYear || prev.batchYear,
                                mentor: apiProf.mentor || prev.mentor,
                                batchTiming: apiProf.batchTiming || prev.batchTiming,
                                attendancePct: apiProf.attendancePct ?? prev.attendancePct,
                                totalFees: apiProf.totalFees ?? prev.totalFees,
                                paidFees: apiProf.paidFees ?? prev.paidFees,
                                dueFees: apiProf.dueFees ?? prev.dueFees,
                                nextDueDate: apiProf.nextDueDate || prev.nextDueDate,
                                interestedCourses: (apiProf.interestedCourses && apiProf.interestedCourses.length > 0)
                                    ? apiProf.interestedCourses
                                    : prev.interestedCourses,
                                buyList: (apiProf.buyList && apiProf.buyList.length > 0)
                                    ? apiProf.buyList
                                    : prev.buyList,
                                supportTickets: (apiProf.supportTickets && apiProf.supportTickets.length > 0)
                                    ? apiProf.supportTickets
                                    : prev.supportTickets
                            }));
                        }
                    } catch (e) {
                        console.warn('API profile load note:', e);
                    }
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            }

            // Fetch real course catalog from API / custom courses
            try {
                const res = await courseApi.getAll();
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map(c => ({
                        name: c.name,
                        category: c.categoryName || c.subgroup || 'Technical Course',
                        fee: typeof c.fee === 'number' ? c.fee : parseInt(String(c.fee || '30000').replace(/[^0-9]/g, '') || '30000', 10),
                        duration: c.duration || '3–6 Months'
                    }));
                    setDynamicCatalog(mapped);
                }
            } catch (err) {
                console.warn('Catalog load fallback:', err);
            }
        };

        loadInitialData();

        const syncCatalog = () => {
            courseApi.getAll().then(res => {
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map(c => ({
                        name: c.name,
                        category: c.categoryName || c.subgroup || 'Technical Course',
                        fee: typeof c.fee === 'number' ? c.fee : parseInt(String(c.fee || '30000').replace(/[^0-9]/g, '') || '30000', 10),
                        duration: c.duration || '3–6 Months'
                    }));
                    setDynamicCatalog(mapped);
                }
            }).catch(() => {});
        };
        window.addEventListener('coursesUpdated', syncCatalog);
        window.addEventListener('storage', syncCatalog);
        return () => {
            window.removeEventListener('coursesUpdated', syncCatalog);
            window.removeEventListener('storage', syncCatalog);
        };
    }, []);

    // Helper to persist profile state locally and in DB
    const saveProfileData = (updatedProfile) => {
        setStudentProfile(updatedProfile);
        if (user) {
            localStorage.setItem(`aayush_profile_${user.id || user.email}`, JSON.stringify(updatedProfile));
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        const isComplete = Boolean(editFormData.name && editFormData.phone && editFormData.city && editFormData.careerGoal);
        const updatedUser = {
            ...user,
            name: editFormData.name,
            phone: editFormData.phone,
            city: editFormData.city,
            isProfileComplete: isComplete
        };
        setUser(updatedUser);
        localStorage.setItem('aayush_user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('authChange'));

        const updatedProf = {
            ...studentProfile,
            phone: editFormData.phone,
            city: editFormData.city,
            careerGoal: editFormData.careerGoal,
            bloodGroup: editFormData.bloodGroup
        };
        saveProfileData(updatedProf);

        try {
            await studentApi.updateProfile({
                userId: user?.id,
                name: editFormData.name,
                phone: editFormData.phone,
                city: editFormData.city,
                bloodGroup: editFormData.bloodGroup,
                careerGoal: editFormData.careerGoal
            });
        } catch (err) {
            // Handled gracefully
        }

        setShowEditModal(false);
        setNotification({ type: 'success', text: 'Profile details updated and saved successfully!' });
        setTimeout(() => setNotification({ type: '', text: '' }), 3000);
    };

    const handleAddCourseInterest = async (course) => {
        if (studentProfile.interestedCourses.some(c => c.name === course.name)) {
            setNotification({ type: 'error', text: `${course.name} is already in your interested list!` });
            setTimeout(() => setNotification({ type: '', text: '' }), 3000);
            return;
        }

        const newInterest = {
            id: 'c_' + Date.now(),
            name: course.name,
            category: course.category,
            addedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'Interest Expressed',
            fee: course.fee || 30000,
            duration: course.duration || '3–6 Months'
        };

        const updated = {
            ...studentProfile,
            interestedCourses: [newInterest, ...studentProfile.interestedCourses]
        };
        saveProfileData(updated);
        setShowAddCourseModal(false);
        setNotification({ type: 'success', text: `Added "${course.name}" to your interested list (Synced with Database)!` });
        setTimeout(() => setNotification({ type: '', text: '' }), 3000);

        try {
            await studentApi.addInterest({
                userId: user?.id,
                name: course.name,
                category: course.category,
                fee: course.fee,
                duration: course.duration
            });
        } catch (e) {
            // Local state is already updated
        }
    };

    const handleMoveToBuy = async (interestCourse) => {
        const buyItem = {
            id: 'b_' + Date.now(),
            name: interestCourse.name,
            category: interestCourse.category,
            fee: interestCourse.fee || 30000,
            discount: 3000,
            finalFee: (interestCourse.fee || 30000) - 3000,
            batch: 'Upcoming Morning / Evening Batch'
        };

        const updated = {
            ...studentProfile,
            buyList: [buyItem, ...studentProfile.buyList],
            interestedCourses: studentProfile.interestedCourses.filter(c => c.name !== interestCourse.name && c.id !== interestCourse.id)
        };
        saveProfileData(updated);
        setActiveTab('courses');
        setNotification({ type: 'success', text: `Moved "${interestCourse.name}" to Buy / Enrollment pipeline (Synced)!` });
        setTimeout(() => setNotification({ type: '', text: '' }), 3000);

        try {
            await studentApi.addToBuy({
                userId: user?.id,
                name: interestCourse.name,
                category: interestCourse.category,
                fee: interestCourse.fee,
                discount: 3000,
                batch: 'Upcoming Batch'
            });
        } catch (e) {
            // Handled
        }
    };

    const handleRemoveInterest = async (item) => {
        const id = typeof item === 'object' ? item.id : item;
        const name = typeof item === 'object' ? item.name : item;
        const updated = {
            ...studentProfile,
            interestedCourses: studentProfile.interestedCourses.filter(c => c.id !== id && c.name !== name)
        };
        saveProfileData(updated);

        try {
            await studentApi.removeInterest(name);
        } catch (e) {
            // Handled
        }
    };

    const handleRemoveBuy = async (item) => {
        const id = typeof item === 'object' ? item.id : item;
        const name = typeof item === 'object' ? item.name : item;
        const updated = {
            ...studentProfile,
            buyList: studentProfile.buyList.filter(b => b.id !== id && b.name !== name)
        };
        saveProfileData(updated);

        try {
            await studentApi.removeFromBuy(name);
        } catch (e) {
            // Handled
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        if (!newTicket.subject.trim()) return;

        const ticket = {
            id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
            category: newTicket.category,
            subject: newTicket.subject,
            message: newTicket.message,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'Submitted',
            statusColor: 'bg-amber-100 text-amber-800'
        };

        const updated = {
            ...studentProfile,
            supportTickets: [ticket, ...studentProfile.supportTickets]
        };
        saveProfileData(updated);
        setNewTicket({ category: 'Academic Query', subject: '', message: '' });
        setNotification({ type: 'success', text: 'Help request submitted to Database! Counselor will reach out shortly.' });
        setTimeout(() => setNotification({ type: '', text: '' }), 3000);

        try {
            await studentApi.createTicket({
                userId: user?.id,
                category: newTicket.category,
                subject: newTicket.subject,
                message: newTicket.message
            });
        } catch (err) {
            // Local state updated
        }
    };

    const handleLogout = () => {
        authApi.logout();
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    // If no user is logged in, show access card
    if (!user) {
        return (
            <div className="min-h-screen bg-[#f4f8fc] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 text-center animate-in fade-in zoom-in-95">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4 text-[#0055ff] shadow-sm">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#00285e] mb-2">Student Portal Login Required</h2>
                    <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                        Please sign in with your student credentials or Roll Number to access your enrolled courses, attendance, fee details, and institute policies.
                    </p>
                    <div className="space-y-3">
                        <NavLink
                            to="/login?type=student"
                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                        >
                            <GraduationCap className="w-4 h-4" />
                            <span>Sign In to Student Portal</span>
                        </NavLink>
                        <NavLink
                            to="/Courses"
                            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                            <span>Browse Available Courses</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    const hasName = Boolean(user?.name && user.name !== 'Aayush Student' && user.name !== 'Student');
    const hasPhone = Boolean(studentProfile.phone && studentProfile.phone !== '+91 98765 43210');
    const hasCity = Boolean(studentProfile.city);
    const hasCareerGoal = Boolean(studentProfile.careerGoal);
    const hasCourse = Boolean(studentProfile.enrolledCourse);

    let completedSteps = 0;
    if (hasName) completedSteps += 1;
    if (hasPhone) completedSteps += 1;
    if (hasCity) completedSteps += 1;
    if (hasCareerGoal) completedSteps += 1;
    if (hasCourse) completedSteps += 1;

    const completionPct = Math.round((completedSteps / 5) * 100);
    const isProfileIncomplete = completionPct < 100;

    return (
        <div className="min-h-screen bg-[#f4f8fc] py-6 sm:py-8 px-4 sm:px-6 lg:px-10">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Notification Toast */}
                {notification.text && (
                    <div className={`p-3.5 rounded-2xl border flex items-center gap-2.5 text-xs font-semibold shadow-md animate-in fade-in slide-in-from-top-2 ${
                        notification.type === 'error'
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                        {notification.type === 'error' ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                        <span>{notification.text}</span>
                    </div>
                )}

                {/* ── 1. Top Student Identity Banner ── */}
                <div className="bg-gradient-to-r from-[#00285e] via-[#00488f] to-[#0055ff] rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* Left: Avatar & Basic Information */}
                        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                            <div className="relative">
                                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                                </div>
                                <span className={`absolute -bottom-1 -right-1 w-5 h-5 ${hasCourse ? 'bg-emerald-500' : 'bg-amber-400'} border-2 border-[#00285e] rounded-full flex items-center justify-center`} title={hasCourse ? "Active Enrolled Student" : "Enrollment Pending"}>
                                    {hasCourse ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Clock className="w-3.5 h-3.5 text-[#00285e]" />}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                                        {user.name || 'Student'}
                                    </h1>
                                    {isProfileIncomplete ? (
                                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/25 border border-amber-300/40 text-amber-200 text-[11px] font-semibold tracking-wide flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3 text-amber-300" />
                                            Profile Incomplete ({completionPct}%)
                                        </span>
                                    ) : !hasCourse ? (
                                        <span className="px-2.5 py-0.5 rounded-full bg-blue-400/25 border border-blue-300/40 text-blue-200 text-[11px] font-semibold tracking-wide flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-blue-300" />
                                            Registered Applicant
                                        </span>
                                    ) : (
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 text-[11px] font-semibold tracking-wide flex items-center gap-1">
                                            <Sparkles className="w-3 h-3 text-emerald-300" />
                                            Verified Enrolled
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-100/90 font-medium">
                                    <span className="flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-md font-semibold font-mono text-[11.5px] border border-white/20">
                                        Roll No: {studentProfile.rollNumber || 'Pending Allocation'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                                        {studentProfile.enrolledCourse || 'No Active Course Enrolled'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-blue-200" />
                                        Batch: {studentProfile.batchYear || '2026–2027'}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-blue-200/80 pt-1">
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        {user.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Phone className="w-3 h-3" />
                                        {studentProfile.phone || 'Phone not set'}
                                    </span>
                                    {studentProfile.city && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {studentProfile.city}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
                            <button
                                type="button"
                                onClick={() => setShowIdCardModal(true)}
                                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-xs flex items-center gap-2 backdrop-blur-md shadow-xs transition-all cursor-pointer"
                            >
                                <QrCode className="w-4 h-4 text-amber-300" />
                                <span>Digital ID Card</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowEditModal(true)}
                                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-xs flex items-center gap-2 backdrop-blur-md shadow-xs transition-all cursor-pointer"
                            >
                                <Edit3 className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="px-3 py-2 rounded-xl bg-rose-500/25 hover:bg-rose-500/40 border border-rose-400/40 text-rose-100 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20">
                        <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                            <p className="text-[11px] text-blue-200/90 font-medium">Class Attendance</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-xl font-bold text-white">
                                    {hasCourse ? `${studentProfile.attendancePct}%` : '—'}
                                </span>
                                <span className={`text-[10px] font-semibold ${hasCourse ? (studentProfile.attendancePct >= 75 ? 'text-emerald-300' : 'text-amber-200') : 'text-blue-200'}`}>
                                    {hasCourse ? (studentProfile.attendancePct >= 75 ? 'Eligible (75%+)' : 'Needs Attention') : 'Pending Admission'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                            <p className="text-[11px] text-blue-200/90 font-medium">Interested Courses</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-xl font-bold text-white">{studentProfile.interestedCourses.length}</span>
                                <span className="text-[10px] text-amber-200 font-medium">Shortlisted</span>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                            <p className="text-[11px] text-blue-200/90 font-medium">Courses in Buy Cart</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-xl font-bold text-white">{studentProfile.buyList.length}</span>
                                <span className="text-[10px] text-cyan-200 font-medium">Ready to enroll</span>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                            <p className="text-[11px] text-blue-200/90 font-medium">Pending Fee Balance</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-xl font-bold text-amber-300">₹{studentProfile.dueFees.toLocaleString('en-IN')}</span>
                                <span className="text-[10px] text-blue-200 font-medium">
                                    {studentProfile.dueFees > 0 ? `Due: ${studentProfile.nextDueDate}` : 'No Dues Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Profile Incomplete Action Alert Banner ── */}
                {isProfileIncomplete && (
                    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border-2 border-amber-300/80 bg-white rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-bold text-slate-900">Your Student Profile is Incomplete ({completionPct}%)</h2>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">Action Required</span>
                                </div>
                                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                    You haven't completed your profile details yet. Please update your full name, contact phone, city, and target career goals so our institute counselors can verify your identity and allot your official course batch.
                                </p>
                                <div className="w-full max-w-sm bg-slate-100 rounded-full h-2 mt-2 overflow-hidden border border-slate-200">
                                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowEditModal(true)}
                            className="shrink-0 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                        >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Complete Profile Now</span>
                        </button>
                    </div>
                )}

                {/* ── 2. Navigation Tabs ── */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
                    <button
                        type="button"
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'overview'
                                ? 'bg-[#00285e] text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                        }`}
                    >
                        <User className="w-4 h-4" />
                        <span>Academic Overview</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('courses')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'courses'
                                ? 'bg-[#00285e] text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>Courses (Interested &amp; Buy)</span>
                        {(studentProfile.interestedCourses.length > 0 || studentProfile.buyList.length > 0) && (
                            <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                                {studentProfile.interestedCourses.length + studentProfile.buyList.length}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('fees')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'fees'
                                ? 'bg-[#00285e] text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                        }`}
                    >
                        <CreditCard className="w-4 h-4" />
                        <span>Fees &amp; Receipts</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('policies')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'policies'
                                ? 'bg-[#00285e] text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                        }`}
                    >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Institute Policies &amp; Rules</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('helpdesk')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'helpdesk'
                                ? 'bg-[#00285e] text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                        }`}
                    >
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        <span>Student Helpdesk</span>
                    </button>
                </div>

                {/* ── 3. Tab Contents ── */}

                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
                        {/* Left 2 Cols: Active Enrolled Course Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Current Course Card OR Pending Enrollment Notice */}
                            {!studentProfile.enrolledCourse ? (
                                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/90 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                                <GraduationCap className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-900">Program Enrollment Status</h3>
                                                <p className="text-[11px] text-slate-500 font-medium">Session: {studentProfile.batchYear || '2026–2027'}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                                            Status: Pending Admission
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-base sm:text-lg font-bold text-slate-800">
                                            No Active Course Enrolled Yet
                                        </h4>
                                        <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                            You are currently registered as an applicant. You haven't officially enrolled into an active course batch yet. Explore our career programs, shortlist courses, or connect with our counselor to confirm your batch.
                                        </p>

                                        <div className="flex flex-wrap items-center gap-3 pt-2">
                                            <NavLink
                                                to="/Courses"
                                                className="px-4 py-2 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                                            >
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span>Browse &amp; Enroll in Courses</span>
                                            </NavLink>
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab('interested')}
                                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                            >
                                                <span>View Shortlisted Courses ({studentProfile.interestedCourses.length})</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0055ff] flex items-center justify-center">
                                                <GraduationCap className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-900">Current Enrolled Program</h3>
                                                <p className="text-[11px] text-slate-500 font-medium">Batch Session: {studentProfile.batchYear}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                                            Status: Ongoing
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-base sm:text-lg font-bold text-[#00285e]">
                                            {studentProfile.enrolledCourse}
                                        </h4>
                                        <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                            Industry-ready software development training covering frontend architecture, backend RESTful APIs, cloud deployment, and live industry capstone projects.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                                                <span className="text-[11px] text-slate-500 font-medium">Assigned Faculty Mentor</span>
                                                <p className="font-semibold text-slate-800">{studentProfile.mentor}</p>
                                            </div>
                                            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                                                <span className="text-[11px] text-slate-500 font-medium">Batch Timing &amp; Classroom</span>
                                                <p className="font-semibold text-slate-800">{studentProfile.batchTiming}</p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-1.5 pt-2">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <span className="text-slate-700">Course Syllabus Progress</span>
                                                <span className="text-[#0055ff]">65% Completed (Module 4 of 6)</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{ width: '65%' }} />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-3 pt-3">
                                            <NavLink
                                                to="/it-stack-development"
                                                className="px-4 py-2 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                                            >
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span>View Syllabus Modules</span>
                                            </NavLink>
                                            <button
                                                type="button"
                                                onClick={() => setNotification({ type: 'success', text: 'LMS Study Material & Code Repositories opened in student portal!' })}
                                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                                                <span>Open LMS Notes &amp; Labs</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Attendance & Exam Eligibility Card */}
                            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-amber-500" />
                                    <span>Examination &amp; Placement Readiness</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center space-y-1">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                                        <p className="text-xs font-bold text-emerald-900">
                                            Attendance: {hasCourse ? `${studentProfile.attendancePct}%` : '0%'}
                                        </p>
                                        <span className="text-[10px] text-emerald-700 block font-medium">
                                            {hasCourse ? 'Eligible for Certification' : '75% Required on Batch Start'}
                                        </span>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-center space-y-1">
                                        <FileText className="w-5 h-5 text-blue-600 mx-auto" />
                                        <p className="text-xs font-bold text-blue-900">
                                            {hasCourse ? 'Projects: 2 / 2 Submitted' : 'Projects: Pending Enrollment'}
                                        </p>
                                        <span className="text-[10px] text-blue-700 block font-medium">
                                            {hasCourse ? 'All Lab Practicals Verified' : 'Industry Capstone Projects'}
                                        </span>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-center space-y-1">
                                        <Sparkles className="w-5 h-5 text-purple-600 mx-auto" />
                                        <p className="text-xs font-bold text-purple-900">
                                            Placement Cell: {hasCourse ? 'Active' : 'Upon 60% Course Completion'}
                                        </p>
                                        <span className="text-[10px] text-purple-700 block font-medium">
                                            {hasCourse ? 'Resume Approved for Drives' : 'Career Support & Interview Prep'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right 1 Col: Student Profile Quick Meta & Actions */}
                        <div className="space-y-6">
                            {/* Profile Bio Card */}
                            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
                                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center justify-between">
                                    <span>Personal &amp; Contact Record</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(true)}
                                        className="text-[11px] font-semibold text-[#0055ff] hover:underline cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                </h3>

                                <div className="space-y-2.5 text-xs">
                                    <div className="flex justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Student Name</span>
                                        <span className="font-semibold text-slate-800">{user.name || 'Not Provided'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Roll Number</span>
                                        <span className="font-semibold text-slate-800 font-mono">{studentProfile.rollNumber || 'Pending Allocation'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Contact Phone</span>
                                        <span className="font-semibold text-slate-800">{studentProfile.phone || 'Not Provided'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Registered Email</span>
                                        <span className="font-semibold text-slate-800 truncate max-w-[150px]">{user.email}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Campus Location</span>
                                        <span className="font-semibold text-slate-800">{studentProfile.city || 'Not Specified'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Blood Group</span>
                                        <span className="font-semibold text-slate-800">{studentProfile.bloodGroup || 'Not Specified'}</span>
                                    </div>
                                    <div className="pt-1">
                                        <span className="text-slate-500 font-medium block mb-1">Career Goal</span>
                                        <p className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-[#003882] font-semibold">
                                            🎯 {studentProfile.careerGoal || 'Click "Edit" to set your target role'}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowIdCardModal(true)}
                                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                                >
                                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                                    <span>Print Student ID Card</span>
                                </button>
                            </div>

                            {/* Academic Counselor Card */}
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50/60 rounded-3xl p-5 border border-indigo-100 shadow-sm space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#00285e] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                                        AC
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-[#00285e]">Assigned Academic Counselor</h4>
                                        <p className="text-[11px] text-slate-600 font-medium">Academic Guidance &amp; Batch Cell</p>
                                    </div>
                                </div>
                                <p className="text-[11.5px] text-slate-600 font-normal leading-relaxed">
                                    Need help with class timings, fees installment, or additional courses? Call or text your advisor directly.
                                </p>
                                <div className="pt-1 flex items-center gap-2">
                                    <a
                                        href="tel:+918800817447"
                                        className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-blue-50 text-[#00488f] border border-blue-200 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                                    >
                                        <Phone className="w-3 h-3" />
                                        <span>Call Counselor</span>
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveTab('helpdesk');
                                            setNewTicket(prev => ({ ...prev, subject: 'Request counseling guidance' }));
                                        }}
                                        className="flex-1 py-2 px-3 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                                    >
                                        <Send className="w-3 h-3" />
                                        <span>Send Message</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: COURSES (INTERESTED, BUY, ENROLLED) */}
                {activeTab === 'courses' && (
                    <div className="space-y-6 animate-in fade-in">
                        {/* Header Banner with Add Course button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
                            <div>
                                <h3 className="text-base font-bold text-[#00285e]">Course Interest &amp; Enrollment Pipeline</h3>
                                <p className="text-xs text-slate-500 font-normal">
                                    Manage courses you have enquired about, shortlisted to buy, or want admission guidance on.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowAddCourseModal(true)}
                                className="px-4 py-2.5 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Express Interest in New Course</span>
                            </button>
                        </div>

                        {/* SECTION A: COURSES SHORTLISTED TO BUY / ENROLL */}
                        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                        <CreditCard className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">Courses Shortlisted to Buy / Enroll</h4>
                                        <p className="text-[11px] text-slate-500 font-medium">Ready for fee payment and batch seat booking</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-xs">
                                    {studentProfile.buyList.length} in Cart
                                </span>
                            </div>

                            {studentProfile.buyList.length === 0 ? (
                                <div className="py-8 text-center text-slate-500 text-xs">
                                    <p>No courses currently in your enrollment pipeline.</p>
                                    <p className="text-[11px] text-slate-400 mt-1">Browse courses below and click "Move to Enroll / Buy" to shortlist.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {studentProfile.buyList.map((item) => (
                                        <div key={item.id} className="p-4 rounded-2xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 flex flex-col justify-between space-y-3">
                                            <div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wide bg-amber-100 px-2 py-0.5 rounded-md">
                                                        {item.category}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveBuy(item.id)}
                                                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                                        title="Remove from buy list"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <h5 className="text-sm font-bold text-slate-900 mt-2">{item.name}</h5>
                                                <p className="text-[11px] text-slate-600 font-medium mt-0.5">Batch: {item.batch}</p>
                                            </div>

                                            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                                                <div>
                                                    <span className="text-[10px] text-slate-400 line-through mr-1.5">₹{item.fee.toLocaleString('en-IN')}</span>
                                                    <span className="text-sm font-bold text-[#00285e]">₹{item.finalFee.toLocaleString('en-IN')}</span>
                                                    <span className="text-[10px] text-emerald-600 font-semibold block">Scholarship -₹{item.discount}</span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setNotification({ type: 'success', text: `Proceeding to Admission desk for "${item.name}". Counselor notified!` });
                                                        setTimeout(() => setNotification({ type: '', text: '' }), 3500);
                                                    }}
                                                    className="px-4 py-2 rounded-xl bg-[#00285e] hover:bg-[#003882] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span>Confirm Enrollment</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* SECTION B: COURSES OF INTEREST / ENQUIRED */}
                        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">Courses You Have Shown Interest In</h4>
                                        <p className="text-[11px] text-slate-500 font-medium">Courses you explored or registered enquiries for</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-200">
                                    {studentProfile.interestedCourses.length} Courses
                                </span>
                            </div>

                            {studentProfile.interestedCourses.length === 0 ? (
                                <div className="py-8 text-center text-slate-500 text-xs">
                                    <p>You haven't marked interest in any additional courses yet.</p>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCourseModal(true)}
                                        className="mt-2 text-[#0055ff] font-semibold hover:underline cursor-pointer"
                                    >
                                        + Browse catalog &amp; express interest
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {studentProfile.interestedCourses.map((course) => (
                                        <div key={course.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
                                            <div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wide bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                                                        {course.category}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveInterest(course.id)}
                                                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                                        title="Remove from interested"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                <h5 className="text-sm font-bold text-slate-900 mt-2">{course.name}</h5>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 mt-1 font-medium">
                                                    <span>Duration: {course.duration}</span>
                                                    <span>•</span>
                                                    <span>Added on: {course.addedOn}</span>
                                                </div>
                                            </div>

                                            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                                                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[10.5px] font-semibold">
                                                    {course.status}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMoveToBuy(course)}
                                                        className="px-3 py-1.5 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                                                    >
                                                        <span>Enroll / Buy</span>
                                                        <ChevronRight className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TAB 3: FEES & FINANCIALS */}
                {activeTab === 'fees' && (
                    <div className="space-y-6 animate-in fade-in">
                        {/* Financial Metric Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-1">
                                <span className="text-[11px] text-slate-500 font-medium">Total Program Fee</span>
                                <h3 className="text-2xl font-bold text-slate-900">₹{studentProfile.totalFees.toLocaleString('en-IN')}</h3>
                                <p className="text-[11px] text-slate-400 font-medium">Inclusive of GST, Books &amp; Exam Fee</p>
                            </div>

                            <div className="bg-white rounded-3xl p-5 border border-emerald-200/90 bg-emerald-50/30 shadow-sm space-y-1">
                                <span className="text-[11px] text-emerald-700 font-medium">Amount Paid to Date</span>
                                <h3 className="text-2xl font-bold text-emerald-800">₹{studentProfile.paidFees.toLocaleString('en-IN')}</h3>
                                <p className="text-[11px] text-emerald-600 font-medium">Cleared via Net Banking / UPI</p>
                            </div>

                            <div className="bg-white rounded-3xl p-5 border border-amber-200/90 bg-amber-50/30 shadow-sm space-y-1">
                                <span className="text-[11px] text-amber-700 font-medium">Pending Balance Due</span>
                                <h3 className="text-2xl font-bold text-amber-800">₹{studentProfile.dueFees.toLocaleString('en-IN')}</h3>
                                <p className="text-[11px] text-amber-700 font-medium">Due by: {studentProfile.nextDueDate}</p>
                            </div>
                        </div>

                        {/* Fee Transactions & Receipts Table */}
                        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">Fee Installment Receipts &amp; Ledger</h4>
                                    <p className="text-[11px] text-slate-500 font-medium">Verified computer-generated financial records</p>
                                </div>
                                {studentProfile.paidFees > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setShowReceiptModal(true)}
                                        className="px-3.5 py-2 rounded-xl bg-blue-50 text-[#0055ff] hover:bg-blue-100 border border-blue-200 font-semibold text-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Download Latest Receipt</span>
                                    </button>
                                )}
                            </div>

                            {studentProfile.paidFees === 0 && studentProfile.dueFees === 0 ? (
                                <div className="py-12 text-center text-slate-500 space-y-2">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <h5 className="text-sm font-semibold text-slate-800">No Fee Transactions or Receipts Yet</h5>
                                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                                        You have not enrolled in an active fee program yet. Once you confirm your course admission, your payment schedule and verified receipts will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px]">
                                                <th className="py-2.5 px-3 font-semibold">Receipt No</th>
                                                <th className="py-2.5 px-3 font-semibold">Installment</th>
                                                <th className="py-2.5 px-3 font-semibold">Date Paid</th>
                                                <th className="py-2.5 px-3 font-semibold">Mode</th>
                                                <th className="py-2.5 px-3 font-semibold">Amount</th>
                                                <th className="py-2.5 px-3 font-semibold">Status</th>
                                                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-700">
                                            <tr>
                                                <td className="py-3 px-3 font-mono font-semibold text-[#00285e]">RCP-2024-0891</td>
                                                <td className="py-3 px-3 font-medium">1st Installment (Admission)</td>
                                                <td className="py-3 px-3">15 Jan 2024</td>
                                                <td className="py-3 px-3">UPI / Online</td>
                                                <td className="py-3 px-3 font-bold text-slate-900">₹15,000</td>
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Paid</span>
                                                </td>
                                                <td className="py-3 px-3 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowReceiptModal(true)}
                                                        className="text-[#0055ff] hover:underline font-semibold cursor-pointer"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-3 font-mono font-semibold text-[#00285e]">RCP-2024-1104</td>
                                                <td className="py-3 px-3 font-medium">2nd Installment (Mid-Term)</td>
                                                <td className="py-3 px-3">10 Apr 2024</td>
                                                <td className="py-3 px-3">Bank Transfer</td>
                                                <td className="py-3 px-3 font-bold text-slate-900">₹10,000</td>
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Paid</span>
                                                </td>
                                                <td className="py-3 px-3 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowReceiptModal(true)}
                                                        className="text-[#0055ff] hover:underline font-semibold cursor-pointer"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-amber-50/30">
                                                <td className="py-3 px-3 font-mono text-slate-400">Upcoming</td>
                                                <td className="py-3 px-3 font-medium text-amber-900">Final Installment</td>
                                                <td className="py-3 px-3 text-amber-800 font-semibold">{studentProfile.nextDueDate}</td>
                                                <td className="py-3 px-3 text-slate-500">—</td>
                                                <td className="py-3 px-3 font-bold text-amber-900">₹{studentProfile.dueFees.toLocaleString('en-IN')}</td>
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">Due Soon</span>
                                                </td>
                                                <td className="py-3 px-3 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setNotification({ type: 'success', text: 'Online Fee Payment gateway initiated (Demo Mode).' });
                                                            setTimeout(() => setNotification({ type: '', text: '' }), 3000);
                                                        }}
                                                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[11px] shadow-2xs cursor-pointer"
                                                    >
                                                        Pay Now
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TAB 4: INSTITUTE POLICIES & GUIDELINES */}
                {activeTab === 'policies' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#00488f] text-[11px] font-semibold border border-blue-200">
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                                <span>Official Academic Bye-Laws &amp; Student Code of Conduct</span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#00285e] pt-1">
                                Aayush Institute of Professional Studies – Student Rules &amp; Institutional Guidelines
                            </h3>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Every student registered with Aayush Institute is bound by the following institutional policies to maintain academic excellence, campus decorum, and career readiness.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {defaultPolicies.map((pol) => (
                                <div key={pol.id} className={`p-5 rounded-3xl border-2 ${pol.color} shadow-xs space-y-3`}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 shadow-2xs border">
                                            {pol.tag}
                                        </span>
                                        <ShieldCheck className="w-4 h-4 opacity-75" />
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{pol.title}</h4>
                                    <ul className="space-y-2 text-xs text-slate-700 font-normal">
                                        {pol.points.map((pt, pIdx) => (
                                            <li key={pIdx} className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 flex-shrink-0" />
                                                <span className="leading-relaxed">{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 5: STUDENT HELPDESK & TICKETS */}
                {activeTab === 'helpdesk' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
                        {/* Left 2 Cols: Submit New Ticket Form */}
                        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h4 className="text-base font-bold text-[#00285e]">Submit a Student Service Request / Ticket</h4>
                                <p className="text-xs text-slate-500 font-normal">
                                    Need batch rescheduling, lab support, fee extension, or project mentorship? Submit your request below.
                                </p>
                            </div>

                            <form onSubmit={handleCreateTicket} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Query Category
                                    </label>
                                    <select
                                        value={newTicket.category}
                                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0055ff]"
                                    >
                                        <option value="Academic Query">Academic Query &amp; Curriculum Doubts</option>
                                        <option value="Batch Rescheduling">Batch Rescheduling / Weekend Shift</option>
                                        <option value="Fee Query">Fee Installment &amp; Receipt Enquiry</option>
                                        <option value="Placement Support">Placement Cell &amp; Resume Review</option>
                                        <option value="ID Card & Certificate">Digital ID Card / Certificate Re-issue</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Subject / Summary *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Request to change batch from Morning to Evening"
                                        value={newTicket.subject}
                                        onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0055ff]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Detailed Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Provide complete details so the academic coordinator can assist you immediately..."
                                        value={newTicket.message}
                                        onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0055ff]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Submit Service Ticket</span>
                                </button>
                            </form>
                        </div>

                        {/* Right 1 Col: Past Tickets */}
                        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                                Past Service Tickets
                            </h4>

                            <div className="space-y-3">
                                {studentProfile.supportTickets.map((tck) => (
                                    <div key={tck.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono font-semibold text-slate-500 text-[10.5px]">{tck.id}</span>
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${tck.statusColor}`}>
                                                {tck.status}
                                            </span>
                                        </div>
                                        <p className="font-semibold text-slate-800 leading-snug">{tck.subject}</p>
                                        <p className="text-[10px] text-slate-400">Date: {tck.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* ── DIGITAL ID CARD MODAL ── */}
            {showIdCardModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                    <div className="max-w-sm w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95">
                        {/* ID Card Front Top Banner */}
                        <div className={`p-4 text-white text-center relative ${
                            hasCourse
                                ? 'bg-gradient-to-r from-[#00285e] via-[#00488f] to-[#0055ff]'
                                : 'bg-gradient-to-r from-amber-700 via-orange-800 to-slate-900'
                        }`}>
                            <p className="text-[10px] tracking-wider uppercase font-semibold text-amber-300">
                                {hasCourse ? 'Official Student Identity Card' : 'Provisional ID Card (Pending Enrollment)'}
                            </p>
                            <h4 className="text-sm font-bold mt-0.5">Aayush Institute of Professional Studies</h4>
                            <p className="text-[10px] text-blue-200">Govt. Registered • Uttam Nagar East, New Delhi</p>
                        </div>

                        {/* ID Card Body */}
                        <div className="p-5 text-center space-y-3">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold mx-auto shadow-md border-2 border-white">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-[#00285e]">{user.name || 'Student'}</h3>
                                <p className={`text-xs font-semibold ${hasCourse ? 'text-[#0055ff]' : 'text-amber-700 italic'}`}>
                                    {studentProfile.enrolledCourse || 'Course Enrollment In Progress'}
                                </p>
                            </div>

                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5 font-medium">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Roll No:</span>
                                    <span className="font-bold font-mono text-slate-900">{studentProfile.rollNumber || 'Pending Allocation'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Academic Year:</span>
                                    <span className="font-bold text-slate-900">{studentProfile.batchYear || '2026–2027'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Blood Group:</span>
                                    <span className="font-bold text-slate-900">{studentProfile.bloodGroup || 'Not Specified'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Phone:</span>
                                    <span className="font-bold text-slate-900">{studentProfile.phone || 'Not Provided'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Status:</span>
                                    <span className={`font-bold ${hasCourse ? 'text-emerald-700' : 'text-amber-700'}`}>
                                        {hasCourse ? 'Active Enrolled' : 'Provisional / Verification Pending'}
                                    </span>
                                </div>
                            </div>

                            {/* Barcode Mockup */}
                            <div className="pt-2 flex flex-col items-center">
                                <div className="h-9 w-48 flex items-center justify-center gap-1">
                                    {[2, 4, 1, 3, 2, 5, 1, 4, 3, 2, 1, 4, 2, 3, 5, 2, 1, 3].map((w, i) => (
                                        <div key={i} className={`bg-slate-900 h-8`} style={{ width: `${w * 1.5}px` }} />
                                    ))}
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 mt-1">*{studentProfile.rollNumber || 'PENDING'}*</span>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="flex-1 py-2 px-3 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    <span>Print Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowIdCardModal(false)}
                                    className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── FEE RECEIPT MODAL ── */}
            {showReceiptModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4 animate-in zoom-in-95">
                        <div className="flex items-center justify-between border-b pb-3">
                            <div>
                                <h4 className="text-sm font-bold text-[#00285e]">Official Fee Payment Receipt</h4>
                                <p className="text-[10px] text-slate-500 font-mono">Receipt: RCP-2024-1104 • Computer Generated</p>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                                CLEARED
                            </span>
                        </div>

                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500 font-medium">Student Name:</span>
                                <span className="font-bold text-slate-900">{user.name}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500 font-medium">Student Roll No:</span>
                                <span className="font-bold font-mono text-slate-900">{studentProfile.rollNumber}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500 font-medium">Program / Course:</span>
                                <span className="font-bold text-slate-900">{studentProfile.enrolledCourse}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500 font-medium">Installment Detail:</span>
                                <span className="font-medium text-slate-900">2nd Installment (Mid-Term)</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500 font-medium">Date of Transaction:</span>
                                <span className="font-medium text-slate-900">10 Apr 2024</span>
                            </div>
                            <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm">
                                <span className="font-bold text-slate-900">Amount Received:</span>
                                <span className="font-bold text-emerald-700">₹10,000.00</span>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 text-center">
                            Authorized Seal: Aayush Institute Accounts Cell • Uttam Nagar East
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="flex-1 py-2 px-3 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                            >
                                <Printer className="w-3.5 h-3.5" />
                                <span>Print Receipt</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowReceiptModal(false)}
                                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT PROFILE MODAL ── */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4 animate-in zoom-in-95">
                        <div className="border-b pb-3">
                            <h4 className="text-base font-bold text-[#00285e]">Edit Student Profile Details</h4>
                            <p className="text-xs text-slate-500">Update your contact information and career targets</p>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0055ff]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                                <input
                                    type="tel"
                                    required
                                    value={editFormData.phone}
                                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0055ff]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / Location</label>
                                    <input
                                        type="text"
                                        value={editFormData.city}
                                        onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0055ff]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                                    <input
                                        type="text"
                                        value={editFormData.bloodGroup}
                                        onChange={(e) => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0055ff]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Career Goal / Target Role</label>
                                <input
                                    type="text"
                                    placeholder="e.g. MERN Stack Developer, Data Analyst"
                                    value={editFormData.careerGoal}
                                    onChange={(e) => setEditFormData({ ...editFormData, careerGoal: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0055ff]"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-3">
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs cursor-pointer shadow-sm"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── ADD NEW COURSE INTEREST MODAL ── */}
            {showAddCourseModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                    <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
                        <div className="border-b pb-3">
                            <h4 className="text-base font-bold text-[#00285e]">Express Interest in Available Programs</h4>
                            <p className="text-xs text-slate-500">Select any course from the institute catalog to add to your interest list</p>
                        </div>

                        <div className="space-y-2.5">
                            {dynamicCatalog.map((c, idx) => (
                                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex items-center justify-between gap-3">
                                    <div>
                                        <span className="text-[10px] font-semibold text-blue-700 uppercase bg-blue-100 px-1.5 py-0.5 rounded">
                                            {c.category}
                                        </span>
                                        <h5 className="text-xs font-bold text-slate-900 mt-1">{c.name}</h5>
                                        <p className="text-[11px] text-slate-500 font-medium">Duration: {c.duration} • Fee: ₹{c.fee.toLocaleString('en-IN')}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleAddCourseInterest(c)}
                                        className="px-3 py-1.5 rounded-xl bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs shadow-2xs whitespace-nowrap cursor-pointer"
                                    >
                                        + Add Interest
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 text-right">
                            <button
                                type="button"
                                onClick={() => setShowAddCourseModal(false)}
                                className="py-2 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StudentProfile;
