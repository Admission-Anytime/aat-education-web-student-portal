import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
    Clock,
    Award,
    BookOpen,
    GraduationCap,
    Palette,
    Calculator,
    Globe,
    Shield,
    Code,
    Smartphone,
    Settings,
    Users,
    ChevronRight,
    Star,
    X,
    Megaphone,
    Briefcase,
    CheckCircle2,
    Database,
    Zap,
    Cpu,
    ArrowRight,
    HelpCircle,
    Video,
    ShoppingCart,
    Languages,
    Search,
    ChevronDown,
    Sparkles,
    PhoneCall,
    BarChart3,
    Compass,
    Target,
    Download,
    Check,
    FileText,
    Rocket,
    Bot,
    Calendar,
    Monitor,
    Edit3,
    Plus,
    Trash2,
    ShieldCheck,
    Lock,
    Unlock,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import { courseApi, categoryApi } from '../../services/api';
import { getDeletedCourseIds } from '../../data/coursesData';


const courseCategories = [
    {
        id: 'software',
        label: 'Software & Web Development',
        icon: <Code className="w-4 h-4" />,
        eligibility: '12th / Diploma / BCA / B.Tech / MCA / Graduates / Career Changers',
        desc: 'Industry-ready software engineering, full stack web development, responsive interface design, and mobile applications.',
        activeGrad: 'from-blue-600 to-indigo-600',
        activeShadow: 'shadow-blue-500/30',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/90',
        iconColor: 'text-blue-600',
        headerGrad: 'from-blue-600 via-indigo-600 to-cyan-500'
    },
    {
        id: 'ai-data',
        label: 'AI, Data & Cloud',
        icon: <Cpu className="w-4 h-4" />,
        eligibility: '12th / Diploma / BCA / B.Tech / B.Sc / Graduates / Working Professionals',
        desc: 'Cutting-edge Generative AI, Data Science & Business Intelligence, Cloud DevOps architecture, and Cyber Security defense.',
        activeGrad: 'from-purple-600 to-violet-600',
        activeShadow: 'shadow-purple-500/30',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/90',
        iconColor: 'text-purple-600',
        headerGrad: 'from-purple-600 via-violet-600 to-fuchsia-500'
    },
    {
        id: 'design',
        label: 'Design, UI/UX & Media',
        icon: <Palette className="w-4 h-4" />,
        eligibility: '10th / 12th / Diploma / Graduates / Creative Enthusiasts / Design Aspirants',
        desc: 'Digital product UI/UX with Figma, user research, visual branding with Photoshop/Illustrator, and cinematic video editing.',
        activeGrad: 'from-rose-600 to-pink-600',
        activeShadow: 'shadow-rose-500/30',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/90',
        iconColor: 'text-rose-600',
        headerGrad: 'from-rose-600 via-pink-600 to-rose-400'
    },
    {
        id: 'marketing',
        label: 'Digital Marketing & E-Commerce',
        icon: <Megaphone className="w-4 h-4" />,
        eligibility: '12th / Graduates / Entrepreneurs / Marketers / Freelancers',
        desc: 'End-to-end performance marketing, SEO, Google Ads, Meta advertising, and multi-channel e-commerce store scaling.',
        activeGrad: 'from-amber-500 to-orange-500',
        activeShadow: 'shadow-amber-500/30',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/90',
        iconColor: 'text-amber-600',
        headerGrad: 'from-amber-500 via-orange-500 to-yellow-500'
    },
    {
        id: 'business',
        label: 'Accounting & Business Skills',
        icon: <Calculator className="w-4 h-4" />,
        eligibility: '10th / 12th / B.Com / BBA / Non-Commerce / Business Owners / Office Executives',
        desc: 'Computerized accounting with TallyPrime, GST taxation compliance, banking reconciliation, and Advanced Excel workplace skills.',
        activeGrad: 'from-emerald-600 to-teal-600',
        activeShadow: 'shadow-emerald-500/30',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
        iconColor: 'text-emerald-600',
        headerGrad: 'from-emerald-600 via-teal-600 to-emerald-400'
    },
    {
        id: 'technical',
        label: 'Technical CAD & IT Support',
        icon: <Settings className="w-4 h-4" />,
        eligibility: 'ITI / Polytechnic / Diploma / B.Tech / 10th–12th with Technical Interest',
        desc: 'Precision AutoCAD 2D/3D engineering drafting, computer hardware troubleshooting, and enterprise network administration.',
        activeGrad: 'from-cyan-600 to-sky-600',
        activeShadow: 'shadow-cyan-500/30',
        badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200/90',
        iconColor: 'text-cyan-600',
        headerGrad: 'from-cyan-600 via-sky-600 to-blue-500'
    },
    {
        id: 'languages',
        label: 'Foreign Languages & Test Prep',
        icon: <Languages className="w-4 h-4" />,
        eligibility: 'Open to All Students, Study-Abroad Aspirants, Professionals & Language Enthusiasts',
        desc: 'Global language proficiencies in German, French, and Japanese, alongside standardized IELTS and PTE exam preparation.',
        activeGrad: 'from-indigo-600 to-blue-700',
        activeShadow: 'shadow-indigo-500/30',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/90',
        iconColor: 'text-indigo-600',
        headerGrad: 'from-indigo-600 via-blue-700 to-violet-600'
    },
    {
        id: 'shortterm',
        label: 'Short-Term & Professional Skills',
        icon: <Briefcase className="w-4 h-4" />,
        eligibility: 'Job Seekers, College Students, Working Professionals & Career Starters',
        desc: 'Fast-track career-ready certifications: workplace communication, interview readiness, and essential digital productivity skills.',
        activeGrad: 'from-teal-600 to-emerald-600',
        activeShadow: 'shadow-teal-500/30',
        badgeColor: 'bg-teal-50 text-teal-800 border-teal-200/90',
        iconColor: 'text-teal-600',
        headerGrad: 'from-teal-600 via-emerald-600 to-green-400'
    }
];

// All 22 Courses organized with complete rich metadata and exact 1-line descriptions
const categoryCourses = {
    // 1. SOFTWARE & WEB DEVELOPMENT (Courses 2, 6, 10 & Frontend UI)
    software: [
        {
            id: 2,
            name: "Software & Full Stack Development",
            subgroup: "Full Stack & Web Engineering",
            oneLiner: "Build modern web applications using programming, frontend, backend, APIs and full stack technologies.",
            icon: <Code className="w-5 h-5" />,
            image: '/course_mern.jpg',
            popular: true,
            path: "/it-stack-development",
            skills: ["Programming", "Web Development", "Full Stack", "React", "Node.js", "REST APIs", "SQL/NoSQL"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / BCA / B.Tech / MCA / Graduates",
            careerAreas: "Full Stack Developer, Software Engineer, Backend Engineer, Web Developer",
            details: "Master end-to-end software development from frontend architecture to backend APIs, database management, and scalable cloud deployment.",
            features: ["Programming Fundamentals", "Web Development Architecture", "Frontend (React/Next.js)", "Backend & RESTful APIs", "SQL & NoSQL Databases", "Full Stack Capstone Projects"],
            certification: "Certified Full Stack Software Developer"
        },
        {
            id: 6,
            name: "Web Designing",
            subgroup: "Web & Frontend Design",
            oneLiner: "Create modern, responsive and user-friendly websites using HTML, CSS, JavaScript and modern web tools.",
            icon: <Globe className="w-5 h-5" />,
            image: '/course_web_design.jpg',
            popular: true,
            path: "/web-development",
            skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "WordPress", "Bootstrap", "Web Hosting"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Any Stream / Creative Aspirants",
            careerAreas: "Web Designer, Frontend Specialist, WordPress Developer, UI Layout Designer",
            details: "Build dynamic, responsive, and mobile-friendly websites with clean semantic HTML5, CSS3, modern JavaScript, and WordPress CMS themes.",
            features: ["HTML5 & Modern CSS3 Layouts", "Responsive Mobile-First Design", "Core JavaScript & DOM Events", "CSS Flexbox & CSS Grid Mastery", "WordPress Setup & Theme Customization", "Live Website Deployment"],
            certification: "Certified Professional Web Designer"
        },
        {
            id: 10,
            name: "Mobile App Development",
            subgroup: "Mobile Applications",
            oneLiner: "Learn to design and develop Android and cross-platform mobile applications using modern technologies.",
            icon: <Smartphone className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
            popular: true,
            path: "/app-development",
            skills: ["Android", "Kotlin", "Flutter", "React Native", "Firebase", "REST APIs", "Play Store"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / IT Diploma / BCA / B.Tech / Enthusiasts",
            careerAreas: "Mobile App Developer, Flutter Engineer, Android Developer, Cross-Platform Specialist",
            details: "Create high-performance native Android and cross-platform iOS/Android apps using Kotlin, Flutter, and React Native with Firebase backend integration.",
            features: ["Android Architecture & Kotlin", "Cross-Platform Flutter & Dart", "React Native Architecture", "State Management & App Lifecycle", "REST APIs & Cloud Database Sync", "Play Store Publishing Workflow"],
            certification: "Certified Mobile Application Developer"
        },
        {
            id: 101,
            name: "Python Full Stack & Django Engineering",
            subgroup: "Backend & Web Architecture",
            oneLiner: "Build robust, scalable backend web applications, REST APIs, and database-driven portals with Python & Django.",
            icon: <Code className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
            popular: true,
            path: "/python-programming",
            skills: ["Python", "Django", "PostgreSQL", "REST APIs", "Docker", "Git", "Celery"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / Diploma / BCA / B.Tech / MCA / Graduates",
            careerAreas: "Python Developer, Backend Engineer, Django Specialist, Full Stack Engineer",
            details: "Master end-to-end Python web development with the Django framework, ORM database modeling, RESTful API design, authentication, and cloud deployment.",
            features: ["Python Programming Core & Advanced", "Django Architecture & MVT Pattern", "PostgreSQL Database & Django ORM", "Building & Consuming REST APIs", "Asynchronous Tasks with Celery & Redis", "Cloud Deployment on AWS & Heroku"],
            certification: "Certified Python Full Stack Engineer"
        },
        {
            id: 102,
            name: "Java Enterprise Full Stack & Spring Boot",
            subgroup: "Enterprise Software Engineering",
            oneLiner: "Master enterprise Java programming, Spring Boot microservices, Hibernate ORM, and full-stack React integration.",
            icon: <Database className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
            popular: false,
            skills: ["Core Java", "Spring Boot", "Microservices", "Hibernate", "React", "MySQL", "Kafka"],
            level: "Intermediate to Advanced",
            duration: "5–6 Months",
            eligibility: "Diploma / BCA / B.Tech / MCA / Java Aspirants",
            careerAreas: "Java Developer, Spring Boot Specialist, Enterprise Software Architect",
            details: "Build high-concurrency enterprise software with Core & Advanced Java, Spring Boot microservices ecosystem, Hibernate JPA, and scalable database backends.",
            features: ["OOPs & Java 17+ Modern Features", "Spring Boot Microservices Architecture", "Hibernate JPA & Relational Databases", "Spring Security & JWT Authentication", "Event-Driven Systems with Apache Kafka", "Frontend Integration with Modern React"],
            certification: "Certified Java Enterprise Architect"
        },
        {
            id: 103,
            name: "MERN Stack & Next.js 14 Full Stack Specialist",
            subgroup: "Modern JavaScript Stacks",
            oneLiner: "Develop cutting-edge full-stack web applications with MongoDB, Express.js, React 18, Node.js and Next.js 14 App Router.",
            icon: <Rocket className="w-5 h-5" />,
            image: "/course_mern.jpg",
            popular: true,
            skills: ["MongoDB", "Express", "React 18", "Node.js", "Next.js 14", "TypeScript", "Tailwind CSS"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / Graduates / BCA / B.Tech / Frontend Developers",
            careerAreas: "MERN Stack Developer, Next.js Engineer, Full Stack JavaScript Developer",
            details: "Comprehensive hands-on training covering the modern JavaScript ecosystem from React components and Next.js server actions to Node/Express microservices.",
            features: ["React 18 Hooks & State Architecture", "Next.js 14 App Router & SSR/SSG", "RESTful & GraphQL API Architecture", "MongoDB NoSQL Aggregation Pipelines", "TypeScript for Production Stacks", "Complete Live Production Deployment"],
            certification: "Certified MERN & Next.js Specialist"
        }
    ],

    // 2. AI, DATA & CLOUD (Courses 1, 3, 4, 5)
    'ai-data': [
        {
            id: 1,
            name: "Artificial Intelligence & Generative AI",
            subgroup: "Artificial Intelligence",
            oneLiner: "Learn Generative AI, AI tools, prompt engineering and practical AI applications for modern work and business.",
            icon: <Cpu className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["AI", "Generative AI", "AI Tools", "Automation", "Prompt Engineering", "LLMs", "Custom GPTs"],
            level: "Beginner to Advanced",
            duration: "3–6 Months",
            eligibility: "12th / BCA / B.Tech / Working Professionals / Business Owners",
            careerAreas: "AI Specialist, Prompt Engineer, AI Automation Consultant, AI Product Lead",
            details: "Comprehensive hands-on training on large language models (LLMs), prompt engineering frameworks, OpenAI APIs, workflow automations, and practical generative tools.",
            features: ["Generative AI & LLM Architecture", "Advanced Prompt Engineering Frameworks", "AI Workflow Automation (Make/Zapier)", "OpenAI APIs & Custom GPT Development", "AI Image & Video Generation Tools", "Enterprise AI Implementation Use Cases"],
            certification: "Certified Generative AI & Automation Specialist"
        },
        {
            id: 3,
            name: "Data Science, Data Analytics & Business Intelligence",
            subgroup: "Data Science & BI",
            oneLiner: "Learn Python, SQL, Power BI, data visualization and analytics to turn data into useful business insights.",
            icon: <BarChart3 className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Python", "SQL", "Power BI", "Data Analytics", "Machine Learning", "Pandas", "Excel"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "Graduates / B.Sc / B.Com / BCA / B.Tech / Analysts",
            careerAreas: "Data Analyst, BI Developer, Data Scientist, Business Analytics Specialist",
            details: "Transform complex enterprise data into decision-ready business intelligence through Python data science stacks, advanced SQL queries, and Power BI interactive reports.",
            features: ["Python for Data Analysis (NumPy, Pandas)", "Enterprise SQL Querying & Aggregations", "Power BI DAX & Interactive Dashboards", "Statistical Analysis & EDA Techniques", "Intro to Machine Learning Models", "Real-World Business Intelligence Projects"],
            certification: "Certified Data Science & BI Professional"
        },
        {
            id: 4,
            name: "Cyber Security & Networking",
            subgroup: "Security & Networking",
            oneLiner: "Build foundational skills in networking, cyber security, ethical hacking concepts and digital protection.",
            icon: <Shield className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Cyber Security", "Ethical Hacking", "Networking", "Security", "Firewalls", "Wireshark", "Kali Linux"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / IT Diploma / BCA / B.Tech / Tech Enthusiasts",
            careerAreas: "Cyber Security Analyst, Network Security Engineer, Ethical Hacker, SOC Analyst",
            details: "Master cybersecurity principles, network protocols, defensive architecture, ethical hacking penetration tools, and threat protection best practices.",
            features: ["Network Protocols & TCP/IP Architecture", "Ethical Hacking & Penetration Testing", "Kali Linux & Vulnerability Scanning", "Firewalls, VPNs & IDS/IPS Systems", "Threat Detection & SOC Fundamentals", "Web Application Security (OWASP Top 10)"],
            certification: "Certified Cyber Security & Network Defense Specialist"
        },
        {
            id: 5,
            name: "Cloud Computing & DevOps",
            subgroup: "Cloud & Infrastructure",
            oneLiner: "Learn cloud platforms, Linux, Docker, deployment, CI/CD and essential DevOps practices.",
            icon: <Zap className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["AWS", "Azure", "Linux", "Docker", "DevOps", "Cloud", "CI/CD", "Kubernetes"],
            level: "Intermediate to Advanced",
            duration: "4–6 Months",
            eligibility: "Diploma / BCA / B.Tech / SysAdmins / Developers",
            careerAreas: "Cloud Engineer, DevOps Engineer, AWS Solutions Specialist, Site Reliability Engineer",
            details: "Design and orchestrate resilient cloud architectures on AWS and Azure with Docker containerization, Linux sysadmin fundamentals, and CI/CD pipelines.",
            features: ["AWS & Azure Cloud Architecture", "Linux Administration & Bash Scripting", "Docker Containerization & Multi-Stage Builds", "Kubernetes Cluster Orchestration", "CI/CD Pipeline Automation (GitHub Actions/Jenkins)", "Infrastructure as Code (IaC) & Cloud Security"],
            certification: "Certified Cloud Architect & DevOps Practitioner"
        },
        {
            id: 104,
            name: "Machine Learning & Deep Learning Specialist",
            subgroup: "Machine Learning & Neural Networks",
            oneLiner: "Master predictive modeling, deep learning architectures, CNNs, NLP, PyTorch, and TensorFlow from scratch.",
            icon: <Cpu className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Scikit-Learn"],
            level: "Intermediate to Advanced",
            duration: "4–6 Months",
            eligibility: "BCA / B.Tech / B.Sc / Math or Tech Graduates / Programmers",
            careerAreas: "Machine Learning Engineer, Deep Learning Specialist, NLP Developer, Computer Vision Engineer",
            details: "Hands-on implementation of machine learning algorithms, deep neural network architectures, image classification with CNNs, natural language processing with Transformers, and model deployment.",
            features: ["Supervised & Unsupervised Machine Learning", "Neural Networks & Backpropagation Math", "TensorFlow & PyTorch Deep Learning Pipelines", "Computer Vision & Object Detection (YOLO/OpenCV)", "NLP & Transformers (BERT/HuggingFace)", "MLOps Model Deployment & Monitoring"],
            certification: "Certified Machine Learning & Deep Learning Specialist"
        },
        {
            id: 105,
            name: "Big Data Engineering & Apache Spark",
            subgroup: "Data Engineering Architecture",
            oneLiner: "Design distributed data pipelines, ETL workflows, data lakes, and streaming architectures with Spark and Hadoop.",
            icon: <Database className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            popular: false,
            skills: ["Apache Spark", "Hadoop", "PySpark", "Kafka", "Data Warehousing", "Snowflake", "ETL Pipelines"],
            level: "Advanced",
            duration: "4–5 Months",
            eligibility: "Software Developers, Data Analysts, SysAdmins, B.Tech / MCA",
            careerAreas: "Big Data Engineer, Data Platform Architect, PySpark Developer, ETL Consultant",
            details: "Master distributed computing architectures to process massive enterprise data streams with Hadoop HDFS, PySpark DataFrames, real-time Kafka event streaming, and cloud data warehouses.",
            features: ["Hadoop Ecosystem & Distributed Storage", "Apache Spark Core & PySpark DataFrames", "Real-Time Streaming with Apache Kafka", "Data Lakehouse Architecture (Delta Lake/Snowflake)", "Airflow Orchestration & Automated ETL", "Enterprise Big Data Capstone Implementation"],
            certification: "Certified Big Data & Distributed Systems Engineer"
        }
    ],

    // 3. DESIGN, UI/UX & MEDIA (Courses 7, 8, 9 & Motion Graphics)
    design: [
        {
            id: 7,
            name: "UI/UX & Product Design",
            subgroup: "Product & Interface Design",
            oneLiner: "Design intuitive websites and mobile products through UX research, Figma, wireframing and prototyping.",
            icon: <Palette className="w-5 h-5" />,
            image: '/course_ui_ux.jpg',
            popular: true,
            path: "/ui-ux-design",
            skills: ["Figma", "UX Research", "Wireframing", "Prototyping", "Product Design", "Design Systems", "Usability Testing"],
            level: "Beginner to Advanced",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Any Stream / Creative Design Aspirants",
            careerAreas: "UI/UX Designer, Product Designer, Interaction Designer, Figma Specialist",
            details: "Transform complex user problems into intuitive digital experiences using industry-standard design thinking, Figma auto-layouts, micro-interactions, and design systems.",
            features: ["User Research & Empathy Mapping", "Information Architecture & User Journeys", "Wireframing & Low/High Fidelity UI", "Interactive Prototyping in Figma", "Building Scalable Design Systems", "Usability Testing & Real Client Case Studies"],
            certification: "Certified UI/UX Product Designer"
        },
        {
            id: 8,
            name: "Graphic Design & Branding",
            subgroup: "Visual & Brand Identity",
            oneLiner: "Develop professional visual communication skills in Photoshop, Illustrator, CorelDRAW, branding and digital design.",
            icon: <Palette className="w-5 h-5" />,
            image: '/course_graphic_design.jpg',
            popular: true,
            skills: ["Photoshop", "Illustrator", "CorelDRAW", "Branding", "Creative Design", "Typography", "Print Media"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Any Graduate / Creative Aspirants",
            careerAreas: "Graphic Designer, Brand Identity Designer, Visual Communicator, Print Production Lead",
            details: "Master digital aesthetics, vector typography, brand style guides, photo manipulation, social media banners, and commercial print design.",
            features: ["Adobe Photoshop Photo Manipulation", "Adobe Illustrator Vector Graphic Art", "CorelDRAW Vector & Print Layouts", "Brand Identity & Logo Creation", "Social Media Creatives & Ad Assets", "Commercial Print Production Guidelines"],
            certification: "Certified Graphic & Brand Designer"
        },
        {
            id: 9,
            name: "Video Editing & Motion Graphics",
            subgroup: "Video & Motion Media",
            oneLiner: "Create professional videos, reels, motion graphics and digital content using modern editing tools.",
            icon: <Video className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Premiere Pro", "After Effects", "Motion Graphics", "Reels", "Color Grading", "Sound Design", "VFX"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Content Creators / Media Enthusiasts",
            careerAreas: "Video Editor, Motion Graphics Artist, YouTube Content Creator, Reels & Video Producer",
            details: "Produce viral short-form social reels, YouTube productions, motion typography, and corporate video packages with Adobe Premiere Pro and After Effects.",
            features: ["Adobe Premiere Pro Timeline Editing", "Adobe After Effects Motion Animations", "Color Grading & Cinematic LUTs", "Sound Design & Audio Mastering", "Kinetic Typography & Lower Thirds", "Short-Form Reels & Long-Form Video Projects"],
            certification: "Certified Video Editor & Motion Artist"
        },
        {
            id: 106,
            name: "3D Animation & Visual Effects (VFX)",
            subgroup: "3D Art & CGI Media",
            oneLiner: "Create photorealistic 3D models, character animation, CGI environments, and visual effects using Blender and Maya.",
            icon: <Sparkles className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Blender", "Autodesk Maya", "3D Modeling", "Texturing", "Character Animation", "VFX Compositing"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "10th / 12th / Creative Aspirants / Designers / Animators",
            careerAreas: "3D Modeler, Character Animator, VFX Artist, Lighting & Rendering Specialist",
            details: "Master digital 3D sculpting, polygon modeling, PBR texturing, rigging, character keyframing, dynamic fluid simulations, and cinematic VFX compositing in Blender and Autodesk Maya.",
            features: ["Hard Surface & Organic 3D Modeling", "PBR Shading, UV Unwrapping & Substance Textures", "Biped Character Rigging & Weight Painting", "Keyframe Animation & Walk Cycles", "Particle Simulations, Smoke & Fire Dynamics", "Cycles & Arnold Lighting and Final Rendering"],
            certification: "Certified 3D Animation & VFX Artist"
        }
    ],

    // 4. DIGITAL MARKETING & E-COMMERCE (Courses 11, 12 & Social/SEO)
    marketing: [
        {
            id: 11,
            name: "Digital Marketing & Performance Marketing",
            subgroup: "Performance & Digital Marketing",
            oneLiner: "Learn SEO, Google Ads, Meta Ads, social media, content and performance marketing for digital growth.",
            icon: <Megaphone className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            popular: true,
            path: "/digital-marketing",
            skills: ["SEO", "Google Ads", "Meta Ads", "Social Media", "Performance Marketing", "Content Strategy", "Analytics"],
            level: "Beginner to Advanced",
            duration: "3–5 Months",
            eligibility: "12th / Graduates / Marketing Enthusiasts / Business Owners",
            careerAreas: "Performance Marketer, SEO Specialist, PPC Campaign Manager, Digital Growth Strategist",
            details: "Execute ROI-driven growth marketing campaigns across Google Search, Meta Ads, organic search engine optimization, content funnels, and web analytics.",
            features: ["Search Engine Optimization (On-Page & Off-Page)", "Google Search, Display & Video Ads", "Meta (Facebook & Instagram) Ad Campaigns", "Social Media Strategy & Content Marketing", "Conversion Rate Optimization (CRO)", "Google Analytics 4 & Tag Manager Tracking"],
            certification: "Certified Performance Marketing Specialist"
        },
        {
            id: 12,
            name: "E-Commerce & Digital Business",
            subgroup: "E-Commerce & Marketplaces",
            oneLiner: "Learn Shopify, WooCommerce, marketplace operations, e-commerce marketing and online business fundamentals.",
            icon: <ShoppingCart className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Shopify", "WooCommerce", "Marketplaces", "E-Commerce Marketing", "Amazon", "Product Listing", "Dropshipping"],
            level: "Beginner to Intermediate",
            duration: "2–3 Months",
            eligibility: "12th / Graduates / Entrepreneurs / Business Owners",
            careerAreas: "E-Commerce Manager, Shopify Store Specialist, Marketplace Operations Executive, D2C Brand Builder",
            details: "Build, launch, and scale profitable digital stores on Shopify, WooCommerce, and leading marketplaces like Amazon with automated payment gateways and logistics.",
            features: ["Shopify Store Setup & Optimization", "WooCommerce WordPress Store Development", "Amazon & Flipkart Marketplace Listing", "Inventory, Logistics & Payment Gateways", "E-Commerce Ad Strategies & ROAS Scaling", "Dropshipping & Direct-to-Consumer (D2C) Basics"],
            certification: "Certified E-Commerce Business Executive"
        },
        {
            id: 107,
            name: "Growth Hacking & Performance Scaling",
            subgroup: "Growth Marketing & Viral Strategy",
            oneLiner: "Scale digital brands through viral content strategies, influencer outreach, funnel optimization, and high-ROAS marketing.",
            icon: <Megaphone className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Growth Hacking", "Social Media Funnels", "Influencer Marketing", "Viral Video Strategy", "Brand Scaling", "Google Analytics 4"],
            level: "Beginner to Intermediate",
            duration: "2–3 Months",
            eligibility: "12th / Graduates / Marketing Aspirants / E-Commerce Founders",
            careerAreas: "Growth Hacker, Social Media Strategist, Influencer Marketer, Viral Content Lead",
            details: "Master rapid experimentation across marketing funnels, viral reels frameworks, algorithmic social distribution, and data-driven customer acquisition.",
            features: ["AARRR Pirate Funnel Implementation", "Viral Short-Form Content Creation Workflows", "Influencer Campaign Negotiation & Tracking", "High-ROAS Meta Ads & Performance Max Setup", "Retention Marketing & Email Automation (Klaviyo)", "Omnichannel Analytics & Heatmap Optimization"],
            certification: "Certified Growth Marketing Strategist"
        }
    ],

    // 5. ACCOUNTING, GST & BUSINESS FINANCE (Courses 13, 14 & MIS/Taxation)
    business: [
        {
            id: 14,
            name: "Accounting, GST & Business Finance",
            subgroup: "Accounting & GST Taxation",
            oneLiner: "Learn Tally Prime, computerized accounting, GST, billing, payroll and essential business finance skills.",
            icon: <Calculator className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
            popular: true,
            path: "/tally-accounting",
            skills: ["Tally Prime", "GST", "Accounting", "Billing", "Payroll", "TDS", "Balance Sheet"],
            level: "Beginner to Advanced",
            duration: "3–4 Months",
            eligibility: "10th / 12th / B.Com / Non-Commerce / Office Executives",
            careerAreas: "Accountant, GST Practitioner, Tally Executive, Tax Compliance Associate",
            details: "Hands-on computerized corporate accounting with TallyPrime, GST filing, e-way bills, inventory tracking, TDS deductions, and financial statement finalization.",
            features: ["Computerized Accounting with TallyPrime", "GST Computation, Invoicing & GSTR Filing", "TDS & TCS Statutory Compliance", "Inventory Valuation & Stock Management", "Payroll Processing & Employee Records", "Bank Reconciliation & Final Balance Sheets"],
            certification: "Certified Corporate Accountant & GST Specialist"
        },
        {
            id: 13,
            name: "Advanced Office & Business Skills",
            subgroup: "Office Productivity & Analytics",
            oneLiner: "Build practical workplace skills in MS Office, Advanced Excel, digital productivity and professional communication.",
            icon: <Briefcase className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["MS Office", "Advanced Excel", "AI Productivity", "Workplace Skills", "PowerPoint", "Word", "Email Etiquette"],
            level: "Beginner to Intermediate",
            duration: "2–3 Months",
            eligibility: "10th / 12th / Graduates / Job Seekers / Office Staff",
            careerAreas: "MIS Executive, Office Administrator, Executive Assistant, Operations Associate",
            details: "Master enterprise office productivity using Advanced Excel (XLOOKUP, Pivot Tables, Dashboards), professional business presentations, and AI-assisted workflows.",
            features: ["Advanced Excel (XLOOKUP, Formulas, Arrays)", "Dynamic Pivot Tables & Executive Dashboards", "Professional MS Word Business Formatting", "High-Impact MS PowerPoint Presentations", "AI Productivity Tools for Corporate Operations", "Workplace Email Etiquette & Communication"],
            certification: "Certified Advanced Business & Office Specialist"
        },
        {
            id: 108,
            name: "Financial Modeling & Corporate Valuation",
            subgroup: "Corporate Finance & Analytics",
            oneLiner: "Build dynamic 3-statement financial models, DCF valuations, and executive investment analysis dashboards in Excel.",
            icon: <Calculator className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Financial Modeling", "DCF Valuation", "M&A Analysis", "Excel Analytics", "Corporate Finance", "Sensitivity Analysis"],
            level: "Intermediate to Advanced",
            duration: "3–4 Months",
            eligibility: "B.Com / BBA / MBA / Finance Aspirants / Accounting Professionals",
            careerAreas: "Financial Analyst, Equity Research Associate, Investment Banking Analyst, Corporate Finance Executive",
            details: "Practical hands-on financial statement modeling, discounted cash flow (DCF) company valuations, leveraged buyout (LBO) fundamentals, and scenario forecasting.",
            features: ["Dynamic 3-Statement Financial Forecasting", "Discounted Cash Flow (DCF) Company Valuation", "Comparable Company & Precedent Transaction Analysis", "Sensitivity Matrices & Scenario Planning", "Executive Pitch Decks & Data Visualization", "Real-World M&A Deal Case Studies"],
            certification: "Certified Financial Modeling & Valuation Analyst"
        }
    ],

    // 6. TECHNICAL CAD & IT SUPPORT (Courses 15, 16 & 3D CAD/Networking)
    technical: [
        {
            id: 15,
            name: "AutoCAD & Technical Design",
            subgroup: "Engineering Drafting & CAD",
            oneLiner: "Develop practical CAD and technical drawing skills for engineering, architecture and technical design applications.",
            icon: <Compass className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["AutoCAD", "CAD", "Engineering Drawing", "Technical Design", "2D Drafting", "3D Modeling", "Civil/Mechanical"],
            level: "Beginner to Advanced",
            duration: "2–4 Months",
            eligibility: "ITI / Polytechnic / Diploma / B.Tech / 12th with Technical Interest",
            careerAreas: "CAD Drafter, Architectural CAD Designer, Civil/Mechanical CAD Technician",
            details: "Industry-standard precision CAD drafting for civil, mechanical, and architectural layouts: 2D floor plans, elevations, section views, and 3D modeling fundamentals.",
            features: ["AutoCAD 2D Precision Drafting & Coordinates", "Layer Management, Dimensions & Blocks", "Architectural Floor Plans & Elevations", "Mechanical Engineering Component Drawings", "3D Solid Modeling & Isometrics", "Plotting, Scale Standards & Construction Sheets"],
            certification: "Certified AutoCAD Technical Draftsman"
        },
        {
            id: 16,
            name: "Hardware, IT Support & System Administration",
            subgroup: "Hardware & IT Support",
            oneLiner: "Learn computer hardware, operating systems, troubleshooting, networking and essential IT support skills.",
            icon: <Settings className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Hardware", "IT Support", "Linux", "Windows", "Troubleshooting", "Networking", "System Admin"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Diploma / Tech Enthusiasts",
            careerAreas: "IT Support Engineer, Desktop Support Technician, Hardware Specialist, Network Admin",
            details: "Learn practical computer hardware assembly, OS installation (Windows & Linux), peripheral troubleshooting, LAN networking, and helpdesk support ticketing.",
            features: ["Computer Hardware Architecture & Assembly", "BIOS/UEFI & OS Installation (Windows/Linux)", "Peripheral Configuration & Hardware Diagnostics", "LAN Setup, Crimping, Routers & Switches", "Active Directory & User Permissions", "Enterprise Helpdesk & Troubleshooting Methods"],
            certification: "Certified IT Support & System Administrator"
        },
        {
            id: 109,
            name: "Revit Architecture & BIM 3D Modeling",
            subgroup: "Architectural BIM & Construction",
            oneLiner: "Learn building information modeling (BIM), parametric architectural drafting, schedules, and 3D detailing with Autodesk Revit.",
            icon: <Compass className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Autodesk Revit", "BIM Modeling", "Architectural 3D", "Structural Detailing", "Rendering", "Quantity Takeoffs"],
            level: "Beginner to Advanced",
            duration: "3–4 Months",
            eligibility: "Civil / Architecture Diploma, ITI Drafters, B.Tech, Design Students",
            careerAreas: "BIM Modeler, Revit Architectural Drafter, BIM Coordinator, 3D Building Visualizer",
            details: "Master parametric building information modeling (BIM) workflows: intelligent walls, curtain systems, structural framing, MEP coordination, component schedules, and realistic renderings.",
            features: ["Revit Parametric Modeling Fundamentals", "Architectural Floor Plans, Elevations & Sections", "Families Creation & Custom Component Design", "Automated Schedules & Material Quantity Takeoffs", "Enscape / V-Ray Photorealistic Rendering", "BIM Collaboration & Worksharing Standards"],
            certification: "Certified Revit Architecture & BIM Specialist"
        }
    ],

    // 7. FOREIGN LANGUAGES & TEST PREPARATION (Courses 17, 18, 19, 20, 21)
    languages: [
        {
            id: 17,
            name: "IELTS – English Proficiency Test Preparation",
            subgroup: "English Proficiency Tests",
            oneLiner: "Develop Listening, Reading, Writing and Speaking skills with structured IELTS preparation and mock practice.",
            icon: <Award className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["IELTS Academic", "IELTS General", "Listening", "Reading", "Writing", "Speaking", "Mock Tests"],
            level: "Structured Exam Preparation",
            duration: "1–3 Months",
            eligibility: "Students, Study-Abroad Aspirants, Work Visa Seekers",
            careerAreas: "Study Abroad (UK, Canada, Australia, US), Immigration, Global Careers",
            details: "Comprehensive preparation for both IELTS Academic & General tests covering all four modules: Listening, Reading, Writing (Task 1 & 2), and Speaking interview readiness.",
            features: ["Listening Section Strategies & Accent Training", "Skimming & Scanning Academic Reading Passages", "Task 1 (Reports/Letters) & Task 2 Essay Writing", "1-on-1 Interactive Speaking Mock Interviews", "Band Score Improvement Techniques", "Official Cambridge Mock Tests & Detailed Feedback"],
            certification: "IELTS Exam Readiness Certificate"
        },
        {
            id: 18,
            name: "PTE – Pearson Test of English",
            subgroup: "English Proficiency Tests",
            oneLiner: "Prepare for PTE Academic with focused practice in Speaking, Writing, Reading and Listening skills.",
            icon: <Languages className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["PTE Academic", "Speaking", "Reading", "Writing", "Listening", "AI Scoring", "Mock Tests"],
            level: "Structured Exam Preparation",
            duration: "1–2 Months",
            eligibility: "Students, Working Professionals, Visa Aspirants",
            careerAreas: "International Higher Education, Overseas Work Permits, PR Applications",
            details: "Master the computer-delivered PTE Academic test with AI scoring algorithms, templates, oral fluency drills, and scored full-length mock tests.",
            features: ["Read Aloud, Repeat Sentence & Pronunciation", "Summarize Written Text & Structured Essays", "Re-order Paragraphs & Fill in the Blanks", "Write from Dictation & Listening Drills", "AI Scoring Strategies & Time Management", "Computer Lab Mock Exams with Analysis"],
            certification: "PTE Academic Prep Certificate"
        },
        {
            id: 19,
            name: "German Language",
            subgroup: "Foreign Languages",
            oneLiner: "Learn German from A1 to B2 with structured training in communication, grammar, vocabulary and practical language skills.",
            icon: <Languages className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["A1 Level", "A2 Level", "B1 Level", "B2 Level", "German Grammar", "Spoken German", "Goethe Prep"],
            level: "A1 to B2 (Common European Framework)",
            duration: "2–6 Months (Per Level / Package)",
            eligibility: "Students aiming for Germany, Job Seekers, Nurses & Engineers",
            careerAreas: "Higher Education in Germany, EU Work Opportunities, Translation, Bilingual Specialist",
            details: "Structured CEFR-aligned German language program from beginner A1 to advanced B2 with emphasis on everyday conversational fluency, German grammar, and Goethe-Zertifikat exam prep.",
            features: ["A1 Beginner (Basic Sentences, Self-Intro, Daily Routines)", "A2 Elementary (Social Conversations, Work Situations)", "B1 Intermediate (Independent Communication, Job Interviews)", "B2 Upper-Intermediate (Fluent Workplace & Academic German)", "Goethe & Telc Examination Preparation", "Interactive Speaking Practice & Audio Sessions"],
            certification: "German Language CEFR Certificate (A1–B2)"
        },
        {
            id: 20,
            name: "French Language",
            subgroup: "Foreign Languages",
            oneLiner: "Develop French language skills from A1 to B2 through practical speaking, listening, reading and writing practice.",
            icon: <Languages className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["A1 Level", "A2 Level", "B1 Level", "B2 Level", "DELF Prep", "French Phonetics", "Conversation"],
            level: "A1 to B2 (CEFR Aligned)",
            duration: "2–6 Months (Per Level / Package)",
            eligibility: "Canada Immigration (TEF/TCF), European Studies, Enthusiasts",
            careerAreas: "Canada PR Aspirants (Express Entry), International Diplomacy, Hospitality, MNC Careers",
            details: "Learn the language of international culture, business, and diplomacy. Complete training covering DELF exam formats, French phonetics, sentence structuring, and fluent conversations.",
            features: ["A1-A2 Foundational French Grammar & Phonetics", "B1-B2 Professional French for Corporate & Diplomatic Use", "Listening Comprehension with Native Audio Clips", "French Writing, Essay Formats & Email Drafting", "DELF / TEF / TCF Canada Exam Orientation", "Cultural Insights & Interactive Role-Plays"],
            certification: "French Language CEFR Certificate (A1–B2)"
        },
        {
            id: 21,
            name: "Japanese Language",
            subgroup: "Foreign Languages",
            oneLiner: "Learn Japanese from N5 to N2 with structured training in communication, grammar, vocabulary, Kanji and practical Japanese.",
            icon: <Languages className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["N5 Level", "N4 Level", "N3 Level", "N2 Level", "Hiragana", "Katakana", "Kanji", "JLPT Prep"],
            level: "N5 to N2 (JLPT Aligned)",
            duration: "3–6 Months (Per Level)",
            eligibility: "IT Professionals, Japan Career Aspirants, Manga & Anime Enthusiasts",
            careerAreas: "IT Careers in Tokyo, Japanese MNCs, Technical Translation, Bilingual Coordinator",
            details: "Master Japanese script (Hiragana, Katakana, Kanji), grammar particles, polite corporate speech (Keigo), and preparation for the worldwide JLPT (Japanese Language Proficiency Test).",
            features: ["Hiragana & Katakana Script Mastery", "Essential Kanji Characters & Vocabulary Stacks", "Japanese Sentence Construction & Particles", "JLPT Exam Preparation (N5, N4, N3, N2 Levels)", "Conversational Practice for Japan Work Visas", "Japanese Business Etiquette & Culture"],
            certification: "Japanese Language JLPT Prep Certificate (N5–N2)"
        },
        {
            id: 110,
            name: "Spanish Language (DELE A1–B2)",
            subgroup: "Foreign Languages",
            oneLiner: "Learn conversational and professional Spanish from A1 to B2 aligned with official Instituto Cervantes DELE standards.",
            icon: <Languages className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Spanish A1", "Spanish A2", "Spanish B1", "DELE Prep", "Spoken Spanish", "Grammar", "Phonetics"],
            level: "A1 to B2 (CEFR Aligned)",
            duration: "3–6 Months",
            eligibility: "Open to All Students, Travel Enthusiasts, Latin America Career Seekers",
            careerAreas: "International Trade, Bilingual Customer Support, Translation, Tourism & Hospitality",
            details: "Comprehensive Spanish training covering Spanish phonetics, verb conjugations (present, past, subjunctive), conversational vocabulary, and official DELE exam preparation.",
            features: ["A1-A2 Everyday Conversational Spanish", "B1-B2 Business & Academic Spanish Fluency", "Listening Comprehension with Native Podcasts", "Spanish Writing & Corporate Email Drafting", "DELE Exam Strategy & Mock Tests", "Cultural Immersion & Interactive Role-Plays"],
            certification: "Spanish Language CEFR Certificate (A1–B2)"
        }
    ],

    // 8. SHORT-TERM & PROFESSIONAL SKILLS (Course 22 & Targeted Rapid Tracks)
    shortterm: [
        {
            id: 22,
            name: "Short-Term & Professional Skills",
            subgroup: "Professional Upskilling Bootcamp",
            oneLiner: "Upgrade your career with focused short-term training in digital, office, communication, AI and professional skills.",
            icon: <Briefcase className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Quick Skills", "Career Skills", "Professional Upskilling", "Interview Prep", "AI Productivity", "Communication"],
            level: "All Levels (Rapid Bootcamps)",
            duration: "2–4 Weeks",
            eligibility: "Job Seekers, College Students, Working Professionals, Career Starters",
            careerAreas: "Immediate Job Readiness, Career Transition, Enhanced Workplace Productivity",
            details: "Accelerated skill development bootcamps designed for job seekers, working professionals, and students needing rapid career upskilling.",
            features: ["Quick Practical Technical Skills", "Interview & CV Preparation", "Corporate Workplace Communication", "Digital Productivity Tools", "Professional Upskilling Certifications"],
            certification: "Professional Skill Certificate"
        },
        {
            id: 23,
            name: "AI Productivity & Office Automation Bootcamp",
            subgroup: "AI Workplace Tools",
            oneLiner: "Master ChatGPT, Copilot, prompt frameworks, and smart automation to speed up daily office and business workflows.",
            icon: <Cpu className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["ChatGPT", "MS Copilot", "Prompting", "Workflow Automation", "Canva AI", "Excel AI"],
            level: "Beginner to Intermediate",
            duration: "2–4 Weeks",
            eligibility: "Students, Working Professionals, Business Owners, Freelancers",
            careerAreas: "AI-Powered Workplace Efficiency, Smart Automation, Modern Executive Assistant",
            details: "Supercharge your productivity with practical hands-on generative AI tools, prompt engineering templates, and automated workflows for everyday office tasks.",
            features: ["ChatGPT & Copilot for Business Documents", "Data Analysis & Presentation Automation", "AI Email Drafting & Minutes of Meeting", "Custom AI Prompts for Faster Workflows", "AI Image & Graphic Generation Tools"],
            certification: "Certified AI Workplace Productivity Specialist"
        },
        {
            id: 24,
            name: "Executive Communication & Interview Mastery",
            subgroup: "Career Acceleration",
            oneLiner: "Sharpen corporate communication, dynamic public speaking, resume optimization, and high-impact interview skills.",
            icon: <Users className="w-5 h-5" />,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Corporate Communication", "Interview Mastery", "Resume ATS", "Public Speaking", "Email Etiquette"],
            level: "All Levels",
            duration: "2–3 Weeks",
            eligibility: "Fresh Graduates, Job Aspirants, Corporate Employees, Team Leads",
            careerAreas: "MNC Placement Readiness, Leadership Presence, Confident Professional Communication",
            details: "Intensive career preparation bootcamp featuring mock interviews, personalized body language coaching, ATS resume building, and corporate verbal fluency.",
            features: ["1-on-1 Mock Interviews & Feedback", "ATS-Friendly Resume & LinkedIn Optimization", "Corporate Email & Meeting Etiquette", "Public Speaking & Presentation Skills", "Salary Negotiation & Offer Evaluation"],
            certification: "Certified Professional Communication & Interview Specialist"
        },
        {
            id: 111,
            name: "Agile Scrum Master & Product Management Sprint",
            subgroup: "Agile Leadership & Tech Management",
            oneLiner: "Learn Scrum frameworks, agile sprint ceremonies, user story mapping, JIRA backlog management, and PSM I exam preparation.",
            icon: <Target className="w-5 h-5" />,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Scrum Master", "Agile Methodology", "JIRA", "Sprint Planning", "Product Backlog", "Kanban", "User Stories"],
            level: "All Levels (Professional Bootcamp)",
            duration: "3–4 Weeks",
            eligibility: "Software Engineers, Team Leads, QA Engineers, Aspiring Scrum Masters",
            careerAreas: "Scrum Master, Agile Project Manager, Product Owner Associate, Agile Coach",
            details: "Intensive career-ready certification training in Scrum theory, daily standups, sprint reviews, retrospectives, story point estimation, and real enterprise JIRA project simulations.",
            features: ["Scrum Artifacts & Ceremonies in Practice", "JIRA & Confluence Agile Project Management", "User Story Mapping & Acceptance Criteria", "Sprint Velocity & Burndown Chart Tracking", "PSM I & CSM Certification Exam Prep", "Real Agile Team Role-Playing Simulations"],
            certification: "Certified Agile & Scrum Master Practitioner"
        }
    ]
};

// In-Depth Category Spotlight, Practical Training Highlights & Covered Tools
const categorySpotlights = {
    software: {
        tag: "Software Engineering & Full Stack Track",
        title: "Industry-Standard Practical Software & Web Engineering",
        desc: "Our software development curriculum bridges theoretical foundations with enterprise application development. Students build end-to-end responsive web applications, design database architectures, integrate RESTful APIs, and deploy live production code to cloud environments.",
        highlights: [
            { title: "Live Production Projects", desc: "Build full-stack applications with React, Node.js, and modern databases." },
            { title: "Git & Version Control", desc: "Industry-standard GitHub workflows, pull requests, and CI/CD pipelines." },
            { title: "Clean Code & Architecture", desc: "Learn modular architecture, state management, and API best practices." },
            { title: "Job-Ready Tech Portfolio", desc: "Showcase deployed code repositories to recruiters and hiring managers." }
        ],
        tools: ["React.js", "Node.js", "JavaScript ES6+", "Next.js", "HTML5/CSS3", "Tailwind CSS", "MongoDB", "PostgreSQL", "Git/GitHub", "Flutter"],
        careerAdvice: "Software developers and full-stack engineers are in high demand across IT companies, startups, and product firms worldwide."
    },
    'ai-data': {
        tag: "Next-Gen AI, Analytics & Cloud Architecture",
        title: "Accelerate Your Future with Generative AI, Data Science & Cloud",
        desc: "Equip yourself with high-impact skills transforming modern enterprises. From deploying LLMs and automated AI agents to building Power BI executive dashboards, defending network infrastructures, and managing AWS/Azure cloud deployments.",
        highlights: [
            { title: "Generative AI & LLMs", desc: "Prompt engineering frameworks, custom GPTs, and AI workflow automation." },
            { title: "Actionable Data Insights", desc: "Advanced Python data analytics, SQL aggregations, and Power BI dashboards." },
            { title: "Defense & Threat Detection", desc: "Ethical hacking tools, penetration testing, firewalls, and SOC protocols." },
            { title: "Cloud & Container Systems", desc: "AWS infrastructure, Docker multi-stage builds, and CI/CD deployment pipelines." }
        ],
        tools: ["OpenAI APIs", "Python", "Power BI", "SQL", "Docker", "AWS", "Kali Linux", "Wireshark", "Pandas", "Kubernetes"],
        careerAdvice: "AI, cloud, and data professionals command top compensation packages and rapid career advancement across global tech ecosystems."
    },
    design: {
        tag: "Creative Product & Visual Design Track",
        title: "Craft Human-Centric UI/UX Products & Striking Visual Identities",
        desc: "Learn end-to-end digital product design and creative media production. From conducting empathic user research and wireframing in Figma to producing brand logos in Illustrator and editing cinematic reels in Premiere Pro.",
        highlights: [
            { title: "User-Centric Design Thinking", desc: "User personas, wireframing, interactive prototyping, and design systems." },
            { title: "Brand Identity & Vector Art", desc: "Logo design, color theory, typography, and marketing assets in Illustrator." },
            { title: "Cinematic Video Production", desc: "Multi-track timeline editing, audio sync, color grading, and motion graphics." },
            { title: "Client-Ready Design Case Studies", desc: "Publish polished Behance and Figma case studies for design agencies and tech firms." }
        ],
        tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Premiere Pro", "After Effects", "CorelDRAW", "Canva", "Whimsical"],
        careerAdvice: "Great designers transform how users interact with technology. UI/UX designers and creative leads enjoy vast opportunities across tech startups and agencies."
    },
    marketing: {
        tag: "Performance & Organic Growth Track",
        title: "Drive Measurable ROI with Performance Marketing & E-Commerce",
        desc: "Master customer acquisition, data-driven paid advertising, organic search ranking, and e-commerce growth. Run live campaign experiments across Google Search, Meta Ads, and optimize conversion funnels using Google Analytics 4.",
        highlights: [
            { title: "Paid Advertising Mastery", desc: "Design high-converting Meta and Google Search/Performance Max ad campaigns." },
            { title: "Organic SEO & Keyword Ranking", desc: "Technical audits, on-page optimization, content strategy, and GA4 tracking." },
            { title: "E-Commerce Store Scaling", desc: "Shopify setup, Amazon seller central, product listings, and order fulfillment." },
            { title: "Live Ad Budget Practice", desc: "Hands-on experience setting budgets, tracking ROAS, and continuous A/B split testing." }
        ],
        tools: ["Google Ads", "Meta Ads Manager", "GA4", "Semrush", "Shopify", "Amazon Seller Central", "Mailchimp", "Canva"],
        careerAdvice: "Performance marketers and e-commerce managers directly impact business revenue, making them indispensable to modern enterprises."
    },
    business: {
        tag: "Corporate Finance, Taxation & Office Productivity",
        title: "Master Enterprise Accounting, GST Compliance & Executive MIS",
        desc: "Gain hands-on expertise in computerized accounting, statutory taxation, and corporate data analysis. From day-to-day TallyPrime vouchers and GSTR filing to automating executive MIS reporting using Advanced Excel formulas and macros.",
        highlights: [
            { title: "TallyPrime & Real Invoicing", desc: "Company creation, ledger bookkeeping, inventory control, and balance sheet finalization." },
            { title: "GST & Statutory Compliance", desc: "Invoicing rules, input tax credit (ITC) calculations, and online GSTR return filing." },
            { title: "Executive MIS & Dashboards", desc: "Dynamic XLOOKUP, Pivot Tables, Power Query automation, and macro routines." },
            { title: "Payroll & Corporate Taxation", desc: "Salary structuring, TDS returns (24Q/26Q), PF/ESI calculations, and compliance forms." }
        ],
        tools: ["TallyPrime", "Advanced Excel", "Power Query", "GST Portal", "TRACES", "MS PowerPoint", "MS Word", "Google Sheets"],
        careerAdvice: "Every business, firm, and enterprise requires certified accountants, GST practitioners, and MIS specialists to maintain financial health."
    },
    technical: {
        tag: "Engineering CAD Drafting & Enterprise IT Support",
        title: "Precision Technical Drafting & Robust IT Infrastructure Management",
        desc: "Master computer-aided drafting and enterprise IT systems. Design accurate architectural and mechanical drawings in AutoCAD, and gain hardware troubleshooting, LAN networking, and Windows Server Active Directory expertise.",
        highlights: [
            { title: "AutoCAD 2D Drafting & Standards", desc: "Floor plans, elevations, dimensioning, cross-sections, and engineering tolerances." },
            { title: "3D Spatial Modeling", desc: "3D solids, isometric views, photorealistic architectural rendering, and presentations." },
            { title: "Hardware Assembly & Troubleshooting", desc: "Component diagnostics, BIOS configuration, OS installation, and peripheral setup." },
            { title: "Enterprise Server Administration", desc: "Active Directory, DHCP, DNS, IP subnetting, group policies, and IT helpdesk ticketing." }
        ],
        tools: ["AutoCAD 2D/3D", "Revit Architecture", "Windows Server", "Active Directory", "Linux", "Wireshark", "Cisco Packet Tracer"],
        careerAdvice: "Technical CAD drafters and IT support engineers are core pillars in architectural studios, manufacturing plants, and IT corporate offices."
    },
    languages: {
        tag: "Global Communication & Exam Readiness",
        title: "Achieve Fluency and International Test Certification",
        desc: "Open doors to international education, work permits, and global careers with certified language training. Structured preparation for IELTS, PTE, German (A1-B2), French (A1-B2), and Japanese (N5-N2) with native audio and interactive speaking drills.",
        highlights: [
            { title: "IELTS & PTE Target Scores", desc: "Proven strategies for Listening, Reading, Writing (Task 1 & 2), and Speaking interview readiness." },
            { title: "CEFR-Aligned European Languages", desc: "German and French from absolute beginner A1 to fluent professional B2 proficiency." },
            { title: "Japanese JLPT Preparation", desc: "Hiragana, Katakana, Kanji, sentence structures, and Japanese workplace etiquette." },
            { title: "1-on-1 Mock Interviews & Feedback", desc: "Individual speaking practice, accent neutralization, and official Cambridge/Pearson mock tests." }
        ],
        tools: ["Cambridge IELTS Materials", "Pearson PTE Software", "Goethe Prep Modules", "DELF/TEF Frameworks", "JLPT Kanji Drills", "Native Audio Labs"],
        careerAdvice: "Proficiency in foreign languages and high IELTS/PTE scores dramatically enhance study-abroad visa approvals, international jobs, and PR applications."
    },
    shortterm: {
        tag: "Rapid Career Acceleration & Professional Skills",
        title: "Fast-Track Professional Skills, AI Productivity & Interview Readiness",
        desc: "Accelerate your career readiness in just 2 to 4 weeks. Designed for job seekers, fresh graduates, and working professionals who want to sharpen their workplace productivity, master generative AI tools, polish interview skills, and build professional confidence.",
        highlights: [
            { title: "Generative AI Workplace Tools", desc: "Use ChatGPT, Copilot, and automation tools to draft reports, analyze data, and save hours daily." },
            { title: "1-on-1 Mock Interview Sessions", desc: "Rigorous interview preparation with HR-grade feedback, body language coaching, and confidence building." },
            { title: "ATS-Optimized Resume & LinkedIn", desc: "Craft keyword-rich resumes that beat ATS applicant tracking systems and optimize LinkedIn presence." },
            { title: "Workplace Communication Etiquette", desc: "Professional corporate emails, meeting participation, public speaking, and presentation skills." }
        ],
        tools: ["ChatGPT & AI Prompts", "Microsoft Copilot", "MS Office 365", "Google Workspace", "Canva", "LinkedIn ATS Tools", "Slack & Zoom"],
        careerAdvice: "Short-term targeted bootcamps offer the fastest return on investment, immediately transforming your resume and interview conversion rate."
    }
};

// 6 Core Why Choose Aayush Institute Points
const whyChoosePoints = [
    {
        title: "Industry-Relevant Curriculum",
        desc: "Courses are designed around practical skills, modern tools and current workplace requirements.",
        icon: <Award className="w-6 h-6 text-white" />
    },
    {
        title: "Practical & Project-Based Learning",
        desc: "Learn through assignments, exercises, practical tasks and real-world projects wherever applicable.",
        icon: <Zap className="w-6 h-6 text-white" />
    },
    {
        title: "Beginner to Advanced Levels",
        desc: "Choose learning paths according to your existing knowledge, academic background and career goals.",
        icon: <GraduationCap className="w-6 h-6 text-white" />
    },
    {
        title: "Professional & Technical Skills",
        desc: "From office productivity and accounting to AI, software development, cyber security, design and digital marketing.",
        icon: <Cpu className="w-6 h-6 text-white" />
    },
    {
        title: "Flexible Learning Options",
        desc: "Course duration and learning paths can be structured according to the program and learner requirements.",
        icon: <Clock className="w-6 h-6 text-white" />
    },
    {
        title: "Career-Focused Training",
        desc: "Build practical skills that can support employment, career growth, freelancing, entrepreneurship and further learning.",
        icon: <Briefcase className="w-6 h-6 text-white" />
    }
];

// Distinct colorful styling themes for Why Choose cards
const whyChooseThemes = [
    {
        cardBg: "from-blue-100/90 via-blue-50/70 to-indigo-50/50",
        border: "border-2 border-blue-200 hover:border-blue-500",
        shadow: "hover:shadow-[0_14px_32px_rgba(37,99,235,0.18)]",
        iconGrad: "from-blue-600 to-indigo-600",
        iconShadow: "shadow-blue-500/35",
        tag: "CURRICULUM",
        tagColor: "bg-blue-600 text-white shadow-xs shadow-blue-500/30",
        titleColor: "text-blue-950 group-hover:text-blue-700",
        linkColor: "text-blue-700 group-hover:text-blue-800"
    },
    {
        cardBg: "from-amber-100/90 via-amber-50/70 to-orange-50/50",
        border: "border-2 border-amber-200 hover:border-amber-500",
        shadow: "hover:shadow-[0_14px_32px_rgba(245,158,11,0.18)]",
        iconGrad: "from-amber-500 to-orange-600",
        iconShadow: "shadow-amber-500/35",
        tag: "HANDS-ON LABS",
        tagColor: "bg-amber-600 text-white shadow-xs shadow-amber-500/30",
        titleColor: "text-amber-950 group-hover:text-amber-700",
        linkColor: "text-amber-700 group-hover:text-amber-800"
    },
    {
        cardBg: "from-emerald-100/90 via-emerald-50/70 to-teal-50/50",
        border: "border-2 border-emerald-200 hover:border-emerald-500",
        shadow: "hover:shadow-[0_14px_32px_rgba(16,185,129,0.18)]",
        iconGrad: "from-emerald-600 to-teal-600",
        iconShadow: "shadow-emerald-500/35",
        tag: "ALL LEVELS",
        tagColor: "bg-emerald-600 text-white shadow-xs shadow-emerald-500/30",
        titleColor: "text-emerald-950 group-hover:text-emerald-700",
        linkColor: "text-emerald-700 group-hover:text-emerald-800"
    },
    {
        cardBg: "from-purple-100/90 via-purple-50/70 to-violet-50/50",
        border: "border-2 border-purple-200 hover:border-purple-500",
        shadow: "hover:shadow-[0_14px_32px_rgba(147,51,234,0.18)]",
        iconGrad: "from-purple-600 to-violet-700",
        iconShadow: "shadow-purple-500/35",
        tag: "MODERN TECH",
        tagColor: "bg-purple-600 text-white shadow-xs shadow-purple-500/30",
        titleColor: "text-purple-950 group-hover:text-purple-700",
        linkColor: "text-purple-700 group-hover:text-purple-800"
    },
    {
        cardBg: "from-cyan-100/90 via-cyan-50/70 to-sky-50/50",
        border: "border-2 border-cyan-200 hover:border-cyan-500",
        shadow: "hover:shadow-[0_14px_32px_rgba(6,182,212,0.18)]",
        iconGrad: "from-cyan-600 to-sky-700",
        iconShadow: "shadow-cyan-500/35",
        tag: "FLEXIBLE LEARNING",
        tagColor: "bg-cyan-600 text-white shadow-xs shadow-cyan-500/30",
        titleColor: "text-cyan-950 group-hover:text-cyan-700",
        linkColor: "text-cyan-700 group-hover:text-cyan-800"
    },
    {
        cardBg: "from-rose-100/90 via-rose-50/70 to-pink-50/50",
        border: "border-2 border-rose-200 hover:border-rose-500",
        shadow: "hover:shadow-[0_14px_32px_rgba(244,63,94,0.18)]",
        iconGrad: "from-rose-600 to-pink-600",
        iconShadow: "shadow-rose-500/35",
        tag: "CAREER FOCUS",
        tagColor: "bg-rose-600 text-white shadow-xs shadow-rose-500/30",
        titleColor: "text-rose-950 group-hover:text-rose-700",
        linkColor: "text-rose-700 group-hover:text-rose-800"
    }
];

// 6 SEO-Friendly Frequently Asked Questions
const courseFaqs = [
    {
        q: "What professional courses does Aayush Institute offer?",
        a: "Aayush Institute offers courses in AI, software development, web designing, data analytics, cyber security, cloud computing, UI/UX, graphic design, video editing, mobile app development, digital marketing, accounting, technical skills, IELTS, PTE and foreign languages."
    },
    {
        q: "Which courses are suitable for beginners?",
        a: "Several programs offer beginner-level learning, including office skills, web designing, graphic design, digital marketing, AI fundamentals, accounting, language courses and short-term professional skills."
    },
    {
        q: "Do you offer short-term courses?",
        a: "Yes. Short-term and professional skill programs are available in areas such as Advanced Excel, MS Office, AI tools, digital marketing, accounting, communication and other professional skills."
    },
    {
        q: "Do you offer IELTS and PTE preparation?",
        a: "Yes. Separate IELTS and PTE preparation programs are available with dedicated modules for Listening, Reading, Writing and Speaking."
    },
    {
        q: "Which foreign languages are available?",
        a: "Aayush Institute offers separate German, French and Japanese language programs with structured levels."
    },
    {
        q: "Are courses available for working professionals?",
        a: "Yes. Selected programs are designed for students as well as working professionals, with course duration and level depending on the program."
    }
];

// Safe dynamic icon resolver that guarantees React never crashes on plain objects
const renderCourseIcon = (course, customClass = "w-5 h-5") => {
    if (!course) return <BookOpen className={customClass} />;
    
    // If it's already a valid React element, render it safely
    if (React.isValidElement(course.icon)) {
        return course.icon;
    }
    
    // If it's a component function
    if (typeof course.icon === 'function') {
        const IconComp = course.icon;
        return <IconComp className={customClass} />;
    }
    
    // Dynamic icon resolution by course name, category, and keywords
    const name = (course.name || '').toLowerCase();
    const cat = (course.category || '').toLowerCase();

    if (name.includes('python') || name.includes('django') || name.includes('full stack') || name.includes('software') || name.includes('mern') || name.includes('programming')) {
        return <Code className={customClass} />;
    }
    if (name.includes('web') || name.includes('front')) {
        return <Globe className={customClass} />;
    }
    if (name.includes('mobile') || name.includes('app') || name.includes('android') || name.includes('flutter') || name.includes('ios')) {
        return <Smartphone className={customClass} />;
    }
    if (name.includes('ai') || name.includes('artificial') || name.includes('generative') || name.includes('bot') || name.includes('machine') || name.includes('data science') || name.includes('analytics') || name.includes('bi')) {
        return <Cpu className={customClass} />;
    }
    if (name.includes('cloud') || name.includes('devops') || name.includes('aws') || name.includes('azure') || name.includes('docker')) {
        return <Zap className={customClass} />;
    }
    if (name.includes('cyber') || name.includes('security') || name.includes('hacking') || name.includes('defense')) {
        return <Shield className={customClass} />;
    }
    if (name.includes('database') || name.includes('sql') || name.includes('oracle') || name.includes('mongo')) {
        return <Database className={customClass} />;
    }
    if (name.includes('design') || name.includes('ui') || name.includes('ux') || name.includes('graphic') || name.includes('figma') || name.includes('photoshop')) {
        return <Palette className={customClass} />;
    }
    if (name.includes('video') || name.includes('motion') || name.includes('premiere') || name.includes('after effects') || name.includes('3d') || name.includes('animation') || name.includes('vfx')) {
        return <Video className={customClass} />;
    }
    if (name.includes('marketing') || name.includes('seo') || name.includes('ads') || name.includes('social') || name.includes('digital media')) {
        return <Megaphone className={customClass} />;
    }
    if (name.includes('commerce') || name.includes('store') || name.includes('shopify') || name.includes('amazon') || name.includes('dropshipping')) {
        return <ShoppingCart className={customClass} />;
    }
    if (name.includes('tally') || name.includes('gst') || name.includes('accounting') || name.includes('tax') || name.includes('finance') || name.includes('ledger') || name.includes('excel') || name.includes('office')) {
        return <Calculator className={customClass} />;
    }
    if (name.includes('cad') || name.includes('auto') || name.includes('drafting') || name.includes('mechanical') || name.includes('civil')) {
        return <Settings className={customClass} />;
    }
    if (name.includes('hardware') || name.includes('network') || name.includes('support') || name.includes('troubleshooting') || name.includes('server')) {
        return <Settings className={customClass} />;
    }
    if (name.includes('ielts') || name.includes('pte') || name.includes('english') || name.includes('german') || name.includes('french') || name.includes('japanese') || name.includes('language')) {
        return <Languages className={customClass} />;
    }
    if (name.includes('scrum') || name.includes('agile') || name.includes('project') || name.includes('interview') || name.includes('communication') || name.includes('career')) {
        return <Briefcase className={customClass} />;
    }

    if (cat === 'software') return <Code className={customClass} />;
    if (cat === 'ai-data') return <Cpu className={customClass} />;
    if (cat === 'design') return <Palette className={customClass} />;
    if (cat === 'marketing') return <Megaphone className={customClass} />;
    if (cat === 'business') return <Calculator className={customClass} />;
    if (cat === 'technical') return <Settings className={customClass} />;
    if (cat === 'languages') return <Languages className={customClass} />;
    if (cat === 'shortterm') return <Sparkles className={customClass} />;

    return <BookOpen className={customClass} />;
};

const renderCategoryIcon = (cat, customClass = "w-4 h-4") => {
    if (!cat) return <BookOpen className={customClass} />;
    if (React.isValidElement(cat.icon)) return cat.icon;
    if (typeof cat.icon === 'function') {
        const IconComp = cat.icon;
        return <IconComp className={customClass} />;
    }
    const id = (cat.id || '').toLowerCase();
    if (id === 'software') return <Code className={customClass} />;
    if (id === 'ai-data') return <Cpu className={customClass} />;
    if (id === 'design') return <Palette className={customClass} />;
    if (id === 'marketing') return <Megaphone className={customClass} />;
    if (id === 'business') return <Calculator className={customClass} />;
    if (id === 'technical') return <Settings className={customClass} />;
    if (id === 'languages') return <Languages className={customClass} />;
    if (id === 'shortterm') return <Briefcase className={customClass} />;
    return <BookOpen className={customClass} />;
};

// Helper to strip non-serializable JSX elements before saving to localStorage
const sanitizeCoursesForStorage = (coursesObj) => {
    if (!coursesObj || typeof coursesObj !== 'object') return {};
    const sanitized = {};
    for (const [key, list] of Object.entries(coursesObj)) {
        if (Array.isArray(list)) {
            sanitized[key] = list.map(item => {
                const copy = { ...item };
                delete copy.icon; // strip non-serializable JSX element
                return copy;
            });
        } else {
            sanitized[key] = list;
        }
    }
    return sanitized;
};

const normalizeCategory = (cat) => {
    if (!cat) return 'software';
    const c = String(cat).toLowerCase();
    if (c === 'computer' || c === 'accounting') return 'business';
    if (c === 'web' || c === 'mobile') return 'software';
    if (c === 'ai' || c === 'cloud' || c === 'data') return 'ai-data';
    return c;
};

const Courses = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(() => normalizeCategory(location.state?.category));
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    // Dynamic Database State (Initialized with default high-quality data + saved customizations)
    const [dbCategories, setDbCategories] = useState(courseCategories);
    const [dbCategoryCourses, setDbCategoryCourses] = useState(() => {
        try {
            const deletedIds = getDeletedCourseIds();
            const saved = localStorage.getItem('aayush_custom_courses');
            let merged = { ...categoryCourses };
            if (saved) {
                const parsed = JSON.parse(saved);
                const cleanParsed = {};
                for (const [k, list] of Object.entries(parsed)) {
                    if (Array.isArray(list)) {
                        cleanParsed[k] = list.map(c => {
                            const { icon, ...rest } = c;
                            return rest;
                        });
                    }
                }
                merged = { ...categoryCourses, ...cleanParsed };
            }
            // Filter out any deleted courses
            const filtered = {};
            for (const [catKey, list] of Object.entries(merged)) {
                if (Array.isArray(list)) {
                    filtered[catKey] = list.filter(c => 
                        !deletedIds.includes(String(c.id)) && 
                        !deletedIds.includes(String(c._id))
                    );
                } else {
                    filtered[catKey] = list;
                }
            }
            return filtered;
        } catch (e) {
            console.warn('Could not load custom courses from localStorage', e);
        }
        return categoryCourses;
    });
    const [isDbLoaded, setIsDbLoaded] = useState(false);

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

    useEffect(() => {
        const syncAuth = () => {
            try {
                const u = JSON.parse(localStorage.getItem('aayush_user') || 'null');
                setCurrentUser(u);
            } catch {
                setCurrentUser(null);
            }
        };
        window.addEventListener('authChange', syncAuth);
        window.addEventListener('storage', syncAuth);
        return () => {
            window.removeEventListener('authChange', syncAuth);
            window.removeEventListener('storage', syncAuth);
        };
    }, []);

    // Staff Security PIN Gate (Secret PIN: 2580)
    const STAFF_SECRET_PIN = '2580';
    const [showStaffUnlockModal, setShowStaffUnlockModal] = useState(false);
    const [staffPinInput, setStaffPinInput] = useState('');
    const [staffPinError, setStaffPinError] = useState('');

    const handleStaffUnlockSubmit = (e) => {
        e?.preventDefault();
        if (staffPinInput.trim() === STAFF_SECRET_PIN) {
            sessionStorage.setItem('aayush_staff_quick_unlocked', 'true');
            setIsStaffQuickUnlocked(true);
            setShowStaffUnlockModal(false);
            setStaffPinInput('');
            setStaffPinError('');
            showToast('Staff Access Granted: Course editing and publishing enabled!', 'success');
        } else {
            setStaffPinError('Incorrect 4-digit PIN. Authorized faculty and staff only.');
        }
    };

    const handleStaffLock = () => {
        sessionStorage.removeItem('aayush_staff_quick_unlocked');
        setIsStaffQuickUnlocked(false);
        showToast('Faculty editing mode locked.', 'info');
    };

    // Course Edit State & Handlers
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        category: 'software',
        subgroup: '',
        oneLiner: '',
        duration: '',
        level: '',
        skills: '',
        features: '',
        certification: '',
        popular: false,
        image: ''
    });

    // Course Add State & Handlers
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        category: 'software',
        subgroup: '',
        oneLiner: '',
        duration: '3–6 Months',
        level: 'Beginner to Advanced',
        skills: '',
        features: '',
        certification: 'Certified Professional',
        popular: false,
        image: '/course_mern.jpg'
    });

    // Toast Notification
    const [toastMsg, setToastMsg] = useState(null);
    const showToast = (text, type = 'success') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3500);
    };

    const openEditModal = (course) => {
        let foundCat = activeCategory;
        for (const [catKey, list] of Object.entries(dbCategoryCourses)) {
            if (Array.isArray(list) && list.some(c => c.id === course.id)) {
                foundCat = catKey;
                break;
            }
        }
        const defaultFee = course.fee || (course.id === 1 || course.name?.toLowerCase().includes('artificial intelligence') ? '₹ 75,000/-' : (course.duration?.toLowerCase().includes('week') ? '₹ 15,000/-' : '₹ 45,000/-'));
        const defaultHighlights = Array.isArray(course.highlights) ? course.highlights.join('\n') : (course.highlights || '');

        setEditingCourse(course);
        setEditFormData({
            id: course.id,
            name: course.name || '',
            category: foundCat,
            subgroup: course.subgroup || '',
            oneLiner: course.oneLiner || course.details || '',
            duration: course.duration || '3–6 Months',
            level: course.level || 'Beginner to Advanced',
            fee: defaultFee,
            scholarship: course.scholarship || 'Up to 50%',
            mode: course.mode || 'Classroom / Online / Hybrid',
            eligibility: course.eligibility || '12th / Graduates / BCA / B.Tech / Frontend Developers',
            batchSchedule: course.batchSchedule || 'Weekday & Weekend Batches',
            skills: Array.isArray(course.skills) ? course.skills.join(', ') : (course.skills || ''),
            features: Array.isArray(course.features) ? course.features.join('\n') : (course.features || ''),
            highlights: defaultHighlights,
            certification: course.certification || 'Certified Professional',
            popular: !!course.popular,
            image: course.image || '/course_mern.jpg'
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEditCourse = (e) => {
        e.preventDefault();
        if (!editingCourse || !editFormData.name.trim()) return;

        const updatedCourse = {
            ...editingCourse,
            name: editFormData.name.trim(),
            subgroup: editFormData.subgroup.trim() || 'Professional Course',
            oneLiner: editFormData.oneLiner.trim(),
            details: editFormData.oneLiner.trim(),
            duration: editFormData.duration.trim() || '3–6 Months',
            level: editFormData.level.trim() || 'Beginner to Advanced',
            fee: editFormData.fee?.trim() || '₹ 45,000/-',
            scholarship: editFormData.scholarship?.trim() || 'Up to 50%',
            mode: editFormData.mode?.trim() || 'Classroom / Online / Hybrid',
            eligibility: editFormData.eligibility?.trim() || '12th / Graduates / BCA / B.Tech / Frontend Developers',
            batchSchedule: editFormData.batchSchedule?.trim() || 'Weekday & Weekend Batches',
            skills: editFormData.skills ? editFormData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
            features: editFormData.features ? editFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
            highlights: editFormData.highlights ? editFormData.highlights.split('\n').map(h => h.trim()).filter(Boolean) : [],
            certification: editFormData.certification.trim() || 'Certified Professional',
            popular: !!editFormData.popular,
            image: editFormData.image.trim() || editingCourse.image || '/course_mern.jpg'
        };

        if (selectedCourse && selectedCourse.id === editingCourse.id) {
            setSelectedCourse(updatedCourse);
        }

        setDbCategoryCourses(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(c => c.id !== editingCourse.id);
                }
            }
            const targetCat = editFormData.category || activeCategory || 'software';
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [updatedCourse, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_custom_courses', JSON.stringify(sanitizeCoursesForStorage(next)));
                window.dispatchEvent(new Event('coursesUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            courseApi.update(updatedCourse.id, updatedCourse).catch(() => {});
            return next;
        });

        setIsEditModalOpen(false);
        setEditingCourse(null);
        showToast(`Course "${updatedCourse.name}" updated successfully!`, 'success');
    };

    const handleDeleteCourse = async (courseId, courseName = '') => {
        const confirmMsg = courseName 
            ? `Are you sure you want to delete course "${courseName}" from the catalog?`
            : 'Are you sure you want to delete this course from the catalog?';
        if (!window.confirm(confirmMsg)) return;

        // Call centralized courseApi.delete (adds to deleted IDs and updates localStorage)
        await courseApi.delete(courseId);

        setDbCategoryCourses(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
                if (Array.isArray(next[key])) {
                    next[key] = next[key].filter(c => 
                        c.id !== courseId && 
                        c._id !== courseId && 
                        String(c.id) !== String(courseId) && 
                        String(c._id) !== String(courseId)
                    );
                }
            }
            try {
                localStorage.setItem('aayush_custom_courses', JSON.stringify(sanitizeCoursesForStorage(next)));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        if (selectedCourse && (String(selectedCourse.id) === String(courseId) || String(selectedCourse._id) === String(courseId))) {
            setSelectedCourse(null);
            setIsModalOpen(false);
        }

        setIsEditModalOpen(false);
        setEditingCourse(null);
        showToast(courseName ? `Course "${courseName}" removed from catalog.` : 'Course removed from catalog.', 'info');
    };

    const openAddModal = () => {
        setAddFormData({
            name: '',
            category: activeCategory || 'software',
            subgroup: 'Professional Course',
            oneLiner: '',
            duration: '3–6 Months',
            level: 'Beginner to Advanced',
            skills: '',
            features: '100% Practical project-based training\nIndustry-recognized certification\nDedicated placement & interview mentorship',
            certification: 'Certified Professional Specialist',
            popular: false,
            image: '/course_mern.jpg'
        });
        setIsAddModalOpen(true);
    };

    const handleSaveNewCourse = (e) => {
        e.preventDefault();
        if (!addFormData.name.trim()) return;

        const newId = 'c_' + Date.now();
        const targetCat = addFormData.category || activeCategory || 'software';

        const newCourse = {
            id: newId,
            name: addFormData.name.trim(),
            subgroup: addFormData.subgroup.trim() || 'Professional Course',
            oneLiner: addFormData.oneLiner.trim(),
            details: addFormData.oneLiner.trim(),
            image: addFormData.image.trim() || '/course_mern.jpg',
            popular: !!addFormData.popular,
            duration: addFormData.duration.trim() || '3–6 Months',
            level: addFormData.level.trim() || 'Beginner to Advanced',
            skills: addFormData.skills ? addFormData.skills.split(',').map(s => s.trim()).filter(Boolean) : ['Professional Skills'],
            features: addFormData.features ? addFormData.features.split('\n').map(f => f.trim()).filter(Boolean) : ['Hands-on practical training', 'Industry-valued certification'],
            certification: addFormData.certification.trim() || 'Certified Professional',
            eligibility: '10th / 12th / Graduates'
        };

        setDbCategoryCourses(prev => {
            const next = { ...prev };
            if (!next[targetCat]) next[targetCat] = [];
            next[targetCat] = [newCourse, ...next[targetCat]];
            try {
                localStorage.setItem('aayush_custom_courses', JSON.stringify(sanitizeCoursesForStorage(next)));
                window.dispatchEvent(new Event('coursesUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            courseApi.create(newCourse).catch(() => {});
            return next;
        });

        setActiveCategory(targetCat);
        setIsAddModalOpen(false);
        showToast(`Course "${newCourse.name}" published to catalog!`, 'success');
    };

    // Fetch dynamic subjects and courses from backend Database
    useEffect(() => {
        let isMounted = true;
        const fetchDbData = async () => {
            try {
                const [catsRes, coursesRes] = await Promise.all([
                    categoryApi.getAll().catch(() => null),
                    courseApi.getAll().catch(() => null)
                ]);

                if (!isMounted) return;

                // If DB categories returned, format and merge with icons
                if (catsRes && catsRes.data && catsRes.data.length > 0) {
                    const formattedCats = catsRes.data.map(cat => {
                        const existing = courseCategories.find(c => c.id === (cat.categoryId || cat.id));
                        return {
                            id: cat.categoryId || cat.id,
                            label: cat.label || cat.name,
                            icon: existing ? existing.icon : <BookOpen className="w-4 h-4" />,
                            eligibility: cat.eligibility || 'Open to All Students & Professionals',
                            desc: cat.desc || '',
                            activeGrad: cat.activeGrad || existing?.activeGrad || 'from-blue-600 to-indigo-600',
                            activeShadow: cat.activeShadow || existing?.activeShadow || 'shadow-blue-500/30',
                            badgeColor: cat.badgeColor || existing?.badgeColor || 'bg-blue-50 text-blue-700 border-blue-200/90',
                            iconColor: cat.iconColor || existing?.iconColor || 'text-blue-600',
                            headerGrad: cat.headerGrad || existing?.headerGrad || 'from-blue-600 via-indigo-600 to-cyan-500'
                        };
                    });
                    setDbCategories(formattedCats);
                }

                // If DB courses returned, group them by categoryId
                if (coursesRes && coursesRes.data && coursesRes.data.length > 0) {
                    const grouped = {};
                    coursesRes.data.forEach(course => {
                        if (course.visible === false) return; // Hide unpublished courses
                        const cId = course.categoryId || (course.type && course.type.toLowerCase()) || 'software';
                        if (!grouped[cId]) grouped[cId] = [];
                        
                        // Find matching icon from static template if available
                        const flatDefaults = Object.values(categoryCourses).flat();
                        const matchCourse = flatDefaults.find(dc => 
                            (dc.name?.toLowerCase() === (course.name || course.title)?.toLowerCase())
                        );

                        grouped[cId].push({
                            id: course._id || course.id,
                            _id: course._id,
                            name: course.name || course.title,
                            title: course.title || course.name,
                            subgroup: course.subgroup || course.type || 'Professional Course',
                            oneLiner: course.oneLiner || course.description || course.details || '',
                            icon: matchCourse?.icon || <BookOpen className="w-5 h-5" />,
                            image: course.image || matchCourse?.image || '/course_mern.jpg',
                            popular: !!course.popular,
                            path: course.path || matchCourse?.path || '',
                            skills: Array.isArray(course.skills) 
                                ? course.skills 
                                : (course.skills ? String(course.skills).split(',').map(s => s.trim()) : []),
                            level: course.level || 'Beginner to Advanced',
                            duration: course.duration || '3–6 Months',
                            fees: course.fees || '₹ 45,000/-',
                            scholarship: course.scholarship || 'Up to 50%',
                            mode: course.mode || 'Classroom / Online / Hybrid',
                            batchSchedule: course.batchSchedule || 'Weekday & Weekend Batches',
                            rating: course.rating || 4.8,
                            eligibility: course.eligibility || '10th / 12th / Graduates',
                            careerAreas: course.careerAreas || (Array.isArray(course.career) ? course.career.join(', ') : ''),
                            career: Array.isArray(course.career) ? course.career : [],
                            details: course.details || course.description || course.oneLiner || '',
                            features: Array.isArray(course.features) && course.features.length > 0
                                ? course.features 
                                : (Array.isArray(course.topics) && course.topics.length > 0 ? course.topics : ['Comprehensive curriculum', 'Hands-on practical projects', 'Certification included']),
                            certification: course.certification || 'Certified Professional'
                        });
                    });
                    setDbCategoryCourses(grouped);
                    setIsDbLoaded(true);
                }
            } catch (err) {
                console.warn('API courses fallback to static:', err);
            }
        };

        fetchDbData();
        const pollTimer = setInterval(fetchDbData, 4000);
        return () => { 
            isMounted = false; 
            clearInterval(pollTimer);
        };
    }, []);

    // Listen for custom courses updates across tabs and components
    useEffect(() => {
        const syncCourses = () => {
            try {
                const deletedIds = getDeletedCourseIds();
                const saved = localStorage.getItem('aayush_custom_courses');
                let base = categoryCourses;
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved);
                        base = { ...categoryCourses, ...parsed };
                    } catch {}
                }
                const filtered = {};
                for (const [k, list] of Object.entries(base)) {
                    if (Array.isArray(list)) {
                        filtered[k] = list.filter(c => 
                            !deletedIds.includes(String(c.id)) && 
                            !deletedIds.includes(String(c._id))
                        );
                    } else {
                        filtered[k] = list;
                    }
                }
                setDbCategoryCourses(filtered);
            } catch {}
        };
        window.addEventListener('coursesUpdated', syncCourses);
        window.addEventListener('storage', syncCourses);
        return () => {
            window.removeEventListener('coursesUpdated', syncCourses);
            window.removeEventListener('storage', syncCourses);
        };
    }, []);

    // Set page title & meta description for SEO
    useEffect(() => {
        document.title = "Professional Courses & Career Training | Aayush Institute";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute(
                "content",
                "Explore professional and career-oriented courses in AI, software development, web designing, data analytics, cyber security, cloud, UI/UX, digital marketing, accounting, IELTS, PTE and foreign languages."
            );
        }
    }, []);

    useEffect(() => {
        if (location.state?.category) {
            setActiveCategory(normalizeCategory(location.state.category));
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

    const activeCategoryInfo = dbCategories.find(c => c.id === activeCategory) || dbCategories[0] || courseCategories[0];
    const currentCourses = dbCategoryCourses[activeCategory] || [];
    const currentSpotlight = categorySpotlights[activeCategory] || categorySpotlights['software'];

    // Filter courses if user searches
    const allCoursesList = Object.values(dbCategoryCourses).flat();
    const isSearching = searchQuery.trim().length > 0;
    const displayedCourses = isSearching
        ? allCoursesList.filter(c => {
            const q = searchQuery.toLowerCase();
            return (
                c.name.toLowerCase().includes(q) ||
                (c.oneLiner && c.oneLiner.toLowerCase().includes(q)) ||
                (c.subgroup && c.subgroup.toLowerCase().includes(q)) ||
                (c.skills && c.skills.some(s => s.toLowerCase().includes(q))) ||
                (c.careerAreas && c.careerAreas.toLowerCase().includes(q))
            );
        })
        : currentCourses;

    // 8 Vivid & Distinct Harmonious Themes for colorful premium cards
    const cardThemePalette = [
        // 0. Royal Blue / Electric Cyan (Software & Web Tech)
        {
            topGradient: 'from-blue-600 via-indigo-600 to-cyan-400',
            cardBg: 'from-blue-50/60 via-white to-white',
            border: 'border-blue-200/90 hover:border-blue-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(37,99,235,0.18)]',
            iconGrad: 'from-blue-600 to-indigo-700',
            iconRing: 'ring-blue-400/30',
            iconShadow: 'shadow-blue-500/25',
            badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
            dotColor: 'bg-blue-600',
            titleHover: 'group-hover:text-blue-600',
            chipBg: 'bg-blue-50/80 text-blue-700 border-blue-200/60',
            btnGrad: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
            btnShadow: 'shadow-blue-500/25 hover:shadow-blue-500/40',
            durationPill: 'bg-blue-900/60 border-blue-400/30 text-blue-100',
            certColor: 'text-blue-700',
        },
        // 1. Purple / Vivid Violet (AI, Innovation & Data)
        {
            topGradient: 'from-purple-600 via-violet-600 to-fuchsia-400',
            cardBg: 'from-purple-50/60 via-white to-white',
            border: 'border-purple-200/90 hover:border-purple-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
            iconGrad: 'from-purple-600 to-violet-700',
            iconRing: 'ring-purple-400/30',
            iconShadow: 'shadow-purple-500/25',
            badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
            dotColor: 'bg-purple-600',
            titleHover: 'group-hover:text-purple-600',
            chipBg: 'bg-purple-50/80 text-purple-700 border-purple-200/60',
            btnGrad: 'from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700',
            btnShadow: 'shadow-purple-500/25 hover:shadow-purple-500/40',
            durationPill: 'bg-purple-900/60 border-purple-400/30 text-purple-100',
            certColor: 'text-purple-700',
        },
        // 2. Emerald / Jade Green (Cloud, DevOps & Full Stack)
        {
            topGradient: 'from-emerald-600 via-teal-600 to-emerald-400',
            cardBg: 'from-emerald-50/60 via-white to-white',
            border: 'border-emerald-200/90 hover:border-emerald-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
            iconGrad: 'from-emerald-600 to-teal-700',
            iconRing: 'ring-emerald-400/30',
            iconShadow: 'shadow-emerald-500/25',
            badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
            dotColor: 'bg-emerald-600',
            titleHover: 'group-hover:text-emerald-600',
            chipBg: 'bg-emerald-50/80 text-emerald-700 border-emerald-200/60',
            btnGrad: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
            btnShadow: 'shadow-emerald-500/25 hover:shadow-emerald-500/40',
            durationPill: 'bg-emerald-900/60 border-emerald-400/30 text-emerald-100',
            certColor: 'text-emerald-700',
        },
        // 3. Rose / Pink Crimson (Design, UI/UX & Creative Media)
        {
            topGradient: 'from-rose-600 via-pink-600 to-rose-400',
            cardBg: 'from-rose-50/60 via-white to-white',
            border: 'border-rose-200/90 hover:border-rose-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(244,63,94,0.18)]',
            iconGrad: 'from-rose-600 to-pink-700',
            iconRing: 'ring-rose-400/30',
            iconShadow: 'shadow-rose-500/25',
            badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
            dotColor: 'bg-rose-600',
            titleHover: 'group-hover:text-rose-600',
            chipBg: 'bg-rose-50/80 text-rose-700 border-rose-200/60',
            btnGrad: 'from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700',
            btnShadow: 'shadow-rose-500/25 hover:shadow-rose-500/40',
            durationPill: 'bg-rose-900/60 border-rose-400/30 text-rose-100',
            certColor: 'text-rose-700',
        },
        // 4. Amber / Coral Orange (Marketing, Accounting & Business)
        {
            topGradient: 'from-amber-500 via-orange-500 to-yellow-400',
            cardBg: 'from-amber-50/60 via-white to-white',
            border: 'border-amber-200/90 hover:border-amber-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
            iconGrad: 'from-amber-500 to-orange-600',
            iconRing: 'ring-amber-400/30',
            iconShadow: 'shadow-amber-500/25',
            badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
            dotColor: 'bg-amber-600',
            titleHover: 'group-hover:text-amber-600',
            chipBg: 'bg-amber-50/80 text-amber-800 border-amber-200/60',
            btnGrad: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
            btnShadow: 'shadow-amber-500/25 hover:shadow-amber-500/40',
            durationPill: 'bg-amber-950/60 border-amber-400/30 text-amber-100',
            certColor: 'text-amber-700',
        },
        // 5. Cyan / Sky Blue (CAD, Systems & IT Infrastructure)
        {
            topGradient: 'from-cyan-600 via-sky-600 to-blue-400',
            cardBg: 'from-cyan-50/60 via-white to-white',
            border: 'border-cyan-200/90 hover:border-cyan-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(6,182,212,0.18)]',
            iconGrad: 'from-cyan-600 to-sky-700',
            iconRing: 'ring-cyan-400/30',
            iconShadow: 'shadow-cyan-500/25',
            badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
            dotColor: 'bg-cyan-600',
            titleHover: 'group-hover:text-cyan-600',
            chipBg: 'bg-cyan-50/80 text-cyan-800 border-cyan-200/60',
            btnGrad: 'from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700',
            btnShadow: 'shadow-cyan-500/25 hover:shadow-cyan-500/40',
            durationPill: 'bg-cyan-950/60 border-cyan-400/30 text-cyan-100',
            certColor: 'text-cyan-700',
        },
        // 6. Indigo / Deep Blue (Global Languages & Test Prep)
        {
            topGradient: 'from-indigo-600 via-blue-700 to-violet-500',
            cardBg: 'from-indigo-50/60 via-white to-white',
            border: 'border-indigo-200/90 hover:border-indigo-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(79,70,229,0.18)]',
            iconGrad: 'from-indigo-600 to-blue-700',
            iconRing: 'ring-indigo-400/30',
            iconShadow: 'shadow-indigo-500/25',
            badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
            dotColor: 'bg-indigo-600',
            titleHover: 'group-hover:text-indigo-600',
            chipBg: 'bg-indigo-50/80 text-indigo-700 border-indigo-200/60',
            btnGrad: 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
            btnShadow: 'shadow-indigo-500/25 hover:shadow-indigo-500/40',
            durationPill: 'bg-indigo-950/60 border-indigo-400/30 text-indigo-100',
            certColor: 'text-indigo-700',
        },
        // 7. Teal / Deep Mint (Professional Skills & Career Acceleration)
        {
            topGradient: 'from-teal-600 via-emerald-600 to-green-400',
            cardBg: 'from-teal-50/60 via-white to-white',
            border: 'border-teal-200/90 hover:border-teal-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(20,184,166,0.18)]',
            iconGrad: 'from-teal-600 to-emerald-700',
            iconRing: 'ring-teal-400/30',
            iconShadow: 'shadow-teal-500/25',
            badgeBg: 'bg-teal-50 text-teal-800 border-teal-200/80',
            dotColor: 'bg-teal-600',
            titleHover: 'group-hover:text-teal-600',
            chipBg: 'bg-teal-50/80 text-teal-800 border-teal-200/60',
            btnGrad: 'from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700',
            btnShadow: 'shadow-teal-500/25 hover:shadow-teal-500/40',
            durationPill: 'bg-teal-950/60 border-teal-400/30 text-teal-100',
            certColor: 'text-teal-700',
        }
    ];

    // Rich Colorful Premium Course Card Component
    const CourseCard = ({ course, index = 0 }) => {
        const theme = cardThemePalette[index % cardThemePalette.length];

        return (
            <div className={`bg-gradient-to-b ${theme.cardBg} rounded-2xl border ${theme.border} shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${theme.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group h-full overflow-hidden relative`}>
                {/* Ambient Soft Glow in Top-Right Corner */}
                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${theme.topGradient} opacity-10 blur-2xl pointer-events-none group-hover:opacity-25 transition-opacity duration-500`} />

                {/* 2. Course Image Thumbnail */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img 
                        src={course.image || '/course_web_design.jpg'} 
                        alt={course.name}
                        loading="lazy"
                        onError={(e) => { e.target.src = '/course_web_design.jpg'; }}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

                    {/* Top Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                        {course.subgroup ? (
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs tracking-wide border flex items-center gap-1.5 bg-white/95 backdrop-blur-md ${theme.badgeBg}`}>
                                <span className="relative flex h-2 w-2">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.dotColor} opacity-75`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dotColor}`}></span>
                                </span>
                                {course.subgroup}
                            </span>
                        ) : (
                            <span />
                        )}
                        {course.popular && (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-[#00285e] text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider">
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

                    {/* Floating Bottom Metadata Pills on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-semibold">
                        <span className={`flex items-center gap-1.5 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] border ${theme.durationPill}`}>
                            <Clock className="w-3 h-3 text-amber-300" />
                            {course.duration}
                        </span>
                        <div className="flex items-center gap-1 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-[10.5px] font-semibold text-amber-300 border border-white/10">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            <span>4.9</span>
                        </div>
                    </div>
                </div>

                {/* 3. Card Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                        {/* Title with Colorful Gradient Icon */}
                        <div className="flex items-start gap-2.5 mb-2.5">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.iconGrad} ${theme.iconShadow} flex items-center justify-center flex-shrink-0 mt-0.5 text-white shadow-md ring-2 ${theme.iconRing} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {renderCourseIcon(course, "w-4 h-4 sm:w-5 sm:h-5")}
                            </div>
                            <h3 className={`text-[14.5px] sm:text-[15px] font-bold text-[#0a2540] ${theme.titleHover} transition-colors leading-snug line-clamp-2 min-h-[42px] flex items-center flex-1`}>
                                {course.name}
                            </h3>
                        </div>

                        {/* 1-Line Description */}
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3 font-normal">
                            {course.oneLiner}
                        </p>

                        {/* Colorful Key Skills Chips */}
                        {course.skills && (
                            <div className="flex flex-wrap gap-1.5 mb-3.5">
                                {course.skills.slice(0, 3).map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${theme.chipBg} transition-transform hover:scale-105`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {course.skills.length > 3 && (
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-medium border border-slate-200">
                                        +{course.skills.length - 3}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Key Highlight Bullets */}
                        {course.features && course.features.length > 0 && (
                            <div className="space-y-1 mb-3 pt-2.5 border-t border-dashed border-slate-200/80">
                                {course.features.slice(0, 2).map((feat, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium truncate">
                                        <CheckCircle2 className={`w-3.5 h-3.5 ${theme.certColor} flex-shrink-0`} />
                                        <span className="truncate">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 4. Bottom Action Bar */}
                    <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between gap-2 mt-auto">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium min-w-0 flex-1">
                            <Award className={`w-3.5 h-3.5 ${theme.certColor} flex-shrink-0`} />
                            <span className={`truncate font-semibold ${theme.certColor}`} title={course.certification}>
                                {course.certification?.replace('Certified ', '') || 'Certificate'}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            {isStaff && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEditModal(course)}
                                        aria-label={`Edit ${course.name}`}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold border border-purple-300 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                                        title="Edit Course (Staff)"
                                    >
                                        <Edit3 className="w-3 h-3 text-purple-600" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id || course._id, course.name); }}
                                        aria-label={`Delete ${course.name}`}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold border border-rose-300 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                                        title="Delete Course (Staff)"
                                    >
                                        <Trash2 className="w-3 h-3 text-rose-600" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => openModal(course)}
                                aria-label={`View details for ${course.name}`}
                                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${theme.btnGrad} ${theme.btnShadow} text-white font-bold text-[11px] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/btn`}
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

    // WhatsApp Icon Component
    const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
    );

    // QR Code Widget matching reference image
    const QRCodeWidget = () => (
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-2xl p-2.5 border-[2.5px] border-[#22c55e] shadow-xs flex items-center justify-center mx-auto">
            <img
                src="/whatsapp_qr.png"
                alt="WhatsApp QR Code"
                className="w-full h-full object-contain"
            />
            <div className="absolute w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none">
                <WhatsAppIcon className="w-5 h-5" />
            </div>
        </div>
    );

    // Full Course Showcase Poster (Matches exact layout of reference image)
    const CourseDetailsPoster = ({ course, isModal = false, onClose }) => {
        if (!course) return null;

        const highlightItems = [];
        if (course.id === 1 || course.name.toLowerCase().includes('artificial intelligence')) {
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
                highlightItems.push(`Practical ${course.name} Case Studies`);
            }
        }
        const finalHighlights = (Array.isArray(course.highlights) && course.highlights.length > 0)
            ? course.highlights.slice(0, 8)
            : highlightItems.slice(0, 8);

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

        const getFeeString = () => {
            if (course.fee) return course.fee;
            if (course.id === 1 || course.name?.toLowerCase().includes('artificial intelligence')) return '₹ 75,000/- (Inclusive of all taxes)';
            if (course.duration?.toLowerCase().includes('week') || course.id === 22) return '₹ 15,000/- (Inclusive of all taxes)';
            if (course.duration?.includes('1–2') || course.duration?.includes('2–3')) return '₹ 25,000/- (Inclusive of all taxes)';
            return '₹ 45,000/- (Inclusive of all taxes)';
        };

        const waLink = `https://wa.me/918800817447?text=${encodeURIComponent(`Hi, I would like to inquire about the ${course.name} course.`)}`;

        return (
            <div className={`w-full bg-[#f4f8fc] rounded-3xl p-3.5 sm:p-4 md:p-5 text-slate-800 border border-slate-200/80 shadow-2xl relative ${isModal ? 'xl:h-full xl:flex xl:flex-col xl:overflow-hidden' : 'space-y-4 sm:space-y-5'}`}>
                {/* Top Action buttons when in modal */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-2">
                    {isStaff && (
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => {
                                    openEditModal(course);
                                }}
                                className="px-3 py-1.5 rounded-full bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-xs font-bold shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                title="Edit Course Details (Staff)"
                            >
                                <Edit3 className="w-3.5 h-3.5 text-purple-300" />
                                <span>Staff Edit</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleDeleteCourse(course.id || course._id, course.name);
                                    if (onClose) onClose();
                                }}
                                className="px-3 py-1.5 rounded-full bg-rose-900/90 hover:bg-rose-950 text-rose-100 text-xs font-bold shadow-md border border-rose-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                title="Delete Course (Staff)"
                            >
                                <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                                <span>Delete</span>
                            </button>
                        </div>
                    )}
                    {isModal && onClose && (
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-600 hover:text-slate-900 shadow-md flex items-center justify-center transition-all cursor-pointer border border-slate-200"
                            aria-label="Close modal"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

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
                                        {String(course.id).padStart(2, '0')}
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#0066ff] text-[10.5px] sm:text-[11px] font-medium tracking-wide border border-blue-200/80 shadow-2xs">
                                        <Rocket className="w-3.5 h-3.5 text-[#0066ff]" />
                                        <span>Future Ready Skills</span>
                                    </div>
                                </div>

                                {/* Main Title */}
                                <h2 className="text-xl sm:text-2xl md:text-[25px] lg:text-[26px] font-bold text-[#0a2540] tracking-tight leading-tight mb-1.5">
                                    {course.name}
                                </h2>

                                {/* Description */}
                                <p className="text-slate-600 text-[11px] sm:text-xs md:text-[12.5px] leading-relaxed mb-3 font-normal max-w-md">
                                    {course.details || course.oneLiner}
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

                            {/* Right spacer for Desktop: background image fills this area */}
                            <div className="hidden md:block flex-shrink-0 w-64 lg:w-88 h-40 lg:h-48 pointer-events-none" />
                        </div>

                        {/* ── 2. TWO EQUAL SUB-COLUMNS: Highlights+Syllabus & Course Info+Internship ── */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
                            
                            {/* ── Sub-Column 1: Course Highlights (top) & Syllabus (bottom) (6 cols) ── */}
                            <div className="md:col-span-6 flex flex-col gap-3 sm:gap-3.5">
                                
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
                                                {course.name.split(' ').length > 3 ? course.name.split(' ').slice(0, 2).join(' ') : course.name.split(' ')[0]}
                                            </span>
                                            <span className="text-[8px] font-medium text-blue-100 leading-tight text-center">Course Syllabus</span>
                                            <div className="mt-1">{renderCourseIcon(course, "w-3.5 h-3.5 text-cyan-300")}</div>
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
                                        to={course.path ? course.path : "/ContactUs"}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#0d3055] text-white text-xs font-semibold shadow-md transition-all w-fit mt-1"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Download Syllabus (PDF)</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </NavLink>
                                </div>
                            </div>

                            {/* ── Sub-Column 2: Course Information & Internship + Why Choose Us (6 cols) ── */}
                            <div className="md:col-span-6 flex flex-col gap-2.5 sm:gap-3">
                                
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
                                                        {course.fee || (course.id === 1 || course.name?.toLowerCase().includes('artificial intelligence') ? '₹ 75,000/-' : (course.duration?.toLowerCase().includes('week') ? '₹ 15,000/-' : '₹ 45,000/-'))}
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
                                                        {course.scholarship || 'Up to 50%'}
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
                                                        {course.mode || 'Classroom / Online / Hybrid'}
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
                                                        {course.eligibility || '12th / Graduates / BCA / B.Tech / Frontend Developers'}
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
                                                        {course.certification ? (course.certification.startsWith('Certificate') ? course.certification : `Certificate in ${course.certification.replace('Certified ', '')}`) : `Certificate in ${course.name}`}
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
                                                        {course.batchSchedule || 'Weekday & Weekend Batches'}
                                                    </span>
                                                </div>
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

                        {/* ── 3. CAREER FOCUS SECTION (Full Width of Left 9 Cols) ── */}
                        {course.careerAreas && (
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
                                    {course.careerAreas.split(',').map((role, rIdx) => (
                                        <span key={rIdx} className="px-2.5 py-0.5 rounded-full bg-[#eef5ff] text-[#0055cc] text-[10.5px] font-medium border border-blue-200/80 hover:bg-blue-100 transition-colors">
                                            {role.trim()}
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
                                        Master {course.name}. Build In-Demand Skills. Shape Your Future.
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
                                    to={course.path ? course.path : "/ContactUs"}
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

                            {/* QR Code Widget - Desktop only (users on phone cannot scan their own screen) */}
                            <div className="hidden xl:flex my-1.5 justify-center">
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

    // Modal Component
    const CourseModal = () => {
        if (!isModalOpen || !selectedCourse) return null;

        return (
            <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
                <div className="max-w-7xl w-full max-h-[96vh] xl:h-[92vh] overflow-y-auto xl:overflow-hidden rounded-3xl flex flex-col no-scrollbar">
                    <CourseDetailsPoster course={selectedCourse} isModal={true} onClose={closeModal} />
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
                            <span>BUILD YOUR FUTURE WITH INDUSTRY-RELEVANT SKILLS</span>
                        </div>

                        {/* Main Heading: Exact wording and gradient styling with Homepage-like tablet & mobile typography */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.14] text-2xl sm:text-3xl md:text-[24px] lg:text-[34px] xl:text-[40px] tracking-tight mb-2 sm:mb-2.5">
                            Transform Your Career with{' '}
                            <span className="bg-gradient-to-r from-[#0055ff] via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent block sm:inline">
                                Industry-Ready Professional Courses
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-[#004b93] font-bold text-xs sm:text-[13px] md:text-[12px] lg:text-[13.5px] mb-2 sm:mb-2.5 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>Learn • Build • Grow with Practical, Career-Focused Training</span>
                        </p>

                        {/* Description */}
                        <p className="text-[#475569] text-xs sm:text-[13px] md:text-[11.5px] lg:text-[13px] leading-relaxed max-w-xl mb-3 sm:mb-3.5 font-normal">
                            Explore professional courses in Artificial Intelligence, Software Development, Data Analytics, Web Designing, UI/UX, Graphic Design, Digital Marketing, Cyber Security, Cloud Computing, Mobile App Development, Accounting, Foreign Languages and more.
                        </p>

                        {/* Mobile Only: Dedicated Student Visual Card (< 768px) with 3 Feature Badges on Left Open Space */}
                        <div className="block md:hidden my-3 relative rounded-2xl overflow-hidden shadow-md border-2 border-white h-[215px] w-full">
                            <img
                                src="/course_hero.png"
                                alt="Professional Courses Student"
                                className="w-full h-full object-cover object-[88%_center]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/50 via-transparent to-transparent pointer-events-none"></div>

                            {/* Slogan Badge Top-Right */}
                            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg shadow-xs rotate-[-3deg] border border-blue-100 z-10">
                                <span className="font-semibold text-[10.5px] text-[#1d4ed8]" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
                                    Learn • Grow • Succeed
                                </span>
                                <div className="w-10 h-0.5 bg-[#fed000] rounded-full mt-0.5"></div>
                            </div>

                            {/* 3 Pills placed on the left open space inside the image box */}
                            <div className="absolute inset-y-0 left-0 w-[58%] p-2.5 flex flex-col justify-around z-10">
                                {/* 1. Industry-Relevant Skills */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                        <Award className="w-3 h-3" />
                                    </div>
                                    <span className="text-[10.5px] font-bold text-[#00285e] leading-tight whitespace-nowrap">
                                        Industry-Relevant Skills
                                    </span>
                                </div>

                                {/* 2. Practical Labs & Projects */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                        <Zap className="w-3 h-3" />
                                    </div>
                                    <span className="text-[10.5px] font-bold text-[#00285e] leading-tight whitespace-nowrap">
                                        Practical Labs &amp; Projects
                                    </span>
                                </div>

                                {/* 3. Career-Focused Training */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                                        <Briefcase className="w-3 h-3" />
                                    </div>
                                    <span className="text-[10.5px] font-bold text-[#00285e] leading-tight whitespace-nowrap">
                                        Career-Focused Training
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
                                    Industry-Relevant Skills
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Zap className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs sm:text-[13px] font-bold text-[#00285e] whitespace-nowrap">
                                    Practical Labs &amp; Projects
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Briefcase className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs sm:text-[13px] font-bold text-[#00285e] whitespace-nowrap">
                                    Career-Focused Training
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons: Full-width stacked on Mobile, comfortable sizing on Tablet/Desktop */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                            <a
                                href="#courses-catalog"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs md:text-[11.5px] lg:text-[13px] px-6 md:px-4 lg:px-6 py-2.5 md:py-2 lg:py-2.5 rounded-full shadow-[0_6px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_22px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                            >
                                <span>Explore All Courses</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </a>
                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#00285e] hover:text-[#0055ff] font-bold text-xs md:text-[11.5px] lg:text-[13px] px-5 md:px-3.5 lg:px-5 py-2.5 md:py-2 lg:py-2.5 rounded-full border border-blue-200/90 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                            >
                                <PhoneCall className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Talk to a Course Counsellor</span>
                            </NavLink>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── 2. CATEGORY TABS & MAIN COURSES SECTION ── */}
            <div id="courses-catalog" className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
                
                {/* Staff Management Control Banner (Visible when logged in or PIN unlocked) */}
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
                                        {currentUser?.name ? `Faculty: ${currentUser.name}` : 'Staff Authorized'}
                                    </span>
                                </div>
                                <p className="text-[11px] text-purple-200/80 leading-tight mt-0.5">
                                    Staff controls active: Click "Staff Edit" to update or "Delete" to remove any course from the live catalog. You can also add new courses.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 relative z-10 w-full sm:w-auto justify-end flex-wrap">
                            <button
                                type="button"
                                onClick={async () => {
                                    if (window.confirm('Reset/Restore all default courses to the catalog?')) {
                                        await courseApi.seedDefault();
                                        showToast('All default courses and subjects restored successfully!', 'success');
                                    }
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                                title="Restore all default courses if any were deleted"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Restore Defaults</span>
                            </button>
                            <button
                                type="button"
                                onClick={openAddModal}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                <span>Add New Course</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 -mt-2 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowStaffUnlockModal(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 hover:border-purple-300 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                        >
                            <Lock className="w-3.5 h-3.5 text-purple-600" />
                            <span>Faculty / Staff Access (Edit &amp; Add Courses)</span>
                        </button>
                    </div>
                )}

                {/* Floating pill menu with dynamic colorful active states */}
                <div 
                    className="overflow-x-auto pb-2 mb-6 sm:mb-8 no-scrollbar -mt-2 sm:-mt-3 relative z-20 px-1 sm:px-2 touch-pan-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-1.5 sm:gap-2 min-w-max mx-auto justify-start lg:justify-center p-1 sm:p-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-slate-200/90">
                        {dbCategories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setSearchQuery('');
                                    }}
                                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs md:text-[13px] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? `bg-gradient-to-r ${cat.activeGrad} text-white shadow-md ${cat.activeShadow} scale-[1.02]`
                                            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200/80 hover:border-blue-300 shadow-2xs'
                                    }`}
                                >
                                    <span className={isActive ? 'text-white' : cat.iconColor}>{renderCategoryIcon(cat, "w-3.5 h-3.5 sm:w-4 sm:h-4")}</span>
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── 2. BANNER KE JUST UNDER — COLORFUL SEO INTRODUCTION (H1) ── */}
                <section className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] mb-6 sm:mb-8 relative overflow-hidden">
                    {/* Subtle ambient corner glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/80 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-sky-50/80 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center w-full">
                            
                            {/* Left Column (7 cols): Headings & Comprehensive Overview */}
                            <div className="md:col-span-7 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0055cc] text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase mb-2.5 sm:mb-3 border border-blue-200/80 shadow-2xs w-fit">
                                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0055cc]" />
                                    <span>Comprehensive Training Portfolio</span>
                                </div>

                                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0a2540] tracking-tight mb-2.5 sm:mb-3.5 leading-tight">
                                    Professional &amp; <span className="bg-gradient-to-r from-[#0055cc] via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Career-Oriented Courses</span>
                                </h1>

                                <div className="space-y-2 text-slate-600 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed font-normal">
                                    <p>
                                        Aayush Institute of Professional Studies offers a comprehensive range of professional, technical and career-oriented courses designed for students, graduates, working professionals and business owners. Our training programs cover Artificial Intelligence, Generative AI, Software &amp; Full Stack Development, Web Designing, Data Analytics, Cyber Security, Cloud Computing, UI/UX Design, Graphic Design, Video Editing, Mobile App Development, Digital Marketing, E-Commerce, Accounting, AutoCAD and more.
                                    </p>
                                    <p className="text-slate-500 text-[11px] sm:text-xs">
                                        Choose a course based on your career goals, current skill level and professional interests. Our practical learning approach focuses on relevant tools, hands-on assignments, projects and skills required for today's digital and professional workplace.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column (5 cols): 4 Feature Cards in a 2x2 Grid */}
                            <div className="md:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
                                <div className="flex flex-col justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f8fbff] hover:bg-blue-50/70 border border-blue-100/90 hover:border-blue-200 transition-all duration-200 group shadow-2xs">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 text-[#0066ff] flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] sm:text-[13px] font-bold text-[#0a2540] leading-tight">100% Practical</div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Project-Based Learning</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f6fcf8] hover:bg-emerald-50/70 border border-emerald-100/90 hover:border-emerald-200 transition-all duration-200 group shadow-2xs">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                                        <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] sm:text-[13px] font-bold text-[#0a2540] leading-tight">Certifications</div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Industry-Valued Credentials</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#faf8ff] hover:bg-purple-50/70 border border-purple-100/90 hover:border-purple-200 transition-all duration-200 group shadow-2xs">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11.5px] sm:text-[13px] font-bold text-[#0a2540] leading-tight">Industry Mentors</div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Expert Guided Training</div>
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
                                            <span>Placement Help*</span>
                                            <ArrowRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Interview &amp; Career Prep</div>
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
                                    <NavLink to="/UniversityCourses" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10.5px] sm:text-xs font-semibold border border-emerald-200 transition-all hover:scale-105">
                                        <span>🎓 University Programs</span>
                                    </NavLink>
                                    <NavLink to="/CorporateTraining" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-800 text-[10.5px] sm:text-xs font-semibold border border-orange-200 transition-all hover:scale-105">
                                        <span>🏢 Corporate Training</span>
                                    </NavLink>
                                    <NavLink to="/LiveProject" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-800 text-[10.5px] sm:text-xs font-semibold border border-purple-200 transition-all hover:scale-105">
                                        <span>🚀 Live Projects</span>
                                    </NavLink>
                                    <NavLink to="/Placement" className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 text-[10.5px] sm:text-xs font-semibold border border-rose-200 transition-all hover:scale-105">
                                        <span>💼 Placement Cell</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Active Category Header & Search Filter */}
                <div className="text-center mb-5 sm:mb-8 w-full">
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br ${activeCategoryInfo.headerGrad || 'from-blue-600 via-indigo-600 to-cyan-500'} text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md shadow-blue-500/20`}>
                        {isSearching ? <Search className="w-4 h-4 sm:w-5 sm:h-5" /> : renderCategoryIcon(activeCategoryInfo, "w-4 h-4 sm:w-5 sm:h-5")}
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-1.5 sm:mb-2">
                        <div className="w-6 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight">
                            {isSearching ? `Search Results (${displayedCourses.length})` : activeCategoryInfo.label}
                        </h2>
                        <div className="w-6 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-transparent rounded-full"></div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-3 font-normal px-2">
                        {isSearching
                            ? `Showing courses matching "${searchQuery}". Click any card to explore full highlights.`
                            : activeCategoryInfo.desc}
                    </p>

                    {!isSearching && (
                        <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border shadow-2xs mb-3 text-[10.5px] sm:text-xs font-semibold max-w-full text-center ${activeCategoryInfo.badgeColor}`}>
                            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate sm:whitespace-normal">Eligibility: {activeCategoryInfo.eligibility}</span>
                        </div>
                    )}

                    {/* Integrated Search Bar with Glowing Ring & Staff Quick Add */}
                    <div className="max-w-xl mx-auto flex items-center gap-2 mt-1 px-1">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses (e.g. Python, AI, Tally, IELTS)..."
                                className="w-full pl-9 sm:pl-11 pr-9 sm:pr-11 py-2 sm:py-2.5 rounded-full border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 shadow-xs placeholder:text-slate-400 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        {isStaff && (
                            <button
                                type="button"
                                onClick={openAddModal}
                                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                                title="Add New Course (Staff)"
                            >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                <span className="hidden sm:inline">Add Course</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* ── 3. 22 COURSES CARDS GRID (WITH COMPLETE DETAILS) ── */}
                {displayedCourses.length === 0 ? (
                    <div className="text-center py-10 sm:py-12 bg-white rounded-2xl border border-slate-100 p-6 max-w-lg mx-auto shadow-xs">
                        <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-700 mb-1">No courses found matching "{searchQuery}"</h3>
                        <p className="text-xs text-slate-500 mb-4">Try searching with a different keyword like "Python", "Tally", "Design", or "AI".</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="px-4 py-1.5 rounded-full bg-[#0066ff] text-white text-xs font-bold hover:bg-[#0055dd] transition-colors cursor-pointer"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : displayedCourses.length === 1 ? (
                    <div className="max-w-md mx-auto w-full">
                        <CourseCard course={displayedCourses[0]} index={0} />
                    </div>
                ) : displayedCourses.length === 2 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
                        {displayedCourses.map((course, idx) => (
                            <CourseCard key={course.id || idx} course={course} index={idx} />
                        ))}
                    </div>
                ) : displayedCourses.length === 3 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
                        {displayedCourses.map((course, idx) => (
                            <CourseCard key={course.id || idx} course={course} index={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 w-full">
                        {displayedCourses.map((course, idx) => (
                            <CourseCard key={course.id || idx} course={course} index={idx} />
                        ))}
                    </div>
                )}

                {/* ── 4. CATEGORY SPOTLIGHT, TOOLS & PRACTICAL HIGHLIGHTS (ENRICHED COLORFUL OVERVIEW) ── */}
                {!isSearching && currentSpotlight && (
                    <div className="mt-6 sm:mt-10 bg-gradient-to-br from-indigo-100/70 via-blue-50/80 to-purple-100/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-indigo-200/90 shadow-[0_12px_36px_rgba(79,70,229,0.08)] relative overflow-hidden">
                        {/* Ambient glow in background */}
                        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

                        {/* Header Badge, Title & CTA */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 sm:pb-5 border-b border-indigo-200/80 relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2 shadow-md shadow-blue-500/25">
                                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300" />
                                    <span>{currentSpotlight.tag}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a2540] tracking-tight">
                                    {currentSpotlight.title}
                                </h3>
                                <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed max-w-3xl mt-1 font-normal">
                                    {currentSpotlight.desc}
                                </p>
                            </div>

                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm font-bold shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] transition-all duration-200 flex-shrink-0 self-start sm:self-center cursor-pointer hover:scale-105 active:scale-95"
                            >
                                <PhoneCall className="w-3.5 h-3.5" />
                                <span>Get Syllabus</span>
                            </NavLink>
                        </div>


                        {/* 4 Colorful Highlights Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 my-6 relative z-10">
                            {currentSpotlight.highlights.map((hl, hIdx) => {
                                const hlThemes = [
                                    { 
                                        bg: "from-blue-100/95 via-blue-50/85 to-cyan-50/70", 
                                        border: "border-2 border-blue-300 hover:border-blue-500", 
                                        iconGrad: "from-blue-600 to-cyan-500", 
                                        shadow: "shadow-blue-500/35", 
                                        titleColor: "text-blue-950",
                                        cardShadow: "shadow-[0_8px_24px_rgba(37,99,235,0.12)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.2)]" 
                                    },
                                    { 
                                        bg: "from-purple-100/95 via-purple-50/85 to-fuchsia-50/70", 
                                        border: "border-2 border-purple-300 hover:border-purple-500", 
                                        iconGrad: "from-purple-600 to-pink-600", 
                                        shadow: "shadow-purple-500/35", 
                                        titleColor: "text-purple-950",
                                        cardShadow: "shadow-[0_8px_24px_rgba(147,51,234,0.12)] hover:shadow-[0_12px_30px_rgba(147,51,234,0.2)]" 
                                    },
                                    { 
                                        bg: "from-emerald-100/95 via-emerald-50/85 to-teal-50/70", 
                                        border: "border-2 border-emerald-300 hover:border-emerald-500", 
                                        iconGrad: "from-emerald-600 to-teal-600", 
                                        shadow: "shadow-emerald-500/35", 
                                        titleColor: "text-emerald-950",
                                        cardShadow: "shadow-[0_8px_24px_rgba(16,185,129,0.12)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.2)]" 
                                    },
                                    { 
                                        bg: "from-amber-100/95 via-amber-50/85 to-orange-50/70", 
                                        border: "border-2 border-amber-300 hover:border-amber-500", 
                                        iconGrad: "from-amber-500 to-orange-600", 
                                        shadow: "shadow-amber-500/35", 
                                        titleColor: "text-amber-950",
                                        cardShadow: "shadow-[0_8px_24px_rgba(245,158,11,0.12)] hover:shadow-[0_12px_30px_rgba(245,158,11,0.2)]" 
                                    }
                                ];
                                const hTheme = hlThemes[hIdx % hlThemes.length];

                                return (
                                    <div
                                        key={hIdx}
                                        className={`bg-gradient-to-br ${hTheme.bg} rounded-2xl p-4.5 border ${hTheme.border} ${hTheme.cardShadow} transition-all duration-300 hover:-translate-y-1`}
                                    >
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${hTheme.iconGrad} ${hTheme.shadow} text-white flex items-center justify-center flex-shrink-0 shadow-md`}>
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <h4 className={`text-xs sm:text-[13.5px] font-bold ${hTheme.titleColor} leading-snug`}>
                                                {hl.title}
                                            </h4>
                                        </div>
                                        <p className="text-slate-700 text-[11.5px] sm:text-xs leading-relaxed font-normal">
                                            {hl.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Row: Covered Tools + Career Advice */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 pt-4 border-t border-indigo-200/80 relative z-10">
                            {/* Tools Covered (7 cols on md+) */}
                            <div className="md:col-span-7 bg-white/95 rounded-2xl p-3.5 sm:p-5 border border-indigo-100 shadow-2xs">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Award className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-xs font-bold text-[#0a2540] uppercase tracking-wider">
                                        Key Tools &amp; Technologies Covered
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {currentSpotlight.tools.map((tool, tIdx) => {
                                        const chipPalettes = [
                                            "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs",
                                            "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-xs",
                                            "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs",
                                            "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs",
                                            "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs",
                                            "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs"
                                        ];
                                        const chipStyle = chipPalettes[tIdx % chipPalettes.length];
                                        return (
                                            <span
                                                key={tIdx}
                                                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 hover:scale-105 ${chipStyle}`}
                                            >
                                                {tool}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Career Advisory Callout (5 cols on md+) */}
                            <div className="md:col-span-5 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-indigo-400/30 shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-7 h-7 rounded-lg bg-white/20 text-cyan-300 flex items-center justify-center">
                                            <Briefcase className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                                            Career Scope &amp; Industry Relevance
                                        </span>
                                    </div>
                                    <p className="text-slate-200 text-[11.5px] sm:text-xs leading-relaxed font-normal">
                                        {currentSpotlight.careerAdvice}
                                    </p>
                                </div>
                                <div className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-white/15 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs">
                                    <span className="text-slate-300 font-normal">Have questions?</span>
                                    <NavLink to="/ContactUs" className="text-cyan-300 font-bold hover:text-white inline-flex items-center gap-1 transition-colors">
                                        Talk to Counsellor <ArrowRight className="w-3.5 h-3.5" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── 5. WHY CHOOSE AAYUSH INSTITUTE FOR PROFESSIONAL TRAINING? (COLORFUL CARDS) ── */}
                <section className="mt-10 sm:mt-14 lg:mt-18 pt-6 sm:pt-10 border-t border-slate-200/80">
                    <div className="text-center mb-6 sm:mb-10 max-w-2xl mx-auto px-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0062ff] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80 inline-block mb-2 shadow-2xs">
                            OUR COMMITMENT TO YOUR CAREER
                        </span>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight">
                            Why Choose Aayush Institute for Professional Training?
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                            Practical, industry-aligned education structured to transform aspirations into demonstrable workplace competencies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
                        {whyChoosePoints.map((point, idx) => {
                            const theme = whyChooseThemes[idx % whyChooseThemes.length];
                            return (
                                <div
                                    key={idx}
                                    className={`bg-gradient-to-br ${theme.cardBg} rounded-xl sm:rounded-2xl border-2 ${theme.border} shadow-[0_6px_22px_rgba(0,0,0,0.06)] ${theme.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group relative p-4 sm:p-5 lg:p-6`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br ${theme.iconGrad} ${theme.iconShadow} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                                {point.icon}
                                            </div>
                                            <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase ${theme.tagColor}`}>
                                                {theme.tag}
                                            </span>
                                        </div>

                                        <h3 className={`font-bold text-sm sm:text-[15.5px] mb-1.5 sm:mb-2 leading-snug transition-colors ${theme.titleColor}`}>
                                            {point.title}
                                        </h3>
                                        <p className="text-slate-700 text-xs sm:text-[12.5px] leading-relaxed font-normal">
                                            {point.desc}
                                        </p>
                                    </div>

                                    <div className={`pt-3 mt-3.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] sm:text-[11.5px] font-bold transition-colors ${theme.linkColor}`}>
                                        <span>Learn more with our counsellors</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── 6. COLORFUL SEO CONTENT SHOWCASE ── */}
                <section className="mt-10 sm:mt-14 lg:mt-16 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] relative overflow-hidden w-full">
                    {/* Ambient Blurred Corner Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/80 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-sky-50/80 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full">
                            {/* Left Column (7 cols on md+): Main Content */}
                            <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0055cc] text-[10.5px] sm:text-[11px] font-semibold tracking-wide uppercase mb-3 border border-blue-200/80 shadow-2xs">
                                        <BookOpen className="w-3.5 h-3.5 text-[#0055cc]" />
                                        <span>CAREER UPSKILLING &amp; EDUCATION</span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight mb-3 sm:mb-4">
                                        Professional Courses for <span className="bg-gradient-to-r from-[#0055cc] via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Students, Graduates &amp; Working Professionals</span>
                                    </h2>

                                    {/* 3 Value Stats Pills */}
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] sm:text-xs font-semibold shadow-2xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                            22+ Industry Programs
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80 text-[11px] sm:text-xs font-semibold shadow-2xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                                            Practical Project Labs
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] sm:text-xs font-semibold shadow-2xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                            Recognized Certification
                                        </span>
                                    </div>

                                    <div className="space-y-2.5 sm:space-y-3 text-slate-600 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed font-normal">
                                        <p>
                                            Looking for professional courses to build your career or upgrade your existing skills? Aayush Institute of Professional Studies provides a wide range of skill-based training programs for students, graduates, job seekers, working professionals and business owners.
                                        </p>
                                        <p>
                                            Our course portfolio includes AI and Generative AI, Full Stack Development, Web Designing, Data Analytics, Cyber Security, Cloud Computing, UI/UX Design, Graphic Designing, Video Editing, Mobile App Development, Digital Marketing, E-Commerce, Accounting, GST, AutoCAD, IT Support, IELTS, PTE and Foreign Language Training.
                                        </p>
                                        <p>
                                            Whether you are starting your first professional skill, preparing for a new career, improving your workplace capabilities or learning an international language, you can explore courses based on your eligibility, level and career objectives.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (5 cols on md+): Course Specializations Panel */}
                            <div className="md:col-span-5 xl:col-span-4 bg-[#f8fbff] rounded-2xl p-4 sm:p-5 lg:p-6 border border-blue-100/90 shadow-2xs flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-blue-100/80">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 text-[#0066ff] flex items-center justify-center flex-shrink-0 shadow-2xs">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs sm:text-sm font-bold text-[#0a2540]">Course Specializations</h3>
                                            <p className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium">Industry-aligned learning disciplines</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {[
                                            { name: "AI & GenAI", icon: <Cpu className="w-3 h-3" />, color: "bg-white text-blue-700 border-blue-200/90 hover:bg-blue-50" },
                                            { name: "Full Stack Web", icon: <Code className="w-3 h-3" />, color: "bg-white text-indigo-700 border-indigo-200/90 hover:bg-indigo-50" },
                                            { name: "Data Analytics", icon: <BarChart3 className="w-3 h-3" />, color: "bg-white text-purple-700 border-purple-200/90 hover:bg-purple-50" },
                                            { name: "Cyber Security", icon: <Shield className="w-3 h-3" />, color: "bg-white text-emerald-700 border-emerald-200/90 hover:bg-emerald-50" },
                                            { name: "Cloud Architecture", icon: <Database className="w-3 h-3" />, color: "bg-white text-amber-800 border-amber-200/90 hover:bg-amber-50" },
                                            { name: "UI/UX & Graphic", icon: <Palette className="w-3 h-3" />, color: "bg-white text-rose-700 border-rose-200/90 hover:bg-rose-50" },
                                            { name: "Accounting & GST", icon: <Calculator className="w-3 h-3" />, color: "bg-white text-teal-700 border-teal-200/90 hover:bg-teal-50" },
                                            { name: "AutoCAD 2D/3D", icon: <Settings className="w-3 h-3" />, color: "bg-white text-sky-700 border-sky-200/90 hover:bg-sky-50" },
                                            { name: "IELTS & Languages", icon: <Languages className="w-3 h-3" />, color: "bg-white text-violet-700 border-violet-200/90 hover:bg-violet-50" }
                                        ].map((item, iIdx) => (
                                            <span key={iIdx} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10.5px] sm:text-[11px] font-semibold border shadow-2xs transition-all ${item.color}`}>
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-blue-100/80 flex items-center justify-between gap-3">
                                    <span className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium">Need admissions help?</span>
                                    <NavLink
                                        to="/ContactUs"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#0a2540] hover:bg-[#0055cc] text-white text-[11px] sm:text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
                                    >
                                        <span>Contact Counsellor</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 7. FAQ SECTION — COLORFUL INTERACTIVE ACCORDIONS ── */}
                <section className="mt-10 sm:mt-14 lg:mt-18 pt-6 sm:pt-10 border-t border-slate-200/80">
                    <div className="text-center mb-6 sm:mb-10 max-w-2xl mx-auto px-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0062ff] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80 inline-block mb-2 shadow-2xs">
                            FREQUENTLY ASKED QUESTIONS
                        </span>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                            Find clear answers about courses, beginner eligibility, short-term options, and exam preparation programs.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
                        {courseFaqs.map((faq, fIdx) => {
                            const isOpen = openFaqIndex === fIdx;
                            return (
                                <div
                                    key={fIdx}
                                    className={`rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden ${
                                        isOpen
                                            ? 'bg-gradient-to-r from-blue-50/70 via-white to-indigo-50/40 border-blue-400/90 shadow-sm border-l-4 border-l-blue-600'
                                            : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-2xs'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                                        className="w-full text-left p-3.5 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                                                isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                ?
                                            </div>
                                            <span className={`text-xs sm:text-sm font-bold ${isOpen ? 'text-blue-950' : 'text-[#0a2540]'}`}>
                                                {faq.q}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                                                isOpen ? 'rotate-180 text-blue-600' : ''
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-3.5 pb-3.5 sm:px-4.5 sm:pb-4.5 pt-0 text-slate-600 text-xs sm:text-[13px] leading-relaxed border-t border-blue-100/60 font-normal pl-9 sm:pl-12">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── 8. VIBRANT GRADIENT CALL TO ACTION BANNER ── */}
                <div className="mt-10 sm:mt-14 lg:mt-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-[0_20px_50px_rgba(37,99,235,0.35)] relative overflow-hidden text-center md:text-left">
                    {/* Floating Ambient Glow Circles */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-xl">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 inline-block backdrop-blur-md border border-white/25">
                            ⚡ Personalized Career Counseling
                        </span>
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 leading-snug">
                            Need Guidance Choosing the Right Course?
                        </h3>
                        <p className="text-blue-100 text-xs sm:text-sm font-normal leading-relaxed">
                            Speak with our senior academic counsellors to match your educational background, timeline, and career goals with the best-fit program.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-2.5 sm:gap-3 w-full md:w-auto flex-shrink-0 relative z-10">
                        <NavLink
                            to="/ContactUs"
                            className="bg-white hover:bg-blue-50 text-[#003875] font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer text-center"
                        >
                            Connect with Counsellor
                        </NavLink>
                        <a
                            href="tel:+918800817447"
                            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-[#00285e] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer text-center"
                        >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>+91-8800817447</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Course Details Modal */}
            <CourseModal />

            {/* ===== STAFF PIN ACCESS MODAL ===== */}
            {showStaffUnlockModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.65)' }}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 relative border border-purple-100 animate-in fade-in zoom-in-95 duration-200">
                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => { setShowStaffUnlockModal(false); setStaffPinError(''); setStaffPinInput(''); }}
                            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4 text-slate-500" />
                        </button>

                        {/* Icon & Heading */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-500/25 mb-3">
                                <ShieldCheck className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#00285e]">Faculty Verification</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
                                Enter the 4-digit staff PIN to unlock course editing and publishing powers.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleStaffUnlockSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="password"
                                    maxLength={4}
                                    autoFocus
                                    value={staffPinInput}
                                    onChange={(e) => { setStaffPinInput(e.target.value.replace(/\D/g, '')); setStaffPinError(''); }}
                                    placeholder="••••"
                                    className={`w-full py-3 text-center text-2xl font-bold tracking-[0.5em] rounded-xl border-2 outline-none transition-all ${
                                        staffPinError ? 'border-rose-400 bg-rose-50/50 text-rose-700' : 'border-purple-200 bg-purple-50/60 focus:bg-white focus:border-purple-500 text-purple-800'
                                    }`}
                                />
                            </div>

                            {staffPinError && (
                                <div className="flex items-center justify-center gap-1.5 text-rose-600 text-xs font-medium">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span>{staffPinError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={staffPinInput.length !== 4}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md shadow-purple-500/25 hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Unlock className="w-4 h-4" />
                                <span>Unlock Faculty Mode</span>
                            </button>

                            <div className="pt-2 border-t border-slate-100 text-center">
                                <NavLink
                                    to="/login?type=staff"
                                    className="text-[11px] font-semibold text-purple-600 hover:text-purple-800 hover:underline"
                                >
                                    Or Sign In with Staff Account &rarr;
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== EDIT COURSE MODAL (STAFF ONLY) ===== */}
            {isEditModalOpen && editingCourse && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4" style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.65)' }}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col border border-purple-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-purple-300">
                                    <Edit3 className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-white">Edit Course</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/40">
                                            Staff Control
                                        </span>
                                    </div>
                                    <p className="text-xs text-purple-200/80">Updating: {editingCourse.name}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setIsEditModalOpen(false); setEditingCourse(null); }}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSaveEditCourse} className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Course Title */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Course Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all font-semibold text-slate-800"
                                    />
                                </div>

                                {/* Target Category */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={editFormData.category}
                                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    >
                                        {dbCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subgroup / Specialization */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Specialization Track / Subgroup
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.subgroup}
                                        onChange={(e) => setEditFormData({ ...editFormData, subgroup: e.target.value })}
                                        placeholder="e.g. Full Stack Engineering"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.duration}
                                        onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                        placeholder="e.g. 3–6 Months"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Level */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Level
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.level}
                                        onChange={(e) => setEditFormData({ ...editFormData, level: e.target.value })}
                                        placeholder="e.g. Beginner to Advanced"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Total Fee */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Course Total Fee (for Modal)
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.fee}
                                        onChange={(e) => setEditFormData({ ...editFormData, fee: e.target.value })}
                                        placeholder="e.g. ₹ 45,000/-"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 font-semibold"
                                    />
                                </div>

                                {/* Scholarship */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Scholarship Info
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.scholarship}
                                        onChange={(e) => setEditFormData({ ...editFormData, scholarship: e.target.value })}
                                        placeholder="e.g. Up to 50%"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Mode */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Delivery Mode
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.mode}
                                        onChange={(e) => setEditFormData({ ...editFormData, mode: e.target.value })}
                                        placeholder="e.g. Classroom / Online / Hybrid"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Batch Schedule */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Batch Schedule
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.batchSchedule}
                                        onChange={(e) => setEditFormData({ ...editFormData, batchSchedule: e.target.value })}
                                        placeholder="e.g. Weekday & Weekend Batches"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Eligibility */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Eligibility Requirements
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.eligibility}
                                        onChange={(e) => setEditFormData({ ...editFormData, eligibility: e.target.value })}
                                        placeholder="e.g. 12th / Graduates / BCA / B.Tech / Frontend Developers"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Course Highlights (Modal 8 Badges) */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Course Highlights (Modal Badges, 1 per line, max 8)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={editFormData.highlights}
                                        onChange={(e) => setEditFormData({ ...editFormData, highlights: e.target.value })}
                                        placeholder="React 18 Hooks & State Architecture&#10;Next.js 14 App Router & SSR/SSG&#10;RESTful & GraphQL API Architecture&#10;MongoDB NoSQL Aggregation Pipelines"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 font-mono text-[11px]"
                                    />
                                </div>

                                {/* Certification Title */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Certification Awarded
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.certification}
                                        onChange={(e) => setEditFormData({ ...editFormData, certification: e.target.value })}
                                        placeholder="e.g. Certified Full Stack Software Developer"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Popular Switch */}
                                <div className="sm:col-span-2 flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                                        <div>
                                            <div className="text-xs font-bold text-slate-800">Featured / Popular Badge</div>
                                            <div className="text-[11px] text-slate-500">Highlight this course with a glowing gold badge</div>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={editFormData.popular}
                                        onChange={(e) => setEditFormData({ ...editFormData, popular: e.target.checked })}
                                        className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                                    />
                                </div>

                                {/* One-Liner Summary */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        One-Line Summary *
                                    </label>
                                    <textarea
                                        rows={2}
                                        required
                                        value={editFormData.oneLiner}
                                        onChange={(e) => setEditFormData({ ...editFormData, oneLiner: e.target.value })}
                                        placeholder="Brief description of the course..."
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 resize-none"
                                    />
                                </div>

                                {/* Key Skills */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Key Skills (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.skills}
                                        onChange={(e) => setEditFormData({ ...editFormData, skills: e.target.value })}
                                        placeholder="e.g. React, Node.js, REST APIs, MongoDB, Git"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Features / Highlights */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Key Curriculum Highlights (one per line)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={editFormData.features}
                                        onChange={(e) => setEditFormData({ ...editFormData, features: e.target.value })}
                                        placeholder="Curriculum feature 1&#10;Curriculum feature 2&#10;Curriculum feature 3"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 font-mono text-[11px]"
                                    />
                                </div>

                                {/* Image URL with quick presets */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Thumbnail Image URL
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.image}
                                        onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 mb-2"
                                    />
                                    <div className="flex flex-wrap gap-1.5 items-center">
                                        <span className="text-[10.5px] text-slate-400 font-medium">Quick Presets:</span>
                                        {[
                                            { label: 'MERN', url: '/course_mern.jpg' },
                                            { label: 'Web Design', url: '/course_web_design.jpg' },
                                            { label: 'UI/UX', url: '/course_ui_ux.jpg' },
                                            { label: 'Graphic Design', url: '/course_graphic_design.jpg' },
                                            { label: 'Python', url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80' },
                                            { label: 'AI & Data', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' }
                                        ].map((preset, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setEditFormData({ ...editFormData, image: preset.url })}
                                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 border border-slate-200 transition-colors cursor-pointer"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteCourse(editingCourse.id)}
                                    className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Course</span>
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditModalOpen(false); setEditingCourse(null); }}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                                    >
                                        <Check className="w-3.5 h-3.5" />
                                        <span>Save Changes</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== ADD NEW COURSE MODAL (STAFF ONLY) ===== */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4" style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.65)' }}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300">
                                    <Plus className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-white">Publish New Course</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                                            Faculty Portal
                                        </span>
                                    </div>
                                    <p className="text-xs text-emerald-200/80">Add a verified program to the Aayush Institute catalog</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSaveNewCourse} className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Course Title */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Course Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={addFormData.name}
                                        onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                                        placeholder="e.g. Next.js 14 & Full Stack Architecture"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-semibold text-slate-800"
                                    />
                                </div>

                                {/* Target Category */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Target Category *
                                    </label>
                                    <select
                                        value={addFormData.category}
                                        onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    >
                                        {dbCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subgroup */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Specialization Track / Subgroup
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.subgroup}
                                        onChange={(e) => setAddFormData({ ...addFormData, subgroup: e.target.value })}
                                        placeholder="e.g. Web & Software Engineering"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.duration}
                                        onChange={(e) => setAddFormData({ ...addFormData, duration: e.target.value })}
                                        placeholder="e.g. 3–6 Months"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Level */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Level
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.level}
                                        onChange={(e) => setAddFormData({ ...addFormData, level: e.target.value })}
                                        placeholder="e.g. Beginner to Advanced"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Certification */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Certification Awarded
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.certification}
                                        onChange={(e) => setAddFormData({ ...addFormData, certification: e.target.value })}
                                        placeholder="e.g. Certified Full Stack Specialist"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Popular Switch */}
                                <div className="sm:col-span-2 flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                                        <div>
                                            <div className="text-xs font-bold text-slate-800">Featured / Popular Program</div>
                                            <div className="text-[11px] text-slate-500">Show with a prominent golden badge on the card</div>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={addFormData.popular}
                                        onChange={(e) => setAddFormData({ ...addFormData, popular: e.target.checked })}
                                        className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                    />
                                </div>

                                {/* One-Liner */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        One-Line Summary *
                                    </label>
                                    <textarea
                                        rows={2}
                                        required
                                        value={addFormData.oneLiner}
                                        onChange={(e) => setAddFormData({ ...addFormData, oneLiner: e.target.value })}
                                        placeholder="Brief description summarizing the course benefits..."
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 resize-none"
                                    />
                                </div>

                                {/* Skills */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Key Skills (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.skills}
                                        onChange={(e) => setAddFormData({ ...addFormData, skills: e.target.value })}
                                        placeholder="e.g. Python, SQL, REST APIs, Docker, Git"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                {/* Features */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Curriculum Highlights (one per line)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={addFormData.features}
                                        onChange={(e) => setAddFormData({ ...addFormData, features: e.target.value })}
                                        placeholder="Practical assignments & capstones&#10;Industry-recognized certification&#10;Placement interview support"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 font-mono text-[11px]"
                                    />
                                </div>

                                {/* Image URL & presets */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Thumbnail Image URL
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.image}
                                        onChange={(e) => setAddFormData({ ...addFormData, image: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 mb-2"
                                    />
                                    <div className="flex flex-wrap gap-1.5 items-center">
                                        <span className="text-[10.5px] text-slate-400 font-medium">Quick Presets:</span>
                                        {[
                                            { label: 'MERN', url: '/course_mern.jpg' },
                                            { label: 'Web Design', url: '/course_web_design.jpg' },
                                            { label: 'UI/UX', url: '/course_ui_ux.jpg' },
                                            { label: 'Python', url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80' },
                                            { label: 'AI & Data', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' }
                                        ].map((preset, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setAddFormData({ ...addFormData, image: preset.url })}
                                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-colors cursor-pointer"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Buttons */}
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
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                                >
                                    <Plus className="w-4 h-4 stroke-[2.5]" />
                                    <span>Publish Course</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toastMsg && (
                <div className="fixed bottom-6 right-6 z-[99999] bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{toastMsg.text}</span>
                </div>
            )}
        </div>
    );
};

export default Courses;