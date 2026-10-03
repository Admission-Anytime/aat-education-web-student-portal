import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Briefcase,
    Code,
    Cpu,
    Globe,
    Palette,
    Settings,
    Award,
    CheckCircle2,
    Clock,
    Users,
    Sparkles,
    Search,
    ArrowRight,
    Send,
    X,
    GraduationCap,
    TrendingUp,
    Calendar,
    ChevronRight,
    Laptop,
    FileText,
    Target,
    PhoneCall,
    MessageSquare,
    Compass,
    Star,
    Shield,
    Building2,
    Check,
    Edit3,
    Plus,
    Trash2,
    ShieldCheck,
    Lock,
    KeyRound,
    RefreshCw
} from 'lucide-react';

// Safe dynamic icon resolver for placement roles
const renderPlacementIcon = (role, customClass = "w-5 h-5") => {
    if (!role) return <Briefcase className={customClass} />;
    if (React.isValidElement(role.icon)) return role.icon;
    if (typeof role.icon === 'function') {
        const IconComp = role.icon;
        return <IconComp className={customClass} />;
    }
    const name = (role.name || '').toLowerCase();
    if (name.includes('code') || name.includes('software') || name.includes('developer') || name.includes('python') || name.includes('java')) return <Code className={customClass} />;
    if (name.includes('ai') || name.includes('data') || name.includes('machine') || name.includes('analyst') || name.includes('cloud')) return <Cpu className={customClass} />;
    if (name.includes('web') || name.includes('marketing') || name.includes('digital') || name.includes('seo') || name.includes('social')) return <Globe className={customClass} />;
    if (name.includes('design') || name.includes('ui') || name.includes('ux') || name.includes('graphic')) return <Palette className={customClass} />;
    if (name.includes('hardware') || name.includes('network') || name.includes('support') || name.includes('system')) return <Settings className={customClass} />;
    return <Briefcase className={customClass} />;
};

const sanitizePlacementRolesForStorage = (data) => {
    if (!data || typeof data !== 'object') return {};
    const clean = {};
    for (const [k, list] of Object.entries(data)) {
        if (Array.isArray(list)) {
            clean[k] = list.map(item => {
                const copy = { ...item };
                delete copy.icon;
                return copy;
            });
        } else {
            clean[k] = list;
        }
    }
    return clean;
};

const careerCategories = [
    {
        id: 'it',
        label: 'IT & Software',
        icon: <Code className="w-4 h-4" />,
        eligibility: 'B.Tech / BCA / MCA / B.Sc. IT & CS / Diploma / Technical Learners',
        desc: 'Industry-ready software engineering, modern frontend & backend frameworks, clean code architecture, and full stack web roles.',
        activeGrad: 'from-blue-600 via-indigo-600 to-cyan-500',
        activeShadow: 'shadow-blue-500/30',
        iconGrad: 'from-blue-600 to-indigo-600'
    },
    {
        id: 'data',
        label: 'Data, AI & Technology',
        icon: <Cpu className="w-4 h-4" />,
        eligibility: 'Graduates / B.Tech / BCA / B.Sc. / MCA / Analytical Minds',
        desc: 'In-demand positions across Generative AI, Machine Learning, Data Analytics, enterprise Power BI reporting, and Cloud & DevOps pipelines.',
        activeGrad: 'from-purple-600 via-violet-600 to-pink-500',
        activeShadow: 'shadow-purple-500/30',
        iconGrad: 'from-purple-600 to-violet-600'
    },
    {
        id: 'digital',
        label: 'Digital & Business',
        icon: <Globe className="w-4 h-4" />,
        eligibility: 'Any Graduate / 12th / MBA / BBA / Career Switchers',
        desc: 'Performance marketing, search engine optimization, social media strategy, e-commerce management, and business operations roles.',
        activeGrad: 'from-amber-500 via-orange-500 to-yellow-400',
        activeShadow: 'shadow-amber-500/30',
        iconGrad: 'from-amber-500 to-orange-600'
    },
    {
        id: 'design',
        label: 'Design & Creative',
        icon: <Palette className="w-4 h-4" />,
        eligibility: 'Design Students / Creative Individuals / Graduates / B.Tech / BCA',
        desc: 'Product UI/UX design, interactive prototyping in Figma, visual branding, corporate graphic design, and web interface engineering.',
        activeGrad: 'from-rose-600 via-pink-600 to-purple-500',
        activeShadow: 'shadow-rose-500/30',
        iconGrad: 'from-rose-600 to-pink-600'
    },
    {
        id: 'support',
        label: 'Technical & IT Support',
        icon: <Settings className="w-4 h-4" />,
        eligibility: 'Diploma / ITI / 12th / Graduates / Hardware & Networking Candidates',
        desc: 'Infrastructure support, desktop engineer roles, hardware diagnostics, network troubleshooting, system administration, and technical helpdesk.',
        activeGrad: 'from-cyan-600 via-sky-600 to-teal-500',
        activeShadow: 'shadow-cyan-500/30',
        iconGrad: 'from-cyan-600 to-teal-600'
    }
];

const placementRolesData = {
    it: [
        {
            name: "Software Development",
            subgroup: "Core Development",
            icon: <Code className="w-5 h-5" />,
            popular: true,
            details: "Prepare for entry-level and junior Software Development Engineer (SDE) roles with strong data structures, algorithms, OOP fundamentals, and modular problem-solving.",
            features: ["Data Structures & Algorithms", "OOP Design Principles", "Problem-Solving & Clean Code", "Technical Coding Assessments"],
            duration: "Full-Time / Hybrid",
            targetRole: "Junior Software Engineer / SDE-1"
        },
        {
            name: "Web Development",
            subgroup: "Web & Frontend",
            icon: <Globe className="w-5 h-5" />,
            popular: true,
            details: "Client-facing web engineering focusing on responsive design, modern JavaScript (ES6+), semantic HTML5, CSS frameworks, and cross-browser compliance.",
            features: ["Modern JavaScript & CSS3", "Responsive Web Architecture", "REST API Consumption", "Portfolio Website Demonstration"],
            duration: "Full-Time / Hybrid",
            targetRole: "Web Developer / Frontend Associate"
        },
        {
            name: "Full Stack Development",
            subgroup: "Full Stack Engineering",
            icon: <Laptop className="w-5 h-5" />,
            popular: true,
            details: "End-to-end full stack developer training connecting frontends, robust backend REST APIs, authentication security, database modeling, and cloud deployments.",
            features: ["End-to-End System Design", "Database Schemas & ORM", "API Security & Token Auth", "Live Production Project Defense"],
            duration: "Full-Time / On-Site",
            targetRole: "Full Stack Engineer"
        },
        {
            name: "Python Development",
            subgroup: "Backend Engineering",
            icon: <Code className="w-5 h-5" />,
            popular: true,
            details: "Backend engineering roles utilizing Python, Django, Flask, database queries, web scraping, and microservice APIs with comprehensive unit testing.",
            features: ["Django / Flask REST Framework", "SQL & NoSQL Integration", "Scripting & Automation", "Backend Architecture Viva Prep"],
            duration: "Full-Time / Hybrid",
            targetRole: "Python Developer / Backend Engineer"
        },
        {
            name: "Java Development",
            subgroup: "Backend Engineering",
            icon: <Laptop className="w-5 h-5" />,
            popular: true,
            details: "Enterprise corporate software roles using Core Java, Spring Boot, Hibernate ORM, microservices architecture, and enterprise design patterns.",
            features: ["Core Java & Multithreading", "Spring Boot & Microservices", "Hibernate JPA Relational Mapping", "Enterprise Coding Interviews"],
            duration: "Full-Time / On-Site",
            targetRole: "Java Developer / Spring Boot Engineer"
        },
        {
            name: "React JS",
            subgroup: "Web & Frontend",
            icon: <Code className="w-5 h-5" />,
            popular: true,
            details: "High-demand frontend positions for modern Single Page Applications (SPAs) built with React Hooks, Redux Toolkit, client-side routing, and API integration.",
            features: ["Component Lifecycle & Hooks", "State Management (Redux/Zustand)", "Performance Optimization", "Live Frontend Coding Rounds"],
            duration: "Full-Time / Hybrid",
            targetRole: "React Developer / Frontend Engineer"
        },
        {
            name: "Node.js",
            subgroup: "Backend Engineering",
            icon: <Code className="w-5 h-5" />,
            details: "Scalable server-side backend development roles emphasizing asynchronous event loops, Express frameworks, WebSocket integrations, and API performance.",
            features: ["Asynchronous Event Loops", "REST API Development", "JWT Security & Rate Limiting", "Backend Microservice Scenarios"],
            duration: "Full-Time / Hybrid",
            targetRole: "Node.js Backend Developer"
        },
        {
            name: "MERN Stack",
            subgroup: "Full Stack Engineering",
            icon: <Laptop className="w-5 h-5" />,
            popular: true,
            details: "Comprehensive MERN engineer placement preparation: MongoDB Atlas, Express.js backend, React frontend, and Node.js servers with Git workflows.",
            features: ["Full MERN Stack Proficiency", "Cloud Hosting (Vercel/Render)", "Full Stack Portfolio Codebase", "System Design Fundamentals"],
            duration: "Full-Time / On-Site",
            targetRole: "MERN Stack Developer"
        }
    ],

    data: [
        {
            name: "Artificial Intelligence",
            subgroup: "AI & Machine Learning",
            icon: <Cpu className="w-5 h-5" />,
            popular: true,
            details: "Specialized roles in applied AI: foundational computer vision, natural language processing (NLP), neural network evaluation, and AI solution integration.",
            features: ["AI & Neural Network Fundamentals", "Python AI Libraries", "Model Validation & Metrics", "Applied AI Case Studies"],
            duration: "Full-Time / Hybrid",
            targetRole: "AI Specialist / Applied AI Associate"
        },
        {
            name: "Generative AI",
            subgroup: "AI & Machine Learning",
            icon: <Sparkles className="w-5 h-5" />,
            popular: true,
            details: "Next-gen GenAI roles focusing on LangChain, Large Language Models (LLMs), RAG vector search implementations, prompt engineering, and enterprise AI automation.",
            features: ["LangChain & LLM APIs", "RAG Vector Architecture", "Enterprise Prompt Engineering", "AI Automation Workflows"],
            duration: "Full-Time / Hybrid",
            targetRole: "Generative AI Engineer / AI Consultant"
        },
        {
            name: "Data Analytics",
            subgroup: "Analytics & Intelligence",
            icon: <TrendingUp className="w-5 h-5" />,
            popular: true,
            details: "Practical data analyst placements: data extraction with SQL, cleaning and statistical exploration with Pandas, and executive reporting presentations.",
            features: ["Advanced SQL Analytical Queries", "Pandas & Python Data Wrangling", "Statistical Trend Extraction", "Business Metric Formulations"],
            duration: "Full-Time / Hybrid",
            targetRole: "Data Analyst / Business Intelligence Associate"
        },
        {
            name: "Machine Learning",
            subgroup: "AI & Machine Learning",
            icon: <Cpu className="w-5 h-5" />,
            popular: true,
            details: "Supervised and unsupervised predictive modeling, feature engineering, Scikit-Learn pipelines, model accuracy scoring, and Flask API deployment.",
            features: ["Feature Engineering & Scaling", "Scikit-Learn ML Pipelines", "Model Accuracy & Confusion Matrix", "ML Project Portfolio Reviews"],
            duration: "Full-Time / Hybrid",
            targetRole: "Machine Learning Engineer / Trainee"
        },
        {
            name: "Power BI",
            subgroup: "Analytics & Intelligence",
            icon: <TrendingUp className="w-5 h-5" />,
            popular: true,
            details: "Business Intelligence roles focusing on enterprise Power BI dashboards, DAX formulas, Power Query data transformation, and data storytelling.",
            features: ["Power Query ETL Transformation", "Complex DAX Measures & KPIs", "Star Schema Relationship Modeling", "Executive Dashboard Defense"],
            duration: "Full-Time / Hybrid",
            targetRole: "Power BI Developer / BI Analyst"
        },
        {
            name: "Cloud Computing",
            subgroup: "Cloud & DevOps",
            icon: <Cpu className="w-5 h-5" />,
            popular: true,
            details: "Cloud infrastructure associate positions: managing AWS/Azure compute instances, virtual private clouds, IAM permissions, storage, and load balancing.",
            features: ["AWS / Azure Core Infrastructure", "IAM Policies & Cloud Security", "VPC & Storage Management", "Cloud Architecture Interviews"],
            duration: "Full-Time / Hybrid",
            targetRole: "Cloud Engineer / Cloud Support Associate"
        },
        {
            name: "DevOps",
            subgroup: "Cloud & DevOps",
            icon: <Settings className="w-5 h-5" />,
            popular: true,
            details: "Automated deployment, continuous integration (CI/CD) pipelines, Docker containerization, GitHub Actions, and Linux production server maintenance.",
            features: ["CI/CD Pipeline Construction", "Docker Containerization", "Linux Administration & Bash", "Deployment Automation Scenarios"],
            duration: "Full-Time / Hybrid",
            targetRole: "DevOps Engineer / Automation Associate"
        }
    ],

    digital: [
        {
            name: "Digital Marketing",
            subgroup: "Marketing & Growth",
            icon: <Globe className="w-5 h-5" />,
            popular: true,
            details: "Full-funnel digital marketing careers: multi-channel campaign planning, conversion rate optimization, Google Ads, lead acquisition, and ROI tracking.",
            features: ["Multi-Channel Campaign Strategy", "Google Ads & Meta Ads Management", "Conversion Funnel Optimization", "Marketing Analytics & Reporting"],
            duration: "Full-Time / Hybrid",
            targetRole: "Digital Marketing Executive / Specialist"
        },
        {
            name: "SEO",
            subgroup: "Marketing & Growth",
            icon: <Search className="w-5 h-5" />,
            popular: true,
            details: "Search Engine Optimization careers: keyword research, technical SEO audits, on-page content optimization, link profile building, and ranking metrics.",
            features: ["Keyword Research & Content Maps", "Technical SEO Audits & Schemas", "Google Search Console & Analytics", "Backlink Strategy Development"],
            duration: "Full-Time / Hybrid",
            targetRole: "SEO Specialist / Search Strategist"
        },
        {
            name: "Social Media Marketing",
            subgroup: "Marketing & Growth",
            icon: <MessageSquare className="w-5 h-5" />,
            details: "Brand audience growth on Instagram, LinkedIn, YouTube, and Facebook with creative calendar planning, engagement tactics, and influencer outreach.",
            features: ["Social Content Calendars", "Engagement & Community Growth", "Meta Business Suite Mastery", "Brand Performance Metrics"],
            duration: "Full-Time / Hybrid",
            targetRole: "Social Media Manager / Executive"
        },
        {
            name: "E-Commerce",
            subgroup: "E-Commerce & Business Operations",
            icon: <Globe className="w-5 h-5" />,
            popular: true,
            details: "Online store management across Amazon, Flipkart, and Shopify: product listing optimization, inventory coordination, order fulfillment, and marketplace ads.",
            features: ["Marketplace Listing & Cataloging", "Shopify Store Management", "Order & Inventory Operations", "E-Commerce Advertising Basics"],
            duration: "Full-Time / Hybrid",
            targetRole: "E-Commerce Executive / Catalog Specialist"
        },
        {
            name: "Business Analytics",
            subgroup: "E-Commerce & Business Operations",
            icon: <TrendingUp className="w-5 h-5" />,
            details: "Bridging business goals and technical operations: KPI tracking, customer churn evaluation, process modeling, and presentation to leadership.",
            features: ["Business KPI Formulations", "Process Workflow Mapping", "Data-Driven Strategy Formulation", "Stakeholder Presentation Prep"],
            duration: "Full-Time / Hybrid",
            targetRole: "Business Analyst / Operations Strategist"
        },
        {
            name: "Customer Support",
            subgroup: "E-Commerce & Business Operations",
            icon: <PhoneCall className="w-5 h-5" />,
            details: "Client communication, ticket resolution with Zendesk/Freshdesk, professional email etiquette, issue escalation protocols, and customer retention.",
            features: ["CRM & Ticketing Systems", "Conflict Resolution & Empathy", "Professional Communication", "Customer Success KPIs"],
            duration: "Full-Time / Hybrid",
            targetRole: "Customer Support Specialist / Executive"
        },
        {
            name: "Business Operations",
            subgroup: "E-Commerce & Business Operations",
            icon: <Briefcase className="w-5 h-5" />,
            details: "Operational management in corporate workplaces: scheduling, procurement coordination, vendor communication, team reporting, and productivity workflows.",
            features: ["Office Productivity Workflows", "Vendor & Resource Management", "Documentation & Reporting", "Operational Problem Solving"],
            duration: "Full-Time / Hybrid",
            targetRole: "Operations Executive / Business Coordinator"
        }
    ],

    design: [
        {
            name: "UI/UX Design",
            subgroup: "Product Design",
            icon: <Palette className="w-5 h-5" />,
            popular: true,
            details: "High-paying product design careers: user interviews, empathy maps, UX architecture, wireframing, UI kits, interactive prototyping, and usability testing.",
            features: ["User Empathy & Problem Statements", "Wireframing & Information Architecture", "High-Fidelity Interactive Flows", "Behance / Dribbble Portfolio Defense"],
            duration: "Full-Time / Hybrid",
            targetRole: "UI/UX Designer / Product Designer"
        },
        {
            name: "Graphic Design",
            subgroup: "Visual Design",
            icon: <Palette className="w-5 h-5" />,
            popular: true,
            details: "Commercial graphic design roles using Photoshop, Illustrator, and CorelDRAW: brand identity logos, marketing banners, brochures, and vector artworks.",
            features: ["Brand Identity & Logo Systems", "Marketing Creative Collateral", "Typography & Color Theory", "Print & Digital Media Production"],
            duration: "Full-Time / Hybrid",
            targetRole: "Graphic Designer / Visual Artist"
        },
        {
            name: "Web Design",
            subgroup: "Visual Design",
            icon: <Laptop className="w-5 h-5" />,
            details: "Digital web layout design: creating responsive landing pages, conversion-optimized marketing pages, interactive hero sections, and design systems.",
            features: ["Responsive Web Grid Systems", "Landing Page CRO Layouts", "Modern UI Micro-Interactions", "Figma to Web Developer Specs"],
            duration: "Full-Time / Hybrid",
            targetRole: "Web Designer / Creative Layout Artist"
        },
        {
            name: "Digital Design",
            subgroup: "Product Design",
            icon: <Palette className="w-5 h-5" />,
            popular: true,
            details: "Multi-platform digital creatives: app icons, social media carousels, motion graphics fundamentals, email templates, and corporate digital decks.",
            features: ["Cross-Platform Digital Creatives", "Motion Graphics Basics", "Email Template Layouts", "Portfolio Presentation Coaching"],
            duration: "Full-Time / Hybrid",
            targetRole: "Digital Designer / Creative Specialist"
        }
    ],

    support: [
        {
            name: "Computer Hardware & Networking",
            subgroup: "Hardware & Infrastructure",
            icon: <Settings className="w-5 h-5" />,
            popular: true,
            details: "PC assembly, diagnostics, motherboard troubleshooting, LAN/WAN setup, crimping, switches, routers, and client workstation deployment.",
            features: ["Hardware Diagnostics & Assembly", "LAN/WAN Configuration & Cabling", "OS & Driver Installations", "Peripheral & Printer Maintenance"],
            duration: "Full-Time / On-Site",
            targetRole: "Hardware & Network Engineer"
        },
        {
            name: "IT Support",
            subgroup: "Technical Services",
            icon: <Laptop className="w-5 h-5" />,
            popular: true,
            details: "Internal corporate IT support: user account setup, Active Directory basics, antivirus deployment, remote support tools, and software troubleshooting.",
            features: ["Active Directory User Management", "Remote Desktop Support Tools", "Antivirus & Firewall Rules", "IT Ticket Resolution Etiquette"],
            duration: "Full-Time / On-Site",
            targetRole: "IT Support Engineer / Desktop Engineer"
        },
        {
            name: "Technical Support",
            subgroup: "Technical Services",
            icon: <PhoneCall className="w-5 h-5" />,
            popular: true,
            details: "Client and customer technical support: diagnosing software glitches, handling phone/chat escalations, documentation, and SLA compliance.",
            features: ["SLA & Escalation Protocols", "Voice & Chat Tech Assistance", "Troubleshooting Trees & Guides", "Client Relationship Etiquette"],
            duration: "Full-Time / Hybrid",
            targetRole: "Technical Support Specialist"
        },
        {
            name: "Network Support",
            subgroup: "Hardware & Infrastructure",
            icon: <Settings className="w-5 h-5" />,
            details: "Monitoring network uptime, configuring routers and access points, IP addressing (IPv4/IPv6), subnetting, and resolving connectivity drops.",
            features: ["IP Addressing & Subnetting", "Router & AP Configurations", "Network Monitoring Tools", "Bandwidth & Packet Diagnostics"],
            duration: "Full-Time / On-Site",
            targetRole: "Network Support Associate / NOC Tech"
        },
        {
            name: "System Support",
            subgroup: "Technical Services",
            icon: <Settings className="w-5 h-5" />,
            details: "System administrative support: Windows and Linux workstation maintenance, backup schedules, patch management, and hardware upgrades.",
            features: ["Windows & Linux Administration", "Data Backup & Recovery Routines", "System Patch Management", "Hardware Upgrade Procedures"],
            duration: "Full-Time / On-Site",
            targetRole: "System Support Associate"
        }
    ]
};

const whoCanJoinStreams = [
    'ITI',
    'Polytechnic / Diploma',
    'BCA',
    'B.Sc. IT',
    'B.Sc. Computer Science',
    'B.Tech / BE',
    'MCA',
    'M.Tech',
    'Other IT & Computer Science Programmes',
    'Relevant Professional & Technical Programmes'
];

const whoCanJoinIdealFor = [
    'Final-Year Students',
    'Fresh Graduates',
    'Job Seekers',
    'Career Starters',
    'Skilled Professionals'
];

const placementPreparationPillars = [
    {
        title: "Resume & Profile Development",
        desc: "Build ATS-optimized resumes and candidate GitHub / LinkedIn profiles tailored to industry hiring keywords.",
        icon: <FileText className="w-5 h-5 text-white" />,
        cardBg: "from-blue-100/90 via-blue-50/70 to-indigo-50/50",
        border: "border-2 border-blue-200 hover:border-blue-500",
        iconGrad: "from-blue-600 to-indigo-600",
        shadow: "hover:shadow-[0_12px_28px_rgba(59,130,246,0.16)]"
    },
    {
        title: "Interview Preparation",
        desc: "Prepare for multi-round technical, HR, and situational evaluation panels through structured simulations.",
        icon: <Users className="w-5 h-5 text-white" />,
        cardBg: "from-emerald-100/90 via-emerald-50/70 to-teal-50/50",
        border: "border-2 border-emerald-200 hover:border-emerald-500",
        iconGrad: "from-emerald-600 to-teal-600",
        shadow: "hover:shadow-[0_12px_28px_rgba(16,185,129,0.16)]"
    },
    {
        title: "Technical Skill Assessment",
        desc: "Conduct diagnostic coding assessments and identify knowledge gaps for your target job profile.",
        icon: <Target className="w-5 h-5 text-white" />,
        cardBg: "from-purple-100/90 via-purple-50/70 to-violet-50/50",
        border: "border-2 border-purple-200 hover:border-purple-500",
        iconGrad: "from-purple-600 to-violet-600",
        shadow: "hover:shadow-[0_12px_28px_rgba(147,51,234,0.16)]"
    },
    {
        title: "Communication & Workplace Skills",
        desc: "Develop professional email etiquette, corporate verbal fluency, presentation abilities, and workplace ethics.",
        icon: <MessageSquare className="w-5 h-5 text-white" />,
        cardBg: "from-amber-100/90 via-amber-50/70 to-orange-50/50",
        border: "border-2 border-amber-200 hover:border-amber-500",
        iconGrad: "from-amber-500 to-orange-600",
        shadow: "hover:shadow-[0_12px_28px_rgba(245,158,11,0.16)]"
    },
    {
        title: "Mock Interview Drills",
        desc: "Real-time face-to-face mock interview drills with detailed scorecard feedback from senior technical mentors.",
        icon: <Award className="w-5 h-5 text-white" />,
        cardBg: "from-cyan-100/90 via-cyan-50/70 to-sky-50/50",
        border: "border-2 border-cyan-200 hover:border-cyan-500",
        iconGrad: "from-cyan-600 to-sky-700",
        shadow: "hover:shadow-[0_12px_28px_rgba(6,182,212,0.16)]"
    },
    {
        title: "Career Guidance & Counseling",
        desc: "Personalized 1-on-1 counseling to discover market demands, salary expectations, and optimal career pathways.",
        icon: <Compass className="w-5 h-5 text-white" />,
        cardBg: "from-rose-100/90 via-rose-50/70 to-pink-50/50",
        border: "border-2 border-rose-200 hover:border-rose-500",
        iconGrad: "from-rose-600 to-pink-600",
        shadow: "hover:shadow-[0_12px_28px_rgba(244,63,94,0.16)]"
    }
];

const placementProcessSteps = [
    {
        step: "01",
        title: "Career Assessment",
        desc: "Understand your education, technical background, strengths, and target career goals.",
        cardBg: "from-blue-100/90 via-blue-50/60 to-white",
        border: "border-2 border-blue-200 hover:border-blue-400",
        stepColor: "text-blue-600"
    },
    {
        step: "02",
        title: "Skill Upgradation",
        desc: "Strengthen hands-on technical skills and complete domain-specific capstone assignments.",
        cardBg: "from-indigo-100/90 via-indigo-50/60 to-white",
        border: "border-2 border-indigo-200 hover:border-indigo-400",
        stepColor: "text-indigo-600"
    },
    {
        step: "03",
        title: "ATS Resume & GitHub",
        desc: "Craft an industry-standard ATS resume and publish production code to an active GitHub profile.",
        cardBg: "from-cyan-100/90 via-cyan-50/60 to-white",
        border: "border-2 border-cyan-200 hover:border-cyan-400",
        stepColor: "text-cyan-700"
    },
    {
        step: "04",
        title: "Mock Interview Drills",
        desc: "Undergo simulated technical and HR interviews with comprehensive performance feedback.",
        cardBg: "from-emerald-100/90 via-emerald-50/60 to-white",
        border: "border-2 border-emerald-200 hover:border-emerald-400",
        stepColor: "text-emerald-700"
    },
    {
        step: "05",
        title: "Drive Opportunities",
        desc: "Connect with campus recruitment drives and curated hiring opportunities from partner firms.",
        cardBg: "from-purple-100/90 via-purple-50/60 to-white",
        border: "border-2 border-purple-200 hover:border-purple-400",
        stepColor: "text-purple-600"
    },
    {
        step: "06",
        title: "Selection & Offer",
        desc: "Excel in final interview rounds, clear background verification, and begin your career.",
        cardBg: "from-rose-100/90 via-rose-50/60 to-white",
        border: "border-2 border-rose-200 hover:border-rose-400",
        stepColor: "text-rose-600"
    }
];

const whatYouGetItems = [
    "Career Guidance & Roadmap",
    "ATS Resume & CV Crafting",
    "Technical Interview Practice",
    "HR & Behavioral Interview Prep",
    "Mock Interview Drills",
    "Communication & Workplace Etiquette",
    "Target Job Role Counseling",
    "Campus Drive Notifications",
    "Recruitment Partner Access",
    "Placement Support Assistance"
];

const trainingToCareerFlow = [
    { step: "01", label: "Learn", desc: "Gain fundamental concepts & theory", cardBg: "from-blue-100/80 via-white to-blue-50/40", border: "border-2 border-blue-200 hover:border-blue-400", stepGrad: "from-blue-600 to-indigo-600" },
    { step: "02", label: "Build Skills", desc: "Hands-on projects & lab practice", cardBg: "from-indigo-100/80 via-white to-indigo-50/40", border: "border-2 border-indigo-200 hover:border-indigo-400", stepGrad: "from-indigo-600 to-cyan-600" },
    { step: "03", label: "Prepare", desc: "ATS resume & mock interview drills", cardBg: "from-cyan-100/80 via-white to-cyan-50/40", border: "border-2 border-cyan-200 hover:border-cyan-400", stepGrad: "from-cyan-600 to-teal-600" },
    { step: "04", label: "Apply", desc: "Shortlist targeted company roles", cardBg: "from-teal-100/80 via-white to-teal-50/40", border: "border-2 border-teal-200 hover:border-teal-400", stepGrad: "from-teal-600 to-emerald-600" },
    { step: "05", label: "Interview", desc: "Attend recruitment rounds with confidence", cardBg: "from-purple-100/80 via-white to-purple-50/40", border: "border-2 border-purple-200 hover:border-purple-400", stepGrad: "from-purple-600 to-violet-600" },
    { step: "06", label: "Start Career", desc: "Receive offer & begin your professional journey", cardBg: "from-rose-100/80 via-white to-rose-50/40", border: "border-2 border-rose-200 hover:border-rose-400", stepGrad: "from-rose-600 to-pink-600" }
];

const cardThemePalette = [
    {
        cardBg: "from-blue-100/90 via-blue-50/70 to-indigo-50/50",
        border: "border-2 border-blue-200 hover:border-blue-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]",
        iconGrad: "from-blue-600 to-indigo-600",
        iconShadow: "shadow-blue-500/35",
        badgeBg: "bg-blue-600 text-white shadow-xs shadow-blue-500/30",
        titleHover: "group-hover:text-blue-600",
        arrowBg: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        glow: "from-blue-500 to-cyan-400"
    },
    {
        cardBg: "from-purple-100/90 via-purple-50/70 to-fuchsia-50/50",
        border: "border-2 border-purple-200 hover:border-purple-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]",
        iconGrad: "from-purple-600 to-violet-600",
        iconShadow: "shadow-purple-500/35",
        badgeBg: "bg-purple-600 text-white shadow-xs shadow-purple-500/30",
        titleHover: "group-hover:text-purple-600",
        arrowBg: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
        glow: "from-purple-500 to-fuchsia-400"
    },
    {
        cardBg: "from-emerald-100/90 via-emerald-50/70 to-teal-50/50",
        border: "border-2 border-emerald-200 hover:border-emerald-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]",
        iconGrad: "from-emerald-600 to-teal-600",
        iconShadow: "shadow-emerald-500/35",
        badgeBg: "bg-emerald-600 text-white shadow-xs shadow-emerald-500/30",
        titleHover: "group-hover:text-emerald-600",
        arrowBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
        glow: "from-emerald-500 to-teal-400"
    },
    {
        cardBg: "from-amber-100/90 via-amber-50/70 to-orange-50/50",
        border: "border-2 border-amber-200 hover:border-amber-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]",
        iconGrad: "from-amber-500 to-orange-600",
        iconShadow: "shadow-amber-500/35",
        badgeBg: "bg-amber-600 text-white shadow-xs shadow-amber-500/30",
        titleHover: "group-hover:text-amber-600",
        arrowBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
        glow: "from-amber-500 to-orange-400"
    },
    {
        cardBg: "from-cyan-100/90 via-cyan-50/70 to-sky-50/50",
        border: "border-2 border-cyan-200 hover:border-cyan-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(6,182,212,0.18)]",
        iconGrad: "from-cyan-600 to-sky-700",
        iconShadow: "shadow-cyan-500/35",
        badgeBg: "bg-cyan-600 text-white shadow-xs shadow-cyan-500/30",
        titleHover: "group-hover:text-cyan-600",
        arrowBg: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
        glow: "from-cyan-500 to-sky-400"
    },
    {
        cardBg: "from-rose-100/90 via-rose-50/70 to-pink-50/50",
        border: "border-2 border-rose-200 hover:border-rose-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(244,63,94,0.18)]",
        iconGrad: "from-rose-600 to-pink-600",
        iconShadow: "shadow-rose-500/35",
        badgeBg: "bg-rose-600 text-white shadow-xs shadow-rose-500/30",
        titleHover: "group-hover:text-rose-600",
        arrowBg: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
        glow: "from-rose-500 to-pink-400"
    }
];

const Placement = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(location.state?.category || 'it');
    const [selectedRole, setSelectedRole] = useState(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        degree: 'B.Tech / BE',
        passingYear: '2024 / 2025',
        careerDomain: 'IT & Software',
        preferredRole: '',
        notes: ''
    });

    // Staff Authentication
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('aayush_user') || 'null');
        } catch {
            return null;
        }
    });

    const [isStaffQuickUnlocked, setIsStaffQuickUnlocked] = useState(() => {
        return sessionStorage.getItem('aayush_staff_quick_unlocked') === 'true';
    });

    const isStaff = currentUser?.role === 'staff' || currentUser?.role === 'admin' || isStaffQuickUnlocked;

    // Staff Security PIN Gate (Master PIN: 2580)
    const STAFF_SECRET_PIN = '2580';
    const [showStaffUnlockModal, setShowStaffUnlockModal] = useState(false);
    const [staffPinInput, setStaffPinInput] = useState('');
    const [staffPinError, setStaffPinError] = useState('');

    const handleStaffUnlockSubmit = (e) => {
        e.preventDefault();
        if (staffPinInput.trim() === STAFF_SECRET_PIN) {
            sessionStorage.setItem('aayush_staff_quick_unlocked', 'true');
            setIsStaffQuickUnlocked(true);
            setShowStaffUnlockModal(false);
            setStaffPinInput('');
            setStaffPinError('');
            window.dispatchEvent(new Event('authChange'));
            window.dispatchEvent(new Event('storage'));
            showToast('Staff Access Granted: Career path editing and deletion enabled!', 'success');
        } else {
            setStaffPinError('Incorrect 4-digit PIN. Authorized faculty and staff only.');
        }
    };

    const handleStaffLock = () => {
        sessionStorage.removeItem('aayush_staff_quick_unlocked');
        setIsStaffQuickUnlocked(false);
        window.dispatchEvent(new Event('authChange'));
        window.dispatchEvent(new Event('storage'));
        showToast('Staff Mode locked.', 'info');
    };

    useEffect(() => {
        const syncAuth = () => {
            try {
                const u = JSON.parse(localStorage.getItem('aayush_user') || 'null');
                setCurrentUser(u);
            } catch {
                setCurrentUser(null);
            }
            setIsStaffQuickUnlocked(sessionStorage.getItem('aayush_staff_quick_unlocked') === 'true');
        };
        window.addEventListener('authChange', syncAuth);
        window.addEventListener('storage', syncAuth);
        return () => {
            window.removeEventListener('authChange', syncAuth);
            window.removeEventListener('storage', syncAuth);
        };
    }, []);

    // Placement Roles State backed by localStorage
    const [dbRoles, setDbRoles] = useState(() => {
        try {
            const saved = localStorage.getItem('aayush_placement_roles_custom');
            if (saved) {
                const parsed = JSON.parse(saved);
                const clean = {};
                for (const [k, list] of Object.entries(parsed)) {
                    if (Array.isArray(list)) {
                        clean[k] = list.map(r => {
                            const { icon, ...rest } = r;
                            return rest;
                        });
                    }
                }
                return { ...placementRolesData, ...clean };
            }
        } catch (e) {
            console.warn(e);
        }
        return placementRolesData;
    });

    useEffect(() => {
        const syncRoles = () => {
            try {
                const saved = localStorage.getItem('aayush_placement_roles_custom');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    const clean = {};
                    for (const [k, list] of Object.entries(parsed)) {
                        if (Array.isArray(list)) {
                            clean[k] = list.map(r => {
                                const { icon, ...rest } = r;
                                return rest;
                            });
                        }
                    }
                    setDbRoles({ ...placementRolesData, ...clean });
                }
            } catch (e) {
                console.warn(e);
            }
        };
        window.addEventListener('placementRolesUpdated', syncRoles);
        window.addEventListener('storage', syncRoles);
        return () => {
            window.removeEventListener('placementRolesUpdated', syncRoles);
            window.removeEventListener('storage', syncRoles);
        };
    }, []);

    const handleResetToDefaults = () => {
        if (window.confirm('Reset all placement roles back to original catalog defaults?')) {
            localStorage.removeItem('aayush_placement_roles_custom');
            setDbRoles(placementRolesData);
            window.dispatchEvent(new Event('placementRolesUpdated'));
            window.dispatchEvent(new Event('storage'));
            showToast('Placement roles reset to defaults.', 'info');
        }
    };

    // Toast Notification
    const [toastMsg, setToastMsg] = useState(null);
    const showToast = (text, type = 'success') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3500);
    };

    // Role Edit State & Handlers
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        category: 'it',
        subgroup: '',
        targetRole: '',
        duration: '',
        details: '',
        features: '',
        popular: false
    });

    // Role Add State & Handlers
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        category: 'it',
        subgroup: '',
        targetRole: '',
        duration: 'Full-Time / Hybrid',
        details: '',
        features: '',
        popular: false
    });

    const openEditModal = (role) => {
        let foundCat = activeCategory;
        for (const [catKey, list] of Object.entries(dbRoles)) {
            if (Array.isArray(list) && list.some(r => r.name === role.name)) {
                foundCat = catKey;
                break;
            }
        }
        setEditingRole(role);
        setEditFormData({
            name: role.name || '',
            category: foundCat,
            subgroup: role.subgroup || '',
            targetRole: role.targetRole || '',
            duration: role.duration || 'Full-Time / Hybrid',
            details: role.details || '',
            features: Array.isArray(role.features) ? role.features.join('\n') : (role.features || ''),
            popular: !!role.popular
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEditRole = (e) => {
        e.preventDefault();
        if (!editingRole || !editFormData.name.trim()) return;

        const updatedRole = {
            ...editingRole,
            name: editFormData.name.trim(),
            subgroup: editFormData.subgroup.trim() || 'Core Engineering',
            targetRole: editFormData.targetRole.trim() || editFormData.name.trim(),
            duration: editFormData.duration.trim() || 'Full-Time / Hybrid',
            details: editFormData.details.trim(),
            features: editFormData.features ? editFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
            popular: !!editFormData.popular
        };

        setDbRoles(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(r => r.name !== editingRole.name);
                }
            }
            const targetCat = editFormData.category || activeCategory || 'it';
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [updatedRole, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_placement_roles_custom', JSON.stringify(sanitizePlacementRolesForStorage(next)));
                window.dispatchEvent(new Event('placementRolesUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        // Real-time synchronization if the details modal is currently viewing this role
        if (selectedRole && (selectedRole.name === editingRole.name || selectedRole.name === updatedRole.name)) {
            setSelectedRole(updatedRole);
        }

        setIsEditModalOpen(false);
        setEditingRole(null);
        showToast(`Career Path "${updatedRole.name}" updated successfully!`, 'success');
    };

    const handleDeleteRole = (roleOrName) => {
        const roleName = typeof roleOrName === 'string' ? roleOrName : roleOrName?.name;
        if (!roleName) return;
        if (!window.confirm(`Are you sure you want to delete career path "${roleName}"?`)) return;
        setDbRoles(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(r => r.name !== roleName);
                }
            }
            try {
                localStorage.setItem('aayush_placement_roles_custom', JSON.stringify(sanitizePlacementRolesForStorage(next)));
                window.dispatchEvent(new Event('placementRolesUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });
        if (selectedRole && selectedRole.name === roleName) {
            setSelectedRole(null);
            setIsRoleModalOpen(false);
        }
        setIsEditModalOpen(false);
        setEditingRole(null);
        showToast(`Career path "${roleName}" removed from placement catalog.`, 'info');
    };

    const openAddModal = () => {
        setAddFormData({
            name: '',
            category: activeCategory || 'it',
            subgroup: 'Core Engineering',
            targetRole: '',
            duration: 'Full-Time / Hybrid',
            details: '',
            features: 'Comprehensive Technical Viva Prep\nATS Resume Keyword Optimization\nMock Interview Simulations',
            popular: false
        });
        setIsAddModalOpen(true);
    };

    const handleSaveNewRole = (e) => {
        e.preventDefault();
        if (!addFormData.name.trim()) return;

        const targetCat = addFormData.category || activeCategory || 'it';
        const newRole = {
            name: addFormData.name.trim(),
            subgroup: addFormData.subgroup.trim() || 'Core Engineering',
            targetRole: addFormData.targetRole.trim() || addFormData.name.trim(),
            duration: addFormData.duration.trim() || 'Full-Time / Hybrid',
            details: addFormData.details.trim(),
            features: addFormData.features ? addFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : ['Mock Interview Simulations', 'ATS Resume Support'],
            popular: !!addFormData.popular
        };

        setDbRoles(prev => {
            const next = { ...prev };
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [newRole, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_placement_roles_custom', JSON.stringify(sanitizePlacementRolesForStorage(next)));
                window.dispatchEvent(new Event('placementRolesUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        setActiveCategory(targetCat);
        setIsAddModalOpen(false);
        showToast(`Career Path "${newRole.name}" published to placement catalog!`, 'success');
    };

    // Real-time synchronization across tabs and sessions
    useEffect(() => {
        const syncRoles = () => {
            try {
                const saved = localStorage.getItem('aayush_placement_roles_custom');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setDbRoles(prev => ({ ...prev, ...parsed }));
                }
            } catch {}
        };
        window.addEventListener('placementRolesUpdated', syncRoles);
        window.addEventListener('storage', syncRoles);
        return () => {
            window.removeEventListener('placementRolesUpdated', syncRoles);
            window.removeEventListener('storage', syncRoles);
        };
    }, []);

    useEffect(() => {
        if (location.state?.category) {
            setActiveCategory(location.state.category);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location.state]);

    const openRoleModal = (role) => {
        setSelectedRole(role);
        setIsRoleModalOpen(true);
    };

    const closeRoleModal = () => {
        setIsRoleModalOpen(false);
        setSelectedRole(null);
    };

    const openApplyModal = (roleName = '') => {
        setFormData(prev => ({
            ...prev,
            careerDomain: activeCategoryInfo.label,
            preferredRole: roleName || activeCategoryInfo.label
        }));
        setIsApplyModalOpen(true);
        setFormSubmitted(false);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const roleOrDomain = formData.preferredRole || formData.careerDomain || activeCategoryInfo.label || "IT & Software";
            const payload = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                qualification: formData.degree,
                degree: formData.degree,
                passingYear: formData.passingYear,
                careerDomain: roleOrDomain,
                preferredRole: formData.preferredRole || roleOrDomain,
                notes: formData.notes || "",
                message: `[Placement Support Application] Candidate: ${formData.name} | Phone: ${formData.phone} | Qualification: ${formData.degree} (${formData.passingYear}) | Target Domain: ${roleOrDomain} | Goals: ${formData.notes || 'None provided'}`,
                className: `Placement Support: ${roleOrDomain}`,
                course: `Placement Support - ${roleOrDomain}`,
                program: `Placement Support (${formData.degree})`,
                inquiryType: "Placement Support",
                status: "New"
            };

            const res = await fetch("/api/inquiry/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                console.warn("Server responded with error status:", res.status);
            }

            setFormSubmitted(true);
            window.dispatchEvent(new Event("storage"));
            window.dispatchEvent(new Event("leadAdded"));

            setTimeout(() => {
                setIsApplyModalOpen(false);
                setFormSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    degree: 'B.Sc. IT / CS',
                    passingYear: 'Pursuing Final Year',
                    careerDomain: 'IT & Software',
                    preferredRole: '',
                    notes: ''
                });
            }, 2500);
        } catch (err) {
            console.error("Failed to submit placement support form:", err);
            // Still mark submitted or alert user
            setFormSubmitted(true);
            setTimeout(() => {
                setIsApplyModalOpen(false);
                setFormSubmitted(false);
            }, 2500);
        } finally {
            setIsSubmitting(false);
        }
    };

    const activeCategoryInfo = careerCategories.find(c => c.id === activeCategory) || careerCategories[0];
    const currentRoles = dbRoles[activeCategory] || [];
    const subgroups = [...new Set(currentRoles.map(c => c.subgroup).filter(Boolean))];

    const RoleCard = ({ role, index = 0 }) => {
        const theme = cardThemePalette[index % cardThemePalette.length];

        return (
            <div className={`relative bg-gradient-to-br ${theme.cardBg} rounded-2xl p-5 border-2 ${theme.border} ${theme.shadow} transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group h-full overflow-hidden`}>
                {/* Decorative ambient corner glow */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${theme.glow} opacity-20 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}></div>

                <div className="relative z-10">
                    {/* Top Row: Icon + Title + Popular badge + Staff Edit */}
                    <div className="flex items-start justify-between gap-2.5 mb-2.5">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${theme.iconGrad} text-white flex items-center justify-center flex-shrink-0 shadow-md ${theme.iconShadow} group-hover:scale-105 transition-transform duration-200`}>
                                {renderPlacementIcon(role)}
                            </div>
                            <div className="min-w-0 flex-1">
                                {role.subgroup && (
                                    <span className="text-[10px] font-bold text-[#0066ff] tracking-wide uppercase block truncate mb-0.5">
                                        {role.subgroup}
                                    </span>
                                )}
                                <h4 className={`text-[13.5px] sm:text-[14px] font-bold text-[#0a2540] ${theme.titleHover} transition-colors leading-snug line-clamp-2 ${role.subgroup ? 'min-h-[30px]' : 'min-h-[38px]'} flex items-center`}>
                                    {role.name}
                                </h4>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            {role.popular && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-semibold rounded-full flex items-center gap-1 flex-shrink-0 shadow-xs">
                                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                                    Hiring
                                </span>
                            )}
                            {isStaff && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditModal(role); }}
                                    className="px-2 py-1 bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                                    title="Edit Career Path (Staff)"
                                >
                                    <Edit3 className="w-2.5 h-2.5 text-purple-300" />
                                    <span>Staff Edit</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 font-normal text-xs leading-relaxed line-clamp-2 my-2.5">
                        {role.details}
                    </p>

                    {/* Key Competencies Quick Tags */}
                    {role.features && role.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {role.features.slice(0, 2).map((feat, fIdx) => (
                                <span key={fIdx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/80 text-slate-700 border border-slate-200/70 truncate max-w-[150px]">
                                    {feat}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom Row */}
                <div className="relative z-10 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <Briefcase className="w-3.5 h-3.5 text-[#0066ff] flex-shrink-0" />
                        <span className="truncate max-w-[130px] font-semibold text-slate-800">{role.targetRole}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto">
                        {isStaff && (
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteRole(role); }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                                title="Delete this career path"
                            >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                <span className="hidden sm:inline">Delete</span>
                            </button>
                        )}
                        <button
                            onClick={() => openRoleModal(role)}
                            aria-label={`View details for ${role.name}`}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${theme.arrowBg} flex items-center justify-center transition-all duration-200 shadow-xs group-hover:scale-110 cursor-pointer`}
                        >
                            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const RoleModal = () => {
        if (!isRoleModalOpen || !selectedRole) return null;

        return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                <div className="bg-white rounded-xl sm:rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
                    <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                {renderPlacementIcon(selectedRole)}
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">{selectedRole.name}</h3>
                                {selectedRole.subgroup && (
                                    <span className="text-[11px] font-semibold text-[#0066ff]">{selectedRole.subgroup}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isStaff && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(selectedRole)}
                                        className="px-3 py-1.5 rounded-full bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-xs font-bold shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                        title="Edit Career Path (Staff)"
                                    >
                                        <Edit3 className="w-3.5 h-3.5 text-purple-300" />
                                        <span>Staff Edit</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteRole(selectedRole)}
                                        className="px-3 py-1.5 rounded-full bg-rose-600/95 hover:bg-rose-700 text-white text-xs font-bold shadow-md border border-rose-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                        title="Delete Career Path (Staff)"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-100" />
                                        <span>Delete</span>
                                    </button>
                                </>
                            )}
                            <button
                                onClick={closeRoleModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4">
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Role Overview</h4>
                            <p className="text-slate-600 font-normal leading-relaxed text-xs sm:text-[13px]">{selectedRole.details}</p>
                        </div>

                        {selectedRole.features && (
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Competencies Tested by Employers</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {selectedRole.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/80 p-3 rounded-xl">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <Briefcase className="w-3.5 h-3.5 text-[#0066ff]" />
                                    <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-blue-900">Target Role</h5>
                                </div>
                                <p className="text-slate-800 font-bold text-xs sm:text-[12.5px]">{selectedRole.targetRole}</p>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 p-3 rounded-xl">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                    <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-emerald-900">Job Type</h5>
                                </div>
                                <p className="text-slate-800 font-bold text-xs sm:text-[12.5px]">{selectedRole.duration}</p>
                            </div>
                        </div>

                        {/* Eligibility Card */}
                        <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-200/80 p-3 rounded-xl flex items-start gap-2.5">
                            <GraduationCap className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-amber-900 mb-0.5">Eligibility</h5>
                                <p className="text-amber-950 text-xs font-medium">
                                    {activeCategoryInfo.eligibility}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                            <button
                                onClick={() => {
                                    closeRoleModal();
                                    openApplyModal(selectedRole.name);
                                }}
                                className="flex-1 bg-gradient-to-r from-[#0055ff] to-[#0044cc] hover:from-[#0044cc] hover:to-[#0033aa] text-white py-2.5 px-4 rounded-xl font-bold text-center text-xs sm:text-[13px] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span>Get Placement Support for this Role</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <a
                                href="tel:+916284063840"
                                className="sm:w-auto px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold text-xs sm:text-[13px] hover:bg-slate-50 transition-colors text-center"
                            >
                                Talk to Advisor
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* Hero Section matching Courses.jsx layout and design */}
            <div 
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center min-h-[250px] sm:min-h-[270px] lg:min-h-[290px] flex items-center"
                style={{ 
                    backgroundImage: "url('/course_hero.png')",
                    backgroundColor: '#d6ecff'
                }}
            >
                {/* Mobile overlay so text is cleanly readable on narrow screens */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/90 via-[#d6ecff]/75 to-transparent sm:from-transparent sm:via-transparent sm:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 w-full">
                    <div className="flex flex-col justify-center py-4 sm:py-5 lg:py-6 max-w-xl lg:max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-[#0055cc] text-[11px] font-bold tracking-wide mb-2 border border-blue-200/60 shadow-xs w-fit backdrop-blur-xs">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>PLACEMENT SUPPORT PROGRAMME</span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-1.5" style={{fontSize: 'clamp(20px, 2.5vw, 32px)'}}>
                            Build Skills. Prepare for Opportunities.{' '}
                            <span className="text-[#0055ff]">Start Your Career.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-2.5 font-normal">
                            Prepare for top job opportunities with professional career guidance, practical skill development, ATS resume building, and mock interviews.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Award className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">Mock Interview Drills</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <FileText className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">ATS-Optimized Resumes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Building2 className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">Employer Recruitment Drives</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                            <a
                                href="#career-catalog"
                                className="inline-flex items-center gap-2 bg-[#0055ff] hover:bg-[#0044dd] text-white font-bold text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Explore Career Opportunities</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </a>
                            <button
                                onClick={() => openApplyModal()}
                                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0055ff] border border-blue-200/80 font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                            >
                                <span>Get Placement Support</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Tabs Section */}
            <div id="career-catalog" className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
                {/* Staff Management Banner */}
                {isStaff ? (
                    <div className="mb-6 -mt-2 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-500/40 rounded-2xl p-3.5 sm:p-4 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden animate-in fade-in duration-300">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30 flex-shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xs sm:text-sm text-white">Staff Management Mode</span>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                        {currentUser?.name ? `Faculty: ${currentUser.name}` : 'Faculty: Faculty Member'}
                                    </span>
                                </div>
                                <p className="text-[11px] text-purple-200/80 leading-tight mt-0.5">
                                    All career cards have active "Edit" &amp; "Delete" buttons. You can also add and publish new placement pathways.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 relative z-10 w-full sm:w-auto justify-end flex-wrap">
                            <button
                                type="button"
                                onClick={openAddModal}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                <span>Add Career Path</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleResetToDefaults}
                                title="Reset Catalog to Defaults"
                                className="px-3 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-white text-xs font-semibold border border-purple-500/30 flex items-center gap-1 transition-all cursor-pointer"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Reset Defaults</span>
                            </button>
                            {isStaffQuickUnlocked && (
                                <button
                                    type="button"
                                    onClick={handleStaffLock}
                                    title="Lock Staff Mode"
                                    className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white text-xs font-semibold border border-rose-500/30 flex items-center gap-1 transition-all cursor-pointer"
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Lock</span>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end mb-4 -mt-2">
                        <button
                            type="button"
                            onClick={() => setShowStaffUnlockModal(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-purple-50 text-slate-600 hover:text-purple-700 text-[11px] font-semibold border border-slate-200 hover:border-purple-300 shadow-2xs transition-all cursor-pointer"
                            title="Faculty / Staff Quick Access"
                        >
                            <KeyRound className="w-3.5 h-3.5 text-purple-600" />
                            <span>Staff / Faculty Mode</span>
                        </button>
                    </div>
                )}

                {/* Floating pill menu matching Courses */}
                <div 
                    className="overflow-x-auto pb-2 mb-8 no-scrollbar -mt-5 sm:-mt-6 relative z-20"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-2 min-w-max mx-auto justify-start lg:justify-center p-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80">
                        {careerCategories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-[13px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? `bg-gradient-to-r ${cat.activeGrad} text-white shadow-md ${cat.activeShadow} scale-[1.02]`
                                            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200/80 shadow-2xs'
                                    }`}
                                >
                                    {cat.icon}
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active Category Header with Center Icon and Accent Lines */}
                <div className="text-center mb-8 sm:mb-10">
                    {/* Small Round Center Icon */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeCategoryInfo.iconGrad} text-white flex items-center justify-center mx-auto mb-2.5 shadow-md`}>
                        {activeCategoryInfo.icon}
                    </div>

                    {/* Title with decorative lines on left and right */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1.5">
                        <div className="w-8 sm:w-14 h-[2px] bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            {activeCategoryInfo.label}
                        </h2>
                        <div className="w-8 sm:w-14 h-[2px] bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-slate-600 text-xs sm:text-[13px] max-w-xl mx-auto leading-relaxed mb-3 font-normal">
                        {activeCategoryInfo.desc}
                    </p>

                    {/* Eligibility Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-[#004b93] text-[11px] sm:text-xs font-semibold shadow-2xs">
                        <GraduationCap className="w-3.5 h-3.5 text-[#0066ff]" />
                        <span>Eligibility: {activeCategoryInfo.eligibility}</span>
                    </div>
                </div>

                {/* Role Grid - All courses/roles of this page kept together in a unified continuous grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {currentRoles.map((role, idx) => (
                        <RoleCard key={idx} role={role} index={idx} />
                    ))}
                </div>

                {/* WHO CAN JOIN? SECTION */}
                <div className="mt-14 sm:mt-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 rounded-2xl p-6 sm:p-8 border-2 border-blue-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#0055ff] text-xs font-bold mb-2.5 border border-blue-200">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>WHO CAN JOIN?</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] mb-2">
                                Placement Support for Students & Job Seekers
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-4 font-normal">
                                Placement support is available for students and candidates across IT, engineering, computer applications, commerce, and technical programmes.
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-500 mr-1">Ideal for:</span>
                                {whoCanJoinIdealFor.map((label, idx) => (
                                    <span key={idx} className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                                        ✓ {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Eligible streams pills */}
                        <div className="flex-1">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">Eligible Candidate Profiles</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {whoCanJoinStreams.map((deg, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-blue-100 text-xs font-bold text-slate-800 shadow-2xs hover:border-blue-300 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0"></div>
                                        <span className="truncate">{deg}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* PLACEMENT PREPARATION (6 PILLARS) */}
                <div className="mt-12 sm:mt-14">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] text-xs font-bold mb-2 border border-blue-200">
                            <Target className="w-3.5 h-3.5" />
                            <span>PLACEMENT PREPARATION</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            Comprehensive Interview & Career Readiness
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {placementPreparationPillars.map((item, idx) => (
                            <div key={idx} className={`relative bg-gradient-to-br ${item.cardBg} rounded-2xl p-5 border-2 ${item.border} ${item.shadow} transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group overflow-hidden`}>
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.iconGrad} text-white flex items-center justify-center shadow-md ${item.iconShadow} group-hover:scale-105 transition-transform duration-200`}>
                                            {item.icon}
                                        </div>
                                        <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#0a2540] mb-1.5">{item.title}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* OUR PLACEMENT SUPPORT PROCESS (01 - 06) */}
                <div className="mt-12 sm:mt-14">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>OUR PLACEMENT SUPPORT PROCESS</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            Structured 6-Step Journey from Enrollment to Employment
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {placementProcessSteps.map((st, idx) => (
                            <div key={idx} className={`relative bg-gradient-to-br ${st.cardBg} rounded-2xl p-5 border-2 ${st.border} ${st.shadow} transition-all duration-300 hover:-translate-y-1 overflow-hidden group`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-2xl sm:text-3xl font-extrabold ${st.stepColor} tracking-tight`}>{st.step}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-slate-600 border border-slate-200/60">
                                        Step {st.step}
                                    </span>
                                </div>
                                <h4 className="text-sm font-semibold text-[#0a2540] mb-1.5">{st.title}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* WHAT YOU GET (10 ITEMS CHECKLIST) */}
                <div className="mt-12 sm:mt-14 bg-white/95 rounded-2xl p-6 sm:p-8 border-2 border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] text-xs font-bold mb-2 border border-blue-200">
                            <Award className="w-3.5 h-3.5" />
                            <span>WHAT YOU GET</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            Everything Included in Our Placement Program
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {whatYouGetItems.map((item, idx) => {
                            const iconStyles = [
                                "text-blue-600 bg-blue-50 border-blue-100",
                                "text-purple-600 bg-purple-50 border-purple-100",
                                "text-emerald-600 bg-emerald-50 border-emerald-100",
                                "text-amber-600 bg-amber-50 border-amber-100",
                                "text-cyan-600 bg-cyan-50 border-cyan-100"
                            ];
                            const curStyle = iconStyles[idx % iconStyles.length];

                            return (
                                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/70 hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5">
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border ${curStyle}`}>
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 truncate">{item}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FROM TRAINING TO CAREER WORKFLOW */}
                <div className="mt-12 sm:mt-14">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] text-xs font-bold mb-2 border border-blue-200">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>FROM TRAINING TO CAREER</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            Learn → Build Skills → Prepare → Apply → Interview → Start Your Career
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {trainingToCareerFlow.map((flow, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${flow.cardBg} rounded-2xl p-4 text-center border-2 ${flow.border} shadow-2xs hover:-translate-y-1 transition-all`}>
                                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${flow.stepGrad} text-white text-xs font-bold flex items-center justify-center mx-auto mb-2 shadow-xs`}>
                                    {flow.step}
                                </div>
                                <h5 className="text-xs font-bold text-slate-900 mb-1">{flow.label}</h5>
                                <p className="text-[11px] text-slate-600 font-normal leading-tight">{flow.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action Banner matching Courses style */}
                <div className="mt-12 sm:mt-14 bg-gradient-to-r from-[#003882] via-[#0055ff] to-[#0284c7] rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl relative overflow-hidden">
                    {/* Ambient light effects */}
                    <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-sky-400/20 blur-2xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <h3 className="text-lg sm:text-2xl font-bold mb-2 text-[#fed000]">Get Ready for Your Next Career Opportunity</h3>
                        <p className="text-white/90 mb-5 max-w-xl mx-auto text-xs sm:text-[13px] leading-relaxed font-normal">
                            Develop the skills, confidence and professional profile you need to take the next step towards employment.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="#career-catalog"
                                className="bg-white text-[#00285e] px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105"
                            >
                                Explore Career Opportunities
                            </a>
                            <button
                                onClick={() => openApplyModal()}
                                className="bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 cursor-pointer"
                            >
                                Get Placement Support
                            </button>
                            <a
                                href="tel:+916284063840"
                                className="border border-white/60 text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-white/10 transition-all backdrop-blur-xs"
                            >
                                Talk to a Career Advisor
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal 1: Role Details */}
            <RoleModal />

            {/* Modal 2: Placement Support Application */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-5 sm:p-6 relative">
                        <button
                            onClick={() => setIsApplyModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mx-auto mb-2">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#0a2540]">
                                Register for Placement Support
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                                Complete your profile to receive interview drills, resume reviews, and recruitment updates.
                            </p>
                        </div>

                        {formSubmitted ? (
                            <div className="py-8 text-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900">Registration Complete!</h4>
                                <p className="text-xs text-slate-600">
                                    Thank you! Our placement coordinator will connect with you to review your candidate profile.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone *</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91-XXXXX XXXXX"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff]"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Highest Qualification</label>
                                        <select
                                            value={formData.degree}
                                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] bg-white"
                                        >
                                            <option value="B.Tech / BE">B.Tech / BE</option>
                                            <option value="BCA">BCA</option>
                                            <option value="MCA">MCA</option>
                                            <option value="B.Sc. IT / CS">B.Sc. IT / CS</option>
                                            <option value="Polytechnic / Diploma">Polytechnic / Diploma</option>
                                            <option value="ITI">ITI</option>
                                            <option value="Graduate (Any Stream)">Graduate (Any Stream)</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Passing Year</label>
                                        <select
                                            value={formData.passingYear}
                                            onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] bg-white"
                                        >
                                            <option value="2024 / 2025">2024 / 2025</option>
                                            <option value="2023">2023</option>
                                            <option value="2022 or earlier">2022 or earlier</option>
                                            <option value="Pursuing Final Year">Pursuing Final Year</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Career Domain</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={formData.preferredRole || formData.careerDomain}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-700 font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Career Goals / Comments</label>
                                    <textarea
                                        rows="2"
                                        placeholder="Target job locations, preferred companies, specific interview help needed..."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff]"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#0066ff] hover:bg-[#0052cc] disabled:bg-blue-300 text-white font-bold text-xs sm:text-[13px] py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{isSubmitting ? "Submitting Registration..." : "Submit Registration"}</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Staff Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
                        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Edit3 className="w-4 h-4" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Edit Career Path</h3>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEditRole} className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Career Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                                    <select
                                        value={editFormData.category}
                                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 bg-white"
                                    >
                                        {careerCategories.map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Subgroup</label>
                                    <input
                                        type="text"
                                        value={editFormData.subgroup}
                                        onChange={(e) => setEditFormData({ ...editFormData, subgroup: e.target.value })}
                                        placeholder="e.g. Core Engineering"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Designated Role Profile</label>
                                    <input
                                        type="text"
                                        value={editFormData.targetRole}
                                        onChange={(e) => setEditFormData({ ...editFormData, targetRole: e.target.value })}
                                        placeholder="e.g. Junior Software Engineer / SDE-1"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Work Type</label>
                                    <input
                                        type="text"
                                        value={editFormData.duration}
                                        onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                        placeholder="e.g. Full-Time / Hybrid"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Role Description &amp; Scope *</label>
                                <textarea
                                    rows="3"
                                    required
                                    value={editFormData.details}
                                    onChange={(e) => setEditFormData({ ...editFormData, details: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Competencies &amp; Assessment Focus (1 per line)</label>
                                <textarea
                                    rows="3"
                                    value={editFormData.features}
                                    onChange={(e) => setEditFormData({ ...editFormData, features: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="editPopularRole"
                                    checked={editFormData.popular}
                                    onChange={(e) => setEditFormData({ ...editFormData, popular: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <label htmlFor="editPopularRole" className="text-xs font-medium text-slate-700">Mark as Active Hiring Hotspot</label>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (editingRole) {
                                            handleDeleteRole(editingRole.name);
                                            setIsEditModalOpen(false);
                                        }
                                    }}
                                    className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Role</span>
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Staff Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
                        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <Plus className="w-4 h-4" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Add New Career Path</h3>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveNewRole} className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Career Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Cloud & DevOps Architect"
                                    value={addFormData.name}
                                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                                    <select
                                        value={addFormData.category}
                                        onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 bg-white"
                                    >
                                        {careerCategories.map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Subgroup</label>
                                    <input
                                        type="text"
                                        value={addFormData.subgroup}
                                        onChange={(e) => setAddFormData({ ...addFormData, subgroup: e.target.value })}
                                        placeholder="e.g. Cloud Infrastructure"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Designated Role Profile</label>
                                    <input
                                        type="text"
                                        value={addFormData.targetRole}
                                        onChange={(e) => setAddFormData({ ...addFormData, targetRole: e.target.value })}
                                        placeholder="e.g. Associate DevOps Engineer"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Work Type</label>
                                    <input
                                        type="text"
                                        value={addFormData.duration}
                                        onChange={(e) => setAddFormData({ ...addFormData, duration: e.target.value })}
                                        placeholder="e.g. Full-Time / Hybrid"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Role Description &amp; Scope *</label>
                                <textarea
                                    rows="3"
                                    required
                                    placeholder="Outline the core responsibilities and industry placement requirements..."
                                    value={addFormData.details}
                                    onChange={(e) => setAddFormData({ ...addFormData, details: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Competencies &amp; Assessment Focus (1 per line)</label>
                                <textarea
                                    rows="3"
                                    value={addFormData.features}
                                    onChange={(e) => setAddFormData({ ...addFormData, features: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="addPopularRole"
                                    checked={addFormData.popular}
                                    onChange={(e) => setAddFormData({ ...addFormData, popular: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <label htmlFor="addPopularRole" className="text-xs font-medium text-slate-700">Mark as Active Hiring Hotspot</label>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                                >
                                    Publish Career Path
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Staff PIN Unlock Security Modal */}
            {showStaffUnlockModal && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative">
                        <button
                            type="button"
                            onClick={() => { setShowStaffUnlockModal(false); setStaffPinError(''); setStaffPinInput(''); }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="text-center mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
                                <KeyRound className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">Faculty &amp; Staff Access</h3>
                            <p className="text-xs text-slate-500 mt-1">Enter Master PIN to enable career pathway editing and deletion</p>
                        </div>
                        <form onSubmit={handleStaffUnlockSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    maxLength={8}
                                    placeholder="Enter 4-digit PIN (2580)"
                                    value={staffPinInput}
                                    onChange={(e) => { setStaffPinInput(e.target.value); setStaffPinError(''); }}
                                    className="w-full text-center text-lg tracking-widest font-mono font-bold px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                    autoFocus
                                />
                                {staffPinError && (
                                    <p className="text-[11px] text-red-500 mt-1.5 text-center font-medium">{staffPinError}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                            >
                                Unlock Staff Mode
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification Container */}
            {toastMsg && (
                <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
                    <div className={`px-4 py-3 rounded-xl shadow-2xl text-white text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${
                        toastMsg.type === 'error' ? 'bg-red-600' : toastMsg.type === 'info' ? 'bg-slate-800' : 'bg-emerald-600'
                    }`}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>{toastMsg.text}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Placement;
