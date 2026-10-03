import React, { useState } from 'react';

import {
    Monitor,
    Palette,
    Code,
    Terminal,
    Cloud,
    Shield,
    BarChart3,
    MessageCircle,
    Users,
    ChevronRight,
    Mail,
    Phone,
    MapPin,
    Clock,
    Award,
    BookOpen,
    Star,
    X
} from 'lucide-react';

const trainingPrograms = [
    {
        id: 1,
        title: "Office Productivity & Business Automation",
        description: "Boost your team's efficiency through essential digital office tools.",
        courses: [
            "MS Office Mastery (Basic to Advanced)",
            "Advanced Excel & Dashboard Reporting",
            "Digital Office Administration Tools (Google Workspace / MS365)",
            "Tally Prime with GST for Business Accounting",
            "CRM Training (Zoho, Salesforce Basics)"
        ],
        icon: <Monitor className="w-8 h-8" />,
        color: "text-blue-600",
        bgGradient: "from-blue-50 to-blue-100"
    },
    {
        id: 2,
        title: "Graphic Design, UI/UX & Creative Tools",
        description: "Design-focused training for branding, web, and user experience.",
        courses: [
            "Professional Graphic Designing (Photoshop, Illustrator, CorelDRAW)",
            "UI/UX Design & Prototyping (Figma, Adobe XD)",
            "Video Editing & Motion Graphics (Premiere Pro, After Effects)",
            "AutoCAD & Industrial Design Fundamentals"
        ],
        icon: <Palette className="w-8 h-8" />,
        color: "text-purple-600",
        bgGradient: "from-purple-50 to-purple-100"
    },
    {
        id: 3,
        title: "Web & App Development Programs",
        description: "Develop complete websites and mobile applications from scratch.",
        courses: [
            "Full Stack Web Development (MERN / Django Stack)",
            "Front-End Development (HTML, CSS, JavaScript, React)",
            "WordPress Development for Business Sites",
            "Mobile App UI Design with Figma + Flutter",
            "Android App Development (Using Java)"
        ],
        icon: <Code className="w-8 h-8" />,
        color: "text-green-600",
        bgGradient: "from-green-50 to-green-100"
    },
    {
        id: 4,
        title: "Programming & Computer Science Core",
        description: "Foundation courses for developers, engineers, and tech enthusiasts.",
        courses: [
            "C / C++ Programming Fundamentals",
            "Python Programming for Beginners",
            "Data Structures & Algorithms (C++ / Python Based)",
            "JavaScript & Front-End Libraries (React.js Basics)"
        ],
        icon: <Terminal className="w-8 h-8" />,
        color: "text-orange-600",
        bgGradient: "from-orange-50 to-orange-100"
    },
    {
        id: 5,
        title: "Cloud Computing & DevOps",
        description: "Modern deployment, CI/CD pipelines, and infrastructure essentials.",
        courses: [
            "Cloud Computing Fundamentals (AWS / Azure / GCP)",
            "DevOps Basics (Git, CI/CD, Jenkins, Docker – Intro)",
            "Web Server Deployment (Heroku, Netlify, GitHub Pages)"
        ],
        icon: <Cloud className="w-8 h-8" />,
        color: "text-cyan-600",
        bgGradient: "from-cyan-50 to-cyan-100"
    },
    {
        id: 6,
        title: "Cybersecurity & Ethical Hacking",
        description: "Protect applications, data, and networks from evolving threats.",
        courses: [
            "Cybersecurity Awareness for Employees",
            "Ethical Hacking & Cybersecurity Essentials",
            "Web Application Security (OWASP Top 10, Pen Testing)"
        ],
        icon: <Shield className="w-8 h-8" />,
        color: "text-red-600",
        bgGradient: "from-red-50 to-red-100"
    },
    {
        id: 7,
        title: "Data & Business Analytics",
        description: "Unlock insights and make data-driven decisions.",
        courses: [
            "Business Analysis Fundamentals",
            "Data Science with Python",
            "Excel-Based Data Analytics",
            "Power BI / Tableau Basics (Optional Add-on)"
        ],
        icon: <BarChart3 className="w-8 h-8" />,
        color: "text-indigo-600",
        bgGradient: "from-indigo-50 to-indigo-100"
    },
    {
        id: 8,
        title: "Communication & Language Proficiency",
        description: "Corporate communication, global language prep, and fluency building.",
        courses: [
            "Spoken English (Beginner to Advanced)",
            "Business English & Email Writing",
            "IELTS / TOEFL / PTE Preparation (Academic & General)",
            "German Language (A1 & A2 Levels)",
            "French Language for Beginners",
            "Hindi Communication for Expats / NRIs"
        ],
        icon: <MessageCircle className="w-8 h-8" />,
        color: "text-pink-600",
        bgGradient: "from-pink-50 to-pink-100"
    },
    {
        id: 9,
        title: "Soft Skills & Workplace Behaviour",
        description: "Essential personality traits & professional etiquette for growth.",
        courses: [
            "Effective Communication & Public Speaking",
            "Personality Development & Leadership Skills",
            "Interview Preparation & Resume Building",
            "Time Management & Workplace Etiquette",
            "Customer Handling & Sales Communication"
        ],
        icon: <Users className="w-8 h-8" />,
        color: "text-teal-600",
        bgGradient: "from-teal-50 to-teal-100"
    }
];



const CooperateTrainingProgram = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);

    // const scrollToPrograms = () => {
    //     const programsSection = document.getElementById('training-programs');
    //     if (programsSection) {
    //         programsSection.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'start'
    //         });
    //     }
    // };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            {/* <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
                                <BookOpen className="w-12 h-12 text-blue-200" />
                            </div> */}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Corporate & Advanced
                            <span className="block text-blue-300">Technical Training Programs</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Empower your workforce with cutting-edge skills and industry-relevant training programs designed for corporate excellence
                        </p>
                        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={scrollToPrograms}
                                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                            >
                                Explore Programs <ChevronRight className="w-5 h-5" />
                            </button>
                            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                                <Phone className="w-5 h-5" /> Contact Us
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Stats Section
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">9</div>
                            <div className="text-gray-600">Training Categories</div>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
                            <div className="text-gray-600">Professionals Trained</div>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                            <div className="text-gray-600">Course Modules</div>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-orange-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">4.8</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Training Programs Section */}
            <div id="training-programs" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Training Programs
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Bridging the gap between degrees and jobs — our industry-focused training equips students with real-world skills, live project experience, and job-ready confidence.                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {trainingPrograms.map((program) => (
                            <div
                                key={program.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                            >
                                <div className={`bg-gradient-to-br ${program.bgGradient} p-6`}>
                                    <div className={`${program.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {program.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                                        {program.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {program.description}
                                    </p>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-sm text-gray-500">
                                            {program.courses.length} Modules
                                        </span>
                                        <button
                                            onClick={() => setSelectedProgram(program.id)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors duration-200"
                                        >
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            {selectedProgram && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        {(() => {
                            const program = trainingPrograms.find(p => p.id === selectedProgram);
                            if (!program) return null;

                            return (
                                <>
                                    <div className={`bg-gradient-to-br ${program.bgGradient} p-6 relative`}>
                                        <button
                                            onClick={() => setSelectedProgram(null)}
                                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                        <div className={`${program.color} mb-4`}>
                                            {program.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {program.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {program.description}
                                        </p>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">Course Modules:</h4>
                                        <ul className="space-y-3">
                                            {program.courses.map((course, index) => (
                                                <li key={index} className="flex items-start gap-3 text-gray-700">
                                                    <ChevronRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="leading-relaxed">{course}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                                                <Mail className="w-5 h-5" />
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Transform Your Team's Skills?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Get in touch with us to discuss customized training solutions for your organization
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                            <Mail className="w-5 h-5" /> Request Quote
                        </button>
                        <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                            <Phone className="w-5 h-5" /> Schedule Call
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Section
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-gray-600">training@school.edu</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                            <p className="text-gray-600">123 Education Street<br />Learning City, LC 12345</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Footer
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">
                        © 2025 Corporate Training Institute. All rights reserved. | Empowering professionals for tomorrow's challenges.
                    </p>
                </div>
            </footer> */}

        </div>
    );
}

export default CooperateTrainingProgram;