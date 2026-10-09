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
      counsellorNote: { type: String, default: "Or click the button to chat directly with our counsellor." }
    }
  },
  { timestamps: true }
);

export default model("SiteSettings", SiteSettingsSchema);
