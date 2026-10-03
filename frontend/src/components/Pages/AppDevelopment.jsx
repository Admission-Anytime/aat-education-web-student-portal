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
    Sparkles,
    Smartphone,
    Zap,
    ShieldCheck,
    Laptop,
    HelpCircle,
    X
} from 'lucide-react';

const technologyTracks = [
    {
        name: 'Android Native Track',
        stack: 'Kotlin / Java • Android Studio • Jetpack • Room DB • Play Store',
        desc: 'Build high-performance native applications specifically engineered for the Android OS ecosystem with deep hardware and OS integration.',
        badge: 'Native Android',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/50',
        borderColor: 'border-2 border-emerald-200 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        badgeColor: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/35',
        glow: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-700',
        highlight: 'Deepest platform control, Material Design 3, background services, and Google Play Store distribution.'
    },
    {
        name: 'Flutter Cross-Platform Track',
        stack: 'Dart Language • Flutter Engine • Provider/Bloc • REST APIs • Firebase',
        desc: 'Create cross-platform mobile applications for both Android and iOS from a single codebase using Google\'s high-performance Flutter UI toolkit.',
        badge: 'Google Flutter',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/50',
        borderColor: 'border-2 border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        badgeColor: 'bg-blue-600 text-white shadow-xs shadow-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/35',
        glow: 'from-blue-500 to-cyan-400',
        accentText: 'text-blue-700',
        highlight: '60fps fluid UI animations, hot reload productivity, unified codebase, and multi-platform compilation.'
    },
    {
        name: 'React Native Mobile Track',
        stack: 'React • JavaScript / TypeScript • Expo • React Navigation • Mobile APIs',
        desc: 'Build reactive mobile applications leveraging your web React knowledge with JavaScript or modern TypeScript for fast release cycles.',
        badge: 'Meta React Native',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/50',
        borderColor: 'border-2 border-purple-200 hover:border-purple-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        badgeColor: 'bg-purple-600 text-white shadow-xs shadow-purple-500/30',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/35',
        glow: 'from-purple-500 to-violet-400',
        accentText: 'text-purple-700',
        highlight: 'Component reusability, rich npm mobile ecosystem, native bridge, and fast cross-device release cycles.'
    },
    {
        name: 'Mobile Cloud & Backend Track',
        stack: 'Firebase Auth • Cloud Firestore • FCM Push Notifications • REST APIs',
        desc: 'Master the serverless cloud infrastructure powering modern mobile apps: real-time streaming databases, user auth, and cloud push alerts.',
        badge: 'Cloud & BaaS',
        cardBg: 'from-amber-100/90 via-amber-50/60 to-orange-50/50',
        borderColor: 'border-2 border-amber-200 hover:border-amber-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
        badgeColor: 'bg-amber-600 text-white shadow-xs shadow-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/35',
        glow: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-800',
        highlight: 'Crucial for real-time chat, e-commerce ordering apps, social feeds, and live notifications.'
    }
];

const modules = [
    {
        id: '01',
        category: 'foundation',
        title: 'Computer & Mobile Architecture Fundamentals',
        subtitle: 'Build a strong technical baseline before developing mobile applications.',
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
            'Computer Fundamentals & Mobile Hardware Architecture',
            'Operating System Basics (Android OS, Linux, Windows, macOS)',
            'Internet Protocols, HTTP/HTTPS & Mobile Client Networks',
            'Software Development Life Cycle (SDLC) for Mobile Apps',
            'Setting Up the Mobile Development Environment & IDEs',
            'Project Directories, Assets & Folder Architecture',
            'Command Line Interface (CLI) Fundamentals & SDK Tools',
            'Programming Logic, Flowcharts & Problem-Solving'
        ]
    },
    {
        id: '02',
        category: 'foundation',
        title: 'Programming Logic & Object-Oriented Principles',
        subtitle: 'Develop programming logic, algorithms, and OOP paradigms for mobile engineering.',
        icon: Cpu,
        badge: 'Core Logic',
        theme: {
            cardBg: 'from-indigo-50/90 via-white to-purple-50/40',
            border: 'border-indigo-200 hover:border-indigo-400',
            badge: 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20',
            iconBg: 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xs',
            accent: 'text-indigo-700'
        },
        topics: [
            'Variables, Identifiers, Scopes & Data Types',
            'Operators (Arithmetic, Relational, Logical, Assignment)',
            'Conditional Control Flow (if/else, switch case)',
            'Loops & Iterations (for, while, do-while, map/forEach)',
            'Functions, Parameters, Return Types & Closures',
            'Arrays, Collections, Lists & Key-Value Maps',
            'Object-Oriented Programming (Classes, Objects, Constructors)',
            'Inheritance, Polymorphism, Abstraction & Encapsulation',
            'Error Handling, Exceptions & Debugging Techniques'
        ]
    },
    {
        id: '03',
        category: 'ui',
        title: 'Mobile UI/UX Design & Human Interfaces',
        subtitle: 'Learn how modern mobile app interfaces are designed, structured, and styled.',
        icon: Monitor,
        badge: 'Mobile UX/UI',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-blue-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'Mobile UI Fundamentals & Human Interface Guidelines',
            'Screen Layouts, Viewports & Mobile Screen Densities',
            'Touch Gestures, Buttons & Interactive Elements',
            'Input Fields, Text Controllers & Form Validation',
            'Lists, Scroll Views, Grid Views & Recycler Patterns',
            'Card Views, Dialog Prompts & Modal Bottom Sheets',
            'Working with Vector Assets, Drawables & Images',
            'Mobile Navigation Drawers & Bottom Tab Bars',
            'Responsive Layouts for Phones, Tablets & Foldables'
        ]
    },
    {
        id: '04',
        category: 'native',
        title: 'Android Development (Kotlin / Java)',
        subtitle: 'Dedicated native pathway for the global Android platform ecosystem.',
        icon: Smartphone,
        badge: 'Native Android',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'Android Studio Setup, Android SDK & Device Emulators',
            'Android Project Structure, Manifest & Gradle Build System',
            'Kotlin Programming Fundamentals & Java Core Concepts',
            'Activities, Activity Lifecycle & Intent Navigation',
            'Layouts (ConstraintLayout, LinearLayout) & Material Design',
            'RecyclerView, ViewHolders & Custom UI Adapters',
            'Android Runtime Permissions Handling',
            'Local Storage with SharedPreferences & Room Database',
            'Background Services, Workers & Android Notifications'
        ]
    },
    {
        id: '05',
        category: 'crossplatform',
        title: 'Dart & Flutter Cross-Platform Development',
        subtitle: 'Build cross-platform mobile apps for Android & iOS from a single codebase.',
        icon: Zap,
        badge: 'Flutter Track',
        theme: {
            cardBg: 'from-sky-50/90 via-white to-blue-50/40',
            border: 'border-sky-200 hover:border-sky-400',
            badge: 'bg-sky-600 text-white shadow-xs shadow-sky-500/20',
            iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xs',
            accent: 'text-sky-700'
        },
        topics: [
            'Dart Language Fundamentals, OOP & Async/Await',
            'Flutter Framework Architecture & Widget Tree Concept',
            'Stateless Widgets vs Stateful Widgets',
            'Container, Row, Column, Stack & Flexible Layouts',
            'Navigation, Named Routes & Page Transitions',
            'Form Handling, FormKey & Real-Time Input Validation',
            'State Management Fundamentals (Provider / Bloc / Riverpod)',
            'HTTP Client & Consuming REST APIs in Flutter',
            'Debugging, Hot Reload, Hot Restart & App Profiling'
        ]
    },
    {
        id: '06',
        category: 'crossplatform',
        title: 'React Native Mobile Development',
        subtitle: 'Build universal mobile applications using React and JavaScript / TypeScript.',
        icon: Code2,
        badge: 'React Native',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'React Fundamentals: Component Architecture & JSX',
            'Props, State & Core React Hooks (useState, useEffect)',
            'React Native Core Elements (View, Text, Image, FlatList)',
            'Styling with StyleSheet & Flexbox Mobile Layouts',
            'Navigation with React Navigation (Stack, Tabs, Drawer)',
            'Forms, Input Handling & Validation Libraries',
            'JavaScript (ES6+) and TypeScript for Mobile Projects',
            'Consuming REST APIs with Axios and Fetch API',
            'Expo Toolchain vs Native CLI Workflow'
        ]
    },
    {
        id: '07',
        category: 'data',
        title: 'Database & Device Local Storage',
        subtitle: 'Persist application data securely on device and synchronize with cloud storage.',
        icon: Database,
        badge: 'Data Persistence',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Mobile Database Concepts & Offline-First Strategy',
            'Key-Value Local Storage (SharedPreferences, AsyncStorage)',
            'SQLite Database Fundamentals & Relational Modeling',
            'CRUD Operations (Create, Read, Update, Delete)',
            'Room Database ORM (Android) / Hive / Drift (Flutter)',
            'Cloud Databases (Firebase Firestore & Realtime DB)',
            'Data Synchronization, Caching & Network Connectivity Checks',
            'Mobile Data Security, Keystore & Encryption'
        ]
    },
    {
        id: '08',
        category: 'backend',
        title: 'REST API & Cloud Backend Integration',
        subtitle: 'Connect mobile apps to servers, web services, and cloud databases.',
        icon: Server,
        badge: 'API Integration',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-indigo-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-blue-700'
        },
        topics: [
            'Mobile Client-Server Architecture & Communication',
            'RESTful API Principles & HTTP Protocols',
            'HTTP Methods: GET, POST, PUT, PATCH, DELETE',
            'JSON Parsing, Serialization & Data Model Classes',
            'Handling Headers, Bearer Auth Tokens & HTTP Status Codes',
            'Error Handling, Request Timeouts & Network Fallbacks',
            'Integrating Third-Party APIs (Payment Gateways, Maps, SMS)',
            'Testing Mobile Endpoints with Postman'
        ]
    },
    {
        id: '09',
        category: 'backend',
        title: 'User Authentication & Mobile App Security',
        subtitle: 'Implement robust and secure user login, registration, and session control.',
        icon: Lock,
        badge: 'Security',
        theme: {
            cardBg: 'from-rose-50/90 via-white to-pink-50/40',
            border: 'border-rose-200 hover:border-rose-400',
            badge: 'bg-rose-600 text-white shadow-xs shadow-rose-500/20',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
            accent: 'text-rose-700'
        },
        topics: [
            'User Registration & Sign-Up Validation Flows',
            'Login, Logout & Secure Session Management',
            'Password Hashing & Mobile Security Best Practices',
            'Token-Based Authentication (JWT Tokens & Refresh Tokens)',
            'OAuth & Social Authentication (Google Sign-In, Phone OTP)',
            'Secure Keystore / Keychain for Storing Tokens',
            'Role-Based User Authorization & Protected Screens',
            'Basic Mobile Application Hardening Guidelines'
        ]
    },
    {
        id: '10',
        category: 'backend',
        title: 'Firebase BaaS & Real-Time Cloud Services',
        subtitle: 'Supercharge apps with real-time cloud backend, push notifications, and analytics.',
        icon: Cloud,
        badge: 'Cloud & BaaS',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-orange-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'Google Firebase Ecosystem Overview for Mobile',
            'Firebase Authentication (Email/Password, Phone OTP, Google)',
            'Cloud Firestore & Real-Time Data Streaming',
            'Cloud Storage for Media, Profile Photos & Documents',
            'Firebase Cloud Messaging (FCM) & Push Notifications',
            'Crashlytics & Real-Time Application Error Monitoring',
            'Mobile Analytics & User Engagement Tracking',
            'Integrating Serverless Cloud Functions'
        ]
    },
    {
        id: '11',
        category: 'tools',
        title: 'App Testing, Profiling & Device Debugging',
        subtitle: 'Ensure rock-solid application stability, performance, and bug-free user experiences.',
        icon: ShieldCheck,
        badge: 'Testing & QA',
        theme: {
            cardBg: 'from-violet-50/90 via-white to-purple-50/40',
            border: 'border-violet-200 hover:border-violet-400',
            badge: 'bg-violet-600 text-white shadow-xs shadow-violet-500/20',
            iconBg: 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xs',
            accent: 'text-violet-700'
        },
        topics: [
            'Mobile Application Testing Methodologies',
            'UI Testing & Functional Flow Verification',
            'Using Device Emulators & Physical Device Debugging',
            'Breakpoints, Logcat & Layout Inspector Debugging',
            'Network Request & API Response Inspection',
            'Memory Leak Detection & Performance Profiling',
            'Handling Edge Cases, Low Memory & Network Drops',
            'Unit Testing Basics for Mobile Business Logic'
        ]
    },
    {
        id: '12',
        category: 'tools',
        title: 'Git & Version Control for Mobile Projects',
        subtitle: 'Master industry-standard source code management and collaborative engineering.',
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
            'Git Fundamentals & Distributed Version Control',
            'Repository Setup, Staging, Commits & History Tracking',
            'Branching Strategies for Feature Development',
            'Merging Branches & Conflict Resolution',
            'GitHub Remote Repositories & Collaboration Workflows',
            'Pull Requests, Code Reviews & Team Best Practices',
            'Configuring .gitignore for Android, Flutter & React Native',
            'Building a Professional Mobile Developer GitHub Portfolio'
        ]
    },
    {
        id: '13',
        category: 'tools',
        title: 'App Build, Release & Google Play Store Launch',
        subtitle: 'Learn how to generate release bundles and prepare apps for the Google Play Store.',
        icon: Rocket,
        badge: 'Store Launch',
        theme: {
            cardBg: 'from-green-50/90 via-white to-emerald-50/40',
            border: 'border-green-200 hover:border-green-400',
            badge: 'bg-green-600 text-white shadow-xs shadow-green-500/20',
            iconBg: 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xs',
            accent: 'text-green-700'
        },
        topics: [
            'Debug vs Release Build Configurations',
            'Android App Bundle (AAB) & APK Generation',
            'Keystore Creation & Digital App Signing',
            'App Versioning, Version Codes & Build Numbers',
            'Google Play Console Overview & Developer Account Setup',
            'Store Listing Assets: Icons, Feature Graphics, Screenshots',
            'Privacy Policy, Content Rating & Compliance Guidelines',
            'Application Distribution, Updates & Maintenance'
        ]
    }
];

const projects = [
    {
        tier: 'Tier 1: Beginner Utility Apps',
        tag: 'Phase 1',
        tagBg: 'bg-blue-600 text-white shadow-xs shadow-blue-500/25',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md',
        glow: 'from-blue-500 to-cyan-400',
        titleColor: 'text-blue-950',
        items: [
            { name: 'Calculator & Unit Converter App', desc: 'Mathematical operations, clean keypad grid, memory states, and responsive touch feedback.' },
            { name: 'To-Do Task Manager with Local Persistence', desc: 'Add, complete, edit, and delete tasks with SQLite/SharedPreferences persistence and category filters.' },
            { name: 'Digital Profile & Interactive Resume App', desc: 'Personal portfolio app featuring tab views, clickable contact buttons, credentials, and animated cards.' }
        ]
    },
    {
        tier: 'Tier 2: Intermediate Data-Driven Apps',
        tag: 'Phase 2',
        tagBg: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/25',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md',
        glow: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        items: [
            { name: 'Student Attendance & Record Tracker', desc: 'Daily attendance marking, calendar views, percentage statistics, SQLite persistence, and PDF report export.' },
            { name: 'Personal Expense & Budget Tracker', desc: 'Category-based income/expense logging, interactive pie charts, monthly analytics, and alert reminders.' },
            { name: 'Live REST API News & Content Reader', desc: 'Live REST API news consumption with search, pull-to-refresh, bookmarking, and offline article caching.' }
        ]
    },
    {
        tier: 'Tier 3: Advanced Commercial Capstones',
        tag: 'Phase 3',
        tagBg: 'bg-purple-600 text-white shadow-xs shadow-purple-500/25',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md',
        glow: 'from-purple-500 to-violet-400',
        titleColor: 'text-purple-950',
        items: [
            { name: 'E-Commerce Mobile Shopping App', desc: 'Full product catalogue, product variants, shopping cart, mock payment gateway flow, and order status tracking.' },
            { name: 'On-Demand Food Ordering Application', desc: 'Restaurant listings, menu customization, live GPS address picking, and real-time delivery status updates.' },
            { name: 'Firebase Real-Time Chat & Social App', desc: 'Phone OTP login, real-time message streaming with Firestore, push notifications (FCM), and profile photos.' }
        ]
    }
];

const skillsWithThemes = [
    { name: 'Android Studio & SDK', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Kotlin Programming', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'Flutter & Dart Framework', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'React Native & Expo', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
    { name: 'Mobile UI/UX Layouts', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'Room DB & SQLite', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'RESTful APIs & JSON Parsing', bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { name: 'Firebase Auth & Firestore', bg: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
    { name: 'Push Notifications (FCM)', bg: 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100' },
    { name: 'State Management (Bloc/Provider)', bg: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { name: 'Git & GitHub Mobile Repos', bg: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
    { name: 'Device Emulators & Profiling', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { name: 'AAB & Signed APK Bundles', bg: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
    { name: 'Google Play Store Launch', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' }
];

const careerRoles = [
    {
        title: 'Android App Developer',
        desc: 'Build, test, and release native Android applications using Kotlin and modern Jetpack tools.',
        cardBg: 'from-emerald-100/90 via-emerald-50/70 to-teal-50/50',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        titleColor: 'text-emerald-950 group-hover:text-emerald-600'
    },
    {
        title: 'Flutter Developer',
        desc: 'Craft high-performance cross-platform Android & iOS apps with Google Flutter and Dart.',
        cardBg: 'from-blue-100/90 via-blue-50/70 to-indigo-50/50',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        titleColor: 'text-blue-950 group-hover:text-blue-600'
    },
    {
        title: 'React Native Developer',
        desc: 'Develop universal reactive mobile applications for startups leveraging JavaScript / TypeScript.',
        cardBg: 'from-purple-100/90 via-purple-50/70 to-violet-50/50',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
        titleColor: 'text-purple-950 group-hover:text-purple-600'
    },
    {
        title: 'Mobile UI Engineer',
        desc: 'Translate Figma UI designs into fluid mobile animations, widgets, and responsive screen flows.',
        cardBg: 'from-cyan-100/90 via-cyan-50/70 to-sky-50/50',
        border: 'border-2 border-cyan-200 hover:border-cyan-500',
        iconBg: 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-500/30',
        titleColor: 'text-cyan-950 group-hover:text-cyan-600'
    },
    {
        title: 'Freelance App Specialist',
        desc: 'Build independent mobile apps, client solutions, and commercial products for the Play Store.',
        cardBg: 'from-amber-100/90 via-amber-50/70 to-orange-50/50',
        border: 'border-2 border-amber-200 hover:border-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
        titleColor: 'text-amber-950 group-hover:text-amber-600'
    }
];

const roadmapStages = [
    { step: '01', stage: 'BEGINNER', desc: 'Computer & Mobile Architecture Fundamentals', cardBg: 'from-blue-100/90 via-blue-50/60 to-white', border: 'border-2 border-blue-200 hover:border-blue-400', stepColor: 'text-blue-600' },
    { step: '02', stage: 'LANGUAGE CORE', desc: 'Kotlin / Dart / JavaScript Mobile Logic', cardBg: 'from-indigo-100/90 via-indigo-50/60 to-white', border: 'border-2 border-indigo-200 hover:border-indigo-400', stepColor: 'text-indigo-600' },
    { step: '03', stage: 'UI & WIDGETS', desc: 'Screens, Navigation, Themes & Gestures', cardBg: 'from-cyan-100/90 via-cyan-50/60 to-white', border: 'border-2 border-cyan-200 hover:border-cyan-400', stepColor: 'text-cyan-700' },
    { step: '04', stage: 'LOCAL DATA & STATE', desc: 'Room DB, SQLite & State Management', cardBg: 'from-teal-100/90 via-teal-50/60 to-white', border: 'border-2 border-teal-200 hover:border-teal-400', stepColor: 'text-teal-700' },
    { step: '05', stage: 'APIS & CLOUD', desc: 'REST Endpoints, Firebase Auth & Push FCM', cardBg: 'from-purple-100/90 via-purple-50/60 to-white', border: 'border-2 border-purple-200 hover:border-purple-400', stepColor: 'text-purple-600' },
    { step: '06', stage: 'STORE RELEASE', desc: 'Signed AAB, Google Play Store & Interviews', cardBg: 'from-rose-100/90 via-rose-50/60 to-white', border: 'border-2 border-rose-200 hover:border-rose-400', stepColor: 'text-rose-600' }
];

const faqItems = [
    {
        q: 'Do I need prior coding experience to join this Mobile App Development course?',
        a: 'No prior programming experience is required. The curriculum begins with Module 01 (Computer & Mobile Fundamentals), teaching programming logic and basic algorithms from absolute scratch before progressing to Kotlin, Flutter, or React Native.'
    },
    {
        q: 'Which is better to learn: Native Android, Flutter, or React Native?',
        a: 'All three pathways are highly sought after. Native Android (Kotlin) provides maximum performance and deepest hardware integration; Flutter provides fluid 60fps animations across Android & iOS from a single Dart codebase; React Native lets web developers transition into mobile using JavaScript/TypeScript.'
    },
    {
        q: 'Will I test my apps on real mobile devices during practical training?',
        a: 'Yes! In our computer labs, you will run and test your mobile applications on both high-speed Android Studio virtual emulators and directly on physical Android smartphones via USB debugging.'
    },
    {
        q: 'What certificate will I receive upon completion?',
        a: 'Upon successfully completing all modules, practical lab assignments, and the capstone mobile app, you receive an authorized Institute Certificate in Mobile Application Development from Aayush Institute (Est. 2002).'
    },
    {
        q: 'Will I learn how to publish apps to the Google Play Store?',
        a: 'Yes. Module 13 covers debug vs release build generation, creating digital cryptographic keystores, app signing, Google Play Console setup, and submission guidelines.'
    },
    {
        q: 'What kind of career and placement support is provided?',
        a: 'We provide comprehensive career guidance, including resume building, GitHub portfolio review, mock technical interviews, and placement assistance through our active employer recruitment network at no additional cost.'
    }
];

export default function AppDevelopment() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModule, setOpenModule] = useState('01');
    const [openFaq, setOpenFaq] = useState(0);

    const categories = [
        { id: 'all', label: 'All 13 Modules' },
        { id: 'foundation', label: 'Foundation & Logic' },
        { id: 'ui', label: 'Mobile UI/UX' },
        { id: 'native', label: 'Android Native' },
        { id: 'crossplatform', label: 'Flutter & React Native' },
        { id: 'data', label: 'Local DB & Storage' },
        { id: 'backend', label: 'APIs & Firebase' },
        { id: 'tools', label: 'Testing & Store Launch' }
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
                            <Smartphone className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>APP &amp; MOBILE SOFTWARE DEVELOPMENT • OFFICIAL CURRICULUM</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                            Master Mobile App{' '}
                            <span className="text-[#0055ff] block sm:inline">Development</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3.5 font-normal">
                            Engineer high-performance native Android (Kotlin) and cross-platform (Flutter &amp; React Native) mobile applications from scratch. Master UI widgets, SQLite/Room DB, Firebase, REST APIs, and Google Play Store deployment with 100% practical lab training.
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
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">3 Mobile Stacks</span>
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
                                href="/app_development_doc.pdf"
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
                    {/* Card 1: What is Mobile App Development */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100/90 via-blue-50/70 to-indigo-50/50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/35">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-blue-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                            What is Mobile App Dev?
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Mobile App Development is the process of creating touch-friendly software applications for Android &amp; iOS devices, utilizing device sensors, local storage, camera, and cloud APIs.
                        </p>
                    </div>

                    {/* Card 2: Mobile Stack Layers */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100/90 via-indigo-50/70 to-purple-50/50 rounded-2xl p-5 border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/35">
                            <Workflow className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-indigo-950 mb-1.5 group-hover:text-indigo-600 transition-colors">
                            How Mobile Apps Connect
                        </h2>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-emerald-600">Client UI:</span> Kotlin / Flutter / React Native
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-blue-600">Local Data:</span> SQLite, Room DB, Cache
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-purple-600">Cloud BaaS:</span> Firebase, REST APIs, JSON
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-amber-600">Launch:</span> Keystore, AAB, Play Store
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
                            <li>• BCA, B.Sc. IT &amp; Diploma Students</li>
                            <li>• B.Tech / B.E. &amp; MCA Engineers</li>
                            <li>• Web Developers moving into Mobile Apps</li>
                            <li>• Creative minds with mobile app ideas</li>
                            <li>• Career starters seeking high-growth tech roles</li>
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
                                    Spring 2026 Open
                                </span>
                            </div>
                            <h2 className="text-sm sm:text-base font-semibold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">
                                Batch Admissions
                            </h2>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed mb-2">
                                Daily physical device debugging, personalized mentor guidance, and commercial capstone builds.
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
                            <span>SPECIALIZED MOBILE PATHWAYS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Choose Your Mobile Technology Specialization
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Pick native Android Kotlin for hardware-level control, or cross-platform Flutter/React Native for rapid dual-platform releases.
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

                {/* ── 4. COMPLETE 13 MODULE CURRICULUM (Interactive Accordion) ── */}
                <div id="curriculum" className="mb-14 scroll-mt-6">
                    <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-slate-200 shadow-sm">
                        {/* Header & Controls */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>STRUCTURED MOBILE SYLLABUS</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                                    Complete Mobile Curriculum (All 13 Modules)
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                                    An end-to-end journey from computer basics to building, debugging, and releasing mobile apps to the Play Store.
                                </p>
                            </div>

                            {/* Search & Expand All */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="relative min-w-[220px] sm:min-w-[260px]">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search Kotlin, Flutter, React Native, Firebase..."
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
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">Try searching for keywords like Kotlin, Flutter, Firebase, SQLite, or Play Store</p>
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
                            <span>HANDS-ON PORTFOLIO</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Real-World Mobile Application Projects
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Graduate with verified mobile applications tested on real Android hardware with source code pushed to GitHub.
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
                                    ✓ Verified on physical Android devices with GitHub repository links.
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
                                Acquire in-demand competencies sought by mobile app development studios, product firms, and technology startups:
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
                                <h2 className="text-base sm:text-lg font-semibold text-white">Live Mobile App Lab Sandbox</h2>
                            </div>
                            <p className="text-xs text-slate-200 font-normal mb-4 leading-relaxed">
                                Build real mobile software in an authentic development environment under senior mentor guidance:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Physical Android Device Debugging
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Mentor-Led Code Reviews
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Cloud Firestore &amp; Auth Integration
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Signed APK &amp; AAB Bundle Generation
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Public GitHub Project Portfolio
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Technical Mock Interviews
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Career Roles Grid */}
                    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                        <div className="text-center max-w-xl mx-auto mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-[#0a2540]">
                                High-Growth Mobile Career Pathways
                            </h3>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">
                                Career trajectories open to graduates of our Mobile Application Development program:
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

                {/* ── 7. 6-STAGE LEARNING PROGRESSION ── */}
                <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
                    <div className="text-center max-w-xl mx-auto mb-7">
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                            Curriculum Progression
                        </span>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight mt-1.5">
                            Your 6-Stage Mobile App Developer Journey
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
                                <span>NEW APP DEVELOPMENT BATCH OPEN</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2">
                                Start Your Mobile App Development Journey Today
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
