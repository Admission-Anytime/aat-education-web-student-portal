import React from 'react';
import {
    Calendar,
    Users,
    Award,
    Heart,
    Target,
    BookOpen,
    Lightbulb,
    TrendingUp,
    Globe,
    Star,
    CheckCircle,
    ArrowRight,
    Building,
    GraduationCap,
    Briefcase
} from 'lucide-react';

const AboutUs = () => {
    const stats = [
        { number: "22+", label: "Years of Excellence", icon: <Calendar className="w-6 h-6" /> },
        { number: "10,000+", label: "Students Enrolled", icon: <Users className="w-6 h-6" /> },
        { number: "100+", label: "Qualified Teachers", icon: <Award className="w-6 h-6" /> },
        { number: "95%", label: "Employment Rate", icon: <TrendingUp className="w-6 h-6" /> }
    ];

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Inclusive Education",
            description: "Empowering students from rural, marginalized, and economically disadvantaged communities"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Industry-Focused",
            description: "Programs designed to meet real-world industry demands and current market needs"
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Practical Learning",
            description: "Hands-on training with live projects and real-time problem-solving experiences"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Social Impact",
            description: "Creating transformative opportunities for school dropouts and underserved youth"
        }
    ];

    const achievements = [
        "Hundreds of alumni in reputed organizations",
        "Successful entrepreneurial ventures launched",
        "Students re-entered academic mainstream",
        "Government and private sector partnerships",
        "Affordable and flexible program delivery",
        "Expert mentorship and guidance"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            {/* <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
                                <GraduationCap className="w-12 h-12 text-yellow-400" />
                            </div> */}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {/* About */}
                            <h1 className="text-4xl text-blue-300 md:text-6xl font-bold mb-6 leading-tight">
                                {/* Know more */}
                                <span className="block  text-white">About Us</span>
                            </h1>
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Transforming lives through career-focused, skill-based, and inclusive learning since 2002
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-sm bg-white/10 backdrop-blur-sm rounded-full px-6 py-3  ">
                            <Calendar className="w-4 h-4 text-yellow-400" />
                            <span>Founded on 2nd October 2002</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center mb-3 text-blue-600">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Our Story */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-600">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    <strong className="text-blue-900">Aayush Institute of Professional Studies (AIPS)</strong>, founded on 2nd October 2002,
                                    is a forward-thinking educational institution committed to shaping the future of India's youth through
                                    career-focused, skill-based, and inclusive learning.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <p className="text-gray-700 leading-relaxed">
                                    Operated by the <strong className="text-indigo-700">New Aayush Education Welfare Society</strong>—a registered
                                    non-profit under the Societies Act of 1856 (Delhi)—AIPS stands as a beacon of educational empowerment,
                                    social development, and nation-building.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6 flex items-center">
                                <Building className="w-6 h-6 mr-3" />
                                Our Foundation
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Registered non-profit organization</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Over two decades of dedicated service</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Trusted name in professional education</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Focus on marginalized communities</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Values */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide our mission to transform lives through education
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                                <div className="text-blue-600 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vision & Purpose */}
                <div className="mb-20">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <Target className="w-12 h-12 text-yellow-300" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎯 Our Vision & Purpose</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                    <h3 className="text-xl font-bold mb-3 flex items-center">
                                        <Briefcase className="w-5 h-5 mr-2" />
                                        The Industry Challenge
                                    </h3>
                                    <p className="text-orange-100 leading-relaxed">
                                        Thousands of students graduate with professional degrees like B.Tech, BCA, MCA, BBA, and MBA,
                                        yet struggle to secure jobs due to the gap between theoretical education and practical industry demands.
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                    <h3 className="text-xl font-bold mb-3 flex items-center">
                                        <Star className="w-5 h-5 mr-2" />
                                        Our Solution
                                    </h3>
                                    <p className="text-orange-100 leading-relaxed">
                                        We bridge this gap with Corporate Training Courses that develop hands-on skills, live project experience,
                                        and real-time problem-solving capabilities that employers actually seek.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <h3 className="text-2xl font-bold mb-4 text-center">Job-Creator Mindset</h3>
                                <p className="text-orange-100 leading-relaxed text-center mb-6">
                                    Our mission extends beyond job placement—we transform students into capable professionals
                                    with entrepreneurial thinking, ready to thrive in any corporate setting.
                                </p>
                                <div className="flex justify-center">
                                    <div className="bg-yellow-400 text-orange-900 px-6 py-3 rounded-full font-semibold flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        Long-term Success
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Impact */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Creating transformative opportunities and sustainable impact in communities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{achievement}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educational Ecosystem */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Unique Educational Ecosystem</h2>
                        <p className="text-emerald-100 text-lg max-w-3xl mx-auto leading-relaxed">
                            Blending academic rigor with real-world relevance, fostering personal growth,
                            professional readiness, and social responsibility
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <BookOpen className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">Academic Excellence</h3>
                            <p className="text-emerald-100">Rigorous curriculum designed for comprehensive learning</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <Users className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">Community Partnerships</h3>
                            <p className="text-emerald-100">Collaborating with government, private, and community organizations</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <Award className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">Employment Focus</h3>
                            <p className="text-emerald-100">Affordable, flexible, and employment-oriented programs</p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-xl font-semibold text-yellow-300">
                            "Education is not just about earning degrees—it's about transforming lives."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;































// import React from 'react';
// import {
//     Users,
//     BookOpen,
//     Award,
//     Target,
//     Heart,
//     Star,
//     Building,
//     GraduationCap,
//     Globe,
//     Trophy,
//     Clock,
//     MapPin
// } from 'lucide-react';

// const AboutUs = () => {
//     const stats = [
//         { icon: Users, value: '2,500+', label: 'Students' },
//         { icon: GraduationCap, value: '150+', label: 'Faculty Members' },
//         { icon: Trophy, value: '50+', label: 'Awards Won' },
//         { icon: Clock, value: '25+', label: 'Years of Excellence' }
//     ];

//     const values = [
//         {
//             icon: BookOpen,
//             title: 'Academic Excellence',
//             description: 'We strive for the highest standards in education, fostering critical thinking and lifelong learning.'
//         },
//         {
//             icon: Heart,
//             title: 'Character Building',
//             description: 'Developing integrity, empathy, and moral values that shape responsible global citizens.'
//         },
//         {
//             icon: Globe,
//             title: 'Global Perspective',
//             description: 'Preparing students for an interconnected world through diverse experiences and cultural awareness.'
//         },
//         {
//             icon: Target,
//             title: 'Innovation',
//             description: 'Embracing creativity and forward-thinking approaches to solve tomorrow\'s challenges.'
//         }
//     ];

//     const facilities = [
//         { name: 'Modern Laboratories', description: 'State-of-the-art science and computer labs' },
//         { name: 'Digital Library', description: 'Extensive collection of books and digital resources' },
//         { name: 'Sports Complex', description: 'Olympic-size pool, gymnasium, and outdoor fields' },
//         { name: 'Arts Center', description: 'Music rooms, art studios, and performance theater' },
//         { name: 'Innovation Hub', description: 'Maker space with 3D printing and robotics' },
//         { name: 'Wellness Center', description: 'Health services and counseling support' }
//     ];

//     return (
//         <div className="min-h-screen bg-white">

//             {/* Hero Section */}
//             <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-4 sm:px-6 lg:px-8">
//                 <div className="absolute inset-0 bg-black/20"></div>
//                 <div className="relative max-w-7xl mx-auto text-center">
//                     <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
//                         <GraduationCap className="w-10 h-10" />
//                     </div>
//                     <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
//                         Westfield Academy
//                     </h1>
//                     <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
//                         Nurturing minds, building character, and shaping the leaders of tomorrow since 1999
//                     </p>
//                     <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
//                         <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">K-12 Education</span>
//                         <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">International Curriculum</span>
//                         <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Award-Winning Programs</span>
//                     </div>
//                 </div>
//             </section>

//             {/* Stats Section */}
//             <section className="py-16 bg-gray-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                         {stats.map((stat, index) => {
//                             const Icon = stat.icon;
//                             return (
//                                 <div key={index} className="text-center group">
//                                     <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4 group-hover:bg-blue-700 transition-colors duration-300">
//                                         <Icon className="w-8 h-8" />
//                                     </div>
//                                     <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
//                                     <div className="text-gray-600 font-medium">{stat.label}</div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </section>

//             {/* History Section */}
//             <section className="py-20 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="grid lg:grid-cols-2 gap-16 items-center">
//                         <div>
//                             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Story</h2>
//                             <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
//                                 <p>
//                                     Founded in 1999 by visionary educators Dr. Sarah Mitchell and Dr. James Chen,
//                                     Westfield Academy began as a small progressive school with just 150 students and
//                                     a dream to revolutionize education.
//                                 </p>
//                                 <p>
//                                     Over 25 years, we've grown into a premier educational institution serving over
//                                     2,500 students from diverse backgrounds. Our innovative approach combines rigorous
//                                     academics with character development, preparing students not just for college,
//                                     but for life.
//                                 </p>
//                                 <p>
//                                     Today, Westfield Academy is recognized internationally for its excellence in
//                                     STEM education, arts programs, and commitment to sustainability. Our graduates
//                                     attend top universities worldwide and become leaders in their chosen fields.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="relative">
//                             <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
//                                 <div className="text-center">
//                                     <Building className="w-20 h-20 text-blue-600 mx-auto mb-4" />
//                                     <p className="text-gray-600 text-lg">Campus Image Placeholder</p>
//                                     <p className="text-sm text-gray-500 mt-2">Beautiful 50-acre campus</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Mission & Vision */}
//             <section className="py-20 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-16">
//                         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
//                         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                             Committed to excellence in education and character development
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
//                         <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
//                             <div className="flex items-center mb-6">
//                                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
//                                     <Target className="w-6 h-6 text-white" />
//                                 </div>
//                                 <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
//                             </div>
//                             <p className="text-gray-700 text-lg leading-relaxed">
//                                 To provide exceptional education that empowers students to become confident, creative, and
//                                 caring individuals who contribute positively to their communities and the world.
//                             </p>
//                         </div>

//                         <div className="bg-gradient-to-br from-green-50 to-teal-100 p-8 rounded-2xl">
//                             <div className="flex items-center mb-6">
//                                 <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
//                                     <Star className="w-6 h-6 text-white" />
//                                 </div>
//                                 <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
//                             </div>
//                             <p className="text-gray-700 text-lg leading-relaxed">
//                                 To be a leading educational institution recognized for academic excellence, innovative teaching,
//                                 and nurturing an inclusive community where every student thrives.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Core Values */}
//             <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-16">
//                         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
//                         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                             The principles that guide everything we do
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {values.map((value, index) => {
//                             const Icon = value.icon;
//                             return (
//                                 <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
//                                     <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
//                                         <Icon className="w-7 h-7 text-white" />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
//                                     <p className="text-gray-600 leading-relaxed">{value.description}</p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </section>

//             {/* Facilities */}
//             <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-16">
//                         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">World-Class Facilities</h2>
//                         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                             State-of-the-art infrastructure designed for 21st-century learning
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {facilities.map((facility, index) => (
//                             <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
//                                 <div className="flex items-start space-x-4">
//                                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                                         <Building className="w-6 h-6 text-blue-600" />
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h3>
//                                         <p className="text-gray-600">{facility.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
//                     <p className="text-xl mb-8 text-blue-100">
//                         Discover how Westfield Academy can help your child reach their full potential
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
//                             <MapPin className="w-5 h-5 mr-2" />
//                             Schedule a Tour
//                         </button>
//                         <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
//                             Learn More
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto text-center">
//                     <div className="flex items-center justify-center mb-6">
//                         <GraduationCap className="w-8 h-8 mr-3" />
//                         <span className="text-2xl font-bold">Westfield Academy</span>
//                     </div>
//                     <p className="text-gray-400 mb-4">
//                         123 Education Drive, Learning City, LC 12345 | Phone: (555) 123-4567
//                     </p>
//                     <p className="text-sm text-gray-500">
//                         © 2024 Westfield Academy. All rights reserved.
//                     </p>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default AboutUs;
