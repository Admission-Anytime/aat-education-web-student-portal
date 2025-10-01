import express from "express";
import Carousel from "../models/carousel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Must import this




// Define __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();


// Multer config (store files on disk in Uploads folder)
// ✅ absolute storage path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "Uploads"); 
    console.log("Saving file to:", uploadPath); // DEBUG
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage });



/**
 * -------------------------------
 * CRUD Routes for Carousel
 * -------------------------------
 */


// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Carousel.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// Create new carousel item with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, visible } = req.body;
    const imagename = req.file.filename; // Multer saves the file here

    const newCarousel = new Carousel({
      imagename,
      title,
      description,
      visible: visible !== undefined ? visible : true
    });

    await newCarousel.save();
    res.status(201).json(newCarousel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading image" });
  }
});


// Update item
// Update Carousel item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, visible, imagename } = req.body;
    let updateData = { title, description, visible };

    // Handle image upload
    if (req.file) {
      updateData.imagename = req.file.filename; // or originalname depending on your storage
    } else if (imagename) {
      updateData.imagename = imagename; // keep existing name if no new file
    }

    const updatedItem = await Carousel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating carousel item" });
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Carousel.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Toggle visibility
router.patch("/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Carousel.findById(id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.visible = !item.visible;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});











export default router;
