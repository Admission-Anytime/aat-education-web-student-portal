import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Send,
    MessageSquare,
    GraduationCap,
    BookOpen,
    Briefcase,
    Award,
    Compass,
    CheckCircle2,
    Clock,
    Users,
    Building2,
    Building,
    ChevronRight,
    Sparkles,
    ArrowRight,
    ExternalLink,
    Copy,
    Check,
    HeartHandshake,
    PhoneCall,
    Headphones,
    ShieldCheck,
    CheckCircle,
    AlertCircle,
    RefreshCw
} from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        emailAddress: '',
        interestedIn: 'Course',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copiedItem, setCopiedItem] = useState(null);
    const [contactData, setContactData] = useState(null);
    const [isBackendDown, setIsBackendDown] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchContactData = async () => {
        try {
            const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
            const res = await fetch(`${baseUrl}/api/site-settings`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            
            if (json && (json.contactInfo || json.topBar || json.contact)) {
                const info = json.contactInfo || {
                    phone: json.topBar?.phone || json.contact?.whatsappNumber || "+91-9311050670",
                    altPhone: "093501 57447",
                    landline: "0120-2611111",
                    email: json.topBar?.email || "info@aayushinstitute.com",
                    supportEmail: "support@aayushinstitute.com",
                    address: json.contact?.address || "S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006",
                    landmark: "Near Dilshad Garden Metro Station",
                    timing: "Mon – Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 5:00 PM",
                    googleMapsUrl: "https://www.google.com/search?q=aayush+institute+of+professional+studies"
                };
                setContactData(info);
                setIsBackendDown(false);
            } else {
                setIsBackendDown(true);
            }
        } catch (err) {
            console.warn('[ContactUs] Backend offline, standing by...', err.message);
            setIsBackendDown(true);
            setContactData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContactData();
        const poll = setInterval(fetchContactData, 3000);
        return () => clearInterval(poll);
    }, []);

    const scrollToEnquiry = (interest = null) => {
        if (interest) {
            setFormData(prev => ({ ...prev, interestedIn: interest }));
        }
        setFormSubmitted(false);
        const el = document.getElementById('enquiry-form');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const baseUrl = import.meta.env.VITE_ERP_API_BASE_URL || '';
            const res = await fetch(`${baseUrl}/api/inquiry/submit-form`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.emailAddress,
                    phone: formData.mobileNumber,
                    program: formData.interestedIn || 'Contact Us Enquiry',
                    course: formData.interestedIn || 'Contact Us Enquiry',
                    message: formData.message || 'Submitted via Contact Us page',
                    inquiryType: 'Contact Us Enquiry',
                    consent: true
                })
            });
            const data = await res.json();
            console.log('✅ [ContactUs] Form submitted to admin successfully:', data);
            setFormSubmitted(true);
        } catch (err) {
            console.warn('Contact form submission fallback:', err);
            alert('Unable to submit enquiry right now because the backend server is offline. Please retry once reconnected.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToClipboard = (text, label) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedItem(label);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const interestOptions = [
        'Course',
        'University Programme',
        'Career Guidance',
        'Live Training',
        'Internship',
        'Placement',
        'Corporate Training',
        'Other'
    ];

    // Standby Section Card for DB Offline
    const StandbyCard = ({ sectionName }) => (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center my-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 mb-3 border border-amber-200">
                <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">{sectionName}</h3>
            <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
                Official contact coordinates and maps are dynamically retrieved from the database. The server is currently offline or reconnecting.
            </p>
            <button
                onClick={fetchContactData}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Reload Contact Data</span>
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased selection:bg-blue-500 selection:text-white">

            {/* Top Standby Alert Banner */}
            {isBackendDown && (
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-amber-900 text-xs flex items-center justify-between sticky top-0 z-40 shadow-xs">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 animate-pulse" />
                        <span>
                            <strong>Backend Offline:</strong> Contact information disconnected. Auto-reconnecting every 3 seconds...
                        </span>
                    </div>
                    <button
                        onClick={fetchContactData}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium transition"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry Now</span>
                    </button>
                </div>
            )}

            {/* 1. HERO SECTION */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#eaf4ff] via-[#f1f7ff] to-[#f8fbff] border-b border-blue-100/70 pt-8 sm:pt-12 pb-12 sm:pb-16 lg:pb-20">
                <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl pointer-events-none" />
                <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-indigo-200/35 blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-blue-700 text-xs font-bold tracking-wide mb-4 sm:mb-5 border border-blue-200/80 shadow-xs backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <Headphones className="w-3.5 h-3.5 text-blue-600" />
                            <span>WE’RE HERE TO ASSIST YOU • ESTD. 2002</span>
                        </div>

                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0a2540] tracking-tight leading-[1.18] sm:leading-[1.15] mb-3 sm:mb-4">
                            Let’s Help You Choose The{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                                Right Learning Path
                            </span>
                        </h1>

                        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mb-6 sm:mb-8">
                            Have questions about our IT programs, university degrees, free career guidance, live industry projects, or internships? Connect with our dedicated student advisory desk today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry(); }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Send Us an Enquiry</span>
                            </a>

                            {contactData?.phone && (
                                <a
                                    href={`tel:${contactData.phone.replace(/[^0-9+]/g, '')}`}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 text-xs sm:text-sm font-bold shadow-2xs hover:border-blue-300 transition-all active:scale-[0.98]"
                                >
                                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                                    <span>{contactData.phone}</span>
                                </a>
                            )}

                            {contactData?.phone && (
                                <a
                                    href={`https://wa.me/${contactData.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 text-xs sm:text-sm font-bold transition-all active:scale-[0.98]"
                                >
                                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>WhatsApp Us</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT BODY */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14">

                {/* 2.1 QUICK CONTACT CARDS */}
                {isBackendDown || !contactData ? (
                    <StandbyCard sectionName="Official Campus & Support Channels" />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
                        
                        {/* Card 1: Campus Visit */}
                        <div className="bg-gradient-to-br from-sky-50/90 via-blue-50/40 to-white rounded-2xl p-4 sm:p-5 border border-sky-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-sm">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">Campus Visit</span>
                                        <h3 className="text-sm font-bold text-slate-800 leading-tight">Ghaziabad Campus</h3>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    {contactData.address}
                                </p>
                                {contactData.landmark && (
                                    <p className="text-[11px] text-sky-700/80 font-medium mt-1">
                                        {contactData.landmark}
                                    </p>
                                )}
                            </div>
                            <a
                                href={contactData.googleMapsUrl || "https://www.google.com/search?q=aayush+institute+of+professional+studies"}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-between text-xs font-bold text-sky-700 hover:text-sky-900 mt-3 pt-3 border-t border-sky-200/60 transition-colors"
                            >
                                <span>Open on Google Maps</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Card 2: Call Support */}
                        <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Direct Line</span>
                                        <h3 className="text-sm font-bold text-slate-800 leading-tight">Student Advisory</h3>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-1">
                                    Phone: <strong className="text-slate-800">{contactData.phone}</strong>
                                </p>
                                {contactData.altPhone && (
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                        Alt: <strong className="text-slate-800">{contactData.altPhone}</strong>
                                    </p>
                                )}
                                <p className="text-[11px] text-emerald-700/80 font-medium mt-1">
                                    {contactData.timing}
                                </p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(contactData.phone, 'phone')}
                                className="inline-flex items-center justify-between text-xs font-bold text-emerald-700 hover:text-emerald-900 mt-3 pt-3 border-t border-emerald-200/60 transition-colors text-left"
                            >
                                <span>{copiedItem === 'phone' ? 'Copied Number!' : 'Copy Phone Number'}</span>
                                {copiedItem === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                        </div>

                        {/* Card 3: Email Support */}
                        <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white rounded-2xl p-4 sm:p-5 border border-indigo-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Write to Us</span>
                                        <h3 className="text-sm font-bold text-slate-800 leading-tight">Official Inquiries</h3>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    {contactData.email}
                                </p>
                                {contactData.supportEmail && (
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                                        Support: {contactData.supportEmail}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => copyToClipboard(contactData.email, 'email')}
                                className="inline-flex items-center justify-between text-xs font-bold text-indigo-700 hover:text-indigo-900 mt-3 pt-3 border-t border-indigo-200/60 transition-colors text-left"
                            >
                                <span>{copiedItem === 'email' ? 'Copied Email!' : 'Copy Email Address'}</span>
                                {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                        </div>

                        {/* Card 4: WhatsApp Desk */}
                        <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Fast Response</span>
                                        <h3 className="text-sm font-bold text-slate-800 leading-tight">WhatsApp Counselling</h3>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    Chat directly with an academic counsellor for syllabus, fees, and next batch timings.
                                </p>
                            </div>
                            <a
                                href={`https://wa.me/${contactData.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-between text-xs font-bold text-amber-700 hover:text-amber-900 mt-3 pt-3 border-t border-amber-200/60 transition-colors"
                            >
                                <span>Start WhatsApp Chat</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                    </div>
                )}

                {/* 2.2 ENQUIRY FORM & OFFICE HOURS */}
                <div id="enquiry-form" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    
                    {/* Form Left Container */}
                    <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                        <div className="mb-6">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                                Get In Touch
                            </span>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#0a2540]">
                                Send Us An Admission Or Course Enquiry
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Fill out the details below. Our counselling desk will contact you within 2 working hours.
                            </p>
                        </div>

                        {formSubmitted ? (
                            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-3 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-emerald-900 mb-1">Enquiry Submitted Successfully!</h3>
                                <p className="text-xs text-emerald-700 mb-4">
                                    Thank you! Our admissions coordinator will reach out to you shortly on WhatsApp or phone.
                                </p>
                                <button
                                    onClick={() => {
                                        setFormSubmitted(false);
                                        setFormData({
                                            fullName: '',
                                            mobileNumber: '',
                                            emailAddress: '',
                                            interestedIn: 'Course',
                                            message: ''
                                        });
                                    }}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                                >
                                    Send Another Enquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Rahul Sharma"
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Mobile / WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleInputChange}
                                            placeholder="10-digit mobile number"
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            value={formData.emailAddress}
                                            onChange={handleInputChange}
                                            placeholder="name@example.com"
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Interested In
                                    </label>
                                    <select
                                        name="interestedIn"
                                        value={formData.interestedIn}
                                        onChange={handleInputChange}
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    >
                                        {interestOptions.map((opt, i) => (
                                            <option key={i} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Your Query / Question
                                    </label>
                                    <textarea
                                        rows="3"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell us what course you want to explore or any specific questions..."
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isBackendDown}
                                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>Submitting Enquiry...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Submit Enquiry</span>
                                        </>
                                    )}
                                </button>
                                {isBackendDown && (
                                    <p className="text-[11px] text-amber-600 text-center">
                                        Backend offline. Form will activate automatically upon database reconnection.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>

                    {/* Right Info Box */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                            <h3 className="text-sm font-bold text-[#0a2540] mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span>Counseling & Office Hours</span>
                            </h3>
                            <div className="space-y-2 text-xs text-slate-600">
                                <div className="flex justify-between py-1.5 border-b border-slate-100">
                                    <span className="font-medium">Monday – Friday</span>
                                    <span className="font-bold text-slate-800">8:00 AM – 8:00 PM</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-slate-100">
                                    <span className="font-medium">Saturday</span>
                                    <span className="font-bold text-slate-800">8:00 AM – 7:00 PM</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="font-medium">Sunday</span>
                                    <span className="font-bold text-slate-800">9:00 AM – 5:00 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-100/80 shadow-xs">
                            <h3 className="text-sm font-bold text-[#0a2540] mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-blue-600" />
                                <span>Free Career Counselling</span>
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                Walk into our Dilshad Extension campus or request an online video session to meet with an industry expert before enrolling.
                            </p>
                            <div className="space-y-1.5 text-[11px] text-[#004b93] font-medium">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Personalized 1-on-1 Guidance</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Curriculum & Career Scope Explanation</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Zero Obligation / 100% Free Consultation</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ContactUs;
