import React, { useState, useEffect, useMemo } from 'react';
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
    Twitter,
    MessageCircle,
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
    Sparkles,
    Globe,
    Smartphone,
    BarChart3,
    Shield,
    Zap,
    Video,
    ShoppingCart,
    Compass,
    BookOpen,
    AlertCircle,
    RefreshCw
} from 'lucide-react';

// Backwards-compatibility exports for external consumers
export const courseNavCategories = [];
export const coursesCardsColumns = [];
export const courseFlyoutData = [];
export const coursesMegaMenuColumns = [];

// Helper to generate SEO-friendly clean URL slug from course title
export const generateSlug = (text) => {
    if (!text) return '';
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Dynamic course icon resolution based on name, category, or keywords
export const getCourseIcon = (course) => {
    const name = (course?.name || course?.title || '').toLowerCase();
    const cat = (course?.categoryId || '').toLowerCase();

    if (name.includes('full stack') || name.includes('mern') || name.includes('software') || name.includes('python') || name.includes('java') || name.includes('bca')) return Code;
    if (name.includes('web') || name.includes('frontend') || name.includes('html')) return Globe;
    if (name.includes('mobile') || name.includes('app') || name.includes('android') || name.includes('flutter')) return Smartphone;
    if (name.includes('ai') || name.includes('artificial') || name.includes('generative') || name.includes('prompt')) return Cpu;
    if (name.includes('data') || name.includes('analytics') || name.includes('bi') || name.includes('sql') || name.includes('power bi')) return BarChart3;
    if (name.includes('cyber') || name.includes('security') || name.includes('ethical') || name.includes('defense')) return Shield;
    if (name.includes('cloud') || name.includes('devops') || name.includes('aws') || name.includes('azure') || name.includes('docker')) return Zap;
    if (name.includes('marketing') || name.includes('seo') || name.includes('ads') || name.includes('social')) return Megaphone;
    if (name.includes('commerce') || name.includes('shopify') || name.includes('amazon') || name.includes('store')) return ShoppingCart;
    if (name.includes('ui') || name.includes('ux') || name.includes('product design') || name.includes('figma')) return Palette;
    if (name.includes('graphic') || name.includes('design') || name.includes('photoshop') || name.includes('illustrator')) return Palette;
    if (name.includes('video') || name.includes('animation') || name.includes('motion') || name.includes('premiere')) return Video;
    if (name.includes('tally') || name.includes('gst') || name.includes('accounting') || name.includes('finance') || name.includes('tax')) return Calculator;
    if (name.includes('excel') || name.includes('office') || name.includes('business')) return Briefcase;
    if (name.includes('cad') || name.includes('autocad') || name.includes('drafting')) return Compass;
    if (name.includes('hardware') || name.includes('networking') || name.includes('support') || name.includes('troubleshooting')) return Settings;
    if (name.includes('ielts')) return Award;
    if (name.includes('pte') || name.includes('german') || name.includes('french') || name.includes('japanese') || name.includes('language')) return Languages;
    if (name.includes('bootcamp') || name.includes('short')) return Sparkles;

    if (cat === 'software') return Code;
    if (cat === 'ai-data') return Cpu;
    if (cat === 'design') return Palette;
    if (cat === 'marketing') return Megaphone;
    if (cat === 'business') return Calculator;
    if (cat === 'technical') return Settings;
    if (cat === 'languages') return Languages;
    if (cat === 'shortterm') return Sparkles;

    return GraduationCap;
};

// URL resolver generating clean slugs (e.g. /course/web-designing, /course/mern-stack)
export const getCourseUrl = (course) => {
    if (course?.path && typeof course.path === 'string' && course.path.startsWith('/')) {
        return course.path;
    }
    const rawName = (course?.name || course?.title || '').trim();
    const slug = course?.slug || generateSlug(rawName);

    if (slug.includes('full-stack') || slug.includes('mern') || slug.includes('software-full-stack')) {
        return '/it-stack-development';
    }
    if (slug === 'web-designing' || slug === 'web-development' || slug.includes('web-design')) {
        return '/web-development';
    }
    if (slug.includes('mobile-app') || slug.includes('app-development') || slug.includes('android')) {
        return '/app-development';
    }
    if (slug.includes('python-full-stack') || slug.includes('python-programming') || slug.includes('django')) {
        return '/python-programming';
    }
    if (slug.includes('ui-ux') || slug.includes('product-design')) {
        return '/ui-ux-design';
    }
    if (slug.includes('digital-marketing')) {
        return '/digital-marketing';
    }
    if (slug.includes('tally') || slug.includes('accounting-gst') || slug.includes('corporate-accounting')) {
        return '/tally-accounting';
    }

    return '/course/' + slug;
};

export const CATEGORY_COLUMN_CONFIG = {
    'software': { id: 'software', title: 'Software & Web Dev', icon: Code, iconColor: 'text-blue-600', iconBg: 'bg-blue-100/70', colIndex: 0 },
    'shortterm': { id: 'shortterm', title: 'Professional Skills', icon: Sparkles, iconColor: 'text-teal-600', iconBg: 'bg-teal-100/70', colIndex: 0 },
    'ai-data': { id: 'ai-data', title: 'AI, Data & Cloud', icon: Cpu, iconColor: 'text-purple-600', iconBg: 'bg-purple-100/70', colIndex: 1 },
    'marketing': { id: 'marketing', title: 'Marketing & E-Com', icon: Megaphone, iconColor: 'text-amber-600', iconBg: 'bg-amber-100/70', colIndex: 1 },
    'design': { id: 'design', title: 'Design & Media', icon: Palette, iconColor: 'text-rose-600', iconBg: 'bg-rose-100/70', colIndex: 2 },
    'business': { id: 'business', title: 'Accounting & Finance', icon: Calculator, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-100/70', colIndex: 2 },
    'technical': { id: 'technical', title: 'Technical & CAD', icon: Settings, iconColor: 'text-cyan-600', iconBg: 'bg-cyan-100/70', colIndex: 3 },
    'languages': { id: 'languages', title: 'Languages & Test Prep', icon: Languages, iconColor: 'text-indigo-600', iconBg: 'bg-indigo-100/70', colIndex: 3 }
};

const defaultSiteSettings = {
    socialLinks: {
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        twitter: '',
        whatsapp: ''
    },
    topBar: null
};

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [hoveredCourseCat, setHoveredCourseCat] = useState('software');
    const [openMobileCourseCat, setOpenMobileCourseCat] = useState(null);
    const location = useLocation();

    // Dynamic Site Settings (Social Handles + Top Bar)
    // Live MongoDB Courses & Categories State
    const [allDbCourses, setAllDbCourses] = useState([]);
    const [dbCategoriesList, setDbCategoriesList] = useState([]);
    const [isCoursesLoading, setIsCoursesLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchCoursesAndCategories = async () => {
            try {
                const [coursesRes, catsRes] = await Promise.all([
                    fetch('/api/courses'),
                    fetch('/api/categories').catch(() => null)
                ]);

                if (coursesRes.ok) {
                    const cData = await coursesRes.json();
                    const list = Array.isArray(cData) ? cData : (cData?.data || []);
                    if (isMounted) {
                        setAllDbCourses(list);
                        setIsCoursesLoading(false);
                    }
                }
                if (catsRes && catsRes.ok) {
                    const catData = await catsRes.json();
                    const catList = Array.isArray(catData) ? catData : (catData?.data || []);
                    if (isMounted && catList.length > 0) {
                        setDbCategoriesList(catList);
                    }
                }
            } catch (err) {
                if (isMounted) setIsCoursesLoading(false);
            }
        };

        fetchCoursesAndCategories();
        // 3-second auto-poll: any edit/delete/hide action in Admin Panel reflects instantly
        const pollInterval = setInterval(fetchCoursesAndCategories, 3000);

        const handleSync = () => fetchCoursesAndCategories();
        window.addEventListener('coursesUpdated', handleSync);
        window.addEventListener('storage', handleSync);

        return () => {
            isMounted = false;
            clearInterval(pollInterval);
            window.removeEventListener('coursesUpdated', handleSync);
            window.removeEventListener('storage', handleSync);
        };
    }, []);

    // Filter strictly published standard courses for Mega Menu
    const activeStandardCourses = useMemo(() => {
        return allDbCourses.filter(c =>
            c.visible !== false &&
            c.status !== 'Draft' &&
            c.status !== 'Archived' &&
            (!c.programType || c.programType === 'course')
        );
    }, [allDbCourses]);

    const totalCertifiedCourses = activeStandardCourses.length;

    // Dynamically assemble the 4-column MegaMenu layout from live MongoDB courses
    const megaMenuColumns = useMemo(() => {
        const cols = [
            { colId: 'col-1', sections: [] },
            { colId: 'col-2', sections: [] },
            { colId: 'col-3', sections: [] },
            { colId: 'col-4', sections: [] },
        ];

        // Group courses by categoryId
        const grouped = {};
        activeStandardCourses.forEach(c => {
            const catId = (c.categoryId || 'software').toLowerCase();
            if (!grouped[catId]) grouped[catId] = [];
            grouped[catId].push({
                id: c._id || c.id,
                name: c.name || c.title,
                sub: c.subgroup || c.oneLiner || c.duration || 'Certified Professional',
                to: getCourseUrl(c),
                icon: getCourseIcon(c),
                badge: c.badge || (c.popular && activeStandardCourses.filter(x => x.popular).length <= 4 ? 'Popular' : null),
                state: { category: catId, courseId: c._id || c.id }
            });
        });

        // Add sections according to column config
        Object.keys(CATEGORY_COLUMN_CONFIG).forEach(catId => {
            const cfg = CATEGORY_COLUMN_CONFIG[catId];
            const courses = grouped[catId] || [];
            if (courses.length > 0) {
                cols[cfg.colIndex].sections.push({
                    id: catId,
                    title: cfg.title,
                    icon: cfg.icon,
                    iconColor: cfg.iconColor,
                    iconBg: cfg.iconBg,
                    courses
                });
            }
        });

        // Custom categories support
        Object.keys(grouped).forEach(catId => {
            if (!CATEGORY_COLUMN_CONFIG[catId]) {
                const courses = grouped[catId];
                if (courses.length > 0) {
                    let minCol = cols[0];
                    cols.forEach(c => { if (c.sections.length < minCol.sections.length) minCol = c; });
                    minCol.sections.push({
                        id: catId,
                        title: catId.replace(/-/g, ' ').toUpperCase(),
                        icon: BookOpen,
                        iconColor: 'text-blue-600',
                        iconBg: 'bg-blue-100/70',
                        courses
                    });
                }
            }
        });

        return cols;
    }, [activeStandardCourses]);

    // Dynamic Navigation Items with live DB courses for all programs
    const dynamicNavItems = useMemo(() => {
        const corpCourses = allDbCourses.filter(c => c.programType === 'corporate' && c.visible !== false && c.status !== 'Draft');
        const corpDropdown = corpCourses.length > 0
            ? corpCourses.map(c => ({
                label: c.name || c.title,
                to: '/CorporateTraining',
                state: { category: c.categoryId || 'corporate', courseId: c._id || c.id }
            }))
            : [
                { label: 'AI & Generative AI', to: '/CorporateTraining', state: { category: 'ai' } },
                { label: 'Advanced Excel & Data Analytics', to: '/CorporateTraining', state: { category: 'excel' } },
                { label: 'IT & Software Training', to: '/CorporateTraining', state: { category: 'software' } },
                { label: 'Digital Business Skills', to: '/CorporateTraining', state: { category: 'digital' } },
                { label: 'Professional & Productivity Skills', to: '/CorporateTraining', state: { category: 'productivity' } },
            ];

        const univCourses = allDbCourses.filter(c => c.programType === 'university' && c.visible !== false && c.status !== 'Draft');
        const univDropdown = univCourses.length > 0
            ? univCourses.map(c => ({
                label: c.name || c.title,
                to: '/UniversityCourses',
                state: { category: c.categoryId || 'university', courseId: c._id || c.id }
            }))
            : [
                { label: 'Distance Learning Degrees', to: '/UniversityCourses' },
                { label: 'Online Degree & PG Programs', to: '/UniversityCourses' },
                { label: 'Working Professional Courses', to: '/UniversityCourses' },
                { label: 'Vocational & Professional Education', to: '/UniversityCourses' },
            ];

        const liveCourses = allDbCourses.filter(c => c.programType === 'liveproject' && c.visible !== false && c.status !== 'Draft');
        const liveDropdown = liveCourses.length > 0
            ? liveCourses.map(c => ({
                label: c.name || c.title,
                to: '/LiveProject',
                state: { category: c.categoryId || 'liveproject', courseId: c._id || c.id }
            }))
            : [
                { label: 'Web & Software Development', to: '/LiveProject', state: { category: 'web' } },
                { label: 'Mobile App Development', to: '/LiveProject', state: { category: 'mobile' } },
                { label: 'AI, Data & Analytics', to: '/LiveProject', state: { category: 'ai' } },
                { label: 'Cloud, DevOps & Cyber Security', to: '/LiveProject', state: { category: 'cloud' } },
                { label: 'UI/UX & Digital Design', to: '/LiveProject', state: { category: 'design' } },
            ];

        const coursesDropdown = dbCategoriesList.length > 0
            ? dbCategoriesList.map(cat => ({
                label: cat.label || cat.name,
                to: '/Courses',
                state: { category: cat.categoryId || cat.id }
            }))
            : [
                { label: 'Software & Web Development', to: '/Courses', state: { category: 'software' } },
                { label: 'AI, Data & Cloud', to: '/Courses', state: { category: 'ai-data' } },
                { label: 'Design, UI/UX & Media', to: '/Courses', state: { category: 'design' } },
                { label: 'Digital Marketing & E-Commerce', to: '/Courses', state: { category: 'marketing' } },
                { label: 'Accounting & Business Skills', to: '/Courses', state: { category: 'business' } },
                { label: 'Technical CAD & IT Support', to: '/Courses', state: { category: 'technical' } },
                { label: 'Foreign Languages & Test Prep', to: '/Courses', state: { category: 'languages' } },
                { label: 'Short-Term & Professional Skills', to: '/Courses', state: { category: 'shortterm' } },
            ];

        return [
            { label: 'Courses', to: '/Courses', dropdown: coursesDropdown },
            { label: 'Corporate Course', to: '/CorporateTraining', dropdown: corpDropdown },
            { label: 'University Course', to: '/UniversityCourses', dropdown: univDropdown },
            { label: 'Live Project', to: '/LiveProject', dropdown: liveDropdown },
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
    }, [allDbCourses, dbCategoriesList]);

    const [siteSettings, setSiteSettings] = useState(null);
    const [isBackendDown, setIsBackendDown] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/site-settings');
                if (res.ok) {
                    const data = await res.json();
                    const settingsObj = data?.data || data;
                    if (isMounted) {
                        setSiteSettings(settingsObj);
                        setIsBackendDown(false);
                    }
                } else {
                    if (isMounted) {
                        setSiteSettings(null);
                        setIsBackendDown(true);
                    }
                }
            } catch {
                if (isMounted) {
                    setSiteSettings(null);
                    setIsBackendDown(true);
                }
            }
        };

        fetchSettings();

        // Automatic reload polling when backend starts
        const autoPoll = setInterval(fetchSettings, 3000);

        const handleSync = () => fetchSettings();
        window.addEventListener('siteSettingsUpdated', handleSync);
        window.addEventListener('storage', handleSync);
        return () => {
            isMounted = false;
            clearInterval(autoPoll);
            window.removeEventListener('siteSettingsUpdated', handleSync);
            window.removeEventListener('storage', handleSync);
        };
    }, []);

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
        if (target === 'contact' || target === 'contactus') {
            return path === 'contact' || path === 'contactus' || path.startsWith('contact');
        }
        return path === target;
    };

    return (
        <header className="sticky top-0 z-50 w-full max-w-full shadow-xs bg-white overflow-x-clip">
            {/* ── 1. Top Bar: Continuous Auto-Sliding Marquee (Dynamic from DB with Auto-Reconnect) ── */}
            {siteSettings?.topBar && siteSettings.topBar.enabled !== false ? (
                <div className="bg-[#00488f] text-white relative overflow-hidden select-none border-b border-blue-900/30">
                    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 h-7 sm:h-8">
                        
                        {/* Continuous Auto-Sliding Ticker (Full Width / Left to Right Continuous) */}
                        <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-0">
                            <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
                                {[0, 1].map((copyIdx) => (
                                    <React.Fragment key={copyIdx}>
                                        {/* 1. Tagline */}
                                        {siteSettings.topBar?.tagline && (
                                            <>
                                                <div className="flex items-center gap-1.5 text-white/90 font-medium tracking-wide text-[11px] sm:text-xs">
                                                    {siteSettings.topBar.tagline.split('•').map((item, i, arr) => (
                                                        <React.Fragment key={i}>
                                                            <span>{item.trim()}</span>
                                                            {i < arr.length - 1 && <span className="text-amber-400 font-bold text-[9px]">•</span>}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                                <span className="text-white/30 text-xs">•</span>
                                            </>
                                        )}

                                        {/* 2. Since Badge */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-400/15 to-amber-500/20 border border-amber-300/40 shadow-xs backdrop-blur-xs">
                                            <Sparkles className="w-2.5 h-2.5 text-amber-300 flex-shrink-0 animate-pulse" />
                                            <span className="text-amber-300 font-bold italic text-[11px] sm:text-xs tracking-wide font-serif">
                                                Since {siteSettings.topBar?.sinceYear || '2002'}
                                            </span>
                                            <span className="text-amber-100/90 font-medium text-[10px] sm:text-[11px] tracking-wide">
                                                • {(siteSettings.topBar?.sinceText || '22+ Years of Excellence').replace(/^Since\s*\d+\s*[•·-]?\s*/i, '')}
                                            </span>
                                        </div>

                                        <span className="text-white/30 text-xs">•</span>

                                        {/* 3. Admissions Open */}
                                        {siteSettings.topBar?.admissionsText && (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 border border-emerald-300/40 text-emerald-300 text-[10.5px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
                                                    {siteSettings.topBar.admissionsText}
                                                </span>
                                                <span className="text-white/30 text-xs">•</span>
                                            </>
                                        )}

                                        {/* 4. Placement Support */}
                                        {siteSettings.topBar?.placementText && (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[10.5px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                                                    <Briefcase className="w-3 h-3 text-amber-300 flex-shrink-0" />
                                                    {siteSettings.topBar.placementText}
                                                </span>
                                                <span className="text-white/30 text-xs">•</span>
                                            </>
                                        )}

                                        {/* 5. Live Projects */}
                                        {siteSettings.topBar?.liveProjectText && (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 text-sky-200 text-[11px] sm:text-xs font-medium">
                                                    {siteSettings.topBar.liveProjectText}
                                                </span>
                                                <span className="text-white/30 text-xs">•</span>
                                            </>
                                        )}

                                        {/* 6. Phone Contact */}
                                        {siteSettings.topBar?.phone && (
                                            <>
                                                <a
                                                    href={`tel:${siteSettings.topBar.phone.replace(/[^0-9+]/g, '')}`}
                                                    className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-semibold text-[11px] sm:text-xs transition-colors"
                                                >
                                                    <Phone className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                                                    Call: {siteSettings.topBar.phone}
                                                </a>
                                                <span className="text-white/30 text-xs">•</span>
                                            </>
                                        )}

                                        {/* 7. Email Contact */}
                                        {siteSettings.topBar?.email && (
                                            <>
                                                <a
                                                    href={`mailto:${siteSettings.topBar.email}`}
                                                    className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-medium text-[11px] sm:text-xs transition-colors"
                                                >
                                                    <Mail className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                                                    {siteSettings.topBar.email}
                                                </a>
                                                <span className="text-white/30 text-xs">•</span>
                                            </>
                                        )}

                                        {/* 8. Free Career Counselling */}
                                        {siteSettings.topBar?.counsellingText && (
                                            <span className="inline-flex items-center gap-1 text-sky-200 text-[11px] sm:text-xs font-medium">
                                                {siteSettings.topBar.counsellingText}
                                            </span>
                                        )}

                                        <span className="text-white/30 text-xs mr-2">•</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Right: Pinned Social Icons (Dynamic handles from siteSettings) */}
                        <div className="hidden sm:flex items-center gap-1.5 pl-3 bg-[#00488f] shadow-[-12px_0_16px_#00488f] relative z-20 flex-shrink-0 border-l border-white/15">
                            {/* Facebook */}
                            {siteSettings.socialLinks?.facebook && (
                                <a
                                    href={siteSettings.socialLinks.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Facebook"
                                    title="Facebook"
                                    className="w-5.5 h-5.5 rounded-md bg-[#1877f2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                                >
                                    <Facebook className="w-3 h-3 fill-current" />
                                </a>
                            )}

                            {/* Instagram */}
                            {siteSettings.socialLinks?.instagram && (
                                <a
                                    href={siteSettings.socialLinks.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    title="Instagram"
                                    className="w-5.5 h-5.5 rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                                >
                                    <Instagram className="w-3 h-3 stroke-[2.2]" />
                                </a>
                            )}

                            {/* YouTube */}
                            {siteSettings.socialLinks?.youtube && (
                                <a
                                    href={siteSettings.socialLinks.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="YouTube"
                                    title="YouTube"
                                    className="w-5.5 h-5.5 rounded-md bg-[#ff0000] hover:bg-[#e60000] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                                >
                                    <Youtube className="w-3.5 h-3.5 stroke-[2]" />
                                </a>
                            )}

                            {/* LinkedIn */}
                            {siteSettings.socialLinks?.linkedin && (
                                <a
                                    href={siteSettings.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    title="LinkedIn"
                                    className="w-5.5 h-5.5 rounded-md bg-[#0a66c2] hover:bg-[#084e96] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                                >
                                    <Linkedin className="w-3 h-3 fill-current" />
                                </a>
                            )}

                            {/* Twitter / X */}
                            {siteSettings.socialLinks?.twitter && (
                                <a
                                    href={siteSettings.socialLinks.twitter}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Twitter / X"
                                    title="Twitter / X"
                                    className="w-5.5 h-5.5 rounded-md bg-black hover:bg-neutral-800 text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                                >
                                    <Twitter className="w-3 h-3 fill-current" />
                                </a>
                            )}

                            {/* WhatsApp */}
                            {siteSettings.socialLinks?.whatsapp && (
                                <a
                                    href={siteSettings.socialLinks.whatsapp}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="WhatsApp"
                                    title="WhatsApp"
                                    className="w-5.5 h-5.5 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                                >
                                    <MessageCircle className="w-3 h-3 fill-current" />
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            ) : isBackendDown ? (
                <div className="bg-[#00224d] text-amber-300 text-xs py-1 px-4 flex items-center justify-between border-b border-blue-900/40">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="text-amber-200 font-medium text-[11px]">
                            Header Top Bar: Backend Offline — Auto-reconnecting...
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            fetch('/api/site-settings').then(r => r.ok && r.json()).then(d => {
                                if (d) { setSiteSettings(d.data || d); setIsBackendDown(false); }
                            }).catch(() => {});
                        }}
                        className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-white transition-colors cursor-pointer"
                    >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reload</span>
                    </button>
                </div>
            ) : null}

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
                        {dynamicNavItems.map((item) => {
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

                                    {/* Desktop Dropdowns */}
                                    {item.label === 'Courses' ? (
                                        <div className="hidden group-hover:block absolute top-full -left-16 xl:-left-36 2xl:-left-20 pt-2 z-50">
                                            <div className="w-[920px] xl:w-[980px] 2xl:w-[1040px] max-w-[calc(100vw-36px)] max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,35,90,0.22),0_0_0_1px_rgba(0,35,90,0.08)] border border-slate-100 overflow-hidden animate-in fade-in-50 duration-150">
                                                {/* 1. Header Bar */}
                                                <div className="px-5 py-2.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white border-b border-slate-100 flex items-center justify-between shrink-0">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0055ff] text-white shadow-xs">
                                                            <Sparkles className="w-3 h-3 text-amber-300" />
                                                            Total {totalCertifiedCourses} Certified Courses
                                                        </span>
                                                        <span className="text-[12px] font-medium text-slate-600 hidden md:inline">
                                                            Industry-recognized curricula with 100% placement support
                                                        </span>
                                                    </div>
                                                    <NavLink
                                                        to="/Courses"
                                                        className="text-xs font-bold text-[#0055ff] hover:text-[#003cb3] flex items-center gap-1 group/all transition-colors"
                                                    >
                                                        <span>View Full Catalog</span>
                                                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/all:translate-x-0.5" />
                                                    </NavLink>
                                                </div>

                                                {/* 2. 4-Column Grid displaying all 22 Cards simultaneously */}
                                                <div className="p-3.5 xl:p-4 grid grid-cols-4 gap-2.5 xl:gap-3.5 bg-white overflow-y-auto flex-1 scrollbar-thin">
                                                    {megaMenuColumns.map((col) => (
                                                        <div key={col.colId} className="flex flex-col gap-3.5">
                                                            {col.sections.map((sec) => (
                                                                <div key={sec.id} className="flex flex-col">
                                                                    {/* Section Header */}
                                                                    <div className="flex items-center gap-1.5 pb-1 mb-1.5 border-b border-slate-100">
                                                                        <div className={`p-1 rounded-md ${sec.iconBg} ${sec.iconColor} flex-shrink-0`}>
                                                                            <sec.icon className="w-3 h-3" />
                                                                        </div>
                                                                        <h4 className="text-[10.5px] font-bold text-slate-800 tracking-wider uppercase truncate">
                                                                            {sec.title}
                                                                        </h4>
                                                                    </div>

                                                                    {/* Cards inside Section */}
                                                                    <div className="flex flex-col gap-1.5">
                                                                        {sec.courses.map((course) => {
                                                                            const CourseIcon = course.icon;
                                                                            const isCourseActive = active && (
                                                                                (course.to !== '/Courses' && location.pathname === course.to) ||
                                                                                (course.state?.category && location.state?.category === course.state?.category)
                                                                            );
                                                                            return (
                                                                                <NavLink
                                                                                    key={course.id || course.name}
                                                                                    to={course.to}
                                                                                    state={course.state}
                                                                                    className={`group/card flex items-center gap-2 p-1.5 px-2 rounded-xl border transition-all duration-150 cursor-pointer ${
                                                                                        isCourseActive
                                                                                            ? 'bg-blue-50/90 border-[#0055ff]/40 shadow-xs'
                                                                                            : 'bg-slate-50/60 hover:bg-white border-slate-100/90 hover:border-blue-200 hover:shadow-[0_4px_12px_rgba(0,60,180,0.08)] hover:-translate-y-0.5'
                                                                                    }`}
                                                                                >
                                                                                    {/* Icon Container */}
                                                                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors shadow-xs ${
                                                                                        isCourseActive
                                                                                            ? 'bg-[#0055ff] text-white'
                                                                                            : `${sec.iconBg} ${sec.iconColor} group-hover/card:bg-[#0055ff] group-hover/card:text-white`
                                                                                    }`}>
                                                                                        <CourseIcon className="w-3.5 h-3.5" />
                                                                                    </div>

                                                                                    {/* Content */}
                                                                                    <div className="min-w-0 flex-1">
                                                                                        <div className="flex items-center justify-between gap-1">
                                                                                            <h5 
                                                                                                className={`text-[11px] xl:text-[11.5px] font-semibold truncate transition-colors leading-tight ${
                                                                                                    isCourseActive
                                                                                                        ? 'text-[#0055ff]'
                                                                                                        : 'text-slate-800 group-hover/card:text-[#0055ff]'
                                                                                                }`}
                                                                                                title={course.name}
                                                                                            >
                                                                                                {course.name}
                                                                                            </h5>
                                                                                            {course.badge && (
                                                                                                <span className="text-[7.5px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-[#0055ff] flex-shrink-0 leading-none">
                                                                                                    {course.badge}
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                        <p className="text-[9.5px] text-slate-400 group-hover/card:text-slate-500 truncate mt-0.5 leading-none">
                                                                                            {course.sub}
                                                                                        </p>
                                                                                    </div>
                                                                                </NavLink>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* 3. Footer Bar */}
                                                <div className="px-5 py-2 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 shrink-0">
                                                    <div className="flex items-center gap-3">
                                                        <span className="inline-flex items-center gap-1.5 font-medium">
                                                            <Award className="w-3.5 h-3.5 text-[#0055ff]" />
                                                            Govt. &amp; ISO Certified
                                                        </span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="inline-flex items-center gap-1.5 font-medium">
                                                            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                                                            100% Placement Support
                                                        </span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="inline-flex items-center gap-1.5 font-medium">
                                                            <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                                                            Live Real-World Projects
                                                        </span>
                                                    </div>
                                                    <a
                                                        href="tel:+919311050670"
                                                        className="font-semibold text-slate-700 hover:text-[#0055ff] inline-flex items-center gap-1.5 transition-colors"
                                                    >
                                                        <Phone className="w-3 h-3 text-[#0055ff]" />
                                                        <span>Helpline: +91-9311050670</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Desktop Dropdowns - compact vertical list matching Corporate Course & others */
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
                                    )}
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
                                {dynamicNavItems.map((item) => {
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

                                {/* Direct Contact & Social */}
                                <div className="pt-2 border-t border-slate-200/60 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-slate-600">
                                        <a href={`tel:${(siteSettings.topBar?.phone || '+919311050670').replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 font-medium text-[#00488f] hover:underline">
                                            <Phone className="w-3.5 h-3.5" />
                                            <span>{siteSettings.topBar?.phone || '+91-9311050670'}</span>
                                        </a>
                                        <a href={`mailto:${siteSettings.topBar?.email || 'info@aayushinstitute.com'}`} className="flex items-center gap-1.5 font-medium text-[#00488f] hover:underline">
                                            <Mail className="w-3.5 h-3.5" />
                                            <span>Email Us</span>
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 pt-1">
                                        {siteSettings.socialLinks?.facebook && (
                                            <a href={siteSettings.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-6 h-6 rounded-md bg-[#1877f2] text-white flex items-center justify-center shadow-xs">
                                                <Facebook className="w-3 h-3 fill-current" />
                                            </a>
                                        )}
                                        {siteSettings.socialLinks?.instagram && (
                                            <a href={siteSettings.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-xs">
                                                <Instagram className="w-3 h-3 stroke-[2.2]" />
                                            </a>
                                        )}
                                        {siteSettings.socialLinks?.youtube && (
                                            <a href={siteSettings.socialLinks.youtube} target="_blank" rel="noreferrer" className="w-6 h-6 rounded-md bg-[#ff0000] text-white flex items-center justify-center shadow-xs">
                                                <Youtube className="w-3.5 h-3.5 stroke-[2]" />
                                            </a>
                                        )}
                                        {siteSettings.socialLinks?.linkedin && (
                                            <a href={siteSettings.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-6 h-6 rounded-md bg-[#0a66c2] text-white flex items-center justify-center shadow-xs">
                                                <Linkedin className="w-3 h-3 fill-current" />
                                            </a>
                                        )}
                                        {siteSettings.socialLinks?.twitter && (
                                            <a href={siteSettings.socialLinks.twitter} target="_blank" rel="noreferrer" className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center shadow-xs">
                                                <Twitter className="w-3 h-3 fill-current" />
                                            </a>
                                        )}
                                        {siteSettings.socialLinks?.whatsapp && (
                                            <a href={siteSettings.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="w-6 h-6 rounded-md bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                                                <MessageCircle className="w-3 h-3 fill-current" />
                                            </a>
                                        )}
                                    </div>
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



