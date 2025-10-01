import express from "express";
import multer from "multer";
import path from "path";
import News from "../models/newsupdate.js";

const router = express.Router();

// Multer config for storing images in /Uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/"); // folder must exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }); // <-- Multer instance

// POST /api/news
router.post("/", upload.single("newsImage"), async (req, res) => {
  try {
    const { serialNumber, newsTitle, newsLink, videoTitle, videoLink } = req.body;

    console.log("req.body:", req.body);
    console.log("req.file:", req.file); // should log file info

    const newNews = new News({
      serialNumber,
      newsTitle,
      newsLink,
      videoTitle,
      videoLink,
      newsImage: req.file ? req.file.filename : null,
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//  Get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ serialNumber: 1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get single news by ID
router.get("/:id", async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: "News not found" });
    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add news with image upload


// Update news (with optional image update)
router.put("/:id", upload.single("newsImage"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.newsImage = req.file.filename;

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedNews) return res.status(404).json({ message: "News not found" });
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete news
// DELETE news by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
