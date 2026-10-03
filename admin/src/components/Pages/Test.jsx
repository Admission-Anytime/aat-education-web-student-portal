import React, { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Clipboard,
  FileText,
  CheckCircle,
  X,
  Clock,
  IndianRupee,
  University,
  Share2,
  Info,
  List,
  Code,
  BookOpen,
} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

// Main App component
const CourseCatalog = () => {
  // State to manage the active course filter ('All', 'Undergraduate', 'Postgraduate', etc.)
  const [filter, setFilter] = useState("All");
  // State to hold the course object when a user clicks 'View Details'
  const [selectedCourse, setSelectedCourse] = useState(null);
  // State to manage the search query input
  const [searchQuery, setSearch] = useState("");
  // State to manage how many courses are currently visible. Initialized to 6.
  const [coursesToShow, setCoursesToShow] = useState(6);
  // State to manage the visibility of the enrollment form modal
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  // State for a simple copy message
  const [isCopied, setIsCopied] = useState(false);

  
const [courses, setCourses] = useState([]);

useEffect(() => {
  console.log("useEffect fired");  // ✅ Debug
  axios.get("/api/courses")
    .then((res) => {
      console.log("Courses data:", res.data);
      setCourses(res.data);
    })
    .catch((err) => console.error("API error:", err));
}, []);

  // Map categories to color schemes for the course cards
  const categoryColors = {
    Undergraduate: {
      bg: "bg-white",
      text: "text-blue-800",
      tagBg: "bg-blue-200",
      tagText: "text-blue-800",
    },
    Postgraduate: {
      bg: "bg-white",
      text: "text-purple-800",
      tagBg: "bg-purple-200",
      tagText: "text-purple-800",
    },
    Diploma: {
      bg: "bg-white",
      text: "text-green-800",
      tagBg: "bg-green-200",
      tagText: "text-green-800",
    },
    Doctoral: {
      bg: "bg-white",
      text: "text-yellow-800",
      tagBg: "bg-yellow-200",
      tagText: "text-yellow-800",
    },
  };


  // Hardcoded data for the professional courses
  /*
  const courses = [
    {
      id: 1,
      type: "Undergraduate",
      rating: 4.5,
      title: "Bachelor of Computer Applications (BCA)",
      description:
        "A comprehensive program focusing on computer applications, programming languages, software development, and IT fundamentals.",
      topics: [
        "Programming Fundamentals",
        "Data Structures",
        "Algorithms",
        "Database Management",
        "Operating Systems",
      ],
      prerequisites: ["High School Diploma", "Proficiency in Mathematics"],
      structure: [
        { name: "Year 1: Foundations", progress: 100 },
        { name: "Year 2: Core Concepts", progress: 80 },
        { name: "Year 3: Specialization & Project", progress: 60 },
      ],
      duration: "3 Years",
      fees: "₹2-6 Lakhs",
      career: [
        "Software Developer",
        "Web Developer",
        "System Analyst",
        "IT Consultant",
      ],
      universities: [
        "IGNOU",
        "Christ University",
        "IP University",
        "Delhi University",
      ],
    },
    {
      id: 2,
      type: "Postgraduate",
      rating: 4.7,
      title: "Master of Computer Applications (MCA)",
      description:
        "Advanced program in computer applications with a focus on software development, emerging technologies, and research.",
      topics: [
        "Advanced Algorithms",
        "Software Engineering",
        "Machine Learning",
        "Cloud Computing",
      ],
      prerequisites: ["BCA or equivalent degree"],
      structure: [
        { name: "Year 1: Advanced Concepts", progress: 100 },
        { name: "Year 2: Specialization & Internship", progress: 95 },
      ],
      duration: "2 Years",
      fees: "₹3-8 Lakhs",
      career: [
        "Software Engineer",
        "Project Manager",
        "Data Scientist",
        "Research Analyst",
      ],
      universities: ["JNU", "BHU", "Symbiosis Institute", "BIT Mesra"],
    },
    {
      id: 3,
      type: "Postgraduate",
      rating: 4.6,
      title: "Master of Science in Computer Science (M.Sc CS)",
      description:
        "A research-oriented program focusing on the theoretical foundations of computer science and advanced computing concepts.",
      topics: [
        "Theory of Computation",
        "Artificial Intelligence",
        "Computer Vision",
        "Cybersecurity",
      ],
      prerequisites: ["B.Sc. in CS or equivalent"],
      structure: [
        { name: "Year 1: Research Foundations", progress: 100 },
        { name: "Year 2: Thesis & Publication", progress: 75 },
      ],
      duration: "2 Years",
      fees: "₹2-5 Lakhs",
      career: [
        "Research Scientist",
        "Data Scientist",
        "AI/ML Engineer",
        "Academician",
      ],
      universities: [
        "IISc Bangalore",
        "IIT Delhi",
        "IIT Bombay",
        "University of Hyderabad",
      ],
    },
    {
      id: 4,
      type: "Postgraduate",
      rating: 4.4,
      title: "Master of Science in Information Technology (M.Sc IT)",
      description:
        "A specialized program focusing on information systems, network administration, and enterprise technologies.",
      topics: [
        "Network Security",
        "Cloud Infrastructure",
        "Database Systems",
        "IT Management",
      ],
      prerequisites: ["B.Sc. in IT or equivalent"],
      structure: [
        { name: "Semester 1: IT Fundamentals", progress: 100 },
        { name: "Semester 2: Advanced Systems", progress: 100 },
        { name: "Semester 3: Project Work", progress: 50 },
        { name: "Semester 4: Internship", progress: 25 },
      ],
      duration: "2 Years",
      fees: "₹2.5-6 Lakhs",
      career: [
        "IT Manager",
        "Systems Administrator",
        "Network Specialist",
        "IT Consultant",
      ],
      universities: [
        "Anna University",
        "VIT University",
        "Christ University",
        "Savitribai Phule Pune University",
      ],
    },
    {
      id: 5,
      type: "Undergraduate",
      rating: 4.8,
      title: "Bachelor of Technology in Computer Science (B.Tech CSE)",
      description:
        "An engineering program with comprehensive coverage of computer science principles, programming, and technology.",
      topics: [
        "Software Engineering",
        "Operating Systems",
        "Computer Networks",
        "Web Development",
      ],
      prerequisites: [
        "High School with Science stream (Physics, Chemistry, Maths)",
      ],
      structure: [
        { name: "Year 1: Engineering Fundamentals", progress: 100 },
        { name: "Year 2: Core Engineering", progress: 100 },
        { name: "Year 3: Specialization", progress: 90 },
        { name: "Year 4: Capstone Project & Placement", progress: 85 },
      ],
      duration: "4 Years",
      fees: "₹4-15 Lakhs",
      career: [
        "Software Engineer",
        "Product Manager",
        "Data Analyst",
        "Cybersecurity Expert",
      ],
      universities: ["IIT Bombay", "IIT Delhi", "IIT Madras", "BITS Pilani"],
    },
    {
      id: 6,
      type: "Postgraduate",
      rating: 4.9,
      title: "Master of Technology in Computer Science (M.Tech CSE)",
      description:
        "An advanced engineering program with a specialization in cutting-edge computer science technologies.",
      topics: [
        "Advanced AI/ML",
        "High-Performance Computing",
        "Quantum Computing",
        "Embedded Systems",
      ],
      prerequisites: ["B.Tech/BE in CSE or equivalent"],
      structure: [
        { name: "Semester 1: Core Subjects", progress: 100 },
        { name: "Semester 2: Electives", progress: 100 },
        { name: "Semester 3: Research", progress: 100 },
        { name: "Semester 4: Thesis", progress: 100 },
      ],
      duration: "2 Years",
      fees: "₹3-10 Lakhs",
      career: [
        "Senior Software Engineer",
        "Research Engineer",
        "AI Specialist",
        "Lead Developer",
      ],
      universities: ["IIT Madras", "IIT Kanpur", "IIT Kharagpur", "NIT Trichy"],
    },
    {
      id: 7,
      type: "Undergraduate",
      rating: 4.3,
      title: "Bachelor of Science in Data Science (B.Sc DS)",
      description:
        "A program focused on data analysis, machine learning, and statistical modeling for a career in the data industry.",
      topics: [
        "Statistical Modeling",
        "Machine Learning",
        "Big Data Analytics",
        "Data Visualization",
      ],
      prerequisites: ["High School Diploma", "Statistics knowledge"],
      structure: [
        { name: "Year 1: Data Fundamentals", progress: 100 },
        { name: "Year 2: Applied Data Science", progress: 75 },
        { name: "Year 3: Project & Case Studies", progress: 50 },
      ],
      duration: "3 Years",
      fees: "₹3-7 Lakhs",
      career: [
        "Data Analyst",
        "Business Intelligence Analyst",
        "Data Storyteller",
        "Statistician",
      ],
      universities: [
        "IIT Madras",
        "Christ University",
        "BITS Pilani",
        "Manipal University",
      ],
    },
    {
      id: 8,
      type: "Postgraduate",
      rating: 4.5,
      title: "Master of Arts in Digital Humanities (M.A. DH)",
      description:
        "An interdisciplinary program exploring the intersection of humanities and technology.",
      topics: [
        "Digital Archiving",
        "Textual Analysis",
        "Media Studies",
        "Digital Pedagogy",
      ],
      prerequisites: ["Bachelor's degree in any field"],
      structure: [
        { name: "Year 1: Theory & Methods", progress: 100 },
        { name: "Year 2: Research & Project", progress: 60 },
      ],
      duration: "2 Years",
      fees: "₹1-3 Lakhs",
      career: [
        "Digital Archivist",
        "Content Strategist",
        "UX Researcher",
        "Digital Curator",
      ],
      universities: [
        "Delhi University",
        "JNU",
        "Jadavpur University",
        "University of Hyderabad",
      ],
    },
    {
      id: 9,
      type: "Undergraduate",
      rating: 4.6,
      title: "Bachelor of Business Administration (BBA)",
      description:
        "A program covering business management principles, marketing, and finance.",
      topics: [
        "Marketing Management",
        "Financial Accounting",
        "Human Resource Management",
        "Business Strategy",
      ],
      prerequisites: ["High School Diploma"],
      structure: [
        { name: "Year 1: Management Fundamentals", progress: 100 },
        { name: "Year 2: Specialization", progress: 95 },
        { name: "Year 3: Internship & Project", progress: 80 },
      ],
      duration: "3 Years",
      fees: "₹2-5 Lakhs",
      career: [
        "Marketing Manager",
        "Financial Analyst",
        "Operations Manager",
        "HR Specialist",
      ],
      universities: [
        "Symbiosis Pune",
        "NMIMS Mumbai",
        "Christ University",
        "Jamia Millia Islamia",
      ],
    },
    {
      id: 10,
      type: "Diploma",
      rating: 4.1,
      title: "Diploma in Web Development",
      description:
        "A hands-on program to learn front-end and back-end web technologies, frameworks, and database management.",
      topics: ["HTML/CSS/JS", "React", "Node.js", "Databases"],
      prerequisites: ["Basic computer skills"],
      structure: [
        { name: "Module 1: Front-End", progress: 100 },
        { name: "Module 2: Back-End", progress: 90 },
        { name: "Module 3: Full-Stack Project", progress: 75 },
      ],
      duration: "1 Year",
      fees: "₹50k-1 Lakh",
      career: [
        "Front-End Developer",
        "Back-End Developer",
        "Full-Stack Developer",
        "Web Designer",
      ],
      universities: ["NIIT", "Aptech", "Various Polytechnics"],
    },
    {
      id: 11,
      type: "Doctoral",
      rating: 4.9,
      title: "Ph.D. in Computer Science",
      description:
        "A research-intensive program focusing on advanced topics in computer science and contributing original research to the field.",
      topics: [
        "Algorithm Analysis",
        "Network Security",
        "AI Research",
        "Computational Theory",
      ],
      prerequisites: ["Master's degree in Computer Science"],
      structure: [
        { name: "Year 1: Coursework & Research Proposal", progress: 100 },
        { name: "Year 2-4: Research & Thesis Writing", progress: 80 },
        { name: "Year 5: Thesis Defense & Publication", progress: 60 },
      ],
      duration: "3-5 Years",
      fees: "₹1-3 Lakhs",
      career: [
        "Research Scientist",
        "Professor",
        "Principal Engineer",
        "Director of Research",
      ],
      universities: ["IITs", "IISc Bangalore", "TIFR", "University of Delhi"],
    },
  ];
*/
  // Filters the course list based on the current filter and search query
  const filteredCourses = courses.filter((course) => {
    const typeMatch = filter === "All" || course.type === filter;
    const searchMatch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && searchMatch;
  });

  // Function to load more courses
  const handleLoadMore = () => {
    setCoursesToShow((prev) => prev + 3);
  };

  // Reusable component for displaying a single course card in the grid view
  const CourseCard = ({ course, onDetailsClick, colors }) => (
    <div
      className={`${colors.bg} rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`${colors.tagBg} ${colors.tagText} text-sm font-semibold px-3 py-1 rounded-full`}
        >
          {course.type}
        </span>
        <span className="text-sm font-bold text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-yellow-400 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.632 21.018c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          {course.rating}
        </span>
      </div>
      <div className="flex-grow">
        <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
          {course.title}
        </h3>
        <p className={`text-gray-600 text-sm mb-4`}>{course.description}</p>
      </div>
      <div className="space-y-3 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <IndianRupee className="w-5 h-5 text-gray-400" />
          <span>{course.fees}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <span>
            Career Prospects: {course.career.slice(0, 2).join(", ")} +
            {course.career.length - 2} more
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <University className="w-5 h-5 text-gray-400" />
          <span>
            Top Universities: {course.universities.slice(0, 2).join(", ")} +
            {course.universities.length - 2} more
          </span>
        </div>
      </div>
      <button
        onClick={() => onDetailsClick(course)}
        className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-sky-600 transition duration-300 transform hover:-translate-y-1"
      >
        View Details
      </button>
    </div>
  );

  // Component for displaying the detailed view of a single course
  const CourseDetails = ({ course, onBackClick }) => {
    // Handler to copy course details to the clipboard
    const handleCopy = () => {
      const detailsText = `
      Course: ${course.title}
      Rating: ${course.rating}/5
      Description: ${course.description}
      Duration: ${course.duration}
      Fees: ${course.fees}
      Career Prospects: ${course.career.join(", ")}
      Top Universities: ${course.universities.join(", ")}
      Key Topics: ${course.topics.join(", ")}
      Prerequisites: ${course.prerequisites.join(", ")}
      `;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(detailsText)
          .then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          })
          .catch((err) => {
            console.error("Could not copy text: ", err);
          });
      } else {
        // Fallback for browsers that do not support navigator.clipboard.writeText
        const textarea = document.createElement("textarea");
        textarea.value = detailsText;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error("Fallback: Could not copy text: ", err);
        }
        document.body.removeChild(textarea);
      }
    };

    const handleEnrollmentSubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      console.log("Enrollment submitted:", data);
      setShowEnrollmentForm(false);
    };

    return (
      <div className="p-6 md:p-10 max-w-5xl mx-auto my-8">
  {/* <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto my-8"> */}
        {/* Header with back button and title */}
        <div className="flex justify-between items-center mb-6">
           <button
            onClick={onBackClick}
            className="flex items-center justify-center w-8 h-8 text-blue-600 hover:text-white hover:bg-red-600 transition-colors rounded-full shadow-md focus:outline-none ml-1"
            aria-label="Go back to course list"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center flex-grow">
            {course.title}
          </h2>


          {/* <span className="text-xl font-bold text-gray-700 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.632 21.018c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {course.rating}
          </span>*/}
        </div>

        {/* Description Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 ">
          {/* <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-inner"> */}
          <p className="text-gray-700 text-lg">{course.description}</p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-sky-50 rounded-lg p-6 flex items-start gap-4 shadow-sm">
            <div className="flex-shrink-0 bg-sky-200 text-sky-700 rounded-full p-3">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Duration</h3>
              <p className="text-gray-600 mt-1">{course.duration}</p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 flex items-start gap-4 shadow-sm">
            <div className="flex-shrink-0 bg-purple-200 text-purple-700 rounded-full p-3">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Fees</h3>
              <p className="text-gray-600 mt-1">{course.fees}</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 flex items-start gap-4 shadow-sm">
            <div className="flex-shrink-0 bg-green-200 text-green-700 rounded-full p-3">
              <List className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Type</h3>
              <p className="text-gray-600 mt-1">{course.type}</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 mt-1 pt-0">
          {/* Key Topics Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-gray-500" />
              <h3 className="text-xl font-bold text-gray-800">Key Topics</h3>
            </div>
            <ul className="list-inside text-gray-700 space-y-2">
              {course.topics.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Prospects Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-gray-500" />
              <h3 className="text-xl font-bold text-gray-800">
                Career Prospects
              </h3>
            </div>
            <ul className="list-inside text-gray-700 space-y-2">
              {course.career.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Clipboard className="w-6 h-6 text-gray-500" />
              <h3 className="text-xl font-bold text-gray-800">Prerequisites</h3>
            </div>
            <ul className="list-inside text-gray-700 space-y-2">
              {course.prerequisites.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Structure Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-gray-500" />
              <h3 className="text-xl font-bold text-gray-800">
                Course Structure
              </h3>
            </div>
            <div className="space-y-4">
{course.structure.map((stage, i) => (
  <div key={i} className="bg-white p-4 rounded-lg shadow-inner">
    <span className="text-gray-900 font-medium">{stage}</span>
  </div>
))}


            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => setShowEnrollmentForm(true)}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Enroll Now
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ${
              isCopied
                ? "bg-green-500 text-white"
                : "bg-sky-500 text-white hover:bg-sky-600"
            }`}
          >
            {isCopied ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
            {isCopied ? "Copied!" : "Copy Details"}
          </button>
        </div>
      </div>
    );
  };

  const EnrollmentForm = ({ onClose }) => {
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      console.log("Enrollment submitted:", data);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Enrollment Form
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="+91-1234567890"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {selectedCourse ? (
          // Renders the detailed view if a course is selected
          <CourseDetails
            course={selectedCourse}
            onBackClick={() => {
              setSelectedCourse(null);
              setIsCopied(false);
            }}
          />
        ) : (
          // Renders the main course catalogue with filters and search bar
          <>
            {/* Header section */}
            <header>
              <div className="text-center mb-4 md:mb-6 py-1">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">
                  Academic Programs
                </h1>
                <p className="text-gray-600 text-lg md:text-xl">
                  Choose from a wide range of undergraduate and postgraduate
                  programs.
                </p>
              </div>
            </header>

            {/* Filter and search controls */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-3">
              {/* Search bar */}
              <div className="relative w-full max-w-xs md:max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Filter buttons */}
              <div className="flex flex-wrap gap-3">
                {[
                  "All",
                  "Undergraduate",
                  "Postgraduate",
                  "Diploma",
                  "Doctoral",
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`
                      px-6 py-2 rounded-full font-semibold transition-all duration-300
                      ${
                        filter === type
                          ? "bg-sky-600 text-white shadow-lg"
                          : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.slice(0, coursesToShow).map((course, index) => {
                const colors = categoryColors[course.type] || {
                  bg: "bg-white",
                  text: "text-gray-900",
                  tagBg: "bg-gray-200",
                  tagText: "text-gray-800",
                };
                return (
                  <CourseCard
                    key={index}
                    course={course}
                    onDetailsClick={setSelectedCourse}
                    colors={colors}
                  />
                );
              })}
            </div>

            {/* Load More Button - Only shows if there are more courses to load */}
            {filteredCourses.length > coursesToShow && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}
        {showEnrollmentForm && (
          <EnrollmentForm onClose={() => setShowEnrollmentForm(false)} />
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
