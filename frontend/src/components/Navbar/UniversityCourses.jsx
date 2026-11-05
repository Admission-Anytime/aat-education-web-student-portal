import React, { useState, useEffect } from 'react';
import {
    GraduationCap,
    BookOpen,
    Laptop,
    Briefcase,
    Award,
    Clock,
    Users,
    ArrowRight,
    CheckCircle2,
    Building2,
    HeartPulse,
    Cpu,
    Compass,
    Sparkles,
    Palette,
    Phone,
    Mail,
    Send,
    X,
    Star,
    ChevronRight,
    School,
    HelpCircle,
    Layers,
    FileText,
    Edit3,
    Plus,
    Trash2,
    ShieldCheck,
    Lock,
    Unlock,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import { enquiryApi } from '../../services/api';

const universityCategories = [
    {
        id: 'distance',
        label: 'Distance Learning',
        tagline: 'Flexible Education That Fits Your Schedule',
        icon: <BookOpen className="w-4 h-4" />,
        desc: 'Distance learning programmes provide students and working professionals with the flexibility to pursue higher education while managing their professional and personal commitments.',
        suitableFor: 'Students | Working Professionals | Job Seekers | Career Changers | Lifelong Learners',
        mode: 'Distance Learning',
        levels: ['Undergraduate (UG)', 'Postgraduate (PG)', 'Diploma Programmes', 'Certificate Programmes', 'Professional Programmes'],
        activeGrad: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md shadow-blue-500/25',
        activeRing: 'border-blue-500'
    },
    {
        id: 'online',
        label: 'Online Learning',
        tagline: 'Learn from Anywhere with Flexible Online Education',
        icon: <Laptop className="w-4 h-4" />,
        desc: 'Online programmes provide structured academic and professional learning through digital platforms, enabling students and professionals to continue their education from anywhere.',
        suitableFor: 'Students | Working Professionals | Entrepreneurs | Professionals | Remote Learners',
        mode: 'Online Learning',
        levels: ['Online Undergraduate Programmes', 'Online Postgraduate Programmes', 'Online Diploma Programmes', 'Online Certificate Programmes', 'Professional & Management Programmes'],
        activeGrad: 'bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white shadow-md shadow-purple-500/25',
        activeRing: 'border-purple-500'
    },
    {
        id: 'working-prof',
        label: 'Working Professional Programmes',
        tagline: 'Continue Your Education While You Work',
        icon: <Briefcase className="w-4 h-4" />,
        desc: 'Flexible programmes designed for working professionals who want to pursue higher education, upgrade their qualifications or develop new professional capabilities without interrupting their careers.',
        suitableFor: 'Working Professionals | Executives | Managers | Entrepreneurs | Business Owners | Career Professionals',
        mode: 'Online | Distance | Flexible Learning',
        levels: ['Undergraduate Programmes', 'Postgraduate Programmes', 'Executive & Management Programmes', 'Diploma & Certificate Programmes', 'Professional Programmes'],
        activeGrad: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-amber-500/25',
        activeRing: 'border-amber-500'
    },
    {
        id: 'vocational-edu',
        label: 'Vocational & Professional Education',
        tagline: 'Academic Qualifications Across Diverse Career Fields',
        icon: <GraduationCap className="w-4 h-4" />,
        desc: 'Our Vocational & Professional Education category brings together UG, PG, Diploma and Certificate programmes across a wide range of academic, professional, technical and career-oriented disciplines for recognized qualifications.',
        suitableFor: '10th / 12th Pass Students | Diploma Holders | Graduates | Working Professionals | Career Changers | Professionals Seeking Additional Qualifications',
        mode: 'Online | Distance | Classroom / Campus-Based* | Flexible Learning',
        levels: ['Undergraduate (UG) Programmes', 'Postgraduate (PG) Programmes', 'Diploma Programmes', 'Postgraduate Diploma Programmes', 'Certificate Programmes', 'Professional Programmes'],
        activeGrad: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-500/25',
        activeRing: 'border-emerald-500'
    }
];

const universityCoursesData = {};

const learningPaths = [
    {
        title: "Distance Learning",
        desc: "Flexible academic programmes designed for learners who prefer to study alongside work or other commitments.",
        icon: <BookOpen className="w-5 h-5 text-white" />,
        badge: "Self-Paced & Flexible",
        categoryId: 'distance',
        cardBg: 'from-blue-100/80 via-sky-50/50 to-white',
        border: 'border-blue-200/90 hover:border-blue-500',
        shadow: 'hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]',
        glow: 'from-blue-400/25',
        iconGrad: 'from-blue-600 to-indigo-600',
        badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
        textAccent: 'text-blue-600 group-hover:text-blue-700'
    },
    {
        title: "Online Learning",
        desc: "Digital-first programmes that allow learners to pursue their education remotely through modern interactive platforms.",
        icon: <Laptop className="w-5 h-5 text-white" />,
        badge: "100% Digital Delivery",
        categoryId: 'online',
        cardBg: 'from-purple-100/80 via-fuchsia-50/50 to-white',
        border: 'border-purple-200/90 hover:border-purple-500',
        shadow: 'hover:shadow-[0_14px_30px_rgba(147,51,234,0.18)]',
        glow: 'from-purple-400/25',
        iconGrad: 'from-purple-600 to-violet-600',
        badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
        textAccent: 'text-purple-600 group-hover:text-purple-700'
    },
    {
        title: "Working Professional",
        desc: "Flexible academic and professional programmes designed around the needs and schedules of employed learners.",
        icon: <Briefcase className="w-5 h-5 text-white" />,
        badge: "Weekend & Evening",
        categoryId: 'working-prof',
        cardBg: 'from-amber-100/80 via-orange-50/50 to-white',
        border: 'border-amber-200/90 hover:border-amber-500',
        shadow: 'hover:shadow-[0_14px_30px_rgba(245,158,11,0.18)]',
        glow: 'from-amber-400/25',
        iconGrad: 'from-amber-500 to-orange-600',
        badgeStyle: 'bg-amber-100 text-amber-900 border-amber-200',
        textAccent: 'text-amber-600 group-hover:text-amber-700'
    },
    {
        title: "Vocational & Professional",
        desc: "UG, PG, Diploma and Certificate programmes across Healthcare, Paramedical, Engineering, Design & IT.",
        icon: <GraduationCap className="w-5 h-5 text-white" />,
        badge: "Industry Certified",
        categoryId: 'vocational-edu',
        cardBg: 'from-emerald-100/80 via-teal-50/50 to-white',
        border: 'border-emerald-200/90 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_14px_30px_rgba(16,185,129,0.18)]',
        glow: 'from-emerald-400/25',
        iconGrad: 'from-emerald-600 to-teal-600',
        badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        textAccent: 'text-emerald-600 group-hover:text-emerald-700'
    }
];

const iconPalette = [
    'bg-blue-50 text-[#0066ff]',
    'bg-emerald-50 text-emerald-600',
    'bg-purple-50 text-purple-600',
    'bg-amber-50 text-amber-600',
    'bg-rose-50 text-rose-600',
    'bg-indigo-50 text-indigo-600',
    'bg-cyan-50 text-cyan-600',
    'bg-orange-50 text-orange-600'
];

const UniversityCourses = () => {
    const [activeCategory, setActiveCategory] = useState('distance');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [advisorForm, setAdvisorForm] = useState({
        name: '',
        phone: '',
        email: '',
        qualification: '12th Pass',
        interestedIn: 'Distance Learning',
        courseName: '',
        city: ''
    });

    // Staff Authentication & Mode Detection
    const [currentUser] = useState(() => {
        try {
            const raw = localStorage.getItem('aayush_user');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    // Staff mode disabled
    const isStaff = false;


    // Safe dynamic icon resolver for university courses
    const renderUniversityIcon = (course, customClass = "w-5 h-5") => {
        if (!course) return <BookOpen className={customClass} />;
        if (React.isValidElement(course.icon)) return course.icon;
        if (typeof course.icon === 'function') {
            const IconComp = course.icon;
            return <IconComp className={customClass} />;
        }
        const name = (course.name || '').toLowerCase();
        if (name.includes('business') || name.includes('bba') || name.includes('mba') || name.includes('management')) return <Briefcase className={customClass} />;
        if (name.includes('commerce') || name.includes('com') || name.includes('finance') || name.includes('accounting')) return <Award className={customClass} />;
        if (name.includes('computer') || name.includes('bca') || name.includes('mca') || name.includes('it') || name.includes('software')) return <Cpu className={customClass} />;
        if (name.includes('art') || name.includes('humanities') || name.includes('ba') || name.includes('ma')) return <BookOpen className={customClass} />;
        if (name.includes('science') || name.includes('bsc') || name.includes('msc')) return <Compass className={customClass} />;
        if (name.includes('education') || name.includes('teaching') || name.includes('bed')) return <School className={customClass} />;
        if (name.includes('health') || name.includes('hospital') || name.includes('clinical')) return <HeartPulse className={customClass} />;
        if (name.includes('vocational') || name.includes('diploma')) return <Layers className={customClass} />;
        return <BookOpen className={customClass} />;
    };

    const sanitizeUniversityCoursesForStorage = (data) => {
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

    // Dynamic Courses state backed by live MongoDB & real-time sync
    const [isBackendDown, setIsBackendDown] = useState(false);
    const [coursesState, setCoursesState] = useState({});

    const fetchMongoUniversityCourses = async () => {
        try {
            const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
            const res = await fetch(`${baseUrl}/api/courses?programType=university`);
            if (!res.ok) {
                setIsBackendDown(true);
                setCoursesState({});
                return;
            }
            const mongoList = await res.json();
            if (Array.isArray(mongoList) && mongoList.length > 0) {
                const grouped = {};
                mongoList.forEach(item => {
                    const cat = item.categoryId || 'distance';
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

                setIsBackendDown(false);
                setCoursesState(grouped);
            } else {
                setIsBackendDown(true);
                setCoursesState({});
            }
        } catch (err) {
            console.warn('[UniversityCourses] Backend offline, standing by...', err.message);
            setIsBackendDown(true);
            setCoursesState({});
        }
    };

    useEffect(() => {
        fetchMongoUniversityCourses();
        const interval = setInterval(fetchMongoUniversityCourses, 3000);

        const syncCourses = () => {
            fetchMongoUniversityCourses();
        };
        const syncAuth = () => {
            setIsStaffQuickUnlocked(sessionStorage.getItem('aayush_staff_quick_unlocked') === 'true');
        };
        window.addEventListener('universityCoursesUpdated', syncCourses);
        window.addEventListener('storage', syncCourses);
        window.addEventListener('authChange', syncAuth);
        return () => {
            clearInterval(interval);
            window.removeEventListener('universityCoursesUpdated', syncCourses);
            window.removeEventListener('storage', syncCourses);
            window.removeEventListener('authChange', syncAuth);
        };
    }, []);

    const handleResetToDefaults = () => {
        if (window.confirm('Reset all university programs back to original catalog defaults?')) {
            localStorage.removeItem('aayush_university_courses_custom');
            setCoursesState(universityCoursesData);
            window.dispatchEvent(new Event('universityCoursesUpdated'));
            window.dispatchEvent(new Event('storage'));
            showToast('University catalog reset to defaults.', 'info');
        }
    };

    // Toast notification
    const [toastMsg, setToastMsg] = useState(null);
    const showToast = (text, type = 'success') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3500);
    };

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCourseIndex, setEditingCourseIndex] = useState(null);
    const [editingCategory, setEditingCategory] = useState('distance');
    const [editFormData, setEditFormData] = useState({
        name: '',
        degrees: '',
        details: '',
        duration: '',
        eligibility: '',
        popular: false,
        features: '',
        image: ''
    });

    const openEditModal = (course, index) => {
        let cat = activeCategory;
        let targetIdx = index;
        if (targetIdx === undefined || targetIdx === null) {
            // Find category and index if called from details modal
            for (const [cKey, list] of Object.entries(coursesState)) {
                const found = (list || []).findIndex(item => item.name === course.name);
                if (found !== -1) {
                    cat = cKey;
                    targetIdx = found;
                    break;
                }
            }
        }
        setEditingCourseIndex(targetIdx);
        setEditingCategory(cat);
        setEditFormData({
            name: course.name || '',
            degrees: course.degrees || '',
            details: course.details || '',
            duration: course.duration || '',
            eligibility: course.eligibility || '',
            popular: !!course.popular,
            features: (course.features || []).join('\n'),
            image: course.image || ''
        });
        setIsEditModalOpen(true);
    };

    const handleSaveCourseEdit = (e) => {
        e.preventDefault();
        const updatedCategoryCourses = [...(coursesState[editingCategory] || [])];
        if (editingCourseIndex !== null && updatedCategoryCourses[editingCourseIndex]) {
            const currentItem = updatedCategoryCourses[editingCourseIndex];
            const updatedCourse = {
                ...currentItem,
                name: editFormData.name,
                degrees: editFormData.degrees,
                details: editFormData.details,
                duration: editFormData.duration,
                eligibility: editFormData.eligibility,
                popular: editFormData.popular,
                image: editFormData.image || currentItem.image,
                features: editFormData.features.split('\n').map(f => f.trim()).filter(Boolean)
            };
            updatedCategoryCourses[editingCourseIndex] = updatedCourse;
            const updated = {
                ...coursesState,
                [editingCategory]: updatedCategoryCourses
            };
            saveCoursesState(updated);
            // Real-time synchronization if the details modal is currently viewing this course
            if (selectedCourse && (selectedCourse.name === currentItem.name || selectedCourse.name === editFormData.name)) {
                setSelectedCourse(updatedCourse);
            }
            setIsEditModalOpen(false);
            showToast(`Program "${editFormData.name}" updated successfully!`, 'success');
        }
    };

    const handleDeleteCourse = (targetCourseOrIdx, optionalIdx, optionalCat) => {
        let cat = optionalCat || editingCategory || activeCategory;
        let itemToDelete = null;
        let indexToDelete = -1;

        if (typeof targetCourseOrIdx === 'object' && targetCourseOrIdx !== null) {
            itemToDelete = targetCourseOrIdx;
            if (optionalCat && coursesState[optionalCat]) {
                cat = optionalCat;
                indexToDelete = coursesState[cat].findIndex(item => item.name === itemToDelete.name);
            } else {
                for (const [cKey, list] of Object.entries(coursesState)) {
                    const found = (list || []).findIndex(item => item.name === itemToDelete.name);
                    if (found !== -1) {
                        cat = cKey;
                        indexToDelete = found;
                        break;
                    }
                }
            }
        } else if (typeof targetCourseOrIdx === 'number') {
            indexToDelete = targetCourseOrIdx;
            cat = optionalCat || editingCategory || activeCategory;
            itemToDelete = (coursesState[cat] || [])[indexToDelete];
        }

        const courseName = itemToDelete?.name || 'this program';
        if (window.confirm(`Are you sure you want to delete "${courseName}" from the university catalog?`)) {
            const currentList = coursesState[cat] || [];
            const updatedCategoryCourses = currentList.filter((_, idx) => idx !== indexToDelete);
            const updated = {
                ...coursesState,
                [cat]: updatedCategoryCourses
            };
            saveCoursesState(updated);
            if (selectedCourse && itemToDelete && (selectedCourse.name === itemToDelete.name || selectedCourse._id === itemToDelete._id)) {
                setSelectedCourse(null);
                setIsCourseModalOpen(false);
            }
            setIsEditModalOpen(false);
            showToast(`Program "${courseName}" removed from university catalog.`, 'info');
        }
    };

    // Add Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        category: 'distance',
        name: '',
        degrees: '',
        details: '',
        duration: '1–3 Years',
        eligibility: '12th / Graduation',
        popular: false,
        features: '',
        image: ''
    });

    const openAddModal = () => {
        setAddFormData({
            category: activeCategory,
            name: '',
            degrees: '',
            details: '',
            duration: '1–3 Years',
            eligibility: '12th / Graduation',
            popular: false,
            features: '',
            image: '/university_graduates.jpg'
        });
        setIsAddModalOpen(true);
    };

    const handleAddCourseSubmit = (e) => {
        e.preventDefault();
        const targetCategory = addFormData.category;
        const newCourse = {
            name: addFormData.name,
            degrees: addFormData.degrees,
            details: addFormData.details,
            duration: addFormData.duration,
            eligibility: addFormData.eligibility,
            popular: addFormData.popular,
            image: addFormData.image || '/university_graduates.jpg',
            features: addFormData.features.split('\n').map(f => f.trim()).filter(Boolean)
        };

        const currentList = coursesState[targetCategory] || [];
        const updated = {
            ...coursesState,
            [targetCategory]: [newCourse, ...currentList]
        };
        saveCoursesState(updated);
        setIsAddModalOpen(false);
        setActiveCategory(targetCategory);
        showToast(`New program "${newCourse.name}" added to catalog!`, 'success');
    };

    const activeCategoryInfo = universityCategories.find(c => c.id === activeCategory) || universityCategories[0];
    const currentCourses = coursesState[activeCategory] || [];

    const openCourseModal = (course) => {
        setSelectedCourse(course);
        setIsCourseModalOpen(true);
    };

    const closeCourseModal = () => {
        setIsCourseModalOpen(false);
        setSelectedCourse(null);
    };

    const openAdvisorModal = (specificCourse = '') => {
        if (specificCourse) {
            setAdvisorForm(prev => ({
                ...prev,
                interestedIn: activeCategoryInfo.label,
                courseName: specificCourse
            }));
        }
        setIsCourseModalOpen(false);
        setIsAdvisorModalOpen(true);
        setFormSubmitted(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        try {
            await enquiryApi.submit({
                name: advisorForm.name,
                email: advisorForm.email,
                phone: advisorForm.phone,
                qualification: advisorForm.qualification,
                interestedIn: advisorForm.interestedIn,
                courseName: advisorForm.courseName
            });
        } catch (err) {
            console.warn('Enquiry submit note:', err);
        }
        setTimeout(() => {
            setIsAdvisorModalOpen(false);
            setFormSubmitted(false);
        }, 2200);
    };

    const switchCategoryAndScroll = (categoryId) => {
        setActiveCategory(categoryId);
        const el = document.getElementById('university-catalog');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Discipline Image Mapper for University Degree Cards using local high-res assets
    const getUniversityCourseImage = (course) => {
        if (!course) return '/university_graduates.jpg';
        if (course.image) return course.image;
        const name = (course.name || '').toLowerCase();
        const degrees = (course.degrees || '').toLowerCase();
        const combined = `${name} ${degrees}`;

        if (combined.includes('management') || combined.includes('business') || combined.includes('bba') || combined.includes('mba') || combined.includes('executive') || combined.includes('leadership')) {
            return '/university_mba.jpg';
        }
        if (combined.includes('commerce') || combined.includes('finance') || combined.includes('b.com') || combined.includes('m.com') || combined.includes('accounting') || combined.includes('banking') || combined.includes('fintech')) {
            return '/corporate_data.jpg';
        }
        if (combined.includes('computer') || combined.includes('it') || combined.includes('bca') || combined.includes('mca') || combined.includes('pgdca') || combined.includes('software') || combined.includes('coding') || combined.includes('cloud')) {
            return '/course_mern.jpg';
        }
        if (combined.includes('data') || combined.includes('analytics') || combined.includes('ai') || combined.includes('machine learning')) {
            return '/corporate_ai.jpg';
        }
        if (combined.includes('science') || combined.includes('physics') || combined.includes('chem') || combined.includes('bio') || combined.includes('b.sc') || combined.includes('m.sc')) {
            return '/university_science.jpg';
        }
        if (combined.includes('health') || combined.includes('hospital') || combined.includes('medical') || combined.includes('paramedical') || combined.includes('mha') || combined.includes('clinical') || combined.includes('mlt')) {
            return '/university_science.jpg';
        }
        if (combined.includes('arts') || combined.includes('humanities') || combined.includes('ba') || combined.includes('ma') || combined.includes('english') || combined.includes('sociology') || combined.includes('history') || combined.includes('library') || combined.includes('blis') || combined.includes('social work') || combined.includes('bsw') || combined.includes('msw')) {
            return '/university_library.jpg';
        }
        if (combined.includes('education') || combined.includes('teaching') || combined.includes('b.ed') || combined.includes('deled') || combined.includes('pedagogy')) {
            return '/university_library.jpg';
        }
        if (combined.includes('design') || combined.includes('multimedia') || combined.includes('fashion') || combined.includes('interior') || combined.includes('animation')) {
            return '/course_graphic_design.jpg';
        }
        if (combined.includes('vocational') || combined.includes('polytechnic') || combined.includes('engineering') || combined.includes('technical') || combined.includes('skill')) {
            return '/laptop_live_projects.jpg';
        }
        return '/university_graduates.jpg';
    };

    const universityThemes = [
        {
            cardBg: 'from-blue-100/80 via-indigo-50/50 to-white',
            border: 'border-blue-200/90 hover:border-blue-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(37,99,235,0.18)]',
            glow: 'from-blue-400/25',
            iconGrad: 'from-blue-600 via-indigo-600 to-blue-700',
            titleHover: 'group-hover:text-blue-600',
            badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
            degreeBg: 'bg-blue-100 text-blue-800 border-blue-300 font-semibold',
            btnBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25',
            accentText: 'text-blue-600'
        },
        {
            cardBg: 'from-purple-100/80 via-fuchsia-50/50 to-white',
            border: 'border-purple-200/90 hover:border-purple-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
            glow: 'from-purple-400/25',
            iconGrad: 'from-purple-600 via-violet-600 to-purple-700',
            titleHover: 'group-hover:text-purple-600',
            badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
            degreeBg: 'bg-purple-100 text-purple-800 border-purple-300 font-semibold',
            btnBg: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-purple-500/25',
            accentText: 'text-purple-600'
        },
        {
            cardBg: 'from-emerald-100/80 via-teal-50/50 to-white',
            border: 'border-emerald-200/90 hover:border-emerald-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
            glow: 'from-emerald-400/25',
            iconGrad: 'from-emerald-600 via-teal-600 to-emerald-700',
            titleHover: 'group-hover:text-emerald-600',
            badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            degreeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold',
            btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/25',
            accentText: 'text-emerald-600'
        },
        {
            cardBg: 'from-amber-100/80 via-orange-50/50 to-white',
            border: 'border-amber-200/90 hover:border-amber-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
            glow: 'from-amber-400/25',
            iconGrad: 'from-amber-500 via-orange-500 to-amber-600',
            titleHover: 'group-hover:text-amber-600',
            badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
            degreeBg: 'bg-amber-100 text-amber-900 border-amber-300 font-semibold',
            btnBg: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/25',
            accentText: 'text-amber-600'
        },
        {
            cardBg: 'from-cyan-100/80 via-sky-50/50 to-white',
            border: 'border-cyan-200/90 hover:border-cyan-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(6,182,212,0.18)]',
            glow: 'from-cyan-400/25',
            iconGrad: 'from-cyan-600 via-sky-600 to-blue-600',
            titleHover: 'group-hover:text-cyan-600',
            badgeBg: 'bg-cyan-50 text-cyan-900 border-cyan-200',
            degreeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300 font-semibold',
            btnBg: 'bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-cyan-500/25',
            accentText: 'text-cyan-600'
        },
        {
            cardBg: 'from-rose-100/80 via-pink-50/50 to-white',
            border: 'border-rose-200/90 hover:border-rose-500',
            shadow: 'hover:shadow-[0_16px_36px_rgba(244,63,94,0.18)]',
            glow: 'from-rose-400/25',
            iconGrad: 'from-rose-600 via-pink-600 to-rose-700',
            titleHover: 'group-hover:text-rose-600',
            badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
            degreeBg: 'bg-rose-100 text-rose-800 border-rose-300 font-semibold',
            btnBg: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-rose-500/25',
            accentText: 'text-rose-600'
        }
    ];

    // Course Card Component (Clean, Premium, Colorful, NO top border lines)
    const CourseCard = ({ course, index }) => {
        const theme = universityThemes[index % universityThemes.length];
        const cardImg = getUniversityCourseImage(course);

        return (
            <div className={`bg-gradient-to-br ${theme.cardBg} rounded-2xl border-2 ${theme.border} shadow-[0_4px_18px_rgba(0,0,0,0.04)] ${theme.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group h-full overflow-hidden relative`}>
                {/* Ambient Corner Glow */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${theme.glow} to-transparent rounded-full blur-2xl pointer-events-none opacity-70`} />

                {/* 1. Discipline Image Thumbnail */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900 flex-shrink-0">
                    <img 
                        src={cardImg} 
                        alt={course.name}
                        loading="lazy"
                        onError={(e) => { e.target.src = '/university_graduates.jpg'; }}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                        <div className="flex items-center gap-1.5 pointer-events-auto">
                            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-semibold shadow-sm tracking-wide text-blue-900 border border-blue-200">
                                UGC Entitled
                            </span>
                            {course.popular && (
                                <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 text-[10px] font-semibold rounded-full flex items-center gap-1 shadow-md border border-amber-300">
                                    <Star className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                                    Popular
                                </span>
                            )}
                        </div>
                        {isStaff && (
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditModal(course, index); }}
                                className="pointer-events-auto px-2 py-1 bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                                title="Edit Program (Staff)"
                            >
                                <Edit3 className="w-2.5 h-2.5 text-purple-300" />
                                <span>Staff Edit</span>
                            </button>
                        )}
                    </div>

                    {/* Floating Bottom Metadata on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-semibold">
                        <span className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] border border-white/20 shadow-xs">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>{course.duration}</span>
                        </span>
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide shadow-xs border border-emerald-400/40">
                            Govt. Recognized
                        </span>
                    </div>
                </div>

                {/* 2. Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                        {/* Title with Small Icon */}
                        <div className="flex items-start gap-2.5 mb-2.5">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.iconGrad} text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                {renderUniversityIcon(course)}
                            </div>
                            <h4 className={`text-[14px] sm:text-[15px] font-bold text-slate-900 ${theme.titleHover} transition-colors leading-snug line-clamp-2 min-h-[40px] flex items-center flex-1`}>
                                {course.name}
                            </h4>
                        </div>

                        {/* Degree Chips / Subtitle */}
                        {course.degrees && (
                            <div className="mb-2.5">
                                <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold border leading-snug shadow-2xs ${theme.degreeBg}`}>
                                    {course.degrees}
                                </span>
                            </div>
                        )}

                        {/* Description */}
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3 font-normal">
                            {course.details}
                        </p>

                        {/* Highlight Feature Preview */}
                        {course.features && course.features.length > 0 && (
                            <div className="space-y-1 mb-3 pt-2 border-t border-slate-200/60">
                                {course.features.slice(0, 2).map((feat, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                        <span className="truncate">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. Bottom Row */}
                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold">
                            <GraduationCap className={`w-4 h-4 ${theme.accentText}`} />
                            <span>Online & Distance</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                            {isStaff && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteCourse(course, index, activeCategory); }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                                    title="Delete this program"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                    <span className="hidden sm:inline">Delete</span>
                                </button>
                            )}
                            <button
                                onClick={() => openCourseModal(course)}
                                aria-label={`View details for ${course.name}`}
                                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${theme.btnBg} font-bold text-xs shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group/btn hover:scale-105 active:scale-95`}
                            >
                                <span>Details</span>
                                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* Hero Section with Course Hero Background */}
            <div 
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center min-h-[250px] sm:min-h-[270px] lg:min-h-[290px] flex items-center"
                style={{ 
                    backgroundImage: "url('/course_hero.png')",
                    backgroundColor: '#d6ecff'
                }}
            >
                {/* Mobile & iPad overlay for crisp text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/95 via-[#d6ecff]/80 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 w-full">
                    <div className="flex flex-col justify-center py-4 sm:py-5 lg:py-6 max-w-full sm:max-w-[440px] md:max-w-[480px] lg:max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-[#0055cc] text-[11px] font-bold tracking-wide mb-2 border border-blue-200/60 shadow-xs w-fit backdrop-blur-xs">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>University Education Pathways</span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-1.5" style={{fontSize: 'clamp(20px, 2.5vw, 32px)'}}>
                            Flexible Education Pathways for{' '}
                            <span className="text-[#0055ff] block sm:inline">Students & Working Professionals</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-2.5 font-medium">
                            Explore flexible Distance, Online, Working Professional, and Vocational degree pathways tailored to your academic and career goals.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 md:gap-5 mb-3">
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Award className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">UGC Approved Universities</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Laptop className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">Flexible Learning Modes</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Users className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">Dedicated Student Support</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                            <a
                                href="#university-catalog"
                                className="inline-flex items-center justify-center gap-2 bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Explore All Programmes</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </a>
                            <button
                                onClick={() => openAdvisorModal()}
                                className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#004b93] font-semibold text-xs sm:text-sm px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border border-blue-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                            >
                                <Phone className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Talk to an Education Advisor</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            {/* Category Tabs Section */}
            <div id="university-catalog" className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
                {/* Floating pill menu */}
                <div 
                    className="overflow-x-auto pb-2 mb-6 no-scrollbar -mt-5 sm:-mt-6 relative z-20 px-1 touch-pan-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-2 min-w-max mx-auto justify-start lg:justify-center p-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/90">
                        {universityCategories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-[13px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? `${cat.activeGrad} scale-102`
                                            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200/80 shadow-2xs'
                                    }`}
                                >
                                    {React.isValidElement(cat.icon) ? cat.icon : <BookOpen className="w-4 h-4" />}
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active Category Header Card */}
                <div className={`p-4 sm:p-5 rounded-2xl border-2 mb-6 shadow-sm transition-all duration-300 ${
                    activeCategory === 'distance' 
                        ? 'bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white border-blue-200/90' 
                        : activeCategory === 'online'
                        ? 'bg-gradient-to-r from-purple-50 via-violet-50/50 to-white border-purple-200/90'
                        : activeCategory === 'working-prof'
                        ? 'bg-gradient-to-r from-amber-50 via-orange-50/50 to-white border-amber-200/90'
                        : 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border-emerald-200/90'
                }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/95 shadow-2xs border border-slate-200 text-slate-800">
                                    {activeCategoryInfo.mode}
                                </span>
                                <span className="text-xs font-semibold text-slate-400">•</span>
                                <span className="text-xs font-medium text-slate-600">{activeCategoryInfo.tagline}</span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span>{activeCategoryInfo.label} Disciplines</span>
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200 text-slate-700 shadow-2xs">
                                    {currentCourses.length} Programs
                                </span>
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed font-normal">
                                {activeCategoryInfo.desc}
                            </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2.5 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200/90 shadow-2xs max-w-sm">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-semibold">
                                <Users className="w-4 h-4" />
                            </div>
                            <div className="text-[11px]">
                                <div className="font-semibold text-slate-900">Who Can Apply:</div>
                                <div className="text-slate-600 line-clamp-1">{activeCategoryInfo.suitableFor}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                {isBackendDown || currentCourses.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-amber-200 p-8 max-w-lg mx-auto shadow-xs">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 mb-3 border border-amber-200">
                            <AlertCircle className="w-6 h-6 animate-pulse" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">University Programs Database Disconnected</h3>
                        <p className="text-xs text-slate-500 mb-4">
                            All degrees and university courses are pulled directly from MongoDB. The backend server is currently offline or reconnecting. Data will appear automatically when connected.
                        </p>
                        <button
                            onClick={fetchMongoUniversityCourses}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Reload University Programs</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-2">
                        {currentCourses.map((course, idx) => (
                            <CourseCard key={idx} course={course} index={idx} />
                        ))}
                    </div>
                )}

                {/* Footnote for Vocational & Professional Category */}
                {activeCategory === 'vocational-edu' && (
                    <p className="text-center text-[11px] text-slate-400 mt-5 italic">
                        *Availability of programme, mode of study and eligibility may vary by university, institution and programme.
                    </p>
                )}

                {/* ── Choose Your Learning Path (4 Cards) ── */}
                <div className="mt-14 sm:mt-18 pt-10 border-t border-slate-200/80">
                    <div className="text-center mb-8 sm:mb-10">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#0062ff] mb-1">
                            FLEXIBLE ADMISSIONS
                        </p>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a2540] tracking-tight">
                            Choose Your Learning Path
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
                            Whether you seek self-paced distance education, dynamic online degrees, or industry vocational qualifications, discover the path suited to your lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {learningPaths.map((path, idx) => (
                            <div
                                key={idx}
                                onClick={() => switchCategoryAndScroll(path.categoryId)}
                                className={`bg-gradient-to-br ${path.cardBg} rounded-2xl p-5 border-2 ${path.border} shadow-[0_4px_16px_rgba(0,0,0,0.03)] ${path.shadow} hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
                            >
                                {/* Subtle inner glow */}
                                <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${path.glow} to-transparent rounded-full blur-xl pointer-events-none opacity-60`} />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${path.iconGrad} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                            {React.isValidElement(path.icon) ? path.icon : <Compass className="w-5 h-5 text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs ${path.badgeStyle}`}>
                                            {path.badge}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-slate-900 text-sm sm:text-[15px] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                                        {path.title}
                                    </h3>
                                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                                        {path.desc}
                                    </p>
                                </div>
                                <div className={`pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold ${path.textAccent} relative z-10`}>
                                    <span>Explore Disciplines</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Call to Action Banner (Explore Your Education Options) ── */}
                <div className="mt-10 sm:mt-12 bg-gradient-to-r from-[#0a2540] via-[#003882] to-[#0066ff] rounded-2xl py-6 sm:py-7 px-4 sm:px-6 text-center text-white shadow-xl">
                    <h3 className="text-base sm:text-lg font-bold mb-1.5 text-[#fed000]">
                        Equip Your Ambitions with Recognized University Degrees
                    </h3>
                    <p className="text-white/85 mb-4 max-w-xl mx-auto text-xs sm:text-[13px] leading-relaxed">
                        Whether you are looking to start your higher education, earn an advanced qualification, change your career path or strengthen your professional profile, explore programmes based on your academic background, career objectives and preferred learning mode.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md sm:max-w-none mx-auto">
                        <a
                            href="#university-catalog"
                            className="w-full sm:w-auto bg-[#fed000] hover:bg-[#ffe14d] text-[#002b66] px-5 py-2.5 rounded-full font-semibold text-xs sm:text-[13px] transition-all shadow-md hover:scale-105 cursor-pointer text-center"
                        >
                            Explore All Programmes
                        </a>
                        <button
                            onClick={() => openAdvisorModal()}
                            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 border border-white/40 text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-[13px] transition-all cursor-pointer text-center"
                        >
                            Find Your Programme
                        </button>
                        <a
                            href="tel:+916284063840"
                            className="w-full sm:w-auto border border-white/50 text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-[13px] hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 text-center"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Talk to an Education Advisor</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Course Details Modal ── */}
            {isCourseModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl sm:rounded-3xl w-[94vw] md:w-[80vw] max-w-[80vw] max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
                        {/* Course Image Header Banner */}
                        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden bg-slate-900 flex-shrink-0">
                            <img 
                                src={getUniversityCourseImage(selectedCourse)} 
                                alt={selectedCourse.name}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => { e.target.src = '/university_graduates.jpg'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />
                            
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2 z-20">
                                {isStaff && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(selectedCourse)}
                                            className="px-3.5 py-1.5 rounded-full bg-purple-900/90 hover:bg-purple-950 text-purple-100 text-xs font-bold shadow-md border border-purple-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                            title="Edit Program Details (Staff)"
                                        >
                                            <Edit3 className="w-3.5 h-3.5 text-purple-300" />
                                            <span>Staff Edit</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteCourse(selectedCourse)}
                                            className="px-3.5 py-1.5 rounded-full bg-rose-600/95 hover:bg-rose-700 text-white text-xs font-bold shadow-md border border-rose-400/40 backdrop-blur-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5"
                                            title="Delete Program (Staff)"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-rose-100" />
                                            <span>Delete</span>
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={closeCourseModal}
                                    className="text-white hover:text-white bg-black/50 hover:bg-black/75 p-2 sm:p-2.5 rounded-full transition-all cursor-pointer backdrop-blur-md hover:scale-105"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white z-10">
                                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-2.5">
                                    <span className="px-3 py-1 rounded-full bg-[#0066ff] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {activeCategoryInfo.label}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm">
                                        <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                                        UGC Entitled
                                    </span>
                                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold">
                                        Govt. Recognized University Pathway
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight drop-shadow-md text-white">
                                    {selectedCourse.name}
                                </h3>
                            </div>
                        </div>

                        {/* Modal Body: Responsive 2-Column on LG screens */}
                        <div className="p-4 sm:p-6 lg:p-8 flex-1">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                                {/* Left Column: 7 cols */}
                                <div className="lg:col-span-7 space-y-5">
                                    {selectedCourse.degrees && (
                                        <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/70 border border-blue-100 p-4 rounded-2xl">
                                            <h5 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-blue-900 mb-1 flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4 text-blue-700" />
                                                Available Degrees & Qualifications
                                            </h5>
                                            <p className="text-[#004b93] font-bold text-sm sm:text-base leading-snug">
                                                {selectedCourse.degrees}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                            Programme Overview
                                        </h4>
                                        <p className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-[14.5px]">
                                            {selectedCourse.details}
                                        </p>
                                    </div>

                                    {selectedCourse.features && selectedCourse.features.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                                                Academic Highlights & Curricula
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                {selectedCourse.features.map((feature, index) => (
                                                    <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                        <span className="text-slate-800 text-xs sm:text-[13px] font-medium leading-snug">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: 5 cols */}
                                <div className="lg:col-span-5 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                                        <div className="bg-blue-50/70 border border-blue-100/80 p-4 rounded-2xl">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Clock className="w-4 h-4 text-[#0066ff]" />
                                                <h5 className="font-bold text-[11px] uppercase tracking-wider text-blue-900">Duration</h5>
                                            </div>
                                            <p className="text-slate-900 font-bold text-sm sm:text-base">{selectedCourse.duration}</p>
                                        </div>

                                        <div className="bg-emerald-50/70 border border-emerald-100/80 p-4 rounded-2xl">
                                            <div className="flex items-center gap-2 mb-1">
                                                <GraduationCap className="w-4 h-4 text-emerald-600" />
                                                <h5 className="font-bold text-[11px] uppercase tracking-wider text-emerald-900">Eligibility</h5>
                                            </div>
                                            <p className="text-slate-900 font-bold text-sm sm:text-base">{selectedCourse.eligibility}</p>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50/70 border border-amber-200/70 p-4 rounded-2xl flex items-start gap-3">
                                        <Users className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-[11px] uppercase tracking-wider text-amber-900 mb-1">
                                                Ideal For
                                            </h5>
                                            <p className="text-slate-700 text-xs sm:text-[13px] font-medium leading-relaxed">
                                                {activeCategoryInfo.suitableFor}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Direct Helpline Quick Card */}
                                    <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Need Immediate Help?</span>
                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                                Online Now
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                                            Have questions about eligibility, recognized universities, fees, or examination mode?
                                        </p>
                                        <a
                                            href="tel:+916284063840"
                                            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-colors shadow-xs"
                                        >
                                            <Phone className="w-3.5 h-3.5 text-[#0066ff]" />
                                            <span>Call +91-62840 63840</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 sm:p-5 lg:p-6 border-t border-slate-100 bg-slate-50/70 rounded-b-2xl sm:rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
                            <a
                                href="tel:+916284063840"
                                className="text-xs sm:text-sm text-slate-500 font-medium hover:text-[#0066ff] flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4 text-[#0066ff]" />
                                <span>Admission Helpline: +91-62840 63840</span>
                            </a>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    onClick={closeCourseModal}
                                    className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 text-slate-600 hover:text-slate-800 rounded-xl font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => openAdvisorModal(selectedCourse.name)}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Get Admission Guidance</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Advisor / Admission Guidance Modal ── */}
            {isAdvisorModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-lg font-bold text-[#0a2540]">
                                    University Admission Guidance
                                </h3>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    Speak with an official university academic counsellor (100% Free Consultation)
                                </p>
                            </div>
                            <button
                                onClick={() => setIsAdvisorModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {formSubmitted ? (
                            <div className="p-8 text-center">
                                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-[#0a2540] mb-1">
                                    Counselling Request Registered!
                                </h4>
                                <p className="text-slate-600 text-xs max-w-sm mx-auto">
                                    Our university admissions advisor will contact you within 2 hours with verified university options, fee structures, and eligibility guidance.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="p-5 space-y-3.5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Rahul Sharma"
                                        value={advisorForm.name}
                                        onChange={(e) => setAdvisorForm({ ...advisorForm, name: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91-98765 43210"
                                            value={advisorForm.phone}
                                            onChange={(e) => setAdvisorForm({ ...advisorForm, phone: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="rahul@example.com"
                                            value={advisorForm.email}
                                            onChange={(e) => setAdvisorForm({ ...advisorForm, email: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Current Qualification
                                        </label>
                                        <select
                                            value={advisorForm.qualification}
                                            onChange={(e) => setAdvisorForm({ ...advisorForm, qualification: e.target.value })}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] bg-white"
                                        >
                                            <option value="10th Pass">10th Pass</option>
                                            <option value="12th Pass">12th Pass</option>
                                            <option value="Diploma Holder">Diploma Holder</option>
                                            <option value="Graduate">Graduate (Any Stream)</option>
                                            <option value="Working Professional">Working Professional</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Learning Mode Preference
                                        </label>
                                        <select
                                            value={advisorForm.interestedIn}
                                            onChange={(e) => setAdvisorForm({ ...advisorForm, interestedIn: e.target.value })}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff] bg-white"
                                        >
                                            <option value="Distance Learning">Distance Learning</option>
                                            <option value="Online Learning">Online Degree / Diploma</option>
                                            <option value="Working Professional Programmes">Working Professional Course</option>
                                            <option value="Vocational & Professional Education">Vocational & Paramedical</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Target Degree / Course of Interest
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., MBA, B.Sc MLT, BCA, B.Ed, M.Com..."
                                        value={advisorForm.courseName}
                                        onChange={(e) => setAdvisorForm({ ...advisorForm, courseName: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066ff]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Get Free Admission Guidance</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}



            {/* ===== EDIT PROGRAM MODAL (STAFF ONLY) ===== */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{backdropFilter:'blur(10px)', background:'rgba(0,0,0,0.55)'}}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 relative border border-purple-100 animate-in fade-in zoom-in duration-200">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
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
                                    <h3 className="text-base sm:text-lg font-bold text-[#00285e]">Edit University Program</h3>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                                        Staff Control
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500">Modify program info, degrees awarded, eligibility, and curriculum features</p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveCourseEdit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Program Discipline Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 font-semibold"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Degrees / Streams Awarded *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editFormData.degrees}
                                        onChange={(e) => setEditFormData({ ...editFormData, degrees: e.target.value })}
                                        placeholder="e.g. BBA, MBA, Executive Business"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editFormData.duration}
                                        onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                        placeholder="e.g. 2–3 Years"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Eligibility Criteria *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editFormData.eligibility}
                                        onChange={(e) => setEditFormData({ ...editFormData, eligibility: e.target.value })}
                                        placeholder="e.g. 10+2 / Graduation"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div className="sm:col-span-2 flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                                    <div>
                                        <div className="text-xs font-bold text-amber-900">Mark as Popular / Trending</div>
                                        <div className="text-[11px] text-amber-700">Display prominent gold badge on this card</div>
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
                                        Program Overview &amp; Curriculum Details *
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
                                        Curriculum Key Highlights (one per line)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={editFormData.features}
                                        onChange={(e) => setEditFormData({ ...editFormData, features: e.target.value })}
                                        placeholder="e.g. UGC Recognized&#10;Flexible Online Exams&#10;Study Material Provided"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 font-mono text-[11px]"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Image Thumbnail Path / URL
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.image}
                                        onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                                        placeholder="/university_graduates.jpg or URL"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteCourse(editingCourseIndex)}
                                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Program</span>
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
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

            {/* ===== ADD NEW PROGRAM MODAL (STAFF ONLY) ===== */}
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
                                    <h3 className="text-base sm:text-lg font-bold text-[#00285e]">Add New University Program</h3>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                        Staff Publishing
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500">Publish a new academic program to the live university catalog</p>
                            </div>
                        </div>

                        <form onSubmit={handleAddCourseSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Target Pathway Category *
                                    </label>
                                    <select
                                        value={addFormData.category}
                                        onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 font-semibold"
                                    >
                                        {universityCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Discipline Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Hospital & Healthcare Administration"
                                        value={addFormData.name}
                                        onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 font-semibold"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Degrees / Streams Awarded *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. BHA, MHA, Executive Healthcare Diplomas"
                                        value={addFormData.degrees}
                                        onChange={(e) => setAddFormData({ ...addFormData, degrees: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 1–3 Years"
                                        value={addFormData.duration}
                                        onChange={(e) => setAddFormData({ ...addFormData, duration: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Eligibility Criteria *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 12th / Any Graduate"
                                        value={addFormData.eligibility}
                                        onChange={(e) => setAddFormData({ ...addFormData, eligibility: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800"
                                    />
                                </div>

                                <div className="sm:col-span-2 flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                                    <div>
                                        <div className="text-xs font-bold text-amber-900">Mark as Popular / Trending</div>
                                        <div className="text-[11px] text-amber-700">Display prominent gold badge on this card</div>
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
                                        Program Overview &amp; Curriculum Details *
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={addFormData.details}
                                        onChange={(e) => setAddFormData({ ...addFormData, details: e.target.value })}
                                        placeholder="Describe academic curriculum, specialization options, and practical learning..."
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 resize-none"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Key Highlights (one per line)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={addFormData.features}
                                        onChange={(e) => setAddFormData({ ...addFormData, features: e.target.value })}
                                        placeholder="UGC Entitled Degree&#10;Flexible Weekend Contact Classes&#10;Continuous LMS Access"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 font-mono text-[11px]"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Image Thumbnail Path
                                    </label>
                                    <input
                                        type="text"
                                        value={addFormData.image}
                                        onChange={(e) => setAddFormData({ ...addFormData, image: e.target.value })}
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
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                                >
                                    <Plus className="w-4 h-4 stroke-[2.5]" />
                                    <span>Publish Program</span>
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

export default UniversityCourses;
