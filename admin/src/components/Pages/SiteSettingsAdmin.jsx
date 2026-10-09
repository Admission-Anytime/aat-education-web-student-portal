import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Share2,
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Briefcase,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  Eye,
  EyeOff,
  LayoutGrid,
  Check,
  Globe,
  Sliders,
  BellRing,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  Clock,
  Calendar,
  Tag,
  Hash,
  X,
  Search,
  RefreshCw,
  Layers,
  Star,
  Crown,
  Image as ImageIcon,
  Video,
  Megaphone,
  Upload,
  Link as LinkIcon,
  ArrowRight,
  QrCode,
  MessageSquare,
  ChevronRight,
  Copy,
  Quote
} from "lucide-react";
import Testimonial from "./Testimonial";

export default function SiteSettingsAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero"); // 'hero' | 'blogs' | 'testimonials' | 'enquiry' | 'social' | 'topbar'
  const [showPreview, setShowPreview] = useState(false);
  const [notification, setNotification] = useState({ type: "", text: "" });

  const DEFAULT_HERO = {
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
    counsellingPoints: [
      "Personalised Guidance",
      "Course Comparison",
      "Career Roadmap",
      "100% Free Consultation",
    ],
    counsellingBtnText: "Book Your Counselling",
  };

  const DEFAULT_MODAL_ENQUIRY = {
    titlePrefix: "Quick Enquiry on",
    titleHighlight: "WhatsApp",
    subtitle: "Get instant details about:",
    checklist: [
      "Course Details",
      "Total Fee",
      "Scholarship / Discounts",
      "Admission Process",
      "Batch Timings",
      "Online / Classroom Mode",
      "Syllabus",
      "Career Guidance"
    ],
    qrImage: "/whatsapp_qr.png",
    whatsappNumber: "+919311050670",
    buttonText: "Chat on WhatsApp",
    counsellorNote: "Or click the button to chat directly with our counsellor."
  };

  const PRESET_HERO_IMAGES = [
    { label: "Campus Student (Default)", url: "/hero_downloaded_bg.png" },
    { label: "IT & Practical Lab", url: "/laptop_live_projects.jpg" },
    { label: "Corporate AI & Tech", url: "/corporate_ai.jpg" },
    { label: "University Campus", url: "/blog_distance_edu.jpg" },
    { label: "College Students", url: "/blog_internships.jpg" },
  ];

  const PRESET_BLOG_IMAGES = [
    { label: "Corporate AI", url: "/corporate_ai.jpg" },
    { label: "Distance Edu", url: "/blog_distance_edu.jpg" },
    { label: "Internships", url: "/blog_internships.jpg" },
    { label: "Web & IT Skills", url: "/blog_it_skills.jpg" },
    { label: "Future AI", url: "/blog_future_ai.jpg" },
    { label: "Live Projects", url: "/laptop_live_projects.jpg" },
  ];

  const resolveBlogImageUrl = (coverImage) => {
    if (!coverImage) return "/corporate_ai.jpg";
    if (coverImage.startsWith("http://") || coverImage.startsWith("https://") || coverImage.startsWith("data:")) {
      return coverImage;
    }
    if (coverImage.startsWith("/Uploads/") || coverImage.startsWith("Uploads/")) {
      const cleanPath = coverImage.startsWith("/") ? coverImage : `/${coverImage}`;
      return `http://localhost:4001${cleanPath}`;
    }
    return coverImage.startsWith("/") ? coverImage : `/${coverImage}`;
  };

  const getBlogCardStyle = (tag) => {
    const t = (tag || "").toLowerCase();
    if (t.includes("ai") || t.includes("tech")) {
      return {
        cardBg: "bg-gradient-to-r from-blue-50/80 via-cyan-50/40 to-white hover:to-cyan-50/70",
        border: "border-blue-200 hover:border-cyan-400 hover:shadow-cyan-500/15",
        tagBadge: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xs shadow-blue-500/25",
        accentText: "text-blue-700",
        quoteBorder: "border-blue-500",
        pillBg: "bg-blue-50 text-blue-700 border-blue-200",
      };
    }
    if (t.includes("internship") || t.includes("placement")) {
      return {
        cardBg: "bg-gradient-to-r from-purple-50/80 via-indigo-50/40 to-white hover:to-purple-50/70",
        border: "border-purple-200 hover:border-purple-400 hover:shadow-purple-500/15",
        tagBadge: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs shadow-purple-500/25",
        accentText: "text-purple-700",
        quoteBorder: "border-purple-500",
        pillBg: "bg-purple-50 text-purple-700 border-purple-200",
      };
    }
    if (t.includes("distance") || t.includes("education") || t.includes("degree")) {
      return {
        cardBg: "bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-white hover:to-emerald-50/70",
        border: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-500/15",
        tagBadge: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs shadow-emerald-500/25",
        accentText: "text-emerald-700",
        quoteBorder: "border-emerald-500",
        pillBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }
    if (t.includes("web") || t.includes("stack") || t.includes("dev")) {
      return {
        cardBg: "bg-gradient-to-r from-rose-50/80 via-pink-50/40 to-white hover:to-rose-50/70",
        border: "border-rose-200 hover:border-rose-400 hover:shadow-rose-500/15",
        tagBadge: "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs shadow-rose-500/25",
        accentText: "text-rose-700",
        quoteBorder: "border-rose-500",
        pillBg: "bg-rose-50 text-rose-700 border-rose-200",
      };
    }
    if (t.includes("design") || t.includes("ux")) {
      return {
        cardBg: "bg-gradient-to-r from-fuchsia-50/80 via-pink-50/40 to-white hover:to-fuchsia-50/70",
        border: "border-fuchsia-200 hover:border-fuchsia-400 hover:shadow-fuchsia-500/15",
        tagBadge: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-xs shadow-fuchsia-500/25",
        accentText: "text-fuchsia-700",
        quoteBorder: "border-fuchsia-500",
        pillBg: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
      };
    }
    // Default: Career / Guidance
    return {
      cardBg: "bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-white hover:to-amber-50/70",
      border: "border-amber-200 hover:border-amber-400 hover:shadow-amber-500/15",
      tagBadge: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs shadow-amber-500/25",
      accentText: "text-amber-700",
      quoteBorder: "border-amber-500",
      pillBg: "bg-amber-50 text-amber-700 border-amber-200",
    };
  };

  // ─── 1. Site Settings State (Social, Top Bar & Hero Section) ───
  const [settings, setSettings] = useState({
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/919311050670",
    },
    topBar: {
      enabled: true,
      sinceYear: "2002",
      sinceText: "Since 2002 • 22+ Years of Excellence",
      admissionsText: "Admissions Open 2026-27 — New Batches Available",
      tagline: "Learn • Build • Grow",
      placementText: "100% Placement Support • 500+ Corporate Hiring Partners",
      liveProjectText: "🚀 Live Industry Projects & Practical Mentorship",
      counsellingText: "🎯 Free Career Counselling & Guidance Daily",
      phone: "+91-9311050670",
      email: "info@aayushinstitute.com",
    },
    heroSection: { ...DEFAULT_HERO },
    modalWhatsAppEnquiry: { ...DEFAULT_MODAL_ENQUIRY },
  });

  const [heroUploading, setHeroUploading] = useState(false);
  const [qrUploading, setQrUploading] = useState(false);

  // ─── Modal WhatsApp & QR Enquiry Field Helpers ───
  const updateEnquiryField = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      modalWhatsAppEnquiry: {
        ...(prev.modalWhatsAppEnquiry || DEFAULT_MODAL_ENQUIRY),
        [field]: value,
      },
    }));
  };

  const updateEnquiryChecklist = (index, value) => {
    setSettings((prev) => {
      const currentList = [
        ...((prev.modalWhatsAppEnquiry && prev.modalWhatsAppEnquiry.checklist) || DEFAULT_MODAL_ENQUIRY.checklist),
      ];
      currentList[index] = value;
      return {
        ...prev,
        modalWhatsAppEnquiry: {
          ...(prev.modalWhatsAppEnquiry || DEFAULT_MODAL_ENQUIRY),
          checklist: currentList,
        },
      };
    });
  };

  const addEnquiryChecklistItem = () => {
    setSettings((prev) => {
      const currentList = [
        ...((prev.modalWhatsAppEnquiry && prev.modalWhatsAppEnquiry.checklist) || DEFAULT_MODAL_ENQUIRY.checklist),
      ];
      return {
        ...prev,
        modalWhatsAppEnquiry: {
          ...(prev.modalWhatsAppEnquiry || DEFAULT_MODAL_ENQUIRY),
          checklist: [...currentList, "New Enquiry Point"],
        },
      };
    });
  };

  const removeEnquiryChecklistItem = (index) => {
    setSettings((prev) => {
      const currentList = [
        ...((prev.modalWhatsAppEnquiry && prev.modalWhatsAppEnquiry.checklist) || DEFAULT_MODAL_ENQUIRY.checklist),
      ];
      currentList.splice(index, 1);
      return {
        ...prev,
        modalWhatsAppEnquiry: {
          ...(prev.modalWhatsAppEnquiry || DEFAULT_MODAL_ENQUIRY),
          checklist: currentList,
        },
      };
    });
  };

  const handleUploadQrImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotice("error", "Please select a valid image file (PNG, JPG, SVG, WebP)");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setQrUploading(true);
      const res = await axios.post("/api/site-settings/upload-qr-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.url) {
        updateEnquiryField("qrImage", res.data.url);
        showNotice("success", "QR Code image uploaded successfully!");
      }
    } catch (err) {
      console.error("Failed to upload QR image:", err);
      showNotice("error", "Failed to upload QR image. Please try again.");
    } finally {
      setQrUploading(false);
    }
  };

  const handleResetEnquiry = () => {
    if (!window.confirm("Reset course popup enquiry & QR settings to default?")) return;
    setSettings((prev) => ({
      ...prev,
      modalWhatsAppEnquiry: { ...DEFAULT_MODAL_ENQUIRY },
    }));
    showNotice("success", "Course enquiry popup settings reset to defaults. Click 'Save Settings' to apply.");
  };

  // ─── Hero Section Field Update Helpers ───
  const updateHeroField = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      heroSection: {
        ...(prev.heroSection || DEFAULT_HERO),
        [field]: value,
      },
    }));
  };

  const updateHeroCounsellingPoint = (index, value) => {
    setSettings((prev) => {
      const currentPoints = [
        ...((prev.heroSection && prev.heroSection.counsellingPoints) || DEFAULT_HERO.counsellingPoints),
      ];
      currentPoints[index] = value;
      return {
        ...prev,
        heroSection: {
          ...(prev.heroSection || DEFAULT_HERO),
          counsellingPoints: currentPoints,
        },
      };
    });
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("/api/site-settings/upload-hero-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.url) {
        updateHeroField("bgImage", res.data.url);
        showNotice("success", "Hero background image uploaded successfully!");
      }
    } catch (err) {
      console.error("Failed to upload hero image:", err);
      showNotice("error", "Failed to upload image. Please try again or use preset image.");
    } finally {
      setHeroUploading(false);
    }
  };

  const handleResetHero = () => {
    if (!window.confirm("Reset homepage hero section to institute defaults?")) return;
    setSettings((prev) => ({
      ...prev,
      heroSection: { ...DEFAULT_HERO },
    }));
    showNotice("success", "Hero section reset to defaults. Click 'Save Settings' to apply.");
  };

  // ─── 2. Blogs State & Management ───
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogSearch, setBlogSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    displayOrder: 1,
    tag: "Career",
    category: "Blogs",
    status: "Published",
    author: "Academic Advisory",
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    readTime: "3 min read",
    shortDescription: "",
    longDescription: "",
    coverImage: "/corporate_ai.jpg",
    coverImageUrl: "",
    highlights: [
      "Hands-on practical industry workflows",
      "Direct mentor feedback & code reviews",
      "Verified GitHub projects & portfolio",
      "100% placement guidance & interview prep",
    ],
    relatedLink: "/Courses",
  });
  const [imageFile, setImageFile] = useState(null);

  const showNotice = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: "", text: "" }), 4500);
  };

  // ─── Fetch Site Settings ───
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/site-settings");
      const data = res.data?.data || res.data;
      if (data) {
        setSettings((prev) => ({
          ...prev,
          socialLinks: { ...prev.socialLinks, ...(data.socialLinks || {}) },
          topBar: { ...prev.topBar, ...(data.topBar || {}) },
          heroSection: { ...(prev.heroSection || DEFAULT_HERO), ...(data.heroSection || {}) },
          modalWhatsAppEnquiry: { ...(prev.modalWhatsAppEnquiry || DEFAULT_MODAL_ENQUIRY), ...(data.modalWhatsAppEnquiry || {}) },
        }));
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Fetch Blogs ───
  const fetchBlogs = async () => {
    try {
      setBlogsLoading(true);
      const res = await axios.get("/api/blogs");
      if (Array.isArray(res.data)) {
        // Sort by displayOrder ascending
        const sorted = [...res.data].sort(
          (a, b) => (Number(a.displayOrder) || 999) - (Number(b.displayOrder) || 999)
        );
        setBlogs(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      showNotice("error", "Failed to fetch blogs from server");
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchBlogs();
  }, []);

  // ─── Save Site Settings ───
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put("/api/site-settings", settings);
      showNotice("success", res.data?.message || "Settings updated successfully!");
      window.dispatchEvent(new Event("siteSettingsUpdated"));
      try {
        localStorage.setItem("aayush_site_settings_timestamp", Date.now().toString());
      } catch {}
    } catch (err) {
      console.error("Failed to save settings:", err);
      showNotice("error", "Failed to update settings on server.");
    } finally {
      setSaving(false);
    }
  };

  // ─── Reset Site Settings to Default ───
  const handleReset = async () => {
    if (!window.confirm("Reset all social links and top bar announcements to institute defaults?")) return;
    setSaving(true);
    try {
      const res = await axios.post("/api/site-settings/reset");
      if (res.data?.data) {
        setSettings(res.data.data);
      }
      showNotice("success", "Reset to default institute settings!");
      window.dispatchEvent(new Event("siteSettingsUpdated"));
    } catch (err) {
      showNotice("error", "Failed to reset settings.");
    } finally {
      setSaving(false);
    }
  };

  // ─── Seed Default Blogs ───
  const handleSeedBlogs = async () => {
    const confirmSeed = window.confirm(
      "Do you want to re-seed or restore the 6 default verified institute blogs? Existing blog IDs will be refreshed."
    );
    if (!confirmSeed) return;

    try {
      setBlogsLoading(true);
      const res = await axios.post("/api/blogs/seed", { overwrite: true });
      showNotice("success", res.data?.message || "Default blogs seeded successfully!");
      await fetchBlogs();
    } catch (err) {
      console.error("Seed error:", err);
      showNotice("error", "Failed to seed default blogs");
    } finally {
      setBlogsLoading(false);
    }
  };

  // ─── Reorder Blogs (Change displayOrder) ───
  const handleMoveOrder = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blogs.length) return;

    const newBlogs = [...blogs];
    const currentItem = newBlogs[index];
    const targetItem = newBlogs[targetIndex];

    // Swap their displayOrder values
    const tempOrder = currentItem.displayOrder ?? index + 1;
    currentItem.displayOrder = targetItem.displayOrder ?? targetIndex + 1;
    targetItem.displayOrder = tempOrder;

    // Swap positions in array
    newBlogs[index] = targetItem;
    newBlogs[targetIndex] = currentItem;

    // Normalize displayOrders 1, 2, 3...
    newBlogs.forEach((b, idx) => {
      b.displayOrder = idx + 1;
    });

    setBlogs(newBlogs);

    try {
      const itemsPayload = newBlogs.map((b) => ({
        id: b._id || b.id,
        displayOrder: b.displayOrder,
      }));
      await axios.put("/api/blogs/reorder", { items: itemsPayload });
      showNotice("success", `Blog priority updated! (Now #${currentItem.displayOrder})`);
    } catch (err) {
      console.error("Failed to reorder blogs:", err);
      showNotice("error", "Failed to save reordered blogs");
      fetchBlogs();
    }
  };

  // ─── Direct Display Order Edit ───
  const handleDirectOrderChange = async (blog, newOrder) => {
    const parsed = parseInt(newOrder, 10);
    if (isNaN(parsed) || parsed < 1) return;

    try {
      await axios.put(`/api/blogs/${blog._id}`, { displayOrder: parsed });
      showNotice("success", `Priority for "${blog.title.slice(0, 25)}..." set to #${parsed}`);
      fetchBlogs();
    } catch (err) {
      console.error("Order update error:", err);
      showNotice("error", "Failed to update blog priority");
    }
  };

  // ─── Toggle Blog Status (Published / Draft) ───
  const handleToggleStatus = async (blog) => {
    const nextStatus = blog.status === "Published" ? "Draft" : "Published";
    try {
      await axios.put(`/api/blogs/${blog._id}`, { status: nextStatus });
      showNotice("success", `Blog status set to ${nextStatus}`);
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, status: nextStatus } : b))
      );
    } catch (err) {
      showNotice("error", "Failed to update blog status");
    }
  };

  // ─── Delete Blog ───
  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Are you sure you want to delete blog: "${blog.title}"?`)) return;

    try {
      await axios.delete(`/api/blogs/${blog._id}`);
      showNotice("success", "Blog deleted successfully!");
      setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
    } catch (err) {
      console.error("Delete error:", err);
      showNotice("error", "Failed to delete blog");
    }
  };

  // ─── Open Modal for Create or Edit ───
  const openBlogModal = (blog = null) => {
    setImageFile(null);
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({
        title: blog.title || "",
        displayOrder: blog.displayOrder ?? (blogs.length + 1),
        tag: blog.tag || blog.category || "Career",
        category: blog.category || "Blogs",
        status: blog.status || "Published",
        author: blog.author || "Academic Advisory",
        date: blog.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        readTime: blog.readTime || "3 min read",
        shortDescription: blog.shortDescription || blog.excerpt || "",
        longDescription: blog.longDescription || blog.content || "",
        coverImage: blog.coverImage || "/corporate_ai.jpg",
        coverImageUrl: "",
        highlights: Array.isArray(blog.highlights) && blog.highlights.length > 0 ? blog.highlights : [
          "Hands-on practical industry workflows",
          "Direct mentor feedback & code reviews",
          "Verified GitHub projects & portfolio",
          "100% placement guidance & interview prep",
        ],
        relatedLink: blog.relatedLink || "/Courses",
      });
    } else {
      setEditingBlog(null);
      setBlogForm({
        title: "",
        displayOrder: blogs.length + 1,
        tag: "Career",
        category: "Blogs",
        status: "Published",
        author: "Career Advisory Cell",
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        readTime: "4 min read",
        shortDescription: "",
        longDescription: "",
        coverImage: "/corporate_ai.jpg",
        coverImageUrl: "",
        highlights: [
          "Hands-on practical industry workflows",
          "Direct mentor feedback & code reviews",
          "Verified GitHub projects & portfolio",
          "100% placement guidance & interview prep",
        ],
        relatedLink: "/Courses",
      });
    }
    setIsBlogModalOpen(true);
  };

  // ─── Submit Blog Form (Create / Edit) ───
  const handleBlogFormSubmit = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showNotice("error", "Please provide an article title");
      return;
    }
    if (!blogForm.shortDescription.trim() || !blogForm.longDescription.trim()) {
      showNotice("error", "Short excerpt and detailed content are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", blogForm.title);
      formData.append("displayOrder", Number(blogForm.displayOrder) || 1);
      formData.append("tag", blogForm.tag);
      formData.append("category", blogForm.category);
      formData.append("status", blogForm.status);
      formData.append("author", blogForm.author);
      formData.append("date", blogForm.date);
      formData.append("readTime", blogForm.readTime);
      formData.append("shortDescription", blogForm.shortDescription);
      formData.append("longDescription", blogForm.longDescription);
      formData.append("relatedLink", blogForm.relatedLink);
      formData.append("highlights", JSON.stringify(blogForm.highlights.filter(Boolean)));

      if (imageFile) {
        formData.append("coverImage", imageFile);
      } else if (blogForm.coverImageUrl && blogForm.coverImageUrl.trim()) {
        formData.append("coverImageUrl", blogForm.coverImageUrl.trim());
      } else if (blogForm.coverImage) {
        formData.append("coverImage", blogForm.coverImage);
      }

      if (editingBlog) {
        await axios.put(`/api/blogs/${editingBlog._id}`, formData);
        showNotice("success", "Blog article updated successfully!");
      } else {
        await axios.post("/api/blogs", formData);
        showNotice("success", "New blog article published successfully!");
      }

      setIsBlogModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error("Submit blog error:", err);
      showNotice("error", "Failed to save blog. Please verify inputs.");
    }
  };

  const handleSocialChange = (key, val) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: val },
    }));
  };

  const handleTopBarChange = (key, val) => {
    setSettings((prev) => ({
      ...prev,
      topBar: { ...prev.topBar, [key]: val },
    }));
  };

  const socialPlatforms = [
    {
      key: "facebook",
      name: "Facebook",
      placeholder: "https://facebook.com/aayushinstitute",
      icon: Facebook,
      iconClass: "fill-current",
      bgClass: "bg-[#1877f2] text-white",
      hoverClass: "focus:border-[#1877f2]",
      badgeText: "Meta Page",
    },
    {
      key: "instagram",
      name: "Instagram",
      placeholder: "https://instagram.com/aayush_institute",
      icon: Instagram,
      iconClass: "stroke-[2.2]",
      bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white",
      hoverClass: "focus:border-pink-500",
      badgeText: "Profile",
    },
    {
      key: "youtube",
      name: "YouTube",
      placeholder: "https://youtube.com/@aayushinstitute",
      icon: Youtube,
      iconClass: "fill-current",
      bgClass: "bg-[#ff0000] text-white",
      hoverClass: "focus:border-red-500",
      badgeText: "Channel",
    },
    {
      key: "linkedin",
      name: "LinkedIn",
      placeholder: "https://linkedin.com/company/aayushinstitute",
      icon: Linkedin,
      iconClass: "fill-current",
      bgClass: "bg-[#0a66c2] text-white",
      hoverClass: "focus:border-[#0a66c2]",
      badgeText: "Company",
    },
    {
      key: "twitter",
      name: "Twitter / X",
      placeholder: "https://x.com/aayushinstitute",
      icon: Twitter,
      iconClass: "fill-current",
      bgClass: "bg-black text-white",
      hoverClass: "focus:border-black",
      badgeText: "Handle",
    },
    {
      key: "whatsapp",
      name: "WhatsApp",
      placeholder: "https://wa.me/919311050670",
      icon: MessageCircle,
      iconClass: "fill-current",
      bgClass: "bg-[#25D366] text-white",
      hoverClass: "focus:border-[#25D366]",
      badgeText: "Direct Chat",
    },
  ];

  const filteredBlogs = blogs.filter((b) => {
    if (selectedCategoryFilter !== "All") {
      const bTag = `${b.tag || ""} ${b.category || ""}`.toLowerCase();
      if (!bTag.includes(selectedCategoryFilter.toLowerCase())) return false;
    }
    if (!blogSearch.trim()) return true;
    const q = blogSearch.toLowerCase();
    return (
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.tag && b.tag.toLowerCase().includes(q)) ||
      (b.author && b.author.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-16 font-sans">
      {/* Toast Notification */}
      {notification.text && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-xs font-semibold animate-fade-in ${
            notification.type === "error"
              ? "bg-rose-50 text-rose-800 border-rose-200 shadow-rose-500/10"
              : "bg-emerald-50 text-emerald-800 border-emerald-200 shadow-emerald-500/10"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* ── 1. Clean Page Header ── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Website CMS &amp; Content Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Website &amp; Blogs CMS Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage hero banners, blogs, verified student testimonials, WhatsApp popup &amp; QR, and social channels with live real-time sync.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {activeTab === "blogs" && (
            <button
              type="button"
              onClick={handleSeedBlogs}
              disabled={blogsLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition cursor-pointer disabled:opacity-50"
              title="Restore default 6 verified articles"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${blogsLoading ? "animate-spin" : ""}`} />
              <span>Seed 6 Default Blogs</span>
            </button>
          )}

          <a
            href={import.meta.env.VITE_WEBSITE_URL || "http://localhost:5174"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
            Live Website
          </a>

          {activeTab !== "testimonials" && activeTab !== "blogs" && (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shadow-indigo-600/20 transition active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          )}
        </div>
      </div>

      {/* ── 2. Executive Navigation Tabs (Clean, Scrollable, Non-Wrapping) ── */}
      <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 px-0.5 w-full">
          {/* 1. Hero Banner CMS Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("hero")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 select-none ${
              activeTab === "hero"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-500/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${activeTab === "hero" ? "text-white" : "text-blue-600"}`} />
            <span>Homepage Hero Banner</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                activeTab === "hero" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
              }`}
            >
              LIVE
            </span>
          </button>

          {/* 2. Blogs Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("blogs")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 select-none ${
              activeTab === "blogs"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-indigo-500/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${activeTab === "blogs" ? "text-white" : "text-indigo-600"}`} />
            <span>Blogs &amp; Articles Manager</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === "blogs" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {blogs.length}
            </span>
          </button>

          {/* 3. Student Testimonials Tab (NEW & REAL-TIME) */}
          <button
            type="button"
            onClick={() => setActiveTab("testimonials")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 select-none ${
              activeTab === "testimonials"
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-500/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <Quote className={`w-3.5 h-3.5 ${activeTab === "testimonials" ? "text-white" : "text-amber-500"}`} />
            <span>Student Testimonials</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                activeTab === "testimonials" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
              }`}
            >
              LIVE
            </span>
          </button>

          {/* 4. Course WhatsApp & QR Popup Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("enquiry")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 select-none ${
              activeTab === "enquiry"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 ring-1 ring-emerald-500/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <QrCode className={`w-3.5 h-3.5 ${activeTab === "enquiry" ? "text-white" : "text-emerald-600"}`} />
            <span>Course WhatsApp &amp; QR</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                activeTab === "enquiry" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              LIVE
            </span>
          </button>

          {/* 5. Social Handles Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("social")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 select-none ${
              activeTab === "social"
                ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md shadow-slate-800/25 ring-1 ring-slate-700/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <Share2 className={`w-3.5 h-3.5 ${activeTab === "social" ? "text-white" : "text-blue-600"}`} />
            <span>Social Handles</span>
            <span
              className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeTab === "social" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              6
            </span>
          </button>

          {/* 6. Top Announcement Bar Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("topbar")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 select-none ${
              activeTab === "topbar"
                ? "bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-600/25 ring-1 ring-sky-500/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <Sliders className={`w-3.5 h-3.5 ${activeTab === "topbar" ? "text-white" : "text-sky-600"}`} />
            <span>Top Marquee Bar</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                activeTab === "topbar" ? "bg-white/20 text-white" : "bg-sky-100 text-sky-800"
              }`}
            >
              TICKER
            </span>
          </button>
        </div>

        <span className="text-[11px] font-medium text-slate-400 hidden xl:flex items-center gap-1.5 shrink-0 pr-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Live Sync</span>
        </span>
      </div>

      {/* ===================================================================== */}
      {/* ── 2.5 HOMEPAGE HERO BANNER CMS SECTION ── */}
      {/* ===================================================================== */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>Homepage Hero Section CMS</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold">
                    Active on Website
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Directly customize all headlines, student visuals, trust badges, buttons, and career counselling cards in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleResetHero}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-600/25 transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? "Saving..." : "Save Hero Settings"}</span>
              </button>
            </div>
          </div>

          {/* ── Live Visual Preview Card (Miniature of Real Hero Banner) ── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50/40 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                  Live Preview on Homepage
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                Updates in real-time as you type below
              </span>
            </div>

            <div className="p-4 sm:p-6 bg-slate-100/50">
              <div className="relative rounded-2xl overflow-hidden border border-blue-200/80 shadow-md bg-gradient-to-r from-blue-50 via-sky-50 to-white min-h-[260px] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Background Image Preview */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                  <img
                    src={resolveBlogImageUrl(settings.heroSection?.bgImage || "/hero_downloaded_bg.png")}
                    alt="Hero Preview"
                    className="w-full h-full object-cover object-right"
                    onError={(e) => { e.currentTarget.src = "/hero_downloaded_bg.png"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>

                {/* Left Live Content */}
                <div className="relative z-10 max-w-xl space-y-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                    {settings.heroSection?.pillText || "Your Career • Our Commitment"}
                  </span>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-[#00285e] leading-tight">
                      {settings.heroSection?.titleLine1 || "Upgrade Your Skills"}
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-black text-blue-600 leading-tight">
                      {settings.heroSection?.titleLine2 || "Build a Better Future"}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 max-w-md line-clamp-2 leading-relaxed">
                    {settings.heroSection?.subtitle || "Aayush Institute of Professional Studies – Your trusted partner..."}
                  </p>

                  {/* Slogan Preview */}
                  <div className="pt-1 text-blue-700 font-semibold text-xs sm:text-sm italic">
                    ✏️ {settings.heroSection?.sloganLine1 || "Learn"} • {settings.heroSection?.sloganLine2 || "Practice"} • {settings.heroSection?.sloganLine3 || "Get Placed"}
                  </div>

                  {/* 4 Feature Badges Preview */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-[#00285e]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{settings.heroSection?.feature1 || "Industry Aligned Courses"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{settings.heroSection?.feature2 || "Live Projects & Training"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{settings.heroSection?.feature3 || "Expert Faculty & Mentorship"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{settings.heroSection?.feature4 || "100% Career Support"}</span>
                    </div>
                  </div>

                  {/* Buttons Preview */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="bg-[#00285e] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1">
                      <span>{settings.heroSection?.primaryBtnText || "Explore Courses"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="bg-white border-2 border-blue-600 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <span>▶ {settings.heroSection?.videoBtnText || "Watch Our Video"}</span>
                    </span>
                  </div>
                </div>

                {/* Right Miniature Counselling Card */}
                <div className="relative z-10 w-full md:w-56 bg-white rounded-2xl border-2 border-amber-300 shadow-md overflow-hidden shrink-0">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-2 text-slate-950 flex items-center gap-2">
                    <Megaphone className="w-4 h-4 fill-slate-950 text-amber-400" />
                    <div>
                      <div className="text-xs font-extrabold leading-none">
                        {settings.heroSection?.counsellingTitle || "Free Career Counselling"}
                      </div>
                      <div className="text-[9px] font-medium text-slate-800 leading-tight mt-0.5">
                        {settings.heroSection?.counsellingSubtitle || "Know the Right Course for You"}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-1.5 text-[10.5px] font-semibold text-slate-700 bg-white">
                    {(settings.heroSection?.counsellingPoints || DEFAULT_HERO.counsellingPoints).map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                        <span>{pt}</span>
                      </div>
                    ))}
                    <div className="pt-1.5">
                      <div className="w-full bg-amber-400 text-slate-950 text-center font-black text-[10.5px] py-1.5 rounded-full shadow-2xs">
                        {settings.heroSection?.counsellingBtnText || "Book Your Counselling"} →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Form Controls Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* ── Card 1: Headlines & Slogan ── */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <Edit3 className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-sm text-slate-900">
                  1. Main Headlines &amp; Tagline
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Top Badge / Pill Text
                  </label>
                  <input
                    type="text"
                    value={settings.heroSection?.pillText || ""}
                    onChange={(e) => updateHeroField("pillText", e.target.value)}
                    placeholder="Your Career • Our Commitment"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Headline Line 1 (Dark Blue)
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.titleLine1 || ""}
                      onChange={(e) => updateHeroField("titleLine1", e.target.value)}
                      placeholder="Upgrade Your Skills"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Headline Line 2 (Highlight Blue)
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.titleLine2 || ""}
                      onChange={(e) => updateHeroField("titleLine2", e.target.value)}
                      placeholder="Build a Better Future"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-bold text-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description / Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={settings.heroSection?.subtitle || ""}
                    onChange={(e) => updateHeroField("subtitle", e.target.value)}
                    placeholder="Aayush Institute of Professional Studies – Your trusted partner in professional education..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Floating Handwritten Slogan (3 Words)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={settings.heroSection?.sloganLine1 || ""}
                      onChange={(e) => updateHeroField("sloganLine1", e.target.value)}
                      placeholder="Learn"
                      className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-blue-700 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={settings.heroSection?.sloganLine2 || ""}
                      onChange={(e) => updateHeroField("sloganLine2", e.target.value)}
                      placeholder="Practice"
                      className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-blue-700 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={settings.heroSection?.sloganLine3 || ""}
                      onChange={(e) => updateHeroField("sloganLine3", e.target.value)}
                      placeholder="Get Placed"
                      className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-blue-700 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 2: 4 Trust & Feature Badges ── */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-sm text-slate-900">
                  2. 4 Key Trust &amp; Advantage Badges
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Feature Badge #1
                  </label>
                  <input
                    type="text"
                    value={settings.heroSection?.feature1 || ""}
                    onChange={(e) => updateHeroField("feature1", e.target.value)}
                    placeholder="Industry Aligned Courses"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Feature Badge #2
                  </label>
                  <input
                    type="text"
                    value={settings.heroSection?.feature2 || ""}
                    onChange={(e) => updateHeroField("feature2", e.target.value)}
                    placeholder="Live Projects & Training"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Feature Badge #3
                  </label>
                  <input
                    type="text"
                    value={settings.heroSection?.feature3 || ""}
                    onChange={(e) => updateHeroField("feature3", e.target.value)}
                    placeholder="Expert Faculty & Mentorship"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Feature Badge #4
                  </label>
                  <input
                    type="text"
                    value={settings.heroSection?.feature4 || ""}
                    onChange={(e) => updateHeroField("feature4", e.target.value)}
                    placeholder="100% Career Support"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* ── Card 3: Action Buttons & Video ── */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <LinkIcon className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-sm text-slate-900">
                  3. Call-to-Action Buttons &amp; Video
                </h3>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Button Label
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.primaryBtnText || ""}
                      onChange={(e) => updateHeroField("primaryBtnText", e.target.value)}
                      placeholder="Explore Courses"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Button Destination
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.primaryBtnLink || ""}
                      onChange={(e) => updateHeroField("primaryBtnLink", e.target.value)}
                      placeholder="/Courses"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Video Button Label
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.videoBtnText || ""}
                      onChange={(e) => updateHeroField("videoBtnText", e.target.value)}
                      placeholder="Watch Our Video"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Video YouTube / External Link
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.videoUrl || ""}
                      onChange={(e) => updateHeroField("videoUrl", e.target.value)}
                      placeholder="https://www.youtube.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 4: Right Floating Career Counselling Card ── */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                  <Megaphone className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-sm text-slate-900">
                  4. Free Career Counselling Card
                </h3>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.counsellingTitle || ""}
                      onChange={(e) => updateHeroField("counsellingTitle", e.target.value)}
                      placeholder="Free Career Counselling"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Card Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.heroSection?.counsellingSubtitle || ""}
                      onChange={(e) => updateHeroField("counsellingSubtitle", e.target.value)}
                      placeholder="Know the Right Course for You"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    4 Checklist Bullet Points
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((idx) => {
                      const points = settings.heroSection?.counsellingPoints || DEFAULT_HERO.counsellingPoints;
                      return (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-amber-600 w-4 shrink-0">#{idx + 1}</span>
                          <input
                            type="text"
                            value={points[idx] || ""}
                            onChange={(e) => updateHeroCounsellingPoint(idx, e.target.value)}
                            placeholder={`Point #${idx + 1}`}
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.heroSection?.counsellingBtnText || ""}
                    onChange={(e) => updateHeroField("counsellingBtnText", e.target.value)}
                    placeholder="Book Your Counselling"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:outline-none font-bold text-amber-700"
                  />
                </div>
              </div>
            </div>

            {/* ── Card 5: Hero Visual / Background Image ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      5. Hero Visual &amp; Background Image
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Upload a custom student banner, paste an image link, or choose from high-resolution presets.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  Panoramic 16:9 / Banner Ratio
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                {/* Image Preview Box */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video shadow-xs group">
                  <img
                    src={resolveBlogImageUrl(settings.heroSection?.bgImage || "/hero_downloaded_bg.png")}
                    alt="Hero Visual"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = "/hero_downloaded_bg.png"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold truncate">
                    {settings.heroSection?.bgImage || "/hero_downloaded_bg.png"}
                  </div>
                </div>

                {/* Upload & Link Controls */}
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Image Path or Web URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={settings.heroSection?.bgImage || ""}
                        onChange={(e) => updateHeroField("bgImage", e.target.value)}
                        placeholder="/hero_downloaded_bg.png or https://..."
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                      />
                      <label className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{heroUploading ? "Uploading..." : "Upload File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroImageUpload}
                          disabled={heroUploading}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Preset Background Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Or Pick From Preset Images:
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {PRESET_HERO_IMAGES.map((preset, idx) => {
                        const isSelected = settings.heroSection?.bgImage === preset.url;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => updateHeroField("bgImage", preset.url)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-xs"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                            }`}
                          >
                            <span>{preset.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ── 3. BLOGS & ARTICLES MANAGER (Priority Reordering, CRUD, Seeding) ── */}
      {/* ===================================================================== */}
      {activeTab === "blogs" && (
        <div className="space-y-5">
          {/* ── 4 Colorful Quick Metrics Summary Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Total Blogs */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs text-white">
                  <BookOpen className="w-5 h-5" />
                </span>
                <span className="text-[10.5px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  Total
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black">{blogs.length}</div>
                <div className="text-xs text-indigo-100 font-semibold mt-0.5">Articles in System</div>
              </div>
            </div>

            {/* Card 2: Published Blogs */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <span className="text-[10.5px] font-black uppercase tracking-wider bg-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black">
                  {blogs.filter((b) => b.status === "Published").length}
                </div>
                <div className="text-xs text-emerald-100 font-semibold mt-0.5">Live on Website</div>
              </div>
            </div>

            {/* Card 3: Draft Articles */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs text-white">
                  <Clock className="w-5 h-5" />
                </span>
                <span className="text-[10.5px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  Staging
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black">
                  {blogs.filter((b) => b.status !== "Published").length}
                </div>
                <div className="text-xs text-amber-100 font-semibold mt-0.5">Draft / Hidden</div>
              </div>
            </div>

            {/* Card 4: Slot #1 Spotlight */}
            <div className="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs text-yellow-300">
                  <Crown className="w-5 h-5 fill-current" />
                </span>
                <span className="text-[10.5px] font-black uppercase tracking-wider bg-yellow-400/30 text-yellow-200 px-2 py-0.5 rounded-full">
                  Slot #1 Hero
                </span>
              </div>
              <div className="mt-3 min-w-0">
                <div className="text-sm sm:text-base font-black truncate">
                  {blogs.length > 0 ? blogs[0]?.title : "No articles yet"}
                </div>
                <div className="text-xs text-purple-100 font-semibold mt-0.5">1st Card in Sliding Carousel</div>
              </div>
            </div>
          </div>

          {/* ── Main Blogs Management Panel ── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Header: Title + Actions */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-blue-50/40 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Website Blogs &amp; Articles Management
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    {blogs.filter((b) => b.status === "Published").length} Published
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Drag or use <strong className="text-indigo-600">Priority Number (1, 2, 3...)</strong> to control which blog appears first on the homepage!
                </p>
              </div>

              {/* Search & Add New Button */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none w-44 sm:w-56"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => openBlogModal(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Blog</span>
                </button>
              </div>
            </div>

            {/* Category Filter Chips Bar */}
            <div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 mr-1.5 shrink-0 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>Categories:</span>
              </span>
              {[
                { id: "All", label: "All Articles", count: blogs.length },
                { id: "Career", label: "Career & IT", count: blogs.filter((b) => (b.tag || "").toLowerCase().includes("career")).length },
                { id: "Tech", label: "AI & Tech", count: blogs.filter((b) => (b.tag || "").toLowerCase().includes("tech") || (b.tag || "").toLowerCase().includes("ai")).length },
                { id: "Distance", label: "Distance Education", count: blogs.filter((b) => (b.tag || "").toLowerCase().includes("distance")).length },
                { id: "Internship", label: "Internships", count: blogs.filter((b) => (b.tag || "").toLowerCase().includes("internship")).length },
                { id: "Web", label: "Web Dev", count: blogs.filter((b) => (b.tag || "").toLowerCase().includes("web")).length },
              ].map((cat) => {
                const isActive = selectedCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs shadow-indigo-500/25 scale-[1.02]"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Notice Banner explaining Ordering */}
            <div className="bg-amber-50/90 px-4 py-2.5 border-b border-amber-200/70 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>
                  <strong>Display Order Feature:</strong> Article with <strong>Priority #1</strong> is displayed first in the sliding carousel on the website. Use the <strong>▲ / ▼</strong> arrows or change the number directly.
                </span>
              </div>
              <button
                type="button"
                onClick={handleSeedBlogs}
                className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer shrink-0 ml-2"
              >
                Seed Default Data
              </button>
            </div>

            {/* Blog List Items with Colorful Cards */}
            <div className="p-4 sm:p-5 space-y-3.5">
              {blogsLoading ? (
                <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>Loading blogs from database...</span>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="py-12 text-center space-y-3 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-500">
                    {blogSearch || selectedCategoryFilter !== "All"
                      ? "No articles match your search or filter."
                      : "No blogs available in the database yet."}
                  </p>
                  <button
                    type="button"
                    onClick={handleSeedBlogs}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition"
                  >
                    Seed 6 Default Verified Articles
                  </button>
                </div>
              ) : (
                filteredBlogs.map((blog, idx) => {
                  const style = getBlogCardStyle(blog.tag);
                  const isHero = (blog.displayOrder ?? idx + 1) === 1;

                  return (
                    <div
                      key={blog._id || blog.id || idx}
                      className={`rounded-2xl transition-all duration-300 relative overflow-hidden border ${
                        isHero
                          ? "border-amber-300/90 bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-yellow-50/20 shadow-md shadow-amber-500/10 hover:shadow-xl hover:border-amber-400"
                          : `${style.cardBg} ${style.border} shadow-xs hover:shadow-md`
                      }`}
                    >
                      {/* Top Spotlight Banner for Slot #1 Hero */}
                      {isHero && (
                        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-1.5 flex items-center justify-between text-[11px] font-black tracking-wide shadow-xs">
                          <div className="flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 fill-current text-yellow-200 animate-bounce" />
                            <span>★ HOMEPAGE SPOTLIGHT HERO (First in Website Slider)</span>
                          </div>
                          <span className="bg-black/20 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                            Slot Priority #1
                          </span>
                        </div>
                      )}

                      <div className="p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        {/* Left: Reorder Controls + Priority Badge + Cover Image */}
                        <div className="flex items-center gap-3 shrink-0">
                          {/* Up & Down Arrows */}
                          <div className="flex flex-col items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveOrder(idx, "up")}
                              disabled={idx === 0}
                              title="Move Priority Up (Appear Earlier)"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-100/70 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer transition active:scale-95"
                            >
                              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveOrder(idx, "down")}
                              disabled={idx === blogs.length - 1}
                              title="Move Priority Down (Appear Later)"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-100/70 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer transition active:scale-95"
                            >
                              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </div>

                          {/* Numeric Priority Badge */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 border shadow-xs ${
                                (blog.displayOrder ?? idx + 1) === 1
                                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400"
                                  : (blog.displayOrder ?? idx + 1) === 2
                                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400"
                                  : (blog.displayOrder ?? idx + 1) === 3
                                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400"
                                  : "bg-gradient-to-r from-slate-700 to-slate-800 text-white border-slate-600"
                              }`}
                              title="Website display order priority"
                            >
                              {(blog.displayOrder ?? idx + 1) === 1 ? (
                                <Crown className="w-3.5 h-3.5 fill-current" />
                              ) : (
                                <Hash className="w-3.5 h-3.5" />
                              )}
                              <span>Order {blog.displayOrder ?? idx + 1}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                              {(blog.displayOrder ?? idx + 1) === 1
                                ? "★ 1st on Site"
                                : `Position ${blog.displayOrder ?? idx + 1}`}
                            </span>
                          </div>

                          {/* Cover Thumbnail with Floating Category Badge */}
                          <div className="w-24 sm:w-28 h-16 sm:h-18 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/90 shrink-0 relative shadow-xs group">
                            <img
                              src={resolveBlogImageUrl(blog.coverImage)}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                if (!e.currentTarget.dataset.fallback1) {
                                  e.currentTarget.dataset.fallback1 = "true";
                                  e.currentTarget.src = `http://localhost:5174${blog.coverImage?.startsWith("/") ? blog.coverImage : `/${blog.coverImage || "corporate_ai.jpg"}`}`;
                                } else if (!e.currentTarget.dataset.fallback2) {
                                  e.currentTarget.dataset.fallback2 = "true";
                                  e.currentTarget.src = "/ayush_circle_logo.png";
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute bottom-1 left-1.5 text-[9.5px] font-black text-white px-1.5 py-0.5 rounded-md backdrop-blur-xs bg-black/60 leading-none">
                              {blog.tag || blog.category || "Article"}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Title, Excerpt, Metadata */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          {/* Metadata row */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${style.tagBadge}`}>
                              {blog.tag || blog.category || "Career"}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-indigo-500" />
                              {blog.date}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-500" />
                              {blog.readTime}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold bg-white/70 px-2 py-0.5 rounded-full border border-slate-200">
                              By {blog.author}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                            {blog.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-1 leading-relaxed">
                            {blog.shortDescription || blog.excerpt}
                          </p>

                          {/* Highlights Preview Pills */}
                          {Array.isArray(blog.highlights) && blog.highlights.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                              {blog.highlights.slice(0, 2).map((hl, hIdx) => (
                                <span
                                  key={hIdx}
                                  className="text-[10px] font-semibold text-slate-600 bg-white/90 border border-slate-200 px-2 py-0.5 rounded-md truncate max-w-[220px]"
                                >
                                  ✨ {hl}
                                </span>
                              ))}
                              {blog.highlights.length > 2 && (
                                <span className="text-[10px] font-bold text-slate-400">
                                  +{blog.highlights.length - 2} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Right: Direct Order Input, Status Toggle, Actions */}
                        <div className="flex items-center gap-2 shrink-0 flex-wrap md:flex-nowrap">
                          {/* Priority Direct Input */}
                          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
                            <span className="text-[10px] font-black text-slate-400">Order:</span>
                            <input
                              type="number"
                              min="1"
                              max="99"
                              defaultValue={blog.displayOrder ?? idx + 1}
                              onBlur={(e) => handleDirectOrderChange(blog, e.target.value)}
                              className="w-10 text-center text-xs font-black text-slate-800 bg-slate-50 border border-slate-200 rounded px-1 py-0.5 outline-none focus:border-indigo-500 focus:bg-white transition"
                              title="Type order number and click outside to save"
                            />
                          </div>

                          {/* Status Badge Toggle */}
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(blog)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition active:scale-95 flex items-center gap-1.5 shadow-2xs ${
                              blog.status === "Published"
                                ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/20"
                                : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                            }`}
                            title="Click to toggle Published / Draft"
                          >
                            {blog.status === "Published" ? (
                              <>
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </span>
                                <span>Published</span>
                              </>
                            ) : (
                              <>
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                <span>Draft</span>
                              </>
                            )}
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => openBlogModal(blog)}
                            className="p-2 rounded-xl text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 border border-indigo-200 hover:border-indigo-600 transition shadow-2xs cursor-pointer active:scale-95"
                            title="Edit Blog"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(blog)}
                            className="p-2 rounded-xl text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 transition shadow-2xs cursor-pointer active:scale-95"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ── 3. STUDENT TESTIMONIALS & REVIEWS CMS (REAL-TIME LIVE SYNC) ── */}
      {/* ===================================================================== */}
      {activeTab === "testimonials" && (
        <Testimonial embedded={true} />
      )}

      {/* ===================================================================== */}
      {/* ── 3.5 COURSE DETAILS POPUP: WHATSAPP & QR ENQUIRY CMS ── */}
      {/* ===================================================================== */}
      {activeTab === "enquiry" && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-xs">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Course Popup WhatsApp &amp; QR Enquiry CMS
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10.5px] font-black uppercase tracking-wider">
                    Live In Course Modal
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Control all text headlines, checklist points, counsellor notes, WhatsApp contact number and upload the official QR code image shown on the Course Details Modal.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetEnquiry}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition cursor-pointer"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Enquiry</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs shadow-emerald-600/20 transition active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {saving ? "Saving..." : "Save Enquiry Settings"}
              </button>
            </div>
          </div>

          {/* 2-Column Responsive Layout: Left Config Cards & Right Real-Time Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Form Configurations */}
            <div className="lg:col-span-7 space-y-5">
              {/* Card 1: Header & Titles */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    1. Card Title &amp; Subtitle
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Title Prefix
                    </label>
                    <input
                      type="text"
                      value={settings.modalWhatsAppEnquiry?.titlePrefix || ""}
                      onChange={(e) => updateEnquiryField("titlePrefix", e.target.value)}
                      placeholder="Quick Enquiry on"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highlighted Word (Green)
                    </label>
                    <input
                      type="text"
                      value={settings.modalWhatsAppEnquiry?.titleHighlight || ""}
                      onChange={(e) => updateEnquiryField("titleHighlight", e.target.value)}
                      placeholder="WhatsApp"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtitle / Checklist Intro
                  </label>
                  <input
                    type="text"
                    value={settings.modalWhatsAppEnquiry?.subtitle || ""}
                    onChange={(e) => updateEnquiryField("subtitle", e.target.value)}
                    placeholder="Get instant details about:"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Card 2: Dynamic Checklist Items */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <Check className="w-4 h-4" />
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      2. Enquiry Checklist Points ({settings.modalWhatsAppEnquiry?.checklist?.length || 0})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={addEnquiryChecklistItem}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(settings.modalWhatsAppEnquiry?.checklist || DEFAULT_MODAL_ENQUIRY.checklist).map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateEnquiryChecklist(idx, e.target.value)}
                        placeholder={`Point #${idx + 1}`}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => removeEnquiryChecklistItem(idx)}
                        disabled={(settings.modalWhatsAppEnquiry?.checklist || []).length <= 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer disabled:opacity-30"
                        title="Delete this point"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: QR Code Image Upload & Management */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <QrCode className="w-4 h-4" />
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      3. WhatsApp QR Code Image
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Admin Upload
                  </span>
                </div>

                <div className="space-y-3">
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-2xl p-4 sm:p-5 text-center transition">
                    <QrCode className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      {qrUploading ? "Uploading QR Code..." : "Upload New QR Code Image"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-3">
                      Recommended: High resolution square PNG, JPG, or SVG (e.g. 500x500)
                    </p>
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{qrUploading ? "Uploading..." : "Select QR File to Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadQrImage}
                        disabled={qrUploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Manual URL input & Presets */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Or Direct Image Path / URL:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={settings.modalWhatsAppEnquiry?.qrImage || ""}
                        onChange={(e) => updateEnquiryField("qrImage", e.target.value)}
                        placeholder="/whatsapp_qr.png or https://..."
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => updateEnquiryField("qrImage", "/whatsapp_qr.png")}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
                        title="Use default /whatsapp_qr.png"
                      >
                        Reset Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: WhatsApp Number & Counselor CTA */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    4. WhatsApp Number &amp; Button Settings
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Contact Number (digits with country code)
                    </label>
                    <input
                      type="text"
                      value={settings.modalWhatsAppEnquiry?.whatsappNumber || ""}
                      onChange={(e) => updateEnquiryField("whatsappNumber", e.target.value)}
                      placeholder="+919311050670"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={settings.modalWhatsAppEnquiry?.buttonText || ""}
                      onChange={(e) => updateEnquiryField("buttonText", e.target.value)}
                      placeholder="Chat on WhatsApp"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bottom Counselor Note Text
                  </label>
                  <textarea
                    rows={2}
                    value={settings.modalWhatsAppEnquiry?.counsellorNote || ""}
                    onChange={(e) => updateEnquiryField("counsellorNote", e.target.value)}
                    placeholder="Or click the button to chat directly with our counsellor."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky 1-to-1 Live Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  Course Modal Live Preview
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  Real-time Sync
                </span>
              </div>

              {/* Exact Reproduction of Course Details Modal Right Column */}
              <div className="bg-[#f8fdfb] rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 xl:p-4 2xl:p-5 border-2 border-[#86efac] shadow-sm flex flex-col h-auto">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <MessageSquare className="w-4.5 h-4.5 sm:w-5 sm:h-5 2xl:w-5.5 2xl:h-5.5 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-[13px] 2xl:text-sm font-semibold text-[#0a2540] leading-tight tracking-tight">
                      {settings.modalWhatsAppEnquiry?.titlePrefix || "Quick Enquiry on"}
                    </h3>
                    <span className="text-base sm:text-lg 2xl:text-xl font-bold text-[#0b8a4b] leading-tight block">
                      {settings.modalWhatsAppEnquiry?.titleHighlight || "WhatsApp"}
                    </span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 mb-1.5 sm:mb-2">
                  {settings.modalWhatsAppEnquiry?.subtitle || "Get instant details about:"}
                </p>

                {/* Checklist - Clean 2-column grid across all screens */}
                <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5 mb-2 sm:mb-2.5">
                  {(settings.modalWhatsAppEnquiry?.checklist || DEFAULT_MODAL_ENQUIRY.checklist).map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-1 sm:gap-1.5 text-[10.5px] sm:text-[11px] 2xl:text-xs">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#059669] stroke-[3] flex-shrink-0" />
                      <span className="font-medium text-[#0a2540] leading-tight truncate" title={item}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* QR Code Widget Mockup */}
                <div className="my-1 flex justify-center">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border-[2px] sm:border-[2.5px] border-[#22c55e] shadow-xs flex items-center justify-center mx-auto transition-all">
                    <img
                      src={
                        settings.modalWhatsAppEnquiry?.qrImage?.startsWith("/Uploads/")
                          ? `http://localhost:4001${settings.modalWhatsAppEnquiry?.qrImage}`
                          : (settings.modalWhatsAppEnquiry?.qrImage || "/whatsapp_qr.png")
                      }
                      alt="WhatsApp QR Code Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const cleanNum = (settings.modalWhatsAppEnquiry?.whatsappNumber || "919311050670").replace(/[^0-9]/g, '');
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://wa.me/${cleanNum}`)}`;
                      }}
                    />
                    <div className="absolute w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none">
                      <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Big Green WhatsApp Button */}
                <div className="mt-2 sm:mt-2.5">
                  <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#00b050] to-[#009b44] text-white font-semibold text-xs sm:text-[13px] 2xl:text-sm shadow-md shadow-emerald-600/30">
                    <MessageSquare className="w-4 h-4 fill-current flex-shrink-0" />
                    <span>{settings.modalWhatsAppEnquiry?.buttonText || "Chat on WhatsApp"}</span>
                    <ChevronRight className="w-4 h-4 stroke-[3] flex-shrink-0" />
                  </div>
                </div>

                {/* Bottom Counselor Note */}
                <div className="flex items-start justify-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <MessageSquare className="w-2 h-2 fill-current" />
                  </div>
                  <p className="text-[9.5px] sm:text-[10px] 2xl:text-[10.5px] font-normal text-[#1e3a5f] text-left leading-tight whitespace-pre-line">
                    {settings.modalWhatsAppEnquiry?.counsellorNote || "Or click the button to chat directly with our counsellor."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ── 4. SOCIAL MEDIA HANDLES SECTION ── */}
      {/* ===================================================================== */}
      {activeTab === "social" && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <Share2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Official Institute Social Handles
                </h3>
                <p className="text-xs text-slate-500">
                  All 6 channels appear in the top marquee and footer across the whole website.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 hidden sm:inline-block">
              6 Channels Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {socialPlatforms.map((item) => {
              const Icon = item.icon;
              const val = settings.socialLinks[item.key] || "";
              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition space-y-2 group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-xs ${item.bgClass}`}>
                        <Icon className={`w-3.5 h-3.5 ${item.iconClass}`} />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{item.name}</span>
                    </div>
                    {val && (
                      <a
                        href={val}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-600 p-1"
                        title={`Open live ${item.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <input
                    type="url"
                    value={val}
                    onChange={(e) => handleSocialChange(item.key, e.target.value)}
                    placeholder={item.placeholder}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 transition outline-none font-medium"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ── 5. TOP ANNOUNCEMENT BAR SECTION ── */}
      {/* ===================================================================== */}
      {activeTab === "topbar" && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Header Top Marquee &amp; Hotline Bar
                </h3>
                <p className="text-xs text-slate-500">
                  Dynamic marquee ticker, established badges, and contact hotline.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1 transition cursor-pointer"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPreview ? "Hide Preview" : "Show Header Preview"}</span>
            </button>
          </div>

          {/* Collapsible Preview */}
          {showPreview && (
            <div className="bg-[#00488f] px-3 sm:px-6 py-2 rounded-xl flex items-center justify-between gap-3 text-white text-xs overflow-x-auto whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300">Since {settings.topBar.sinceYear || "2002"}</span>
                <span>• {settings.topBar.sinceText}</span>
                <span>• {settings.topBar.admissionsText}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-amber-300">
                <Phone className="w-3 h-3" />
                <span>{settings.topBar.phone}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* Tagline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Core Motto / Tagline
              </label>
              <input
                type="text"
                value={settings.topBar.tagline}
                onChange={(e) => handleTopBarChange("tagline", e.target.value)}
                placeholder="Learn • Build • Grow"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 font-semibold outline-none"
              />
            </div>

            {/* Since Badge Year */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Founding Year
              </label>
              <input
                type="text"
                value={settings.topBar.sinceYear}
                onChange={(e) => handleTopBarChange("sinceYear", e.target.value)}
                placeholder="2002"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 font-semibold outline-none"
              />
            </div>

            {/* Admissions Banner */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admissions Callout
              </label>
              <input
                type="text"
                value={settings.topBar.admissionsText}
                onChange={(e) => handleTopBarChange("admissionsText", e.target.value)}
                placeholder="Admissions Open 2026-27"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 font-semibold outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hotline Phone
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={settings.topBar.phone}
                  onChange={(e) => handleTopBarChange("phone", e.target.value)}
                  placeholder="+91-9311050670"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 font-semibold outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Support Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={settings.topBar.email}
                  onChange={(e) => handleTopBarChange("email", e.target.value)}
                  placeholder="info@aayushinstitute.com"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 font-semibold outline-none"
                />
              </div>
            </div>

            {/* Placement Text */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Placement Guarantee Text
              </label>
              <input
                type="text"
                value={settings.topBar.placementText}
                onChange={(e) => handleTopBarChange("placementText", e.target.value)}
                placeholder="100% Placement Support"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 font-semibold outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── 6. Bottom Sticky Save Bar (For Global Site Settings) ── */}
      {activeTab !== "testimonials" && activeTab !== "blogs" && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All changes in site banners, social handles, and hotline update live on the website.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              Reset Site Defaults
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shadow-indigo-600/20 transition active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving Changes..." : "Save Settings"}
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ── 7. ADD / EDIT BLOG MODAL ── */}
      {/* ===================================================================== */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-900 to-[#00285e] text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base">
                    {editingBlog ? "Edit Blog Article" : "Publish New Article"}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Set display priority number to show first (e.g. 1) on the website.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleBlogFormSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* Row 1: Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Top 7 High-Paying Tech Career Opportunities for Students in 2026"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-900 font-semibold outline-none"
                />
              </div>

              {/* Row 2: Priority Order, Category/Tag, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Priority Display Order */}
                <div>
                  <label className="block text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5" />
                    <span>Display Priority (1 = 1st) *</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={blogForm.displayOrder}
                    onChange={(e) => setBlogForm({ ...blogForm, displayOrder: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-indigo-50/50 focus:bg-white border border-indigo-200 focus:border-indigo-500 rounded-xl text-indigo-900 font-extrabold outline-none"
                    title="1 will appear first on homepage"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Lower number = Shows first on homepage
                  </span>
                </div>

                {/* Tag / Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={blogForm.tag}
                    onChange={(e) => setBlogForm({ ...blogForm, tag: e.target.value })}
                    placeholder="e.g. Career, Web Dev, AI"
                    className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 outline-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Publish Status
                  </label>
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 font-bold outline-none cursor-pointer"
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Author, Read Time, Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author / Department
                  </label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="Placement Cell"
                    className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="3 min read"
                    className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="text"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    placeholder="12 Sep 2025"
                    className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Cover Image with Live Preview, Presets, Upload & URL */}
              <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Article Cover Image &amp; Media *
                  </label>
                  <span className="text-[10px] text-indigo-600 font-semibold">
                    1-Click Presets or Custom Upload
                  </span>
                </div>

                {/* Live Preview Box */}
                <div className="flex flex-col sm:flex-row items-center gap-3.5 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="w-28 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative shrink-0 shadow-xs">
                    <img
                      src={
                        imageFile
                          ? URL.createObjectURL(imageFile)
                          : resolveBlogImageUrl(blogForm.coverImageUrl || blogForm.coverImage)
                      }
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/ayush_circle_logo.png";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      Active Image Source:
                    </span>
                    <p className="text-[11px] text-slate-500 font-mono truncate">
                      {imageFile ? `Local File: ${imageFile.name}` : (blogForm.coverImageUrl || blogForm.coverImage || "/corporate_ai.jpg")}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Renders in 90% modal and homepage slider
                    </span>
                  </div>
                </div>

                {/* 1-Click Institute Preset Selectors */}
                <div>
                  <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Click to Choose Institute Preset Image:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_BLOG_IMAGES.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setBlogForm({ ...blogForm, coverImage: preset.url, coverImageUrl: preset.url });
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1 ${
                          (blogForm.coverImageUrl || blogForm.coverImage) === preset.url && !imageFile
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                        }`}
                      >
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload or Custom URL Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Or Upload From Your Device:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0] || null;
                        setImageFile(file);
                        if (file) {
                          setBlogForm({ ...blogForm, coverImageUrl: "" });
                        }
                      }}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-indigo-600 hover:file:text-white cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Or Enter Custom Image URL:
                    </label>
                    <input
                      type="text"
                      value={blogForm.coverImageUrl}
                      onChange={(e) => {
                        setImageFile(null);
                        setBlogForm({ ...blogForm, coverImageUrl: e.target.value, coverImage: e.target.value });
                      }}
                      placeholder="https://images.unsplash.com/... or /blog_..."
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Short Description / Excerpt (Pull Quote) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description / Excerpt (Shows on card &amp; popup quote) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.shortDescription}
                  onChange={(e) => setBlogForm({ ...blogForm, shortDescription: e.target.value })}
                  placeholder="Real-world project experience bridges the gap between classroom concepts and high-velocity corporate engineering standards."
                  className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 outline-none"
                />
              </div>

              {/* Row 6: Detailed Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Article Content *
                </label>
                <textarea
                  rows={4}
                  required
                  value={blogForm.longDescription}
                  onChange={(e) => setBlogForm({ ...blogForm, longDescription: e.target.value })}
                  placeholder="Internships offer invaluable exposure to agile development workflows, sprint planning, pull request reviews, and production bug resolutions..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 outline-none"
                />
              </div>

              {/* Row 7: Highlights (Key Takeaways) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Article Highlights / Key Takeaways (Bullet points)
                </label>
                <div className="space-y-2">
                  {blogForm.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                        ✓
                      </span>
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => {
                          const updated = [...blogForm.highlights];
                          updated[i] = e.target.value;
                          setBlogForm({ ...blogForm, highlights: updated });
                        }}
                        placeholder={`Highlight #${i + 1}`}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg text-slate-800 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 8: Related Link */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Related Course Link (CTA)
                </label>
                <input
                  type="text"
                  value={blogForm.relatedLink}
                  onChange={(e) => setBlogForm({ ...blogForm, relatedLink: e.target.value })}
                  placeholder="/Courses or /LiveProject"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition active:scale-95 cursor-pointer"
                >
                  {editingBlog ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
