import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor, BookOpen, GraduationCap, TrendingUp,
  Users, Lightbulb, Clock, Award,
  Phone, MessageCircle, ArrowRight,
  Search, MapPin, PlayCircle, Globe,
  Pencil, Code, BarChart2, FileText,
  Calculator, Layers, Megaphone, Laptop,
  Briefcase, CheckCircle2, ChevronRight, ChevronLeft, Check, X,
  Palette, Smartphone, Settings, Sparkles, Building2, Star, Rocket,
  AlertCircle, RefreshCw
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import CourseDetailsModal from './Common/CourseDetailsModal';

// ─── Helpers & Visual Icons ──────────────────────────────────────────────────

function GradCapBooksIllustration({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="62" cy="106" rx="40" ry="6" fill="#00285e" fillOpacity="0.12" />
      <path d="M22 93 L68 107 L102 91 L56 78 Z" fill="#0f2b5c" />
      <path d="M25 89 L68 102 L98 87 L56 75 Z" fill="#f8fafc" />
      <path d="M25 89 L68 102 L68 97 L25 85 Z" fill="#e2e8f0" />
      <path d="M68 102 L98 87 L98 83 L68 97 Z" fill="#cbd5e1" />
      <path d="M27 88 L67 100" stroke="#94a3b8" strokeWidth="0.6" />
      <path d="M69 100 L96 86" stroke="#94a3b8" strokeWidth="0.6" />
      <path d="M23 85 L68 98 L100 83 L55 71 Z" fill="#1e3a8a" />
      <path d="M22 93 C20 90 20 87 23 85 L25 85 L25 93 Z" fill="#172554" />
      <path d="M24 78 L68 91 L98 77 L54 65 Z" fill="#c2410c" />
      <path d="M26 75 L68 87 L95 73 L54 62 Z" fill="#fff7ed" />
      <path d="M26 75 L68 87 L68 82 L26 71 Z" fill="#fed7aa" />
      <path d="M68 87 L95 73 L95 69 L68 82 Z" fill="#fdba74" />
      <path d="M23 79 C21 76 21 72 24 70 L26 70 L26 79 Z" fill="#9a3412" />
      <path d="M24 70 L68 82 L97 68 L54 57 Z" fill="#f97316" />
      <path d="M24 70 L68 82 L68 84 L24 72 Z" fill="#ea580c" />
      <path d="M45 53 C45 53 45 65 60 66 C75 65 75 53 75 53 Z" fill="#0f2b5c" />
      <path d="M48 53 C48 62 72 62 72 53 Z" fill="#001845" />
      <polygon points="60,24 100,38 60,52 20,38" fill="#002b66" />
      <polygon points="60,25 97,38 60,50 23,38" fill="#003882" />
      <polyline points="20,38 60,52 100,38" stroke="#0056b3" strokeWidth="1" />
      <ellipse cx="60" cy="38" rx="3.5" ry="2.2" fill="#fed000" />
      <path d="M60 38 Q72 40 78 47 Q82 53 81 60" stroke="#fed000" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <rect x="78" y="59" width="5.5" height="11" rx="1.5" fill="#fed000" />
      <path d="M78 64 L83.5 64" stroke="#d97706" strokeWidth="1" />
    </svg>
  );
}

const renderServiceIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'monitor': return <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    case 'pencil': return <Pencil className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    case 'code': return <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    case 'graduation': return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    case 'laptop': return <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    case 'smartphone': return <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    case 'globe': return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    default: return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  }
};

const renderExploreIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'code': return <Code className="w-5 h-5 stroke-[2.2]" />;
    case 'graduation': return <GraduationCap className="w-5 h-5 stroke-[2.2]" />;
    case 'building': return <Building2 className="w-5 h-5 stroke-[2.2]" />;
    case 'rocket': return <Rocket className="w-5 h-5 stroke-[2.2]" />;
    case 'briefcase': return <Briefcase className="w-5 h-5 stroke-[2.2]" />;
    default: return <Sparkles className="w-5 h-5 stroke-[2.2]" />;
  }
};

const renderWhyChooseIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'users':
    case 'faculty':
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6.5" r="3.2" />
          <path d="M12 11.2c-3.2 0-6.5 1.6-6.5 4.1v1.7h13v-1.7c0-2.5-3.3-4.1-6.5-4.1z" />
          <circle cx="4.5" cy="8" r="1.3" />
          <circle cx="19.5" cy="8" r="1.3" />
          <rect x="3.5" y="11" width="2" height="2" rx="0.5" />
          <rect x="18.5" y="11" width="2" height="2" rx="0.5" />
        </svg>
      );
    case 'laptop':
    case 'training':
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 6h-3V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2H6c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2h2v2h-2V4zm7 15H6V8h12v11z" />
          <path d="M11 16h2v-2.5h2.5v-2H13V9h-2v2.5H8.5v2H11z" />
        </svg>
      );
    case 'handshake':
    case 'partnerships':
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="2.8" />
          <path d="M12 10c-2.4 0-5 1.3-5 3.2v1.3h10v-1.3c0-1.9-2.6-3.2-5-3.2z" />
          <circle cx="6" cy="7.5" r="2.2" />
          <path d="M6 10.8c-1.8 0-3.5 1-3.5 2.3v1h2.2v-1.2c0-.7.3-1.4.9-1.9-.2-.1-.4-.2-.6-.2z" />
          <circle cx="18" cy="7.5" r="2.2" />
          <path d="M18 10.8c.2 0 .4.1.6.2.6.5.9 1.2.9 1.9v1.2H21.5v-1c0-1.3-1.7-2.3-3.5-2.3z" />
          <circle cx="8.5" cy="18" r="1.5" />
          <circle cx="15.5" cy="18" r="1.5" />
          <rect x="10" y="17.2" width="4" height="1.6" rx="0.5" />
        </svg>
      );
    case 'briefcase':
    case 'placement':
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="7.5" cy="6.8" r="3" />
          <path d="M7.5 11.5c-2.8 0-5.8 1.4-5.8 3.8v2.2h11.6v-2.2c0-2.4-3-3.8-5.8-3.8z" />
          <circle cx="17.5" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.5" cy="8" r="1.8" />
          <path d="M17.5 2.2v2M17.5 11.8v2M11.8 8h2M21.2 8h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'clock':
    case 'flexible':
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v2H5v9H3V5zm16 4H8c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zm-6 8v-5l4.5 2.5L13 17z" />
          <path d="M6.5 2.5a1 1 0 0 0 0 2H8L5.7 6.8a1 1 0 1 0 1.4 1.4L9.4 5.9V7.5a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1h-4zm11 19a1 1 0 0 0 0-2H16l2.3-2.3a1 1 0 1 0-1.4-1.4l-2.3 2.3v-1.6a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1h4z" />
        </svg>
      );
    case 'building':
    case 'infrastructure':
    default:
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#003882] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 3h7v18H4V3zm9 4h7v14h-7V7zM6 5v2h3V5H6zm0 4v2h3V9H6zm0 4v2h3v-2H6zm0 4v2h3v-2H6zm9-6v2h3v-2h-3zm0 4v2h3v-2h-3zm0 4v2h3v-2h-3z" />
        </svg>
      );
  }
};

const renderImpactIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'cap':
      return (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'users':
      return (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'target':
      return (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'award':
    default:
      return (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
  }
};

const resolveHeroImageUrl = (img) => {
  if (!img) return "/hero_downloaded_bg.png";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) return img;
  const backend = import.meta.env.VITE_BACKEND_URL || "https://aayushinstitute.onrender.com";
  if (img.startsWith("/Uploads/")) return `${backend}${img}`;
  if (img.startsWith("Uploads/")) return `${backend}/${img}`;
  if (img.startsWith("/")) return img;
  return `/${img}`;
};

// ─── Main Component ─────────────────────────────────────────────────────────

export default function MainPage() {
  const navigate = useNavigate();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // STRICT RULE: All data initialized empty / null. If DB is disconnected, NO fake data is displayed!
  const [heroSettings, setHeroSettings] = useState(null);
  const [servicesList, setServicesList] = useState([]);
  const [exploreCategoriesList, setExploreCategoriesList] = useState([]);
  const [dualPromoData, setDualPromoData] = useState(null);
  const [whyChooseUsData, setWhyChooseUsData] = useState(null);
  const [impactNumbersData, setImpactNumbersData] = useState(null);
  const [popularCoursesList, setPopularCoursesList] = useState([]);
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [counsellingForm, setCounsellingForm] = useState({
    name: '',
    mobile: '',
    course: '',
    message: '',
  });
  const [counsellingSubmitted, setCounsellingSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWhyChooseModalOpen, setIsWhyChooseModalOpen] = useState(false);
  const [selectedBlogModal, setSelectedBlogModal] = useState(null);
  const [blogSlideIndex, setBlogSlideIndex] = useState(0);
  const [isBlogPaused, setIsBlogPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const blogScrollRef = useRef(null);
  const blogModalContentRef = useRef(null);

  // ── 1. Top Reading Scroll Progress ──
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── 2. Scroll Reveal Intersection Observer ──
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.04, rootMargin: '50px 0px 50px 0px' }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale');
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();
    const t1 = setTimeout(observeAll, 150);
    const t2 = setTimeout(observeAll, 600);
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale').forEach((el) => {
        el.classList.add('is-revealed');
      });
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, []);

  // ── 3. STRICT LIVE DB FETCHERS ──
  const fetchAllFromDb = async () => {
    // A. Fetch Site Settings (Hero, Services, Explore, DualPromo, WhyChooseUs, Impact)
    try {
      const res = await fetch('/api/site-settings');
      if (res.ok) {
        const json = await res.json();
        const d = json.data || json;
        if (d) {
          setIsDbConnected(true);
          if (d.heroSection) setHeroSettings(d.heroSection);
          if (Array.isArray(d.services) && d.services.length > 0) setServicesList(d.services);
          else setServicesList([]);
          if (Array.isArray(d.exploreCategories) && d.exploreCategories.length > 0) setExploreCategoriesList(d.exploreCategories);
          else setExploreCategoriesList([]);
          if (d.dualPromo) setDualPromoData(d.dualPromo);
          if (d.whyChooseUs) setWhyChooseUsData(d.whyChooseUs);
          if (d.impactNumbers) setImpactNumbersData(d.impactNumbers);
        }
      } else {
        // STRICT: DB connection down -> clear data!
        setIsDbConnected(false);
        setHeroSettings(null);
        setServicesList([]);
        setExploreCategoriesList([]);
        setDualPromoData(null);
        setWhyChooseUsData(null);
        setImpactNumbersData(null);
      }
    } catch (err) {
      setIsDbConnected(false);
      setHeroSettings(null);
      setServicesList([]);
      setExploreCategoriesList([]);
      setDualPromoData(null);
      setWhyChooseUsData(null);
      setImpactNumbersData(null);
    }

    // B. Fetch Courses from MongoDB
    try {
      const cRes = await fetch('/api/courses');
      if (cRes.ok) {
        const dbList = await cRes.json();
        if (Array.isArray(dbList) && dbList.length > 0) {
          const formatted = dbList
            .filter((c) => c.visible !== false)
            .map((c, idx) => ({
              _id: c._id,
              id: c._id || c.id || idx + 1,
              order: c.order ?? 99,
              name: c.name || c.title || 'Course',
              title: c.title || c.name || 'Course',
              subgroup: c.subgroup || c.categoryName || 'Skill Course',
              subtitle: c.oneLiner || c.description || c.subtitle || '',
              details: c.details || c.description || '',
              duration: c.duration || '3 to 6 Months',
              fees: c.fees || "₹ 45,000/-",
              scholarship: c.scholarship || "Up to 50%",
              mode: c.mode || "Classroom / Online / Hybrid",
              eligibility: c.eligibility || "10th / 12th / Graduates / Working Professionals",
              certification: c.certification || "Aayush Certified Professional",
              batchSchedule: c.batchSchedule || "Weekday & Weekend Batches",
              image: c.image || '/course_web_design.jpg',
              tags: Array.isArray(c.tags) && c.tags.length > 0 ? c.tags : (Array.isArray(c.skills) && c.skills.length > 0 ? c.skills.slice(0, 4) : ['Skill', 'Tech', 'Job-Ready']),
              skills: Array.isArray(c.skills) && c.skills.length > 0 ? c.skills : ['Hands-on Labs', 'Live Projects', 'Mentorship'],
              features: Array.isArray(c.features) && c.features.length > 0 ? c.features : [
                'Hands-on Practical Training',
                'Live Project Exposure',
                '100% Placement Assistance',
                'ISO Verified Certification'
              ],
              careerAreas: c.careerAreas || 'Software Developer, Tech Specialist',
              career: Array.isArray(c.career) ? c.career : [],
              rating: c.rating || '4.9',
              category: c.categoryId || c.category || 'professional',
              route: c.programType === 'liveproject' ? '/LiveProject' : (c.programType === 'corporate' ? '/CorporateTraining' : (c.programType === 'university' ? '/UniversityCourses' : '/Courses')),
              path: c.programType === 'liveproject' ? '/LiveProject' : (c.programType === 'corporate' ? '/CorporateTraining' : (c.programType === 'university' ? '/UniversityCourses' : '/Courses')),
              btnGrad: 'from-[#0052cc] to-[#0066ff] hover:from-[#0040a8] hover:to-[#0052cc]',
              categoryPillBg: 'bg-blue-600 text-white',
            }));
          setPopularCoursesList(formatted);
        } else {
          setPopularCoursesList([]);
        }
      } else {
        setPopularCoursesList([]);
      }
    } catch (err) {
      setPopularCoursesList([]);
    }

    // C. Fetch Testimonials from MongoDB
    try {
      const tRes = await fetch('/api/testimonials');
      if (tRes.ok) {
        const tData = await tRes.json();
        if (Array.isArray(tData) && tData.length > 0) {
          const visibleOnly = tData.filter((t) => t.visible !== false);
          const formattedT = (visibleOnly.length > 0 ? visibleOnly : tData).map((t) => {
            const rawImg = t.profileImageUrl || t.avatar || t.profileImage || '/rahul_sharma_avatar.jpg';
            let finalAvatar = rawImg;
            if (rawImg.startsWith('http://') || rawImg.startsWith('https://') || rawImg.startsWith('data:') || rawImg.startsWith('blob:')) {
              finalAvatar = rawImg;
            } else if (rawImg.startsWith('/Uploads/') || rawImg.startsWith('Uploads/') || rawImg.startsWith('/uploads/') || rawImg.startsWith('uploads/')) {
              const cleanPath = rawImg.startsWith('/') ? rawImg : `/${rawImg}`;
              const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001';
              finalAvatar = `${backendUrl}${cleanPath}`;
            } else {
              finalAvatar = rawImg.startsWith('/') ? rawImg : `/${rawImg}`;
            }

            return {
              _id: t._id,
              name: t.name || 'Student',
              role: t.designation || 'Student',
              quote: t.message || '',
              rating: Number(t.rating) || 5,
              avatar: finalAvatar,
            };
          });
          setTestimonialsList(formattedT);
        } else {
          setTestimonialsList([]);
        }
      } else {
        setTestimonialsList([]);
      }
    } catch (err) {
      setTestimonialsList([]);
    }

    // D. Fetch Blogs from MongoDB
    try {
      const bRes = await fetch('/api/blogs');
      if (bRes.ok) {
        const bData = await bRes.json();
        if (Array.isArray(bData) && bData.length > 0) {
          const formattedB = bData
            .filter((b) => b.status !== 'Draft')
            .sort((a, b) => (Number(a.displayOrder) || 999) - (Number(b.displayOrder) || 999))
            .map((b, idx) => ({
              id: b._id || b.id || idx + 1,
              _id: b._id,
              displayOrder: b.displayOrder ?? idx + 1,
              image: b.coverImage 
                ? (b.coverImage.startsWith('http') || b.coverImage.startsWith('/') 
                    ? b.coverImage 
                    : `${import.meta.env.VITE_BACKEND_URL || 'https://aayushinstitute.onrender.com'}/${b.coverImage}`)
                : '/corporate_ai.jpg',
              tag: b.tag || b.category || 'Career',
              title: b.title,
              date: b.date || '2026',
              readTime: b.readTime || '3 min read',
              author: b.author || 'Academic Advisory',
              excerpt: b.shortDescription || b.excerpt || '',
              content: b.longDescription || b.content || '',
              highlights: Array.isArray(b.highlights) && b.highlights.length > 0 ? b.highlights : [],
              relatedLink: b.relatedLink || '/Courses',
              status: b.status || 'Published'
            }));
          setBlogsList(formattedB);
        } else {
          setBlogsList([]);
        }
      } else {
        setBlogsList([]);
      }
    } catch (err) {
      setBlogsList([]);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFromDb();
    const pollTimer = setInterval(fetchAllFromDb, 4000);
    const syncAll = () => fetchAllFromDb();
    window.addEventListener('coursesUpdated', syncAll);
    window.addEventListener('testimonialsUpdated', syncAll);
    window.addEventListener('siteSettingsUpdated', syncAll);
    window.addEventListener('storage', syncAll);
    return () => {
      clearInterval(pollTimer);
      window.removeEventListener('coursesUpdated', syncAll);
      window.removeEventListener('testimonialsUpdated', syncAll);
      window.removeEventListener('siteSettingsUpdated', syncAll);
      window.removeEventListener('storage', syncAll);
    };
  }, []);

  // ── Auto-slide blogs on homepage every 3.5 seconds ──
  useEffect(() => {
    if (isBlogPaused || selectedBlogModal || blogsList.length === 0) return;
    const timer = setInterval(() => {
      if (!blogScrollRef.current) return;
      const el = blogScrollRef.current;
      const card = el.querySelector('[data-blog-card]');
      const cardWidth = card ? card.offsetWidth : 300;
      const gap = 16;
      const step = cardWidth + gap;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft + step >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        setBlogSlideIndex(0);
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
        setBlogSlideIndex((prev) => prev + 1);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isBlogPaused, selectedBlogModal, blogsList]);

  const handleNextBlogSlide = () => {
    if (!blogScrollRef.current) return;
    const el = blogScrollRef.current;
    const card = el.querySelector('[data-blog-card]');
    const cardWidth = card ? card.offsetWidth : 300;
    const gap = 16;
    const step = cardWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (el.scrollLeft + step >= maxScroll - 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
      setBlogSlideIndex(0);
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' });
      setBlogSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevBlogSlide = () => {
    if (!blogScrollRef.current) return;
    const el = blogScrollRef.current;
    const card = el.querySelector('[data-blog-card]');
    const cardWidth = card ? card.offsetWidth : 300;
    const gap = 16;
    const step = cardWidth + gap;

    if (el.scrollLeft - step <= 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
      setBlogSlideIndex(0);
    } else {
      el.scrollBy({ left: -step, behavior: 'smooth' });
      setBlogSlideIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Close blog modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedBlogModal(null);
    };
    if (selectedBlogModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlogModal]);

  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const openCourseModal = (course) => {
    setSelectedCourseDetails(course);
    setIsCourseModalOpen(true);
  };

  const closeCourseModal = () => {
    setIsCourseModalOpen(false);
    setSelectedCourseDetails(null);
  };

  const [modalForm, setModalForm] = useState({
    name: '',
    mobile: '',
    course: '',
    message: '',
  });
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const popularCoursesScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const checkScrollButtons = () => {
    if (popularCoursesScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = popularCoursesScrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  const scrollPopularCourses = (direction) => {
    if (popularCoursesScrollRef.current) {
      const cardWidth = popularCoursesScrollRef.current.firstElementChild?.clientWidth || 300;
      const scrollAmount = (cardWidth + 16) * (direction === 'left' ? -1 : 1);
      popularCoursesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 350);
    }
  };

  const handleMouseDown = (e) => {
    if (!popularCoursesScrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - popularCoursesScrollRef.current.offsetLeft);
    setHasDragged(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !popularCoursesScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - popularCoursesScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    popularCoursesScrollRef.current.scrollLeft = popularCoursesScrollRef.current.scrollLeft - walk;
    setStartX(x);
    checkScrollButtons();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  const handleCounsellingSubmit = async (e) => {
    e.preventDefault();
    if (!counsellingForm.name || !counsellingForm.mobile) return;
    setCounsellingSubmitted(true);
    try {
      await fetch('/api/inquiry/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: counsellingForm.name,
          mobileNumber: counsellingForm.mobile,
          course: counsellingForm.course,
          message: counsellingForm.message,
          source: 'Homepage Free Career Counselling Banner',
        }),
      });
    } catch (err) {
      console.warn('Counselling submission error:', err);
    }
    setTimeout(() => {
      setCounsellingSubmitted(false);
      setCounsellingForm({ name: '', mobile: '', course: '', message: '' });
    }, 4000);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.mobile) return;
    setModalSubmitted(true);
    try {
      await fetch('/api/inquiry/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: modalForm.name,
          mobileNumber: modalForm.mobile,
          course: modalForm.course,
          message: modalForm.message,
          source: 'Homepage Free Career Counselling Modal Popup',
        }),
      });
    } catch (err) {
      console.warn('Counselling submission error:', err);
    }
    setTimeout(() => {
      setModalSubmitted(false);
      setIsModalOpen(false);
      setModalForm({ name: '', mobile: '', course: '', message: '' });
    }, 3000);
  };

  // Standby mode enabled: Full page structure renders even if DB is offline

  return (
    <div className="font-sans bg-white text-gray-800 overflow-x-hidden">
      {/* ── Top Scroll Reading Progress Indicator ── */}
      <div className="scroll-progress-line" style={{ width: `${scrollProgress}%` }} />

      {/* ── Backend Standby Mode Banner (Auto-Reconnect Enabled) ── */}
      {!isDbConnected && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 border-b border-amber-300/40 px-3.5 sm:px-6 py-2 text-amber-900 text-xs sm:text-[13px] flex flex-wrap items-center justify-between gap-3 sticky top-[56px] z-40 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="font-bold text-amber-950">Backend Server Offline:</span>
            <span className="text-amber-800 hidden sm:inline">Sections standby mode me hain. Jaise hi Backend start hoga, sabhi data automatic reload ho jayega.</span>
            <span className="text-amber-800 sm:hidden">Auto-reconnecting...</span>
          </div>
          <button
            onClick={fetchAllFromDb}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-xs shadow-xs transition hover:scale-105 active:scale-95 cursor-pointer ml-auto sm:ml-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Data</span>
          </button>
        </div>
      )}

      {/* ── 1. HERO SECTION (Dynamic from MongoDB with Standby Fallback) ── */}
      {(() => {
        const defaultHero = {
          pillText: "Your Career • Our Commitment",
          titleLine1: "Upgrade Your Skills",
          titleLine2: "Build a Better Future",
          subtitle: "Aayush Institute of Professional Studies – Your trusted partner in professional education, skill development and career growth.",
          sloganLine1: "Learn",
          sloganLine2: "Practice",
          sloganLine3: "Get Placed",
          bgImage: "/hero_downloaded_bg.png",
          feature1: "Industry Aligned Courses",
          feature2: "Live Projects & Training",
          feature3: "Expert Faculty & Mentorship",
          feature4: "100% Career Support",
          primaryBtnText: "Explore Courses",
          primaryBtnLink: "/Courses",
          videoBtnText: "Watch Our Video",
          videoUrl: "https://www.youtube.com",
          counsellingTitle: "Free Career Counselling",
          counsellingSubtitle: "Know the Right Course for You",
          counsellingPoints: ["Personalised Guidance", "Course Comparison", "Career Roadmap", "100% Free Consultation"],
          counsellingBtnText: "Book Your Counselling"
        };
        const hero = heroSettings || defaultHero;
        return (
        <section className="relative overflow-hidden bg-[#e0effe] py-3 md:py-4 lg:py-5 border-b border-blue-100 min-h-[340px] md:min-h-[355px] lg:min-h-[375px] flex items-center">
          {/* Panoramic Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={resolveHeroImageUrl(hero.bgImage)}
              alt="Hero Background"
              className="w-full h-full object-cover object-[58%_center] sm:object-[58%_center] md:object-[56%_center] lg:object-[56%_top] xl:object-[center_top] hidden md:block"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-white/20 pointer-events-none hidden md:block"></div>
          </div>

          {/* Floating Handwritten Slogan */}
          <div className="absolute top-2 lg:top-2.5 left-[42%] xl:left-[45%] 2xl:left-[47%] hidden lg:block z-10 pointer-events-none text-left animate-soft-float">
            <div className="rotate-[-5deg]">
              {hero.sloganLine1 && (
                <p className="font-semibold text-lg lg:text-xl xl:text-2xl text-[#1d4ed8] leading-tight drop-shadow-xs" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
                  {hero.sloganLine1}
                </p>
              )}
              {hero.sloganLine2 && (
                <p className="font-semibold text-lg lg:text-xl xl:text-2xl text-[#1d4ed8] leading-tight drop-shadow-xs pl-2" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
                  {hero.sloganLine2}
                </p>
              )}
              {hero.sloganLine3 && (
                <p className="font-semibold text-lg lg:text-xl xl:text-2xl text-[#1d4ed8] leading-tight drop-shadow-xs pl-4" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
                  {hero.sloganLine3}
                </p>
              )}
              <div className="w-16 lg:w-20 h-1.5 bg-[#fed000] rounded-full mt-0.5 ml-2 transform -rotate-2 shadow-xs"></div>
            </div>
          </div>

          {/* Foreground Content */}
          <div className="max-w-[1440px] mx-auto px-3.5 sm:px-5 lg:px-8 xl:px-10 w-full relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 lg:gap-5">
              <div className="w-full md:w-[45%] lg:w-[46%] xl:w-[48%] flex flex-col justify-center reveal-on-scroll">
                {hero.pillText && (
                  <div className="mb-1 sm:mb-1.5">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#dbeafc] text-[#003882] font-semibold text-[10.5px] sm:text-[11.5px] px-2.5 py-0.5 rounded-full shadow-xs">
                      {hero.pillText}
                    </span>
                  </div>
                )}

                {hero.titleLine1 && (
                  <h1 className="text-2xl sm:text-3xl md:text-[23px] lg:text-[29px] xl:text-[36px] 2xl:text-[38px] font-bold text-[#00285e] leading-[1.12] tracking-tight mb-0.5">
                    {hero.titleLine1}
                  </h1>
                )}
                {hero.titleLine2 && (
                  <h2 className="text-2xl sm:text-3xl md:text-[23px] lg:text-[29px] xl:text-[36px] 2xl:text-[38px] font-bold text-[#0062ff] leading-[1.12] tracking-tight mb-1.5 sm:mb-2">
                    {hero.titleLine2}
                  </h2>
                )}

                {hero.subtitle && (
                  <p className="text-[#1e3a8a] text-xs sm:text-[12.5px] md:text-[11px] lg:text-[12px] xl:text-[13px] leading-relaxed mb-2.5 sm:mb-3 max-w-xl font-normal">
                    {hero.subtitle}
                  </p>
                )}

                {/* Mobile Image */}
                <div className="block md:hidden my-3 relative rounded-2xl overflow-hidden shadow-md border-2 border-white h-[205px] w-full">
                  <img
                    src={resolveHeroImageUrl(hero.bgImage)}
                    alt="Aayush Institute Student"
                    className="w-full h-full object-cover object-[70%_25%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e0effe]/30 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs rotate-[-3deg] border border-blue-100 z-10">
                    <span className="font-semibold text-[11px] text-[#1d4ed8]" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
                      {[hero.sloganLine1, hero.sloganLine2, hero.sloganLine3].filter(Boolean).join(' • ')}
                    </span>
                    <div className="w-12 h-1 bg-[#fed000] rounded-full mt-0.5"></div>
                  </div>
                </div>

                {/* Feature Icons Row */}
                <div className="hidden md:flex flex-row flex-nowrap items-center justify-between gap-1.5 lg:gap-2 mb-3 lg:mb-4 bg-[#c8e2fb]/90 border border-[#93c5fd] rounded-xl lg:rounded-2xl p-2 md:p-2 lg:p-2.5 xl:p-3 shadow-xs">
                  {hero.feature1 && (
                    <div className="flex items-center gap-1.5 xl:gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#002b66]" />
                      <span className="text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66]">
                        {hero.feature1}
                      </span>
                    </div>
                  )}
                  {hero.feature2 && (
                    <div className="flex items-center gap-1.5 xl:gap-2.5">
                      <Rocket className="w-4 h-4 text-[#002b66]" />
                      <span className="text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66]">
                        {hero.feature2}
                      </span>
                    </div>
                  )}
                  {hero.feature3 && (
                    <div className="flex items-center gap-1.5 xl:gap-2.5">
                      <GraduationCap className="w-4 h-4 text-[#002b66]" />
                      <span className="text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66]">
                        {hero.feature3}
                      </span>
                    </div>
                  )}
                  {hero.feature4 && (
                    <div className="flex items-center gap-1.5 xl:gap-2.5">
                      <Briefcase className="w-4 h-4 text-[#002b66]" />
                      <span className="text-[10px] lg:text-[11.5px] xl:text-[12px] font-medium text-[#002b66]">
                        {hero.feature4}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <NavLink
                    to={hero.primaryBtnLink || "/Courses"}
                    className="bg-[#00285e] hover:bg-[#003882] text-white px-3.5 sm:px-5 md:px-3.5 lg:px-6 py-1.5 sm:py-2 md:py-1.5 lg:py-2.5 rounded-full font-medium text-xs md:text-[11px] lg:text-[13px] transition-all shadow-md flex items-center gap-1.5 md:gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {hero.primaryBtnText || 'Explore Courses'} <ArrowRight className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:w-4" />
                  </NavLink>
                  {hero.videoBtnText && (
                    <button
                      onClick={() => window.open(hero.videoUrl || 'https://www.youtube.com', '_blank')}
                      className="bg-white border-2 border-[#0062ff] hover:bg-blue-50/80 text-[#00285e] px-3 sm:px-4 md:px-3 lg:px-5 py-1 sm:py-1.5 md:py-1 lg:py-2 rounded-full font-medium text-xs md:text-[11px] lg:text-[13px] transition-all shadow-xs flex items-center gap-1.5 md:gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full bg-[#0062ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <svg className="w-2 h-2 fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      {hero.videoBtnText}
                    </button>
                  )}
                </div>
              </div>

              {/* Right Floating Counselling Card */}
              <div className="hidden md:flex w-full md:w-[28%] lg:w-[26%] xl:w-[24%] justify-end flex-shrink-0 reveal-scale delay-150">
                <div className="bg-white rounded-2xl lg:rounded-3xl shadow-[0_15px_40px_-10px_rgba(0,40,94,0.25)] overflow-hidden border-[2px] lg:border-[2.5px] border-white ring-1 ring-blue-900/10 w-full max-w-[215px] lg:max-w-[245px] xl:max-w-[300px] min-h-[285px] lg:min-h-[310px] xl:min-h-[355px] flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-r from-[#ffd200] via-[#fed000] to-[#f7be00] px-3 py-2.5 md:px-3 md:py-2.5 lg:px-3.5 lg:py-3 xl:px-5 xl:py-4.5 flex items-center gap-2 md:gap-2 lg:gap-2.5 xl:gap-3.5 border-b border-amber-300/40 flex-shrink-0">
                    <div className="w-7.5 h-7.5 md:w-7.5 md:h-7.5 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 rounded-lg lg:rounded-xl bg-[#00285e] text-white flex items-center justify-center flex-shrink-0 shadow-sm transform -rotate-3">
                      <Megaphone className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5.5 xl:h-5.5 text-[#fed000]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#00285e] text-[13px] md:text-[13px] lg:text-[15px] xl:text-[19px] leading-tight tracking-tight">
                        {hero.counsellingTitle || 'Free Career Counselling'}
                      </h4>
                      <p className="text-[9.5px] md:text-[9.5px] lg:text-[11px] xl:text-[13px] font-medium text-[#00285e]/90 leading-tight mt-0.5 sm:mt-1">
                        {hero.counsellingSubtitle || 'Know the Right Course for You'}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between px-2.5 py-2.5 md:px-2.5 md:py-2.5 lg:px-3 lg:py-3 xl:px-5 xl:py-4.5 bg-white">
                    <ul className="space-y-1.5 md:space-y-1.5 lg:space-y-2 xl:space-y-4 mb-2.5 md:mb-2.5 lg:mb-3 xl:mb-5">
                      {Array.isArray(hero.counsellingPoints) && hero.counsellingPoints.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 md:gap-1.5 lg:gap-2 xl:gap-3">
                          <div className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 xl:w-5.5 xl:h-5.5 rounded-full bg-[#0052cc] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="text-[#00285e] font-medium text-[10px] md:text-[10px] lg:text-[11.5px] xl:text-[14.5px] leading-tight whitespace-nowrap">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="w-full mt-auto bg-gradient-to-r from-[#fed000] to-[#f5b800] hover:from-[#ffe14d] hover:to-[#fed000] text-[#00285e] font-semibold text-[10.5px] md:text-[10.5px] lg:text-[12px] xl:text-[14px] py-1.5 md:py-1.5 lg:py-2 xl:py-3 px-2.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1 md:gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span>{hero.counsellingBtnText || 'Book Your Counselling'}</span>
                      <ArrowRight className="w-3 h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Counselling Card */}
            <div className="block md:hidden mt-3">
              <div className="bg-white rounded-2xl shadow-[0_15px_35px_-8px_rgba(0,40,94,0.18)] overflow-hidden border border-blue-100 max-w-sm mx-auto">
                <div className="bg-gradient-to-r from-[#ffd200] via-[#fed000] to-[#f7be00] px-4 py-3 flex items-center gap-3 border-b border-amber-300/40">
                  <div className="w-9 h-9 rounded-xl bg-[#00285e] text-[#fed000] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Megaphone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#00285e] text-sm leading-tight">
                      {hero.counsellingTitle || 'Free Career Counselling'}
                    </h4>
                    <p className="text-[11px] font-medium text-[#00285e]/90 leading-tight mt-0.5">
                      {hero.counsellingSubtitle || 'Know the Right Course for You'}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 bg-white">
                  <ul className="space-y-2 mb-3.5">
                    {Array.isArray(hero.counsellingPoints) && hero.counsellingPoints.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#0052cc] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-[#00285e] font-medium text-xs">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-[#fed000] to-[#f5b800] hover:from-[#ffe14d] hover:to-[#fed000] text-[#00285e] font-semibold text-xs py-2.5 px-3 rounded-full shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
                  >
                    <span>{hero.counsellingBtnText || 'Book Your Counselling'}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        );
      })()}

      {/* ── 1.5. SERVICES STRIP CARDS (Dynamic from MongoDB) ── */}
      {servicesList && servicesList.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-3 sm:mt-4 reveal-on-scroll">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {servicesList.map((service, idx) => (
              <NavLink
                key={service._id || idx}
                to={service.linkUrl || "/Courses"}
                style={{ backgroundColor: service.cardBg || "#f0f6ff" }}
                className="rounded-xl p-3 sm:p-4 border border-blue-100/80 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    style={{ backgroundColor: service.iconBg || "#1e40af" }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                  >
                    {renderServiceIcon(service.iconType)}
                  </div>
                  <div className="min-w-0">
                    <h4
                      style={{ color: service.titleColor || "#0f2b5c" }}
                      className="font-bold text-xs sm:text-[13px] leading-snug line-clamp-1 group-hover:underline"
                    >
                      {service.title}
                    </h4>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* ── 2. EXPLORE OUR COURSES BANNER (Dynamic from MongoDB with Standby Mode) ── */}
      <section className="bg-white pt-3 pb-1 sm:pt-4 sm:pb-1.5 reveal-on-scroll">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
          <div className="bg-[#00488f] bg-gradient-to-r from-[#00488f] via-[#004080] to-[#003875] rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:py-4.5 lg:px-6 shadow-xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-4.5 pb-3 sm:pb-3.5 border-b border-white/15">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-white font-semibold text-base sm:text-lg lg:text-xl tracking-tight leading-none">
                    Explore Our
                  </span>
                  <h2 className="text-[#fed000] font-bold text-2xl sm:text-3xl lg:text-[34px] leading-none drop-shadow-xs">
                    Courses
                  </h2>
                  <span className="hidden sm:inline-flex items-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-white/15 text-blue-100 px-2.5 py-0.5 rounded-full border border-white/20 ml-1">
                    {exploreCategoriesList?.length || 0} Career Pathways
                  </span>
                </div>
                <p className="text-white/85 text-xs sm:text-[12.5px] lg:text-[13px] leading-relaxed mt-1.5 font-normal">
                  Explore professional courses, university degrees, corporate upskilling, live projects, and placement support.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0">
                <NavLink
                  to="Courses"
                  className="inline-flex items-center gap-2 bg-[#fed000] hover:bg-[#ffe14d] text-[#002b66] font-semibold text-xs sm:text-[12.5px] px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 group cursor-pointer"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                </NavLink>
              </div>
            </div>

            {/* Dynamic Category Cards or Standby Box */}
            {exploreCategoriesList && exploreCategoriesList.length > 0 ? (
              <div className={`relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(5, exploreCategoriesList.length)} gap-2.5 sm:gap-3 lg:gap-3.5`}>
                {exploreCategoriesList.map((cat, idx) => (
                  <NavLink
                    key={cat._id || idx}
                    to={cat.to || "/Courses"}
                    className={`relative rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-3.5 lg:p-3 flex flex-col md:flex-row lg:flex-col items-center md:items-center lg:items-center text-center md:text-left lg:text-center justify-between md:justify-start lg:justify-between gap-2 md:gap-3 lg:gap-0 bg-gradient-to-b ${cat.cardBg || 'from-[#eef6ff] via-[#f5f9ff] to-[#ffffff]'} border ${cat.border || 'border-blue-200/90'} shadow-xs hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer min-h-[126px] md:min-h-[82px] lg:min-h-[136px] group overflow-hidden`}
                  >
                    <div className={`w-8 sm:w-10 md:w-1.5 md:h-9 lg:w-10 lg:h-1 rounded-full bg-gradient-to-r md:bg-gradient-to-b lg:bg-gradient-to-r ${cat.topBar || 'from-[#0062ff] to-[#38bdf8]'} mb-1 md:mb-0 lg:mb-1 transition-all duration-300 group-hover:scale-110 opacity-90 flex-shrink-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:rounded-r-full lg:static lg:translate-y-0 lg:w-10 lg:h-1 lg:rounded-full`} />
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr ${cat.iconGrad || 'from-[#0052cc] to-[#0ea5e9]'} flex items-center justify-center text-white shadow-md ring-4 ring-blue-400/20 transition-transform duration-300 group-hover:scale-110 flex-shrink-0 my-0.5 md:my-0 lg:my-0.5`}>
                      {renderExploreIcon(cat.iconType)}
                    </div>
                    <div className="w-full md:flex-1 lg:w-full mt-1 md:mt-0 lg:mt-1 flex flex-col items-center md:items-start lg:items-center min-w-0">
                      <h3 className={`${cat.titleColor || 'text-[#002f6c]'} font-bold text-[10.5px] sm:text-[11.5px] md:text-[12.5px] lg:text-[11px] leading-snug mb-1 transition-colors line-clamp-2`}>
                        {cat.title}
                      </h3>
                      <span className={`${cat.badgeBg || 'bg-blue-100/90 text-[#0052cc]'} text-[8px] sm:text-[8.5px] md:text-[9.5px] lg:text-[8px] font-medium px-2 py-0.5 rounded-full leading-tight inline-block whitespace-nowrap transition-transform duration-200 group-hover:scale-105`}>
                        {cat.subtitle}
                      </span>
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <div className="relative z-10 p-6 rounded-xl bg-white/10 border border-white/20 text-center flex flex-col items-center justify-center">
                <Code className="w-8 h-8 text-amber-300 mb-2" />
                <p className="font-bold text-white text-sm mb-1">Academic Categories in Standby</p>
                <p className="text-xs text-blue-100 mb-3">Backend connect hote hi sabhi categories yahan automatically reload ho jayengi.</p>
                <button onClick={fetchAllFromDb} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#fed000] text-[#002b66] rounded-xl text-xs font-semibold hover:bg-amber-300 transition cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload Categories</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. POPULAR COURSES / PROFESSIONAL COURSES (Dynamic from MongoDB with Standby Mode) ── */}
      <section className="bg-white pt-2 pb-8 sm:pt-3 sm:pb-10 lg:pt-4 reveal-on-scroll">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0062ff] mb-1">
                POPULAR COURSES
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#00285e] leading-tight">
                <NavLink to="Courses" className="hover:text-[#0062ff] transition-colors">
                  Professional Courses
                </NavLink>
              </h2>
              <p className="text-[#3b82f6] text-xs sm:text-[13px] mt-1 font-normal">
                Gain in-demand skills with our industry-focused courses.
              </p>
            </div>

            {/* Filter Tabs & Scroll Controls */}
            {popularCoursesList && popularCoursesList.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollPopularCourses('left')}
                    disabled={!canScrollLeft}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${canScrollLeft ? 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400' : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-50'}`}
                    aria-label="Previous courses"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollPopularCourses('right')}
                    disabled={!canScrollRight}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${canScrollRight ? 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400' : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-50'}`}
                    aria-label="Next courses"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <NavLink
                  to="Courses"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0062ff] hover:text-[#00488f] transition-colors"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>
              </div>
            )}
          </div>

          {popularCoursesList && popularCoursesList.length > 0 ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => scrollPopularCourses('left')}
                disabled={!canScrollLeft}
                className={`hidden sm:flex flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#00285e] border border-blue-200 shadow-md items-center justify-center transition-all duration-200 ${
                  canScrollLeft
                    ? 'hover:bg-blue-50 hover:border-blue-400 hover:scale-105 active:scale-95 cursor-pointer opacity-100'
                    : 'opacity-25 cursor-not-allowed border-gray-200 text-gray-400'
                }`}
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div
                ref={popularCoursesScrollRef}
                onScroll={checkScrollButtons}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className={`flex-1 min-w-0 flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 pb-3 touch-pan-x select-none ${
                  isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {popularCoursesList.map((course, idx) => (
                  <div
                    key={course._id || idx}
                    onClick={() => {
                      if (hasDragged) return;
                      openCourseModal(course);
                    }}
                    className="w-[82vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)] xl:w-[calc((100%-36px)/4)] flex-shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 p-3 sm:p-3.5 flex flex-col group select-none overflow-hidden cursor-pointer"
                  >
                    <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-2 bg-slate-100 shadow-inner group/img flex-shrink-0">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/course_web_design.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none"></div>

                      {course.subgroup && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide shadow-sm flex items-center gap-1 bg-blue-600/95 text-white backdrop-blur-md border border-white/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          <span>{course.subgroup}</span>
                        </div>
                      )}

                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-900 font-extrabold text-[9px] shadow-sm flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-slate-900 stroke-none" />
                        <span>POPULAR</span>
                      </div>

                      <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white text-[9.5px] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-300" />
                        <span>{course.duration}</span>
                      </div>

                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-amber-300 text-[9.5px] font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-white">{course.rating || '4.9'}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-[#00285e] text-[13px] sm:text-[13.5px] leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-[#64748b] text-[11px] leading-snug mb-1.5 h-[30px] line-clamp-2">
                      {course.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {(course.tags || []).slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-slate-50 text-[#004bb5] border border-blue-100/70 text-[9px] font-medium px-1.5 py-0.5 rounded-md leading-tight"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {Array.isArray(course.features) && course.features.length > 0 && (
                      <div className="space-y-1 mb-2 pt-1.5 border-t border-slate-100">
                        {course.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-1.5 text-[10.5px] text-slate-600 leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 mt-auto border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-900 min-w-0 flex-1">
                        <Award className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span className="truncate" title={course.role || course.certification || 'Certified Program'}>
                          {course.role || course.certification || 'Certified Program'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCourseModal(course);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[10.5px] shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollPopularCourses('right')}
                disabled={!canScrollRight}
                className={`hidden sm:flex flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#00285e] border border-blue-200 shadow-md items-center justify-center transition-all duration-200 ${
                  canScrollRight
                    ? 'hover:bg-blue-50 hover:border-blue-400 hover:scale-105 active:scale-95 cursor-pointer opacity-100'
                    : 'opacity-25 cursor-not-allowed border-gray-200 text-gray-400'
                }`}
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-blue-50/60 border border-dashed border-blue-200 flex flex-col items-center justify-center text-center my-4">
              <BookOpen className="w-10 h-10 text-blue-600 mb-2.5" />
              <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Courses Waiting for Database</h4>
              <p className="text-xs text-slate-500 max-w-md mb-4">Backend server start hote hi sabhi MongoDB courses automatically yahan render ho jayenge.</p>
              <button onClick={fetchAllFromDb} className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition shadow-sm cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Courses</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3.5. UNIVERSITY EDUCATION & LIVE PROJECTS DUAL PROMO BANNER (Dynamic from MongoDB with Standby Mode) ── */}
      {(() => {
        const defaultDualPromo = {
          university: {
            badge: "ACADEMIC EXCELLENCE",
            title: "University Programmes",
            tagline: "Recognised & Accredited Courses",
            desc: "Pursue industry-aligned graduate and postgraduate degree programs with flexible learning modes and complete academic assistance.",
            btnText: "Explore University Programs",
            btnLink: "/UniversityCourses",
            points: [
              "UGC / AICTE Approved Curriculum",
              "Semester & Examination Support",
              "Dedicated Academic Mentors"
            ]
          },
          liveProjects: {
            badge: "HANDS-ON EXPERIENCE",
            title: "Live Industry Projects",
            desc: "Work on real-world client projects, collaborate in modern tech stacks, and build a resume-ready project portfolio.",
            btnText: "Start Your Journey",
            btnLink: "/LiveProject",
            points: [
              "Real Client Deliverables",
              "Senior Architect Mentorship",
              "Production Deployment Experience"
            ],
            image: "/laptop_live_projects.jpg"
          }
        };
        const activePromo = dualPromoData || defaultDualPromo;
        return (
        <section className="bg-white pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-3 lg:pb-10">
          <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 lg:gap-5 items-stretch">
              
              {/* Left Card: University Education */}
              <div className="xl:col-span-7 bg-[#edf6ff] border border-blue-100/90 rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 h-full">
                  <div className="w-full md:flex-1 flex flex-col items-start justify-center">
                    {activePromo.university.badge && (
                      <p className="text-[#0062ff] font-semibold text-xs sm:text-[13px] tracking-tight mb-1">
                        {activePromo.university.badge}
                      </p>
                    )}
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#00285e] leading-tight mb-1">
                      {activePromo.university.title}
                    </h3>
                    {activePromo.university.tagline && (
                      <p className="text-[#0052cc] font-medium text-xs sm:text-[13.5px] mb-2.5">
                        {activePromo.university.tagline}
                      </p>
                    )}
                    <p className="text-[#475569] text-xs sm:text-[12.5px] leading-relaxed mb-4 max-w-md font-normal">
                      {activePromo.university.desc}
                    </p>
                    <NavLink
                      to={activePromo.university.btnLink || "/UniversityCourses"}
                      className="whitespace-nowrap inline-flex items-center gap-2 bg-[#004bb5] hover:bg-[#003c94] text-white font-semibold text-xs sm:text-[13px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                    >
                      <span>{activePromo.university.btnText || "Explore University Programs"}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </NavLink>
                  </div>

                  <div className="w-full md:w-auto relative flex-shrink-0 my-1 sm:my-2">
                    <div className="bg-white rounded-2xl sm:rounded-3xl py-4.5 px-4 sm:py-5 sm:pl-5 sm:pr-22 md:pr-24 shadow-sm border border-blue-50/80 relative z-10 overflow-hidden">
                      <div className="space-y-2.5 sm:space-y-3 relative z-10">
                        {Array.isArray(activePromo.university.points) && activePromo.university.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2.5 sm:gap-3">
                            <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1.8px] border-[#0052cc] flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0052cc] stroke-[3]" />
                            </span>
                            <span className="text-[#00285e] font-medium text-xs sm:text-[12.5px] lg:text-[13px] break-words sm:whitespace-nowrap">
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="hidden sm:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 w-16 sm:w-19 pointer-events-none z-10">
                        <GradCapBooksIllustration className="w-full h-auto drop-shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card: Live Projects */}
              {activePromo.liveProjects && (
                <div className="xl:col-span-5 bg-gradient-to-r from-[#002d6b] via-[#00224f] to-[#001736] rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-md flex flex-col justify-between relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 h-full relative z-10">
                    <div className="w-full sm:w-[54%] flex flex-col items-start justify-center">
                      {activePromo.liveProjects.badge && (
                        <p className="text-[#fed000] font-semibold text-xs sm:text-[13px] tracking-tight mb-1">
                          {activePromo.liveProjects.badge}
                        </p>
                      )}
                      <h3 className="text-xl sm:text-2xl lg:text-[24px] font-bold text-white leading-tight mb-1.5">
                        {activePromo.liveProjects.title}
                      </h3>
                      <p className="text-white/80 text-[11px] sm:text-[12px] leading-snug mb-3.5 max-w-xs">
                        {activePromo.liveProjects.desc}
                      </p>

                      <div className="space-y-2 mb-4">
                        {Array.isArray(activePromo.liveProjects.points) && activePromo.liveProjects.points.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <Check className="w-3.5 h-3.5 text-white stroke-[2.5] flex-shrink-0" />
                            <span className="text-white/95 font-medium text-[11px] sm:text-[12px]">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      <NavLink
                        to={activePromo.liveProjects.btnLink || "/LiveProject"}
                        className="whitespace-nowrap inline-flex items-center gap-2 bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] font-semibold text-xs sm:text-[12.5px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{activePromo.liveProjects.btnText || "Start Your Journey"}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </NavLink>
                    </div>

                    <div className="w-full sm:w-[46%] flex items-center justify-center relative my-1 sm:my-0">
                      <div className="w-full max-w-[340px] sm:max-w-none rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-white/15 aspect-[16/10] sm:aspect-[4/3]">
                        <img
                          src={activePromo.liveProjects.image || "/laptop_live_projects.jpg"}
                          alt="Live Projects"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
        );
      })()}

      {/* ── 3.7. WHY CHOOSE US STRIP (Dynamic from MongoDB with Standby Mode) ── */}
      {(() => {
        const defaultWhyChoose = {
          subtitle: "Why Choose Us",
          title: "Aayush Institute?",
          tagline: "Because your future matters.",
          btnText: "Why Choose Us",
          features: [
            { iconType: "curriculum", line1: "Industry-Aligned", line2: "Curriculum" },
            { iconType: "mentors", line1: "Experienced", line2: "Tech Mentors" },
            { iconType: "placement", line1: "100% Placement", line2: "Assistance" },
            { iconType: "flexible", line1: "Flexible Classroom &", line2: "Online Modes" },
            { iconType: "infrastructure", line1: "Modern High-Tech", line2: "Computer Labs" },
            { iconType: "curriculum", line1: "Govt. & Industry", line2: "Recognized Certs" }
          ]
        };
        const activeWhyChoose = whyChooseUsData || defaultWhyChoose;
        return (
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-5 sm:mt-6 reveal-scale">
          <div className="bg-[#f0f6ff] border border-[#cfe1fb] rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:py-3.5 lg:px-4 shadow-xs flex flex-col lg:flex-row items-stretch">
            
            <div className="flex flex-col sm:flex-row lg:flex-col justify-between sm:items-center lg:items-start px-4 sm:px-6 py-3 lg:py-2 flex-shrink-0 lg:w-[24%] xl:w-[23%] border-b lg:border-b-0 lg:border-r border-[#cfe1fb] text-left gap-2 sm:gap-3 lg:gap-0">
              <div>
                <span className="text-[#1d5bd8] font-medium text-xs sm:text-[13.5px] tracking-tight">
                  {activeWhyChoose.subtitle || 'Why Choose Us'}
                </span>
                <h3 className="text-2xl sm:text-[27px] lg:text-[28px] font-bold text-[#00285e] leading-tight mt-0.5 mb-1 tracking-tight">
                  {activeWhyChoose.title || 'Aayush Institute?'}
                </h3>
                <p className="text-[#1d5bd8] font-medium text-xs sm:text-[13.5px] leading-tight mt-1">
                  {activeWhyChoose.tagline || 'Because your future matters.'}
                </p>
              </div>
              <button
                onClick={() => setIsWhyChooseModalOpen(true)}
                className="mt-1 sm:mt-0 lg:mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1d5bd8] hover:bg-[#00285e] text-white text-[11px] sm:text-xs font-medium transition-all shadow-2xs w-fit cursor-pointer group flex-shrink-0"
              >
                <span>{activeWhyChoose.btnText || 'Why Choose Us'}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* 6 Features */}
            <div className={`flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(6, activeWhyChoose.features.length)}`}>
              {activeWhyChoose.features.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setIsWhyChooseModalOpen(true)}
                  className={`group flex flex-col items-center justify-center text-center p-3 sm:p-3.5 lg:py-2 lg:px-2 transition-all duration-200 hover:bg-blue-100/40 rounded-xl cursor-pointer ${
                    idx % 2 !== 0 ? 'border-l border-[#cfe1fb]' : ''
                  } ${
                    idx >= 2 ? 'border-t border-[#cfe1fb]' : ''
                  } ${
                    idx >= 3 ? 'sm:border-t sm:border-[#cfe1fb]' : 'sm:border-t-0'
                  } ${
                    idx % 3 !== 0 ? 'sm:border-l sm:border-[#cfe1fb]' : 'sm:border-l-0'
                  } lg:border-t-0 ${
                    idx !== 0 ? 'lg:border-l lg:border-[#cfe1fb]' : ''
                  }`}
                >
                  <div className="mb-2 flex items-center justify-center h-8 sm:h-9">
                    {renderWhyChooseIcon(item.iconType)}
                  </div>
                  <div className="text-[#00285e] font-medium text-xs sm:text-[12.5px] leading-snug tracking-tight">
                    <span className="block">{item.line1}</span>
                    <span className="block">{item.line2}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        );
      })()}

      {/* ── 3.8. OUR IMPACT IN NUMBERS & STUDENT TESTIMONIAL (Dynamic from MongoDB with Standby Mode) ── */}
      {(() => {
        const defaultImpact = {
          title: "Our Impact in Numbers",
          image: "/students_campus_impact.png",
          sloganPart1: "Learn Today",
          sloganPart2: "Lead Tomorrow",
          stats: [
            { iconType: "cap", value: "22+", label: "Years of Excellence" },
            { iconType: "users", value: "10,000+", label: "Students Trained" },
            { iconType: "target", value: "500+", label: "Hiring Partners" },
            { iconType: "award", value: "98%", label: "Placement Rate" }
          ]
        };
        const activeImpact = impactNumbersData || defaultImpact;

        return (
          <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-4 sm:mt-5 reveal-on-scroll">
            <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-4.5">
            
            {/* Left Block: Image + Impact in Numbers */}
            {true && (
              <div className="w-full lg:flex-1 bg-[#00285e] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch">
                <div className="w-full md:w-[34%] lg:w-[32%] relative min-h-[160px] sm:min-h-[200px] md:min-h-[230px] flex-shrink-0">
                  <img
                    src={activeImpact.image || "/students_campus_impact.png"}
                    alt="Aayush Institute Students"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 p-4 sm:p-5 lg:py-4.5 lg:px-5 flex flex-col justify-between text-white">
                  <div>
                    <h4 className="text-white font-semibold text-base sm:text-[17px] tracking-tight mb-3">
                      {activeImpact.title || 'Our Impact in Numbers'}
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                      {activeImpact.stats.map((st, sIdx) => (
                        <div key={sIdx} className="bg-[#001c44]/80 border border-white/10 rounded-xl p-2.5 sm:py-3 sm:px-2 flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-[1.02]">
                          <div className="text-blue-200 mb-1">
                            {renderImpactIcon(st.iconType)}
                          </div>
                          <span className="font-bold text-lg sm:text-xl lg:text-[22px] text-white leading-tight">
                            {st.value}
                          </span>
                          <span className="text-blue-200/90 font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5">
                            {st.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3.5 pt-1 flex items-center justify-center gap-1.5 select-none">
                    <span className="italic font-medium text-white text-sm sm:text-base tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                      {activeImpact.sloganPart1 || 'Learn Today'}
                    </span>
                    <span className="font-medium text-white text-xs sm:text-sm mx-0.5">→</span>
                    <span className="relative inline-block italic font-medium text-white text-sm sm:text-base tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                      {activeImpact.sloganPart2 || 'Lead Tomorrow'}
                      <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-[#fed000] overflow-visible" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                        <path d="M2 7 C 30 2, 70 2, 118 6 C 80 10, 40 9, 2 7 Z" fill="#fed000" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Right Block: Student Testimonials (Strictly from MongoDB) */}
            {testimonialsList?.length > 0 && (
              <div className="w-full lg:w-[32%] xl:w-[29%] bg-gradient-to-b from-white via-white to-blue-50/40 border border-blue-100/90 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  {(() => {
                    const currentT = testimonialsList[activeTestimonialIdx % testimonialsList.length];
                    const starCount = Math.min(5, Math.max(1, Number(currentT.rating) || 5));
                    return (
                      <>
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                              <h4 className="text-[#00285e] font-bold text-sm sm:text-[15px] tracking-tight">
                                What Our Students Say
                              </h4>
                            </div>
                            <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">
                              {[...Array(starCount)].map((_, sIdx) => (
                                <Star key={sIdx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                              <span className="text-[10px] font-bold text-amber-800 ml-1">{starCount}.0</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5 my-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-blue-50 shadow-2xs">
                            <span className="text-amber-500 text-2xl sm:text-3xl font-serif font-black leading-none select-none flex-shrink-0 opacity-80">
                              “
                            </span>
                            <p className="text-[#334155] text-xs sm:text-[12.5px] leading-relaxed italic font-normal">
                              {currentT.quote}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex items-center gap-3 mb-3 bg-blue-50/50 p-2 rounded-xl border border-blue-100/60">
                            <div className="relative shrink-0">
                              <img
                                src={currentT.avatar}
                                alt={currentT.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                                onError={(e) => { e.currentTarget.src = '/rahul_sharma_avatar.jpg'; }}
                              />
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                            </div>
                            <div className="min-w-0">
                              <h5 className="font-extrabold text-[#00285e] text-xs sm:text-[13px] leading-tight truncate">
                                {currentT.name}
                              </h5>
                              <p className="text-[#64748b] font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5 truncate">
                                {currentT.role}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-1.5">
                              {testimonialsList.map((_, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  onClick={() => setActiveTestimonialIdx(dotIdx)}
                                  aria-label={`Go to testimonial ${dotIdx + 1}`}
                                  className={`transition-all rounded-full cursor-pointer ${
                                    (activeTestimonialIdx % testimonialsList.length) === dotIdx
                                      ? 'w-5 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500'
                                      : 'w-1.5 h-1.5 bg-blue-200 hover:bg-blue-300'
                                  }`}
                                />
                              ))}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setActiveTestimonialIdx((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length)}
                                aria-label="Previous Testimonial"
                                className="w-7 h-7 rounded-full border border-blue-200 text-[#00285e] hover:bg-blue-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                              >
                                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsList.length)}
                                aria-label="Next Testimonial"
                                className="w-7 h-7 rounded-full border border-blue-200 text-[#00285e] hover:bg-blue-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                              >
                                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

          </div>
        </div>
        );
      })()}

      {/* ── 3.9. FREE CAREER COUNSELLING BOOKING STRIP ── */}
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-5 sm:mt-6">
        <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-blue-100/90 shadow-sm bg-[#e8f3fe]">
          <img
            src="/free_career_bg.png"
            alt="Free Career Counselling Background"
            className="hidden xl:block absolute inset-0 w-full h-full object-cover object-left pointer-events-none z-0"
          />
          <div className="block xl:hidden absolute inset-0 bg-[#e0effe] bg-gradient-to-br from-[#d9ebfd] via-[#e5f2fe] to-[#edf6fe] z-0 pointer-events-none" />

          <div className="relative z-10 p-3 sm:p-5 lg:p-6 flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4 xl:gap-4">
            <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-3.5 md:gap-4 lg:gap-6 xl:contents">
              <div className="w-full md:w-[45%] lg:w-[45%] xl:w-[42%] flex flex-row xl:flex-col items-center xl:items-start text-left xl:pl-[305px] gap-2.5 sm:gap-3.5 md:gap-3 lg:gap-4 xl:gap-0 flex-shrink-0">
                <div className="block xl:hidden flex-shrink-0">
                  <img
                    src="/career_counselling_girl.png"
                    alt="Free Career Counselling Student"
                    className="h-[120px] sm:h-[150px] md:h-[160px] lg:h-[185px] w-auto object-contain select-none pointer-events-none drop-shadow-sm"
                  />
                </div>

                <div className="flex flex-col items-start justify-center flex-1">
                  <div className="relative inline-block mb-1 -translate-y-1 sm:-translate-y-1.5 xl:-translate-y-2.5 select-none -rotate-[4deg] sm:-rotate-[6deg] xl:-rotate-[12deg] transform origin-center">
                    <span className="relative z-10 text-white font-extrabold text-[12px] sm:text-[14px] xl:text-[18px] px-2.5 py-0.5 tracking-tight uppercase">
                      FREE CAREER
                    </span>
                  </div>
                  <h4 className="text-[#00285e] font-bold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight tracking-tight mb-1 sm:mb-1.5">
                    Guidance &amp; Counselling
                  </h4>
                  <p className="text-[#00285e]/80 font-normal text-xs sm:text-[12.5px] leading-snug mb-2 sm:mb-2.5 max-w-xs">
                    Get personalised course recommendations directly from our experienced faculty advisors.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="hidden sm:inline-flex xl:inline-flex whitespace-nowrap items-center gap-1.5 bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] font-semibold text-[11px] sm:text-xs lg:text-[13px] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xs hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.8]" />
                  </button>
                </div>
              </div>

              <div className="w-full md:w-[54%] lg:w-[53%] xl:flex-1 bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4 lg:p-5 shadow-sm border border-blue-50/90 flex-shrink-0 flex flex-col justify-center">
                <h4 className="text-[#00285e] font-semibold text-xs sm:text-sm lg:text-base tracking-tight mb-2 sm:mb-2.5">
                  Book Your Free Career Counselling
                </h4>

                {counsellingSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-center text-xs font-medium py-6">
                    🎉 Thank you! Our career counsellor will contact you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleCounsellingSubmit} className="space-y-2 sm:space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      <div>
                        <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={counsellingForm.name}
                          onChange={(e) => setCounsellingForm({ ...counsellingForm, name: e.target.value })}
                          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60"
                        />
                      </div>

                      <div>
                        <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Enter mobile number"
                          value={counsellingForm.mobile}
                          onChange={(e) => setCounsellingForm({ ...counsellingForm, mobile: e.target.value })}
                          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60"
                        />
                      </div>

                      <div>
                        <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                          Select Course <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={counsellingForm.course}
                          onChange={(e) => setCounsellingForm({ ...counsellingForm, course: e.target.value })}
                          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60 text-slate-700"
                        >
                          <option value="">Select Course</option>
                          {popularCoursesList.map((c, cIdx) => (
                            <option key={cIdx} value={c.title || c.name}>
                              {c.title || c.name}
                            </option>
                          ))}
                          <option value="Other Course">Other Course</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#00285e] font-medium text-[10.5px] sm:text-[11px] mb-0.5 sm:mb-1">
                          Message
                        </label>
                        <input
                          type="text"
                          placeholder="Type your message..."
                          value={counsellingForm.message}
                          onChange={(e) => setCounsellingForm({ ...counsellingForm, message: e.target.value })}
                          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/60"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#003882] hover:bg-[#00285e] text-white font-semibold text-xs sm:text-[12.5px] py-2 sm:py-2.5 rounded-lg shadow-sm transition-all hover:shadow flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                    >
                      <span>Submit Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="hidden xl:block w-[2px] self-stretch my-2 bg-gradient-to-b from-sky-400/10 via-[#0060f0] via-[#003882] to-sky-300/10 rounded-full flex-shrink-0 mx-2 shadow-[0_0_8px_rgba(0,96,240,0.3)]" />

            <div className="w-full xl:w-[20%] grid grid-cols-2 sm:grid-cols-4 xl:flex xl:flex-col justify-between items-center gap-2 sm:gap-3 bg-white/85 xl:bg-transparent backdrop-blur-xs p-2.5 sm:p-3 xl:p-0 rounded-xl border border-blue-100/70 xl:border-none shadow-xs xl:shadow-none flex-shrink-0 mt-2 sm:mt-2.5 xl:mt-0">
              {[
                { title: 'Career Guidance', icon: <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" /> },
                { title: 'Course Selection', icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" /> },
                { title: 'Expert Counsellors', icon: <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" /> },
                { title: '100% Free Service', icon: <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0052cc] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-[#00285e] font-semibold text-[11px] sm:text-xs lg:text-[13px] leading-tight">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3.10. LATEST UPDATES & BLOGS (Dynamic from MongoDB with Standby Mode) ── */}
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 mt-6 sm:mt-7 reveal-on-scroll">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3.5 sm:mb-4 px-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Knowledge Hub &amp; Insights
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#00285e] leading-tight tracking-tight">
              Latest Updates &amp; Blogs
            </h3>
            <p className="text-[#1d5bd8] font-normal text-xs sm:text-[13px] leading-tight mt-0.5">
              Stay informed with the latest trends, career roadmaps, and industry skills.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {blogsList && blogsList.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevBlogSlide}
                  className="w-8 h-8 rounded-full border border-blue-200 bg-white hover:bg-blue-50 text-[#00285e] flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                  title="Previous blog"
                  aria-label="Previous blog"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                </button>
                <button
                  type="button"
                  onClick={handleNextBlogSlide}
                  className="w-8 h-8 rounded-full border border-blue-200 bg-white hover:bg-blue-50 text-[#00285e] flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                  title="Next blog"
                  aria-label="Next blog"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </>
            )}

            <NavLink
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-[#0052cc] hover:text-[#00285e] font-semibold text-xs sm:text-[13px] transition-colors group ml-2 px-3 py-1.5 rounded-xl hover:bg-blue-50/80"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </NavLink>
          </div>
        </div>

        {blogsList && blogsList.length > 0 ? (
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsBlogPaused(true)}
            onMouseLeave={() => setIsBlogPaused(false)}
            onTouchStart={() => setIsBlogPaused(true)}
            onTouchEnd={() => setIsBlogPaused(false)}
          >
            <div
              ref={blogScrollRef}
              className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1"
            >
              {blogsList.map((blog) => (
                <div
                  key={blog._id || blog.id}
                  data-blog-card
                  onClick={() => setSelectedBlogModal(blog)}
                  className="w-[82vw] sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)] flex-shrink-0 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 p-3 sm:p-3.5 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="relative h-36 rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.src = '/corporate_ai.jpg'; }}
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-blue-700 shadow-xs backdrop-blur-xs">
                        {blog.tag}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 group-hover:text-blue-700 text-xs sm:text-[13px] leading-snug line-clamp-2 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400">
                    <span>{blog.date}</span>
                    <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Read More</span>
                      <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center my-3">
            <FileText className="w-8 h-8 text-slate-400 mb-2" />
            <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">Articles Waiting for Connection</h4>
            <p className="text-xs text-slate-500 mb-3">Backend server start hone par live blogs automatically load ho jayenge.</p>
            <button onClick={fetchAllFromDb} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Blogs</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Blog Details Full Screen Modal ── */}
      {selectedBlogModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedBlogModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Article Preview
              </span>
              <button
                type="button"
                onClick={() => setSelectedBlogModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            <div
              ref={blogModalContentRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 scroll-smooth"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-slate-900">
                    <img
                      src={selectedBlogModal.image}
                      alt={selectedBlogModal.title}
                      className="w-full h-56 sm:h-64 object-cover"
                      onError={(e) => { e.currentTarget.src = '/corporate_ai.jpg'; }}
                    />
                  </div>

                  {Array.isArray(selectedBlogModal.highlights) && selectedBlogModal.highlights.length > 0 && (
                    <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-blue-50/60 rounded-2xl p-4 border border-indigo-100/90 shadow-xs space-y-2.5">
                      <div className="flex items-center gap-2 pb-2 border-b border-indigo-100/80">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-bold text-xs sm:text-sm text-[#00285e]">
                          Article Highlights
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {selectedBlogModal.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-white/90 p-2 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span className="font-medium text-[11.5px] leading-tight">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                      {selectedBlogModal.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Published {selectedBlogModal.date}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-[#00285e] leading-[1.25] tracking-tight">
                    {selectedBlogModal.title}
                  </h1>

                  {selectedBlogModal.excerpt && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-400/10 to-blue-500/10 border-l-4 border-amber-400 shadow-xs">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed">
                        "{selectedBlogModal.excerpt}"
                      </p>
                    </div>
                  )}

                  <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3.5 font-normal pt-1">
                    <p className="text-slate-800 leading-relaxed font-normal">
                      {selectedBlogModal.content}
                    </p>
                  </div>

                  {selectedBlogModal.relatedLink && (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-[#003882] via-[#0052cc] to-[#0070f3] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-600/20 mt-4">
                      <div>
                        <h4 className="font-extrabold text-base sm:text-lg text-white">
                          Want hands-on training in this field?
                        </h4>
                        <p className="text-xs sm:text-sm text-sky-100 mt-1">
                          Learn directly with industry mentors and guaranteed placement support.
                        </p>
                      </div>
                      <NavLink
                        to={selectedBlogModal.relatedLink}
                        onClick={() => setSelectedBlogModal(null)}
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-md transition-all whitespace-nowrap active:scale-95"
                      >
                        Explore Programs →
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
              <NavLink
                to={`/blogs?id=${selectedBlogModal.id}`}
                onClick={() => setSelectedBlogModal(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition shadow-xs cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Open in Blogs Library</span>
              </NavLink>

              <button
                type="button"
                onClick={() => setSelectedBlogModal(null)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Career Counselling Form Modal ── */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-100 overflow-hidden transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="mb-5 pr-8">
              <span className="inline-block bg-[#e0effe] text-[#0062ff] font-medium text-[11px] px-3 py-0.5 rounded-full mb-2">
                100% Free Consultation
              </span>
              <h3 className="text-[#00285e] font-bold text-xl sm:text-2xl tracking-tight leading-tight">
                Book Your Free Career Counselling
              </h3>
              <p className="text-slate-500 text-xs sm:text-[13px] mt-1">
                Get expert guidance and choose the right course for your career goals.
              </p>
            </div>

            {modalSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-semibold text-base mb-1">Enquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700 font-medium">
                  Our career counsellor will contact you shortly to guide you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter mobile number"
                      value={modalForm.mobile}
                      onChange={(e) => setModalForm({ ...modalForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Select Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={modalForm.course}
                      onChange={(e) => setModalForm({ ...modalForm, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors text-slate-700"
                    >
                      <option value="">Select Course</option>
                      {popularCoursesList.map((c, idx) => (
                        <option key={idx} value={c.title || c.name}>
                          {c.title || c.name}
                        </option>
                      ))}
                      <option value="Other Course">Other Course</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#00285e] font-medium text-xs mb-1.5">
                      Message
                    </label>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={modalForm.message}
                      onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] rounded-xl border border-slate-200 focus:border-[#0052cc] focus:bg-white focus:outline-none bg-slate-50/70 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[#003882] hover:bg-[#00285e] text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── WHY CHOOSE US ECOSYSTEM MODAL (Dynamic from MongoDB) ── */}
      {isWhyChooseModalOpen && whyChooseUsData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-100 relative text-slate-800">
            <button
              onClick={() => setIsWhyChooseModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 hover:bg-white shadow-md transition-colors cursor-pointer border border-slate-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-br from-[#00285e] via-[#004b93] to-[#0066ff] p-6 sm:p-8 md:p-10 text-white relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl text-center">
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                {whyChooseUsData.modalHeader?.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-medium mb-3 border border-white/20 backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{whyChooseUsData.modalHeader.badge}</span>
                  </div>
                )}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {whyChooseUsData.modalHeader?.title || "WHY CHOOSE US"}
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg text-blue-100 font-semibold mb-3 max-w-xl">
                  {whyChooseUsData.modalHeader?.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl font-normal">
                  {whyChooseUsData.modalHeader?.desc}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7 md:p-8 space-y-8">
              {/* Pillars */}
              {Array.isArray(whyChooseUsData.pillars) && whyChooseUsData.pillars.length > 0 && (
                <div>
                  <div className="text-center mb-5">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#0066ff] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      Core Institutional Pillars
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-[#00285e] mt-2">
                      A Complete Learning &amp; Career Ecosystem
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {whyChooseUsData.pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50/70 hover:bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          {pillar.badge && (
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                                {pillar.badge}
                              </span>
                            </div>
                          )}
                          <h5 className="text-xs sm:text-[13px] font-semibold text-[#00285e] mb-1.5 leading-snug">
                            {pillar.title}
                          </h5>
                          <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Steps */}
              {Array.isArray(whyChooseUsData.steps) && whyChooseUsData.steps.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50/50 rounded-2xl p-5 sm:p-6 border border-blue-100">
                  <div className="text-center mb-5">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-200">
                      OUR KEY DIFFERENCE
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-[#00285e] mt-2">
                      Learn. Practice. Experience. Progress.
                    </h4>
                  </div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(5, whyChooseUsData.steps.length)} gap-3`}>
                    {whyChooseUsData.steps.map((diff, dIdx) => (
                      <div
                        key={dIdx}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold text-[#0066ff] block mb-1">
                            {diff.step}
                          </span>
                          <h6 className="text-xs font-semibold text-[#00285e] mb-1">
                            {diff.title}
                          </h6>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {diff.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action bar inside modal */}
              <div className="bg-gradient-to-r from-[#00285e] to-[#004b93] rounded-2xl p-5 sm:p-7 text-white text-center">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  A PARTNER IN YOUR LEARNING JOURNEY
                </h4>
                <p className="text-xs sm:text-[13px] text-blue-100 max-w-2xl mx-auto leading-relaxed mb-5">
                  Aayush Institute of Professional Studies provides career pathways and dedicated support designed around your future.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                  <NavLink
                    to="/Courses"
                    onClick={() => setIsWhyChooseModalOpen(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-[#00285e] font-medium text-xs hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    Explore Courses
                  </NavLink>
                  <NavLink
                    to="/UniversityCourses"
                    onClick={() => setIsWhyChooseModalOpen(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-medium text-xs transition-colors shadow-sm"
                  >
                    Explore University Programmes
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsWhyChooseModalOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/25 transition-colors cursor-pointer"
                  >
                    Get Career Guidance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COURSE DETAILS MODAL ── */}
      <CourseDetailsModal
        isOpen={isCourseModalOpen}
        course={selectedCourseDetails}
        onClose={closeCourseModal}
        onSelectCourse={(c) => setSelectedCourseDetails(c)}
      />
    </div>
  );
}
