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
    FileCode,
    Zap,
    Binary,
    ShieldCheck,
    Laptop,
    HelpCircle,
    X
} from 'lucide-react';

const technologyTracks = [
    {
        name: 'Python Core & Scripting',
        stack: 'Python 3.x • OOP • File Processing • Excel/CSV Automation • CLI Tools',
        desc: 'Master the fundamentals of Python programming, object-oriented concepts, algorithms, and practical automation scripts for business workflows.',
        badge: 'Core Programming',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/50',
        borderColor: 'border-2 border-emerald-200 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        badgeColor: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/35',
        glow: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-700',
        highlight: 'Ideal for beginners, scripting, file/data processing, task automation, and algorithmic problem-solving.'
    },
    {
        name: 'Django & Flask Web Track',
        stack: 'Django • Flask • MTV Pattern • ORM • REST APIs • Admin Panel',
        desc: 'Build secure, scalable, and data-driven web backends using industry-standard Python frameworks with built-in authentication and database connectivity.',
        badge: 'Web Frameworks',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/50',
        borderColor: 'border-2 border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        badgeColor: 'bg-blue-600 text-white shadow-xs shadow-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/35',
        glow: 'from-blue-500 to-cyan-400',
        accentText: 'text-blue-700',
        highlight: 'Enterprise web backends, rapid development, secure authentication, and robust CRUD architectures.'
    },
    {
        name: 'Python Full Stack Pathway',
        stack: 'HTML5/CSS3 • JavaScript • Python Backend • PostgreSQL • React',
        desc: 'A complete end-to-end development pathway combining responsive web frontend interfaces with powerful Python server backends and relational databases.',
        badge: 'Full Stack Pathway',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/50',
        borderColor: 'border-2 border-purple-200 hover:border-purple-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        badgeColor: 'bg-purple-600 text-white shadow-xs shadow-purple-500/30',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/35',
        glow: 'from-purple-500 to-violet-400',
        accentText: 'text-purple-700',
        highlight: 'Comprehensive full-stack exposure from user-facing screens to cloud database queries and live deployment.'
    },
    {
        name: 'Data & Automation Track',
        stack: 'NumPy • Pandas • Data Cleaning • Web Scraping • Task Automation',
        desc: 'Leverage Python\'s industry dominance as the foundational language for modern Data Analytics, web scraping bots, and automated business workflows.',
        badge: 'Data & AI Ready',
        cardBg: 'from-amber-100/90 via-amber-50/60 to-orange-50/50',
        borderColor: 'border-2 border-amber-200 hover:border-amber-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
        badgeColor: 'bg-amber-600 text-white shadow-xs shadow-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/35',
        glow: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-800',
        highlight: 'Gateway to high-demand careers in Data Analysis, Automation Scripting, and Machine Learning.'
    }
];

const modules = [
    {
        id: '01',
        category: 'foundation',
        title: 'Computer & Programming Fundamentals',
        subtitle: 'Build a solid foundation before moving into programming and application development.',
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
            'Operating System Basics (Linux, Windows, macOS CLI)',
            'Internet Protocols, HTTP/HTTPS & Web Fundamentals',
            'Software Development Concepts & Programming Paradigms',
            'Programming Logic, Algorithms & Flowchart Design',
            'Setting Up the Python Development Environment (VS Code / PyCharm)',
            'Command Line Interface (CLI) Fundamentals & Terminal Commands',
            'Algorithmic Problem-Solving & Computational Thinking'
        ]
    },
    {
        id: '02',
        category: 'foundation',
        title: 'Python Fundamentals & Syntax',
        subtitle: 'Learn the core concepts, data structures, and syntax of the Python language.',
        icon: Code2,
        badge: 'Core Python',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'Python Installation, Interactive Shell & Script Execution',
            'Variables, Naming Conventions, Identifiers & Dynamic Typing',
            'Data Types: Numbers (int, float, complex), Strings, Booleans',
            'Operators: Arithmetic, Comparison, Logical, Bitwise & Identity',
            'User Input, Output Formatting & Modern f-strings',
            'Conditional Control Flow: if, elif, else & Nested Conditions',
            'Loops & Iterations: while, for loops, break, continue & range()',
            'Core Collections: Lists, Tuples, Sets & Dictionaries in Depth',
            'Functions: Defining Functions, Parameters, Return Values & Scope',
            'Built-in Modules, Math, Random, Datetime & Custom Packages',
            'File Handling: Reading, Writing, Appending & with Statement',
            'Exception Handling: try, except, else, finally & Custom Exceptions'
        ]
    },
    {
        id: '03',
        category: 'oop',
        title: 'Object-Oriented Programming (OOP)',
        subtitle: 'Understand how real-world software applications are structured with Python OOP.',
        icon: Layers,
        badge: 'OOP Architecture',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'Procedural vs Object-Oriented Programming Paradigms',
            'Classes, Instances & Object Creation Lifecycle',
            'Constructors (__init__ method) & Instance Attributes',
            'Instance Methods, Class Methods (@classmethod) & Static Methods',
            'Encapsulation, Public & Private Variables (Name Mangling)',
            'Single, Multiple, Multilevel & Hierarchical Inheritance',
            'Method Overriding & super() Function in Python',
            'Polymorphism, Duck Typing & Operator Overloading',
            'Abstract Base Classes (abc module) & Modular Application Design'
        ]
    },
    {
        id: '04',
        category: 'oop',
        title: 'Advanced Python Concepts & Performance',
        subtitle: 'Develop professional coding practices and write idiomatic, high-performance Python code.',
        icon: Cpu,
        badge: 'Advanced Logic',
        theme: {
            cardBg: 'from-indigo-50/90 via-white to-blue-50/40',
            border: 'border-indigo-200 hover:border-indigo-400',
            badge: 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20',
            iconBg: 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-xs',
            accent: 'text-indigo-700'
        },
        topics: [
            'List, Set & Dictionary Comprehensions',
            'Lambda Anonymous Functions, map(), filter() & reduce()',
            'Iterators, Iterable Protocol & Custom Iterators',
            'Generators, yield Statement & Memory Optimization',
            'Function Decorators & Parameterized Decorators',
            'Regular Expressions (re module) for Pattern Matching & Validation',
            'Python Virtual Environments (venv) & pip Package Management',
            'Advanced Data Handling: *args, **kwargs & Unpacking',
            'Working with External Third-Party Libraries from PyPI'
        ]
    },
    {
        id: '05',
        category: 'data',
        title: 'File & Data Processing',
        subtitle: 'Learn how Python processes, transforms, and automates structured file formats.',
        icon: FileCode,
        badge: 'Data Processing',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-teal-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'Working with Flat Text Files & Stream Buffers',
            'CSV File Processing with the csv Module & Delimiters',
            'JSON Serialization & Deserialization (json.dumps, json.loads)',
            'Filesystem Operations with os, sys, shutil & pathlib Modules',
            'Automated File Renaming, Moving & Directory Archiving',
            'Parsing Configuration Files (ini, yaml, env)',
            'Data Import, Cleaning, Transformation & Exporting Workflows'
        ]
    },
    {
        id: '06',
        category: 'data',
        title: 'Database Connectivity & SQL with Python',
        subtitle: 'Learn how Python applications connect, query, and manage persistent databases.',
        icon: Database,
        badge: 'Databases & SQL',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Database Fundamentals & Relational Database Architecture (RDBMS)',
            'SQL Syntax: CREATE, SELECT, INSERT, UPDATE, DELETE',
            'Primary Keys, Foreign Keys, Table Constraints & Joins',
            'SQLite Database Integration using Python sqlite3 Module',
            'Connecting Python to MySQL & PostgreSQL Servers',
            'Database Cursors, Parametrized Queries & SQL Injection Prevention',
            'Transactions, Commit, Rollback & Connection Pooling',
            'Introduction to ORM (Object-Relational Mapping) Concepts'
        ]
    },
    {
        id: '07',
        category: 'web',
        title: 'Python Web Frameworks (Django & Flask)',
        subtitle: 'Build production-ready, dynamic web applications with Python frameworks.',
        icon: Globe,
        badge: 'Web Frameworks',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-cyan-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xs',
            accent: 'text-blue-700'
        },
        topics: [
            'Web Architecture: Client-Server, HTTP Requests & Status Codes',
            'Django Framework Architecture & Model-Template-View (MTV) Pattern',
            'Django Projects, Apps, URL Routing & View Functions',
            'Django Templates: Template Tags, Filters & Layout Inheritance',
            'Django Models, Migrations & Database Schema Management',
            'Django Forms, CSRF Protection & Form Validation',
            'Django Built-in Admin Interface & User Management',
            'Flask Micro-Framework: App Initialization, Routes & Jinja2 Templates',
            'Building Full-Featured CRUD Web Applications in Python'
        ]
    },
    {
        id: '08',
        category: 'web',
        title: 'REST API Development & Integration',
        subtitle: 'Create and consume RESTful endpoints for websites, mobile apps, and third-party tools.',
        icon: Server,
        badge: 'API Engineering',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-orange-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'REST API Architectural Principles & Stateless Communication',
            'HTTP Methods: GET, POST, PUT, PATCH, DELETE',
            'Designing Clean API Endpoints & Request/Response JSON Data',
            'Building APIs with Django REST Framework (DRF) / Flask-RESTful',
            'Serializers, ModelSerializers & Data Validation',
            'Consuming External APIs with the Python requests Library',
            'API Authentication (Token Authentication, API Keys, JWT Basics)',
            'Testing Endpoints with Postman & Status Code Handling'
        ]
    },
    {
        id: '09',
        category: 'web',
        title: 'Authentication & Web Security Fundamentals',
        subtitle: 'Protect applications with secure credentials, session handling, and access rules.',
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
            'User Registration, Login, Logout & Session Management',
            'Password Hashing (PBKDF2, bcrypt) & Salt Security',
            'Role-Based Authorization & Permission Groups',
            'Preventing Common Web Vulnerabilities (CSRF, XSS, SQLi)',
            'Securing API Endpoints with Bearer Tokens & Headers',
            'Managing Secrets & Environment Variables (.env Files)',
            'Basic Web Application Hardening & Security Best Practices'
        ]
    },
    {
        id: '10',
        category: 'automation',
        title: 'Python Automation & Scripting',
        subtitle: 'Automate repetitive office tasks, spreadsheets, and routine digital processes.',
        icon: Zap,
        badge: 'Automation',
        theme: {
            cardBg: 'from-yellow-50/90 via-white to-amber-50/40',
            border: 'border-yellow-200 hover:border-yellow-400',
            badge: 'bg-yellow-600 text-white shadow-xs shadow-yellow-500/20',
            iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-xs',
            accent: 'text-yellow-800'
        },
        topics: [
            'Automating File Organization, Backups & Cleanup Routines',
            'Spreadsheet Automation with openpyxl & pandas Basics',
            'Generating Automated PDF Reports & Summary Documents',
            'Web Scraping & Data Extraction Basics (BeautifulSoup, requests)',
            'Automated Email Dispatch (smtplib, email.mime)',
            'Scheduled Task Execution with cron / Windows Task Scheduler',
            'API-Based Automation Scripts & Data Sync Bots'
        ]
    },
    {
        id: '11',
        category: 'tools',
        title: 'Git & Version Control Workflows',
        subtitle: 'Master professional source code management and collaborative team workflows.',
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
            'Git Fundamentals & Distributed Version Control Concepts',
            'Repository Initialization, git add, git commit & git status',
            'Branching Strategies, git branch, checkout & git switch',
            'Merging Branches & Resolving Merge Conflicts',
            'Working with GitHub: Remote Repositories, push, pull & fetch',
            'Creating Pull Requests, Code Reviews & Collaboration',
            'Writing Professional .gitignore Files for Python Projects',
            'Building an Employer-Ready GitHub Project Portfolio'
        ]
    },
    {
        id: '12',
        category: 'tools',
        title: 'Testing, Debugging & PEP 8 Quality',
        subtitle: 'Write reliable, bug-free software using modern testing tools and logging.',
        icon: ShieldCheck,
        badge: 'QA & Testing',
        theme: {
            cardBg: 'from-violet-50/90 via-white to-purple-50/40',
            border: 'border-violet-200 hover:border-violet-400',
            badge: 'bg-violet-600 text-white shadow-xs shadow-violet-500/20',
            iconBg: 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xs',
            accent: 'text-violet-700'
        },
        topics: [
            'Python Debugging Techniques & Using the Python Debugger (pdb)',
            'Structured Logging with the logging Module vs print Statements',
            'Writing Unit Tests with unittest and pytest Frameworks',
            'Test Assertions, Test Discovery & Test Suites',
            'API Endpoint Testing & Automated Status Verification',
            'Handling Edge Cases, Exception Scenarios & Performance Checks',
            'Code Quality Tools: flake8, black & PEP 8 Code Guidelines'
        ]
    },
    {
        id: '13',
        category: 'tools',
        title: 'Deployment & Production Hosting',
        subtitle: 'Learn how Python applications are packaged, hosted, and deployed to live servers.',
        icon: Rocket,
        badge: 'Cloud Launch',
        theme: {
            cardBg: 'from-green-50/90 via-white to-emerald-50/40',
            border: 'border-green-200 hover:border-green-400',
            badge: 'bg-green-600 text-white shadow-xs shadow-green-500/20',
            iconBg: 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xs',
            accent: 'text-green-700'
        },
        topics: [
            'Application Packaging & Managing requirements.txt',
            'Configuring Production Settings vs Development Environments',
            'WSGI / ASGI Server Concepts (Gunicorn, Uvicorn)',
            'Static & Media Files Handling in Production',
            'Deploying Web Applications & APIs to Cloud Platforms (Render, PythonAnywhere, AWS/VPS)',
            'Production Database Configuration & Connection Security',
            'Domain Mapping, HTTPS Configuration & Ongoing Maintenance'
        ]
    }
];

const projects = [
    {
        tier: 'Tier 1: Beginner Python Scripts',
        tag: 'Phase 1',
        tagBg: 'bg-blue-600 text-white shadow-xs shadow-blue-500/25',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md',
        glow: 'from-blue-500 to-cyan-400',
        titleColor: 'text-blue-950',
        items: [
            { name: 'Console Scientific Calculator', desc: 'Mathematical evaluation, memory states, error checking, and computation history.' },
            { name: 'CLI Task & Note Manager', desc: 'Add, list, search, and delete tasks with text and CSV persistence.' },
            { name: 'Student Grading & Report System', desc: 'Calculate aggregate percentages, assign letter grades, and export formatted CSV reports.' }
        ]
    },
    {
        tier: 'Tier 2: Intermediate Database Applications',
        tag: 'Phase 2',
        tagBg: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/25',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md',
        glow: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        items: [
            { name: 'Library & Book Issue Portal', desc: 'Database-backed inventory system with book cataloging, member borrowing, and overdue fines in SQLite.' },
            { name: 'Automated Billing & Invoice Generator', desc: 'Generate itemized GST invoices, calculate taxes, and automatically output PDF receipts.' },
            { name: 'Smart File Automation & Cleaner Bot', desc: 'Automated Python script to sort, rename, clean, and archive downloads, logs, and report directories.' }
        ]
    },
    {
        tier: 'Tier 3: Advanced Web & API Capstones',
        tag: 'Phase 3',
        tagBg: 'bg-purple-600 text-white shadow-xs shadow-purple-500/25',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md',
        glow: 'from-purple-500 to-violet-400',
        titleColor: 'text-purple-950',
        items: [
            { name: 'Django Multi-Vendor E-Commerce Platform', desc: 'Product listings, category filters, cart, user auth, checkout flow, and Django Admin management.' },
            { name: 'Token-Protected REST API Microservice', desc: 'High-performance REST API built with Django REST Framework, JWT auth, and interactive Postman tests.' },
            { name: 'Python Full Stack CRM & SaaS Web App', desc: 'Lead tracking, customer interaction logs, automated email alerts, PostgreSQL DB, and cloud hosting.' }
        ]
    }
];

const skillsWithThemes = [
    { name: 'Python 3.x Core', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'Object-Oriented Programming (OOP)', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'Django & MTV Architecture', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Flask Micro-Framework', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
    { name: 'Django REST Framework (DRF)', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'SQL & Relational Databases', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'SQLite & PostgreSQL', bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { name: 'Web Scraping (BeautifulSoup)', bg: 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100' },
    { name: 'Excel / CSV Automation', bg: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
    { name: 'Git & GitHub Workflows', bg: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
    { name: 'Unit Testing & Pytest', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { name: 'Cloud Deployment (Gunicorn/Render)', bg: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { name: 'Postman API Testing', bg: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' }
];

const careerRoles = [
    {
        title: 'Python Developer',
        desc: 'Write robust backend business logic, database queries, and data workflows in tech companies.',
        cardBg: 'from-blue-100/90 via-blue-50/70 to-indigo-50/50',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        titleColor: 'text-blue-950 group-hover:text-blue-600'
    },
    {
        title: 'Django Web Developer',
        desc: 'Build scalable web portals, admin engines, and secure e-commerce web applications.',
        cardBg: 'from-emerald-100/90 via-emerald-50/70 to-teal-50/50',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        titleColor: 'text-emerald-950 group-hover:text-emerald-600'
    },
    {
        title: 'Backend API Engineer',
        desc: 'Architect high-throughput REST APIs and microservices for mobile apps and web frontends.',
        cardBg: 'from-purple-100/90 via-purple-50/70 to-violet-50/50',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
        titleColor: 'text-purple-950 group-hover:text-purple-600'
    },
    {
        title: 'Automation Script Specialist',
        desc: 'Automate business spreadsheets, reporting routines, email dispatches, and scraping bots.',
        cardBg: 'from-amber-100/90 via-amber-50/70 to-orange-50/50',
        border: 'border-2 border-amber-200 hover:border-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
        titleColor: 'text-amber-950 group-hover:text-amber-600'
    },
    {
        title: 'Software Developer',
        desc: 'Design, write, test, and deploy functional software systems in IT firms and enterprises.',
        cardBg: 'from-cyan-100/90 via-cyan-50/70 to-sky-50/50',
        border: 'border-2 border-cyan-200 hover:border-cyan-500',
        iconBg: 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-500/30',
        titleColor: 'text-cyan-950 group-hover:text-cyan-600'
    }
];

const roadmapStages = [
    { step: '01', stage: 'BEGINNER', desc: 'Computer & Programming Fundamentals, CLI', cardBg: 'from-blue-100/90 via-blue-50/60 to-white', border: 'border-2 border-blue-200 hover:border-blue-400', stepColor: 'text-blue-600' },
    { step: '02', stage: 'PYTHON CORE', desc: 'Syntax, Data Types, Collections & File I/O', cardBg: 'from-indigo-100/90 via-indigo-50/60 to-white', border: 'border-2 border-indigo-200 hover:border-indigo-400', stepColor: 'text-indigo-600' },
    { step: '03', stage: 'OOP & LOGIC', desc: 'Classes, Inheritance, Polymorphism & Modules', cardBg: 'from-cyan-100/90 via-cyan-50/60 to-white', border: 'border-2 border-cyan-200 hover:border-cyan-400', stepColor: 'text-cyan-700' },
    { step: '04', stage: 'SQL & DATA', desc: 'Databases, CRUD Queries & File Processing', cardBg: 'from-teal-100/90 via-teal-50/60 to-white', border: 'border-2 border-teal-200 hover:border-teal-400', stepColor: 'text-teal-700' },
    { step: '05', stage: 'WEB & APIS', desc: 'Django / Flask, REST APIs & Security Auth', cardBg: 'from-purple-100/90 via-purple-50/60 to-white', border: 'border-2 border-purple-200 hover:border-purple-400', stepColor: 'text-purple-600' },
    { step: '06', stage: 'DEPLOY & JOBS', desc: 'Cloud Launch, Git Portfolio & Tech Interviews', cardBg: 'from-rose-100/90 via-rose-50/60 to-white', border: 'border-2 border-rose-200 hover:border-rose-400', stepColor: 'text-rose-600' }
];

const faqItems = [
    {
        q: 'Do I need prior coding experience to join this Python course?',
        a: 'No prior programming background is required. The curriculum begins with Module 01 (Computer & Programming Fundamentals), establishing logic, problem-solving, and algorithmic thinking before progressing into Python syntax and frameworks.'
    },
    {
        q: 'Why is Python considered one of the best languages to learn today?',
        a: 'Python is celebrated for its clean, English-like syntax, immense versatility across web development (Django/Flask), automation scripting, data analytics, and Artificial Intelligence, plus huge demand across global technology employers.'
    },
    {
        q: 'Will I learn both Django and Flask in this course?',
        a: 'Yes! You will learn Flask for understanding micro-framework architecture and lightweight APIs, as well as Django for building enterprise-scale applications with built-in ORM, admin panel, and security features.'
    },
    {
        q: 'What certificate will I receive upon completion?',
        a: 'Upon successfully completing all modules, practical lab assignments, and the capstone project, you receive an authorized Institute Certificate in Python & Backend Software Development from Aayush Institute (Est. 2002).'
    },
    {
        q: 'What kind of career and placement support is provided?',
        a: 'We provide comprehensive career guidance, including resume building, GitHub portfolio review, mock technical interviews, and placement assistance through our active employer recruitment network at no additional cost.'
    },
    {
        q: 'What are the batch timings and class modes?',
        a: 'We offer flexible weekday morning, afternoon, and evening batches, as well as dedicated weekend batches for college students and working professionals. Classes include classroom instruction and practical computer lab sandbox sessions.'
    }
];

export default function PythonDevelopment() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModule, setOpenModule] = useState('01');
    const [openFaq, setOpenFaq] = useState(0);

    const categories = [
        { id: 'all', label: 'All 13 Modules' },
        { id: 'foundation', label: 'Foundation & Syntax' },
        { id: 'oop', label: 'OOP & Advanced' },
        { id: 'data', label: 'Data & Databases' },
        { id: 'web', label: 'Web & APIs' },
        { id: 'automation', label: 'Automation & Scripts' },
        { id: 'tools', label: 'Testing & Deploy' }
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
                            <Binary className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>PYTHON &amp; BACKEND SOFTWARE DEVELOPMENT • OFFICIAL CURRICULUM</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                            Master Python &amp;{' '}
                            <span className="text-[#0055ff] block sm:inline">Backend Development</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3.5 font-normal">
                            Build enterprise software applications, dynamic web backends, and automated data scripts. Master Python core, OOP, Django &amp; Flask, SQL databases, RESTful APIs, Git, and cloud deployment with 100% practical lab training.
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
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">4 Tech Tracks</span>
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
                                href="/python_development_doc.pdf"
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
                    {/* Card 1: What is Python Programming */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100/90 via-blue-50/70 to-indigo-50/50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/35">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-blue-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                            What is Python?
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Python is a high-level, general-purpose language renowned for simplicity, readability, and power across web backends, cloud APIs, task automation, and data engineering.
                        </p>
                    </div>

                    {/* Card 2: Python Application Architecture */}
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
                                <span className="font-semibold text-emerald-600">Core Logic:</span> OOP, Data Structures &amp; CLI
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-blue-600">Backend:</span> Django MTV, Flask &amp; DRF
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-purple-600">Databases:</span> PostgreSQL, MySQL, SQLite
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-amber-600">Deploy:</span> WSGI/ASGI, Render &amp; VPS
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
                            <li>• 12th Pass, BCA &amp; B.Sc. IT Students</li>
                            <li>• B.Tech / B.E. &amp; MCA Engineers</li>
                            <li>• Professionals seeking backend roles</li>
                            <li>• Non-coders wanting easy-to-learn syntax</li>
                            <li>• Future Data Science &amp; AI aspirants</li>
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
                                Daily 1-on-1 practical lab hours, mentor code reviews, and live database project builds.
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
                            <span>SPECIALIZED PYTHON PATHWAYS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Choose Your Python Specialization Track
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Focus on automated business workflows, scalable Django web backends, full-stack development, or foundation for data and artificial intelligence.
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
                                    <span>STEP-BY-STEP PYTHON ROADMAP</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                                    Complete Curriculum (All 13 Modules)
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                                    A structured end-to-end journey from computer basics and core syntax to building, testing, and deploying production web backends.
                                </p>
                            </div>

                            {/* Search & Expand All */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="relative min-w-[220px] sm:min-w-[260px]">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search OOP, Django, SQL, REST APIs, Automation..."
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
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">Try searching for keywords like Django, OOP, SQL, Flask, or APIs</p>
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
                            <span>PORTFOLIO WORKSHOP</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Hands-On Real Python Project Development
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Graduate with an impressive GitHub repository containing working, verified Python applications and live deployed backends.
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
                                Acquire versatile backend and automation proficiencies highly valued across IT product firms, digital agencies, and startups:
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
                                <h2 className="text-base sm:text-lg font-semibold text-white">Live Python Lab Sandbox</h2>
                            </div>
                            <p className="text-xs text-slate-200 font-normal mb-4 leading-relaxed">
                                Build real software within an authentic engineering environment guided by seasoned senior developers:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Database Modeling &amp; Migrations
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Mentor-Led Code Reviews &amp; PEP 8
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • REST API Endpoints with Postman
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Cloud Server Deployment (WSGI/ASGI)
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Live GitHub Project Portfolio
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
                                High-Growth Python Career Pathways
                            </h3>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">
                                Career opportunities open to graduates of our Python &amp; Backend Software Development program:
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
                            Your 6-Stage Python Progression
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
                                <span>NEW PYTHON BATCH ADMISSIONS OPEN</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2">
                                Start Your Python Software Journey Today
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
}
