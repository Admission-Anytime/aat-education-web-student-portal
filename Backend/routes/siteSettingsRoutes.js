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

const DEFAULT_SETTINGS = {
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
    counsellorNote: "Or click the button to chat directly with our counsellor."
  }
};

/**
 * @route   POST /api/site-settings/upload-hero-image
 * @desc    Upload hero section image
 */
router.post("/upload-hero-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded" });
  }
  const relativePath = `/Uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: "Hero image uploaded successfully",
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
 * @desc    Fetch site settings, social handles and top bar configuration
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }
    const plain = settings.toObject ? settings.toObject() : settings;
    // ensure heroSection fallback if missing in older document
    if (!plain.heroSection) {
      plain.heroSection = DEFAULT_SETTINGS.heroSection;
    }
    if (!plain.modalWhatsAppEnquiry) {
      plain.modalWhatsAppEnquiry = DEFAULT_SETTINGS.modalWhatsAppEnquiry;
    }
    res.json({
      success: true,
      data: plain,
      ...plain,
    });
  } catch (err) {
    console.error("Error fetching site settings:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      data: DEFAULT_SETTINGS,
      ...DEFAULT_SETTINGS,
    });
  }
});

/**
 * @route   PUT /api/site-settings
 * @desc    Update or create site settings, social handles, and hero section
 * @access  Public / Admin
 */
router.put("/", async (req, res) => {
  try {
    const { socialLinks, topBar, heroSection, contact, modalWhatsAppEnquiry } = req.body;
    let settings = await SiteSettings.findOne();

    if (settings) {
      if (socialLinks) settings.socialLinks = { ...settings.socialLinks, ...socialLinks };
      if (topBar) settings.topBar = { ...settings.topBar, ...topBar };
      if (heroSection) settings.heroSection = { ...(settings.heroSection?.toObject?.() || settings.heroSection || DEFAULT_SETTINGS.heroSection), ...heroSection };
      if (contact) settings.contact = { ...settings.contact, ...contact };
      if (modalWhatsAppEnquiry) {
        settings.modalWhatsAppEnquiry = {
          ...(settings.modalWhatsAppEnquiry?.toObject?.() || settings.modalWhatsAppEnquiry || DEFAULT_SETTINGS.modalWhatsAppEnquiry),
          ...modalWhatsAppEnquiry
        };
      }
      await settings.save();
    } else {
      settings = await SiteSettings.create({
        socialLinks: { ...DEFAULT_SETTINGS.socialLinks, ...(socialLinks || {}) },
        topBar: { ...DEFAULT_SETTINGS.topBar, ...(topBar || {}) },
        heroSection: { ...DEFAULT_SETTINGS.heroSection, ...(heroSection || {}) },
        contact: { ...DEFAULT_SETTINGS.contact, ...(contact || {}) },
        modalWhatsAppEnquiry: { ...DEFAULT_SETTINGS.modalWhatsAppEnquiry, ...(modalWhatsAppEnquiry || {}) },
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
 * @desc    Reset settings back to Institute defaults
 * @access  Admin
 */
router.post("/reset", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      settings.socialLinks = DEFAULT_SETTINGS.socialLinks;
      settings.topBar = DEFAULT_SETTINGS.topBar;
      settings.heroSection = DEFAULT_SETTINGS.heroSection;
      settings.contact = DEFAULT_SETTINGS.contact;
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
