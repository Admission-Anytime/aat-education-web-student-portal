import express from "express";
import About from "../models/aboutsectionModel.js";

const router = express.Router();

// ✅ Save About Section (Create / Update)
router.post("/", async (req, res) => {
  try {
    const { heading, description, statistics } = req.body;

    // Either create a new or update existing (only one about section)
    let about = await About.findOne();
    if (about) {
      about.heading = heading;
      about.description = description;
      about.statistics = statistics;
      await about.save();
    } else {
      about = new About({ heading, description, statistics });
      await about.save();
    }

    res.json({ success: true, message: "About section saved!", about });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get About Section
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// Update About
// PUT About
router.put("/", async (req, res) => {
  try {
    const { heading, description, statistics } = req.body;

    const about = await About.findOneAndUpdate(
      {},
      { heading, description, statistics },
      { new: true, upsert: true }
    );

    res.json(about);
  } catch (err) {
    res.status(500).json({ error: "Failed to update about data" });
  }
});


export default router;
