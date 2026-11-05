import { Schema, model } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    // Social Media Handles
    socialLinks: {
      facebook: { type: String, default: "https://facebook.com" },
      instagram: { type: String, default: "https://instagram.com" },
      youtube: { type: String, default: "https://youtube.com" },
      linkedin: { type: String, default: "https://linkedin.com" },
      twitter: { type: String, default: "https://twitter.com" },
      whatsapp: { type: String, default: "https://wa.me/919311050670" },
    },
    // Top Bar & Marquee Announcements
    topBar: {
      enabled: { type: Boolean, default: true },
      sinceYear: { type: String, default: "2002" },
      sinceText: { type: String, default: "Since 2002 • 22+ Years of Excellence" },
      admissionsText: { type: String, default: "Admissions Open 2026-27 — New Batches Available" },
      tagline: { type: String, default: "Learn • Build • Grow" },
      placementText: { type: String, default: "100% Placement Support • 500+ Corporate Hiring Partners" },
      liveProjectText: { type: String, default: "🚀 Live Industry Projects & Practical Mentorship" },
      counsellingText: { type: String, default: "🎯 Free Career Counselling & Guidance Daily" },
      phone: { type: String, default: "+91-9311050670" },
      email: { type: String, default: "info@aayushinstitute.com" },
    },
    // Hero Section Configuration
    heroSection: {
      pillText: { type: String, default: "Your Career • Our Commitment" },
      titleLine1: { type: String, default: "Upgrade Your Skills" },
      titleLine2: { type: String, default: "Build a Better Future" },
      subtitle: {
        type: String,
        default: "Aayush Institute of Professional Studies – Your trusted partner in professional education, skill development and career growth."
      },
      sloganLine1: { type: String, default: "Learn" },
      sloganLine2: { type: String, default: "Practice" },
      sloganLine3: { type: String, default: "Get Placed" },
      bgImage: { type: String, default: "/hero_downloaded_bg.png" },
      feature1: { type: String, default: "Industry Aligned Courses" },
      feature2: { type: String, default: "Live Projects & Training" },
      feature3: { type: String, default: "Expert Faculty & Mentorship" },
      feature4: { type: String, default: "100% Career Support" },
      primaryBtnText: { type: String, default: "Explore Courses" },
      primaryBtnLink: { type: String, default: "/Courses" },
      videoBtnText: { type: String, default: "Watch Our Video" },
      videoUrl: { type: String, default: "https://www.youtube.com" },
      counsellingTitle: { type: String, default: "Free Career Counselling" },
      counsellingSubtitle: { type: String, default: "Know the Right Course for You" },
      counsellingPoints: {
        type: [String],
        default: [
          "Personalised Guidance",
          "Course Comparison",
          "Career Roadmap",
          "100% Free Consultation"
        ]
      },
      counsellingBtnText: { type: String, default: "Book Your Counselling" }
    },
    // Quick Services Strip (4 Cards below hero)
    services: [
      {
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
        iconType: { type: String, default: "monitor" },
        iconBg: { type: String, default: "#1e40af" },
        cardBg: { type: String, default: "#f0f6ff" },
        titleColor: { type: String, default: "#0f2b5c" },
        linkColor: { type: String, default: "#1d64ec" },
        linkUrl: { type: String, default: "/Courses" },
      }
    ],
    // Explore Categories (5 Color cards)
    exploreCategories: [
      {
        title: { type: String, default: "" },
        subtitle: { type: String, default: "" },
        to: { type: String, default: "/Courses" },
        iconType: { type: String, default: "code" },
        cardBg: { type: String, default: "from-[#eef6ff] via-[#f5f9ff] to-[#ffffff]" },
        border: { type: String, default: "border-blue-200/90 hover:border-blue-400" },
        topBar: { type: String, default: "from-[#0062ff] to-[#38bdf8]" },
        iconGrad: { type: String, default: "from-[#0052cc] to-[#0ea5e9]" },
        titleColor: { type: String, default: "text-[#002f6c] group-hover:text-[#0052cc]" },
        badgeBg: { type: String, default: "bg-blue-100/90 text-[#0052cc]" },
      }
    ],
    // Dual Promo Banners (University & Live Projects)
    dualPromo: {
      university: {
        badge: { type: String, default: "University Education" },
        title: { type: String, default: "UG & PG University Programs" },
        tagline: { type: String, default: "Study Anytime, Anywhere" },
        desc: { type: String, default: "Pursue your higher education with flexible Online & Distance learning options from reputed universities. Build your degree, boost your career." },
        btnText: { type: String, default: "Explore University Programs" },
        btnLink: { type: String, default: "/UniversityCourses" },
        points: {
          type: [String],
          default: [
            "UG Programs (BA, B.Com, B.Sc, etc.)",
            "PG Programs (MA, M.Com, M.Sc, etc.)",
            "Distance Education",
            "Online Education",
            "Flexible Learning",
            "Recognized & UGC Approved Universities"
          ]
        }
      },
      liveProjects: {
        badge: { type: String, default: "Industry Focused" },
        title: { type: String, default: "Live Projects & Real-World Skills" },
        desc: { type: String, default: "Learn by doing. Work on live projects and build a portfolio that gets you hired." },
        btnText: { type: String, default: "Start Your Journey" },
        btnLink: { type: String, default: "/LiveProject" },
        points: {
          type: [String],
          default: [
            "Real Industry Projects",
            "Expert Mentorship",
            "Latest Tools & Technologies",
            "Build Your Portfolio"
          ]
        },
        image: { type: String, default: "/laptop_live_projects.jpg" }
      }
    },
    // Why Choose Us Section & Modal
    whyChooseUs: {
      subtitle: { type: String, default: "Why Choose Us" },
      title: { type: String, default: "Aayush Institute?" },
      tagline: { type: String, default: "Because your future matters." },
      btnText: { type: String, default: "Why Choose Us" },
      features: [
        {
          line1: { type: String, default: "" },
          line2: { type: String, default: "" },
          iconType: { type: String, default: "users" }
        }
      ],
      modalHeader: {
        badge: { type: String, default: "ESTABLISHED SINCE 2002 • 20+ YEARS OF EXCELLENCE" },
        title: { type: String, default: "WHY CHOOSE US" },
        subtitle: { type: String, default: "More Than Education — A Complete Learning & Career Support Ecosystem" },
        desc: { type: String, default: "At Aayush Institute of Professional Studies, we focus on creating a learning environment that connects education, practical skills, industry exposure and career development." }
      },
      pillars: [
        {
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          badge: { type: String, default: "" },
          iconBg: { type: String, default: "bg-blue-50 text-[#0066ff]" }
        }
      ],
      steps: [
        {
          step: { type: String, default: "01" },
          title: { type: String, default: "Learn" },
          desc: { type: String, default: "Build academic and technical knowledge." }
        }
      ]
    },
    // Our Impact In Numbers (Stats)
    impactNumbers: {
      title: { type: String, default: "Our Impact in Numbers" },
      image: { type: String, default: "/students_campus_impact.png" },
      sloganPart1: { type: String, default: "Learn Today" },
      sloganPart2: { type: String, default: "Lead Tomorrow" },
      stats: [
        {
          iconType: { type: String, default: "cap" },
          value: { type: String, default: "5000+" },
          label: { type: String, default: "Students Trained" }
        },
        {
          iconType: { type: String, default: "users" },
          value: { type: String, default: "200+" },
          label: { type: String, default: "Industry Partners" }
        },
        {
          iconType: { type: String, default: "target" },
          value: { type: String, default: "95%" },
          label: { type: String, default: "Placement Support" }
        },
        {
          iconType: { type: String, default: "award" },
          value: { type: String, default: "15+" },
          label: { type: String, default: "Years of Excellence" }
        }
      ]
    },
    // Quick Contact Info
    contact: {
      address: { type: String, default: "S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006" },
      whatsappNumber: { type: String, default: "+919311050670" },
    },
    // Course Details Modal WhatsApp & QR Enquiry Section
    modalWhatsAppEnquiry: {
      titlePrefix: { type: String, default: "Quick Enquiry on" },
      titleHighlight: { type: String, default: "WhatsApp" },
      subtitle: { type: String, default: "Get instant details about:" },
      checklist: {
        type: [String],
        default: [
          "Course Details",
          "Total Fee",
          "Scholarship / Discounts",
          "Admission Process",
          "Batch Timings",
          "Online / Classroom Mode",
          "Syllabus",
          "Career Guidance"
        ]
      },
      qrImage: { type: String, default: "/whatsapp_qr.png" },
      whatsappNumber: { type: String, default: "+919311050670" },
      buttonText: { type: String, default: "Chat on WhatsApp" },
      prefilledMessage: { type: String, default: "Hi, I would like to inquire about the [Course Name] course." },
      counsellorNote: { type: String, default: "Or click the button to chat directly with our counsellor." }
    }
,
    // About Us Page Data
    aboutUs: {
      hero: {
        badge: { type: String, default: "ABOUT US" },
        title: { type: String, default: "AAYUSH INSTITUTE OF" },
        highlight: { type: String, default: "PROFESSIONAL STUDIES" },
        subtitle: { type: String, default: "Education • Skills • Industry Exposure • Career Development" },
        description: { type: String, default: "Established in 2002, Aayush Institute of Professional Studies is a private education and training institute focused on IT education, professional skill development, university education, and practical learning." }
      },
      overview: {
        badge: { type: String, default: "Two Decades of Dedication" },
        title: { type: String, default: "More than Two Decades Associated with Education and Skill Development" },
        paragraphs: {
          type: [String],
          default: [
            "For more than two decades, the Institute has been associated with education and skill development, supporting students, graduates, working professionals, and career aspirants in developing academic knowledge, technical skills, and professional capabilities.",
            "Our approach combines structured education, practical learning, industry exposure, and career guidance to help learners build relevant skills and make informed decisions about their pathways."
          ]
        }
      },
      journey: [
        {
          year: { type: String },
          title: { type: String },
          desc: { type: String },
          badge: { type: String }
        }
      ],
      pillars: [
        {
          title: { type: String },
          subtitle: { type: String },
          desc: { type: String },
          badge: { type: String },
          points: { type: [String] }
        }
      ],
      visionMission: {
        vision: {
          title: { type: String, default: "Our Vision" },
          desc: { type: String, default: "To contribute to an education ecosystem where learners can access relevant knowledge, practical skills, professional exposure, and informed career guidance to support their long-term development." }
        },
        mission: {
          title: { type: String, default: "Our Mission" },
          points: {
            type: [String],
            default: [
              "Educate: Deliver structured education and technical training.",
              "Develop: Focus on practical skills and professional readiness.",
              "Connect: Connect learners with industry exposure and opportunities.",
              "Progress: Help learners progress in careers and higher education."
            ]
          }
        }
      }
    },

    // Contact Us Page Data
    contactInfo: {
      phone: { type: String, default: "+91-9311050670" },
      altPhone: { type: String, default: "093501 57447" },
      landline: { type: String, default: "0120-2611111" },
      email: { type: String, default: "info@aayushinstitute.com" },
      supportEmail: { type: String, default: "support@aayushinstitute.com" },
      address: { type: String, default: "S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006" },
      landmark: { type: String, default: "Near Dilshad Garden Metro Station" },
      timing: { type: String, default: "Mon – Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 5:00 PM" },
      googleMapsUrl: { type: String, default: "https://www.google.com/search?q=aayush+institute+of+professional+studies" }
    },

    // FAQs (Categorized)
    faqsList: [
      {
        id: { type: String },
        label: { type: String },
        color: { type: String, default: "blue" },
        faqs: [
          {
            q: { type: String },
            a: { type: String }
          }
        ]
      }
    ],

    // Terms & Conditions Page
    termsAndConditions: {
      lastUpdated: { type: String, default: "January 2026" },
      effectiveDate: { type: String, default: "1st January 2026" },
      sections: [
        {
          id: { type: String },
          num: { type: String },
          title: { type: String },
          content: { type: [String] },
          bullets: { type: [String] },
          extra: { type: [String] }
        }
      ]
    },
  },
  { timestamps: true }
);

export default model("SiteSettings", SiteSettingsSchema);
