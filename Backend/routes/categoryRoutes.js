import { Router } from "express";
import Category from "../models/Category.js";

const router = Router();

const defaultCategories = [
  {
    categoryId: 'software',
    label: 'Software & Web Development',
    desc: 'Industry-ready software engineering, full stack web development, responsive interface design, and mobile applications.',
    eligibility: '12th / Diploma / BCA / B.Tech / MCA / Graduates / Career Changers',
    activeGrad: 'from-blue-600 to-indigo-600',
    activeShadow: 'shadow-blue-500/30',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/90',
    iconColor: 'text-blue-600',
    headerGrad: 'from-blue-600 via-indigo-600 to-cyan-500'
  },
  {
    categoryId: 'ai-data',
    label: 'AI, Data & Cloud',
    desc: 'Cutting-edge Generative AI, Data Science & Business Intelligence, Cloud DevOps architecture, and Cyber Security defense.',
    eligibility: '12th / Diploma / BCA / B.Tech / B.Sc / Graduates / Working Professionals',
    activeGrad: 'from-purple-600 to-violet-600',
    activeShadow: 'shadow-purple-500/30',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/90',
    iconColor: 'text-purple-600',
    headerGrad: 'from-purple-600 via-violet-600 to-fuchsia-500'
  },
  {
    categoryId: 'design',
    label: 'Design, UI/UX & Media',
    desc: 'Digital product UI/UX with Figma, user research, visual branding with Photoshop/Illustrator, and cinematic video editing.',
    eligibility: '10th / 12th / Diploma / Graduates / Creative Enthusiasts / Design Aspirants',
    activeGrad: 'from-rose-600 to-pink-600',
    activeShadow: 'shadow-rose-500/30',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/90',
    iconColor: 'text-rose-600',
    headerGrad: 'from-rose-600 via-pink-600 to-rose-400'
  },
  {
    categoryId: 'marketing',
    label: 'Digital Marketing & E-Commerce',
    desc: 'End-to-end performance marketing, SEO, Google Ads, Meta advertising, and multi-channel e-commerce store scaling.',
    eligibility: '12th / Graduates / Entrepreneurs / Marketers / Freelancers',
    activeGrad: 'from-amber-500 to-orange-500',
    activeShadow: 'shadow-amber-500/30',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/90',
    iconColor: 'text-amber-600',
    headerGrad: 'from-amber-500 via-orange-500 to-yellow-500'
  },
  {
    categoryId: 'business',
    label: 'Accounting & Business Skills',
    desc: 'Computerized accounting with TallyPrime, GST taxation compliance, banking reconciliation, and Advanced Excel workplace skills.',
    eligibility: '10th / 12th / B.Com / BBA / Non-Commerce / Business Owners / Office Executives',
    activeGrad: 'from-emerald-600 to-teal-600',
    activeShadow: 'shadow-emerald-500/30',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    iconColor: 'text-emerald-600',
    headerGrad: 'from-emerald-600 via-teal-600 to-emerald-400'
  },
  {
    categoryId: 'technical',
    label: 'Technical CAD & IT Support',
    desc: 'Precision AutoCAD 2D/3D engineering drafting, computer hardware troubleshooting, and enterprise network administration.',
    eligibility: 'ITI / Polytechnic / Diploma / B.Tech / 10th–12th with Technical Interest',
    activeGrad: 'from-cyan-600 to-sky-600',
    activeShadow: 'shadow-cyan-500/30',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200/90',
    iconColor: 'text-cyan-600',
    headerGrad: 'from-cyan-600 via-sky-600 to-blue-500'
  },
  {
    categoryId: 'languages',
    label: 'Foreign Languages & Test Prep',
    desc: 'Global language proficiencies in German, French, and Japanese, alongside standardized IELTS and PTE exam preparation.',
    eligibility: 'Open to All Students, Study-Abroad Aspirants, Professionals & Language Enthusiasts',
    activeGrad: 'from-indigo-600 to-blue-700',
    activeShadow: 'shadow-indigo-500/30',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/90',
    iconColor: 'text-indigo-600',
    headerGrad: 'from-indigo-600 via-blue-700 to-violet-600'
  },
  {
    categoryId: 'shortterm',
    label: 'Short-Term & Professional Skills',
    desc: 'Fast-track career-ready certifications: workplace communication, interview readiness, and essential digital productivity skills.',
    eligibility: 'Job Seekers, College Students, Working Professionals & Career Starters',
    activeGrad: 'from-teal-600 to-emerald-600',
    activeShadow: 'shadow-teal-500/30',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200/90',
    iconColor: 'text-teal-600',
    headerGrad: 'from-teal-600 via-emerald-600 to-green-400'
  }
];

// GET /api/categories
router.get("/", async (req, res) => {
  try {
    let categories = await Category.find();
    if (!categories || categories.length === 0) {
      categories = await Category.insertMany(defaultCategories);
    }
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: defaultCategories });
  }
});

// POST /api/categories
router.post("/", async (req, res) => {
  try {
    const { categoryId, label, desc, eligibility } = req.body;
    const cat = new Category({ categoryId, label, desc, eligibility });
    const saved = await cat.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/categories/:categoryId
router.delete("/:categoryId", async (req, res) => {
  try {
    await Category.findOneAndDelete({ categoryId: req.params.categoryId });
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
