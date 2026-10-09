import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Award,
    BookOpen,
    Briefcase,
    CheckCircle2,
    Clock,
    Users,
    Building,
    Shield,
    Sparkles,
    ArrowRight,
    ChevronRight,
    Phone,
    Mail,
    Globe,
    MapPin,
    Cpu,
    GraduationCap
} from 'lucide-react';

const AboutUs = () => {
    const [facultyList, setFacultyList] = useState([]);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
                const res = await fetch(`${baseUrl}/api/users?role=staff`);
                const json = await res.json();
                const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
                if (list.length > 0) {
                    setFacultyList(list.slice(0, 4));
                }
            } catch (err) {
                console.warn('Faculty fetch in AboutUs:', err.message);
            }
        };
        fetchFaculty();
    }, []);
    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* 1. Hero Section - Compact & Restrained */}
            <div 
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-[right_center] border-b border-slate-200/60"
                style={{ 
                    backgroundImage: "url('/professional.png')",
                    backgroundColor: '#d0e7ff'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d0e7ff]/98 via-[#d0e7ff]/85 to-[#d0e7ff]/30 sm:from-[#d0e7ff]/95 sm:via-[#d0e7ff]/75 sm:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
                    <div className="flex flex-col justify-center py-5 sm:py-6 lg:py-8 max-w-xl lg:max-w-2xl min-h-0">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#003882] text-[11.5px] font-bold tracking-wider mb-2 border border-blue-200/80 shadow-xs w-fit">
                            <Sparkles className="w-3.5 h-3.5 text-[#0055ff]" />
                            <span>ABOUT US</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-bold text-[#00285e] leading-[1.15] tracking-tight mb-1.5">
                            AAYUSH INSTITUTE OF{' '}
                            <span className="text-[#0062ff] block">PROFESSIONAL STUDIES</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#004b93] font-semibold text-xs sm:text-[13px] mb-2 tracking-wide">
                            Education • Skills • Industry Exposure • Career Development
                        </p>

                        {/* Description */}
                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-3.5 max-w-xl font-normal">
                            Established in 2002, Aayush Institute of Professional Studies is a private education and training institute focused on IT education, professional skill development, university education, and practical learning.
                        </p>

                        {/* Quick CTA Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            <NavLink
                                to="/Courses"
                                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all"
                            >
                                <BookOpen className="w-4 h-4" />
                                <span>Explore Courses</span>
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#00285e] border border-slate-300 text-xs sm:text-[13px] font-bold shadow-xs transition-all"
                            >
                                <Phone className="w-4 h-4 text-[#0062ff]" />
                                <span>Contact Us</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Sections - Compact Spacing */}
            <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 space-y-4 sm:space-y-5">

                {/* 1.1 Introductory Overview Card */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full space-y-2 text-left">
                        <span className="text-[11px] font-semibold text-[#0055cc] uppercase tracking-wider block">
                            Two Decades of Dedication
                        </span>
                        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#0a2540]">
                            More than Two Decades Associated with Education and Skill Development
                        </h2>
                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                            For more than two decades, the Institute has been associated with education and skill development, supporting students, graduates, working professionals, and career aspirants in developing academic knowledge, technical skills, and professional capabilities.
                        </p>
                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                            Our approach combines structured education, practical learning, industry exposure, and career guidance to help learners build relevant skills and make informed decisions about their pathways.
                        </p>
                    </div>
                </div>

                {/* 2. OUR JOURNEY (From 2002 to Today) */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full mb-4">
                        <span className="text-[10px] font-semibold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Our Journey
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                            From 2002 to Today
                        </h2>
                        <div className="text-slate-600 text-xs sm:text-[13px] space-y-2 mt-2 leading-relaxed font-normal">
                            <p>
                                Aayush Institute of Professional Studies was established in 2002 with a focus on education and professional skill development.
                            </p>
                            <p>
                                Before 2026, the Institute operated under New Aayush Education Welfare Society, a society registered in Delhi under the Societies Registration Act, 1860.
                            </p>
                            <p>
                                In 2026, the management and operations were taken over by Atri Admission Anytime Private Limited, a private limited company incorporated under the laws of India.
                            </p>
                            <p className="text-slate-600 font-normal">
                                Under its current management, the Institute continues to develop its ecosystem with a focus on technology, practical skills, industry exposure, and career support.
                            </p>
                        </div>
                    </div>

                    {/* Timeline List - Plain, Clean & Unhighlighted */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-100">
                        <div>
                            <span className="text-xs font-bold text-slate-800 block mb-0.5">2002</span>
                            <h4 className="text-xs font-semibold text-slate-800 mb-0.5">Institute Established</h4>
                            <p className="text-slate-500 text-[11px] leading-snug">Founded with a focus on education and professional skills.</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-800 block mb-0.5">Pre-2026</span>
                            <h4 className="text-xs font-semibold text-slate-800 mb-0.5">Society Operations</h4>
                            <p className="text-slate-500 text-[11px] leading-snug">Operated under New Aayush Education Welfare Society.</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-800 block mb-0.5">2026</span>
                            <h4 className="text-xs font-semibold text-slate-800 mb-0.5">Management Transition</h4>
                            <p className="text-slate-500 text-[11px] leading-snug">Management taken over by Atri Admission Anytime Pvt. Ltd.</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-800 block mb-0.5">Today</span>
                            <h4 className="text-xs font-semibold text-slate-800 mb-0.5">Evolving Ecosystem</h4>
                            <p className="text-slate-500 text-[11px] leading-snug">Focused on Education, Skills, Technology &amp; Careers.</p>
                        </div>
                    </div>
                </div>

                {/* 3. OUR EDUCATION & TRAINING ECOSYSTEM */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="mb-4">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Ecosystem
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                            Our Education &amp; Training Ecosystem
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {/* 3.1 IT & Technology Education */}
                        <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2.5">
                                    <Cpu className="w-4 h-4 text-[#0055ff]" />
                                    <h3 className="text-xs sm:text-[13px] font-bold text-[#0a2540]">
                                        IT &amp; TECHNOLOGY EDUCATION
                                    </h3>
                                </div>
                                <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
                                    Practical and industry-relevant skills across core technological areas:
                                </p>
                                <div className="space-y-1">
                                    {[
                                        'Computer & Office Applications',
                                        'Web & Software Development',
                                        'Programming & Full Stack Development',
                                        'Artificial Intelligence & Generative AI',
                                        'Data Analytics & Business Intelligence',
                                        'Cloud, DevOps & Cyber Security',
                                        'Mobile App Development',
                                        'UI/UX & Digital Design',
                                        'Digital Marketing & E-Commerce',
                                        'Computer Hardware & Networking'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 p-1 rounded bg-white text-[11px] font-medium text-slate-700 border border-slate-100">
                                            <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3.2 University & Distance Education */}
                        <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2.5">
                                    <GraduationCap className="w-4 h-4 text-[#0055ff]" />
                                    <h3 className="text-xs sm:text-[13px] font-bold text-[#0a2540]">
                                        UNIVERSITY &amp; DISTANCE EDUCATION
                                    </h3>
                                </div>
                                <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
                                    Guidance and support for eligible University and Distance programs:
                                </p>
                                <div className="space-y-1 mb-2.5">
                                    {[
                                        'Management & Business',
                                        'Commerce & Finance',
                                        'Computer Applications & IT',
                                        'Arts & Humanities',
                                        'Science',
                                        'Education',
                                        'Healthcare & Allied Areas',
                                        'Engineering & Technology',
                                        'Vocational & Professional Education'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 p-1 rounded bg-white text-[11px] font-medium text-slate-700 border border-slate-100">
                                            <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-slate-500 italic bg-amber-50/50 p-2 rounded border border-amber-200/40">
                                    Availability and certification are subject to the rules of respective Universities.
                                </p>
                            </div>
                        </div>

                        {/* 3.3 Professional & Career Development */}
                        <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2.5">
                                    <Briefcase className="w-4 h-4 text-[#0055ff]" />
                                    <h3 className="text-xs sm:text-[13px] font-bold text-[#0a2540]">
                                        PROFESSIONAL &amp; CAREER DEVELOPMENT
                                    </h3>
                                </div>
                                <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
                                    Skill-based learning opportunities tailored for varied learner stages:
                                </p>
                                <div className="space-y-1 mb-2.5">
                                    {[
                                        'School & College Students',
                                        'Diploma & ITI Students',
                                        'Graduates & Freshers',
                                        'Working Professionals',
                                        'Career Changers',
                                        'Job Seekers',
                                        'Business & Professional Learners'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 p-1 rounded bg-white text-[11px] font-medium text-slate-700 border border-slate-100">
                                            <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-blue-50/60 border border-blue-100/60 p-2 rounded">
                                    <p className="text-[11px] font-medium text-[#004b93] leading-snug">
                                        Helps learners gain practical skills and prepare for professional opportunities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. OUR LEARNING MODEL (From Education to Employability) */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full mb-3.5">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Learning Model
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                            From Education to Employability
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-3.5">
                        <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/60">
                            <span className="text-[11px] font-bold text-[#0055ff] block mb-0.5">01 • EDUCATION</span>
                            <p className="text-[11px] text-slate-600 leading-snug">Structured academic and professional foundational learning.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/60">
                            <span className="text-[11px] font-bold text-slate-700 block mb-0.5">02 • SKILL DEVELOPMENT</span>
                            <p className="text-[11px] text-slate-600 leading-snug">Practical technical, digital and professional capabilities.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/60">
                            <span className="text-[11px] font-bold text-slate-700 block mb-0.5">03 • PRACTICAL EXPOSURE</span>
                            <p className="text-[11px] text-slate-600 leading-snug">Assignments, practical exercises and project-based work.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/60">
                            <span className="text-[11px] font-bold text-slate-700 block mb-0.5">04 • INDUSTRY EXPOSURE</span>
                            <p className="text-[11px] text-slate-600 leading-snug">Live projects, internships and interaction with professionals.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/60">
                            <span className="text-[11px] font-bold text-slate-700 block mb-0.5">05 • CAREER DEVELOPMENT</span>
                            <p className="text-[11px] text-slate-600 leading-snug">Resume building, interview preparation and placement assistance.</p>
                        </div>
                    </div>

                    {/* Progress Flow Banner - Subtle */}
                    <div className="py-2 px-3 rounded-lg bg-slate-100 text-slate-700 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold border border-slate-200/60">
                        <span>LEARN</span>
                        <span className="text-slate-400">→</span>
                        <span>PRACTICE</span>
                        <span className="text-slate-400">→</span>
                        <span>EXPERIENCE</span>
                        <span className="text-slate-400">→</span>
                        <span>PREPARE</span>
                        <span className="text-slate-400">→</span>
                        <span>PROGRESS</span>
                    </div>
                </div>

                {/* 5. CAREER GUIDANCE */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full mb-3">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Advisory
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                            Career Guidance — Professional Guidance for Better Decisions
                        </h2>
                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                            Aayush Institute provides <strong>career guidance at no additional cost</strong> to help learners understand suitable education and skill pathways.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
                        {[
                            'Career planning',
                            'Course selection',
                            'Industry trends',
                            'Career pathways',
                            'Technical skills',
                            'Higher education',
                            'Resume development',
                            'Interview prep',
                            'Internship guidance',
                            'Job readiness'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200/50">
                                <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                <span className="text-slate-700 text-[11px] font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                        Our objective is to help students make informed education and career decisions based on their interests, qualifications, and career goals.
                    </p>
                </div>

                {/* 6. INDUSTRY EXPOSURE & LIVE PROJECT - Combined 2-Col Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* 6. Industry Exposure & Internships */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                                Workplace Experience
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-[#0a2540] mb-1.5">
                                Industry Exposure &amp; Internships
                            </h3>
                            <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
                                Where available, eligible students may access:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                                {[
                                    'Corporate Internships',
                                    'Paid Opportunities',
                                    'Live Projects',
                                    'Industry Projects',
                                    'Practical Assignments',
                                    'Technical Mentoring',
                                    'Workplace Exposure',
                                    'Project Documentation'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 p-1.5 rounded bg-slate-50 text-[11px] font-medium text-slate-700 border border-slate-100">
                                        <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 italic pt-2 border-t border-slate-100">
                            Internship opportunities are subject to availability, eligibility, and selection by the concerned company.
                        </p>
                    </div>

                    {/* 7. Live Project & Practical Learning */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                                Hands-on Learning
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-[#0a2540] mb-1.5">
                                Live Project &amp; Practical Learning
                            </h3>
                            <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
                                Practical assignments covering key domains:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                                {[
                                    'Web & Software Development',
                                    'Mobile Applications',
                                    'AI & Data Analytics',
                                    'Cloud & IT Systems',
                                    'Cyber Security',
                                    'UI/UX & Digital Design',
                                    'Digital Business Tools'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 p-1.5 rounded bg-slate-50 text-[11px] font-medium text-slate-700 border border-slate-100">
                                        <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/50">
                            Build practical understanding, project documentation skills and a working portfolio.
                        </p>
                    </div>
                </div>

                {/* 8. CAREER & PLACEMENT SUPPORT */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full mb-3">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Recruitment Readiness
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                            Career &amp; Placement Support
                        </h2>
                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                            Career and placement assistance designed to help eligible students prepare for professional opportunities.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 mb-3">
                        {[
                            'Resume & CV Development',
                            'Interview Preparation',
                            'Mock Interviews',
                            'Technical Interview Prep',
                            'HR Interview Prep',
                            'Workplace Skills',
                            'Job Role Guidance',
                            'Recruitment Updates',
                            'Placement Assistance'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200/50">
                                <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                <span className="text-slate-700 text-[11px] font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                        Placement or employment is not guaranteed. Final recruitment decisions are made solely by the hiring employer.
                    </p>
                </div>

                {/* 9. OUR CERTIFICATE & QUALIFICATION APPROACH */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full mb-2.5">
                        <div className="inline-flex items-center gap-1.5 text-[#0055cc] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                            <Shield className="w-3 h-3" />
                            <span>Transparency &amp; Compliance</span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                            Certificate &amp; Qualification Approach
                        </h2>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                        <p>
                            Aayush Institute awards certificates for eligible students who successfully complete applicable Institute-conducted courses and fulfill course criteria.
                        </p>
                        <p>
                            The Institute does not make any blanket guarantee that Institute-issued certificates are automatically accepted for every Government or private recruitment process. Acceptance depends strictly on the requirements of the recruiting authority or employer.
                        </p>
                        <p>
                            For University or third-party programs, qualifications and certifications are governed by the respective University or awarding body.
                        </p>
                    </div>
                </div>

                {/* 10. WHO WE SERVE & 11. WHY AAYUSH INSTITUTE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Who We Serve */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Learner Profiles
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540] mb-3">
                            Who We Serve
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                { title: 'Students', desc: 'Build academic and practical skills alongside education.' },
                                { title: 'Graduates & Freshers', desc: 'Develop job-oriented technical and professional capabilities.' },
                                { title: 'Working Professionals', desc: 'Upgrade skills and explore career advancement.' },
                                { title: 'Career Changers', desc: 'Build skills for entering new domains.' },
                                { title: 'Job Seekers', desc: 'Improve technical, digital and workplace readiness.' },
                                { title: 'Business Learners', desc: 'Practical digital, business and productivity tools.' }
                            ].map((item, idx) => (
                                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/50">
                                    <h4 className="text-xs font-semibold text-[#0a2540] mb-0.5">{item.title}</h4>
                                    <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Aayush Institute */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Key Pillars
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540] mb-3">
                            Why Aayush Institute
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                { title: 'Since 2002', desc: 'Over two decades associated with professional learning.' },
                                { title: 'Practical Learning', desc: 'Focus on applying knowledge through exercises and projects.' },
                                { title: 'Technology Skills', desc: 'Programs in IT, software, AI, data, and digital business.' },
                                { title: 'University Programs', desc: 'Guidance and support for eligible Distance/Online degrees.' },
                                { title: 'Career Guidance', desc: 'Advisory available at no additional cost.' },
                                { title: 'Industry Exposure', desc: 'Live projects and internships wherever applicable.' }
                            ].map((item, idx) => (
                                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/50">
                                    <h4 className="text-xs font-semibold text-[#0055ff] mb-0.5">{item.title}</h4>
                                    <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 12. VISION & MISSION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                    {/* Vision */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Our Vision
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-[#0a2540] mb-1.5">
                            Accessible &amp; Relevant Learning Pathways
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed">
                            To contribute to an education ecosystem where learners can access relevant knowledge, practical skills, professional exposure and informed career guidance to support their long-term growth.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Our Mission
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-[#0a2540] mb-1.5">
                            Educate • Develop • Connect • Progress
                        </h3>
                        <div className="space-y-1 text-xs text-slate-600">
                            <p><strong className="text-slate-800">Educate:</strong> Structured and accessible learning opportunities.</p>
                            <p><strong className="text-slate-800">Develop:</strong> Practical, technical and professional capabilities.</p>
                            <p><strong className="text-slate-800">Connect:</strong> Industry exposure and professional interaction.</p>
                            <p><strong className="text-slate-800">Progress:</strong> Support learners in making informed career decisions.</p>
                        </div>
                    </div>
                </div>

                {/* 12.1 DYNAMIC FACULTY & MENTORS SHOWCASE */}
                {facultyList.length > 0 && (
                    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                                <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                                    Academic Leadership
                                </span>
                                <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                                    Distinguished Faculty &amp; Industry Mentors
                                </h2>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Learn from certified educators with decades of specialized corporate and research experience.
                                </p>
                            </div>
                            <NavLink
                                to="/Courses"
                                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition shrink-0"
                            >
                                <span>Explore All Courses</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </NavLink>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                            {facultyList.map((faculty, idx) => (
                                <div
                                    key={faculty._id || idx}
                                    className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-2.5">
                                            {faculty.image ? (
                                                <img
                                                    src={faculty.image}
                                                    alt={faculty.name}
                                                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-100 shadow-xs shrink-0"
                                                />
                                            ) : (
                                                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                                                    {faculty.name ? faculty.name.charAt(0) : 'F'}
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <h4 className="text-xs font-bold text-[#0a2540] truncate group-hover:text-blue-600 transition">
                                                    {faculty.name}
                                                </h4>
                                                <p className="text-[11px] font-semibold text-blue-600 truncate">
                                                    {faculty.designation || 'Senior Faculty'}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-2">
                                            {faculty.bio || faculty.course || faculty.department}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10.5px]">
                                        <span className="text-slate-500 truncate max-w-[120px] font-medium">
                                            {faculty.department}
                                        </span>
                                        <NavLink
                                            to="/ContactUs"
                                            className="font-bold text-blue-600 hover:text-blue-800"
                                        >
                                            Inquire →
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 13. LOOKING AHEAD */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Forward Vision
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540] mb-1.5">
                            Looking Ahead
                        </h2>
                        <p className="text-slate-600 text-xs leading-relaxed mb-2">
                            Since 2002, the education and technology landscape has continued to evolve. Aayush Institute aims to continue evolving by expanding relevant learning opportunities across technology, professional education, and career development.
                        </p>
                        <p className="text-xs font-semibold text-[#004b93]">
                            Our focus remains simple: Relevant Education • Practical Skills • Industry Exposure • Career Development.
                        </p>
                    </div>
                </div>

                {/* 14. START YOUR LEARNING JOURNEY */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="w-full mb-3">
                        <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                            Get Started
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                            Start Your Learning Journey
                        </h2>
                        <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                            Whether starting your first course or preparing for your career, explore the pathway relevant to your goals:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        <NavLink
                            to="/Courses"
                            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50/70 border border-slate-200/60 hover:border-blue-200 transition-colors group flex flex-col justify-between"
                        >
                            <div>
                                <h4 className="text-xs font-bold text-[#0a2540] group-hover:text-[#0055ff] mb-0.5">
                                    Explore Courses
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-snug mb-2">
                                    IT, software and skill-based programs.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0055ff]">
                                <span>Browse Courses</span>
                                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </NavLink>

                        <NavLink
                            to="/UniversityCourses"
                            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50/70 border border-slate-200/60 hover:border-blue-200 transition-colors group flex flex-col justify-between"
                        >
                            <div>
                                <h4 className="text-xs font-bold text-[#0a2540] group-hover:text-[#0055ff] mb-0.5">
                                    University Degrees
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-snug mb-2">
                                    Online, Distance and professional degrees.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0055ff]">
                                <span>Explore Degrees</span>
                                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50/70 border border-slate-200/60 hover:border-blue-200 transition-colors group flex flex-col justify-between"
                        >
                            <div>
                                <h4 className="text-xs font-bold text-[#0a2540] group-hover:text-[#0055ff] mb-0.5">
                                    Career Guidance
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-snug mb-2">
                                    Speak with our team at no additional cost.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0055ff]">
                                <span>Talk to Advisor</span>
                                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50/70 border border-slate-200/60 hover:border-blue-200 transition-colors group flex flex-col justify-between"
                        >
                            <div>
                                <h4 className="text-xs font-bold text-[#0a2540] group-hover:text-[#0055ff] mb-0.5">
                                    Contact Us
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-snug mb-2">
                                    Course and admission enquiries.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0055ff]">
                                <span>Contact Team</span>
                                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </NavLink>
                    </div>
                </div>

                {/* 15. INSTITUTIONAL & CONTACT INFORMATION - Calm, Compact & Professional */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs text-center">
                    <div className="w-full space-y-3">
                        <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0055cc] text-[10px] font-semibold tracking-wider uppercase border border-blue-100 mb-1">
                                Established: 2002
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-[#0a2540]">
                                AAYUSH INSTITUTE OF PROFESSIONAL STUDIES
                            </h3>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                                Operated &amp; Managed by Atri Admission Anytime Private Limited
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 pt-3 border-t border-slate-100 text-xs">
                            {/* Address */}
                            <a
                                href="https://www.google.com/search?q=aayush+institute+of+professional+studies"
                                target="_blank"
                                rel="noreferrer"
                                className="lg:col-span-5 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/50 border border-slate-200/50 hover:border-blue-200 flex flex-col items-center text-center justify-center transition-all group"
                                title="View on Google"
                            >
                                <MapPin className="w-3.5 h-3.5 text-[#0055ff] mb-1 group-hover:scale-110 transition-transform" />
                                <h4 className="font-semibold text-slate-700 uppercase text-[9.5px] tracking-wider mb-0.5">Address</h4>
                                <p className="text-slate-600 group-hover:text-blue-700 text-[11px] leading-snug">
                                    S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006
                                </p>
                            </a>

                            {/* Phone */}
                            <div className="lg:col-span-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200/50 flex flex-col items-center text-center justify-center">
                                <Phone className="w-3.5 h-3.5 text-[#0055ff] mb-1" />
                                <h4 className="font-semibold text-slate-700 uppercase text-[9.5px] tracking-wider mb-0.5">Phone</h4>
                                <div className="flex flex-wrap items-center justify-center gap-1.5 text-slate-600 text-[11px] font-medium whitespace-nowrap">
                                    <a href="tel:09350157447" className="hover:text-[#0055ff] transition-colors font-bold">093501 57447</a>
                                    <span className="text-slate-300">•</span>
                                    <a href="tel:+919311050670" className="hover:text-[#0055ff] transition-colors">+91-9311050670</a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="lg:col-span-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/50 flex flex-col items-center text-center justify-center">
                                <Mail className="w-3.5 h-3.5 text-[#0055ff] mb-1" />
                                <h4 className="font-semibold text-slate-700 uppercase text-[9.5px] tracking-wider mb-0.5">Email</h4>
                                <a href="mailto:info@aayushinstitute.com" className="text-slate-600 hover:text-[#0055ff] text-[11px] whitespace-nowrap">
                                    info@aayushinstitute.com
                                </a>
                            </div>

                            {/* Website */}
                            <div className="lg:col-span-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/50 flex flex-col items-center text-center justify-center">
                                <Globe className="w-3.5 h-3.5 text-[#0055ff] mb-1" />
                                <h4 className="font-semibold text-slate-700 uppercase text-[9.5px] tracking-wider mb-0.5">Website</h4>
                                <a href="https://www.aayushinstitute.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-[#0055ff] text-[11px] whitespace-nowrap">
                                    www.aayushinstitute.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
