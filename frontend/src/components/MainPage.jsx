import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Star,
  GraduationCap,
  Building,
  Microscope,
} from "lucide-react";

import axios from "axios";
import { createPortal } from "react-dom";

export default function MainPage() {
  //courses or progtrams section
  // BookOpen icon component
  const BookOpenIcon = ({ size = 28 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-book-open"
    >
      <path d="M12 4v16M20 4h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6V4zM4 4h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4V4z" />
    </svg>
  );

  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call or keep mock data
    axios
      .get("/api/courses")
      .then((res) => {
        const visibleCourses = res.data.filter((course) => course.visible);

        const formatted = visibleCourses.map((program) => ({
          title: program.title,
          description: program.description,
          iconSize: program.iconSize || 28, // dynamic icon size
          features: [
            `Duration:     ${program.duration}`,
            `Rating:     ⭐ ${program.rating}`,
            `Fees:     ${program.fees}`,
            ...(program.career?.length
              ? [`Career Options:     ${program.career.join(", ")}`]
              : []),
            ...(program.universities?.length
              ? [`Universities:     ${program.universities.join(", ")}`]
              : []),
          ],
        }));

        setPrograms(formatted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setIsLoading(false);
      });
  }, []);

  //testimonial section
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/testimonials");

        // Normalize: always include full URL
        const dataWithUrl = res.data.map((t) => ({
          ...t,
          profileImageUrl: t.profileImage
            ? `http://localhost:4001${t.profileImage}` // ✅ add backend host
            : "/default-profile.jpg", // fallback
        }));
        console.log(dataWithUrl);
        setTestimonials(dataWithUrl);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTestimonials();
  }, []);

  //news and updates section dynamic
  const [news, setNews] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [smallPosts, setSmallPosts] = useState([]);
  const [showSmallPosts, setShowSmallPosts] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/news"); // your backend route
        const sortedNews = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Find the featured post
        const featured = sortedNews.find((n) => n.featured) || sortedNews[0];
        //const others = sortedNews.filter((n) => n._id !== featured._id);
        // Filter all other posts that are visible
        const others = sortedNews.filter(
          (n) => n._id !== featured._id && n.visible
        );

        setFeaturedPost(featured);
        setSmallPosts(others);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  //Inquire Now Form floatable right side
  // Data for states and cities
  // Data for state-city dropdowns
  const stateCityData = {
    CA: ["Los Angeles", "San Francisco", "San Diego"],
    NY: ["New York City", "Buffalo", "Rochester"],
    TX: ["Houston", "Austin", "Dallas"],
  };

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    state: "",
    city: "",
    consent: false,
  });

  const [availableCities, setAvailableCities] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [message, setMessage] = useState("");

  // Generic change handler for all form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for the state dropdown change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      city: "", // Reset city when state changes
    }));
    setAvailableCities(stateCityData[selectedState] || []);
  };

  /* Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setMessage("Thank you for your inquiry! We will get back to you shortly.");
    setTimeout(() => setMessage(""), 5000); // Hide message after 5 seconds
  };*/

  // Handler to toggle the form collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  //subscribe section
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubscribe = async () => {
    // ✅ Frontend validation
    const whatsappRegex = /^[0-9]{10}$/;
    if (!whatsappRegex.test(whatsapp)) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      setSuccess("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    try {
      setError("");
      setSuccess("");

      // ✅ Send to backend
      const res = await axios.post("/api/subscribers", { whatsapp, email });
      console.log("email subscription", res.data.message);
      if (res.status === 200) {
        setSuccess(res.data.message || "You have successfully subscribed!");
        setWhatsapp("");
        setEmail("");
      }
    } catch (err) {
      // ✅ Show backend message (like duplicate errors)
      setError(
        err.response?.data?.message || "Subscription failed. Try again."
      );
      setSuccess("");
    }
  };

  //slider or carousel
  const [carouselData, setCarouselData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleSlides = carouselData.filter((item) => item.visible);

  // Fetch carousel data from backend
  /*useEffect(() => {
    axios
      .get("http://localhost:4001/api/carousel")
      .then((res) => 
        { console.log("Slider's fetched Data:", res.data);
          setCarouselData(res.data)
        })
      .catch((err) => console.error(err));
  }, []);*/
  useEffect(() => {
    const fetchCarousel = () => {
      axios
        .get("http://localhost:4001/api/carousel")
        .then((res) => setCarouselData(res.data))
        .catch((err) => console.error(err));
    };

    fetchCarousel(); // initial fetch
    //polling not required
    //const interval = setInterval(fetchCarousel, 3000); // fetch every 5 sec

    //return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide >= visibleSlides.length) {
      setCurrentSlide(0); // reset if currentSlide is out of bounds
    }
  }, [visibleSlides]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (carouselData.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [carouselData]);

  // Auto-play or slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % visibleSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + visibleSlides.length) % visibleSlides.length
    );
  };

  const newsItems = [
    {
      id: 1,
      title: "Annual Science Fair 2025",
      date: "March 15, 2025",
      summary:
        "Students showcase innovative projects in our biggest science fair yet.",
      image:
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1",
    },
    {
      id: 2,
      title: "New Computer Lab Opening",
      date: "February 28, 2025",
      summary:
        "State-of-the-art computer lab with latest technology now available.",
      image:
        "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1",
    },
    {
      id: 3,
      title: "Sports Day Championship",
      date: "April 10, 2025",
      summary:
        "Inter-house sports competition featuring various athletic events.",
      image:
        "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1",
    },
  ];
  /*const programs = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Primary Education",
      description:
        "Grades 1-5 with focus on foundational learning and creativity",
      features: ["Interactive Learning", "Creative Arts", "Basic Sciences"],
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Secondary Education",
      description:
        "Grades 6-10 with comprehensive curriculum and skill development",
      features: ["Advanced Sciences", "Mathematics", "Language Arts"],
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Senior Secondary",
      description:
        "Grades 11-12 with specialized streams and career preparation",
      features: ["Science Stream", "Commerce Stream", "Arts Stream"],
    },
  ];*/

  //testimonial data
  // State to manage the starting index of the currently displayed group of testimonials
  const fallbackImage = "/path/to/default-image.jpg"; // can be in public folder

  const [currentIndex, setCurrentIndex] = useState(0);

  // Testimonial data array
  const testimonial = [
    {
      name: "Jane Doe",
      title: "Marketing Director",
      quote:
        "This service exceeded all my expectations. The results were fantastic, and the process was seamless from start to finish.",
      image: "https://placehold.co/120x120/4338CA/FFFFFF?text=JD",
    },
    {
      name: "John Smith",
      title: "Founder & CEO",
      quote:
        "A truly game-changing solution for our business. The support team was incredibly responsive and helpful.",
      image: "https://placehold.co/120x120/A855F7/FFFFFF?text=JS",
    },
    {
      name: "Emily Chen",
      title: "Lead Developer",
      quote:
        "I was impressed with the level of detail and professionalism. The platform is intuitive and powerful.",
      image: "https://placehold.co/120x120/22C55E/FFFFFF?text=EC",
    },
    {
      name: "Michael Brown",
      title: "Small Business Owner",
      quote:
        "The value I received was outstanding. It helped me grow my business more than I thought possible.",
      image: "https://placehold.co/120x120/F59E0B/FFFFFF?text=MB",
    },
    {
      name: "Jessica Lee",
      title: "Creative Designer",
      quote:
        "Creative freedom combined with excellent functionality. I would highly recommend this to anyone in the field.",
      image: "https://placehold.co/120x120/EF4444/FFFFFF?text=JL",
    },
    {
      name: "David Wilson",
      title: "Product Manager",
      quote:
        "This product has streamlined our workflow and improved team collaboration immensely. A top-tier tool!",
      image: "https://placehold.co/120x120/10B981/FFFFFF?text=DW",
    },
    {
      name: "Sarah Kim",
      title: "Customer Support Lead",
      quote:
        "The customer service is unparalleled. They are always there to help with any questions or issues.",
      image: "https://placehold.co/120x120/6366F1/FFFFFF?text=SK",
    },
    {
      name: "Chris Evans",
      title: "Financial Analyst",
      quote:
        "An essential tool for anyone in my line of work. It provides accurate data and clear insights.",
      image: "https://placehold.co/120x120/3B82F6/FFFFFF?text=CE",
    },
    {
      name: "Olivia Rodriguez",
      title: "Student",
      quote:
        "As a student, this has been an incredible resource for my projects. The learning curve was minimal.",
      image: "https://placehold.co/120x120/EC4899/FFFFFF?text=OR",
    },
  ];

  // Function to handle moving to the next group of testimonials
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 < testimonials.length ? prevIndex + 3 : 0
    );
  };

  // Function to handle moving to the previous group of testimonials
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 >= 0
        ? prevIndex - 3
        : testimonials.length - (testimonials.length % 3 || 3)
    );
  };
  /*const heroImages = [
    'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

]


const heroContent = [
    {
        title: "Nurturing Tomorrow's Leaders",
        subtitle: "Providing quality education with modern facilities and experienced faculty"
    },
    {
        title: "Excellence in Professional Education",
        subtitle: "Empowering students with industry-relevant skills and knowledge for successful careers"
    },
    {
        title: "Building Bright Futures Together",
        subtitle: "Creating an environment where innovation meets tradition in professional learning"
    }
]


const newsItems = [
    {
        id: 1,
        title: "Annual Science Fair 2025",
        date: "March 15, 2025",
        summary: "Students showcase innovative projects in our biggest science fair yet.",
        image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    },
    {
        id: 2,
        title: "New Computer Lab Opening",
        date: "February 28, 2025",
        summary: "State-of-the-art computer lab with latest technology now available.",
        image: "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    },
    {
        id: 3,
        title: "Sports Day Championship",
        date: "April 10, 2025",
        summary: "Inter-house sports competition featuring various athletic events.",
        image: "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    }
]


const programs = [
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Primary Education",
        description: "Grades 1-5 with focus on foundational learning and creativity",
        features: ["Interactive Learning", "Creative Arts", "Basic Sciences"]
    },
    {
        icon: <Microscope className="w-8 h-8" />,
        title: "Secondary Education",
        description: "Grades 6-10 with comprehensive curriculum and skill development",
        features: ["Advanced Sciences", "Mathematics", "Language Arts"]
    },
    {
        icon: <GraduationCap className="w-8 h-8" />,
        title: "Senior Secondary",
        description: "Grades 11-12 with specialized streams and career preparation",
        features: ["Science Stream", "Commerce Stream", "Arts Stream"]
    }
]


export default function MainPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
*/

  //about section
  const [about, setAbout] = useState(null);

  // Map icon string to actual component
  const iconMap = {
    Users: <Users className="w-8 h-8" />,
    GraduationCap: <GraduationCap className="w-8 h-8" />,
    Award: <Award className="w-8 h-8" />,
    Star: <Star className="w-8 h-8" />,
  };

  useEffect(() => {
    // Function to fetch the data
    const fetchAbout = async () => {
      try {
        const response = await axios.get("/api/about");
        // Update state, which triggers a re-render
        setAbout(response.data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    // Initial fetch when the component mounts
    fetchAbout();

    // polling not required
    //const intervalId = setInterval(fetchAbout, 2000);

    // Cleanup function to clear the interval when the component unmounts
    //return () => {clearInterval(intervalId);};
  }, []); // The empty dependency array ensures this effect runs only once on mount

  if (!about) return <p className="text-center py-20">Loading...</p>;

  //news section main article and smaller articles
  // Hardcoded data for the news and video sections. In a real application, this would come from an API.

  const newsData = [
    {
      id: 1,
      date: "30th January 2023",
      title:
        "AIIMS (All India Institute Of Medical Science) India's Best Medical Colleges",
      imageUrl:
        "https://institute.admissionanytime.com/public/blogs/167510032771.jpg",
      link: "https://institute.admissionanytime.com/blog/details/Nw==",
      type: "featured",
    },
    {
      id: 2,
      date: "30th January 2023",
      title:
        "Most Popular Medical Degrees MBBS (Bachelor of Medicine, Bachelor of Surgery)",
      imageUrl:
        "https://institute.admissionanytime.com/public/blogs/167509975010.jpg",
      link: "https://institute.admissionanytime.com/blog/details/Ng==",
      type: "small",
    },
    {
      id: 3,
      date: "30th January 2023",
      title: "List of Career Options After 10th in 2023",
      imageUrl:
        "https://institute.admissionanytime.com/public/blogs/167509959196.jpg",
      link: "https://institute.admissionanytime.com/blog/details/NQ==",
      type: "small",
    },
    {
      id: 4,
      date: "30th January 2023",
      title: "List of Career Options After 10th in 2023",
      imageUrl:
        "https://institute.admissionanytime.com/public/blogs/167509959196.jpg",
      link: "https://institute.admissionanytime.com/blog/details/NQ==",
      type: "small",
    },
  ];

  //const featuredPost = newsData.find(post => post.type === 'featured');
  //const smallPosts = newsData.filter(post => post.type === 'small');

  //subscribe section

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 
               Hero Section with Image Slider 
            <section id="home" className="relative">
                <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`School campus ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>
                    ))}

                    {/* Hero Content 
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                {heroContent[currentSlide].title}
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 opacity-90">
                                {heroContent[currentSlide].subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                                    Explore Programs
                                </button>
                                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full font-semibold transition-colors">
                                    Schedule Visit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons 
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Slide Indicators 
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section> 
            */}
      {/*home slider section */}
      <section>
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
          {visibleSlides.map((item, index) => {
            console.log("Slider item:", item); // log the whole item

            return (
              <div
                key={item._id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* To Fix: show image from uploads folder */}
                <img
                  src={`http://localhost:4001/Uploads/${item.imagename}`} // ✅ make sure folder name is Uploads with capital U as per Backend/Uploads
                  alt={"No image available"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                  <div className="max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {visibleSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* About Section static 
            <section id="about" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our Institute</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            For over 40 years, Aayush Institute of Professional Studies has been committed to providing exceptional education that prepares students for success in an ever-changing world.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">10,000+</h3>
                            <p className="text-gray-600">Students Enrolled</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <GraduationCap className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">100+</h3>
                            <p className="text-gray-600">Qualified Teachers</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
                            <p className="text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">22+</h3>
                            <p className="text-gray-600">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </section> */}

      {/** dynamic about section fetching values from mongodb*/}
      <section id="about" className="py-12 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {about.heading}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {about.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    stat.icon === "Users"
                      ? "bg-blue-100"
                      : stat.icon === "GraduationCap"
                      ? "bg-green-100"
                      : stat.icon === "Award"
                      ? "bg-yellow-100"
                      : "bg-purple-100"
                  }`}
                >
                  <span
                    className={`${
                      stat.icon === "Users"
                        ? "text-blue-600"
                        : stat.icon === "GraduationCap"
                        ? "text-green-600"
                        : stat.icon === "Award"
                        ? "text-yellow-600"
                        : "text-purple-600"
                    }`}
                  >
                    {iconMap[stat.icon]}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section py-10 */}
      <section id="programs" className=" bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 pt-6">
              <a
                href="http://localhost:5173/CorporateTraining"
                className="hover:text-blue-600"
              >
                Academic Programs
              </a>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational programs designed to foster intellectual
              growth and personal development at every stage.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="ml-4 text-lg text-gray-600">Loading programs...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8  pb-8">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-600/70"
                >
                  {/* Flex container for icon + title */}
                  <div className="flex items-center mb-4 gap-4">
                    {/*<div className=" w-16 h-16  flex items-center justify-center text-blue-600 ">
          <BookOpenIcon size={program.iconSize} />
        </div>*/}
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      {program.title}
                    </h3>
                  </div>
                  <p className="text-slate-700 text-base mb-6 ">
                    {program.description}
                  </p>

                  <ul className="space-y-3">
                    {program.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-gray-700 text-sm"
                      >
                        {/* <span className="text-blue-500 mr-3 mt-1">&#x2713;</span>*/}

                        <span className="flex-1">
                          <strong className="text-gray-900 font-semibold">
                            {feature.split(": ")[0]}:
                          </strong>
                          <span className=" font-medium text-blue-800"> {/*font of values after : */}
                            {feature.split(": ")[1]}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* <button
                  className="mt-8 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Enroll Now
                </button>*/}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News & Updates Section */}

      <section id="news">
        <div className="max-w-7xl mx-auto px-1 py-8  style={{ marginLeft: '-0.5cm' }">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <a
                href="http://localhost:5173/News&Updates"
                className="hover:text-blue-600"
              >
                News and Updates
              </a>
            </h2>
            <p className="text-xl text-gray-600">
              We'd love to hear from you. Contact us for admissions or any
              queries.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Featured Post */}
            <div
              className="w-full lg:w-1/3"
              style={{ width: "calc(33.333% + 0.5cm)" }} // increases width by 0.5cm on large screens
            >
              {featuredPost && (
                <div className=" overflow-hidden  flex flex-col ">
                  <a href="#" className="block overflow-hidden ">
                    <img
                      src={`http://localhost:4001/Uploads/${featuredPost.image}`}
                      alt={featuredPost.title}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                  <div className="p-4 bg-white flex flex-col justify-between flex-grow ">
                    <span className="text-xs text-orange-400 font-bold mb-2">
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                    <h4 className=" font-xs font-bold mb-2">
                      {featuredPost.title}
                    </h4>
                    {/*<p className="text-gray-700 text-sm line-clamp-3">
                    {featuredPost.excerpt}
                  </p>*/}
                  </div>
                </div>
              )}
            </div>

            {/* Middle Column: Read All News List */}
            <div className="w-full lg:w-1/3 self-start">
              <div className="flex flex-col gap-4 ">
                {smallPosts.map((post) => (
                  <a
                    key={post._id}
                    href={`http://localhost:5173/news/${post._id}`} // optional link to detail page
                    className="flex gap-4 group hover:bg-gray-100 p-2 rounded-md transition-colors"
                  >
                    <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded">
                      <img
                        src={`http://localhost:4001/Uploads/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="text-xs text-orange-400 font-bold mb-1 block">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <h4 className="font-xs font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="http://localhost:5173/News&Updates"
                  className="block text-right text-lg font-bold text-red-600 hover:text-red-800 transition-colors hover:underline"
                >
                  Read All News &rarr;
                </a>
              </div>
            </div>

            {/* Right Column: Video Section */}
            {/* Right Column: Video Section */}
            <div className="w-full lg:w-1/3 flex flex-col justify-start">
              <div className="relative w-full h-80 bg-gray-900  overflow-hidden shadow-xl flex flex-col justify-end items-center p-6 transition-transform duration-300 hover:scale-[1.02]">
                {/* Thumbnail */}
                <img
                  src="https://img.youtube.com/vi/yP_BQX5cgRs/maxresdefault.jpg"
                  alt="Campus Tour Video"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>

                {/* Play Button */}
                <a
                  href="https://www.youtube.com/watch?v=yP_BQX5cgRs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 flex justify-center items-center group"
                >
                  <div className="w-20 h-20 bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/70 group-hover:scale-110 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#F97316"
                      className="w-12 h-12 ml-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.38 2.79-1.613l11.54 6.348c1.26.767 1.26 3.326 0 4.753L7.29 20.31c-1.261.767-2.79.21-2.79-1.613V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </a>

                {/* Text */}
                <h3 className="text-white text-3xl font-extrabold mb-4 z-30">
                  Campus Tour Video
                </h3>
                <p className="text-white/80 text-lg z-30 text-center">
                  Discover our vibrant facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section
            <section id="contact" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                        <p className="text-xl text-gray-600">We'd love to hear from you. Contact us for admissions or any queries.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                                    <p className="text-gray-600">Plot No. 14, DLF Dilshad Extn. II (Near DLF Toll Plaza) Ghaziabad, Uttar Pradesh – 201011</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                                    <p className="text-gray-600">+91 0120 2611111</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                                    <p className="text-gray-600">aayush.aips@gmail.com</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-sky-500 p-3 rounded-full text-white hover:bg-sky-600 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-pink-600 p-3 rounded-full text-white hover:bg-pink-700 transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-colors">
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h3>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section> */}
      {/* Testimonial Section min-h-screen */}
      <div className="bg-gray-50  font-sans antialiased text-gray-800">
        <section id="testimonial" className="py-12 ">
          <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-4">
            {/* Section Heading */}
            <h2 className="text-4xl font-bold text-gray-800">Testimonials</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 rounded-xl">
              Hear directly from the people who have experienced our exceptional
              service.
            </p>

            {/* Testimonial Slider */}
            <div className="relative mt-12 w-full max-w-7xl mx-auto">
              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-200 focus:outline-none z-10 hidden md:block"
                aria-label="Previous Testimonial Group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-200 focus:outline-none z-10 hidden md:block"
                aria-label="Next Testimonial Group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Testimonial Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ease-in-out">
                {testimonials
                  .slice(currentIndex, currentIndex + 3)
                  .map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="flex flex-col items-center">
                        {/* Profile Image */}
                        <img
                          className="h-30 w-30 rounded-full object-cover border-4 border-indigo-500 shadow-sm"
                          src={testimonial.profileImageUrl}
                          alt={`Profile of ${testimonial.name}`}
                        />

                        {/* Testimonial Quote */}
                        {/* Testimonial Quote */}
                        <blockquote className="mt-6 text-center text-lg font-medium text-gray-700 leading-snug italic">
                          "{testimonial.message}"
                        </blockquote>

                        {/* Author Info */}
                        <div className="mt-4 text-center">
                          <p className="text-xl font-semibold text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-base text-gray-500">
                            {testimonial.title}
                          </p>
                          <p className="text-base text-gray-500">
                            {testimonial.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Subscribe Section */}
      <div className="">
        {/* Subscribe Section */}
        <div className="text-center bg-gray-800 py-12 p-8 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white mb-6 max-w-xl mx-auto">
            Stay updated with the latest news, admission alerts, and career
            guidance directly to your inbox and WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* WhatsApp Input with Icon */}
            <div className="relative w-full sm:w-auto">
              {/* WhatsApp Icon */}
              <span className="absolute inset-y-0 left-3 flex items-center text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6 text-green-500"
                  fill="currentColor"
                >
                  <path d="M256 0C114.624 0 0 114.624 0 256c0 45.248 12.32 87.456 33.824 124.032L0 512l134.496-33.824C168.544 499.68 211.52 512 256 512 397.376 512 512 397.376 512 256S397.376 0 256 0zm0 464c-42.816 0-82.24-11.52-116.48-31.36l-8.48-5.024-79.52 19.36 21.28-77.28-5.504-8.704C59.52 334.496 48 295.168 48 256 48 141.12 141.12 48 256 48s208 93.12 208 208-93.12 208-208 208zm101.76-138.112c-5.568-2.784-32.992-16.288-38.16-18.144-5.152-1.856-8.896-2.784-12.608 2.784-3.712 5.568-14.288 18.144-17.52 21.888-3.168 3.744-6.336 4.192-11.904 1.408-5.568-2.784-23.52-8.64-44.768-27.584-16.544-14.704-27.68-32.8-30.976-38.368-3.2-5.568-.352-8.576 2.432-11.36 2.464-2.464 5.568-6.336 8.352-9.504 2.784-3.168 3.712-5.568 5.568-9.28 1.856-3.744.928-7.04-.464-9.824-1.392-2.784-12.608-30.496-17.248-41.792-4.544-10.944-9.12-9.472-12.608-9.632-3.2-.16-6.912-.192-10.56-.192-3.744 0-9.824 1.408-14.944 7.04s-19.456 19.008-19.456 46.336 19.952 53.824 22.752 57.568c2.784 3.744 38.08 58.176 92.352 81.792 12.896 5.568 22.944 8.896 30.752 11.36 12.928 4.096 24.704 3.52 34.016 2.144 10.4-1.6 32.032-13.072 36.544-25.664 4.544-12.608 4.544-23.36 3.168-25.664-1.376-2.304-5.056-3.744-10.624-6.496z" />
                </svg>
              </span>

              <input
                type="number"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Enter WhatsApp Number"
                className="w-full px-12 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email Input with Icon */}
            <div className="relative w-full sm:w-auto">
              <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 6.5L12 13l9.99-6.5a2 2 0 0 0-1.99-1.5H4a2 2 0 0 0-1.99 1.5z" />
                  <path d="M22 8.5L12 15 2 8.5V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.5z" />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full px-10 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white font-semibold rounded-lg shadow-md"
            >
              Subscribe
            </button>
          </div>

          {/* Error / Success Messages */}
          {error && <p className="text-red-400 mt-4">{error}</p>}
          {success && <p className="text-green-400 mt-4">{success}</p>}
        </div>
      </div>
    </div>
  );
}
