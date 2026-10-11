import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  Plus,
  Upload,
  Download,
  Eye,
  Edit3,
  Trash2,
  Clock,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  FolderArchive,
  Monitor,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  RefreshCw,
  MoreVertical,
  ExternalLink,
  BookOpen,
  DollarSign,
  Layers,
  GraduationCap,
  Image as ImageIcon,
  Star,
  Calendar,
  BadgePercent,
  Briefcase,
  Tag,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

import { FALLBACK_INSTITUTE_COURSES } from "../../data/fallbackCourses";

// Default placeholder images matching the exact lab/workstation theme in screenshots
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", // UI/UX workstation
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // MERN dev team
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", // Graphic designing lab
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Python coding screen
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80", // Digital marketing classroom
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // AI machine learning
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", // Cloud computing
];

const PRESET_BANNERS = [
  { label: "UI/UX & Web", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" },
  { label: "MERN Stack", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" },
  { label: "Graphic Design", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" },
  { label: "Python & AI", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
  { label: "Digital Marketing", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" },
  { label: "Cloud & Cyber", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
];

const INSTRUCTORS_POOL = [
  { name: "Neha Kapoor", avatar: "NK", color: "bg-purple-100 text-purple-700" },
  { name: "Arjun Mehta", avatar: "AM", color: "bg-indigo-100 text-indigo-700" },
  { name: "Riya Sharma", avatar: "RS", color: "bg-blue-100 text-blue-700" },
  { name: "Kabir Singh", avatar: "KS", color: "bg-sky-100 text-sky-700" },
  { name: "Maya Joshi", avatar: "MJ", color: "bg-violet-100 text-violet-700" },
  { name: "Aman Verma", avatar: "AV", color: "bg-emerald-100 text-emerald-700" },
];

export default function CoursesAdmin({
  initialProgramType = "all",
  pageTitle,
  pageSubtitle,
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"
  const [selectedIds, setSelectedIds] = useState([]);
  const [notification, setNotification] = useState({ type: "", text: "" });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [programTypeFilter, setProgramTypeFilter] = useState(initialProgramType);

  useEffect(() => {
    setProgramTypeFilter(initialProgramType);
    setCurrentPage(1);
  }, [initialProgramType]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [admissionsFilter, setAdmissionsFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [showFilterDropdowns, setShowFilterDropdowns] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = viewMode === "grid" ? 6 : 7;

  // Modals
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [modalTab, setModalTab] = useState("basic"); // "basic", "academics", "faculty", "curriculum"
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [saving, setSaving] = useState(false);

  // Default Course Form
  const defaultForm = {
    title: "",
    categoryName: "Software & Web",
    type: "Professional",
    duration: "3–4 Months",
    fees: "₹ 45,000/-",
    scholarship: "Up to 50%",
    mode: "Classroom / Online / Hybrid",
    eligibility: "10th / 12th / Any Stream / Creative Aspirants",
    certification: "Certificate in Professional Web Designer",
    batchSchedule: "Weekday & Weekend Batches",
    instructorName: "Neha Kapoor",
    instructorAvatar: "NK",
    enrollments: 120,
    admissions: "Active Admissions",
    status: "Published",
    description: "",
    image: "",
    skills: "HTML5, CSS3, JavaScript, Responsive Design",
    careerAreas: "Web Designer, Frontend Specialist, WordPress Developer, UI Layout Designer",
    features: "HTML5 & Modern CSS3 Responsive Layouts\nCore JavaScript, DOM Events & WordPress\nCSS Flexbox & CSS Grid Mastery\nLive Website Deployment",
    popular: true,
    order: 1,
    programType: "course",
    badge: "POPULAR",
    degrees: "",
    suitableFor: "",
    delivery: "On-Site / Online / Hybrid",
  };
  const [courseForm, setCourseForm] = useState(defaultForm);

  const showNotice = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: "", text: "" }), 4000);
  };

  // Instant Priority / Pin-to-Top Handler
  const handleSetPriority = async (courseId, newOrder = 1) => {
    try {
      await axios.patch(`/api/courses/${courseId}/priority`, { order: Number(newOrder) });
      showNotice("success", `Priority updated! Course is now #${newOrder} position.`);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("corporateCoursesUpdated"));
      window.dispatchEvent(new Event("universityCoursesUpdated"));
      window.dispatchEvent(new Event("liveProjectsUpdated"));
      await fetchCourses();
    } catch (err) {
      showNotice("error", "Failed to update course priority.");
    }
  };

  // Load courses from backend MongoDB (with auto-seed & offline resilience)
  const fetchCourses = async () => {
    setLoading(true);
    try {
      let list = [];
      try {
        const res = await axios.get("/api/courses");
        list = Array.isArray(res?.data) ? res.data : res?.data?.data || [];
      } catch (primaryErr) {
        console.warn("Primary /api/courses fetch failed, trying direct endpoint:", primaryErr);
        const isLocal = typeof window !== 'undefined' && 
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        const fallbackUrl = isLocal 
          ? "http://localhost:4001/api/courses" 
          : "https://aayushinstitute.onrender.com/api/courses";
        try {
          const fbRes = await axios.get(fallbackUrl);
          list = Array.isArray(fbRes?.data) ? fbRes.data : fbRes?.data?.data || [];
        } catch (fbErr) {
          console.warn("Direct endpoint also failed:", fbErr);
        }
      }

      // If backend returned 0 courses, trigger auto-seed
      if (!list || list.length === 0) {
        try {
          const seedRes = await axios.get("/api/courses/seed");
          list = seedRes?.data?.courses || (Array.isArray(seedRes?.data) ? seedRes.data : []);
        } catch (seedErr) {
          console.warn("Auto-seed endpoint error:", seedErr);
        }
      }

      // If still empty (e.g. backend sleeping, cold start or offline), use guaranteed fallback courses
      if (!list || list.length === 0) {
        list = FALLBACK_INSTITUTE_COURSES;
      }

      // Normalize missing fields to match ERP structure
      const normalized = list.map((c, idx) => {
        const fallbackInstructor = INSTRUCTORS_POOL[idx % INSTRUCTORS_POOL.length];
        const fallbackImg = DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length];
        
        let normalizedStatus = c.status;
        if (!normalizedStatus) {
          normalizedStatus = c.visible === false ? "Draft" : "Published";
        }

        let normalizedAdmissions = c.admissions;
        if (!normalizedAdmissions) {
          normalizedAdmissions = idx % 4 === 0 ? "Upcoming" : idx % 7 === 6 ? "Closed" : "Active Admissions";
        }

        let normalizedMode = c.mode;
        if (!normalizedMode) {
          normalizedMode = idx % 3 === 0 ? "Hybrid" : idx % 3 === 1 ? "Classroom" : "Online";
        }

        let normalizedCategory = c.categoryName || c.subgroup;
        if (!normalizedCategory) {
          if (c.categoryId === "software") normalizedCategory = "Software & Web";
          else if (c.categoryId === "design") normalizedCategory = "Design & Media";
          else if (c.categoryId === "marketing") normalizedCategory = "Digital Marketing";
          else if (c.categoryId === "hardware") normalizedCategory = "AI, Data & Cloud";
          else if (c.categoryId === "ai") normalizedCategory = "AI & Generative AI";
          else if (c.categoryId === "distance") normalizedCategory = "University Courses";
          else if (c.categoryId === "web") normalizedCategory = "Web & Software Development";
          else normalizedCategory = "Professional Studies";
        }

        return {
          ...c,
          title: c.title || c.name || "Untitled Course",
          categoryName: normalizedCategory,
          type: c.type || "Professional",
          duration: c.duration || "6 Months",
          mode: normalizedMode,
          order: typeof c.order === "number" ? c.order : 99,
          programType: c.programType || "course",
          badge: c.badge || (c.popular ? "POPULAR" : ""),
          degrees: c.degrees || "",
          suitableFor: c.suitableFor || "",
          delivery: c.delivery || "On-Site / Online / Hybrid",
          instructor: c.instructor?.name
            ? c.instructor
            : { name: fallbackInstructor.name, avatar: fallbackInstructor.avatar },
          enrollments: typeof c.enrollments === "number" ? c.enrollments : 80 + ((idx * 17) % 75),
          admissions: normalizedAdmissions,
          status: normalizedStatus,
          description: c.description || c.oneLiner || c.details || "Comprehensive practical training with industry capstone projects.",
          image: c.image && !c.image.startsWith("/") ? c.image : fallbackImg,
          skills: Array.isArray(c.skills) ? c.skills : (c.skills ? [c.skills] : ["Fundamentals", "Practical", "Certification"]),
        };
      });

      setCourses(normalized);
    } catch (err) {
      console.error("Failed to load courses:", err);
      setCourses(FALLBACK_INSTITUTE_COURSES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const relevantCourses = useMemo(() => {
    if (programTypeFilter === "all") {
      return courses;
    }
    return courses.filter((c) => (c.programType || "course") === programTypeFilter);
  }, [courses, programTypeFilter]);

  const stats = useMemo(() => {
    const total = relevantCourses.length;
    const published = relevantCourses.filter((c) => c.status === "Published").length;
    const draft = relevantCourses.filter((c) => c.status === "Draft").length;
    const admissions = relevantCourses.filter((c) => c.admissions === "Active Admissions").length;
    const archived = relevantCourses.filter((c) => c.status === "Archived").length;
    return { total, published, draft, admissions, archived };
  }, [relevantCourses]);

  // Extract unique categories for filter dropdown
  const availableCategories = useMemo(() => {
    const set = new Set();
    courses.forEach((c) => {
      if (c.categoryName) set.add(c.categoryName);
    });
    return Array.from(set);
  }, [courses]);

  // Filtered and Sorted courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (c.title || "").toLowerCase().includes(q);
          const matchCat = (c.categoryName || "").toLowerCase().includes(q);
          const matchInst = (c.instructor?.name || "").toLowerCase().includes(q);
          const matchDesc = (c.description || "").toLowerCase().includes(q);
          if (!matchTitle && !matchCat && !matchInst && !matchDesc) return false;
        }
        // Program Type Filter (Standard Course vs Corporate vs University vs Live Project)
        if (programTypeFilter !== "all" && (c.programType || "course") !== programTypeFilter) return false;
        // Category Filter
        if (categoryFilter !== "all" && c.categoryName !== categoryFilter) return false;
        // Status Filter
        if (statusFilter !== "all" && c.status !== statusFilter) return false;
        // Mode Filter
        if (modeFilter !== "all" && c.mode !== modeFilter) return false;
        // Admissions Filter
        if (admissionsFilter !== "all" && c.admissions !== admissionsFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "priority") {
          return (a.order ?? 999) - (b.order ?? 999);
        }
        if (sortBy === "enrollments") {
          return (b.enrollments || 0) - (a.enrollments || 0);
        }
        if (sortBy === "name_asc") {
          return (a.title || "").localeCompare(b.title || "");
        }
        if (sortBy === "name_desc") {
          return (b.title || "").localeCompare(a.title || "");
        }
        // default "priority" first, then recent
        if ((a.order ?? 999) !== (b.order ?? 999)) {
          return (a.order ?? 999) - (b.order ?? 999);
        }
        return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
      });
  }, [courses, searchQuery, programTypeFilter, categoryFilter, statusFilter, modeFilter, admissionsFilter, sortBy]);

  // Pagination slicing
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / pageSize));
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCourses.slice(start, start + pageSize);
  }, [filteredCourses, currentPage, pageSize]);

  // Handle Select All Checkbox
  const allPageIds = useMemo(() => paginatedCourses.map((c) => c._id), [paginatedCourses]);
  const isAllSelected = allPageIds.length > 0 && allPageIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allPageIds])));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) return;
    if (action === "delete" && !window.confirm(`Delete ${selectedIds.length} selected courses permanently?`)) {
      return;
    }
    try {
      const res = await axios.post("/api/courses/bulk-action", {
        action,
        ids: selectedIds,
      });
      showNotice("success", res.data?.message || `Bulk ${action} completed successfully.`);
      setSelectedIds([]);
      await fetchCourses();
    } catch (err) {
      // Fallback in case endpoint is updating: do sequential
      try {
        if (action === "delete") {
          await Promise.all(selectedIds.map((id) => axios.delete(`/api/courses/${id}`)));
        } else {
          const statusMap = { publish: "Published", unpublish: "Draft", archive: "Archived" };
          const newStatus = statusMap[action] || "Published";
          await Promise.all(
            selectedIds.map((id) =>
              axios.put(`/api/courses/${id}`, { status: newStatus, visible: newStatus === "Published" })
            )
          );
        }
        showNotice("success", `Updated ${selectedIds.length} courses!`);
        setSelectedIds([]);
        await fetchCourses();
      } catch (fallbackErr) {
        showNotice("error", "Bulk operation failed.");
      }
    }
  };

  // Export to CSV
  const handleExportCSV = (selectedOnly = false) => {
    const listToExport = selectedOnly && selectedIds.length > 0
      ? courses.filter((c) => selectedIds.includes(c._id))
      : filteredCourses;

    if (listToExport.length === 0) {
      showNotice("error", "No courses available to export.");
      return;
    }

    const headers = ["Title", "Category", "Course Type", "Duration", "Mode", "Instructor", "Enrollments", "Admissions", "Status", "Fees"];
    const rows = listToExport.map((c) => [
      `"${(c.title || "").replace(/"/g, '""')}"`,
      `"${(c.categoryName || "").replace(/"/g, '""')}"`,
      `"${c.type || "Professional"}"`,
      `"${c.duration || "6 Months"}"`,
      `"${c.mode || "Classroom"}"`,
      `"${c.instructor?.name || "Arjun Mehta"}"`,
      c.enrollments || 0,
      `"${c.admissions || "Active Admissions"}"`,
      `"${c.status || "Published"}"`,
      `"${(c.fees || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aayush_courses_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice("success", `Exported ${listToExport.length} courses successfully.`);
  };

  // Seed/Sync Official Courses
  const handleSeedCourses = async () => {
    if (!window.confirm("Seed & Update courses in MongoDB to match the official catalog?")) return;
    try {
      setLoading(true);
      const res = await axios.get("/api/courses/seed?force=true");
      showNotice("success", res.data?.message || "Successfully synced courses with MongoDB!");
      await fetchCourses();
    } catch (err) {
      showNotice("error", "Failed to seed courses.");
    } finally {
      setLoading(false);
    }
  };

  // Single Course Delete
  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await axios.delete(`/api/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showNotice("success", `"${title}" was deleted.`);
    } catch (err) {
      showNotice("error", "Failed to delete course.");
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingCourse(null);
    setCourseForm(defaultForm);
    setModalTab("basic");
    setShowCourseModal(true);
  };

  // Open Edit Modal
  const openEditModal = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title || course.name || "",
      categoryName: course.categoryName || course.subgroup || "Software & Web",
      type: course.type || "Professional",
      duration: course.duration || "3–4 Months",
      fees: course.fees || "₹ 45,000/-",
      scholarship: course.scholarship || "Up to 50%",
      mode: course.mode || "Classroom / Online / Hybrid",
      eligibility: course.eligibility || "10th / 12th / Any Stream / Creative Aspirants",
      certification: course.certification || "Certified Professional",
      batchSchedule: course.batchSchedule || "Weekday & Weekend Batches",
      instructorName: course.instructor?.name || "Neha Kapoor",
      instructorAvatar: course.instructor?.avatar || "NK",
      enrollments: course.enrollments || 120,
      admissions: course.admissions || "Active Admissions",
      status: course.status || "Published",
      description: course.description || course.oneLiner || course.details || "",
      image: course.image || "",
      skills: Array.isArray(course.skills) ? course.skills.join(", ") : course.skills || "",
      careerAreas: course.careerAreas || (Array.isArray(course.career) ? course.career.join(", ") : ""),
      features: Array.isArray(course.features) ? course.features.join("\n") : (course.features || ""),
      popular: !!course.popular,
      order: course.order ?? 1,
      programType: course.programType || "course",
      badge: course.badge || (course.popular ? "POPULAR" : ""),
      degrees: course.degrees || "",
      suitableFor: course.suitableFor || "",
      delivery: course.delivery || "On-Site / Online / Hybrid",
    });
    setModalTab("basic");
    setShowCourseModal(true);
  };

  // Save Add/Edit Form
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.title.trim()) {
      setModalTab('basic');
      showNotice('error', 'Please provide a Course Title in the Basic Info tab.');
      return;
    }
    setSaving(true);
    try {
      const skillsArray = courseForm.skills
        ? String(courseForm.skills).split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const featuresArray = courseForm.features
        ? String(courseForm.features).split("\n").map((s) => s.trim()).filter(Boolean)
        : [];
      const careerArray = courseForm.careerAreas
        ? String(courseForm.careerAreas).split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const payload = {
        title: courseForm.title,
        name: courseForm.title,
        categoryName: courseForm.categoryName,
        subgroup: courseForm.categoryName,
        type: courseForm.type,
        duration: courseForm.duration,
        fees: courseForm.fees,
        scholarship: courseForm.scholarship,
        mode: courseForm.mode,
        eligibility: courseForm.eligibility,
        certification: courseForm.certification,
        batchSchedule: courseForm.batchSchedule,
        instructor: {
          name: courseForm.instructorName,
          avatar: courseForm.instructorAvatar || courseForm.instructorName.slice(0, 2).toUpperCase(),
        },
        enrollments: Number(courseForm.enrollments) || 0,
        admissions: courseForm.admissions,
        status: courseForm.status,
        visible: courseForm.status === "Published",
        description: courseForm.description,
        oneLiner: courseForm.description,
        details: courseForm.description,
        image: courseForm.image || DEFAULT_IMAGES[0],
        skills: skillsArray,
        features: featuresArray,
        careerAreas: courseForm.careerAreas,
        career: careerArray,
        popular: !!courseForm.popular,
        order: Number(courseForm.order) || 1,
        programType: courseForm.programType || "course",
        badge: courseForm.badge || "",
        degrees: courseForm.degrees || "",
        suitableFor: courseForm.suitableFor || "",
        delivery: courseForm.delivery || "On-Site / Online / Hybrid",
      };

      if (editingCourse) {
        await axios.put(`/api/courses/${editingCourse._id}`, payload);
        showNotice("success", `"${courseForm.title}" updated successfully in MongoDB!`);
      } else {
        await axios.post("/api/courses", payload);
        showNotice("success", `New course "${courseForm.title}" created successfully!`);
      }

      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("corporateCoursesUpdated"));
      window.dispatchEvent(new Event("universityCoursesUpdated"));
      window.dispatchEvent(new Event("liveProjectsUpdated"));

      setShowCourseModal(false);
      await fetchCourses();
    } catch (err) {
      console.error(err);
      showNotice("error", "Failed to save course. Please check inputs.");
    } finally {
      setSaving(false);
    }
  };

  // Helper Badge Color getters matching screenshots
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Design & Media":
        return "bg-[#eff6ff] text-[#2563eb] border border-blue-100";
      case "Software & Web":
        return "bg-[#ede9fe] text-[#6d28d9] border border-purple-100";
      case "Digital Marketing":
        return "bg-[#e0f2fe] text-[#0284c7] border border-sky-100";
      case "AI, Data & Cloud":
        return "bg-[#f5f3ff] text-[#7c3aed] border border-violet-100";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return {
          dot: "bg-emerald-500",
          text: "text-emerald-700",
          bg: "bg-emerald-50",
          label: "Published",
        };
      case "Draft":
        return {
          dot: "bg-amber-500",
          text: "text-amber-700",
          bg: "bg-amber-50",
          label: "Draft",
        };
      case "Coming Soon":
        return {
          dot: "bg-purple-500",
          text: "text-purple-700",
          bg: "bg-purple-50",
          label: "Coming Soon",
        };
      case "Archived":
      default:
        return {
          dot: "bg-gray-400",
          text: "text-gray-600",
          bg: "bg-gray-100",
          label: "Archived",
        };
    }
  };

  const getAdmissionsBadgeClass = (admission) => {
    switch (admission) {
      case "Active Admissions":
        return "bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]";
      case "Upcoming":
        return "bg-[#eef2ff] text-[#4f46e5] border border-[#c7d2fe]";
      case "Closed":
      default:
        return "bg-[#fff1f2] text-[#e11d48] border border-[#fecdd3]";
    }
  };

  const getInstructorAvatarStyle = (avatar) => {
    const match = INSTRUCTORS_POOL.find((p) => p.avatar === avatar);
    return match ? match.color : "bg-purple-100 text-purple-700";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-16">
      {/* Toast Notification */}
      {notification.text && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl border flex items-center gap-3 animate-fade-in ${
            notification.type === "error"
              ? "bg-rose-50 text-rose-800 border-rose-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          )}
          <span className="text-sm font-medium">{notification.text}</span>
          <button onClick={() => setNotification({ type: "", text: "" })}>
            <X className="w-4 h-4 ml-2 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">

        {/* Top Header Row with Title, Badge and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-indigo-50/20 to-purple-50/20 p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 text-[11px] font-bold text-indigo-700 mb-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Unified Academic & Training Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {pageTitle || (
                programTypeFilter === "corporate" ? "Corporate AI & Enterprise Training" :
                programTypeFilter === "university" ? "University Degree Programs" :
                programTypeFilter === "liveproject" ? "Live Project Capstone Programs" :
                programTypeFilter === "course" ? "Professional & Technical Courses" :
                "Courses & Educational Programs"
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {pageSubtitle || (
                programTypeFilter === "corporate" ? "Manage B2B Generative AI & corporate workforce training modules." :
                programTypeFilter === "university" ? "Manage UGC Entitled distance & online degree programs." :
                programTypeFilter === "liveproject" ? "Manage industry-ready full-stack and backend live capstones." :
                programTypeFilter === "course" ? "Manage software, design, marketing, data, and hardware skill courses." :
                "Central management for all 22+ professional courses, live project capstones, corporate tracks & university degrees."
              )}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleSeedCourses}
              title="Sync or Reset courses with MongoDB"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500 rotate-180" />
              Sync Catalog
            </button>
            <button
              onClick={() => handleExportCSV(false)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export CSV
            </button>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-600/25 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add New Course
            </button>
          </div>
        </div>

        {/* 5 Colorful KPI Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Total Offerings */}
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 rounded-2xl p-4 border border-indigo-100 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Offerings</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.total}</span>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">All Tracks</span>
              </div>
            </div>
          </div>

          {/* Published */}
          <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 rounded-2xl p-4 border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Live & Active</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.published}</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Published</span>
              </div>
            </div>
          </div>

          {/* Draft */}
          <div className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-2xl p-4 border border-amber-100 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Draft Courses</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.draft}</span>
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">In Review</span>
              </div>
            </div>
          </div>

          {/* Active Admissions */}
          <div className="bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20 rounded-2xl p-4 border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Admissions Open</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.admissions}</span>
                <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">Enrolling</span>
              </div>
            </div>
          </div>

          {/* Archived */}
          <div className="bg-gradient-to-br from-white via-slate-50 to-zinc-100/50 rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-600 to-zinc-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-slate-500/20">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Archived</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.archived}</span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Stored</span>
              </div>
            </div>
          </div>
        </div>

        {/* Program Offering Segmented Tabs with Colorful Badges */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: "All Offerings", count: courses.length, icon: "🌟", grad: "from-indigo-600 via-purple-600 to-pink-600 shadow-indigo-500/25" },
            { id: "course", label: "Standard Courses", count: courses.filter(c => (!c.programType || c.programType === "course")).length, icon: "🎓", grad: "from-blue-600 to-indigo-600 shadow-blue-500/25" },
            { id: "corporate", label: "Corporate & AI", count: courses.filter(c => c.programType === "corporate").length, icon: "🏢", grad: "from-purple-600 to-fuchsia-600 shadow-purple-500/25" },
            { id: "university", label: "University Degrees", count: courses.filter(c => c.programType === "university").length, icon: "🏛️", grad: "from-amber-500 to-orange-600 shadow-amber-500/25" },
            { id: "liveproject", label: "Live Project Capstone", count: courses.filter(c => c.programType === "liveproject").length, icon: "💻", grad: "from-emerald-600 to-teal-600 shadow-emerald-500/25" },
          ].map((tab) => {
            const isCurrent = programTypeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setProgramTypeFilter(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? `bg-gradient-to-r ${tab.grad} text-white shadow-md`
                    : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 shadow-xs"
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition-all ${
                  isCurrent ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls & Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-3.5">
          {/* Top Controls Row: Search + Filter Toggle + Table/Grid Switcher */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search courses, categories, instructors..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={() => setShowFilterDropdowns(!showFilterDropdowns)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  showFilterDropdowns
                    ? "bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
                <span className="w-4 h-4 rounded-full bg-[#6d28d9] text-white text-[10px] flex items-center justify-center font-bold">
                  4
                </span>
              </button>

              {/* View Switcher: Table / Grid */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setViewMode("table")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "table"
                      ? "bg-[#6d28d9] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  Table
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "grid"
                      ? "bg-[#6d28d9] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Filter Dropdowns Row */}
          {showFilterDropdowns && (
            <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Categories */}
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                >
                  <option value="all">All Categories</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Statuses */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                >
                  <option value="all">All Statuses</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Archived">Archived</option>
                </select>

                {/* Modes */}
                <select
                  value={modeFilter}
                  onChange={(e) => {
                    setModeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                >
                  <option value="all">All Modes</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Online">Online</option>
                </select>

                {/* Admissions */}
                <select
                  value={admissionsFilter}
                  onChange={(e) => {
                    setAdmissionsFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                >
                  <option value="all">All Admissions</option>
                  <option value="Active Admissions">Active Admissions</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Closed">Closed</option>
                </select>

                {/* Sort Order */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                >
                  <option value="priority">Priority Order (#1 Top)</option>
                  <option value="recent">Recently Updated</option>
                  <option value="enrollments">Enrollments: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                </select>
              </div>

              {(categoryFilter !== "all" ||
                statusFilter !== "all" ||
                modeFilter !== "all" ||
                admissionsFilter !== "all" ||
                searchQuery !== "") && (
                <button
                  onClick={() => {
                    setCategoryFilter("all");
                    setStatusFilter("all");
                    setModeFilter("all");
                    setAdmissionsFilter("all");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="text-gray-500 hover:text-[#6d28d9] font-medium transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Batch Selection Action Bar (Matching Screenshot 3) */}
        {selectedIds.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-3 flex flex-wrap items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 text-[#6d28d9] rounded border-gray-300 focus:ring-[#6d28d9] cursor-pointer"
              />
              <span className="text-sm font-semibold text-gray-900">
                {selectedIds.length} course{selectedIds.length > 1 ? "s" : ""} selected
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleBulkAction("publish")}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all"
              >
                Publish
              </button>
              <button
                onClick={() => handleBulkAction("unpublish")}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all"
              >
                Unpublish
              </button>
              <button
                onClick={() => handleBulkAction("archive")}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all"
              >
                Archive
              </button>
              <button
                onClick={() => handleExportCSV(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5 text-gray-500" />
                Export
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#ef4444] hover:bg-[#dc2626] rounded-xl shadow-sm transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <RefreshCw className="w-8 h-8 text-[#6d28d9] animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600">Loading courses from MongoDB database...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-50 text-[#6d28d9] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">No courses found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              No course matches your current filter or search criteria. Try clearing filters or adding a new course.
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#6d28d9] rounded-xl hover:bg-[#5b21b6]"
            >
              Add New Course
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* ========================================================================= */
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => {
              const statusInfo = getStatusBadge(course.status);
              return (
                <div
                  key={course._id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Accent Ribbon */}
                    <div
                      className={`h-1.5 w-full ${
                        course.programType === "corporate"
                          ? "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"
                          : course.programType === "university"
                          ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500"
                          : course.programType === "liveproject"
                          ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
                          : "bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-600"
                      }`}
                    />

                    {/* Top Image with Status Overlay */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={course.image || DEFAULT_IMAGES[0]}
                        alt={course.title}
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGES[0];
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Status Badge Overlaid on Top-Left */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-sm ${statusInfo.bg} ${statusInfo.text} border border-white/50`}
                        >
                          <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
                          {statusInfo.label}
                        </span>
                      </div>

                      {/* Priority # Overlaid on Top-Right */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetPriority(course._id, 1);
                          }}
                          title={course.order === 1 ? "Rank #1 (Top of Catalog)" : "Click to pin to Rank #1"}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm transition-all border ${
                            course.order === 1
                              ? "bg-amber-500 text-white border-amber-300"
                              : "bg-white/95 text-slate-700 hover:bg-amber-50 hover:text-amber-800 border-slate-200"
                          }`}
                        >
                          ⭐ #{course.order ?? 99} {course.order === 1 ? "TOP" : "Set #1"}
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      {/* Category & Program Tag & Fees */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-lg ${getCategoryBadgeClass(
                              course.categoryName
                            )}`}
                          >
                            {course.categoryName}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                              course.programType === "corporate"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : course.programType === "university"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : course.programType === "liveproject"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {course.programType === "corporate" ? "🏢 Corporate" :
                             course.programType === "university" ? "🏛️ Degree" :
                             course.programType === "liveproject" ? "💻 Capstone" : "🎓 Course"}
                          </span>
                        </div>
                        {course.fees && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                            {course.fees}
                          </span>
                        )}
                      </div>

                      {/* Course Title */}
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>

                      {/* Description Snippet */}
                      <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px] leading-relaxed">
                        {course.description}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {course.skills &&
                          course.skills.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        {course.skills && course.skills.length > 3 && (
                          <span className="text-[10px] font-semibold text-slate-400 self-center">
                            +{course.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Meta Information Line */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{course.duration || "6 Months"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-purple-500" />
                          <span className="truncate max-w-[110px]">{course.certification || "Certified"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{course.enrollments || 96} enrolled</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Row: Admissions Badge + View/Edit Buttons */}
                  <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span
                      className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getAdmissionsBadgeClass(
                        course.admissions
                      )}`}
                    >
                      {course.admissions}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewingCourse(course)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-xs transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(course)}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xs transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================================= */
          /* TABLE VIEW (Screenshot 2 & 3)                                             */
          /* ========================================================================= */
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#fbfcfd] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#6d28d9] rounded border-gray-300 focus:ring-[#6d28d9] cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">COURSE</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">RANK</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">CATEGORY</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">TRACK / PROGRAM</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">DURATION</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">MODE</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">INSTRUCTOR</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">ENROLLMENTS</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">ADMISSIONS</th>
                    <th className="py-3.5 px-4 font-bold text-gray-700">STATUS</th>
                    <th className="py-3.5 px-4 text-right font-bold text-gray-700">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {paginatedCourses.map((course) => {
                    const isSelected = selectedIds.includes(course._id);
                    const statusInfo = getStatusBadge(course.status);

                    return (
                      <tr
                        key={course._id}
                        className={`hover:bg-[#fbfbfe] transition-colors ${
                          isSelected ? "bg-purple-50/40" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(course._id)}
                            className="w-4 h-4 text-[#6d28d9] rounded border-gray-300 focus:ring-[#6d28d9] cursor-pointer"
                          />
                        </td>

                        {/* Course (Thumb + Title + Snippet) */}
                        <td className="py-3.5 px-4 min-w-[240px]">
                          <div className="flex items-center gap-3">
                            <img
                              src={course.image || DEFAULT_IMAGES[0]}
                              alt={course.title}
                              onError={(e) => {
                                e.target.src = DEFAULT_IMAGES[0];
                              }}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-gray-900 text-xs hover:text-[#6d28d9] transition-colors line-clamp-1">
                                {course.title}
                              </p>
                              <p className="text-[11px] text-gray-400 line-clamp-1 max-w-xs mt-0.5">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Rank / Order */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                              course.order === 1 ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-gray-100 text-gray-700"
                            }`}>
                              #{course.order ?? 99}
                            </span>
                            {course.order !== 1 && (
                              <button
                                onClick={() => handleSetPriority(course._id, 1)}
                                title="Promote to Top (#1 position on website)"
                                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
                              >
                                Set #1
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block font-semibold px-2.5 py-0.5 rounded-md text-[11px] ${getCategoryBadgeClass(
                              course.categoryName
                            )}`}
                          >
                            {course.categoryName}
                          </span>
                        </td>

                        {/* Course Type */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-gray-600 font-medium">
                          course.programType === "corporate" ? "🏢 Corporate" : course.programType === "university" ? "🏛️ University" : course.programType === "liveproject" ? "💻 Capstone" : "🎓 Course"
                        </td>

                        {/* Duration */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-gray-600">
                          {course.duration || "6 Months"}
                        </td>

                        {/* Mode */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
                            {course.mode || "Classroom"}
                          </span>
                        </td>

                        {/* Instructor (Avatar circle with initials + Name) */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${getInstructorAvatarStyle(
                                course.instructor?.avatar
                              )}`}
                            >
                              {course.instructor?.avatar || "NK"}
                            </span>
                            <span className="text-gray-700 font-medium">
                              {course.instructor?.name || "Neha Kapoor"}
                            </span>
                          </div>
                        </td>

                        {/* Enrollments */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-bold text-gray-900">
                          {course.enrollments || 96}
                        </td>

                        {/* Admissions */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${getAdmissionsBadgeClass(
                              course.admissions
                            )}`}
                          >
                            {course.admissions}
                          </span>
                        </td>

                        {/* Status (Dot + Label) */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
                            <span className={`font-semibold text-[11px] ${statusInfo.text}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setViewingCourse(course)}
                              title="View details"
                              className="p-1.5 text-gray-500 hover:text-[#6d28d9] hover:bg-purple-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(course)}
                              title="Edit course"
                              className="p-1.5 text-gray-500 hover:text-[#6d28d9] hover:bg-purple-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course._id, course.title)}
                              title="Delete course"
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Footer */}
        {filteredCourses.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-gray-500">
            <div>
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, filteredCourses.length)}
              </span>{" "}
              of <span className="font-semibold text-gray-800">{filteredCourses.length}</span> courses
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg font-semibold transition-all ${
                      currentPage === pageNum
                        ? "bg-[#6d28d9] text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: Add / Edit Course (Organized, Clean & Colorful Multi-Section Form) */}
      {/* ========================================================================= */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200/90 overflow-hidden animate-fade-in my-6 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-5 px-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                      {editingCourse ? "Edit Course & Program Details" : "Create New Course or Offering"}
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                      {courseForm.programType === "corporate" ? "🏢 Corporate" :
                       courseForm.programType === "university" ? "🏛️ University" :
                       courseForm.programType === "liveproject" ? "💻 Capstone" : "🎓 Standard"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Save to MongoDB catalog • Zero backend adjustments required
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCourseModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step / Section Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-2 px-6 bg-slate-100/80 border-b border-slate-200 overflow-x-auto scrollbar-none shrink-0">
              {[
                { id: "basic", label: "1. Basic Info", icon: BookOpen, color: "text-indigo-600" },
                { id: "academics", label: "2. Fees & Schedule", icon: DollarSign, color: "text-emerald-600" },
                { id: "faculty", label: "3. Trainer & Status", icon: Users, color: "text-amber-600" },
                { id: "curriculum", label: "4. Curriculum & Media", icon: Layers, color: "text-purple-600" },
              ].map((tab) => {
                const isActive = modalTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setModalTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-200/80"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? tab.color : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveCourse} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* ========================================================= */}
              {/* TAB 1: BASIC DETAILS                                      */}
              {/* ========================================================= */}
              <div className={modalTab === "basic" ? "grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in" : "hidden"}>
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Course / Program Title *
                  </label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g. Master in Generative AI & Deep Learning"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all font-semibold text-slate-800"
                  />
                </div>

                {/* Program Offering Type */}
                <div>
                  <label className="block text-xs font-bold text-indigo-700 mb-1.5">
                    Program Offering Track *
                  </label>
                  <select
                    value={courseForm.programType}
                    onChange={(e) => setCourseForm({ ...courseForm, programType: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-indigo-200 bg-indigo-50/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold text-indigo-800 cursor-pointer"
                  >
                    <option value="course">🎓 Standard Course (Skill / Vocational / Tech)</option>
                    <option value="corporate">🏢 Corporate AI & Generative AI Program</option>
                    <option value="university">🏛️ University Distance Degree (UGC Entitled)</option>
                    <option value="liveproject">💻 Live Project Capstone (Industry Ready)</option>
                  </select>
                </div>

                {/* Category Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Category Name
                  </label>
                  <input
                    type="text"
                    list="categoryOptionsList"
                    value={courseForm.categoryName}
                    onChange={(e) => setCourseForm({ ...courseForm, categoryName: e.target.value })}
                    placeholder="e.g. Software & Web or AI & Generative AI"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium text-slate-800"
                  />
                  <datalist id="categoryOptionsList">
                    <option value="AI & Generative AI" />
                    <option value="University Courses" />
                    <option value="Web & Software Development" />
                    <option value="Management & Business" />
                    <option value="Commerce & Finance" />
                    <option value="Computer Applications & IT" />
                    <option value="Arts & Humanities" />
                    <option value="Science Disciplines" />
                    <option value="Education & Teaching" />
                    <option value="Healthcare & Allied Studies" />
                    <option value="Design & Media" />
                    <option value="Software & Web" />
                    <option value="Digital Marketing" />
                    <option value="AI, Data & Cloud" />
                    <option value="Hardware & Networking" />
                    <option value="Vocational Courses" />
                  </datalist>
                </div>

                {/* Priority Order Number */}
                <div>
                  <label className="block text-xs font-bold text-amber-800 mb-1.5">
                    Priority / Pin Order # (1 = Highest Top of Catalog) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={courseForm.order}
                      onChange={(e) => setCourseForm({ ...courseForm, order: Number(e.target.value) || 1 })}
                      placeholder="1"
                      className="w-full px-4 py-2.5 text-sm border border-amber-300 bg-amber-50/40 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-extrabold text-amber-900"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-600">
                      Rank #{courseForm.order}
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-medium mt-1">Courses with order #1 appear first on the portal.</p>
                </div>

                {/* Badge Tag */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Badge Tag (e.g. POPULAR, ENTERPRISE, UGC Entitled)
                  </label>
                  <input
                    type="text"
                    value={courseForm.badge}
                    onChange={(e) => setCourseForm({ ...courseForm, badge: e.target.value })}
                    placeholder="POPULAR / UGC Entitled / Live Project"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Delivery Format */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Delivery Format / Mode Label
                  </label>
                  <input
                    type="text"
                    value={courseForm.delivery}
                    onChange={(e) => setCourseForm({ ...courseForm, delivery: e.target.value })}
                    placeholder="e.g. On-Site / Online / Hybrid / Corporate Cohort"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Contextual: University Degrees */}
                {courseForm.programType === "university" && (
                  <div className="md:col-span-2 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      🏛️ University Degrees / Streams (comma separated)
                    </label>
                    <input
                      type="text"
                      value={courseForm.degrees}
                      onChange={(e) => setCourseForm({ ...courseForm, degrees: e.target.value })}
                      placeholder="e.g. BBA, MBA, PGDBM, Executive Business"
                      className="w-full px-3.5 py-2 text-sm border border-amber-300 bg-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-semibold text-slate-800"
                    />
                  </div>
                )}

                {/* Contextual: Corporate Suitable For */}
                {courseForm.programType === "corporate" && (
                  <div className="md:col-span-2 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200">
                    <label className="block text-xs font-bold text-purple-900 mb-1">
                      🏢 Suitable For Teams / Audience (Corporate Training)
                    </label>
                    <input
                      type="text"
                      value={courseForm.suitableFor}
                      onChange={(e) => setCourseForm({ ...courseForm, suitableFor: e.target.value })}
                      placeholder="e.g. Management, HR, Sales, Marketing, IT Teams"
                      className="w-full px-3.5 py-2 text-sm border border-purple-300 bg-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold text-slate-800"
                    />
                  </div>
                )}
              </div>

              {/* ========================================================= */}
              {/* TAB 2: FEES & SCHEDULE                                   */}
              {/* ========================================================= */}
              <div className={modalTab === "academics" ? "grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in" : "hidden"}>
                {/* Total Fee */}
                <div>
                  <label className="block text-xs font-bold text-emerald-800 mb-1.5">
                    Total Course Fee (Display string)
                  </label>
                  <input
                    type="text"
                    value={courseForm.fees}
                    onChange={(e) => setCourseForm({ ...courseForm, fees: e.target.value })}
                    placeholder="e.g. ₹ 45,000/-"
                    className="w-full px-4 py-2.5 text-sm border border-emerald-200 bg-emerald-50/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-emerald-900"
                  />
                </div>

                {/* Scholarship */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Scholarship / Discount Offered
                  </label>
                  <input
                    type="text"
                    value={courseForm.scholarship}
                    onChange={(e) => setCourseForm({ ...courseForm, scholarship: e.target.value })}
                    placeholder="e.g. Up to 50%"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Course Duration
                  </label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="e.g. 3–4 Months or 6 Months"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Course Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Course Type
                  </label>
                  <select
                    value={courseForm.type}
                    onChange={(e) => setCourseForm({ ...courseForm, type: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-800 cursor-pointer"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Technical">Technical</option>
                    <option value="Certification">Certification</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>

                {/* Mode */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Learning Mode
                  </label>
                  <select
                    value={courseForm.mode}
                    onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-800 cursor-pointer"
                  >
                    <option value="Hybrid">Hybrid (Classroom + Online)</option>
                    <option value="Classroom">Classroom Only</option>
                    <option value="Online">Online Interactive</option>
                  </select>
                </div>

                {/* Batch Schedule */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Batch Schedule
                  </label>
                  <input
                    type="text"
                    value={courseForm.batchSchedule}
                    onChange={(e) => setCourseForm({ ...courseForm, batchSchedule: e.target.value })}
                    placeholder="e.g. Weekday & Weekend Batches"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Eligibility */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Eligibility Requirement
                  </label>
                  <input
                    type="text"
                    value={courseForm.eligibility}
                    onChange={(e) => setCourseForm({ ...courseForm, eligibility: e.target.value })}
                    placeholder="e.g. 10th / 12th / Any Stream / Working Professionals"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Certification */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Certification Title
                  </label>
                  <input
                    type="text"
                    value={courseForm.certification}
                    onChange={(e) => setCourseForm({ ...courseForm, certification: e.target.value })}
                    placeholder="e.g. Certificate in Professional Web Designer"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* ========================================================= */}
              {/* TAB 3: FACULTY & STATUS                                   */}
              {/* ========================================================= */}
              <div className={modalTab === "faculty" ? "grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in" : "hidden"}>
                {/* Instructor Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Assigned Instructor / Lead Faculty
                  </label>
                  <input
                    type="text"
                    value={courseForm.instructorName}
                    onChange={(e) => {
                      const name = e.target.value;
                      const parts = name.trim().split(" ");
                      const avatar = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
                      setCourseForm({ ...courseForm, instructorName: name, instructorAvatar: avatar });
                    }}
                    placeholder="e.g. Neha Kapoor"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 font-semibold"
                  />
                </div>

                {/* Active Enrollments */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Active Enrollments Count
                  </label>
                  <input
                    type="number"
                    value={courseForm.enrollments}
                    onChange={(e) => setCourseForm({ ...courseForm, enrollments: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 font-bold"
                  />
                </div>

                {/* Publish Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Publish Status
                  </label>
                  <select
                    value={courseForm.status}
                    onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-800 font-semibold cursor-pointer"
                  >
                    <option value="Published">🟢 Published (Live on Portal)</option>
                    <option value="Draft">🟡 Draft (Hidden / Under Review)</option>
                    <option value="Coming Soon">🟣 Coming Soon</option>
                    <option value="Archived">⚪ Archived</option>
                  </select>
                </div>

                {/* Admissions */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Admissions State
                  </label>
                  <select
                    value={courseForm.admissions}
                    onChange={(e) => setCourseForm({ ...courseForm, admissions: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-800 font-semibold cursor-pointer"
                  >
                    <option value="Active Admissions">Active Admissions (Open)</option>
                    <option value="Upcoming">Upcoming Batch</option>
                    <option value="Closed">Admissions Closed</option>
                  </select>
                </div>
              </div>

              {/* ========================================================= */}
              {/* TAB 4: CURRICULUM, MEDIA & DESCRIPTION                    */}
              {/* ========================================================= */}
              <div className={modalTab === "curriculum" ? "space-y-4 animate-fade-in" : "hidden"}>
                {/* Skills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Key Skills & Tool Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={courseForm.skills}
                    onChange={(e) => setCourseForm({ ...courseForm, skills: e.target.value })}
                    placeholder="e.g. React.js, Node.js, Express, MongoDB, Tailwind CSS"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Course Highlights */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Course Highlights / Syllabus Bullet Points (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={courseForm.features}
                    onChange={(e) => setCourseForm({ ...courseForm, features: e.target.value })}
                    placeholder="Interactive Full-Stack Lab Projects&#10;Industry Mentor Guidance & Code Reviews&#10;100% Placement Preparation & Mock Interviews"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 font-mono text-xs"
                  />
                </div>

                {/* Career Roles */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Career Opportunities / Job Roles (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={courseForm.careerAreas}
                    onChange={(e) => setCourseForm({ ...courseForm, careerAreas: e.target.value })}
                    placeholder="e.g. Full Stack Developer, Software Engineer, Backend Architect"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Cover Image URL with Presets and Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Cover Banner Image URL
                    </label>
                    <span className="text-[11px] text-slate-500">Unsplash or Cloudinary URL</span>
                  </div>

                  <input
                    type="text"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />

                  {/* Preset chips */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] font-bold text-slate-400">Quick Presets:</span>
                    {PRESET_BANNERS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCourseForm({ ...courseForm, image: preset.url })}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                          courseForm.image === preset.url
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Live preview */}
                  {courseForm.image && (
                    <div className="mt-2 flex items-center gap-3">
                      <div className="relative w-28 h-16 rounded-xl overflow-hidden border border-slate-300 shadow-xs shrink-0">
                        <img
                          src={courseForm.image}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = DEFAULT_IMAGES[0]; }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Live thumbnail configured. Card will display this preview across website catalog.
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Short Description / Curriculum Summary
                  </label>
                  <textarea
                    rows={2}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Hands-on training covering modern technologies and career-oriented project development..."
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Popular Toggle */}
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="popularCheckbox"
                    checked={courseForm.popular}
                    onChange={(e) => setCourseForm({ ...courseForm, popular: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="popularCheckbox" className="text-xs font-bold text-amber-950 cursor-pointer">
                    Display with "★ POPULAR" featured ribbon on main website homepage
                  </label>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCourseModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  {modalTab !== "basic" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (modalTab === "curriculum") setModalTab("faculty");
                        else if (modalTab === "faculty") setModalTab("academics");
                        else if (modalTab === "academics") setModalTab("basic");
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {modalTab !== "curriculum" ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (modalTab === "basic") setModalTab("academics");
                        else if (modalTab === "academics") setModalTab("faculty");
                        else if (modalTab === "faculty") setModalTab("curriculum");
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-all cursor-pointer"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {saving ? "Saving to Database..." : editingCourse ? "Save & Update Course" : "Create New Course"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: View Course Details                                                */}
      {/* ========================================================================= */}
      {viewingCourse && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-fade-in my-8">
            <div className="relative h-48 w-full bg-gray-100">
              <img
                src={viewingCourse.image || DEFAULT_IMAGES[0]}
                alt={viewingCourse.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setViewingCourse(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4">
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md ${
                    getStatusBadge(viewingCourse.status).bg
                  } ${getStatusBadge(viewingCourse.status).text}`}
                >
                  {viewingCourse.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${getCategoryBadgeClass(viewingCourse.categoryName)}`}>
                  {viewingCourse.categoryName}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{viewingCourse.title}</h3>
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{viewingCourse.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block">Duration</span>
                  <span className="font-semibold text-gray-800">{viewingCourse.duration || "6 Months"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Mode</span>
                  <span className="font-semibold text-gray-800">{viewingCourse.mode || "Classroom"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Instructor</span>
                  <span className="font-semibold text-gray-800">{viewingCourse.instructor?.name || "Arjun Mehta"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Enrollments</span>
                  <span className="font-semibold text-gray-800">{viewingCourse.enrollments || 96}</span>
                </div>
              </div>

              {viewingCourse.skills && viewingCourse.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingCourse.skills.map((s, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    const toEdit = viewingCourse;
                    setViewingCourse(null);
                    openEditModal(toEdit);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#6d28d9] rounded-xl hover:bg-[#5b21b6]"
                >
                  Edit This Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
