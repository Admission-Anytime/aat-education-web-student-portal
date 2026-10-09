import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    HelpCircle, ChevronDown, Search, BookOpen, GraduationCap,
    Briefcase, Award, Users, Shield, Cpu, Phone, Mail, MapPin,
    Sparkles, CheckCircle2, Building, MessageSquare, Clock, Star,
    Check, ArrowRight, ChevronsUpDown, ShieldCheck, HeartHandshake
} from 'lucide-react';

const faqCategories = [
    {
        id: 'general', label: 'About Institute', icon: Building, color: 'blue',
        faqs: [
            { q: 'What is Aayush Institute of Professional Studies?', a: 'Aayush Institute of Professional Studies is a private education and professional training institute established in 2002. It is focused on IT education, professional skill development, university and distance education, practical training, and career-oriented learning. For more than two decades, the Institute has supported students, graduates, working professionals, and career aspirants in developing academic knowledge, technical skills, and professional capabilities.' },
            { q: 'When was Aayush Institute established?', a: 'Aayush Institute of Professional Studies was established in 2002, with a focus on education and professional skill development. It has been associated with education and training for over two decades.' },
            { q: 'Who currently manages Aayush Institute?', a: 'Since 2026, Aayush Institute of Professional Studies is managed and operated by Atri Admission Anytime Private Limited, a private limited company incorporated under the applicable laws of India. Prior to 2026, the Institute operated under New Aayush Education Welfare Society, registered in Delhi under the Societies Registration Act, 1860.' },
            { q: 'Where is Aayush Institute located?', a: 'Aayush Institute of Professional Studies is located at S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006. You can reach us by phone at 093501 57447, +91-9311050670, or 0120-2611111, or by email at info@aayushinstitute.com.' },
            { q: 'What is the vision of Aayush Institute?', a: 'Our vision is to contribute to an education ecosystem where learners can access relevant knowledge, practical skills, professional exposure, and informed career guidance to support their long-term development. Our mission is to Educate, Develop, Connect, and help learners Progress.' },
            { q: 'Who can benefit from Aayush Institute?', a: 'Aayush Institute supports a wide range of learners including: School and College Students (building academic and practical skills), Graduates and Freshers (developing job-oriented capabilities), Working Professionals (upgrading skills), Career Changers (building skills for new directions), Job Seekers (improving technical and digital readiness), and Business and Professional Learners (developing digital, business and productivity skills).' },
        ]
    },
    {
        id: 'courses', label: 'Courses & Programmes', icon: Cpu, color: 'indigo',
        faqs: [
            { q: 'What types of courses does Aayush Institute offer?', a: 'Aayush Institute offers a wide range of programmes including: IT and Technology Courses, Professional and Skill-Based Courses, Short-Term Certificate Courses, Live Project Training, Corporate Training, Career Development Programmes, University and Distance Education Programmes, Online Education, Vocational and Professional Programmes, and Internship and Career Support Services.' },
            { q: 'What IT and technology subjects are covered?', a: 'Our technology programmes cover: Computer and Office Applications, Web and Software Development, Programming and Full Stack Development, Artificial Intelligence and Generative AI, Data Analytics and Business Intelligence, Cloud, DevOps and Cyber Security, Mobile App Development, UI/UX and Digital Design, Digital Marketing and E-Commerce, and Computer Hardware and Networking.' },
            { q: 'Can I join courses if I am a working professional?', a: 'Yes. Aayush Institute offers programmes specifically designed for working professionals who want to upgrade skills, explore advanced technology, or pursue additional education. Our flexible training approach helps working professionals balance learning with their professional commitments.' },
            { q: 'Are courses available for school and college students?', a: 'Yes. We offer skill-based programmes for school and college students to help them build academic and practical skills alongside their regular education. These programmes are designed to prepare students for professional opportunities at an early stage.' },
            { q: 'Can the Institute change the course schedule or curriculum?', a: 'Yes. The Institute may make reasonable changes to batch timings, faculty, classroom arrangements, course schedules, delivery modes, curriculum, software/tools, or project requirements when required for academic, operational, technology, or other reasonable reasons. The Institute makes reasonable efforts to communicate material changes to affected students.' },
        ]
    },
    {
        id: 'university', label: 'University Education', icon: GraduationCap, color: 'purple',
        faqs: [
            { q: 'Does Aayush Institute offer University degree programmes?', a: 'Aayush Institute provides guidance and support for eligible University, Online and Distance Education programmes offered by recognised Universities. Students can explore programmes across Management and Business, Commerce and Finance, Computer Applications and IT, Arts and Humanities, Science, Education, Healthcare and Allied Areas, Engineering and Technology, and Vocational and Professional Education.' },
            { q: 'Who controls admission, examination and certification for University programmes?', a: 'For University or third-party programmes, the concerned University or organisation remains responsible for its applicable admission requirements, eligibility, academic rules, examination, certification, recognition, and other programme-specific policies. Aayush Institute policies do not override the rules of the concerned University or third-party organisation.' },
            { q: 'Is programme availability guaranteed for all University courses?', a: 'No. Programme availability, eligibility, mode of study, academic requirements, and certification are subject to the rules of the respective University or awarding organisation. Students are advised to verify applicable requirements with the concerned University before enrolment.' },
            { q: 'What is the refund policy for University programmes?', a: 'The 7-day refund policy applicable to Aayush Institute-conducted courses does not apply to University or third-party programmes. For University programmes, the refund and cancellation policy of the concerned University or third-party organisation applies. Students should review the applicable University/third-party refund terms before enrolment or payment.' },
        ]
    },
    {
        id: 'career', label: 'Career Guidance', icon: Briefcase, color: 'emerald',
        faqs: [
            { q: 'Does Aayush Institute provide career guidance?', a: 'Yes. Aayush Institute provides career guidance at no additional cost to eligible students. Career guidance may include: career planning, course and skill selection, industry trends, career pathways, technical skill requirements, higher education options, resume and profile development, interview preparation, internship guidance, and employment preparation.' },
            { q: 'Is career guidance free of charge?', a: 'Yes. Career guidance is available at no additional cost to eligible students. Our objective is to help learners make informed education and career decisions based on their interests, qualifications, and career goals.' },
            { q: 'Does career guidance guarantee a job or career outcome?', a: 'No. Career guidance is advisory in nature and does not constitute a guarantee of admission, employment, Government recruitment, salary, or any specific career outcome. Outcomes depend on the student\'s qualifications, skills, performance, and the selection criteria of the relevant organisation.' },
            { q: 'What placement support does the Institute provide?', a: 'The Institute provides placement and career assistance including: Resume and CV Development, Interview Preparation, Mock Interviews, Technical Interview Preparation, HR Interview Preparation, Communication and Workplace Skills, Job Role Guidance, Recruitment Opportunity Updates, and Placement Assistance. Placement or employment is not guaranteed - final recruitment decisions are made by the concerned employer.' },
        ]
    },
    {
        id: 'internship', label: 'Internship & Projects', icon: Star, color: 'amber',
        faqs: [
            { q: 'Does Aayush Institute offer internship opportunities?', a: 'Where available, eligible students may receive opportunities for Corporate Internships, Paid Internship Opportunities, Live Projects, Industry-Based Projects, Practical Assignments, Technical Mentoring, Workplace Exposure, Project Documentation, and Project Presentations. Internship opportunities are subject to availability, eligibility, company requirements, and selection by the concerned organisation.' },
            { q: 'Are internships paid?', a: 'Where an internship is paid, the stipend or compensation is determined by the organisation offering the internship, not by Aayush Institute. Aayush Institute does not guarantee any specific stipend amount.' },
            { q: 'Does an internship guarantee a job?', a: 'No. Internship participation does not guarantee employment or placement. Final selection, salary, job location, role, and employment conditions are determined solely by the concerned employer.' },
            { q: 'What is Live Project Training?', a: 'Live Project Training is designed to provide practical exposure and project-based learning. Depending on the programme, students may work on projects covering Web and Software Development, Mobile Applications, AI and Data, Cloud and IT, Cyber Security, UI/UX and Digital Design, and Digital Business. Students develop practical understanding, project experience, documentation skills, and portfolio-oriented work.' },
            { q: 'What areas do live projects cover?', a: 'Live projects may cover Web and Software Development, Mobile Applications, AI and Data Analytics, Cloud and IT Systems, Cyber Security, UI/UX and Digital Design, and Digital Business Tools - depending on the programme and availability.' },
        ]
    },
    {
        id: 'certificates', label: 'Certificates & Recognition', icon: Award, color: 'rose',
        faqs: [
            { q: 'Does Aayush Institute provide certificates?', a: 'Yes. Aayush Institute provides certificates for eligible students who successfully complete applicable Institute-conducted courses and fulfil the prescribed course requirements, including attendance, assessments, project requirements, document submission, and payment of applicable dues.' },
            { q: 'Are Aayush Institute certificates valid for Government jobs?', a: 'Aayush Institute does not make any blanket claim or guarantee that its Institute-issued certificates are automatically valid or sufficient for every Government job or recruitment process. Acceptance of a certificate for Government employment depends on the requirements of the concerned Government department, recruiting authority, and the applicable recruitment notification. Students are responsible for verifying eligibility requirements before relying on any certificate for Government recruitment.' },
            { q: 'Are Institute certificates equivalent to a University degree?', a: 'No. Unless specifically recognised or approved by the competent authority, an Institute-issued certificate should not be treated as equivalent to a University degree, statutory qualification, Government-recognised qualification, professional licence, or a qualification issued by a regulatory authority. Students must verify the applicable recognition or equivalence requirements for their intended purpose.' },
            { q: 'Do private employers accept Aayush Institute certificates?', a: 'Private employers establish their own recruitment, qualification, and skill requirements. An Aayush Institute certificate may be considered by an employer as evidence of training, learning, or skill development, subject to the employer\'s own policies and selection criteria. The Institute does not guarantee that any particular employer will accept a certificate or select a student for employment.' },
        ]
    },
    {
        id: 'fees', label: 'Fees & Refund Policy', icon: ShieldCheck, color: 'cyan',
        faqs: [
            { q: 'What fees does Aayush Institute charge?', a: 'Fees may include, depending on the programme: Tuition/Course Fee, Registration Fee, Admission Fee, Application/Processing Fee, Documentation/Verification Charges, Examination Fee, Certification Fee, University/Third-Party Charges, and other programme-specific charges. Applicable fees are communicated through the relevant admission or programme information.' },
            { q: 'What is the refund policy for Aayush Institute courses?', a: 'For Institute-conducted courses: An eligible student may request a refund of the Tuition/Course Fee within 7 calendar days from the date on which the complete applicable Tuition/Course Fee is received by the Institute. A 10% deduction applies towards administrative and processing costs. After the 7-day period, the course fee is ordinarily non-refundable, subject to applicable law.' },
            { q: 'When does the 7-day refund period start?', a: 'The 7-day refund period begins from the date on which the complete applicable Tuition/Course Fee is received and recorded by the Institute. For instalment payments, it starts from the date the complete fee is received - not from each individual instalment. The date the Institute receives the complete written refund request is used to determine if the request is within the period.' },
            { q: 'Can I get a refund if I stop attending classes?', a: 'Non-attendance, discontinuation of the course, personal circumstances, employment, relocation, change of career plans, or failure to use facilities or course content does not automatically create a refund entitlement or extend the applicable refund period.' },
            { q: 'Are registration and admission fees refundable?', a: 'Registration, admission, application, processing, documentation, verification, administrative, examination, and other specifically identified charges are non-refundable, unless expressly stated otherwise in writing or required by applicable law.' },
            { q: 'How do I request a refund?', a: 'A refund request must be submitted in writing within the prescribed 7-day period, and may need to include: student identification details, admission/enrolment details, payment receipt, bank/payment details, reason for request (where required), and other documents reasonably requested by the Institute. Approved refunds are normally processed through the applicable banking or payment channel after verification.' },
        ]
    },
    {
        id: 'admission', label: 'Admission & Conduct', icon: Users, color: 'teal',
        faqs: [
            { q: 'What documents are required for admission?', a: 'Students are required to provide complete, accurate, and genuine information at the time of application and admission. The Institute may request documents for eligibility verification, admission processing, identity verification, academic records, examination or assessment, certification, University/third-party enrolment, and regulatory or administrative requirements.' },
            { q: 'What happens if I submit false or forged documents?', a: 'Submission of false, forged, altered, misleading, or invalid documents may result in: cancellation or withdrawal of admission, suspension or termination of course access, withdrawal of benefits or services, cancellation or invalidation of an Institute-issued certificate, reporting to the concerned authority, and other action permitted under applicable law. Fees paid in connection with admission may be non-refundable in such circumstances.' },
            { q: 'What conduct is expected from students?', a: 'Students are expected to maintain appropriate conduct and respect Institute staff, faculty, students, visitors, facilities, and applicable rules. The Institute may take appropriate action for misconduct, harassment, threatening behaviour, fraud, misrepresentation, damage to property, unauthorised access, academic misconduct, or disruption of academic activities. Serious or repeated violations may result in suspension or termination of enrolment.' },
            { q: 'Does admission guarantee eligibility for all purposes?', a: 'No. Admission does not remove the student\'s responsibility to satisfy the eligibility requirements of the particular course, University, awarding body, employer, or other concerned organisation. Students must independently verify their eligibility for any specific purpose such as Government jobs, University admissions, or professional licences.' },
        ]
    }
];

const colorThemeMap = {
    blue: {
        headerBg: 'from-sky-50 via-blue-50/60 to-white',
        border: 'border-blue-200/80',
        hoverBorder: 'hover:border-blue-400',
        iconBg: 'bg-blue-600 text-white',
        iconLight: 'bg-blue-100 text-blue-700',
        text: 'text-blue-700',
        titleHover: 'group-hover:text-blue-600',
        badge: 'bg-blue-100/90 text-blue-700 border-blue-200',
        answerBg: 'bg-blue-50/40 border-blue-300',
        pill: 'bg-blue-50/80 text-blue-700 border-blue-200/90 hover:bg-blue-100',
        activePill: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25',
        dot: 'bg-blue-500',
    },
    indigo: {
        headerBg: 'from-indigo-50 via-purple-50/50 to-white',
        border: 'border-indigo-200/80',
        hoverBorder: 'hover:border-indigo-400',
        iconBg: 'bg-indigo-600 text-white',
        iconLight: 'bg-indigo-100 text-indigo-700',
        text: 'text-indigo-700',
        titleHover: 'group-hover:text-indigo-600',
        badge: 'bg-indigo-100/90 text-indigo-700 border-indigo-200',
        answerBg: 'bg-indigo-50/40 border-indigo-300',
        pill: 'bg-indigo-50/80 text-indigo-700 border-indigo-200/90 hover:bg-indigo-100',
        activePill: 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25',
        dot: 'bg-indigo-500',
    },
    purple: {
        headerBg: 'from-purple-50 via-fuchsia-50/50 to-white',
        border: 'border-purple-200/80',
        hoverBorder: 'hover:border-purple-400',
        iconBg: 'bg-purple-600 text-white',
        iconLight: 'bg-purple-100 text-purple-700',
        text: 'text-purple-700',
        titleHover: 'group-hover:text-purple-600',
        badge: 'bg-purple-100/90 text-purple-700 border-purple-200',
        answerBg: 'bg-purple-50/40 border-purple-300',
        pill: 'bg-purple-50/80 text-purple-700 border-purple-200/90 hover:bg-purple-100',
        activePill: 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/25',
        dot: 'bg-purple-500',
    },
    emerald: {
        headerBg: 'from-emerald-50 via-teal-50/50 to-white',
        border: 'border-emerald-200/80',
        hoverBorder: 'hover:border-emerald-400',
        iconBg: 'bg-emerald-600 text-white',
        iconLight: 'bg-emerald-100 text-emerald-700',
        text: 'text-emerald-700',
        titleHover: 'group-hover:text-emerald-600',
        badge: 'bg-emerald-100/90 text-emerald-700 border-emerald-200',
        answerBg: 'bg-emerald-50/40 border-emerald-300',
        pill: 'bg-emerald-50/80 text-emerald-700 border-emerald-200/90 hover:bg-emerald-100',
        activePill: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25',
        dot: 'bg-emerald-500',
    },
    amber: {
        headerBg: 'from-amber-50 via-orange-50/50 to-white',
        border: 'border-amber-200/80',
        hoverBorder: 'hover:border-amber-400',
        iconBg: 'bg-amber-500 text-white',
        iconLight: 'bg-amber-100 text-amber-800',
        text: 'text-amber-800',
        titleHover: 'group-hover:text-amber-600',
        badge: 'bg-amber-100/90 text-amber-800 border-amber-200',
        answerBg: 'bg-amber-50/40 border-amber-300',
        pill: 'bg-amber-50/80 text-amber-800 border-amber-200/90 hover:bg-amber-100',
        activePill: 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25',
        dot: 'bg-amber-500',
    },
    rose: {
        headerBg: 'from-rose-50 via-pink-50/50 to-white',
        border: 'border-rose-200/80',
        hoverBorder: 'hover:border-rose-400',
        iconBg: 'bg-rose-600 text-white',
        iconLight: 'bg-rose-100 text-rose-700',
        text: 'text-rose-700',
        titleHover: 'group-hover:text-rose-600',
        badge: 'bg-rose-100/90 text-rose-700 border-rose-200',
        answerBg: 'bg-rose-50/40 border-rose-300',
        pill: 'bg-rose-50/80 text-rose-700 border-rose-200/90 hover:bg-rose-100',
        activePill: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/25',
        dot: 'bg-rose-500',
    },
    cyan: {
        headerBg: 'from-cyan-50 via-sky-50/50 to-white',
        border: 'border-cyan-200/80',
        hoverBorder: 'hover:border-cyan-400',
        iconBg: 'bg-cyan-600 text-white',
        iconLight: 'bg-cyan-100 text-cyan-800',
        text: 'text-cyan-800',
        titleHover: 'group-hover:text-cyan-600',
        badge: 'bg-cyan-100/90 text-cyan-800 border-cyan-200',
        answerBg: 'bg-cyan-50/40 border-cyan-300',
        pill: 'bg-cyan-50/80 text-cyan-800 border-cyan-200/90 hover:bg-cyan-100',
        activePill: 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/25',
        dot: 'bg-cyan-500',
    },
    teal: {
        headerBg: 'from-teal-50 via-emerald-50/50 to-white',
        border: 'border-teal-200/80',
        hoverBorder: 'hover:border-teal-400',
        iconBg: 'bg-teal-600 text-white',
        iconLight: 'bg-teal-100 text-teal-800',
        text: 'text-teal-800',
        titleHover: 'group-hover:text-teal-600',
        badge: 'bg-teal-100/90 text-teal-800 border-teal-200',
        answerBg: 'bg-teal-50/40 border-teal-300',
        pill: 'bg-teal-50/80 text-teal-800 border-teal-200/90 hover:bg-teal-100',
        activePill: 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/25',
        dot: 'bg-teal-500',
    },
};

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFaqs, setOpenFaqs] = useState({ 'general-0': true, 'courses-0': true }); // default first open for engagement

    const toggleFaq = (catId, idx) => {
        const key = `${catId}-${idx}`;
        setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isFaqOpen = (catId, idx) => !!openFaqs[`${catId}-${idx}`];

    const expandAll = () => {
        const allOpen = {};
        faqCategories.forEach(cat => {
            cat.faqs.forEach((_, idx) => {
                allOpen[`${cat.id}-${idx}`] = true;
            });
        });
        setOpenFaqs(allOpen);
    };

    const collapseAll = () => {
        setOpenFaqs({});
    };

    const filteredCategories = faqCategories
        .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
        .map(cat => ({
            ...cat,
            faqs: cat.faqs.filter(faq => {
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase();
                return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
            })
        }))
        .filter(cat => cat.faqs.length > 0);

    const totalFaqs = faqCategories.reduce((acc, c) => acc + c.faqs.length, 0);
    const totalFiltered = filteredCategories.reduce((a, c) => a + c.faqs.length, 0);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800">

            {/* ── 1. HERO SECTION WITH SOFT PASTEL GLOW ── */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#eaf4ff] via-[#f3f7fd] to-[#f8fafc] border-b border-slate-200/70 pt-8 pb-10 sm:pt-12 sm:pb-14">
                {/* Decorative Subtle Background Color Blobs */}
                <div className="absolute -top-20 right-1/4 w-96 h-96 bg-blue-200/35 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-10 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 right-10 w-72 h-72 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
                    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
                        
                        {/* Top Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-[#0055ff] text-[11px] sm:text-xs font-semibold tracking-wide mb-3 border border-blue-200/80 shadow-xs">
                            <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
                            <span>Frequently Asked Questions &amp; Support</span>
                        </div>

                        {/* Title */}
                        <h1 className="font-extrabold text-[#0a1f3c] leading-tight mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-[40px] tracking-tight">
                            Got Questions? <span className="bg-gradient-to-r from-[#0055ff] via-[#0066cc] to-[#0099ff] bg-clip-text text-transparent">We Have Answers</span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed mb-6 max-w-2xl mx-auto">
                            Explore clear, transparent answers about our IT certification programmes, admissions, university guidance, live projects, certificates, fees, and career support.
                        </p>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
                            <NavLink 
                                to="/Courses" 
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-[0.98]"
                            >
                                <BookOpen className="w-4 h-4 text-white" />
                                <span>Explore Programmes</span>
                            </NavLink>
                            <NavLink 
                                to="/ContactUs" 
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0a2540] border border-slate-200 text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all active:scale-[0.98]"
                            >
                                <MessageSquare className="w-4 h-4 text-[#0055ff]" />
                                <span>Talk to Counsellor</span>
                            </NavLink>
                            <a 
                                href="https://wa.me/919311050670" 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#0b8a4b] border border-emerald-300 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98]"
                            >
                                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                                <span>WhatsApp Help</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 2. COLORFUL SOFT STATS STRIP ── */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-30 shadow-2xs">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
                        
                        {/* Stat 1: Blue */}
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                <HelpCircle className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-bold block leading-none">{totalFaqs}+ FAQs</span>
                                <span className="text-[10px] sm:text-[11px] text-blue-700/80 font-medium truncate block mt-0.5">Verified Answers</span>
                            </div>
                        </div>

                        {/* Stat 2: Emerald */}
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-bold block leading-none">{faqCategories.length} Categories</span>
                                <span className="text-[10px] sm:text-[11px] text-emerald-700/80 font-medium truncate block mt-0.5">Organised Topics</span>
                            </div>
                        </div>

                        {/* Stat 3: Amber */}
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-bold block leading-none">Session 2026</span>
                                <span className="text-[10px] sm:text-[11px] text-amber-800/80 font-medium truncate block mt-0.5">Updated Policies</span>
                            </div>
                        </div>

                        {/* Stat 4: Purple */}
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-purple-50/80 border border-purple-200/80 text-purple-900 shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                <HeartHandshake className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-bold block leading-none">Since 2002</span>
                                <span className="text-[10px] sm:text-[11px] text-purple-700/80 font-medium truncate block mt-0.5">20+ Years Trust</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── 3. SEARCH & CATEGORY CHIPS WITH SMOOTH PASTEL TONES ── */}
            <div className="bg-[#f8fafc] border-b border-slate-200/80 py-4">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
                    
                    {/* Search and Expand/Collapse Controls */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-3.5">
                        {/* Search Input Bar */}
                        <div className="relative flex-1 w-full">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search any question — e.g. refund policy, certificates, eligibility, timings..."
                                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 shadow-2xs transition-all placeholder:text-slate-400"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')} 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                                    title="Clear search"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* Quick Controls: Expand / Collapse All */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                                onClick={expandAll}
                                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#0055ff] text-[11px] sm:text-xs font-medium shadow-2xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                                title="Expand all questions"
                            >
                                <ChevronsUpDown className="w-3.5 h-3.5" />
                                <span>Expand All</span>
                            </button>
                            <button
                                onClick={collapseAll}
                                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] sm:text-xs font-medium shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                                title="Collapse all questions"
                            >
                                Collapse All
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Scrollable Category Chips with Light Pastel Colors */}
                    <div 
                        className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`flex-shrink-0 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                                activeCategory === 'all'
                                    ? 'bg-[#0055ff] text-white border-[#0055ff] shadow-sm shadow-blue-500/25'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            All Categories ({totalFaqs})
                        </button>

                        {faqCategories.map(cat => {
                            const theme = colorThemeMap[cat.color];
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                                        isActive ? theme.activePill : theme.pill
                                    }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                                    <span>{cat.label}</span>
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                        isActive ? 'bg-white/25 text-white' : 'bg-white text-slate-600 border border-slate-200/80'
                                    }`}>
                                        {cat.faqs.length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── 4. MAIN CONTENT AREA: SIDEBAR + ACCORDIONS ── */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* ──── LEFT SIDEBAR (Desktop Only, lg:col-span-3) ──── */}
                    <div className="hidden lg:block lg:col-span-3 sticky top-[80px]">
                        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs max-h-[calc(100vh-100px)] overflow-y-auto">
                            
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Categories</span>
                                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{faqCategories.length} Topics</span>
                            </div>

                            {/* Category Nav List */}
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                        activeCategory === 'all'
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4 flex-shrink-0 text-blue-500" />
                                        <span>All Topics</span>
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white border border-slate-200 font-medium text-slate-500">
                                        {totalFaqs}
                                    </span>
                                </button>

                                {faqCategories.map(cat => {
                                    const theme = colorThemeMap[cat.color];
                                    const Icon = cat.icon;
                                    const isActive = activeCategory === cat.id;

                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                                isActive
                                                    ? `${theme.badge} border font-bold shadow-2xs`
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? theme.text : 'text-slate-400'}`} />
                                                <span>{cat.label}</span>
                                            </span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white border border-slate-200/80 font-medium text-slate-500">
                                                {cat.faqs.length}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Sidebar Quick Helpline Card */}
                            <div className="mt-5 pt-4 border-t border-slate-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-3.5 rounded-xl border border-blue-100/80">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center">
                                        <Phone className="w-3 h-3" />
                                    </div>
                                    <h4 className="text-xs font-bold text-[#0a2540]">Need Direct Help?</h4>
                                </div>
                                <p className="text-[10.5px] text-slate-600 leading-snug mb-3">
                                    Our career counsellors are available Mon–Sat (9 AM – 7 PM) for free guidance.
                                </p>
                                <div className="space-y-1.5">
                                    <a
                                        href="tel:+919311050670"
                                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold transition-all shadow-2xs"
                                    >
                                        <Phone className="w-3 h-3" />
                                        <span>+91-9311050670</span>
                                    </a>
                                    <a
                                        href="https://wa.me/919311050670"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-semibold transition-all shadow-2xs"
                                    >
                                        <MessageSquare className="w-3 h-3" />
                                        <span>Chat on WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ──── RIGHT FAQ CONTENT (lg:col-span-9) ──── */}
                    <div className="lg:col-span-9 space-y-5 sm:space-y-6">

                        {/* Search result notification banner */}
                        {searchQuery.trim() && (
                            <div className="text-xs sm:text-sm text-slate-700 bg-blue-50/90 border border-blue-200/90 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-2xs">
                                <div>
                                    Showing results for <strong className="text-blue-700 font-bold">"{searchQuery}"</strong> — {totalFiltered} question(s) found
                                </div>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}

                        {/* No Results Fallback */}
                        {filteredCategories.length === 0 && (
                            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 text-center shadow-xs">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3.5 border border-blue-100">
                                    <HelpCircle className="w-7 h-7" />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">No questions found</h3>
                                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-4">
                                    We couldn't find any questions matching "{searchQuery}". Try different keywords or browse all categories.
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                    className="px-4 py-2 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
                                >
                                    Clear Search &amp; Show All Questions
                                </button>
                            </div>
                        )}

                        {/* ── FAQ CATEGORY CARDS WITH LIGHT PASTEL THEMES ── */}
                        {filteredCategories.map(cat => {
                            const theme = colorThemeMap[cat.color];
                            const Icon = cat.icon;

                            return (
                                <div 
                                    key={cat.id} 
                                    className={`bg-white rounded-2xl border ${theme.border} shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden`}
                                >
                                    {/* Category Header with Light Pastel Gradient */}
                                    <div className={`bg-gradient-to-r ${theme.headerBg} border-b ${theme.border} px-4 sm:px-6 py-4 flex items-center justify-between gap-3`}>
                                        <div className="flex items-center gap-3">
                                            {/* Colored Square Icon Badge */}
                                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${theme.iconBg} shadow-xs flex-shrink-0`}>
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div>
                                                <h2 className={`text-sm sm:text-base md:text-[17px] font-bold ${theme.text} tracking-tight leading-tight`}>
                                                    {cat.label}
                                                </h2>
                                                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                                                    {cat.faqs.length} Frequently Asked Questions
                                                </span>
                                            </div>
                                        </div>

                                        {/* Category Tag Badge */}
                                        <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold border ${theme.badge}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                                            <span>Official Guide</span>
                                        </span>
                                    </div>

                                    {/* Accordion List */}
                                    <div className="divide-y divide-slate-100">
                                        {cat.faqs.map((faq, idx) => {
                                            const isOpen = isFaqOpen(cat.id, idx);

                                            return (
                                                <div 
                                                    key={idx} 
                                                    className={`transition-colors ${isOpen ? 'bg-slate-50/40' : 'hover:bg-slate-50/60'}`}
                                                >
                                                    {/* Question Toggle Header */}
                                                    <button
                                                        onClick={() => toggleFaq(cat.id, idx)}
                                                        className="w-full text-left px-4 sm:px-6 py-3.5 sm:py-4 flex items-start justify-between gap-3 group cursor-pointer"
                                                        aria-expanded={isOpen}
                                                    >
                                                        <span className={`text-xs sm:text-[13.5px] md:text-sm font-semibold leading-snug transition-colors ${
                                                            isOpen ? theme.text : `text-slate-800 ${theme.titleHover}`
                                                        }`}>
                                                            {faq.q}
                                                        </span>
                                                        
                                                        {/* Animated Chevron in a Soft Pill */}
                                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                                                            isOpen 
                                                                ? `${theme.iconLight} shadow-2xs` 
                                                                : 'bg-slate-100/80 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700'
                                                        }`}>
                                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                                        </div>
                                                    </button>

                                                    {/* Answer Body with Soft Light Pastel Container */}
                                                    {isOpen && (
                                                        <div className="px-4 sm:px-6 pb-4 pt-0 animate-fadeIn">
                                                            <div className={`p-3.5 sm:p-4 rounded-xl border ${theme.answerBg} transition-all`}>
                                                                <p className="text-xs sm:text-[13px] md:text-[13.5px] text-slate-700 leading-relaxed font-normal">
                                                                    {faq.a}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {/* ── 5. BOTTOM HELPFUL COUNSELLING BANNER ── */}
                        <div className="bg-gradient-to-br from-[#ebf5ff] via-[#f5f9ff] to-[#eef7ff] rounded-2xl sm:rounded-3xl border-2 border-blue-200/90 shadow-sm p-5 sm:p-7">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
                                
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0055ff] text-[10.5px] sm:text-xs font-bold border border-blue-200/80 shadow-2xs">
                                        <HeartHandshake className="w-3.5 h-3.5 text-[#0066ff]" />
                                        <span>Personal Academic Support</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0a2540] tracking-tight leading-tight">
                                        Still have questions or need specific advice?
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                                        Our academic counsellors provide 1-on-1 guidance on course eligibility, fees, career roadmap, and batch schedules at no cost.
                                    </p>
                                    
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-[#0066ff]" />
                                            <span>S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad 201006</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-3 h-3 text-[#0066ff]" />
                                            <span>info@aayushinstitute.com</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-amber-600" />
                                            <span>Mon–Sat: 9 AM – 7 PM</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Responsive CTA Buttons */}
                                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2.5 flex-shrink-0 w-full sm:w-auto">
                                    <a
                                        href="https://wa.me/919311050670"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-[13px] font-semibold shadow-md shadow-emerald-600/25 transition-all active:scale-[0.98]"
                                    >
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>WhatsApp Us</span>
                                    </a>
                                    <a
                                        href="tel:+919311050670"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 text-xs sm:text-[13px] font-semibold shadow-2xs transition-all active:scale-[0.98]"
                                    >
                                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                                        <span>+91-9311050670</span>
                                    </a>
                                    <NavLink
                                        to="/ContactUs"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#0e3357] text-white text-xs sm:text-[13px] font-semibold shadow-sm transition-all active:scale-[0.98]"
                                    >
                                        <span>Contact Form</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </NavLink>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
