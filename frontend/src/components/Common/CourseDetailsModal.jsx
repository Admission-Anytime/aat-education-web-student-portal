import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Rocket,
    BookOpen,
    Code,
    Users,
    Star,
    FileText,
    Check,
    Download,
    ArrowRight,
    Calendar,
    Monitor,
    GraduationCap,
    Award,
    Briefcase,
    Cpu,
    Settings,
    Sparkles,
    BarChart3,
    Bot,
    Zap,
    X,
    ChevronRight,
    Compass,
    Clock
} from 'lucide-react';

export const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);

export const QRCodeWidget = ({ qrSrc, waNumber = "919311050670" }) => {
    const defaultImg = qrSrc || "/whatsapp_qr.png";
    const cleanNumber = String(waNumber).replace(/[^0-9]/g, '') || '919311050670';
    const fallbackQr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://wa.me/${cleanNumber}`)}`;

    return (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border-[2px] sm:border-[2.5px] border-[#22c55e] shadow-xs flex items-center justify-center mx-auto transition-all">
            <img
                src={defaultImg}
                alt="WhatsApp QR Code"
                className="w-full h-full object-contain"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackQr;
                }}
            />
            <div className="absolute w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none">
                <WhatsAppIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
            </div>
        </div>
    );
};

export const CourseDetailsPoster = ({ course, isModal = false, onClose, onSelectCourse }) => {
    if (!course) return null;

    const [otherCourses, setOtherCourses] = useState([]);
    const [loadingOtherCourses, setLoadingOtherCourses] = useState(false);
    const [enquirySettings, setEnquirySettings] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchCourses = async () => {
            try {
                setLoadingOtherCourses(true);
                const res = await fetch('/api/courses');
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && Array.isArray(data)) {
                        setOtherCourses(data.filter(c => c.visible !== false));
                    }
                }
            } catch (err) {
                console.warn('Failed to load other courses in modal:', err);
            } finally {
                if (isMounted) setLoadingOtherCourses(false);
            }
        };

        const fetchEnquirySettings = async () => {
            try {
                const res = await fetch('/api/site-settings');
                if (res.ok) {
                    const data = await res.json();
                    const settings = data?.data?.modalWhatsAppEnquiry || data?.modalWhatsAppEnquiry;
                    if (isMounted && settings) {
                        setEnquirySettings(settings);
                    }
                }
            } catch (err) {
                console.warn('Failed to load modal WhatsApp settings:', err);
            }
        };

        fetchCourses();
        fetchEnquirySettings();
        return () => { isMounted = false; };
    }, []);

    const highlightItems = [];
    const courseName = course.name || course.title || '';
    if (course.id === 1 || courseName.toLowerCase().includes('artificial intelligence')) {
        highlightItems.push(
            "Artificial Intelligence Fundamentals",
            "AI Automation & Workflows",
            "Generative AI & ChatGPT",
            "AI Applications for Business",
            "Prompt Engineering",
            "AI Agents & Agentic AI Fundamentals",
            "AI Tools & Productivity",
            "Practical AI Projects"
        );
    } else {
        if (course.features && course.features.length > 0) {
            highlightItems.push(...course.features);
        }
        if (course.skills && course.skills.length > 0) {
            course.skills.forEach(s => {
                if (highlightItems.length < 8 && !highlightItems.includes(s)) {
                    highlightItems.push(s);
                }
            });
        }
        while (highlightItems.length < 8) {
            highlightItems.push(`Practical ${courseName} Case Studies`);
        }
    }
    const finalHighlights = highlightItems.slice(0, 8);

    const highlightColors = [
        { bg: 'bg-[#0066ff] text-white', icon: <Cpu className="w-3.5 h-3.5" /> },
        { bg: 'bg-[#e91e63] text-white', icon: <Settings className="w-3.5 h-3.5" /> },
        { bg: 'bg-[#10b981] text-white', icon: <Sparkles className="w-3.5 h-3.5" /> },
        { bg: 'bg-[#0284c7] text-white', icon: <BarChart3 className="w-3.5 h-3.5" /> },
        { bg: 'bg-[#8b5cf6] text-white', icon: <FileText className="w-3.5 h-3.5" /> },
        { bg: 'bg-[#6366f1] text-white', icon: <Bot className="w-3.5 h-3.5" /> },
        { bg: 'bg-[#f97316] text-white', icon: <Zap className="w-3.5 h-3.5" /> },
        { bg: 'bg-[#059669] text-white', icon: <Briefcase className="w-3.5 h-3.5" /> }
    ];

    const coursePath = course.path || course.route || '/Courses';

    // Dynamic WhatsApp enquiry properties from Admin or fallback
    const dynamicWaRaw = enquirySettings?.whatsappNumber || course?.whatsappNumber || "919311050670";
    const dynamicWaClean = String(dynamicWaRaw).replace(/[^0-9]/g, '') || "919311050670";
    const waLink = `https://wa.me/${dynamicWaClean}?text=${encodeURIComponent(`Hi, I would like to inquire about the ${courseName} course.`)}`;

    const titlePrefix = enquirySettings?.titlePrefix || "Quick Enquiry on";
    const titleHighlight = enquirySettings?.titleHighlight || "WhatsApp";
    const subtitle = enquirySettings?.subtitle || "Get instant details about:";
    const checklistItems = (Array.isArray(enquirySettings?.checklist) && enquirySettings.checklist.length > 0)
        ? enquirySettings.checklist
        : [
            "Course Details",
            "Total Fee",
            "Scholarship / Discounts",
            "Admission Process",
            "Batch Timings",
            "Online / Classroom Mode",
            "Syllabus",
            "Career Guidance"
        ];
    const qrImageSrc = enquirySettings?.qrImage || course?.qrCodeImage || "/whatsapp_qr.png";
    const buttonText = enquirySettings?.buttonText || "Chat on WhatsApp";
    const counsellorNote = enquirySettings?.counsellorNote || "Or click the button to chat directly with our counsellor.";

    const courseBadgeNumber = (() => {
        if (typeof course.order === 'number' && !isNaN(course.order) && course.order > 0 && course.order < 100) {
            return String(course.order).padStart(2, '0');
        }
        if (typeof course.displayOrder === 'number' && !isNaN(course.displayOrder) && course.displayOrder > 0 && course.displayOrder < 100) {
            return String(course.displayOrder).padStart(2, '0');
        }
        const num = Number(course.id);
        if (!isNaN(num) && num > 0 && num < 1000) {
            return String(num).padStart(2, '0');
        }
        return '01';
    })();

    const filteredCourses = otherCourses.filter(c => 
        String(c._id || c.id) !== String(course?._id || course?.id) &&
        (c.name || c.title || '').toLowerCase() !== courseName.toLowerCase()
    );

    return (
        <div className="w-full bg-[#f4f8fc] rounded-3xl p-3.5 sm:p-5 md:p-6 text-slate-800 relative">
            {/* Top Close button when in modal */}
            {isModal && onClose && (
                <button
                    onClick={onClose}
                    className="sticky top-2 right-2 sm:top-3 sm:right-3 z-50 ml-auto -mb-9 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 shadow-lg flex items-center justify-center transition-all cursor-pointer border border-slate-200/90 hover:scale-105 active:scale-95"
                    aria-label="Close modal"
                >
                    <X className="w-4.5 h-4.5 stroke-[2.5]" />
                </button>
            )}

            {/* ── MAIN CONTENT GRID: Mobile/Tablet full flow, Desktop (XL 8 / XL 4) ── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 xl:gap-7 items-start">
                
                {/* ──── LEFT / MAIN CONTENT SECTION ──── */}
                <div className="xl:col-span-8 2xl:col-span-8 flex flex-col gap-5 sm:gap-6">
                    
                    {/* ── 1. TOP HERO SECTION ── */}
                    <div className="relative overflow-hidden rounded-2xl border border-blue-200/70 p-4 sm:p-6 md:p-7 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 min-h-[170px] md:min-h-[235px] bg-gradient-to-br from-[#ebf5ff] via-[#d6ecff] to-[#c7e5ff]">
                        
                        {/* Desktop & Tablet: Background Hero Image contained strictly on the right side */}
                        <div 
                            className="hidden md:block absolute inset-0 bg-no-repeat pointer-events-none"
                            style={{ 
                                backgroundImage: "url('/course_card_girl.jpg')",
                                backgroundPosition: "right center",
                                backgroundSize: "contain"
                            }}
                        />

                        {/* Left Text Block: Capped at 55% so text NEVER collides with the girl/robot */}
                        <div className="w-full md:max-w-[55%] lg:max-w-[55%] xl:max-w-[56%] z-10 p-0 rounded-2xl relative">
                            {/* Course Number + Badge */}
                            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md flex-shrink-0 overflow-hidden">
                                    {courseBadgeNumber}
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#0066ff] text-[10.5px] sm:text-[11px] font-medium tracking-wide border border-blue-200/80 shadow-2xs">
                                    <Rocket className="w-3.5 h-3.5 text-[#0066ff]" />
                                    <span>Future Ready Skills</span>
                                </div>
                            </div>

                            {/* Main Title */}
                            <h2 className="text-xl sm:text-2xl md:text-[23px] lg:text-[26px] font-bold text-[#0a2540] tracking-tight leading-tight mb-1.5 sm:mb-2">
                                {courseName}
                            </h2>

                            {/* Description */}
                            <p className="text-slate-600 text-[11px] sm:text-xs md:text-[12px] lg:text-[12.5px] leading-relaxed mb-3 sm:mb-3.5 font-normal max-w-md">
                                {course.details || course.subtitle || course.oneLiner}
                            </p>

                            {/* 3 Circular Feature Badges with clean spacing */}
                            <div className="flex flex-wrap md:flex-nowrap items-stretch gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10px] md:text-[10.5px] font-medium text-[#0a2540] pt-2.5 pb-1 border-t border-blue-200/60 mt-2">
                                <div className="flex-1 min-w-[85px] flex items-center gap-1.5 bg-white/95 md:bg-white/85 px-2 py-1.5 rounded-xl border border-blue-100 shadow-2xs">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[#0066ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <BookOpen className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    </div>
                                    <span className="leading-tight line-clamp-2">Industry Curriculum</span>
                                </div>
                                <div className="flex-1 min-w-[85px] flex items-center gap-1.5 bg-white/95 md:bg-white/85 px-2 py-1.5 rounded-xl border border-blue-100 shadow-2xs">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[#0066ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <Code className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    </div>
                                    <span className="leading-tight line-clamp-2">Hands-on Projects</span>
                                </div>
                                <div className="flex-1 min-w-[85px] flex items-center gap-1.5 bg-white/95 md:bg-white/85 px-2 py-1.5 rounded-xl border border-blue-100 shadow-2xs">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[#0066ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    </div>
                                    <span className="leading-tight line-clamp-2">Expert Trainers</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Course Graphic Banner: Balanced Artwork without Blank Gaps */}
                        <div className="md:hidden w-full flex justify-center my-3 sm:my-4 z-10">
                            <div className="w-full max-w-[340px] sm:max-w-sm overflow-hidden rounded-2xl border border-white/90 shadow-md bg-white/95 p-1.5 sm:p-2">
                                <img
                                    src="/course_card_girl_mobile.png"
                                    alt={courseName}
                                    className="w-full h-auto aspect-[4/3] sm:aspect-[16/10] object-cover object-center rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Right spacer for Desktop: background image fills this area */}
                        <div className="hidden md:block flex-shrink-0 w-64 lg:w-88 h-40 lg:h-48 pointer-events-none" />
                    </div>

                    {/* ── 2. TWO EQUAL SUB-COLUMNS: Highlights+Syllabus & Course Info+Internship ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
                        
                        {/* ── Sub-Column 1: Course Highlights (top) & Syllabus (bottom) ── */}
                        <div className="flex flex-col gap-4 sm:gap-5">
                            
                            {/* Course Highlights Card */}
                            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                                <div>
                                    {/* Header - Blue Gradient Pill Badge */}
                                    <div className="mb-2.5">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-[#0055cc] to-[#0077ff] text-white shadow-md">
                                            <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                                            <span className="text-xs sm:text-sm font-semibold tracking-tight">Course Highlights</span>
                                        </div>
                                    </div>

                                    {/* 2-column Grid on both Mobile and Desktop */}
                                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                        {finalHighlights.map((hl, hIdx) => {
                                            const colStyle = highlightColors[hIdx % highlightColors.length];
                                            return (
                                                <div key={hIdx} className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100/90 hover:bg-slate-100 transition-colors">
                                                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs ${colStyle.bg}`}>
                                                        {colStyle.icon}
                                                    </div>
                                                    <span className="text-[10px] sm:text-[11.5px] font-medium text-[#0a2540] leading-snug line-clamp-2" title={hl}>
                                                        {hl}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Sub-Card: Complete Course Syllabus */}
                            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between flex-1">
                                {/* Top: Icon + Title + Description */}
                                <div className="flex items-start gap-2.5 mb-2">
                                    <div className="w-7 h-7 rounded-lg bg-[#0066ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <FileText className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-semibold text-[#0a2540] leading-tight">Complete Course Syllabus</h4>
                                        <p className="text-[10.5px] text-slate-500 leading-snug mt-0.5 font-normal">
                                            Get detailed module-wise syllabus with topics, practical assignments, tools and project details.
                                        </p>
                                    </div>
                                </div>

                                {/* Middle: Syllabus Card + Checklist side by side */}
                                <div className="flex items-stretch gap-2.5 sm:gap-3 mb-2.5 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 p-2 sm:p-2.5 rounded-xl border border-blue-100/80">
                                    {/* Course Icon Card */}
                                    <div className="w-14 sm:w-16 min-h-[64px] sm:min-h-[68px] rounded-xl bg-gradient-to-br from-[#0055cc] to-[#3388ff] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-md p-1">
                                        <span className="text-[7.5px] sm:text-[8px] font-semibold uppercase tracking-wider leading-tight text-center text-blue-200 mb-0.5">
                                            {courseName.split(' ').length > 3 ? courseName.split(' ').slice(0, 2).join(' ') : courseName.split(' ')[0]}
                                        </span>
                                        <span className="text-[7.5px] sm:text-[8px] font-medium text-blue-100 leading-tight text-center">Course Syllabus</span>
                                        <div className="mt-0.5 sm:mt-1">{course.icon || <Cpu className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-300" />}</div>
                                    </div>
                                    {/* Checklist */}
                                    <div className="space-y-0.5 text-[10px] sm:text-[10.5px] text-slate-600 font-normal">
                                        {['Module-wise Topics', 'Tools & Technologies', 'Hands-on Projects', 'Learning Outcomes', 'Exam / Certification Details'].map((item, bIdx) => (
                                            <div key={bIdx} className="flex items-center gap-1.5">
                                                <Check className="w-3 h-3 text-emerald-600 stroke-[3] flex-shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Download Button - Responsive Full Width on Mobile */}
                                <NavLink
                                    to={coursePath}
                                    className="w-full sm:w-fit inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#0d3055] text-white text-xs font-semibold shadow-md transition-all mt-1"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download Syllabus (PDF)</span>
                                    <ArrowRight className="w-3 h-3" />
                                </NavLink>
                            </div>
                        </div>

                        {/* ── Sub-Column 2: Course Information & Internship + Why Choose Us ── */}
                        <div className="flex flex-col gap-4 sm:gap-5">
                            
                            {/* Course Information Card */}
                            <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                                <div>
                                    {/* Header */}
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <div className="w-6 h-6 rounded-lg bg-[#0055cc] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                            <FileText className="w-3 h-3" />
                                        </div>
                                        <h3 className="text-xs sm:text-[13px] font-semibold text-[#0a2540] tracking-tight">
                                            Course Information
                                        </h3>
                                    </div>

                                    {/* Information Table with outer border, vertical line divider, and soft tinted rows */}
                                    <div className="border border-blue-200/80 rounded-xl overflow-hidden divide-y divide-blue-200/70 text-xs sm:text-[12px]">
                                        {/* Row 1: Duration (Soft Blue) */}
                                        <div className="grid grid-cols-12 divide-x divide-blue-200/70 bg-[#ebf5ff]">
                                            <div className="col-span-5 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-md bg-blue-100 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                                    <Calendar className="w-3 h-3" />
                                                </div>
                                                <span className="font-medium text-[#0a2540] text-[11px] sm:text-[11.5px]">Course Duration</span>
                                            </div>
                                            <div className="col-span-7 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center">
                                                <span className="font-semibold text-[#003882] text-[11.5px] sm:text-xs">{course.duration}</span>
                                            </div>
                                        </div>

                                        {/* Row 2: Course Total Fee (Soft Pink) */}
                                        <div className="grid grid-cols-12 divide-x divide-blue-200/70 bg-[#fff0f3]">
                                            <div className="col-span-5 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-[#fce7ec] text-[#e11d48] flex items-center justify-center flex-shrink-0 font-medium text-[11px]">
                                                    ₹
                                                </div>
                                                <span className="font-medium text-[#0a2540] text-[11px] sm:text-[11.5px]">Course Total Fee</span>
                                            </div>
                                            <div className="col-span-7 py-1 px-2.5 sm:py-1.5 sm:px-3 flex flex-col justify-center">
                                                <span className="font-semibold text-[#0a2540] text-[11.5px] sm:text-xs leading-tight">
                                                    {course.fees || (course.id === 1 || courseName.toLowerCase().includes('artificial intelligence') ? '₹ 65,000/-' : (course.duration?.toLowerCase().includes('week') ? '₹ 16,000/-' : '₹ 45,000/-'))}
                                                </span>
                                                <span className="text-[9.5px] text-slate-500 font-normal leading-none mt-0.5">
                                                    (Inclusive of all taxes)
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 3: Scholarship (Soft Green) */}
                                        <div className="grid grid-cols-12 divide-x divide-blue-200/70 bg-[#ebfaf2]">
                                            <div className="col-span-5 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center flex-shrink-0">
                                                    <Users className="w-3 h-3" />
                                                </div>
                                                <span className="font-medium text-[#0a2540] text-[11px] sm:text-[11.5px]">Scholarship</span>
                                            </div>
                                            <div className="col-span-7 py-1 px-2.5 sm:py-1.5 sm:px-3 flex flex-col justify-center">
                                                <span className="font-semibold text-[#0f766e] text-[11.5px] sm:text-xs leading-tight">
                                                    {course.scholarship || "Up to 50%"}
                                                </span>
                                                <span className="text-[9px] text-slate-500 font-normal leading-tight mt-0.5">
                                                    (Based on academic performance &amp; interview)
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 4: Mode (White) */}
                                        <div className="grid grid-cols-12 divide-x divide-blue-200/70 bg-white">
                                            <div className="col-span-5 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                                    <Monitor className="w-3 h-3" />
                                                </div>
                                                <span className="font-medium text-[#0a2540] text-[11px] sm:text-[11.5px]">Mode</span>
                                            </div>
                                            <div className="col-span-7 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center">
                                                <span className="font-normal text-[#0a2540] text-[11px] sm:text-[11.5px]">
                                                    {course.mode || "Classroom / Online / Hybrid"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 5: Eligibility (White) */}
                                        <div className="grid grid-cols-12 divide-x divide-blue-200/70 bg-white">
                                            <div className="col-span-5 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                                    <GraduationCap className="w-3 h-3" />
                                                </div>
                                                <span className="font-medium text-[#0a2540] text-[11px] sm:text-[11.5px]">Eligibility</span>
                                            </div>
                                            <div className="col-span-7 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center">
                                                <span className="font-normal text-[#0a2540] text-[10.5px] sm:text-[11px] leading-snug">
                                                    {course.eligibility || '12th / Graduate / Working Professionals'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 6: Certification (White) */}
                                        <div className="grid grid-cols-12 divide-x divide-blue-200/70 bg-white">
                                            <div className="col-span-5 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                                    <Award className="w-3 h-3" />
                                                </div>
                                                <span className="font-medium text-[#0a2540] text-[11px] sm:text-[11.5px]">Certification</span>
                                            </div>
                                            <div className="col-span-7 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center">
                                                <span className="font-normal text-[#0a2540] text-[10.5px] sm:text-[11px] leading-snug">
                                                    {course.certification ? (course.certification.startsWith('Certificate') || course.certification.startsWith('UGC') ? course.certification : `Certificate in ${course.certification.replace('Certified ', '')}`) : `Certificate in ${courseName}`}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 7: Batch Schedule (White) */}
                                        <div className="grid grid-cols-12 divide-x divide-blue-200/70 bg-white">
                                            <div className="col-span-5 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                                    <Calendar className="w-3 h-3" />
                                                </div>
                                                <span className="font-medium text-[#0a2540] text-[11px] sm:text-[11.5px]">Batch Schedule</span>
                                            </div>
                                            <div className="col-span-7 py-1 px-2.5 sm:py-1.5 sm:px-3 flex items-center">
                                                <span className="font-normal text-[#0a2540] text-[11px] sm:text-[11.5px]">
                                                    {course.batchSchedule || "Weekday & Weekend Batches"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sub-Cards: Mandatory Internship & Why Choose Us (Side-by-side) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 text-[10px] mt-3.5 sm:mt-4">
                                    {/* Mandatory Internship */}
                                    <div className="bg-[#fffef7] p-2.5 sm:p-3 rounded-2xl border-2 border-[#fde047]/90 shadow-2xs flex flex-col justify-between overflow-hidden">
                                        <div>
                                            {/* Top Header Badge with Briefcase */}
                                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#0a2540] border border-amber-300 shadow-2xs mb-1.5">
                                                <div className="w-4 h-4 rounded bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-[#0a2540] flex items-center justify-center shadow-xs flex-shrink-0">
                                                    <Briefcase className="w-2.5 h-2.5 fill-[#0a2540] text-[#0a2540]" />
                                                </div>
                                                <span className="font-semibold text-[10px] sm:text-[10.5px] whitespace-nowrap">Mandatory Internship</span>
                                            </div>

                                            {/* White Container with 2 Lines (Stacked) and OR divider */}
                                            <div className="bg-white rounded-xl p-1.5 sm:p-2 border border-amber-200/80 shadow-2xs flex flex-col gap-1.5">
                                                {/* Line 1: 3 Months Unpaid Internship */}
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-5 h-5 rounded-md bg-orange-50 border border-orange-200/80 text-[#ea580c] flex items-center justify-center flex-shrink-0">
                                                        <Calendar className="w-3 h-3" />
                                                    </div>
                                                    <div className="flex items-center gap-1 leading-none">
                                                        <span className="font-semibold text-[#ea580c] text-[10.5px] sm:text-[11px]">3 Months</span>
                                                        <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-600">Unpaid Internship</span>
                                                    </div>
                                                </div>

                                                {/* OR Separator with lines */}
                                                <div className="relative flex items-center justify-center my-0.5">
                                                    <div className="w-full border-t border-amber-200/60" />
                                                    <span className="absolute px-1.5 bg-white text-[8px] font-bold text-amber-700 uppercase tracking-wider rounded-full border border-amber-200 shadow-2xs">
                                                        OR
                                                    </span>
                                                </div>

                                                {/* Line 2: 3 Months Paid Internship */}
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200/80 text-[#059669] flex items-center justify-center flex-shrink-0">
                                                        <Users className="w-3 h-3" />
                                                    </div>
                                                    <div className="flex items-center gap-1 leading-none">
                                                        <span className="font-semibold text-[#059669] text-[10.5px] sm:text-[11px]">3 Months</span>
                                                        <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-600">Paid Internship</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Note */}
                                        <p className="text-[9px] sm:text-[9.5px] text-slate-500 text-center font-normal mt-1.5 leading-tight">
                                            Gain real-world experience &amp; build professional network.
                                        </p>
                                    </div>

                                    {/* Why Choose Us */}
                                    <div className="bg-[#f8fbff] p-2.5 sm:p-3 rounded-2xl border-2 border-[#bae6fd]/90 shadow-2xs flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-1 mb-1.5">
                                                <Star className="w-3 h-3 text-[#0055cc] fill-current" />
                                                <span className="font-semibold text-[#0a2540] text-[11px] sm:text-xs">Why Choose Us?</span>
                                            </div>
                                            <div className="space-y-1.5">
                                                {[
                                                    'Practical Learning with Live Projects',
                                                    'Industry-Relevant Curriculum',
                                                    'Expert Faculty & Mentorship',
                                                    'Flexible Learning Options',
                                                    'Placement Support*'
                                                ].map((item, wIdx) => (
                                                    <div key={wIdx} className="flex items-center gap-1.5">
                                                        <div className="w-3 h-3 rounded-full bg-[#0047ba] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                                            <Check className="w-1.5 h-1.5 stroke-[3.5]" />
                                                        </div>
                                                        <span className="text-slate-800 font-medium text-[10.5px] sm:text-[11px] leading-tight">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── 3. CAREER FOCUS SECTION (Full Width of Left 9 Cols) ── */}
                    {(course.careerAreas || (Array.isArray(course.career) && course.career.length > 0)) && (
                        <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                    <Compass className="w-3 h-3" />
                                </div>
                                <div>
                                    <h3 className="text-xs sm:text-[13px] font-semibold text-[#0a2540] tracking-tight">Career Focus</h3>
                                    <p className="text-[10px] text-slate-500 leading-snug font-normal">After completing this course, you can explore opportunities in:</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {(Array.isArray(course.careerAreas) ? course.careerAreas : (course.careerAreas ? course.careerAreas.split(',') : (Array.isArray(course.career) ? course.career : []))).map((role, rIdx) => (
                                    <span key={rIdx} className="px-2.5 py-0.5 rounded-full bg-[#eef5ff] text-[#0055cc] text-[10.5px] font-medium border border-blue-200/80 hover:bg-blue-100 transition-colors">
                                        {typeof role === 'string' ? role.trim() : role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── 4. BOTTOM FULL-WIDTH NAVY BANNER ── */}
                    <div className="bg-[#002d62] text-white rounded-2xl p-4 sm:p-4.5 flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4 shadow-md flex-shrink-0">
                        {/* Left: AI/Brain Target + Tagline */}
                        <div className="flex items-center gap-2.5 text-center md:text-left">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-xs">
                                <Cpu className="w-4 h-4 text-sky-400" />
                            </div>
                            <div>
                                <h4 className="text-xs sm:text-sm font-semibold tracking-tight leading-tight text-white">
                                    Learn Today, Lead Tomorrow
                                </h4>
                                <p className="text-[10.5px] text-sky-200/90 leading-snug mt-0.5 font-normal">
                                    Master {courseName}. Build In-Demand Skills. Shape Your Future.
                                </p>
                            </div>
                        </div>

                        {/* Center: 3 Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10.5px] text-slate-200 font-medium">
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <BookOpen className="w-3 h-3 text-sky-400" />
                                <span>100% Practical Learning</span>
                            </div>
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <Users className="w-3 h-3 text-emerald-400" />
                                <span>Expert Mentors</span>
                            </div>
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <Award className="w-3 h-3 text-amber-400" />
                                <span>Placement Support*</span>
                            </div>
                        </div>

                        {/* Right: 2 Action Buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <NavLink
                                to={coursePath}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#0a2540] text-[11px] font-semibold shadow-md transition-all"
                            >
                                <Download className="w-3 h-3" />
                                <span>Download Syllabus</span>
                            </NavLink>
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-semibold shadow-md transition-all"
                            >
                                <WhatsAppIcon className="w-3 h-3" />
                                <span>Enquire on WhatsApp</span>
                                <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ──── RIGHT SECTION: QUICK ENQUIRY ON WHATSAPP (Ultra-Responsive & Portrait Proportioned) ──── */}
                <div className="xl:col-span-4 2xl:col-span-4 flex flex-col justify-start w-full max-w-[310px] sm:max-w-[325px] xl:max-w-[335px] mx-auto self-start">
                    <div className="bg-[#f8fdfb] rounded-3xl p-5 sm:p-6 border-2 border-[#86efac] shadow-sm flex flex-col justify-between min-h-[560px] sm:min-h-[590px]">
                        <div className="flex flex-col gap-4 sm:gap-5">
                            {/* Header & Checklist */}
                            <div className="flex flex-col">
                                {/* Header */}
                                <div className="flex items-center gap-2.5 mb-2.5">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                                        <WhatsAppIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="flex items-baseline flex-wrap gap-1 leading-tight">
                                        <h3 className="text-xs sm:text-sm font-semibold text-[#0a2540] tracking-tight whitespace-nowrap">{titlePrefix}</h3>
                                        <span className="text-sm sm:text-base font-bold text-[#0b8a4b] whitespace-nowrap">{titleHighlight}</span>
                                    </div>
                                </div>

                                {/* Subtitle */}
                                <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-1 mb-2.5 leading-tight">
                                    {subtitle}
                                </p>

                                {/* Checklist */}
                                <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-y-2.5 mb-1">
                                    {checklistItems.map((item, iIdx) => (
                                        <div key={iIdx} className="flex items-center gap-1 text-[10px] sm:text-[11px] min-w-0">
                                            <Check className="w-3 h-3 text-[#059669] stroke-[3] flex-shrink-0" />
                                            <span className="font-medium text-[#0a2540] leading-tight truncate whitespace-nowrap" title={item}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* QR Code + Button + Note */}
                            <div className="w-full flex flex-col items-center justify-center pt-2">
                                {/* QR Code Widget (Admin Managed) */}
                                <div className="my-2 flex flex-col items-center justify-center">
                                    <div className="p-2 bg-white rounded-2xl border border-emerald-200/90 shadow-2xs">
                                        <QRCodeWidget qrSrc={qrImageSrc} waNumber={dynamicWaClean} />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-medium mt-1.5 whitespace-nowrap">Scan QR or tap button below</span>
                                </div>

                                {/* Big Green WhatsApp Button */}
                                <div className="mt-2.5 w-full">
                                    <a
                                        href={waLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00b050] to-[#009b44] hover:from-[#009b44] hover:to-[#00853a] text-white font-semibold text-xs sm:text-[13px] shadow-md shadow-emerald-600/30 hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap"
                                    >
                                        <WhatsAppIcon className="w-4.5 h-4.5 flex-shrink-0" />
                                        <span className="truncate">{buttonText}</span>
                                        <ChevronRight className="w-4 h-4 stroke-[3] flex-shrink-0" />
                                    </a>
                                </div>

                                {/* Bottom Counselor Note with WhatsApp icon */}
                                <div className="flex items-center justify-center gap-1.5 mt-2.5 text-center">
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                        <WhatsAppIcon className="w-2 h-2" />
                                    </div>
                                    <p className="text-[9.5px] sm:text-[10px] font-normal text-[#1e3a5f] text-center leading-tight whitespace-nowrap truncate">
                                        {counsellorNote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Quick CTA Bar */}
            <div className="md:hidden sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-2.5 border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2 -mx-3.5 -mb-3.5 mt-4 rounded-b-3xl">
                <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00b050] to-[#009b44] text-white text-xs font-bold shadow-md active:scale-95 transition-all"
                >
                    <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                    <span>Chat on WhatsApp</span>
                </a>
                <NavLink
                    to={coursePath}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0a2540] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                >
                    <Download className="w-3.5 h-3.5" />
                    <span>Syllabus</span>
                </NavLink>
            </div>

        </div>
    );
};

export default function CourseDetailsModal({ isOpen, course, onClose, onSelectCourse }) {
    if (!isOpen || !course) return null;

    const [activeCourse, setActiveCourse] = useState(course);
    const modalScrollRef = useRef(null);

    useEffect(() => {
        setActiveCourse(course);
    }, [course]);

    const handleSelectOtherCourse = (newCourse) => {
        setActiveCourse(newCourse);
        if (onSelectCourse) onSelectCourse(newCourse);
        if (modalScrollRef.current) {
            modalScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-0 sm:p-3 md:p-5 z-[10000] animate-fadeIn"
            onClick={onClose}
        >
            <div 
                ref={modalScrollRef}
                className="w-full sm:w-[95vw] lg:w-[92vw] xl:w-[90vw] h-full sm:h-[92vh] max-w-[1440px] max-h-none sm:max-h-[92vh] overflow-y-auto rounded-none sm:rounded-3xl flex flex-col bg-[#f4f8fc] shadow-2xl relative border-0 sm:border sm:border-white/20 custom-modal-scroll pb-16 sm:pb-6"
                onClick={(e) => e.stopPropagation()}
            >
                <CourseDetailsPoster 
                    course={activeCourse} 
                    isModal={true} 
                    onClose={onClose} 
                    onSelectCourse={handleSelectOtherCourse}
                />
            </div>
        </div>
    );
}
