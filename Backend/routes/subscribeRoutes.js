import express from "express";
import Subscriber from "../models/subscribe.js"

const router = express.Router();

 // ✅ Add subscriber
router.post("/", async (req, res) => {
  try {
    const { whatsapp, email } = req.body;

    // Basic validation
    if (!whatsapp || !email) {
      return res.status(400).json({ message: "WhatsApp and Email are required" });
    }

    // Regex validation
    const whatsappRegex = /^[0-9]{10}$/;
    if (!whatsappRegex.test(whatsapp)) {
      return res.status(400).json({ message: "Invalid WhatsApp number (must be 10 digits)" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email address" });
    }

    // Save subscriber
    const newSubscriber = new Subscriber({ whatsapp, email });
    await newSubscriber.save();

    res.status(200).json({ message: "Subscription successful!" });
  } catch (err) {
    // ✅ Handle duplicate key error (E11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // e.g. 'email' or 'whatsapp'
      return res.status(400).json({ message: `This ${field} is already subscribed.` });
    }

    console.error("Subscription error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// ✅ Get all subscribers (for Admin Panel view)
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete a subscriber
router.delete("/:id", async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Update a subscriber
router.put("/:id", async (req, res) => {
  try {
    const { whatsapp, email } = req.body;

    if (!whatsapp || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists for another subscriber
    const existing = await Subscriber.findOne({ email, _id: { $ne: req.params.id } });
    if (existing) {
      return res.status(400).json({ message: "Another subscriber already uses this email" });
    }

    const updatedSubscriber = await Subscriber.findByIdAndUpdate(
      req.params.id,
      { whatsapp, email },
      { new: true } // return the updated document
    );

    if (!updatedSubscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.json({ message: "Subscriber updated", subscriber: updatedSubscriber });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
