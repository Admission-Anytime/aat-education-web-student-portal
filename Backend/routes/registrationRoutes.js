import express from "express";
import multer from "multer";
import path from "path";
import Registration from "../models/Registration.js";

const router = express.Router();

// =====================
// Multer Configuration for File Uploads
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/"); // Save to Uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// File filter to accept only images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPEG, JPG, PNG) and PDF files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// =====================
// CREATE - Submit New Registration
// =====================
router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Extract file paths
      const photo = req.files?.photo ? req.files.photo[0].filename : null;
      const tenthMarksheet = req.files?.tenthMarksheet
        ? req.files.tenthMarksheet[0].filename
        : null;
      const twelfthMarksheet = req.files?.twelfthMarksheet
        ? req.files.twelfthMarksheet[0].filename
        : null;

      // Create registration data
      const registrationData = {
        ...req.body,
        photo: photo || 'default-photo.jpg', // Use default if no photo uploaded
        tenthMarksheet,
        twelfthMarksheet,
        agreeTerms: req.body.agreeTerms === "true" || req.body.agreeTerms === true,
      };

      // Create new registration
      const newRegistration = new Registration(registrationData);
      await newRegistration.save();

      res.status(201).json({
        message: "Registration submitted successfully",
        registration: newRegistration,
      });
    } catch (error) {
      console.error("Error creating registration:", error);
      res.status(400).json({
        message: "Failed to submit registration",
        error: error.message,
      });
    }
  }
);

// =====================
// READ ALL - Get All Registrations (with pagination and filtering)
// =====================
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Build query
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by name, email, or registration ID
    if (search) {
      query.$or = [
        { studentFirstName: { $regex: search, $options: "i" } },
        { studentLastName: { $regex: search, $options: "i" } },
        { studentEmail: { $regex: search, $options: "i" } },
        { registrationId: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    // Fetch registrations
    const registrations = await Registration.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Registration.countDocuments(query);

    res.json({
      registrations,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
});

// =====================
// READ ONE - Get Single Registration by ID
// =====================
router.get("/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json(registration);
  } catch (error) {
    console.error("Error fetching registration:", error);
    res.status(500).json({
      message: "Failed to fetch registration",
      error: error.message,
    });
  }
});

// =====================
// SEARCH - Search by Registration ID, Email, or Phone
// =====================
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;

    const registrations = await Registration.find({
      $or: [
        { registrationId: { $regex: query, $options: "i" } },
        { studentEmail: { $regex: query, $options: "i" } },
        { studentPhone: { $regex: query, $options: "i" } },
        { studentFirstName: { $regex: query, $options: "i" } },
        { studentLastName: { $regex: query, $options: "i" } },
      ],
    }).limit(20);

    res.json({
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error("Error searching registrations:", error);
    res.status(500).json({
      message: "Failed to search registrations",
      error: error.message,
    });
  }
});

// =====================
// UPDATE - Update Registration by ID
// =====================
router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const registration = await Registration.findById(req.params.id);

      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }

      // Update file paths if new files are uploaded
      if (req.files?.photo) {
        req.body.photo = req.files.photo[0].filename;
      }
      if (req.files?.tenthMarksheet) {
        req.body.tenthMarksheet = req.files.tenthMarksheet[0].filename;
      }
      if (req.files?.twelfthMarksheet) {
        req.body.twelfthMarksheet = req.files.twelfthMarksheet[0].filename;
      }

      // Handle boolean conversion for agreeTerms
      if (req.body.agreeTerms !== undefined) {
        req.body.agreeTerms =
          req.body.agreeTerms === "true" || req.body.agreeTerms === true;
      }

      // Update registration
      const updatedRegistration = await Registration.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
   
      res.json({
        message: "Registration updated successfully",
        registration: updatedRegistration,
      });
    } catch (error) {
      console.error("Error updating registration:", error);
      res.status(400).json({
        message: "Failed to update registration",
        error: error.message,
      });
    }
  }
);

// =====================
// PATCH - Update Registration Status
// =====================
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected", "Under Review"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({
      message: "Status updated successfully",
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      message: "Failed to update status",
      error: error.message,
    });
  }
});

// =====================
// DELETE - Delete Registration by ID
// =====================
router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({
      message: "Registration deleted successfully",
      registration,
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({
      message: "Failed to delete registration",
      error: error.message,
    });
  }
});

// =====================
// GET Statistics - Get registration statistics
// =====================
router.get("/stats/overview", async (req, res) => {
  try {
    const total = await Registration.countDocuments();
    const pending = await Registration.countDocuments({ status: "Pending" });
    const approved = await Registration.countDocuments({ status: "Approved" });
    const rejected = await Registration.countDocuments({ status: "Rejected" });
    const underReview = await Registration.countDocuments({
      status: "Under Review",
    });

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentCount = await Registration.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      total,
      pending,
      approved,
      rejected,
      underReview,
      recentCount,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
});

export default router;
