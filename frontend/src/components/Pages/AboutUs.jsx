import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Award,
    BookOpen,
    Briefcase,
    CheckCircle2,
    Clock,
    Users,
    Building,
    Shield,
    Sparkles,
    ArrowRight,
    ChevronRight,
    Phone,
    Mail,
    Globe,
    MapPin,
    Cpu,
    GraduationCap,
    AlertCircle,
    RefreshCw
} from 'lucide-react';

const AboutUs = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [aboutData, setAboutData] = useState(null);
    const [isBackendDown, setIsBackendDown] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
            const res = await fetch(`${baseUrl}/api/site-settings`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            
            if (json && (json.aboutUs || json.heroSection)) {
                setAboutData(json.aboutUs || null);
                setIsBackendDown(false);
            } else {
                setIsBackendDown(true);
            }
        } catch (err) {
            console.warn('[AboutUs] Backend offline, standing by...', err.message);
            setIsBackendDown(true);
            setAboutData(null);
        } finally {
            setLoading(false);
        }

        // Fetch staff / faculty
        try {
            const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
            const resStaff = await fetch(`${baseUrl}/api/users?role=staff`);
            if (resStaff.ok) {
                const jsonStaff = await resStaff.json();
                const list = Array.isArray(jsonStaff?.data) ? jsonStaff.data : Array.isArray(jsonStaff) ? jsonStaff : [];
                setFacultyList(list.slice(0, 4));
            }
        } catch {
            // Optional faculty list
        }
    };

    useEffect(() => {
        fetchAllData();
        const poll = setInterval(fetchAllData, 3000);
        return () => clearInterval(poll);
    }, []);

    // Standby Section Card for DB Offline
    const StandbyCard = ({ sectionName }) => (
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-xs text-center my-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 mb-3 border border-amber-200">
                <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">{sectionName}</h3>
            <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
                Live content is strictly pulled from the database API. The backend server is currently offline or reconnecting. Content will appear automatically as soon as the database is active.
            </p>
            <button
                onClick={fetchAllData}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Reload Data</span>
            </button>
        </div>
    );

    const hero = aboutData?.hero;
    const overview = aboutData?.overview;
    const journey = aboutData?.journey || [];
    const pillars = aboutData?.pillars || [];
    const visionMission = aboutData?.visionMission;

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Top Standby Alert Banner */}
            {isBackendDown && (
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-amber-900 text-xs flex items-center justify-between sticky top-0 z-40 shadow-xs">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 animate-pulse" />
                        <span>
                            <strong>Backend Offline:</strong> About Us live content is disconnected. Auto-reconnecting every 3 seconds...
                        </span>
                    </div>
                    <button
                        onClick={fetchAllData}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium transition"
                    >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry Now</span>
                    </button>
                </div>
            )}

            {/* 1. Hero Section */}
            <div 
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-[right_center] border-b border-slate-200/60"
                style={{ 
                    backgroundImage: "url('/professional.png')",
                    backgroundColor: '#d0e7ff'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d0e7ff]/98 via-[#d0e7ff]/85 to-[#d0e7ff]/30 sm:from-[#d0e7ff]/95 sm:via-[#d0e7ff]/75 sm:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
                    <div className="flex flex-col justify-center py-5 sm:py-6 lg:py-8 max-w-xl lg:max-w-2xl min-h-0">
                        {isBackendDown || !hero ? (
                            <div className="py-6">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#003882] text-[11.5px] font-bold tracking-wider mb-2 border border-blue-200/80 shadow-xs w-fit">
                                    <Sparkles className="w-3.5 h-3.5 text-[#0055ff]" />
                                    <span>ABOUT US</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-[#00285e] leading-tight mb-2">
                                    AAYUSH INSTITUTE OF PROFESSIONAL STUDIES
                                </h1>
                                <p className="text-slate-500 text-xs mb-3">
                                    Standby Mode: Connecting to backend server...
                                </p>
                                <button
                                    onClick={fetchAllData}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs"
                                >
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    <span>Reload Hero Data</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#003882] text-[11.5px] font-bold tracking-wider mb-2 border border-blue-200/80 shadow-xs w-fit">
                                    <Sparkles className="w-3.5 h-3.5 text-[#0055ff]" />
                                    <span>{hero.badge || 'ABOUT US'}</span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-bold text-[#00285e] leading-[1.15] tracking-tight mb-1.5">
                                    {hero.title || 'AAYUSH INSTITUTE OF'}{' '}
                                    <span className="text-[#0062ff] block">{hero.highlight || 'PROFESSIONAL STUDIES'}</span>
                                </h1>

                                <p className="text-[#004b93] font-semibold text-xs sm:text-[13px] mb-2 tracking-wide">
                                    {hero.subtitle || 'Education • Skills • Industry Exposure • Career Development'}
                                </p>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-3.5 max-w-xl font-normal">
                                    {hero.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-3">
                                    <NavLink
                                        to="/Courses"
                                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        <span>Explore Courses</span>
                                    </NavLink>
                                    <NavLink
                                        to="/contact"
                                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#00285e] border border-slate-300 text-xs sm:text-[13px] font-bold shadow-xs transition-all"
                                    >
                                        <Phone className="w-4 h-4 text-[#0062ff]" />
                                        <span>Contact Us</span>
                                    </NavLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 space-y-4 sm:space-y-5">

                {/* 1.1 Introductory Overview Card */}
                {isBackendDown || !overview ? (
                    <StandbyCard sectionName="Institutional Overview" />
                ) : (
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <div className="w-full space-y-2 text-left">
                            <span className="text-[11px] font-semibold text-[#0055cc] uppercase tracking-wider block">
                                {overview.badge}
                            </span>
                            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#0a2540]">
                                {overview.title}
                            </h2>
                            {Array.isArray(overview.paragraphs) && overview.paragraphs.map((p, idx) => (
                                <p key={idx} className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. OUR JOURNEY (From 2002 to Today) */}
                {isBackendDown || journey.length === 0 ? (
                    <StandbyCard sectionName="Our Journey & Milestones (2002 – Present)" />
                ) : (
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <div className="w-full mb-4">
                            <span className="text-[10px] font-semibold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                                Our Journey
                            </span>
                            <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                                From 2002 to Today
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                            {journey.map((item, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-blue-700 block">{item.year}</span>
                                        {item.badge && (
                                            <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-xs font-semibold text-slate-800 mb-1">{item.title}</h4>
                                    <p className="text-slate-500 text-[11px] leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. CORE PILLARS / ECOSYSTEM */}
                {isBackendDown || pillars.length === 0 ? (
                    <StandbyCard sectionName="Education & Training Ecosystem" />
                ) : (
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <div className="mb-4">
                            <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                                Ecosystem
                            </span>
                            <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                                Our Education & Training Ecosystem
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                            {pillars.map((pillar, idx) => (
                                <div key={idx} className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Cpu className="w-4 h-4 text-[#0055ff]" />
                                                <h3 className="text-xs sm:text-[13px] font-bold text-[#0a2540] uppercase">
                                                    {pillar.title}
                                                </h3>
                                            </div>
                                        </div>
                                        {pillar.subtitle && (
                                            <p className="text-[11px] font-semibold text-blue-700 mb-1">
                                                {pillar.subtitle}
                                            </p>
                                        )}
                                        <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
                                            {pillar.desc}
                                        </p>
                                        {Array.isArray(pillar.points) && (
                                            <div className="space-y-1">
                                                {pillar.points.map((pt, pIdx) => (
                                                    <div key={pIdx} className="flex items-center gap-1.5 p-1 rounded bg-white text-[11px] font-medium text-slate-700 border border-slate-100">
                                                        <CheckCircle2 className="w-3 h-3 text-[#0055ff] flex-shrink-0" />
                                                        <span>{pt}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. VISION & MISSION */}
                {isBackendDown || !visionMission ? (
                    <StandbyCard sectionName="Institutional Vision & Mission" />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Vision */}
                        <div className="bg-white rounded-xl p-5 border border-slate-200/70 shadow-xs">
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <h3 className="text-sm font-bold text-[#0a2540]">
                                    {visionMission.vision?.title || 'Our Vision'}
                                </h3>
                            </div>
                            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                                {visionMission.vision?.desc}
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="bg-white rounded-xl p-5 border border-slate-200/70 shadow-xs">
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Award className="w-4 h-4" />
                                </div>
                                <h3 className="text-sm font-bold text-[#0a2540]">
                                    {visionMission.mission?.title || 'Our Mission'}
                                </h3>
                            </div>
                            <div className="space-y-1.5">
                                {Array.isArray(visionMission.mission?.points) && visionMission.mission.points.map((mPt, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-slate-600 text-xs sm:text-[13px]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                        <span>{mPt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. FACULTY & LEADERSHIP */}
                {facultyList.length > 0 && (
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                        <div className="mb-4">
                            <span className="text-[10px] font-bold text-[#0055cc] uppercase tracking-wider block mb-0.5">
                                Leadership & Faculty
                            </span>
                            <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                                Experienced Educators & Mentors
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {facultyList.map((member, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-2 flex items-center justify-center font-bold text-lg">
                                        {member.name ? member.name.charAt(0) : 'F'}
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-800">{member.name || 'Faculty Member'}</h4>
                                    <p className="text-[11px] text-slate-500">{member.role || 'Senior Instructor'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AboutUs;
