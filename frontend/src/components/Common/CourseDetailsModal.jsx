import React from 'react';
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
    Compass
} from 'lucide-react';

export const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);

export const QRCodeWidget = () => (
    <div className="relative w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-2xl p-2.5 border-[2.5px] border-[#22c55e] shadow-xs flex items-center justify-center mx-auto">
        <img
            src="/whatsapp_qr.png"
            alt="WhatsApp QR Code"
            className="w-full h-full object-contain"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/918800817447';
            }}
        />
        <div className="absolute w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none">
            <WhatsAppIcon className="w-5 h-5" />
        </div>
    </div>
);

export const CourseDetailsPoster = ({ course, isModal = false, onClose }) => {
    if (!course) return null;

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
    const waLink = `https://wa.me/918800817447?text=${encodeURIComponent(`Hi, I would like to inquire about the ${courseName} course.`)}`;

    return (
        <div className={`w-full bg-[#f4f8fc] rounded-3xl p-3.5 sm:p-4 md:p-5 text-slate-800 border border-slate-200/80 shadow-2xl relative ${isModal ? 'xl:h-full xl:flex xl:flex-col xl:overflow-hidden' : 'space-y-4 sm:space-y-5'}`}>
            {/* Top Close button when in modal */}
            {isModal && onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-600 hover:text-slate-900 shadow-md flex items-center justify-center transition-all cursor-pointer border border-slate-200"
                    aria-label="Close modal"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            {/* ── MAIN CONTENT GRID: Left 9 Cols (Scrollable) + Right 3 Cols (Fixed WhatsApp) ── */}
            <div className={`grid grid-cols-1 xl:grid-cols-12 gap-3.5 sm:gap-4 items-start ${isModal ? 'xl:flex-1 xl:min-h-0 xl:overflow-hidden' : ''}`}>
                
                {/* ──── LEFT SECTION (9 Columns on XL) - SCROLLABLE ──── */}
                <div className={`xl:col-span-9 flex flex-col gap-3.5 sm:gap-4 ${isModal ? 'xl:h-full xl:overflow-y-auto xl:pr-3 custom-modal-scroll' : ''}`}>
                    
                    {/* ── 1. TOP HERO SECTION ── */}
                    <div 
                        className="relative overflow-hidden rounded-2xl border border-blue-200/70 p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 min-h-[210px] md:min-h-[235px] bg-[#d6ecff] bg-cover bg-no-repeat"
                        style={{ 
                            backgroundImage: "url('/course_card_girl.jpg')",
                            backgroundPosition: "right center" 
                        }}
                    >
                        <div className="max-w-md lg:max-w-lg z-10 bg-white/60 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-none p-3 sm:p-3.5 md:p-0 rounded-2xl">
                            {/* Course Number + Badge */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md flex-shrink-0">
                                    {String(course.id || 2).padStart(2, '0')}
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#0066ff] text-[10.5px] sm:text-[11px] font-medium tracking-wide border border-blue-200/80 shadow-2xs">
                                    <Rocket className="w-3.5 h-3.5 text-[#0066ff]" />
                                    <span>Future Ready Skills</span>
                                </div>
                            </div>

                            {/* Main Title */}
                            <h2 className="text-xl sm:text-2xl md:text-[25px] lg:text-[26px] font-bold text-[#0a2540] tracking-tight leading-tight mb-1.5">
                                {courseName}
                            </h2>

                            {/* Description */}
                            <p className="text-slate-600 text-[11px] sm:text-xs md:text-[12.5px] leading-relaxed mb-3 font-normal max-w-md">
                                {course.details || course.subtitle || course.oneLiner}
                            </p>

                            {/* 3 Circular Feature Badges */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10.5px] font-medium text-[#0a2540]">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-[#0066ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <BookOpen className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="leading-tight text-[10.5px]">Industry<br />Relevant Curriculum</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-[#0066ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <Code className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="leading-tight text-[10.5px]">Hands-on<br />Projects</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-[#0066ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <Users className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="leading-tight text-[10.5px]">Expert<br />Trainers</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Only: Show Course Card Graphic */}
                        <div className="md:hidden w-full flex justify-center pt-2 z-10">
                            <img
                                src="/course_card_girl.jpg"
                                alt="Student and AI"
                                className="h-40 object-cover rounded-xl drop-shadow-sm"
                            />
                        </div>

                        {/* Right spacer for Desktop: background image fills this area */}
                        <div className="hidden md:block flex-shrink-0 w-64 lg:w-88 h-40 lg:h-48 pointer-events-none" />
                    </div>

                    {/* ── 2. TWO EQUAL SUB-COLUMNS: Highlights+Syllabus & Course Info+Internship ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
                        
                        {/* ── Sub-Column 1: Course Highlights (top) & Syllabus (bottom) (6 cols) ── */}
                        <div className="lg:col-span-6 flex flex-col gap-3.5">
                            
                            {/* Course Highlights Card */}
                            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                                <div>
                                    {/* Header - Blue Gradient Pill Badge */}
                                    <div className="mb-2.5">
                                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0055cc] to-[#0077ff] text-white shadow-md">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-xs sm:text-sm font-semibold tracking-tight">Course Highlights</span>
                                        </div>
                                    </div>

                                    {/* 2-column Grid of 8 circular icons */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {finalHighlights.map((hl, hIdx) => {
                                            const colStyle = highlightColors[hIdx % highlightColors.length];
                                            return (
                                                <div key={hIdx} className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs ${colStyle.bg}`}>
                                                        {colStyle.icon}
                                                    </div>
                                                    <span className="text-[11px] font-medium text-[#0a2540] leading-snug">
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
                                <div className="flex items-stretch gap-3 mb-2.5 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 p-2.5 rounded-xl border border-blue-100/80">
                                    {/* Course Icon Card */}
                                    <div className="w-16 min-h-[68px] rounded-xl bg-gradient-to-br from-[#0055cc] to-[#3388ff] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-md p-1">
                                        <span className="text-[8px] font-semibold uppercase tracking-wider leading-tight text-center text-blue-200 mb-0.5">
                                            {courseName.split(' ').length > 3 ? courseName.split(' ').slice(0, 2).join(' ') : courseName.split(' ')[0]}
                                        </span>
                                        <span className="text-[8px] font-medium text-blue-100 leading-tight text-center">Course Syllabus</span>
                                        <div className="mt-1">{course.icon || <Cpu className="w-3.5 h-3.5 text-cyan-300" />}</div>
                                    </div>
                                    {/* Checklist */}
                                    <div className="space-y-0.5 text-[10.5px] text-slate-600 font-normal">
                                        {['Module-wise Topics', 'Tools & Technologies', 'Hands-on Projects', 'Learning Outcomes', 'Exam / Certification Details'].map((item, bIdx) => (
                                            <div key={bIdx} className="flex items-center gap-1.5">
                                                <Check className="w-3 h-3 text-emerald-600 stroke-[3] flex-shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Download Button - Solid Dark Blue */}
                                <NavLink
                                    to={coursePath}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#0d3055] text-white text-xs font-semibold shadow-md transition-all w-fit mt-1"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download Syllabus (PDF)</span>
                                    <ArrowRight className="w-3 h-3" />
                                </NavLink>
                            </div>
                        </div>

                        {/* ── Sub-Column 2: Course Information & Internship + Why Choose Us (6 cols) ── */}
                        <div className="lg:col-span-6 flex flex-col gap-2.5">
                            
                            {/* Course Information Card */}
                            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                                <div>
                                    {/* Header */}
                                    <div className="flex items-center gap-2 mb-2">
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px] mt-2.5">
                                    {/* Mandatory Internship */}
                                    <div className="bg-[#fffef7] p-2.5 sm:p-3 rounded-2xl border-2 border-[#fde047]/90 shadow-2xs flex flex-col justify-between overflow-hidden">
                                        <div>
                                            {/* Top Header Badge with Briefcase */}
                                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#0a2540] border border-amber-300 shadow-2xs mb-1.5">
                                                <div className="w-4 h-4 rounded bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-[#0a2540] flex items-center justify-center shadow-xs flex-shrink-0">
                                                    <Briefcase className="w-2.5 h-2.5 fill-[#0a2540] text-[#0a2540]" />
                                                </div>
                                                <span className="font-semibold text-[10.5px] sm:text-[11px]">Mandatory Internship</span>
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
                        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-2 mb-1.5">
                                <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                    <Compass className="w-3 h-3" />
                                </div>
                                <div>
                                    <h3 className="text-xs sm:text-[13px] font-semibold text-[#0a2540] tracking-tight">Career Focus</h3>
                                    <p className="text-[10px] text-slate-500 leading-snug font-normal">After completing this course, you can explore opportunities in:</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                {(Array.isArray(course.careerAreas) ? course.careerAreas : (course.careerAreas ? course.careerAreas.split(',') : (Array.isArray(course.career) ? course.career : []))).map((role, rIdx) => (
                                    <span key={rIdx} className="px-2.5 py-0.5 rounded-full bg-[#eef5ff] text-[#0055cc] text-[10.5px] font-medium border border-blue-200/80 hover:bg-blue-100 transition-colors">
                                        {typeof role === 'string' ? role.trim() : role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── 4. BOTTOM FULL-WIDTH NAVY BANNER ── */}
                    <div className="bg-[#002d62] text-white rounded-2xl p-3 sm:p-3.5 flex flex-col lg:flex-row items-center justify-between gap-2.5 sm:gap-3 shadow-md flex-shrink-0">
                        {/* Left: AI/Brain Target + Tagline */}
                        <div className="flex items-center gap-2.5 text-center lg:text-left">
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

                {/* ──── RIGHT SECTION: QUICK ENQUIRY ON WHATSAPP (3 Columns on XL) - FIXED / NON-SCROLLING ──── */}
                <div className="xl:col-span-3 flex flex-col justify-start xl:sticky xl:top-0 flex-shrink-0">
                    <div className="bg-[#f8fdfb] rounded-3xl p-4 sm:p-5 border-2 border-[#86efac] shadow-sm flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2.5">
                            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                                <WhatsAppIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-medium text-[#0a2540] leading-tight tracking-tight">Quick Enquiry on</h3>
                                <span className="text-xl sm:text-2xl font-bold text-[#0b8a4b] leading-tight block">WhatsApp</span>
                            </div>
                        </div>

                        {/* Subtitle */}
                        <p className="text-sm font-medium text-[#0a2540] mt-1 mb-2.5">
                            Get instant details about:
                        </p>

                        {/* Checklist */}
                        <div className="space-y-2 mb-3.5">
                            {[
                                "Course Details",
                                "Total Fee",
                                "Scholarship / Discounts",
                                "Admission Process",
                                "Batch Timings",
                                "Online / Classroom Mode",
                                "Syllabus",
                                "Career Guidance"
                            ].map((item, iIdx) => (
                                <div key={iIdx} className="flex items-center gap-2 text-[13px]">
                                    <Check className="w-4 h-4 text-[#059669] stroke-[3.5] flex-shrink-0" />
                                    <span className="font-medium text-[#0a2540]">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* QR Code Widget */}
                        <div className="my-1.5 flex justify-center">
                            <QRCodeWidget />
                        </div>

                        {/* Big Green WhatsApp Button */}
                        <div className="mt-3">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00b050] to-[#009b44] hover:from-[#009b44] hover:to-[#00853a] text-white font-semibold text-sm sm:text-base shadow-md shadow-emerald-600/30 hover:shadow-lg transition-all"
                            >
                                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                                <span>Chat on WhatsApp</span>
                                <ChevronRight className="w-5 h-5 stroke-[3] flex-shrink-0" />
                            </a>
                        </div>

                        {/* Bottom Counselor Note with WhatsApp icon */}
                        <div className="flex items-start justify-center gap-2 mt-2.5 text-center">
                            <div className="w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                                <WhatsAppIcon className="w-2.5 h-2.5" />
                            </div>
                            <p className="text-[11px] font-normal text-[#1e3a5f] text-left leading-tight">
                                Or click the button to chat directly<br />with our counsellor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CourseDetailsModal({ isOpen, course, onClose }) {
    if (!isOpen || !course) return null;

    return (
        <div 
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn"
            onClick={onClose}
        >
            <div 
                className="max-w-7xl w-full max-h-[96vh] xl:h-[92vh] overflow-y-auto xl:overflow-hidden rounded-3xl flex flex-col no-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                <CourseDetailsPoster course={course} isModal={true} onClose={onClose} />
            </div>
        </div>
    );
}
