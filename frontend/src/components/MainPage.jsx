import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor, BookOpen, GraduationCap, TrendingUp,
  Users, Lightbulb, Clock, Award,
  Phone, MessageCircle, ArrowRight,
  Search, MapPin, PlayCircle, Globe,
  Pencil, Code, BarChart2, FileText,
  Calculator, Layers, Megaphone, Laptop,
  Briefcase, CheckCircle2, ChevronRight, ChevronLeft, Check, X,
  Palette, Smartphone, Settings, Sparkles, Building2, Star, Rocket
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import CourseDetailsModal from './Common/CourseDetailsModal';

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <Monitor className="w-7 h-7 text-white" />,
    title: 'Professional Computer Courses',
    desc: 'Job-oriented training with practical learning.',
    iconBg: '#1e40af', // blue
    cardBg: '#f0f6ff',
    titleColor: '#0f2b5c',
    linkColor: '#1d64ec',
  },
  {
    icon: <Pencil className="w-7 h-7 text-white" />,
    title: 'Designing Courses',
    desc: 'Graphic, Web & UI/UX with real projects.',
    iconBg: '#db2777', // pink
    cardBg: '#fdf2f8',
    titleColor: '#831843',
    linkColor: '#db2777',
  },
  {
    icon: <Code className="w-7 h-7 text-white" />,
    title: 'Development Courses',
    desc: 'MERN Stack, Python & more for future-ready skills.',
    iconBg: '#059669', // green
    cardBg: '#ecfdf5',
    titleColor: '#064e3b',
    linkColor: '#059669',
  },
  {
    icon: <GraduationCap className="w-7 h-7 text-white" />,
    title: 'University Programs',
    desc: 'UG & PG through Online & Distance Education.',
    iconBg: '#ea580c', // orange
    cardBg: '#fff7ed',
    titleColor: '#7c2d12',
    linkColor: '#ea580c',
  },
];

const exploreCoursesCategories = [
  {
    icon: <Code className="w-5 h-5 stroke-[2.2]" />,
    title: 'Professional Courses',
    subtitle: 'Job-Ready Tech Skills',
    to: '/Courses',
    cardBg: 'from-[#eef6ff] via-[#f5f9ff] to-[#ffffff]',
    border: 'border-blue-200/90 hover:border-blue-400',
    topBar: 'from-[#0062ff] to-[#38bdf8]',
    iconGrad: 'from-[#0052cc] to-[#0ea5e9]',
    iconRing: 'ring-blue-400/20',
    iconShadow: 'shadow-blue-500/25',
    titleColor: 'text-[#002f6c] group-hover:text-[#0052cc]',
    badgeBg: 'bg-blue-100/90 text-[#0052cc]',
    hoverShadow: 'hover:shadow-blue-500/20',
  },
  {
    icon: <GraduationCap className="w-5 h-5 stroke-[2.2]" />,
    title: 'University Programs',
    subtitle: 'UG | PG | Online Degrees',
    to: '/UniversityCourses',
    cardBg: 'from-[#f0fdf4] via-[#f7fef9] to-[#ffffff]',
    border: 'border-emerald-200/90 hover:border-emerald-400',
    topBar: 'from-[#059669] to-[#34d399]',
    iconGrad: 'from-[#047857] to-[#10b981]',
    iconRing: 'ring-emerald-400/20',
    iconShadow: 'shadow-emerald-500/25',
    titleColor: 'text-[#064e3b] group-hover:text-[#047857]',
    badgeBg: 'bg-emerald-100/90 text-[#047857]',
    hoverShadow: 'hover:shadow-emerald-500/20',
  },
  {
    icon: <Building2 className="w-5 h-5 stroke-[2.2]" />,
    title: 'Corporate Training',
    subtitle: 'Enterprise & Upskilling',
    to: '/CorporateTraining',
    cardBg: 'from-[#fff7ed] via-[#fffaf5] to-[#ffffff]',
    border: 'border-orange-200/90 hover:border-orange-400',
    topBar: 'from-[#ea580c] to-[#fb923c]',
    iconGrad: 'from-[#c2410c] to-[#f97316]',
    iconRing: 'ring-orange-400/20',
    iconShadow: 'shadow-orange-500/25',
    titleColor: 'text-[#7c2d12] group-hover:text-[#ea580c]',
    badgeBg: 'bg-orange-100/90 text-[#c2410c]',
    hoverShadow: 'hover:shadow-orange-500/20',
  },
  {
    icon: <Rocket className="w-5 h-5 stroke-[2.2]" />,
    title: 'Live Project Training',
    subtitle: 'Real Client Work & Code',
    to: '/LiveProject',
    cardBg: 'from-[#faf5ff] via-[#fbf7ff] to-[#ffffff]',
    border: 'border-purple-200/90 hover:border-purple-400',
    topBar: 'from-[#9333ea] to-[#c084fc]',
    iconGrad: 'from-[#7e22ce] to-[#a855f7]',
    iconRing: 'ring-purple-400/20',
    iconShadow: 'shadow-purple-500/25',
    titleColor: 'text-[#3b0764] group-hover:text-[#7e22ce]',
    badgeBg: 'bg-purple-100/90 text-[#7e22ce]',
    hoverShadow: 'hover:shadow-purple-500/20',
  },
  {
    icon: <Briefcase className="w-5 h-5 stroke-[2.2]" />,
    title: 'Placement Support',
    subtitle: '100% Interview Assistance',
    to: '/Placement',
    cardBg: 'from-[#fff1f2] via-[#fff7f8] to-[#ffffff]',
    border: 'border-rose-200/90 hover:border-rose-400',
    topBar: 'from-[#e11d48] to-[#fb7185]',
    iconGrad: 'from-[#be123c] to-[#f43f5e]',
    iconRing: 'ring-rose-400/20',
    iconShadow: 'shadow-rose-500/25',
    titleColor: 'text-[#881337] group-hover:text-[#be123c]',
    badgeBg: 'bg-rose-100/90 text-[#be123c]',
    hoverShadow: 'hover:shadow-rose-500/20',
  }
];

const popularCoursesData = [
  // ── 1. PROFESSIONAL COURSES (4) ──
  {
    id: 2,
    category: 'professional',
    name: 'Software & Full Stack Development',
    title: 'Software & Full Stack Development',
    subgroup: 'Full Stack & Web Engineering',
    subtitle: 'Build modern web applications using programming, frontend, backend, APIs and full stack technologies.',
    details: 'Master end-to-end software development from frontend architecture to backend APIs, database management, and scalable cloud deployment.',
    tags: ['Programming', 'Web Development', 'Full Stack', '+4'],
    skills: ['Programming', 'Web Development', 'Full Stack', 'React', 'Node.js', 'REST APIs', 'SQL/NoSQL'],
    features: [
      'Programming Fundamentals & Web Architecture',
      'Frontend (React/Next.js) & Backend REST APIs',
      'SQL & NoSQL Databases',
      'Full Stack Capstone Projects'
    ],
    role: 'Full Stack Software Developer',
    certification: 'Certified Full Stack Software Developer',
    duration: '4–6 Months',
    eligibility: '12th / BCA / B.Tech / MCA / Graduates',
    careerAreas: 'Full Stack Developer, Software Engineer, Backend Engineer, Web Developer',
    image: '/course_mern.jpg',
    badge: 'POPULAR',
    rating: '4.9',
    route: '/it-stack-development',
    path: '/it-stack-development',
    btnGrad: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    categoryPillBg: 'bg-blue-600 text-white',
  },
  {
    id: 6,
    category: 'professional',
    name: 'Web Designing',
    title: 'Web Designing',
    subgroup: 'Web & Frontend Design',
    subtitle: 'Create modern, responsive and user-friendly websites using HTML, CSS, JavaScript and modern web tools.',
    details: 'Build dynamic, responsive, and mobile-friendly websites with clean semantic HTML5, CSS3, modern JavaScript, and WordPress CMS themes.',
    tags: ['HTML5', 'CSS3', 'JavaScript', '+4'],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'WordPress', 'Bootstrap', 'Web Hosting'],
    features: [
      'HTML5 & Modern CSS3 Responsive Layouts',
      'Core JavaScript, DOM Events & WordPress',
      'CSS Flexbox & CSS Grid Mastery',
      'Live Website Deployment'
    ],
    role: 'Professional Web Designer',
    certification: 'Certified Professional Web Designer',
    duration: '3–4 Months',
    eligibility: '10th / 12th / Any Stream / Creative Aspirants',
    careerAreas: 'Web Designer, Frontend Specialist, WordPress Developer, UI Layout Designer',
    image: '/course_web_design.jpg',
    badge: 'POPULAR',
    rating: '4.9',
    route: '/web-development',
    path: '/web-development',
    btnGrad: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    categoryPillBg: 'bg-blue-600 text-white',
  },
  {
    id: 12,
    category: 'professional',
    name: 'UI/UX & Product Design',
    title: 'UI/UX & Product Design',
    subgroup: 'Product & Interface Design',
    subtitle: 'Design intuitive websites and mobile products through UX research, Figma, wireframing and prototyping.',
    details: 'Design intuitive, modern, and user-centered digital products using industry tools like Figma, wireframing, high-fidelity prototypes, design systems, and usability testing.',
    tags: ['Figma', 'UX Research', 'Wireframing', '+4'],
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
    features: [
      'User Research & Empathy Mapping',
      'Information Architecture & User Journeys',
      'Figma Components, Auto-Layout & Design Systems',
      'Interactive Micro-Animations & Prototyping'
    ],
    role: 'UI/UX Product Designer',
    certification: 'Certified UI/UX Product Designer',
    duration: '3–4 Months',
    eligibility: '10th / 12th / Diploma / Graduates / Creative Enthusiasts',
    careerAreas: 'UI/UX Designer, Product Designer, Interaction Designer, Visual Designer',
    image: '/course_ui_ux.jpg',
    badge: 'POPULAR',
    rating: '4.9',
    route: '/ui-ux-design',
    path: '/ui-ux-design',
    btnGrad: 'from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    categoryPillBg: 'bg-blue-600 text-white',
  },
  {
    id: 14,
    category: 'professional',
    name: 'Digital Marketing & Performance Marketing',
    title: 'Digital Marketing & Performance Marketing',
    subgroup: 'Performance & Digital Marketing',
    subtitle: 'Learn SEO, Google Ads, Meta Ads, social media, content and performance marketing for digital growth.',
    details: 'Accelerate business revenue through data-backed performance marketing, SEO, Google Ads, Meta advertising, conversion funnels, and analytics.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', '+4'],
    skills: ['SEO', 'Google Ads', 'Meta Ads', 'Social Media', 'Analytics', 'Content Strategy'],
    features: [
      'Search Engine Optimization (On-Page & Off-Page)',
      'Google Search, Display & Video Ads',
      'Meta Campaign Optimization & Performance',
      'Conversion Rate Optimization & Google Analytics'
    ],
    role: 'Performance Marketing Specialist',
    certification: 'Certified Performance Marketing Specialist',
    duration: '3–5 Months',
    eligibility: '12th / Graduates / Entrepreneurs / Marketers / Freelancers',
    careerAreas: 'Performance Marketer, Digital Marketing Manager, SEO Specialist, PPC Expert',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badge: 'POPULAR',
    rating: '4.9',
    route: '/digital-marketing',
    path: '/digital-marketing',
    btnGrad: 'from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    categoryPillBg: 'bg-blue-600 text-white',
  },

  // ── 2. CORPORATE TRAINING (4) ──
  {
    id: 201,
    category: 'corporate',
    name: 'AI & Generative AI for Enterprise',
    title: 'AI & Generative AI for Enterprise',
    subgroup: 'Corporate Training',
    subtitle: 'Empower teams with Generative AI tools, prompt engineering, ChatGPT workflows, and business automation.',
    details: 'Tailored enterprise corporate upskilling program enabling organizations to implement Generative AI, LLMs, prompt engineering, and operational automation safely across cross-functional departments.',
    tags: ['GenAI', 'ChatGPT', 'Prompt Engineering', 'Automation'],
    skills: ['Generative AI', 'Prompt Engineering', 'LLM Integration', 'Workflow Automation', 'Enterprise AI Policy'],
    features: [
      'Enterprise AI Workflows & Modernization',
      'Process Automation with LLMs & Agents',
      'Prompt Engineering & Custom GPT Deployments',
      'AI Strategy for Cross-Functional Business Teams'
    ],
    role: 'Certified Enterprise AI Professional',
    certification: 'Certificate in Corporate AI & Prompt Engineering',
    duration: '2–4 Weeks (Custom)',
    eligibility: 'Corporate Teams, Managers, IT & Operations',
    careerAreas: 'AI Project Lead, Corporate Automation Specialist, Business AI Analyst',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    badge: 'ENTERPRISE',
    rating: '4.9',
    route: '/CorporateTraining',
    path: '/CorporateTraining',
    btnGrad: 'from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700',
    categoryPillBg: 'bg-indigo-600 text-white',
  },
  {
    id: 202,
    category: 'corporate',
    name: 'Advanced Excel & Power BI Analytics',
    title: 'Advanced Excel & Power BI Analytics',
    subgroup: 'Corporate Training',
    subtitle: 'Master executive MIS reporting, dynamic dashboards, Power Query, DAX formulas, and BI analytics.',
    details: 'Corporate-grade data analytics and reporting masterclass for finance, HR, sales, and operations teams to build interactive Power BI dashboards, automated data pipelines, and executive KPI summaries.',
    tags: ['Power BI', 'Advanced Excel', 'DAX', 'MIS Dashboards'],
    skills: ['Advanced Excel', 'Power BI', 'Power Query', 'DAX Formulas', 'Executive Dashboards', 'KPI Modeling'],
    features: [
      'Executive MIS Dashboards & Power Query',
      'Interactive Visuals & Power BI Modeling',
      'Advanced DAX Calculations & KPI Tracking',
      'Automated Financial & Sales Reporting'
    ],
    role: 'Certified Data & MIS Specialist',
    certification: 'Certificate in Advanced Corporate MIS & Analytics',
    duration: '2–4 Weeks',
    eligibility: 'Finance, HR, Sales, MIS, Administration & Management',
    careerAreas: 'MIS Manager, Business Intelligence Analyst, Reporting Specialist',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badge: 'HIGH IMPACT',
    rating: '4.9',
    route: '/CorporateTraining',
    path: '/CorporateTraining',
    btnGrad: 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
    categoryPillBg: 'bg-purple-600 text-white',
  },
  {
    id: 203,
    category: 'corporate',
    name: 'Full Stack Enterprise Engineering',
    title: 'Full Stack Enterprise Engineering',
    subgroup: 'Corporate Training',
    subtitle: 'Upskill engineering teams in scalable cloud architectures, React/Node microservices & DevOps.',
    details: 'Modernize enterprise developer teams with deep-dive technical modules in React, Node.js microservices, Docker containerization, REST/GraphQL APIs, CI/CD automated delivery, and secure cloud operations.',
    tags: ['Microservices', 'React', 'Node.js', 'Docker'],
    skills: ['React.js', 'Node.js', 'Microservices', 'Docker', 'CI/CD Pipelines', 'REST APIs', 'Cloud Security'],
    features: [
      'Enterprise Cloud & Microservices Architecture',
      'CI/CD Pipelines & Secure REST APIs',
      'Modern Frontend & Backend Team Upskilling',
      'Database Scalability & Code Optimization'
    ],
    role: 'Enterprise Software Consultant',
    certification: 'Certificate in Enterprise Software Architecture',
    duration: '4–8 Weeks',
    eligibility: 'Software Engineers, Technical Leads & IT Staff',
    careerAreas: 'Senior Full Stack Engineer, Tech Lead, Cloud Architect',
    image: '/course_mern.jpg',
    badge: 'TECH UPSKILL',
    rating: '4.9',
    route: '/CorporateTraining',
    path: '/CorporateTraining',
    btnGrad: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
    categoryPillBg: 'bg-emerald-600 text-white',
  },
  {
    id: 204,
    category: 'corporate',
    name: 'Digital Marketing & Growth Strategy',
    title: 'Digital Marketing & Growth Strategy',
    subgroup: 'Corporate Training',
    subtitle: 'Scale customer acquisition with ROI-driven performance marketing, multi-channel advertising & SEO.',
    details: 'Corporate marketing upskilling designed for commercial and growth teams to dominate digital channels through omnichannel ad funnels, search marketing, retention loops, and attribution analytics.',
    tags: ['SEO', 'Meta Ads', 'Google Ads', 'Growth Funnels'],
    skills: ['Growth Marketing', 'Google Ads', 'Meta Advertising', 'B2B Marketing', 'Web Analytics', 'Attribution'],
    features: [
      'Multi-Channel Growth Marketing & SEO',
      'Omnichannel Ad Funnels & Conversion Tracking',
      'Meta & Google Ads Campaign Scaling',
      'B2B & B2C Brand Strategy & Analytics'
    ],
    role: 'Corporate Growth Marketing Lead',
    certification: 'Certificate in Corporate Growth & Digital Marketing',
    duration: '2–4 Weeks',
    eligibility: 'Marketing, Growth, Sales & Product Teams',
    careerAreas: 'Growth Marketing Manager, Digital Marketing Director, Performance Lead',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badge: 'ROI DRIVEN',
    rating: '4.8',
    route: '/CorporateTraining',
    path: '/CorporateTraining',
    btnGrad: 'from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700',
    categoryPillBg: 'bg-amber-600 text-white',
  },

  // ── 3. UNIVERSITY PROGRAMS (4) ──
  {
    id: 301,
    category: 'university',
    name: 'Bachelor of Computer Applications (BCA)',
    title: 'Bachelor of Computer Applications (BCA)',
    subgroup: 'University Programs',
    subtitle: 'UGC-entitled university degree in computer science, software engineering, databases and programming.',
    details: 'A comprehensive 3-year undergraduate degree program recognized by UGC-DEB, combining academic foundations in computer science with practical programming, database design, networking, and web development.',
    tags: ['UGC Recognized', 'Software Engg', 'Java/C++', 'Database Mgmt'],
    skills: ['C/C++', 'Java', 'Python', 'Web Technologies', 'Database Systems', 'Operating Systems', 'Networking'],
    features: [
      'UGC-DEB Entitled Recognized Degree',
      'Flexible Online Exam & Semester LMS',
      'Core Programming (Java, C++, Python, Web)',
      'Database Management & Cloud Architecture'
    ],
    role: 'Graduate Degree in Computer Applications',
    certification: 'UGC-Entitled Bachelor of Computer Applications',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 in Any Stream / Mathematics Preferred',
    careerAreas: 'Software Engineer, Systems Analyst, Web Developer, IT Consultant',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    badge: 'UGC-ENTITLED',
    rating: '4.9',
    route: '/UniversityCourses',
    path: '/UniversityCourses',
    btnGrad: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    categoryPillBg: 'bg-blue-600 text-white',
  },
  {
    id: 302,
    category: 'university',
    name: 'Master of Business Administration (MBA)',
    title: 'Master of Business Administration (MBA)',
    subgroup: 'University Programs',
    subtitle: 'UGC-entitled postgraduate degree with dual specializations in Marketing, Finance, HR and Operations.',
    details: 'A prestigious 2-year master degree program tailored for working professionals and graduates to accelerate executive career trajectories with specialized knowledge in corporate leadership, strategy, finance, and marketing.',
    tags: ['UGC Recognized', 'Marketing', 'Finance', 'HR Leadership'],
    skills: ['Strategic Management', 'Corporate Finance', 'Brand Marketing', 'Human Resources', 'Supply Chain', 'Business Analytics'],
    features: [
      'Dual Specialization in Core Business Domains',
      'Industry Case Studies & Executive Mentorship',
      'Flexible Online Self-Paced Learning Portal',
      'Recognized for Government & MNC Jobs'
    ],
    role: 'Master of Business Administration',
    certification: 'UGC-Entitled Master of Business Administration',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation in Any Discipline',
    careerAreas: 'Business Manager, Marketing Director, Financial Controller, Operations Lead',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    badge: 'TOP CHOICE',
    rating: '4.9',
    route: '/UniversityCourses',
    path: '/UniversityCourses',
    btnGrad: 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
    categoryPillBg: 'bg-purple-600 text-white',
  },
  {
    id: 303,
    category: 'university',
    name: 'Bachelor of Business Administration (BBA)',
    title: 'Bachelor of Business Administration (BBA)',
    subgroup: 'University Programs',
    subtitle: 'Foundation degree in business administration, corporate leadership, marketing and management.',
    details: 'A structured 3-year undergraduate course offering practical knowledge in organizational behavior, business economics, financial management, commercial law, and modern digital business operations.',
    tags: ['UGC Recognized', 'Management', 'Business Strategy', 'Finance'],
    skills: ['Business Economics', 'Marketing Management', 'Financial Accounting', 'Corporate Communication', 'Business Law'],
    features: [
      'Foundational Business & Finance Principles',
      'Marketing, Human Resources & Organizational Management',
      'Career Mentorship & Academic Support',
      'UGC-Recognized University Accreditation'
    ],
    role: 'Graduate Degree in Business Administration',
    certification: 'UGC-Entitled Bachelor of Business Administration',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 in Any Stream',
    careerAreas: 'Business Analyst, Marketing Executive, HR Associate, Operations Specialist',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    badge: 'POPULAR UG',
    rating: '4.8',
    route: '/UniversityCourses',
    path: '/UniversityCourses',
    btnGrad: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
    categoryPillBg: 'bg-amber-600 text-white',
  },
  {
    id: 304,
    category: 'university',
    name: 'Master of Computer Applications (MCA)',
    title: 'Master of Computer Applications (MCA)',
    subgroup: 'University Programs',
    subtitle: 'Advanced postgraduate degree in software development, cloud systems and modern computing.',
    details: 'An advanced 2-year postgraduate program equipping technical graduates with master-level competence in scalable software architecture, artificial intelligence, cloud infrastructure, and enterprise system design.',
    tags: ['UGC Recognized', 'Cloud Computing', 'AI Systems', 'Algorithms'],
    skills: ['Advanced Java', 'Python & AI', 'Cloud Computing (AWS/Azure)', 'Enterprise Architecture', 'Data Structures & Algorithms'],
    features: [
      'Advanced Software Engineering & Algorithms',
      'Cloud Systems, Distributed Databases & DevOps',
      'UGC Entitled High-Value Master Degree',
      'Capstone Project & Industry Internship'
    ],
    role: 'Postgraduate Degree in Computer Applications',
    certification: 'UGC-Entitled Master of Computer Applications',
    duration: '2 Years (4 Semesters)',
    eligibility: 'BCA / B.Sc. IT / Graduation with Math',
    careerAreas: 'Principal Software Engineer, Cloud Architect, Systems Consultant',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    badge: 'CAREER BOOST',
    rating: '4.9',
    route: '/UniversityCourses',
    path: '/UniversityCourses',
    btnGrad: 'from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    categoryPillBg: 'bg-blue-600 text-white',
  },

  // ── 4. LIVE PROJECTS (4) ──
  {
    id: 401,
    category: 'live',
    name: 'Full-Stack SaaS & Web Live Project',
    title: 'Full-Stack SaaS & Web Live Project',
    subgroup: 'Live Projects',
    subtitle: 'Build and deploy an enterprise SaaS platform with React, Node.js, REST APIs, PostgreSQL & AWS.',
    details: 'Hands-on live industry internship project where students collaborate in sprint teams using Git, building customer portals, subscription billing, multi-tenant databases, and deploying directly to cloud servers.',
    tags: ['React', 'Node.js', 'REST APIs', 'AWS Deployment'],
    skills: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Stripe API', 'Git & GitHub', 'AWS Deployment'],
    features: [
      'Production SaaS Architecture with React & Node',
      'Stripe Payments, PostgreSQL & REST APIs',
      'Git Team Collaboration & Pull Requests',
      'Live Production AWS / Vercel Cloud Deployment'
    ],
    role: 'Certified Live Project Engineer',
    certification: 'Live Project Experience Certificate',
    duration: '6 Weeks / 3–6 Months',
    eligibility: 'BCA / B.Tech / MCA / Web Developers',
    careerAreas: 'Full Stack Developer, Software Engineer, Backend Specialist',
    image: '/course_mern.jpg',
    badge: 'LIVE SPRINT',
    rating: '4.9',
    route: '/LiveProject',
    path: '/LiveProject',
    btnGrad: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    categoryPillBg: 'bg-blue-600 text-white',
  },
  {
    id: 402,
    category: 'live',
    name: 'Cross-Platform Mobile App Live Project',
    title: 'Cross-Platform Mobile App Live Project',
    subgroup: 'Live Projects',
    subtitle: 'Develop and publish a production-ready mobile application using Flutter & Firebase backend.',
    details: 'Experience true mobile engineering by building an end-to-end mobile product with real-time Firebase syncing, native device hardware APIs, push notifications, offline caching, and Google Play Store rollout.',
    tags: ['Flutter', 'Firebase', 'Mobile UX', 'App Store'],
    skills: ['Flutter', 'Dart', 'Firebase Auth & Firestore', 'State Management (Bloc/Provider)', 'REST APIs', 'Play Store Deployment'],
    features: [
      'End-to-End Flutter & Firebase Mobile App',
      'Real-Time State Management & Offline Caching',
      'Camera, GPS & Push Notification Integrations',
      'Google Play Store Release & Deployment'
    ],
    role: 'Mobile Application Project Specialist',
    certification: 'Mobile App Live Project Certificate',
    duration: '6 Weeks / 3–6 Months',
    eligibility: 'BCA / B.Tech / MCA / Mobile Aspirants',
    careerAreas: 'Flutter Developer, Mobile App Engineer, Android Developer',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    badge: 'STORE READY',
    rating: '4.9',
    route: '/LiveProject',
    path: '/LiveProject',
    btnGrad: 'from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700',
    categoryPillBg: 'bg-purple-600 text-white',
  },
  {
    id: 403,
    category: 'live',
    name: 'AI & Machine Learning Live Project',
    title: 'AI & Machine Learning Live Project',
    subgroup: 'Live Projects',
    subtitle: 'Build end-to-end Machine Learning pipelines, LLM-powered search agents & interactive web apps.',
    details: 'Work with enterprise-scale datasets to clean, preprocess, train predictive models, integrate Large Language Models (LLMs) with LangChain, and deploy interactive dashboards using Streamlit and FastAPI.',
    tags: ['Python', 'Machine Learning', 'LLMs', 'Data Pipeline'],
    skills: ['Python', 'Pandas & NumPy', 'Scikit-Learn', 'LangChain', 'FastAPI', 'Streamlit', 'Model Deployment'],
    features: [
      'End-to-End ML Pipelines with Python & Scikit-Learn',
      'GenAI Agent & LangChain Query Integration',
      'Real-World Dataset Cleaning & Feature Engineering',
      'Streamlit Interactive Web App Deployment'
    ],
    role: 'Applied AI & ML Project Associate',
    certification: 'AI & ML Live Project Certificate',
    duration: '6 Weeks / 3–6 Months',
    eligibility: 'Technical Students, Math / CS Graduates',
    careerAreas: 'AI Engineer, Machine Learning Developer, Data Scientist',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    badge: 'AI APPLIED',
    rating: '4.9',
    route: '/LiveProject',
    path: '/LiveProject',
    btnGrad: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
    categoryPillBg: 'bg-emerald-600 text-white',
  },
  {
    id: 404,
    category: 'live',
    name: 'Product UI/UX & Design System Live Project',
    title: 'Product UI/UX & Design System Live Project',
    subgroup: 'Live Projects',
    subtitle: 'Execute user research, information architecture, wireframing & clickable prototypes in Figma.',
    details: 'Take a product concept from initial user problem statements to a fully validated Figma design system, micro-interactions, clickable prototypes, usability test reports, and developer design token handoff.',
    tags: ['Figma', 'Design System', 'User Research', 'Prototyping'],
    skills: ['Figma Mastery', 'User Research & Personas', 'Wireframing', 'Interactive Prototyping', 'Design Systems', 'Developer Handoff'],
    features: [
      'End-to-End User Research & Problem Framing',
      'Complete Figma Design System with Auto-Layout',
      'Interactive Micro-Animations & Clickable Prototype',
      'Usability Testing & Developer Handoff Specs'
    ],
    role: 'UI/UX Design Project Specialist',
    certification: 'UI/UX Live Project Certificate',
    duration: '6 Weeks / 3–6 Months',
    eligibility: 'Creative Students & Design Aspirants',
    careerAreas: 'UI/UX Designer, Product Designer, Interaction Designer',
    image: '/course_ui_ux.jpg',
    badge: 'FIGMA SYSTEM',
    rating: '4.8',
    route: '/LiveProject',
    path: '/LiveProject',
    btnGrad: 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700',
    categoryPillBg: 'bg-rose-600 text-white',
  }
];

const whyChooseUsFeatures = [
  {
    line1: 'Experienced',
    line2: 'Faculty',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="6.5" r="3.2" />
        <path d="M12 11.2c-3.2 0-6.5 1.6-6.5 4.1v1.7h13v-1.7c0-2.5-3.3-4.1-6.5-4.1z" />
        <circle cx="4.5" cy="8" r="1.3" />
        <circle cx="19.5" cy="8" r="1.3" />
        <rect x="3.5" y="11" width="2" height="2" rx="0.5" />
        <rect x="18.5" y="11" width="2" height="2" rx="0.5" />
      </svg>
    ),
  },
  {
    line1: 'Hands-on',
    line2: 'Training',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 6h-3V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2H6c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2h2v2h-2V4zm7 15H6V8h12v11z" />
        <path d="M11 16h2v-2.5h2.5v-2H13V9h-2v2.5H8.5v2H11z" />
      </svg>
    ),
  },
  {
    line1: 'Industry',
    line2: 'Partnerships',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="6" r="2.8" />
        <path d="M12 10c-2.4 0-5 1.3-5 3.2v1.3h10v-1.3c0-1.9-2.6-3.2-5-3.2z" />
        <circle cx="6" cy="7.5" r="2.2" />
        <path d="M6 10.8c-1.8 0-3.5 1-3.5 2.3v1h2.2v-1.2c0-.7.3-1.4.9-1.9-.2-.1-.4-.2-.6-.2z" />
        <circle cx="18" cy="7.5" r="2.2" />
        <path d="M18 10.8c.2 0 .4.1.6.2.6.5.9 1.2.9 1.9v1.2H21.5v-1c0-1.3-1.7-2.3-3.5-2.3z" />
        <circle cx="8.5" cy="18" r="1.5" />
        <circle cx="15.5" cy="18" r="1.5" />
        <rect x="10" y="17.2" width="4" height="1.6" rx="0.5" />
      </svg>
    ),
  },
  {
    line1: 'Placement',
    line2: 'Support',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="7.5" cy="6.8" r="3" />
        <path d="M7.5 11.5c-2.8 0-5.8 1.4-5.8 3.8v2.2h11.6v-2.2c0-2.4-3-3.8-5.8-3.8z" />
        <circle cx="17.5" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="8" r="1.8" />
        <path d="M17.5 2.2v2M17.5 11.8v2M11.8 8h2M21.2 8h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    line1: 'Flexible',
    line2: 'Learning',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 5c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v2H5v9H3V5zm16 4H8c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zm-6 8v-5l4.5 2.5L13 17z" />
        <path d="M6.5 2.5a1 1 0 0 0 0 2H8L5.7 6.8a1 1 0 1 0 1.4 1.4L9.4 5.9V7.5a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1h-4zm11 19a1 1 0 0 0 0-2H16l2.3-2.3a1 1 0 1 0-1.4-1.4l-2.3 2.3v-1.6a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1h4z" />
      </svg>
    ),
  },
  {
    line1: 'Modern',
    line2: 'Infrastructure',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 3h7v18H4V3zm9 4h7v14h-7V7zM6 5v2h3V5H6zm0 4v2h3V9H6zm0 4v2h3v-2H6zm0 4v2h3v-2H6zm9-6v2h3v-2h-3zm0 4v2h3v-2h-3zm0 4v2h3v-2h-3z" />
      </svg>
    ),
  },
];

const whyChooseUsPillars = [
  {
    title: "ESTABLISHED SINCE 2002",
    desc: "More than two decades of experience in education, IT training, professional courses and higher education support.",
    badge: "20+ Years Legacy",
    iconBg: "bg-blue-50 text-[#0066ff]",
  },
  {
    title: "PRACTICAL & SKILL-BASED LEARNING",
    desc: "Our programmes focus on developing practical knowledge and relevant skills alongside academic learning.",
    badge: "100% Practical",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "INDUSTRY-ORIENTED TRAINING",
    desc: "Course content and practical activities are designed to help learners understand current workplace requirements and professional practices.",
    badge: "Modern Workflows",
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    title: "FREE CAREER GUIDANCE",
    desc: "Students can access career guidance sessions at no additional cost and interact with experienced industry professionals and career advisors.",
    badge: "No Additional Cost",
    iconBg: "bg-amber-50 text-amber-600",
  },
  {
    title: "LIVE PROJECT EXPERIENCE",
    desc: "Students can gain practical exposure through structured live projects and project-based learning in relevant technology domains.",
    badge: "Real Applications",
    iconBg: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "INTERNSHIP OPPORTUNITIES",
    desc: "Eligible students may receive opportunities for corporate internships, including paid internship opportunities, subject to company requirements and selection.",
    badge: "Corporate Tie-ups",
    iconBg: "bg-rose-50 text-rose-600",
  },
  {
    title: "UNIVERSITY & DISTANCE EDUCATION",
    desc: "Multiple pathways are available for students and working professionals seeking undergraduate, postgraduate, diploma, certificate and professional programmes.",
    badge: "UGC / DEB Approved",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "CAREER & PLACEMENT SUPPORT",
    desc: "We help students prepare for employment through resume development, interview preparation, career guidance and relevant recruitment opportunities.",
    badge: "Job Ready",
    iconBg: "bg-teal-50 text-teal-600",
  },
  {
    title: "LEARNING FOR EVERY STAGE",
    desc: "Our programmes support school students, technical learners, graduates, freshers, working professionals and career changers.",
    badge: "For All Learners",
    iconBg: "bg-orange-50 text-orange-600",
  }
];

const whyChooseKeyDifference = [
  {
    step: "01",
    title: "Learn",
    desc: "Build academic and technical knowledge."
  },
  {
    step: "02",
    title: "Practice",
    desc: "Apply concepts through practical training and projects."
  },
  {
    step: "03",
    title: "Experience",
    desc: "Gain industry exposure through live projects and internship opportunities."
  },
  {
    step: "04",
    title: "Prepare",
    desc: "Develop professional skills, resumes and interview readiness."
  },
  {
    step: "05",
    title: "Progress",
    desc: "Move towards higher education, employment or continued professional development."
  }
];

function GradCapBooksIllustration({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Soft Ground Shadow */}
      <ellipse cx="62" cy="106" rx="40" ry="6" fill="#00285e" fillOpacity="0.12" />

      {/* ── BOTTOM BOOK (Navy Blue) ── */}
      <path d="M22 93 L68 107 L102 91 L56 78 Z" fill="#0f2b5c" />
      <path d="M25 89 L68 102 L98 87 L56 75 Z" fill="#f8fafc" />
      <path d="M25 89 L68 102 L68 97 L25 85 Z" fill="#e2e8f0" />
      <path d="M68 102 L98 87 L98 83 L68 97 Z" fill="#cbd5e1" />
      <path d="M27 88 L67 100" stroke="#94a3b8" strokeWidth="0.6" />
      <path d="M69 100 L96 86" stroke="#94a3b8" strokeWidth="0.6" />
      <path d="M23 85 L68 98 L100 83 L55 71 Z" fill="#1e3a8a" />
      <path d="M22 93 C20 90 20 87 23 85 L25 85 L25 93 Z" fill="#172554" />

      {/* ── TOP BOOK (Vibrant Orange) ── */}
      <path d="M24 78 L68 91 L98 77 L54 65 Z" fill="#c2410c" />
      <path d="M26 75 L68 87 L95 73 L54 62 Z" fill="#fff7ed" />
      <path d="M26 75 L68 87 L68 82 L26 71 Z" fill="#fed7aa" />
      <path d="M68 87 L95 73 L95 69 L68 82 Z" fill="#fdba74" />
      <path d="M23 79 C21 76 21 72 24 70 L26 70 L26 79 Z" fill="#9a3412" />
      <path d="M24 70 L68 82 L97 68 L54 57 Z" fill="#f97316" />
      <path d="M24 70 L68 82 L68 84 L24 72 Z" fill="#ea580c" />

      {/* ── GRADUATION CAP (Mortarboard) ── */}
      <path d="M45 53 C45 53 45 65 60 66 C75 65 75 53 75 53 Z" fill="#0f2b5c" />
      <path d="M48 53 C48 62 72 62 72 53 Z" fill="#001845" />

      <polygon points="60,24 100,38 60,52 20,38" fill="#002b66" />
      <polygon points="60,25 97,38 60,50 23,38" fill="#003882" />
      <polyline points="20,38 60,52 100,38" stroke="#0056b3" strokeWidth="1" />

      <ellipse cx="60" cy="38" rx="3.5" ry="2.2" fill="#fed000" />
      <path d="M60 38 Q72 40 78 47 Q82 53 81 60" stroke="#fed000" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <rect x="78" y="59" width="5.5" height="11" rx="1.5" fill="#fed000" />
      <path d="M78 64 L83.5 64" stroke="#d97706" strokeWidth="1" />
    </svg>
  );
}

const studentTestimonials = [
  {
    quote: "Aayush Institute helped me build my technical skills and got placed in a leading IT company. The faculty and support team are excellent!",
    name: "Rahul Sharma",
    role: "Full Stack Development Student",
    avatar: "/rahul_sharma_avatar.jpg",
  },
  {
    quote: "The practical training and real-time live projects gave me immense confidence. I secured multiple job offers before finishing my course!",
    name: "Priya Verma",
    role: "UI/UX & Frontend Student",
    avatar: "/priya_verma_avatar.jpg",
  },
  {
    quote: "Dedicated mentors and personal doubt clearing sessions made learning programming so straightforward. Truly best career institute!",
    name: "Aman Gupta",
    role: "Python & Data Science Graduate",
    avatar: "/aman_gupta_avatar.jpg",
  },
  {
    quote: "From career counselling to final campus placement, the faculty guided me at every step. Thank you Aayush Institute for shaping my career!",
    name: "Sneha Patel",
    role: "Digital Marketing & SEO Student",
    avatar: "/sneha_patel_avatar.jpg",
  },
];

const latestBlogs = [
  {
    id: 101,
    image: "/blog_it_skills.jpg",
    tag: "Career Tips",
    title: "Top IT Skills in 2026 That Can Boost Your Career",
    date: "12 Sep 2025",
    readTime: "4 min read",
    author: "Tech Training Cell",
    excerpt: "Discover the most in-demand software skills — Full Stack development, Cloud services, and AI workflows — to fast-track your tech career.",
    content: "The tech industry demands multi-skilled developers who understand modern web architectures, API design, and containerized deployment. Specializing in high-growth ecosystems like React, Node.js, and Python opens accelerated job opportunities across startups and multinational enterprises. At Aayush Institute, we combine theoretical foundations with live project sprints and interview preparation.",
    highlights: [
      "Master MERN (MongoDB, Express, React, Node.js)",
      "Hands-on Git/GitHub collaboration & CI/CD",
      "API integrations with AI & cloud infrastructure",
      "100% placement assistance & mock tech interviews"
    ],
    relatedLink: "/Courses"
  },
  {
    id: 102,
    image: "/blog_distance_edu.jpg",
    tag: "Education",
    title: "Benefits of Distance Education for Working Professionals",
    date: "10 Sep 2025",
    readTime: "3 min read",
    author: "Academic Advisory",
    excerpt: "Learn how UGC-DEB entitled online degrees empower working adults to earn accredited qualifications without quitting their day jobs.",
    content: "Balancing career growth with higher education is easier than ever with UGC-entitled distance and online learning. Professionals can pursue BCA, MCA, BBA, or MBA programs with flexible schedules, digital study materials, and proctored examinations. Recognized degrees unlock promotions, salary appraisals, and higher managerial appointments.",
    highlights: [
      "UGC-DEB recognized degree credentials",
      "Self-paced learning with weekend faculty support",
      "Cost-effective fee structures with EMI options",
      "Eligible for corporate promotions & government tests"
    ],
    relatedLink: "/UniversityCourses"
  },
  {
    id: 103,
    image: "/blog_internships.jpg",
    tag: "Internship",
    title: "How Internships Help You Get Hired Faster",
    date: "08 Sep 2025",
    readTime: "3 min read",
    author: "Placement Cell",
    excerpt: "Real-world project experience bridges the gap between classroom concepts and high-velocity corporate engineering standards.",
    content: "Internships offer invaluable exposure to agile development workflows, sprint planning, pull request reviews, and production bug resolutions. Candidates with proven internship experience stand out significantly during campus placements and technical rounds, with many securing direct pre-placement offers (PPOs).",
    highlights: [
      "Work on live client deliverables and prototypes",
      "Mentorship from experienced senior tech leads",
      "Build a verified GitHub & live portfolio website",
      "Official certificate of completion & recommendation"
    ],
    relatedLink: "/LiveProject"
  },
  {
    id: 104,
    image: "/blog_future_ai.jpg",
    tag: "Technology",
    title: "The Future of AI & How It's Changing the Job Market",
    date: "05 Sep 2025",
    readTime: "4 min read",
    author: "AI Innovation Lab",
    excerpt: "Artificial intelligence is reshaping everyday workflows. Learn how developers and creators can leverage AI to multiply their output.",
    content: "AI tools are not here to replace developers, but developers who understand AI-assisted tooling will outperform those who don't. From automated coding assistants to intelligent chatbots and predictive data models, incorporating AI into your skillset equips you for modern, high-value tech positions.",
    highlights: [
      "Integrating LLM APIs & automated workflows",
      "Copilot-assisted coding and debugging",
      "Data analysis & visualization using modern tools",
      "Future-proofing skills for next-gen roles"
    ],
    relatedLink: "/Courses"
  },
  {
    id: 105,
    image: "/blog_it_skills.jpg",
    tag: "Web Development",
    title: "Full Stack Roadmap 2026: Frontend, Backend & System Design",
    date: "01 Oct 2025",
    readTime: "5 min read",
    author: "Full Stack Department",
    excerpt: "Everything you need to know about mastering React 19, Node.js, databases, and modern cloud deployment in 2026.",
    content: "Full-stack development continues to be the bedrock of modern software engineering. With the evolution of server components, TypeScript, and distributed microservices, engineers who can bridge the gap between user experience and reliable backend architecture command top tier compensation.",
    highlights: [
      "Modern React & Next.js architectures",
      "PostgreSQL, MongoDB, and Redis caching",
      "Dockerizing applications & cloud deployments",
      "100% placement track with top tech firms"
    ],
    relatedLink: "/Courses"
  },
  {
    id: 106,
    image: "/blog_distance_edu.jpg",
    tag: "Design & UX",
    title: "Mastering UI/UX: From User Research to High-Converting Interfaces",
    date: "28 Sep 2025",
    readTime: "4 min read",
    author: "Design Studio Lead",
    excerpt: "Explore the core fundamentals of UX research, Figma design systems, and rapid prototyping that employers look for.",
    content: "Exceptional digital products rely on human-centric design. Learning user journey mapping, wireframing, component-driven design systems in Figma, and usability testing enables aspiring designers to create intuitive, accessible, and delightful digital experiences.",
    highlights: [
      "Figma components, variants & auto-layout",
      "User research & usability testing methods",
      "Building production-ready design systems",
      "Live portfolio creation & client feedback"
    ],
    relatedLink: "/Courses"
  }
];

const DEFAULT_HERO_SETTINGS = {
  pillText: "Your Career • Our Commitment",
  titleLine1: "Upgrade Your Skills",
  titleLine2: "Build a Better Future",
  subtitle: "Aayush Institute of Professional Studies – Your trusted partner in professional education, skill development and career growth.",
  sloganLine1: "Learn",
  sloganLine2: "Practice",
  sloganLine3: "Get Placed",
  bgImage: "/hero_downloaded_bg.png",
  feature1: "Industry Aligned Courses",
  feature2: "Live Projects & Training",
  feature3: "Expert Faculty & Mentorship",
  feature4: "100% Career Support",
  primaryBtnText: "Explore Courses",
  primaryBtnLink: "/Courses",
  videoBtnText: "Watch Our Video",
  videoUrl: "https://www.youtube.com",
  counsellingTitle: "Free Career Counselling",
  counsellingSubtitle: "Know the Right Course for You",
  counsellingPoints: [
    "Personalised Guidance",
    "Course Comparison",
    "Career Roadmap",
    "100% Free Consultation"
  ],
  counsellingBtnText: "Book Your Counselling"
};

const resolveHeroImageUrl = (img) => {
  if (!img) return "/hero_downloaded_bg.png";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) return img;
  if (img.startsWith("/Uploads/")) return `http://localhost:4001${img}`;
  if (img.startsWith("Uploads/")) return `http://localhost:4001/${img}`;
  if (img.startsWith("/")) return img;
  return `/${img}`;
};

// ─── Main Component ─────────────────────────────────────────────────────────

export default function MainPage() {
  const navigate = useNavigate();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [testimonialsList, setTestimonialsList] = useState(studentTestimonials);
  const [heroSettings, setHeroSettings] = useState(DEFAULT_HERO_SETTINGS);
  const [counsellingForm, setCounsellingForm] = useState({
    name: '',
    mobile: '',
    course: '',
    message: '',
  });
  const [counsellingSubmitted, setCounsellingSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWhyChooseModalOpen, setIsWhyChooseModalOpen] = useState(false);
  const [selectedBlogModal, setSelectedBlogModal] = useState(null);
  const [blogsList, setBlogsList] = useState(latestBlogs);
  const [blogSlideIndex, setBlogSlideIndex] = useState(0);
  const [isBlogPaused, setIsBlogPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const blogScrollRef = useRef(null);
  const blogModalContentRef = useRef(null);

  // ── 1. Top Reading Scroll Progress ──
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── 2. Scroll Reveal Intersection Observer (100% Safe with Offline Fallback) ──
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.04,
        rootMargin: '50px 0px 50px 0px'
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale');
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();
    const t1 = setTimeout(observeAll, 150);
    const t2 = setTimeout(observeAll, 600);

    // Guaranteed fallback: ensures UI is always 100% visible even offline or on slow network
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale').forEach((el) => {
        el.classList.add('is-revealed');
      });
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, []);

  // Live fetch Hero section settings from MongoDB
  const fetchHeroSettings = async () => {
    try {
      const res = await fetch('/api/site-settings');
      if (res.ok) {
        const data = await res.json();
        if (data && data.heroSection) {
          setHeroSettings((prev) => ({
            ...prev,
            ...data.heroSection,
            counsellingPoints:
              Array.isArray(data.heroSection.counsellingPoints) &&
              data.heroSection.counsellingPoints.length > 0
                ? data.heroSection.counsellingPoints
                : prev.counsellingPoints,
          }));
        }
      }
    } catch (err) {
      // Keep DEFAULT_HERO_SETTINGS fallback
    }
  };

  // Fetch blogs dynamically from Backend API sorted by displayOrder (1, 2, 3...)
  useEffect(() => {
    let isMounted = true;
    const fetchBlogsFromApi = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            const formatted = data
              .filter((b) => b.status !== 'Draft')
              .sort((a, b) => (Number(a.displayOrder) || 999) - (Number(b.displayOrder) || 999))
              .map((b, idx) => ({
                id: b._id || b.id || idx + 1,
                _id: b._id,
                displayOrder: b.displayOrder ?? idx + 1,
                image: b.coverImage 
                  ? (b.coverImage.startsWith('http') || b.coverImage.startsWith('/') 
                      ? b.coverImage 
                      : `http://localhost:4001/${b.coverImage}`)
                  : '/corporate_ai.jpg',
                tag: b.tag || b.category || 'Career',
                title: b.title,
                date: b.date || '2026',
                readTime: b.readTime || '3 min read',
                author: b.author || 'Academic Advisory',
                excerpt: b.shortDescription || b.excerpt || '',
                content: b.longDescription || b.content || '',
                highlights: Array.isArray(b.highlights) && b.highlights.length > 0 ? b.highlights : [
                  "Hands-on practical industry workflows",
                  "Direct mentor feedback & code reviews",
                  "Verified GitHub projects & portfolio",
                  "100% placement guidance & interview prep"
                ],
                relatedLink: b.relatedLink || '/Courses',
                status: b.status || 'Published'
              }));
            if (formatted.length > 0) {
              setBlogsList(formatted);
            }
          }
        }
      } catch (err) {
        console.warn('Using static fallback blogs:', err);
      }
    };
    fetchBlogsFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-slide blogs on homepage every 3.5 seconds
  useEffect(() => {
    if (isBlogPaused || selectedBlogModal) return;
    const timer = setInterval(() => {
      if (!blogScrollRef.current) return;
      const el = blogScrollRef.current;
      const card = el.querySelector('[data-blog-card]');
      const cardWidth = card ? card.offsetWidth : 300;
      const gap = 16;
      const step = cardWidth + gap;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft + step >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        setBlogSlideIndex(0);
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
        setBlogSlideIndex((prev) => prev + 1);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isBlogPaused, selectedBlogModal]);

  const handleNextBlogSlide = () => {
    if (!blogScrollRef.current) return;
    const el = blogScrollRef.current;
    const card = el.querySelector('[data-blog-card]');
    const cardWidth = card ? card.offsetWidth : 300;
    const gap = 16;
    const step = cardWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (el.scrollLeft + step >= maxScroll - 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
      setBlogSlideIndex(0);
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' });
      setBlogSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevBlogSlide = () => {
    if (!blogScrollRef.current) return;
    const el = blogScrollRef.current;
    const card = el.querySelector('[data-blog-card]');
    const cardWidth = card ? card.offsetWidth : 300;
    const gap = 16;
    const step = cardWidth + gap;

    if (el.scrollLeft - step <= 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
      setBlogSlideIndex(0);
    } else {
      el.scrollBy({ left: -step, behavior: 'smooth' });
      setBlogSlideIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Close blog modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedBlogModal(null);
    };
    if (selectedBlogModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlogModal]);

  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const openCourseModal = (course) => {
    setSelectedCourseDetails(course);
    setIsCourseModalOpen(true);
  };

  const closeCourseModal = () => {
    setIsCourseModalOpen(false);
    setSelectedCourseDetails(null);
  };

  const [modalForm, setModalForm] = useState({
    name: '',
    mobile: '',
    course: '',
    message: '',
  });
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const popularCoursesScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const [popularCoursesList, setPopularCoursesList] = useState(() => {
    try {
      const saved = localStorage.getItem('aayush_custom_courses');
      if (saved) {
        const parsed = JSON.parse(saved);
        const allCustom = Object.values(parsed).flat();
        if (allCustom.length > 0) {
          return popularCoursesData.map(defCourse => {
            const match = allCustom.find(c => c.id === defCourse.id || (c.name && defCourse.name && c.name.toLowerCase() === defCourse.name.toLowerCase()));
            if (match) {
              return {
                ...defCourse,
                name: match.name || defCourse.name,
                title: match.name || defCourse.title,
                subgroup: match.subgroup || defCourse.subgroup,
                subtitle: match.oneLiner || defCourse.subtitle,
                details: match.details || match.oneLiner || defCourse.details,
                duration: match.duration || defCourse.duration,
                eligibility: match.eligibility || defCourse.eligibility,
                certification: match.certification || defCourse.certification,
                image: match.image || defCourse.image
              };
            }
            return defCourse;
          });
        }
      }
    } catch {}
    return popularCoursesData;
  });

  // Live sync courses from MongoDB /api/courses
  const fetchDbCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      if (res.ok) {
        const dbList = await res.json();
        if (Array.isArray(dbList) && dbList.length > 0) {
          // dbList is already sorted by order: 1 (ascending, so #1 priority is first)
          const formattedList = dbList
            .filter(c => c.visible !== false)
            .map(c => {
              const def = popularCoursesData.find(p => 
                String(p.id) === String(c.id) ||
                String(p.id) === String(c._id) ||
                (p.name && c.name && p.name.toLowerCase() === c.name.toLowerCase()) ||
                (p.title && c.title && p.title.toLowerCase() === c.title.toLowerCase())
              ) || {};

              return {
                ...def,
                _id: c._id,
                id: c._id || c.id || def.id,
                order: c.order ?? def.order ?? 99,
                name: c.name || c.title || def.name,
                title: c.title || c.name || def.title,
                subgroup: c.subgroup || c.categoryName || def.subgroup || 'Skill Course',
                subtitle: c.oneLiner || c.description || c.subtitle || def.subtitle || 'Industry-ready professional training course.',
                details: c.details || c.description || c.oneLiner || def.details || 'Comprehensive curriculum with practical labs and mentorship.',
                duration: c.duration || def.duration || '3 to 6 Months',
                fees: c.fees || def.fees || "₹ 45,000/-",
                scholarship: c.scholarship || def.scholarship || "Up to 50%",
                mode: c.mode || def.mode || "Classroom / Online / Hybrid",
                eligibility: c.eligibility || def.eligibility || "10th / 12th / Graduates / Working Professionals",
                certification: c.certification || def.certification || "Aayush Certified Professional",
                batchSchedule: c.batchSchedule || def.batchSchedule || "Weekday & Weekend Batches",
                image: c.image || def.image || '/course_web_design.jpg',
                tags: Array.isArray(c.tags) && c.tags.length > 0 ? c.tags : (Array.isArray(c.skills) && c.skills.length > 0 ? c.skills.slice(0, 4) : (def.tags || ['Skill', 'Tech', 'Job-Ready'])),
                skills: Array.isArray(c.skills) && c.skills.length > 0 ? c.skills : (def.skills || ['Hands-on Labs', 'Live Projects', 'Mentorship']),
                features: Array.isArray(c.features) && c.features.length > 0 ? c.features : (def.features || [
                  'Hands-on Practical Training',
                  'Live Project Exposure',
                  '100% Placement Assistance',
                  'ISO Verified Certification'
                ]),
                careerAreas: c.careerAreas || def.careerAreas || 'Software Developer, Tech Specialist',
                career: Array.isArray(c.career) ? c.career : def.career,
                rating: c.rating || def.rating || '4.9',
                category: c.categoryId || c.category || def.category || 'professional',
                route: c.programType === 'liveproject' ? '/LiveProject' : (c.programType === 'corporate' ? '/CorporateTraining' : (c.programType === 'university' ? '/UniversityCourses' : '/Courses')),
                path: c.programType === 'liveproject' ? '/LiveProject' : (c.programType === 'corporate' ? '/CorporateTraining' : (c.programType === 'university' ? '/UniversityCourses' : '/Courses')),
                btnGrad: def.btnGrad || 'from-[#0052cc] to-[#0066ff] hover:from-[#0040a8] hover:to-[#0052cc]',
                categoryPillBg: def.categoryPillBg || 'bg-blue-600 text-white',
              };
            });

          if (formattedList.length > 0) {
            setPopularCoursesList(formattedList);
          }
        }
      }
    } catch (err) {
      // offline fallback
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const visibleOnly = data.filter((t) => t.visible !== false);
          const formatted = (visibleOnly.length > 0 ? visibleOnly : data).map((t, idx) => {
            const rawImg = t.profileImageUrl || t.avatar || t.profileImage || fallback.avatar || '/rahul_sharma_avatar.jpg';
            let finalAvatar = rawImg;
            if (rawImg.startsWith('http://') || rawImg.startsWith('https://') || rawImg.startsWith('data:') || rawImg.startsWith('blob:')) {
              finalAvatar = rawImg;
            } else if (rawImg.startsWith('/Uploads/') || rawImg.startsWith('Uploads/') || rawImg.startsWith('/uploads/') || rawImg.startsWith('uploads/')) {
              const cleanPath = rawImg.startsWith('/') ? rawImg : `/${rawImg}`;
              const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001';
              finalAvatar = `${backendUrl}${cleanPath}`;
            } else {
              finalAvatar = rawImg.startsWith('/') ? rawImg : `/${rawImg}`;
            }

            return {
              _id: t._id,
              name: t.name || fallback.name,
              role: t.designation || fallback.role,
              quote: t.message || fallback.quote,
              rating: Number(t.rating) || 5,
              avatar: finalAvatar,
            };
          });
          if (formatted.length > 0) {
            setTestimonialsList(formatted);
          }
        }
      }
    } catch (err) {
      // offline fallback
    }
  };

  useEffect(() => {
    fetchDbCourses();
    fetchTestimonials();
    fetchHeroSettings();
    const pollTimer = setInterval(() => {
      fetchDbCourses();
      fetchTestimonials();
      fetchHeroSettings();
    }, 4000);

    const syncAll = () => {
      fetchDbCourses();
      fetchTestimonials();
      fetchHeroSettings();
    };
    window.addEventListener('coursesUpdated', syncAll);
    window.addEventListener('testimonialsUpdated', syncAll);
    window.addEventListener('siteSettingsUpdated', syncAll);
    window.addEventListener('storage', syncAll);
    return () => {
      clearInterval(pollTimer);
      window.removeEventListener('coursesUpdated', syncAll);
      window.removeEventListener('testimonialsUpdated', syncAll);
      window.removeEventListener('siteSettingsUpdated', syncAll);
      window.removeEventListener('storage', syncAll);
    };
  }, []);

  const checkScrollButtons = () => {
    if (popularCoursesScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = popularCoursesScrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  const scrollPopularCourses = (direction) => {
    if (popularCoursesScrollRef.current) {
      const cardWidth = popularCoursesScrollRef.current.firstElementChild?.clientWidth || 300;
      const scrollAmount = (cardWidth + 16) * (direction === 'left' ? -1 : 1);
      popularCoursesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 350);
    }
  };

  const handleMouseDown = (e) => {
    if (!popularCoursesScrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - popularCoursesScrollRef.current.offsetLeft);
    setScrollLeftState(popularCoursesScrollRef.current.scrollLeft);
    setHasDragged(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !popularCoursesScrollRef.current) return;
    const x = e.pageX - popularCoursesScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      setHasDragged(true);
    }
    popularCoursesScrollRef.current.scrollLeft = scrollLeftState - walk;
    checkScrollButtons();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => setHasDragged(false), 50);
    checkScrollButtons();
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsWhyChooseModalOpen(false);
        setIsCourseModalOpen(false);
      }
    };
    if (isModalOpen || isWhyChooseModalOpen || isCourseModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isWhyChooseModalOpen, isCourseModalOpen]);

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.mobile) return;
    setModalSubmitted(true);
    try {
      await fetch('/api/inquiry/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modalForm.name,
          phone: modalForm.mobile,
          course: modalForm.course || selectedCourseTitle || 'Website Modal Enquiry',
          program: modalForm.course || selectedCourseTitle || 'Website Modal Enquiry',
          message: modalForm.message || 'Submitted via Admission Inquiry Modal on Aayush Website',
        })
      });
    } catch (err) {
      console.warn('Inquiry submission fallback:', err);
    }
    setTimeout(() => {
      setModalSubmitted(false);
      setModalForm({ name: '', mobile: '', course: '', message: '' });
      setIsModalOpen(false);
    }, 2500);
  };

  const handleCounsellingSubmit = async (e) => {
    e.preventDefault();
    if (!counsellingForm.name || !counsellingForm.mobile) return;
    setCounsellingSubmitted(true);
    try {
      await fetch('/api/inquiry/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: counsellingForm.name,
          phone: counsellingForm.mobile,
          course: counsellingForm.course || 'Free Career Counselling',
          program: counsellingForm.course || 'Free Career Counselling',
          message: counsellingForm.message || 'Booked Free Career Counselling Session from Home Page',
        })
      });
    } catch (err) {
      console.warn('Counselling submission fallback:', err);
    }
    setTimeout(() => {
      setCounsellingSubmitted(false);
      setCounsellingForm({ name: '', mobile: '', course: '', message: '' });
    }, 4000);
  };

  return (
    <div className="font-sans bg-white text-gray-800 overflow-x-hidden">

      {/* ── Top Scroll Reading Progress Indicator (Fixed 3.5px gradient bar) ── */}
      <div className="scroll-progress-line" style={{ width: `${scrollProgress}%` }} />

      {/* ── 1. HERO SECTION (Seamless Responsive: Desktop, Tablet 3-Col, Mobile Stacked) ── */}
      <section className="relative overflow-hidden bg-[#e0effe] py-3 md:py-4 lg:py-5 border-b border-blue-100 min-h-[340px] md:min-h-[355px] lg:min-h-[375px] flex items-center">
        
        {/* Full-width Panoramic Background Image (Desktop & Tablet) */}
        <div className="absolute inset-0 z-0">
          <img
            src={resolveHeroImageUrl(heroSettings.bgImage)}
            alt="Hero Background"
            className="w-full h-full object-cover object-[58%_center] sm:object-[58%_center] md:object-[56%_center] lg:object-[56%_top] xl:object-[center_top] hidden md:block"
          />
          {/* Subtle Lightening Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-white/20 pointer-events-none hidden md:block"></div>
        </div>

        {/* Floating Handwritten Slogan — Desktop Only (>= 1024px) where open sky space is available */}
        <div className="absolute top-2 lg:top-2.5 left-[42%] xl:left-[45%] 2xl:left-[47%] hidden lg:block z-10 pointer-events-none text-left animate-soft-float">
          <div className="rotate-[-5deg]">
            <p className="font-semibold text-lg lg:text-xl xl:text-2xl text-[#1d4ed8] leading-tight drop-shadow-xs" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
              {heroSettings.sloganLine1 || 'Learn'}
            </p>
            <p className="font-semibold text-lg lg:text-xl xl:text-2xl text-[#1d4ed8] leading-tight drop-shadow-xs pl-2" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
              {heroSettings.sloganLine2 || 'Practice'}
            </p>
            <p className="font-semibold text-lg lg:text-xl xl:text-2xl text-[#1d4ed8] leading-tight drop-shadow-xs pl-4" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
              {heroSettings.sloganLine3 || 'Get Placed'}
            </p>
            <div className="w-16 lg:w-20 h-1.5 bg-[#fed000] rounded-full mt-0.5 ml-2 transform -rotate-2 shadow-xs"></div>
          </div>
        </div>

        {/* Foreground Content Container */}
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-5 lg:px-8 xl:px-10 w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 lg:gap-5">

            {/* Left Content Column (Proportionate on Tablet & Desktop) */}
            <div className="w-full md:w-[45%] lg:w-[46%] xl:w-[48%] flex flex-col justify-center reveal-on-scroll">
              
              {/* Top Badge */}
              <div className="mb-1 sm:mb-1.5">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#dbeafc] text-[#003882] font-semibold text-[10.5px] sm:text-[11.5px] px-2.5 py-0.5 rounded-full shadow-xs">
                  {heroSettings.pillText || 'Your Career • Our Commitment'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-[23px] lg:text-[29px] xl:text-[36px] 2xl:text-[38px] font-bold text-[#00285e] leading-[1.12] tracking-tight mb-0.5">
                {heroSettings.titleLine1 || 'Upgrade Your Skills'}
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-[23px] lg:text-[29px] xl:text-[36px] 2xl:text-[38px] font-bold text-[#0062ff] leading-[1.12] tracking-tight mb-1.5 sm:mb-2">
                {heroSettings.titleLine2 || 'Build a Better Future'}
              </h2>

              {/* Subtitle */}
              <p className="text-[#1e3a8a] text-xs sm:text-[12.5px] md:text-[11px] lg:text-[12px] xl:text-[13px] leading-relaxed mb-2.5 sm:mb-3 max-w-xl font-normal">
                {heroSettings.subtitle || 'Aayush Institute of Professional Studies – Your trusted partner in professional education, skill development and career growth.'}
              </p>

              {/* Mobile Only: Dedicated Student Visual Card with 4 Features on Left Space */}
              <div className="block md:hidden my-3 relative rounded-2xl overflow-hidden shadow-md border-2 border-white h-[205px] w-full">
                <img
                  src={resolveHeroImageUrl(heroSettings.bgImage)}
                  alt="Aayush Institute Student"
                  className="w-full h-full object-cover object-[70%_25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#e0effe]/30 via-transparent to-transparent pointer-events-none"></div>

                {/* Slogan Badge Top-Right */}
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs rotate-[-3deg] border border-blue-100 z-10">
                  <span className="font-semibold text-[11px] text-[#1d4ed8]" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
                    {[heroSettings.sloganLine1, heroSettings.sloganLine2, heroSettings.sloganLine3].filter(Boolean).join(' • ') || 'Learn • Practice • Get Placed'}
                  </span>
                  <div className="w-12 h-1 bg-[#fed000] rounded-full mt-0.5"></div>
                </div>

                {/* 4 Feature Items on the Left side open space */}
                <div className="absolute inset-y-0 left-0 w-[54%] p-2.5 flex flex-col justify-around z-10 pointer-events-none">
                  {/* 1. Industry Aligned Courses */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                      <path d="M16 2L28 8.5V23.5L16 30L4 23.5V8.5L16 2Z" fill="#002b66" />
                      <rect x="11" y="11" width="10" height="10" rx="2" stroke="white" strokeWidth="1.8" fill="none" />
                      <circle cx="16" cy="16" r="1.5" fill="white" />
                    </svg>
                    <span className="text-[10px] font-semibold text-[#002b66] leading-[1.15] tracking-tight">
                      {heroSettings.feature1 || 'Industry Aligned Courses'}
                    </span>
                  </div>

                  {/* 2. Live Projects & Training */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                      <path d="M7 13C6 11.5 6 9.5 7 8" stroke="#002b66" strokeWidth="2" strokeLinecap="round" />
                      <path d="M25 13C26 11.5 26 9.5 25 8" stroke="#002b66" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="16" cy="8.5" r="4.5" fill="#002b66" />
                      <path d="M8 25C8 19.5 11.5 16 16 16C20.5 16 24 19.5 24 25V27H8V25Z" fill="#002b66" />
                      <path d="M16 16V22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="16" cy="22" r="1.5" fill="white" />
                    </svg>
                    <span className="text-[10px] font-semibold text-[#002b66] leading-[1.15] tracking-tight">
                      {heroSettings.feature2 || 'Live Projects & Training'}
                    </span>
                  </div>

                  {/* 3. Expert Faculty & Mentorship */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                      <circle cx="7.5" cy="11" r="3.2" fill="#002b66" />
                      <path d="M2.5 24C2.5 20.5 4.8 18 8 18C8.8 18 9.6 18.2 10.3 18.5C9.5 20 9 22 9 24.5V26H2.5V24Z" fill="#002b66" />
                      <circle cx="24.5" cy="11" r="3.2" fill="#002b66" />
                      <path d="M29.5 24C29.5 20.5 27.2 18 24 18C23.2 18 22.4 18.2 21.7 18.5C22.5 20 23 22 23 24.5V26H29.5V24Z" fill="#002b66" />
                      <circle cx="16" cy="8.5" r="4.5" fill="#002b66" />
                      <path d="M9 25C9 19.5 12.2 16 16 16C19.8 16 23 19.5 23 25V27H9V25Z" fill="#002b66" />
                      <path d="M13.5 20.5C14.5 21.5 17.5 21.5 18.5 20.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span className="text-[10px] font-semibold text-[#002b66] leading-[1.15] tracking-tight">
                      {heroSettings.feature3 || 'Expert Faculty & Mentorship'}
                    </span>
                  </div>

                  {/* 4. 100% Career Support */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                      <circle cx="12" cy="7.5" r="3.8" fill="#002b66" />
                      <path d="M5 24C5 18.5 8.5 15.5 13 15.5C14.8 15.5 16.5 16.2 17.8 17.4C16.8 18.8 16.2 20.6 16.2 22.5C16.2 23.8 16.5 25 17.1 26H5V24Z" fill="#002b66" />
                      <circle cx="23" cy="22.5" r="6" fill="#002b66" />
                      <circle cx="23" cy="22.5" r="2.8" fill="white" />
                    </svg>
                    <span className="text-[10px] font-semibold text-[#002b66] leading-[1.15] tracking-tight">
                      {heroSettings.feature4 || '100% Career Support'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Feature Icons: Tablet & Desktop Only (hidden on mobile, as they are inside the visual card above) */}
              <div className="hidden md:grid md:grid-cols-2 xl:flex xl:flex-nowrap items-center gap-1.5 sm:gap-2.5 md:gap-1.5 lg:gap-2 xl:gap-0 mb-3 sm:mb-3.5">
                {/* 1. Industry Aligned Courses */}
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-1.5 lg:gap-2 xl:gap-2.5 pr-1 md:pr-1 xl:pr-4 py-0.5 sm:py-1">
                  <svg className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 2L28 8.5V23.5L16 30L4 23.5V8.5L16 2Z"
                      fill="#002b66"
                    />
                    <rect x="11" y="11" width="10" height="10" rx="2" stroke="white" strokeWidth="1.8" fill="none" />
                    <circle cx="16" cy="16" r="1.5" fill="white" />
                  </svg>
                  <span className="text-[10.5px] sm:text-[11.5px] md:text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66] leading-[1.2] tracking-tight">
                    {heroSettings.feature1 || 'Industry Aligned Courses'}
                  </span>
                </div>

                {/* Divider on XL only */}
                <div className="hidden xl:block h-8 w-[1.5px] bg-[#93c5fd]/80 mx-2 flex-shrink-0"></div>

                {/* 2. Live Projects & Practical Training */}
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-1.5 lg:gap-2 xl:gap-2.5 px-0 md:px-1 xl:px-4 py-0.5 sm:py-1">
                  <svg className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                    <path d="M7 13C6 11.5 6 9.5 7 8" stroke="#002b66" strokeWidth="2" strokeLinecap="round" />
                    <path d="M25 13C26 11.5 26 9.5 25 8" stroke="#002b66" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="16" cy="8.5" r="4.5" fill="#002b66" />
                    <path
                      d="M8 25C8 19.5 11.5 16 16 16C20.5 16 24 19.5 24 25V27H8V25Z"
                      fill="#002b66"
                    />
                    <path d="M16 16V22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="16" cy="22" r="1.5" fill="white" />
                  </svg>
                  <span className="text-[10.5px] sm:text-[11.5px] md:text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66] leading-[1.2] tracking-tight">
                    {heroSettings.feature2 || 'Live Projects & Training'}
                  </span>
                </div>

                {/* Divider on XL only */}
                <div className="hidden xl:block h-8 w-[1.5px] bg-[#93c5fd]/80 mx-2 flex-shrink-0"></div>

                {/* 3. Expert Faculty & Mentorship */}
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-1.5 lg:gap-2 xl:gap-2.5 px-0 md:px-1 xl:px-4 py-0.5 sm:py-1">
                  <svg className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                    <circle cx="7.5" cy="11" r="3.2" fill="#002b66" />
                    <path d="M2.5 24C2.5 20.5 4.8 18 8 18C8.8 18 9.6 18.2 10.3 18.5C9.5 20 9 22 9 24.5V26H2.5V24Z" fill="#002b66" />
                    <circle cx="24.5" cy="11" r="3.2" fill="#002b66" />
                    <path d="M29.5 24C29.5 20.5 27.2 18 24 18C23.2 18 22.4 18.2 21.7 18.5C22.5 20 23 22 23 24.5V26H29.5V24Z" fill="#002b66" />
                    <circle cx="16" cy="8.5" r="4.5" fill="#002b66" />
                    <path
                      d="M9 25C9 19.5 12.2 16 16 16C19.8 16 23 19.5 23 25V27H9V25Z"
                      fill="#002b66"
                    />
                    <path d="M13.5 20.5C14.5 21.5 17.5 21.5 18.5 20.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10.5px] sm:text-[11.5px] md:text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66] leading-[1.2] tracking-tight">
                    {heroSettings.feature3 || 'Expert Faculty & Mentorship'}
                  </span>
                </div>

                {/* Divider on XL only */}
                <div className="hidden xl:block h-8 w-[1.5px] bg-[#93c5fd]/80 mx-2 flex-shrink-0"></div>

                {/* 4. 100% Career Support */}
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-1.5 lg:gap-2 xl:gap-2.5 px-0 md:px-1 xl:pl-4 py-0.5 sm:py-1">
                  <svg className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 flex-shrink-0 text-[#002b66]" viewBox="0 0 32 32" fill="none">
                    <circle cx="12" cy="7.5" r="3.8" fill="#002b66" />
                    <path
                      d="M5 24C5 18.5 8.5 15.5 13 15.5C14.8 15.5 16.5 16.2 17.8 17.4C16.8 18.8 16.2 20.6 16.2 22.5C16.2 23.8 16.5 25 17.1 26H5V24Z"
                      fill="#002b66"
                    />
                    <circle cx="23" cy="22.5" r="6" fill="#002b66" />
                    <circle cx="23" cy="22.5" r="2.8" fill="white" />
                  </svg>
                  <span className="text-[10.5px] sm:text-[11.5px] md:text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66] leading-[1.2] tracking-tight">
                    {heroSettings.feature4 || '100% Career Support'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <NavLink
                  to={heroSettings.primaryBtnLink || "/Courses"}
                  className="bg-[#00285e] hover:bg-[#003882] text-white px-3.5 sm:px-5 md:px-3.5 lg:px-6 py-1.5 sm:py-2 md:py-1.5 lg:py-2.5 rounded-full font-medium text-xs md:text-[11px] lg:text-[13px] transition-all shadow-md flex items-center gap-1.5 md:gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {heroSettings.primaryBtnText || 'Explore Courses'} <ArrowRight className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                </NavLink>
                <button
                  onClick={() => window.open(heroSettings.videoUrl || 'https://www.youtube.com', '_blank')}
                  className="bg-white border-2 border-[#0062ff] hover:bg-blue-50/80 text-[#00285e] px-3 sm:px-4 md:px-3 lg:px-5 py-1 sm:py-1.5 md:py-1 lg:py-2 rounded-full font-medium text-xs md:text-[11px] lg:text-[13px] transition-all shadow-xs flex items-center gap-1.5 md:gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full bg-[#0062ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <svg className="w-2 h-2 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {heroSettings.videoBtnText || 'Watch Our Video'}
                </button>
              </div>
            </div>

            {/* Right Floating Card: Tablet & Desktop (md: and up, >= 768px) */}
            <div className="hidden md:flex w-full md:w-[28%] lg:w-[26%] xl:w-[24%] justify-end flex-shrink-0 reveal-scale delay-150">
              <div className="bg-white rounded-2xl lg:rounded-3xl shadow-[0_15px_40px_-10px_rgba(0,40,94,0.25)] overflow-hidden border-[2px] lg:border-[2.5px] border-white ring-1 ring-blue-900/10 w-full max-w-[215px] lg:max-w-[245px] xl:max-w-[300px] min-h-[285px] lg:min-h-[310px] xl:min-h-[355px] flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300">
                
                {/* Yellow Header Banner */}
                <div className="bg-gradient-to-r from-[#ffd200] via-[#fed000] to-[#f7be00] px-3 py-2.5 md:px-3 md:py-2.5 lg:px-3.5 lg:py-3 xl:px-5 xl:py-4.5 flex items-center gap-2 md:gap-2 lg:gap-2.5 xl:gap-3.5 border-b border-amber-300/40 flex-shrink-0">
                  <div className="w-7.5 h-7.5 md:w-7.5 md:h-7.5 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 rounded-lg lg:rounded-xl bg-[#00285e] text-white flex items-center justify-center flex-shrink-0 shadow-sm transform -rotate-3">
                    <Megaphone className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5.5 xl:h-5.5 text-[#fed000]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#00285e] text-[13px] md:text-[13px] lg:text-[15px] xl:text-[19px] leading-tight tracking-tight">
                      {heroSettings.counsellingTitle || 'Free Career Counselling'}
                    </h4>
                    <p className="text-[9.5px] md:text-[9.5px] lg:text-[11px] xl:text-[13px] font-medium text-[#00285e]/90 leading-tight mt-0.5 sm:mt-1">
                      {heroSettings.counsellingSubtitle || 'Know the Right Course for You'}
                    </p>
                  </div>
                </div>

                {/* Card White Body */}
                <div className="flex-1 flex flex-col justify-between px-2.5 py-2.5 md:px-2.5 md:py-2.5 lg:px-3 lg:py-3 xl:px-5 xl:py-4.5 bg-white">
                  <ul className="space-y-1.5 md:space-y-1.5 lg:space-y-2 xl:space-y-4 mb-2.5 md:mb-2.5 lg:mb-3 xl:mb-5">
                    {(heroSettings.counsellingPoints && heroSettings.counsellingPoints.length > 0
                      ? heroSettings.counsellingPoints
                      : [
                          'Personalised Guidance',
                          'Course Comparison',
                          'Career Roadmap',
                          '100% Free Consultation'
                        ]
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 md:gap-1.5 lg:gap-2 xl:gap-3">
                        <div className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 xl:w-5.5 xl:h-5.5 rounded-full bg-[#0052cc] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-[#00285e] font-medium text-[10px] md:text-[10px] lg:text-[11.5px] xl:text-[14.5px] leading-tight whitespace-nowrap">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full mt-auto bg-gradient-to-r from-[#fed000] to-[#f5b800] hover:from-[#ffe14d] hover:to-[#fed000] text-[#00285e] font-semibold text-[10.5px] md:text-[10.5px] lg:text-[12px] xl:text-[14px] py-1.5 md:py-1.5 lg:py-2 xl:py-3 px-2.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1 md:gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>{heroSettings.counsellingBtnText || 'Book Your Counselling'}</span>
                    <ArrowRight className="w-3 h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* ── MOBILE FULL CARD (< 768px Only) ── */}
          <div className="block md:hidden mt-3">
            <div className="bg-white rounded-2xl shadow-[0_15px_35px_-8px_rgba(0,40,94,0.18)] overflow-hidden border border-blue-100 max-w-sm mx-auto">
              
              {/* Yellow Header Banner */}
              <div className="bg-gradient-to-r from-[#ffd200] via-[#fed000] to-[#f7be00] px-4 py-3 flex items-center gap-3 border-b border-amber-300/40">
                <div className="w-9 h-9 rounded-xl bg-[#00285e] text-[#fed000] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Megaphone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#00285e] text-sm leading-tight">
                    {heroSettings.counsellingTitle || 'Free Career Counselling'}
                  </h4>
                  <p className="text-[11px] font-medium text-[#00285e]/90 leading-tight mt-0.5">
                    {heroSettings.counsellingSubtitle || 'Know the Right Course for You'}
                  </p>
                </div>
              </div>

              {/* Card White Body */}
              <div className="p-3.5 bg-white">
                <ul className="space-y-2 mb-3.5">
                  {(heroSettings.counsellingPoints && heroSettings.counsellingPoints.length > 0
                    ? heroSettings.counsellingPoints
                    : [
                        'Personalised Guidance',
                        'Course Comparison',
                        'Career Roadmap',
                        '100% Free Consultation'
                      ]
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#0052cc] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[#00285e] font-medium text-xs">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-gradient-to-r from-[#fed000] to-[#f5b800] hover:from-[#ffe14d] hover:to-[#fed000] text-[#00285e] font-semibold text-xs py-2.5 px-3 rounded-full shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
                >
                  <span>{heroSettings.counsellingBtnText || 'Book Your Counselling'}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ── 2. EXPLORE OUR COURSES BANNER (6 CATEGORY CARDS) ── */}
      <section className="bg-white pt-3 pb-1 sm:pt-4 sm:pb-1.5 reveal-on-scroll">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
          <div className="bg-[#00488f] bg-gradient-to-r from-[#00488f] via-[#004080] to-[#003875] rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:py-4.5 lg:px-6 shadow-xl relative overflow-hidden">
            
            {/* Ambient decorative blurs for depth */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Row Header: Left title & desc, Right CTA Button */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-4.5 pb-3 sm:pb-3.5 border-b border-white/15">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-white font-semibold text-base sm:text-lg lg:text-xl tracking-tight leading-none">
                    Explore Our
                  </span>
                  <h2 className="text-[#fed000] font-bold text-2xl sm:text-3xl lg:text-[34px] leading-none drop-shadow-xs">
                    Courses
                  </h2>
                  <span className="hidden sm:inline-flex items-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-white/15 text-blue-100 px-2.5 py-0.5 rounded-full border border-white/20 ml-1">
                    5 Career Pathways
                  </span>
                </div>
                <p className="text-white/85 text-xs sm:text-[12.5px] lg:text-[13px] leading-relaxed mt-1.5 font-normal">
                  Explore professional courses, university degrees, corporate upskilling, live projects, and placement support.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0">
                <NavLink
                  to="Courses"
                  className="inline-flex items-center gap-2 bg-[#fed000] hover:bg-[#ffe14d] text-[#002b66] font-semibold text-xs sm:text-[12.5px] px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 group cursor-pointer"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                </NavLink>
              </div>
            </div>

            {/* 5 Category Cards Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-3.5">
              {exploreCoursesCategories.map((cat, idx) => (
                <NavLink
                  key={idx}
                  to={cat.to}
                  className={`relative rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-3.5 lg:p-3 flex flex-col md:flex-row lg:flex-col items-center md:items-center lg:items-center text-center md:text-left lg:text-center justify-between md:justify-start lg:justify-between gap-2 md:gap-3 lg:gap-0 bg-gradient-to-b ${cat.cardBg} border ${cat.border} shadow-xs hover:shadow-xl ${cat.hoverShadow} hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer min-h-[126px] md:min-h-[82px] lg:min-h-[136px] group overflow-hidden`}
                >
                  {/* Top / Left Accent Gradient Bar */}
                  <div className={`w-8 sm:w-10 md:w-1.5 md:h-9 lg:w-10 lg:h-1 rounded-full bg-gradient-to-r md:bg-gradient-to-b lg:bg-gradient-to-r ${cat.topBar} mb-1 md:mb-0 lg:mb-1 transition-all duration-300 group-hover:scale-110 opacity-90 flex-shrink-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:rounded-r-full lg:static lg:translate-y-0 lg:w-10 lg:h-1 lg:rounded-full`} />

                  {/* Circular Icon with Gradient & Soft Ring */}
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr ${cat.iconGrad} flex items-center justify-center text-white shadow-md ${cat.iconShadow} ring-4 ${cat.iconRing} transition-transform duration-300 group-hover:scale-110 flex-shrink-0 my-0.5 md:my-0 lg:my-0.5`}>
                    {cat.icon}
                  </div>

                  {/* Title & Subtitle Badge */}
                  <div className="w-full md:flex-1 lg:w-full mt-1 md:mt-0 lg:mt-1 flex flex-col items-center md:items-start lg:items-center min-w-0">
                    <h3 className={`${cat.titleColor} font-bold text-[10.5px] sm:text-[11.5px] md:text-[12.5px] lg:text-[11px] leading-snug mb-1 transition-colors line-clamp-2`}>
                      {cat.title}
                    </h3>
                    <span className={`${cat.badgeBg} text-[8px] sm:text-[8.5px] md:text-[9.5px] lg:text-[8px] font-medium px-2 py-0.5 rounded-full leading-tight inline-block whitespace-nowrap transition-transform duration-200 group-hover:scale-105`}>
                      {cat.subtitle}
                    </span>
                  </div>

                  {/* Tablet Chevron indicator */}
                  <div className="hidden md:flex lg:hidden text-slate-400 group-hover:text-blue-600 transition-colors ml-auto pr-1">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </NavLink>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ── 3. POPULAR COURSES / PROFESSIONAL COURSES ── */}
      <section className="bg-white pt-2 pb-8 sm:pt-3 sm:pb-10 lg:pt-4 reveal-on-scroll">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0062ff] mb-1">
                POPULAR COURSES
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#00285e] leading-tight">
                <NavLink to="Courses" className="hover:text-[#0062ff] transition-colors">
                  Professional Courses
                </NavLink>
              </h2>
              <p className="text-[#3b82f6] text-xs sm:text-[13px] mt-1 font-normal">
                Gain in-demand skills with our industry-focused courses.
              </p>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              {/* Mobile Prev/Next Arrows */}
              <div className="flex sm:hidden items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollPopularCourses('left')}
                  disabled={!canScrollLeft}
                  className={`w-8 h-8 rounded-full bg-white text-[#00285e] border border-blue-200 shadow-xs flex items-center justify-center transition-all ${
                    canScrollLeft ? 'opacity-100 cursor-pointer active:scale-95' : 'opacity-30 cursor-not-allowed'
                  }`}
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollPopularCourses('right')}
                  disabled={!canScrollRight}
                  className={`w-8 h-8 rounded-full bg-white text-[#00285e] border border-blue-200 shadow-xs flex items-center justify-center transition-all ${
                    canScrollRight ? 'opacity-100 cursor-pointer active:scale-95' : 'opacity-30 cursor-not-allowed'
                  }`}
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <NavLink
                to="Courses"
                className="text-xs sm:text-sm font-semibold text-[#0062ff] hover:text-[#00488f] flex items-center gap-1 transition-colors flex-shrink-0 ml-auto sm:ml-0"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>

          {/* Carousel Wrapper with Desktop Outer Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Start (Left) Scroll Button - Desktop Only */}
            <button
              type="button"
              onClick={() => scrollPopularCourses('left')}
              disabled={!canScrollLeft}
              className={`hidden sm:flex flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#00285e] border border-blue-200 shadow-md items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? 'hover:bg-blue-50 hover:border-blue-400 hover:scale-105 active:scale-95 cursor-pointer opacity-100'
                  : 'opacity-25 cursor-not-allowed border-gray-200 text-gray-400'
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Scrolling Cards Carousel */}
            <div
              ref={popularCoursesScrollRef}
              onScroll={checkScrollButtons}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className={`flex-1 min-w-0 flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 pb-3 touch-pan-x select-none ${
                isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {popularCoursesList.map((course, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (hasDragged) return;
                    openCourseModal(course);
                  }}
                  className="w-[82vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)] xl:w-[calc((100%-36px)/4)] flex-shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 p-3 sm:p-3.5 flex flex-col group select-none overflow-hidden cursor-pointer"
                >
                  {/* Top Thumbnail Image */}
                  <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-2 bg-slate-100 shadow-inner group/img flex-shrink-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/course_web_design.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none"></div>

                    {/* Top Category Badge */}
                    {course.subgroup && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide shadow-sm flex items-center gap-1 bg-blue-600/95 text-white backdrop-blur-md border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span>{course.subgroup}</span>
                      </div>
                    )}

                    {/* Top Right Popular Badge */}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-900 font-extrabold text-[9px] shadow-sm flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-slate-900 stroke-none" />
                      <span>POPULAR</span>
                    </div>

                    {/* Duration Pill */}
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white text-[9.5px] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-300" />
                      <span>{course.duration}</span>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-amber-300 text-[9.5px] font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-white">{course.rating || '4.9'}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-bold text-[#00285e] text-[13px] sm:text-[13.5px] leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-[#64748b] text-[11px] leading-snug mb-1.5 h-[30px] line-clamp-2">
                    {course.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(course.tags || []).slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-slate-50 text-[#004bb5] border border-blue-100/70 text-[9px] font-medium px-1.5 py-0.5 rounded-md leading-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Feature Checkmarks */}
                  {Array.isArray(course.features) && course.features.length > 0 && (
                    <div className="space-y-1 mb-2 pt-1.5 border-t border-slate-100">
                      {course.features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-[10.5px] text-slate-600 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Action Bar with Role + Direct Links: Curriculum & Details */}
                  <div className="pt-2 mt-auto border-t border-slate-100 flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-900 min-w-0 flex-1">
                      <Award className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span className="truncate" title={course.role || course.certification || 'Certified Program'}>
                        {course.role || course.certification || 'Certified Program'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCourseModal(course);
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${course.btnGrad || 'from-blue-600 to-indigo-600'} text-white font-bold text-[10.5px] shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer`}
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* End (Right) Scroll Button - Desktop Only */}
            <button
              type="button"
              onClick={() => scrollPopularCourses('right')}
              disabled={!canScrollRight}
              className={`hidden sm:flex flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#00285e] border border-blue-200 shadow-md items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? 'hover:bg-blue-50 hover:border-blue-400 hover:scale-105 active:scale-95 cursor-pointer opacity-100'
                  : 'opacity-25 cursor-not-allowed border-gray-200 text-gray-400'
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </section>


      {/* ── 3.5. UNIVERSITY EDUCATION & LIVE PROJECTS DUAL PROMO BANNER ── */}
      <section className="bg-white pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-3 lg:pb-10">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 lg:gap-5 items-stretch">
            
            {/* Left Card: University Education */}
            <div className="xl:col-span-7 bg-[#edf6ff] border border-blue-100/90 rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-center">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 h-full">
                
                {/* Left text column */}
                <div className="w-full md:flex-1 flex flex-col items-start justify-center">
                  <p className="text-[#0062ff] font-semibold text-xs sm:text-[13px] tracking-tight mb-1">
                    University Education
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#00285e] leading-tight mb-1">
                    UG &amp; PG University Programs
                  </h3>
                  <p className="text-[#0052cc] font-medium text-xs sm:text-[13.5px] mb-2.5">
                    Study Anytime, Anywhere
                  </p>
                  <p className="text-[#475569] text-xs sm:text-[12.5px] leading-relaxed mb-4 max-w-md font-normal">
                    Pursue your higher education with flexible Online &amp; Distance learning options from reputed universities. Build your degree, boost your career.
                  </p>
                  <NavLink
                    to="/UniversityCourses"
                    className="whitespace-nowrap inline-flex items-center gap-2 bg-[#004bb5] hover:bg-[#003c94] text-white font-semibold text-xs sm:text-[13px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                  >
                    <span>Explore University Programs</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </NavLink>
                </div>

                {/* Right white floating card */}
                <div className="w-full md:w-auto relative flex-shrink-0 my-1 sm:my-2">
                  <div className="bg-white rounded-2xl sm:rounded-3xl py-4.5 px-4 sm:py-5 sm:pl-5 sm:pr-22 md:pr-24 shadow-sm border border-blue-50/80 relative z-10 overflow-hidden">
                    <div className="space-y-2.5 sm:space-y-3 relative z-10">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1.8px] border-[#0052cc] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0052cc] stroke-[3]" />
                        </span>
                        <span className="text-[#00285e] font-medium text-xs sm:text-[12.5px] lg:text-[13px] break-words sm:whitespace-nowrap">
                          UG Programs <span className="text-[#64748b] font-normal text-[11px] sm:text-[11.5px]">(BA, B.Com, B.Sc, etc.)</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1.8px] border-[#0052cc] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0052cc] stroke-[3]" />
                        </span>
                        <span className="text-[#00285e] font-medium text-xs sm:text-[12.5px] lg:text-[13px] break-words sm:whitespace-nowrap">
                          PG Programs <span className="text-[#64748b] font-normal text-[11px] sm:text-[11.5px]">(MA, M.Com, M.Sc, etc.)</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1.8px] border-[#0052cc] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0052cc] stroke-[3]" />
                        </span>
                        <span className="text-[#00285e] font-medium text-xs sm:text-[12.5px] lg:text-[13px] break-words sm:whitespace-nowrap">
                          Distance Education
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1.8px] border-[#0052cc] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0052cc] stroke-[3]" />
                        </span>
                        <span className="text-[#00285e] font-medium text-xs sm:text-[12.5px] lg:text-[13px] break-words sm:whitespace-nowrap">
                          Online Education
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1.8px] border-[#0052cc] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0052cc] stroke-[3]" />
                        </span>
                        <span className="text-[#00285e] font-medium text-xs sm:text-[12.5px] lg:text-[13px] break-words sm:whitespace-nowrap">
                          Flexible Learning
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1.8px] border-[#0052cc] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0052cc] stroke-[3]" />
                        </span>
                        <span className="text-[#00285e] font-medium text-xs sm:text-[12.5px] lg:text-[13px] break-words sm:whitespace-nowrap">
                          Recognized &amp; UGC Approved Universities
                        </span>
                      </div>
                    </div>

                    {/* 3D Graduation Cap on Books Illustration completely contained INSIDE the card */}
                    <div className="hidden sm:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 w-16 sm:w-19 pointer-events-none z-10">
                      <GradCapBooksIllustration className="w-full h-auto drop-shadow-sm" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Card: Live Projects & Real-World Skills */}
            <div className="xl:col-span-5 bg-gradient-to-r from-[#002d6b] via-[#00224f] to-[#001736] rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 h-full relative z-10">
                
                {/* Left content */}
                <div className="w-full sm:w-[54%] flex flex-col items-start justify-center">
                  <p className="text-[#fed000] font-semibold text-xs sm:text-[13px] tracking-tight mb-1">
                    Industry Focused
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-[24px] font-bold text-white leading-tight mb-1.5">
                    Live Projects &amp; Real-World Skills
                  </h3>
                  <p className="text-white/80 text-[11px] sm:text-[12px] leading-snug mb-3.5 max-w-xs">
                    Learn by doing. Work on live projects and build a portfolio that gets you hired.
                  </p>

                  <div className="space-y-2 mb-4">
                    {[
                      'Real Industry Projects',
                      'Expert Mentorship',
                      'Latest Tools & Technologies',
                      'Build Your Portfolio',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 text-white stroke-[2.5] flex-shrink-0" />
                        <span className="text-white/95 font-medium text-[11px] sm:text-[12px]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <NavLink
                    to="/LiveProject"
                    className="whitespace-nowrap inline-flex items-center gap-2 bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] font-semibold text-xs sm:text-[12.5px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </NavLink>
                </div>

                {/* Right Laptop Photo Centered in Blue Box */}
                <div className="w-full sm:w-[46%] flex items-center justify-center relative my-1 sm:my-0">
                  <div className="w-full max-w-[340px] sm:max-w-none rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-white/15 aspect-[16/10] sm:aspect-[4/3]">
                    <img
                      src="/laptop_live_projects.jpg"
                      alt="Live Projects"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ── WHY CHOOSE US STRIP (Matches Professional Courses Length) ── */}
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-5 sm:mt-6 reveal-scale">
          <div className="bg-[#f0f6ff] border border-[#cfe1fb] rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:py-3.5 lg:px-4 shadow-xs flex flex-col lg:flex-row items-stretch">
            
            {/* Left Title Area */}
            <div className="flex flex-col sm:flex-row lg:flex-col justify-between sm:items-center lg:items-start px-4 sm:px-6 py-3 lg:py-2 flex-shrink-0 lg:w-[24%] xl:w-[23%] border-b lg:border-b-0 lg:border-r border-[#cfe1fb] text-left gap-2 sm:gap-3 lg:gap-0">
              <div>
                <span className="text-[#1d5bd8] font-medium text-xs sm:text-[13.5px] tracking-tight">
                  Why Choose Us
                </span>
                <h3 className="text-2xl sm:text-[27px] lg:text-[28px] font-bold text-[#00285e] leading-tight mt-0.5 mb-1 tracking-tight">
                  Aayush Institute?
                </h3>
                <p className="text-[#1d5bd8] font-medium text-xs sm:text-[13.5px] leading-tight mt-1">
                  Because your future matters.
                </p>
              </div>
              <button
                onClick={() => setIsWhyChooseModalOpen(true)}
                className="mt-1 sm:mt-0 lg:mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1d5bd8] hover:bg-[#00285e] text-white text-[11px] sm:text-xs font-medium transition-all shadow-2xs w-fit cursor-pointer group flex-shrink-0"
              >
                <span>Why Choose Us</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* 6 Features */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {whyChooseUsFeatures.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setIsWhyChooseModalOpen(true)}
                  className={`group flex flex-col items-center justify-center text-center p-3 sm:p-3.5 lg:py-2 lg:px-2 transition-all duration-200 hover:bg-blue-100/40 rounded-xl cursor-pointer ${
                    idx % 2 !== 0 ? 'border-l border-[#cfe1fb]' : ''
                  } ${
                    idx >= 2 ? 'border-t border-[#cfe1fb]' : ''
                  } ${
                    idx >= 3 ? 'sm:border-t sm:border-[#cfe1fb]' : 'sm:border-t-0'
                  } ${
                    idx % 3 !== 0 ? 'sm:border-l sm:border-[#cfe1fb]' : 'sm:border-l-0'
                  } lg:border-t-0 ${
                    idx !== 0 ? 'lg:border-l lg:border-[#cfe1fb]' : ''
                  }`}
                >
                  <div className="mb-2 flex items-center justify-center h-8 sm:h-9">
                    {item.icon}
                  </div>
                  <div className="text-[#00285e] font-medium text-xs sm:text-[12.5px] leading-snug tracking-tight">
                    <span className="block">{item.line1}</span>
                    <span className="block">{item.line2}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── 3.8. OUR IMPACT IN NUMBERS & STUDENT TESTIMONIAL ── */}
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-4 sm:mt-5 reveal-on-scroll">
          <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-4.5">
            
            {/* Left Block: Image + Impact in Numbers (Combined Rounded Unit) */}
            <div className="w-full lg:flex-1 bg-[#00285e] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch">
              
              {/* Left Photo of Students */}
              <div className="w-full md:w-[34%] lg:w-[32%] relative min-h-[160px] sm:min-h-[200px] md:min-h-[230px] flex-shrink-0">
                <img
                  src="/students_campus_impact.png"
                  alt="Aayush Institute Students"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Content: Stats + Slogan */}
              <div className="flex-1 p-4 sm:p-5 lg:py-4.5 lg:px-5 flex flex-col justify-between text-white">
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-[17px] tracking-tight mb-3">
                    Our Impact in Numbers
                  </h4>

                  {/* 4 Stat Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {/* Stat 1 */}
                    <div className="bg-[#001c44]/80 border border-white/10 rounded-xl p-2.5 sm:py-3 sm:px-2 flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-[1.02]">
                      <div className="text-blue-200 mb-1">
                        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg sm:text-xl lg:text-[22px] text-white leading-tight">
                        5000+
                      </span>
                      <span className="text-blue-200/90 font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5">
                        Students Trained
                      </span>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-[#001c44]/80 border border-white/10 rounded-xl p-2.5 sm:py-3 sm:px-2 flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-[1.02]">
                      <div className="text-blue-200 mb-1">
                        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg sm:text-xl lg:text-[22px] text-white leading-tight">
                        200+
                      </span>
                      <span className="text-blue-200/90 font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5">
                        Industry Partners
                      </span>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-[#001c44]/80 border border-white/10 rounded-xl p-2.5 sm:py-3 sm:px-2 flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-[1.02]">
                      <div className="text-blue-200 mb-1">
                        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg sm:text-xl lg:text-[22px] text-white leading-tight">
                        95%
                      </span>
                      <span className="text-blue-200/90 font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5">
                        Placement Support
                      </span>
                    </div>

                    {/* Stat 4 */}
                    <div className="bg-[#001c44]/80 border border-white/10 rounded-xl p-2.5 sm:py-3 sm:px-2 flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-[1.02]">
                      <div className="text-blue-200 mb-1">
                        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="6" />
                          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg sm:text-xl lg:text-[22px] text-white leading-tight">
                        15+
                      </span>
                      <span className="text-blue-200/90 font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5">
                        Years of Excellence
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Slogan with Yellow Brush Underline */}
                <div className="mt-3.5 pt-1 flex items-center justify-center gap-1.5 select-none">
                  <span className="italic font-medium text-white text-sm sm:text-base tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    Learn Today
                  </span>
                  <span className="font-medium text-white text-xs sm:text-sm mx-0.5">→</span>
                  <span className="relative inline-block italic font-medium text-white text-sm sm:text-base tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    Lead Tomorrow
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-[#fed000] overflow-visible" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 7 C 30 2, 70 2, 118 6 C 80 10, 40 9, 2 7 Z" fill="#fed000" />
                    </svg>
                  </span>
                </div>

              </div>
            </div>

            {/* Right Block: What Our Students Say (Testimonial Card) */}
            <div className="w-full lg:w-[32%] xl:w-[29%] bg-gradient-to-b from-white via-white to-blue-50/40 border border-blue-100/90 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
              {/* Subtle Decorative Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Dynamic Student Testimonial */}
                {(() => {
                  const currentT = testimonialsList[activeTestimonialIdx % (testimonialsList.length || 1)] || studentTestimonials[0];
                  const starCount = Math.min(5, Math.max(1, Number(currentT.rating) || 5));
                  return (
                    <>
                      <div>
                        {/* Header with Title & Gold Stars */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <h4 className="text-[#00285e] font-bold text-sm sm:text-[15px] tracking-tight">
                              What Our Students Say
                            </h4>
                          </div>
                          <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">
                            {[...Array(starCount)].map((_, sIdx) => (
                              <Star key={sIdx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-[10px] font-bold text-amber-800 ml-1">{starCount}.0</span>
                          </div>
                        </div>

                        {/* Quote Box */}
                        <div className="flex items-start gap-2.5 my-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-blue-50 shadow-2xs">
                          <span className="text-amber-500 text-2xl sm:text-3xl font-serif font-black leading-none select-none flex-shrink-0 opacity-80">
                            “
                          </span>
                          <p className="text-[#334155] text-xs sm:text-[12.5px] leading-relaxed italic font-normal">
                            {currentT.quote}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        {/* Student info */}
                        <div className="flex items-center gap-3 mb-3 bg-blue-50/50 p-2 rounded-xl border border-blue-100/60">
                          <div className="relative shrink-0">
                            <img
                              src={currentT.avatar}
                              alt={currentT.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                              onError={(e) => { e.currentTarget.src = '/rahul_sharma_avatar.jpg'; }}
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-extrabold text-[#00285e] text-xs sm:text-[13px] leading-tight truncate">
                              {currentT.name}
                            </h5>
                            <p className="text-[#64748b] font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5 truncate">
                              {currentT.role}
                            </p>
                          </div>
                        </div>

                        {/* Pagination Dots and Prev/Next Arrows */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1.5">
                            {testimonialsList.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                onClick={() => setActiveTestimonialIdx(dotIdx)}
                                aria-label={`Go to testimonial ${dotIdx + 1}`}
                                className={`transition-all rounded-full cursor-pointer ${
                                  (activeTestimonialIdx % testimonialsList.length) === dotIdx
                                    ? 'w-5 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500'
                                    : 'w-1.5 h-1.5 bg-blue-200 hover:bg-blue-300'
                                }`}
                              />
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setActiveTestimonialIdx((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length)}
                              aria-label="Previous Testimonial"
                              className="w-7 h-7 rounded-full border border-blue-200 text-[#00285e] hover:bg-blue-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsList.length)}
                              aria-label="Next Testimonial"
                              className="w-7 h-7 rounded-full border border-blue-200 text-[#00285e] hover:bg-blue-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

          </div>
        </div>

        {/* ── 3.9. FREE CAREER COUNSELLING BOOKING STRIP (Exact User BG Match) ── */}
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-5 sm:mt-6">
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-blue-100/90 shadow-sm bg-[#e8f3fe]">
            
            {/* Background Image: Desktop full cover banner (xl and up) */}
            <img
              src="/free_career_bg.png"
              alt="Free Career Counselling Background"
              className="hidden xl:block absolute inset-0 w-full h-full object-cover object-left pointer-events-none z-0"
            />
            {/* Mobile & Tablet subtle sky-blue gradient background */}
            <div className="block xl:hidden absolute inset-0 bg-[#e0effe] bg-gradient-to-br from-[#d9ebfd] via-[#e5f2fe] to-[#edf6fe] z-0 pointer-events-none" />

            {/* Inner Content Overlay */}
            <div className="relative z-10 p-3 sm:p-5 lg:p-6 flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4 xl:gap-4">
              
              {/* Upper Container for Tablet/Mobile: Left Info + Right Form */}
              <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-3.5 md:gap-4 lg:gap-6 xl:contents">

                {/* Left Column: Student Photo + Yellow Paintbrush Splash + Subtitle + Book Now */}
                <div className="w-full md:w-[45%] lg:w-[45%] xl:w-[42%] flex flex-row xl:flex-col items-center xl:items-start text-left xl:pl-[305px] gap-2.5 sm:gap-3.5 md:gap-3 lg:gap-4 xl:gap-0 flex-shrink-0">
                  
                  {/* Student Photo for Mobile and Tablet: Clear, unblocked */}
                  <div className="block xl:hidden flex-shrink-0">
                    <img
                      src="/career_counselling_girl.png"
                      alt="Free Career Counselling Student"
                      className="h-[120px] sm:h-[150px] md:h-[160px] lg:h-[185px] w-auto object-contain select-none pointer-events-none drop-shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center flex-1">
                    {/* Yellow Paint Splash with Blue Accent Dash */}
                    <div className="relative inline-block mb-1 -translate-y-1 sm:-translate-y-1.5 xl:-translate-y-2.5 select-none -rotate-[4deg] sm:-rotate-[6deg] xl:-rotate-[12deg] transform origin-center">
                      <div className="relative">
                        <svg
                          viewBox="0 0 240 84"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[150px] sm:w-[185px] md:w-[170px] lg:w-[215px] xl:w-[255px] h-auto drop-shadow-xs"
                        >
                          {/* Top Blue Accent Swoosh */}
                          <path d="M70 7 C 110 3, 155 4, 195 13 C 160 9, 115 7, 70 7 Z" fill="#0052cc" />

                          {/* Main Yellow Paintbrush Splash with dry bristle edges */}
                          <path
                            d="M10 30 
                               C 6 20, 16 14, 32 11 
                               C 72 4, 148 4, 218 9 
                               C 234 11, 239 17, 236 23 
                               C 232 28, 222 29, 214 31 
                               C 230 33, 238 40, 232 46 
                               C 224 51, 214 52, 204 53 
                               C 217 56, 222 64, 210 69 
                               C 190 75, 162 77, 125 79 
                               C 85 80, 44 81, 25 78 
                               C 11 76, 7 69, 9 61 
                               C 13 55, 23 54, 31 52 
                               C 15 50, 6 44, 10 30 Z"
                            fill="#fed000"
                          />

                          {/* Paint Bristle Texture Streaks */}
                          <path d="M25 15 C 80 8, 155 8, 212 14" stroke="#f5b800" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
                          <path d="M30 73 C 85 75, 150 74, 200 68" stroke="#f5b800" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
                        </svg>

                        {/* Bold Text inside Paint Stroke */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-0.5 text-center px-1 sm:px-2">
                          <span className="font-bold text-[#00285e] text-[13px] sm:text-[16px] md:text-[15px] lg:text-[18px] xl:text-[23px] leading-tight tracking-tight">
                            Free Career
                          </span>
                          <span className="font-bold text-[#00285e] text-[13px] sm:text-[16px] md:text-[15px] lg:text-[18px] xl:text-[23px] leading-tight tracking-tight mt-0.5">
                            Counselling
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subtitle in rich navy blue */}
                    <p className="text-[#003882] font-medium text-[11px] sm:text-xs md:text-[11.5px] lg:text-[13px] leading-snug mb-2 sm:mb-2.5 max-w-[200px] sm:max-w-[260px]">
                      Get expert guidance and choose the right course for your career goals.
                    </p>

                    {/* Pill Button */}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="hidden sm:inline-flex xl:inline-flex whitespace-nowrap items-center gap-1.5 bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] font-semibold text-[11px] sm:text-xs lg:text-[13px] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xs hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.8]" />
                    </button>
                  </div>
                </div>

                {/* Middle Column: Elevated White Booking Form Card */}
                <div className="w-full md:w-[54%] lg:w-[53%] xl:flex-1 bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4 lg:p-5 shadow-sm border border-blue-50/90 flex-shrink-0 flex flex-col justify-center">
                  <h4 className="text-[#00285e] font-semibold text-xs sm:text-sm lg:text-base tracking-tight mb-2 sm:mb-2.5">
                    Book Your Free Career Counselling
                  </h4>

                  {counsellingSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-center text-xs font-medium py-6">
                      🎉 Thank you! Our career counsellor will contact you shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleCounsellingSubmit} className="space-y-2 sm:space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        <div>
                          <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="counselling-name-input"
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={counsellingForm.name}
                            onChange={(e) => setCounsellingForm({ ...counsellingForm, name: e.target.value })}
                            className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60"
                          />
                        </div>

                        <div>
                          <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Enter mobile number"
                            value={counsellingForm.mobile}
                            onChange={(e) => setCounsellingForm({ ...counsellingForm, mobile: e.target.value })}
                            className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60"
                          />
                        </div>

                        <div>
                          <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                            Select Course <span className="text-red-500">*</span>
                          </label>
                          <select
                            required
                            value={counsellingForm.course}
                            onChange={(e) => setCounsellingForm({ ...counsellingForm, course: e.target.value })}
                            className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60 text-slate-700"
                          >
                            <option value="">Select Course</option>
                            <optgroup label="Software & Web Development">
                              <option value="Software & Full Stack Development">Software &amp; Full Stack Development</option>
                              <option value="Web Designing">Web Designing</option>
                              <option value="Mobile App Development">Mobile App Development</option>
                            </optgroup>
                            <optgroup label="AI, Data & Cloud">
                              <option value="Artificial Intelligence & Generative AI">Artificial Intelligence &amp; Generative AI</option>
                              <option value="Data Science, Data Analytics & Business Intelligence">Data Science &amp; Business Intelligence</option>
                              <option value="Cyber Security & Networking">Cyber Security &amp; Networking</option>
                              <option value="Cloud Computing & DevOps">Cloud Computing &amp; DevOps</option>
                            </optgroup>
                            <optgroup label="Design, UI/UX & Media">
                              <option value="UI/UX & Product Design">UI/UX &amp; Product Design</option>
                              <option value="Graphic Design & Branding">Graphic Design &amp; Branding</option>
                              <option value="Video Editing & Motion Graphics">Video Editing &amp; Motion Graphics</option>
                            </optgroup>
                            <optgroup label="Digital Marketing & E-Commerce">
                              <option value="Digital Marketing & Performance Marketing">Digital Marketing &amp; Performance Marketing</option>
                              <option value="E-Commerce & Digital Business">E-Commerce &amp; Digital Business</option>
                            </optgroup>
                            <optgroup label="Accounting & Business Skills">
                              <option value="Accounting, GST & Business Finance">Accounting, GST &amp; Business Finance</option>
                              <option value="Advanced Office & Business Skills">Advanced Office &amp; Business Skills</option>
                            </optgroup>
                            <optgroup label="Technical CAD & IT Support">
                              <option value="AutoCAD & Technical Design">AutoCAD &amp; Technical Design</option>
                              <option value="Hardware, IT Support & System Administration">Hardware, IT Support &amp; System Administration</option>
                            </optgroup>
                            <optgroup label="Foreign Languages & Test Prep">
                              <option value="IELTS – English Proficiency Test Preparation">IELTS Test Preparation</option>
                              <option value="PTE – Pearson Test of English">PTE Test Preparation</option>
                              <option value="German Language">German Language (A1–B2)</option>
                              <option value="French Language">French Language (A1–B2)</option>
                              <option value="Japanese Language">Japanese Language (N5–N2)</option>
                            </optgroup>
                            <optgroup label="Short-Term & Professional Skills">
                              <option value="Short-Term & Professional Skills">Short-Term &amp; Professional Skills</option>
                            </optgroup>
                            <option value="Other Course">Other Course</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                            Message
                          </label>
                          <input
                            type="text"
                            placeholder="Type your message..."
                            value={counsellingForm.message}
                            onChange={(e) => setCounsellingForm({ ...counsellingForm, message: e.target.value })}
                            className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#003882] hover:bg-[#00285e] text-white font-semibold text-xs sm:text-[12.5px] py-2 sm:py-2.5 rounded-lg shadow-sm transition-all hover:shadow flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                      >
                        <span>Submit Enquiry</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </form>
                  )}
                </div>

              </div>

              {/* Vertical Gradient Divider Line for Large Desktop */}
              <div className="hidden xl:block w-[2px] self-stretch my-2 bg-gradient-to-b from-sky-400/10 via-[#0060f0] via-[#003882] to-sky-300/10 rounded-full flex-shrink-0 mx-2 shadow-[0_0_8px_rgba(0,96,240,0.3)]" />

              {/* Right Column / Bottom Strip: 4 Feature Bullet Points */}
              <div className="w-full xl:w-[20%] grid grid-cols-2 sm:grid-cols-4 xl:flex xl:flex-col justify-between items-center gap-2 sm:gap-3 bg-white/85 xl:bg-transparent backdrop-blur-xs p-2.5 sm:p-3 xl:p-0 rounded-xl border border-blue-100/70 xl:border-none shadow-xs xl:shadow-none flex-shrink-0 mt-2 sm:mt-2.5 xl:mt-0">
                {[
                  {
                    title: 'Career Guidance',
                    icon: (
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" />
                    )
                  },
                  {
                    title: 'Course Selection',
                    icon: (
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" />
                    )
                  },
                  {
                    title: 'Expert Counsellors',
                    icon: (
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" />
                    )
                  },
                  {
                    title: '100% Free Service',
                    icon: (
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" />
                    )
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0052cc] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      {item.icon}
                    </div>
                    <span className="text-[#00285e] font-semibold text-[11px] sm:text-xs lg:text-[13px] leading-tight">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>

        {/* ── 3.10. LATEST UPDATES & BLOGS (Auto-Sliding Carousel & Rich Content) ── */}
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-6 sm:mt-7 reveal-on-scroll">
          {/* Header Row: Title on Left, Controls & View All on Right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3.5 sm:mb-4 px-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Knowledge Hub &amp; Insights
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#00285e] leading-tight tracking-tight">
                Latest Updates &amp; Blogs
              </h3>
              <p className="text-[#1d5bd8] font-normal text-xs sm:text-[13px] leading-tight mt-0.5">
                Stay informed with the latest trends, career roadmaps, and industry skills.
              </p>
            </div>

            {/* Carousel Navigation Buttons & View All Link */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrevBlogSlide}
                className="w-8 h-8 rounded-full border border-blue-200 bg-white hover:bg-blue-50 text-[#00285e] flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                title="Previous blog"
                aria-label="Previous blog"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={handleNextBlogSlide}
                className="w-8 h-8 rounded-full border border-blue-200 bg-white hover:bg-blue-50 text-[#00285e] flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                title="Next blog"
                aria-label="Next blog"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.2]" />
              </button>

              <NavLink
                to="/blogs"
                className="inline-flex items-center gap-1.5 text-[#0052cc] hover:text-[#00285e] font-semibold text-xs sm:text-[13px] transition-colors group ml-2 px-3 py-1.5 rounded-xl hover:bg-blue-50/80"
              >
                <span>View All Blogs</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </NavLink>
            </div>
          </div>

          {/* Automatic Sliding Carousel Track */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsBlogPaused(true)}
            onMouseLeave={() => setIsBlogPaused(false)}
            onTouchStart={() => setIsBlogPaused(true)}
            onTouchEnd={() => setIsBlogPaused(false)}
          >
            <div
              ref={blogScrollRef}
              className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1"
            >
              {blogsList.map((blog) => {
                const tagStr = (blog.tag || '').toLowerCase();
                let theme = {
                  border: 'border-amber-200/90 hover:border-amber-400 hover:shadow-amber-500/15',
                  badge: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs',
                  accentBar: 'from-amber-500 to-orange-400',
                  hoverBg: 'hover:bg-gradient-to-br hover:from-white hover:to-amber-50/40',
                  readBtn: 'text-amber-700 hover:text-amber-900',
                };
                if (tagStr.includes('ai') || tagStr.includes('tech')) {
                  theme = {
                    border: 'border-cyan-200/90 hover:border-cyan-400 hover:shadow-cyan-500/15',
                    badge: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xs',
                    accentBar: 'from-blue-600 to-cyan-500',
                    hoverBg: 'hover:bg-gradient-to-br hover:from-white hover:to-cyan-50/40',
                    readBtn: 'text-cyan-700 hover:text-cyan-900',
                  };
                } else if (tagStr.includes('internship') || tagStr.includes('placement')) {
                  theme = {
                    border: 'border-purple-200/90 hover:border-purple-400 hover:shadow-purple-500/15',
                    badge: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs',
                    accentBar: 'from-purple-600 to-indigo-500',
                    hoverBg: 'hover:bg-gradient-to-br hover:from-white hover:to-purple-50/40',
                    readBtn: 'text-purple-700 hover:text-purple-900',
                  };
                } else if (tagStr.includes('distance') || tagStr.includes('education') || tagStr.includes('degree')) {
                  theme = {
                    border: 'border-emerald-200/90 hover:border-emerald-400 hover:shadow-emerald-500/15',
                    badge: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs',
                    accentBar: 'from-emerald-600 to-teal-500',
                    hoverBg: 'hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/40',
                    readBtn: 'text-emerald-700 hover:text-emerald-900',
                  };
                } else if (tagStr.includes('web') || tagStr.includes('dev') || tagStr.includes('stack')) {
                  theme = {
                    border: 'border-rose-200/90 hover:border-rose-400 hover:shadow-rose-500/15',
                    badge: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs',
                    accentBar: 'from-rose-600 to-pink-500',
                    hoverBg: 'hover:bg-gradient-to-br hover:from-white hover:to-rose-50/40',
                    readBtn: 'text-rose-700 hover:text-rose-900',
                  };
                }

                return (
                  <div
                    key={blog.id || blog._id}
                    data-blog-card
                    onClick={() => navigate(`/blog/${blog.id || blog._id}`, { state: { blog } })}
                    className={`w-[290px] sm:w-[330px] lg:w-[330px] xl:w-[345px] flex-shrink-0 bg-white ${theme.hoverBg} rounded-2xl p-3 sm:p-3.5 border ${theme.border} shadow-xs hover:shadow-xl hover-card-elevate transition-all duration-300 flex items-center gap-3.5 group cursor-pointer hover:-translate-y-1 select-none relative overflow-hidden`}
                  >
                    {/* Top colored accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.accentBar}`} />

                    {/* Thumbnail Image with zoom & overlay */}
                    <div className="w-[102px] h-[84px] sm:w-[110px] sm:h-[88px] rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative shadow-2xs border border-slate-200/70">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { e.target.src = '/corporate_ai.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5 space-y-1">
                      <div>
                        {/* Category Tag with gradient pill */}
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`inline-block font-extrabold text-[9.5px] sm:text-[10px] px-2.5 py-0.5 rounded-full leading-tight ${theme.badge}`}>
                            {blog.tag}
                          </span>
                          {blog.readTime && (
                            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                              • {blog.readTime}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-extrabold text-slate-900 group-hover:text-blue-700 text-xs sm:text-[13px] leading-snug line-clamp-2 transition-colors">
                          {blog.title}
                        </h4>
                      </div>

                      {/* Footer: Date & Read More */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-slate-400 font-medium text-[10px] sm:text-[10.5px]">
                          {blog.date}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/blog/${blog.id || blog._id}`, { state: { blog } });
                          }}
                          className={`${theme.readBtn} font-bold text-[10.5px] sm:text-[11px] flex items-center gap-0.5 hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform`}
                        >
                          <span>Read</span>
                          <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* ── 4. COLORFUL & CLEAN 90% x 90% PREMIUM BLOG ARTICLE MODAL ── */}
      {selectedBlogModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedBlogModal(null)}
        >
          <div
            className="w-[95vw] sm:w-[90vw] max-w-[1380px] h-[92vh] sm:h-[90vh] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-blue-200/80 flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Permanent Sticky Top Bar with Prominent CUT / CLOSE Button */}
            <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-[#001c44] via-[#00285e] to-[#001432] text-white flex items-center justify-between gap-3 border-b border-white/10 shrink-0 z-30 shadow-md">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xs shrink-0">
                  {selectedBlogModal.tag}
                </span>
                <span className="hidden sm:inline-block text-white/40 text-xs">•</span>
                <span className="text-xs text-slate-300 font-medium hidden sm:flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {selectedBlogModal.date} • {selectedBlogModal.readTime || '4 min read'}
                </span>
                <span className="hidden md:inline-block text-white/40 text-xs">•</span>
                <span className="text-xs text-white/90 font-semibold truncate hidden md:inline-block max-w-md">
                  {selectedBlogModal.title}
                </span>
              </div>

              {/* Prominent Actions (Open Full Page + Cut / Close) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const b = selectedBlogModal;
                    setSelectedBlogModal(null);
                    navigate(`/blog/${b.id || b._id}`, { state: { blog: b } });
                  }}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer border border-blue-400/40"
                  title="Open in Full Dedicated Page"
                >
                  <span className="tracking-wide">Open Full Page</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBlogModal(null)}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/30 transition-all cursor-pointer group active:scale-95 border border-rose-400/40"
                  title="Cut / Close Popup (Esc)"
                  aria-label="Close modal"
                >
                  <span className="tracking-wide">Cut / Close</span>
                  <X className="w-4 h-4 stroke-[2.5] group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. Scrollable Body: Split Two-Column Magazine Layout */}
            <div
              ref={blogModalContentRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 scroll-smooth"
            >
              {/* Top Hero Layout: Left Visual Showcase (5 cols) + Right In-Depth Header (7 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-start">
                
                {/* Left Column: Visual Showcase & Meta */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Rounded Cover Image Card */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-slate-900 group">
                    <div className="h-60 sm:h-72 lg:h-80 w-full relative overflow-hidden">
                      <img
                        src={selectedBlogModal.image}
                        alt={selectedBlogModal.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/course_hero.png'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                      
                      {/* Floating Badges inside Hero Image */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-blue-700 shadow-md backdrop-blur-xs">
                          {selectedBlogModal.tag}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-amber-300 backdrop-blur-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedBlogModal.readTime || '4 min read'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Card in Left Column */}
                  <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-blue-50/60 rounded-2xl p-4 border border-indigo-100/90 shadow-xs space-y-2.5">
                    <div className="flex items-center gap-2 pb-2 border-b border-indigo-100/80">
                      <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#00285e]">
                        Article Highlights &amp; Insights
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {(selectedBlogModal.highlights || [
                        "Hands-on practical industry workflows",
                        "Direct mentor feedback & code reviews",
                        "Verified GitHub projects & portfolio",
                        "100% placement guidance & interview prep"
                      ]).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-white/90 p-2 rounded-xl border border-slate-100 shadow-2xs">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="font-medium text-[11.5px] leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Title, Author, Excerpt & Main Text */}
                <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
                  {/* Category Pill, Publication Date, Verified Badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xs">
                      {selectedBlogModal.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Published {selectedBlogModal.date}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Verified Article
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#00285e] leading-[1.25] tracking-tight">
                    {selectedBlogModal.title}
                  </h1>

                  {/* Author Card */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/60 border border-blue-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                        {(selectedBlogModal.author || 'A')[0]}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                          {selectedBlogModal.author || 'Academic Cell'}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Faculty &amp; Industry Mentor at Aayush Institute
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-white px-3 py-1 rounded-xl shadow-xs border border-blue-200 hidden sm:inline-block">
                      Official Publication
                    </span>
                  </div>

                  {/* Excerpt Pull Quote */}
                  {selectedBlogModal.excerpt && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-400/10 to-blue-500/10 border-l-4 border-amber-400 shadow-xs">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed">
                        "{selectedBlogModal.excerpt}"
                      </p>
                    </div>
                  )}

                  {/* Main Article Paragraphs */}
                  <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3.5 font-normal pt-1">
                    <p className="text-slate-800 leading-relaxed font-normal">
                      {selectedBlogModal.content}
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      At Aayush Institute, our curriculum is engineered alongside seasoned corporate partners and senior technology leads. Whether you are starting your tech journey or upskilling for leadership positions, practical projects, code reviews, and mock technical rounds form the cornerstone of every module.
                    </p>
                  </div>

                  {/* CTA Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#003882] via-[#0052cc] to-[#0070f3] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-600/20 mt-4">
                    <div>
                      <h4 className="font-extrabold text-base sm:text-lg text-white">
                        Want hands-on training in this field?
                      </h4>
                      <p className="text-xs sm:text-sm text-sky-100 mt-1">
                        Learn directly with industry mentors and guaranteed 100% placement support.
                      </p>
                    </div>
                    {selectedBlogModal.relatedLink && (
                      <NavLink
                        to={selectedBlogModal.relatedLink}
                        onClick={() => setSelectedBlogModal(null)}
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-md transition-all whitespace-nowrap active:scale-95"
                      >
                        Explore Programs →
                      </NavLink>
                    )}
                  </div>
                </div>

              </div>

              {/* ── Other Blogs Section: Interactive Colorful Cards ── */}
              <div className="pt-6 border-t border-slate-200/90 mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                      More From Knowledge Hub
                    </span>
                    <h3 className="text-base sm:text-xl font-extrabold text-[#00285e]">
                      Other Articles You Might Like
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Click any article to read directly
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {blogsList
                    .filter((b) => (b.id || b._id) !== (selectedBlogModal.id || selectedBlogModal._id))
                    .slice(0, 3)
                    .map((otherBlog) => (
                      <div
                        key={otherBlog.id || otherBlog._id}
                        onClick={() => {
                          setSelectedBlogModal(otherBlog);
                          if (blogModalContentRef.current) {
                            blogModalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-gradient-to-b from-white to-slate-50/50 hover:to-indigo-50/30 transition-all duration-300 shadow-xs hover:shadow-lg cursor-pointer group flex flex-col justify-between hover:-translate-y-1"
                      >
                        <div className="h-32 rounded-xl overflow-hidden bg-slate-200 relative mb-3">
                          <img
                            src={otherBlog.image}
                            alt={otherBlog.title}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                            onError={(e) => { e.target.src = '/course_hero.png'; }}
                          />
                          <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-indigo-700 shadow-xs backdrop-blur-xs">
                            {otherBlog.tag}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#00285e] line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                            {otherBlog.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {otherBlog.date} • {otherBlog.readTime}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-bold group-hover:text-indigo-800">
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

            {/* 3. Modal Bottom Action Bar with Secondary Cut Button */}
            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
              <div className="flex items-center gap-2">
                <NavLink
                  to={`/blogs?id=${selectedBlogModal.id}`}
                  onClick={() => setSelectedBlogModal(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition shadow-xs cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Open in Blogs Library</span>
                </NavLink>

                {selectedBlogModal.relatedLink && (
                  <NavLink
                    to={selectedBlogModal.relatedLink}
                    onClick={() => setSelectedBlogModal(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    <span>Explore Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NavLink>
                )}
              </div>

              {/* Bottom Cut Button */}
              <button
                type="button"
                onClick={() => setSelectedBlogModal(null)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cut / Close</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── Career Counselling Form Modal ── */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-100 overflow-hidden transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Modal Header */}
            <div className="mb-5 pr-8">
              <span className="inline-block bg-[#e0effe] text-[#0062ff] font-medium text-[11px] px-3 py-0.5 rounded-full mb-2">
                100% Free Consultation
              </span>
              <h3 className="text-[#00285e] font-bold text-xl sm:text-2xl tracking-tight leading-tight">
                Book Your Free Career Counselling
              </h3>
              <p className="text-slate-500 text-xs sm:text-[13px] mt-1">
                Get expert guidance and choose the right course for your career goals.
              </p>
            </div>

            {modalSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="font-semibold text-base mb-1">Enquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700 font-medium">
                  Our career counsellor will contact you shortly to guide you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter mobile number"
                      value={modalForm.mobile}
                      onChange={(e) => setModalForm({ ...modalForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Select Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={modalForm.course}
                      onChange={(e) => setModalForm({ ...modalForm, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors text-slate-700"
                    >
                      <option value="">Select Course</option>
                      <optgroup label="Software & Web Development">
                        <option value="Software & Full Stack Development">Software &amp; Full Stack Development</option>
                        <option value="Web Designing">Web Designing</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                      </optgroup>
                      <optgroup label="AI, Data & Cloud">
                        <option value="Artificial Intelligence & Generative AI">Artificial Intelligence &amp; Generative AI</option>
                        <option value="Data Science, Data Analytics & Business Intelligence">Data Science &amp; Business Intelligence</option>
                        <option value="Cyber Security & Networking">Cyber Security &amp; Networking</option>
                        <option value="Cloud Computing & DevOps">Cloud Computing &amp; DevOps</option>
                      </optgroup>
                      <optgroup label="Design, UI/UX & Media">
                        <option value="UI/UX & Product Design">UI/UX &amp; Product Design</option>
                        <option value="Graphic Design & Branding">Graphic Design &amp; Branding</option>
                        <option value="Video Editing & Motion Graphics">Video Editing &amp; Motion Graphics</option>
                      </optgroup>
                      <optgroup label="Digital Marketing & E-Commerce">
                        <option value="Digital Marketing & Performance Marketing">Digital Marketing &amp; Performance Marketing</option>
                        <option value="E-Commerce & Digital Business">E-Commerce &amp; Digital Business</option>
                      </optgroup>
                      <optgroup label="Accounting & Business Skills">
                        <option value="Accounting, GST & Business Finance">Accounting, GST &amp; Business Finance</option>
                        <option value="Advanced Office & Business Skills">Advanced Office &amp; Business Skills</option>
                      </optgroup>
                      <optgroup label="Technical CAD & IT Support">
                        <option value="AutoCAD & Technical Design">AutoCAD &amp; Technical Design</option>
                        <option value="Hardware, IT Support & System Administration">Hardware, IT Support &amp; System Administration</option>
                      </optgroup>
                      <optgroup label="Foreign Languages & Test Prep">
                        <option value="IELTS – English Proficiency Test Preparation">IELTS Test Preparation</option>
                        <option value="PTE – Pearson Test of English">PTE Test Preparation</option>
                        <option value="German Language">German Language (A1–B2)</option>
                        <option value="French Language">French Language (A1–B2)</option>
                        <option value="Japanese Language">Japanese Language (N5–N2)</option>
                      </optgroup>
                      <optgroup label="Short-Term & Professional Skills">
                        <option value="Short-Term & Professional Skills">Short-Term &amp; Professional Skills</option>
                      </optgroup>
                      <option value="Other Course">Other Course</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Message
                    </label>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={modalForm.message}
                      onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[#003882] hover:bg-[#00285e] text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── WHY CHOOSE US ECOSYSTEM MODAL FLOW ── */}
      {isWhyChooseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-100 relative text-slate-800">
            {/* Sticky Close Button */}
            <button
              onClick={() => setIsWhyChooseModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 hover:bg-white shadow-md transition-colors cursor-pointer border border-slate-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Banner Header */}
            <div className="bg-gradient-to-br from-[#00285e] via-[#004b93] to-[#0066ff] p-6 sm:p-8 md:p-10 text-white relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl text-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-medium mb-3 border border-white/20 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>ESTABLISHED SINCE 2002 • 20+ YEARS OF EXCELLENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  WHY CHOOSE US
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg text-blue-100 font-semibold mb-3 max-w-xl">
                  More Than Education — A Complete Learning & Career Support Ecosystem
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl font-normal">
                  At Aayush Institute of Professional Studies, we focus on creating a learning environment that connects education, practical skills, industry exposure and career development.
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 md:p-8 space-y-8">
              
              {/* 9 Core Institutional Advantages */}
              <div>
                <div className="text-center mb-5">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#0066ff] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Core Institutional Pillars
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-[#00285e] mt-2">
                    A Complete Learning & Career Ecosystem
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {whyChooseUsPillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/70 hover:bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                            {pillar.badge}
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-[13px] font-semibold text-[#00285e] mb-1.5 leading-snug">
                          {pillar.title}
                        </h5>
                        <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OUR KEY DIFFERENCE (5-Step Journey) */}
              <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50/50 rounded-2xl p-5 sm:p-6 border border-blue-100">
                <div className="text-center mb-5">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-200">
                    OUR KEY DIFFERENCE
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-[#00285e] mt-2">
                    Learn. Practice. Experience. Progress.
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xl mx-auto mt-1">
                    We aim to create a connected learning journey where students can:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {whyChooseKeyDifference.map((diff, dIdx) => (
                    <div
                      key={dIdx}
                      className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-[#0066ff] block mb-1">
                          {diff.step}
                        </span>
                        <h6 className="text-xs font-semibold text-[#00285e] mb-1">
                          {diff.title}
                        </h6>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {diff.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* A PARTNER IN YOUR LEARNING JOURNEY (Bottom Action Block) */}
              <div className="bg-gradient-to-r from-[#00285e] to-[#004b93] rounded-2xl p-5 sm:p-7 text-white text-center">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  A PARTNER IN YOUR LEARNING JOURNEY
                </h4>
                <p className="text-xs sm:text-[13px] text-blue-100 max-w-2xl mx-auto leading-relaxed mb-5">
                  Whether your goal is to learn technology, pursue higher education, develop professional skills, gain industry exposure or prepare for employment, Aayush Institute of Professional Studies provides learning pathways and support designed around your next step.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                  <NavLink
                    to="/Courses"
                    onClick={() => setIsWhyChooseModalOpen(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-[#00285e] font-medium text-xs hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    Explore Courses
                  </NavLink>
                  <NavLink
                    to="/UniversityCourses"
                    onClick={() => setIsWhyChooseModalOpen(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-medium text-xs transition-colors shadow-sm"
                  >
                    Explore University Programmes
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsWhyChooseModalOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/25 transition-colors cursor-pointer"
                  >
                    Get Career Guidance
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── COURSE DETAILS MODAL (Exact match from Courses page) ── */}
      <CourseDetailsModal
        isOpen={isCourseModalOpen}
        course={selectedCourseDetails}
        onClose={closeCourseModal}
        onSelectCourse={(c) => setSelectedCourseDetails(c)}
      />

    </div>
  );
}
