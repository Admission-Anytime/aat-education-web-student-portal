import React, { useState, useEffect, useCallback } from 'react';

// Utility functions for Firestore (stubbed for a static file, as requested by the constraints)
// In a real application, these would handle database interactions.
//const __app_id = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

/**
 * Icons (Using inline SVGs for compatibility in single-file React component environment)
 */

const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const AwardIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 19 17 23 15.79 13.88"></polyline></svg>
);

const ZapIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const CalendarIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const VideoIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
);

const PhoneIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3 15.15a2 2 0 0 1 2-2.18 19.79 19.79 0 0 1 3-1.66A12 12 0 0 1 12 8.78"></path><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8"></path></svg>
);


/**
 * Data Definitions
 */
const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Academic Programs', href: '#programs' },
    { name: 'News & Updates', href: '#news' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Apply Now', href: '#inquiry' },
];

const stats = [
    { value: '10000+', label: 'Students Enrolled', icon: UserIcon },
    { value: '10+', label: 'Qualified Teachers', icon: AwardIcon },
    { value: '95%', label: 'Success Rate', icon: ZapIcon },
    { value: '22+', label: 'Years of Excellence', icon: CalendarIcon },
];

const newsItems = [
    { date: '26/09/2025', title: "AIIMS (All India Institute Of Medical Science) India's Best Medical Colleges" },
    { date: '15/01/2024', title: 'JEE Main 2024 Results Declared - Record Breaking Success Rate' },
    { date: '10/01/2024', title: 'Important Changes in JEE Advanced 2024 Patter' },
    { date: '10/01/2024', title: 'Annual Sports Day and Cultural Fest 2024' },
];

const testimonials = [
    { quote: "The customer service is unparalleled. They are always there to help with any questions or issues.", name: "Sarah Kim", title: "Customer Support Lead" },
    { quote: "A truly game-changing solution for our business. The support team was incredibly responsive and helpful.", name: "John Smith", title: "Founder & CEO" },
    { quote: "The value I received was outstanding. It helped me grow my business more than I thought possible.", name: "Michael Brown", title: "Small Business Owner" },
];

const programOptions = [
    'Web Development', 'Data Science', 'UX/UI Design', 'Digital Marketing', 'MBA/BBA', 'Engineering',
];

const stateOptions = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar',
    'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'NCT of Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Lakshadweep', 'Puducherry'
];

const FooterLinkGroup = ({ title, links }) => (
    <div>
        <h5 className="text-lg font-semibold mb-4 text-orange-400">{title}</h5>
        <ul className="space-y-3">
            {links.map((link, index) => (
                <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-orange-300 transition duration-150 text-sm">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

/**
 * Components
 */

const Navbar = ({ openModal }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed w-full z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a href="#" className="text-2xl font-extrabold text-indigo-700 tracking-tight">
                        Aayush <span className="text-orange-500">Institute</span>
                    </a>
                    <div className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href === '#inquiry' ? '#' : item.href}
                                onClick={item.href === '#inquiry' ? openModal : undefined}
                                className={`text-gray-600 hover:text-indigo-700 transition duration-150 font-medium ${item.href === '#inquiry' ? 'px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md' : ''}`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-indigo-700 focus:outline-none p-2 rounded-full"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href === '#inquiry' ? '#' : item.href}
                            onClick={() => {
                                setIsOpen(false);
                                if (item.href === '#inquiry') openModal();
                            }}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

const HeroSection = ({ openModal }) => (
    <section className="pt-32 pb-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
                <span className="inline-block text-sm font-semibold text-orange-500 bg-orange-100 px-3 py-1 rounded-full mb-4 shadow-sm">
                    Excellence in Education Since 2002-2025
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Nurturing Tomorrow's <span className="text-indigo-600">Leader</span> in India
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Providing quality education with modern facilities and experienced faculty.
                </p>

                <div className="space-y-4">
                    <div className="flex items-start">
                        <ZapIcon className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1 mr-3" />
                        <p className="font-semibold text-gray-700">Excellence in Professional Education updated</p>
                    </div>
                    <p className="text-gray-500 ml-9">Empowering students with industry-relevant skills and knowledge for successful careers</p>

                    <div className="flex items-start pt-4">
                        <AwardIcon className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1 mr-3" />
                        <p className="font-semibold text-gray-700">Building Bright Futures Together</p>
                    </div>
                    <p className="text-gray-500 ml-9">Creating an environment where innovation meets tradition in professional learning</p>
                </div>

                <button
                    onClick={openModal}
                    className="mt-10 px-8 py-3 text-lg font-bold text-white bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105"
                >
                    Inquire Now
                </button>
            </div>

            {/* Right Image/Placeholder */}
            <div className="hidden md:block">
                <div className="bg-indigo-100 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200 rounded-full transform -translate-x-1/2 translate-y-1/2 opacity-50"></div>
                    <div className="h-96 w-full flex items-center justify-center border-4 border-indigo-700 border-dashed rounded-xl">
                        <p className="text-indigo-700 text-xl font-medium">Campus/Student Life Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const StatsSection = () => (
    <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">About Our Institute in India</h2>
            <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12">
                For over 40 years (adjusting from 22+ to the stated 40+ years in the source text), Aayush Institute of Professional Studies has been committed to providing exceptional education that prepares students for success in an ever-changing world.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="text-center p-6 bg-indigo-50 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                            <Icon className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                            <p className="text-4xl font-extrabold text-indigo-700 mb-1">{stat.value}</p>
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const ProgramsSection = () => (
    <section id="programs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Academic Programs</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive educational programs designed to foster intellectual growth and personal development at every stage.
                </p>
            </div>
            <div className="flex justify-center mt-10">
                <a href="#inquiry" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300">
                    View All Programs
                </a>
            </div>
        </div>
    </section>
);

const NewsSection = () => (
    <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">News and Updates</h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                We'd love to hear from you. Contact us for admissions or any queries.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {newsItems.map((item, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-indigo-600">
                        <p className="text-sm font-semibold text-orange-500 mb-3 flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {item.date}
                        </p>
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{item.title}</h3>
                        <a href="#" className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800 text-sm">
                            Read More &rarr;
                        </a>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <a href="#" className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300">
                    Read All News &rarr;
                </a>
            </div>
        </div>
    </section>
);

const CampusVideoSection = () => (
    <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Campus Tour Video</h2>
            <p className="text-xl text-gray-600 mb-8">Discover our vibrant facilities.</p>
            <div className="relative pt-[56.25%] rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
                {/* 16:9 Aspect Ratio Container for Video Embed */}
                <div className="absolute top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center">
                    <VideoIcon className="w-16 h-16 text-white opacity-70" />
                    <p className="absolute text-white text-lg mt-16">Video Placeholder</p>
                </div>
            </div>
        </div>
    </section>
);

const TestimonialCard = ({ quote, name, title }) => (
    <div className="p-8 bg-white rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
        <p className="text-gray-600 italic mb-6 text-lg line-clamp-5">"{quote}"</p>
        <div>
            <p className="text-lg font-bold text-indigo-700">{name}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);

const TestimonialSection = () => (
    <section id="testimonials" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Testimonials</h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Hear directly from the people who have experienced our exceptional service.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, index) => (
                    <TestimonialCard key={index} {...t} />
                ))}
            </div>
        </div>
    </section>
);

const NewsletterSection = () => (
    <section className="py-16 bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
                Stay updated with the latest news, admission alerts, and career guidance directly to your inbox and WhatsApp.
            </p>
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                <input
                    type="email"
                    placeholder="Enter your Email"
                    className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
                />
                <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition duration-300 flex-shrink-0">
                    Subscribe
                </button>
            </div>
        </div>
    </section>
);

const MainFooter = () => {
    const careerLinks = [
        'Career After 12th PCM', 'Career After 12th PCB', 'Career After 12th Management',
        'Career After 12th Arts and Humanities', 'Career After 12th Commerce', 'Top Paramedical Courses After 12th'
    ];
    const admissionLinks = [
        'NEET-UG 2025', 'JEE Main 2025', 'JEE Advance 2025', 'UG CLAT 2025', 'CUET 2025', 'GGS IPU CET 2025'
    ];
    const mbbsSupport = [
        'Delhi MBBS', 'Uttar Pradesh MBBS', 'Maharashtra MBBS', 'Karnataka MBBS', 'Rajasthan MBBS', 'Tamil Nadu MBBS'
    ];
    const instituteLinks = ['About us', 'Contact us', 'Terms and Conditions', 'Blog', 'Admin Panel', 'FAQs'];

    return (
        <footer className="bg-indigo-900 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-10 border-b border-indigo-700 pb-10">
                    <div className="col-span-2">
                        <h4 className="text-3xl font-extrabold text-white mb-4">
                            Aayush <span className="text-orange-400">Institute</span>
                        </h4>
                        <p className="text-indigo-200">
                            Excellence in Professional Education since 2002.
                        </p>
                        <div className="mt-6 space-y-2">
                            {instituteLinks.map((link, index) => (
                                <a key={index} href="#" className="block text-indigo-300 hover:text-orange-400 transition duration-150">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                    <FooterLinkGroup title="Best Career Options" links={careerLinks} />
                    <FooterLinkGroup title="Admission Entrance Exam" links={admissionLinks} />
                    <FooterLinkGroup title="MBBS 2025 Counseling" links={mbbsSupport} />
                    <FooterLinkGroup title="MBBS 2025 Counseling" links={mbbsSupport} />
                </div>

                <div className="mt-8 text-center pt-8">
                    <p className="text-indigo-400 text-sm">
                        &copy; 2025 School Website. All rights reserved. | App ID: {__app_id}
                    </p>
                </div>
            </div>
        </footer>
    );
};

const InquiryModal = ({ isVisible, onClose }) => {
    const [formData, setFormData] = useState({
        name: '', phone: '', program: '', state: '', city: '', agree: false
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agree) {
            setMessage({ type: 'error', text: 'You must agree to the terms and conditions.' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: 'info', text: 'Submitting inquiry...' });

        try {
            // Mock API call for inquiry submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, integrate with Firestore:
            /*
            const db = getFirestore(app);
            await addDoc(collection(db, `artifacts/${__app_id}/public/data/inquiries`), {
                ...formData,
                timestamp: new Date().toISOString()
            });
            */

            setMessage({ type: 'success', text: 'Inquiry submitted successfully! We will contact you within 24 hours.' });
            setFormData({ name: '', phone: '', program: '', state: '', city: '', agree: false }); // Reset form
            setTimeout(onClose, 3000); // Close modal after 3 seconds
        } catch (error) {
            console.error("Firestore submission error:", error);
            setMessage({ type: 'error', text: 'Submission failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div id="inquiry" className="fixed inset-0 bg-gray-900 bg-opacity-75 z-[100] flex items-center justify-center p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    disabled={isLoading}
                >
                    <XIcon className="w-6 h-6" />
                </button>

                <div className="p-8 sm:p-10">
                    <h3 className="text-3xl font-extrabold text-indigo-700 mb-2">Inquire Now</h3>
                    <p className="text-gray-500 mb-8">
                        Fill out the form below to receive a consultation within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="relative flex items-center">
                                <span className="absolute left-0 pl-3 text-gray-500 text-sm border-r pr-2">+91</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                    pattern="[0-9]{10}"
                                    title="Phone number must be 10 digits"
                                    className="w-full pl-16 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                        >
                            <option value="" disabled>Select Program of Interest</option>
                            {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                            >
                                <option value="" disabled>Select State</option>
                                {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Select City (Enter City Name)"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex items-start">
                            <input
                                id="agree"
                                name="agree"
                                type="checkbox"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="mt-1 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="agree" className="ml-3 text-sm text-gray-600">
                                I agree to the terms and conditions by <a href="#" className="text-indigo-600 hover:underline">Admission Anytime.com</a>
                            </label>
                        </div>

                        {message.text && (
                            <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : 'Get Free Consultation'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const FloatingInquiryButton = ({ openModal }) => (
    <button
        onClick={openModal}
        className="fixed bottom-6 right-6 z-40 p-4 bg-orange-500 text-white font-bold rounded-full shadow-2xl hover:bg-orange-600 transition duration-300 transform hover:scale-110 flex items-center space-x-2 text-lg animate-pulse"
    >
        <PhoneIcon className="w-6 h-6" />
        <span>Inquire Now</span>
    </button>
);


const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = useCallback(() => setIsModalVisible(true), []);
    const closeModal = useCallback(() => setIsModalVisible(false), []);

    // Effect to prevent body scrolling when modal is open
    useEffect(() => {
        if (isModalVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalVisible]);

    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            <Navbar openModal={openModal} />
            <main>
                <HeroSection openModal={openModal} />
                <StatsSection />
                <ProgramsSection />
                <NewsSection />
                <CampusVideoSection />
                <TestimonialSection />
                <NewsletterSection />
            </main>
            <MainFooter />
            <FloatingInquiryButton openModal={openModal} />
            <InquiryModal isVisible={isModalVisible} onClose={closeModal} />
        </div>
    );
};

export default App;
