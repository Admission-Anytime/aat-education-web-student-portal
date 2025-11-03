import React, { useState, useEffect } from 'react'
import MainPage from './MainPage'
import AboutUs from './Pages/AboutUs'
import CooperateTrainingProgram from './Navbar/CooperateTrainingProgram'
import News from './Navbar/News'
import Courses from './Navbar/Courses'
import logo_image from '../assets/img/Logo.jpg'
import { Building, Mail, MapPin, Menu, Phone } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './Navbar/Header'
import axios from 'axios'
import { GraduationCap, ClipboardCheck, UserCheck } from "lucide-react";


const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

const SchoolWebsite = () => {
  

   const [footerData, setFooterData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Static main links
  const mainLinks = [
    { text: "About us", href: "#" },
    { text: "Contact us", href: "#" },
    { text: "Terms and Conditions", href: "#" },
    { text: "Blog", href: "#" },
    { text: "Career", href: "#" },
    { text: "FAQs", href: "#" },
  ];
 // Function to handle moving to the next testimonial, wrapping around if needed
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Function to handle moving to the previous testimonial, wrapping around if needed
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Function to handle jumping to a specific testimonial
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
 
  useEffect(() => {
    axios.get(`${BASE_URL}/api/footer`)
      .then(res => 
      {setFooterData(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  if (!footerData) return null;
   // State to manage the starting index of the currently displayed group of testimonials

  /* Testimonial data array
  const testimonials = [
    {
      name: 'Jane Doe',
      title: 'Marketing Director',
      quote: 'This service exceeded all my expectations. The results were fantastic, and the process was seamless from start to finish.',
      image: 'https://placehold.co/120x120/4338CA/FFFFFF?text=JD',
    },
    {
      name: 'John Smith',
      title: 'Founder & CEO',
      quote: 'A truly game-changing solution for our business. The support team was incredibly responsive and helpful.',
      image: 'https://placehold.co/120x120/A855F7/FFFFFF?text=JS',
    },
    {
      name: 'Emily Chen',
      title: 'Lead Developer',
      quote: 'I was impressed with the level of detail and professionalism. The platform is intuitive and powerful.',
      image: 'https://placehold.co/120x120/22C55E/FFFFFF?text=EC',
    },
    {
      name: 'Michael Brown',
      title: 'Small Business Owner',
      quote: 'The value I received was outstanding. It helped me grow my business more than I thought possible.',
      image: 'https://placehold.co/120x120/F59E0B/FFFFFF?text=MB',
    },
    {
      name: 'Jessica Lee',
      title: 'Creative Designer',
      quote: 'Creative freedom combined with excellent functionality. I would highly recommend this to anyone in the field.',
      image: 'https://placehold.co/120x120/EF4444/FFFFFF?text=JL',
    },
    {
      name: 'David Wilson',
      title: 'Product Manager',
      quote: 'This product has streamlined our workflow and improved team collaboration immensely. A top-tier tool!',
      image: 'https://placehold.co/120x120/10B981/FFFFFF?text=DW',
    },
    {
      name: 'Sarah Kim',
      title: 'Customer Support Lead',
      quote: 'The customer service is unparalleled. They are always there to help with any questions or issues.',
      image: 'https://placehold.co/120x120/6366F1/FFFFFF?text=SK',
    },
    {
      name: 'Chris Evans',
      title: 'Financial Analyst',
      quote: 'An essential tool for anyone in my line of work. It provides accurate data and clear insights.',
      image: 'https://placehold.co/120x120/3B82F6/FFFFFF?text=CE',
    },
    {
      name: 'Olivia Rodriguez',
      title: 'Student',
      quote: 'As a student, this has been an incredible resource for my projects. The learning curve was minimal.',
      image: 'https://placehold.co/120x120/EC4899/FFFFFF?text=OR',
    },
    {
      name: 'Robert Davis',
      title: 'Architect',
      quote: 'The design tools are intuitive and have saved me countless hours on my projects. Highly recommended.',
      image: 'https://placehold.co/120x120/60A5FA/FFFFFF?text=RD',
    },
  ];*/

 
  
const FooterLink = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-orange-400 transform hover:translate-x-1 transition-all duration-300 ease-in-out"
    >
      {children}
    </a>
  );
};


/*const FooterSection = ({ title, children, icon }) => {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="flex items-center mb-4 text-white">
        {icon}
        <h3 className="text-lg font-bold ml-2">{title}</h3>
      </div>
      <nav className="flex flex-col space-y-2">
        {children}
      </nav>
    </div>
  );
};*/

const getIcon = (title) => {
    if (title.includes("Career")) return <GraduationCap className="h-6 w-6 text-orange-400" />;
    if (title.includes("Exam")) return <ClipboardCheck className="h-6 w-6 text-orange-400" />;
    if (title.includes("Counseling")) return <UserCheck className="h-6 w-6 text-orange-400" />;
    return <MapPin className="h-6 w-6 text-orange-400" />;
  };
    return (

        <div className='min-h-screen bg-white font-sans'>

            {/* Header */}
            <Header />

            <Outlet />

            {/* <MainPage /> */}

            {/* <AboutUs /> */}

            {/* <CooperateTrainingProgram /> */}

            {/* <News /> */}

            {/* <Courses /> */}

            {/* Footer */}
     
  {/* Footer */}
  <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-14 pb-8">
  {/* Top: Logo and Description */}
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 border-b border-gray-800 pb-10">
  

    {/* Main Links */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 text-sm w-full md:w-auto">
      {footerData.sections.map((section, index) => (
        <div key={index}>
          <div className="flex items-center mb-3 space-x-2">
            {getIcon(section.title)}
            <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          </div>
          <ul className="space-y-2">
            {section.links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>

  {/* Middle: Quick Links */}
  <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm border-b border-gray-800 pb-6">
    {footerData.mainLinks.map((link, index) => (
      <a
        key={index}
        href={link.href}
        className="hover:text-orange-400 transition-all duration-300 hover:translate-y-0.5"
      >
        {link.text}
      </a>
    ))}
  </div>

  {/* Bottom: Copyright */}
  <div className="mt-6 text-center text-xs text-gray-500">
    <p>{footerData.copyrightText}</p>
  </div>
</footer>


   


 




            
        </div>
       
      

        
    )
}

export default SchoolWebsite