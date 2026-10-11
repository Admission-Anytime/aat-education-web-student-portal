import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  MessageSquare,
  Quote,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  GraduationCap
} from "lucide-react";

const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL || "https://aayushinstitute.onrender.com";
const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL || "http://localhost:5174";
const DEFAULT_AVATAR = "/rahul_sharma_avatar.jpg";

const PRESET_AVATARS = [
  { label: "Rahul Sharma", path: "/rahul_sharma_avatar.jpg" },
  { label: "Priya Verma", path: "/priya_verma_avatar.jpg" },
  { label: "Aman Gupta", path: "/aman_gupta_avatar.jpg" },
  { label: "Sneha Patel", path: "/sneha_patel_avatar.jpg" },
];

export const resolveAvatarUrl = (img) => {
  if (!img) return DEFAULT_AVATAR;
  if (img.startsWith("data:") || img.startsWith("blob:") || img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }
  if (img.startsWith("/Uploads/") || img.startsWith("Uploads/") || img.startsWith("/uploads/") || img.startsWith("uploads/")) {
    const cleanPath = img.startsWith("/") ? img : `/${img}`;
    return `${BACKEND_BASE}${cleanPath}`;
  }
  return img.startsWith("/") ? img : `/${img}`;
};

export default function Testimonial({ embedded = false }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, published, hidden

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalSubmitting, setModalSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    message: "",
    rating: 5,
    visible: true,
    profileImageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(DEFAULT_AVATAR);

  // Live Preview Carousel Index
  const [previewIdx, setPreviewIdx] = useState(0);

  // Notifications
  const [notice, setNotice] = useState(null);

  const showNotice = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4500);
  };

  // Broadcast real-time update to all open tabs and website
  const broadcastSync = () => {
    try {
      window.dispatchEvent(new Event("testimonialsUpdated"));
      localStorage.setItem("aayush_testimonials_timestamp", Date.now().toString());
    } catch {}
  };

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_BASE}/api/testimonials`);
      if (Array.isArray(res.data)) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      showNotice("error", "Failed to load testimonials from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Open Add Modal
  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      designation: "",
      message: "",
      rating: 5,
      visible: true,
      profileImageUrl: "",
    });
    setImageFile(null);
    setImagePreview(DEFAULT_AVATAR);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (t) => {
    setEditingItem(t);
    const existingImg = t.profileImageUrl || t.avatar || t.profileImage || DEFAULT_AVATAR;
    setFormData({
      name: t.name || "",
      designation: t.designation || "",
      message: t.message || "",
      rating: Number(t.rating) || 5,
      visible: t.visible !== false,
      profileImageUrl: existingImg,
    });
    setImageFile(null);
    setImagePreview(resolveAvatarUrl(existingImg));
    setIsModalOpen(true);
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
    e.target.value = "";
  };

  // Handle Preset Avatar Selection
  const handleSelectPreset = (presetPath) => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, profileImageUrl: presetPath }));
    setImagePreview(presetPath);
  };

  // Submit Modal (Create or Update)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim() || !formData.message.trim()) {
      showNotice("error", "Please fill in all required fields (Name, Designation, and Message).");
      return;
    }

    setModalSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("designation", formData.designation.trim());
      payload.append("message", formData.message.trim());
      payload.append("rating", formData.rating);
      payload.append("visible", formData.visible);

      if (imageFile) {
        payload.append("profileImage", imageFile);
      } else if (formData.profileImageUrl) {
        payload.append("profileImageUrl", formData.profileImageUrl);
      }

      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingItem) {
        await axios.put(`${BACKEND_BASE}/api/testimonials/${editingItem._id}`, payload, axiosConfig);
        showNotice("success", `Updated review for "${formData.name}" successfully!`);
      } else {
        await axios.post(`${BACKEND_BASE}/api/testimonials`, payload, axiosConfig);
        showNotice("success", `Added new review for "${formData.name}" successfully!`);
      }

      setIsModalOpen(false);
      await fetchTestimonials();
      broadcastSync();
    } catch (err) {
      console.error("Save testimonial error:", err);
      showNotice("error", err.response?.data?.error || "Failed to save testimonial. Please try again.");
    } finally {
      setModalSubmitting(false);
    }
  };

  // Delete Testimonial
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete the testimonial by "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(`${BACKEND_BASE}/api/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      showNotice("success", `Deleted testimonial by "${name}".`);
      broadcastSync();
    } catch (err) {
      console.error("Delete error:", err);
      showNotice("error", "Failed to delete testimonial.");
    }
  };

  // Toggle Visibility directly from table/card
  const handleToggleVisible = async (t) => {
    const nextVal = !(t.visible !== false);
    try {
      await axios.put(`${BACKEND_BASE}/api/testimonials/${t._id}`, { visible: nextVal });
      setTestimonials((prev) =>
        prev.map((item) => (item._id === t._id ? { ...item, visible: nextVal } : item))
      );
      showNotice("success", `Review by "${t.name}" is now ${nextVal ? "Visible (Published)" : "Hidden (Draft)"}.`);
      broadcastSync();
    } catch (err) {
      console.error("Toggle visibility error:", err);
      showNotice("error", "Failed to update visibility.");
    }
  };

  // Seed Default Verified Testimonials
  const handleSeedDefaults = async () => {
    const confirmed = window.confirm(
      "Restore or re-seed the 4 default verified institute testimonials into the database? This ensures verified reviews are always active."
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await axios.post(`${BACKEND_BASE}/api/testimonials/seed`, { overwrite: false });
      showNotice("success", "Default verified testimonials seeded successfully!");
      await fetchTestimonials();
      broadcastSync();
    } catch (err) {
      console.error("Seed error:", err);
      showNotice("error", "Failed to seed default testimonials.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered List
  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch =
      (t.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.designation || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.message || "").toLowerCase().includes(searchQuery.toLowerCase());

    const isVisible = t.visible !== false;
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "published"
        ? isVisible
        : !isVisible;

    return matchesSearch && matchesStatus;
  });

  const publishedCount = testimonials.filter((t) => t.visible !== false).length;
  const activeForPreview = testimonials.filter((t) => t.visible !== false);
  const currentPreview =
    activeForPreview[previewIdx % (activeForPreview.length || 1)] ||
    testimonials[0] || {
      name: "Rahul Sharma",
      designation: "Full Stack Development Student",
      message:
        "Aayush Institute helped me build my technical skills and got placed in a leading IT company. The faculty and support team are excellent!",
      profileImageUrl: DEFAULT_AVATAR,
      rating: 5,
    };

  return (
    <div className="space-y-6">
      {/* ── Toast Notification ── */}
      {notice && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-slideIn ${
            notice.type === "error"
              ? "bg-rose-50 text-rose-800 border border-rose-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          {notice.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          )}
          <span>{notice.text}</span>
        </div>
      )}

      {/* ── Header Card ── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xs">
            <Quote className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Student Testimonials CMS
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold">
                Live on Homepage
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Control verified student testimonials, ratings, and avatars shown on the homepage impact section in real-time.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleSeedDefaults}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition cursor-pointer disabled:opacity-50"
            title="Restore default 4 verified student reviews"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Restore 4 Defaults</span>
          </button>

          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
            Live Website
          </a>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl transition shadow-md shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* ── Metrics Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Total Reviews</span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{testimonials.length}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Published Live</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{publishedCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Average Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-500 mt-1">5.0 ★</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Live Sync</span>
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xs font-bold text-indigo-600 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-Time Broadcast
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout: Left List + Right Live Preview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Search, Filters, and Testimonials List */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by student name, role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All ({testimonials.length})</option>
                <option value="published">Published ({publishedCount})</option>
                <option value="hidden">Hidden ({testimonials.length - publishedCount})</option>
              </select>
            </div>
          </div>

          {/* Testimonial Cards List */}
          {loading ? (
            <div className="bg-white rounded-xl p-12 text-center text-slate-400 text-xs">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
              Loading verified student testimonials...
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
              <Quote className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-700">No testimonials found</h3>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery
                  ? "No reviews match your search query."
                  : "No testimonials in this category yet. Click 'Add Testimonial' or 'Restore 4 Defaults'."}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleSeedDefaults}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
                >
                  Restore 4 Defaults
                </button>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                >
                  + Add New Review
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTestimonials.map((t, idx) => {
                const isVisible = t.visible !== false;
                const avatarSrc = resolveAvatarUrl(t.profileImageUrl || t.avatar || t.profileImage || DEFAULT_AVATAR);

                return (
                  <div
                    key={t._id || idx}
                    className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isVisible ? "border-slate-200/90" : "border-slate-200 bg-slate-50/70 opacity-75"
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      {/* Avatar */}
                      <img
                        src={avatarSrc}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-xs flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_AVATAR;
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-slate-900 leading-tight">
                            {t.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold">
                            {t.designation}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                              isVisible
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {isVisible ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                            {isVisible ? "Published" : "Hidden"}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(Number(t.rating) || 5)].map((_, sIdx) => (
                            <Star key={sIdx} className="w-3 h-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>

                        {/* Quote snippet */}
                        <p className="text-xs text-slate-600 mt-1.5 italic line-clamp-2 leading-relaxed">
                          “{t.message}”
                        </p>
                      </div>
                    </div>

                    {/* Right Action buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleVisible(t)}
                        className={`p-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                          isVisible
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                        title={isVisible ? "Click to hide from website" : "Click to publish to website"}
                      >
                        {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(t)}
                        className="p-2 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50 text-blue-600 transition cursor-pointer"
                        title="Edit testimonial"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(t._id, t.name)}
                        className="p-2 rounded-xl border border-slate-200 hover:border-rose-300 bg-white hover:bg-rose-50 text-rose-600 transition cursor-pointer"
                        title="Delete testimonial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 4-5 Cols: Live Homepage Preview */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              Live Homepage Preview
            </span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
              Real-time Sync
            </span>
          </div>

          {/* Exact Replica of Website Homepage Impact Section Testimonial Card */}
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-md flex flex-col justify-between">
            <div>
              {/* Header with Title & Gold Stars */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <h4 className="text-[#00285e] font-bold text-sm sm:text-[15px] tracking-tight">
                  What Our Students Say
                </h4>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(Number(currentPreview.rating) || 5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote with stylish quotation mark */}
              <div className="flex items-start gap-2.5 my-2">
                <span className="text-blue-500 text-2xl sm:text-3xl font-serif font-black leading-none select-none flex-shrink-0 opacity-80">
                  “
                </span>
                <p className="text-[#334155] text-xs sm:text-[12.5px] leading-relaxed italic">
                  {currentPreview.message}
                </p>
              </div>

              <div className="pt-2">
                {/* Student info */}
                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src={resolveAvatarUrl(currentPreview.profileImageUrl || currentPreview.avatar || currentPreview.profileImage || DEFAULT_AVATAR)}
                    alt={currentPreview.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow-xs"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                  />
                  <div>
                    <h5 className="font-bold text-[#00285e] text-xs sm:text-[13px] leading-tight">
                      — {currentPreview.name}
                    </h5>
                    <p className="text-[#64748b] font-medium text-[10.5px] sm:text-[11px] leading-tight mt-0.5">
                      {currentPreview.designation}
                    </p>
                  </div>
                </div>

                {/* Pagination Dots and Prev/Next Arrows */}
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {(activeForPreview.length > 0 ? activeForPreview : testimonials).map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setPreviewIdx(dotIdx)}
                        className={`transition-all rounded-full cursor-pointer ${
                          (previewIdx % (activeForPreview.length || 1)) === dotIdx
                            ? "w-5 h-2 bg-[#0052cc]"
                            : "w-2 h-2 bg-blue-200 hover:bg-blue-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewIdx((prev) =>
                          (prev - 1 + (activeForPreview.length || 1)) % (activeForPreview.length || 1)
                        )
                      }
                      className="w-7 h-7 rounded-full border border-blue-200 text-[#00285e] hover:bg-blue-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewIdx((prev) => (prev + 1) % (activeForPreview.length || 1))
                      }
                      className="w-7 h-7 rounded-full border border-blue-200 text-[#00285e] hover:bg-blue-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center font-normal">
            This card automatically updates on the website when you add or edit reviews.
          </p>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-100 my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {editingItem ? "Edit Student Testimonial" : "Add New Student Testimonial"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? "Update student review, rating, or photo"
                      : "Create a verified student review to showcase on homepage"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="space-y-4 pt-4">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Student Designation / Course */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course / Program Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Stack Development Student, or Python Graduate"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Review Message / Quote */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Review Message / Quote <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share the student's honest experience, placement guidance, and mentorship feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
                <div className="text-[11px] text-slate-400 text-right mt-0.5">
                  {formData.message.length} characters
                </div>
              </div>

              {/* Star Rating & Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                {/* Star Rating */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setFormData({ ...formData, rating: starVal })}
                        className="p-1 hover:scale-110 transition cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            starVal <= formData.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {formData.rating} Stars
                    </span>
                  </div>
                </div>

                {/* Visibility Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Status
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer mt-1.5">
                    <input
                      type="checkbox"
                      checked={formData.visible}
                      onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Show on live website (Published)
                    </span>
                  </label>
                </div>
              </div>

              {/* Student Avatar / Photo Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Student Avatar / Photo
                </label>

                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={resolveAvatarUrl(imagePreview)}
                    alt="Preview"
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                  />

                  <div className="space-y-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>Upload Custom Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-400">
                      JPG, PNG or WEBP (Square 1:1 recommended)
                    </p>
                  </div>
                </div>

                {/* Preset Avatars quick-select */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                    Or select verified default student avatar:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {PRESET_AVATARS.map((p, pIdx) => (
                      <button
                        type="button"
                        key={pIdx}
                        onClick={() => handleSelectPreset(p.path)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border transition cursor-pointer ${
                          formData.profileImageUrl === p.path && !imageFile
                            ? "bg-blue-100 border-blue-400 text-blue-800 font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <img
                          src={p.path}
                          alt={p.label}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs font-bold text-white shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {modalSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingItem ? "Update Testimonial" : "Publish Testimonial"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
