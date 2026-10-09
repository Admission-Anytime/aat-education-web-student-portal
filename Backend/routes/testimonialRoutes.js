import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Testimonial from "../models/testimonial.js";

const router = express.Router();

// Ensure Uploads directory exists
const uploadsDir = path.resolve("Uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 📂 Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `testimonial_${Date.now()}_${cleanName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export const DEFAULT_TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    designation: "Full Stack Development Student",
    message:
      "Aayush Institute helped me build my technical skills and got placed in a leading IT company. The faculty and support team are excellent!",
    profileImage: "/rahul_sharma_avatar.jpg",
    rating: 5,
    displayOrder: 1,
    visible: true,
  },
  {
    name: "Priya Verma",
    designation: "UI/UX & Frontend Student",
    message:
      "The practical training and real-time live projects gave me immense confidence. I secured multiple job offers before finishing my course!",
    profileImage: "/priya_verma_avatar.jpg",
    rating: 5,
    displayOrder: 2,
    visible: true,
  },
  {
    name: "Aman Gupta",
    designation: "Python & Data Science Graduate",
    message:
      "Dedicated mentors and personal doubt clearing sessions made learning programming so straightforward. Truly best career institute!",
    profileImage: "/aman_gupta_avatar.jpg",
    rating: 5,
    displayOrder: 3,
    visible: true,
  },
  {
    name: "Sneha Patel",
    designation: "Digital Marketing & SEO Student",
    message:
      "From career counselling to final campus placement, the faculty guided me at every step. Thank you Aayush Institute for shaping my career!",
    profileImage: "/sneha_patel_avatar.jpg",
    rating: 5,
    displayOrder: 4,
    visible: true,
  },
];

// Helper to normalize image URL
function normalizeImageUrl(img) {
  if (!img) return "/rahul_sharma_avatar.jpg";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:") || img.startsWith("blob:")) return img;
  if (img.startsWith("/Uploads/") || img.startsWith("/uploads/")) return img;
  if (img.startsWith("Uploads/") || img.startsWith("uploads/")) return `/${img}`;
  if (img.startsWith("/")) return img;
  return `/Uploads/${img}`;
}

// 🟢 GET ALL TESTIMONIALS (Auto-seeds if collection is empty)
router.get("/", async (req, res) => {
  try {
    let testimonials = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 });

    // If completely empty, auto-seed defaults so admin & user have immediate data
    if (testimonials.length === 0) {
      try {
        testimonials = await Testimonial.insertMany(DEFAULT_TESTIMONIALS);
      } catch (seedErr) {
        console.warn("Auto-seed warning:", seedErr);
      }
    }

    const formatted = testimonials.map((t) => {
      const obj = t.toObject();
      const normUrl = normalizeImageUrl(obj.profileImage);
      return {
        ...obj,
        profileImageUrl: normUrl,
        avatar: normUrl,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🟢 SEED / RESTORE DEFAULT TESTIMONIALS
router.post("/seed", async (req, res) => {
  try {
    const { overwrite = false } = req.body;
    if (overwrite) {
      await Testimonial.deleteMany({});
    }

    const inserted = await Testimonial.insertMany(DEFAULT_TESTIMONIALS);
    res.json({
      message: "Default testimonials seeded successfully!",
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.error("Seed testimonials error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🟢 REORDER TESTIMONIALS
router.put("/reorder", async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "items array is required" });
    }

    const updates = items.map((item) =>
      Testimonial.findByIdAndUpdate(item.id || item._id, {
        displayOrder: item.displayOrder,
      })
    );
    await Promise.all(updates);

    res.json({ message: "Testimonials reordered successfully" });
  } catch (error) {
    console.error("Reorder error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🟢 CREATE TESTIMONIAL
router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    const {
      name,
      designation,
      message,
      rating = 5,
      displayOrder = 0,
      visible = true,
      profileImageUrl = "",
    } = req.body;

    if (!name || !designation || !message) {
      return res.status(400).json({ error: "Name, designation, and message are required." });
    }

    let finalImage = "";
    if (req.file) {
      finalImage = `/Uploads/${req.file.filename}`;
    } else if (profileImageUrl && profileImageUrl.trim()) {
      finalImage = profileImageUrl.trim();
    } else if (req.body.profileImage && req.body.profileImage.trim()) {
      finalImage = req.body.profileImage.trim();
    } else {
      finalImage = "/rahul_sharma_avatar.jpg";
    }

    const count = await Testimonial.countDocuments();

    const testimonial = new Testimonial({
      name: name.trim(),
      designation: designation.trim(),
      message: message.trim(),
      rating: Number(rating) || 5,
      displayOrder: Number(displayOrder) || count + 1,
      visible: visible === "true" || visible === true,
      profileImage: finalImage,
    });

    await testimonial.save();

    const resObj = testimonial.toObject();
    resObj.profileImageUrl = normalizeImageUrl(resObj.profileImage);
    resObj.avatar = resObj.profileImageUrl;

    res.status(201).json(resObj);
  } catch (err) {
    console.error("Create testimonial error:", err);
    res.status(400).json({ error: err.message });
  }
});

// 🟢 UPDATE TESTIMONIAL
router.put("/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const {
      name,
      designation,
      message,
      rating,
      displayOrder,
      visible,
      profileImageUrl,
    } = req.body;

    const existing = await Testimonial.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (designation !== undefined) updateFields.designation = designation.trim();
    if (message !== undefined) updateFields.message = message.trim();
    if (rating !== undefined) updateFields.rating = Number(rating) || 5;
    if (displayOrder !== undefined) updateFields.displayOrder = Number(displayOrder);
    if (visible !== undefined) updateFields.visible = visible === "true" || visible === true;

    if (req.file) {
      updateFields.profileImage = `/Uploads/${req.file.filename}`;
    } else if (profileImageUrl && profileImageUrl.trim()) {
      updateFields.profileImage = profileImageUrl.trim();
    } else if (req.body.profileImage && req.body.profileImage.trim()) {
      updateFields.profileImage = req.body.profileImage.trim();
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    const resObj = updated.toObject();
    resObj.profileImageUrl = normalizeImageUrl(resObj.profileImage);
    resObj.avatar = resObj.profileImageUrl;

    res.json(resObj);
  } catch (error) {
    console.error("Update testimonial error:", error);
    res.status(400).json({ error: error.message });
  }
});

// 🟢 DELETE TESTIMONIAL
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json({ message: "Testimonial deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
