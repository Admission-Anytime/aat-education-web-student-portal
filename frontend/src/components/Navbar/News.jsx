import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    Calendar,
    Tag,
    Clock,
    ArrowRight,
    Sparkles,
    Bell,
    Share2,
    BookOpen,
    Users,
    Award,
    ChevronRight,
    X,
    Filter,
    CheckCircle2,
    Building2,
    GraduationCap,
    Laptop,
    MessageSquare,
    Video,
    Play,
    Edit3,
    Plus,
    Trash2,
    ShieldCheck,
    Lock,
    KeyRound,
    RefreshCw
} from 'lucide-react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';

const getCategoryTheme = (category) => {
    switch (category) {
        case 'Batches':
            return { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", border: "border-emerald-200 hover:border-emerald-400", glow: "from-emerald-500/15" };
        case 'Placements':
            return { badge: "bg-blue-50 text-blue-700 border-blue-200", border: "border-blue-200 hover:border-blue-400", glow: "from-blue-500/15" };
        case 'Workshops':
            return { badge: "bg-amber-50 text-amber-700 border-amber-200", border: "border-amber-200 hover:border-amber-400", glow: "from-amber-500/15" };
        case 'University':
            return { badge: "bg-rose-50 text-rose-700 border-rose-200", border: "border-rose-200 hover:border-rose-400", glow: "from-rose-500/15" };
        case 'Blogs':
            return { badge: "bg-pink-50 text-pink-700 border-pink-200", border: "border-pink-200 hover:border-pink-400", glow: "from-pink-500/15" };
        default:
            return { badge: "bg-cyan-50 text-cyan-700 border-cyan-200", border: "border-cyan-200 hover:border-cyan-400", glow: "from-cyan-500/15" };
    }
};

const newsCategories = [
    { 
        id: 'All', 
        label: 'All Updates', 
        icon: <Bell className="w-3.5 h-3.5" />, 
        activeGrad: 'from-purple-600 via-violet-600 to-pink-500', 
        activeShadow: 'shadow-purple-500/35' 
    },
    { 
        id: 'Batches', 
        label: 'New Batches', 
        icon: <BookOpen className="w-3.5 h-3.5" />, 
        activeGrad: 'from-emerald-600 via-teal-600 to-cyan-500', 
        activeShadow: 'shadow-emerald-500/35' 
    },
    { 
        id: 'Placements', 
        label: 'Placement Drives', 
        icon: <Award className="w-3.5 h-3.5" />, 
        activeGrad: 'from-blue-600 via-indigo-600 to-cyan-500', 
        activeShadow: 'shadow-blue-500/35' 
    },
    { 
        id: 'Workshops', 
        label: 'Workshops & Events', 
        icon: <Laptop className="w-3.5 h-3.5" />, 
        activeGrad: 'from-amber-500 via-orange-500 to-yellow-400', 
        activeShadow: 'shadow-amber-500/35' 
    },
    { 
        id: 'University', 
        label: 'University Exams', 
        icon: <GraduationCap className="w-3.5 h-3.5" />, 
        activeGrad: 'from-rose-600 via-pink-600 to-purple-500', 
        activeShadow: 'shadow-rose-500/35' 
    },
    { 
        id: 'Announcements', 
        label: 'Announcements', 
        icon: <Building2 className="w-3.5 h-3.5" />, 
        activeGrad: 'from-cyan-600 via-blue-600 to-indigo-500', 
        activeShadow: 'shadow-cyan-500/35' 
    },
    { 
        id: 'Blogs', 
        label: 'Blogs & Vlogs', 
        icon: <Video className="w-3.5 h-3.5" />, 
        activeGrad: 'from-pink-600 via-rose-600 to-amber-500', 
        activeShadow: 'shadow-pink-500/35' 
    }
];

const newsArticles = [
    {
        id: 1,
        title: "Spring 2026 Batch Admissions Open: Full Stack, AI & Data Analytics",
        excerpt: "Admissions are now open for industry-certified diploma and fast-track certificate programmes. Get 100% practical lab training with industry capstone projects.",
        content: "Aayush Institute of Professional Studies announces new batch registrations for Full Stack Web Development (MERN), Artificial Intelligence & Machine Learning, and Data Analytics. The upcoming batches feature hands-on live project exposure, individual mentor guidance, and comprehensive placement support for graduates and career changers.",
        category: "Batches",
        date: "March 20, 2026",
        readTime: "3 min read",
        author: "Academic Cell",
        featured: true,
        image: "/corporate_ai.jpg",
        tags: ["Admissions", "Full Stack", "AI & ML", "March Batch"],
        theme: {
            badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
            border: "border-emerald-200 hover:border-emerald-400",
            glow: "from-emerald-500/15"
        }
    },
    {
        id: 2,
        title: "Campus Placement Drive 2026: 25+ Tech & Corporate Recruiters Participating",
        excerpt: "Annual placement initiative connects students with leading IT firms, digital marketing agencies, and accounting enterprises with package up to 7.5 LPA.",
        content: "The Placement Cell is organizing a massive career drive for passing-out candidates across Web Development, Python, Digital Marketing, and Tally GST. Participating employers include top IT solutions providers, creative design studios, and corporate enterprises offering full-time and internship opportunities.",
        category: "Placements",
        date: "March 18, 2026",
        readTime: "4 min read",
        author: "Placement Cell",
        featured: true,
        image: "/corporate_data.jpg",
        tags: ["Placement", "Job Fair", "Campus Drive", "Hiring"],
        theme: {
            badge: "bg-purple-50 text-purple-700 border-purple-200",
            border: "border-purple-200 hover:border-purple-400",
            glow: "from-purple-500/15"
        }
    },
    {
        id: 3,
        title: "Hands-On Workshop: Building Enterprise Apps with Generative AI & Next.js",
        excerpt: "A dedicated weekend practical workshop for developers and students exploring LLM APIs, prompt engineering, and modern web architectures.",
        content: "Join our expert software faculty for an intensive, practical workshop. Participants will build a full-stack AI-driven web application from scratch using modern React/Next.js, LangChain concepts, and vector embeddings. All participants receive verified workshop certificates.",
        category: "Workshops",
        date: "March 14, 2026",
        readTime: "2 min read",
        author: "Tech Innovations Lab",
        featured: false,
        image: "/course_mern.jpg",
        tags: ["Workshop", "Gen AI", "React", "Next.js"],
        theme: {
            badge: "bg-amber-50 text-amber-700 border-amber-200",
            border: "border-amber-200 hover:border-amber-400",
            glow: "from-amber-500/15"
        }
    },
    {
        id: 4,
        title: "University Distance & Online Degree Examination Schedules Announced",
        excerpt: "Timetables for UG and PG Distance Education programmes (BCA, MCA, BBA, MBA, B.Com) released by partner UGC-entitled universities.",
        content: "Students enrolled in Distance and Online degree programmes through Aayush Institute are advised to review the upcoming term-end examination datesheet and submission deadlines for internal assignments. Student support desks are active for admit card assistance.",
        category: "University",
        date: "March 10, 2026",
        readTime: "3 min read",
        author: "University Advisory",
        featured: false,
        image: "/university_graduates.jpg",
        tags: ["University", "Distance Exam", "BCA", "MBA"],
        theme: {
            badge: "bg-rose-50 text-rose-700 border-rose-200",
            border: "border-rose-200 hover:border-rose-400",
            glow: "from-rose-500/15"
        }
    },
    {
        id: 5,
        title: "Live Capstone Project Showcase: Student Software Solutions & Live Demos",
        excerpt: "Students from Web & Mobile Development batches presented complete production applications to industry evaluators and senior engineers.",
        content: "The quarterly Project Defense & Showcase event concluded successfully with 40+ student software prototypes demonstrated live, spanning E-Commerce portals, Healthcare ERPs, and Mobile Delivery Apps. Evaluators praised the practical coding standards and database structures.",
        category: "Workshops",
        date: "March 05, 2026",
        readTime: "4 min read",
        author: "Project Coordinator",
        featured: false,
        image: "/laptop_live_projects.jpg",
        tags: ["Live Projects", "Showcase", "Capstone", "Portfolio"],
        theme: {
            badge: "bg-blue-50 text-blue-700 border-blue-200",
            border: "border-blue-200 hover:border-blue-400",
            glow: "from-blue-500/15"
        }
    },
    {
        id: 6,
        title: "Merit-Based Scholarship Announced for Technical & Computer Courses",
        excerpt: "Financial fee concessions up to 35% announced for meritorious students, female learners, and economically weaker candidates.",
        content: "In alignment with the Institute's mission to make professional education accessible, Aayush Institute introduces the 2026 Skill Scholarship Scheme. Eligible students can apply online through the admission gateway or visit the campus counsellor desks.",
        category: "Announcements",
        date: "February 28, 2026",
        readTime: "3 min read",
        author: "Management Desk",
        featured: false,
        image: "/university_library.jpg",
        tags: ["Scholarship", "Fee Waiver", "Financial Aid", "Education"],
        theme: {
            badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
            border: "border-cyan-200 hover:border-cyan-400",
            glow: "from-cyan-500/15"
        }
    },
    {
        id: 7,
        title: "TallyPrime 4.0 with E-Way Bill & GST Return Filing Masterclass",
        excerpt: "Accounting students completed specialized hands-on billing drills simulating real business balance sheets and tax audits.",
        content: "Commerce graduates and accounting professionals successfully completed an intensive weekend certification module covering GST portal reconciliation, TDS calculations, and annual closing statements using TallyPrime.",
        category: "Batches",
        date: "February 22, 2026",
        readTime: "2 min read",
        author: "Accounting Faculty",
        featured: false,
        image: "/corporate_data.jpg",
        tags: ["TallyPrime", "GST", "Accounting", "Commerce"],
        theme: {
            badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
            border: "border-emerald-200 hover:border-emerald-400",
            glow: "from-emerald-500/15"
        }
    },
    {
        id: 8,
        title: "Alumni Spotlight: Senior Frontend Developer at Top Fintech Startup",
        excerpt: "Read how former Aayush Institute graduate transformed from non-tech background to leading user experience design for 1M+ active users.",
        content: "We celebrate our alumnus Rahul Verma who graduated from the Full Stack Development Diploma. Starting with zero coding experience in 2024, his journey highlights how structured mentorship, continuous practice, and portfolio building can transform careers.",
        category: "Placements",
        date: "February 15, 2026",
        readTime: "5 min read",
        author: "Alumni Relations",
        featured: false,
        image: "/university_mba.jpg",
        tags: ["Alumni", "Success Story", "Career Switch", "Inspiration"],
        theme: {
            badge: "bg-purple-50 text-purple-700 border-purple-200",
            border: "border-purple-200 hover:border-purple-400",
            glow: "from-purple-500/15"
        }
    },
    {
        id: 101,
        title: "Top IT Skills in 2025 That Can Boost Your Career",
        excerpt: "Discover the most in-demand software skills — Full Stack development, Cloud services, and AI workflows — to fast-track your tech career.",
        content: "The tech industry demands multi-skilled developers who understand modern web architectures, API design, and containerized deployment. Specializing in high-growth ecosystems like React, Node.js, and Python opens accelerated job opportunities across startups and multinational enterprises. At Aayush Institute, we combine theoretical foundations with live project sprints and interview preparation.",
        category: "Blogs",
        date: "12 Sep 2025",
        readTime: "4 min read",
        author: "Tech Training Cell",
        featured: false,
        image: "/blog_it_skills.jpg",
        tags: ["IT Skills", "Full Stack", "React", "Node.js", "Career"],
        theme: {
            badge: "bg-blue-50 text-blue-700 border-blue-200",
            border: "border-blue-200 hover:border-blue-400",
            glow: "from-blue-500/15"
        }
    },
    {
        id: 102,
        title: "Benefits of Distance Education for Working Professionals",
        excerpt: "Learn how UGC-DEB entitled online degrees empower working adults to earn accredited qualifications without quitting their day jobs.",
        content: "Balancing career growth with higher education is easier than ever with UGC-entitled distance and online learning. Professionals can pursue BCA, MCA, BBA, or MBA programs with flexible schedules, digital study materials, and proctored examinations. Recognized degrees unlock promotions, salary appraisals, and higher managerial appointments.",
        category: "Blogs",
        date: "10 Sep 2025",
        readTime: "3 min read",
        author: "Academic Advisory",
        featured: false,
        image: "/blog_distance_edu.jpg",
        tags: ["Distance Education", "UGC Approved", "BCA", "MBA", "Online Degree"],
        theme: {
            badge: "bg-rose-50 text-rose-700 border-rose-200",
            border: "border-rose-200 hover:border-rose-400",
            glow: "from-rose-500/15"
        }
    },
    {
        id: 103,
        title: "How Internships Help You Get Hired Faster",
        excerpt: "Real-world project experience bridges the gap between classroom concepts and high-velocity corporate engineering standards.",
        content: "Internships offer invaluable exposure to agile development workflows, sprint planning, pull request reviews, and production bug resolutions. Candidates with proven internship experience stand out significantly during campus placements and technical rounds, with many securing direct pre-placement offers (PPOs).",
        category: "Blogs",
        date: "08 Sep 2025",
        readTime: "3 min read",
        author: "Placement Cell",
        featured: false,
        image: "/blog_internships.jpg",
        tags: ["Internship", "Placement", "Live Projects", "PPO"],
        theme: {
            badge: "bg-purple-50 text-purple-700 border-purple-200",
            border: "border-purple-200 hover:border-purple-400",
            glow: "from-purple-500/15"
        }
    },
    {
        id: 104,
        title: "The Future of AI & How It's Changing the Job Market",
        excerpt: "Artificial intelligence is reshaping everyday workflows. Learn how developers and creators can leverage AI to multiply their output.",
        content: "AI tools are not here to replace developers, but developers who understand AI-assisted tooling will outperform those who don't. From automated coding assistants to intelligent chatbots and predictive data models, incorporating AI into your skillset equips you for modern, high-value tech positions.",
        category: "Blogs",
        date: "05 Sep 2025",
        readTime: "4 min read",
        author: "AI Innovation Lab",
        featured: false,
        image: "/blog_future_ai.jpg",
        tags: ["AI & ML", "Generative AI", "Future Tech", "Automation"],
        theme: {
            badge: "bg-amber-50 text-amber-700 border-amber-200",
            border: "border-amber-200 hover:border-amber-400",
            glow: "from-amber-500/15"
        }
    },
    {
        id: 105,
        title: "Campus Life & Smart Computer Lab Walkthrough Vlog",
        excerpt: "Take an insider video tour of Aayush Institute: high-speed development labs, practical training sessions, and student project pods.",
        content: "Explore our modern learning campus located in Delhi NCR. This vlog features hands-on student interviews, a walk-through of the high-spec computer laboratories equipped with dual-boot systems, dedicated high-speed fiber internet, audio-visual classrooms, and faculty support desks designed for collaborative live coding sprints.",
        category: "Blogs",
        date: "March 22, 2026",
        readTime: "4 min watch",
        author: "Campus Media Team",
        featured: false,
        isVideo: true,
        image: "/corporate_ai.jpg",
        tags: ["Campus Vlog", "Lab Facilities", "Student Life", "Tour"],
        theme: {
            badge: "bg-pink-50 text-pink-700 border-pink-200",
            border: "border-pink-200 hover:border-pink-400",
            glow: "from-pink-500/15"
        }
    },
    {
        id: 106,
        title: "Complete 2026 Career Roadmap for Full Stack & AI Engineers (Video Masterclass)",
        excerpt: "Expert faculty breakdown: which frameworks to master, portfolio project ideas, and interview strategies for 2026 hiring cycles.",
        content: "In this comprehensive video guide and masterclass summary, our lead tech mentor outlines the step-by-step pathway from basic JavaScript to deploying production microservices with Next.js, FastAPI, and AI integration. Learn the exact resume portfolio criteria required by senior recruiters.",
        category: "Blogs",
        date: "March 15, 2026",
        readTime: "6 min watch",
        author: "Tech Innovations Lab",
        featured: false,
        isVideo: true,
        image: "/laptop_live_projects.jpg",
        tags: ["Video Vlog", "Roadmap 2026", "Full Stack", "Career Guide"],
        theme: {
            badge: "bg-rose-50 text-rose-700 border-rose-200",
            border: "border-rose-200 hover:border-rose-400",
            glow: "from-rose-500/15"
        }
    }
];

const News = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(() => {
        const catParam = new URLSearchParams(window.location.search).get('category');
        if (catParam) return catParam;
        if (/blogs?|vlogs?/i.test(window.location.pathname)) return 'Blogs';
        return 'All';
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);

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
            showToast('Staff Access Granted: News & notice editing and deletion enabled!', 'success');
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

    // News Articles State backed by localStorage
    const [dbArticles, setDbArticles] = useState(() => {
        try {
            const saved = localStorage.getItem('aayush_news_custom');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn(e);
        }
        return newsArticles;
    });

    // Real-time synchronization with live MongoDB Atlas API, tabs, and sessions
    useEffect(() => {
        let isMounted = true;
        const fetchArticles = async () => {
            try {
                const res = await fetch('/api/news');
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && Array.isArray(data) && data.length > 0) {
                        const formatted = data
                            .filter(a => a.visible !== false)
                            .map(a => {
                                const defMatch = newsArticles.find(d => 
                                    (d.title && a.title && d.title.toLowerCase() === a.title.toLowerCase()) ||
                                    String(d.id) === String(a._id) || String(d.id) === String(a.id)
                                ) || {};

                                const imgUrl = a.image 
                                    ? (a.image.startsWith('http') || a.image.startsWith('/') ? a.image : `http://localhost:4001/Uploads/${a.image}`)
                                    : (defMatch.image || '/corporate_ai.jpg');

                                return {
                                    ...defMatch,
                                    _id: a._id,
                                    id: a._id || a.id || defMatch.id,
                                    title: a.title || defMatch.title,
                                    excerpt: a.excerpt || defMatch.excerpt,
                                    content: a.content || defMatch.content,
                                    category: a.category || defMatch.category || 'Announcements',
                                    date: a.date ? (typeof a.date === 'string' && a.date.includes('T') ? new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : a.date) : defMatch.date,
                                    readTime: a.readTime || defMatch.readTime || '3 min read',
                                    author: a.author || defMatch.author || 'Academic Cell',
                                    featured: !!a.featured,
                                    image: imgUrl,
                                    tags: Array.isArray(a.tags) && a.tags.length > 0 ? a.tags : (defMatch.tags || [a.category || 'News', 'Aayush']),
                                    theme: defMatch.theme || {
                                        badge: "bg-blue-50 text-blue-700 border-blue-200",
                                        border: "border-blue-200 hover:border-blue-400",
                                        glow: "from-blue-500/15"
                                    }
                                };
                            });
                        if (formatted.length > 0) {
                            setDbArticles(formatted);
                        }
                    }
                }
            } catch (e) {
                // local fallback
                try {
                    const saved = localStorage.getItem('aayush_news_custom');
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        if (isMounted && Array.isArray(parsed) && parsed.length > 0) {
                            setDbArticles(parsed);
                        }
                    }
                } catch {}
            }
        };

        fetchArticles();
        const poll = setInterval(fetchArticles, 5000);
        window.addEventListener('newsArticlesUpdated', fetchArticles);
        window.addEventListener('storage', fetchArticles);
        return () => {
            isMounted = false;
            clearInterval(poll);
            window.removeEventListener('newsArticlesUpdated', fetchArticles);
            window.removeEventListener('storage', fetchArticles);
        };
    }, []);

    const handleResetToDefaults = () => {
        if (window.confirm('Reset all news updates and notices back to original defaults?')) {
            localStorage.removeItem('aayush_news_custom');
            setDbArticles(newsArticles);
            window.dispatchEvent(new Event('newsArticlesUpdated'));
            window.dispatchEvent(new Event('storage'));
            showToast('News catalog reset to defaults.', 'info');
        }
    };

    // Toast Notification
    const [toastMsg, setToastMsg] = useState(null);
    const showToast = (text, type = 'success') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3500);
    };

    // Article Edit State & Handlers
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        category: 'Batches',
        author: '',
        readTime: '',
        excerpt: '',
        content: '',
        tags: '',
        image: '',
        featured: false,
        isVideo: false
    });

    // Article Add State & Handlers
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        title: '',
        category: 'Batches',
        author: 'Academic Cell',
        readTime: '3 min read',
        excerpt: '',
        content: '',
        tags: '',
        image: '/corporate_ai.jpg',
        featured: false,
        isVideo: false
    });

    const openEditModal = (article) => {
        setEditingArticle(article);
        setEditFormData({
            title: article.title || '',
            category: article.category || 'Batches',
            author: article.author || 'Academic Cell',
            readTime: article.readTime || '3 min read',
            excerpt: article.excerpt || '',
            content: article.content || '',
            tags: Array.isArray(article.tags) ? article.tags.join(', ') : (article.tags || ''),
            image: article.image || '/corporate_ai.jpg',
            featured: !!article.featured,
            isVideo: !!article.isVideo
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEditArticle = (e) => {
        e.preventDefault();
        if (!editingArticle || !editFormData.title.trim()) return;

        const updatedArticle = {
            ...editingArticle,
            title: editFormData.title.trim(),
            category: editFormData.category,
            author: editFormData.author.trim() || 'Academic Cell',
            readTime: editFormData.readTime.trim() || '3 min read',
            excerpt: editFormData.excerpt.trim(),
            content: editFormData.content.trim(),
            tags: editFormData.tags ? editFormData.tags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : ['Update'],
            image: editFormData.image.trim() || '/corporate_ai.jpg',
            featured: !!editFormData.featured,
            isVideo: !!editFormData.isVideo,
            theme: getCategoryTheme(editFormData.category)
        };

        setDbArticles(prev => {
            const next = prev.map(a => a.id === editingArticle.id ? updatedArticle : a);
            try {
                localStorage.setItem('aayush_news_custom', JSON.stringify(next));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        if (selectedArticle?.id === editingArticle.id) {
            setSelectedArticle(updatedArticle);
        }

        setIsEditModalOpen(false);
        setEditingArticle(null);
        showToast(`Article "${updatedArticle.title.slice(0, 30)}..." updated successfully!`, 'success');
    };

    const handleDeleteArticle = (articleOrId) => {
        const id = typeof articleOrId === 'object' ? articleOrId?.id : articleOrId;
        const target = dbArticles.find(a => a.id === id);
        const title = target?.title || 'this notice';
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
        setDbArticles(prev => {
            const next = prev.filter(a => a.id !== id);
            try {
                localStorage.setItem('aayush_news_custom', JSON.stringify(next));
                window.dispatchEvent(new Event('newsArticlesUpdated'));
                window.dispatchEvent(new Event('storage'));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });
        if (selectedArticle?.id === id) {
            setSelectedArticle(null);
        }
        setIsEditModalOpen(false);
        setEditingArticle(null);
        showToast('Notice removed from news updates.', 'info');
    };

    const openAddModal = () => {
        setAddFormData({
            title: '',
            category: selectedCategory === 'All' ? 'Batches' : selectedCategory,
            author: 'Academic Cell',
            readTime: '3 min read',
            excerpt: '',
            content: '',
            tags: 'Announcements, Admissions, Notice',
            image: '/corporate_ai.jpg',
            featured: false,
            isVideo: selectedCategory === 'Blogs'
        });
        setIsAddModalOpen(true);
    };

    const handleSaveNewArticle = (e) => {
        e.preventDefault();
        if (!addFormData.title.trim()) return;

        const newId = Date.now();
        const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const newArticle = {
            id: newId,
            title: addFormData.title.trim(),
            category: addFormData.category,
            author: addFormData.author.trim() || 'Academic Cell',
            date: dateStr,
            readTime: addFormData.readTime.trim() || '3 min read',
            excerpt: addFormData.excerpt.trim(),
            content: addFormData.content.trim(),
            tags: addFormData.tags ? addFormData.tags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : ['Update'],
            image: addFormData.image.trim() || '/corporate_ai.jpg',
            featured: !!addFormData.featured,
            isVideo: !!addFormData.isVideo,
            theme: getCategoryTheme(addFormData.category)
        };

        setDbArticles(prev => {
            const next = [newArticle, ...prev];
            try {
                localStorage.setItem('aayush_news_custom', JSON.stringify(next));
            } catch (err) {
                console.warn('Storage save failed', err);
            }
            return next;
        });

        setIsAddModalOpen(false);
        showToast(`Article "${newArticle.title.slice(0, 30)}..." published!`, 'success');
    };

    useEffect(() => {
        const idParam = searchParams.get('id');
        const catParam = searchParams.get('category');
        if (catParam) {
            setSelectedCategory(catParam);
        } else if (/blogs?|vlogs?/i.test(location.pathname)) {
            setSelectedCategory('Blogs');
        }
        if (idParam) {
            const found = dbArticles.find(a => String(a.id) === String(idParam));
            if (found) {
                setSelectedArticle(found);
                window.scrollTo({ top: 380, behavior: 'smooth' });
            }
        }
    }, [searchParams, location.pathname, dbArticles]);

    const filteredArticles = useMemo(() => {
        return dbArticles.filter(item => {
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm, dbArticles]);

    const featuredArticles = filteredArticles.filter(a => a.featured);

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* ── 1. HERO SECTION (Matching Courses, UniversityCourses, Placement, LiveProject) ── */}
            <div
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center min-h-[220px] sm:min-h-[240px] lg:min-h-[255px] flex items-center"
                style={{
                    backgroundImage: "url('/course_hero.png')",
                    backgroundColor: '#d6ecff'
                }}
            >
                {/* Mobile overlay for crisp contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/95 via-[#d6ecff]/80 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 w-full">
                    <div className="flex flex-col justify-center py-3 sm:py-3.5 lg:py-4 max-w-full sm:max-w-[460px] md:max-w-[500px] lg:max-w-2xl">
                        {/* Glowing Pill Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/90 text-[#0055cc] text-[11px] sm:text-[11.5px] font-semibold tracking-wide mb-1.5 border border-blue-200/60 shadow-xs w-fit backdrop-blur-xs">
                            <Bell className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>NEWS, EVENTS &amp; ACADEMIC UPDATES</span>
                        </div>

                        {/* Main Heading (Matching First Page scale) */}
                        <h1 className="text-2xl sm:text-3xl lg:text-[29px] xl:text-[36px] 2xl:text-[38px] font-bold text-[#00285e] leading-[1.12] tracking-tight mb-1.5">
                            Stay Updated with{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block sm:inline">
                                Latest News &amp; Announcements
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-[13px] lg:text-[12px] xl:text-[13px] leading-relaxed max-w-xl mb-2 font-normal">
                            Explore recent academic announcements, upcoming batch schedules, campus placement drives, hands-on workshops, and university notices.
                        </p>

                        {/* 3 Trust Badges */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 mb-2.5">
                            <div className="flex items-center gap-1.5 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2 py-0.5 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <BookOpen className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-medium text-[#002b66] leading-tight">New Batch Alerts</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2 py-0.5 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Award className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-medium text-[#002b66] leading-tight">Placement Results</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2 py-0.5 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-6 h-6 rounded-md bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Laptop className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-medium text-[#002b66] leading-tight">Tech Masterclasses</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                            <a
                                href="#news-catalog"
                                className="inline-flex items-center justify-center gap-1.5 bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs sm:text-[13px] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Browse All Updates</span>
                                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </a>
                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white text-[#004b93] font-semibold text-xs sm:text-[13px] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-blue-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                            >
                                <MessageSquare className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Enquire for Batch</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 2. FILTER TABS & SEARCH BAR ── */}
            <div id="news-catalog" className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 pt-4 pb-6">
                {/* Staff Management Banner */}
                {isStaff ? (
                    <div className="mb-6 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-500/40 rounded-2xl p-3.5 sm:p-4 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden animate-in fade-in duration-300">
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
                                    All cards have active "Edit" &amp; "Delete" buttons. You can also add and publish new announcements.
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
                                <span>Add News Update</span>
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
                    <div className="flex justify-end mb-4">
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

                {/* Floating pill navigation */}
                <div
                    className="overflow-x-auto pb-2 mb-8 no-scrollbar -mt-5 sm:-mt-6 relative z-20"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-2 min-w-max mx-auto justify-start lg:justify-center p-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80">
                        {newsCategories.map((cat) => {
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
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

                {/* Search Bar & Category Heading */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
                        <div className="w-8 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight">
                            {selectedCategory === 'All' ? 'Latest Institute Notices & Articles' : `${selectedCategory} Updates`}
                        </h2>
                        <div className="w-8 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-transparent rounded-full"></div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-[13px] max-w-xl mx-auto leading-relaxed mb-4 font-normal">
                        Showing {filteredArticles.length} updates for students, career aspirants, and academic learners.
                    </p>

                    {/* Integrated Search Input */}
                    <div className="max-w-md mx-auto relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Filter news by topic, batch, course name..."
                            className="w-full pl-11 pr-11 py-2.5 rounded-full border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 shadow-sm placeholder:text-slate-400 transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* ── 3. FEATURED ARTICLES HIGHLIGHT (2-COL) ── */}
                {selectedCategory === 'All' && !searchTerm && featuredArticles.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Featured Headlines</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                            {featuredArticles.map((article) => (
                                <div
                                    key={article.id}
                                    onClick={() => setSelectedArticle(article)}
                                    className={`bg-white rounded-2xl border-2 ${article.theme.border} shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group cursor-pointer hover:-translate-y-1`}
                                >
                                    {/* Thumbnail Image */}
                                    <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-slate-900 flex-shrink-0">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                                            onError={(e) => { e.target.src = '/corporate_ai.jpg'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                                            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-semibold shadow-xs">
                                                Featured
                                            </span>
                                            {isStaff && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditModal(article); }}
                                                    className="pointer-events-auto px-2 py-1 bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                                                    title="Edit Notice (Staff)"
                                                >
                                                    <Edit3 className="w-2.5 h-2.5 text-purple-300" />
                                                    <span>Staff Edit</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="sm:w-3/5 p-4 sm:p-5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${article.theme.badge}`}>
                                                    {article.category}
                                                </span>
                                                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-normal">
                                                    <Clock className="w-3 h-3" />
                                                    {article.readTime}
                                                </span>
                                            </div>

                                            <h3 className="text-sm sm:text-[15px] font-semibold text-[#0a2540] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2">
                                                {article.title}
                                            </h3>

                                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal mb-3">
                                                {article.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                                            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-normal">
                                                <Calendar className="w-3 h-3 text-slate-400" />
                                                {article.date}
                                            </span>
                                            <div className="flex items-center gap-1.5 ml-auto">
                                                <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                                    <span>Read Details</span>
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── 4. NEWS & ARTICLES GRID (COLORFUL CARDS) ── */}
                {filteredArticles.length === 0 ? (
                    <div className="text-center py-14 bg-white rounded-2xl border border-slate-100 p-8 max-w-lg mx-auto shadow-xs">
                        <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-700 mb-1">No updates found matching "{searchTerm}"</h3>
                        <p className="text-xs text-slate-500 mb-4 font-normal">Try searching with a different keyword like "Batch", "Placement", or "Exam".</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="px-4 py-1.5 rounded-full bg-[#0066ff] text-white text-xs font-semibold hover:bg-[#0052cc] transition-colors cursor-pointer"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredArticles.map((article) => (
                                <div
                                    key={article.id}
                                    onClick={() => setSelectedArticle(article)}
                                    className={`bg-white rounded-2xl border-2 ${article.theme.border} shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer hover:-translate-y-1.5`}
                                >
                                    {/* Card Image */}
                                    <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-900 flex-shrink-0">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                                            onError={(e) => { e.target.src = '/course_hero.png'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                                        {/* Floating Badge */}
                                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                                            <div className="flex items-center gap-1.5 pointer-events-auto">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-md bg-white/95 ${article.theme.badge}`}>
                                                    {article.category}
                                                </span>
                                                {article.isVideo && (
                                                    <span className="flex items-center gap-1 bg-red-600/90 text-white backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-xs">
                                                        <Play className="w-2.5 h-2.5 fill-current" />
                                                        <span>Vlog</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 pointer-events-auto">
                                                <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white/90 font-normal">
                                                    <Clock className="w-3 h-3 text-amber-400" />
                                                    <span>{article.readTime}</span>
                                                </span>
                                                {isStaff && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditModal(article); }}
                                                        className="pointer-events-auto px-2 py-1 bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                                                        title="Edit Notice (Staff)"
                                                    >
                                                        <Edit3 className="w-2.5 h-2.5 text-purple-300" />
                                                        <span>Staff Edit</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Date Tag on Image */}
                                        <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[10.5px] text-slate-200 font-normal">
                                            <Calendar className="w-3 h-3 text-sky-400" />
                                            <span>{article.date}</span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-[13.5px] sm:text-[14px] font-semibold text-[#0a2540] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 min-h-[38px] mb-2 flex items-start">
                                                {article.title}
                                            </h4>

                                            <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-normal mb-3">
                                                {article.excerpt}
                                            </p>

                                            {/* Tag Chips */}
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {article.tags.slice(0, 3).map((tag, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200/80"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Bar */}
                                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                                            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[110px]">
                                                By {article.author}
                                            </span>
                                            <div className="flex items-center gap-1.5 ml-auto">
                                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                                                    <span>Read Article</span>
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── 5. BOTTOM ADMISSION CALLOUT BANNER ── */}
                <div className="mt-12 sm:mt-14 bg-gradient-to-r from-[#0a2540] via-[#003882] to-[#0066ff] rounded-3xl p-6 sm:p-8 md:p-10 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#fed000] text-xs font-semibold uppercase tracking-wider mb-2.5 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Stay Ahead in Your Career</span>
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2.5">
                            Want Personal Guidance on Courses or Batches?
                        </h3>
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                            Connect with our career advisors to find the perfect professional course, check upcoming batch timings, or inquire about scholarships.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <NavLink
                                to="/apply-now/registration-form"
                                className="px-6 py-2.5 rounded-full bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] text-xs sm:text-sm font-semibold shadow-md hover:scale-105 transition-all"
                            >
                                Register for Admission
                            </NavLink>
                            <NavLink
                                to="/ContactUs"
                                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/25 transition-all"
                            >
                                Contact Student Helpdesk
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 6. ARTICLE DETAILS MODAL ── */}
            {selectedArticle && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                        {/* Modal Header Image */}
                        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900 flex-shrink-0">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => { e.target.src = '/course_hero.png'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                            <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                                {isStaff && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(selectedArticle)}
                                            className="px-3 py-1.5 rounded-full bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-xs font-bold shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                            title="Edit Article (Staff)"
                                        >
                                            <Edit3 className="w-3.5 h-3.5 text-purple-300" />
                                            <span>Staff Edit</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteArticle(selectedArticle)}
                                            className="px-3 py-1.5 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-bold shadow-md border border-rose-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                            title="Delete Article (Staff)"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-rose-100" />
                                            <span>Delete</span>
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="text-white/90 hover:text-white bg-black/40 hover:bg-black/65 p-2 rounded-full transition-colors cursor-pointer backdrop-blur-md"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="absolute bottom-3.5 left-4 right-4 text-white z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-md bg-white/95 ${selectedArticle.theme.badge}`}>
                                        {selectedArticle.category}
                                    </span>
                                    <span className="text-[11px] text-slate-300 flex items-center gap-1 font-normal">
                                        <Calendar className="w-3 h-3" />
                                        {selectedArticle.date}
                                    </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm">
                                    {selectedArticle.title}
                                </h3>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
                            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                                <span className="font-medium text-slate-700">Published by: {selectedArticle.author}</span>
                                <span className="flex items-center gap-1 font-normal">
                                    <Clock className="w-3.5 h-3.5" />
                                    {selectedArticle.readTime}
                                </span>
                            </div>

                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                                {selectedArticle.content}
                            </p>

                            <div className="bg-blue-50/70 rounded-xl p-3.5 border border-blue-100 text-xs text-blue-900 font-normal space-y-1">
                                <div className="font-semibold text-blue-950 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    <span>Important Student Instruction</span>
                                </div>
                                <p className="text-blue-800/90 text-[11.5px]">
                                    For official verification or batch enrollments regarding this update, please reach out to the Aayush Institute Student Helpdesk at <strong>0120-2611111</strong> or visit our office campus.
                                </p>
                            </div>

                            {/* Tags */}
                            <div>
                                <h5 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Related Topics</h5>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedArticle.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 mt-auto">
                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Inquire Regarding This</span>
                            </NavLink>
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
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
                                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Edit News Notice / Article</h3>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEditArticle} className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Headline / Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={editFormData.title}
                                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
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
                                        {newsCategories.filter(c => c.id !== 'All').map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Author / Cell</label>
                                    <input
                                        type="text"
                                        value={editFormData.author}
                                        onChange={(e) => setEditFormData({ ...editFormData, author: e.target.value })}
                                        placeholder="e.g. Academic Cell"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Read / Watch Time</label>
                                    <input
                                        type="text"
                                        value={editFormData.readTime}
                                        onChange={(e) => setEditFormData({ ...editFormData, readTime: e.target.value })}
                                        placeholder="e.g. 3 min read"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image Asset</label>
                                    <input
                                        type="text"
                                        value={editFormData.image}
                                        onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                                        placeholder="/corporate_ai.jpg"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt *</label>
                                <textarea
                                    rows="2"
                                    required
                                    value={editFormData.excerpt}
                                    onChange={(e) => setEditFormData({ ...editFormData, excerpt: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Full Detailed Notice / Article Content *</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={editFormData.content}
                                    onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                                <input
                                    type="text"
                                    value={editFormData.tags}
                                    onChange={(e) => setEditFormData({ ...editFormData, tags: e.target.value })}
                                    placeholder="Admissions, Full Stack, March Batch"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 pt-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="editFeaturedArticle"
                                        checked={editFormData.featured}
                                        onChange={(e) => setEditFormData({ ...editFormData, featured: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <label htmlFor="editFeaturedArticle" className="text-xs font-medium text-slate-700">Display as Featured Headline</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="editIsVideo"
                                        checked={editFormData.isVideo}
                                        onChange={(e) => setEditFormData({ ...editFormData, isVideo: e.target.checked })}
                                        className="w-4 h-4 text-red-600 rounded"
                                    />
                                    <label htmlFor="editIsVideo" className="text-xs font-medium text-slate-700">Video Masterclass / Vlog</label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteArticle(editingArticle.id)}
                                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Article</span>
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
                                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
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

            {/* Staff Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
                        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <Plus className="w-4 h-4" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Publish New Institute Notice / Article</h3>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveNewArticle} className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Headline / Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Summer 2026 Batch Admissions Open"
                                    value={addFormData.title}
                                    onChange={(e) => setAddFormData({ ...addFormData, title: e.target.value })}
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
                                        {newsCategories.filter(c => c.id !== 'All').map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Author / Cell</label>
                                    <input
                                        type="text"
                                        value={addFormData.author}
                                        onChange={(e) => setAddFormData({ ...addFormData, author: e.target.value })}
                                        placeholder="Academic Cell"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Read / Watch Time</label>
                                    <input
                                        type="text"
                                        value={addFormData.readTime}
                                        onChange={(e) => setAddFormData({ ...addFormData, readTime: e.target.value })}
                                        placeholder="e.g. 3 min read"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image Asset</label>
                                    <input
                                        type="text"
                                        value={addFormData.image}
                                        onChange={(e) => setAddFormData({ ...addFormData, image: e.target.value })}
                                        placeholder="/corporate_ai.jpg"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt *</label>
                                <textarea
                                    rows="2"
                                    required
                                    placeholder="Brief 1-2 sentence overview for notice preview..."
                                    value={addFormData.excerpt}
                                    onChange={(e) => setAddFormData({ ...addFormData, excerpt: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Full Detailed Notice / Article Content *</label>
                                <textarea
                                    rows="4"
                                    required
                                    placeholder="Complete details of the announcement, schedules, eligibility, or instructions..."
                                    value={addFormData.content}
                                    onChange={(e) => setAddFormData({ ...addFormData, content: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                                <input
                                    type="text"
                                    value={addFormData.tags}
                                    onChange={(e) => setAddFormData({ ...addFormData, tags: e.target.value })}
                                    placeholder="Admissions, Full Stack, March Batch"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 pt-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="addFeaturedArticle"
                                        checked={addFormData.featured}
                                        onChange={(e) => setAddFormData({ ...addFormData, featured: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <label htmlFor="addFeaturedArticle" className="text-xs font-medium text-slate-700">Display as Featured Headline</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="addIsVideo"
                                        checked={addFormData.isVideo}
                                        onChange={(e) => setAddFormData({ ...addFormData, isVideo: e.target.checked })}
                                        className="w-4 h-4 text-red-600 rounded"
                                    />
                                    <label htmlFor="addIsVideo" className="text-xs font-medium text-slate-700">Video Masterclass / Vlog</label>
                                </div>
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
                                    Publish Notice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── 9. STAFF PIN UNLOCK MODAL ── */}
            {showStaffUnlockModal && (
                <div className="fixed inset-0 z-[999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-purple-100 relative animate-scaleIn">
                        <button
                            type="button"
                            onClick={() => { setShowStaffUnlockModal(false); setStaffPinError(''); }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="text-center mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
                                <KeyRound className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">Faculty &amp; Staff Access</h3>
                            <p className="text-xs text-slate-500 mt-1">Enter Master PIN to enable notice editing and deletion</p>
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

export default News;