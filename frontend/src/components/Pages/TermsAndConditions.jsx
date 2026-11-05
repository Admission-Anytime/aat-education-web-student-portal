import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FileText,
    Shield,
    CheckCircle2,
    AlertCircle,
    Scale,
    HelpCircle,
    Download,
    Search,
    ChevronRight,
    ArrowUpRight,
    Building2,
    Calendar,
    Phone,
    Mail,
    RefreshCw
} from 'lucide-react';

const TermsAndConditions = () => {
    const [termsData, setTermsData] = useState(null);
    const [activeSection, setActiveSection] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isBackendDown, setIsBackendDown] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchTerms = async () => {
        try {
            const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
            const res = await fetch(`${baseUrl}/api/site-settings`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            
            if (json && json.termsAndConditions && Array.isArray(json.termsAndConditions.sections)) {
                setTermsData(json.termsAndConditions);
                if (!activeSection && json.termsAndConditions.sections.length > 0) {
                    setActiveSection(json.termsAndConditions.sections[0].id);
                }
                setIsBackendDown(false);
            } else {
                setIsBackendDown(true);
            }
        } catch (err) {
            console.warn('[Terms] Backend offline, standing by...', err.message);
            setIsBackendDown(true);
            setTermsData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTerms();
        const poll = setInterval(fetchTerms, 3000);
        return () => clearInterval(poll);
    }, []);

    const sections = termsData?.sections || [];
    const filteredSections = sections.filter(sec => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            sec.title?.toLowerCase().includes(q) ||
            (Array.isArray(sec.content) && sec.content.some(c => c.toLowerCase().includes(q))) ||
            (Array.isArray(sec.bullets) && sec.bullets.some(b => b.toLowerCase().includes(q)))
        );
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased">
            {/* Top Standby Alert Banner */}
            {isBackendDown && (
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-amber-900 text-xs flex items-center justify-between sticky top-0 z-40 shadow-xs">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 animate-pulse" />
                        <span>
                            <strong>Backend Offline:</strong> Terms and policies are disconnected from database. Auto-reconnecting every 3 seconds...
                        </span>
                    </div>
                    <button
                        onClick={fetchTerms}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium transition"
                    >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry Now</span>
                    </button>
                </div>
            )}

            {/* Header Hero */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#eaf4ff] via-[#f1f7ff] to-[#f8fafc] border-b border-blue-100/70 pt-8 sm:pt-12 pb-10 sm:pb-14">
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#003882] text-xs font-bold tracking-wider mb-3 border border-blue-200/80 shadow-xs">
                        <Scale className="w-3.5 h-3.5 text-[#0062ff]" />
                        <span>LEGAL & INSTITUTIONAL POLICIES</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#00285e] tracking-tight mb-2">
                        Terms and Conditions
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-4">
                        Please review the terms of admission, course delivery, fee guidelines, code of conduct, and refund policies.
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>Last Updated: {termsData?.lastUpdated || 'Current Academic Session 2026'}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {isBackendDown || !termsData ? (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 mb-3 border border-amber-200">
                            <AlertCircle className="w-6 h-6 animate-pulse" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">Terms & Policies Standby</h3>
                        <p className="text-xs text-slate-500 mb-4">
                            Official institutional clauses are maintained directly in MongoDB. Server is offline. Content will render automatically upon database reconnection.
                        </p>
                        <button
                            onClick={fetchTerms}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Reload Terms Data</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left TOC Sidebar */}
                        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs sticky top-16">
                            <div className="mb-3 px-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sections</h3>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Filter sections..."
                                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                                {filteredSections.map(sec => {
                                    const isSel = activeSection === sec.id;
                                    return (
                                        <button
                                            key={sec.id}
                                            onClick={() => {
                                                setActiveSection(sec.id);
                                                const el = document.getElementById(sec.id);
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                                                isSel ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            <span className="truncate">{sec.num}. {sec.title}</span>
                                            <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Right Content */}
                        <div className="lg:col-span-8 space-y-6">
                            {filteredSections.map(sec => (
                                <div
                                    key={sec.id}
                                    id={sec.id}
                                    className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs scroll-mt-20"
                                >
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {sec.num}
                                        </div>
                                        <h2 className="text-base sm:text-lg font-bold text-[#0a2540]">
                                            {sec.title}
                                        </h2>
                                    </div>

                                    {Array.isArray(sec.content) && (
                                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                                            {sec.content.map((p, pIdx) => (
                                                <p key={pIdx}>{p}</p>
                                            ))}
                                        </div>
                                    )}

                                    {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                                        <div className="space-y-1.5 my-3 pl-2">
                                            {sec.bullets.map((b, bIdx) => (
                                                <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                                    <span>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {Array.isArray(sec.extra) && sec.extra.length > 0 && (
                                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 pt-3 border-t border-slate-100">
                                            {sec.extra.map((e, eIdx) => (
                                                <p key={eIdx}>{e}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermsAndConditions;
