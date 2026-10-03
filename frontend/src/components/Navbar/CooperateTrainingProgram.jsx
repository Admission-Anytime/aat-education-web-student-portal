import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Sparkles,
    BarChart3,
    Code,
    Globe,
    Briefcase,
    GraduationCap,
    Award,
    CheckCircle2,
    Building2,
    Users,
    Clock,
    ArrowRight,
    Phone,
    Mail,
    Star,
    X,
    FileSpreadsheet,
    ShieldCheck,
    Laptop,
    Compass,
    Send,
    Layers,
    Cpu,
    Database,
    LineChart,
    Search,
    Share2,
    Lock,
    FolderKanban,
    MessageSquare,
    Edit3,
    Plus,
    Trash2,
    BookOpen,
    RefreshCw,
    KeyRound
} from 'lucide-react';

// Safe dynamic icon resolver for corporate courses
const renderCorporateIcon = (course, customClass = "w-5 h-5") => {
    if (!course) return <Sparkles className={customClass} />;
    if (React.isValidElement(course.icon)) return course.icon;
    if (typeof course.icon === 'function') {
        const IconComp = course.icon;
        return <IconComp className={customClass} />;
    }
    const name = (course.name || '').toLowerCase();
    if (name.includes('ai') || name.includes('generative') || name.includes('gpt') || name.includes('copilot') || name.includes('intelligence')) return <Sparkles className={customClass} />;
    if (name.includes('excel') || name.includes('data') || name.includes('power bi') || name.includes('analytics') || name.includes('chart')) return <BarChart3 className={customClass} />;
    if (name.includes('code') || name.includes('software') || name.includes('web') || name.includes('full stack') || name.includes('python') || name.includes('developer')) return <Code className={customClass} />;
    if (name.includes('digital') || name.includes('marketing') || name.includes('seo') || name.includes('business')) return <Globe className={customClass} />;
    if (name.includes('productivity') || name.includes('workplace') || name.includes('professional') || name.includes('leadership')) return <Briefcase className={customClass} />;
    return <Sparkles className={customClass} />;
};

const sanitizeCorporateCoursesForStorage = (data) => {
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

const corporateCategories = [
    {
        id: 'ai',
        label: 'AI & Generative AI',
        icon: <Sparkles className="w-4 h-4" />,
        desc: 'Enable your teams to understand and effectively apply AI in everyday professional and business workflows.',
        suitableFor: 'Management, HR, Sales, Marketing, Finance, Operations, IT and Business Teams',
        activeGrad: 'from-blue-600 via-indigo-600 to-cyan-500',
        activeShadow: 'shadow-blue-500/30'
    },
    {
        id: 'excel',
        label: 'Advanced Excel & Data Analytics',
        icon: <BarChart3 className="w-4 h-4" />,
        desc: 'Develop practical capabilities in data management, analysis, reporting and business intelligence.',
        suitableFor: 'Finance, HR, Sales, Operations, MIS, Administration, Management and Business Teams',
        activeGrad: 'from-purple-600 via-violet-600 to-pink-500',
        activeShadow: 'shadow-purple-500/30'
    },
    {
        id: 'software',
        label: 'IT & Software Training',
        icon: <Code className="w-4 h-4" />,
        desc: 'Develop technical capabilities aligned with modern software development environments.',
        suitableFor: 'Software Developers, IT Teams, Technical Leads, System Engineers, and Aspiring Programmers',
        activeGrad: 'from-emerald-600 via-teal-600 to-cyan-500',
        activeShadow: 'shadow-emerald-500/30'
    },
    {
        id: 'digital',
        label: 'Digital Business Skills',
        icon: <Globe className="w-4 h-4" />,
        desc: 'Build capabilities across digital marketing, online business and customer engagement.',
        suitableFor: 'Marketing, Growth, Sales, E-Commerce, Product & Brand Teams',
        activeGrad: 'from-amber-500 via-orange-500 to-yellow-400',
        activeShadow: 'shadow-amber-500/30'
    },
    {
        id: 'productivity',
        label: 'Professional & Productivity Skills',
        icon: <Briefcase className="w-4 h-4" />,
        desc: 'Strengthen everyday workplace productivity and business operations.',
        suitableFor: 'Corporate Staff, Administration, Operations, Support, and Executive Teams',
        activeGrad: 'from-rose-600 via-pink-600 to-purple-500',
        activeShadow: 'shadow-rose-500/30'
    }
];

const corporateCourses = {
    ai: [
        {
            name: "Artificial Intelligence & Generative AI",
            popular: true,
            icon: <Sparkles className="w-5 h-5" />,
            details: "Comprehensive introduction to core AI principles, Large Language Models (LLMs), transformer architecture, and practical enterprise workflows.",
            features: ["Core AI & Machine Learning Concepts", "Large Language Models (LLMs) & GPTs", "Enterprise Workflow Modernization", "Generative vs Predictive AI Systems"],
            duration: "2–4 Weeks (Custom)",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Generative AI for Business",
            popular: true,
            icon: <Cpu className="w-5 h-5" />,
            details: "Practical adoption of GenAI tools to automate organizational processes, enhance customer service touchpoints, and improve business decision-making.",
            features: ["Strategic AI Opportunity Mapping", "Process Automation with AI", "Tool Evaluation & Enterprise Rollout", "Measuring AI ROI & Business Impact"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "AI Tools & Workplace Productivity",
            icon: <Laptop className="w-5 h-5" />,
            details: "Hands-on mastery of modern generative tools including ChatGPT, Claude, Microsoft 365 Copilot, and Midjourney to accelerate daily work output.",
            features: ["ChatGPT & Claude Pro Workflows", "Microsoft 365 Copilot in Word/Excel", "Document Summarization & Drafting", "Meeting Notes & Task Automation"],
            duration: "1–2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Prompt Engineering & AI Applications",
            icon: <Code className="w-5 h-5" />,
            details: "Master advanced prompt architecture, few-shot prompting, system role engineering, output formatting (JSON/tables), and chain-of-thought logic.",
            features: ["System Instructions & Persona Setup", "Few-Shot & Multi-Turn Prompts", "Structured Output Formatting", "Chain-of-Thought & Reasoning"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "AI for Data Analysis",
            popular: true,
            icon: <LineChart className="w-5 h-5" />,
            details: "Leverage AI assistants and Code Interpreter models to query datasets in plain English, cleanse data, extract hidden trends, and automate visual graphs.",
            features: ["Natural Language Data Querying", "Automated Data Cleaning & Prep", "Trend Extraction & Anomaly Detection", "Instant Visual Chart Generation"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "AI for Digital Marketing",
            icon: <Globe className="w-5 h-5" />,
            details: "Supercharge marketing campaigns with AI-driven ad copy, high-converting angles, image asset generation, customer segmentation, and journey mapping.",
            features: ["High-Converting AI Copywriting", "Multi-Variation Ad Creative Generation", "Audience Persona Segmentation", "Campaign Optimization Strategies"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "AI-Powered Business Automation",
            icon: <Layers className="w-5 h-5" />,
            details: "Connect AI capabilities with Zapier, Make, and internal systems to automate repetitive cross-department workflows, data entry, and team notifications.",
            features: ["No-Code Automation with Zapier/Make", "AI Webhooks & Trigger Logic", "Email Parsing & Ticket Routing", "Cross-Department Synchronization"],
            duration: "3–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Responsible AI Practices",
            icon: <ShieldCheck className="w-5 h-5" />,
            details: "Enterprise AI governance, corporate data privacy safeguards, compliance protocols, IP protection, and mitigating hallucinations and bias.",
            features: ["Data Privacy & Enterprise Security", "Intellectual Property Safeguards", "Bias Mitigation & Hallucination Audits", "Responsible Deployment Frameworks"],
            duration: "1–2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        }
    ],

    excel: [
        {
            name: "Advanced Excel",
            popular: true,
            icon: <FileSpreadsheet className="w-5 h-5" />,
            details: "Master enterprise spreadsheet operations, dynamic formula calculations, cross-sheet data linking, validation rules, and error auditing techniques.",
            features: ["Data Validation & Custom Rules", "Formula Auditing & Trace Precedents", "Advanced Conditional Formatting", "Multi-Workbook Data Linking"],
            duration: "2–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Excel Formulas & Functions",
            popular: true,
            icon: <BarChart3 className="w-5 h-5" />,
            details: "Deep dive into enterprise lookup and array formulas: XLOOKUP, INDEX/MATCH, dynamic arrays (FILTER, UNIQUE, SORT), and complex nested logic.",
            features: ["XLOOKUP & Modern Formula Suite", "Dynamic Array Functions (FILTER, UNIQUE)", "Nested IF, IFS, AND/OR Logical Stacks", "Date, Time & Financial Formulas"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Data Cleaning & Data Management",
            icon: <Database className="w-5 h-5" />,
            details: "Transform and standardize inconsistent corporate data: de-duplication, delimiter splitting, blank handling, text trims, and structured Excel tables.",
            features: ["De-duplication & Hygiene Standards", "Text-to-Columns & Delimiters", "Fixing Dirty Dates & Inconsistent Formats", "Structured Table Nomenclature"],
            duration: "1–2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Pivot Tables & Pivot Charts",
            popular: true,
            icon: <LineChart className="w-5 h-5" />,
            details: "Summarize thousands of operational records in seconds: calculated fields, date groupings, interactive slicers, timelines, and dynamic visual charts.",
            features: ["Pivot Table Architecture & Layouts", "Calculated Items & Value Settings", "Interactive Timeline & Slicer Controls", "Dynamic Pivot Visualizations"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Excel Dashboards",
            popular: true,
            icon: <BarChart3 className="w-5 h-5" />,
            details: "Build executive-grade interactive business dashboards with KPI cards, dynamic chart switchers, drill-down interactions, and professional aesthetics.",
            features: ["Executive KPI Cards & Metrics", "Interactive Slicer-Connected Visuals", "Dynamic Chart Series Switchers", "Corporate Aesthetic Design Rules"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Data Analysis & Reporting",
            icon: <FileSpreadsheet className="w-5 h-5" />,
            details: "Statistical analysis, budget vs. actual variance reporting, automated monthly MIS preparation, what-if sensitivity modeling, and forecasting.",
            features: ["Automated Monthly MIS Packs", "Variance & Financial Budget Tracking", "What-If Analysis & Goal Seek", "Linear Trend Forecasting"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Excel Automation & Productivity",
            icon: <Laptop className="w-5 h-5" />,
            details: "Eliminate repetitive manual spreadsheet tasks through recorded Excel Macros, custom keyboard shortcuts, and structured VBA automation routines.",
            features: ["Macro Recording Best Practices", "VBA Syntax & Module Fundamentals", "One-Click Automated Workflows", "Custom Ribbon & Button Triggers"],
            duration: "2–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Power Query",
            popular: true,
            icon: <Layers className="w-5 h-5" />,
            details: "Extract, Transform, and Load (ETL) corporate data from multiple files and folders into automated self-refreshing analytical pipelines.",
            features: ["Multi-File & Folder Consolidation", "Data Cleaning without Formulas", "Automated Daily Scheduled Refresh", "Merging & Appending Datasets"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Power BI & Data Visualization",
            popular: true,
            icon: <BarChart3 className="w-5 h-5" />,
            details: "End-to-end business intelligence: Star schema data modeling, DAX measures and calculated columns, interactive reports, and cloud dashboard sharing.",
            features: ["Data Modeling & Relationships", "Essential DAX Measures & Time Intelligence", "Interactive Visual Reports", "Power BI Service & Sharing"],
            duration: "3–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        }
    ],

    software: [
        {
            name: "Python Programming",
            popular: true,
            icon: <Code className="w-5 h-5" />,
            details: "Enterprise Python from foundational syntax to object-oriented programming (OOP), file automation, libraries, and RESTful API consumption.",
            features: ["Python Syntax & Object-Oriented Design", "Standard Libraries & Utilities", "API Requests & JSON Parsing", "Automated Scripting & Testing"],
            duration: "4–6 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Web Development",
            icon: <Globe className="w-5 h-5" />,
            details: "Modern frontend and responsive web standards: semantic HTML5, modern CSS3 layouts, ES6+ JavaScript, DOM events, and cross-browser quality.",
            features: ["Modern Responsive Layouts", "JavaScript ES6+ Language Core", "Cross-Browser Compatibility", "Web Performance Standards"],
            duration: "4–6 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "MERN Stack Development",
            popular: true,
            icon: <Layers className="w-5 h-5" />,
            details: "Full stack web application development covering MongoDB database modeling, Express.js REST APIs, React single-page apps, and Node.js servers.",
            features: ["MongoDB Schema & Aggregation", "Express & Node RESTful Services", "React State & Component Lifecycle", "Full Stack Production Architecture"],
            duration: "6–8 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Java Programming",
            icon: <Cpu className="w-5 h-5" />,
            details: "Enterprise software development using Core Java, OOP design patterns, collections framework, exception handling, multithreading, and JDBC.",
            features: ["Core Java & OOP Architecture", "Java Collections & Generics", "Exception Handling & Multithreading", "Database Connectivity (JDBC)"],
            duration: "4–6 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "React JS Development",
            popular: true,
            icon: <Code className="w-5 h-5" />,
            details: "Component architecture, React Hooks (useState, useEffect, useMemo), state management solutions, client-side routing, and clean API integration.",
            features: ["Modern Functional Hooks", "State Management Patterns", "REST API Data Fetching", "Reusable UI Component Systems"],
            duration: "3–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Node.js Development",
            icon: <Database className="w-5 h-5" />,
            details: "Scalable backend development using Node.js and Express: asynchronous event loops, JSON Web Token (JWT) authentication, and database connections.",
            features: ["Async Event Loop & Streams", "JWT Authentication & Security", "Middleware Architecture", "SQL & NoSQL Database Operations"],
            duration: "3–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Software Development Fundamentals",
            icon: <FolderKanban className="w-5 h-5" />,
            details: "Engineering best practices: Git version control, branching models, Agile/Scrum workflows, code review etiquette, and CI/CD basics.",
            features: ["Git & GitHub Team Workflows", "Agile & Sprint Ceremonies", "Clean Code & Code Reviews", "Testing & Debugging Foundations"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        }
    ],

    digital: [
        {
            name: "Digital Marketing",
            popular: true,
            icon: <Globe className="w-5 h-5" />,
            details: "Strategic digital marketing foundation covering customer acquisition funnels, multichannel campaigns, conversion optimization, and analytics.",
            features: ["Full-Funnel Digital Strategy", "Channel Attribution & ROI", "Customer Journey Mapping", "Conversion Rate Optimization (CRO)"],
            duration: "3–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "SEO – Search Engine Optimization",
            icon: <Search className="w-5 h-5" />,
            details: "Drive organic business rankings: keyword research, on-page optimization, content architecture, technical audits, and Search Console metrics.",
            features: ["Commercial Keyword Research", "On-Page & Meta Tag Optimization", "Technical SEO & Core Web Vitals", "Google Search Console Monitoring"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Google Ads & PPC",
            popular: true,
            icon: <LineChart className="w-5 h-5" />,
            details: "Paid search and display advertising: campaign structure, smart bidding strategies, keyword match types, negative keywords, and ROAS tracking.",
            features: ["Search & Display Campaign Setup", "Quality Score Optimization", "Smart Bidding & Budget Management", "Conversion Tracking & Attribution"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Social Media Marketing",
            icon: <Share2 className="w-5 h-5" />,
            details: "B2B and B2C brand building across LinkedIn, Meta, and YouTube: organic content calendars, paid audience targeting, and community management.",
            features: ["B2B LinkedIn Lead Generation", "Meta Ads & Lookalike Audiences", "Organic Calendar Planning", "Performance Reporting Metrics"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Content Marketing",
            icon: <MessageSquare className="w-5 h-5" />,
            details: "Storytelling and content assets that convert: corporate blogs, customer case studies, lead magnets, email newsletters, and editorial calendars.",
            features: ["Content Strategy Frameworks", "High-Converting Case Studies", "Email Newsletter Sequences", "Editorial Pipeline Governance"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "E-Commerce & Digital Business",
            icon: <Briefcase className="w-5 h-5" />,
            details: "Online store operations, payment gateway setup, product catalog optimization, inventory handling, and customer retention strategies.",
            features: ["Store Setup & Catalog Strategy", "Payment Gateways & Security", "Cart Abandonment Recovery", "Customer Lifetime Value Growth"],
            duration: "3–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Marketing Analytics",
            icon: <BarChart3 className="w-5 h-5" />,
            details: "Google Analytics 4 (GA4) measurement: event setup, conversion funnels, custom exploration reports, and marketing spend efficiency.",
            features: ["GA4 Configuration & Event Tracking", "Attribution & Channel Analysis", "Customer Acquisition Cost (CAC)", "Executive Marketing Dashboards"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "AI for Digital Marketing",
            popular: true,
            icon: <Sparkles className="w-5 h-5" />,
            details: "Practical AI applications: automated ad copy variation testing, automated email drafting, visual creative generation, and predictive analytics.",
            features: ["AI Copywriting & Angles", "Automated Visual Ad Generation", "Email Campaign Personalization", "Predictive Campaign Insights"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        }
    ],

    productivity: [
        {
            name: "MS Office",
            popular: true,
            icon: <Laptop className="w-5 h-5" />,
            details: "Master the standard corporate productivity suite: professional Word documents, Excel calculations, and persuasive PowerPoint presentations.",
            features: ["Executive Word Documentation", "Essential Excel Calculations", "High-Impact PowerPoint Decks", "Corporate Template Standards"],
            duration: "2–3 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Tally & Computerized Accounting",
            popular: true,
            icon: <FileSpreadsheet className="w-5 h-5" />,
            details: "Enterprise accounting and compliance: company creation, ledger vouchers, GST invoicing, bank reconciliation, and balance sheet preparation.",
            features: ["Tally Prime Navigation", "Ledger & Voucher Entry", "GST Invoicing & Returns", "Balance Sheet & P&L Reporting"],
            duration: "3–4 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Business Data & Reporting",
            icon: <BarChart3 className="w-5 h-5" />,
            details: "Turn daily operational metrics into clean, structured management reports, executive summaries, project trackers, and status updates.",
            features: ["Structured Data Tracking", "Executive MIS Reporting", "Visual Chart Summaries", "Data Accuracy Auditing"],
            duration: "2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Digital Workplace Skills",
            icon: <Globe className="w-5 h-5" />,
            details: "Modern collaborative cloud platforms: Google Workspace, Microsoft 365, Teams, Slack, cloud storage sharing, and remote work protocols.",
            features: ["Cloud Document Collaboration", "MS Teams & Slack Communication", "Calendar & Task Scheduling", "Digital File Organization"],
            duration: "1–2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Professional Email & Business Communication",
            popular: true,
            icon: <Mail className="w-5 h-5" />,
            details: "Business communication etiquette: structured email writing, proposal drafting, stakeholder alignment, meeting minutes, and professional tone.",
            features: ["Professional Email Structure", "Proposal & Brief Writing", "Cross-Functional Alignment", "Workplace Etiquette Standards"],
            duration: "1–2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Cyber Security Awareness",
            icon: <Lock className="w-5 h-5" />,
            details: "Protect corporate assets: identifying phishing attacks, credential hygiene, safe data handling, safe browsing, and incident reporting.",
            features: ["Phishing & Social Engineering", "Password & 2FA Hygiene", "Sensitive Data Handling", "Incident Response Protocols"],
            duration: "1 Week",
            delivery: "On-Site / Online / Hybrid"
        },
        {
            name: "Workplace Productivity Tools",
            icon: <FolderKanban className="w-5 h-5" />,
            details: "Project management and task management systems: Notion, Trello, Asana, structured time blocking, and meeting optimization frameworks.",
            features: ["Kanban & Project Boards", "Time Management Systems", "Task Prioritization Frameworks", "Meeting Optimization Tools"],
            duration: "1–2 Weeks",
            delivery: "On-Site / Online / Hybrid"
        }
    ]
};

const corporateSolutions = [
    {
        title: "Customized Corporate Training",
        desc: "Training programmes designed around your organization’s specific objectives, workflows, tools and employee requirements.",
        icon: <Building2 className="w-5 h-5 text-[#0066ff]" />
    },
    {
        title: "AI & Digital Transformation Training",
        desc: "Practical training to help teams understand emerging technologies and apply relevant digital tools within their professional workflows.",
        icon: <Sparkles className="w-5 h-5 text-[#9333ea]" />
    },
    {
        title: "Advanced Excel & Data Training",
        desc: "Role-based training focused on data management, analysis, reporting, dashboards and business intelligence.",
        icon: <BarChart3 className="w-5 h-5 text-[#059669]" />
    },
    {
        title: "Employee Skill Development",
        desc: "Structured learning programmes designed to strengthen technical, digital and professional capabilities across your workforce.",
        icon: <GraduationCap className="w-5 h-5 text-[#ea580c]" />
    },
    {
        title: "Industry-Specific Training",
        desc: "Customized programmes aligned with the operational requirements, technology environment and skill needs of your industry.",
        icon: <Compass className="w-5 h-5 text-[#0284c7]" />
    },
    {
        title: "On-Site Training",
        desc: "Instructor-led training delivered at your office or preferred organizational location.",
        icon: <Building2 className="w-5 h-5 text-[#d97706]" />
    },
    {
        title: "Online Training",
        desc: "Live instructor-led programmes delivered online for distributed teams and remote employees.",
        icon: <Laptop className="w-5 h-5 text-[#0066ff]" />
    },
    {
        title: "Hybrid Training",
        desc: "A combination of online and on-site learning designed to meet the needs of geographically distributed teams.",
        icon: <Layers className="w-5 h-5 text-[#4f46e5]" />
    },
    {
        title: "Upskilling & Reskilling",
        desc: "Programmes that help employees develop new capabilities or strengthen existing skills in response to changing business and technology requirements.",
        icon: <Award className="w-5 h-5 text-[#db2777]" />
    }
];

const deliveryOptions = [
    "On-Site Training",
    "Online Training",
    "Hybrid Training",
    "Customized Workshops",
    "Team-Based Training"
];

const targetDepartments = [
    "IT & Technology",
    "Finance",
    "HR",
    "Sales",
    "Marketing",
    "Operations",
    "MIS",
    "Administration",
    "Management"
];

const whyChooseUsPoints = [
    { text: "Training aligned with organizational objectives", grad: "from-blue-600 to-indigo-600", bg: "from-blue-50/90 via-white to-blue-50/40", border: "border-blue-200" },
    { text: "Practical, application-focused learning", grad: "from-purple-600 to-pink-600", bg: "from-purple-50/90 via-white to-purple-50/40", border: "border-purple-200" },
    { text: "Customized course content and duration", grad: "from-emerald-600 to-teal-600", bg: "from-emerald-50/90 via-white to-emerald-50/40", border: "border-emerald-200" },
    { text: "Role-based and team-specific programmes", grad: "from-amber-500 to-orange-500", bg: "from-amber-50/90 via-white to-amber-50/40", border: "border-amber-200" },
    { text: "Flexible on-site, online and hybrid delivery", grad: "from-cyan-600 to-blue-600", bg: "from-cyan-50/90 via-white to-cyan-50/40", border: "border-cyan-200" },
    { text: "Training across AI, data, tech and business", grad: "from-rose-600 to-pink-600", bg: "from-rose-50/90 via-white to-rose-50/40", border: "border-rose-200" },
    { text: "Experienced senior industry instructors", grad: "from-indigo-600 to-violet-600", bg: "from-indigo-50/90 via-white to-indigo-50/40", border: "border-indigo-200" },
    { text: "Scalable for teams, departments and enterprises", grad: "from-teal-600 to-emerald-600", bg: "from-teal-50/90 via-white to-teal-50/40", border: "border-teal-200" }
];

const solutionThemes = [
    {
        bg: "from-blue-100/90 via-blue-50/70 to-indigo-50/50",
        border: "border-2 border-blue-200 hover:border-blue-500",
        iconGrad: "from-blue-600 to-indigo-600",
        iconShadow: "shadow-blue-500/35",
        titleColor: "text-blue-950 group-hover:text-blue-700"
    },
    {
        bg: "from-purple-100/90 via-purple-50/70 to-fuchsia-50/50",
        border: "border-2 border-purple-200 hover:border-purple-500",
        iconGrad: "from-purple-600 to-pink-600",
        iconShadow: "shadow-purple-500/35",
        titleColor: "text-purple-950 group-hover:text-purple-700"
    },
    {
        bg: "from-emerald-100/90 via-emerald-50/70 to-teal-50/50",
        border: "border-2 border-emerald-200 hover:border-emerald-500",
        iconGrad: "from-emerald-600 to-teal-600",
        iconShadow: "shadow-emerald-500/35",
        titleColor: "text-emerald-950 group-hover:text-emerald-700"
    },
    {
        bg: "from-amber-100/90 via-amber-50/70 to-orange-50/50",
        border: "border-2 border-amber-200 hover:border-amber-500",
        iconGrad: "from-amber-500 to-orange-600",
        iconShadow: "shadow-amber-500/35",
        titleColor: "text-amber-950 group-hover:text-amber-700"
    },
    {
        bg: "from-cyan-100/90 via-cyan-50/70 to-sky-50/50",
        border: "border-2 border-cyan-200 hover:border-cyan-500",
        iconGrad: "from-cyan-600 to-sky-700",
        iconShadow: "shadow-cyan-500/35",
        titleColor: "text-cyan-950 group-hover:text-cyan-700"
    },
    {
        bg: "from-rose-100/90 via-rose-50/70 to-pink-50/50",
        border: "border-2 border-rose-200 hover:border-rose-500",
        iconGrad: "from-rose-600 to-pink-600",
        iconShadow: "shadow-rose-500/35",
        titleColor: "text-rose-950 group-hover:text-rose-700"
    },
    {
        bg: "from-indigo-100/90 via-indigo-50/70 to-blue-50/50",
        border: "border-2 border-indigo-200 hover:border-indigo-500",
        iconGrad: "from-indigo-600 to-blue-700",
        iconShadow: "shadow-indigo-500/35",
        titleColor: "text-indigo-950 group-hover:text-indigo-700"
    },
    {
        bg: "from-teal-100/90 via-teal-50/70 to-emerald-50/50",
        border: "border-2 border-teal-200 hover:border-teal-500",
        iconGrad: "from-teal-600 to-emerald-700",
        iconShadow: "shadow-teal-500/35",
        titleColor: "text-teal-950 group-hover:text-teal-700"
    },
    {
        bg: "from-fuchsia-100/90 via-pink-50/70 to-rose-50/50",
        border: "border-2 border-fuchsia-200 hover:border-fuchsia-500",
        iconGrad: "from-fuchsia-600 to-rose-600",
        iconShadow: "shadow-fuchsia-500/35",
        titleColor: "text-fuchsia-950 group-hover:text-fuchsia-700"
    }
];

const cardThemePalette = [
    {
        cardBg: "from-blue-100/90 via-blue-50/70 to-indigo-50/50",
        border: "border-2 border-blue-200 hover:border-blue-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(37,99,235,0.18)]",
        iconGrad: "from-blue-600 to-indigo-600",
        iconShadow: "shadow-blue-500/35",
        badgeBg: "bg-blue-600 text-white shadow-xs shadow-blue-500/30",
        pillBg: "bg-blue-900/70 border-blue-400/30 text-blue-100",
        titleHover: "group-hover:text-blue-600",
        btnGrad: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25",
        accentText: "text-blue-700",
        glow: "from-blue-500 to-cyan-400"
    },
    {
        cardBg: "from-purple-100/90 via-purple-50/70 to-fuchsia-50/50",
        border: "border-2 border-purple-200 hover:border-purple-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]",
        iconGrad: "from-purple-600 to-violet-600",
        iconShadow: "shadow-purple-500/35",
        badgeBg: "bg-purple-600 text-white shadow-xs shadow-purple-500/30",
        pillBg: "bg-purple-900/70 border-purple-400/30 text-purple-100",
        titleHover: "group-hover:text-purple-600",
        btnGrad: "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-md shadow-purple-500/25",
        accentText: "text-purple-700",
        glow: "from-purple-500 to-fuchsia-400"
    },
    {
        cardBg: "from-emerald-100/90 via-emerald-50/70 to-teal-50/50",
        border: "border-2 border-emerald-200 hover:border-emerald-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]",
        iconGrad: "from-emerald-600 to-teal-600",
        iconShadow: "shadow-emerald-500/35",
        badgeBg: "bg-emerald-600 text-white shadow-xs shadow-emerald-500/30",
        pillBg: "bg-emerald-900/70 border-emerald-400/30 text-emerald-100",
        titleHover: "group-hover:text-emerald-600",
        btnGrad: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/25",
        accentText: "text-emerald-700",
        glow: "from-emerald-500 to-teal-400"
    },
    {
        cardBg: "from-amber-100/90 via-amber-50/70 to-orange-50/50",
        border: "border-2 border-amber-200 hover:border-amber-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]",
        iconGrad: "from-amber-500 to-orange-600",
        iconShadow: "shadow-amber-500/35",
        badgeBg: "bg-amber-600 text-white shadow-xs shadow-amber-500/30",
        pillBg: "bg-amber-950/70 border-amber-400/30 text-amber-100",
        titleHover: "group-hover:text-amber-600",
        btnGrad: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-amber-500/25",
        accentText: "text-amber-800",
        glow: "from-amber-500 to-orange-400"
    },
    {
        cardBg: "from-cyan-100/90 via-cyan-50/70 to-sky-50/50",
        border: "border-2 border-cyan-200 hover:border-cyan-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(6,182,212,0.18)]",
        iconGrad: "from-cyan-600 to-sky-700",
        iconShadow: "shadow-cyan-500/35",
        badgeBg: "bg-cyan-600 text-white shadow-xs shadow-cyan-500/30",
        pillBg: "bg-cyan-950/70 border-cyan-400/30 text-cyan-100",
        titleHover: "group-hover:text-cyan-600",
        btnGrad: "bg-gradient-to-r from-cyan-600 to-sky-700 hover:from-cyan-700 hover:to-sky-800 text-white shadow-md shadow-cyan-500/25",
        accentText: "text-cyan-800",
        glow: "from-cyan-500 to-sky-400"
    },
    {
        cardBg: "from-rose-100/90 via-rose-50/70 to-pink-50/50",
        border: "border-2 border-rose-200 hover:border-rose-500",
        shadow: "hover:shadow-[0_16px_36px_rgba(244,63,94,0.18)]",
        iconGrad: "from-rose-600 to-pink-600",
        iconShadow: "shadow-rose-500/35",
        badgeBg: "bg-rose-600 text-white shadow-xs shadow-rose-500/30",
        pillBg: "bg-rose-950/70 border-rose-400/30 text-rose-100",
        titleHover: "group-hover:text-rose-600",
        btnGrad: "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-md shadow-rose-500/25",
        accentText: "text-rose-700",
        glow: "from-rose-500 to-pink-400"
    }
];

const CooperateTrainingProgram = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(location.state?.category || 'ai');

    useEffect(() => {
        if (location.state?.category) {
            setActiveCategory(location.state.category);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location.state]);

    // Staff Authentication & Mode Detection
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
            showToast('Staff Access Granted: Corporate program editing and deletion enabled!', 'success');
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

    // Dynamic Corporate Courses State backed by MongoDB & real-time sync
    const [dbCourses, setDbCourses] = useState(corporateCourses);

    // Fetch live corporate courses from MongoDB
    const fetchMongoCorporateCourses = async () => {
        try {
            const res = await fetch('/api/courses?programType=corporate');
            if (!res.ok) return;
            const mongoList = await res.json();
            if (Array.isArray(mongoList) && mongoList.length > 0) {
                // Group by categoryId and sort strictly by order ascending (#1 at top)
                const grouped = {};
                mongoList.forEach(item => {
                    const cat = item.categoryId || 'ai';
                    if (!grouped[cat]) grouped[cat] = [];
                    grouped[cat].push({
                        ...item,
                        name: item.name || item.title,
                        details: item.details || item.description,
                        order: typeof item.order === 'number' ? item.order : 99,
                    });
                });

                // Sort each category by order ascending
                for (const cat in grouped) {
                    grouped[cat].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
                }

                setDbCourses(prev => ({ ...prev, ...grouped }));
            }
        } catch (err) {
            console.warn('MongoDB corporate fetch note:', err);
        }
    };

    useEffect(() => {
        fetchMongoCorporateCourses();
        const interval = setInterval(fetchMongoCorporateCourses, 4000);

        const syncCourses = () => {
            fetchMongoCorporateCourses();
        };
        window.addEventListener('corporateCoursesUpdated', syncCourses);
        window.addEventListener('storage', syncCourses);
        return () => {
            clearInterval(interval);
            window.removeEventListener('corporateCoursesUpdated', syncCourses);
            window.removeEventListener('storage', syncCourses);
        };
    }, []);

    const handleResetToDefaults = () => {
        if (window.confirm('Reset all corporate training programs back to original catalog defaults?')) {
            localStorage.removeItem('aayush_corporate_courses_custom');
            setDbCourses(corporateCourses);
            window.dispatchEvent(new Event('corporateCoursesUpdated'));
            window.dispatchEvent(new Event('storage'));
            showToast('Corporate training catalog reset to defaults.', 'info');
        }
    };

    // Toast Notification
    const [toastMsg, setToastMsg] = useState(null);
    const showToast = (text, type = 'success') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3500);
    };

    // Course Edit State & Handlers
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        category: 'ai',
        duration: '',
        delivery: '',
        details: '',
        features: '',
        popular: false
    });

    // Course Add State & Handlers
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        category: 'ai',
        duration: '2–4 Weeks (Custom)',
        delivery: 'On-Site / Online / Hybrid',
        details: '',
        features: '',
        popular: false
    });

    const openEditModal = (course) => {
        let foundCat = activeCategory;
        for (const [catKey, list] of Object.entries(dbCourses)) {
            if (Array.isArray(list) && list.some(c => c.name === course.name)) {
                foundCat = catKey;
                break;
            }
        }
        setEditingCourse(course);
        setEditFormData({
            name: course.name || '',
            category: foundCat,
            duration: course.duration || '2–4 Weeks (Custom)',
            delivery: course.delivery || 'On-Site / Online / Hybrid',
            details: course.details || '',
            features: Array.isArray(course.features) ? course.features.join('\n') : (course.features || ''),
            popular: !!course.popular
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEditCourse = (e) => {
        e.preventDefault();
        if (!editingCourse || !editFormData.name.trim()) return;

        const updatedCourse = {
            ...editingCourse,
            name: editFormData.name.trim(),
            duration: editFormData.duration.trim() || '2–4 Weeks (Custom)',
            delivery: editFormData.delivery.trim() || 'On-Site / Online / Hybrid',
            details: editFormData.details.trim(),
            features: editFormData.features ? editFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
            popular: !!editFormData.popular
        };

        setDbCourses(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(c => c.name !== editingCourse.name);
                }
            }
            const targetCat = editFormData.category || activeCategory || 'ai';
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [updatedCourse, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_corporate_courses_custom', JSON.stringify(sanitizeCorporateCoursesForStorage(next)));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        if (selectedCourse && selectedCourse.name === editingCourse.name) {
            setSelectedCourse(updatedCourse);
        }

        setIsEditModalOpen(false);
        setEditingCourse(null);
        showToast(`Corporate Program "${updatedCourse.name}" updated successfully!`, 'success');
    };

    const handleDeleteCourse = (courseOrName) => {
        const courseName = typeof courseOrName === 'string' ? courseOrName : courseOrName?.name;
        if (!courseName) return;
        if (!window.confirm(`Are you sure you want to delete corporate program "${courseName}"?`)) return;
        setDbCourses(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(c => c.name !== courseName);
                }
            }
            try {
                localStorage.setItem('aayush_corporate_courses_custom', JSON.stringify(sanitizeCorporateCoursesForStorage(next)));
                window.dispatchEvent(new Event('corporateCoursesUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });
        if (selectedCourse && selectedCourse.name === courseName) {
            setSelectedCourse(null);
            setIsCourseModalOpen(false);
        }
        setIsEditModalOpen(false);
        setEditingCourse(null);
        showToast(`Program "${courseName}" removed from corporate catalog.`, 'info');
    };

    const openAddModal = () => {
        setAddFormData({
            name: '',
            category: activeCategory || 'ai',
            duration: '2–4 Weeks (Custom)',
            delivery: 'On-Site / Online / Hybrid',
            details: '',
            features: 'Customized Organizational Curriculum\nHands-on Practical Workshop Exercises\nEnterprise ROI & Business Impact Reporting',
            popular: false
        });
        setIsAddModalOpen(true);
    };

    const handleSaveNewCourse = (e) => {
        e.preventDefault();
        if (!addFormData.name.trim()) return;

        const targetCat = addFormData.category || activeCategory || 'ai';
        const newCourse = {
            name: addFormData.name.trim(),
            popular: !!addFormData.popular,
            details: addFormData.details.trim(),
            features: addFormData.features ? addFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : ['Customized Training Modules', 'Enterprise Mentorship'],
            duration: addFormData.duration.trim() || '2–4 Weeks (Custom)',
            delivery: addFormData.delivery.trim() || 'On-Site / Online / Hybrid'
        };

        setDbCourses(prev => {
            const next = { ...prev };
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [newCourse, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_corporate_courses_custom', JSON.stringify(sanitizeCorporateCoursesForStorage(next)));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        setActiveCategory(targetCat);
        setIsAddModalOpen(false);
        showToast(`Corporate Program "${newCourse.name}" published to catalog!`, 'success');
    };

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        orgName: '',
        contactName: '',
        email: '',
        phone: '',
        teamSize: '10-25',
        mode: 'Hybrid Training',
        category: 'AI & Generative AI',
        message: ''
    });

    const activeCategoryInfo = corporateCategories.find(c => c.id === activeCategory) || corporateCategories[0];
    const currentCourses = dbCourses[activeCategory] || [];

    const openCourseModal = (course) => {
        setSelectedCourse(course);
        setIsCourseModalOpen(true);
    };

    const closeCourseModal = () => {
        setIsCourseModalOpen(false);
        setSelectedCourse(null);
    };

    const openRequestModal = (courseName = '') => {
        if (courseName) {
            setFormData(prev => ({
                ...prev,
                category: activeCategoryInfo.label,
                message: `Inquiring about corporate batch training for: ${courseName}`
            }));
        }
        setIsCourseModalOpen(false);
        setIsRequestModalOpen(true);
        setFormSubmitted(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setIsRequestModalOpen(false);
            setFormSubmitted(false);
        }, 2200);
    };

    // Corporate Course Image Mapper (Local High-Resolution Assets)
    const getCorporateCourseImage = (course) => {
        if (course.image) return course.image;
        const name = (course.name || '').toLowerCase();
        if (name.includes('ai') || name.includes('generative') || name.includes('machine learning') || name.includes('prompt') || name.includes('gpt') || name.includes('claude') || name.includes('copilot')) {
            return '/corporate_ai.jpg';
        }
        if (name.includes('cloud') || name.includes('devops') || name.includes('aws') || name.includes('azure') || name.includes('security') || name.includes('cyber') || name.includes('threat')) {
            return '/corporate_cloud_security.jpg';
        }
        if (name.includes('excel') || name.includes('data') || name.includes('power bi') || name.includes('analytics') || name.includes('mis') || name.includes('sql') || name.includes('dashboard') || name.includes('financial')) {
            return '/corporate_data.jpg';
        }
        if (name.includes('python')) {
            return '/course_python.jpg';
        }
        if (name.includes('full stack') || name.includes('web') || name.includes('software') || name.includes('react') || name.includes('mern') || name.includes('api') || name.includes('java')) {
            return '/course_mern.jpg';
        }
        if (name.includes('ui') || name.includes('ux') || name.includes('design') || name.includes('graphic')) {
            return '/course_ui_ux.jpg';
        }
        if (name.includes('tally') || name.includes('accounting') || name.includes('gst')) {
            return '/corporate_data.jpg';
        }
        if (name.includes('marketing') || name.includes('digital') || name.includes('seo') || name.includes('campaign') || name.includes('social')) {
            return '/course_web_design.jpg';
        }
        return '/corporate_productivity.jpg';
    };

    // Rich Colorful Premium Course Card Component (No Top Border Line)
    const CourseCard = ({ course, index = 0 }) => {
        const theme = cardThemePalette[index % cardThemePalette.length];
        const cardImg = getCorporateCourseImage(course);

        return (
            <div className={`bg-gradient-to-br ${theme.cardBg} rounded-2xl border-2 ${theme.border} shadow-[0_6px_22px_rgba(0,0,0,0.06)] ${theme.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group h-full overflow-hidden relative`}>
                {/* Ambient Soft Glow in Top-Right Corner */}
                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${theme.glow} opacity-15 blur-2xl pointer-events-none group-hover:opacity-30 transition-opacity duration-500`} />

                {/* 1. Corporate Training Image Thumbnail */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img 
                        src={cardImg} 
                        alt={course.name}
                        loading="lazy"
                        onError={(e) => { e.target.src = '/corporate_productivity.jpg'; }}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

                    {/* Top Floating Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-md tracking-wider uppercase flex items-center gap-1.5 ${theme.badgeBg}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Enterprise
                        </span>
                        <div className="flex items-center gap-1.5">
                            {course.popular && (
                                <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-[#00285e] text-[10px] font-semibold rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider">
                                    <Star className="w-2.5 h-2.5 fill-[#00285e] text-[#00285e]" />
                                    Popular
                                </span>
                            )}
                            {isStaff && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditModal(course); }}
                                    className="pointer-events-auto px-2 py-1 bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                                    title="Edit Course (Staff)"
                                >
                                    <Edit3 className="w-2.5 h-2.5 text-purple-300" />
                                    <span>Staff Edit</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Floating Bottom Metadata on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-semibold">
                        <span className={`flex items-center gap-1.5 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] border ${theme.pillBg}`}>
                            <Clock className="w-3 h-3 text-amber-300" />
                            {course.duration}
                        </span>
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10.5px] font-semibold text-amber-300 border border-white/10">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            <span>4.9</span>
                        </div>
                    </div>
                </div>

                {/* 2. Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                        {/* Title with Squircle Gradient Icon */}
                        <div className="flex items-start gap-2.5 mb-2.5">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.iconGrad} ${theme.iconShadow} flex items-center justify-center flex-shrink-0 text-white shadow-md ring-2 ring-white/60 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mt-0.5`}>
                                {renderCorporateIcon(course)}
                            </div>
                            <h4 className={`text-sm sm:text-[14.5px] font-bold text-[#0a2540] ${theme.titleHover} transition-colors leading-snug line-clamp-2 min-h-[38px] flex items-center flex-1`}>
                                {course.name}
                            </h4>
                        </div>

                        {/* Description */}
                        <p className="text-slate-700 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2 my-2 font-normal">
                            {course.details}
                        </p>

                        {/* Feature Preview Chips */}
                        {course.features && course.features.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 my-3">
                                {course.features.slice(0, 2).map((feat, fIdx) => (
                                    <span key={fIdx} className="px-2 py-0.5 rounded-md bg-white/90 border border-slate-200/80 text-slate-700 text-[10.5px] font-semibold flex items-center gap-1 shadow-2xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        <span className="truncate max-w-[160px]">{feat}</span>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. Bottom Row */}
                    <div className="pt-3.5 border-t border-slate-200/80 flex items-center justify-between gap-2 mt-auto">
                        <div className={`flex items-center gap-1.5 text-xs font-semibold ${theme.accentText}`}>
                            <Users className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">B2B &amp; Teams</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                            {isStaff && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteCourse(course); }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                                    title="Delete this corporate program"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                    <span className="hidden sm:inline">Delete</span>
                                </button>
                            )}
                            <button
                                onClick={() => openCourseModal(course)}
                                aria-label={`View details for ${course.name}`}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${theme.btnGrad} font-semibold text-xs transition-all duration-200 cursor-pointer shadow-md group/btn hover:scale-105 active:scale-95`}
                            >
                                <span>Details</span>
                                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* Hero Section with Course Hero Background */}
            <div 
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center min-h-[250px] sm:min-h-[270px] lg:min-h-[290px] flex items-center"
                style={{ 
                    backgroundImage: "url('/course_hero.png')",
                    backgroundColor: '#d6ecff'
                }}
            >
                {/* Mobile & iPad overlay for crisp text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/95 via-[#d6ecff]/80 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 w-full">
                    <div className="flex flex-col justify-center py-4 sm:py-5 lg:py-6 max-w-full sm:max-w-[440px] md:max-w-[480px] lg:max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-[#0055cc] text-[11px] font-semibold tracking-wide mb-2 border border-blue-200/60 shadow-xs w-fit backdrop-blur-xs">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>Corporate Training Excellence</span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-1.5" style={{fontSize: 'clamp(20px, 2.5vw, 32px)'}}>
                            Build Skills. Strengthen Teams.{' '}
                            <span className="text-[#0055ff] block sm:inline">Drive Business Performance.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-2.5 font-normal">
                            Practical, customized corporate training across AI, Data, Software, and Digital Business to upskill your teams and drive business performance.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 md:gap-5 mb-3">
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Award className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">Tailored Curriculum</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Users className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">Team-Based Training</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Laptop className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">On-Site / Online / Hybrid</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                            <button
                                onClick={() => openRequestModal()}
                                className="inline-flex items-center justify-center gap-2 bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Request Corporate Training</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </button>
                            <a
                                href="#corporate-catalog"
                                onClick={() => setActiveCategory('ai')}
                                className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#004b93] font-semibold text-xs sm:text-sm px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border border-blue-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Explore AI Training</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Tabs Section */}
            <div id="corporate-catalog" className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
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
                                    All course cards have active "Edit" &amp; "Delete" buttons. You can also add and publish new courses.
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
                                <span>Add Corporate Course</span>
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

                {/* Floating pill menu */}
                <div 
                    className="overflow-x-auto pb-2 mb-8 no-scrollbar -mt-5 sm:-mt-6 relative z-20 px-1 touch-pan-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-2 min-w-max mx-auto justify-start lg:justify-center p-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80">
                        {corporateCategories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs sm:text-[13px] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? `bg-gradient-to-r ${cat.activeGrad} text-white shadow-md ${cat.activeShadow} scale-[1.02]`
                                            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200/80 shadow-2xs'
                                    }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active Category Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeCategoryInfo.activeGrad} text-white flex items-center justify-center mx-auto mb-2.5 shadow-md ${activeCategoryInfo.activeShadow}`}>
                        {activeCategoryInfo.icon}
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
                        <div className="w-8 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight">
                            {activeCategoryInfo.label}
                        </h2>
                        <div className="w-8 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-transparent rounded-full"></div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-[13.5px] max-w-2xl mx-auto leading-relaxed mb-3.5 font-normal">
                        {activeCategoryInfo.desc}
                    </p>

                    {/* Suitable For Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100/90 via-indigo-50/80 to-purple-100/80 border-2 border-indigo-200/80 text-indigo-950 text-xs font-semibold shadow-xs">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>Suitable for: {activeCategoryInfo.suitableFor}</span>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {currentCourses.map((course, idx) => (
                        <CourseCard key={idx} course={course} index={idx} />
                    ))}
                </div>

                {/* ── Corporate Training Solutions (9 Modules) ── */}
                <div className="mt-14 sm:mt-18 pt-10 border-t border-slate-200/80">
                    <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0062ff] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80 inline-block mb-2 shadow-2xs">
                            ENTERPRISE SOLUTIONS
                        </span>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight">
                            Corporate Training Solutions
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                            Comprehensive workplace capability programs tailored to organizational objectives, operational requirements, and workforce skills.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {corporateSolutions.map((sol, idx) => {
                            const theme = solutionThemes[idx % solutionThemes.length];
                            return (
                                <div
                                    key={idx}
                                    className={`bg-gradient-to-br ${theme.bg} rounded-2xl p-5 sm:p-6 border-2 ${theme.border} shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group`}
                                >
                                    <div>
                                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${theme.iconGrad} ${theme.iconShadow} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                            {React.cloneElement(sol.icon, { className: "w-5 h-5 text-white" })}
                                        </div>
                                        <h3 className={`font-semibold text-sm sm:text-[15.5px] mb-2 leading-snug transition-colors ${theme.titleColor}`}>
                                            {sol.title}
                                        </h3>
                                        <p className="text-slate-700 text-xs sm:text-[12.5px] leading-relaxed font-normal">
                                            {sol.desc}
                                        </p>
                                    </div>
                                    <div className="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center text-[11.5px] font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                                        <span>Enterprise Curriculum</span>
                                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Training Delivery Options & Target Departments ── */}
                <div className="mt-14 sm:mt-16 bg-gradient-to-br from-blue-100/70 via-indigo-50/80 to-purple-100/60 rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-indigo-200/90 shadow-[0_12px_36px_rgba(79,70,229,0.08)] relative overflow-hidden">
                    {/* Ambient Glow */}
                    <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 relative z-10">
                        {/* Delivery Modes */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-blue-200/80 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-sm">
                                    <Laptop className="w-4 h-4" />
                                </div>
                                <h4 className="font-semibold text-[#0a2540] text-sm sm:text-base">
                                    Training Delivery Options
                                </h4>
                            </div>
                            <p className="text-slate-600 text-xs sm:text-[13px] mb-4 leading-relaxed font-normal">
                                Flexible delivery formats configured to meet the scheduling and geographic requirements of your teams:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {deliveryOptions.map((opt, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs px-3.5 py-1.5 rounded-xl shadow-xs hover:scale-105 transition-transform"
                                    >
                                        ✓ {opt}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Target Departments */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-purple-200/80 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-sm">
                                    <Users className="w-4 h-4" />
                                </div>
                                <h4 className="font-semibold text-[#0a2540] text-sm sm:text-base">
                                    Training for Key Departments
                                </h4>
                            </div>
                            <p className="text-slate-600 text-xs sm:text-[13px] mb-4 leading-relaxed font-normal">
                                Role-based training programs developed for specific functional groups across your enterprise:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {targetDepartments.map((dept, idx) => {
                                    const deptGradients = [
                                        "from-blue-600 to-cyan-600",
                                        "from-purple-600 to-violet-600",
                                        "from-emerald-600 to-teal-600",
                                        "from-amber-500 to-orange-500",
                                        "from-rose-600 to-pink-600",
                                        "from-indigo-600 to-blue-600",
                                        "from-teal-600 to-emerald-600",
                                        "from-sky-600 to-indigo-600",
                                        "from-fuchsia-600 to-purple-600"
                                    ];
                                    const grad = deptGradients[idx % deptGradients.length];
                                    return (
                                        <span
                                            key={idx}
                                            className={`bg-gradient-to-r ${grad} text-white font-medium text-xs px-3.5 py-1.5 rounded-xl shadow-xs hover:scale-105 transition-transform`}
                                        >
                                            {dept}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Why Choose Our Corporate Training? ── */}
                <div className="mt-14 sm:mt-18">
                    <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#0062ff] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80 inline-block mb-2 shadow-2xs">
                            PROVEN EXCELLENCE
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight">
                            Why Choose Our Corporate Training?
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                        {whyChooseUsPoints.map((point, idx) => (
                            <div
                                key={idx}
                                className={`bg-gradient-to-br ${point.bg} rounded-2xl p-4.5 border-2 ${point.border} shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-3`}
                            >
                                <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${point.grad} text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
                                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <span className="text-slate-800 text-xs sm:text-[13px] font-medium leading-snug">
                                    {point.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action Banner (Matching Courses CTA) */}
                <div className="mt-10 sm:mt-12 bg-gradient-to-r from-[#0a2540] via-[#003882] to-[#0066ff] rounded-2xl py-6 sm:py-7 px-4 sm:px-6 text-center text-white shadow-xl">
                    <h3 className="text-base sm:text-lg font-bold mb-1.5 text-[#fed000]">
                        Equip Your Teams for a Changing Workplace.
                    </h3>
                    <p className="text-white/85 mb-4 max-w-xl mx-auto text-xs sm:text-[13px] leading-relaxed">
                        Design a customized corporate training programme based on your organization’s skills, technology and business requirements.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md sm:max-w-none mx-auto">
                        <button
                            onClick={() => openRequestModal()}
                            className="w-full sm:w-auto bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] px-5 py-2.5 rounded-full font-semibold text-xs sm:text-[13px] transition-all shadow-md hover:scale-105 cursor-pointer text-center"
                        >
                            Request Corporate Training
                        </button>
                        <a
                            href="#corporate-catalog"
                            onClick={() => setActiveCategory('ai')}
                            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 border border-white/40 text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-[13px] transition-all text-center"
                        >
                            Explore AI Training
                        </a>
                        <a
                            href="tel:+916284063840"
                            className="w-full sm:w-auto border border-white/50 text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-[13px] hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 text-center"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Talk to Our Training Team</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Course Details Modal ── */}
            {isCourseModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-xl sm:rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 overflow-hidden">
                        {/* Modal Header Image */}
                        <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                            <img 
                                src={getCorporateCourseImage(selectedCourse)} 
                                alt={selectedCourse.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                                {isStaff && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                openEditModal(selectedCourse);
                                            }}
                                            className="px-3 py-1.5 rounded-full bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-xs font-bold shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                            title="Edit Program Details (Staff)"
                                        >
                                            <Edit3 className="w-3.5 h-3.5 text-purple-300" />
                                            <span>Staff Edit</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleDeleteCourse(selectedCourse);
                                            }}
                                            className="px-3 py-1.5 rounded-full bg-rose-600/95 hover:bg-rose-700 text-white text-xs font-bold shadow-md border border-rose-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                            title="Delete Program (Staff)"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-rose-100" />
                                            <span>Delete</span>
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={closeCourseModal}
                                    className="text-white/80 hover:text-white bg-black/40 hover:bg-black/60 transition-colors p-2 rounded-full cursor-pointer backdrop-blur-md"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                                <div>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs inline-block mb-1">
                                        {activeCategoryInfo.label}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-sm">
                                        {selectedCourse.name}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 space-y-4">
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Program Overview
                                </h4>
                                <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px]">
                                    {selectedCourse.details}
                                </p>
                            </div>

                            {selectedCourse.features && (
                                <div>
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Key Modules & Enterprise Outcomes
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {selectedCourse.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                                <span className="text-slate-800 text-xs font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-blue-50/70 border border-blue-100/80 p-3 rounded-xl">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Clock className="w-3.5 h-3.5 text-[#0066ff]" />
                                        <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-blue-900">Duration</h5>
                                    </div>
                                    <p className="text-slate-800 font-bold text-xs sm:text-[12.5px]">{selectedCourse.duration}</p>
                                </div>

                                <div className="bg-emerald-50/70 border border-emerald-100/80 p-3 rounded-xl">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Laptop className="w-3.5 h-3.5 text-emerald-600" />
                                        <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-emerald-900">Delivery Modes</h5>
                                    </div>
                                    <p className="text-slate-800 font-bold text-xs sm:text-[12.5px]">{selectedCourse.delivery}</p>
                                </div>
                            </div>

                            {/* Suitable For */}
                            <div className="bg-amber-50/70 border border-amber-200/70 p-3 rounded-xl flex items-start gap-2.5">
                                <Users className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-amber-900 mb-0.5">
                                        Target Audience
                                    </h5>
                                    <p className="text-slate-700 text-xs font-medium leading-relaxed">
                                        {activeCategoryInfo.suitableFor}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60 rounded-b-xl sm:rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                            <a
                                href="tel:+916284063840"
                                className="text-xs text-slate-500 font-medium hover:text-[#0066ff] flex items-center gap-1.5"
                            >
                                <Phone className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Support: +91-62840 63840</span>
                            </a>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={closeCourseModal}
                                    className="sm:w-auto px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => openRequestModal(selectedCourse.name)}
                                    className="flex-1 sm:flex-initial px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    <span>Request Batch Training</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Corporate Training Request Modal ── */}
            {isRequestModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-lg font-bold text-[#0a2540]">
                                    Request Corporate Training
                                </h3>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    Get a customized proposal and curriculum for your organization
                                </p>
                            </div>
                            <button
                                onClick={() => setIsRequestModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {formSubmitted ? (
                            <div className="p-8 text-center">
                                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-[#0a2540] mb-1">
                                    Request Received!
                                </h4>
                                <p className="text-slate-600 text-xs max-w-sm mx-auto">
                                    Our corporate training coordinator will connect with you within 2 business hours with customized program details and pricing.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="p-5 space-y-3.5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Organization / Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., TechCorp Solutions Pvt Ltd"
                                        value={formData.orgName}
                                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Contact Person *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your full name"
                                            value={formData.contactName}
                                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91-98765 43210"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Official Work Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Team Size to Train
                                        </label>
                                        <select
                                            value={formData.teamSize}
                                            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] bg-white"
                                        >
                                            <option value="1-10">1 – 10 Employees</option>
                                            <option value="10-25">10 – 25 Employees</option>
                                            <option value="25-50">25 – 50 Employees</option>
                                            <option value="50+">50+ Employees</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Preferred Mode
                                        </label>
                                        <select
                                            value={formData.mode}
                                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] bg-white"
                                        >
                                            <option value="On-Site Training">On-Site (At Office)</option>
                                            <option value="Online Training">Online (Live Virtual)</option>
                                            <option value="Hybrid Training">Hybrid Mode</option>
                                            <option value="Customized Workshop">Customized Workshop</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Training Requirements / Message
                                    </label>
                                    <textarea
                                        rows="3"
                                        placeholder="Mention topics, specific team goals, or scheduling preferences..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff]"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Submit Corporate Inquiry</span>
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
                                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Edit Corporate Program</h3>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEditCourse} className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Program Title *</label>
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
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Domain</label>
                                    <select
                                        value={editFormData.category}
                                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 bg-white"
                                    >
                                        {corporateCategories.map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={editFormData.duration}
                                        onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                        placeholder="e.g. 2–4 Weeks (Custom)"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Format</label>
                                <input
                                    type="text"
                                    value={editFormData.delivery}
                                    onChange={(e) => setEditFormData({ ...editFormData, delivery: e.target.value })}
                                    placeholder="e.g. On-Site / Online / Hybrid"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Program Details &amp; Scope *</label>
                                <textarea
                                    rows="3"
                                    required
                                    value={editFormData.details}
                                    onChange={(e) => setEditFormData({ ...editFormData, details: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Key Modules / Capabilities (1 per line)</label>
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
                                    id="editPopular"
                                    checked={editFormData.popular}
                                    onChange={(e) => setEditFormData({ ...editFormData, popular: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <label htmlFor="editPopular" className="text-xs font-medium text-slate-700">Mark as Popular / Highly Requested Program</label>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (editingCourse) {
                                            handleDeleteCourse(editingCourse.name);
                                            setIsEditModalOpen(false);
                                        }
                                    }}
                                    className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Program</span>
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
                                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Add New Corporate Program</h3>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveNewCourse} className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Program Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Enterprise Cloud Security Architecture"
                                    value={addFormData.name}
                                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Domain</label>
                                    <select
                                        value={addFormData.category}
                                        onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 bg-white"
                                    >
                                        {corporateCategories.map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={addFormData.duration}
                                        onChange={(e) => setAddFormData({ ...addFormData, duration: e.target.value })}
                                        placeholder="e.g. 2–4 Weeks (Custom)"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Format</label>
                                <input
                                    type="text"
                                    value={addFormData.delivery}
                                    onChange={(e) => setAddFormData({ ...addFormData, delivery: e.target.value })}
                                    placeholder="e.g. On-Site / Online / Hybrid"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Program Details &amp; Scope *</label>
                                <textarea
                                    rows="3"
                                    required
                                    placeholder="Comprehensive outline of what company teams will achieve..."
                                    value={addFormData.details}
                                    onChange={(e) => setAddFormData({ ...addFormData, details: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Key Modules / Capabilities (1 per line)</label>
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
                                    id="addPopular"
                                    checked={addFormData.popular}
                                    onChange={(e) => setAddFormData({ ...addFormData, popular: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <label htmlFor="addPopular" className="text-xs font-medium text-slate-700">Mark as Popular / Highly Requested Program</label>
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
                                    Publish Program
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
                            <p className="text-xs text-slate-500 mt-1">Enter Master PIN to enable corporate program editing and deletion</p>
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

export default CooperateTrainingProgram;