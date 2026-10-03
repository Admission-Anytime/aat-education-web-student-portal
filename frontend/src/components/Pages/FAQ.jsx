import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    HelpCircle, ChevronDown, Search, BookOpen, GraduationCap,
    Briefcase, Award, Users, Shield, Cpu, Phone, Mail, MapPin,
    Sparkles, CheckCircle2, Building, MessageSquare, Clock, Star
} from 'lucide-react';

const faqCategories = [
    {
        id: 'general', label: 'About Institute', icon: Building, color: 'blue',
        faqs: [
            { q: 'What is Aayush Institute of Professional Studies?', a: 'Aayush Institute of Professional Studies is a private education and professional training institute established in 2002. It is focused on IT education, professional skill development, university and distance education, practical training, and career-oriented learning. For more than two decades, the Institute has supported students, graduates, working professionals, and career aspirants in developing academic knowledge, technical skills, and professional capabilities.' },
            { q: 'When was Aayush Institute established?', a: 'Aayush Institute of Professional Studies was established in 2002, with a focus on education and professional skill development. It has been associated with education and training for over two decades.' },
            { q: 'Who currently manages Aayush Institute?', a: 'Since 2026, Aayush Institute of Professional Studies is managed and operated by Atri Admission Anytime Private Limited, a private limited company incorporated under the applicable laws of India. Prior to 2026, the Institute operated under New Aayush Education Welfare Society, registered in Delhi under the Societies Registration Act, 1860.' },
            { q: 'Where is Aayush Institute located?', a: 'Aayush Institute of Professional Studies is located at Plot No. 14, Block S, DLF Dilshad Extension 2, Ghaziabad, Uttar Pradesh - 201005, India. You can reach us by phone at 0120-2611111, +91-8800817447, or +91-9311050670, or by email at info@aayushinstitute.com.' },
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
        id: 'fees', label: 'Fees & Refund Policy', icon: Shield, color: 'slate',
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

const colorMap = {
    blue:    { bg: 'bg-blue-50',    text: 'text-[#0055ff]',  border: 'border-blue-100',    pill: 'bg-blue-50 text-[#0055cc] border-blue-100',    active: 'bg-[#0055ff] text-white border-[#0055ff]' },
    indigo:  { bg: 'bg-indigo-50',  text: 'text-indigo-600', border: 'border-indigo-100',  pill: 'bg-indigo-50 text-indigo-700 border-indigo-100',  active: 'bg-indigo-600 text-white border-indigo-600' },
    purple:  { bg: 'bg-purple-50',  text: 'text-purple-600', border: 'border-purple-100',  pill: 'bg-purple-50 text-purple-700 border-purple-100',  active: 'bg-purple-600 text-white border-purple-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600',border: 'border-emerald-100', pill: 'bg-emerald-50 text-emerald-700 border-emerald-100',active: 'bg-emerald-600 text-white border-emerald-600' },
    amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',  border: 'border-amber-100',   pill: 'bg-amber-50 text-amber-700 border-amber-100',    active: 'bg-amber-500 text-white border-amber-500' },
    rose:    { bg: 'bg-rose-50',    text: 'text-rose-600',   border: 'border-rose-100',    pill: 'bg-rose-50 text-rose-700 border-rose-100',      active: 'bg-rose-600 text-white border-rose-600' },
    slate:   { bg: 'bg-slate-100',  text: 'text-slate-600',  border: 'border-slate-200',   pill: 'bg-slate-100 text-slate-700 border-slate-200',   active: 'bg-slate-700 text-white border-slate-700' },
    teal:    { bg: 'bg-teal-50',    text: 'text-teal-600',   border: 'border-teal-100',    pill: 'bg-teal-50 text-teal-700 border-teal-100',      active: 'bg-teal-600 text-white border-teal-600' },
};

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFaqs, setOpenFaqs] = useState({});

    const toggleFaq = (catId, idx) => {
        const key = `${catId}-${idx}`;
        setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isFaqOpen = (catId, idx) => !!openFaqs[`${catId}-${idx}`];

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
        <div className="min-h-screen bg-[#f8fafc]">

            {/* ── 1. HERO ── */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#eaf3fc] via-[#f2f7fc] to-[#f8fafc] border-b border-slate-200/70">
                <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
                    <div className="flex flex-col items-center justify-center text-center max-w-2xl lg:max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0055cc] text-[10px] sm:text-[10.5px] font-bold tracking-wider mb-2 border border-blue-200/80 shadow-2xs">
                            <HelpCircle className="w-3.5 h-3.5 text-[#0055ff]" />
                            <span>FREQUENTLY ASKED QUESTIONS</span>
                        </div>
                        <h1 className="font-bold text-[#0a1f3c] leading-tight mb-2 text-xl sm:text-2xl md:text-3xl lg:text-[32px]">
                            FAQs — <span className="text-[#0055ff]">Everything You Need to Know</span>
                        </h1>
                        <p className="text-[#004b93] font-semibold text-xs sm:text-[13px] mb-2 tracking-wide">
                            Courses • University • Career Guidance • Fees &amp; Refunds • Certificates
                        </p>
                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-4 max-w-xl mx-auto">
                            Find answers to the most common questions about Aayush Institute — from courses and admissions to internships, certificates, and our refund policy.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                            <NavLink to="/Courses" className="inline-flex items-center justify-center gap-2 px-5 py-2 sm:py-2.5 rounded-lg bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-[13px] font-bold shadow-xs hover:shadow transition-all">
                                <BookOpen className="w-3.5 h-3.5 text-white" />
                                <span>Explore Courses</span>
                            </NavLink>
                            <NavLink to="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2 sm:py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#00285e] border border-slate-300 text-xs sm:text-[13px] font-bold shadow-xs transition-all">
                                <MessageSquare className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Ask Us a Question</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 2. STATS STRIP ── */}
            <div className="bg-white border-b border-slate-200/60">
                <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
                    <div className="flex items-center gap-4 sm:gap-8 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <HelpCircle className="w-4 h-4 text-[#0055ff]" />
                            <span className="text-xs font-bold text-slate-700">{totalFaqs} Questions Answered</span>
                        </div>
                        <div className="w-px h-4 bg-slate-200 flex-shrink-0" />
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-medium text-slate-600">{faqCategories.length} Categories</span>
                        </div>
                        <div className="w-px h-4 bg-slate-200 flex-shrink-0" />
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-medium text-slate-600">Updated 2026</span>
                        </div>
                        <div className="w-px h-4 bg-slate-200 hidden sm:block flex-shrink-0" />
                        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span className="text-xs font-medium text-slate-600">Established Since 2002</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 3. STICKY SEARCH + CATEGORY TABS ── */}
            <div className="bg-white border-b border-slate-200/60 sticky top-0 z-30 shadow-sm">
                <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-3">
                    {/* Search Bar */}
                    <div className="relative mb-2.5">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search questions — e.g. refund, certificate, internship..."
                            className="w-full pl-8 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#0055ff] focus:bg-white transition-all"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold leading-none">
                                ×
                            </button>
                        )}
                    </div>
                    {/* Category Pill Tabs — scrollable */}
                    <div className="flex items-center gap-1.5" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer whitespace-nowrap ${activeCategory === 'all' ? 'bg-[#0055ff] text-white border-[#0055ff]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                        >
                            All Topics
                        </button>
                        {faqCategories.map(cat => {
                            const c = colorMap[cat.color];
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer whitespace-nowrap ${isActive ? c.active : c.pill + ' hover:opacity-80'}`}
                                >
                                    <Icon className="w-3 h-3" />{cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── 4. MAIN CONTENT ── */}
            <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">

                    {/* ── LEFT SIDEBAR (Desktop only) ── */}
                    <div className="hidden lg:block lg:col-span-3 sticky top-[116px]">
                        <div className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-xs max-h-[calc(100vh-140px)] overflow-y-auto">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">FAQ Categories</h3>
                            <nav className="space-y-0.5">
                                <button onClick={() => setActiveCategory('all')}
                                    className={`w-full text-left px-2.5 py-2 rounded-lg text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer ${activeCategory === 'all' ? 'bg-blue-50 text-[#0055ff]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#0055ff]'}`}
                                >
                                    <span className="flex items-center gap-2"><HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />All Topics</span>
                                    <span className="text-[10px] text-slate-400 font-normal">{totalFaqs}</span>
                                </button>
                                {faqCategories.map(cat => {
                                    const c = colorMap[cat.color];
                                    const Icon = cat.icon;
                                    const isActive = activeCategory === cat.id;
                                    return (
                                        <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                                            className={`w-full text-left px-2.5 py-2 rounded-lg text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer ${isActive ? c.bg + ' ' + c.text : 'text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? c.text : 'text-slate-400'}`} />{cat.label}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-normal">{cat.faqs.length}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-[10px] text-slate-500 mb-2 leading-snug">Didn't find your answer? Our team is happy to help.</p>
                                <NavLink to="/contact" className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0055ff] hover:bg-[#0044cc] text-white text-[11px] font-semibold transition-colors">
                                    <Phone className="w-3 h-3" /><span>Contact Us</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: FAQ ACCORDION CONTENT ── */}
                    <div className="lg:col-span-9 space-y-5 sm:space-y-6">

                        {/* Search result count */}
                        {searchQuery.trim() && (
                            <div className="text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                                Showing results for <strong className="text-[#0055ff]">"{searchQuery}"</strong> — {totalFiltered} question(s) found
                            </div>
                        )}

                        {/* No results */}
                        {filteredCategories.length === 0 && (
                            <div className="bg-white rounded-xl p-8 border border-slate-200/70 text-center">
                                <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                <h3 className="text-sm font-bold text-slate-700 mb-1">No results found</h3>
                                <p className="text-xs text-slate-500">Try different keywords or browse all categories.</p>
                                <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                    className="mt-3 px-4 py-1.5 rounded-lg bg-[#0055ff] text-white text-xs font-semibold cursor-pointer">
                                    Clear and Browse All
                                </button>
                            </div>
                        )}

                        {/* FAQ Sections */}
                        {filteredCategories.map(cat => {
                            const c = colorMap[cat.color];
                            const Icon = cat.icon;
                            return (
                                <div key={cat.id} className="bg-white rounded-xl border border-slate-200/70 shadow-xs overflow-hidden">
                                    {/* Category header */}
                                    <div className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b ${c.border} ${c.bg}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${c.border} bg-white`}>
                                            <Icon className={`w-4 h-4 ${c.text}`} />
                                        </div>
                                        <div>
                                            <h2 className={`text-xs sm:text-sm font-bold ${c.text}`}>{cat.label}</h2>
                                            <span className="text-[10px] text-slate-400 font-medium">{cat.faqs.length} questions</span>
                                        </div>
                                    </div>
                                    {/* Accordion items */}
                                    <div className="divide-y divide-slate-100">
                                        {cat.faqs.map((faq, idx) => {
                                            const isOpen = isFaqOpen(cat.id, idx);
                                            return (
                                                <div key={idx}>
                                                    <button
                                                        onClick={() => toggleFaq(cat.id, idx)}
                                                        className="w-full text-left px-4 sm:px-5 py-3.5 flex items-start justify-between gap-3 hover:bg-slate-50/70 transition-colors group cursor-pointer"
                                                    >
                                                        <span className={`text-xs sm:text-[13px] font-semibold leading-snug transition-colors ${isOpen ? c.text : 'text-slate-800 group-hover:text-[#0055ff]'}`}>
                                                            {faq.q}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? c.text + ' rotate-180' : 'text-slate-400'}`} />
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-4 sm:px-5 pb-4">
                                                            <div className={`pl-3 border-l-2 ${c.border}`}>
                                                                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{faq.a}</p>
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

                        {/* ── BOTTOM CTA ── */}
                        <div className="bg-white rounded-xl border border-slate-200/70 shadow-xs p-4 sm:p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xs sm:text-sm font-bold text-[#0a2540] mb-0.5">Still have questions?</h3>
                                    <p className="text-[11px] text-slate-500 leading-snug max-w-md">
                                        Our academic counselling team is available to help with courses, admissions, fees, and career planning — at no additional cost.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[10px] text-slate-400">
                                        <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5 text-slate-400" />Ghaziabad, UP – 201005</span>
                                        <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5 text-slate-400" />info@aayushinstitute.com</span>
                                        <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5 text-slate-400" />Mon–Sat: 9 AM – 7 PM</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                                    <NavLink to="/contact" className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0055ff] hover:bg-[#0044cc] text-white text-[11px] font-semibold transition-colors">
                                        <MessageSquare className="w-3 h-3" /><span>Send Enquiry</span>
                                    </NavLink>
                                    <a href="tel:+918800817447" className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold transition-colors">
                                        <Phone className="w-3 h-3 text-[#0055ff]" /><span>+91-8800817447</span>
                                    </a>
                                    <a href="https://wa.me/918800817447" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-semibold transition-colors">
                                        <MessageSquare className="w-3 h-3" /><span>WhatsApp</span>
                                    </a>
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
