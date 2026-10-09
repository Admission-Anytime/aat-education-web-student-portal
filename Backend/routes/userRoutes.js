import { Router } from "express";
import User from "../models/User.js";
import multer from "multer";
import path from "path";

const router = Router();

// Multer storage for faculty photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `faculty-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Upload faculty image
router.post("/upload-photo", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No photo file provided" });
    }
    const photoUrl = `/Uploads/${req.file.filename}`;
    res.json({ success: true, url: photoUrl, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/users (100% Pure Real-time Dynamic from MongoDB)
router.get("/", async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role && role !== "all" ? { role } : {};
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/users/clear-all (Clear all staff or alumni records)
router.delete("/clear-all", async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role && role !== "all" ? { role } : { role: { $in: ["staff", "alumni"] } };
    const result = await User.deleteMany(filter);
    res.json({ success: true, message: `Removed ${result.deletedCount} members`, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      phone,
      department,
      course,
      memberId,
      batch,
      company,
      status,
      password,
      designation,
      qualification,
      experience,
      bio,
      image,
    } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Member name is required" });
    }

    const targetEmail = (email && email.trim())
      ? email.trim().toLowerCase()
      : `${(name || "staff").toLowerCase().replace(/[^a-z0-9]/g, "")}.${Date.now()}@aayushinstitute.com`;

    const existing = await User.findOne({ email: targetEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: "A member with this email already exists" });
    }

    const genId = memberId || (
      role === "staff" ? `STF-${Math.floor(100 + Math.random() * 900)}` :
      role === "alumni" ? `ALM-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}` :
      `AAY-${Math.floor(1000 + Math.random() * 9000)}`
    );

    const newUser = new User({
      name: name.trim(),
      email: targetEmail,
      role: role || "staff",
      phone,
      department: department || "Academic Faculty",
      course,
      memberId: genId,
      batch,
      company,
      designation: designation || (role === "staff" ? "Faculty Instructor" : undefined),
      qualification,
      experience,
      bio,
      image,
      status: status || "active",
      password: password || "password123",
      isApproved: status === "active" || role === "staff",
    });

    const saved = await newUser.save();
    res.status(201).json({ success: true, message: "Member created successfully", data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Baseline faculty data for one-click initial seeding
const baselineFacultyList = [
  {
    name: "Dr. Alok Kumar Verma",
    designation: "Head of Technology & MERN Mentor",
    department: "Software & Web Development",
    course: "Full Stack Development (MERN), Next.js, Node.js",
    qualification: "M.Tech (Computer Science), Ph.D.",
    experience: "14+ Years Industry & Academic Exp.",
    email: "alok.verma@aayushinstitute.com",
    phone: "+91-9311050670",
    bio: "Ex-Corporate Technical Lead with over a decade of experience designing scalable web architectures. Has mentored 6,000+ engineers now working in leading MNCs and high-growth tech startups.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    role: "staff",
    status: "active"
  },
  {
    name: "Er. Priya Sharma",
    designation: "Lead AI & Python Faculty",
    department: "AI & Data Science",
    course: "Python Programming, Machine Learning, Generative AI",
    qualification: "B.Tech (CS), IBM Certified AI Specialist",
    experience: "9+ Years Teaching & Research",
    email: "priya.sharma@aayushinstitute.com",
    phone: "+91-9311050670",
    bio: "Specializes in modern Artificial Intelligence, automation scripts, and Deep Learning models. Dedicated to simplifying algorithmic concepts into hands-on live code exercises.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    role: "staff",
    status: "active"
  },
  {
    name: "Dr. Rajiv Nambiar",
    designation: "Chief Data Science & Cloud Mentor",
    department: "Cloud Computing & DevOps",
    course: "AWS Solutions Architect, Docker, Kubernetes, CI/CD",
    qualification: "Ph.D. in Computer Engineering",
    experience: "16+ Years Cloud Architect",
    email: "rajiv.nambiar@aayushinstitute.com",
    phone: "+91-9311050670",
    bio: "Certified AWS Senior Cloud Architect and DevOps practitioner who has trained corporate engineering teams across India, Dubai, and Singapore on enterprise resilience.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    role: "staff",
    status: "active"
  },
  {
    name: "Prof. Ananya Sengupta",
    designation: "Senior UI/UX & Web Design Lead",
    department: "UI/UX & Product Design",
    course: "Figma UI/UX, Design Systems, TailwindCSS, Frontend",
    qualification: "M.Des (Human-Computer Interaction)",
    experience: "11+ Years Product Design Lead",
    email: "ananya.sengupta@aayushinstitute.com",
    phone: "+91-9311050670",
    bio: "Passionate about human-centered design, accessibility, and micro-interactions. Conducts live design critiques and Portfolio sprint bootcamps for student placements.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    role: "staff",
    status: "active"
  },
  {
    name: "Vikash Tiwari",
    designation: "Digital Marketing & SEO Director",
    department: "Digital Marketing",
    course: "SEO, Performance Marketing, Meta Ads, Google Analytics",
    qualification: "MBA (Marketing), Google & Meta Certified",
    experience: "8+ Years Growth Consultant",
    email: "vikash.tiwari@aayushinstitute.com",
    phone: "+91-9311050670",
    bio: "Managed ₹5Cr+ in performance marketing campaigns for e-commerce and ed-tech brands. Emphasizes ROAS optimization, data attribution, and real live campaigns in class.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    role: "staff",
    status: "active"
  },
  {
    name: "Meera Saxena",
    designation: "Head of Financial Accounting & Tally Prime",
    department: "Accounting & Finance",
    course: "Tally Prime, GST Filing, TDS, Advanced Excel & MIS",
    qualification: "M.Com, Certified Tally Gold Professional",
    experience: "10+ Years Corporate Accounting",
    email: "meera.saxena@aayushinstitute.com",
    phone: "+91-9311050670",
    bio: "Senior corporate accounting consultant preparing students for real-world balance sheet auditing, e-invoicing workflows, and practical income tax filings.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    role: "staff",
    status: "active"
  }
];

// POST /api/users/seed-faculty
router.post("/seed-faculty", async (req, res) => {
  try {
    let inserted = 0;
    for (const fac of baselineFacultyList) {
      const exists = await User.findOne({ email: fac.email });
      if (!exists) {
        await User.create({
          ...fac,
          memberId: `STF-${Math.floor(100 + Math.random() * 900)}`,
          password: "password123",
          isApproved: true
        });
        inserted++;
      }
    }
    const allStaff = await User.find({ role: "staff" }).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: `Seeded ${inserted} baseline faculty members into MongoDB`,
      data: allStaff
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const updatePayload = { ...req.body };
    if (updatePayload.status === "active") {
      updatePayload.isApproved = true;
      updatePayload.approvedAt = new Date();
      updatePayload.approvedBy = "Super Admin";
    } else if (updatePayload.status === "inactive" || updatePayload.status === "pending") {
      updatePayload.isApproved = false;
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "Member updated successfully", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// SEED /api/users/seed
router.get("/seed", async (req, res) => {
  try {
    if (req.query.force) {
      await User.deleteMany({});
    }
    const inserted = await User.insertMany(initialMembers);
    res.json({ success: true, message: `Seeded ${inserted.length} members`, data: inserted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
