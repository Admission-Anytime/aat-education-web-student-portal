import React, { useState, useEffect } from 'react'
import MainPage from './MainPage'
import AboutUs from './Pages/AboutUs'
import CooperateTrainingProgram from './Navbar/CooperateTrainingProgram'
import News from './Navbar/News'
import Courses from './Navbar/Courses'
import logo_image from '../assets/img/Logo.jpg'
import { Facebook, Instagram, Linkedin, MapPin, Youtube } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './Navbar/Header'


const SchoolWebsite = () => {
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const res = await fetch('/api/footer');
                if (res.ok) {
                    const data = await res.json();
                    if (data && (data.mainLinks?.length > 0 || data.sections?.length > 0 || data.copyrightText)) {
                        setFooterData(data);
                    }
                }
            } catch (err) {}
        };
        fetchFooter();
        const poll = setInterval(fetchFooter, 6000);
        return () => clearInterval(poll);
    }, []);

    const defaultQuickLinks = [
        { text: 'About us', href: '/AboutUs' },
        { text: 'Contact us', href: '/ContactUs' },
        { text: 'Terms and Conditions', href: '/terms' },
        { text: 'Blog', href: '/blogs' },
        { text: 'Admission', href: '/admission' },
        { text: 'Student Portal', href: '/profile' },
        { text: 'Result', href: '/result' },
        { text: 'FAQs', href: '/FAQ' },
        { text: 'Our Faculty & Staff', href: '/staff' },
        { text: 'Staff Portal', href: '/login?type=staff' }
    ];

    const quickLinks = (footerData?.mainLinks && footerData.mainLinks.length > 0)
        ? footerData.mainLinks
        : defaultQuickLinks;

    return (

        <div className='min-h-screen bg-white font-sans overflow-x-hidden w-full max-w-full'>

            {/* Header */}
            <Header />

            <Outlet />

            {/* Footer */}
            <footer className="bg-gradient-to-b from-[#001c44] via-[#001432] to-[#000d22] text-white relative border-t border-blue-400/20 shadow-[0_-8px_30px_rgba(0,18,50,0.25)]">
                
                {/* 1. Top Quick Links Navigation Bar */}
                <div className="border-b border-white/10 bg-[#00102b]/60 backdrop-blur-sm py-2">
                    <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7 gap-y-1.5 text-xs sm:text-[13px] font-medium text-slate-300">
                        {quickLinks.map((item, idx) => (
                            <NavLink
                                key={idx}
                                to={item.href || item.to || '#'}
                                className={({ isActive }) => `transition-colors hover:text-white ${isActive ? 'text-[#fed000] font-semibold' : ''}`}
                            >
                                {item.text || item.title || item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* 2. Main Footer Body: Compact & Proportionate */}
                <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-7 sm:py-8">
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-y-7 gap-x-5 lg:gap-x-8 items-start">

                        {/* Left Brand Column */}
                        <div className="col-span-2 md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-4">
                            <div className="relative group">
                                <img
                                    src="/ayush_circle_logo.png"
                                    alt="Aayush Institute"
                                    className="w-20 h-20 sm:w-22 sm:h-22 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:scale-105"
                                />
                            </div>

                            <h3 className="text-white font-bold text-[16px] sm:text-[17px] leading-snug mt-2.5 max-w-xs">
                                Aayush Institute Of Professional Studies
                            </h3>

                            {/* Crisp Tagline */}
                            <div className="text-xs sm:text-[12.5px] font-semibold tracking-wide mt-1.5 flex items-center justify-center md:justify-start gap-1.5 flex-wrap">
                                <span className="text-[#fed000]">Learn</span>
                                <span className="text-slate-400">•</span>
                                <span className="text-emerald-400">Grow</span>
                                <span className="text-slate-400">•</span>
                                <span className="text-sky-300">Build Your Future</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3 pt-2.5 border-t border-white/10 w-full justify-center md:justify-start">
                                <MapPin className="w-3.5 h-3.5 text-[#fed000] flex-shrink-0" />
                                <span className="truncate">Uttam Nagar East, New Delhi - 110059</span>
                            </div>
                        </div>

                        {/* Column: Popular Course */}
                        <div className="col-span-1 md:col-span-2 flex flex-col items-start text-left">
                            <h4 className="text-white font-semibold text-xs sm:text-[13.5px] mb-2 sm:mb-2.5 tracking-tight border-b-2 border-[#fed000]/60 pb-1 inline-block">
                                Popular Course
                            </h4>
                            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-[12px] text-slate-300">
                                {[
                                    { title: 'IT & Stack Development', to: '/it-stack-development' },
                                    { title: 'Web Development', to: '/web-development' },
                                    { title: 'App Development', to: '/app-development' },
                                    { title: 'Python Programming', to: '/python-programming' },
                                    { title: 'UI/UX Design', to: '/ui-ux-design' },
                                    { title: 'Digital Marketing', to: '/digital-marketing' },
                                    { title: 'Tally & Accounting', to: '/tally-accounting' },
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <NavLink
                                            to={item.to}
                                            className="hover:text-[#fed000] transition-colors duration-150 block truncate"
                                        >
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column: Admission */}
                        <div className="col-span-1 md:col-span-2 flex flex-col items-start text-left">
                            <h4 className="text-white font-semibold text-xs sm:text-[13.5px] mb-2 sm:mb-2.5 tracking-tight border-b-2 border-emerald-400/60 pb-1 inline-block">
                                Admission
                            </h4>
                            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-[12px] text-slate-300">
                                {[
                                    { title: 'After 10th', to: '/admission' },
                                    { title: 'After 12th', to: '/admission' },
                                    { title: 'Graduation', to: '/admission' },
                                    { title: 'LEET Programs', to: '/UniversityCourses' },
                                    { title: 'Dual Degree Programs', to: '/UniversityCourses' },
                                    { title: 'Scholarship', to: '/admission' },
                                    { title: 'Education Loan', to: '/ContactUs' }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <NavLink to={item.to} className="hover:text-emerald-300 transition-colors duration-150 block truncate">
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column: Career After */}
                        <div className="col-span-1 md:col-span-2 flex flex-col items-start text-left">
                            <h4 className="text-white font-semibold text-xs sm:text-[13.5px] mb-2 sm:mb-2.5 tracking-tight border-b-2 border-sky-400/60 pb-1 inline-block">
                                Career After
                            </h4>
                            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-[12px] text-slate-300">
                                {[
                                    { title: '12th PCM', to: '/Placement' },
                                    { title: '12th PCB', to: '/Placement' },
                                    { title: '12th Management', to: '/Placement' },
                                    { title: '12th Arts and Humanities', to: '/Placement' },
                                    { title: '12th Commerce', to: '/Placement' },
                                    { title: 'Top Paramedical Courses', to: '/Placement' },
                                    { title: 'Vocational Course', to: '/Placement' }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <NavLink to={item.to} className="hover:text-sky-300 transition-colors duration-150 block truncate">
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column: Best Career Options */}
                        <div className="col-span-1 md:col-span-2 flex flex-col items-start text-left">
                            <h4 className="text-white font-semibold text-xs sm:text-[13.5px] mb-2 sm:mb-2.5 tracking-tight border-b-2 border-purple-400/60 pb-1 inline-block">
                                Best Career Options
                            </h4>
                            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-[12px] text-slate-300">
                                {[
                                    { title: 'NEET-UG 2026', to: '/UniversityCourses' },
                                    { title: 'JEE Main 2026', to: '/UniversityCourses' },
                                    { title: 'JEE Advance 2026', to: '/UniversityCourses' },
                                    { title: 'UG CLAT 2026', to: '/UniversityCourses' },
                                    { title: 'CUET 2026', to: '/UniversityCourses' },
                                    { title: 'CAT 2026', to: '/UniversityCourses' },
                                    { title: 'GGS IPU CET 2026', to: '/UniversityCourses' }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <NavLink to={item.to} className="hover:text-purple-300 transition-colors duration-150 block truncate">
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* 3. Bottom Bar: Copyright & Sleek Social Follow */}
                <div className="border-t border-white/10 bg-[#000a1c] py-3">
                    <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                        
                        <div>
                            <span>&copy; {new Date().getFullYear()} {footerData?.copyrightText || 'Aayush Institute of Professional Studies. All Rights Reserved.'}</span>
                        </div>

                        {/* Right: Follow Us + Sleek Social Icons */}
                        <div className="flex items-center gap-3">
                            <span className="text-white text-xs font-semibold">
                                Follow Us
                            </span>
                            
                            <div className="flex items-center gap-1.5">
                                {/* Facebook */}
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Facebook"
                                    className="w-7 h-7 rounded-md bg-[#1877f2] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                                >
                                    <Facebook className="w-3.5 h-3.5 fill-current" />
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    className="w-7 h-7 rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                                >
                                    <Instagram className="w-3.5 h-3.5 stroke-[2]" />
                                </a>

                                {/* YouTube */}
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="YouTube"
                                    className="w-7 h-7 rounded-md bg-[#ff0000] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                                >
                                    <Youtube className="w-3.5 h-3.5 stroke-[2]" />
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    className="w-7 h-7 rounded-md bg-[#0a66c2] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                                >
                                    <Linkedin className="w-3.5 h-3.5 stroke-[2]" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </footer>


        </div>
    )
}

export default SchoolWebsite