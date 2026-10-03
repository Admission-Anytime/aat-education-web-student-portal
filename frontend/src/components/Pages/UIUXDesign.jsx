import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Palette,
    Layout,
    Smartphone,
    Laptop,
    Sparkles,
    Layers,
    Eye,
    MousePointerClick,
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
    Compass,
    Grid,
    Component,
    Figma,
    Sliders,
    PenTool,
    HelpCircle,
    X,
    Share2,
    Target,
    Code2
} from 'lucide-react';

const technologyTracks = [
    {
        name: 'UI/UX Foundation Track',
        stack: 'Design Principles • Visual Hierarchy • Layout & Grids • Wireframing • Figma Basics',
        desc: 'Understand the fundamental roles of design in websites, applications, and digital products. Master visual communication, color, typography, and basic wireframing.',
        badge: 'Level 1 • Beginner',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/50',
        borderColor: 'border-2 border-emerald-200 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        badgeColor: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/35',
        glow: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-700',
        highlight: 'Ideal for complete beginners and career starters with no prior design or graphic background.'
    },
    {
        name: 'Professional UI/UX Designing',
        stack: 'UX Research • User Personas • User Flows • Figma Components • Auto Layout • Prototyping',
        desc: 'Learn how to solve user problems using design thinking, conduct research, structure information architecture, and create polished, responsive interfaces.',
        badge: 'Level 2 • Core Skills',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/50',
        borderColor: 'border-2 border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        badgeColor: 'bg-blue-600 text-white shadow-xs shadow-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/35',
        glow: 'from-blue-500 to-cyan-400',
        accentText: 'text-blue-700',
        highlight: 'Complete end-to-end design execution from user problem statement to clickable prototype.'
    },
    {
        name: 'Advanced UI/UX & Product Design',
        stack: 'Design Systems • Design Tokens • Usability Testing • SaaS Dashboards • Mobile Apps • Case Studies',
        desc: 'Build comprehensive design systems with tokens and variants, evaluate designs with usability testing, create multi-screen apps, and produce hireable portfolio case studies.',
        badge: 'Level 3 • Advanced',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/50',
        borderColor: 'border-2 border-purple-200 hover:border-purple-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        badgeColor: 'bg-purple-600 text-white shadow-xs shadow-purple-500/30',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/35',
        glow: 'from-purple-500 to-violet-400',
        accentText: 'text-purple-700',
        highlight: 'For learners aiming for product design, high-growth startups, and UX leadership roles.'
    },
    {
        name: 'Design-to-Development Handoff',
        stack: 'Figma Dev Mode • Developer Handoff • Spacing & Specs • Responsive Breakpoints • Design Tokens',
        desc: 'Bridge the gap between design and engineering. Learn how to inspect designs, prepare design tokens, communicate specs, and ensure pixel-perfect implementation.',
        badge: 'Handoff & Workflows',
        cardBg: 'from-amber-100/90 via-amber-50/60 to-orange-50/50',
        borderColor: 'border-2 border-amber-200 hover:border-amber-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
        badgeColor: 'bg-amber-600 text-white shadow-xs shadow-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/35',
        glow: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-800',
        highlight: 'Essential industry skill for collaborating smoothly with frontend and full-stack teams.'
    }
];

const modules = [
    {
        id: '01',
        category: 'foundation',
        title: 'Design & Digital Product Fundamentals',
        subtitle: 'Understand the role of design in modern websites, applications, and digital products.',
        icon: Layout,
        badge: 'Foundation',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-sky-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-blue-600'
        },
        topics: [
            'Introduction to UI (User Interface) Design',
            'Introduction to UX (User Experience) Design',
            'UI vs UX: Key Differences & Synergy',
            'Digital Product Design Lifecycle',
            'User-Centred Design (UCD) Philosophy',
            'Design Thinking Fundamentals (Empathize, Define, Ideate, Prototype, Test)',
            'The End-to-End Design Process',
            'Visual Communication in Digital Products',
            'Basic Design Principles & Creative Mindset'
        ]
    },
    {
        id: '02',
        category: 'foundation',
        title: 'Design Principles & Visual Aesthetics',
        subtitle: 'Build a rock-solid foundation in visual hierarchy, interface structure, and layout design.',
        icon: Grid,
        badge: 'Core UI',
        theme: {
            cardBg: 'from-indigo-50/90 via-white to-purple-50/40',
            border: 'border-indigo-200 hover:border-indigo-400',
            badge: 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20',
            iconBg: 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xs',
            accent: 'text-indigo-700'
        },
        topics: [
            'Layout Systems & Canvas Anatomy',
            'Alignment & Spatial Organization',
            'Spacing Systems (4pt & 8pt Grid Standards)',
            'Contrast & Visual Dominance',
            'Visual Balance & Symmetry vs Asymmetry',
            'Visual Hierarchy & Scanning Patterns (F-Pattern, Z-Pattern)',
            'Repetition & Rhythm in UI Design',
            'Proximity & Gestalt Principles in Digital Products',
            'Visual Consistency Across Multiple Screens',
            'Grid Systems, Columns, Margins & Gutters',
            'Composition Techniques for High-Converting Screens'
        ]
    },
    {
        id: '03',
        category: 'research',
        title: 'User Experience (UX) Fundamentals',
        subtitle: 'Learn how to design digital experiences centered around real user psychology and behavior.',
        icon: Compass,
        badge: 'Core UX',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'User-Centred Design Frameworks',
            'Identifying User Needs vs Business Goals',
            'Defining Problem Statements & Pain Points',
            'Creating Actionable User Personas',
            'Crafting Real-World User Scenarios',
            'User Journey Mapping & Experience Curves',
            'Customer Journey Mapping (CJM)',
            'Information Architecture (IA) Fundamentals',
            'Constructing User Flows & Decision Paths',
            'Task Flows & Happy Paths vs Edge Cases',
            'Usability Fundamentals & Cognitive Load Reduction'
        ]
    },
    {
        id: '04',
        category: 'research',
        title: 'UX Research & Discovery Methods',
        subtitle: 'Understand how top product designers gather, analyze, and synthesize user insights.',
        icon: Eye,
        badge: 'Research',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-blue-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'Qualitative vs Quantitative UX Research',
            'Conducting User Interviews & Asking Non-Biased Questions',
            'Designing Effective Surveys & Feedback Forms',
            'Competitor Analysis & Feature Benchmarking',
            'User Observation & Contextual Inquiry',
            'Problem Identification & Root Cause Analysis',
            'Research Documentation & Insight Synthesis',
            'User Persona Creation from Field Data',
            'Empathy Mapping (Says, Thinks, Does, Feels)',
            'Customer Journey Mapping & Touchpoint Analysis',
            'Extracting Design Insights & Actionable Requirements'
        ]
    },
    {
        id: '05',
        category: 'research',
        title: 'Information Architecture (IA) & Navigation',
        subtitle: 'Learn how content and navigation are organized for intuitive, frictionless product discovery.',
        icon: Workflow,
        badge: 'Architecture',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Content Organization & Card Sorting Techniques',
            'Navigation Models (Hierarchical, Flat, Hub-and-Spoke)',
            'Website Structure & Deep Linking Hierarchy',
            'Mobile App Structure & Bottom Navigation Bars',
            'Category Taxonomy & Faceted Filtering',
            'Menu Design: Mega Menus, Dropdowns, Drawers & Off-Canvas',
            'User Flows & Multi-Step Transaction Paths',
            'Task Flows for Core Conversions (Checkout, Signup, Booking)',
            'Sitemap Architecture & Visual Flowcharts',
            'Information Hierarchy & Content Prioritization'
        ]
    },
    {
        id: '06',
        category: 'figma',
        title: 'Wireframing & Structural Blueprints',
        subtitle: 'Create structural blueprints of digital products before committing to visual styling.',
        icon: PenTool,
        badge: 'Wireframing',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'Low-Fidelity Wireframes (Sketches & Paper Prototypes)',
            'Mid-Fidelity & High-Fidelity Wireframes in Figma',
            'Website Wireframing (Landing Pages, Portals, Blogs)',
            'Mobile App Wireframing (iOS & Android Screen Standards)',
            'Dashboard & Web App Wireframing',
            'Layout Planning & Content Placeholder Standards',
            'Navigation Planning & Header / Footer Structural Layouts',
            'User Flow Integration within Wireframe Decks',
            'Responsive Structural Adapters for Mobile & Tablet'
        ]
    },
    {
        id: '07',
        category: 'figma',
        title: 'Figma UI/UX Design Mastery',
        subtitle: 'Master Figma — the industry standard collaborative UI/UX tool — from basics to pro workflows.',
        icon: Figma,
        badge: 'Figma Pro',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-orange-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'Figma Interface, Canvas, Layers & Page Organization',
            'Frames, Groups, Shapes & Vector Pen Tools',
            'Working with Typography, Text Layers & Bounding Boxes',
            'Image Masking, Fills, Blends & Visual Assets',
            'Reusable Master Components & Component Instances',
            'Auto Layout (Padding, Spacing, Direction, Alignment, Resizing)',
            'Constraints & Responsive Pinning Rules',
            'Shared Styles (Colors, Typography, Elevation, Shadows)',
            'Component Variants & Component Properties (Booleans, Text, Swaps)',
            'Asset Panels, Team Libraries & Version History',
            'Figma Prototyping Tools & Interactive Components',
            'Real-Time Collaboration, Comments & Feedback Loops',
            'Figma Dev Mode & Design Handoff Preparation'
        ]
    },
    {
        id: '08',
        category: 'ui',
        title: 'User Interface (UI) Design & Component Styling',
        subtitle: 'Transform rough wireframes into visually stunning, polished digital interfaces.',
        icon: Palette,
        badge: 'UI Design',
        theme: {
            cardBg: 'from-rose-50/90 via-white to-pink-50/40',
            border: 'border-rose-200 hover:border-rose-400',
            badge: 'bg-rose-600 text-white shadow-xs shadow-rose-500/20',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
            accent: 'text-rose-700'
        },
        topics: [
            'Modern Web UI Design Patterns & Sectional Styling',
            'Mobile UI Design for iOS & Android Guidelines',
            'Desktop UI & Large Screen Screen Real-Estate Utilization',
            'Responsive Interface Design for Diverse Devices',
            'Modern Navigation: Top Bars, Sidebars, Floating Bars',
            'Input Fields, Dropdowns, Checkboxes & Form Design',
            'Primary, Secondary, Tertiary & Ghost Button States',
            'Card Anatomy (Product Cards, Pricing Cards, Stat Cards)',
            'Data Tables, Row Actions, Sorting & Pagination',
            'Modals, Popovers, Dialogs & Overlay States',
            'Tabs, Accordions, Breadcrumbs & Notification Badges',
            'Search Bars, Filter Drawers & Autocomplete Interfaces',
            'Dashboard Layouts, Analytics Widgets & KPIs',
            'High-Converting Landing Pages & E-Commerce Storefronts'
        ]
    },
    {
        id: '09',
        category: 'ui',
        title: 'Colour Theory, Typography & Accessibility',
        subtitle: 'Craft accessible, readable, and cohesive visual identities for digital products.',
        icon: Sliders,
        badge: 'Aesthetics',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'Color Theory (Color Wheel, Harmonies, Monochromatic, Complementary)',
            'Color Psychology in Digital Products (Trust, Energy, Urgency, Calm)',
            'Building Digital Color Palettes (Primary, Neutral, Success, Warning, Error)',
            'Primary, Secondary, Surface & Background Tonal Sets',
            'Accessibility Guidelines (WCAG 2.1 AA/AAA Contrast Standards)',
            'Typography Fundamentals (Serif, Sans-Serif, Monospace, Display)',
            'Font Selection for Products, Dashboards & Corporate Brands',
            'Font Pairing Strategies & Harmonious Type Scales',
            'Typography Hierarchy (H1 to H6, Subheadings, Body, Captions)',
            'Readability, Line Length (Measure), Line Height (Leading) & Kerning',
            'Text Spacing & Paragraph Ergonomics',
            'Design Consistency & Universal Visual Polish'
        ]
    },
    {
        id: '10',
        category: 'ui',
        title: 'Design Systems & Component Libraries',
        subtitle: 'Understand how scalable, reusable design systems power modern product teams.',
        icon: Component,
        badge: 'Design System',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-cyan-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xs',
            accent: 'text-blue-700'
        },
        topics: [
            'Design System Fundamentals & Industry Standards (Material Design, Apple HIG)',
            'Design Tokens (Color Tokens, Spacing Tokens, Typography Tokens)',
            'Defining Global Color Styles & Dark/Light Mode Variables',
            'Global Typography Styles & Scales',
            'Spacing & Sizing Tokens (4px, 8px, 12px, 16px, 24px, 32px)',
            'Atomic Design Principles (Atoms, Molecules, Organisms, Templates, Pages)',
            'Master Component Libraries & Variant Configurations',
            'Reusable UI Patterns (Headers, Footers, Hero Blocks, Forms)',
            'Creating Scalable Component Libraries in Figma',
            'Maintaining Design System Documentation & Guidelines'
        ]
    },
    {
        id: '11',
        category: 'prototype',
        title: 'Interactive Prototyping & Micro-Interactions',
        subtitle: 'Bring static screens to life with realistic flows, triggers, transitions, and micro-interactions.',
        icon: MousePointerClick,
        badge: 'Prototyping',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Prototyping Fundamentals & Screen Node Connections',
            'Navigation Links, Back Actions & Page Transitions',
            'Interaction Triggers: On Click, On Hover, While Pressing, Mouse Enter',
            'Transition Types: Instant, Dissolve, Smart Animate, Move In/Out',
            'Interactive Overlays (Modals, Slide-in Drawers, Tooltips)',
            'Designing Micro-Interactions (Button states, Toggle switches, Loaders)',
            'Building Realistic User Flow Prototypes (Complete End-to-End Tasks)',
            'Mobile App Prototypes with Realistic Device Mockups',
            'Website & Web App Interactive Prototypes',
            'Presenting Interactive Product Demonstrations to Stakeholders'
        ]
    },
    {
        id: '12',
        category: 'prototype',
        title: 'Usability Testing & Design Evaluation',
        subtitle: 'Learn how to test designs with real users, spot usability friction, and iteratively improve products.',
        icon: HelpCircle,
        badge: 'Evaluation',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-yellow-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'Usability Testing Fundamentals & Heuristic Evaluation',
            'User Testing Protocols (Moderated vs Unmoderated Testing)',
            'Designing Task-Based Usability Scenarios',
            'Structured Feedback Collection & Qualitative Observation',
            'Identifying Usability Friction Points & Navigation Bottlenecks',
            'Design Evaluation via Nielsen’s 10 Usability Heuristics',
            'Error Identification & Cognitive Friction Analysis',
            'Iterative Design Refinement based on User Feedback',
            'Measuring Usability: Task Success Rate, Time-on-Task & SUS Scores'
        ]
    },
    {
        id: '13',
        category: 'responsive',
        title: 'Responsive Design & Multi-Device UI',
        subtitle: 'Design interfaces that adapt seamlessly across desktop, tablet, and mobile screens.',
        icon: Monitor,
        badge: 'Responsive',
        theme: {
            cardBg: 'from-sky-50/90 via-white to-blue-50/40',
            border: 'border-sky-200 hover:border-sky-400',
            badge: 'bg-sky-600 text-white shadow-xs shadow-sky-500/20',
            iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xs',
            accent: 'text-sky-700'
        },
        topics: [
            'Desktop UI Screen Layouts & Multi-Column Structures',
            'Tablet Design & Touch vs Mouse Input Considerations',
            'Mobile Interface Design (Thumb Zone & Ergonomics)',
            'Responsive Layouts with Fluid Grids & Flexible Containers',
            'Standard Breakpoints (Desktop 1440/1200, Tablet 768/834, Mobile 375/390)',
            'Flexible Components that Scale Across Screen Sizes',
            'Responsive Navigation Patterns (Hamburger, Sticky Bottom Bar, Tab Bar)',
            'Mobile-First Design Philosophy & Progressive Enhancement',
            'Cross-Device Visual Consistency & Screen Density (1x, 2x, 3x Assets)'
        ]
    },
    {
        id: '14',
        category: 'responsive',
        title: 'Mobile App UI/UX (iOS & Android)',
        subtitle: 'Deep dive into mobile product design standards, touch targets, and platform guidelines.',
        icon: Smartphone,
        badge: 'Mobile Design',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-green-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'Mobile User Experience Ergonomics & One-Hand Usage',
            'Android Interface Design & Material Design 3 Guidelines',
            'iOS Interface Fundamentals & Apple Human Interface Guidelines (HIG)',
            'Mobile Navigation Systems (Bottom Nav, Top App Bar, Drawers)',
            'Touch Interactions: Swipe, Pinch, Long Press, Drag & Pull-to-Refresh',
            'Mobile Form Usability & Native Keyboards (Numeric, Email, Date Pickers)',
            'Mobile UI Components (Action Sheets, Floating Action Buttons, Chips, SnackBar)',
            'Responsive Mobile Screens across Multiple Device Aspect Ratios',
            'Mobile Micro-Prototyping & Gesture-Driven Transitions',
            'Comprehensive App User Flows (Onboarding, KYC, Settings, Cart)'
        ]
    },
    {
        id: '15',
        category: 'responsive',
        title: 'Websites, Dashboards & SaaS UI/UX',
        subtitle: 'Design high-converting websites, corporate portals, dashboards, and enterprise SaaS apps.',
        icon: Laptop,
        badge: 'Web & SaaS',
        theme: {
            cardBg: 'from-violet-50/90 via-white to-purple-50/40',
            border: 'border-violet-200 hover:border-violet-400',
            badge: 'bg-violet-600 text-white shadow-xs shadow-violet-500/20',
            iconBg: 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xs',
            accent: 'text-violet-700'
        },
        topics: [
            'Business & Corporate Website UI Design',
            'High-Converting Landing Page Design (Hero, Social Proof, CTAs)',
            'E-Commerce Interfaces (Product Listings, Filters, Cart & Checkout)',
            'SaaS Application UI & Multi-Tenant Workspaces',
            'CRM & ERP Interface Workflows',
            'Admin Dashboards & Real-Time Data Visualization',
            'Appointment & Travel Booking Platform Interfaces',
            'Education & Learning Management System (LMS) Interfaces',
            'Healthcare & Clinic Management Digital Interfaces',
            'Complex Business Management Applications & Data-Dense Screens'
        ]
    },
    {
        id: '16',
        category: 'handoff',
        title: 'Developer Handoff & Design Workflow',
        subtitle: 'Learn how to inspect, package, and communicate completed designs effectively to engineers.',
        icon: Share2,
        badge: 'Handoff',
        theme: {
            cardBg: 'from-slate-50/90 via-white to-gray-50/40',
            border: 'border-slate-300 hover:border-slate-500',
            badge: 'bg-slate-800 text-white shadow-xs shadow-slate-700/20',
            iconBg: 'bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-xs',
            accent: 'text-slate-800'
        },
        topics: [
            'Design Handoff Fundamentals & Workflow Integration',
            'Accurate Measurements, Padding, Gutters & Redlining in Figma',
            'Spacing Standards & Token Documentation',
            'Asset Exporting (SVG, PNG, WebP, @1x, @2x, @3x)',
            'Component States Documentation (Default, Hover, Active, Disabled, Error)',
            'Design Specifications & Edge Case Notes for Frontend Developers',
            'Responsive Behavior Guidelines & Breakpoint Specs',
            'Developer Notes & Implementation Constraints',
            'Figma Dev Mode Collaboration & Code Snippet Inspection',
            'The Design-to-Development Workflow for Smooth Product Releases'
        ]
    }
];

const projects = [
    {
        tier: 'Tier 1: Foundation Screens & Portfolios',
        tag: 'Level 1',
        tagBg: 'bg-blue-600 text-white shadow-xs shadow-blue-500/25',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md',
        glow: 'from-blue-500 to-cyan-400',
        titleColor: 'text-blue-950',
        items: [
            { name: 'Auth & Onboarding Screen Deck', desc: 'Modern login, registration, password reset, and social sign-in flows with micro-states.' },
            { name: 'High-Impact Personal Portfolio Site', desc: 'Personal branding website highlighting case studies, skills matrix, and interactive inquiry modals.' },
            { name: 'High-Converting Product Landing Page', desc: 'SaaS product landing page featuring hero section, feature breakdown, social proof, and sticky CTAs.' }
        ]
    },
    {
        tier: 'Tier 2: Multi-Screen Interactive Apps',
        tag: 'Level 2',
        tagBg: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/25',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md',
        glow: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        items: [
            { name: 'E-Commerce Mobile & Web Experience', desc: 'Category browsing, faceted search filters, rich product detail page, cart drawer, and guest checkout.' },
            { name: 'Food Delivery & Tracking Application', desc: 'End-to-end mobile flow for browsing restaurants, meal customization, live map tracking, and payment sheets.' },
            { name: 'Doctor Consultation & Booking Portal', desc: 'Specialist discovery, slot selection calendar, patient history forms, tele-consultation preview, and confirmation.' }
        ]
    },
    {
        tier: 'Tier 3: SaaS Platforms & Full Case Studies',
        tag: 'Level 3',
        tagBg: 'bg-purple-600 text-white shadow-xs shadow-purple-500/25',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md',
        glow: 'from-purple-500 to-violet-400',
        titleColor: 'text-purple-950',
        items: [
            { name: 'Enterprise Analytics SaaS Dashboard', desc: 'Collapsible navigation, multi-metric KPI cards, interactive data tables with filters, and team permission roles.' },
            { name: 'Complete Scalable Figma Design System', desc: 'Atomic design tokens, master variants, dark/light modes, auto-layout components, and developer specs.' },
            { name: 'End-to-End Product Design Case Study', desc: 'Problem framing, field research, user personas, journey mapping, wireframing, usability findings, and Figma prototype.' }
        ]
    }
];

const skillsWithThemes = [
    { name: 'Figma Mastery', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'Auto Layout & Components', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'Design Systems & Tokens', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'UX Research & Interviews', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
    { name: 'User Personas & Journey Maps', bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { name: 'Information Architecture (IA)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Wireframing (Low & High Fi)', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'Interactive Prototyping', bg: 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100' },
    { name: 'Smart Animate & Micro-Interactions', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { name: 'Mobile Ergonomics (iOS/Android)', bg: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { name: 'SaaS & Dashboard UI Design', bg: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
    { name: 'Usability Testing & Heuristics', bg: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
    { name: 'Figma Dev Mode & Handoff', bg: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100' }
];

const careerRoles = [
    {
        title: 'UI/UX Designer',
        desc: 'Handle both user research and interface execution for digital products, mobile apps, and SaaS.',
        cardBg: 'from-blue-100/90 via-blue-50/70 to-indigo-50/50',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        titleColor: 'text-blue-950 group-hover:text-blue-600'
    },
    {
        title: 'Product Designer',
        desc: 'Drive end-to-end design strategy, feature roadmaps, and business alignment in tech companies.',
        cardBg: 'from-purple-100/90 via-purple-50/70 to-violet-50/50',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
        titleColor: 'text-purple-950 group-hover:text-purple-600'
    },
    {
        title: 'UX Researcher',
        desc: 'Uncover user motivations, execute usability testing, and deliver actionable user insights.',
        cardBg: 'from-cyan-100/90 via-cyan-50/70 to-sky-50/50',
        border: 'border-2 border-cyan-200 hover:border-cyan-500',
        iconBg: 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-500/30',
        titleColor: 'text-cyan-950 group-hover:text-cyan-600'
    },
    {
        title: 'Mobile UI Designer',
        desc: 'Specialize in iOS Apple Human Interface Guidelines and Android Material Design 3 app screens.',
        cardBg: 'from-emerald-100/90 via-emerald-50/70 to-teal-50/50',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        titleColor: 'text-emerald-950 group-hover:text-emerald-600'
    },
    {
        title: 'Freelance Design Consultant',
        desc: 'Design high-converting landing pages, pitch prototypes, and brand design systems for global clients.',
        cardBg: 'from-amber-100/90 via-amber-50/70 to-orange-50/50',
        border: 'border-2 border-amber-200 hover:border-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
        titleColor: 'text-amber-950 group-hover:text-amber-600'
    }
];

const roadmapStages = [
    { step: '01', stage: 'FOUNDATION', desc: 'Design Principles, Grid & Visual Aesthetics', cardBg: 'from-blue-100/90 via-blue-50/60 to-white', border: 'border-2 border-blue-200 hover:border-blue-400', stepColor: 'text-blue-600' },
    { step: '02', stage: 'UX RESEARCH', desc: 'User Interviews, Personas & Journey Maps', cardBg: 'from-indigo-100/90 via-indigo-50/60 to-white', border: 'border-2 border-indigo-200 hover:border-indigo-400', stepColor: 'text-indigo-600' },
    { step: '03', stage: 'WIREFRAMING', desc: 'Information Architecture, Sitemaps & Layouts', cardBg: 'from-cyan-100/90 via-cyan-50/60 to-white', border: 'border-2 border-cyan-200 hover:border-cyan-400', stepColor: 'text-cyan-700' },
    { step: '04', stage: 'FIGMA MASTERY', desc: 'Auto Layout, Master Components & Systems', cardBg: 'from-teal-100/90 via-teal-50/60 to-white', border: 'border-2 border-teal-200 hover:border-teal-400', stepColor: 'text-teal-700' },
    { step: '05', stage: 'PROTOTYPING', desc: 'Smart Animate, Micro-Interactions & Usability', cardBg: 'from-purple-100/90 via-purple-50/60 to-white', border: 'border-2 border-purple-200 hover:border-purple-400', stepColor: 'text-purple-600' },
    { step: '06', stage: 'CASE STUDY & JOBS', desc: 'Behance/Dribbble Portfolio & Tech Handoff', cardBg: 'from-rose-100/90 via-rose-50/60 to-white', border: 'border-2 border-rose-200 hover:border-rose-400', stepColor: 'text-rose-600' }
];

const faqItems = [
    {
        q: 'Do I need drawing skills or prior graphic design experience for UI/UX?',
        a: 'No prior drawing or art background is needed. UI/UX design is rooted in problem-solving, cognitive psychology, typography, layout hierarchy, and systematic design thinking, all of which are taught from scratch in our curriculum.'
    },
    {
        q: 'What software will I learn in this course?',
        a: 'The primary focus is on Figma — the worldwide industry-standard collaborative tool used by Google, Airbnb, and Microsoft for UI design, component systems, auto layout, and interactive prototyping.'
    },
    {
        q: 'Will I graduate with a complete design portfolio?',
        a: 'Yes! You will graduate with polished Behance/Dribbble case studies showcasing real-world problem statements, user research, wireframes, high-fidelity prototypes, design system tokens, and usability findings.'
    },
    {
        q: 'What certificate will I receive upon completion?',
        a: 'Upon successfully completing all modules, design assignments, and the capstone case study, you receive an authorized Institute Certificate in UI/UX & Product Design from Aayush Institute (Est. 2002).'
    },
    {
        q: 'What kind of career and placement support is provided?',
        a: 'We provide comprehensive career guidance, including resume building, Figma/Behance portfolio reviews, whiteboard challenge practice, mock design interviews, and placement assistance through our active employer recruitment network at no additional cost.'
    },
    {
        q: 'What are the batch timings and class modes?',
        a: 'We offer flexible weekday morning, afternoon, and evening batches, as well as dedicated weekend batches for college students and working professionals. Classes include interactive studio critique and hands-on lab sandbox sessions.'
    }
];

export default function UIUXDesign() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModule, setOpenModule] = useState('01');
    const [openFaq, setOpenFaq] = useState(0);

    const categories = [
        { id: 'all', label: 'All 16 Modules' },
        { id: 'foundation', label: 'Foundation & Principles' },
        { id: 'research', label: 'UX Research & Strategy' },
        { id: 'figma', label: 'Wireframing & Figma' },
        { id: 'ui', label: 'UI Design & Systems' },
        { id: 'prototype', label: 'Prototyping & Testing' },
        { id: 'responsive', label: 'Mobile & SaaS UI' },
        { id: 'handoff', label: 'Developer Handoff' }
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
                            <Palette className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>UI/UX &amp; DIGITAL PRODUCT DESIGN • OFFICIAL CURRICULUM</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                            Master UI/UX &amp;{' '}
                            <span className="text-[#0055ff] block sm:inline">Product Design</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3.5 font-normal">
                            Design intuitive, engaging, and high-converting digital products. Master UX research, user personas, wireframing, Figma design systems, interactive prototyping, usability testing, and developer handoff with 100% practical lab training.
                        </p>

                        {/* 3 Trust Badges */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-5">
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <BookOpen className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">16 Core Modules</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Layers className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">4 Design Tracks</span>
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
                                href="/ui_ux_design_doc.pdf"
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
                    {/* Card 1: What is UI/UX Design */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100/90 via-blue-50/70 to-indigo-50/50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/35">
                            <Palette className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-blue-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                            What is UI/UX Design?
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            UI/UX Design combines visual aesthetics (UI) with deep psychological user research (UX) to create effortless, beautiful digital interfaces for apps and web platforms.
                        </p>
                    </div>

                    {/* Card 2: The Product Design Ecosystem */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100/90 via-indigo-50/70 to-purple-50/50 rounded-2xl p-5 border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/35">
                            <Workflow className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-indigo-950 mb-1.5 group-hover:text-indigo-600 transition-colors">
                            Design Ecosystem
                        </h2>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-emerald-600">Research:</span> Personas, Audits &amp; IA
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-blue-600">Wireframes:</span> Low/High-Fi Figma Blueprints
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-purple-600">UI Systems:</span> Colors, Typography, Tokens
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-amber-600">Testing:</span> Prototypes &amp; Dev Handoff
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
                            <li>• Graphic Designers transitioning to UI/UX</li>
                            <li>• College Students (BCA, B.Des, B.Tech, Arts)</li>
                            <li>• Frontend Developers wanting UX expertise</li>
                            <li>• Entrepreneurs designing product prototypes</li>
                            <li>• Anyone seeking high-demand creative tech roles</li>
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
                                Design Admissions
                            </h2>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed mb-2">
                                Daily 1-on-1 practical design feedback, mentor critiques, and live Figma case study portfolio builds.
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
                            <span>SPECIALIZED DESIGN PATHWAYS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Choose Your Design Career Pathway
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Focus on foundational UX principles, advanced enterprise design systems, high-converting web landing pages, or frictionless mobile application flows.
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

                {/* ── 4. COMPLETE 16 MODULE CURRICULUM (Interactive Accordion) ── */}
                <div id="curriculum" className="mb-14 scroll-mt-6">
                    <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-slate-200 shadow-sm">
                        {/* Header & Controls */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>COMPLETE PRODUCT DESIGN SYLLABUS</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                                    Complete UI/UX Curriculum (All 16 Modules)
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                                    A structured end-to-end journey from user psychology and wireframing to master Figma components, usability testing, and developer handoff.
                                </p>
                            </div>

                            {/* Search & Expand All */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="relative min-w-[220px] sm:min-w-[260px]">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search Figma, Auto Layout, Wireframe, Prototyping..."
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
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">Try searching for keywords like Figma, Auto Layout, Wireframe, or Prototype</p>
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
                            <span>CASE STUDY WORKSHOP</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Hands-On UI/UX Design Case Studies
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Graduate with an impressive Behance, Dribbble, and Figma portfolio featuring comprehensive multi-screen digital products.
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
                                    ✓ Documented on Behance &amp; interactive prototype link in Figma.
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
                                Acquire essential design proficiencies demanded by top product teams, design studios, and fast-growing tech startups:
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
                                <h2 className="text-base sm:text-lg font-semibold text-white">Live Design Studio Sandbox</h2>
                            </div>
                            <p className="text-xs text-slate-200 font-normal mb-4 leading-relaxed">
                                Experience an authentic design studio culture guided by experienced senior product designers:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Studio Critique &amp; Feedback Sessions
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Real-World User Interview Practicals
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Figma Design Systems &amp; Tokens
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Interactive Device Prototype Demos
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Behance &amp; Dribbble Portfolio Polish
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Whiteboard Design Challenges &amp; Mocks
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Career Roles Grid */}
                    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                        <div className="text-center max-w-xl mx-auto mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-[#0a2540]">
                                High-Growth Design Career Pathways
                            </h3>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">
                                Roles open to graduates of our UI/UX &amp; Product Design program:
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
                                Career guidance is provided at no extra cost. Placement assistance connects candidates with partner recruitment drives based on interview performance and portfolio qualification.
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
                            Your 6-Stage Product Design Progression
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
                                <span>NEW UI/UX DESIGN BATCH OPEN</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2">
                                Start Your Product Design Journey Today
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
