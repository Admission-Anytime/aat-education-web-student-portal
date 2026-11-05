import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import SiteSettings from "../models/SiteSettings.js";

const router = express.Router();

// Multer storage for hero images
const uploadsDir = path.join(process.cwd(), "Uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `hero_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

export const DEFAULT_SETTINGS = {
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    whatsapp: "https://wa.me/919311050670",
  },
  topBar: {
    enabled: true,
    sinceYear: "2002",
    sinceText: "Since 2002 • 22+ Years of Excellence",
    admissionsText: "Admissions Open 2026-27 — New Batches Available",
    tagline: "Learn • Build • Grow",
    placementText: "100% Placement Support • 500+ Corporate Hiring Partners",
    liveProjectText: "🚀 Live Industry Projects & Practical Mentorship",
    counsellingText: "🎯 Free Career Counselling & Guidance Daily",
    phone: "+91-9311050670",
    email: "info@aayushinstitute.com",
  },
  heroSection: {
    pillText: "Your Career • Our Commitment",
    titleLine1: "Upgrade Your Skills",
    titleLine2: "Build a Better Future",
    subtitle: "Aayush Institute of Professional Studies – Your trusted partner in professional education, skill development and career growth.",
    sloganLine1: "Learn",
    sloganLine2: "Practice",
    sloganLine3: "Get Placed",
    bgImage: "/hero_downloaded_bg.png",
    feature1: "Industry Aligned Courses",
    feature2: "Live Projects & Training",
    feature3: "Expert Faculty & Mentorship",
    feature4: "100% Career Support",
    primaryBtnText: "Explore Courses",
    primaryBtnLink: "/Courses",
    videoBtnText: "Watch Our Video",
    videoUrl: "https://www.youtube.com",
    counsellingTitle: "Free Career Counselling",
    counsellingSubtitle: "Know the Right Course for You",
    counsellingPoints: [
      "Personalised Guidance",
      "Course Comparison",
      "Career Roadmap",
      "100% Free Consultation"
    ],
    counsellingBtnText: "Book Your Counselling"
  },
  services: [
    {
      title: "Professional Computer Courses",
      desc: "Job-oriented training with practical learning.",
      iconType: "monitor",
      iconBg: "#1e40af",
      cardBg: "#f0f6ff",
      titleColor: "#0f2b5c",
      linkColor: "#1d64ec",
      linkUrl: "/Courses"
    },
    {
      title: "Designing Courses",
      desc: "Graphic, Web & UI/UX with real projects.",
      iconType: "pencil",
      iconBg: "#db2777",
      cardBg: "#fdf2f8",
      titleColor: "#831843",
      linkColor: "#db2777",
      linkUrl: "/Courses"
    },
    {
      title: "Development Courses",
      desc: "MERN Stack, Python & more for future-ready skills.",
      iconType: "code",
      iconBg: "#059669",
      cardBg: "#ecfdf5",
      titleColor: "#064e3b",
      linkColor: "#059669",
      linkUrl: "/Courses"
    },
    {
      title: "University Programs",
      desc: "UG & PG through Online & Distance Education.",
      iconType: "graduation",
      iconBg: "#ea580c",
      cardBg: "#fff7ed",
      titleColor: "#7c2d12",
      linkColor: "#ea580c",
      linkUrl: "/UniversityCourses"
    }
  ],
  exploreCategories: [
    {
      title: "Professional Courses",
      subtitle: "Job-Ready Tech Skills",
      to: "/Courses",
      iconType: "code",
      cardBg: "from-[#eef6ff] via-[#f5f9ff] to-[#ffffff]",
      border: "border-blue-200/90 hover:border-blue-400",
      topBar: "from-[#0062ff] to-[#38bdf8]",
      iconGrad: "from-[#0052cc] to-[#0ea5e9]",
      titleColor: "text-[#002f6c] group-hover:text-[#0052cc]",
      badgeBg: "bg-blue-100/90 text-[#0052cc]"
    },
    {
      title: "University Programs",
      subtitle: "UG | PG | Online Degrees",
      to: "/UniversityCourses",
      iconType: "graduation",
      cardBg: "from-[#f0fdf4] via-[#f7fef9] to-[#ffffff]",
      border: "border-emerald-200/90 hover:border-emerald-400",
      topBar: "from-[#059669] to-[#34d399]",
      iconGrad: "from-[#047857] to-[#10b981]",
      titleColor: "text-[#064e3b] group-hover:text-[#047857]",
      badgeBg: "bg-emerald-100/90 text-[#047857]"
    },
    {
      title: "Corporate Training",
      subtitle: "Enterprise & Upskilling",
      to: "/CorporateTraining",
      iconType: "building",
      cardBg: "from-[#fff7ed] via-[#fffaf5] to-[#ffffff]",
      border: "border-orange-200/90 hover:border-orange-400",
      topBar: "from-[#ea580c] to-[#fb923c]",
      iconGrad: "from-[#c2410c] to-[#f97316]",
      titleColor: "text-[#7c2d12] group-hover:text-[#ea580c]",
      badgeBg: "bg-orange-100/90 text-[#c2410c]"
    },
    {
      title: "Live Project Training",
      subtitle: "Real Client Work & Code",
      to: "/LiveProject",
      iconType: "rocket",
      cardBg: "from-[#faf5ff] via-[#fbf7ff] to-[#ffffff]",
      border: "border-purple-200/90 hover:border-purple-400",
      topBar: "from-[#9333ea] to-[#c084fc]",
      iconGrad: "from-[#7e22ce] to-[#a855f7]",
      titleColor: "text-[#3b0764] group-hover:text-[#7e22ce]",
      badgeBg: "bg-purple-100/90 text-[#7e22ce]"
    },
    {
      title: "Placement Support",
      subtitle: "100% Interview Assistance",
      to: "/Placement",
      iconType: "briefcase",
      cardBg: "from-[#fff1f2] via-[#fff7f8] to-[#ffffff]",
      border: "border-rose-200/90 hover:border-rose-400",
      topBar: "from-[#e11d48] to-[#fb7185]",
      iconGrad: "from-[#be123c] to-[#f43f5e]",
      titleColor: "text-[#881337] group-hover:text-[#be123c]",
      badgeBg: "bg-rose-100/90 text-[#be123c]"
    }
  ],
  dualPromo: {
    university: {
      badge: "University Education",
      title: "UG & PG University Programs",
      tagline: "Study Anytime, Anywhere",
      desc: "Pursue your higher education with flexible Online & Distance learning options from reputed universities. Build your degree, boost your career.",
      btnText: "Explore University Programs",
      btnLink: "/UniversityCourses",
      points: [
        "UG Programs (BA, B.Com, B.Sc, etc.)",
        "PG Programs (MA, M.Com, M.Sc, etc.)",
        "Distance Education",
        "Online Education",
        "Flexible Learning",
        "Recognized & UGC Approved Universities"
      ]
    },
    liveProjects: {
      badge: "Industry Focused",
      title: "Live Projects & Real-World Skills",
      desc: "Learn by doing. Work on live projects and build a portfolio that gets you hired.",
      btnText: "Start Your Journey",
      btnLink: "/LiveProject",
      points: [
        "Real Industry Projects",
        "Expert Mentorship",
        "Latest Tools & Technologies",
        "Build Your Portfolio"
      ],
      image: "/laptop_live_projects.jpg"
    }
  },
  whyChooseUs: {
    subtitle: "Why Choose Us",
    title: "Aayush Institute?",
    tagline: "Because your future matters.",
    btnText: "Why Choose Us",
    features: [
      { line1: "Experienced", line2: "Faculty", iconType: "users" },
      { line1: "Hands-on", line2: "Training", iconType: "laptop" },
      { line1: "Industry", line2: "Partnerships", iconType: "handshake" },
      { line1: "Placement", line2: "Support", iconType: "briefcase" },
      { line1: "Flexible", line2: "Learning", iconType: "clock" },
      { line1: "Modern", line2: "Infrastructure", iconType: "building" }
    ],
    modalHeader: {
      badge: "ESTABLISHED SINCE 2002 • 20+ YEARS OF EXCELLENCE",
      title: "WHY CHOOSE US",
      subtitle: "More Than Education — A Complete Learning & Career Support Ecosystem",
      desc: "At Aayush Institute of Professional Studies, we focus on creating a learning environment that connects education, practical skills, industry exposure and career development."
    },
    pillars: [
      {
        title: "ESTABLISHED SINCE 2002",
        desc: "More than two decades of experience in education, IT training, professional courses and higher education support.",
        badge: "20+ Years Legacy",
        iconBg: "bg-blue-50 text-[#0066ff]"
      },
      {
        title: "PRACTICAL & SKILL-BASED LEARNING",
        desc: "Our programmes focus on developing practical knowledge and relevant skills alongside academic learning.",
        badge: "100% Practical",
        iconBg: "bg-emerald-50 text-emerald-600"
      },
      {
        title: "INDUSTRY-ORIENTED TRAINING",
        desc: "Course content and practical activities are designed to help learners understand current workplace requirements and professional practices.",
        badge: "Modern Workflows",
        iconBg: "bg-purple-50 text-purple-600"
      },
      {
        title: "FREE CAREER GUIDANCE",
        desc: "Students can access career guidance sessions at no additional cost and interact with experienced industry professionals and career advisors.",
        badge: "No Additional Cost",
        iconBg: "bg-amber-50 text-amber-600"
      },
      {
        title: "LIVE PROJECT EXPERIENCE",
        desc: "Students can gain practical exposure through structured live projects and project-based learning in relevant technology domains.",
        badge: "Real Applications",
        iconBg: "bg-cyan-50 text-cyan-600"
      },
      {
        title: "INTERNSHIP OPPORTUNITIES",
        desc: "Eligible students may receive opportunities for corporate internships, including paid internship opportunities, subject to company requirements and selection.",
        badge: "Corporate Tie-ups",
        iconBg: "bg-rose-50 text-rose-600"
      },
      {
        title: "UNIVERSITY & DISTANCE EDUCATION",
        desc: "Multiple pathways are available for students and working professionals seeking undergraduate, postgraduate, diploma, certificate and professional programmes.",
        badge: "UGC / DEB Approved",
        iconBg: "bg-indigo-50 text-indigo-600"
      },
      {
        title: "CAREER & PLACEMENT SUPPORT",
        desc: "We help students prepare for employment through resume development, interview preparation, career guidance and relevant recruitment opportunities.",
        badge: "Job Ready",
        iconBg: "bg-teal-50 text-teal-600"
      },
      {
        title: "LEARNING FOR EVERY STAGE",
        desc: "Our programmes support school students, technical learners, graduates, freshers, working professionals and career changers.",
        badge: "For All Learners",
        iconBg: "bg-orange-50 text-orange-600"
      }
    ],
    steps: [
      { step: "01", title: "Learn", desc: "Build academic and technical knowledge." },
      { step: "02", title: "Practice", desc: "Apply concepts through practical training and projects." },
      { step: "03", title: "Experience", desc: "Gain industry exposure through live projects and internship opportunities." },
      { step: "04", title: "Prepare", desc: "Develop professional skills, resumes and interview readiness." },
      { step: "05", title: "Progress", desc: "Move towards higher education, employment or continued professional development." }
    ]
  },
  impactNumbers: {
    title: "Our Impact in Numbers",
    image: "/students_campus_impact.png",
    sloganPart1: "Learn Today",
    sloganPart2: "Lead Tomorrow",
    stats: [
      { iconType: "cap", value: "5000+", label: "Students Trained" },
      { iconType: "users", value: "200+", label: "Industry Partners" },
      { iconType: "target", value: "95%", label: "Placement Support" },
      { iconType: "award", value: "15+", label: "Years of Excellence" }
    ]
  },
  contact: {
    address: "S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006",
    whatsappNumber: "+919311050670",
  },
  modalWhatsAppEnquiry: {
    titlePrefix: "Quick Enquiry on",
    titleHighlight: "WhatsApp",
    subtitle: "Get instant details about:",
    checklist: [
      "Course Details",
      "Total Fee",
      "Scholarship / Discounts",
      "Admission Process",
      "Batch Timings",
      "Online / Classroom Mode",
      "Syllabus",
      "Career Guidance"
    ],
    qrImage: "/whatsapp_qr.png",
    whatsappNumber: "+919311050670",
    buttonText: "Chat on WhatsApp",
    prefilledMessage: "Hi, I would like to inquire about the [Course Name] course.",
    counsellorNote: "Or click the button to chat directly with our counsellor."
  },
  aboutUs: {
    hero: {
      badge: "ABOUT US",
      title: "AAYUSH INSTITUTE OF",
      highlight: "PROFESSIONAL STUDIES",
      subtitle: "Education • Skills • Industry Exposure • Career Development",
      description: "Established in 2002, Aayush Institute of Professional Studies is a private education and training institute focused on IT education, professional skill development, university education, and practical learning."
    },
    overview: {
      badge: "Two Decades of Dedication",
      title: "More than Two Decades Associated with Education and Skill Development",
      paragraphs: [
        "For more than two decades, the Institute has been associated with education and skill development, supporting students, graduates, working professionals, and career aspirants in developing academic knowledge, technical skills, and professional capabilities.",
        "Our approach combines structured education, practical learning, industry exposure, and career guidance to help learners build relevant skills and make informed decisions about their pathways."
      ]
    },
    journey: [
      { year: "2002", title: "Foundation & Genesis", desc: "Started as a dedicated computer education and IT training centre in Ghaziabad.", badge: "Estd. 2002" },
      { year: "2008", title: "Curriculum Expansion & IT Growth", desc: "Introduced advanced computing, desktop publishing, accounting, and financial management tools.", badge: "Growth Phase" },
      { year: "2014", title: "University & Higher Education Partnerships", desc: "Expanded into University, Online, and Distance Education guidance.", badge: "University Tie-ups" },
      { year: "2019", title: "Modern Tech Stacks & Live Projects", desc: "Integrated Python, Web Full Stack, Digital Marketing, and live industrial project tracks.", badge: "Modern Stacks" },
      { year: "2024", title: "Next-Gen Emerging Tech & 100% Career Ecosystem", desc: "Rolled out Artificial Intelligence, Generative AI, Cyber Security, UI/UX, and 100% career placement support.", badge: "AI Ready" },
      { year: "2026", title: "Modern Era & Corporate Operations", desc: "Managed by Atri Admission Anytime Pvt. Ltd., empowering thousands of students across Delhi-NCR.", badge: "Present Day" }
    ],
    pillars: [
      {
        title: "Career-Aligned Courses",
        subtitle: "Industry-Oriented Curriculum",
        desc: "Courses designed around workplace requirements and in-demand skills in software, design, marketing, and business.",
        badge: "Industry Ready",
        points: ["Full-Stack & Web Dev", "AI & Machine Learning", "Digital Marketing & SEO", "Tally & GST Accounting"]
      },
      {
        title: "Practical & Project-Based",
        subtitle: "Hands-on Learning Ecosystem",
        desc: "Real-world project training and hands-on lab work so students graduate with a tangible portfolio.",
        badge: "100% Hands-on",
        points: ["Live Client Projects", "Industry Mentors", "GitHub & Version Control", "Portfolio Building"]
      },
      {
        title: "University & Distance Pathways",
        subtitle: "UGC / DEB Approved Degrees",
        desc: "Flexible pathways for BA, B.Com, B.Sc, BCA, MCA, MBA through recognized universities.",
        badge: "Higher Education",
        points: ["UG & PG Degree Options", "Flexible Weekend Classes", "Approved Universities", "Seamless Credit Transfers"]
      },
      {
        title: "100% Career & Placement Support",
        subtitle: "Dedicated Employment Assistance",
        desc: "End-to-end recruitment assistance, resume crafting, technical interview prep, and corporate drives.",
        badge: "Career First",
        points: ["500+ Hiring Partners", "Resume Building Sessions", "Mock Technical Interviews", "Corporate Referrals"]
      }
    ],
    visionMission: {
      vision: {
        title: "Our Vision",
        desc: "To contribute to an education ecosystem where learners can access relevant knowledge, practical skills, professional exposure, and informed career guidance to support their long-term development."
      },
      mission: {
        title: "Our Mission",
        points: [
          "Educate: Deliver structured education, IT training, and professional learning.",
          "Develop: Focus on practical skills, modern tools, and professional readiness.",
          "Connect: Connect learners with industry exposure, projects, and career pathways.",
          "Progress: Help learners progress in their careers and higher education."
        ]
      }
    }
  },
  contactInfo: {
    phone: "+91-9311050670",
    altPhone: "093501 57447",
    landline: "0120-2611111",
    email: "info@aayushinstitute.com",
    supportEmail: "support@aayushinstitute.com",
    address: "S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006",
    landmark: "Near Dilshad Garden Metro Station",
    timing: "Mon – Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 5:00 PM",
    googleMapsUrl: "https://www.google.com/search?q=aayush+institute+of+professional+studies"
  },
  faqsList: [
    {
      id: "general", label: "About Institute", color: "blue",
      faqs: [
        { q: "What is Aayush Institute of Professional Studies?", a: "Aayush Institute of Professional Studies is a private education and professional training institute established in 2002. It is focused on IT education, professional skill development, university and distance education, practical training, and career-oriented learning." },
        { q: "When was Aayush Institute established?", a: "Aayush Institute of Professional Studies was established in 2002, with a focus on education and professional skill development. It has been associated with education and training for over two decades." },
        { q: "Who currently manages Aayush Institute?", a: "Since 2026, Aayush Institute of Professional Studies is managed and operated by Atri Admission Anytime Private Limited. Prior to 2026, it operated under New Aayush Education Welfare Society." },
        { q: "Where is Aayush Institute located?", a: "Aayush Institute of Professional Studies is located at S-14, DLF Dilshad Extention II, Bhopura, Sahibabad, Ghaziabad, Uttar Pradesh 201006." }
      ]
    },
    {
      id: "courses", label: "Courses & Programmes", color: "indigo",
      faqs: [
        { q: "What types of courses does Aayush Institute offer?", a: "Aayush Institute offers IT & Technology courses, Professional Skills, Short-Term Certifications, Live Project Training, Corporate Training, and University Degree Programmes." },
        { q: "What IT and technology subjects are covered?", a: "Our technology programmes cover: Web Development, Full Stack MERN/Python, AI & Generative AI, Data Analytics, Cyber Security, UI/UX Design, Digital Marketing, and Accounting." },
        { q: "Can I join courses if I am a working professional?", a: "Yes. Flexible weekday morning, evening, and weekend batches are available for working professionals." }
      ]
    },
    {
      id: "university", label: "University Education", color: "purple",
      faqs: [
        { q: "Does Aayush Institute offer University degree programmes?", a: "Aayush Institute provides guidance and support for eligible University, Online and Distance Education programmes offered by recognised UGC-approved Universities." },
        { q: "Who controls admission and examinations for University programmes?", a: "The concerned University remains responsible for admission requirements, eligibility, examinations, certification, and degree awarding." }
      ]
    },
    {
      id: "career", label: "Career & Placement", color: "emerald",
      faqs: [
        { q: "Does Aayush Institute provide career guidance?", a: "Yes. Aayush Institute provides free career guidance and counselling sessions to help students map out their educational and career trajectories." },
        { q: "What placement support does the Institute provide?", a: "We provide resume building, technical and HR mock interviews, soft skills training, and campus interview opportunities with 500+ hiring partners." }
      ]
    },
    {
      id: "fees", label: "Fees & Refund Policy", color: "cyan",
      faqs: [
        { q: "What is the refund policy for Aayush Institute courses?", a: "For Institute-conducted courses, an eligible student may request a refund within 7 calendar days of complete course fee payment, subject to a 10% administrative processing fee." },
        { q: "Are instalment payment options available?", a: "Yes, flexible monthly instalments and scholarships up to 50% are available on merit and early registration." }
      ]
    }
  ],
  termsAndConditions: {
    lastUpdated: "January 2026",
    effectiveDate: "1st January 2026",
    sections: [
      {
        id: "acceptance",
        num: "1",
        title: "Acceptance of Terms",
        content: [
          "By submitting an application, making any payment, accepting admission, attending classes, accessing course content, participating in a project, internship or other Institute service, the student confirms that they have read, understood and agreed to these Terms.",
          "Where a student is below the applicable age of majority, admission and participation shall be subject to the consent and responsibility of the parent/guardian, wherever required.",
          "The Institute may update these Terms from time to time. The version applicable to the student's enrolment or relevant transaction shall apply, subject to applicable law."
        ]
      },
      {
        id: "admission-info",
        num: "2",
        title: "Admission & Student Information",
        content: [
          "Students are required to provide complete, accurate and genuine information at the time of application and admission.",
          "The Institute may request documents or information required for eligibility verification, admission processing, identity verification, and certification."
        ],
        bullets: [
          "Eligibility verification",
          "Admission processing",
          "Identity verification",
          "Academic records",
          "Examination or assessment",
          "Certification",
          "University/third-party enrolment"
        ],
        extra: [
          "The student is responsible for ensuring that all information and documents submitted are accurate, valid and genuine."
        ]
      },
      {
        id: "code-of-conduct",
        num: "3",
        title: "Student Code of Conduct",
        content: [
          "Students are expected to maintain professional conduct and respect Institute staff, faculty, fellow learners, and campus infrastructure.",
          "Any form of harassment, academic dishonesty, unauthorized distribution of course materials, or damage to property will result in immediate disciplinary action."
        ],
        bullets: [
          "Maintain at least 80% attendance in lectures and practical labs",
          "Complete all assignments, tests, and capstone projects on schedule",
          "Respect faculty, peers, and staff without discrimination",
          "Adhere to lab security rules and copyright regulations"
        ]
      },
      {
        id: "refund-policy",
        num: "4",
        title: "Fee Payment & Refund Policy",
        content: [
          "Course fees are payable as per the agreed schedule. For Institute-conducted courses, refund requests received in writing within 7 calendar days of full payment are eligible for refund less 10% administrative deduction.",
          "University registration, examination fees, and third-party certifications are non-refundable once processed."
        ]
      }
    ]
  }
};

/**
 * @route   POST /api/site-settings/upload-hero-image
 * @desc    Upload hero section or impact section image
 */
router.post("/upload-hero-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded" });
  }
  const relativePath = `/Uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: "Image uploaded successfully",
    url: relativePath,
    fullUrl: `http://localhost:4001${relativePath}`,
  });
});

/**
 * @route   POST /api/site-settings/upload-qr-image
 * @desc    Upload QR code image for course modal WhatsApp enquiry
 */
router.post("/upload-qr-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded" });
  }
  const relativePath = `/Uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: "QR Code image uploaded successfully",
    url: relativePath,
    fullUrl: `http://localhost:4001${relativePath}`,
  });
});

/**
 * @route   GET /api/site-settings
 * @desc    Fetch site settings from database (STRICT: fails if DB down)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    } else {
      // Auto-migrate new homepage sections if missing in existing database doc
      let needsSave = false;
      const plain = settings.toObject();

      if (!plain.services || plain.services.length === 0) {
        settings.services = DEFAULT_SETTINGS.services;
        needsSave = true;
      }
      if (!plain.exploreCategories || plain.exploreCategories.length === 0) {
        settings.exploreCategories = DEFAULT_SETTINGS.exploreCategories;
        needsSave = true;
      }
      if (!plain.dualPromo || !plain.dualPromo.university) {
        settings.dualPromo = DEFAULT_SETTINGS.dualPromo;
        needsSave = true;
      }
      if (!plain.whyChooseUs || !plain.whyChooseUs.features || plain.whyChooseUs.features.length === 0) {
        settings.whyChooseUs = DEFAULT_SETTINGS.whyChooseUs;
        needsSave = true;
      }
      if (!plain.impactNumbers || !plain.impactNumbers.stats || plain.impactNumbers.stats.length === 0) {
        settings.impactNumbers = DEFAULT_SETTINGS.impactNumbers;
        needsSave = true;
      }
            if (!plain.aboutUs) {
        settings.aboutUs = DEFAULT_SETTINGS.aboutUs;
        needsSave = true;
      }
      if (!plain.contactInfo) {
        settings.contactInfo = DEFAULT_SETTINGS.contactInfo;
        needsSave = true;
      }
      if (!plain.faqsList || plain.faqsList.length === 0) {
        settings.faqsList = DEFAULT_SETTINGS.faqsList;
        needsSave = true;
      }
      if (!plain.termsAndConditions) {
        settings.termsAndConditions = DEFAULT_SETTINGS.termsAndConditions;
        needsSave = true;
      }
      if (!plain.heroSection) {
        settings.heroSection = DEFAULT_SETTINGS.heroSection;
        needsSave = true;
      }
      if (!plain.modalWhatsAppEnquiry) {
        settings.modalWhatsAppEnquiry = DEFAULT_SETTINGS.modalWhatsAppEnquiry;
        needsSave = true;
      }

      if (needsSave) {
        await settings.save();
      }
    }

    const plain = settings.toObject ? settings.toObject() : settings;
    res.json({
      success: true,
      data: plain,
      ...plain,
    });
  } catch (err) {
    console.error("Error fetching site settings from DB:", err);
    // STRICT RULE: If database connection fails, return 500 error without fake mock data!
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: err.message,
    });
  }
});

/**
 * @route   PUT /api/site-settings
 * @desc    Update or create site settings and homepage sections
 * @access  Public / Admin
 */
router.put("/", async (req, res) => {
  try {
    const {
      socialLinks,
      topBar,
      heroSection,
      services,
      exploreCategories,
      dualPromo,
      whyChooseUs,
      impactNumbers,
      contact,
      modalWhatsAppEnquiry,
    } = req.body;

    let settings = await SiteSettings.findOne();

    if (settings) {
      if (socialLinks) settings.socialLinks = { ...settings.socialLinks, ...socialLinks };
      if (topBar) settings.topBar = { ...settings.topBar, ...topBar };
      if (heroSection) {
        settings.heroSection = {
          ...(settings.heroSection?.toObject?.() || settings.heroSection || DEFAULT_SETTINGS.heroSection),
          ...heroSection,
        };
      }
      if (services) settings.services = services;
      if (exploreCategories) settings.exploreCategories = exploreCategories;
      if (dualPromo) {
        settings.dualPromo = {
          ...(settings.dualPromo?.toObject?.() || settings.dualPromo || DEFAULT_SETTINGS.dualPromo),
          ...dualPromo,
        };
      }
      if (whyChooseUs) {
        settings.whyChooseUs = {
          ...(settings.whyChooseUs?.toObject?.() || settings.whyChooseUs || DEFAULT_SETTINGS.whyChooseUs),
          ...whyChooseUs,
        };
      }
      if (impactNumbers) {
        settings.impactNumbers = {
          ...(settings.impactNumbers?.toObject?.() || settings.impactNumbers || DEFAULT_SETTINGS.impactNumbers),
          ...impactNumbers,
        };
      }
      if (contact) settings.contact = { ...settings.contact, ...contact };
      if (modalWhatsAppEnquiry) {
        settings.modalWhatsAppEnquiry = {
          ...(settings.modalWhatsAppEnquiry?.toObject?.() || settings.modalWhatsAppEnquiry || DEFAULT_SETTINGS.modalWhatsAppEnquiry),
          ...modalWhatsAppEnquiry,
        };
      }
      await settings.save();
    } else {
      settings = await SiteSettings.create({
        ...DEFAULT_SETTINGS,
        ...(socialLinks && { socialLinks }),
        ...(topBar && { topBar }),
        ...(heroSection && { heroSection }),
        ...(services && { services }),
        ...(exploreCategories && { exploreCategories }),
        ...(dualPromo && { dualPromo }),
        ...(whyChooseUs && { whyChooseUs }),
        ...(impactNumbers && { impactNumbers }),
        ...(contact && { contact }),
        ...(modalWhatsAppEnquiry && { modalWhatsAppEnquiry }),
      });
    }

    const plain = settings.toObject ? settings.toObject() : settings;
    res.json({
      success: true,
      message: "Site settings updated successfully!",
      settings: plain,
      data: plain,
      ...plain,
    });
  } catch (err) {
    console.error("Error updating site settings:", err);
    res.status(500).json({ success: false, message: "Failed to update site settings", error: err.message });
  }
});

/**
 * @route   POST /api/site-settings/reset
 * @desc    Reset settings back to defaults
 * @access  Admin
 */
router.post("/reset", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      settings.socialLinks = DEFAULT_SETTINGS.socialLinks;
      settings.topBar = DEFAULT_SETTINGS.topBar;
      settings.heroSection = DEFAULT_SETTINGS.heroSection;
      settings.services = DEFAULT_SETTINGS.services;
      settings.exploreCategories = DEFAULT_SETTINGS.exploreCategories;
      settings.dualPromo = DEFAULT_SETTINGS.dualPromo;
      settings.whyChooseUs = DEFAULT_SETTINGS.whyChooseUs;
      settings.impactNumbers = DEFAULT_SETTINGS.impactNumbers;
      settings.contact = DEFAULT_SETTINGS.contact;
      settings.modalWhatsAppEnquiry = DEFAULT_SETTINGS.modalWhatsAppEnquiry;
      await settings.save();
    } else {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }
    res.json({ success: true, message: "Reset to default institute settings!", settings });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset settings", error: err.message });
  }
});

export default router;
