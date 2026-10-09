import React, { useState } from 'react';
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
    CheckCircle
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
            const res = await fetch('/api/inquiry/submit-form', {
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
        } catch (err) {
            console.warn('Contact form submission fallback:', err);
        } finally {
            setIsSubmitting(false);
            setFormSubmitted(true);
        }
    };

    const copyToClipboard = (text, label) => {
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

    return (
        <div className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased selection:bg-blue-500 selection:text-white">

            {/* ═════════════════════════════════════════════════════════════════
                1. HERO SECTION (Premium Light Pastel Atmosphere)
            ═════════════════════════════════════════════════════════════════ */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#eaf4ff] via-[#f1f7ff] to-[#f8fbff] border-b border-blue-100/70 pt-8 sm:pt-12 pb-12 sm:pb-16 lg:pb-20">
                {/* Ambient Soft Pastel Blur Blobs */}
                <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl pointer-events-none" />
                <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-indigo-200/35 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-emerald-200/25 blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        
                        {/* Super Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-blue-700 text-xs font-bold tracking-wide mb-4 sm:mb-5 border border-blue-200/80 shadow-xs backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <Headphones className="w-3.5 h-3.5 text-blue-600" />
                            <span>WE’RE HERE TO ASSIST YOU • ESTD. 2002</span>
                        </div>

                        {/* Hero Heading */}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0a2540] tracking-tight leading-[1.18] sm:leading-[1.15] mb-3 sm:mb-4">
                            Let’s Help You Choose The{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                                Right Learning Path
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mb-6 sm:mb-8">
                            Have questions about our IT programs, university degrees, free career guidance, live industry projects, or internships? Connect with our dedicated student advisory desk today.
                        </p>

                        {/* Hero Interactive CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry(); }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Send Us an Enquiry</span>
                            </a>

                            <a
                                href="tel:+919311050670"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 text-xs sm:text-sm font-bold shadow-2xs hover:border-blue-300 transition-all active:scale-[0.98]"
                            >
                                <Phone className="w-3.5 h-3.5 text-blue-600" />
                                <span>+91-9311050670</span>
                            </a>

                            <a
                                href="https://wa.me/919311050670"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 text-xs sm:text-sm font-bold transition-all active:scale-[0.98]"
                            >
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                <span>WhatsApp Us</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* ═════════════════════════════════════════════════════════════════
                MAIN CONTENT BODY
            ═════════════════════════════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14">

                {/* ═════════════════════════════════════════════════════════════
                    2. TOP QUICK CONTACT STRIP (4 Soft Light Pastel Cards)
                ═════════════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
                    
                    {/* Card 1: Visit Institute (Soft Sky / Blue Pastel) */}
                    <div className="bg-gradient-to-br from-sky-50/90 via-blue-50/40 to-white rounded-2xl p-4 sm:p-5 border border-sky-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-sm shadow-sky-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">Campus Visit</span>
                                    <h3 className="text-sm font-bold text-slate-800 leading-tight">Ghaziabad Campus</h3>
                                </div>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006
                            </p>
                            <p className="text-[11px] text-sky-700/80 font-medium mt-1">
                                Near Dilshad Garden Metro Station
                            </p>
                        </div>
                        <a
                            href="https://www.google.com/search?q=aayush+institute+of+professional+studies"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-between text-xs font-bold text-sky-700 hover:text-sky-900 mt-3 pt-3 border-t border-sky-200/60 transition-colors"
                        >
                            <span>Open on Google Maps</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    {/* Card 2: Call Support (Soft Emerald / Mint Pastel) */}
                    <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-600/25 group-hover:scale-105 transition-transform flex-shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Call Support</span>
                                    <h3 className="text-sm font-bold text-slate-800 leading-tight">Student Helpline</h3>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                                <div className="flex items-center justify-between">
                                    <a href="tel:+919311050670" className="hover:text-emerald-700 font-semibold transition-colors">+91-9311050670</a>
                                    <button
                                        onClick={() => copyToClipboard('+919311050670', 'p1')}
                                        className="text-slate-400 hover:text-emerald-600 p-0.5 cursor-pointer"
                                        title="Copy number"
                                    >
                                        {copiedItem === 'p1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="tel:01202611111" className="hover:text-emerald-700 transition-colors">0120-2611111</a>
                                    <button
                                        onClick={() => copyToClipboard('01202611111', 'p2')}
                                        className="text-slate-400 hover:text-emerald-600 p-0.5 cursor-pointer"
                                        title="Copy number"
                                    >
                                        {copiedItem === 'p2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="tel:+919311050670" className="hover:text-emerald-700 transition-colors">+91-9311050670</a>
                                    <button
                                        onClick={() => copyToClipboard('+919311050670', 'p3')}
                                        className="text-slate-400 hover:text-emerald-600 p-0.5 cursor-pointer"
                                        title="Copy number"
                                    >
                                        {copiedItem === 'p3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-medium text-slate-500">
                            <span>Admission Lines</span>
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Now
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Official Email (Soft Violet / Purple Pastel) */}
                    <div className="bg-gradient-to-br from-purple-50/90 via-fuchsia-50/40 to-white rounded-2xl p-4 sm:p-5 border border-purple-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm shadow-purple-600/25 group-hover:scale-105 transition-transform flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Official Email</span>
                                    <h3 className="text-sm font-bold text-slate-800 leading-tight">Direct Response</h3>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                                <div className="flex items-center justify-between">
                                    <a href="mailto:info@aayushinstitute.com" className="hover:text-purple-700 font-semibold break-all">
                                        info@aayushinstitute.com
                                    </a>
                                    <button
                                        onClick={() => copyToClipboard('info@aayushinstitute.com', 'email')}
                                        className="text-slate-400 hover:text-purple-600 p-0.5 cursor-pointer shrink-0 ml-1"
                                        title="Copy email"
                                    >
                                        {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Expect verified responses within 24 working hours.
                                </p>
                            </div>
                        </div>
                        <a
                            href="mailto:info@aayushinstitute.com"
                            className="inline-flex items-center justify-between text-xs font-bold text-purple-700 hover:text-purple-900 mt-3 pt-3 border-t border-purple-200/60 transition-colors"
                        >
                            <span>Send an Email</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    {/* Card 4: Hours & Online Portal (Soft Amber / Peach Pastel) */}
                    <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shadow-amber-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Office Hours</span>
                                    <h3 className="text-sm font-bold text-slate-800 leading-tight">Student Advisory</h3>
                                </div>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600 font-medium">
                                <p><span className="font-bold text-slate-700">Mon – Sat:</span> 9:00 AM – 7:00 PM</p>
                                <p><span className="font-bold text-slate-700">Sunday:</span> By Prior Appointment</p>
                                <p className="text-[11px] text-amber-800/80 pt-0.5">Online portal active 24/7</p>
                            </div>
                        </div>
                        <a
                            href="https://www.aayushinstitute.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-between text-xs font-bold text-amber-800 hover:text-amber-950 mt-3 pt-3 border-t border-amber-200/60 transition-colors"
                        >
                            <span>www.aayushinstitute.com</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>

                </div>

                {/* ═════════════════════════════════════════════════════════════
                    3. INTERACTIVE SPLIT: INSTITUTE CARD & ENQUIRY FORM
                ═════════════════════════════════════════════════════════════ */}
                <div id="enquiry-form" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

                    {/* Left Column: Official Campus Identity (Light Colorful Theme with Slate/Indigo Gradient Accents) */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="h-full bg-gradient-to-br from-[#0c2340] via-[#10305a] to-[#0a488f] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden flex flex-col justify-between border border-blue-900/50">
                            
                            {/* Decorative soft glowing blobs inside card */}
                            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
                            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

                            <div>
                                {/* Institute Badge */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-xs flex-shrink-0">
                                        <Building className="w-5 h-5 text-blue-300" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-200">Established in 2002</span>
                                        <h3 className="text-sm sm:text-base font-extrabold tracking-tight leading-snug">
                                            AAYUSH INSTITUTE OF PROFESSIONAL STUDIES
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-blue-100/90 text-xs leading-relaxed mb-6 font-medium">
                                    Managed &amp; operated by Atri Admission Anytime Pvt. Ltd. Providing 20+ years of trust in IT, professional training, and career advancement.
                                </p>

                                {/* Institute Key Details */}
                                <div className="space-y-4 text-xs">
                                    {/* Address */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-2xs">
                                        <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-[11px] uppercase tracking-wider mb-0.5">Campus Address</h4>
                                            <p className="text-blue-100/90 leading-relaxed text-[11.5px]">
                                                S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone Numbers */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-2xs">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-[11px] uppercase tracking-wider mb-0.5">Phone &amp; Helplines</h4>
                                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-blue-100/95 font-semibold text-[11.5px]">
                                                <a href="tel:+919311050670" className="hover:text-white hover:underline">+91-9311050670</a>
                                                <a href="tel:09350157447" className="hover:text-white hover:underline">093501 57447</a>
                                                <a href="tel:01202611111" className="hover:text-white hover:underline">0120-2611111</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email & Web */}
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-2xs">
                                        <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-[11px] uppercase tracking-wider mb-0.5">Email &amp; Web Desk</h4>
                                            <div className="space-y-0.5 text-[11.5px] text-blue-100/90">
                                                <a href="mailto:info@aayushinstitute.com" className="block hover:underline">
                                                    info@aayushinstitute.com
                                                </a>
                                                <a href="https://www.aayushinstitute.com" target="_blank" rel="noreferrer" className="block text-sky-200 hover:underline">
                                                    www.aayushinstitute.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Action Grid at Bottom */}
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/15">
                                <a
                                    href="https://www.google.com/search?q=aayush+institute+of+professional+studies"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold text-center transition-all flex flex-col items-center gap-1 active:scale-95"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Directions</span>
                                </a>
                                <a
                                    href="tel:+919311050670"
                                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold text-center transition-all flex flex-col items-center gap-1 active:scale-95"
                                >
                                    <Phone className="w-3.5 h-3.5 text-emerald-300" />
                                    <span>Call Us</span>
                                </a>
                                <a
                                    href="https://wa.me/919311050670"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold text-center transition-all flex flex-col items-center gap-1 active:scale-95"
                                >
                                    <MessageSquare className="w-3.5 h-3.5 text-green-300" />
                                    <span>WhatsApp</span>
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Send Us An Enquiry Form (Modern Light Card with Pastel Touches) */}
                    <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-blue-100 shadow-sm flex flex-col justify-between">
                        
                        <div className="mb-4 sm:mb-5">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-bold tracking-wider uppercase mb-2 border border-blue-200/70">
                                <Sparkles className="w-3 h-3 text-blue-600" />
                                <span>ONLINE ADMISSION &amp; ENQUIRY DESK</span>
                            </div>
                            <h2 className="text-lg sm:text-2xl font-black text-[#0a2540] tracking-tight">
                                Have a Question? We’re Here to Help.
                            </h2>
                            <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-normal">
                                Fill in your details below and our academic advisory team will connect with you with complete course guidance.
                            </p>
                        </div>

                        {formSubmitted ? (
                            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200 text-center space-y-3 my-auto">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                                    Enquiry Received Successfully!
                                </h3>
                                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                                    Thank you, <span className="font-bold text-emerald-950">{formData.fullName || 'Student'}</span>! Our counselling team has received your enquiry regarding <span className="font-bold text-emerald-950">{formData.interestedIn}</span> and will get in touch shortly on <span className="font-semibold">{formData.mobileNumber || 'your registered number'}</span>.
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
                                    className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                                >
                                    Submit Another Enquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                                
                                <div className="space-y-3.5">
                                    
                                    {/* Row 1: Full Name & Mobile */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Full Name <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Rahul Singh"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all bg-slate-50/60 focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Mobile Number <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                required
                                                value={formData.mobileNumber}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 7870391245"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all bg-slate-50/60 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Email & Interested In */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Email Address <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="emailAddress"
                                                required
                                                value={formData.emailAddress}
                                                onChange={handleInputChange}
                                                placeholder="e.g. rahul.singh@example.com"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all bg-slate-50/60 focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Interested In <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                name="interestedIn"
                                                value={formData.interestedIn}
                                                onChange={handleInputChange}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm text-slate-800 outline-none transition-all bg-slate-50/60 focus:bg-white cursor-pointer"
                                            >
                                                {interestOptions.map(opt => (
                                                    <option key={opt} value={opt}>
                                                        {opt === 'Course' ? 'IT & Professional Course' : opt}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 3: Message */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Your Query / Message <span className="text-slate-400 font-normal">(Optional)</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={3}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Tell us what you are looking for (course timing, eligibility, etc.)"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all resize-none bg-slate-50/60 focus:bg-white"
                                        />
                                    </div>

                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <p className="text-[11px] text-slate-400 text-center sm:text-left">
                                        🔒 Your contact information is kept private and secure.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
                                    >
                                        <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>

                            </form>
                        )}

                    </div>

                </div>

                {/* ═════════════════════════════════════════════════════════════
                    4. CAMPUS LOCATION & INTERACTIVE GOOGLE MAP
                ═════════════════════════════════════════════════════════════ */}
                <div className="bg-gradient-to-br from-blue-50/50 via-sky-50/30 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-blue-200/80 shadow-xs">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-200/60">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-blue-700 border border-blue-200/80 text-xs font-bold uppercase tracking-wider shadow-2xs">
                            <Compass className="w-3.5 h-3.5 text-blue-600" />
                            <span>Campus Location &amp; Directions</span>
                        </div>
                        <a
                            href="https://www.google.com/search?q=aayush+institute+of+professional+studies"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
                        >
                            <Send className="w-3 h-3 rotate-45" />
                            <span>Open in Google Maps</span>
                        </a>
                    </div>

                    {/* Middle Info Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 my-4">
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#0a2540]">
                                Aayush Institute of Professional Studies
                            </h3>
                            <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium mt-0.5">
                                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                <p>
                                    <span className="font-bold text-slate-700">Address:</span>{' '}
                                    S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                            <div className="flex items-center gap-2">
                                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                                <a href="tel:+919311050670" className="font-bold text-slate-800 hover:text-blue-600">+91-9311050670</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-purple-600" />
                                <a href="mailto:info@aayushinstitute.com" className="font-bold text-slate-800 hover:text-blue-600">info@aayushinstitute.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Embed */}
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-blue-200/70 shadow-inner">
                        <iframe
                            title="Aayush Institute of Professional Studies Google Map"
                            src="https://maps.google.com/maps?q=Aayush+Institute+of+Professional+Studies,+S-14,+DLF+Dilshad+Extention+II,+Bhopura,+Sahibabad,+Ghaziabad,+Uttar+Pradesh+201006&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-[220px] sm:h-[280px] md:h-[340px] border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* ═════════════════════════════════════════════════════════════
                    5. THEMATIC GUIDANCE CARDS (4 Pastel-Coded Sections)
                ═════════════════════════════════════════════════════════════ */}
                <div className="space-y-6 sm:space-y-8">
                    
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block mb-1">
                            TAILORED SUPPORT
                        </span>
                        <h2 className="text-xl sm:text-3xl font-black text-[#0a2540] tracking-tight">
                            Comprehensive Learning &amp; Career Guidance
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                            Whether you are a beginner student, graduate fresher, working professional, or parent — we provide focused support for your specific goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        
                        {/* 5.1 Education & Course Enquiries (Soft Light Blue Pastel) */}
                        <div className="bg-gradient-to-br from-sky-50/70 via-blue-50/30 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-blue-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/25">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Course Advisory</span>
                                        <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                            EDUCATION &amp; COURSE ENQUIRIES
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-4">
                                    Looking for the right IT, coding, or professional certification? Our academic team helps you explore:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {[
                                        'Course Structure & Syllabus',
                                        'Eligibility & Prerequisites',
                                        'Duration & Batch Timings',
                                        'Online & Classroom Modes',
                                        'Affordable Course Fees',
                                        'Hands-On Practical Labs',
                                        'Career Pathways & Roles'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-blue-100 shadow-2xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('Course'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 mt-2 group cursor-pointer"
                            >
                                <span>Enquire About Courses</span>
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* 5.2 University & Higher Education (Soft Light Purple Pastel) */}
                        <div className="bg-gradient-to-br from-purple-50/70 via-fuchsia-50/30 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-purple-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/25">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Degree &amp; Higher Education</span>
                                        <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                            UNIVERSITY &amp; DISTANCE EDUCATION
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-4">
                                    Need assistance with recognized University, Distance, or Online degree programs? We provide guidance for:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {[
                                        'Undergraduate Degrees (BCA, BBA, B.Com)',
                                        'Postgraduate Degrees (MCA, MBA, M.Com)',
                                        'Government-Recognised Diplomas',
                                        'Approved Certificate Programmes',
                                        'Flexible Distance Learning',
                                        'Working Executive Batches',
                                        'Vocational & Technical Education'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-purple-100 shadow-2xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('University Programme'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 mt-2 group cursor-pointer"
                            >
                                <span>Get University Programme Guidance</span>
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* 5.3 Career Guidance (Soft Mint / Light Emerald Pastel) */}
                        <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-500/25">
                                            <Compass className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Advisory &amp; Roadmap</span>
                                            <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                                CAREER GUIDANCE
                                            </h3>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold border border-emerald-200">
                                        100% Free
                                    </span>
                                </div>

                                <div className="bg-emerald-100/40 border border-emerald-200/70 rounded-xl p-3 mb-3">
                                    <p className="text-emerald-900 text-xs font-bold">
                                        Get Personalized Career Guidance at No Cost
                                    </p>
                                    <p className="text-slate-600 text-xs mt-0.5">
                                        Unsure which technical stack matches your aptitude? Discuss your goals with our experienced career advisors:
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {[
                                        'Career Goal Setting & Mapping',
                                        'Right Course Selection',
                                        'Industry Skill Requirements',
                                        'IT & Tech Job Market Trends',
                                        'Higher Education Pathways',
                                        'Internship Opportunities',
                                        'Interview & Resume Preparation'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('Career Guidance'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-950 mt-2 group cursor-pointer"
                            >
                                <span>Book Free Career Session</span>
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* 5.4 Student & Career Support (Soft Warm Amber / Peach Pastel) */}
                        <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-500/25">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">End-To-End Support</span>
                                        <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                            STUDENT &amp; CAREER SUPPORT
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-3">
                                    Our support ecosystem extends from your first class all the way through your career milestones:
                                </p>

                                <div className="space-y-2.5 mb-4">
                                    <div className="p-2.5 rounded-xl bg-white border border-amber-200/60 shadow-2xs">
                                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                                            LIVE PROJECT TRAINING
                                        </h4>
                                        <p className="text-[11.5px] text-slate-600 mt-0.5 leading-relaxed">
                                            Gain practical exposure through structured real-world client and application projects.
                                        </p>
                                    </div>

                                    <div className="p-2.5 rounded-xl bg-white border border-amber-200/60 shadow-2xs">
                                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                            INTERNSHIP OPPORTUNITIES
                                        </h4>
                                        <p className="text-[11.5px] text-slate-600 mt-0.5 leading-relaxed">
                                            Explore corporate internship openings (including paid opportunities based on partner company selection).
                                        </p>
                                    </div>

                                    <div className="p-2.5 rounded-xl bg-white border border-amber-200/60 shadow-2xs">
                                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                                            PLACEMENT &amp; MOCK INTERVIEWS
                                        </h4>
                                        <p className="text-[11.5px] text-slate-600 mt-0.5 leading-relaxed">
                                            Resume building, technical mock rounds, communication soft skills, and recruiter updates.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('Placement'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 mt-2 group cursor-pointer"
                            >
                                <span>Enquire About Placement Support</span>
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                    </div>
                </div>

                {/* ═════════════════════════════════════════════════════════════
                    6. CORPORATE & INSTITUTIONAL B2B SECTION (Soft Indigo Pastel)
                ═════════════════════════════════════════════════════════════ */}
                <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-indigo-200/80 shadow-xs relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                        
                        {/* Left Col: Details & Pills */}
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-200/80 shadow-2xs">
                                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                                <span>B2B &amp; CAMPUS COLLABORATION</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0a2540] tracking-tight mb-2">
                                FOR CORPORATE &amp; INSTITUTIONAL ENQUIRIES
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                                Leading companies, colleges, and organizations partner with Aayush Institute for customized workforce upskilling and talent hiring:
                            </p>

                            {/* Pastel Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {[
                                    'Corporate Tech Training',
                                    'Employee Skill Upskilling',
                                    'AI & Generative AI Workshops',
                                    'Advanced Excel & Data Analytics',
                                    'Tailored Batch Schedules',
                                    'Campus Hiring & Internships',
                                    'College Faculty Workshops'
                                ].map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 rounded-xl bg-white text-slate-700 border border-indigo-100 text-xs font-semibold shadow-2xs flex items-center gap-1.5"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                                <a
                                    href="tel:+919311050670"
                                    className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/25 transition-all inline-flex items-center justify-center gap-2 active:scale-98"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>Contact Corporate Desk</span>
                                </a>
                                <a
                                    href="mailto:info@aayushinstitute.com?subject=Corporate%20Training%20Enquiry"
                                    className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-2 active:scale-98"
                                >
                                    <Mail className="w-4 h-4 text-slate-600" />
                                    <span>Email Corporate Team</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Col: Why Partner Card */}
                        <div className="lg:col-span-5">
                            <div className="bg-gradient-to-br from-[#0c2340] to-[#10305a] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-blue-900/40 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block">Corporate Advantage</span>
                                        <h3 className="text-sm sm:text-base font-bold text-white">Why Organizations Choose Us</h3>
                                    </div>
                                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-amber-300 text-[10px] font-bold">
                                        B2B Certified
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                                            <Briefcase className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Customized Curriculum</h4>
                                            <p className="text-[11px] text-blue-100/80 leading-relaxed">
                                                Modules tailored strictly to your company’s active tech stack.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                                            <Clock className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Flexible Delivery Formats</h4>
                                            <p className="text-[11px] text-blue-100/80 leading-relaxed">
                                                On-premise corporate bootcamps, campus labs, or instructor-led live virtual.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                                            <Users className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Trained Talent Pipeline</h4>
                                            <p className="text-[11px] text-blue-100/80 leading-relaxed">
                                                Direct hiring pipeline for tested, job-ready project trainees.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                                    <span className="text-blue-200 text-[11px]">B2B Helpline:</span>
                                    <a href="tel:+919311050670" className="text-amber-300 font-bold hover:underline">
                                        +91-9311050670
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ═════════════════════════════════════════════════════════════
                    7. BOTTOM CALL TO ACTION (Warm Soft Pastel Banner)
                ═════════════════════════════════════════════════════════════ */}
                <div className="bg-gradient-to-br from-[#ebf5ff] via-[#f3f8ff] to-[#e8f2ff] rounded-2xl sm:rounded-3xl border-2 border-blue-200/90 shadow-xs p-6 sm:p-8 lg:p-10 text-center">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-blue-700 text-xs font-bold border border-blue-200/80 shadow-2xs">
                            <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
                            <span>Your Career Journey Starts Here</span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-black text-[#0a2540] tracking-tight">
                            Ready to Take the Next Step in Your Career?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Whether you're starting your first course, upgrading tech skills, or looking for practical project exposure, our team is ready to guide you at every milestone.
                        </p>

                        <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                            <a
                                href="https://wa.me/919311050670"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/25 transition-all active:scale-98"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Chat on WhatsApp</span>
                            </a>
                            <a
                                href="tel:+919311050670"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 text-xs sm:text-sm font-bold shadow-2xs transition-all active:scale-98"
                            >
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span>Call +91-9311050670</span>
                            </a>
                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry(); }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#0e3357] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-98 cursor-pointer"
                            >
                                <span>Fill Enquiry Form</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;
