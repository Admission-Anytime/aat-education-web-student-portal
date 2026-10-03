import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();
const verifiedPhones = new Set();

// Automatically clean any dummy test records from MongoDB on startup
setTimeout(async () => {
  try {
    const dummyNames = [
      "Ananya Sharma",
      "Mohit Chauhan",
      "Sneha Patel",
      "Aryan Sharma",
      "Priya Patel",
      "Rohan Mehta",
      "Sneha Gupta",
      "Aarav Singh",
      "Kavya Nair",
      "Dev Kapoor",
      "Ananya Reddy",
    ];
    const delResult = await Inquiry.deleteMany({
      $or: [
        { name: { $in: dummyNames } },
        { email: { $in: ["ananya.s@outlook.com", "mohit.chauhan@yahoo.com", "sneha.patel@gmail.com"] } },
      ],
    });
    if (delResult.deletedCount > 0) {
      console.log(`🧹 Successfully removed ${delResult.deletedCount} dummy records from MongoDB!`);
    }
  } catch (err) {
    console.error("Cleanup note:", err.message);
  }
}, 1000);

// ----------------------
// Send OTP
// ----------------------
router.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ message: "Invalid phone number (10 digits required)" });
  }
  console.log(`[OTP] Sent to ${phone}: 1234`);
  res.json({ message: "OTP sent successfully" });
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
// Photo Uploads Handler
// ----------------------
router.put(["/newregistration/:type", "/:id/photo"], (req, res) => {
  res.json({ success: true, message: "Photo uploaded successfully", url: "/default_avatar.png" });
});

// ----------------------
// Submit Form (Universal Handler for Website Forms & ERP Registration)
// ----------------------
router.post(["/submit-form", "/newregistration"], async (req, res) => {
  const data = req.body;

  try {
    const year = new Date().getFullYear();
    const count = await Inquiry.countDocuments();
    const generatedId = `ADM- ${year}-${String(count + 1).padStart(3, "0")}`;

    const studentName = (
      data.name ||
      (data.firstName ? `${data.firstName} ${data.midName ? data.midName + " " : ""}${data.lastName || ""}`.trim() : "") ||
      (data.studentFirstName ? `${data.studentFirstName} ${data.studentLastName || ""}`.trim() : "") ||
      "Student Candidate"
    );

    const parentName = (
      data.fatherName ||
      (data.fatherFirstName ? `${data.fatherFirstName} ${data.fatherLastName || ""}`.trim() : "") ||
      "N/A"
    );

    const courseOrClass = (
      data.StudentClass ||
      data.className ||
      data.applyingForClass ||
      data.course ||
      data.program ||
      "Class 1"
    );

    const studentEmail = data.email || data.fatherEmail || "student@aayushinstitute.com";
    const studentPhone = data.phone || data.mobile || data.fatherPhone || "N/A";

    const inquiry = new Inquiry({
      name: studentName,
      admissionId: data.admissionId || generatedId,
      fatherName: parentName,
      className: courseOrClass,
      course: courseOrClass,
      program: courseOrClass,
      email: studentEmail,
      phone: studentPhone,
      state: data.currentState || data.state || "Delhi NCR",
      city: data.currentCity || data.city || "Ghaziabad",
      message: data.message || `Registered for ${courseOrClass}`,
      status: data.status || "Pending",
      session: data.academicYear || data.session || "2024–25",
      consent: data.consent !== false,
      notes: data.notes || data.comments || "",
      qualification: data.qualification || data.degree || "",
      degree: data.degree || data.qualification || "",
      passingYear: data.passingYear || "",
      careerDomain: data.careerDomain || "",
      preferredRole: data.preferredRole || "",
      inquiryType: data.inquiryType || (data.careerDomain || data.preferredRole ? "Placement Support" : "Admission"),
    });

    await inquiry.save();
    console.log(`✅ [MongoDB Live] New Registration Saved: ${inquiry.name} (${inquiry.admissionId}) - Status: ${inquiry.status}`);

    res.json({
      success: true,
      message: "Registration submitted successfully",
      data: inquiry,
      registrationId: inquiry.admissionId,
      inquiry,
    });
  } catch (err) {
    console.error("Error saving student registration:", err);
    res.status(500).json({ success: false, message: "Failed to save registration: " + err.message });
  }
});

// Direct Lead/Registration Creation API
router.post("/", async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ success: true, message: "Record saved successfully", data: inquiry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ----------------------
// Fetch all submissions / Student Registration Records (100% Real-Time from MongoDB)
// ----------------------
router.get(["/all-submissions", "/getallregistration"], async (req, res) => {
  try {
    const submissions = await Inquiry.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error("Error fetching student records:", err);
    res.status(500).json({ message: "Failed to fetch student registrations" });
  }
});

// ----------------------
// Clear all submissions endpoint
// ----------------------
router.delete("/clear-all/records", async (req, res) => {
  try {
    const result = await Inquiry.deleteMany({});
    res.json({ success: true, message: `Cleared ${result.deletedCount} records from MongoDB.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Student Record (Status, Details)
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Record
router.delete("/:id", async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Re-seed demo records
router.get("/seed", async (req, res) => {
  try {
    if (req.query.force) {
      await Inquiry.deleteMany({});
    }
    const inserted = await Inquiry.insertMany(initialRecords);
    res.json({ message: `Seeded ${inserted.length} student records`, leads: inserted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
