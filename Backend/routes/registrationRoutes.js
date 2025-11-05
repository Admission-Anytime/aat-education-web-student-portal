import { Router } from "express";
import Registration from "../models/Registration.js";
import multer from "multer";
import path from "path";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "aat/Backend/Uploads/"); // Adjust path as needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware for multiple file uploads
const uploadFields = upload.fields([
  { name: "Photo", maxCount: 1 },
  { name: "AadhaarCard", maxCount: 1 },
  { name: "AbcId", maxCount: 1 },
  { name: "DebId", maxCount: 1 },
  { name: "QuotaDocument", maxCount: 1 },
  { name: "CategoryCertificate", maxCount: 1 },
  { name: "SubCategoryDocument", maxCount: 1 },
  { name: "TenthMarksheet", maxCount: 1 },
  { name: "TwelfthMarksheet", maxCount: 1 },
  { name: "UgDiplomaMarksheet", maxCount: 1 },
  { name: "UgMarksheet", maxCount: 1 },
  { name: "PgDiplomaMarksheet", maxCount: 1 },
  { name: "PgMarksheet", maxCount: 1 },
]);

// @route   GET /api/registrations
// @desc    Get all registrations
// @access  Public
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json({ registrations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/registrations/:id
// @desc    Get single registration by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/registrations/by-registration-id/:registrationId
// @desc    Get single registration by RegistrationId
// @access  Public
router.get("/by-registration-id/:registrationId", async (req, res) => {
  try {
    const registration = await Registration.findOne({ RegistrationId: req.params.registrationId });
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/registrations
// @desc    Create a new registration
// @access  Public
router.post("/", uploadFields, async (req, res) => {
  try {
    const formData = req.body;

    // Handle file uploads
    if (req.files) {
      Object.keys(req.files).forEach((field) => {
        if (req.files[field][0]) {
          formData[field] = req.files[field][0].filename;
        }
      });
    }

    const newRegistration = new Registration(formData);
    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/registrations/:id
// @desc    Update a registration
// @access  Public
router.put("/:id", uploadFields, async (req, res) => {
  try {
    const formData = req.body;

    // Handle file uploads
    if (req.files) {
      Object.keys(req.files).forEach((field) => {
        if (req.files[field][0]) {
          formData[field] = req.files[field][0].filename;
        }
      });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      formData,
      { new: true }
    );
    if (!updatedRegistration)
      return res.status(404).json({ message: "Registration not found" });
    res.json(updatedRegistration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/registrations/:id
// @desc    Delete a registration
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });
    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PATCH /api/registrations/:id/status
// @desc    Update registration status
// @access  Public
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { Status },
      { new: true }
    );
    if (!updatedRegistration)
      return res.status(404).json({ message: "Registration not found" });
    res.json(updatedRegistration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
