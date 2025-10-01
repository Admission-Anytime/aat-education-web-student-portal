import express from "express";
import Institute from "../models/Institute.js";
const router = express.Router();
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Must import this




/* Define __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/

 

// Multer config (store files on disk in Uploads folder)
//  absolute storage path
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



// @route   POST /api/institute
// API to save institute info
// Create / Save Institute
// Setup multer for file upload


// GET all institutes
router.get("/", async (req, res) => {
  const institutes = await Institute.find();
  res.json(institutes);
});

// PUT route to update institute info
router.put("/", upload.single("logo"), async (req, res) => {
  try {
    const institutes = await Institute.find(); // assuming only 1 record
    let institute;
    if (institutes.length > 0) {
      institute = institutes[0];
      institute.name = req.body.name;
      institute.about = req.body.about;
      //if (req.file) institute.logo = req.file.path;//save full path
      if (req.file) institute.logo = req.file.filename;// Save only filename
      await institute.save();
    } else {
      institute = await Institute.create({
        name: req.body.name,
        about: req.body.about,
        logo: req.file ? req.file.filename : "", // ✅ filename only
      });
    }
    res.json(institute);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// Update Institute info

export default router;
