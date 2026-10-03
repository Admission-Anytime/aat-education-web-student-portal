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
    Calendar,
    ArrowRight,
    ExternalLink,
    HelpCircle,
    Copy,
    Check
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
        setFormSubmitted(true);
        try {
            await fetch('/api/inquiry/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.emailAddress,
                    phone: formData.mobileNumber,
                    program: formData.interestedIn || 'Contact Us Enquiry',
                    course: formData.interestedIn || 'Contact Us Enquiry',
                    message: formData.message || 'Submitted via Contact Us page',
                    consent: true
                })
            });
        } catch (err) {
            console.warn('Contact form submission fallback:', err);
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
        'Other'
    ];

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* 1. Hero Section matching Courses.jsx layout */}
            <div 
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center"
                style={{ 
                    backgroundImage: "url('/course_hero.png')",
                    backgroundColor: '#d6ecff'
                }}
            >
                {/* Mobile overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/98 via-[#d6ecff]/85 to-[#d6ecff]/40 sm:from-[#d6ecff]/90 sm:via-[#d6ecff]/75 sm:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
                    <div className="flex flex-col justify-center py-4 sm:py-5 lg:py-6 max-w-xl sm:max-w-[420px] lg:max-w-2xl min-h-0">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-[#0055cc] text-[11px] font-bold tracking-wide mb-2 border border-blue-200/60 shadow-xs w-fit backdrop-blur-xs">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>CONTACT US</span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{fontSize: 'clamp(20px, 2.5vw, 32px)'}}>
                            Let’s Help You Choose the{' '}
                            <span className="text-[#0055ff]">Right Learning Path</span>
                        </h1>

                        {/* Shortened hero description for visual balance matching Courses */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3 font-medium">
                            Have a question about our courses, university programmes, career guidance, live project training or internship opportunities? Connect with Aayush Institute of Professional Studies and speak with our education and career support team.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5">
                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry(); }}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Send Us an Enquiry</span>
                            </a>
                            <a
                                href="tel:+918800817447"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#00285e] border border-slate-200 text-xs sm:text-sm font-bold shadow-xs transition-all hover:border-slate-300"
                            >
                                <Phone className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>+91-8800817447</span>
                            </a>
                            <a
                                href="https://wa.me/918800817447"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs sm:text-sm font-bold transition-colors"
                            >
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                <span>WhatsApp Us</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-10 lg:py-14 space-y-8 sm:space-y-12">
                {/* 2. Top Quick Contact Information Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    {/* 1. Visit Institute */}
                    <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center group-hover:bg-[#0066ff] group-hover:text-white transition-colors flex-shrink-0 shadow-2xs">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visit Institute</h3>
                                    <p className="text-sm font-bold text-[#0a2540] leading-tight">Ghaziabad Campus</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                Plot No. 14, Block S, DLF Dilshad Ext. 2, Ghaziabad, UP – 201005
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">
                                Near Dilshad Garden Metro
                            </p>
                        </div>
                        <a
                            href="https://maps.google.com/?q=Plot+No.+14,+Block+S,+DLF+Dilshad+Extension+2,+Ghaziabad,+Uttar+Pradesh+201005"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066ff] hover:underline mt-2 pt-2 border-t border-slate-100"
                        >
                            <span>Open in Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>

                    {/* 2. Call Support */}
                    <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center group-hover:bg-[#0066ff] group-hover:text-white transition-colors flex-shrink-0 shadow-2xs">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Call Support</h3>
                                    <p className="text-sm font-bold text-[#0a2540] leading-tight">Speak to Advisors</p>
                                </div>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600 font-medium">
                                <div className="flex items-center justify-between">
                                    <a href="tel:01202611111" className="hover:text-[#0066ff] transition-colors">0120-2611111</a>
                                    <button 
                                        onClick={() => copyToClipboard('01202611111', 'p1')} 
                                        className="text-slate-400 hover:text-[#0066ff] p-0.5 cursor-pointer"
                                        title="Copy number"
                                    >
                                        {copiedItem === 'p1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="tel:+918800817447" className="hover:text-[#0066ff] transition-colors">+91-8800817447</a>
                                    <button 
                                        onClick={() => copyToClipboard('+918800817447', 'p2')} 
                                        className="text-slate-400 hover:text-[#0066ff] p-0.5 cursor-pointer"
                                        title="Copy number"
                                    >
                                        {copiedItem === 'p2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="tel:+919311050670" className="hover:text-[#0066ff] transition-colors">+91-9311050670</a>
                                    <button 
                                        onClick={() => copyToClipboard('+919311050670', 'p3')} 
                                        className="text-slate-400 hover:text-[#0066ff] p-0.5 cursor-pointer"
                                        title="Copy number"
                                    >
                                        {copiedItem === 'p3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                            <span>Direct Admission Lines</span>
                            <span className="inline-flex items-center gap-1 text-[#0066ff] font-bold text-[10px] bg-blue-50 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                            </span>
                        </div>
                    </div>

                    {/* 3. Official Email */}
                    <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center group-hover:bg-[#0066ff] group-hover:text-white transition-colors flex-shrink-0 shadow-2xs">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Us</h3>
                                    <p className="text-sm font-bold text-[#0a2540] leading-tight">Official Communication</p>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                                <div className="flex items-center justify-between">
                                    <a href="mailto:info@aayushinstitute.com" className="hover:text-[#0066ff] font-semibold break-all">
                                        info@aayushinstitute.com
                                    </a>
                                    <button 
                                        onClick={() => copyToClipboard('info@aayushinstitute.com', 'email')} 
                                        className="text-slate-400 hover:text-[#0066ff] p-0.5 cursor-pointer shrink-0 ml-1"
                                        title="Copy email"
                                    >
                                        {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-normal">
                                    Direct responses within 24 business hours.
                                </p>
                            </div>
                        </div>
                        <a
                            href="mailto:info@aayushinstitute.com"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066ff] hover:underline mt-2 pt-2 border-t border-slate-100"
                        >
                            <span>Send an Email</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>

                    {/* 4. Online Portal & Web */}
                    <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center group-hover:bg-[#0066ff] group-hover:text-white transition-colors flex-shrink-0 shadow-2xs">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Online Portal</h3>
                                    <p className="text-sm font-bold text-[#0a2540] leading-tight">Web &amp; Advisory</p>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                                <div className="flex items-center justify-between">
                                    <a href="https://www.aayushinstitute.com" target="_blank" rel="noreferrer" className="text-[#0066ff] hover:underline font-semibold block truncate">
                                        www.aayushinstitute.com
                                    </a>
                                    <button 
                                        onClick={() => copyToClipboard('https://www.aayushinstitute.com', 'web')} 
                                        className="text-slate-400 hover:text-[#0066ff] p-0.5 cursor-pointer shrink-0 ml-1"
                                        title="Copy URL"
                                    >
                                        {copiedItem === 'web' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                <div className="space-y-0.5 text-[11px] text-slate-500 leading-tight">
                                    <p><span className="font-semibold text-slate-700">Advisory:</span> Mon – Sat: 9:00 AM – 7:00 PM</p>
                                    <p><span className="font-semibold text-slate-700">Counseling:</span> Sunday (By Appointment)</p>
                                </div>
                            </div>
                        </div>
                        <a
                            href="https://www.aayushinstitute.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066ff] hover:underline mt-2 pt-2 border-t border-slate-100"
                        >
                            <span>Explore Student Portal</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                {/* 3. Interactive Split Section: CONTACT DETAILS (LEFT) & SEND US AN ENQUIRY (RIGHT) */}
                <div id="enquiry-form" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
                    
                    {/* Left Column: CONTACT INFORMATION & CAMPUS VISIT (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        {/* Official Identity Card */}
                        <div className="bg-gradient-to-br from-[#00285e] to-[#00488f] text-white rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
                            {/* Decorative background circle */}
                            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none"></div>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                                    <Building className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Established in 2002</span>
                                    <h3 className="text-base sm:text-lg font-bold tracking-tight leading-tight">
                                        AAYUSH INSTITUTE OF PROFESSIONAL STUDIES
                                    </h3>
                                </div>
                            </div>

                            <p className="text-blue-100 text-xs leading-relaxed mb-6 font-medium">
                                Education | Skills | Industry Exposure | Career Development
                            </p>

                            <div className="space-y-4 text-xs">
                                {/* Address */}
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#fed000] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-0.5">Address</h4>
                                        <p className="text-white/90 leading-relaxed">
                                            Plot No. 14, Block S, DLF Dilshad Extension 2, Ghaziabad, Uttar Pradesh – 201005, India
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-[#fed000] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-0.5">Phone</h4>
                                        <div className="flex flex-col gap-0.5 text-white/95 font-semibold">
                                            <a href="tel:01202611111" className="hover:underline">0120-2611111</a>
                                            <a href="tel:+918800817447" className="hover:underline">+91-8800817447</a>
                                            <a href="tel:+919311050670" className="hover:underline">+91-9311050670</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Email & Web */}
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-[#fed000] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-0.5">Email &amp; Website</h4>
                                        <a href="mailto:info@aayushinstitute.com" className="block text-white/90 hover:underline">
                                            info@aayushinstitute.com
                                        </a>
                                        <a href="https://www.aayushinstitute.com" target="_blank" rel="noreferrer" className="block text-white/90 hover:underline">
                                            www.aayushinstitute.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Quick CTA Actions */}
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/15">
                                <a
                                    href="https://maps.google.com/?q=Plot+No.+14,+Block+S,+DLF+Dilshad+Extension+2,+Ghaziabad,+Uttar+Pradesh+201005"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold text-center transition-colors flex flex-col items-center gap-1"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-[#fed000]" />
                                    <span>Get Directions</span>
                                </a>
                                <a
                                    href="tel:+918800817447"
                                    className="px-2 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold text-center transition-colors flex flex-col items-center gap-1"
                                >
                                    <Phone className="w-3.5 h-3.5 text-emerald-300" />
                                    <span>Call Us</span>
                                </a>
                                <a
                                    href="https://wa.me/918800817447"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold text-center transition-colors flex flex-col items-center gap-1"
                                >
                                    <MessageSquare className="w-3.5 h-3.5 text-green-300" />
                                    <span>WhatsApp Us</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: SEND US AN ENQUIRY FORM (7 cols) */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex flex-col justify-between h-full">
                        <div className="mb-3 sm:mb-3.5">
                            <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-[#0066ff] text-[10px] font-bold rounded-full uppercase tracking-wider mb-1.5">
                                SEND US AN ENQUIRY
                            </span>
                            <h2 className="text-lg sm:text-xl font-bold text-[#0a2540] tracking-tight">
                                Have a Question? We're Here to Help.
                            </h2>
                            <p className="text-slate-500 text-xs mt-0.5 leading-normal">
                                Please submit your details and our team will get in touch with you regarding your enquiry.
                            </p>
                        </div>

                        {formSubmitted ? (
                            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fadeIn space-y-2.5 my-auto">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-emerald-900">Enquiry Received Successfully!</h3>
                                <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                                    Thank you, <span className="font-bold">{formData.fullName || 'Student'}</span>! Our counselling team has received your enquiry regarding <span className="font-bold">{formData.interestedIn}</span> and will contact you shortly on {formData.mobileNumber || 'your phone'}.
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
                                    className="mt-2 px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                                >
                                    Submit Another Enquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-2.5 flex-1 flex flex-col justify-between">
                                <div className="space-y-2.5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                Full Name <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Enter Your Name"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                                            />
                                        </div>

                                        {/* Mobile Number */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                Mobile Number <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                required
                                                value={formData.mobileNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter Mobile Number"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {/* Email Address */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                Email Address <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="emailAddress"
                                                required
                                                value={formData.emailAddress}
                                                onChange={handleInputChange}
                                                placeholder="Enter Email Address"
                                                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                                            />
                                        </div>

                                        {/* Interested In Dropdown */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                Interested In <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                name="interestedIn"
                                                value={formData.interestedIn}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 outline-none transition-all bg-white"
                                            >
                                                {interestOptions.map(opt => (
                                                    <option key={opt} value={opt}>
                                                        {opt === 'Course' ? 'Course (IT / Professional / Skill)' : opt}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Your Message */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                            Your Message <span className="text-slate-400 font-normal">(Optional)</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={2}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Tell us how we can help"
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#0066ff] focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all resize-none h-16 sm:h-20"
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs shadow-sm transition-all hover:shadow flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-1"
                                >
                                    <span>Submit Enquiry</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* 3.1 Corporate Office Location Map Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                    {/* Header: Badge on left, Get Directions on right */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] border border-blue-200/80 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                            <Compass className="w-3.5 h-3.5 text-[#0066ff]" />
                            <span>Corporate Office Location</span>
                        </div>
                        <a
                            href="https://maps.google.com/?q=Devika+Tower,+Chander+Nagar,+Surya+Nagar,+Ghaziabad,+Uttar+Pradesh+201011"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-bold shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
                        >
                            <Send className="w-3 h-3 rotate-45" />
                            <span>Get Directions on Google Maps</span>
                        </a>
                    </div>

                    {/* Middle Info Row: MessBee Corporate Office on left, Phone & Email on right */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 my-3 sm:my-3.5">
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#0a2540] mb-0.5">
                                MessBee
                            </h3>
                            <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-[#0066ff] shrink-0 mt-0.5" />
                                <p>
                                    <span className="font-bold text-slate-700">Corporate Office:</span>{' '}
                                    510A, Devika Tower, Chander Nagar, Surya Nagar, Ghaziabad, Uttar Pradesh 201011
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                            {/* Phone */}
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066ff] flex items-center justify-center shrink-0 shadow-2xs">
                                    <Phone className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">Phone</span>
                                    <div className="text-xs font-bold text-slate-800">
                                        <a href="tel:01202611111" className="hover:text-[#0066ff] transition-colors">0120-2611111</a>
                                        <span className="mx-1 text-slate-300">/</span>
                                        <a href="tel:+919217742081" className="hover:text-[#0066ff] transition-colors">+91-9217742081</a>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066ff] flex items-center justify-center shrink-0 shadow-2xs">
                                    <Mail className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">Email</span>
                                    <a href="mailto:support@messbee.com" className="text-xs font-bold text-slate-800 hover:text-[#0066ff] transition-colors">
                                        support@messbee.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Embed */}
                    <div className="rounded-xl overflow-hidden border border-blue-100 shadow-xs">
                        <iframe
                            title="MessBee Corporate Office Google Map"
                            src="https://maps.google.com/maps?q=Devika+Tower,+510+A,+HIG+Flats,+Chander+Nagar,+Surya+Nagar,+Ghaziabad,+Uttar+Pradesh+201011&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-[220px] sm:h-[260px] border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* 4. GET IN TOUCH — Thematic Guidance Cards */}
                <div className="space-y-6 pt-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-xs font-bold text-[#0066ff] uppercase tracking-widest block mb-1">
                            GET IN TOUCH
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0a2540] tracking-tight">
                            Comprehensive Learning &amp; Career Consultation
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-2">
                            Whether you are a student, graduate, working professional, parent or organization, we are here to help you understand your available learning and career options.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* 4.1 EDUCATION & COURSE ENQUIRIES */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Course Advisory</span>
                                        <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                            EDUCATION &amp; COURSE ENQUIRIES
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-4">
                                    Looking for the right IT, professional or skill-based course? Our team can help you understand:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {[
                                        'Course Structure',
                                        'Eligibility',
                                        'Duration',
                                        'Training Mode',
                                        'Course Fees',
                                        'Practical Training',
                                        'Career Pathways'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100/80">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff] flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-semibold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('Course'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066ff] hover:text-[#0052cc] mt-2 group cursor-pointer"
                            >
                                <span>Enquire About Courses</span>
                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* 4.2 UNIVERSITY & DISTANCE EDUCATION */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Degree &amp; Higher Education</span>
                                        <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                            UNIVERSITY &amp; DISTANCE EDUCATION
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-4">
                                    Need guidance about higher education programmes? Get assistance regarding:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {[
                                        'Undergraduate Programmes',
                                        'Postgraduate Programmes',
                                        'Diploma Programmes',
                                        'Certificate Programmes',
                                        'Online Programmes',
                                        'Distance Learning',
                                        'Working Professional Programmes',
                                        'Vocational & Professional Programmes'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100/80">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-semibold">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-[11px] text-slate-500 italic bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/50">
                                    Programme availability, eligibility and admission requirements may vary according to the respective university.
                                </p>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('University Programme'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 mt-3 group cursor-pointer"
                            >
                                <span>Get University Guidance</span>
                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* 4.3 CAREER GUIDANCE */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                            <Compass className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Advisory &amp; Roadmap</span>
                                            <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                                CAREER GUIDANCE
                                            </h3>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold">
                                        No Cost
                                    </span>
                                </div>

                                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 mb-3">
                                    <p className="text-emerald-900 text-xs font-bold">
                                        Get Career Guidance at No Additional Cost
                                    </p>
                                    <p className="text-slate-600 text-xs mt-0.5">
                                        Not sure which course or career path is right for you? Connect with our career guidance team and, where available, industry professionals to discuss your:
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {[
                                        'Career Goals',
                                        'Course Selection',
                                        'Skill Requirements',
                                        'Career Opportunities',
                                        'Higher Education Options',
                                        'Internship Opportunities',
                                        'Employment Preparation'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100/80">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                            <span className="text-slate-700 text-xs font-semibold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('Career Guidance'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 mt-2 group cursor-pointer"
                            >
                                <span>Book Free Career Session</span>
                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* 4.4 STUDENT & CAREER SUPPORT */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">End-To-End Support</span>
                                        <h3 className="text-base sm:text-lg font-bold text-[#0a2540] leading-snug">
                                            STUDENT &amp; CAREER SUPPORT
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-3 font-medium">
                                    Our support extends beyond course enrolment.
                                </p>

                                <div className="space-y-2.5 mb-4">
                                    {/* Live Project */}
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-[#0066ff]"></span>
                                            LIVE PROJECT TRAINING
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                            Gain practical exposure through structured project-based learning in relevant technical and IT domains.
                                        </p>
                                    </div>

                                    {/* Internship */}
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            INTERNSHIP OPPORTUNITIES
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                            Explore available corporate internship opportunities, including paid internships where offered by participating organizations and subject to their selection process.
                                        </p>
                                    </div>

                                    {/* Placement */}
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                            PLACEMENT SUPPORT
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                            Get support with resume preparation, interview preparation, career guidance and relevant recruitment opportunities.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#enquiry-form"
                                onClick={(e) => { e.preventDefault(); scrollToEnquiry('Placement'); }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 mt-2 group cursor-pointer"
                            >
                                <span>Enquire About Placement Support</span>
                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 5. FOR CORPORATE & INSTITUTIONAL ENQUIRIES */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-100/80 shadow-[0_4px_24px_rgba(0,102,255,0.06)] relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* Left Column: Information, Pills & CTA Buttons (7 Cols) */}
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] text-[11px] font-bold uppercase tracking-wider mb-3">
                                <Building2 className="w-3.5 h-3.5" />
                                <span>B2B &amp; CAMPUS COLLABORATION</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#0a2540] tracking-tight mb-2">
                                FOR CORPORATE &amp; INSTITUTIONAL ENQUIRIES
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                                Organizations, companies and institutions can connect with us for:
                            </p>

                            {/* Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {[
                                    'Corporate Training',
                                    'Employee Skill Development',
                                    'AI & Technology Training',
                                    'Advanced Excel & Data Analytics',
                                    'Customized Training Programmes',
                                    'Internship & Industry Engagement',
                                    'Institutional Training'
                                ].map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0066ff] border border-slate-200/80 text-xs font-semibold transition-colors flex items-center gap-1.5"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff]" />
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                                <a
                                    href="tel:+918800817447"
                                    className="px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-[13px] shadow-sm transition-all hover:shadow-md inline-flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>Contact Corporate Training Team</span>
                                </a>
                                <a
                                    href="mailto:info@aayushinstitute.com?subject=Corporate%20Training%20Enquiry"
                                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-[13px] transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-4 h-4 text-slate-600" />
                                    <span>Email Corporate Desk</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Corporate Partnership Highlights Card (5 Cols) */}
                        <div className="lg:col-span-5">
                            <div className="bg-gradient-to-br from-[#0a2540] via-[#00285e] to-[#00488f] text-white rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden border border-blue-900/40">
                                {/* Subtle decorative background glow */}
                                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#0066ff]/20 rounded-full blur-2xl pointer-events-none" />
                                <div className="absolute top-2 right-2 p-3 opacity-10 pointer-events-none">
                                    <Building2 className="w-20 h-20 text-white" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block leading-tight">Corporate Edge</span>
                                            <h3 className="text-sm sm:text-base font-bold text-white">Why Partner With Us</h3>
                                        </div>
                                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[#fed000] text-[10px] font-bold uppercase tracking-wider">
                                            B2B Hub
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                                                <Briefcase className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white">Tailored Curriculum</h4>
                                                <p className="text-[11px] text-blue-100/80 leading-relaxed">
                                                    Custom modules designed around your company’s tech stack &amp; business goals.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                                                <Clock className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white">Flexible Delivery Modes</h4>
                                                <p className="text-[11px] text-blue-100/80 leading-relaxed">
                                                    On-site corporate bootcamps, campus workshops, or interactive virtual sessions.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                                                <Users className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white">Pre-Assessed Talent Pipeline</h4>
                                                <p className="text-[11px] text-blue-100/80 leading-relaxed">
                                                    Direct hiring access to certified, project-evaluated job-ready graduates.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                                                <Award className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white">Verifiable Certifications</h4>
                                                <p className="text-[11px] text-blue-100/80 leading-relaxed">
                                                    Skill benchmarking with detailed participant performance reports.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                                        <div className="text-[11px] text-blue-200">
                                            <span className="font-medium text-slate-300">B2B Coordinator:</span>{' '}
                                            <a href="tel:+918800817447" className="text-[#fed000] font-bold hover:underline">
                                                +91-8800817447
                                            </a>
                                        </div>
                                        <span className="text-[10px] text-blue-300 font-medium">Mon–Sat Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. START YOUR JOURNEY WITH US — Bottom Banner (Matching Courses CTA Style) */}
                <div className="mt-10 sm:mt-12 bg-gradient-to-r from-[#0a2540] via-[#003882] to-[#0066ff] rounded-2xl py-5 sm:py-6 px-4 sm:px-6 text-center text-white shadow-xl">
                    <h3 className="text-base sm:text-lg font-bold mb-1.5 text-[#fed000]">
                        Ready to Take the Next Step in Your Career?
                    </h3>

                    <p className="text-white/85 mb-3.5 max-w-2xl mx-auto text-xs sm:text-[13px] leading-relaxed">
                        Whether you are planning your first course, upgrading your skills, pursuing higher education,<br className="hidden md:inline" /> looking for practical industry exposure or preparing for your career, our team is available to guide you through the next step.
                    </p>

                    <div className="text-[11px] sm:text-xs font-bold text-blue-200 mb-3">
                        Connect with Aayush Institute of Professional Studies
                    </div>

                    {/* Contacts Strip */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5">
                        <a
                            href="mailto:info@aayushinstitute.com"
                            className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-xs font-bold text-white transition-colors text-center"
                        >
                            info@aayushinstitute.com
                        </a>
                        <a
                            href="https://www.aayushinstitute.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-full bg-[#fed000] hover:bg-[#ffe14d] text-xs font-bold text-[#00285e] transition-all shadow-md hover:scale-105 text-center"
                        >
                            www.aayushinstitute.com
                        </a>
                        <a
                            href="tel:+918800817447"
                            className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-full border border-white/50 text-white text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>+91-8800817447</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;
