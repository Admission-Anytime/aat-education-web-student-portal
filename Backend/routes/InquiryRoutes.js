// routes/formRoutes.js
import express from "express";
import { Router } from "express";
import Inquiry from "../models/Inquiry.js";
 const router = express.Router()
// const router =express.Router();
// Send OTP
router.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length !== 10) return res.status(400).json({ message: "Invalid phone" });
  console.log(`OTP sent to ${phone}: 1234`);
  res.json({ message: "OTP sent" });
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (otp === "1234") {
    verifiedPhones.add(phone);
    return res.json({ message: "OTP verified" });
  }
  res.status(400).json({ message: "Invalid OTP" });
});

// Submit form
router.post("/submit-form", async (req, res) => {
  const { phone, name, email, program, state, city, consent } = req.body;

  console.log("POST /submit-form body:", req.body);

  if (!verifiedPhones.has(phone)) {
    return res.status(403).json({ message: "Phone not verified" });
  }

  try {
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      program,
      state,
      city,
      consent,
      otpVerified: true, // mark OTP as verified in DB
    });

    await inquiry.save();
    console.log("Saved inquiry:", inquiry);

    // Remove phone from verified set
    verifiedPhones.delete(phone);

    res.json({ message: "Form submitted successfully", inquiry });
  } catch (err) {
    console.error("Error saving inquiry:", err);
    res.status(500).json({ message: "Failed to save form" });
  }
});

// Check if a phone is verified
router.get("/is-verified/:phone", (req, res) => {
  const { phone } = req.params;
  if (!phone || phone.length !== 10) return res.status(400).json({ message: "Invalid phone" });

  const verified = verifiedPhones.has(phone);
  res.json({ phone, verified });
});

// Fetch all submitted forms (example, using in-memory array)
const submittedForms = []; // temporary storage

router.get("/all-submissions", (req, res) => {
  res.json(submittedForms);
});


 // routes/formRoutes.js


;

const verifiedPhones = new Set();

// ----------------------
// Send OTP
// ----------------------
router.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ message: "Invalid phone" });
  }

  console.log(`OTP sent to ${phone}: 1234`);
  res.json({ message: "OTP sent" });
});

// ----------------------
// Verify OTP
// ----------------------
router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (otp === "1234") {
    verifiedPhones.add(phone);
    return res.json({ message: "OTP verified" });
  }
  res.status(400).json({ message: "Invalid OTP" });
});

// ----------------------
// Submit Form (save to DB)
// ----------------------
router.post("/submit-form", async (req, res) => {
  const { phone, name, email, program, state, city, consent } = req.body;
console.log("post inquiry",req.body);
  if (!verifiedPhones.has(phone)) {
    return res.status(403).json({ message: "Phone not verified" });
  }

  try {
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      program,
      state,
      city,
      consent,
    });

    await inquiry.save();
    console.log("Form submitted & saved:", inquiry);

    verifiedPhones.delete(phone);

    res.json({ message: "Form submitted successfully", inquiry });
  } catch (err) {
    console.error("Error saving inquiry:", err);
    res.status(500).json({ message: "Failed to save form" });
  }
});

// ----------------------
// Check if phone is verified
// ----------------------
router.get("/is-verified/:phone", (req, res) => {
  const { phone } = req.params;
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ message: "Invalid phone" });
  }

  const verified = verifiedPhones.has(phone);
  res.json({ phone, verified });
});

// ----------------------
// Fetch all submissions
// ----------------------
router.get("/all-submissions", async (req, res) => {
  try {
    const submissions = await Inquiry.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
});

export default router;
