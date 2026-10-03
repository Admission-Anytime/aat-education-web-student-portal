import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import aayush_logo from '../../assets/img/aayush_logo_final.png';
import { authApi } from '../../services/api';
import {
    ChevronDown,
    ChevronRight,
    Menu,
    Phone,
    X,
    Mail,
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
    ArrowRight,
    LogIn,
    LogOut,
    User,
    GraduationCap,
    Award,
    Briefcase,
    Code,
    Cpu,
    Palette,
    Megaphone,
    Calculator,
    Settings,
    Languages,
    Sparkles
} from 'lucide-react';

export const courseNavCategories = [
    {
        id: 'software',
        label: 'Software & Web Development',
        icon: Code,
        state: { category: 'software' },
        description: 'Full Stack, Web Development & Mobile Apps',
        subgroups: [
            {
                title: 'Full Stack & Web Engineering',
                items: [
                    { label: 'Software & Full Stack Development', to: '/it-stack-development', highlight: 'Programming • Web Development • Full Stack' },
                    { label: 'Web Designing & Development', to: '/web-development', highlight: 'HTML • CSS • JavaScript • Responsive • React' },
                    { label: 'Mobile App Development', to: '/app-development', highlight: 'Android • Kotlin • Flutter • React Native' },
                    { label: 'Python Programming & Backend', to: '/python-programming', highlight: 'Python • OOP • Django • FastAPI • APIs' },
                ]
            }
        ]
    },
    {
        id: 'ai-data',
        label: 'AI, Data & Cloud',
        icon: Cpu,
        state: { category: 'ai-data' },
        description: 'Generative AI, Data Analytics, Cloud & Security',
        subgroups: [
            {
                title: 'AI & Data Technologies',
                items: [
                    { label: 'Artificial Intelligence & Generative AI', to: '/Courses', state: { category: 'ai-data' }, highlight: 'AI • Generative AI • AI Tools • Automation' },
                    { label: 'Data Science, Data Analytics & BI', to: '/Courses', state: { category: 'ai-data' }, highlight: 'Python • SQL • Power BI • Machine Learning' },
                    { label: 'Cyber Security & Networking', to: '/Courses', state: { category: 'ai-data' }, highlight: 'Cyber Security • Ethical Hacking • Security' },
                    { label: 'Cloud Computing & DevOps', to: '/Courses', state: { category: 'ai-data' }, highlight: 'AWS • Azure • Linux • Docker • DevOps' },
                ]
            }
        ]
    },
    {
        id: 'design',
        label: 'Design, UI/UX & Media',
        icon: Palette,
        state: { category: 'design' },
        description: 'UI/UX Research, Graphic Design & Motion Video',
        subgroups: [
            {
                title: 'Design & Visual Media',
                items: [
                    { label: 'UI/UX & Product Design', to: '/ui-ux-design', highlight: 'Figma • UX Research • Prototyping' },
                    { label: 'Graphic Design & Branding', to: '/Courses', state: { category: 'design' }, highlight: 'Photoshop • Illustrator • CorelDRAW' },
                    { label: 'Video Editing & Motion Graphics', to: '/Courses', state: { category: 'design' }, highlight: 'Premiere Pro • After Effects • Motion Reels' },
                ]
            }
        ]
    },
    {
        id: 'marketing',
        label: 'Digital Marketing & E-Commerce',
        icon: Megaphone,
        state: { category: 'marketing' },
        description: 'Performance Marketing, SEO, Social Ads & E-Com',
        subgroups: [
            {
                title: 'Digital Growth & E-Commerce',
                items: [
                    { label: 'Digital Marketing & Performance Marketing', to: '/digital-marketing', highlight: 'SEO • Google Ads • Meta Ads • Social Media' },
                    { label: 'E-Commerce & Digital Business', to: '/Courses', state: { category: 'marketing' }, highlight: 'Shopify • WooCommerce • Marketplaces' },
                ]
            }
        ]
    },
    {
        id: 'business',
        label: 'Accounting & Business Skills',
        icon: Calculator,
        state: { category: 'business' },
        description: 'TallyPrime, GST Taxation, Excel & Workplace Skills',
        subgroups: [
            {
                title: 'Accounting & Workplace Skills',
                items: [
                    { label: 'Accounting, GST & Business Finance', to: '/tally-accounting', highlight: 'Tally Prime • GST • Accounting • Billing • Payroll' },
                    { label: 'Advanced Office & Business Skills', to: '/Courses', state: { category: 'business' }, highlight: 'MS Office • Advanced Excel • AI Productivity' },
                ]
            }
        ]
    },
    {
        id: 'technical',
        label: 'Technical CAD & IT Support',
        icon: Settings,
        state: { category: 'technical' },
        description: 'AutoCAD 2D/3D, Hardware & System Administration',
        subgroups: [
            {
                title: 'Technical & Systems',
                items: [
                    { label: 'AutoCAD & Technical Design', to: '/Courses', state: { category: 'technical' }, highlight: 'AutoCAD • CAD • Engineering Drawing' },
                    { label: 'Hardware, IT Support & System Administration', to: '/Courses', state: { category: 'technical' }, highlight: 'Hardware • IT Support • Linux • Troubleshooting' },
                ]
            }
        ]
    },
    {
        id: 'languages',
        label: 'Foreign Languages & Test Prep',
        icon: Languages,
        state: { category: 'languages' },
        description: 'IELTS, PTE & Global Languages (German, French, Japanese)',
        subgroups: [
            {
                title: 'English Proficiency Tests',
                items: [
                    { label: 'IELTS – English Proficiency Test Preparation', to: '/Courses', state: { category: 'languages' }, highlight: 'IELTS Academic • General • L, R, W, S' },
                    { label: 'PTE – Pearson Test of English', to: '/Courses', state: { category: 'languages' }, highlight: 'PTE Academic • Speaking • Reading • Writing' },
                ]
            },
            {
                title: 'Foreign Languages',
                items: [
                    { label: 'German Language', to: '/Courses', state: { category: 'languages' }, highlight: 'A1 • A2 • B1 • B2 Levels' },
                    { label: 'French Language', to: '/Courses', state: { category: 'languages' }, highlight: 'A1 • A2 • B1 • B2 Levels' },
                    { label: 'Japanese Language', to: '/Courses', state: { category: 'languages' }, highlight: 'N5 • N4 • N3 • N2 Levels' },
                ]
            }
        ]
    },
    {
        id: 'shortterm',
        label: 'Short-Term & Professional Skills',
        icon: Sparkles,
        state: { category: 'shortterm' },
        description: 'Quick Practical Skills & Career Upskilling',
        subgroups: [
            {
                title: 'Professional Upskilling',
                items: [
                    { label: 'Short-Term & Professional Skills', to: '/Courses', state: { category: 'shortterm' }, highlight: 'Quick Skills • Career Skills • Professional Upskilling' },
                ]
            }
        ]
    }
];

const navItems = [
    {
        label: 'Courses',
        to: '/Courses',
        dropdown: [
            { label: 'Software & Web Development', to: '/Courses', state: { category: 'software' } },
            { label: 'AI, Data & Cloud', to: '/Courses', state: { category: 'ai-data' } },
            { label: 'Design, UI/UX & Media', to: '/Courses', state: { category: 'design' } },
            { label: 'Digital Marketing & E-Commerce', to: '/Courses', state: { category: 'marketing' } },
            { label: 'Accounting & Business Skills', to: '/Courses', state: { category: 'business' } },
            { label: 'Technical CAD & IT Support', to: '/Courses', state: { category: 'technical' } },
            { label: 'Foreign Languages & Test Prep', to: '/Courses', state: { category: 'languages' } },
            { label: 'Short-Term & Professional Skills', to: '/Courses', state: { category: 'shortterm' } },
        ]
    },
    {
        label: 'Corporate Course',
        to: '/CorporateTraining',
        dropdown: [
            { label: 'AI & Generative AI', to: '/CorporateTraining', state: { category: 'ai' } },
            { label: 'Advanced Excel & Data Analytics', to: '/CorporateTraining', state: { category: 'excel' } },
            { label: 'IT & Software Training', to: '/CorporateTraining', state: { category: 'software' } },
            { label: 'Digital Business Skills', to: '/CorporateTraining', state: { category: 'digital' } },
            { label: 'Professional & Productivity Skills', to: '/CorporateTraining', state: { category: 'productivity' } },
        ]
    },
    {
        label: 'University Course',
        to: '/UniversityCourses',
        dropdown: [
            { label: 'Distance Learning Degrees', to: '/UniversityCourses' },
            { label: 'Online Degree & PG Programs', to: '/UniversityCourses' },
            { label: 'Working Professional Courses', to: '/UniversityCourses' },
            { label: 'Vocational & Professional Education', to: '/UniversityCourses' },
        ]
    },
    {
        label: 'Live Project',
        to: '/LiveProject',
        dropdown: [
            { label: 'Web & Software Development', to: '/LiveProject', state: { category: 'web' } },
            { label: 'Mobile App Development', to: '/LiveProject', state: { category: 'mobile' } },
            { label: 'AI, Data & Analytics', to: '/LiveProject', state: { category: 'ai' } },
            { label: 'Cloud, DevOps & Cyber Security', to: '/LiveProject', state: { category: 'cloud' } },
            { label: 'UI/UX & Digital Design', to: '/LiveProject', state: { category: 'design' } },
        ]
    },
    {
        label: 'Placement',
        to: '/Placement',
        dropdown: [
            { label: 'IT & Software', to: '/Placement', state: { category: 'it' } },
            { label: 'Data, AI & Technology', to: '/Placement', state: { category: 'data' } },
            { label: 'Digital & Business', to: '/Placement', state: { category: 'digital' } },
            { label: 'Design & Creative', to: '/Placement', state: { category: 'design' } },
            { label: 'Technical & IT Support', to: '/Placement', state: { category: 'support' } },
        ]
    },
];

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [hoveredCourseCat, setHoveredCourseCat] = useState('software');
    const [openMobileCourseCat, setOpenMobileCourseCat] = useState(null);
    const location = useLocation();

    // Helper to sanitize auto-generated mock names & mock enrollments
    const sanitizeUser = (rawUser) => {
        if (!rawUser) return null;
        const isRealUser = rawUser.email && rawUser.email.toLowerCase() !== 'student@aayush.com';
        if (isRealUser) {
            let modified = false;
            let fixed = { ...rawUser };

            if (!fixed.name || fixed.name === 'Aayush Student' || fixed.name === 'Aayush') {
                const prefix = fixed.email.split('@')[0];
                const clean = prefix.replace(/[0-9]/g, '').replace(/[._-]/g, ' ').trim();
                fixed.name = clean ? clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : 'New Student';
                modified = true;
            }

            if (fixed.studentId === 'AAY-2024-1082') {
                fixed.studentId = 'Pending Allocation';
                modified = true;
            }

            if (fixed.enrolledCourse === 'Software & Full Stack Development' && !fixed.isEnrolledExplicitly) {
                fixed.enrolledCourse = '';
                fixed.isEnrolled = false;
                modified = true;
            }

            if (fixed.isProfileComplete === undefined || (!fixed.phone && !fixed.city)) {
                fixed.isProfileComplete = false;
                fixed.isEnrolled = false;
                modified = true;
            }

            if (modified) {
                localStorage.setItem('aayush_user', JSON.stringify(fixed));
                return fixed;
            }
        }
        return rawUser;
    };

    // Logged in user detection
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('aayush_user') || 'null');
            return sanitizeUser(stored);
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = JSON.parse(localStorage.getItem('aayush_user') || 'null');
                setCurrentUser(sanitizeUser(stored));
            } catch {
                setCurrentUser(null);
            }
        };

        window.addEventListener('authChange', syncUser);
        window.addEventListener('storage', syncUser);
        return () => {
            window.removeEventListener('authChange', syncUser);
            window.removeEventListener('storage', syncUser);
        };
    }, []);

    const handleLogout = () => {
        authApi.logout();
        setCurrentUser(null);
        setUserDropdownOpen(false);
        setLoginDropdownOpen(false);
        window.dispatchEvent(new Event('authChange'));
    };

    // Prevent background scrolling when mobile/tablet drawer is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Close mobile menu and dropdowns when navigating to a new route
    useEffect(() => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        setOpenMobileCourseCat(null);
    }, [location.pathname]);

    const currentHoveredCatData = courseNavCategories.find(c => c.id === hoveredCourseCat) || courseNavCategories[0];

    const isRouteActive = (to) => {
        const path = location.pathname.toLowerCase().replace(/^\//, '');
        const target = (to || '').toLowerCase().replace(/^\//, '');

        if (target === 'courses') {
            return path === 'courses' || path.startsWith('courses/');
        }
        if (target === 'corporatetraining') {
            return path === 'corporatetraining' || path.includes('corporate');
        }
        if (target === 'universitycourses') {
            return path === 'universitycourses' || path.includes('university');
        }
        if (target === 'liveproject') {
            return path === 'liveproject' || path.includes('liveproject') || path.includes('live-project');
        }
        if (target === 'placement') {
            return path === 'placement' || path.startsWith('placement/');
        }
        if (target === 'news' || target === 'news&updates' || target === 'news-updates') {
            return path.includes('news');
        }
        if (target === 'staff' || target === 'faculty') {
            return path.includes('staff') || path.includes('faculty');
        }
        if (target === 'contact' || target === 'contactus') {
            return path === 'contact' || path === 'contactus' || path.startsWith('contact');
        }
        return path === target;
    };

    return (
        <header className="sticky top-0 z-50 w-full max-w-full shadow-xs bg-white overflow-x-clip">
            {/* ── 1. Top Bar: Continuous Auto-Sliding Marquee (All Text & Announcements) ── */}
            <div className="bg-[#00488f] text-white relative overflow-hidden select-none border-b border-blue-900/30">
                <div className="max-w-[1440px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 h-7 sm:h-8">
                    
                    {/* Continuous Auto-Sliding Ticker (Full Width / Left to Right Continuous) */}
                    <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-0">
                        <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
                            {[0, 1].map((copyIdx) => (
                                <React.Fragment key={copyIdx}>
                                    {/* 1. Tagline */}
                                    <div className="flex items-center gap-1.5 text-white/90 font-medium tracking-wide text-[11px] sm:text-xs">
                                        <span>Learn</span>
                                        <span className="text-amber-400 font-bold text-[9px]">•</span>
                                        <span>Build</span>
                                        <span className="text-amber-400 font-bold text-[9px]">•</span>
                                        <span>Grow</span>
                                    </div>

                                    <span className="text-white/30 text-xs">•</span>

                                    {/* 2. Since 2002 Badge */}
                                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-400/15 to-amber-500/20 border border-amber-300/40 shadow-xs backdrop-blur-xs">
                                        <Sparkles className="w-2.5 h-2.5 text-amber-300 flex-shrink-0 animate-pulse" />
                                        <span className="text-amber-300 font-bold italic text-[11px] sm:text-xs tracking-wide font-serif">
                                            Since 2002
                                        </span>
                                        <span className="text-amber-100/90 font-medium text-[10px] sm:text-[11px] tracking-wide">
                                            • 22+ Years of Excellence
                                        </span>
                                    </div>

                                    <span className="text-white/30 text-xs">•</span>

                                    {/* 3. Admissions Open */}
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 border border-emerald-300/40 text-emerald-300 text-[10.5px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
                                        Admissions Open 2026-27 — New Batches Available
                                    </span>

                                    <span className="text-white/30 text-xs">•</span>

                                    {/* 4. Placement Support */}
                                    <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[10.5px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                                        <Briefcase className="w-3 h-3 text-amber-300 flex-shrink-0" />
                                        100% Placement Support • 500+ Corporate Hiring Partners
                                    </span>

                                    <span className="text-white/30 text-xs">•</span>

                                    {/* 5. Live Projects */}
                                    <span className="inline-flex items-center gap-1.5 text-sky-200 text-[11px] sm:text-xs font-medium">
                                        🚀 Live Industry Projects &amp; Practical Mentorship
                                    </span>

                                    <span className="text-white/30 text-xs">•</span>

                                    {/* 6. Phone Contact */}
                                    <a
                                        href="tel:+918800817447"
                                        className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-semibold text-[11px] sm:text-xs transition-colors"
                                    >
                                        <Phone className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                                        Call: +91-8800817447
                                    </a>

                                    <span className="text-white/30 text-xs">•</span>

                                    {/* 7. Email Contact */}
                                    <a
                                        href="mailto:info@aayushinstitute.com"
                                        className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-medium text-[11px] sm:text-xs transition-colors"
                                    >
                                        <Mail className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                                        info@aayushinstitute.com
                                    </a>

                                    <span className="text-white/30 text-xs">•</span>

                                    {/* 8. Free Career Counselling */}
                                    <span className="inline-flex items-center gap-1 text-sky-200 text-[11px] sm:text-xs font-medium">
                                        🎯 Free Career Counselling &amp; Guidance Daily
                                    </span>

                                    <span className="text-white/30 text-xs mr-2">•</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Right: Pinned Social Icons (Always accessible, high z-index with background gradient) */}
                    <div className="hidden sm:flex items-center gap-1.5 pl-3 bg-[#00488f] shadow-[-12px_0_16px_#00488f] relative z-20 flex-shrink-0 border-l border-white/15">
                        {/* Facebook */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                            title="Facebook"
                            className="w-5.5 h-5.5 rounded-md bg-[#1877f2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                        >
                            <Facebook className="w-3 h-3 fill-current" />
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            title="Instagram"
                            className="w-5.5 h-5.5 rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                        >
                            <Instagram className="w-3 h-3 stroke-[2.2]" />
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="YouTube"
                            title="YouTube"
                            className="w-5.5 h-5.5 rounded-md bg-[#ff0000] hover:bg-[#e60000] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                        >
                            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                            className="w-5.5 h-5.5 rounded-md bg-[#0a66c2] hover:bg-[#084e96] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                        >
                            <Linkedin className="w-3 h-3 fill-current" />
                        </a>
                    </div>

                </div>
            </div>

            {/* ── 2. Main Navigation Bar: Responsive Layout ── */}
            <div className="bg-white border-b border-gray-100 shadow-xs relative z-40">
                <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
                    
                    {/* Left: Brand Logo */}
                    <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                        {/* Logo Link */}
                        <NavLink to="/" className="flex items-center group">
                            <img
                                src={aayush_logo}
                                alt="AAYUSH Institute of Professional Studies"
                                className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain transition-opacity duration-150 group-hover:opacity-90"
                            />
                        </NavLink>
                    </div>

                    {/* Center: Desktop Navigation Links (>= 1280px / xl) */}
                    <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5">
                        {navItems.map((item) => {
                            const active = isRouteActive(item.to);
                            return (
                                <div key={item.label} className="relative group py-1">
                                    <NavLink
                                        to={item.to}
                                        className={`flex items-center gap-1 font-semibold text-[11px] xl:text-[11.5px] px-2 xl:px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                                            active
                                                ? 'text-[#0055ff] font-bold bg-blue-50/70 shadow-xs'
                                                : 'text-[#004b93] hover:text-[#003163] hover:bg-slate-50'
                                        }`}
                                    >
                                        <span className="relative inline-block pb-0.5">
                                            {item.label}
                                            {active && (
                                                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0055ff] rounded-full shadow-xs" />
                                            )}
                                        </span>
                                        <ChevronDown
                                            className={`w-3 h-3 transition-transform duration-200 group-hover:rotate-180 ${
                                                active ? 'text-[#0055ff]' : 'text-[#004b93]'
                                            }`}
                                        />
                                    </NavLink>

                                    {/* Desktop Dropdowns - compact vertical list matching Corporate Course */}
                                    <div className="hidden group-hover:block absolute top-full left-0 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[230px] py-1.5 transition-all duration-150 z-50">
                                        {item.dropdown.map((sub) => {
                                            const isSubActive = active && sub.state?.category && location.state?.category === sub.state?.category;
                                            return (
                                                <NavLink
                                                    key={sub.label}
                                                    to={sub.to}
                                                    state={sub.state}
                                                    className={`block px-4 py-2 text-xs font-medium transition-colors ${
                                                        isSubActive
                                                            ? 'bg-blue-50 text-[#0055ff] font-bold border-l-2 border-[#0055ff]'
                                                            : 'text-gray-700 hover:bg-blue-50 hover:text-[#004b93]'
                                                    }`}
                                                >
                                                    {sub.label}
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {/* News & Updates Link */}
                        <div className="relative py-1">
                            <NavLink
                                to="/News&Updates"
                                className={`flex items-center font-semibold text-[11px] xl:text-[11.5px] px-2 xl:px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                                    isRouteActive('news')
                                        ? 'text-[#0055ff] font-bold bg-blue-50/70 shadow-xs'
                                        : 'text-[#004b93] hover:text-[#003163] hover:bg-slate-50'
                                }`}
                            >
                                <span className="relative inline-block pb-0.5">
                                    News &amp; Updates
                                    {isRouteActive('news') && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0055ff] rounded-full shadow-xs" />
                                    )}
                                </span>
                            </NavLink>
                        </div>

                        {/* Faculty & Mentors Link */}
                        <div className="relative py-1">
                            <NavLink
                                to="/staff"
                                className={`flex items-center font-semibold text-[11px] xl:text-[11.5px] px-2 xl:px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                                    isRouteActive('staff')
                                        ? 'text-[#0055ff] font-bold bg-blue-50/70 shadow-xs'
                                        : 'text-[#004b93] hover:text-[#003163] hover:bg-slate-50'
                                }`}
                            >
                                <span className="relative inline-block pb-0.5">
                                    Faculty
                                    {isRouteActive('staff') && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0055ff] rounded-full shadow-xs" />
                                    )}
                                </span>
                            </NavLink>
                        </div>
                    </nav>

                    {/* Right Controls: Tablet Quick Actions, Login Button, and Hamburger */}
                    <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
                        {/* Tablet-Only "Explore Courses" Button (768px - 1279px / md to xl) */}
                        <NavLink
                            to="/Courses"
                            className="hidden md:flex xl:hidden items-center gap-1.5 bg-blue-50 text-[#0055ff] hover:bg-blue-100 border border-blue-200/70 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs"
                        >
                            <GraduationCap className="w-3.5 h-3.5 text-[#0055ff]" />
                            <span>Courses</span>
                        </NavLink>

                        {/* Login Button OR Logged-in User Profile Dropdown */}
                        {currentUser ? (
                            <div
                                className="hidden md:flex items-center relative"
                                onMouseEnter={() => setUserDropdownOpen(true)}
                                onMouseLeave={() => setUserDropdownOpen(false)}
                            >
                                <button
                                    type="button"
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer group"
                                >
                                    <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center text-white text-[10.5px] font-bold">
                                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span>Hi {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}, Welcome</span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* User Dropdown Menu */}
                                {userDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 min-w-[240px] p-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-3 py-2 border-b border-gray-100 mb-1.5">
                                            <p className="text-[12px] font-bold text-gray-800 leading-tight">
                                                Hi {currentUser.name}, Welcome! 👋
                                            </p>
                                            <p className="text-[10px] text-gray-400 truncate mt-0.5">{currentUser.email}</p>
                                            <div className={`mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                                                currentUser.role === 'staff' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                                currentUser.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                                currentUser.isProfileComplete === false || !currentUser.enrolledCourse ? 'bg-amber-50 text-amber-800 border border-amber-300' :
                                                'bg-blue-50 text-blue-700 border border-blue-200'
                                            }`}>
                                                <span>
                                                    {currentUser.role === 'staff' ? 'Staff / Faculty' :
                                                     currentUser.role === 'admin' ? 'Administrator' :
                                                     currentUser.role === 'alumni' ? 'Alumni' :
                                                     currentUser.isProfileComplete === false || !currentUser.enrolledCourse ? 'Profile Incomplete (Action Required)' :
                                                     'Enrolled Student'}
                                                </span>
                                            </div>
                                        </div>

                                        {currentUser.role === 'staff' || currentUser.role === 'admin' ? (
                                            <>
                                                <a
                                                    href={`${import.meta.env.VITE_ADMIN_PANEL_URL || "http://localhost:5173"}/panel`}
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#00285e] hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4 text-purple-600" />
                                                    <span>Admin Panel (Student-Portal)</span>
                                                </a>
                                                <NavLink
                                                    to="/Courses"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                >
                                                    <GraduationCap className="w-4 h-4 text-purple-600" />
                                                    <span>Explore &amp; Manage Courses</span>
                                                </NavLink>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink
                                                    to="/profile"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#00285e] hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <User className="w-4 h-4 text-blue-600" />
                                                    <span>Student Profile &amp; Dashboard</span>
                                                </NavLink>
                                                <NavLink
                                                    to="/Courses"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                                >
                                                    <GraduationCap className="w-4 h-4 text-slate-500" />
                                                    <span>Explore Courses</span>
                                                </NavLink>
                                            </>
                                        )}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full mt-1 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                                        >
                                            <LogOut className="w-4 h-4 text-rose-500" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                className="hidden md:flex items-center relative"
                                onMouseEnter={() => setLoginDropdownOpen(true)}
                                onMouseLeave={() => setLoginDropdownOpen(false)}
                            >
                                <button
                                    type="button"
                                    onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                                    className="bg-gradient-to-r from-[#0059b3] via-[#00488f] to-[#003875] hover:from-[#0066cc] hover:to-[#00448d] text-white px-3.5 sm:px-4 lg:px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer group"
                                >
                                    <LogIn className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                                    <span>Login</span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Login 3 Options Dropdown */}
                                {loginDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 min-w-[220px] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Choose an Option</p>
                                        </div>

                                        {/* 1. Student */}
                                        <NavLink
                                            to="/login?type=student"
                                            onClick={() => setLoginDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#00285e] hover:bg-blue-50 hover:text-[#0062ff] transition-colors group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0062ff] flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                                <GraduationCap className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="leading-tight text-[13px] font-semibold">Student</div>
                                                <span className="text-[10px] text-gray-500 font-normal">Student Portal Login</span>
                                            </div>
                                        </NavLink>

                                        {/* 2. Alumni */}
                                        <NavLink
                                            to="/login?type=alumni"
                                            onClick={() => setLoginDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#00285e] hover:bg-amber-50 hover:text-amber-700 transition-colors group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                                <Award className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="leading-tight text-[13px] font-semibold">Alumni</div>
                                                <span className="text-[10px] text-gray-500 font-normal">Alumni Portal Login</span>
                                            </div>
                                        </NavLink>

                                        {/* 3. Staff */}
                                        <NavLink
                                            to="/login?type=staff"
                                            onClick={() => setLoginDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#00285e] hover:bg-purple-50 hover:text-purple-700 transition-colors group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                                <Briefcase className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="leading-tight text-[13px] font-semibold">Staff</div>
                                                <span className="text-[10px] text-gray-500 font-normal">Faculty &amp; Staff Portal</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile-Only Login Pill (< 768px) */}
                        {currentUser ? (
                            <div className="md:hidden flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-xs">
                                <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[9px] font-bold">
                                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                                <span className="max-w-[70px] truncate">Hi, {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}</span>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="md:hidden bg-gradient-to-r from-[#0059b3] to-[#003875] text-white px-2.5 py-1.5 rounded-full text-[11px] font-semibold shadow-xs flex items-center gap-1 active:scale-95 transition-transform"
                            >
                                <LogIn className="w-3 h-3" />
                                <span>Login</span>
                            </NavLink>
                        )}

                        {/* Hamburger Button (Mobile & Tablet: < 1280px / xl:hidden) */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="xl:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 text-[#003882] hover:text-[#0055ff] transition-all focus:outline-none cursor-pointer active:scale-95"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* ── 3. Mobile & Tablet Slide-Over Drawer Navigation ── */}
                {mobileMenuOpen && (
                    <div className="xl:hidden fixed inset-0 z-50 flex justify-end">
                        {/* Backdrop Blur Overlay */}
                        <div
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Slide-in Drawer Container */}
                        <div className="relative w-[88vw] max-w-[380px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
                            
                            {/* Drawer Header */}
                            <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                                <div className="flex items-center gap-2.5">
                                    <img src={aayush_logo} alt="Aayush Institute" className="h-8 w-auto object-contain" />
                                    <div className="flex flex-col select-none">
                                        <span className="text-[#004b93] font-bold italic text-xs leading-none font-serif">
                                            Since 2002
                                        </span>
                                        <svg className="w-14 h-1 text-[#f5b800]" viewBox="0 0 100 12" fill="none">
                                            <path d="M3 8.5C28 2.5 72 2.5 97 7.5" stroke="#f5b800" strokeWidth="4" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                                    aria-label="Close menu"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Drawer Action Bar */}
                            <div className="px-3.5 py-2.5 bg-blue-50/80 border-b border-blue-100/60 flex items-center justify-between gap-2">
                                <NavLink
                                    to="/apply-now"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex-1 bg-[#0052cc] hover:bg-[#004099] text-white text-xs font-bold py-2 px-3 rounded-xl text-center shadow-xs transition-colors"
                                >
                                    Admission / Apply Now
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-white border border-blue-200 text-[#004b93] text-xs font-bold py-2 px-3 rounded-xl hover:bg-blue-50 transition-colors"
                                >
                                    Contact
                                </NavLink>
                            </div>

                            {/* Scrollable Navigation Items */}
                            <div className="flex-1 overflow-y-auto px-3.5 py-3 divide-y divide-slate-100 space-y-1">
                                {navItems.map((item) => {
                                    const active = isRouteActive(item.to);
                                    const isDropdownOpen = openDropdown === item.label;

                                    return (
                                        <div key={item.label} className="pt-1.5 pb-1">
                                            <div className="flex items-center justify-between w-full">
                                                <NavLink
                                                    to={item.to}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`text-[13.5px] py-2 px-2.5 rounded-xl font-semibold transition-colors flex-1 ${
                                                        active
                                                            ? 'text-[#0055ff] font-bold bg-blue-50/80 border-l-3 border-[#0055ff]'
                                                            : 'text-[#003366] hover:text-[#0055ff]'
                                                    }`}
                                                >
                                                    {item.label}
                                                </NavLink>
                                                <button
                                                    onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                                                    className="p-2 text-[#004b93] hover:text-[#0055ff] cursor-pointer"
                                                    aria-label={`Toggle ${item.label} Submenu`}
                                                >
                                                    <ChevronDown
                                                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#0055ff]' : ''}`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Accordion Submenu */}
                                            {isDropdownOpen && (
                                                <div className="pl-2 pr-1 py-1.5 flex flex-col gap-1 bg-slate-50/90 rounded-xl mt-1">
                                                    {item.dropdown.map((sub) => (
                                                        <NavLink
                                                            key={sub.label}
                                                            to={sub.to}
                                                            state={sub.state}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="text-xs text-slate-700 hover:text-[#004b93] py-1.5 px-2.5 rounded-lg hover:bg-white transition-colors"
                                                        >
                                                            {sub.label}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Direct Links: News & Updates, About Us, Contact Us */}
                                <div className="pt-1.5">
                                    <NavLink
                                        to="/News&Updates"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between w-full text-[13.5px] font-semibold py-2 px-2.5 rounded-xl transition-colors ${
                                            isRouteActive('news')
                                                ? 'text-[#0055ff] font-bold bg-blue-50/80 border-l-3 border-[#0055ff]'
                                                : 'text-[#003366] hover:text-[#0055ff]'
                                        }`}
                                    >
                                        <span>News &amp; Updates</span>
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </NavLink>
                                </div>

                                <div className="pt-1">
                                    <NavLink
                                        to="/Aboutus"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between w-full text-[13.5px] font-semibold py-2 px-2.5 rounded-xl transition-colors ${
                                            location.pathname.toLowerCase().includes('about')
                                                ? 'text-[#0055ff] font-bold bg-blue-50/80 border-l-3 border-[#0055ff]'
                                                : 'text-[#003366] hover:text-[#0055ff]'
                                        }`}
                                    >
                                        <span>About Us</span>
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </NavLink>
                                </div>

                                <div className="pt-1">
                                    <NavLink
                                        to="/staff"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between w-full text-[13.5px] font-semibold py-2 px-2.5 rounded-xl transition-colors ${
                                            location.pathname.toLowerCase().includes('staff') || location.pathname.toLowerCase().includes('faculty')
                                                ? 'text-[#0055ff] font-bold bg-blue-50/80 border-l-3 border-[#0055ff]'
                                                : 'text-[#003366] hover:text-[#0055ff]'
                                        }`}
                                    >
                                        <span>Our Faculty</span>
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </NavLink>
                                </div>

                                <div className="pt-1">
                                    <NavLink
                                        to="/contact"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between w-full text-[13.5px] font-semibold py-2 px-2.5 rounded-xl transition-colors ${
                                            location.pathname.toLowerCase().includes('contact')
                                                ? 'text-[#0055ff] font-bold bg-blue-50/80 border-l-3 border-[#0055ff]'
                                                : 'text-[#003366] hover:text-[#0055ff]'
                                        }`}
                                    >
                                        <span>Contact Us</span>
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </NavLink>
                                </div>
                            </div>

                            {/* Drawer Footer: Portal Login Cards OR Logged-in User Profile */}
                            {currentUser ? (
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/90 space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-[#00285e]">Hi {currentUser.name}, Welcome! 👋</p>
                                            <p className="text-[10.5px] text-slate-500 truncate">{currentUser.email}</p>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold uppercase">
                                            {currentUser.role || 'Student'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                        <NavLink
                                            to={currentUser.role === 'staff' || currentUser.role === 'admin' ? '/panel' : '/profile'}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex-1 py-1.5 px-3 bg-[#0059b3] text-white text-xs font-semibold rounded-xl text-center shadow-xs"
                                        >
                                            {currentUser.role === 'staff' || currentUser.role === 'admin' ? 'Admin Panel' : 'Student Profile'}
                                        </NavLink>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleLogout();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="py-1.5 px-3 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold rounded-xl text-center cursor-pointer hover:bg-rose-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/90 space-y-3">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Access Portals</p>
                                    <div className="grid grid-cols-3 gap-2">
                                    <NavLink
                                        to="login?type=student"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-blue-100 shadow-xs text-[#00285e] hover:bg-blue-50 text-center transition-colors"
                                    >
                                        <GraduationCap className="w-4 h-4 text-blue-600 mb-1" />
                                        <span className="text-[11px] font-bold">Student</span>
                                    </NavLink>
                                    <NavLink
                                        to="login?type=alumni"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-amber-100 shadow-xs text-[#00285e] hover:bg-amber-50 text-center transition-colors"
                                    >
                                        <Award className="w-4 h-4 text-amber-600 mb-1" />
                                        <span className="text-[11px] font-bold">Alumni</span>
                                    </NavLink>
                                    <NavLink
                                        to="login?type=staff"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-purple-100 shadow-xs text-[#00285e] hover:bg-purple-50 text-center transition-colors"
                                    >
                                        <Briefcase className="w-4 h-4 text-purple-600 mb-1" />
                                        <span className="text-[11px] font-bold">Staff</span>
                                    </NavLink>
                                </div>

                                {/* Direct Contact */}
                                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                                    <a href="tel:+918800817447" className="flex items-center gap-1.5 font-medium text-[#00488f] hover:underline">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>+91-8800817447</span>
                                    </a>
                                    <a href="mailto:info@aayushinstitute.com" className="flex items-center gap-1.5 font-medium text-[#00488f] hover:underline">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span>Email Us</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            </div>
        </header>
    );
};

export default Header;



