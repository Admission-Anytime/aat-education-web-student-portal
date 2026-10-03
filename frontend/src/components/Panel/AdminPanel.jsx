import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Settings, Users, BookOpen, Building2, Phone, Calendar, Trophy, Save, Plus, Trash2, 
    FileText, Clock, FolderOpen, Folder, GripVertical, GraduationCap, Database, Edit3, 
    CheckCircle, AlertCircle, RefreshCw, X, Search, Sparkles, LogOut, ExternalLink, Loader2, Tag
} from 'lucide-react';
import { courseApi, categoryApi, healthApi, authApi } from '../../services/api';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses'); // Default directly to courses so user can see it right away!

    // --- Dynamic Database Course & Subject States ---
    const [dbCategories, setDbCategories] = useState([]);
    const [dbCourses, setDbCourses] = useState([]);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbStatus, setDbStatus] = useState({ text: 'Checking DB...', connected: false });
    const [courseActionMsg, setCourseActionMsg] = useState({ type: '', text: '' });
    
    // Filtering & Search
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Course Modals
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [courseForm, setCourseForm] = useState({
        name: '',
        categoryId: 'software',
        subgroup: '',
        oneLiner: '',
        duration: '3–6 Months',
        level: 'Beginner to Advanced',
        eligibility: '12th / Graduates',
        careerAreas: '',
        details: '',
        skills: '',
        features: '',
        certification: 'Certified Professional',
        image: '/course_mern.jpg',
        popular: false
    });

    // Subject/Category Modal
    const [showSubjectModal, setShowSubjectModal] = useState(false);
    const [subjectForm, setSubjectForm] = useState({
        categoryId: '',
        label: '',
        desc: '',
        eligibility: ''
    });

    // Check DB health and load courses & categories
    const loadDbData = async () => {
        setDbLoading(true);
        try {
            const health = await healthApi.check().catch(() => ({ database: 'Offline' }));
            setDbStatus({
                text: health.status === 'ok' ? 'Database Connected' : 'Local Storage Sync (Active)',
                connected: true
            });

            const [catRes, courseRes] = await Promise.all([
                categoryApi.getAll().catch(() => ({ data: [] })),
                courseApi.getAll().catch(() => ({ data: [] }))
            ]);

            setDbCategories(catRes.data || []);
            setDbCourses(courseRes.data || []);
        } catch (err) {
            console.error('Error fetching admin DB data:', err);
            setCourseActionMsg({ type: 'error', text: 'Error connecting to database backend.' });
        } finally {
            setDbLoading(false);
        }
    };

    useEffect(() => {
        loadDbData();
        const handleUpdates = () => loadDbData();
        window.addEventListener('coursesUpdated', handleUpdates);
        window.addEventListener('categoriesUpdated', handleUpdates);
        window.addEventListener('storage', handleUpdates);
        return () => {
            window.removeEventListener('coursesUpdated', handleUpdates);
            window.removeEventListener('categoriesUpdated', handleUpdates);
            window.removeEventListener('storage', handleUpdates);
        };
    }, []);

    // Course Form Change
    const handleCourseFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourseForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Open Add Course Modal
    const openAddCourseModal = () => {
        setEditingCourseId(null);
        setCourseForm({
            name: '',
            categoryId: dbCategories.length > 0 ? dbCategories[0].categoryId : 'software',
            subgroup: '',
            oneLiner: '',
            duration: '3–6 Months',
            level: 'Beginner to Advanced',
            eligibility: '12th / Graduates',
            careerAreas: '',
            details: '',
            skills: '',
            features: '',
            certification: 'Certified Professional',
            image: '/course_mern.jpg',
            popular: false
        });
        setShowCourseModal(true);
    };

    // Open Edit Course Modal
    const openEditCourseModal = (course) => {
        setEditingCourseId(course._id || course.id);
        setCourseForm({
            name: course.name || '',
            categoryId: course.categoryId || 'software',
            subgroup: course.subgroup || '',
            oneLiner: course.oneLiner || '',
            duration: course.duration || '3–6 Months',
            level: course.level || 'Beginner to Advanced',
            eligibility: course.eligibility || '',
            careerAreas: course.careerAreas || '',
            details: course.details || '',
            skills: Array.isArray(course.skills) ? course.skills.join(', ') : (course.skills || ''),
            features: Array.isArray(course.features) ? course.features.join(', ') : (course.features || ''),
            certification: course.certification || '',
            image: course.image || '',
            popular: !!course.popular
        });
        setShowCourseModal(true);
    };

    // Save (Create or Update) Course
    const handleSaveCourse = async (e) => {
        e.preventDefault();
        setDbLoading(true);
        setCourseActionMsg({ type: '', text: '' });

        try {
            const selectedCat = dbCategories.find(c => c.categoryId === courseForm.categoryId);
            const payload = {
                ...courseForm,
                categoryName: selectedCat ? selectedCat.label : courseForm.categoryId
            };

            if (editingCourseId) {
                await courseApi.update(editingCourseId, payload);
                setCourseActionMsg({ type: 'success', text: `Course "${courseForm.name}" updated successfully in DB!` });
            } else {
                await courseApi.create(payload);
                setCourseActionMsg({ type: 'success', text: `Course "${courseForm.name}" added to Database!` });
            }

            setShowCourseModal(false);
            await loadDbData();
        } catch (err) {
            setCourseActionMsg({ type: 'error', text: err.message || 'Failed to save course to database.' });
        } finally {
            setDbLoading(false);
        }
    };

    // Delete Course
    const handleDeleteCourse = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete course "${name}" from the database?`)) return;
        setDbLoading(true);
        try {
            await courseApi.delete(id);
            setCourseActionMsg({ type: 'success', text: `Course "${name}" deleted from database.` });
            await loadDbData();
        } catch (err) {
            setCourseActionMsg({ type: 'error', text: err.message || 'Failed to delete course.' });
        } finally {
            setDbLoading(false);
        }
    };

    // Save Subject/Category
    const handleSaveSubject = async (e) => {
        e.preventDefault();
        if (!subjectForm.label) return;
        setDbLoading(true);
        try {
            const cleanId = (subjectForm.categoryId || subjectForm.label)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            await categoryApi.create({
                ...subjectForm,
                categoryId: cleanId
            });

            setCourseActionMsg({ type: 'success', text: `Subject "${subjectForm.label}" created successfully in DB!` });
            setShowSubjectModal(false);
            setSubjectForm({ categoryId: '', label: '', desc: '', eligibility: '' });
            await loadDbData();
        } catch (err) {
            setCourseActionMsg({ type: 'error', text: err.message || 'Failed to create subject.' });
        } finally {
            setDbLoading(false);
        }
    };

    // Delete Subject/Category
    const handleDeleteSubject = async (categoryId, label) => {
        if (!window.confirm(`Delete subject "${label}" and all courses under it from the database?`)) return;
        setDbLoading(true);
        try {
            await categoryApi.delete(categoryId);
            setCourseActionMsg({ type: 'success', text: `Subject "${label}" removed from database.` });
            if (selectedCategoryFilter === categoryId) setSelectedCategoryFilter('all');
            await loadDbData();
        } catch (err) {
            setCourseActionMsg({ type: 'error', text: err.message || 'Failed to delete subject.' });
        } finally {
            setDbLoading(false);
        }
    };

    // 1-Click Seed All Default Courses into Database
    const handleSeedCourses = async () => {
        if (!window.confirm('This will sync/seed all default 23 courses and 8 subjects into the Database. Proceed?')) return;
        setDbLoading(true);
        try {
            const res = await courseApi.seedDefault();
            setCourseActionMsg({ type: 'success', text: res.message || 'All subjects & courses synced to Database!' });
            await loadDbData();
        } catch (err) {
            setCourseActionMsg({ type: 'error', text: err.message || 'Failed to seed courses.' });
        } finally {
            setDbLoading(false);
        }
    };

    // Logout
    const handleLogout = () => {
        authApi.logout();
        navigate('/login');
    };


    // Institute Information
    const [instituteName, setInstituteName] = useState('Excellence Coaching Institute');
    const [aboutInstitute, setAboutInstitute] = useState('Leading coaching institute providing quality education and professional training for over 22 years.');

    // Statistics
    const [stats, setStats] = useState([
        { value: '10,000+', label: 'Students Enrolled' },
        { value: '100+', label: 'Qualified Teachers' },
        { value: '95%', label: 'Success Rate' },
        { value: '22+', label: 'Years of Excellence' }
    ]);


    // News & Events
    const [news, setNews] = useState([
        {
            id: 1,
            title: "Annual Science Fair 2025",
            date: "2025-03-15",
            summary: "Students showcase innovative projects in our biggest science fair yet.",
            image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
        },
        {
            id: 2,
            title: "New AI & Machine Learning Course Launch",
            date: "2025-02-20",
            summary: "Introducing cutting-edge AI curriculum designed for industry readiness.",
            image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
        }
    ]);


    // Contact Information
    const [contactInfo, setContactInfo] = useState({
        address: '123 Education Street, Knowledge City, KC 12345',
        phone: '+91 9876543210',
        email: 'info@excellencecoaching.com',
        socialMedia: {
            facebook: 'https://facebook.com/excellencecoaching',
            instagram: 'https://instagram.com/excellencecoaching',
            linkedin: 'https://linkedin.com/company/excellencecoaching',
            youtube: 'https://youtube.com/@excellencecoaching'
        }
    });


    // Corporate Training
    const [corporateTraining, setCorporateTraining] = useState([
        {
            id: 1,
            title: "Office Productivity & Business Automation",
            description: "Boost your team's efficiency through essential digital office tools.",
            courses: [
                "MS Office Mastery (Basic to Advanced)",
                "Advanced Excel & Dashboard Reporting",
                "Digital Office Administration Tools (Google Workspace / MS365)",
                "Tally Prime with GST for Business Accounting",
                "CRM Training (Zoho, Salesforce Basics)"
            ]
        },
        {
            id: 2,
            title: "Graphic Design, UI/UX & Creative Tools",
            description: "Design-focused training for branding, web, and user experience.",
            courses: [
                "Professional Graphic Designing (Photoshop, Illustrator, CorelDRAW)",
                "UI/UX Design & Prototyping (Figma, Adobe XD)",
                "Video Editing & Motion Graphics (Premiere Pro, After Effects)",
                "AutoCAD & Industrial Design Fundamentals"
            ]
        },
        {
            id: 3,
            title: "Web & App Development Programs",
            description: "Develop complete websites and mobile applications from scratch.",
            courses: [
                "Full Stack Web Development (MERN / Django Stack)",
                "Front-End Development (HTML, CSS, JavaScript, React)",
                "WordPress Development for Business Sites",
                "Mobile App UI Design with Figma + Flutter",
                "Android App Development (Using Java)"
            ]
        }
    ]);
    // Add new training program
    const addProgram = () => {
        const newProgram = {
            id: Date.now(),
            title: "",
            description: "",
            courses: [],
        };
        setCorporateTraining([...corporateTraining, newProgram]);
    };

    // Remove training program
    const removeProgram = (id) => {
        setCorporateTraining(corporateTraining.filter((program) => program.id !== id));
    };

    // Add course to specific program
    const addCourse = (programId) => {
        const updated = corporateTraining.map((program) =>
            program.id === programId
                ? { ...program, courses: [...program.courses, ""] }
                : program
        );
        setCorporateTraining(updated);
    };

    // Update course text
    const updateCourse = (programId, index, value) => {
        const updated = corporateTraining.map((program) =>
            program.id === programId
                ? {
                    ...program,
                    courses: program.courses.map((course, i) =>
                        i === index ? value : course
                    ),
                }
                : program
        );
        setCorporateTraining(updated);
    };

    // Remove specific course
    const removeCourse = (programId, index) => {
        const updated = corporateTraining.map((program) =>
            program.id === programId
                ? {
                    ...program,
                    courses: program.courses.filter((_, i) => i !== index),
                }
                : program
        );
        setCorporateTraining(updated);
    };



    // Courses
    const [courseSections, setCourseSections] = useState([
        {
            id: 1,
            category: "Professional Courses",
            subcategories: [
                {
                    id: 1,
                    title: "Term Certificate Courses",
                    duration: "1–2 Months",
                    items: [
                        {
                            name: "MS Office Basics",
                            description: "Covers Word, Excel, and PowerPoint fundamentals for everyday office tasks."
                        },
                        {
                            name: "Tally Prime Basics",
                            description: "Introduces Tally Prime for basic accounting, billing, and inventory management."
                        },
                        {
                            name: "Typing & Data Entry",
                            description: "Improves typing speed and accuracy for professional data entry tasks."
                        },
                        {
                            name: "Photoshop for Beginners",
                            description: "Teaches basic photo editing, retouching, and design creation using Adobe Photoshop."
                        },
                        {
                            name: "Basic Video Editing",
                            description: "Covers simple video cutting, transitions, and audio syncing using common tools."
                        },
                        {
                            name: "Social Media for Business",
                            description: "Shows how to create, manage, and promote business pages on popular social platforms."
                        },
                        {
                            name: "HTML & CSS Basics",
                            description: "Introduces basic web structure and styling concepts to create simple websites."
                        },
                        {
                            name: "Soft Skills & Interview Preparation",
                            description: "Focuses on communication, teamwork, and techniques for job interview success."
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Certificate Courses",
                    duration: "6 Months",
                    items: [
                        {
                            name: "Advanced Office Management (with Tally)",
                            description: "Combines MS Office, Tally Prime, and workflow management for office operations."
                        },
                        {
                            name: "Advanced Graphic Designing",
                            description: "Covers advanced tools in Photoshop, Illustrator, and CorelDRAW for creative design."
                        },
                        {
                            name: "Advanced Tally & GST Accounting",
                            description: "Focuses on taxation, GST filing, payroll, and advanced accounting reports in Tally."
                        },
                        {
                            name: "Web Designing Fundamentals",
                            description: "Teaches HTML, CSS, basic JavaScript, and responsive design for beginner web developers."
                        },
                        {
                            name: "E-Commerce Website Management",
                            description: "Covers creating and managing online stores, product listings, and order processing."
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            category: "University Courses",
            subcategories: [
                {
                    id: 1,
                    title: "Distance Learning Courses",
                    items: [
                        {
                            name: "BCA / MCA / BBA / MBA",
                            description: "Undergraduate and postgraduate programs in computer applications, business administration, and management."
                        },
                        {
                            name: "BA / MA / B.Com / M.Com Etc",
                            description: "Arts and commerce degrees available for distance learning to suit various career paths."
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Online Regular Courses",
                    items: [
                        {
                            name: "Online B.A. / B.Com / BBA",
                            description: "Fully online undergraduate programs with flexible schedules."
                        },
                        {
                            name: "Online Diploma in IT / HR / Marketing",
                            description: "Specialized online diploma courses in technology, human resources, and marketing."
                        },
                        {
                            name: "Certificate Courses via LMS Access",
                            description: "Short-term online certifications delivered via a Learning Management System."
                        }
                    ]
                },
                {
                    id: 3,
                    title: "B.Voc Courses (NSQF-Aligned)",
                    items: [
                        {
                            name: "Retail Management",
                            description: "Covers store operations, sales strategies, and customer service."
                        },
                        {
                            name: "Hospitality & Hotel Management",
                            description: "Prepares students for careers in hospitality, tourism, and hotel services."
                        },
                        {
                            name: "Beauty & Wellness",
                            description: "Trains in cosmetology, skincare, and holistic wellness practices."
                        },
                        {
                            name: "Electrical / Technician Courses",
                            description: "Practical training for electrical systems, maintenance, and safety."
                        },
                        {
                            name: "COPA (Computer Operator & Programming Assistant)",
                            description: "Basic computer operation, programming fundamentals, and IT tools."
                        },
                        {
                            name: "Fashion Designing",
                            description: "Covers clothing design, textile knowledge, and fashion trends."
                        },
                        {
                            name: "Mobile Repairing",
                            description: "Hands-on training for diagnosing and repairing mobile devices."
                        }
                    ]
                }
            ]
        }
    ]);


    // Add Category
    const addCategory = () => {
        setCourseSections((prev) => [
            ...prev,
            {
                id: Date.now(),
                category: "New Category",
                subcategories: []
            }
        ]);
    };

    // Remove Category
    const removeCategory = (categoryId) => {
        setCourseSections((prev) =>
            prev.filter((section) => section.id !== categoryId)
        );
    };

    // Add Subcategory
    const addSubcategory = (categoryId) => {
        setCourseSections((prev) =>
            prev.map((section) =>
                section.id === categoryId
                    ? {
                        ...section,
                        subcategories: [
                            ...section.subcategories,
                            {
                                id: Date.now(),
                                title: "New Subcategory",
                                duration: "",
                                items: []
                            }
                        ]
                    }
                    : section
            )
        );
    };

    // Remove Subcategory
    const removeSubcategory = (categoryId, subcategoryId) => {
        setCourseSections((prev) =>
            prev.map((section) =>
                section.id === categoryId
                    ? {
                        ...section,
                        subcategories: section.subcategories.filter(
                            (sub) => sub.id !== subcategoryId
                        )
                    }
                    : section
            )
        );
    };

    // Add Item
    const addItem = (categoryId, subcategoryId) => {
        setCourseSections((prev) =>
            prev.map((section) =>
                section.id === categoryId
                    ? {
                        ...section,
                        subcategories: section.subcategories.map((sub) =>
                            sub.id === subcategoryId
                                ? {
                                    ...sub,
                                    items: [
                                        ...sub.items,
                                        { id: Date.now(), name: "New Item", description: "" }
                                    ]
                                }
                                : sub
                        )
                    }
                    : section
            )
        );
    };

    // Remove Item
    const removeItem = (categoryId, subcategoryId, itemId) => {
        setCourseSections((prev) =>
            prev.map((section) =>
                section.id === categoryId
                    ? {
                        ...section,
                        subcategories: section.subcategories.map((sub) =>
                            sub.id === subcategoryId
                                ? {
                                    ...sub,
                                    items: sub.items.filter((item) => item.id !== itemId)
                                }
                                : sub
                        )
                    }
                    : section
            )
        );
    };

    // Update field
    const updateField = (categoryId, subcategoryId, itemId, field, value) => {
        setCourseSections((prev) =>
            prev.map((section) =>
                section.id === categoryId
                    ? {
                        ...section,
                        subcategories: section.subcategories.map((sub) =>
                            sub.id === subcategoryId
                                ? {
                                    ...sub,
                                    items: sub.items.map((item) =>
                                        item.id === itemId
                                            ? { ...item, [field]: value }
                                            : item
                                    )
                                }
                                : sub
                        )
                    }
                    : section
            )
        );
    };




    const handleSave = () => {
        alert('Changes saved successfully!');
    };


    const addNews = () => {
        const newItem = {
            id: Date.now(),
            title: "New Event",
            date: new Date().toISOString().split('T')[0],
            summary: "Event description",
            image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
        };
        setNews([...news, newItem]);
    };


    const removeNews = (id) => {
        setNews(news.filter(item => item.id !== id));
    };

    const updateNews = (id, field, value) => {
        setNews(news.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const updateStat = (index, field, value) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setStats(newStats);
    };

    const tabs = [
        { id: 'institute', label: 'Institute Info', icon: Building2 },
        { id: 'stats', label: 'Statistics', icon: Trophy },
        { id: 'news', label: 'News & Events', icon: Calendar },
        { id: 'contact', label: 'Contact Info', icon: Phone },
        { id: 'corporate', label: 'Corporate Training', icon: Users },
        { id: 'courses', label: 'Courses', icon: BookOpen }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <Settings className="h-7 w-7 text-blue-600" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">Admin &amp; Faculty Panel</h1>
                                <p className="text-[11px] text-gray-500">Aayush Institute Management System</p>
                            </div>
                        </div>

                        {/* Top Actions: DB status, View Site, Logout */}
                        <div className="flex items-center space-x-3">
                            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <Database className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{dbStatus.text}</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate('/Courses')}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>View Website</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex space-x-8">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <nav className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg font-medium transition-colors duration-200 ${activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm border-gray-200 border">
                            <div className="p-8">

                                {/* Institute Info Tab */}
                                {activeTab === 'institute' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Institute Information</h2>

                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Institute Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={instituteName}
                                                        onChange={(e) => setInstituteName(e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        About the Institute
                                                    </label>
                                                    <textarea
                                                        value={aboutInstitute}
                                                        onChange={(e) => setAboutInstitute(e.target.value)}
                                                        rows={4}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Statistics Tab */}
                                {activeTab === 'stats' && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {stats.map((stat, index) => (
                                                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Value
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={stat.value}
                                                                onChange={(e) => updateStat(index, 'value', e.target.value)}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Label
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={stat.label}
                                                                onChange={(e) => updateStat(index, 'label', e.target.value)}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* News & Events Tab */}
                                {activeTab === 'news' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-2xl font-bold text-gray-900">News & Events</h2>
                                            <button
                                                onClick={addNews}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 space-x-2"
                                            >
                                                <Plus className="h-4 w-4" />
                                                <span>Add News</span>
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {news.map((item) => (
                                                <div key={item.id} className="p-6 border border-gray-200 rounded-lg">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-lg font-semibold text-gray-900">News Item #{item.id}</h3>
                                                        <button
                                                            onClick={() => removeNews(item.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Title
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={item.title}
                                                                    onChange={(e) => updateNews(item.id, 'title', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Date
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    value={item.date}
                                                                    onChange={(e) => updateNews(item.id, 'date', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Image URL
                                                                </label>
                                                                <input
                                                                    type="url"
                                                                    value={item.image}
                                                                    onChange={(e) => updateNews(item.id, 'image', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Summary
                                                            </label>
                                                            <textarea
                                                                value={item.summary}
                                                                onChange={(e) => updateNews(item.id, 'summary', e.target.value)}
                                                                rows={6}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Contact Info Tab */}
                                {activeTab === 'contact' && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Address
                                                    </label>
                                                    <textarea
                                                        value={contactInfo.address}
                                                        onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                                                        rows={3}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={contactInfo.phone}
                                                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={contactInfo.email}
                                                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Facebook
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={contactInfo.socialMedia.facebook}
                                                        onChange={(e) => setContactInfo({
                                                            ...contactInfo,
                                                            socialMedia: { ...contactInfo.socialMedia, facebook: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Instagram
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={contactInfo.socialMedia.instagram}
                                                        onChange={(e) => setContactInfo({
                                                            ...contactInfo,
                                                            socialMedia: { ...contactInfo.socialMedia, instagram: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        LinkedIn
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={contactInfo.socialMedia.linkedin}
                                                        onChange={(e) => setContactInfo({
                                                            ...contactInfo,
                                                            socialMedia: { ...contactInfo.socialMedia, linkedin: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        YouTube
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={contactInfo.socialMedia.youtube}
                                                        onChange={(e) => setContactInfo({
                                                            ...contactInfo,
                                                            socialMedia: { ...contactInfo.socialMedia, youtube: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Corporate Training Tab */}
                                {activeTab === 'corporate' && (
                                    <div className="min-h-screen  ">
                                        <div className="max-w-6xl mx-auto">
                                            {/* Header Section */}
                                            <div className="  ">

                                                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                                                    Corporate Training Programs
                                                </h1>

                                            </div>



                                            {/* Training Programs Grid */}
                                            <div className="grid gap-8 md:grid-cols-1 mb-12 ">
                                                {corporateTraining.map((category, categoryIndex) => (
                                                    <div
                                                        key={category.id}
                                                        className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                                                    >
                                                        {/* Card Header */}
                                                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                                                            <div className="flex items-center space-x-4">

                                                                <span className=" text-white text-2xl opacity-90">  {categoryIndex + 1}</span>
                                                                <input
                                                                    type="text"
                                                                    value={category.title}
                                                                    onChange={(e) => {
                                                                        const updated = corporateTraining.map((cat) =>
                                                                            cat.id === category.id
                                                                                ? { ...cat, title: e.target.value }
                                                                                : cat
                                                                        );
                                                                        setCorporateTraining(updated);
                                                                    }}
                                                                    // className="relative w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-white placeholder-opacity-70 text-white"
                                                                    className="flex-1 bg-white/20 text-white placeholder-indigo-200 border border-white/30 rounded-lg px-4 py-2 text-xl font-semibold focus:outline-none focus:bg-white/30 focus:border-white transition-all"

                                                                    placeholder="Program Title"
                                                                />
                                                                <button
                                                                    onClick={() => removeProgram(category.id)}
                                                                    className="p-2 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                                                                    title="Remove Category"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Card Content */}
                                                        <div className="p-6 space-y-6">
                                                            {/* Description */}
                                                            <div>
                                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">

                                                                    Program Description
                                                                </label>
                                                                <textarea
                                                                    value={category.description}
                                                                    onChange={(e) => {
                                                                        const updated = corporateTraining.map((cat) =>
                                                                            cat.id === category.id
                                                                                ? { ...cat, description: e.target.value }
                                                                                : cat
                                                                        );
                                                                        setCorporateTraining(updated);
                                                                    }}
                                                                    rows={3}
                                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 resize-none bg-gray-50 hover:bg-white"
                                                                    placeholder="Describe the program objectives and outcomes..."
                                                                />
                                                            </div>

                                                            {/* Courses Section */}
                                                            <div>
                                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                                                                    <GraduationCap className="w-4 h-4" />
                                                                    Modules ({category.courses.length})
                                                                </label>

                                                                <div className="space-y-3">
                                                                    {category.courses.map((course, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className="group/course flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-200"
                                                                        >
                                                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/course:bg-blue-200 transition-colors duration-200">
                                                                                <span className="text-sm font-semibold text-blue-700">{index + 1}</span>
                                                                            </div>
                                                                            <input
                                                                                type="text"
                                                                                value={course}
                                                                                onChange={(e) => updateCourse(category.id, index, e.target.value)}
                                                                                className="flex-1 px-4 py-2 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 bg-transparent hover:bg-white focus:bg-white"
                                                                                placeholder="Course title..."
                                                                            />
                                                                            <button
                                                                                onClick={() => removeCourse(category.id, index)}
                                                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover/course:opacity-100"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                <button
                                                                    onClick={() => addCourse(category.id)}
                                                                    className="mt-4 w-full py-3 px-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium flex items-center justify-center gap-2 group/add"
                                                                >
                                                                    <Plus className="w-4 h-4 group-hover/add:rotate-180 transition-transform duration-300" />
                                                                    Add Module
                                                                </button>
                                                            </div>

                                                            {/* Remove Program Button */}
                                                            {/* <div className="pt-4 border-t border-gray-100">
                                                                <button
                                                                    onClick={() => removeProgram(category.id)}
                                                                    className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium flex items-center justify-center gap-2 group/delete"
                                                                >
                                                                    <Trash2 className="w-4 h-4 group-hover/delete:animate-pulse" />
                                                                    Remove Training Program
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Empty State */}
                                            {
                                                corporateTraining.length === 0 && (
                                                    <div className="text-center py-16">
                                                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                                                            <Building2 className="w-12 h-12 text-gray-400" />
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Training Programs Yet</h3>
                                                        <p className="text-gray-500 mb-6">Get started by creating your first corporate training program.</p>
                                                        <button
                                                            onClick={addProgram}
                                                            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
                                                        >
                                                            Create First Program
                                                        </button>
                                                    </div>
                                                )
                                            }

                                            {/* Add Program Button */}
                                            < div className="flex justify-center mb-10 " >
                                                <button
                                                    onClick={addProgram}
                                                    className="w-full border-2 border-dashed border-blue-300 rounded-xl p-6 text-blue-600 hover:text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-3 group/add"
                                                >
                                                    <Plus className="w-8 h-8 font-bold  group-hover/add:rotate-180 transition-transform duration-300" />
                                                    <span className='font-bold text-xl'>  Add Training Program</span>

                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Courses & Subjects Database Management Tab */}
                                {activeTab === 'courses' && (
                                    <div className="space-y-6">
                                        {/* Top Header Card */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-2xl font-bold text-gray-900">Courses &amp; Subjects (Database)</h2>
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                        <Database className="w-3 h-3" />
                                                        <span>{dbCourses.length} Courses in DB</span>
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Manage all institute subjects and courses stored in the database. Changes reflect live on the website.
                                                </p>
                                            </div>

                                            {/* Top Actions */}
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <button
                                                    type="button"
                                                    onClick={loadDbData}
                                                    disabled={dbLoading}
                                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                                                    title="Refresh from DB"
                                                >
                                                    <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin' : ''}`} />
                                                    <span>Refresh</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={handleSeedCourses}
                                                    disabled={dbLoading}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                                                    title="Sync / Seed all 23 default courses to DB"
                                                >
                                                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                                    <span>Sync Default Courses</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setShowSubjectModal(true)}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    <span>Add Subject</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={openAddCourseModal}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    <span>Add New Course</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Status Message */}
                                        {courseActionMsg.text && (
                                            <div className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-2 animate-in fade-in duration-200 ${
                                                courseActionMsg.type === 'error'
                                                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                                                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                            }`}>
                                                <div className="flex items-center gap-2">
                                                    {courseActionMsg.type === 'error' ? (
                                                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                                    ) : (
                                                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                    )}
                                                    <span>{courseActionMsg.text}</span>
                                                </div>
                                                <button
                                                    onClick={() => setCourseActionMsg({ type: '', text: '' })}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Subject Filters and Search */}
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200/80">
                                            {/* Subject Pills */}
                                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedCategoryFilter('all')}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                                                        selectedCategoryFilter === 'all'
                                                            ? 'bg-blue-600 text-white shadow-xs'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                                >
                                                    All Subjects ({dbCourses.length})
                                                </button>

                                                {dbCategories.map(cat => {
                                                    const count = dbCourses.filter(c => c.categoryId === cat.categoryId).length;
                                                    const isSelected = selectedCategoryFilter === cat.categoryId;
                                                    return (
                                                        <div key={cat.categoryId} className="relative group/pill flex items-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedCategoryFilter(cat.categoryId)}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                                                                    isSelected
                                                                        ? 'bg-blue-600 text-white shadow-xs'
                                                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                                }`}
                                                            >
                                                                <span>{cat.label}</span>
                                                                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                                                    isSelected ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'
                                                                }`}>
                                                                    {count}
                                                                </span>
                                                            </button>

                                                            {/* Delete Subject Button */}
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteSubject(cat.categoryId, cat.label);
                                                                }}
                                                                className="ml-1 p-1 text-gray-400 hover:text-red-500 rounded opacity-0 group-hover/pill:opacity-100 transition-opacity"
                                                                title={`Delete subject "${cat.label}"`}
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Search box */}
                                            <div className="relative min-w-[220px]">
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    placeholder="Search courses..."
                                                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                                {searchQuery && (
                                                    <button
                                                        onClick={() => setSearchQuery('')}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Courses Table / Cards Grid */}
                                        {dbLoading ? (
                                            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                                                <p className="text-sm font-medium">Fetching courses from database...</p>
                                            </div>
                                        ) : (
                                            (() => {
                                                const filteredCourses = dbCourses.filter(c => {
                                                    const matchCategory = selectedCategoryFilter === 'all' || c.categoryId === selectedCategoryFilter;
                                                    const matchSearch = !searchQuery.trim() || 
                                                        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                        (c.oneLiner && c.oneLiner.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                                        (c.skills && c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
                                                    return matchCategory && matchSearch;
                                                });

                                                if (filteredCourses.length === 0) {
                                                    return (
                                                        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                                                            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                            <h3 className="text-base font-semibold text-gray-700">No Courses Found</h3>
                                                            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-4">
                                                                {searchQuery
                                                                    ? `No courses match "${searchQuery}". Try a different keyword.`
                                                                    : 'No courses in this subject yet. Click below to add a new course or sync default courses.'}
                                                            </p>
                                                            <div className="flex items-center justify-center gap-3">
                                                                <button
                                                                    onClick={openAddCourseModal}
                                                                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                                                                >
                                                                    Add New Course
                                                                </button>
                                                                <button
                                                                    onClick={handleSeedCourses}
                                                                    className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
                                                                >
                                                                    Sync All 23 Default Courses
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                                        {filteredCourses.map((course) => {
                                                            const catInfo = dbCategories.find(cat => cat.categoryId === course.categoryId);
                                                            return (
                                                                <div
                                                                    key={course._id || course.id}
                                                                    className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                                                                >
                                                                    {/* Card Header & Category */}
                                                                    <div className="p-4 sm:p-5 pb-3">
                                                                        <div className="flex items-start justify-between gap-2 mb-2.5">
                                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                                                                <Tag className="w-3 h-3 text-blue-500" />
                                                                                <span>{catInfo ? catInfo.label : course.categoryId}</span>
                                                                            </span>
                                                                            {course.popular && (
                                                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                                                                    ★ POPULAR
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                                                                            {course.name}
                                                                        </h3>

                                                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                                                            {course.oneLiner || course.details || 'Professional industry-certified curriculum.'}
                                                                        </p>

                                                                        {/* Duration & Level Pills */}
                                                                        <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-gray-600">
                                                                            <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md">
                                                                                <Clock className="w-3 h-3 text-gray-500" />
                                                                                <span>{course.duration || '3–6 Months'}</span>
                                                                            </span>
                                                                            <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md">
                                                                                <GraduationCap className="w-3 h-3 text-gray-500" />
                                                                                <span>{course.level || 'All Levels'}</span>
                                                                            </span>
                                                                        </div>

                                                                        {/* Skills Badges */}
                                                                        {course.skills && course.skills.length > 0 && (
                                                                            <div className="flex flex-wrap gap-1 mt-3">
                                                                                {(Array.isArray(course.skills) ? course.skills : course.skills.split(','))
                                                                                    .slice(0, 4)
                                                                                    .map((skill, sIdx) => (
                                                                                        <span
                                                                                            key={sIdx}
                                                                                            className="px-2 py-0.5 bg-slate-50 border border-slate-200/80 rounded-md text-[10px] font-medium text-slate-600"
                                                                                        >
                                                                                            {skill.trim()}
                                                                                        </span>
                                                                                    ))}
                                                                                {course.skills.length > 4 && (
                                                                                    <span className="text-[10px] text-gray-400 self-center">
                                                                                        +{course.skills.length - 4} more
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {/* Card Footer Actions */}
                                                                    <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                                                                        <span className="text-[11px] text-gray-400 truncate max-w-[150px]">
                                                                            ID: {course._id ? course._id.slice(-6) : course.id}
                                                                        </span>
                                                                        <div className="flex items-center gap-1.5">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => openEditCourseModal(course)}
                                                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-gray-200 hover:border-blue-400 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                                                                title="Edit Course"
                                                                            >
                                                                                <Edit3 className="w-3.5 h-3.5" />
                                                                                <span>Edit</span>
                                                                            </button>

                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleDeleteCourse(course._id || course.id, course.name)}
                                                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                                                                title="Delete Course from catalog"
                                                                            >
                                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                                <span>Delete</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })()
                                        )}
                                    </div>
                                )}

                                {/* ADD / EDIT COURSE MODAL */}
                                {showCourseModal && (
                                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-2xl w-full p-6 sm:p-7 relative my-8 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                                            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        {editingCourseId ? 'Edit Course in Database' : 'Add New Course to Database'}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">
                                                        Fill in the details. This course will immediately appear on the public website.
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCourseModal(false)}
                                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <form onSubmit={handleSaveCourse} className="space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Course Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            required
                                                            value={courseForm.name}
                                                            onChange={handleCourseFormChange}
                                                            placeholder="e.g. Master Full Stack Development"
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Subject / Category *
                                                        </label>
                                                        <select
                                                            name="categoryId"
                                                            required
                                                            value={courseForm.categoryId}
                                                            onChange={handleCourseFormChange}
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-700"
                                                        >
                                                            {dbCategories.map(cat => (
                                                                <option key={cat.categoryId} value={cat.categoryId}>
                                                                    {cat.label} ({cat.categoryId})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Subgroup / Department
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="subgroup"
                                                            value={courseForm.subgroup}
                                                            onChange={handleCourseFormChange}
                                                            placeholder="e.g. Full Stack & Web Engineering"
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Duration (e.g. 3–6 Months)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="duration"
                                                            value={courseForm.duration}
                                                            onChange={handleCourseFormChange}
                                                            placeholder="e.g. 4–6 Months"
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        One-Line Summary
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="oneLiner"
                                                        value={courseForm.oneLiner}
                                                        onChange={handleCourseFormChange}
                                                        placeholder="Brief summary shown on course card"
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Course Level
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="level"
                                                            value={courseForm.level}
                                                            onChange={handleCourseFormChange}
                                                            placeholder="e.g. Beginner to Advanced"
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Eligibility
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="eligibility"
                                                            value={courseForm.eligibility}
                                                            onChange={handleCourseFormChange}
                                                            placeholder="e.g. 10th / 12th / Graduates"
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        Skills Covered (Comma-separated)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="skills"
                                                        value={courseForm.skills}
                                                        onChange={handleCourseFormChange}
                                                        placeholder="React, Node.js, Express, MongoDB, Tailwind"
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        Syllabus Modules / Key Features (Comma-separated)
                                                    </label>
                                                    <textarea
                                                        name="features"
                                                        rows={2}
                                                        value={courseForm.features}
                                                        onChange={handleCourseFormChange}
                                                        placeholder="Module 1: Foundations, Module 2: APIs, Module 3: Database & Capstone"
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Career Areas &amp; Roles
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="careerAreas"
                                                            value={courseForm.careerAreas}
                                                            onChange={handleCourseFormChange}
                                                            placeholder="e.g. Full Stack Developer, Software Engineer"
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                            Certification Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="certification"
                                                            value={courseForm.certification}
                                                            onChange={handleCourseFormChange}
                                                            placeholder="e.g. Certified Full Stack Software Developer"
                                                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 pt-1">
                                                    <input
                                                        type="checkbox"
                                                        id="popular"
                                                        name="popular"
                                                        checked={courseForm.popular}
                                                        onChange={handleCourseFormChange}
                                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                                    />
                                                    <label htmlFor="popular" className="text-xs font-medium text-gray-700 cursor-pointer">
                                                        Mark as Popular / Featured Course
                                                    </label>
                                                </div>

                                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                                    {editingCourseId && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowCourseModal(false);
                                                                handleDeleteCourse(editingCourseId, courseForm.name);
                                                            }}
                                                            className="py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                                            title="Delete this course"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            <span>Delete Course</span>
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCourseModal(false)}
                                                        className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={dbLoading}
                                                        className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70"
                                                    >
                                                        {dbLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                                        <span>{editingCourseId ? 'Save Course Changes' : 'Save to Database'}</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                {/* ADD SUBJECT MODAL */}
                                {showSubjectModal && (
                                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full p-6 sm:p-7 relative animate-in fade-in zoom-in duration-200">
                                            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900">Add New Subject / Category</h3>
                                                    <p className="text-xs text-gray-500">Create a new subject bucket to organize courses.</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowSubjectModal(false)}
                                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <form onSubmit={handleSaveSubject} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        Subject / Category Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={subjectForm.label}
                                                        onChange={(e) => setSubjectForm({ ...subjectForm, label: e.target.value })}
                                                        placeholder="e.g. Data Analytics & Business Intelligence"
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        Subject ID / Slug (Optional)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={subjectForm.categoryId}
                                                        onChange={(e) => setSubjectForm({ ...subjectForm, categoryId: e.target.value })}
                                                        placeholder="Auto-generated if blank (e.g. data-analytics)"
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        value={subjectForm.desc}
                                                        onChange={(e) => setSubjectForm({ ...subjectForm, desc: e.target.value })}
                                                        placeholder="Brief description of this subject domain..."
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        Eligibility
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={subjectForm.eligibility}
                                                        onChange={(e) => setSubjectForm({ ...subjectForm, eligibility: e.target.value })}
                                                        placeholder="e.g. 12th / Graduates / Working Professionals"
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>

                                                <div className="flex gap-2 pt-2 border-t border-gray-100">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowSubjectModal(false)}
                                                        className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={dbLoading}
                                                        className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70"
                                                    >
                                                        {dbLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                                        <span>Create Subject in DB</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;

