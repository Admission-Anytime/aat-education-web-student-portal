import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    TrendingUp,
    Search,
    Globe,
    Share2,
    Mail,
    Megaphone,
    Target,
    BarChart3,
    ShoppingCart,
    Video,
    Bot,
    Cpu,
    CheckCircle2,
    ArrowRight,
    BookOpen,
    Download,
    Phone,
    MessageSquare,
    ChevronDown,
    Rocket,
    Briefcase,
    Award,
    Users,
    Check,
    Sparkles,
    Building,
    MousePointerClick,
    LineChart,
    ShieldCheck,
    Zap,
    Layers,
    Compass,
    Filter,
    Shield,
    Laptop,
    HelpCircle,
    X,
    Workflow,
    Code2
} from 'lucide-react';

const technologyTracks = [
    {
        name: 'Foundation & Strategy Track',
        stack: 'Digital Ecosystem • Target Audience • Buyer Personas • Marketing Funnel • Competitor Audits',
        desc: 'Understand how digital channels work together, map the online customer journey, identify target audience segments, and create foundational marketing strategies.',
        badge: 'Level 1 • Beginner',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/50',
        borderColor: 'border-2 border-emerald-200 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        badgeColor: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/35',
        glow: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-700',
        highlight: 'Ideal for complete beginners, college students, and freshers starting from absolute scratch.'
    },
    {
        name: 'Performance Advertising Track',
        stack: 'Google Ads (PPC) • Meta Ads (FB & Insta) • Conversion Tracking • Retargeting • Lead Gen',
        desc: 'Master paid performance acquisition across search, social, and display networks. Optimize ad copy, calculate ROAS, and scale lead generation funnels.',
        badge: 'Level 2 • High ROI',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/50',
        borderColor: 'border-2 border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        badgeColor: 'bg-blue-600 text-white shadow-xs shadow-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/35',
        glow: 'from-blue-500 to-cyan-400',
        accentText: 'text-blue-700',
        highlight: 'Complete paid advertising mastery for high-growth tech companies and digital marketing agencies.'
    },
    {
        name: 'SEO & Organic Growth Track',
        stack: 'On-Page SEO • Technical SEO • Link Building • Local SEO • Google Business Profile',
        desc: 'Dominate search engine rankings organically. Learn keyword research, search intent mapping, technical crawlability, and Google Maps 3-Pack optimization.',
        badge: 'Long-Term Inbound',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/50',
        borderColor: 'border-2 border-purple-200 hover:border-purple-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        badgeColor: 'bg-purple-600 text-white shadow-xs shadow-purple-500/30',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/35',
        glow: 'from-purple-500 to-violet-400',
        accentText: 'text-purple-700',
        highlight: 'Generates zero-cost recurring organic traffic and high-intent inbound customer inquiries.'
    },
    {
        name: 'Data Analytics & AI Marketing',
        stack: 'Google Analytics 4 (GA4) • UTM Tracking • AI Prompting • Automation • CRM Integration',
        desc: 'Leverage data-driven attribution, advanced conversion funnels, e-commerce retention tactics, AI-assisted content scaling, and automated CRM workflows.',
        badge: 'Level 3 • Modern AI',
        cardBg: 'from-amber-100/90 via-amber-50/60 to-orange-50/50',
        borderColor: 'border-2 border-amber-200 hover:border-amber-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
        badgeColor: 'bg-amber-600 text-white shadow-xs shadow-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/35',
        glow: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-800',
        highlight: 'For professionals aiming for performance marketing, analytics, and digital marketing leadership roles.'
    }
];

const modules = [
    {
        id: '01',
        category: 'foundation',
        title: 'Digital Marketing Fundamentals & Ecosystem',
        subtitle: 'Understand the modern digital marketing landscape and how interconnected channels drive business growth.',
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
            'Introduction to Digital Marketing & Core Principles',
            'Traditional vs Digital Marketing: Key Shifts & ROI',
            'Digital Channels Overview (Search, Social, Paid, Email, Video)',
            'The Online Customer Journey (Awareness to Advocacy)',
            'Target Audience Identification & Demographic Mapping',
            'Creating High-Yield Buyer Personas',
            'The Modern Marketing Funnel (TOFU, MOFU, BOFU)',
            'Inbound Lead Generation Principles & Conversion Basics',
            'Digital Competitor Analysis & Benchmarking'
        ]
    },
    {
        id: '02',
        category: 'foundation',
        title: 'Website & Conversion-Focused Landing Pages',
        subtitle: 'Understand the critical role of responsive websites and landing pages in turning clicks into customers.',
        icon: MousePointerClick,
        badge: 'Web & CRO',
        theme: {
            cardBg: 'from-indigo-50/90 via-white to-purple-50/40',
            border: 'border-indigo-200 hover:border-indigo-400',
            badge: 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20',
            iconBg: 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xs',
            accent: 'text-indigo-700'
        },
        topics: [
            'Website Fundamentals & Digital Brand Assets',
            'Domain, Web Hosting & DNS Essentials for Marketers',
            'Information Architecture & Navigation Flow for Conversions',
            'Landing Page Anatomy: Hooks, Value Propositions & Proof',
            'Designing High-Impact Calls-to-Action (CTAs)',
            'Optimizing Lead Capture Forms & Reducing Abandonment',
            'Conversion-Focused Web Design (CRO Fundamentals)',
            'Website Copywriting & Value-Driven Content Writing',
            'Core Web Vitals, Page Speed & Conversion Rates'
        ]
    },
    {
        id: '03',
        category: 'seo',
        title: 'Search Engine Optimisation — Complete SEO',
        subtitle: 'Master organic search visibility, technical site optimization, and high-ranking content strategies.',
        icon: Search,
        badge: 'Organic Search',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'SEO Fundamentals & Search Engine Ranking Algorithms',
            'How Search Engines Crawl, Index, and Rank Web Pages',
            'Keyword Research Strategies, Search Volume & Difficulty',
            'Search Intent Analysis (Informational, Commercial, Transactional)',
            'On-Page SEO: Title Tags, Meta Descriptions & Rich Snippets',
            'Header Tags Structure (H1, H2, H3) & Clean Keyword Placement',
            'Internal Linking Strategies & Topic Clusters / Pillar Pages',
            'Technical SEO: Robots.txt, XML Sitemaps & Canonical Tags',
            'Off-Page SEO & Ethical Link Building Fundamentals',
            'Conducting Full SEO Audits & Competitor Gap Analysis'
        ]
    },
    {
        id: '04',
        category: 'paid',
        title: 'Google Ads & Paid Search (PPC) Advertising',
        subtitle: 'Learn paid search advertising, bidding strategies, keyword match types, and high-ROI campaigns.',
        icon: Target,
        badge: 'Paid Search',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-cyan-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xs',
            accent: 'text-blue-700'
        },
        topics: [
            'PPC (Pay-Per-Click) Advertising Fundamentals & Auction Dynamics',
            'Google Ads Account Architecture, Hierarchy & Settings',
            'Setting Up High-Intent Google Search Campaigns',
            'Keyword Match Types (Broad, Phrase, Exact) & Negative Keywords',
            'High-Converting Ad Copywriting & Responsive Search Ads (RSAs)',
            'Ad Assets & Extensions (Callout, Sitelinks, Call, Snippets)',
            'Landing Page Relevance & Google Quality Score Optimization',
            'Conversion Tracking & Google Tag Manager Integration',
            'Smart Bidding: Target CPA, Maximize Clicks, Maximize Conversions',
            'Search Campaign Optimization & ROI Performance Analysis'
        ]
    },
    {
        id: '05',
        category: 'social',
        title: 'Social Media Marketing (SMM) & Community',
        subtitle: 'Build loyal communities and establish authentic brand presence across leading social platforms.',
        icon: Share2,
        badge: 'Social Media',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'Social Media Strategy & Platform Selection for Brands',
            'Target Audience Research & Social Persona Development',
            'Building a 30-Day Social Media Content Calendar',
            'Facebook Marketing: Pages, Groups & Community Engagement',
            'Instagram Marketing: Reels, Carousels, Stories & Bio Hacks',
            'LinkedIn Marketing: B2B Thought Leadership & Outreach',
            'YouTube Channel Growth & Video Community Engagement',
            'Hashtag Strategies, Viral Reach & Platform Algorithms',
            'Social Media Analytics, Engagement Metrics & KPI Tracking'
        ]
    },
    {
        id: '06',
        category: 'paid',
        title: 'Social Media Advertising & Paid Ads (Meta Ads)',
        subtitle: 'Master performance advertising across Meta (Facebook & Instagram), custom audiences, and retargeting.',
        icon: Megaphone,
        badge: 'Meta Ads',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-blue-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'Meta Ads Manager Account Setup & Campaign Architecture',
            'Campaign Objectives (Awareness, Traffic, Leads, Sales)',
            'Audience Targeting: Demographics, Interests & Behaviors',
            'Creating Custom Audiences from Website Visitors & Customer Lists',
            'Lookalike Audiences & Expanding High-Converting Prospects',
            'Retargeting Funnels to Re-engage Interested Leads',
            'Creative Formats: Carousels, Video Hooks & Instant Experience',
            'Lead Generation Campaigns with In-App Instant Forms',
            'Meta Pixel Integration & Conversion API (CAPI) Overview',
            'Creative Fatigue Management & ROAS Performance Optimization'
        ]
    },
    {
        id: '07',
        category: 'content',
        title: 'Content Marketing, Copywriting & Storytelling',
        subtitle: 'Create valuable, persuasive content that attracts, educates, and converts potential buyers.',
        icon: BookOpen,
        badge: 'Content & Copy',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-orange-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'Content Marketing Fundamentals & Compounding Growth',
            'Content Strategy: Matching Content Types to Funnel Stages',
            'SEO Blog Writing, Long-Form Articles & Authority Guides',
            'Writing Compelling Social Media Posts & Twitter/LinkedIn Threads',
            'Short-Form Video Scripting for Reels, Shorts & TikTok',
            'Copywriting Formulas (AIDA, PAS, BAB, 4Ps)',
            'Crafting High-Converting Headlines & Email Subject Lines',
            'Psychological Triggers & Powerful Calls-to-Action (CTAs)',
            'Brand Storytelling & Emotional Connection in Marketing'
        ]
    },
    {
        id: '08',
        category: 'content',
        title: 'Email Marketing & Drip Automations',
        subtitle: 'Build owned customer lists, craft high-open newsletters, and automate lead nurturing funnels.',
        icon: Mail,
        badge: 'Retention',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Email Marketing Fundamentals & Owned Audience Value',
            'Building Quality Subscriber Lists via Lead Magnets & Opt-in Forms',
            'Designing High-Performing Email Newsletters & Templates',
            'Promotional Campaigns, Seasonal Sales & Product Announcements',
            'Email Personalization (Dynamic tags, Behavioral Triggers)',
            'List Segmentation by User Activity & Demographics',
            'Drip Sequences & Automated Welcome Funnels',
            'Key Metrics: Open Rate, CTR, Bounce Rate & Unsubscribe Rate',
            'Deliverability Best Practices & Spam Filter Avoidance'
        ]
    },
    {
        id: '09',
        category: 'seo',
        title: 'Local SEO & Google Business Profile (Local Search)',
        subtitle: 'Help local businesses, clinics, retail shops, and institutes dominate Google Maps and "near me" searches.',
        icon: Building,
        badge: 'Local Growth',
        theme: {
            cardBg: 'from-green-50/90 via-white to-emerald-50/40',
            border: 'border-green-200 hover:border-green-400',
            badge: 'bg-green-600 text-white shadow-xs shadow-green-500/20',
            iconBg: 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xs',
            accent: 'text-green-700'
        },
        topics: [
            'Local Search Dynamics & The Power of "Near Me" Searches',
            'Setting Up & Optimizing Google Business Profile (GBP)',
            'Google Maps 3-Pack Ranking Factors & NAP Consistency',
            'Local Keyword Research & Location-Specific Landing Pages',
            'Managing Customer Reviews & Positive Review Generation',
            'Adding Products, Services, Photos, Posts & FAQs to GBP',
            'Building Local Citations & Directory Listings',
            'Generating Qualified Local Inbound Enquiries & Phone Calls',
            'Local Online Reputation Management (ORM) Fundamentals'
        ]
    },
    {
        id: '10',
        category: 'ecom',
        title: 'E-Commerce Marketing & Online Store Scaling',
        subtitle: 'Understand how digital strategies drive traffic, reduce cart abandonment, and scale online store sales.',
        icon: ShoppingCart,
        badge: 'E-Commerce',
        theme: {
            cardBg: 'from-rose-50/90 via-white to-pink-50/40',
            border: 'border-rose-200 hover:border-rose-400',
            badge: 'bg-rose-600 text-white shadow-xs shadow-rose-500/20',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
            accent: 'text-rose-700'
        },
        topics: [
            'E-Commerce Marketing Fundamentals & Customer Lifecycle',
            'Optimizing E-Commerce Product Pages for Discovery & Sales',
            'E-Commerce SEO: Category Pages, Product Schemas & Breadcrumbs',
            'Google Shopping Ads & Search Advertising for Products',
            'Social Media Shoppable Catalogs & Dynamic Product Ads (DPAs)',
            'Building High-Converting Customer Acquisition Funnels',
            'Cart Abandonment Strategies & Automated Recovery Sequences',
            'Customer Retention, Repeat Purchases & Post-Purchase Funnels',
            'Measuring E-Commerce Performance: CAC, ROAS, AOV & LTV'
        ]
    },
    {
        id: '11',
        category: 'content',
        title: 'YouTube Marketing & Video Content Strategy',
        subtitle: 'Promote brands, products, and educational content through long-form and short-form video.',
        icon: Video,
        badge: 'Video Marketing',
        theme: {
            cardBg: 'from-red-50/90 via-white to-rose-50/40',
            border: 'border-red-200 hover:border-red-400',
            badge: 'bg-red-600 text-white shadow-xs shadow-red-500/20',
            iconBg: 'bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-xs',
            accent: 'text-red-700'
        },
        topics: [
            'The Power of Video in Modern Marketing & Buying Decisions',
            'YouTube Channel Setup, Branding & Channel Art Architecture',
            'Video Content Planning for Education, Demos & Reviews',
            'YouTube SEO: Video Titles, Descriptions, Tags & Closed Captions',
            'Designing High-CTR Custom Video Thumbnails',
            'Structuring High-Retention Video Hooks & Retention Curves',
            'End Screens, Cards & Strategic CTAs for Website Traffic',
            'Short-Form Video Strategy (YouTube Shorts & Cross-Posting)',
            'YouTube Analytics: Watch Time, Impressions, CTR & Drop-Off'
        ]
    },
    {
        id: '12',
        category: 'analytics',
        title: 'Marketing Analytics & Performance Metrics',
        subtitle: 'Learn to measure digital marketing performance and make data-driven investment decisions.',
        icon: BarChart3,
        badge: 'Analytics',
        theme: {
            cardBg: 'from-violet-50/90 via-white to-purple-50/40',
            border: 'border-violet-200 hover:border-violet-400',
            badge: 'bg-violet-600 text-white shadow-xs shadow-violet-500/20',
            iconBg: 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xs',
            accent: 'text-violet-700'
        },
        topics: [
            'Key Digital Marketing Metrics & KPI Frameworks',
            'Analyzing Website Traffic, Sessions & Unique Visitors',
            'User Behavior Analysis: Bounce Rate, Pages/Session & Duration',
            'Lead Tracking & Form Submission Metrics',
            'Conversion Rate Calculations & Identifying Funnel Leaks',
            'Traffic Source Attribution (Organic, Paid, Social, Direct, Email)',
            'Return on Ad Spend (ROAS) & Return on Investment (ROI) Metrics',
            'Building Client-Ready Marketing Performance Dashboards'
        ]
    },
    {
        id: '13',
        category: 'analytics',
        title: 'Google Analytics 4 (GA4) & Tracking Tools',
        subtitle: 'Master Google Analytics 4, event-based data measurement, and custom UTM tracking parameters.',
        icon: LineChart,
        badge: 'GA4 Tracking',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-indigo-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-blue-700'
        },
        topics: [
            'Google Analytics 4 (GA4) Architecture & Interface Overview',
            'Event-Based Measurement Model vs Universal Analytics',
            'Setting Up Custom Events & Key Conversion Actions',
            'User Acquisition & Traffic Acquisition Reports',
            'Custom Campaign Tracking using UTM Parameters (Campaign URL Builder)',
            'Audience Segmentation, Demographics & Tech Device Insights',
            'Google Search Console (GSC) Integration & Keyword Queries',
            'Creating Exploration Reports, Funnel Explorations & Dashboards'
        ]
    },
    {
        id: '14',
        category: 'ai',
        title: 'AI Tools for Modern Digital Marketing',
        subtitle: 'Supercharge marketing workflows, content creation, and campaign speed using modern AI tools.',
        icon: Bot,
        badge: 'AI Marketing',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-yellow-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'AI Fundamentals in Modern Marketing & Generative Productivity',
            'AI-Assisted Content Creation for Blogs, Social Media & Emails',
            'Prompt Engineering for Marketers (Persona, Context, Tone, Constraints)',
            'Generating 30-Day Content Calendars & Campaign Angles in Minutes',
            'AI-Powered Ad Copywriting & Multivariant Headline Generation',
            'Using AI for Keyword Research, Topic Ideation & Search Intent',
            'Competitive Marketing Research & Audience Sentiment Analysis with AI',
            'Best Practices: Fact-Checking, Plagiarism Avoidance & Brand Voice'
        ]
    },
    {
        id: '15',
        category: 'ai',
        title: 'Marketing Automation & CRM Integration',
        subtitle: 'Streamline repetitive marketing activities, follow-up communications, and lead nurturing.',
        icon: Cpu,
        badge: 'Automation',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-teal-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'Marketing Automation Fundamentals & Business Efficiency',
            'Automated Lead Capture from Forms, Ads & Chatbots',
            'Lead Nurturing Workflows & Trigger-Based Email Communications',
            'Automated Follow-Up Sequences for Incomplete Enquiries',
            'Social Media Campaign Scheduling & Queue Management',
            'CRM Integration: Syncing Inbound Leads to Sales Teams',
            'Automated Performance Reporting & Client Alerts'
        ]
    },
    {
        id: '16',
        category: 'analytics',
        title: 'Online Reputation & Brand Management (ORM)',
        subtitle: 'Protect and elevate digital brand sentiment, social listening, and customer feedback management.',
        icon: ShieldCheck,
        badge: 'Brand & ORM',
        theme: {
            cardBg: 'from-slate-50/90 via-white to-gray-50/40',
            border: 'border-slate-300 hover:border-slate-500',
            badge: 'bg-slate-800 text-white shadow-xs shadow-slate-700/20',
            iconBg: 'bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-xs',
            accent: 'text-slate-800'
        },
        topics: [
            'Online Reputation Management (ORM) Fundamentals & Digital Footprint',
            'Monitoring Brand Mentions, Social Listening & Sentiment Tracking',
            'Customer Review Management on Google, Trustpilot & Social Portals',
            'Professional Response Frameworks for Positive & Negative Reviews',
            'Proactive Customer Feedback Collection & Net Promoter Score (NPS)',
            'Digital Crisis Communication Fundamentals & De-escalation Strategies',
            'Building Enduring Digital Brand Equity & Trust Signals'
        ]
    }
];

const projects = [
    {
        tier: 'Tier 1: Foundation Audits & Content Plans',
        tag: 'Phase 1',
        tagBg: 'bg-blue-600 text-white shadow-xs shadow-blue-500/25',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md',
        glow: 'from-blue-500 to-cyan-400',
        titleColor: 'text-blue-950',
        items: [
            { name: '30-Day Social Media Content Calendar', desc: 'Complete content strategy with post themes, copy, hashtag research, and visual creative briefs for Instagram and LinkedIn.' },
            { name: 'SEO Keyword Research & On-Page Plan', desc: 'In-depth keyword mapping, search intent analysis, and optimized meta titles, descriptions, and H1 tags for a targeted brand.' },
            { name: 'Local Business Google Profile & SEO Setup', desc: 'Full optimization of Google Business Profile with NAP consistency, photo assets, service categories, and local keywords.' }
        ]
    },
    {
        tier: 'Tier 2: Multi-Channel Paid & Organic Campaigns',
        tag: 'Phase 2',
        tagBg: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/25',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md',
        glow: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        items: [
            { name: 'High-Converting Meta Ads Campaign Deck', desc: 'Targeted Facebook & Instagram ads with custom audiences, carousel creatives, retargeting rules, and conversion tracking.' },
            { name: 'High-Intent Google Search (PPC) Campaign', desc: 'Campaign structure with negative keywords, responsive search ads, sitelinks, quality score optimization, and bid strategies.' },
            { name: 'Full B2B/B2C Inbound Lead Generation Funnel', desc: 'Dedicated high-converting landing page, lead capture form, automated email welcome sequence, and CRM routing.' }
        ]
    },
    {
        tier: 'Tier 3: Omnichannel Strategy & Performance Dashboards',
        tag: 'Phase 3',
        tagBg: 'bg-purple-600 text-white shadow-xs shadow-purple-500/25',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md',
        glow: 'from-purple-500 to-violet-400',
        titleColor: 'text-purple-950',
        items: [
            { name: 'Complete Omnichannel Growth Strategy', desc: 'Integrated corporate strategy combining SEO, PPC, Meta Ads, content marketing, email retention, and monthly budget forecasting.' },
            { name: 'Google Analytics 4 (GA4) Analytics Dashboard', desc: 'Full custom Looker Studio dashboard tracking organic vs paid acquisition, conversions, CAC, and multi-touch attribution.' },
            { name: 'AI-Automated Marketing Pipeline Implementation', desc: 'Automated workflows using generative AI for campaign copy, automated CRM email triggers, and weekly ROI performance alerts.' }
        ]
    }
];

const skillsWithThemes = [
    { name: 'SEO (On-Page & Technical)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Google Ads (Search, Display, PPC)', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'Meta Ads Manager (FB & IG)', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
    { name: 'Google Analytics 4 (GA4)', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'Social Media Marketing (SMM)', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'Email Drip Automations', bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { name: 'Conversion Rate Optimization (CRO)', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'Local SEO & Google Business Profile', bg: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
    { name: 'AI Marketing & Prompting', bg: 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100' },
    { name: 'Copywriting & Content Strategy', bg: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
    { name: 'E-Commerce Scaling & Retargeting', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { name: 'Online Reputation (ORM)', bg: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100' }
];

const careerRoles = [
    {
        title: 'Digital Marketing Specialist',
        desc: 'Execute multi-channel marketing campaigns, paid ad management, and conversion funnel optimization.',
        cardBg: 'from-blue-100/90 via-blue-50/70 to-indigo-50/50',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        titleColor: 'text-blue-950 group-hover:text-blue-600'
    },
    {
        title: 'SEO Strategist',
        desc: 'Drive organic search engine rankings, technical website audits, and high-ranking content architectures.',
        cardBg: 'from-emerald-100/90 via-emerald-50/70 to-teal-50/50',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        titleColor: 'text-emerald-950 group-hover:text-emerald-600'
    },
    {
        title: 'Performance & PPC Manager',
        desc: 'Manage high-budget paid advertising across Google Search and Meta Ads with strict ROAS targets.',
        cardBg: 'from-purple-100/90 via-purple-50/70 to-violet-50/50',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
        titleColor: 'text-purple-950 group-hover:text-purple-600'
    },
    {
        title: 'Social Media & Growth Lead',
        desc: 'Oversee organic brand channels, short-form video creation, community building, and viral reach.',
        cardBg: 'from-cyan-100/90 via-cyan-50/70 to-sky-50/50',
        border: 'border-2 border-cyan-200 hover:border-cyan-500',
        iconBg: 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-500/30',
        titleColor: 'text-cyan-950 group-hover:text-cyan-600'
    },
    {
        title: 'Freelance Marketing Consultant',
        desc: 'Manage client ad accounts, local SEO for businesses, and retainers as an independent growth partner.',
        cardBg: 'from-amber-100/90 via-amber-50/70 to-orange-50/50',
        border: 'border-2 border-amber-200 hover:border-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
        titleColor: 'text-amber-950 group-hover:text-amber-600'
    }
];

const roadmapStages = [
    { step: '01', stage: 'FOUNDATION', desc: 'Digital Ecosystem, Marketing Funnels & Buyer Personas', cardBg: 'from-blue-100/90 via-blue-50/60 to-white', border: 'border-2 border-blue-200 hover:border-blue-400', stepColor: 'text-blue-600' },
    { step: '02', stage: 'ORGANIC SEO', desc: 'Keyword Research, On-Page & Technical Website SEO', cardBg: 'from-emerald-100/90 via-emerald-50/60 to-white', border: 'border-2 border-emerald-200 hover:border-emerald-400', stepColor: 'text-emerald-700' },
    { step: '03', stage: 'PAID GOOGLE PPC', desc: 'Google Search Ads, Bidding Strategies & Negative Match', cardBg: 'from-cyan-100/90 via-cyan-50/60 to-white', border: 'border-2 border-cyan-200 hover:border-cyan-400', stepColor: 'text-cyan-700' },
    { step: '04', stage: 'META & SOCIAL', desc: 'Meta Ads Manager, Retargeting & Content Calendars', cardBg: 'from-purple-100/90 via-purple-50/60 to-white', border: 'border-2 border-purple-200 hover:border-purple-400', stepColor: 'text-purple-600' },
    { step: '05', stage: 'ANALYTICS & AI', desc: 'GA4 Event Tracking, UTM Attribution & AI Workflows', cardBg: 'from-amber-100/90 via-amber-50/60 to-white', border: 'border-2 border-amber-200 hover:border-amber-400', stepColor: 'text-amber-800' },
    { step: '06', stage: 'LIVE CAMPAIGNS', desc: 'Live Client Budgets, Portfolio & Interview Prep', cardBg: 'from-rose-100/90 via-rose-50/60 to-white', border: 'border-2 border-rose-200 hover:border-rose-400', stepColor: 'text-rose-600' }
];

const faqItems = [
    {
        q: 'Do I need any technical coding background to learn Digital Marketing?',
        a: 'No coding experience is required. Digital marketing is centered around audience psychology, creative ad copywriting, campaign management platforms (Google Ads, Meta Ads Manager), and data analytics tools (GA4).'
    },
    {
        q: 'Will I learn both organic marketing (SEO/Social) and paid advertising (PPC)?',
        a: 'Yes! Our curriculum gives equal, in-depth practical exposure to both organic inbound channels (SEO, Content, Social, Local GBP) and paid performance acquisition (Google Ads, Meta Ads, Shopping Ads).'
    },
    {
        q: 'How are modern AI tools integrated into the curriculum?',
        a: 'Module 14 covers prompt engineering for marketers, AI-assisted content ideation, automated copy generation, audience sentiment analysis, and automated CRM workflows to 10x your productivity.'
    },
    {
        q: 'What certificate will I receive upon completion?',
        a: 'Upon successfully completing all modules, live campaign assignments, and the capstone project, you receive an authorized Institute Certificate in Professional Digital Marketing from Aayush Institute (Est. 2002).'
    },
    {
        q: 'What kind of career and placement support is provided?',
        a: 'We provide comprehensive career guidance, including resume building, campaign portfolio documentation, mock client pitches, interview preparation, and placement assistance through our active employer recruitment network at no additional cost.'
    },
    {
        q: 'What are the batch timings and class modes?',
        a: 'We offer flexible weekday morning, afternoon, and evening batches, as well as dedicated weekend batches for college students, entrepreneurs, and working professionals. Classes include classroom instruction and live digital marketing lab sandbox sessions.'
    }
];

export default function DigitalMarketing() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModule, setOpenModule] = useState('01');
    const [openFaq, setOpenFaq] = useState(0);

    const categories = [
        { id: 'all', label: 'All 16 Modules' },
        { id: 'foundation', label: 'Foundation & CRO' },
        { id: 'seo', label: 'SEO & Local Search' },
        { id: 'paid', label: 'Google & Meta Ads' },
        { id: 'social', label: 'Social Media & SMM' },
        { id: 'content', label: 'Content, Email & Video' },
        { id: 'ecom', label: 'E-Commerce Marketing' },
        { id: 'analytics', label: 'Analytics, GA4 & ORM' },
        { id: 'ai', label: 'AI Tools & Automation' }
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
                            <TrendingUp className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>DIGITAL MARKETING &amp; PERFORMANCE • OFFICIAL CURRICULUM</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                            Master Modern{' '}
                            <span className="text-[#0055ff] block sm:inline">Digital Marketing</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3.5 font-normal">
                            Drive measurable business growth and high-converting customer acquisition. Master SEO, Google Ads (PPC), Meta Ads, Social Media Marketing, Email Drips, GA4 Analytics, and modern AI Marketing tools with 100% practical lab training.
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
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">4 Marketing Tracks</span>
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
                                href="/digital_marketing_doc.pdf"
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
                    {/* Card 1: What is Digital Marketing */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100/90 via-blue-50/70 to-indigo-50/50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/35">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-blue-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                            What is Digital Marketing?
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Digital Marketing is the strategic practice of connecting businesses with target customers online across search engines, social platforms, paid ads, email, and automated funnels.
                        </p>
                    </div>

                    {/* Card 2: Marketing Channels Architecture */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100/90 via-indigo-50/70 to-purple-50/50 rounded-2xl p-5 border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/35">
                            <Workflow className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-indigo-950 mb-1.5 group-hover:text-indigo-600 transition-colors">
                            Omnichannel Ecosystem
                        </h2>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-emerald-600">Organic Search:</span> SEO, GBP &amp; Keywords
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-blue-600">Paid Acquisition:</span> Google Ads &amp; Meta Ads
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-purple-600">Retention:</span> Email Drips, WhatsApp &amp; SMM
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-amber-600">Intelligence:</span> GA4, UTMs &amp; AI Prompting
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
                            <li>• 12th Pass, BBA, B.Com, BA &amp; College Grads</li>
                            <li>• Business Owners wanting to generate leads</li>
                            <li>• Working professionals pivoting to marketing</li>
                            <li>• Freelancers seeking global high-ticket clients</li>
                            <li>• Job seekers aiming for creative growth roles</li>
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
                                Live ad account management, mentor-guided campaign reviews, and verified client project portfolios.
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
                            <Target className="w-3.5 h-3.5" />
                            <span>SPECIALIZED MARKETING PATHWAYS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Choose Your Marketing Career Specialization
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Specialize in high-ROI performance advertising, organic search ranking, e-commerce scaling, or automated marketing workflows.
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
                                    <span>COMPLETE MARKETING SYLLABUS</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                                    Complete Curriculum (All 16 Modules)
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                                    A structured end-to-end journey from marketing psychology and content strategy to live paid ad management, GA4 analytics, and AI tools.
                                </p>
                            </div>

                            {/* Search & Expand All */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="relative min-w-[220px] sm:min-w-[260px]">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search SEO, Google Ads, Meta, GA4, AI..."
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
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">Try searching for keywords like SEO, Google Ads, Meta, GA4, or Email</p>
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
                            <span>CAMPAIGN WORKSHOP</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Hands-On Live Marketing Campaign Projects
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Graduate with an impressive campaign portfolio featuring verified SEO rankings, live ad management decks, and GA4 dashboards.
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
                                    ✓ Verified with live analytics snapshots &amp; campaign portfolio decks.
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
                                <h2 className="text-base sm:text-lg font-semibold text-[#0a2540]">Marketing Skills You Develop</h2>
                            </div>
                            <p className="text-xs text-slate-600 font-normal mb-4 leading-relaxed">
                                Acquire commercial skills demanded across performance marketing agencies, e-commerce stores, and high-growth brands:
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
                                <h2 className="text-base sm:text-lg font-semibold text-white">Live Campaign Lab Sandbox</h2>
                            </div>
                            <p className="text-xs text-slate-200 font-normal mb-4 leading-relaxed">
                                Experience an authentic digital agency environment guided by senior growth practitioners:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Live Google &amp; Meta Ads Setup
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Real-World SEO Auditing Tools
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • GA4 Event &amp; UTM Tracking Setup
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • AI Content &amp; Prompt Engineering
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Client Proposal &amp; Pitch Training
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Mock Technical Marketing Interviews
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Career Roles Grid */}
                    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                        <div className="text-center max-w-xl mx-auto mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-[#0a2540]">
                                High-Growth Marketing Career Pathways
                            </h3>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">
                                Career opportunities open to graduates of our Digital Marketing program:
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
                            Your 6-Stage Marketing Progression
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
                                <span>NEW DIGITAL MARKETING BATCH OPEN</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2">
                                Start Your Digital Marketing Career Today
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
