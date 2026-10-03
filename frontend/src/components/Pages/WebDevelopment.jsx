import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Code2,
    Layout,
    Globe,
    Smartphone,
    Server,
    Cpu,
    Database,
    CheckCircle2,
    ArrowRight,
    BookOpen,
    Layers,
    Terminal,
    Sparkles,
    Briefcase,
    Award,
    Shield,
    FileText,
    Download,
    Phone,
    MessageSquare,
    ChevronDown,
    Rocket,
    Monitor,
    Laptop,
    HelpCircle,
    Users,
    Check,
    Star,
    Compass,
    Zap,
    Search,
    X,
    Workflow,
    Lock,
    GitBranch,
    Cloud
} from 'lucide-react';

const technologyTracks = [
    {
        name: 'Foundation Web Design',
        stack: 'HTML5 • CSS3 • Flexbox & Grid • Responsive UI',
        desc: 'Master the core visual building blocks of the web. Create mobile-first, pixel-perfect, clean responsive websites that look stunning across all screen sizes.',
        badge: 'Beginner Friendly',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/50',
        borderColor: 'border-2 border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        badgeColor: 'bg-blue-600 text-white shadow-xs shadow-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/35',
        glow: 'from-blue-500 to-cyan-400',
        accentText: 'text-blue-700',
        highlight: 'Ideal for complete beginners, school/college students, and creative visual designers.'
    },
    {
        name: 'Interactive JavaScript Track',
        stack: 'JavaScript (ES6+) • DOM API • Async/Await • Fetch API',
        desc: 'Turn static layouts into dynamic, interactive digital applications. Master event loops, client-side data handling, DOM manipulation, and real-time form validation.',
        badge: 'Core Programming',
        cardBg: 'from-amber-100/90 via-amber-50/60 to-orange-50/50',
        borderColor: 'border-2 border-amber-200 hover:border-amber-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
        badgeColor: 'bg-amber-600 text-white shadow-xs shadow-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/35',
        glow: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-800',
        highlight: 'Crucial stepping stone for modern web apps, technical interviews, and dynamic logic.'
    },
    {
        name: 'Modern React & Frontend Track',
        stack: 'React.js • Hooks • Single Page Apps • Tailwind CSS',
        desc: 'Level up into component-driven modern frontend engineering. Learn React components, props, state, custom hooks, client routing, and package managers.',
        badge: 'High Industry Demand',
        cardBg: 'from-cyan-100/90 via-cyan-50/60 to-blue-50/50',
        borderColor: 'border-2 border-cyan-200 hover:border-cyan-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(6,182,212,0.18)]',
        badgeColor: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/30',
        iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/35',
        glow: 'from-cyan-500 to-blue-400',
        accentText: 'text-cyan-800',
        highlight: 'Powers today\'s leading startups, SaaS tools, and fast-paced tech company frontends.'
    },
    {
        name: 'Deployment & Web Engineering',
        stack: 'Git & GitHub • REST APIs • Netlify / Vercel • Technical SEO',
        desc: 'Master professional developer workflows: version control, code collaboration, cloud website deployment, third-party API integration, and Core Web Vitals.',
        badge: 'Production Ready',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/50',
        borderColor: 'border-2 border-emerald-200 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        badgeColor: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/35',
        glow: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-700',
        highlight: 'Takes your local code to live web URLs to show potential clients and recruiters.'
    }
];

const modules = [
    {
        id: '01',
        category: 'foundation',
        title: 'Computer & Internet Fundamentals',
        subtitle: 'Understand how websites work behind the scenes from server to client browser.',
        icon: Globe,
        badge: 'Foundation',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-sky-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-blue-600'
        },
        topics: [
            'How Websites & Web Browsers Work Internally',
            'Client vs Server Architecture & Networking',
            'HTTP & HTTPS Secure Protocol Basics',
            'Domain Names, DNS Resolution & Web Hosting Concepts',
            'IP Addresses & Client-Server Handshake',
            'Setting Up Modern Code Editors (VS Code, Extensions)',
            'Web Folder Architecture, Paths & File Asset Management',
            'Browser Developer Tools & Elements Inspector'
        ]
    },
    {
        id: '02',
        category: 'structure',
        title: 'HTML5 (HyperText Markup Language)',
        subtitle: 'Learn the structural backbone of all modern web pages and applications.',
        icon: FileText,
        badge: 'Core Structure',
        theme: {
            cardBg: 'from-orange-50/90 via-white to-amber-50/40',
            border: 'border-orange-200 hover:border-orange-400',
            badge: 'bg-orange-600 text-white shadow-xs shadow-orange-500/20',
            iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-xs',
            accent: 'text-orange-700'
        },
        topics: [
            'HTML5 Document Anatomy, <!DOCTYPE>, <html>, <head>, <body>',
            'Headings (h1-h6), Paragraphs, Text Formatting & Tags',
            'Hyperlinks, Absolute vs Relative Paths & Anchors',
            'Responsive Images (<img>, <picture>, srcset, alt tags)',
            'Lists: Ordered (<ol>), Unordered (<ul>), Definition (<dl>)',
            'Structured Data Tables, thead, tbody, colspan & rowspan',
            'HTML5 Semantic Elements (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>)',
            'Embedding Audio, Video, iframes & Media Elements',
            'Clean Semantic HTML Code Practices for Accessibility'
        ]
    },
    {
        id: '03',
        category: 'styling',
        title: 'CSS3 & Responsive Styling',
        subtitle: 'Style web pages to look modern, polished, engaging, and visually stunning.',
        icon: Layout,
        badge: 'Styling & Layout',
        theme: {
            cardBg: 'from-sky-50/90 via-white to-blue-50/40',
            border: 'border-sky-200 hover:border-sky-400',
            badge: 'bg-sky-600 text-white shadow-xs shadow-sky-500/20',
            iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xs',
            accent: 'text-sky-700'
        },
        topics: [
            'CSS Syntax, Class, ID, Attribute & Pseudo Selectors',
            'Colors (HEX, RGB, HSL), Modern Web Typography & Google Fonts',
            'CSS Box Model (Margin, Border, Padding, Content Box)',
            'Positioning Schemes (Static, Relative, Absolute, Fixed, Sticky)',
            'Modern CSS Flexbox (flex-direction, justify-content, align-items, wrap)',
            'CSS Grid Layout System (grid-template-columns, grid-gap, areas)',
            'CSS Transitions, Transforms, Hover Effects & Keyframe Animations',
            'CSS Variables (:root custom properties) for Theming',
            'Mobile-First CSS Architecture & Clean Style Organization'
        ]
    },
    {
        id: '04',
        category: 'logic',
        title: 'JavaScript (Programming for the Web)',
        subtitle: 'Add interactivity, dynamic logic, and responsive behavior to websites.',
        icon: Terminal,
        badge: 'Core Logic',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-yellow-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'JavaScript Syntax, Variables (let, const, var) & Data Types',
            'Operators, Type Coercion & Truthy/Falsy Evaluation',
            'Conditional Control Flow (if/else, switch case, ternary)',
            'Loops & Iterations (for, while, for...of, forEach)',
            'Functions, Parameters, Arrow Functions & Scope Chains',
            'DOM Manipulation (querySelector, createElement, classList)',
            'Event Handling (click, input, submit, change, keydown)',
            'Arrays & Modern Higher-Order Methods (map, filter, reduce)',
            'Objects, Destructuring, Spread Operator & JSON Format',
            'Local Storage, Session Storage & Cookies Management'
        ]
    },
    {
        id: '05',
        category: 'styling',
        title: 'Responsive Web Design & Frameworks',
        subtitle: 'Build websites that adapt seamlessly across mobile phones, tablets, and desktops.',
        icon: Smartphone,
        badge: 'Cross-Device',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Mobile-First vs Desktop-First Design Philosophy',
            'CSS Media Queries (@media screens & custom breakpoints)',
            'Fluid Typography (clamp, rem, em, vw, vh units)',
            'Responsive Images & Modern Aspect Ratios',
            'Introduction to Utility CSS Frameworks (Tailwind CSS Basics)',
            'Bootstrap 5 Grid System, Components & Modal Dialogs',
            'Building Responsive Navigation Menus & Hamburger Toggles',
            'Cross-Device Testing with Chrome Device Mode'
        ]
    },
    {
        id: '06',
        category: 'frontend',
        title: 'Modern Frontend (React.js Overview)',
        subtitle: 'Introduction to component-based UI engineering used by leading tech companies.',
        icon: Cpu,
        badge: 'Modern Frontend',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-blue-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'Modern JavaScript ES6+ Features (Modules, Import/Export, Promises)',
            'Node.js Runtime & npm / yarn Package Management',
            'Introduction to Component-Based UI Architecture',
            'React.js Fundamentals, Virtual DOM & JSX Syntax',
            'Functional Components, Props & Component Reusability',
            'State Management with useState & Side Effects with useEffect',
            'Handling Events, Controlled Forms & Dynamic Lists in React',
            'Vite Build Tool & Fast Development Environment Setup'
        ]
    },
    {
        id: '07',
        category: 'structure',
        title: 'UI & Website Design Fundamentals',
        subtitle: 'Learn layout principles that make websites user-friendly, clean, and intuitive.',
        icon: Sparkles,
        badge: 'Design Principles',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'Visual Hierarchy, Eye Scanning Patterns (F-Pattern & Z-Pattern)',
            'Color Theory for Web (Contrast, Primary/Secondary Accents)',
            'Web Typography, Font Pairing & Readability Rules',
            'Spacing, Padding & 8pt Grid Layout Alignment',
            'User Navigation Patterns, Breadcrumbs & Sticky Navbars',
            'Wireframing Concepts & Layout Mockups',
            'Designing for Usability, Accessibility (a11y) & UX Simplicity',
            'Mobile Touch Target Sizes & Gesture Considerations'
        ]
    },
    {
        id: '08',
        category: 'logic',
        title: 'Forms & Interactive User Input',
        subtitle: 'Learn how websites collect, validate, and process user inquiries and data.',
        icon: CheckCircle2,
        badge: 'Interactivity',
        theme: {
            cardBg: 'from-indigo-50/90 via-white to-blue-50/40',
            border: 'border-indigo-200 hover:border-indigo-400',
            badge: 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20',
            iconBg: 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-xs',
            accent: 'text-indigo-700'
        },
        topics: [
            'HTML5 Form Inputs (text, email, tel, password, date, radio, select)',
            'Form Attributes: required, pattern, placeholder, autocomplete',
            'Client-Side Real-Time Validation with JavaScript Regex',
            'Error Highlighting, Toast Messages & User Feedback States',
            'Multi-Step Registration & Lead Generation Form Patterns',
            'Form Data Collection, Serialization & Object Conversion',
            'Preventing Duplicate Submissions & Loading Spinners',
            'Basic Anti-Spam Security (Honeypot fields & Captcha Overview)'
        ]
    },
    {
        id: '09',
        category: 'backend',
        title: 'REST APIs & External Data Services',
        subtitle: 'Communicate with external web services, weather feeds, maps, and live databases.',
        icon: Server,
        badge: 'API Integration',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'What is an API? REST Architecture & Endpoints',
            'HTTP Verbs: GET (Read), POST (Create), PUT/PATCH (Update), DELETE',
            'JSON Data Payloads & Nested Data Parsing',
            'Asynchronous JavaScript with async / await & try-catch',
            'Fetching Live Data using JavaScript native fetch() and Axios',
            'Displaying Loading Spinners & Handling Network Errors',
            'Integrating Third-Party Services: Google Maps, Weather & News Feeds',
            'API Endpoint Testing using Postman'
        ]
    },
    {
        id: '10',
        category: 'tools',
        title: 'Git & GitHub Version Control',
        subtitle: 'Master industry-standard version control and collaborative code repositories.',
        icon: GitBranch,
        badge: 'Version Control',
        theme: {
            cardBg: 'from-slate-50/90 via-white to-gray-50/40',
            border: 'border-slate-300 hover:border-slate-500',
            badge: 'bg-slate-800 text-white shadow-xs shadow-slate-700/20',
            iconBg: 'bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-xs',
            accent: 'text-slate-800'
        },
        topics: [
            'Version Control Concepts: Why Git is Mandatory for Developers',
            'Initializing Git Repositories (git init, status, diff)',
            'Staging & Commits (git add, git commit -m)',
            'Branching Strategies, Merging & Conflict Resolution (git branch, merge)',
            'Connecting with Remote GitHub Repositories (git remote, push, pull)',
            'Creating GitHub Pull Requests (PR) & Code Review Workflows',
            'Setting up .gitignore & Securing Sensitive API Keys',
            'Building an Impressive Public GitHub Profile & Portfolio'
        ]
    },
    {
        id: '11',
        category: 'tools',
        title: 'Website Testing & Debugging',
        subtitle: 'Identify and resolve layout glitches, script errors, and edge-case bugs.',
        icon: Shield,
        badge: 'Quality Assurance',
        theme: {
            cardBg: 'from-rose-50/90 via-white to-pink-50/40',
            border: 'border-rose-200 hover:border-rose-400',
            badge: 'bg-rose-600 text-white shadow-xs shadow-rose-500/20',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
            accent: 'text-rose-700'
        },
        topics: [
            'Browser Developer Tools (Console, Elements, Network, Application Tab)',
            'Live CSS & Layout Inspection, Margin/Padding Box Tweaks',
            'JavaScript Debugging with Console Logs, Breakpoints & Sources Tab',
            'Responsive Device Emulation (iPhone, Android, Tablet viewports)',
            'Cross-Browser Compatibility Testing (Chrome, Safari, Firefox, Edge)',
            'Network Performance & Asset Waterfall Inspection',
            'Lighthouse Auditing for Performance, SEO & Accessibility',
            'Fixing Broken Links & Form Validation Fallbacks'
        ]
    },
    {
        id: '12',
        category: 'tools',
        title: 'Website Hosting & Cloud Deployment',
        subtitle: 'Publish your website live to the internet for the world to see and use.',
        icon: Rocket,
        badge: 'Cloud Launch',
        theme: {
            cardBg: 'from-violet-50/90 via-white to-purple-50/40',
            border: 'border-violet-200 hover:border-violet-400',
            badge: 'bg-violet-600 text-white shadow-xs shadow-violet-500/20',
            iconBg: 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xs',
            accent: 'text-violet-700'
        },
        topics: [
            'Domain Name Registration & DNS Configuration (A Records, CNAME)',
            'Web Hosting Types: Shared, VPS & Modern Edge Cloud Platforms',
            'One-Click Git Deployment with Vercel & Netlify',
            'GitHub Pages Hosting for Free Portfolio Showcases',
            'Traditional Web Hosting, cPanel & FTP/SFTP File Uploads',
            'Setting Up Free SSL / HTTPS Security Certificates',
            'Custom Domain Linking & Production Environment Configuration',
            'Post-Launch Website Health & Ongoing Maintenance'
        ]
    },
    {
        id: '13',
        category: 'tools',
        title: 'SEO-Friendly Web Architecture',
        subtitle: 'Build websites optimized for fast loading speeds, search engines, and Google ranking.',
        icon: Search,
        badge: 'Technical SEO',
        theme: {
            cardBg: 'from-green-50/90 via-white to-emerald-50/40',
            border: 'border-green-200 hover:border-green-400',
            badge: 'bg-green-600 text-white shadow-xs shadow-green-500/20',
            iconBg: 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xs',
            accent: 'text-green-700'
        },
        topics: [
            'Semantic HTML Tags & Document Structure for Search Bots',
            'Optimizing Title Tags, Meta Descriptions & Open Graph (OG) Tags',
            'Heading Hierarchy (Strict Single H1 to Nested H2/H3 Rules)',
            'Image Compression, WebP Formats & Descriptive Alt Text',
            'Clean URL Slug Structures & XML Sitemap Basics',
            'Core Web Vitals: LCP (Largest Contentful Paint), FID & CLS',
            'Mobile-Friendly Optimization & Google Mobile-First Indexing',
            'Robots.txt Configuration & Basic Search Console Setup'
        ]
    }
];

const projects = [
    {
        tier: 'Tier 1: Beginner Foundation Websites',
        tag: 'Level 1',
        tagBg: 'bg-blue-600 text-white shadow-xs shadow-blue-500/25',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md',
        glow: 'from-blue-500 to-cyan-400',
        titleColor: 'text-blue-950',
        items: [
            { name: 'Personal Portfolio & Resume Website', desc: 'Custom responsive showcase highlighting skills, bio, resume download, and contact links.' },
            { name: 'Corporate Business Showcase Website', desc: 'Multi-page responsive corporate layout with services, about us, team bios, and enquiry form.' },
            { name: 'High-Converting Product Landing Page', desc: 'Promotional landing page with hero banner, feature grid, testimonials, and clear call-to-action.' }
        ]
    },
    {
        tier: 'Tier 2: Interactive Dynamic Websites',
        tag: 'Level 2',
        tagBg: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/25',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md',
        glow: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        items: [
            { name: 'Restaurant & Cafe Web Portal', desc: 'Interactive menu catalog with category filtering, food item modals, and table reservation booking.' },
            { name: 'Educational Institute Website', desc: 'Course listing catalog, admission enquiry forms with JavaScript validation, and campus photo gallery.' },
            { name: 'Filterable Product & Service Catalog', desc: 'Dynamic search bar, price filters, category tabs, and interactive product details cards.' }
        ]
    },
    {
        tier: 'Tier 3: Advanced Frontend & Cloud Apps',
        tag: 'Level 3',
        tagBg: 'bg-purple-600 text-white shadow-xs shadow-purple-500/25',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md',
        glow: 'from-purple-500 to-violet-400',
        titleColor: 'text-purple-950',
        items: [
            { name: 'E-Commerce Frontend with Cart System', desc: 'Complete product catalog, shopping cart state management, checkout summary, and mock payment flow.' },
            { name: 'Live REST API Weather & News Dashboard', desc: 'Real-time asynchronous data fetching from public REST APIs with search, dark mode, and geo-data.' },
            { name: 'Component-Driven React Web App', desc: 'Single-page web application built with React Router, custom hooks, Tailwind CSS, and cloud deployment.' }
        ]
    }
];

const skillsWithThemes = [
    { name: 'Semantic HTML5', bg: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
    { name: 'Responsive CSS3', bg: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { name: 'Flexbox & CSS Grid', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'JavaScript (ES6+) Core', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'DOM Manipulation', bg: 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100' },
    { name: 'React.js Fundamentals', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
    { name: 'Tailwind CSS & Bootstrap', bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { name: 'REST APIs & Fetch', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Git & GitHub Workflows', bg: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
    { name: 'Form Validation & UX', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'Browser DevTools Debugging', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { name: 'Cloud Deployment (Vercel/Netlify)', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'Technical SEO Basics', bg: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
    { name: 'Mobile-First Architecture', bg: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { name: 'Performance Optimization', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' }
];

const careerRoles = [
    {
        title: 'Web Developer',
        desc: 'Build, maintain, and upgrade client websites and modern responsive web interfaces.',
        cardBg: 'from-blue-100/90 via-blue-50/70 to-indigo-50/50',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        titleColor: 'text-blue-950 group-hover:text-blue-600'
    },
    {
        title: 'Frontend Developer',
        desc: 'Implement interactive UI components, client-side routing, and API connections using React & JS.',
        cardBg: 'from-cyan-100/90 via-cyan-50/70 to-sky-50/50',
        border: 'border-2 border-cyan-200 hover:border-cyan-500',
        iconBg: 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-500/30',
        titleColor: 'text-cyan-950 group-hover:text-cyan-600'
    },
    {
        title: 'UI / Web Designer',
        desc: 'Bridge visual layout design, color theory, and responsive coding for agencies and businesses.',
        cardBg: 'from-purple-100/90 via-purple-50/70 to-violet-50/50',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
        titleColor: 'text-purple-950 group-hover:text-purple-600'
    },
    {
        title: 'JavaScript Developer',
        desc: 'Write custom frontend logic, form validation, dynamic widgets, and asynchronous data scripts.',
        cardBg: 'from-amber-100/90 via-amber-50/70 to-orange-50/50',
        border: 'border-2 border-amber-200 hover:border-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
        titleColor: 'text-amber-950 group-hover:text-amber-600'
    },
    {
        title: 'Freelance Web Specialist',
        desc: 'Create business websites, landing pages, and e-commerce portals directly for independent clients.',
        cardBg: 'from-emerald-100/90 via-emerald-50/70 to-teal-50/50',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        titleColor: 'text-emerald-950 group-hover:text-emerald-600'
    }
];

const roadmapStages = [
    { step: '01', stage: 'FOUNDATION', desc: 'Computer & Web Basics, Internet Protocols', cardBg: 'from-blue-100/90 via-blue-50/60 to-white', border: 'border-2 border-blue-200 hover:border-blue-400', stepColor: 'text-blue-600' },
    { step: '02', stage: 'STRUCTURE & STYLE', desc: 'HTML5 Semantic Elements, CSS3, Flex & Grid', cardBg: 'from-indigo-100/90 via-indigo-50/60 to-white', border: 'border-2 border-indigo-200 hover:border-indigo-400', stepColor: 'text-indigo-600' },
    { step: '03', stage: 'DYNAMIC LOGIC', desc: 'JavaScript ES6+, DOM Manipulation & Events', cardBg: 'from-amber-100/90 via-amber-50/60 to-white', border: 'border-2 border-amber-200 hover:border-amber-400', stepColor: 'text-amber-800' },
    { step: '04', stage: 'REACT & SPA', desc: 'Component Architecture, Props & React Hooks', cardBg: 'from-cyan-100/90 via-cyan-50/60 to-white', border: 'border-2 border-cyan-200 hover:border-cyan-400', stepColor: 'text-cyan-700' },
    { step: '05', stage: 'APIS & GIT', desc: 'REST APIs, Postman, Git & GitHub Collaboration', cardBg: 'from-teal-100/90 via-teal-50/60 to-white', border: 'border-2 border-teal-200 hover:border-teal-400', stepColor: 'text-teal-700' },
    { step: '06', stage: 'LAUNCH & CAREER', desc: 'Live Cloud Deploy, SEO, Portfolio & Interviews', cardBg: 'from-rose-100/90 via-rose-50/60 to-white', border: 'border-2 border-rose-200 hover:border-rose-400', stepColor: 'text-rose-600' }
];

const faqItems = [
    {
        q: 'Do I need prior coding experience to join this Web Development course?',
        a: 'No prior programming experience is required. The curriculum begins with Module 01 (Computer & Internet Fundamentals), building up from basic HTML5 and CSS3 to advanced JavaScript and React step-by-step with continuous hands-on guidance.'
    },
    {
        q: 'What is the key difference between Web Development and Full Stack Development?',
        a: 'Web Development focuses heavily on designing, styling, and engineering the client-facing user interface, responsive interactions, and frontend logic. Full Stack includes frontend plus deep backend server programming (Node.js/Python), complex database schema design, and server infrastructure.'
    },
    {
        q: 'Will I build real websites during the course?',
        a: 'Yes! Hands-on project work is central to every module. You will build personal portfolio websites, multi-page business websites, interactive restaurant booking systems, and live API-driven web applications deployed live on the internet.'
    },
    {
        q: 'What certificate will I receive upon completion?',
        a: 'Upon successfully completing all modules, practical lab exercises, and the final project portfolio, you receive an authorized Institute Certificate in Web Development from Aayush Institute (Est. 2002).'
    },
    {
        q: 'What kind of placement and career support does Aayush Institute provide?',
        a: 'We provide end-to-end career guidance, including resume building, live GitHub portfolio review, mock technical interviews, and placement assistance through our employer recruitment network at no additional cost.'
    },
    {
        q: 'What are the batch timings and class modes?',
        a: 'We offer flexible weekday morning, afternoon, and evening batches, as well as dedicated weekend batches for college students and working professionals. Classes include classroom instruction and hands-on computer lab sandbox sessions.'
    }
];

export default function WebDevelopment() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModule, setOpenModule] = useState('01');
    const [openFaq, setOpenFaq] = useState(0);

    const categories = [
        { id: 'all', label: 'All 13 Modules' },
        { id: 'foundation', label: 'Foundation' },
        { id: 'structure', label: 'HTML & UI Structure' },
        { id: 'styling', label: 'CSS3 & Responsive' },
        { id: 'logic', label: 'JavaScript Logic' },
        { id: 'frontend', label: 'React Frontend' },
        { id: 'backend', label: 'APIs & Integration' },
        { id: 'tools', label: 'Git & Deployment' }
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
            {/* ── 1. HERO SECTION (Light Sky-Blue Matching Standard Layout) ── */}
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
                            <Code2 className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>WEB &amp; FRONTEND DEVELOPMENT • OFFICIAL CURRICULUM</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                            Master Professional{' '}
                            <span className="text-[#0055ff] block sm:inline">Web Development</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3.5 font-normal">
                            Build modern, responsive, and visually stunning websites from the ground up. Master HTML5, CSS3, Flexbox, Grid, JavaScript (ES6+), React basics, REST APIs, Git, and live cloud deployment with 100% practical lab training.
                        </p>

                        {/* 3 Trust Badges */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-5">
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <BookOpen className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">13 Core Modules</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Layers className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">4 Learning Tracks</span>
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
                                href="/web_development_doc.pdf"
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
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
                    {/* Card 1: What is Web Development */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100/90 via-blue-50/70 to-indigo-50/50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/35">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-blue-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                            What is Web Development?
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Web Development is the craft of engineering websites and web applications. It spans structural HTML, modern CSS styling, interactive JavaScript, and cloud hosting for global web access.
                        </p>
                    </div>

                    {/* Card 2: Core Web Stack Layers */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100/90 via-indigo-50/70 to-purple-50/50 rounded-2xl p-5 border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/35">
                            <Workflow className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-indigo-950 mb-1.5 group-hover:text-indigo-600 transition-colors">
                            How the Stack Connects
                        </h2>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-orange-600">Structure:</span> HTML5 Semantic Elements
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-blue-600">Presentation:</span> CSS3, Flexbox, Grid
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-amber-700">Interactivity:</span> JavaScript (ES6+), DOM
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-emerald-600">Deploy:</span> Git, GitHub &amp; Cloud Edge
                            </li>
                        </ul>
                    </div>

                    {/* Card 3: Who Can Enroll */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-purple-100/90 via-purple-50/70 to-fuchsia-50/50 rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-500 shadow-sm hover:shadow-[0_16px_36px_rgba(168,85,247,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-500/35">
                            <Users className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-purple-950 mb-1.5 group-hover:text-purple-600 transition-colors">
                            Who Can Enroll?
                        </h2>
                        <ul className="space-y-1 text-xs text-slate-600 font-normal">
                            <li>• 10th &amp; 12th Pass School Students</li>
                            <li>• BCA, B.Sc. IT &amp; Diploma Students</li>
                            <li>• B.Tech / MCA &amp; Degree Graduates</li>
                            <li>• Graphic Designers transitioning to UI code</li>
                            <li>• Career changers entering tech careers</li>
                        </ul>
                    </div>

                    {/* Card 4: Active Batch Snapshot */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/90 via-emerald-50/70 to-teal-50/50 rounded-2xl p-5 border-2 border-emerald-200 hover:border-emerald-500 shadow-sm hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/35">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                                    Admissions Open
                                </span>
                            </div>
                            <h2 className="text-sm sm:text-base font-semibold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">
                                Web Dev Admissions
                            </h2>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed mb-2">
                                Daily 1-on-1 practical computer lab time, instructor mentorship, and live website portfolio builds.
                            </p>
                        </div>
                        <div className="pt-2.5 border-t border-emerald-200 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700">Helpline:</span>
                            <a href="tel:8800817447" className="text-xs font-semibold text-blue-600 hover:underline">
                                0120-2611111 / +91-8800817447
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── 3. SPECIALIZED TECHNOLOGY TRACKS (Vivid Colorful Cards) ── */}
                <div className="mb-14">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>SPECIALIZED LEARNING PATHWAYS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Choose Your Web Development Specialization
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Tailor your curriculum whether you aim to design high-converting landing pages, master responsive frontend systems, or deploy scalable React applications.
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

                {/* ── 4. COMPLETE 13 MODULE CURRICULUM (Interactive & Ultra-Colorful Accordion) ── */}
                <div id="curriculum" className="mb-14 scroll-mt-6">
                    <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-slate-200 shadow-sm">
                        {/* Header & Controls */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>STRUCTURED SYLLABUS ROADMAP</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                                    Complete Curriculum (All 13 Modules)
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                                    A structured end-to-end journey from computer basics to building, styling, scripting, and deploying live production websites.
                                </p>
                            </div>

                            {/* Search & Expand All */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="relative min-w-[220px] sm:min-w-[260px]">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search HTML, CSS, JavaScript, React, SEO..."
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
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">Try searching for keywords like HTML, CSS, JavaScript, React, or Git</p>
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
                                                        Key Topics &amp; Practical Competencies in Module {m.id}:
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
                            <span>HANDS-ON PORTFOLIO</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Real-World Website Project Portfolio
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Graduate with an impressive live portfolio of websites deployed to the cloud with real source code on GitHub.
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
                                    ✓ Pushed to GitHub repository with custom domain &amp; live URL preview.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 6. SKILLS & PRACTICAL LAB SANDBOX ── */}
                <div className="mb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Skills Box */}
                        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-blue-600" />
                                <h2 className="text-base sm:text-lg font-semibold text-[#0a2540]">Technical Skills You Develop</h2>
                            </div>
                            <p className="text-xs text-slate-600 font-normal mb-4 leading-relaxed">
                                Acquire industry-standard skills essential for modern web agencies, software startups, and freelance opportunities:
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
                                <h2 className="text-base sm:text-lg font-semibold text-white">Live Web Development Sandbox</h2>
                            </div>
                            <p className="text-xs text-slate-200 font-normal mb-4 leading-relaxed">
                                Build real, commercial-grade websites with guidance from experienced senior developers:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Daily Hands-On Coding Sessions
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Mentor-Guided Code Reviews
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Responsive UI Screen Inspections
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Cloud Hosting &amp; Custom Domains
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Live GitHub Portfolio Setup
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Technical Interview Preparation
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Career Roles Grid */}
                    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                        <div className="text-center max-w-xl mx-auto mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-[#0a2540]">
                                Career Pathways &amp; Roles
                            </h3>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">
                                Career trajectories open to graduates of our Web Development course:
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
                                Career counseling and placement support are provided at no extra cost. We connect candidates with recruitment drives based on interview readiness and project qualification.
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── 7. 6-STAGE LEARNING PROGRESSION ── */}
                <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
                    <div className="text-center max-w-xl mx-auto mb-7">
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                            Curriculum Progression
                        </span>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight mt-1.5">
                            Your 6-Stage Web Development Journey
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

                {/* ── 8. FREQUENTLY ASKED QUESTIONS ── */}
                <div className="mb-14 max-w-4xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-7">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>FREQUENTLY ASKED QUESTIONS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Got Questions? We Have Answers
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
                                <span>NEW WEB DEVELOPMENT BATCH OPEN</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2">
                                Start Your Web Development Journey Today
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
                                href="tel:8800817447"
                                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full border border-white/30 backdrop-blur-xs transition-all duration-200"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call 0120-2611111</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
