import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  Users,
  ShieldCheck,
  LogOut,
  Bell,
  Search,
  Settings,
  Menu,
  ChevronDown,
  ExternalLink,
  Newspaper,
  MessageSquare,
  Sliders,
  Share2,
  Globe
} from "lucide-react";

import DashboardHome from "../Pages/DashboardHome";
import CoursesAdmin from "../Pages/CoursesAdmin";
import LeadsAdmin from "../Pages/LeadsAdmin";
import SiteSettingsAdmin from "../Pages/SiteSettingsAdmin";
import AdminUsersManagement from "../Pages/AdminUsersManagement";
import NewsArticlesManagement from "../Pages/NewsArticlesManagement";
import Testimonial from "../Pages/Testimonial";
import FooterAdmin from "../Pages/FooterAdmin";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [adminUser, setAdminUser] = useState({
    email: "aastechit@admin.com",
    name: "Admin Team",
    role: "Super Admin",
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("adminUser");
      if (stored) {
        const parsed = JSON.parse(stored);
        // STRICT ROLE PROTECTION: Student can never be in AdminPanel
        if (parsed.role === "student") {
          navigate("/student");
          return;
        }
        setAdminUser({
          email: parsed.email || "aastechit@admin.com",
          name: parsed.name || parsed.email?.split("@")[0] || "Admin Team",
          role: parsed.role === "staff" ? "Faculty Staff" : "Super Admin",
        });
      }
      if (activeTab === "staff") {
        setActiveTab("dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  }, [navigate, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "courses",
      label: "Courses & Programs",
      icon: GraduationCap,
    },
    {
      id: "testimonials",
      label: "Student Testimonials",
      icon: MessageSquare,
      badge: "LIVE",
    },
    {
      id: "leads",
      label: "Leads & Inquiries",
      icon: ClipboardList,
    },
    {
      id: "social-settings",
      label: "Website & Blogs CMS",
      icon: Globe,
    },

    {
      id: "admins",
      label: "Admin Accounts",
      icon: ShieldCheck,
    },
  ];

  const quickLinks = [
    {
      label: "Live Main Website",
      icon: ExternalLink,
      url: import.meta.env.VITE_WEBSITE_URL || "http://localhost:5174",
      external: true,
    },
    {
      label: "News & Batches",
      icon: Newspaper,
      action: () => setActiveTab("news"),
    },
    {
      label: "Student Reviews",
      icon: MessageSquare,
      action: () => setActiveTab("testimonials"),
    },
    {
      label: "Footer & Contacts",
      icon: Sliders,
      action: () => setActiveTab("footer"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex font-sans antialiased text-slate-800">
      {/* ── Left Sidebar (Dark Enterprise Theme) ── */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } bg-[#0f1424] text-slate-300 flex flex-col justify-between shrink-0 transition-all duration-300 z-30 select-none border-r border-[#1a2238]`}
      >
        <div>
          {/* Top Brand Logo */}
          <div className="h-18 flex items-center gap-3 px-5 border-b border-[#1b233d]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <h1 className="font-extrabold text-white text-base tracking-tight leading-none">
                  Aayush Institute
                </h1>
                <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 mt-1">
                  Admin Panel
                </p>
              </div>
            )}
          </div>

          {/* Navigation Section */}
          <div className="px-3 py-6 space-y-6">
            <div>
              {!sidebarCollapsed && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Main Menu
                </p>
              )}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      title={sidebarCollapsed ? item.label : ""}
                      className={`w-full flex items-center ${
                        sidebarCollapsed ? "justify-center px-0" : "justify-between px-3.5"
                      } py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30"
                          : "text-slate-400 hover:text-slate-100 hover:bg-[#18213a]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                        {!sidebarCollapsed && (
                          <span className="font-semibold text-xs tracking-wide">
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full tracking-wider transition ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Access */}
            {!sidebarCollapsed && (
              <div>
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Quick Access
                </p>
                <div className="space-y-1">
                  {quickLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return link.external ? (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#18213a] text-xs font-medium transition"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <span>{link.label}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-600" />
                      </a>
                    ) : (
                      <button
                        key={idx}
                        onClick={link.action}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#18213a] text-xs font-medium transition"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <span>{link.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Profile & Logout Card */}
        <div className="p-3 border-t border-[#1b233d]">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141c33] border border-[#1d2745]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow">
                {adminUser.email?.slice(0, 2).toUpperCase() || "AA"}
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate leading-tight">
                    {adminUser.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                    {adminUser.role}
                  </p>
                </div>
              )}
            </div>

            {!sidebarCollapsed && (
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main Content Area with Top Header ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Top Navbar */}
        <header className="h-18 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs">
          {/* Left: Collapse toggle + Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-slate-400">Dashboard</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800 capitalize">
                {activeTab === "admins"
                  ? "Admin Accounts"
                  : activeTab === "leads"
                  ? "Leads & Admissions"
                  : activeTab}
              </span>
            </div>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex items-center relative w-80 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              placeholder="Search anything... (courses, leads, announcements)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <a
              href={import.meta.env.VITE_WEBSITE_URL || "http://localhost:5174"}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
              <span>Live Website</span>
            </a>

            {/* Notifications with pink dot */}
            <button
              onClick={() => setActiveTab("leads")}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* Settings button */}
            <button
              onClick={() => setActiveTab("admins")}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {/* Profile Avatar circle */}
            <div className="flex items-center gap-2 pl-1 cursor-pointer" onClick={() => setActiveTab("admins")}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-100 shadow-sm">
                {adminUser.email?.slice(0, 2).toUpperCase() || "AA"}
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-6 md:p-8 flex-1">
          {activeTab === "dashboard" && (
            <DashboardHome
              setActiveTab={setActiveTab}
              globalSearchQuery={searchQuery}
            />
          )}
          {activeTab === "courses" && (
            <CoursesAdmin
              initialProgramType="all"
              pageTitle="Courses & Programs Management"
              pageSubtitle="Manage regular courses, live project capstones, corporate training, and university degrees in one unified workspace."
            />
          )}
          {activeTab === "leads" && <LeadsAdmin />}
          {activeTab === "social-settings" && <SiteSettingsAdmin />}
          {activeTab === "news" && <NewsArticlesManagement />}
          {activeTab === "testimonials" && <Testimonial />}
          {activeTab === "footer" && <FooterAdmin />}
          {activeTab === "admins" && <AdminUsersManagement />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
