import { Router } from "express";
import User from "../models/User.js";

const router = Router();

// 🧹 One-time auto-clean of any previously seeded dummy/hardcoded test members
const cleanDummyMembers = async () => {
  try {
    const dummyEmails = [
      "vikram.aditya@aayushinstitute.com",
      "neha.singhal@aayushinstitute.com",
      "arjun.mehta@aayushinstitute.com",
      "neha.kapoor@aayushinstitute.com",
      "suman.mehra@aayushinstitute.com",
      "aman.verma@aayushinstitute.com",
      "rajesh.kumar@aayushinstitute.com",
      "maya.joshi@aayushinstitute.com",
      "pooja.hegde@techcorp.com",
      "karan.malhotra@innovate.io",
      "ritu.verma@fintech.in"
    ];
    await User.deleteMany({ email: { $in: dummyEmails } });
  } catch (err) {}
};
cleanDummyMembers();

// GET /api/users (100% Pure Real-time Dynamic from MongoDB)
router.get("/", async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role && role !== "all" ? { role } : {};
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/users/clear-all (Clear all staff or alumni records)
router.delete("/clear-all", async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role && role !== "all" ? { role } : { role: { $in: ["staff", "alumni"] } };
    const result = await User.deleteMany(filter);
    res.json({ success: true, message: `Removed ${result.deletedCount} members`, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      phone,
      department,
      course,
      memberId,
      batch,
      company,
      status,
      password,
      designation,
      qualification,
      experience,
      bio,
      image,
    } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    const genId = memberId || (
      role === "staff" ? `STF-${Math.floor(100 + Math.random() * 900)}` :
      role === "alumni" ? `ALM-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}` :
      `AAY-${Math.floor(1000 + Math.random() * 9000)}`
    );

    const newUser = new User({
      name,
      email,
      role: role || "student",
      phone,
      department,
      course,
      memberId: genId,
      batch,
      company,
      designation: designation || (role === "staff" ? "Faculty Instructor" : undefined),
      qualification,
      experience,
      bio,
      image,
      status: status || "active",
      password: password || "password123",
      isApproved: status === "active" || role === "staff",
    });

    const saved = await newUser.save();
    res.status(201).json({ success: true, message: "Member created successfully", data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const updatePayload = { ...req.body };
    if (updatePayload.status === "active") {
      updatePayload.isApproved = true;
      updatePayload.approvedAt = new Date();
      updatePayload.approvedBy = "Super Admin";
    } else if (updatePayload.status === "inactive" || updatePayload.status === "pending") {
      updatePayload.isApproved = false;
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "Member updated successfully", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// SEED /api/users/seed
router.get("/seed", async (req, res) => {
  try {
    if (req.query.force) {
      await User.deleteMany({});
    }
    const inserted = await User.insertMany(initialMembers);
    res.json({ success: true, message: `Seeded ${inserted.length} members`, data: inserted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
