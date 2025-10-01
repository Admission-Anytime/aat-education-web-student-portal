import express from "express";
 import multer from "multer";
import path from "path";
import News from "../models/news.js"; // Your Mongoose model

const router = express.Router();

// ==================== MULTER SETUP ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/"); // Save images in /Uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });


// ==================== ROUTES ====================

// GET all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single news by ID
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News article not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new news article
router.post("/", upload.single("image"), async (req, res) => {
  const { title, excerpt, content, category, date, featured, readTime } = req.body;

  const newNews = new News({
    title,
    excerpt,
    content,
    category,
    date,
    image: req.file ? req.file.filename : null,
    featured,
    readTime
  });

  try {
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a news article by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename; // Update image if new file uploaded
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedNews) return res.status(404).json({ message: "News article not found" });
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a news article by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: "News article not found" });
    res.json({ message: "News article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PATCH /api/news/:id/toggle
// Toggle visibility
router.patch("/:id/toggle-visibility", async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.visible = !article.visible;
    await article.save();

    res.json(article);
  } catch (error) {
    console.error("Error toggling visibility:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
