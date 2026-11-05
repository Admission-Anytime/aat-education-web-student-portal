import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    HelpCircle, ChevronDown, Search, BookOpen, GraduationCap,
    Briefcase, Award, Users, Shield, Cpu, Phone, Mail, MapPin,
    Sparkles, CheckCircle2, Building, MessageSquare, Clock, Star,
    Check, ArrowRight, ChevronsUpDown, ShieldCheck, HeartHandshake,
    AlertCircle, RefreshCw
} from 'lucide-react';

const iconMap = {
    general: Building,
    courses: Cpu,
    university: GraduationCap,
    career: Briefcase,
    fees: ShieldCheck,
    internship: Star,
    certificates: Award,
    admission: Users
};

const FAQ = () => {
    const [faqsData, setFaqsData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(null);
    const [isBackendDown, setIsBackendDown] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchFaqs = async () => {
        try {
            const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
            const res = await fetch(`${baseUrl}/api/site-settings`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            
            const list = json?.faqsList || [];
            if (list.length > 0) {
                setFaqsData(list);
                if (!activeCategory) {
                    setActiveCategory(list[0]?.id || '');
                }
                setIsBackendDown(false);
            } else {
                setIsBackendDown(true);
            }
        } catch (err) {
            console.warn('[FAQ] Backend offline, standing by...', err.message);
            setIsBackendDown(true);
            setFaqsData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
        const poll = setInterval(fetchFaqs, 3000);
        return () => clearInterval(poll);
    }, []);

    const selectedCategoryObj = faqsData.find(c => c.id === activeCategory) || faqsData[0];
    
    // Filter questions by search query
    const displayedFaqs = (selectedCategoryObj?.faqs || []).filter(item => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return item.q?.toLowerCase().includes(q) || item.a?.toLowerCase().includes(q);
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased">
            {/* Top Standby Alert Banner */}
            {isBackendDown && (
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-amber-900 text-xs flex items-center justify-between sticky top-0 z-40 shadow-xs">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 animate-pulse" />
                        <span>
                            <strong>Backend Offline:</strong> FAQ database is disconnected. Auto-reconnecting every 3 seconds...
                        </span>
                    </div>
                    <button
                        onClick={fetchFaqs}
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
                        <HelpCircle className="w-3.5 h-3.5 text-[#0062ff]" />
                        <span>KNOWLEDGE BASE & FAQS</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#00285e] tracking-tight mb-2">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6">
                        Get quick, authentic answers regarding courses, admissions, eligibility, university programs, certificates, and fees.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-lg mx-auto">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions (e.g. refund, eligibility, certificate)..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {isBackendDown || faqsData.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 mb-3 border border-amber-200">
                            <AlertCircle className="w-6 h-6 animate-pulse" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">FAQs Standby Mode</h3>
                        <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
                            The FAQ catalog is dynamically managed in MongoDB. Backend is currently offline. Questions will load automatically when the database reconnects.
                        </p>
                        <button
                            onClick={fetchFaqs}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Reload FAQs</span>
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* Category Selector Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                            {faqsData.map(cat => {
                                const IconComp = iconMap[cat.id] || HelpCircle;
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <IconComp className="w-3.5 h-3.5" />
                                        <span>{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Questions Accordion */}
                        <div className="space-y-3 max-w-3xl mx-auto">
                            {displayedFaqs.length === 0 ? (
                                <div className="text-center py-8 text-slate-400 text-xs">
                                    No questions found matching your search.
                                </div>
                            ) : (
                                displayedFaqs.map((faq, index) => {
                                    const isOpen = openIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all hover:border-slate-300"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800"
                                            >
                                                <span>{faq.q}</span>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                                                        isOpen ? 'rotate-180 text-blue-600' : ''
                                                    }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-5 pb-4 pt-1 text-slate-600 text-xs sm:text-[13px] leading-relaxed border-t border-slate-100 bg-slate-50/50">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQ;
