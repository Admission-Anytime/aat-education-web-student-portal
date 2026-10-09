import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Terminal,
    Layers,
    Database,
    Server,
    Cpu,
    Globe,
    Code2,
    CheckCircle2,
    ArrowRight,
    BookOpen,
    Shield,
    Download,
    Phone,
    MessageSquare,
    ChevronDown,
    Rocket,
    Monitor,
    Briefcase,
    Award,
    Users,
    Check,
    Star,
    Search,
    Workflow,
    Lock,
    GitBranch,
    Cloud,
    CheckSquare,
    Sparkles,
    Calendar,
    Laptop,
    HelpCircle,
    X,
    Filter
} from 'lucide-react';

const technologyTracks = [
    {
        name: 'MERN Full Stack',
        stack: 'MongoDB • Express • React • Node.js',
        desc: 'Most in-demand modern JavaScript ecosystem for building scalable web apps, interactive single-page applications, and high-performance REST APIs.',
        badge: 'Industry Leading',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/50',
        borderColor: 'border-2 border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        badgeColor: 'bg-blue-600 text-white shadow-xs shadow-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/35',
        glow: 'from-blue-500 to-cyan-400',
        accentText: 'text-blue-700',
        highlight: 'Ideal for modern startups, fast-growing tech product firms, and SaaS platforms.'
    },
    {
        name: 'Python Full Stack',
        stack: 'Python • Django / FastAPI • PostgreSQL • React',
        desc: 'Powerful programming paradigm pairing high-level Python backend architectures with modern reactive interfaces and data science integration.',
        badge: 'Data & AI Ready',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/50',
        borderColor: 'border-2 border-emerald-200 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        badgeColor: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/35',
        glow: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-700',
        highlight: 'Perfect for data-driven applications, automation scripting, and AI-enabled platforms.'
    },
    {
        name: 'Java Full Stack',
        stack: 'Core Java • Spring Boot • Hibernate • MySQL / React',
        desc: 'Rock-solid enterprise architecture powering high-throughput banking solutions, microservices, and robust corporate software applications.',
        badge: 'Enterprise Core',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/50',
        borderColor: 'border-2 border-purple-200 hover:border-purple-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        badgeColor: 'bg-purple-600 text-white shadow-xs shadow-purple-500/30',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/35',
        glow: 'from-purple-500 to-fuchsia-400',
        accentText: 'text-purple-700',
        highlight: 'Favored by Fortune 500 multinationals, corporate banking systems, and IT giants.'
    },
    {
        name: 'PHP & Web Stack',
        stack: 'PHP • Laravel / CodeIgniter • MySQL • JavaScript',
        desc: 'Time-tested web development stack driving widespread web portals, e-commerce engines, custom CMS platforms, and scalable business tools.',
        badge: 'High Employment',
        cardBg: 'from-amber-100/90 via-amber-50/60 to-orange-50/50',
        borderColor: 'border-2 border-amber-200 hover:border-amber-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
        badgeColor: 'bg-amber-600 text-white shadow-xs shadow-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/35',
        glow: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-800',
        highlight: 'Great for digital agencies, e-commerce platforms, and high-frequency freelance projects.'
    }
];

const modules = [
    {
        id: '01',
        category: 'foundation',
        title: 'Computer & Programming Fundamentals',
        subtitle: 'Build a rock-solid technical baseline before advancing into complex application engineering.',
        icon: Terminal,
        badge: 'Foundation',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-sky-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-blue-600'
        },
        topics: [
            'Computer Fundamentals & System Architecture',
            'Operating System Basics (Linux & Windows CLI)',
            'Internet Protocols: HTTP, HTTPS, TCP/IP, DNS',
            'Software Development Concepts & Programming Paradigms',
            'Programming Logic, Algorithms & Flowchart Design',
            'Problem-Solving Techniques & Algorithmic Thinking',
            'Basic Data Structures (Arrays, Lists, Stacks, Queues)',
            'Development Environment: VS Code, Extensions & Tooling',
            'Command Line Interface (CLI) & Terminal Commands',
            'Introduction to Version Control (Git Basics)'
        ]
    },
    {
        id: '02',
        category: 'frontend',
        title: 'HTML5 — Semantic Web Architecture',
        subtitle: 'Structure modern web applications cleanly with international W3C standards.',
        icon: Code2,
        badge: 'Web Structure',
        theme: {
            cardBg: 'from-orange-50/90 via-white to-amber-50/40',
            border: 'border-orange-200 hover:border-orange-400',
            badge: 'bg-orange-600 text-white shadow-xs shadow-orange-500/20',
            iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-xs',
            accent: 'text-orange-600'
        },
        topics: [
            'HTML5 Standards, Doctype & Document Structure',
            'Semantic Elements: <header>, <nav>, <main>, <section>, <article>, <footer>',
            'Typography, Headings Hierarchy & Ordered/Unordered Lists',
            'Hyperlinks, Relative/Absolute Paths & Anchor Navigation',
            'Images, SVG Graphics, Audio & Video Media Players',
            'Structured Data Tables & Responsive Table Displays',
            'Forms, Inputs, Validation Attributes & Form Submission',
            'Clean Code Organization & Accessibility (a11y) Guidelines',
            'Meta Tags, Open Graph Protocol & SEO Basics',
            'Embedding iFrames, Maps & External Web Widgets'
        ]
    },
    {
        id: '03',
        category: 'frontend',
        title: 'CSS3 — Modern Responsive Interface Design',
        subtitle: 'Master responsive layouts, Flexbox, Grid, transitions, and contemporary UI patterns.',
        icon: Monitor,
        badge: 'UI Styling',
        theme: {
            cardBg: 'from-sky-50/90 via-white to-cyan-50/40',
            border: 'border-sky-200 hover:border-sky-400',
            badge: 'bg-sky-600 text-white shadow-xs shadow-sky-500/20',
            iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xs',
            accent: 'text-sky-600'
        },
        topics: [
            'CSS Fundamentals, Specificity, Inheritance & Cascade Rules',
            'Selectors (Class, ID, Pseudo-classes, Pseudo-elements)',
            'Box Model Mastery: Content, Padding, Border, Margin & Box-Sizing',
            'Web Typography, Font Pairing, Line Heights & Google Fonts',
            'Color Systems: HEX, RGB, HSL, Alpha & Modern Gradients',
            'CSS Flexbox Architecture: Alignment, Direction, Wrapping & Justify',
            'CSS Grid Systems: 2D Multi-Column Layouts & Template Areas',
            'Mobile-First Responsive Web Design Philosophy',
            'Media Queries, Custom Breakpoints & Dynamic Viewport Sizing',
            'CSS Transitions, Keyframe Animations, Transform & Shadows'
        ]
    },
    {
        id: '04',
        category: 'frontend',
        title: 'JavaScript (Core to Advanced ES6+)',
        subtitle: 'Engine of modern web applications: asynchronous logic, DOM manipulation, and data handling.',
        icon: Cpu,
        badge: 'Programming Core',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-yellow-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xs',
            accent: 'text-amber-700'
        },
        topics: [
            'JavaScript Runtime, Execution Context & Call Stack',
            'Variables (let, const), Data Types & Type Coercion',
            'Operators, Expressions & Truthy/Falsy Evaluation',
            'Control Flow: Conditionals (if/else, switch) & Loops (for, while, for..of)',
            'Functions, Scope Chains, Closures & Modern Arrow Functions',
            'Arrays, Higher-Order Methods (map, filter, reduce, find, some)',
            'Objects, Destructuring, Spread/Rest Operators & Template Literals',
            'DOM Manipulation, Selecting Nodes, Elements Creation & Event Delegation',
            'Form Validation, Input Sanitization & Real-Time Event Handling',
            'Asynchronous JavaScript: Callbacks, Promises, and Async / Await',
            'Fetch API, Axios, JSON Serialization & HTTP Response Codes',
            'Browser Storage: localStorage, sessionStorage & Cookies',
            'Robust Error Handling with try / catch / finally blocks'
        ]
    },
    {
        id: '05',
        category: 'frontend',
        title: 'Frontend Development (React JS & Modern Tools)',
        subtitle: 'Component-driven frontend engineering powering fast, reactive single-page applications.',
        icon: Layers,
        badge: 'React & UI Frameworks',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-blue-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'React Fundamentals, Virtual DOM & Reconciliation Engine',
            'Component-Driven Architecture: Functional Components & JSX',
            'Props, Component State & Unidirectional Data Flow',
            'Essential React Hooks: useState, useEffect, useRef, useMemo, useCallback',
            'Controlled Form Components & Multi-Input State Handlers',
            'Client-Side Routing with React Router DOM (v6+)',
            'API Integration, Loading States & Error Boundaries',
            'Global State Management Fundamentals (Context API / Redux Toolkit)',
            'Modular CSS, Tailwind CSS Integration & Styled Components',
            'Modern Build Tools: Vite, npm/yarn Package Management & Production Bundling'
        ]
    },
    {
        id: '06',
        category: 'backend',
        title: 'Backend Development (Server-Side Architecture)',
        subtitle: 'Develop robust, scalable server applications, business logic pipelines, and data controllers.',
        icon: Server,
        badge: 'Backend Architecture',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'Node.js Runtime Architecture, Event Loop & Non-Blocking I/O',
            'Express.js Server Setup, Configuration & Application Lifecycle',
            'Server-Side Routing, Route Parameters & Query Strings',
            'Middleware Pipeline: Logging, Parsing, Error Handling & Authentication',
            'Request & Response Lifecycles, HTTP Status Codes & Headers',
            'MVC (Model-View-Controller) Architectural Pattern',
            'Environment Variables Configuration (.env) & Secrets Management',
            'File System Operations, Multi-Part Uploads with Multer',
            'Server-Side Data Validation with Zod / Joi',
            'Alternative Stacks Overview: Python (Django/FastAPI) or Java (Spring Boot)'
        ]
    },
    {
        id: '07',
        category: 'databases',
        title: 'Database Management (SQL & NoSQL)',
        subtitle: 'Model, query, and optimize enterprise relational tables and flexible document stores.',
        icon: Database,
        badge: 'Databases',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'Database Paradigms: Relational (RDBMS) vs Document NoSQL',
            'Relational Schema Design: Entities, Tables, Columns & Primary/Foreign Keys',
            'SQL CRUD Operations: INSERT, SELECT, UPDATE, DELETE with Constraints',
            'Complex SQL Queries: Aggregations, GROUP BY, HAVING, ORDER BY',
            'Table Relationships & SQL Joins (INNER, LEFT, RIGHT, FULL OUTER)',
            'PostgreSQL & MySQL Database Administration Basics',
            'NoSQL Architecture with MongoDB: Databases, Collections & BSON Documents',
            'MongoDB CRUD Queries, Indexing & Query Optimization',
            'MongoDB Aggregation Pipeline for Analytics & Reporting',
            'Object Data Modeling (ODM) with Mongoose / Prisma ORM'
        ]
    },
    {
        id: '08',
        category: 'backend',
        title: 'RESTful API Engineering & Integration',
        subtitle: 'Connect decoupled client interfaces with high-performance backend web services.',
        icon: Workflow,
        badge: 'API Engineering',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'REST Architectural Constraints & Stateless Client-Server Communication',
            'HTTP Verbs: GET (Read), POST (Create), PUT/PATCH (Update), DELETE (Remove)',
            'Standardized JSON Request Payloads & Structured Response Schemas',
            'API Pagination, Sorting, Search Filtering & Field Selection',
            'API Endpoint Testing & Documentation using Postman / Swagger',
            'Cross-Origin Resource Sharing (CORS) Setup & Security Headers',
            'Third-Party API Integration: Payment Gateways (Razorpay/Stripe), SMS & Email',
            'Rate Limiting, API Throttling & DDoS Protection Basics',
            'Webhooks Architecture & Event-Driven API Notifications'
        ]
    },
    {
        id: '09',
        category: 'tools',
        title: 'Authentication, Authorization & Web Security',
        subtitle: 'Protect user credentials, secure sensitive routes, and mitigate common web vulnerabilities.',
        icon: Lock,
        badge: 'Web Security',
        theme: {
            cardBg: 'from-rose-50/90 via-white to-pink-50/40',
            border: 'border-rose-200 hover:border-rose-400',
            badge: 'bg-rose-600 text-white shadow-xs shadow-rose-500/20',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
            accent: 'text-rose-700'
        },
        topics: [
            'User Registration, Login Lifecycle & Password Hashing with Bcrypt',
            'JSON Web Tokens (JWT): Payload Signing, Verification & Expiry',
            'Refresh Token Strategies & Secure Cookie Handling (httpOnly, sameSite)',
            'Role-Based Access Control (RBAC): Admin, Staff, Student Permissions',
            'Input Validation, XSS (Cross-Site Scripting) Prevention & Sanitization',
            'SQL Injection & NoSQL Injection Defense Patterns',
            'Cross-Site Request Forgery (CSRF) Tokens & Protection',
            'Secure Headers with Helmet.js & SSL/TLS Fundamentals',
            'Password Reset Workflows with Secure Email Tokens'
        ]
    },
    {
        id: '10',
        category: 'tools',
        title: 'Git, GitHub & Collaborative Engineering',
        subtitle: 'Master industry-standard version control, team workflows, and code repositories.',
        icon: GitBranch,
        badge: 'Version Control',
        theme: {
            cardBg: 'from-violet-50/90 via-white to-purple-50/40',
            border: 'border-violet-200 hover:border-violet-400',
            badge: 'bg-violet-600 text-white shadow-xs shadow-violet-500/20',
            iconBg: 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-violet-700'
        },
        topics: [
            'Distributed Version Control Principles & Git Architecture',
            'Git CLI Commands: init, clone, status, add, commit, log, diff',
            'Branching Strategies: main, develop, feature branches & hotfixes',
            'Merging Branches, Understanding Merge Commits & Resolving Conflicts',
            'Remote Repositories on GitHub: push, pull, fetch, remotes',
            'Pull Requests (PRs), Code Reviews, Comments & Approvals',
            'Writing Professional Commit Messages & .gitignore Best Practices',
            'GitHub Markdown README Portfolios & Open Source Collaboration'
        ]
    },
    {
        id: '11',
        category: 'tools',
        title: 'Software Development Lifecycle (SDLC & Agile)',
        subtitle: 'Understand how real-world software products transition from concept to production.',
        icon: CheckSquare,
        badge: 'SDLC & Practices',
        theme: {
            cardBg: 'from-indigo-50/90 via-white to-blue-50/40',
            border: 'border-indigo-200 hover:border-indigo-400',
            badge: 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20',
            iconBg: 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-xs',
            accent: 'text-indigo-700'
        },
        topics: [
            'Software Development Life Cycle Phases: Plan, Code, Test, Deploy, Maintain',
            'Agile Methodology, Scrum Ceremonies, Sprints, Stand-ups & Backlogs',
            'Requirements Gathering, User Stories & Product Scope Definition',
            'System Architecture Design & Entity-Relationship (ER) Modeling',
            'Clean Code Principles: DRY (Don’t Repeat Yourself), KISS & Modularization',
            'Writing Technical Documentation, Architecture Notes & API References',
            'Code Refactoring Techniques & Managing Technical Debt',
            'Production Deployment Readiness Checklists'
        ]
    },
    {
        id: '12',
        category: 'tools',
        title: 'Testing, Debugging & Performance Optimization',
        subtitle: 'Eliminate software bugs, write unit tests, and optimize application speed.',
        icon: Shield,
        badge: 'QA & Testing',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'Systematic Debugging Mindset & Bug Isolation Techniques',
            'Chrome & Browser DevTools: Console, Network, Elements, Memory & Profiler',
            'Server-Side Debugging with Node.js Inspectors & Loggers (Winston/Morgan)',
            'Automated Testing Overview: Unit, Integration & End-to-End (E2E) Tests',
            'API Endpoint Testing with Postman Test Scripts & Assertions',
            'Frontend Component Testing Concepts with Jest & React Testing Library',
            'Handling Edge Cases, Graceful Degradation & Fallback UI States',
            'Core Web Vitals Optimization: Image Compression, Lazy Loading & Caching'
        ]
    },
    {
        id: '13',
        category: 'tools',
        title: 'Cloud Deployment, DevOps & Production Hosting',
        subtitle: 'Deploy full-stack applications with custom domains, continuous delivery, and cloud databases.',
        icon: Cloud,
        badge: 'DevOps & Cloud',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-cyan-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xs',
            accent: 'text-blue-700'
        },
        topics: [
            'Modern Cloud Hosting Ecosystems: PaaS, IaaS & Static CDNs',
            'Deploying Frontend Single-Page Apps (Vercel, Netlify, Cloudflare)',
            'Deploying Backend Web Services (Render, Railway, DigitalOcean, AWS EC2)',
            'Cloud Managed Databases: MongoDB Atlas, Supabase, Neon PostgreSQL',
            'Domain Configuration: DNS Records (A, CNAME, TXT), SSL/HTTPS Certificates',
            'Cloud Environment Variables & Production Security Policies',
            'Continuous Integration & Continuous Deployment (CI/CD) with GitHub Actions',
            'Server Monitoring, Health Check Endpoints & Error Tracking'
        ]
    },
    {
        id: '14',
        category: 'capstone',
        title: 'Real-World Capstone Project & Portfolio Engineering',
        subtitle: 'Build production-grade full-stack digital products to showcase to prospective employers.',
        icon: Rocket,
        badge: 'Capstone Portfolio',
        theme: {
            cardBg: 'from-fuchsia-50/90 via-white to-purple-50/40',
            border: 'border-fuchsia-200 hover:border-fuchsia-400',
            badge: 'bg-fuchsia-600 text-white shadow-xs shadow-fuchsia-500/20',
            iconBg: 'bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white shadow-xs',
            accent: 'text-fuchsia-700'
        },
        topics: [
            'End-to-End Enterprise Full-Stack Application Conceptualization',
            'Database Modeling, API Specification & Architecture Setup',
            'Interactive Frontend Implementation with Responsive Design & State Management',
            'Secure Backend Services with JWT Authentication & Data Validation',
            'Third-Party Services: Payment Processing, Email Alerts, Cloud Storage',
            'Live Production Cloud Deployment with Custom Domain Support',
            'Technical Documentation, Architectural Diagramming & GitHub Repo Presentation',
            'Resume Preparation, Portfolio Showcase Website & Mock Technical Interviews'
        ]
    }
];

const projects = [
    {
        tier: 'Tier 1: Beginner Frontend Projects',
        tag: 'Foundation',
        tagBg: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/25',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md',
        glow: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        items: [
            { name: 'Personal Developer Portfolio', desc: 'Fully responsive developer portfolio built with semantic HTML5, modern CSS3 Flexbox/Grid, and JavaScript interactivity.' },
            { name: 'Interactive Task & Note App', desc: 'Dynamic client-side productivity app featuring local storage persistence, filtering, and smooth UI animations.' },
            { name: 'Responsive Business Landing Page', desc: 'Mobile-first corporate promotional webpage with CSS modern layouts, modal dialogs, and interactive pricing tables.' }
        ]
    },
    {
        tier: 'Tier 2: Intermediate Full Stack Apps',
        tag: 'Full Stack',
        tagBg: 'bg-blue-600 text-white shadow-xs shadow-blue-500/25',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-indigo-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md',
        glow: 'from-blue-500 to-indigo-400',
        titleColor: 'text-blue-950',
        items: [
            { name: 'E-Commerce Storefront & Cart', desc: 'React-powered shopping portal with product catalog filtering, real-time cart state management, and mock checkout flow.' },
            { name: 'Blog & Content Management Engine', desc: 'Node.js + Express backend with MongoDB database, markdown editor, category filters, and RESTful API endpoints.' },
            { name: 'User Authentication & Dashboard Portal', desc: 'JWT-based authentication system featuring registration, login, protected routes, and profile management.' }
        ]
    },
    {
        tier: 'Tier 3: Advanced Enterprise Capstones',
        tag: 'Enterprise',
        tagBg: 'bg-purple-600 text-white shadow-xs shadow-purple-500/25',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md',
        glow: 'from-purple-500 to-violet-400',
        titleColor: 'text-purple-950',
        items: [
            { name: 'Real-Time Team Collaboration Suite', desc: 'Full-stack collaborative portal featuring WebSockets/Socket.io, channels, instant messaging, and role permissions.' },
            { name: 'Online Multi-Vendor Marketplace', desc: 'Complete marketplace with seller dashboards, buyer reviews, payment gateway integration (Razorpay/Stripe), and order tracking.' },
            { name: 'AI-Assisted Productivity SaaS App', desc: 'Modern full-stack web application integrating generative AI APIs (OpenAI/Anthropic) for automated content generation and task summaries.' }
        ]
    }
];

const careerRoles = [
    {
        title: 'Full Stack Developer',
        desc: 'Build both client interfaces and server applications for tech firms and agencies.',
        cardBg: 'from-blue-100/90 via-blue-50/70 to-indigo-50/50',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        titleColor: 'text-blue-950 group-hover:text-blue-600'
    },
    {
        title: 'Frontend Engineer',
        desc: 'Specialize in modern React, responsive UI design, and interactive single-page apps.',
        cardBg: 'from-cyan-100/90 via-cyan-50/70 to-sky-50/50',
        border: 'border-2 border-cyan-200 hover:border-cyan-500',
        iconBg: 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-500/30',
        titleColor: 'text-cyan-950 group-hover:text-cyan-600'
    },
    {
        title: 'Backend Developer',
        desc: 'Architect robust RESTful APIs, database queries, authentication systems, and cloud logic.',
        cardBg: 'from-emerald-100/90 via-emerald-50/70 to-teal-50/50',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        titleColor: 'text-emerald-950 group-hover:text-emerald-600'
    },
    {
        title: 'Software Engineer',
        desc: 'Design, write, test, and deploy functional software systems in product companies.',
        cardBg: 'from-purple-100/90 via-purple-50/70 to-violet-50/50',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
        titleColor: 'text-purple-950 group-hover:text-purple-600'
    },
    {
        title: 'Web App Specialist',
        desc: 'Maintain, optimize, and build scalable websites, CMS platforms, and web portals.',
        cardBg: 'from-amber-100/90 via-amber-50/70 to-orange-50/50',
        border: 'border-2 border-amber-200 hover:border-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
        titleColor: 'text-amber-950 group-hover:text-amber-600'
    }
];

const skillsWithThemes = [
    { name: 'HTML5 Semantic Structure', bg: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
    { name: 'Responsive CSS3 & Flex/Grid', bg: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { name: 'JavaScript (ES6+) Core & Async', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'React JS & Virtual DOM', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
    { name: 'Component-Driven Architecture', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'Node.js & Express.js Servers', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'RESTful API Engineering', bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { name: 'MongoDB & SQL Database Design', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'CRUD Operations & Complex Queries', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'JWT Authentication & Web Security', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { name: 'Git & GitHub Team Workflows', bg: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
    { name: 'Postman API Testing', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'DevOps & Cloud Deployment', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'Agile & SDLC Methodologies', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Performance Optimization', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' }
];

const roadmapStages = [
    { step: '01', stage: 'BEGINNER', desc: 'Computers & Programming Fundamentals', cardBg: 'from-blue-100/90 via-blue-50/60 to-white', border: 'border-2 border-blue-200 hover:border-blue-400', stepColor: 'text-blue-600', dotBg: 'bg-blue-600' },
    { step: '02', stage: 'LOGIC & CORE', desc: 'Programming Logic, Algorithms & CLI', cardBg: 'from-indigo-100/90 via-indigo-50/60 to-white', border: 'border-2 border-indigo-200 hover:border-indigo-400', stepColor: 'text-indigo-600', dotBg: 'bg-indigo-600' },
    { step: '03', stage: 'FRONTEND UI', desc: 'HTML5, CSS3, Flexbox/Grid & JavaScript', cardBg: 'from-cyan-100/90 via-cyan-50/60 to-white', border: 'border-2 border-cyan-200 hover:border-cyan-400', stepColor: 'text-cyan-700', dotBg: 'bg-cyan-600' },
    { step: '04', stage: 'REACT & SPA', desc: 'React Hooks, Routing & State Management', cardBg: 'from-teal-100/90 via-teal-50/60 to-white', border: 'border-2 border-teal-200 hover:border-teal-400', stepColor: 'text-teal-700', dotBg: 'bg-teal-600' },
    { step: '05', stage: 'BACKEND & DB', desc: 'Express Servers, REST APIs & Databases', cardBg: 'from-purple-100/90 via-purple-50/60 to-white', border: 'border-2 border-purple-200 hover:border-purple-400', stepColor: 'text-purple-600', dotBg: 'bg-purple-600' },
    { step: '06', stage: 'FULL STACK PRO', desc: 'Capstone Project, Cloud Deploy & Interviews', cardBg: 'from-rose-100/90 via-rose-50/60 to-white', border: 'border-2 border-rose-200 hover:border-rose-400', stepColor: 'text-rose-600', dotBg: 'bg-rose-600' }
];

const faqItems = [
    {
        q: 'Do I need prior coding experience to join this IT & Full Stack course?',
        a: 'No prior programming experience is required. The curriculum begins with Module 01 (Computer & Programming Fundamentals), building programming logic, problem-solving skills, and web concepts from absolute scratch before progressing to advanced frameworks.'
    },
    {
        q: 'What technology stack options are available in this program?',
        a: 'While our core curriculum emphasizes the industry-standard MERN Stack (MongoDB, Express, React, Node.js), students can also explore Python Full Stack (Django/FastAPI), Java Full Stack (Spring Boot), or PHP & MySQL based on their career goals.'
    },
    {
        q: 'Will I work on live hands-on projects during the course?',
        a: 'Yes! Hands-on project work is central to our pedagogy. You will build Tier 1 beginner web interfaces, Tier 2 intermediate full-stack apps, and a complete Tier 3 enterprise-grade capstone project deployed live on the cloud.'
    },
    {
        q: 'What certificate will I receive upon completion?',
        a: 'Upon successfully completing all modules, practical lab assignments, and the capstone project, you receive an authorized Institute Certificate in IT & Full Stack Software Development from Aayush Institute (Est. 2002).'
    },
    {
        q: 'What kind of career and placement support is provided?',
        a: 'We provide comprehensive career guidance, including resume building, GitHub portfolio review, mock technical interviews, and placement assistance through our active employer recruitment network at no additional cost.'
    },
    {
        q: 'What are the batch timings and class modes?',
        a: 'We offer flexible weekday morning, afternoon, and evening batches, as well as dedicated weekend batches for college students and working professionals. Classes include interactive classroom instruction and practical computer lab sandbox sessions.'
    }
];

const ITFullStackDevelopment = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModule, setOpenModule] = useState('01');
    const [openFaq, setOpenFaq] = useState(0);

    const categories = [
        { id: 'all', label: 'All 14 Modules', color: 'from-blue-600 to-indigo-600' },
        { id: 'foundation', label: 'Foundation', color: 'from-blue-600 to-cyan-600' },
        { id: 'frontend', label: 'Frontend & React', color: 'from-cyan-600 to-teal-600' },
        { id: 'backend', label: 'Backend & APIs', color: 'from-emerald-600 to-green-600' },
        { id: 'databases', label: 'Databases', color: 'from-purple-600 to-violet-600' },
        { id: 'tools', label: 'DevOps & Tools', color: 'from-rose-600 to-pink-600' },
        { id: 'capstone', label: 'Capstone Projects', color: 'from-fuchsia-600 to-purple-600' }
    ];

    const filteredModules = useMemo(() => {
        return modules.filter(m => {
            const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
            const q = searchQuery.toLowerCase().trim();
            const matchesQuery = !q ||
                m.title.toLowerCase().includes(q) ||
                m.subtitle.toLowerCase().includes(q) ||
                m.badge.toLowerCase().includes(q) ||
                m.topics.some(t => t.toLowerCase().includes(q));
            return matchesCategory && matchesQuery;
        });
    }, [searchQuery, selectedCategory]);

    const handleExpandAll = () => {
        if (openModule === 'ALL') {
            setOpenModule(null);
        } else {
            setOpenModule('ALL');
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* ── 1. HERO SECTION (Matching Standard Layout Across the Website) ── */}
            <div
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] flex items-center"
                style={{
                    backgroundImage: "url('/course_hero.png')",
                    backgroundColor: '#d6ecff'
                }}
            >
                {/* Mobile overlay for crisp contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/95 via-[#d6ecff]/80 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 w-full">
                    <div className="flex flex-col justify-center py-5 sm:py-6 lg:py-7 max-w-full sm:max-w-[460px] md:max-w-[520px] lg:max-w-2xl">
                        {/* Glowing Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-[#0055cc] text-[11px] font-semibold tracking-wide mb-2.5 border border-blue-200/60 shadow-xs w-fit backdrop-blur-xs">
                            <Terminal className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>IT &amp; SOFTWARE DEVELOPMENT • OFFICIAL CURRICULUM</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                            Master IT &amp; Full Stack{' '}
                            <span className="text-[#0055ff] block sm:inline">Software Development</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3.5 font-normal">
                            Build digital applications from ground up. Master frontend user interfaces, backend APIs, SQL &amp; NoSQL databases, Git, web security, and cloud deployment with 100% practical lab training.
                        </p>

                        {/* 3 Trust Badges */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-5">
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <BookOpen className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">14 Core Modules</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Layers className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">4 Tech Stacks</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Award className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">100% Practical &amp; Placement</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                            <a
                                href="#curriculum"
                                className="inline-flex items-center justify-center gap-2 bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Explore Curriculum</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </a>
                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#004b93] font-semibold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-blue-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                            >
                                <MessageSquare className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Enquire for Batch</span>
                            </NavLink>
                            <a
                                href="/it_full_stack_doc.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 bg-white/80 hover:bg-white text-slate-700 font-medium text-xs sm:text-sm px-3.5 py-2 rounded-full border border-slate-200/80 shadow-2xs transition-all duration-200"
                            >
                                <Download className="w-3.5 h-3.5 text-blue-600" />
                                <span>Download Syllabus</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 2. ARCHITECTURE & OVERVIEW MATRIX (Ultra-Colorful 4 Cards) ── */}
            <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
                    {/* Card 1: What is Full Stack (Blue / Indigo) */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100/90 via-blue-50/70 to-indigo-50/50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/35">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-blue-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                            What is Full Stack?
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Full Stack Development covers complete web applications by unifying client frontend UI, backend business servers, databases, and live cloud deployment into one cohesive skillset.
                        </p>
                    </div>

                    {/* Card 2: How Layers Connect (Indigo / Purple) */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100/90 via-indigo-50/70 to-purple-50/50 rounded-2xl p-5 border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/35">
                            <Workflow className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-indigo-950 mb-1.5 group-hover:text-indigo-600 transition-colors">
                            How Layers Connect
                        </h2>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-blue-600">Frontend:</span> HTML5, CSS3, React
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-emerald-600">Backend:</span> Node.js, Express, Python
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-purple-600">Database:</span> MongoDB, PostgreSQL, SQL
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-amber-600">DevOps:</span> Git, GitHub, Cloud Host
                            </li>
                        </ul>
                    </div>

                    {/* Card 3: Who Can Learn (Purple / Fuchsia) */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-purple-100/90 via-purple-50/70 to-fuchsia-50/50 rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-500 shadow-sm hover:shadow-[0_16px_36px_rgba(168,85,247,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-500/35">
                            <Users className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-purple-950 mb-1.5 group-hover:text-purple-600 transition-colors">
                            Who Can Enroll?
                        </h2>
                        <ul className="space-y-1 text-xs text-slate-600 font-normal">
                            <li>• 12th Pass, ITI &amp; Polytechnic Students</li>
                            <li>• BCA, B.Sc. IT &amp; Computer Science Grads</li>
                            <li>• B.Tech / B.E. &amp; MCA Postgraduates</li>
                            <li>• Freshers seeking high-growth IT careers</li>
                            <li>• Working professionals transitioning into tech</li>
                        </ul>
                    </div>

                    {/* Card 4: Active Batch Snapshot (Emerald / Teal) */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/90 via-emerald-50/70 to-teal-50/50 rounded-2xl p-5 border-2 border-emerald-200 hover:border-emerald-500 shadow-sm hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/35">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                                    Spring 2026 Open
                                </span>
                            </div>
                            <h2 className="text-sm sm:text-base font-semibold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">
                                Batch Admissions
                            </h2>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed mb-2">
                                Daily practical lab hours, personalized mentor sessions, and career guidance cell.
                            </p>
                        </div>
                        <div className="pt-2.5 border-t border-emerald-200 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700">Helpline:</span>
                            <a href="tel:9311050670" className="text-xs font-semibold text-blue-600 hover:underline">
                                0120-2611111 / +91-9311050670
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── 3. SPECIALIZED TECHNOLOGY TRACKS (Vivid Colorful Cards) ── */}
                <div className="mb-14">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>SPECIALIZED LEARNING PATHS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Choose Your Specialized Technology Track
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Pick the programming ecosystem aligned with your target companies, project aspirations, and industry requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {technologyTracks.map((track, idx) => (
                            <div
                                key={idx}
                                className={`relative overflow-hidden bg-gradient-to-br ${track.cardBg} rounded-2xl p-5 sm:p-6 ${track.borderColor} shadow-[0_6px_22px_rgba(0,0,0,0.06)] ${track.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group`}
                            >
                                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${track.glow} opacity-15 blur-2xl pointer-events-none group-hover:opacity-35 transition-opacity`} />

                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3.5">
                                        <div className={`w-9 h-9 rounded-xl ${track.iconBg} flex items-center justify-center font-semibold text-xs`}>
                                            <Laptop className="w-4.5 h-4.5" />
                                        </div>
                                        <span className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full ${track.badgeColor}`}>
                                            {track.badge}
                                        </span>
                                    </div>
                                    <h3 className={`text-base font-semibold text-slate-950 mb-1.5 group-hover:text-blue-600 transition-colors`}>
                                        {track.name}
                                    </h3>
                                    <div className="text-[11px] font-mono text-slate-800 bg-white/80 rounded-lg px-2.5 py-1 mb-3 border border-slate-200/80 shadow-2xs">
                                        {track.stack}
                                    </div>
                                    <p className="text-xs text-slate-600 font-normal leading-relaxed mb-3.5">
                                        {track.desc}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 font-normal italic">
                                    💡 {track.highlight}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 4. COMPLETE 14 MODULE CURRICULUM (Interactive & Ultra-Colorful Accordion) ── */}
                <div id="curriculum" className="mb-14 scroll-mt-6">
                    <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-slate-200 shadow-sm">
                        {/* Header & Controls */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>STEP-BY-STEP LEARNING ROADMAP</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                                    Complete Curriculum (All 14 Modules)
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                                    A structured end-to-end journey from computer basics to building and deploying full-scale cloud applications.
                                </p>
                            </div>

                            {/* Search & Expand All */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="relative min-w-[220px] sm:min-w-[260px]">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search React, SQL, API, Git..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={handleExpandAll}
                                    className="px-4 py-2 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                                >
                                    {openModule === 'ALL' ? 'Collapse All' : 'Expand All'}
                                </button>
                            </div>
                        </div>

                        {/* Category Filter Chips */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            {categories.map((cat) => {
                                const active = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                            active
                                                ? 'bg-[#0055ff] text-white shadow-xs scale-[1.02]'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                            <span className="text-xs text-slate-500 font-normal ml-auto">
                                Showing {filteredModules.length} of {modules.length} modules
                            </span>
                        </div>

                        {/* Colorful Module Accordion List in 1*2 Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
                            {filteredModules.length === 0 ? (
                                <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm font-semibold text-slate-700">No modules match &ldquo;{searchQuery}&rdquo;</p>
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">Try searching for keywords like React, SQL, CSS, or Node.js</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                        className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            ) : (
                                filteredModules.map((m) => {
                                    const isOpen = openModule === 'ALL' || openModule === m.id;
                                    const IconComp = m.icon;

                                    return (
                                        <div
                                            key={m.id}
                                            className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                                                isOpen
                                                    ? `${m.theme.border} shadow-md bg-white`
                                                    : `border-slate-200 hover:${m.theme.border} bg-gradient-to-r ${m.theme.cardBg} hover:bg-white`
                                            }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (openModule === 'ALL') {
                                                        setOpenModule(m.id);
                                                    } else {
                                                        setOpenModule(isOpen ? null : m.id);
                                                    }
                                                }}
                                                className="w-full px-3.5 sm:px-4.5 py-3.5 sm:py-4 flex items-start justify-between text-left gap-2.5 sm:gap-3 cursor-pointer"
                                            >
                                                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                                                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 font-semibold text-xs mt-0.5 ${m.theme.iconBg}`}>
                                                        {m.id}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                                            <h3 className="text-xs sm:text-[13.5px] font-semibold text-slate-800 leading-snug">
                                                                {m.title}
                                                            </h3>
                                                            <span className={`text-[9.5px] font-medium px-2 py-0.5 rounded-full ${m.theme.badge}`}>
                                                                {m.badge}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-2">
                                                            {m.subtitle}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                                                    <span className="text-[10px] font-semibold text-slate-400 hidden xl:inline">
                                                        {m.topics.length} topics
                                                    </span>
                                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                                                        isOpen ? 'rotate-180 bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 shadow-2xs'
                                                    }`}>
                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                    </div>
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-3.5 sm:px-5 pb-4 pt-2 border-t border-slate-100 bg-[#fbfdff]">
                                                    <div className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-400 mb-2 pt-1">
                                                        Key Topics &amp; Competencies in Module {m.id}:
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                                        {m.topics.map((topic, tIdx) => (
                                                            <div
                                                                key={tIdx}
                                                                className="bg-white rounded-lg p-2 border border-slate-200/90 flex items-start gap-1.5 shadow-2xs hover:border-blue-300 transition-colors"
                                                            >
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                                                                <span className="text-[11px] font-normal text-slate-700 leading-snug">
                                                                    {topic}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* ── 5. REAL PROJECT DEVELOPMENT (Ultra-Colorful 3 Tiers) ── */}
                <div className="mb-14">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-semibold mb-2 border border-emerald-200">
                            <Rocket className="w-3.5 h-3.5" />
                            <span>PORTFOLIO WORKSHOP</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Hands-On Real Project Development
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Graduate with an impressive GitHub repository containing working, verified full-stack applications.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                        {projects.map((tier, pIdx) => (
                            <div
                                key={pIdx}
                                className={`relative overflow-hidden bg-gradient-to-br ${tier.cardBg} rounded-3xl p-5 sm:p-6 ${tier.border} shadow-[0_6px_22px_rgba(0,0,0,0.06)] ${tier.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group`}
                            >
                                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${tier.glow} opacity-15 blur-2xl pointer-events-none group-hover:opacity-35 transition-opacity`} />

                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3.5">
                                        <div className={`w-9 h-9 rounded-xl ${tier.iconBg} flex items-center justify-center font-semibold text-xs`}>
                                            <Layers className="w-4.5 h-4.5" />
                                        </div>
                                        <span className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full ${tier.tagBg}`}>
                                            {tier.tag}
                                        </span>
                                    </div>
                                    <h3 className={`text-base font-semibold ${tier.titleColor} mb-3.5`}>
                                        {tier.tier}
                                    </h3>

                                    <div className="space-y-2.5">
                                        {tier.items.map((item, iIdx) => (
                                            <div key={iIdx} className="bg-white/95 rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all">
                                                <div className="text-xs font-semibold text-slate-800 mb-0.5">{item.name}</div>
                                                <div className="text-[11px] text-slate-600 font-normal leading-relaxed">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 font-normal italic">
                                    ✓ Code pushed to GitHub with verified code review &amp; live URL.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 6. SKILLS & CAREER ROLES MATRIX (Ultra-Colorful Cards) ── */}
                <div className="mb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Skills Box */}
                        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-blue-600" />
                                <h2 className="text-base sm:text-lg font-semibold text-[#0a2540]">Technical Skills You Develop</h2>
                            </div>
                            <p className="text-xs text-slate-600 font-normal mb-4 leading-relaxed">
                                Modern software companies demand a balanced blend of client-side reactivity and server-side reliability:
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {skillsWithThemes.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-default ${skill.bg}`}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Practical Exposure Card */}
                        <div className="lg:col-span-6 bg-gradient-to-br from-[#0a2540] via-[#0b2b4d] to-[#0f3460] text-white rounded-3xl p-6 sm:p-7 shadow-lg">
                            <div className="flex items-center gap-2 mb-2 text-[#fed000]">
                                <Sparkles className="w-5 h-5" />
                                <h2 className="text-base sm:text-lg font-semibold text-white">Live Project Training Sandbox</h2>
                            </div>
                            <p className="text-xs text-slate-200 font-normal mb-4 leading-relaxed">
                                Learn within an authentic software development culture guided by experienced senior engineers:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Agile Sprints &amp; Standups
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Mentor-Guided Code Reviews
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • API Documentation &amp; Postman
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Cloud Deployment &amp; CI/CD
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Live GitHub Portfolio
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Technical Mock Interviews
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Career Roles Grid (Ultra-Colorful) */}
                    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                        <div className="text-center max-w-xl mx-auto mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-[#0a2540]">
                                High-Growth Career Pathways
                            </h3>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">
                                Roles open to graduates of the IT &amp; Full Stack Software program:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                            {careerRoles.map((role, rIdx) => (
                                <div
                                    key={rIdx}
                                    className={`bg-gradient-to-br ${role.cardBg} rounded-2xl p-4 ${role.border} hover:shadow-md transition-all duration-200 hover:-translate-y-1 group`}
                                >
                                    <div className={`w-8 h-8 rounded-xl ${role.iconBg} flex items-center justify-center font-semibold mb-2.5`}>
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <h4 className={`font-semibold text-xs sm:text-[13px] ${role.titleColor} mb-1 transition-colors`}>
                                        {role.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-600 font-normal leading-relaxed">{role.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Advisory Note */}
                        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-normal">
                            <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>
                                Career guidance is provided at no extra cost. Placement assistance connects candidates with partner recruitment drives based on interview performance and qualification.
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── 7. 6-STAGE LEARNING PROGRESSION (Ultra-Colorful Cards) ── */}
                <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
                    <div className="text-center max-w-xl mx-auto mb-7">
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                            Curriculum Progression
                        </span>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight mt-1.5">
                            Your 6-Stage Learning Progression
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-center">
                        {roadmapStages.map((st, idx) => (
                            <div
                                key={idx}
                                className={`bg-gradient-to-br ${st.cardBg} rounded-2xl p-4 ${st.border} shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between`}
                            >
                                <div>
                                    <div className={`text-[10px] font-semibold ${st.stepColor} mb-0.5`}>STAGE {st.step}</div>
                                    <div className="text-xs font-semibold text-[#0a2540] mb-1">{st.stage}</div>
                                    <div className="text-[11px] text-slate-600 font-normal leading-snug">{st.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 8. FREQUENTLY ASKED QUESTIONS (Colorful Accordion) ── */}
                <div className="mb-14 max-w-4xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-7">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>CLARIFY YOUR DOUBTS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                                        isOpen
                                            ? 'border-blue-400 bg-gradient-to-r from-blue-50/70 via-white to-sky-50/30 shadow-md'
                                            : 'border-slate-200/90 bg-white hover:border-blue-200 shadow-2xs'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full px-5 py-4 flex items-center justify-between text-left gap-3 cursor-pointer"
                                    >
                                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                                            {item.q}
                                        </span>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                            isOpen ? 'rotate-180 bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            <ChevronDown className="w-3.5 h-3.5" />
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-600 font-normal leading-relaxed">
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── 9. BOTTOM CALLOUT ADMISSION BANNER ── */}
                <div className="rounded-3xl bg-gradient-to-r from-[#004b93] via-[#0055ff] to-[#38bdf8] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-semibold mb-3 backdrop-blur-xs">
                                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                <span>NEW BATCH ADMISSIONS NOW OPEN</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2">
                                Start Your IT &amp; Software Development Journey Today
                            </h2>
                            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-normal">
                                Connect with our senior academic counselors to schedule a live practical lab demo, evaluate course syllabus options, and book your seat.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center gap-2 bg-white text-[#0055ff] hover:bg-slate-50 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Enquire for Batch</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </NavLink>
                            <a
                                href="tel:9311050670"
                                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full border border-white/30 backdrop-blur-xs transition-all duration-200"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call +91-9311050670</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITFullStackDevelopment;
