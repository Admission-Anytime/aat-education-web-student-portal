import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Copy,
  Check,
  Phone,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

// Static fallback blogs matching MainPage & Backend default seeds
const FALLBACK_BLOGS = [
  {
    id: 101,
    displayOrder: 1,
    image: "/blog_it_skills.jpg",
    coverImage: "/blog_it_skills.jpg",
    tag: "Career Tips",
    category: "Blogs",
    title: "Top IT Skills in 2026 That Can Boost Your Career",
    date: "12 Sep 2025",
    readTime: "4 min read",
    author: "Tech Training Cell",
    excerpt: "Discover the most in-demand software skills — Full Stack development, Cloud services, and AI workflows — to fast-track your tech career.",
    content: `The modern tech landscape is evolving at a breakneck speed. Organizations across the globe are no longer just hiring programmers—they are actively looking for problem solvers who can navigate full-cycle software product engineering, from responsive frontend interfaces to scalable backend APIs and cloud-ready architectures.

### Why Full Stack & AI Skills Are In High Demand
Full stack developers with familiarity in AI-augmented development (such as GitHub Copilot, Cursor, and LLM APIs) command premium salaries because they can deliver features twice as fast. Rather than maintaining separate teams for small iterations, high-growth startups and tech giants prefer engineers who understand:
- **Component-Driven Frontend**: React 19, Next.js, and TypeScript for fluid user experiences.
- **Robust API Architectures**: Express.js, FastAPI, and modular REST/GraphQL endpoints.
- **Relational & NoSQL Databases**: PostgreSQL, MongoDB, and Redis caching.
- **Containerization & CI/CD**: Docker, GitHub Actions, and cloud deployment pipelines.

### Practical Learning vs. Passive Watching
Passive video tutorials often give learners a false sense of mastery until they encounter real production bugs. At Aayush Institute of Professional Studies, every module is structured around daily live coding, peer pull-request reviews, and agile sprints simulating genuine software house environments.

### Career Roadmap for 2026
1. **Master Core Fundamentals**: Do not skip HTML5, CSS Grid/Flexbox, and Modern ES6+ JavaScript.
2. **Build Non-Trivial Projects**: Avoid generic todo lists; build full multi-user SaaS platforms, ERP portals, or e-commerce engines.
3. **Contribute to Open Source & GitHub**: Showcase your code publicly with clean commit histories and verified documentation.
4. **Prepare for Technical Interviews**: Practice data structures, system design basics, and mock HR rounds.`,
    highlights: [
      "Master MERN (MongoDB, Express, React, Node.js) with production architectures",
      "Hands-on Git/GitHub collaboration, branching strategies & CI/CD workflows",
      "API integrations with AI models, cloud storage & secure authentication",
      "100% placement assistance with mock technical & HR interview rounds"
    ],
    relatedLink: "/it-stack-development"
  },
  {
    id: 102,
    displayOrder: 2,
    image: "/blog_distance_edu.jpg",
    coverImage: "/blog_distance_edu.jpg",
    tag: "Education",
    category: "Blogs",
    title: "Benefits of Distance Education for Working Professionals",
    date: "10 Sep 2025",
    readTime: "3 min read",
    author: "Academic Advisory",
    excerpt: "Learn how UGC-DEB entitled online degrees empower working adults to earn accredited qualifications without quitting their day jobs.",
    content: `Balancing career growth with higher academic credentials has historically been a struggle for employed individuals. With the modern expansion of UGC-DEB entitled distance and online university programmes, working adults now have a verified, government-recognized pathway to upgrade their academic standing.

### Why Pursue Online & Distance Degrees?
1. **Flexibility Without Career Interruption**: Maintain your current job and regular income while attending weekend virtual lectures and self-paced modules.
2. **Accredited Credentials**: Degrees from UGC-DEB recognized universities hold equal weight for government jobs, corporate appraisals, and overseas immigration.
3. **Cost-Effective Higher Education**: Distance education significantly reduces tuition and eliminates campus accommodation and commute expenses.

### Popular Programmes at Aayush Institute
- **BCA & MCA**: Ideal for tech aspirants seeking accredited computer science credentials.
- **BBA & MBA**: Tailored for working executives aiming for leadership and managerial positions.
- **B.Com & M.Com**: Tailored for finance and accounting professionals.

Our dedicated student advisory team provides end-to-end guidance from university admissions, study material distribution, and internal assignment tracking to semester examinations.`,
    highlights: [
      "UGC-DEB recognized degree credentials valid worldwide",
      "Self-paced learning supported by weekend live faculty doubt classes",
      "Cost-effective fee structures with convenient installment / EMI options",
      "Eligible for corporate promotions, MNC eligibility & government exams"
    ],
    relatedLink: "/UniversityCourses"
  },
  {
    id: 103,
    displayOrder: 3,
    image: "/blog_internships.jpg",
    coverImage: "/blog_internships.jpg",
    tag: "Internship",
    category: "Blogs",
    title: "How Internships Help You Get Hired Faster",
    date: "08 Sep 2025",
    readTime: "3 min read",
    author: "Placement Cell",
    excerpt: "Real-world project experience bridges the gap between classroom concepts and high-velocity corporate engineering standards.",
    content: `A common hurdle faced by fresh graduates is the classic paradox: "You need experience to get a job, but you need a job to get experience." Internships and live client projects are the single most effective way to eliminate this roadblock.

### The Real Impact of Live Project Exposure
When recruiters evaluate hundreds of candidate resumes, theoretical knowledge on a sheet of paper looks identical across applicants. What immediately stands out is concrete evidence of real-world contribution:
- Real commits on shared repositories.
- Understanding agile standups, bug tracking, and sprint deadlines.
- Deploying working applications to accessible live URLs.

### From Internship to Pre-Placement Offer (PPO)
At Aayush Institute, live project internships connect students directly with industry mentors. Students solve actual business briefs, receive weekly architectural feedback, and build a verified portfolio. Over 65% of students demonstrating consistent performance during our live projects receive pre-placement offers before completing their diplomas.`,
    highlights: [
      "Work directly on live client deliverables, prototypes & scalable databases",
      "Mentorship from experienced senior tech leads with 1-on-1 code reviews",
      "Build a verified GitHub repository & live portfolio website",
      "Official certificate of completion, letter of recommendation & placement drives"
    ],
    relatedLink: "/LiveProject"
  },
  {
    id: 104,
    displayOrder: 4,
    image: "/blog_future_ai.jpg",
    coverImage: "/blog_future_ai.jpg",
    tag: "Technology",
    category: "Blogs",
    title: "The Future of AI & How It's Changing the Job Market",
    date: "05 Sep 2025",
    readTime: "4 min read",
    author: "AI Innovation Lab",
    excerpt: "Artificial intelligence is reshaping everyday workflows. Learn how developers and creators can leverage AI to multiply their output.",
    content: `Artificial intelligence is fundamentally revolutionizing every sector of the global economy. However, the common narrative that "AI will replace all developers" misses the essential reality: developers and creators who master AI tools will replace those who do not.

### How AI Is Transforming Daily Workflows
- **Autonomous Code Generation**: Leveraging LLM APIs to scaffold boilerplate logic, unit tests, and regex expressions in seconds.
- **Intelligent Customer Interfaces**: Embedding customized knowledge-base chatbots and conversational agents into business portals.
- **Automated Data Processing**: Analyzing customer behavior, predictive metrics, and reporting without complex manual scripts.

### Staying Ahead in 2026
To remain indispensable, professionals must move beyond simple surface-level prompts. Understanding model integration, vector embeddings, prompt engineering, and ethical AI deployment ensures you remain at the top tier of technical leadership.`,
    highlights: [
      "Integrating LLM APIs & automated generative AI workflows into production apps",
      "Copilot-assisted rapid application development and automated testing",
      "Data analysis, visualization & business intelligence using modern AI models",
      "Future-proofing technical career skills for high-paying next-generation roles"
    ],
    relatedLink: "/Courses"
  },
  {
    id: 105,
    displayOrder: 5,
    image: "/blog_it_skills.jpg",
    coverImage: "/blog_it_skills.jpg",
    tag: "Web Development",
    category: "Blogs",
    title: "Full Stack Roadmap 2026: Frontend, Backend & System Design",
    date: "01 Oct 2025",
    readTime: "5 min read",
    author: "Full Stack Department",
    excerpt: "Everything you need to know about mastering React 19, Node.js, databases, and modern cloud deployment in 2026.",
    content: `Full stack development continues to be the foundation of digital innovation. In 2026, the expectations from full stack developers have expanded to include server components, edge rendering, containerization, and system design fundamentals.

Whether you are starting from zero or transitioning from another domain, having a structured step-by-step roadmap will save you months of directionless learning. Join our guided mentorship at Aayush Institute to master every phase with hands-on labs and direct mentor assistance.`,
    highlights: [
      "Modern React 19, Next.js & TypeScript architectures",
      "PostgreSQL, MongoDB, and Redis caching layers",
      "Dockerizing applications & scalable cloud deployments",
      "100% placement track with top tech firms and IT service consultancies"
    ],
    relatedLink: "/it-stack-development"
  },
  {
    id: 106,
    displayOrder: 6,
    image: "/blog_distance_edu.jpg",
    coverImage: "/blog_distance_edu.jpg",
    tag: "Design & UX",
    category: "Blogs",
    title: "Mastering UI/UX: From User Research to High-Converting Interfaces",
    date: "28 Sep 2025",
    readTime: "4 min read",
    author: "Design Studio Lead",
    excerpt: "Explore the core fundamentals of UX research, Figma design systems, and rapid prototyping that employers look for.",
    content: `A stunning website with poor usability will fail to convert, while an intuitive, human-centered product creates lasting customer loyalty. Great UI/UX design is not merely decoration—it is the strategic bridge between business goals and human psychology.

Learn how to master Figma, user research, wireframing, interactive prototyping, and design systems in our comprehensive UI/UX Design course at Aayush Institute.`,
    highlights: [
      "Figma components, variants, auto-layout & token design systems",
      "User research, empathy maps, journey flows & usability testing methods",
      "Building production-ready responsive mobile and web interfaces",
      "Live client design reviews & industry-ready portfolio creation"
    ],
    relatedLink: "/ui-ux-design"
  }
];

// WhatsApp Icon SVG Component
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

// Vibrant color theme mapping based on tag
const getTagTheme = (tag = '') => {
  const t = String(tag).toLowerCase();
  if (t.includes('ai') || t.includes('tech')) {
    return {
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      heroOverlay: 'from-cyan-900/40 via-blue-900/30 to-slate-900',
      accentColor: 'text-cyan-600',
      borderGlow: 'border-cyan-300',
      lightBg: 'bg-gradient-to-br from-cyan-50/80 via-blue-50/50 to-white'
    };
  }
  if (t.includes('intern') || t.includes('place') || t.includes('job')) {
    return {
      gradient: 'from-purple-500 via-violet-600 to-indigo-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      heroOverlay: 'from-purple-900/40 via-violet-900/30 to-slate-900',
      accentColor: 'text-purple-600',
      borderGlow: 'border-purple-300',
      lightBg: 'bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-white'
    };
  }
  if (t.includes('education') || t.includes('degree') || t.includes('univ')) {
    return {
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      heroOverlay: 'from-emerald-900/40 via-teal-900/30 to-slate-900',
      accentColor: 'text-emerald-600',
      borderGlow: 'border-emerald-300',
      lightBg: 'bg-gradient-to-br from-emerald-50/80 via-teal-50/50 to-white'
    };
  }
  if (t.includes('design') || t.includes('ui') || t.includes('ux') || t.includes('web')) {
    return {
      gradient: 'from-rose-500 via-pink-600 to-purple-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      heroOverlay: 'from-rose-900/40 via-pink-900/30 to-slate-900',
      accentColor: 'text-rose-600',
      borderGlow: 'border-rose-300',
      lightBg: 'bg-gradient-to-br from-rose-50/80 via-pink-50/50 to-white'
    };
  }
  return {
    gradient: 'from-amber-500 via-orange-500 to-pink-500',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    heroOverlay: 'from-amber-900/40 via-orange-900/30 to-slate-900',
    accentColor: 'text-amber-600',
    borderGlow: 'border-amber-300',
    lightBg: 'bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-white'
  };
};

const resolveImageUrl = (img) => {
  if (!img) return '/corporate_ai.jpg';
  if (img.startsWith('http') || img.startsWith('data:')) return img;
  const backend = import.meta.env.VITE_BACKEND_URL || 'https://aayushinstitute.onrender.com';
  if (img.startsWith('/Uploads/') || img.startsWith('/uploads/')) return `${backend}${img}`;
  if (img.startsWith('Uploads/') || img.startsWith('uploads/')) return `${backend}/${img}`;
  if (img.startsWith('/')) return img;
  return `/${img}`;
};

// Helper: Render inline markdown bold **text** cleanly
const renderInlineMarkdown = (text) => {
  if (!text) return '';
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-800">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Clean Formatted Content Parser (Headings, Paragraphs, Lists with light font weight)
const renderFormattedContent = (content) => {
  if (!content) return null;

  // HTML content from CKEditor
  if (/<\/?[a-z][\s\S]*>/i.test(content)) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="space-y-4 font-normal text-slate-600 leading-relaxed text-[15px] sm:text-base [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-slate-900 [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:font-normal [&>p]:text-slate-600 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>li]:font-normal [&>li]:text-slate-600"
      />
    );
  }

  // Markdown line-by-line parsing
  const lines = content.split(/\r?\n/);
  const elements = [];
  let currentList = [];

  const flushList = (keyPrefix) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="space-y-2 pl-2 sm:pl-3 my-3 list-none">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-slate-600 font-normal text-[14.5px] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(index);
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList(index);
      elements.push(
        <h3 key={index} className="text-lg sm:text-xl font-semibold text-slate-900 mt-6 mb-2.5 tracking-tight">
          {trimmed.replace('### ', '')}
        </h3>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList(index);
      elements.push(
        <h2 key={index} className="text-xl sm:text-2xl font-semibold text-slate-900 mt-7 mb-3 tracking-tight">
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushList(index);
      elements.push(
        <div key={index} className="flex items-start gap-2.5 my-2 pl-1">
          <span className="font-semibold text-blue-600 text-sm mt-0.5 shrink-0">
            {trimmed.match(/^\d+\./)[0]}
          </span>
          <p className="font-normal text-slate-600 text-[14.5px] leading-relaxed">
            {renderInlineMarkdown(trimmed.replace(/^\d+\.\s*/, ''))}
          </p>
        </div>
      );
    } else {
      flushList(index);
      elements.push(
        <p key={index} className="font-normal text-slate-600 text-[14.5px] sm:text-[15px] leading-relaxed mb-3.5">
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  flushList('final');
  return <div className="space-y-1">{elements}</div>;
};

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [blog, setBlog] = useState(() => {
    if (location.state?.blog) return location.state.blog;
    const found = FALLBACK_BLOGS.find(
      (b) => String(b.id) === String(id) || String(b._id) === String(id) || String(b.displayOrder) === String(id)
    );
    return found || null;
  });

  const [allBlogs, setAllBlogs] = useState(FALLBACK_BLOGS);
  const [loading, setLoading] = useState(!blog);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // WhatsApp Hamburger Floating Menu State
  const [isWaMenuOpen, setIsWaMenuOpen] = useState(false);
  const [waNumber, setWaNumber] = useState('919311050670');
  const waMenuRef = useRef(null);

  // Forms State
  const [sidebarForm, setSidebarForm] = useState({ name: '', mobile: '' });
  const [sidebarSubmitted, setSidebarSubmitted] = useState(false);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({ name: '', mobile: '', message: '' });
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  // Close WhatsApp menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (waMenuRef.current && !waMenuRef.current.contains(e.target)) {
        setIsWaMenuOpen(false);
      }
    };
    if (isWaMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isWaMenuOpen]);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(scroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top whenever ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Fetch blog data from backend API
  useEffect(() => {
    let isMounted = true;

    // Fetch site settings to get live WhatsApp number
    fetch('/api/site-settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        const phone = data?.data?.topBar?.phone || data?.topBar?.phone || data?.data?.socialLinks?.whatsapp;
        if (phone) {
          const clean = String(phone).replace(/[^0-9]/g, '');
          if (clean) setWaNumber(clean);
        }
      })
      .catch(() => {});

    const fetchAllBlogsAndCurrent = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data
              .filter((b) => b.status !== 'Draft')
              .map((b, idx) => ({
                id: b._id || b.id || idx + 1,
                _id: b._id,
                displayOrder: b.displayOrder ?? idx + 1,
                image: resolveImageUrl(b.coverImage),
                coverImage: resolveImageUrl(b.coverImage),
                tag: b.tag || b.category || 'Career',
                category: b.category || 'Blogs',
                title: b.title,
                date: b.date || '2026',
                readTime: b.readTime || '3 min read',
                author: b.author || 'Academic Advisory',
                excerpt: b.shortDescription || b.excerpt || '',
                content: b.longDescription || b.content || '',
                highlights: Array.isArray(b.highlights) && b.highlights.length > 0 ? b.highlights : [
                  "Hands-on practical industry workflows",
                  "Direct mentor feedback & code reviews",
                  "Verified GitHub projects & portfolio",
                  "100% placement guidance & interview prep"
                ],
                relatedLink: b.relatedLink || '/Courses'
              }));

            if (isMounted) {
              setAllBlogs(formatted);

              const matched = formatted.find(
                (b) => String(b.id) === String(id) || String(b._id) === String(id) || String(b.displayOrder) === String(id)
              );
              if (matched) {
                setBlog(matched);
                setLoading(false);
                return;
              }
            }
          }
        }
      } catch (err) {
        console.warn('API fetch fallback:', err);
      }

      // Check news API if not found in blogs
      if (!blog) {
        try {
          const newsRes = await fetch(`/api/news/${id}`);
          if (newsRes.ok) {
            const newsItem = await newsRes.json();
            if (newsItem && isMounted) {
              const formattedNews = {
                id: newsItem._id || newsItem.id,
                _id: newsItem._id,
                title: newsItem.title,
                tag: newsItem.category || 'Announcements',
                category: newsItem.category || 'Announcements',
                image: resolveImageUrl(newsItem.image),
                coverImage: resolveImageUrl(newsItem.image),
                date: newsItem.date,
                readTime: newsItem.readTime || '3 min read',
                author: newsItem.author || 'Academic Cell',
                excerpt: newsItem.excerpt || '',
                content: newsItem.content || '',
                highlights: [
                  "Official academic update & announcement",
                  "Verified notification from Aayush Institute Management",
                  "Student support desks active for queries"
                ],
                relatedLink: '/News'
              };
              setBlog(formattedNews);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          // ignore
        }
      }

      // Final fallback to matching static list
      if (isMounted) {
        const fallbackMatch = FALLBACK_BLOGS.find(
          (b) => String(b.id) === String(id) || String(b.displayOrder) === String(id)
        );
        if (fallbackMatch) {
          setBlog(fallbackMatch);
        }
        setLoading(false);
      }
    };

    fetchAllBlogsAndCurrent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const theme = useMemo(() => getTagTheme(blog?.tag || blog?.category), [blog]);

  // Related blogs
  const relatedBlogs = useMemo(() => {
    return allBlogs
      .filter((b) => (b.id || b._id) !== (blog?.id || blog?._id))
      .slice(0, 3);
  }, [allBlogs, blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${blog?.title}*\nRead this article on Aayush Institute: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${blog?.title} via @AayushInstitute`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  // Submit Sidebar Counselling Form Directly to Backend MongoDB (/api/inquiry/submit-form)
  const handleSidebarSubmit = async (e) => {
    e.preventDefault();
    if (!sidebarForm.name.trim() || !sidebarForm.mobile.trim()) return;

    setSidebarLoading(true);
    try {
      await fetch('/api/inquiry/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sidebarForm.name.trim(),
          phone: sidebarForm.mobile.trim(),
          course: blog?.title || 'Blog Inquiry',
          program: blog?.tag || 'Blog Inquiry',
          className: blog?.tag || 'Blog Inquiry',
          message: `Requested callback from Blog: "${blog?.title}"`,
          inquiryType: 'Admission',
          notes: `Lead from Blog Details Page (${window.location.href})`
        })
      });
      setSidebarSubmitted(true);
    } catch (err) {
      console.warn('Inquiry submission fallback:', err);
      setSidebarSubmitted(true);
    } finally {
      setSidebarLoading(false);
    }
  };

  // Submit Modal Enquiry Form Directly to Backend MongoDB (/api/inquiry/submit-form)
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name.trim() || !modalForm.mobile.trim()) return;

    setModalLoading(true);
    try {
      await fetch('/api/inquiry/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modalForm.name.trim(),
          phone: modalForm.mobile.trim(),
          course: blog?.title || 'Free Career Counselling',
          program: blog?.tag || 'Blog Consultation',
          className: blog?.tag || 'Blog Consultation',
          message: modalForm.message
            ? `[Blog: ${blog?.title}] ${modalForm.message}`
            : `Consultation enquiry from Blog: "${blog?.title}"`,
          inquiryType: 'Admission',
          notes: `Lead from Blog Details Consultation Modal (${window.location.href})`
        })
      });
      setModalSubmitted(true);
      setTimeout(() => {
        setModalSubmitted(false);
        setIsEnquiryModalOpen(false);
        setModalForm({ name: '', mobile: '', message: '' });
      }, 2500);
    } catch (err) {
      console.warn('Inquiry submission fallback:', err);
      setModalSubmitted(true);
    } finally {
      setModalLoading(false);
    }
  };

  // Quick Direct WhatsApp Chat launcher
  const openDirectWhatsApp = (topic = '') => {
    const msg = topic
      ? `Hello Aayush Institute, I am reading the article "${blog?.title}" and have a query regarding ${topic}.`
      : `Hello Aayush Institute, I would like more information about "${blog?.title}".`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsWaMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f8fc] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto shadow-md" />
          <h3 className="text-base font-semibold text-[#00285e]">Loading Article Details...</h3>
          <p className="text-xs text-slate-500 font-normal">Preparing verified content and insights</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f4f8fc] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-slate-200/80 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          <h2 className="text-lg font-bold text-[#00285e]">Article Not Found</h2>
          <p className="text-xs text-slate-600 font-normal">The requested blog post could not be located or may have been updated.</p>
          <button
            onClick={() => navigate('/blogs')}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs shadow-md hover:shadow-lg transition-all"
          >
            ← Browse All Blogs & Updates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8fc] text-slate-700 selection:bg-blue-600 selection:text-white relative">
      {/* ── 0. TOP READING PROGRESS BAR (FIXED) ── */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div
          className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-150 shadow-xs`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── 1. HERO SECTION (Matching Homepage & Courses Panoramic Background) ── */}
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center pt-6 pb-12 sm:pb-16 lg:pb-20 border-b border-blue-200/80"
        style={{
          backgroundImage: "url('/hero_downloaded_bg.png')",
          backgroundColor: '#d6ecff'
        }}
      >
        {/* Soft Contrast Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/95 via-[#d6ecff]/85 to-transparent sm:from-[#d6ecff]/90 sm:via-[#d6ecff]/75 sm:to-white/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#d6ecff]/50 pointer-events-none" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Hero Metadata & Title Area */}
          <div className="max-w-3xl lg:max-w-4xl space-y-3 sm:space-y-3.5">
            {/* Badges, Time, Date */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-2xs border ${theme.badgeBg}`}>
                {blog.tag || blog.category || 'Article'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Publication</span>
              </span>
              <span className="text-xs text-[#475569] flex items-center gap-1 font-medium bg-white/80 px-2.5 py-1 rounded-full border border-blue-100 shadow-2xs ml-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {blog.readTime || '4 min read'}
              </span>
              <span className="text-xs text-[#475569] flex items-center gap-1 font-medium bg-white/80 px-2.5 py-1 rounded-full border border-blue-100 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                {blog.date}
              </span>
            </div>

            {/* Main Blog Title (Crisp dark navy blue text matching Homepage) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-[#00285e] leading-[1.25] tracking-tight">
              {blog.title}
            </h1>

            {/* Excerpt Pull Header */}
            {blog.excerpt && (
              <p className="text-xs sm:text-sm md:text-[15px] text-[#334155] leading-relaxed font-normal max-w-3xl">
                {blog.excerpt}
              </p>
            )}

            {/* Author Profile Bar */}
            <div className="pt-2 sm:pt-3 flex items-center justify-between gap-4 border-t border-blue-200/60">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-blue-200/70 shadow-2xs">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${theme.gradient} text-white font-semibold text-sm flex items-center justify-center shadow-xs ring-2 ring-white`}>
                  {(blog.author || 'A')[0]}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#00285e] leading-tight">
                    {blog.author || 'Academic Advisory'}
                  </h4>
                  <p className="text-[11px] text-[#64748b] font-normal">
                    Faculty &amp; Mentor • Aayush Institute of Professional Studies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN CONTENT & SIDEBAR GRID ── */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 lg:-mt-12 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
          
          {/* ════ LEFT COLUMN: MAIN ARTICLE MAGAZINE (8 COLS) ════ */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-7">
            
            {/* Top Featured Cover Card */}
            <div className="bg-white rounded-3xl p-2.5 sm:p-3.5 shadow-xl border border-slate-200/80 overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 group shadow-inner">
                <img
                  src={blog.image || blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  onError={(e) => { e.target.src = '/corporate_ai.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full font-semibold bg-white/95 text-blue-800 shadow-md backdrop-blur-xs">
                    {blog.tag || 'Aayush Knowledge Hub'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 text-amber-300 font-normal backdrop-blur-xs">
                    Published by {blog.author || 'Academic Advisory'}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Highlights Card */}
            {blog.highlights && blog.highlights.length > 0 && (
              <div className={`rounded-3xl p-5 sm:p-6 border ${theme.borderGlow} ${theme.lightBg} shadow-sm space-y-3.5`}>
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-r ${theme.gradient} text-white flex items-center justify-center shadow-xs`}>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-[#00285e]">
                      Key Highlights &amp; Insights
                    </h3>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Summary takeaways from this article
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {blog.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/90 hover:bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs hover:shadow-xs transition-all flex items-start gap-2.5"
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-xs sm:text-[13px] font-normal text-slate-700 leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rich Main Body Article (Clean Light Font Weight) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl border border-slate-200/80 space-y-5">
              
              {/* Short Quote Callout */}
              {blog.excerpt && (
                <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-l-3 border-amber-500">
                  <p className="text-xs sm:text-sm font-normal text-slate-700 italic leading-relaxed">
                    "{blog.excerpt}"
                  </p>
                </div>
              )}

              {/* Main Content Body - Formatted with light readable font */}
              <div className="text-slate-600 font-normal leading-relaxed">
                {renderFormattedContent(blog.content)}
              </div>

              {/* Verified Author Bio Card */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${theme.gradient} text-white font-semibold text-lg flex items-center justify-center shadow-xs shrink-0`}>
                  {(blog.author || 'A')[0]}
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-semibold text-sm text-[#00285e]">
                      {blog.author || 'Academic Advisory Cell'}
                    </h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      Author
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Academic mentor and curriculum coordinator at Aayush Institute of Professional Studies. Dedicated to bridging industry requirements with practical hands-on student excellence.
                  </p>
                </div>
              </div>

              {/* Social Share Bar */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Share this article:</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleShareLinkedIn}
                    className="px-3 py-1.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>LinkedIn</span>
                  </button>

                  <button
                    onClick={handleShareTwitter}
                    className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>Twitter/X</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Link'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom CTA Banner */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#00285e] via-[#004b93] to-[#0066ff] text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="relative z-10 space-y-1.5 text-center sm:text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-semibold text-[10px] uppercase tracking-wider inline-block">
                  Skill Development 2026
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Want Practical Training in This Domain?
                </h3>
                <p className="text-xs text-blue-100 max-w-lg leading-relaxed font-normal">
                  Join Aayush Institute to learn with live project sprints, industry mentors, verified certifications, and 100% placement support.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                {blog.relatedLink && (
                  <NavLink
                    to={blog.relatedLink}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs text-center shadow-md transition-all hover:scale-102 active:scale-98 whitespace-nowrap"
                  >
                    Explore Related Course →
                  </NavLink>
                )}
                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs text-center border border-white/25 backdrop-blur-md transition-all whitespace-nowrap cursor-pointer"
                >
                  Book Free Counselling
                </button>
              </div>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: INTERACTIVE STICKY SIDEBAR (4 COLS) ════ */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            
            {/* 1. Free Career Counselling Box (SAVES TO ADMIN DATABASE) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/80 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[#00285e] leading-snug">
                    Free Career Counselling
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Get expert advice for your next course
                  </p>
                </div>
              </div>

              {sidebarSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                  <h5 className="font-semibold text-xs">Callback Request Received!</h5>
                  <p className="text-[11px] text-emerald-700 font-normal">Our counsellor will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSidebarSubmit} className="space-y-2.5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={sidebarForm.name}
                      onChange={(e) => setSidebarForm({ ...sidebarForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-normal focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number *"
                      value={sidebarForm.mobile}
                      onChange={(e) => setSidebarForm({ ...sidebarForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-normal focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sidebarLoading}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                  >
                    <span>{sidebarLoading ? 'Saving...' : 'Request Free Callback'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-normal">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  100% Free
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Zero Fee
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Live Mentor
                </span>
              </div>
            </div>

            {/* 2. Trending / More Blogs in Knowledge Hub */}
            <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-200/80 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-sm text-[#00285e]">
                    Trending Articles
                  </h4>
                </div>
                <NavLink
                  to="/blogs"
                  className="text-[11px] font-semibold text-blue-600 hover:underline"
                >
                  View All
                </NavLink>
              </div>

              <div className="space-y-2.5">
                {relatedBlogs.map((other) => {
                  const otherTheme = getTagTheme(other.tag);
                  return (
                    <div
                      key={other.id || other._id}
                      onClick={() => navigate(`/blog/${other.id || other._id}`, { state: { blog: other } })}
                      className="p-2.5 rounded-2xl bg-slate-50/70 hover:bg-blue-50/50 border border-slate-200/70 hover:border-blue-300 transition-all flex gap-3 group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 relative shadow-2xs">
                        <img
                          src={other.image || other.coverImage}
                          alt={other.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                          onError={(e) => { e.target.src = '/corporate_ai.jpg'; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <span className={`inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full mb-0.5 ${otherTheme.badgeBg}`}>
                            {other.tag}
                          </span>
                          <h5 className="text-xs font-medium text-slate-800 group-hover:text-blue-700 leading-snug line-clamp-2 transition-colors">
                            {other.title}
                          </h5>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {other.readTime || '3 min read'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Direct Contact Assistance Card */}
            <div className="rounded-3xl p-5 bg-gradient-to-br from-indigo-900 to-[#001c44] text-white shadow-xl space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-amber-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-white">Need Quick Advice?</h4>
                  <p className="text-[11px] text-blue-200/80 font-normal">Speak with our academic team</p>
                </div>
              </div>
              <p className="text-xs text-blue-100/80 leading-relaxed font-normal">
                Connect with our counsellor for course eligibility, fee schedules, and admission guidance.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <NavLink
                  to="/ContactUs"
                  className="flex-1 py-2 text-center rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-xs transition-colors shadow-2xs"
                >
                  Contact Desk
                </NavLink>
                <button
                  type="button"
                  onClick={() => openDirectWhatsApp('Course Guidance')}
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors shadow-2xs cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ── 3. BOTTOM: MORE ARTICLES SECTION ── */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/90 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                Explore More Articles
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285e]">
                Continue Reading from Knowledge Hub
              </h2>
            </div>
            <NavLink
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 group"
            >
              <span>View All Updates &amp; Blogs</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2] group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allBlogs
              .filter((b) => (b.id || b._id) !== (blog.id || blog._id))
              .slice(0, 3)
              .map((item) => {
                const itemTheme = getTagTheme(item.tag);
                return (
                  <div
                    key={item.id || item._id}
                    onClick={() => navigate(`/blog/${item.id || item._id}`, { state: { blog: item } })}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={item.image || item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                          onError={(e) => { e.target.src = '/corporate_ai.jpg'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                        <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs border ${itemTheme.badgeBg}`}>
                          {item.tag}
                        </span>
                        <span className="absolute bottom-3 right-3 text-[10px] font-normal text-amber-300 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                          {item.readTime || '3 min read'}
                        </span>
                      </div>

                      <div className="p-4 sm:p-5 space-y-1.5">
                        <span className="text-[11px] text-slate-400 font-normal">
                          {item.date} • {item.author || 'Academic Advisory'}
                        </span>
                        <h4 className="text-sm sm:text-base font-semibold text-[#00285e] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

      </div>

      {/* ── 4. POPUP ENQUIRY MODAL (SAVES TO ADMIN DATABASE) ── */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1.5 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#00285e]">
                Book Free Career Counselling
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Discuss your goals with our course mentors and receive personalized guidance.
              </p>
            </div>

            {modalSubmitted ? (
              <div className="p-5 bg-emerald-50 rounded-2xl text-center space-y-1.5 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-semibold text-emerald-800 text-sm">Thank You!</h4>
                <p className="text-xs text-emerald-700 font-normal">Your enquiry has been saved. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-normal focus:outline-none focus:border-blue-600 bg-slate-50/70"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit mobile number"
                    value={modalForm.mobile}
                    onChange={(e) => setModalForm({ ...modalForm, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-normal focus:outline-none focus:border-blue-600 bg-slate-50/70"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Message / Questions (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Ask about batches, fees, syllabus or placement..."
                    value={modalForm.message}
                    onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-normal focus:outline-none focus:border-blue-600 bg-slate-50/70"
                  />
                </div>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-70"
                >
                  {modalLoading ? 'Submitting to Portal...' : 'Submit & Get Free Consultation'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}



    </div>
  );
}
