import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MessageSquare,
  QrCode,
  Upload,
  Phone,
  Check,
  Plus,
  Trash2,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Info,
  Sparkles,
  ArrowRight
} from "lucide-react";

// Official WhatsApp SVG Icon
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

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
  prefilledMessage: "Hi, I would like to inquire about course admissions, fee structures and batch timings.",
  buttonText: "Chat on WhatsApp",
  counsellorNote: "Or click the button to chat directly with our counsellor."
};

const WhatsAppEnquiryAdmin = () => {
  const [enquiry, setEnquiry] = useState({ ...DEFAULT_MODAL_ENQUIRY });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [qrUploading, setQrUploading] = useState(false);
  const [notice, setNotice] = useState(null);
  const [newChecklistPoint, setNewChecklistPoint] = useState("");

  const showNotice = (type, message) => {
    setNotice({ type, message });
    setTimeout(() => setNotice(null), 4000);
  };

  // 1. Fetch live settings from MongoDB
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/site-settings");
      const data = res.data?.data || res.data || {};
      if (data.modalWhatsAppEnquiry) {
        setEnquiry({
          ...DEFAULT_MODAL_ENQUIRY,
          ...data.modalWhatsAppEnquiry
        });
      }
    } catch (err) {
      console.warn("Failed to load settings:", err);
      showNotice("error", "Failed to load live settings from backend. Using local defaults.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Update top-level field
  const updateField = (field, value) => {
    setEnquiry(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 2. Upload WhatsApp QR code image
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
        updateField("qrImage", res.data.url);
        showNotice("success", "WhatsApp QR Code uploaded successfully! Click 'Save Changes' to publish.");
      }
    } catch (err) {
      console.error("Failed to upload QR image:", err);
      showNotice("error", "Failed to upload QR image. Please try again.");
    } finally {
      setQrUploading(false);
    }
  };

  // 3. Checklist CRUD
  const handleAddChecklist = () => {
    if (!newChecklistPoint.trim()) return;
    setEnquiry(prev => ({
      ...prev,
      checklist: [...(prev.checklist || []), newChecklistPoint.trim()]
    }));
    setNewChecklistPoint("");
  };

  const handleUpdateChecklist = (index, value) => {
    setEnquiry(prev => {
      const copy = [...(prev.checklist || [])];
      copy[index] = value;
      return { ...prev, checklist: copy };
    });
  };

  const handleDeleteChecklist = (index) => {
    setEnquiry(prev => {
      const copy = [...(prev.checklist || [])];
      copy.splice(index, 1);
      return { ...prev, checklist: copy };
    });
  };

  // 4. Save to MongoDB
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axios.put("/api/site-settings", {
        modalWhatsAppEnquiry: enquiry
      });
      if (res.data?.success || res.status === 200) {
        showNotice("success", "🎉 WhatsApp QR & Course Modal settings saved and published live!");
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
      showNotice("error", "Error saving settings: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all WhatsApp Enquiry and QR settings back to institute defaults?")) {
      setEnquiry({ ...DEFAULT_MODAL_ENQUIRY });
      showNotice("info", "Settings reset to defaults. Remember to click 'Save Changes' to publish.");
    }
  };

  // Resolved clean number & link for live test preview
  const cleanNumber = (enquiry.whatsappNumber || "919311050670").replace(/[^0-9]/g, "") || "919311050670";
  const previewWaLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    enquiry.prefilledMessage || "Hi, I would like to inquire about course admissions and fee details."
  )}`;

  const resolvedQrImage = enquiry.qrImage?.startsWith("/Uploads/")
    ? `${import.meta.env.VITE_BACKEND_URL || ""}${enquiry.qrImage}`
    : (enquiry.qrImage || "/whatsapp_qr.png");

  const fallbackDynamicQr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://wa.me/${cleanNumber}`)}`;

  return (
    <div className="space-y-6 pb-12">
      {/* ── Top Header Bar ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200">
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>LIVE COURSE POPUP WHATSAPP ENQUIRY CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] tracking-tight">
            WhatsApp QR &amp; Course Modal Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Upload your official WhatsApp QR Code, update counsellor phone numbers, customize the 8 checklist bullet points, and change the modal CTA with instant live preview.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-500/25 transition cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Publishing Live...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Toast Notification Banner ── */}
      {notice && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-semibold shadow-xs transition-all ${
            notice.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
              : notice.type === "error"
              ? "bg-rose-50 text-rose-900 border border-rose-200"
              : "bg-blue-50 text-blue-900 border border-blue-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : notice.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
            )}
            <span>{notice.message}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Main Two-Column Layout (Controls on Left, Live Card Preview on Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ──── LEFT COLUMN: CONTROLS & FORM CARDS (7 Cols) ──── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Header Titles */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <MessageSquare className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">1. Header &amp; Subtitle</h3>
                <p className="text-[11px] text-slate-500 font-normal">Controls the top title in the green card</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title Prefix</label>
                <input
                  type="text"
                  value={enquiry.titlePrefix}
                  onChange={(e) => updateField("titlePrefix", e.target.value)}
                  placeholder="Quick Enquiry on"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title Highlight (Green Text)</label>
                <input
                  type="text"
                  value={enquiry.titleHighlight}
                  onChange={(e) => updateField("titleHighlight", e.target.value)}
                  placeholder="WhatsApp"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none font-bold text-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle Line</label>
              <input
                type="text"
                value={enquiry.subtitle}
                onChange={(e) => updateField("subtitle", e.target.value)}
                placeholder="Get instant details about:"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Card 2: WhatsApp QR Code Upload */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <QrCode className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">2. WhatsApp QR Code Image</h3>
                <p className="text-[11px] text-slate-500 font-normal">Upload your official WhatsApp QR code image or use image URL</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              {/* QR Preview Thumbnail */}
              <div className="relative w-28 h-28 bg-white rounded-2xl p-2 border-2 border-emerald-500 shadow-sm flex items-center justify-center shrink-0">
                <img
                  src={resolvedQrImage}
                  alt="QR Preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackDynamicQr;
                  }}
                />
                <div className="absolute w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md border border-white pointer-events-none">
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Upload Input & Actions */}
              <div className="flex-1 space-y-2.5 w-full text-center sm:text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{qrUploading ? "Uploading Image..." : "Upload New QR Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadQrImage}
                      disabled={qrUploading}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField("qrImage", "/whatsapp_qr.png")}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition cursor-pointer"
                  >
                    Reset Default QR
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Supports PNG, JPG, WebP, SVG. Recommended square size (400×400 px).
                </p>

                <div className="pt-1">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Or Direct URL / Path:
                  </label>
                  <input
                    type="text"
                    value={enquiry.qrImage}
                    onChange={(e) => updateField("qrImage", e.target.value)}
                    placeholder="/whatsapp_qr.png or https://..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: WhatsApp Number & Counselor CTA */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">3. WhatsApp Number &amp; Button Settings</h3>
                <p className="text-[11px] text-slate-500 font-normal">Contact phone number and prefilled chat prompt</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={enquiry.whatsappNumber}
                  onChange={(e) => updateField("whatsappNumber", e.target.value)}
                  placeholder="+919311050670"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none font-bold text-slate-900"
                />
                <span className="text-[10.5px] text-slate-400 mt-1 block">
                  Include country code (+91 for India)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={enquiry.buttonText}
                  onChange={(e) => updateField("buttonText", e.target.value)}
                  placeholder="Chat on WhatsApp"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Prefilled WhatsApp Greeting Message
              </label>
              <textarea
                rows={2}
                value={enquiry.prefilledMessage || ""}
                onChange={(e) => updateField("prefilledMessage", e.target.value)}
                placeholder="Hi, I would like to inquire about [Course Name] course admission and fee details."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-[10.5px] text-slate-400 mt-0.5 block">
                Tip: <code>[Course Name]</code> will automatically be replaced with the current course title.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Counsellor Help Note (Bottom Caption)
              </label>
              <input
                type="text"
                value={enquiry.counsellorNote}
                onChange={(e) => updateField("counsellorNote", e.target.value)}
                placeholder="Or click the button to chat directly with our counsellor."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Card 4: Checklist Points */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Check className="w-4 h-4 stroke-[3]" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    4. Enquiry Checklist Bullets ({enquiry.checklist?.length || 0})
                  </h3>
                  <p className="text-[11px] text-slate-500 font-normal">Displayed as green checkmarks in 2 columns</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {(enquiry.checklist || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateChecklist(idx, e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteChecklist(idx)}
                    disabled={(enquiry.checklist || []).length <= 1}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer disabled:opacity-30"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new point */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newChecklistPoint}
                onChange={(e) => setNewChecklistPoint(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddChecklist();
                  }
                }}
                placeholder="Add another enquiry topic (e.g. Hostel Facility)..."
                className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddChecklist}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* ──── RIGHT COLUMN: 100% REAL-TIME LIVE PREVIEW (5 Cols) ──── */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>LIVE WEBSITE POPUP PREVIEW</span>
            </div>
            <span className="text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Real-time sync
            </span>
          </div>

          {/* ── Exact Green WhatsApp Card from the Modal ── */}
          <div className="w-full max-w-[340px] mx-auto bg-[#f8fdfb] rounded-3xl p-5 sm:p-6 border-2 border-[#86efac] shadow-lg flex flex-col justify-between min-h-[580px]">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div className="flex items-baseline flex-wrap gap-1 leading-tight">
                    <h3 className="text-xs sm:text-sm font-semibold text-[#0a2540] tracking-tight whitespace-nowrap">
                      {enquiry.titlePrefix || "Quick Enquiry on"}
                    </h3>
                    <span className="text-sm sm:text-base font-bold text-[#0b8a4b] whitespace-nowrap">
                      {enquiry.titleHighlight || "WhatsApp"}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-1 mb-2.5 leading-tight">
                  {enquiry.subtitle || "Get instant details about:"}
                </p>

                {/* 2-column checklist */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-y-2.5 mb-1">
                  {(enquiry.checklist || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[10px] sm:text-[11px] min-w-0">
                      <Check className="w-3 h-3 text-[#059669] stroke-[3] shrink-0" />
                      <span className="font-medium text-[#0a2540] leading-tight truncate whitespace-nowrap" title={item}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code Container */}
              <div className="w-full flex flex-col items-center justify-center pt-2">
                <div className="p-2 bg-white rounded-2xl border border-emerald-200/90 shadow-2xs">
                  <div className="relative w-28 h-28 xl:w-32 xl:h-32 bg-white rounded-xl p-1.5 border-[2.5px] border-[#22c55e] shadow-xs flex items-center justify-center mx-auto">
                    <img
                      src={resolvedQrImage}
                      alt="WhatsApp QR"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackDynamicQr;
                      }}
                    />
                    <div className="absolute w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none">
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium mt-1.5 whitespace-nowrap">
                  Scan QR or tap button below
                </span>

                {/* Big Green Button */}
                <div className="mt-3 w-full">
                  <a
                    href={previewWaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00b050] to-[#009b44] hover:from-[#009b44] hover:to-[#00853a] text-white font-semibold text-xs sm:text-[13px] shadow-md shadow-emerald-600/30 hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" />
                    <span className="truncate">{enquiry.buttonText || "Chat on WhatsApp"}</span>
                    <ChevronRight className="w-4 h-4 stroke-[3] shrink-0" />
                  </a>
                </div>

                {/* Bottom Counselor Note */}
                <div className="flex items-center justify-center gap-1.5 mt-2.5 text-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <WhatsAppIcon className="w-2 h-2" />
                  </div>
                  <p className="text-[9.5px] sm:text-[10px] font-normal text-[#1e3a5f] text-center leading-tight whitespace-nowrap truncate">
                    {enquiry.counsellorNote || "Or click the button to chat directly with our counsellor."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 text-[11px] text-blue-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Website Sync Guarantee</span>
            </p>
            <p className="text-slate-600 font-normal">
              When you click <strong>Save Changes</strong>, this QR code and details automatically update in real-time across all 45+ course popups on the live website without requiring page refresh!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppEnquiryAdmin;

