import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
    Code,
    Smartphone,
    Cpu,
    Cloud,
    Palette,
    Layers,
    Terminal,
    Database,
    Shield,
    GitBranch,
    FileCheck,
    Presentation,
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
    Server,
    Star,
    BookOpen,
    Edit3,
    Trash2,
    Plus,
    ShieldCheck,
    RefreshCw,
    Lock,
    KeyRound,
    Zap,
    PhoneCall,
    Briefcase
} from 'lucide-react';

const projectCategories = [
    {
        id: 'web',
        label: 'Web & Software Development',
        icon: <Code className="w-4 h-4" />,
        eligibility: 'BCA / B.Tech / MCA / B.Sc. IT & CS / Polytechnic / Diploma',
        desc: 'Practical live software engineering: full-stack web applications, REST APIs, databases, authentication, and cloud deployment.',
        activeGrad: 'from-blue-600 to-indigo-600',
        activeShadow: 'shadow-blue-500/30',
        iconGrad: 'from-blue-600 to-indigo-600'
    },
    {
        id: 'mobile',
        label: 'Mobile App Development',
        icon: <Smartphone className="w-4 h-4" />,
        eligibility: 'BCA / B.Tech / MCA / Diploma / Polytechnic / IT Students',
        desc: 'Cross-platform and native mobile app development: state management, camera/GPS APIs, and responsive mobile UX.',
        activeGrad: 'from-purple-600 to-violet-600',
        activeShadow: 'shadow-purple-500/30',
        iconGrad: 'from-purple-600 to-violet-600'
    },
    {
        id: 'ai',
        label: 'AI, Data & Analytics',
        icon: <Cpu className="w-4 h-4" />,
        eligibility: 'B.Tech / BCA / MCA / B.Sc. / Mathematics & Technical Learners',
        desc: 'Artificial intelligence, Generative AI applications, Machine Learning models, and interactive enterprise Power BI dashboards.',
        activeGrad: 'from-emerald-600 to-teal-600',
        activeShadow: 'shadow-emerald-500/30',
        iconGrad: 'from-emerald-600 to-teal-600'
    },
    {
        id: 'cloud',
        label: 'Cloud, DevOps & Cyber Security',
        icon: <Cloud className="w-4 h-4" />,
        eligibility: 'B.Tech / MCA / BCA / Diploma & Technical Graduates',
        desc: 'Cloud deployment on AWS/Azure, CI/CD automated DevOps pipelines, Docker containerization, and cyber security audits.',
        activeGrad: 'from-cyan-600 to-sky-700',
        activeShadow: 'shadow-cyan-500/30',
        iconGrad: 'from-cyan-600 to-sky-700'
    },
    {
        id: 'design',
        label: 'UI/UX & Digital Design',
        icon: <Palette className="w-4 h-4" />,
        eligibility: 'All Technical / Non-Technical Students / Design Enthusiasts',
        desc: 'User research, wireframing, high-fidelity UI design systems in Figma, interactive prototypes, and developer handoff.',
        activeGrad: 'from-pink-600 to-rose-600',
        activeShadow: 'shadow-rose-500/30',
        iconGrad: 'from-pink-600 to-rose-600'
    }
];

const liveProjectsData = {
    web: [
        {
            name: "Web Development",
            subgroup: "Full Stack & Web",
            icon: <Code className="w-5 h-5" />,
            popular: true,
            details: "End-to-end web engineering covering HTML5, CSS3, JavaScript ES6+, backend RESTful APIs, relational database schemas, and live production deployment.",
            features: ["Interactive Responsive Frontend", "RESTful API Integration", "Authentication & Security", "Git Version Control & Deployment"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Live Project Training Certificate"
        },
        {
            name: "Python Development",
            subgroup: "Backend Engineering",
            icon: <Terminal className="w-5 h-5" />,
            popular: true,
            details: "Full-cycle Python backend project using Django or Flask with SQLite/PostgreSQL, CRUD workflows, secure authentication, and automated testing.",
            features: ["Django / Flask Architecture", "ORM & Database Migrations", "API Endpoints & JWT Auth", "Unit Testing & Deployment"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Python Project Certification"
        },
        {
            name: "Java Development",
            subgroup: "Backend Engineering",
            icon: <Server className="w-5 h-5" />,
            popular: true,
            details: "Enterprise Java software development using Spring Boot, Hibernate ORM, MVC design patterns, MySQL integration, and layered microservice architecture.",
            features: ["Spring Boot Microservice MVC", "Hibernate / JPA Relational Mapping", "Role-Based Access Control", "Swagger API Documentation"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Java Enterprise Project Certification"
        },
        {
            name: "PHP & MySQL",
            subgroup: "Backend Engineering",
            icon: <Database className="w-5 h-5" />,
            details: "Dynamic web application project utilizing PHP, MySQL, Apache, admin dashboards, data reporting, session security, and payment gateway integration.",
            features: ["Secure Admin & User Portals", "Relational Database Design", "CRUD & File Upload System", "Payment Gateway & Mailer"],
            duration: "6 Weeks / 3–6 Months",
            certification: "PHP & Web Project Certificate"
        },
        {
            name: "React JS",
            subgroup: "Modern Frontend",
            icon: <Layers className="w-5 h-5" />,
            popular: true,
            details: "Modern Single Page Application (SPA) with React Hooks, component lifecycles, global state management (Redux/Zustand), and live REST API consuming.",
            features: ["Custom React Hooks & Context", "Client-Side Routing & Guards", "State Management & Optimization", "Vite / Webpack Build Production"],
            duration: "6 Weeks / 3–6 Months",
            certification: "React JS Live Project Certificate"
        },
        {
            name: "Node.js",
            subgroup: "Backend Engineering",
            icon: <Terminal className="w-5 h-5" />,
            details: "High-concurrency backend API server development using Node.js, Express, async event loop, WebSocket live sockets, and secure JWT authentication.",
            features: ["Asynchronous Non-Blocking IO", "WebSockets Real-time Push", "JWT Token Auth & Rate Limiting", "MongoDB / MySQL Connectivity"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Node.js Backend Certificate"
        },
        {
            name: "MERN Stack",
            subgroup: "Full Stack & Web",
            icon: <Code className="w-5 h-5" />,
            popular: true,
            details: "Comprehensive full-stack project incorporating MongoDB, Express.js, React.js, and Node.js with end-to-end authentication, dashboard analytics, and cloud deployment.",
            features: ["End-to-End MERN Integration", "MongoDB Atlas Cloud Cluster", "Responsive Client + REST Backend", "Live Cloud Host (Render / Vercel)"],
            duration: "6 Weeks / 3–6 Months",
            certification: "MERN Stack Industrial Certification"
        }
    ],

    mobile: [
        {
            name: "Android Development",
            subgroup: "Native Mobile",
            icon: <Smartphone className="w-5 h-5" />,
            popular: true,
            details: "Native Android application using Kotlin / Java, Android Studio, XML/Jetpack Compose layouts, Room SQLite database, and Retrofit HTTP networking.",
            features: ["Jetpack Compose / XML Layouts", "Room Database Offline Sync", "Retrofit REST API Services", "APK Generation & Signing"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Android Live Project Certificate"
        },
        {
            name: "Flutter Development",
            subgroup: "Cross-Platform Mobile",
            icon: <Smartphone className="w-5 h-5" />,
            popular: true,
            details: "Cross-platform mobile app for Android & iOS using Google Flutter, Dart language, Bloc / Provider state management, and Firebase cloud backends.",
            features: ["Single Dart Codebase for iOS/Android", "Provider / Bloc State Architecture", "Firebase Auth & Cloud Firestore", "Material 3 Fluid UI Animations"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Flutter Specialist Certificate"
        },
        {
            name: "React Native",
            subgroup: "Cross-Platform Mobile",
            icon: <Smartphone className="w-5 h-5" />,
            popular: true,
            details: "Hybrid mobile application built with React Native and Expo, utilizing native hardware features (camera, GPS geolocation), push notifications, and Redux.",
            features: ["Expo & React Native CLI", "Native Camera & GPS Hardware Hooks", "Push Notifications Service", "Redux Toolkit Global State"],
            duration: "6 Weeks / 3–6 Months",
            certification: "React Native Project Certificate"
        }
    ],

    ai: [
        {
            name: "Artificial Intelligence",
            subgroup: "AI & Machine Learning",
            icon: <Cpu className="w-5 h-5" />,
            popular: true,
            details: "Advanced AI application utilizing computer vision, NLP text understanding, neural network architectures, and Python AI frameworks.",
            features: ["Neural Network Architecture", "Natural Language Processing (NLP)", "Computer Vision / OpenCV Pipelines", "Python AI Engine Integration"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Artificial Intelligence Project Certificate"
        },
        {
            name: "Generative AI",
            subgroup: "AI & Machine Learning",
            icon: <Sparkles className="w-5 h-5" />,
            popular: true,
            details: "Build next-gen GenAI systems using LangChain, OpenAI/Claude APIs, Retrieval-Augmented Generation (RAG) vector embeddings, and interactive Streamlit UI.",
            features: ["LangChain & LlamaIndex Pipelines", "RAG with ChromaDB / Pinecone", "Custom Prompt Engineering Chains", "Streamlit / Gradio Web Demo"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Generative AI Project Certification"
        },
        {
            name: "Python for Data Science",
            subgroup: "Data Science & Analytics",
            icon: <Terminal className="w-5 h-5" />,
            details: "Comprehensive data science pipeline: data cleansing with Pandas, statistical exploration with NumPy, and visual storytelling with Matplotlib/Seaborn.",
            features: ["Pandas & NumPy Data Wrangling", "Exploratory Data Analysis (EDA)", "Interactive Jupyter Notebooks", "Statistical Hypothesis Testing"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Data Science Project Certificate"
        },
        {
            name: "Machine Learning",
            subgroup: "AI & Machine Learning",
            icon: <Cpu className="w-5 h-5" />,
            popular: true,
            details: "Supervised and unsupervised ML models using Scikit-Learn: classification, regression, clustering, feature engineering, and model accuracy evaluation.",
            features: ["Feature Selection & Scaling", "Scikit-Learn ML Classifiers", "Model Evaluation & Confusion Matrix", "Pickle Model API Flask/FastAPI"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Machine Learning Specialist Certificate"
        },
        {
            name: "Data Analytics",
            subgroup: "Data Science & Analytics",
            icon: <Layers className="w-5 h-5" />,
            details: "Real-world business analytics project analyzing customer churn, sales revenue trends, and operational metrics using SQL queries and Python analytics.",
            features: ["Advanced SQL Analytical Queries", "Business Metric Formulations", "Cohort & Trend Analysis", "Actionable Insight Reporting"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Data Analytics Project Certificate"
        },
        {
            name: "Power BI",
            subgroup: "Data Science & Analytics",
            icon: <Layers className="w-5 h-5" />,
            popular: true,
            details: "Interactive enterprise BI reporting system featuring DAX formulas, Power Query ETL pipelines, star-schema data models, and drill-through visual dashboards.",
            features: ["Power Query Data Transformation", "Complex DAX Measures & KPIs", "Star Schema Relationship Modeling", "Interactive Slicers & Tooltips"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Power BI Certified Specialist"
        }
    ],

    cloud: [
        {
            name: "Cloud Computing",
            subgroup: "Cloud & Infrastructure",
            icon: <Cloud className="w-5 h-5" />,
            popular: true,
            details: "Multi-tier cloud infrastructure deployment on AWS/Azure utilizing EC2 virtual machines, S3 storage buckets, IAM security policies, and load balancers.",
            features: ["Cloud Architecture Planning", "Compute, VPC & Storage Config", "IAM Roles & Security Groups", "Scalable Load Balancing"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Cloud Computing Project Certificate"
        },
        {
            name: "DevOps",
            subgroup: "Cloud & Infrastructure",
            icon: <GitBranch className="w-5 h-5" />,
            popular: true,
            details: "Automated Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions, Jenkins, Docker containerization, and Linux hosting.",
            features: ["GitHub Actions / Jenkins Pipelines", "Docker Container Packaging", "Automated Testing & Build Triggers", "Zero-Downtime Deployment Flow"],
            duration: "6 Weeks / 3–6 Months",
            certification: "DevOps Project Certification"
        },
        {
            name: "Application Deployment",
            subgroup: "Cloud & Infrastructure",
            icon: <Server className="w-5 h-5" />,
            details: "Real-world production rollout of a full-stack application on VPS/cloud platforms with Nginx reverse proxy, SSL certification, domain DNS, and process monitoring.",
            features: ["Linux Server Environment Setup", "Nginx Reverse Proxy & SSL Setup", "PM2 / Systemd Process Managers", "Database Backup Automation"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Application Deployment Certificate"
        },
        {
            name: "Cyber Security",
            subgroup: "Security & Networking",
            icon: <Shield className="w-5 h-5" />,
            popular: true,
            details: "Vulnerability assessment and penetration testing (VAPT) project inspecting OWASP Top 10 vulnerabilities, network traffic packet sniffing, and secure auth.",
            features: ["OWASP Top 10 Security Audits", "SQLi & XSS Vulnerability Labs", "Wireshark Packet Analysis", "Security Hardening Recommendations"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Cyber Security Project Certificate"
        },
        {
            name: "Networking",
            subgroup: "Security & Networking",
            icon: <Server className="w-5 h-5" />,
            details: "Enterprise network topology simulation using Cisco Packet Tracer: VLANs, inter-VLAN routing, OSPF dynamic routing, DHCP servers, and firewall ACLs.",
            features: ["Cisco Packet Tracer Topologies", "VLAN & Subnet Partitioning", "Routing Protocols (OSPF/RIP)", "Access Control Lists (ACL)"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Networking Project Certificate"
        }
    ],

    design: [
        {
            name: "UI/UX Design",
            subgroup: "Product Design",
            icon: <Palette className="w-5 h-5" />,
            popular: true,
            details: "Full product design lifecycle: user empathy mapping, problem statements, UX research, wireframing, high-fidelity UI design, and clickable user flow prototypes.",
            features: ["UX Research & User Personas", "Wireframes & Information Architecture", "Design System & UI Component Kits", "Clickable Interactive Prototypes"],
            duration: "6 Weeks / 3–6 Months",
            certification: "UI/UX Design Project Certificate"
        },
        {
            name: "Figma",
            subgroup: "Product Design",
            icon: <Palette className="w-5 h-5" />,
            popular: true,
            details: "Mastery of professional Figma workflows: auto-layout 5.0, responsive components, variant properties, micro-interactions, smart animations, and developer handoff specs.",
            features: ["Advanced Auto-Layout & Variants", "Interactive Micro-Interactions", "Tokenized Color & Typography Styles", "Developer Handoff Inspection"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Figma Specialist Project Certificate"
        },
        {
            name: "Web & Mobile Interface Design",
            subgroup: "Product Design",
            icon: <Smartphone className="w-5 h-5" />,
            details: "End-to-end design for a responsive web dashboard and companion mobile iOS/Android apps with cohesive branding, iconography, and usability testing.",
            features: ["Multi-Device Responsive Grids", "Mobile iOS/Android Native Patterns", "Desktop Admin Dashboard Views", "Usability Testing Insights"],
            duration: "6 Weeks / 3–6 Months",
            certification: "Interface Design Certificate"
        }
    ]
};

const whoCanJoinList = [
    'ITI',
    'Polytechnic / Diploma',
    'BCA',
    'B.Sc. IT',
    'B.Sc. Computer Science',
    'B.Tech / BE',
    'MCA',
    'M.Tech',
    'Other IT & Computer Science Programmes'
];

const whatYouGetList = [
    {
        title: "Live Project Experience",
        desc: "Work on authentic, industry-oriented problem statements and production architecture.",
        tag: "Core Experience",
        cardBg: "from-blue-100/90 via-blue-50/70 to-indigo-50/50",
        border: "border-2 border-blue-200 hover:border-blue-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(59,130,246,0.18)]",
        iconGrad: "from-blue-600 to-indigo-600",
        iconShadow: "shadow-blue-500/30"
    },
    {
        title: "Practical Technical Training",
        desc: "Hands-on coding, debugging, database design, and modular software architecture.",
        tag: "Hands-On",
        cardBg: "from-purple-100/90 via-purple-50/70 to-fuchsia-50/50",
        border: "border-2 border-purple-200 hover:border-purple-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(147,51,234,0.18)]",
        iconGrad: "from-purple-600 to-violet-600",
        iconShadow: "shadow-purple-500/30"
    },
    {
        title: "Mentor-Guided Development",
        desc: "1-on-1 code reviews and milestone assistance from senior engineering practitioners.",
        tag: "1-on-1 Mentorship",
        cardBg: "from-emerald-100/90 via-emerald-50/70 to-teal-50/50",
        border: "border-2 border-emerald-200 hover:border-emerald-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(16,185,129,0.18)]",
        iconGrad: "from-emerald-600 to-teal-600",
        iconShadow: "shadow-emerald-500/30"
    },
    {
        title: "Project Documentation Support",
        desc: "Complete Synopsis, SRS, ER diagrams, data flow charts, and Black Book report.",
        tag: "College Approved",
        cardBg: "from-amber-100/90 via-amber-50/70 to-orange-50/50",
        border: "border-2 border-amber-200 hover:border-amber-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(245,158,11,0.18)]",
        iconGrad: "from-amber-500 to-orange-600",
        iconShadow: "shadow-amber-500/30"
    },
    {
        title: "Testing & Debugging Experience",
        desc: "Quality assurance, unit test cases, API assertions, and bug isolation resolution.",
        tag: "QA & Testing",
        cardBg: "from-cyan-100/90 via-cyan-50/70 to-sky-50/50",
        border: "border-2 border-cyan-200 hover:border-cyan-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(6,182,212,0.18)]",
        iconGrad: "from-cyan-600 to-sky-700",
        iconShadow: "shadow-cyan-500/30"
    },
    {
        title: "Project Presentation & Viva",
        desc: "Viva voce training, technical slide deck presentation, and defense confidence skills.",
        tag: "Viva Readiness",
        cardBg: "from-rose-100/90 via-rose-50/70 to-pink-50/50",
        border: "border-2 border-rose-200 hover:border-rose-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(244,63,94,0.18)]",
        iconGrad: "from-rose-600 to-pink-600",
        iconShadow: "shadow-rose-500/30"
    },
    {
        title: "Technology & Tool Exposure",
        desc: "Master Git, GitHub, VS Code, Postman, Docker, and Cloud hosting platforms.",
        tag: "Industry Tools",
        cardBg: "from-indigo-100/90 via-indigo-50/70 to-blue-50/50",
        border: "border-2 border-indigo-200 hover:border-indigo-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(99,102,241,0.18)]",
        iconGrad: "from-indigo-600 to-blue-600",
        iconShadow: "shadow-indigo-500/30"
    },
    {
        title: "Portfolio-Ready Project Work",
        desc: "GitHub repository, verified code commits, live demo link, and resume highlight.",
        tag: "Portfolio Showcase",
        cardBg: "from-teal-100/90 via-teal-50/70 to-emerald-50/50",
        border: "border-2 border-teal-200 hover:border-teal-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(20,184,166,0.18)]",
        iconGrad: "from-teal-600 to-emerald-600",
        iconShadow: "shadow-teal-500/30"
    }
];

const learnBuildPresentSteps = [
    {
        step: "01",
        title: "Work on a Project",
        desc: "Select an industry-relevant project aligned with your career and university criteria.",
        cardBg: "from-blue-100/90 via-white to-blue-50/50",
        border: "border-2 border-blue-200 hover:border-blue-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(59,130,246,0.16)]",
        stepColor: "text-blue-600",
        stepGrad: "from-blue-600 to-indigo-600"
    },
    {
        step: "02",
        title: "Apply Your Skills",
        desc: "Translate academic theory into production code, REST APIs, and database models.",
        cardBg: "from-purple-100/90 via-white to-purple-50/50",
        border: "border-2 border-purple-200 hover:border-purple-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(147,51,234,0.16)]",
        stepColor: "text-purple-600",
        stepGrad: "from-purple-600 to-violet-600"
    },
    {
        step: "03",
        title: "Build Your Portfolio",
        desc: "Complete documentation, push to GitHub, and deploy to live cloud servers.",
        cardBg: "from-emerald-100/90 via-white to-emerald-50/50",
        border: "border-2 border-emerald-200 hover:border-emerald-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(16,185,129,0.16)]",
        stepColor: "text-emerald-600",
        stepGrad: "from-emerald-600 to-teal-600"
    },
    {
        step: "04",
        title: "Present Your Work",
        desc: "Demonstrate working software confidently for college viva and job interviews.",
        cardBg: "from-amber-100/90 via-white to-amber-50/50",
        border: "border-2 border-amber-200 hover:border-amber-500",
        shadow: "hover:shadow-[0_12px_28px_rgba(245,158,11,0.16)]",
        stepColor: "text-amber-600",
        stepGrad: "from-amber-500 to-orange-600"
    }
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
        btnBg: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white",
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
        btnBg: "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white",
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
        btnBg: "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white",
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
        btnBg: "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white",
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
        btnBg: "bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white",
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
        btnBg: "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white",
        glow: "from-rose-500 to-pink-400"
    }
];

const LiveProject = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(location.state?.category || 'web');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [applyProjectName, setApplyProjectName] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        degree: 'B.Tech / BE',
        projectDomain: 'Web & Software Development',
        notes: ''
    });

    const isStaff = false;

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

    // Safe dynamic icon resolver for live projects
    const renderProjectIcon = (project, customClass = "w-5 h-5") => {
        if (!project) return <Code className={customClass} />;
        if (React.isValidElement(project.icon)) return project.icon;
        if (typeof project.icon === 'function') {
            const IconComp = project.icon;
            return <IconComp className={customClass} />;
        }
        const name = (project.name || '').toLowerCase();
        if (name.includes('mobile') || name.includes('android') || name.includes('flutter')) return <Smartphone className={customClass} />;
        if (name.includes('ai') || name.includes('intelligence') || name.includes('machine') || name.includes('deep')) return <Cpu className={customClass} />;
        if (name.includes('cloud') || name.includes('aws') || name.includes('azure') || name.includes('devops')) return <Cloud className={customClass} />;
        if (name.includes('design') || name.includes('ui') || name.includes('ux') || name.includes('figma')) return <Palette className={customClass} />;
        if (name.includes('data') || name.includes('database') || name.includes('sql') || name.includes('bi')) return <Database className={customClass} />;
        if (name.includes('security') || name.includes('cyber') || name.includes('ethical')) return <Shield className={customClass} />;
        return <Code className={customClass} />;
    };

    const sanitizeLiveProjectsForStorage = (data) => {
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

    // Dynamic Live Projects state backed by live MongoDB & real-time sync
    const [dbProjects, setDbProjects] = useState(liveProjectsData);

    const fetchMongoLiveProjects = async () => {
        try {
            const res = await fetch('/api/courses?programType=liveproject');
            if (!res.ok) return;
            const mongoList = await res.json();
            if (Array.isArray(mongoList) && mongoList.length > 0) {
                const grouped = {};
                mongoList.forEach(item => {
                    const cat = item.categoryId || 'web';
                    if (!grouped[cat]) grouped[cat] = [];
                    grouped[cat].push({
                        ...item,
                        name: item.name || item.title,
                        details: item.details || item.description,
                        order: typeof item.order === 'number' ? item.order : 99,
                    });
                });

                for (const cat in grouped) {
                    grouped[cat].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
                }

                setDbProjects(prev => ({ ...prev, ...grouped }));
            }
        } catch (err) {
            console.warn('MongoDB live project fetch note:', err);
        }
    };

    // Toast Notification
    const [toastMsg, setToastMsg] = useState(null);
    const showToast = (text, type = 'success') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3500);
    };

    useEffect(() => {
        fetchMongoLiveProjects();
        const interval = setInterval(fetchMongoLiveProjects, 4000);

        const syncProjects = () => {
            fetchMongoLiveProjects();
        };
        window.addEventListener('liveProjectsUpdated', syncProjects);
        window.addEventListener('storage', syncProjects);
        return () => {
            clearInterval(interval);
            window.removeEventListener('liveProjectsUpdated', syncProjects);
            window.removeEventListener('storage', syncProjects);
        };
    }, []);

    // Reset Catalog
    const handleResetToDefaults = () => {
        if (window.confirm('Reset all live projects back to original catalog defaults?')) {
            localStorage.removeItem('aayush_live_projects_custom');
            setDbProjects(liveProjectsData);
            window.dispatchEvent(new Event('liveProjectsUpdated'));
            window.dispatchEvent(new Event('storage'));
            showToast('Live projects catalog reset to defaults.', 'info');
        }
    };

    // Edit Modal State & Handlers
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        category: 'web',
        subgroup: '',
        duration: '',
        eligibility: '',
        certification: '',
        details: '',
        features: '',
        popular: false,
        image: ''
    });

    const openEditModal = (project) => {
        let foundCat = activeCategory;
        for (const [catKey, list] of Object.entries(dbProjects)) {
            if (Array.isArray(list) && list.some(p => p.name === project.name)) {
                foundCat = catKey;
                break;
            }
        }
        setEditingProject(project);
        setEditFormData({
            name: project.name || '',
            category: foundCat,
            subgroup: project.subgroup || '',
            duration: project.duration || '6 Weeks / 3–6 Months',
            eligibility: project.eligibility || 'BCA / B.Tech / MCA / Diploma',
            certification: project.certification || 'Live Project Training Certificate',
            details: project.details || '',
            features: Array.isArray(project.features) ? project.features.join('\n') : (project.features || ''),
            popular: !!project.popular,
            image: project.image || ''
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEditProject = (e) => {
        e.preventDefault();
        if (!editingProject || !editFormData.name.trim()) return;

        const updatedProject = {
            ...editingProject,
            name: editFormData.name.trim(),
            subgroup: editFormData.subgroup.trim() || 'Software Development',
            duration: editFormData.duration.trim() || '6 Weeks / 3–6 Months',
            eligibility: editFormData.eligibility.trim(),
            certification: editFormData.certification.trim() || 'Live Project Training Certificate',
            details: editFormData.details.trim(),
            features: editFormData.features ? editFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
            popular: !!editFormData.popular,
            image: editFormData.image.trim()
        };

        setDbProjects(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(p => p.name !== editingProject.name);
                }
            }
            const targetCat = editFormData.category || activeCategory || 'web';
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [updatedProject, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_live_projects_custom', JSON.stringify(sanitizeLiveProjectsForStorage(next)));
                window.dispatchEvent(new Event('liveProjectsUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        // Real-time synchronization if the details modal is currently viewing this project
        if (selectedCourse && (selectedCourse.name === editingProject.name || selectedCourse.name === updatedProject.name)) {
            setSelectedCourse(updatedProject);
        }

        setIsEditModalOpen(false);
        setEditingProject(null);
        showToast(`Project "${updatedProject.name}" updated successfully!`, 'success');
    };

    const handleDeleteProject = (projectOrName) => {
        const projectName = typeof projectOrName === 'string' ? projectOrName : projectOrName?.name;
        if (!projectName) return;
        if (!window.confirm(`Are you sure you want to delete live project "${projectName}"?`)) return;
        setDbProjects(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(p => p.name !== projectName);
                }
            }
            try {
                localStorage.setItem('aayush_live_projects_custom', JSON.stringify(sanitizeLiveProjectsForStorage(next)));
                window.dispatchEvent(new Event('liveProjectsUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });
        if (selectedCourse && selectedCourse.name === projectName) {
            setSelectedCourse(null);
            setIsModalOpen(false);
        }
        setIsEditModalOpen(false);
        setEditingProject(null);
        showToast(`Project "${projectName}" removed from catalog.`, 'info');
    };

    // Add Modal State & Handlers
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        category: 'web',
        subgroup: 'Full Stack & Web',
        duration: '6 Weeks / 3–6 Months',
        eligibility: 'BCA / B.Tech / MCA / Diploma',
        certification: 'Live Project Training Certificate',
        details: '',
        features: 'Industry Live Mentorship\nSRS & Capstone Documentation\nProduction Deployment & Testing',
        popular: false,
        image: ''
    });

    const openAddModal = () => {
        setAddFormData({
            name: '',
            category: activeCategory || 'web',
            subgroup: 'Full Stack & Web',
            duration: '6 Weeks / 3–6 Months',
            eligibility: 'BCA / B.Tech / MCA / Diploma',
            certification: 'Live Project Training Certificate',
            details: '',
            features: 'Industry Live Mentorship\nSRS & Capstone Documentation\nProduction Deployment & Testing',
            popular: false,
            image: ''
        });
        setIsAddModalOpen(true);
    };

    const handleSaveNewProject = (e) => {
        e.preventDefault();
        if (!addFormData.name.trim()) return;

        const newProject = {
            name: addFormData.name.trim(),
            subgroup: addFormData.subgroup.trim() || 'Software Development',
            duration: addFormData.duration.trim() || '6 Weeks / 3–6 Months',
            eligibility: addFormData.eligibility.trim(),
            certification: addFormData.certification.trim() || 'Live Project Training Certificate',
            details: addFormData.details.trim(),
            features: addFormData.features ? addFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
            popular: !!addFormData.popular,
            image: addFormData.image.trim()
        };

        const targetCat = addFormData.category || activeCategory || 'web';
        setDbProjects(prev => {
            const next = { ...prev };
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [newProject, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_live_projects_custom', JSON.stringify(sanitizeLiveProjectsForStorage(next)));
                window.dispatchEvent(new Event('liveProjectsUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        setIsAddModalOpen(false);
        showToast(`New Live Project "${newProject.name}" added to catalog!`, 'success');
    };

    // Real-time synchronization across backend API, tabs, and sessions
    useEffect(() => {
        let isMounted = true;
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/courses?programType=liveproject');
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && Array.isArray(data) && data.length > 0) {
                        const grouped = {};
                        data.forEach(p => {
                            if (p.visible === false) return;
                            const cat = p.categoryId || 'web';
                            if (!grouped[cat]) grouped[cat] = [];
                            grouped[cat].push({
                                ...p,
                                id: p._id || p.id,
                                name: p.name || p.title,
                                title: p.title || p.name,
                                subgroup: p.subgroup || p.categoryName || 'Live Project',
                                duration: p.duration || '6 Weeks / 3–6 Months',
                                eligibility: p.eligibility || 'BCA / B.Tech / MCA / Diploma',
                                certification: p.certification || 'Live Project Certificate',
                                details: p.details || p.description || '',
                                features: Array.isArray(p.features) && p.features.length > 0 ? p.features : ['Industry Live Mentorship', 'Production Deployment & Testing'],
                                popular: !!p.popular,
                                image: p.image || ''
                            });
                        });
                        setDbProjects(prev => ({ ...prev, ...grouped }));
                    }
                }
            } catch (err) {
                // Fallback to local custom storage if offline
                try {
                    const saved = localStorage.getItem('aayush_live_projects_custom');
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        if (isMounted) setDbProjects(prev => ({ ...prev, ...parsed }));
                    }
                } catch {}
            }
        };

        fetchProjects();
        const poll = setInterval(fetchProjects, 4000);

        window.addEventListener('liveProjectsUpdated', fetchProjects);
        window.addEventListener('coursesUpdated', fetchProjects);
        window.addEventListener('storage', fetchProjects);
        return () => {
            isMounted = false;
            clearInterval(poll);
            window.removeEventListener('liveProjectsUpdated', fetchProjects);
            window.removeEventListener('coursesUpdated', fetchProjects);
            window.removeEventListener('storage', fetchProjects);
        };
    }, []);

    useEffect(() => {
        if (location.state?.category) {
            setActiveCategory(location.state.category);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location.state]);

    const openModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const openApplyModal = (projName = '') => {
        setApplyProjectName(projName);
        setFormData(prev => ({
            ...prev,
            projectDomain: projName ? `${activeCategoryInfo.label} - ${projName}` : activeCategoryInfo.label
        }));
        setIsApplyModalOpen(true);
        setFormSubmitted(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setIsApplyModalOpen(false);
            setFormSubmitted(false);
        }, 2200);
    };

    const activeCategoryInfo = projectCategories.find(c => c.id === activeCategory) || projectCategories[0];
    const currentCourses = dbProjects[activeCategory] || [];
    const subgroups = [...new Set(currentCourses.map(c => c.subgroup).filter(Boolean))];

    // Live Project Course Image Mapper
    const getLiveProjectImage = (course) => {
        if (course.image) return course.image;
        const name = (course.name || '').toLowerCase();
        if (name.includes('python')) return '/course_python.jpg';
        if (name.includes('react') || name.includes('mern') || name.includes('node') || name.includes('web') || name.includes('php') || name.includes('java')) return '/course_mern.jpg';
        if (name.includes('android') || name.includes('flutter') || name.includes('mobile')) return 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80';
        if (name.includes('ai') || name.includes('artificial intelligence') || name.includes('generative')) return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80';
        if (name.includes('data') || name.includes('bi') || name.includes('analytics') || name.includes('machine learning')) return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
        if (name.includes('cyber') || name.includes('security') || name.includes('network')) return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';
        if (name.includes('cloud') || name.includes('devops') || name.includes('deployment')) return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80';
        if (name.includes('ui') || name.includes('ux') || name.includes('figma') || name.includes('design')) return '/course_ui_ux.jpg';
        return '/laptop_live_projects.jpg';
    };

    const CourseCard = ({ course, index = 0 }) => {
        const theme = cardThemePalette[index % cardThemePalette.length];
        const cardImg = getLiveProjectImage(course);

        return (
            <div className={`relative bg-gradient-to-br ${theme.cardBg} rounded-2xl border-2 ${theme.border} ${theme.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group h-full overflow-hidden`}>
                {/* Ambient Glowing Corner */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${theme.glow} opacity-20 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}></div>

                {/* 1. Project Image Thumbnail */}
                <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img 
                        src={cardImg} 
                        alt={course.name}
                        loading="lazy"
                        onError={(e) => { e.target.src = '/laptop_live_projects.jpg'; }}
                        className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>

                    {/* Top Floating Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                        <div className="flex items-center gap-1.5 pointer-events-auto">
                            <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#00488f] text-[10px] font-semibold shadow-xs tracking-wide">
                                Live Project
                            </span>
                            {course.popular && (
                                <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-semibold rounded-full flex items-center gap-1 shadow-xs">
                                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                                    Popular
                                </span>
                            )}
                        </div>
                        </div>

                    {/* Floating Bottom Metadata on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-medium">
                        <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px]">
                            <Clock className="w-3 h-3 text-[#fed000]" />
                            {course.duration}
                        </span>
                        <span className="bg-blue-600/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide">
                            Industry Ready
                        </span>
                    </div>
                </div>

                {/* 2. Card Body */}
                <div className="relative z-10 p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                        {/* Title with Themed Gradient Icon */}
                        <div className="flex items-start gap-2.5 mb-2">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${theme.iconGrad} text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md ${theme.iconShadow} group-hover:scale-105 transition-transform duration-200`}>
                                {renderProjectIcon(course)}
                            </div>
                            <h4 className={`text-[13px] sm:text-[14px] font-semibold text-slate-900 ${theme.titleHover} transition-colors leading-snug line-clamp-2 min-h-[38px] flex items-center flex-1`}>
                                {course.name}
                            </h4>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 font-normal text-xs leading-relaxed line-clamp-2 my-2">
                            {course.details}
                        </p>

                        {/* Key Highlights Tags */}
                        {course.features && course.features.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 my-2">
                                {course.features.slice(0, 2).map((feat, fIdx) => (
                                    <span key={fIdx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/85 text-slate-700 border border-slate-200/70 truncate max-w-[150px]">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. Bottom Row */}
                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                            <TrendingUp className="w-3.5 h-3.5 text-[#0066ff]" />
                            <span>Live Capstone</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                            {isStaff && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteProject(course); }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                                    title="Delete this live project"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                    <span className="hidden sm:inline">Delete</span>
                                </button>
                            )}
                            <button
                                onClick={() => openModal(course)}
                                aria-label={`View details for ${course.name}`}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.btnBg} font-semibold text-[11px] transition-all duration-200 cursor-pointer shadow-xs group/btn`}
                            >
                                <span>Details</span>
                                <ArrowRight className="w-3 h-3 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const CourseModal = () => {
        if (!isModalOpen || !selectedCourse) return null;

        return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                <div className="bg-white rounded-xl sm:rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
                    <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                {renderProjectIcon(selectedCourse)}
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">{selectedCourse.name}</h3>
                                {selectedCourse.subgroup && (
                                    <span className="text-[11px] font-semibold text-[#0066ff]">{selectedCourse.subgroup}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isStaff && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(selectedCourse)}
                                        className="px-3 py-1.5 rounded-full bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-xs font-bold shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                        title="Edit Project Details (Staff)"
                                    >
                                        <Edit3 className="w-3.5 h-3.5 text-purple-300" />
                                        <span>Staff Edit</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteProject(selectedCourse)}
                                        className="px-3 py-1.5 rounded-full bg-rose-600/95 hover:bg-rose-700 text-white text-xs font-bold shadow-md border border-rose-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                        title="Delete Project (Staff)"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-100" />
                                        <span>Delete</span>
                                    </button>
                                </>
                            )}
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4">
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Project Overview</h4>
                            <p className="text-slate-600 font-normal leading-relaxed text-xs sm:text-[13px]">{selectedCourse.details}</p>
                        </div>

                        {selectedCourse.features && (
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights &amp; Modules</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {selectedCourse.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedCourse.duration && (
                                <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/80 p-3 rounded-xl">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Clock className="w-3.5 h-3.5 text-[#0066ff]" />
                                        <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-blue-900">Duration</h5>
                                    </div>
                                    <p className="text-slate-800 font-bold text-xs sm:text-[12.5px]">{selectedCourse.duration}</p>
                                </div>
                            )}

                            {selectedCourse.certification && (
                                <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 p-3 rounded-xl">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                                        <h5 className="font-bold text-[10.5px] uppercase tracking-wider text-emerald-900">Certification</h5>
                                    </div>
                                    <p className="text-slate-800 font-bold text-xs sm:text-[12.5px]">{selectedCourse.certification}</p>
                                </div>
                            )}
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
                                    closeModal();
                                    openApplyModal(selectedCourse.name);
                                }}
                                className="flex-1 bg-gradient-to-r from-[#0055ff] to-[#0044cc] hover:from-[#0044cc] hover:to-[#0033aa] text-white py-2.5 px-4 rounded-xl font-bold text-center text-xs sm:text-[13px] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span>Apply for this Live Project</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <a
                                href="tel:+916284063840"
                                className="sm:w-auto px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold text-xs sm:text-[13px] hover:bg-slate-50 transition-colors text-center"
                            >
                                Call Mentor
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* ── 1. BANNER (EXACT COURSES PAGE DESIGN & CONTENT, HOMEPAGE RESPONSIVE LOGIC) ── */}
            <div className="relative overflow-hidden bg-[#d6ecff] border-b border-blue-100 py-4 sm:py-6 md:py-8 lg:py-10 min-h-[340px] md:min-h-[370px] lg:min-h-[420px] flex items-center">
                
                {/* Full-width Panoramic Background Image (Desktop & Tablet Only) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/course_hero.png"
                        alt="Hero Background"
                        className="w-full h-full object-cover object-[85%_center] lg:object-right hidden md:block"
                    />
                    {/* Responsive Contrast Overlay: Keeps text razor sharp on tablet & desktop without obscuring the student graphic */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff] via-[#d6ecff]/95 to-transparent pointer-events-none hidden md:block lg:from-[#d6ecff]/75 lg:via-[#d6ecff]/20"></div>
                </div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full flex items-center">
                    {/* Content Column: Full-width on Mobile (1-col stack), 54%-58% on Tablet/Desktop leaving the right-side student graphic clear */}
                    <div className="w-full md:w-[55%] lg:w-[57%] xl:w-[60%] flex flex-col justify-center">
                        
                        {/* Top Badge: White rounded pill with blue dot */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0055cc] text-[10.5px] sm:text-xs font-bold tracking-wide mb-2 sm:mb-2.5 border border-blue-100 shadow-2xs w-fit">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            <span>LIVE PROJECT TRAINING • PRACTICAL CAPSTONE</span>
                        </div>

                        {/* Main Heading: Exact wording and gradient styling with Homepage-like tablet & mobile typography */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.14] text-2xl sm:text-3xl md:text-[24px] lg:text-[34px] xl:text-[40px] tracking-tight mb-2 sm:mb-2.5">
                            Learn by Working on{' '}
                            <span className="bg-gradient-to-r from-[#0055ff] via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent block sm:inline">
                                Real Industry Projects
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-[#004b93] font-bold text-xs sm:text-[13px] md:text-[12px] lg:text-[13.5px] mb-2 sm:mb-2.5 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>Build • Deploy • Succeed with Real-World Software Engineering</span>
                        </p>

                        {/* Description (Exact content preserved) */}
                        <p className="text-[#475569] text-xs sm:text-[13px] md:text-[11.5px] lg:text-[13px] leading-relaxed max-w-xl mb-3 sm:mb-3.5 font-normal">
                            Gain practical, hands-on experience through live, industry-oriented projects designed for technical students to build real software and portfolio-ready work.
                        </p>

                        {/* Mobile Only: Dedicated Student Visual Card (< 768px) with 3 Feature Badges on Left Open Space */}
                        <div className="block md:hidden my-3 relative rounded-2xl overflow-hidden shadow-md border-2 border-white h-[215px] w-full">
                            <img
                                src="/course_hero.png"
                                alt="Live Project Training Students"
                                className="w-full h-full object-cover object-[88%_center]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/50 via-transparent to-transparent pointer-events-none"></div>

                            {/* Slogan Badge Top-Right */}
                            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg shadow-xs rotate-[-3deg] border border-blue-100 z-10">
                                <span className="font-semibold text-[10.5px] text-[#1d4ed8]" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
                                    Build • Deploy • Succeed
                                </span>
                                <div className="w-10 h-0.5 bg-[#fed000] rounded-full mt-0.5"></div>
                            </div>

                            {/* 3 Pills placed on the left open space inside the image box */}
                            <div className="absolute inset-y-0 left-0 w-[58%] p-2.5 flex flex-col justify-around z-10">
                                {/* 1. College Approved Projects */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                        <Award className="w-3 h-3" />
                                    </div>
                                    <span className="text-[10.5px] font-bold text-[#00285e] leading-tight whitespace-nowrap">
                                        College Approved
                                    </span>
                                </div>

                                {/* 2. 1-on-1 Mentor Guidance */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                        <Users className="w-3 h-3" />
                                    </div>
                                    <span className="text-[10.5px] font-bold text-[#00285e] leading-tight whitespace-nowrap">
                                        1-on-1 Mentorship
                                    </span>
                                </div>

                                {/* 3. SRS & Black Book Reports */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                        <FileCheck className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[10.5px] font-bold text-[#00285e] leading-tight whitespace-nowrap">
                                        SRS &amp; Project Reports
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3 Features: Tablet & Desktop Only (No Background) */}
                        <div className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6 mb-4 sm:mb-5 max-w-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Award className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs sm:text-[13px] font-bold text-[#00285e] whitespace-nowrap">
                                    College Approved Projects
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Users className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs sm:text-[13px] font-bold text-[#00285e] whitespace-nowrap">
                                    1-on-1 Mentor Guidance
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <FileCheck className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs sm:text-[13px] font-bold text-[#00285e] whitespace-nowrap">
                                    SRS &amp; Black Book Reports
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons: Full-width stacked on Mobile, comfortable sizing on Tablet/Desktop */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                            <a
                                href="#projects-catalog"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs md:text-[11.5px] lg:text-[13px] px-6 md:px-4 lg:px-6 py-2.5 md:py-2 lg:py-2.5 rounded-full shadow-[0_6px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_22px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                            >
                                <span>Explore Live Projects</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </a>
                            <button
                                onClick={() => openApplyModal()}
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#00285e] hover:text-[#0055ff] font-bold text-xs md:text-[11.5px] lg:text-[13px] px-5 md:px-3.5 lg:px-5 py-2.5 md:py-2 lg:py-2.5 rounded-full border border-blue-200/90 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                            >
                                <PhoneCall className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Apply for Live Project</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>



            {/* Category Tabs Section */}
            <div id="projects-catalog" className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
                {/* Floating pill menu matching Courses */}
                <div 
                    className="overflow-x-auto pb-2 mb-8 no-scrollbar -mt-5 sm:-mt-6 relative z-20"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-2 min-w-max mx-auto justify-start lg:justify-center p-1.5 bg-white rounded-full shadow-lg border border-slate-200/80">
                        {projectCategories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-[13px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? `bg-gradient-to-r ${cat.activeGrad} text-white shadow-md ${cat.activeShadow} scale-[1.02]`
                                            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0066ff] border border-slate-200/80 shadow-2xs'
                                    }`}
                                >
                                    <span className={`p-1 rounded-full ${isActive ? 'bg-white/20 text-white' : 'text-slate-500'}`}>
                                        {cat.icon}
                                    </span>
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── 2. BANNER KE JUST UNDER — COLORFUL SEO INTRODUCTION ── */}
                <section className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] mb-6 sm:mb-8 relative overflow-hidden">
                    {/* Subtle ambient corner glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/80 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-sky-50/80 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center w-full">
                            
                            {/* Left Column (7 cols): Headings & Comprehensive Overview */}
                            <div className="md:col-span-7 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0055cc] text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-2.5 sm:mb-3 border border-blue-200/80 shadow-2xs w-fit">
                                    <Sparkles className="w-3.5 h-3.5 text-[#0055cc]" />
                                    <span>Practical Software Capstone</span>
                                </div>

                                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0a2540] tracking-tight mb-2.5 sm:mb-3.5 leading-tight">
                                    Hands-On Live Software &amp; <span className="bg-gradient-to-r from-[#0055cc] via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Capstone Portfolios</span>
                                </h2>

                                <div className="space-y-2 text-slate-600 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed font-normal">
                                    <p>
                                        Gain practical, hands-on experience through live, industry-oriented projects designed for technical students to build real software and portfolio-ready work. Work on full-stack web applications, cross-platform mobile apps, artificial intelligence models, cloud architectures, and interactive digital products.
                                    </p>
                                    <p className="text-slate-500 text-[11px] sm:text-xs">
                                        Each project includes end-to-end guidance from industry mentors, comprehensive SRS project documentation, black book report assistance, and verified certification for college semester submission and job interviews.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column (5 cols): 4 Feature Cards in a 2x2 Grid */}
                            <div className="md:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
                                <div className="flex flex-col justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f8fbff] hover:bg-blue-50/70 border border-blue-100/90 hover:border-blue-200 transition-all duration-200 group shadow-2xs">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 text-[#0066ff] flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                                        <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] sm:text-[13px] font-bold text-[#0a2540] leading-tight">100% Practical</div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Production-Grade Code</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f6fcf8] hover:bg-emerald-50/70 border border-emerald-100/90 hover:border-emerald-200 transition-all duration-200 group shadow-2xs">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                                        <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] sm:text-[13px] font-bold text-[#0a2540] leading-tight">College Approved</div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">University Acceptance</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#faf8ff] hover:bg-purple-50/70 border border-purple-100/90 hover:border-purple-200 transition-all duration-200 group shadow-2xs">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] sm:text-[13px] font-bold text-[#0a2540] leading-tight">1-on-1 Mentors</div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Sprint &amp; Viva Guidance</div>
                                    </div>
                                </div>

                                <NavLink
                                    to="/Placement"
                                    className="flex flex-col justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fffbf5] hover:bg-amber-50/70 border border-amber-100/90 hover:border-amber-200 transition-all duration-200 group shadow-2xs cursor-pointer"
                                >
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] sm:text-[13px] font-bold text-[#0a2540] leading-tight flex items-center justify-between">
                                            <span>Placement Ready</span>
                                            <ArrowRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Portfolio Showcase</div>
                                    </div>
                                </NavLink>
                            </div>

                            {/* Explore More Academic & Career Pillars */}
                            <div className="md:col-span-12 pt-3 mt-1 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50/80 rounded-xl p-2.5 sm:px-4">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                                    <span className="text-[11.5px] sm:text-xs font-bold text-[#0a2540]">Explore Career Pathways:</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                    <NavLink to="/Courses" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 text-[10.5px] sm:text-xs font-semibold border border-blue-200 transition-all hover:scale-105">
                                        <span>📚 Professional Courses</span>
                                    </NavLink>
                                    <NavLink to="/UniversityCourses" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10.5px] sm:text-xs font-semibold border border-emerald-200 transition-all hover:scale-105">
                                        <span>🎓 University Programs</span>
                                    </NavLink>
                                    <NavLink to="/CorporateTraining" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-800 text-[10.5px] sm:text-xs font-semibold border border-orange-200 transition-all hover:scale-105">
                                        <span>🏢 Corporate Training</span>
                                    </NavLink>
                                    <NavLink to="/Placement" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 text-[10.5px] sm:text-xs font-semibold border border-rose-200 transition-all hover:scale-105">
                                        <span>💼 Placement Cell</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Active Category Header with Center Icon and Accent Lines */}
                <div className="text-center mb-8 sm:mb-10">
                    {/* Small Rounded Icon with Vibrant Category Gradient */}
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeCategoryInfo.iconGrad || 'from-[#0066ff] to-[#0055ff]'} text-white flex items-center justify-center mx-auto mb-2.5 shadow-md shadow-blue-500/20`}>
                        {activeCategoryInfo.icon}
                    </div>

                    {/* Title with decorative lines on left and right */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1.5">
                        <div className="w-8 sm:w-14 h-[2px] bg-gradient-to-r from-transparent to-[#0055ff] rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            {activeCategoryInfo.label}
                        </h2>
                        <div className="w-8 sm:w-14 h-[2px] bg-gradient-to-l from-transparent to-[#0055ff] rounded-full"></div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-slate-500 text-xs sm:text-[13px] max-w-xl mx-auto leading-relaxed mb-3 font-normal">
                        {activeCategoryInfo.desc}
                    </p>

                    {/* Eligibility Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50/80 border border-blue-200/80 text-[#004b93] text-[11px] sm:text-xs font-semibold shadow-2xs">
                        <GraduationCap className="w-3.5 h-3.5 text-[#0055ff]" />
                        <span>Eligibility: {activeCategoryInfo.eligibility}</span>
                    </div>
                </div>

                {/* Course Grid - All live projects of this page kept together in a unified continuous grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {currentCourses.map((course, idx) => (
                        <CourseCard key={idx} course={course} index={idx} />
                    ))}
                </div>

                {/* WHO CAN JOIN? SECTION */}
                <div className="mt-14 sm:mt-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 rounded-3xl p-6 sm:p-8 border border-blue-100/80 shadow-[0_4px_20px_rgba(0,85,255,0.06)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#0055ff] text-xs font-semibold mb-2.5">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>WHO CAN JOIN?</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] mb-2">
                                Designed for Technical & Engineering Students
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-4 font-normal">
                                Designed for students who are pursuing or completing university degrees and seeking hands-on project exposure for academic submission and career readiness.
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-xs font-semibold text-slate-400 mr-1">Ideal for:</span>
                                {['Final-Year Students', 'Project Students', 'Fresh Graduates', 'Technical Learners'].map((label, idx) => (
                                    <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                                        ✓ {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Eligible streams pills */}
                        <div className="flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2.5">Target Disciplines</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {whoCanJoinList.map((deg, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/70 hover:border-blue-300 text-xs font-semibold text-slate-800 shadow-2xs transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0055ff] to-cyan-500"></div>
                                        <span className="truncate">{deg}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* WHAT YOU GET SECTION */}
                <div className="mt-12 sm:mt-14">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2 border border-amber-200/60 shadow-2xs">
                            <Award className="w-3.5 h-3.5 text-amber-600" />
                            <span>WHAT YOU GET</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            Complete Live Project Experience & Deliverables
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {whatYouGetList.map((item, idx) => (
                            <div
                                key={idx}
                                className={`rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${item.cardBg} ${item.border}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.iconGrad} text-white flex items-center justify-center shadow-sm ${item.iconShadow}`}>
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/60 text-slate-600">
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

                {/* LEARN. BUILD. PRESENT. 4-STEP PROCESS */}
                <div className="mt-12 sm:mt-14">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200/60 shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>LEARN. BUILD. PRESENT.</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            Work on a Project → Apply Your Skills → Build Your Portfolio → Present Your Work
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {learnBuildPresentSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className={`rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${step.cardBg} ${step.border}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-2xl font-bold ${step.stepColor}`}>0{step.step}</span>
                                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                </div>
                                <h4 className="text-sm font-bold text-[#0a2540] mb-1.5">{step.title}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action Banner matching Courses style */}
                <div className="mt-12 sm:mt-14 bg-gradient-to-r from-[#003882] via-[#0055ff] to-[#0284c7] rounded-3xl p-6 sm:p-9 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-300 border border-white/20 text-xs font-semibold mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            Industry Standard Training
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Start Your Live Project Training Today</h3>
                        <p className="text-blue-50/90 mb-5 max-w-xl mx-auto text-xs sm:text-[13px] leading-relaxed font-normal">
                            Take your academic learning into a practical project environment and gain experience working with real development processes.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="#projects-catalog"
                                className="bg-white hover:bg-slate-100 text-[#003882] px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-md hover:scale-105"
                            >
                                Explore Live Projects
                            </a>
                            <button
                                onClick={() => openApplyModal()}
                                className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-md hover:scale-105 cursor-pointer"
                            >
                                Apply Now
                            </button>
                            <a
                                href="tel:+916284063840"
                                className="border border-white/40 text-white px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm hover:bg-white/15 transition-all"
                            >
                                Talk to a Project Advisor
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal 1: Details */}
            <CourseModal />

            {/* Modal 2: Apply Now */}
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
                                <Laptop className="w-5 h-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#0a2540]">
                                Apply for Live Project Training
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                                Share your details and a project mentor will contact you.
                            </p>
                        </div>

                        {formSubmitted ? (
                            <div className="py-8 text-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900">Application Received!</h4>
                                <p className="text-xs text-slate-600">
                                    Thank you! We will reach out with the project batch schedule and curriculum details.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your name"
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
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Degree</label>
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
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Selected Project</label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={formData.projectDomain}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-700 font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Requirements / Remarks</label>
                                    <textarea
                                        rows="2"
                                        placeholder="E.g. 6-months industrial training, major project submission..."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff]"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-[13px] py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Submit Application</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* ===== EDIT LIVE PROJECT MODAL (STAFF ONLY) ===== */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{backdropFilter:'blur(10px)', background:'rgba(0,0,0,0.55)'}}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 relative border border-purple-100 animate-in fade-in zoom-in duration-200">
                        <button
                            type="button"
                            onClick={() => { setIsEditModalOpen(false); setEditingProject(null); }}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4 text-slate-500" />
                        </button>

                        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                                <Edit3 className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base sm:text-lg font-bold text-[#00285e]">Edit Live Project</h3>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                                        Staff Control
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500">Modify live project curriculum, duration, eligibility, and capstone features</p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveEditProject} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Project Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 font-semibold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Domain Category *
                                    </label>
                                    <select
                                        value={editFormData.category}
                                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    >
                                        <option value="web">Web &amp; Software Development</option>
                                        <option value="mobile">Mobile App Development</option>
                                        <option value="ai">AI, Data &amp; Analytics</option>
                                        <option value="cloud">Cloud, DevOps &amp; Cyber Security</option>
                                        <option value="design">UI/UX &amp; Digital Design</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Subgroup / Track Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.subgroup}
                                        onChange={(e) => setEditFormData({ ...editFormData, subgroup: e.target.value })}
                                        placeholder="e.g. Full Stack & Web, Machine Learning"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.duration}
                                        onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                        placeholder="e.g. 6 Weeks / 3–6 Months"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Eligibility
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.eligibility}
                                        onChange={(e) => setEditFormData({ ...editFormData, eligibility: e.target.value })}
                                        placeholder="e.g. BCA / B.Tech / MCA / Diploma"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Certification Awarded
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.certification}
                                        onChange={(e) => setEditFormData({ ...editFormData, certification: e.target.value })}
                                        placeholder="e.g. Live Project Training Certificate"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div className="sm:col-span-2 flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                                    <div>
                                        <div className="text-xs font-bold text-amber-900">Mark as Popular / Trending</div>
                                        <div className="text-[11px] text-amber-700">Display prominent gold badge on this project card</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={editFormData.popular}
                                        onChange={(e) => setEditFormData({ ...editFormData, popular: e.target.checked })}
                                        className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Project Overview &amp; Description *
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={editFormData.details}
                                        onChange={(e) => setEditFormData({ ...editFormData, details: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 resize-none"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Key Highlights &amp; Modules (one per line)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={editFormData.features}
                                        onChange={(e) => setEditFormData({ ...editFormData, features: e.target.value })}
                                        placeholder="e.g. Industry Live Mentorship&#10;SRS &amp; Capstone Documentation&#10;Production Deployment &amp; Testing"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 font-mono text-[11px]"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Custom Image Thumbnail URL / Path
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.image}
                                        onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                                        placeholder="/laptop_live_projects.jpg or image URL"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteProject(editingProject.name)}
                                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Project</span>
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditModalOpen(false); setEditingProject(null); }}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                        <span>Save Changes</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== ADD LIVE PROJECT MODAL (STAFF ONLY) ===== */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{backdropFilter:'blur(10px)', background:'rgba(0,0,0,0.55)'}}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 relative border border-emerald-100 animate-in fade-in zoom-in duration-200">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4 text-slate-500" />
                        </button>

                        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                                <Plus className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base sm:text-lg font-bold text-[#00285e]">Add New Live Project</h3>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                        Staff Publishing
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500">Publish a new practical live project to the training catalog</p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveNewProject} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Project Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Next.js 14 AI Healthcare SaaS"
                                        value={addFormData.name}
                                        onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 font-semibold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Domain Category *
                                    </label>
                                    <select
                                        value={addFormData.category}
                                        onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    >
                                        <option value="web">Web &amp; Software Development</option>
                                        <option value="mobile">Mobile App Development</option>
                                        <option value="ai">AI, Data &amp; Analytics</option>
                                        <option value="cloud">Cloud, DevOps &amp; Cyber Security</option>
                                        <option value="design">UI/UX &amp; Digital Design</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Subgroup / Track Name
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.subgroup}
                                        onChange={(e) => setAddFormData({ ...addFormData, subgroup: e.target.value })}
                                        placeholder="e.g. Full Stack & Web, Machine Learning"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.duration}
                                        onChange={(e) => setAddFormData({ ...addFormData, duration: e.target.value })}
                                        placeholder="e.g. 6 Weeks / 3–6 Months"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Eligibility
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.eligibility}
                                        onChange={(e) => setAddFormData({ ...addFormData, eligibility: e.target.value })}
                                        placeholder="e.g. BCA / B.Tech / MCA / Diploma"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Certification Awarded
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.certification}
                                        onChange={(e) => setAddFormData({ ...addFormData, certification: e.target.value })}
                                        placeholder="e.g. Live Project Training Certificate"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div className="sm:col-span-2 flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                                    <div>
                                        <div className="text-xs font-bold text-amber-900">Mark as Popular / Trending</div>
                                        <div className="text-[11px] text-amber-700">Display prominent gold badge on this project card</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={addFormData.popular}
                                        onChange={(e) => setAddFormData({ ...addFormData, popular: e.target.checked })}
                                        className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Project Overview &amp; Description *
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        placeholder="Detailed description of live development tasks and architecture..."
                                        value={addFormData.details}
                                        onChange={(e) => setAddFormData({ ...addFormData, details: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 resize-none"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Key Highlights &amp; Modules (one per line)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={addFormData.features}
                                        onChange={(e) => setAddFormData({ ...addFormData, features: e.target.value })}
                                        placeholder="e.g. Industry Live Mentorship&#10;SRS &amp; Capstone Documentation&#10;Production Deployment &amp; Testing"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 font-mono text-[11px]"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Custom Image Thumbnail URL / Path
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.image}
                                        onChange={(e) => setAddFormData({ ...addFormData, image: e.target.value })}
                                        placeholder="/laptop_live_projects.jpg or image URL"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                                >
                                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>Publish Live Project</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            {/* Toast Notification */}
            {toastMsg && (
                <div className={`fixed bottom-6 right-6 z-[1000] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold border transition-all animate-bounce ${
                    toastMsg.type === 'info'
                        ? 'bg-slate-900 text-white border-slate-700'
                        : 'bg-emerald-950 text-emerald-200 border-emerald-500/50'
                }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{toastMsg.text}</span>
                </div>
            )}
        </div>
    );
};

export default LiveProject;
