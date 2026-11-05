import express from "express";
import Footer from "../models/Footer.js";

const router = express.Router();

export const DEFAULT_FOOTER = {
  mainLinks: [
    { text: "About us", href: "/AboutUs" },
    { text: "Contact us", href: "/ContactUs" },
    { text: "Terms and Conditions", href: "/terms" },
    { text: "Blog", href: "/blogs" },
    { text: "Admission", href: "/admission" },
    { text: "Career", href: "/Placement" },
    { text: "FAQs", href: "/FAQ" }
  ],
  sections: [
    {
      title: "Popular Course",
      links: [
        { text: "IT & Stack Development", href: "/it-stack-development" },
        { text: "Web Development", href: "/web-development" },
        { text: "App Development", href: "/app-development" },
        { text: "Python Programming", href: "/python-programming" },
        { text: "UI/UX Design", href: "/ui-ux-design" },
        { text: "Digital Marketing", href: "/digital-marketing" },
        { text: "Tally & Accounting", href: "/tally-accounting" }
      ],
      order: 1
    },
    {
      title: "Admission",
      links: [
        { text: "After 10th", href: "/admission" },
        { text: "After 12th", href: "/admission" },
        { text: "Graduation", href: "/admission" },
        { text: "LEET Programs", href: "/UniversityCourses" },
        { text: "Dual Degree Programs", href: "/UniversityCourses" },
        { text: "Scholarship", href: "/admission" },
        { text: "Education Loan", href: "/ContactUs" }
      ],
      order: 2
    },
    {
      title: "Career After",
      links: [
        { text: "12th PCM", href: "/Placement" },
        { text: "12th PCB", href: "/Placement" },
        { text: "12th Management", href: "/Placement" },
        { text: "12th Arts and Humanities", href: "/Placement" },
        { text: "12th Commerce", href: "/Placement" },
        { text: "Top Paramedical Courses", href: "/Placement" },
        { text: "Vocational Course", href: "/Placement" }
      ],
      order: 3
    },
    {
      title: "Best Career Options",
      links: [
        { text: "NEET-UG 2026", href: "/UniversityCourses" },
        { text: "JEE Main 2026", href: "/UniversityCourses" },
        { text: "JEE Advance 2026", href: "/UniversityCourses" },
        { text: "UG CLAT 2026", href: "/UniversityCourses" },
        { text: "CUET 2026", href: "/UniversityCourses" },
        { text: "CAT 2026", href: "/UniversityCourses" },
        { text: "GGS IPU CET 2026", href: "/UniversityCourses" }
      ],
      order: 4
    }
  ],
  copyrightText: "Aayush Institute of Professional Studies. All Rights Reserved."
};

/**
 * @desc Get footer data from MongoDB
 * @route GET /api/footer
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create(DEFAULT_FOOTER);
    }
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

/**
 * @desc Create or save footer
 * @route POST /api/footer
 * @access Admin
 */
router.post("/", async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (footer) {
      footer.mainLinks = req.body.mainLinks || footer.mainLinks;
      footer.sections = req.body.sections || footer.sections;
      footer.copyrightText = req.body.copyrightText || footer.copyrightText;
      await footer.save();
      return res.json(footer);
    }
    const newFooter = new Footer(req.body);
    await newFooter.save();
    res.status(201).json(newFooter);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
});

/**
 * @desc Update footer (replace content)
 * @route PUT /api/footer/:id
 * @access Admin
 */
router.put("/:id", async (req, res) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!footer) return res.status(404).json({ message: "Footer not found" });
    res.json(footer);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
});

/**
 * @desc Delete footer
 * @route DELETE /api/footer/:id
 * @access Admin
 */
router.delete("/:id", async (req, res) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) return res.status(404).json({ message: "Footer not found" });
    res.json({ message: "Footer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
