import React, { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  GraduationCap,
  Briefcase,
  Award,
  Clock,
  Mail,
  Phone,
  Search,
  BookOpen,
  Sparkles,
  Users,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ArrowRight
} from "lucide-react";

export default function StaffPage() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Live API Fetch from MongoDB Backend (100% Dynamic)
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/users?role=staff");
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        setFaculty(list.filter((m) => m.role === "staff" && m.status !== "inactive"));
      } catch (err) {
        console.error("Faculty fetch error:", err.message);
        setFaculty([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // Unique Departments
  const departments = useMemo(() => {
    const set = new Set();
    faculty.forEach((f) => {
      if (f.department) set.add(f.department);
    });
    return ["all", ...Array.from(set)];
  }, [faculty]);

  // Filtered List
  const filteredFaculty = useMemo(() => {
    return faculty.filter((member) => {
      const matchDept = selectedDept === "all" || member.department === selectedDept;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (member.name || "").toLowerCase().includes(q) ||
        (member.department || "").toLowerCase().includes(q) ||
        (member.designation || "").toLowerCase().includes(q) ||
        (member.course || "").toLowerCase().includes(q) ||
        (member.qualification || "").toLowerCase().includes(q) ||
        (member.bio || "").toLowerCase().includes(q);
      return matchDept && matchSearch;
    });
  }, [faculty, selectedDept, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* ── 1. Hero Header Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c1938] via-[#102454] to-[#0a1530] text-white py-14 sm:py-20 border-b border-indigo-950/40">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-blue-200/80 mb-4 font-medium">
            <NavLink to="/" className="hover:text-white transition">Home</NavLink>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            <NavLink to="/AboutUs" className="hover:text-white transition">About Us</NavLink>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-white font-semibold">Faculty & Staff</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/25 text-xs font-bold tracking-wider uppercase mb-3.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Academic Faculty & Industry Mentors</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Distinguished Faculty & <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Subject Matter Experts</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Learn directly from certified professionals, corporate technology leads, practicing CAs, and seasoned researchers who bridge academic rigor with real-world industry requirements.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-black text-white">{faculty.length}+</div>
              <div className="text-xs text-blue-200 mt-1 font-medium">Dedicated Faculty</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-black text-white">10+ Yrs</div>
              <div className="text-xs text-blue-200 mt-1 font-medium">Avg Industry Exp.</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-black text-white">15,000+</div>
              <div className="text-xs text-blue-200 mt-1 font-medium">Students Mentored</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-blue-200 mt-1 font-medium">Practical Capstones</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Filters & Search Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty name, subject, skill..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Department Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {dept === "all" ? "All Departments" : dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Faculty Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-3"></div>
            <p className="text-sm font-semibold text-slate-500">Connecting to institute database...</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs p-8">
            <Users className="w-14 h-14 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No Faculty Profiles Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              No faculty member matches your current search or department filter. Try resetting your search.
            </p>
            <button
              onClick={() => { setSelectedDept("all"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredFaculty.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Header Card Info */}
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Photo Avatar */}
                      <div className="relative shrink-0">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-blue-100 shadow-md group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center ring-2 ring-blue-100 shadow-md">
                            {member.name ? member.name.charAt(0).toUpperCase() : "F"}
                          </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white" title="Verified Faculty"></span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 truncate group-hover:text-blue-600 transition">
                            {member.name}
                          </h3>
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        </div>
                        <p className="text-xs font-bold text-blue-600 mt-0.5 line-clamp-1">
                          {member.designation || "Senior Faculty Instructor"}
                        </p>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold tracking-wide border border-slate-200/60 line-clamp-1">
                          {member.department || "Academic Department"}
                        </span>
                      </div>
                    </div>

                    {/* Subject Specialization */}
                    {member.course && (
                      <div className="mt-4 p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-2.5 text-xs text-blue-900 font-semibold">
                        <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="truncate">{member.course}</span>
                      </div>
                    )}

                    {/* Qualifications & Experience Pills */}
                    <div className="mt-3.5 space-y-1.5 text-xs">
                      {member.qualification && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span className="font-medium text-[11.5px] truncate">{member.qualification}</span>
                        </div>
                      )}
                      {member.experience && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="font-semibold text-amber-800 text-[11.5px]">{member.experience}</span>
                        </div>
                      )}
                    </div>

                    {/* Bio Snippet */}
                    {member.bio && (
                      <p className="mt-3 text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[150px]">{member.email || "info@aayushinstitute.com"}</span>
                  </div>

                  <NavLink
                    to="/contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 4. Academic Rigor Callout Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-200">
              Personalized Student Mentorship
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
              Have Questions About a Course or Career Pathway?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
              Book a 1-on-1 counseling session with our expert faculty to evaluate your background and select the ideal professional curriculum.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <NavLink
              to="/contact"
              className="px-6 py-3 rounded-2xl bg-white text-blue-700 font-bold text-xs sm:text-sm shadow-md hover:bg-blue-50 transition transform hover:-translate-y-0.5"
            >
              Book Counseling
            </NavLink>
            <NavLink
              to="/Courses"
              className="px-6 py-3 rounded-2xl bg-blue-800/80 border border-white/20 text-white font-bold text-xs sm:text-sm hover:bg-blue-800 transition"
            >
              Explore All Courses
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
