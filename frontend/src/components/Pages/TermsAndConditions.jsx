import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FileText,
    Shield,
    CheckCircle2,
    AlertCircle,
    Scale,
    HelpCircle,
    Download,
    Search,
    ChevronRight,
    ArrowUpRight,
    Building2,
    Calendar,
    Phone,
    Mail
} from 'lucide-react';

const sections = [
    {
        id: 'acceptance',
        num: '1',
        title: 'Acceptance of Terms',
        content: [
            'By submitting an application, making any payment, accepting admission, attending classes, accessing course content, participating in a project, internship or other Institute service, the student confirms that they have read, understood and agreed to these Terms.',
            'Where a student is below the applicable age of majority, admission and participation shall be subject to the consent and responsibility of the parent/guardian, wherever required.',
            'The Institute may update these Terms from time to time. The version applicable to the student\'s enrolment or relevant transaction shall apply, subject to applicable law.'
        ]
    },
    {
        id: 'admission-info',
        num: '2',
        title: 'Admission & Student Information',
        content: [
            'Students are required to provide complete, accurate and genuine information at the time of application and admission.',
            'The Institute may request documents or information required for:'
        ],
        bullets: [
            'Eligibility verification',
            'Admission processing',
            'Identity verification',
            'Academic records',
            'Examination or assessment',
            'Certification',
            'University/third-party enrolment',
            'Regulatory or administrative requirements'
        ],
        extra: [
            'The student is responsible for ensuring that all information and documents submitted are accurate, valid and genuine.',
            'Admission does not remove the student\'s responsibility to satisfy the eligibility requirements of the particular course, University, awarding body, employer or other concerned organisation.'
        ]
    },
    {
        id: 'forged-docs',
        num: '3',
        title: 'False, Forged or Invalid Documents',
        content: [
            'Submission of false, forged, altered, misleading or invalid documents or information may result in:'
        ],
        bullets: [
            'Cancellation or withdrawal of admission',
            'Suspension or termination of course access',
            'Withdrawal of benefits or services',
            'Cancellation or invalidation of an Institute-issued certificate, subject to applicable law',
            'Reporting to the concerned authority or organisation, where appropriate',
            'Other action permitted under applicable law'
        ],
        extra: [
            'Amounts paid in connection with admission or services may be non-refundable in such circumstances, subject to applicable law and the relevant programme terms.',
            'The Institute reserves the right to verify documents and information at any stage where reasonably required.'
        ]
    },
    {
        id: 'courses-programmes',
        num: '4',
        title: 'Courses & Programmes',
        content: [
            'The Institute may offer or facilitate:'
        ],
        bullets: [
            'IT & Computer Courses',
            'Professional & Skill-Based Courses',
            'Short-Term Certificate Courses',
            'Live Project Training',
            'Corporate Training',
            'Career Development Programmes',
            'University Programmes',
            'Online & Distance Education Programmes',
            'Vocational and Professional Programmes',
            'Internship and Career Support Services'
        ],
        extra: [
            'Course duration, syllabus, delivery mode, assessment, fees, eligibility and certification requirements may vary by programme.',
            'The Institute may modify course schedules, faculty, curriculum, delivery method, technology or other academic arrangements where reasonably required.'
        ]
    },
    {
        id: 'certificates',
        num: '5',
        title: 'Institute-Issued Certificates',
        content: [
            'Certificates issued by Aayush Institute relate to the completion of the applicable Institute-conducted course or training programme, subject to fulfilment of the prescribed requirements.',
            'Certificate issuance may depend upon:'
        ],
        bullets: [
            'Course completion',
            'Attendance requirements',
            'Assessments/examinations',
            'Project or practical requirements',
            'Submission of required documents',
            'Payment of applicable dues',
            'Other programme-specific requirements'
        ],
        extra: [
            'An Institute-issued certificate shall not automatically be represented as a University degree, statutory qualification, Government qualification or qualification issued by another awarding authority.'
        ]
    },
    {
        id: 'govt-jobs',
        num: '6',
        title: 'Government Jobs & Employment Eligibility',
        content: [
            'Aayush Institute of Professional Studies does not claim or guarantee that its Institute-issued certificates are automatically recognised, valid or sufficient for every Government Job or Government recruitment process.',
            'Eligibility and acceptance of qualifications or certificates for Government employment are determined by the:'
        ],
        bullets: [
            'Concerned Government Department',
            'Recruiting authority',
            'Recruitment board/commission',
            'Applicable recruitment rules',
            'Specific recruitment notification'
        ],
        extra: [
            'Students are responsible for checking the applicable eligibility and qualification requirements before relying on any certificate for Government recruitment.',
            'The Institute shall not be responsible for rejection of an application by a Government authority where the concerned authority does not accept or recognise a particular certificate or qualification.'
        ]
    },
    {
        id: 'private-employment',
        num: '7',
        title: 'Private Employment',
        content: [
            'Private employers establish their own recruitment, qualification and skill requirements.',
            'An Aayush Institute certificate may be considered by an employer as evidence of training, learning or skill development, subject to the employer\'s own policies and selection criteria.',
            'The Institute does not guarantee that any particular employer will accept an Institute-issued certificate or select a student for employment.'
        ]
    },
    {
        id: 'no-equivalence',
        num: '8',
        title: 'No Equivalence Claim',
        content: [
            'Unless specifically recognised or approved by the competent authority, an Institute-issued certificate should not be treated as equivalent to:'
        ],
        bullets: [
            'A University degree',
            'A statutory qualification',
            'A Government-recognised qualification',
            'A professional licence',
            'A qualification issued by a regulatory authority'
        ],
        extra: [
            'Students must verify the applicable recognition or equivalence requirements for their intended academic, employment or regulatory purpose.'
        ]
    },
    {
        id: 'university-programmes',
        num: '9',
        title: 'University & Third-Party Programmes',
        content: [
            'Where a programme is offered through, facilitated by, affiliated with or provided by a University or other third-party organisation, the concerned University or organisation remains responsible for its applicable:'
        ],
        bullets: [
            'Admission requirements',
            'Eligibility',
            'Academic rules',
            'Examination',
            'Certification',
            'Recognition',
            'Cancellation',
            'Refund',
            'Other programme-specific policies'
        ],
        extra: [
            'Aayush Institute\'s policies shall not override the applicable rules or policies of the concerned University or third-party organisation.',
            'The Institute does not guarantee admission, examination results, certification, recognition or acceptance of a third-party qualification where such matters are controlled by the concerned organisation.'
        ]
    },
    {
        id: 'fees',
        num: '10',
        title: 'Fees',
        content: [
            'Fees may include, depending on the programme:'
        ],
        bullets: [
            'Tuition/Course Fee',
            'Registration Fee',
            'Admission Fee',
            'Application/Processing Fee',
            'Documentation/Verification Charges',
            'Examination Fee',
            'Certification Fee',
            'University/Third-Party Charges',
            'Other programme-specific charges'
        ],
        extra: [
            'Applicable fees shall be communicated to the student through the relevant admission or programme information.',
            'Students are responsible for paying fees within the applicable timelines.'
        ]
    },
    {
        id: 'refund-institute',
        num: '11',
        title: 'Refund Policy — Aayush Institute Courses',
        content: [
            'The following refund policy applies only to courses conducted by Aayush Institute of Professional Studies:'
        ],
        subsections: [
            {
                subtitle: '11.1 Seven-Day Refund Period',
                text: 'An eligible student may request a refund of the applicable Tuition/Course Fee within 7 calendar days from the date on which the complete applicable Tuition/Course Fee is received and recorded by the Institute.'
            },
            {
                subtitle: '11.2 10% Deduction',
                text: 'For an eligible refund requested within the applicable 7-day period, 10% of the applicable Tuition/Course Fee shall be deducted towards admission, administrative, processing and related costs. The remaining eligible amount may be considered for refund after completion of the applicable verification and formalities.'
            },
            {
                subtitle: '11.3 After Seven Days',
                text: 'After expiry of the 7-calendar-day refund period, the Tuition/Course Fee for an Aayush Institute-conducted course shall be ordinarily non-refundable, subject to applicable law and any programme-specific written terms.'
            },
            {
                subtitle: '11.4 Instalment Payments',
                text: 'Where the course fee is paid through instalments or multiple transactions, the 7-day refund period shall begin from the date on which the complete applicable Tuition/Course Fee is received and recorded by the Institute, and not from each individual instalment.'
            },
            {
                subtitle: '11.5 Refund Request Date',
                text: 'The date on which the Institute receives the student\'s complete written refund request shall be considered for determining whether the request has been submitted within the applicable refund period.'
            },
            {
                subtitle: '11.6 Non-Attendance or Discontinuation',
                text: 'Non-attendance, discontinuation of the course, personal circumstances, employment, relocation, change of career plans, failure to use facilities or course content, or similar circumstances shall not automatically create a refund entitlement or extend the applicable refund period.'
            }
        ]
    },
    {
        id: 'refund-university',
        num: '12',
        title: 'University / Third-Party Refund Policy',
        content: [
            'The 7-day refund policy and 10% deduction applicable to Aayush Institute-conducted courses do not apply to University or other third-party programmes.',
            'For such programmes, the refund and cancellation policy of the concerned University or third-party organisation shall apply.',
            'Where a University or third-party organisation retains, deducts, delays or denies any amount under its applicable policy, Aayush Institute shall not ordinarily be required to make up or reimburse such amount unless expressly agreed by the Institute in writing or required by applicable law.',
            'Students should review the applicable University/third-party refund terms before enrolment or payment.'
        ],
        highlight: 'Aayush Institute Courses → 7-Day Refund Policy + 10% deduction for eligible refunds.\nUniversity / Third-Party Courses → Concerned University / Third-Party Refund Policy applies.'
    },
    {
        id: 'non-refundable',
        num: '13',
        title: 'Non-Refundable Charges',
        content: [
            'Registration, admission, application, processing, documentation, verification, administrative, examination and other specifically identified charges shall be non-refundable, unless expressly stated otherwise in writing or required by applicable law.'
        ]
    },
    {
        id: 'refund-formalities',
        num: '14',
        title: 'Refund Formalities',
        content: [
            'A refund request, where applicable, must be submitted in writing within the prescribed period and may be required to include:'
        ],
        bullets: [
            'Student identification details',
            'Admission/enrolment details',
            'Payment receipt',
            'Bank/payment details',
            'Reason for request, where required',
            'Other documents reasonably requested by the Institute'
        ],
        extra: [
            'Refunds, where approved, shall normally be processed through the applicable banking or payment channel after verification and completion of required formalities.'
        ]
    },
    {
        id: 'course-changes',
        num: '15',
        title: 'Course Changes & Schedule',
        content: [
            'The Institute may make reasonable changes to:'
        ],
        bullets: [
            'Batch timings',
            'Faculty',
            'Classroom arrangements',
            'Course schedule',
            'Delivery mode',
            'Curriculum',
            'Software/tools',
            'Project requirements'
        ],
        extra: [
            'Such changes may be made due to academic, operational, technology, faculty, infrastructure or other reasonable circumstances.',
            'The Institute shall make reasonable efforts to communicate material changes to affected students.'
        ]
    },
    {
        id: 'attendance',
        num: '16',
        title: 'Attendance & Academic Requirements',
        content: [
            'Students are expected to maintain the attendance and academic participation required for their respective programme.',
            'Failure to attend classes, complete assignments, participate in assessments, or fulfil programme requirements may affect course completion or certificate eligibility.'
        ]
    },
    {
        id: 'online-learning',
        num: '17',
        title: 'Online Learning',
        content: [
            'For online programmes, students are responsible for maintaining:'
        ],
        bullets: [
            'Suitable internet connectivity',
            'Compatible device',
            'Required software',
            'Valid contact details',
            'Secure account credentials'
        ],
        extra: [
            'The Institute shall not ordinarily be responsible for interruptions caused by the student\'s device, internet service provider, electricity supply or other circumstances outside the Institute\'s reasonable control.'
        ]
    },
    {
        id: 'live-project',
        num: '18',
        title: 'Live Project Training',
        content: [
            'Live Project Training is intended to provide practical exposure and project-based learning.',
            'Participation, project allocation, technology exposure, mentoring and completion requirements may vary according to the programme and project.',
            'Project participation does not by itself guarantee employment, internship or placement.'
        ]
    },
    {
        id: 'internships',
        num: '19',
        title: 'Internship Opportunities',
        content: [
            'The Institute may facilitate or provide information about internship opportunities through companies or other organisations.',
            'Internship opportunities are subject to:'
        ],
        bullets: [
            'Availability',
            'Eligibility',
            'Skills',
            'Company requirements',
            'Selection by the concerned organisation'
        ],
        extra: [
            'Where an internship is paid, the stipend or compensation shall be determined by the organisation offering the internship.',
            'The Institute does not guarantee selection, stipend, duration, continuation or employment following an internship unless expressly agreed in writing.'
        ]
    },
    {
        id: 'career-guidance',
        num: '20',
        title: 'Career Guidance',
        content: [
            'Aayush Institute may provide career guidance at no additional cost to eligible students.',
            'Guidance may cover course selection, career planning, skills, higher education, resume/profile development, interview preparation, industry trends and related areas.',
            'Career guidance is advisory in nature and does not constitute a guarantee of admission, employment, Government recruitment, salary or career outcome.'
        ]
    },
    {
        id: 'placement-support',
        num: '21',
        title: 'Placement Support',
        content: [
            'The Institute may provide placement and career assistance, including:'
        ],
        bullets: [
            'Resume/profile preparation',
            'Interview preparation',
            'Mock interviews',
            'Technical and HR interview preparation',
            'Communication and workplace skills',
            'Job-role guidance',
            'Recruitment opportunity information',
            'Employer interaction, where available'
        ],
        extra: [
            'Placement is not guaranteed.',
            'Final selection, salary, job location, role and employment conditions are determined by the concerned employer.'
        ]
    },
    {
        id: 'no-guarantee',
        num: '22',
        title: 'No Guarantee of Employment or Career Outcome',
        content: [
            'Completion of any course, receipt of a certificate, participation in an internship or live project, or use of career/placement services does not guarantee:'
        ],
        bullets: [
            'Government employment',
            'Private employment',
            'Internship selection',
            'Specific salary',
            'Specific job role',
            'Promotion',
            'Business outcome',
            'Admission to another institution'
        ],
        extra: [
            'Employment and career outcomes depend on the student\'s qualifications, skills, performance, experience, eligibility, market conditions and the selection criteria of the relevant organisation.'
        ]
    },
    {
        id: 'discipline',
        num: '23',
        title: 'Discipline & Conduct',
        content: [
            'Students are expected to maintain appropriate conduct and respect Institute staff, faculty, students, visitors, facilities and applicable rules.',
            'The Institute may take appropriate action in cases involving:'
        ],
        bullets: [
            'Misconduct',
            'Harassment',
            'Threatening behaviour',
            'Fraud',
            'Misrepresentation',
            'Damage to property',
            'Unauthorised access',
            'Academic misconduct',
            'Disruption of academic activities'
        ],
        extra: [
            'Serious or repeated violations may result in suspension or termination of enrolment or access, subject to applicable law.'
        ]
    },
    {
        id: 'intellectual-property',
        num: '24',
        title: 'Intellectual Property',
        content: [
            'Course materials, videos, presentations, software resources, documents, training content, branding and other materials provided by the Institute may be protected by applicable intellectual property laws.',
            'Students shall not reproduce, sell, distribute, publish, commercially exploit or share protected Institute materials without appropriate written permission.'
        ]
    },
    {
        id: 'student-data',
        num: '25',
        title: 'Student Data & Records',
        content: [
            'The Institute may collect and process student information reasonably required for admission, education, communication, assessment, certification, administration, verification and other legitimate institutional purposes.',
            'Student information shall be handled in accordance with applicable law and the Institute\'s applicable privacy practices.'
        ]
    },
    {
        id: 'it-resources',
        num: '26',
        title: 'Institute Property & IT Resources',
        content: [
            'Students may be responsible for loss or damage caused to Institute property, equipment, systems or facilities due to intentional misuse, negligence or unauthorised activity, subject to applicable law.',
            'Unauthorised access, hacking, misuse of systems, distribution of malicious software or other prohibited activity is not permitted.'
        ]
    },
    {
        id: 'third-party-services',
        num: '27',
        title: 'Third-Party Services',
        content: [
            'The Institute may use or facilitate services provided by third parties, including Universities, examination bodies, technology providers, internship organisations, employers and other service providers.',
            'Where a third party controls a service, decision, admission, examination, certification, refund or employment process, the relevant third-party terms and decisions shall apply.'
        ]
    },
    {
        id: 'limitation-responsibility',
        num: '28',
        title: 'Limitation of Responsibility',
        content: [
            'The Institute will make reasonable efforts to provide the services described for each programme. However, the Institute shall not be responsible for decisions or outcomes controlled by independent third parties, including:'
        ],
        bullets: [
            'Government authorities',
            'Recruiting bodies',
            'Universities',
            'Employers',
            'Internship providers',
            'Examination bodies',
            'Regulatory authorities',
            'Payment service providers'
        ],
        extra: [
            'Nothing in these Terms excludes or limits any right or responsibility that cannot legally be excluded or limited under applicable law.'
        ]
    },
    {
        id: 'termination',
        num: '29',
        title: 'Termination / Withdrawal of Services',
        content: [
            'The Institute may suspend or terminate a student\'s enrolment, access or participation where reasonably necessary due to:'
        ],
        bullets: [
            'Serious misconduct',
            'Fraud or misrepresentation',
            'Submission of false documents',
            'Non-payment of applicable fees',
            'Violation of Institute policies',
            'Unauthorised use of Institute resources',
            'Other material breach of these Terms'
        ],
        extra: [
            'Such action shall be subject to applicable law and relevant programme terms.'
        ]
    },
    {
        id: 'force-majeure',
        num: '30',
        title: 'Force Majeure',
        content: [
            'The Institute shall not be considered in breach of its obligations to the extent performance is prevented or materially affected by circumstances beyond its reasonable control, including natural disasters, government restrictions, public emergencies, infrastructure failures, technology disruptions, labour disruptions or similar events.'
        ]
    },
    {
        id: 'policy-updates',
        num: '31',
        title: 'Policy Updates',
        content: [
            'The Institute may update its policies, procedures and Terms & Conditions from time to time to reflect operational, academic, legal, regulatory or technological requirements.',
            'Updated policies shall apply prospectively where appropriate, subject to applicable law.'
        ]
    },
    {
        id: 'governing-law',
        num: '32',
        title: 'Governing Law & Jurisdiction',
        content: [
            'These Terms shall be governed by the laws applicable in India.',
            'Subject to applicable law, matters relating to the Institute shall be subject to the jurisdiction of the competent courts and authorities in Ghaziabad, Uttar Pradesh.'
        ]
    }
];

const TermsAndConditions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const filteredSections = sections.filter((sec) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            sec.title.toLowerCase().includes(q) ||
            sec.num.includes(q) ||
            sec.content?.some((c) => c.toLowerCase().includes(q)) ||
            sec.bullets?.some((b) => b.toLowerCase().includes(q)) ||
            sec.extra?.some((e) => e.toLowerCase().includes(q))
        );
    });

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800">
            {/* 1. Header Banner - Clean & Restrained */}
            <div className="bg-white border-b border-slate-200/70">
                <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0055cc] text-[10px] font-bold tracking-wider mb-1.5 border border-blue-100 uppercase">
                                <Scale className="w-3 h-3" />
                                <span>Official Student Policy</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#0a2540]">
                                Terms &amp; Conditions and Student Policy
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Aayush Institute of Professional Studies • Operated &amp; Managed by Atri Admission Anytime Private Limited
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search policy clauses..."
                                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile / Tablet Horizontal Section Navigator - hidden on lg+ */}
            <div className="block lg:hidden bg-white border-b border-slate-200/60">
                <div
                    className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10"
                    style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex items-center gap-2 py-2.5" style={{ width: 'max-content' }}>
                        {sections.map((sec) => (
                            <button
                                key={sec.id}
                                onClick={() => scrollToSection(sec.id)}
                                className="flex-shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#0055ff] text-slate-600 text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                            >
                                {sec.num}. {sec.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sidebar Index */}
            <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                    
                    {/* Left Sticky Index (Desktop) */}
                    <div className="hidden lg:block lg:col-span-4 sticky top-24 bg-white rounded-xl p-4 border border-slate-200/70 shadow-xs max-h-[calc(100vh-120px)] overflow-y-auto">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 pb-2 border-b border-slate-100 flex items-center justify-between">
                            <span>Policy Sections</span>
                            <span className="text-[10px] font-normal text-slate-400">32 Clauses</span>
                        </h3>
                        <nav className="space-y-0.5">
                            {sections.map((sec) => (
                                <button
                                    key={sec.id}
                                    onClick={() => scrollToSection(sec.id)}
                                    className="w-full text-left px-2 py-1.5 rounded text-[11px] font-medium text-slate-600 hover:text-[#0055ff] hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                                >
                                    <span className="truncate">
                                        <span className="text-slate-400 w-5 inline-block">{sec.num}.</span>
                                        {sec.title}
                                    </span>
                                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#0055ff] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Right Content Stream */}
                    <div className="lg:col-span-8 space-y-4 sm:space-y-5">

                        {/* Introduction Card */}
                        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                            <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-1">
                                Introduction
                            </span>
                            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                                <p>
                                    These Terms &amp; Conditions and Student Policy (“Terms”) govern admission, enrolment, training, education, certification, live project training, internships, career guidance, placement assistance and other services provided by <strong>Aayush Institute of Professional Studies</strong> (“Institute”).
                                </p>
                                <p>
                                    Aayush Institute of Professional Studies is a private education and professional training institute operated and managed by <strong>Atri Admission Anytime Private Limited</strong>, a private limited company incorporated under the applicable laws of India.
                                </p>
                                <p>
                                    Atri Admission Anytime Private Limited took over the management and operations of Aayush Institute of Professional Studies in <strong>2026</strong>. Prior to the 2025 management transition, the Institute was operated under <strong>New Aayush Education Welfare Society</strong>, a society registered in Delhi under the Societies Registration Act, 1860, as applicable.
                                </p>
                                <p>
                                    These Terms apply to Institute-conducted courses as well as, where specifically applicable, University and other third-party programmes facilitated or supported by the Institute.
                                </p>
                            </div>
                        </div>

                        {/* Quick Summary Highlights Box */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100">
                                <h4 className="text-xs font-semibold text-[#004b93] mb-1 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0055ff]" />
                                    Institute Courses Refund
                                </h4>
                                <p className="text-[11px] text-slate-600 leading-snug">
                                    7-day refund window from receipt of full fee, subject to a 10% administrative deduction. Non-refundable after 7 days.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
                                <h4 className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5 text-slate-600" />
                                    University &amp; Third-Party Programs
                                </h4>
                                <p className="text-[11px] text-slate-600 leading-snug">
                                    Governed exclusively by the academic, refund, exam, and certification rules of the concerned University or awarding body.
                                </p>
                            </div>
                        </div>

                        {/* 32 Clauses */}
                        {filteredSections.map((sec) => (
                            <div
                                key={sec.id}
                                id={sec.id}
                                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs scroll-mt-24 transition-all"
                            >
                                <div className="flex items-start gap-2.5 mb-2.5">
                                    <span className="w-6 h-6 rounded-md bg-slate-100 text-[#004b93] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {sec.num}
                                    </span>
                                    <h2 className="text-sm sm:text-base font-bold text-[#0a2540] leading-snug">
                                        {sec.title}
                                    </h2>
                                </div>

                                {sec.content && (
                                    <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed mb-2.5 pl-0 sm:pl-8">
                                        {sec.content.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                )}

                                {/* Bullet Points */}
                                {sec.bullets && (
                                    <div className="pl-0 sm:pl-8 mb-2.5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                                            {sec.bullets.map((b, i) => (
                                                <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                                                    <span className="w-1 h-1 rounded-full bg-[#0055ff] flex-shrink-0" />
                                                    <span>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Subsections (e.g. Refund Policy 11.1 - 11.6) */}
                                {sec.subsections && (
                                    <div className="pl-0 sm:pl-8 space-y-2 mb-2.5">
                                        {sec.subsections.map((sub, i) => (
                                            <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                                                <h4 className="text-xs font-semibold text-slate-800 mb-0.5">{sub.subtitle}</h4>
                                                <p className="text-[11px] text-slate-600 leading-relaxed">{sub.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Highlights */}
                                {sec.highlight && (
                                    <div className="pl-0 sm:pl-8 mb-2.5">
                                        <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] text-[#004b93] font-medium whitespace-pre-line leading-relaxed">
                                            {sec.highlight}
                                        </div>
                                    </div>
                                )}

                                {/* Extra Paragraphs */}
                                {sec.extra && (
                                    <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed pl-0 sm:pl-8">
                                        {sec.extra.map((e, i) => (
                                            <p key={i}>{e}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Bottom Contact / Help Footer Card */}
                        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                            <div>
                                <h4 className="text-xs sm:text-sm font-semibold text-[#0a2540]">
                                    Questions about these Terms &amp; Policies?
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                    Our administrative desk is available to assist students and parents with clarity.
                                </p>
                            </div>
                            <NavLink
                                to="/contact"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0055ff] hover:bg-[#00488f] text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
                            >
                                <Phone className="w-3 h-3" />
                                <span>Contact Administration</span>
                            </NavLink>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
