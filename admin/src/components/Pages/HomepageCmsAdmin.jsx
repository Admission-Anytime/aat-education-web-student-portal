import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutGrid,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Monitor,
  Code,
  Pencil,
  GraduationCap,
  Building2,
  Rocket,
  Briefcase,
  Users,
  Award,
  Target,
  Clock,
  Laptop,
  Check,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Layers,
  ArrowRight
} from "lucide-react";

export default function HomepageCmsAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("services"); // 'services' | 'explore' | 'dualPromo' | 'whyChooseUs' | 'impact'
  const [notification, setNotification] = useState({ type: "", text: "" });

  const [settings, setSettings] = useState({
    services: [],
    exploreCategories: [],
    dualPromo: {
      university: {
        badge: "University Education",
        title: "UG & PG University Programs",
        tagline: "Study Anytime, Anywhere",
        desc: "",
        btnText: "Explore University Programs",
        btnLink: "/UniversityCourses",
        points: []
      },
      liveProjects: {
        badge: "Industry Focused",
        title: "Live Projects & Real-World Skills",
        desc: "",
        btnText: "Start Your Journey",
        btnLink: "/LiveProject",
        points: [],
        image: "/laptop_live_projects.jpg"
      }
    },
    whyChooseUs: {
      subtitle: "Why Choose Us",
      title: "Aayush Institute?",
      tagline: "Because your future matters.",
      btnText: "Why Choose Us",
      features: [],
      modalHeader: {
        badge: "",
        title: "",
        subtitle: "",
        desc: ""
      },
      pillars: [],
      steps: []
    },
    impactNumbers: {
      title: "Our Impact in Numbers",
      image: "/students_campus_impact.png",
      sloganPart1: "Learn Today",
      sloganPart2: "Lead Tomorrow",
      stats: []
    }
  });

  const showNotice = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification({ type: "", text: "" }), 4000);
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/site-settings");
      if (res.data && res.data.data) {
        const d = res.data.data;
        setSettings((prev) => ({
          ...prev,
          services: Array.isArray(d.services) ? d.services : prev.services,
          exploreCategories: Array.isArray(d.exploreCategories) ? d.exploreCategories : prev.exploreCategories,
          dualPromo: d.dualPromo || prev.dualPromo,
          whyChooseUs: d.whyChooseUs || prev.whyChooseUs,
          impactNumbers: d.impactNumbers || prev.impactNumbers,
        }));
      }
    } catch (err) {
      showNotice("error", "Failed to load homepage settings from database: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put("/api/site-settings", settings);
      showNotice("success", res.data?.message || "Homepage sections updated in database!");
      window.dispatchEvent(new Event("siteSettingsUpdated"));
    } catch (err) {
      showNotice("error", "Error saving settings: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // ── Services Helpers ──
  const updateService = (idx, field, value) => {
    setSettings((prev) => {
      const list = [...prev.services];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, services: list };
    });
  };

  const addService = () => {
    setSettings((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          title: "New Course Category",
          desc: "Practical hands-on training with career support.",
          iconType: "monitor",
          iconBg: "#1e40af",
          cardBg: "#f0f6ff",
          titleColor: "#0f2b5c",
          linkColor: "#1d64ec",
          linkUrl: "/Courses"
        }
      ]
    }));
  };

  const removeService = (idx) => {
    setSettings((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== idx)
    }));
  };

  // ── Explore Categories Helpers ──
  const updateExplore = (idx, field, value) => {
    setSettings((prev) => {
      const list = [...prev.exploreCategories];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, exploreCategories: list };
    });
  };

  const addExplore = () => {
    setSettings((prev) => ({
      ...prev,
      exploreCategories: [
        ...prev.exploreCategories,
        {
          title: "New Program",
          subtitle: "Job-Ready Skills",
          to: "/Courses",
          iconType: "code",
          cardBg: "from-[#eef6ff] via-[#f5f9ff] to-[#ffffff]",
          border: "border-blue-200/90 hover:border-blue-400",
          topBar: "from-[#0062ff] to-[#38bdf8]",
          iconGrad: "from-[#0052cc] to-[#0ea5e9]",
          titleColor: "text-[#002f6c] group-hover:text-[#0052cc]",
          badgeBg: "bg-blue-100/90 text-[#0052cc]"
        }
      ]
    }));
  };

  const removeExplore = (idx) => {
    setSettings((prev) => ({
      ...prev,
      exploreCategories: prev.exploreCategories.filter((_, i) => i !== idx)
    }));
  };

  // ── Dual Promo Helpers ──
  const updateDualUniversity = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      dualPromo: {
        ...prev.dualPromo,
        university: {
          ...prev.dualPromo.university,
          [field]: value
        }
      }
    }));
  };

  const updateDualLive = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      dualPromo: {
        ...prev.dualPromo,
        liveProjects: {
          ...prev.dualPromo.liveProjects,
          [field]: value
        }
      }
    }));
  };

  const handleAddUniversityPoint = () => {
    setSettings((prev) => {
      const pts = [...(prev.dualPromo?.university?.points || [])];
      pts.push("New University Program Detail");
      return {
        ...prev,
        dualPromo: {
          ...prev.dualPromo,
          university: { ...prev.dualPromo.university, points: pts }
        }
      };
    });
  };

  const handleRemoveUniversityPoint = (idx) => {
    setSettings((prev) => {
      const pts = (prev.dualPromo?.university?.points || []).filter((_, i) => i !== idx);
      return {
        ...prev,
        dualPromo: {
          ...prev.dualPromo,
          university: { ...prev.dualPromo.university, points: pts }
        }
      };
    });
  };

  const handleAddLivePoint = () => {
    setSettings((prev) => {
      const pts = [...(prev.dualPromo?.liveProjects?.points || [])];
      pts.push("New Live Project Deliverable");
      return {
        ...prev,
        dualPromo: {
          ...prev.dualPromo,
          liveProjects: { ...prev.dualPromo.liveProjects, points: pts }
        }
      };
    });
  };

  const handleRemoveLivePoint = (idx) => {
    setSettings((prev) => {
      const pts = (prev.dualPromo?.liveProjects?.points || []).filter((_, i) => i !== idx);
      return {
        ...prev,
        dualPromo: {
          ...prev.dualPromo,
          liveProjects: { ...prev.dualPromo.liveProjects, points: pts }
        }
      };
    });
  };

  // ── Why Choose Us Helpers ──
  const updateWhyFeature = (idx, field, value) => {
    setSettings((prev) => {
      const list = [...(prev.whyChooseUs?.features || [])];
      list[idx] = { ...list[idx], [field]: value };
      return {
        ...prev,
        whyChooseUs: { ...prev.whyChooseUs, features: list }
      };
    });
  };

  const updateWhyPillar = (idx, field, value) => {
    setSettings((prev) => {
      const list = [...(prev.whyChooseUs?.pillars || [])];
      list[idx] = { ...list[idx], [field]: value };
      return {
        ...prev,
        whyChooseUs: { ...prev.whyChooseUs, pillars: list }
      };
    });
  };

  const updateWhyStep = (idx, field, value) => {
    setSettings((prev) => {
      const list = [...(prev.whyChooseUs?.steps || [])];
      list[idx] = { ...list[idx], [field]: value };
      return {
        ...prev,
        whyChooseUs: { ...prev.whyChooseUs, steps: list }
      };
    });
  };

  // ── Impact Numbers Helpers ──
  const updateImpactStat = (idx, field, value) => {
    setSettings((prev) => {
      const list = [...(prev.impactNumbers?.stats || [])];
      list[idx] = { ...list[idx], [field]: value };
      return {
        ...prev,
        impactNumbers: { ...prev.impactNumbers, stats: list }
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500 gap-3">
        <Sparkles className="w-5 h-5 animate-spin text-indigo-600" />
        <span className="font-semibold text-sm">Loading Homepage CMS data from MongoDB...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* ── Top Header Banner ── */}
      <div className="bg-gradient-to-r from-[#00285e] via-[#004085] to-[#0062ff] rounded-2xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-semibold mb-2 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Dynamic MongoDB Database Sync</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Homepage Sections Management
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-2xl">
            Manage Services, Category Cards, University &amp; Live Project Banners, Why Choose Us Ecosystem, and Impact in Numbers directly in the database.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#fed000] hover:bg-[#ffe14d] text-[#00285e] font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 self-end md:self-auto"
        >
          {saving ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Saving to MongoDB...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save All Changes</span>
            </>
          )}
        </button>
      </div>

      {/* ── Notification Banner ── */}
      {notification.text && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
        {[
          { id: "services", label: "1. Services Strip (4 Cards)", icon: LayoutGrid, count: settings.services?.length },
          { id: "explore", label: "2. Explore Categories (5 Cards)", icon: Layers, count: settings.exploreCategories?.length },
          { id: "dualPromo", label: "3. Dual Promo Banners", icon: ExternalLink },
          { id: "whyChooseUs", label: "4. Why Choose Us Ecosystem", icon: Users },
          { id: "impact", label: "5. Our Impact in Numbers", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#00285e] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TAB 1: SERVICES STRIP (4 Cards Below Hero)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === "services" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-[#00285e] text-lg">Services Strip Cards</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                These cards appear right below the Hero banner (e.g. Professional Computer Courses, Designing Courses, etc.)
              </p>
            </div>
            <button
              type="button"
              onClick={addService}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settings.services?.map((serv, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    Card #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeService(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title="Delete card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={serv.title || ""}
                    onChange={(e) => updateService(idx, "title", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Course Category Title"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={serv.desc || ""}
                    onChange={(e) => updateService(idx, "desc", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Short subtitle"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link URL</label>
                    <input
                      type="text"
                      value={serv.linkUrl || "/Courses"}
                      onChange={(e) => updateService(idx, "linkUrl", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      placeholder="/Courses"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Icon Type</label>
                    <select
                      value={serv.iconType || "monitor"}
                      onChange={(e) => updateService(idx, "iconType", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    >
                      <option value="monitor">Monitor / Desktop</option>
                      <option value="pencil">Pencil / Design</option>
                      <option value="code">Code / Development</option>
                      <option value="graduation">Graduation / Degree</option>
                      <option value="laptop">Laptop / Projects</option>
                      <option value="smartphone">Mobile / Smartphone</option>
                      <option value="globe">Globe / Internet</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon BG Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={serv.iconBg || "#1e40af"}
                        onChange={(e) => updateService(idx, "iconBg", e.target.value)}
                        className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={serv.iconBg || "#1e40af"}
                        onChange={(e) => updateService(idx, "iconBg", e.target.value)}
                        className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Card BG Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={serv.cardBg || "#f0f6ff"}
                        onChange={(e) => updateService(idx, "cardBg", e.target.value)}
                        className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={serv.cardBg || "#f0f6ff"}
                        onChange={(e) => updateService(idx, "cardBg", e.target.value)}
                        className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition cursor-pointer"
            >
              {saving ? "Saving..." : "Save Services to MongoDB"}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 2: EXPLORE CATEGORIES (5 Cards)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === "explore" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-[#00285e] text-lg">Explore Category Cards</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The 5 colorful categories displayed on the homepage (Professional, University, Corporate, Live Project, Placement).
              </p>
            </div>
            <button
              type="button"
              onClick={addExplore}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {settings.exploreCategories?.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    Category #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExplore(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={cat.title || ""}
                    onChange={(e) => updateExplore(idx, "title", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    placeholder="e.g. Professional Courses"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={cat.subtitle || ""}
                    onChange={(e) => updateExplore(idx, "subtitle", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="e.g. Job-Ready Tech Skills"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Route / Link</label>
                    <input
                      type="text"
                      value={cat.to || ""}
                      onChange={(e) => updateExplore(idx, "to", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      placeholder="/Courses"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Icon</label>
                    <select
                      value={cat.iconType || "code"}
                      onChange={(e) => updateExplore(idx, "iconType", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    >
                      <option value="code">Code / Development</option>
                      <option value="graduation">Graduation / Degree</option>
                      <option value="building">Building / Corporate</option>
                      <option value="rocket">Rocket / Live Project</option>
                      <option value="briefcase">Briefcase / Placement</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition cursor-pointer"
            >
              {saving ? "Saving..." : "Save Categories to MongoDB"}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 3: DUAL PROMO BANNERS
      ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === "dualPromo" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-[#00285e] text-lg">Dual Promo Banner Section</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit the University Education promo card and the Live Projects &amp; Real-World Skills promo card.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: University Education */}
            <div className="p-5 rounded-2xl bg-[#edf6ff] border border-blue-200 space-y-4">
              <span className="font-extrabold text-xs text-blue-700 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-2xs">
                Card 1: University Education Promo
              </span>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                <input
                  type="text"
                  value={settings.dualPromo?.university?.badge || ""}
                  onChange={(e) => updateDualUniversity("badge", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Headline Title</label>
                <input
                  type="text"
                  value={settings.dualPromo?.university?.title || ""}
                  onChange={(e) => updateDualUniversity("title", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-bold text-[#00285e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={settings.dualPromo?.university?.tagline || ""}
                  onChange={(e) => updateDualUniversity("tagline", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-semibold text-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={settings.dualPromo?.university?.desc || ""}
                  onChange={(e) => updateDualUniversity("desc", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={settings.dualPromo?.university?.btnText || ""}
                    onChange={(e) => updateDualUniversity("btnText", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={settings.dualPromo?.university?.btnLink || "/UniversityCourses"}
                    onChange={(e) => updateDualUniversity("btnLink", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Points Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">Checklist Points</label>
                  <button
                    type="button"
                    onClick={handleAddUniversityPoint}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    + Add Point
                  </button>
                </div>
                <div className="space-y-1.5">
                  {settings.dualPromo?.university?.points?.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const pts = [...settings.dualPromo.university.points];
                          pts[pIdx] = e.target.value;
                          updateDualUniversity("points", pts);
                        }}
                        className="flex-1 px-3 py-1 bg-white border border-blue-200 rounded-md text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveUniversityPoint(pIdx)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Live Projects */}
            <div className="p-5 rounded-2xl bg-[#00224f] text-white space-y-4">
              <span className="font-extrabold text-xs text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Card 2: Live Projects Promo
              </span>

              <div>
                <label className="block text-xs font-bold text-blue-200 mb-1">Badge</label>
                <input
                  type="text"
                  value={settings.dualPromo?.liveProjects?.badge || ""}
                  onChange={(e) => updateDualLive("badge", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-200 mb-1">Headline Title</label>
                <input
                  type="text"
                  value={settings.dualPromo?.liveProjects?.title || ""}
                  onChange={(e) => updateDualLive("title", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-200 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={settings.dualPromo?.liveProjects?.desc || ""}
                  onChange={(e) => updateDualLive("desc", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={settings.dualPromo?.liveProjects?.btnText || ""}
                    onChange={(e) => updateDualLive("btnText", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={settings.dualPromo?.liveProjects?.btnLink || "/LiveProject"}
                    onChange={(e) => updateDualLive("btnLink", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-200 mb-1">Image URL</label>
                <input
                  type="text"
                  value={settings.dualPromo?.liveProjects?.image || "/laptop_live_projects.jpg"}
                  onChange={(e) => updateDualLive("image", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-mono text-white"
                />
              </div>

              {/* Points Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-blue-200">Bullet Points</label>
                  <button
                    type="button"
                    onClick={handleAddLivePoint}
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
                  >
                    + Add Point
                  </button>
                </div>
                <div className="space-y-1.5">
                  {settings.dualPromo?.liveProjects?.points?.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const pts = [...settings.dualPromo.liveProjects.points];
                          pts[pIdx] = e.target.value;
                          updateDualLive("points", pts);
                        }}
                        className="flex-1 px-3 py-1 bg-white/10 border border-white/20 rounded-md text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLivePoint(pIdx)}
                        className="text-white/60 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition cursor-pointer"
            >
              {saving ? "Saving..." : "Save Dual Promo to MongoDB"}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 4: WHY CHOOSE US
      ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === "whyChooseUs" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-[#00285e] text-lg">Why Choose Us Ecosystem</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit the 6 quick strip icons, 9 core institutional pillars, and 5-step learning journey.
            </p>
          </div>

          {/* Section Headers */}
          <div className="p-4 bg-slate-50 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                value={settings.whyChooseUs?.title || "Aayush Institute?"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    whyChooseUs: { ...prev.whyChooseUs, title: e.target.value }
                  }))
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#00285e]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={settings.whyChooseUs?.subtitle || "Why Choose Us"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    whyChooseUs: { ...prev.whyChooseUs, subtitle: e.target.value }
                  }))
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-blue-600 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.whyChooseUs?.tagline || "Because your future matters."}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    whyChooseUs: { ...prev.whyChooseUs, tagline: e.target.value }
                  }))
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* 6 Quick Features Strip */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
              6 Quick Strip Features
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {settings.whyChooseUs?.features?.map((feat, fIdx) => (
                <div key={fIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-extrabold text-indigo-700">#{fIdx + 1}</span>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600">Line 1</label>
                    <input
                      type="text"
                      value={feat.line1 || ""}
                      onChange={(e) => updateWhyFeature(fIdx, "line1", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600">Line 2</label>
                    <input
                      type="text"
                      value={feat.line2 || ""}
                      onChange={(e) => updateWhyFeature(fIdx, "line2", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600">Icon</label>
                    <select
                      value={feat.iconType || "users"}
                      onChange={(e) => updateWhyFeature(fIdx, "iconType", e.target.value)}
                      className="w-full px-1.5 py-1 bg-white border border-slate-200 rounded text-[11px]"
                    >
                      <option value="users">Users / Faculty</option>
                      <option value="laptop">Laptop / Training</option>
                      <option value="handshake">Handshake / Partners</option>
                      <option value="briefcase">Briefcase / Placement</option>
                      <option value="clock">Clock / Flexible</option>
                      <option value="building">Building / Campus</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9 Core Pillars */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
              9 Institutional Pillars (Modal View)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {settings.whyChooseUs?.pillars?.map((pil, pIdx) => (
                <div key={pIdx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-blue-700">Pillar #{pIdx + 1}</span>
                    <input
                      type="text"
                      value={pil.badge || ""}
                      onChange={(e) => updateWhyPillar(pIdx, "badge", e.target.value)}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-semibold w-28 text-right"
                      placeholder="Badge"
                    />
                  </div>
                  <input
                    type="text"
                    value={pil.title || ""}
                    onChange={(e) => updateWhyPillar(pIdx, "title", e.target.value)}
                    className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-[#00285e]"
                    placeholder="Pillar Title"
                  />
                  <textarea
                    rows={2}
                    value={pil.desc || ""}
                    onChange={(e) => updateWhyPillar(pIdx, "desc", e.target.value)}
                    className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-[11px] leading-snug"
                    placeholder="Pillar Description"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition cursor-pointer"
            >
              {saving ? "Saving..." : "Save Why Choose Us to MongoDB"}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 5: OUR IMPACT IN NUMBERS
      ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === "impact" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-[#00285e] text-lg">Our Impact in Numbers Section</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit the statistics counters, photo, and dynamic slogan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Headline</label>
              <input
                type="text"
                value={settings.impactNumbers?.title || "Our Impact in Numbers"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    impactNumbers: { ...prev.impactNumbers, title: e.target.value }
                  }))
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Slogan Part 1</label>
              <input
                type="text"
                value={settings.impactNumbers?.sloganPart1 || "Learn Today"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    impactNumbers: { ...prev.impactNumbers, sloganPart1: e.target.value }
                  }))
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Slogan Part 2</label>
              <input
                type="text"
                value={settings.impactNumbers?.sloganPart2 || "Lead Tomorrow"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    impactNumbers: { ...prev.impactNumbers, sloganPart2: e.target.value }
                  }))
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Students Photo URL</label>
            <input
              type="text"
              value={settings.impactNumbers?.image || "/students_campus_impact.png"}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  impactNumbers: { ...prev.impactNumbers, image: e.target.value }
                }))
              }
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
            />
          </div>

          {/* 4 Stats Counters */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
              4 Impact Counters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {settings.impactNumbers?.stats?.map((st, idx) => (
                <div key={idx} className="p-4 bg-[#001c44] text-white rounded-xl space-y-3">
                  <span className="text-[10px] font-bold text-blue-200">Stat #{idx + 1}</span>
                  <div>
                    <label className="block text-[11px] font-bold text-blue-200 mb-1">Number / Value</label>
                    <input
                      type="text"
                      value={st.value || ""}
                      onChange={(e) => updateImpactStat(idx, "value", e.target.value)}
                      className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-sm font-extrabold text-white"
                      placeholder="e.g. 5000+"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-blue-200 mb-1">Label Text</label>
                    <input
                      type="text"
                      value={st.label || ""}
                      onChange={(e) => updateImpactStat(idx, "label", e.target.value)}
                      className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-xs text-blue-100"
                      placeholder="e.g. Students Trained"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-blue-200 mb-1">Icon</label>
                    <select
                      value={st.iconType || "cap"}
                      onChange={(e) => updateImpactStat(idx, "iconType", e.target.value)}
                      className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white"
                    >
                      <option value="cap" className="text-slate-900">Graduation Cap</option>
                      <option value="users" className="text-slate-900">Users / Partners</option>
                      <option value="target" className="text-slate-900">Target / Placement %</option>
                      <option value="award" className="text-slate-900">Award / Years</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition cursor-pointer"
            >
              {saving ? "Saving..." : "Save Impact Stats to MongoDB"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

