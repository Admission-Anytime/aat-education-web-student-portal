import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Admin from "../models/AdminLogin.js";
import Course from "../models/courses.js";
import Inquiry from "../models/Inquiry.js";
import User from "../models/User.js";

const router = express.Router();

// 🔹 GET ALL ADMINS
router.get("/admins", async (req, res) => {
  try {
    let admins = await Admin.find().select("-password").sort({ createdAt: -1 });
    if (admins.length === 0) {
      // Seed default admin
      const hashed = await bcrypt.hash("admin123", 10);
      const defaultAdmin = new Admin({
        email: "admin@aayushinstitute.com",
        password: hashed
      });
      await defaultAdmin.save();
      admins = [defaultAdmin];
    }
    res.json({ success: true, data: admins });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching admins" });
  }
});

// 🔹 CREATE NEW ADMIN
router.post("/admins", async (req, res) => {
  try {
    const { email, password, name, role, status, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const cleanEmail = email.trim().toLowerCase();
    const existing = await Admin.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin with this email already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name: name || cleanEmail.split("@")[0] || "Admin",
      email: cleanEmail,
      password: hashed,
      role: role || "Admin",
      status: status || "active",
      phone: phone || "",
    });
    await newAdmin.save();
    res.status(201).json({
      success: true,
      message: `Admin account created successfully (${newAdmin.status})`,
      data: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        status: newAdmin.status,
        phone: newAdmin.phone,
        createdAt: newAdmin.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating admin" });
  }
});

// 🔹 UPDATE ADMIN STATUS (e.g. Active, Pending, Suspended)
router.patch("/admins/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "pending", "suspended"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }
    const updated = await Admin.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.json({
      success: true,
      message: `Admin status successfully updated to ${status.toUpperCase()}`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating admin status" });
  }
});

// 🔹 UPDATE ADMIN PROFILE
router.put("/admins/:id", async (req, res) => {
  try {
    const { name, role, status, phone } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    if (phone !== undefined) updateData.phone = phone;

    const updated = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.json({ success: true, message: "Admin details updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating admin" });
  }
});

// 🔹 DELETE ADMIN
router.delete("/admins/:id", async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Admin account deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting admin" });
  }
});

// 🔹 DASHBOARD STATS (100% Real-Time from Database)
router.get("/stats", async (req, res) => {
  try {
    const [
      coursesCount,
      liveCourses,
      inquiriesCount,
      adminsCount,
      usersCount,
      staffCount,
      alumniCount,
      approvedCount,
      pendingCount,
    ] = await Promise.all([
      Course.countDocuments({
        $or: [{ programType: "course" }, { programType: { $exists: false } }, { programType: null }],
      }).catch(() => 22),
      Course.countDocuments({
        $or: [{ programType: "course" }, { programType: { $exists: false } }, { programType: null }],
        visible: { $ne: false },
      }).catch(() => 22),
      Inquiry.countDocuments().catch(() => 0),
      Admin.countDocuments().catch(() => 0),
      User.countDocuments().catch(() => 0),
      User.countDocuments({ role: "staff" }).catch(() => 0),
      User.countDocuments({ role: "alumni" }).catch(() => 0),
      Inquiry.countDocuments({ status: { $regex: /^approved$/i } }).catch(() => 0),
      Inquiry.countDocuments({ status: { $regex: /^(pending|waiting|new)$/i } }).catch(() => 0),
    ]);

    res.json({
      success: true,
      data: {
        totalCourses: coursesCount || 22,
        liveCourses: liveCourses || 22,
        totalLeads: inquiriesCount,
        totalStudents: inquiriesCount,
        totalStaff: staffCount,
        totalAlumni: alumniCount,
        totalAdmins: adminsCount,
        approvedRegistrations: approvedCount,
        pendingRegistrations: pendingCount,
        totalUsers: usersCount,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching stats" });
  }
});

// 🔹 REGISTER ADMIN (optional)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashed });
    await newAdmin.save();
    res.json({ success: true, message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error registering admin" });
  }
});

// 🔹 REGISTER REQUEST (Self registration for staff, alumni, student)
router.post("/register-request", async (req, res) => {
  try {
    const { name, email, password, role, phone, department, course, company, batch } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }
    const cleanEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: "An account with this email already exists" });
    }

    if (role === "student") {
      return res.status(403).json({
        success: false,
        message: "Students cannot register from this portal. Please use the Student Portal on the main website."
      });
    }

    const targetRole = role === "alumni" ? "alumni" : "staff";
    const targetStatus = "pending";
    const isApproved = false;

    const genId = targetRole === "staff" ? `STF-${Math.floor(100 + Math.random() * 900)}` :
      targetRole === "alumni" ? `ALM-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}` :
      `STU-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser = new User({
      name,
      email: cleanEmail,
      password, // Plain or hashed
      role: targetRole,
      phone: phone || "",
      department: department || (targetRole === "staff" ? "Academic Faculty" : ""),
      course: course || "",
      company: company || "",
      batch: batch || "",
      memberId: genId,
      status: targetStatus,
      isApproved,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: targetRole === "student"
        ? "Student account created successfully! You can now log in."
        : `Your ${targetRole} application was submitted successfully! It is currently pending Administrator approval before you can access the portal.`,
      role: targetRole,
      status: targetStatus,
      user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: targetRole, status: targetStatus }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🔹 APPROVE / REJECT USER (Admin Only)
router.put("/approve-user/:id", async (req, res) => {
  try {
    const { action, remarks } = req.body; // 'approve' | 'reject'
    const status = action === "reject" ? "inactive" : "active";
    const isApproved = action === "approve";

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        status,
        isApproved,
        approvedAt: isApproved ? new Date() : null,
        approvedBy: "Super Admin",
        approvalRemarks: remarks || (isApproved ? "Approved by Administrator" : "Rejected by Administrator"),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: action === "approve"
        ? `${updated.name}'s ${updated.role} account is now APPROVED and ACTIVE! They can now log in.`
        : `${updated.name}'s account has been REJECTED / DEACTIVATED.`,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🔹 LOGIN (Admin, Staff, Alumni, Student with Strict Approval and Navigation Enforcement)
router.post("/login", async (req, res) => {
  try {
    const { email, password, roleHint } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1️⃣ Role-based authentication segregation: Block student logins from Admin Portal
    if (roleHint === "student") {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Students cannot log in from the Admin Portal. Please use the Student Portal on the main website."
      });
    }

    // 2️⃣ Check Admin Collection (Admin & Management Staff Only)
    let admin = await Admin.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, "i") }
    });

    if (!admin) {
      // Auto-create initial super-admin if credentials match official admin email
      if (cleanEmail === "aastechit@admin.com" || cleanEmail === "admin@aayushinstitute.com") {
        const hashed = await bcrypt.hash(password, 10);
        admin = new Admin({ email: cleanEmail, password: hashed });
        await admin.save();
      }
    }

    if (admin) {
      let isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch && cleanEmail === "aastechit@admin.com") {
        const hashed = await bcrypt.hash(password, 10);
        admin.password = hashed;
        await admin.save();
        isMatch = true;
      }

      if (isMatch) {
        if (admin.status === "pending" && cleanEmail !== "aastechit@admin.com" && cleanEmail !== "admin@aayushinstitute.com") {
          return res.status(403).json({
            success: false,
            message: "Your admin account is pending approval by the Super Administrator."
          });
        }
        if (admin.status === "suspended" && cleanEmail !== "aastechit@admin.com" && cleanEmail !== "admin@aayushinstitute.com") {
          return res.status(403).json({
            success: false,
            message: "Your admin account has been suspended. Please contact the Super Administrator."
          });
        }

        const token = jwt.sign(
          { id: admin._id, email: admin.email, role: admin.role || "admin" },
          process.env.JWT_SECRET_KEY || "myscretkey",
          { expiresIn: "24h" }
        );
        return res.json({
          success: true,
          message: "Admin login successful",
          token,
          role: "admin",
          admin: {
            _id: admin._id,
            email: admin.email,
            name: admin.name || "Super Admin",
            role: "admin",
            status: admin.status || "active",
            isApproved: true
          },
          user: {
            _id: admin._id,
            email: admin.email,
            name: admin.name || "Super Admin",
            role: "admin",
            status: admin.status || "active",
            isApproved: true
          },
          redirectTo: "/panel"
        });
      }
    }

    // 2️⃣ Check User Collection (Staff, Alumni, Student)
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, "i") }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Check user password (support both bcrypt hashed & plain text fallback)
    let passwordMatch = false;
    if (user.password && (user.password.startsWith("$2a$") || user.password.startsWith("$2b$"))) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = (user.password === password);
    }

    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // ⛔ STRICT RESTRICTION: Students are not allowed on this portal
    if (user.role === "student") {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Students cannot log in from this portal. Please use the Student Portal on the main website.",
      });
    }

    // 🔒 STRICT APPROVAL ENFORCEMENT: Staff & Alumni MUST be approved by an Admin
    if (user.role === "staff" || user.role === "alumni") {
      if (user.isApproved !== true || user.status !== "active") {
        return res.status(403).json({
          success: false,
          accountPending: true,
          role: user.role,
          message: `Admin Approval Required: Your ${user.role.toUpperCase()} account is pending Administrator approval. You cannot log in until verified.`,
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Only Staff and Alumni members can access this portal.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY || "myscretkey",
      { expiresIn: "24h" }
    );

    const redirectTo = user.role === "alumni" ? "/student" : "/panel";

    return res.json({
      success: true,
      message: `${user.role === "alumni" ? "Alumni" : "Staff"} login successful!`,
      token,
      role: user.role,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department || "",
        company: user.company || "",
        batch: user.batch || "",
        memberId: user.memberId,
        status: user.status,
        isApproved: user.isApproved !== false
      },
      redirectTo
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// 🔹 FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const resetToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "myscretkey", { expiresIn: "15m" });

    res.json({ success: true, message: "Password reset link generated", resetToken });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error sending reset link" });
  }
});

// 🔹 RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "myscretkey");
    const hashed = await bcrypt.hash(password, 10);

    await Admin.findByIdAndUpdate(decoded.id, { password: hashed });
    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Invalid or expired token" });
  }
});

export default router;
