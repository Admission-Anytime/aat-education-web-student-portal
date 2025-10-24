import express from "express";
import OTP from "../models/OTP.js";

const router = express.Router();

// Helper function to generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// =====================
// SEND OTP - Generate and send OTP to phone number
// =====================
router.post("/send", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Validate phone number
    if (!phoneNumber || phoneNumber.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit phone number",
      });
    }

    // Check rate limiting - max 3 OTPs per phone per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentOTPs = await OTP.countDocuments({
      phoneNumber,
      createdAt: { $gte: oneHourAgo },
    });

    if (recentOTPs >= 3) {
      return res.status(429).json({
        success: false,
        message: "Too many OTP requests. Please try again after 1 hour.",
      });
    }

    // Delete any existing unverified OTPs for this phone number
    await OTP.deleteMany({ phoneNumber, isVerified: false });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP to database
    const newOTP = new OTP({
      phoneNumber,
      otp,
      expiresAt,
    });

    await newOTP.save();

    // TODO: Integrate SMS service (Twilio, Fast2SMS, MSG91) here
    // For now, log OTP to console
    console.log("=".repeat(50));
    console.log(`📱 OTP for ${phoneNumber}: ${otp}`);
    console.log(`⏰ Expires at: ${expiresAt.toLocaleString()}`);
    console.log("=".repeat(50));

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your phone number",
      expiresIn: 300, // 5 minutes in seconds
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: error.message,
    });
  }
});

// =====================
// VERIFY OTP - Verify the OTP code
// =====================
router.post("/verify", async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Validate input
    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    // Find OTP record
    const otpRecord = await OTP.findOne({
      phoneNumber,
      otp,
      isVerified: false,
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check and try again.",
      });
    }

    // Check if OTP has expired
    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Mark OTP as verified
    otpRecord.isVerified = true;
    await otpRecord.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      sessionId: otpRecord._id,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP. Please try again.",
      error: error.message,
    });
  }
});

// =====================
// COMPLETE LOGIN - Save program and specialisation
// =====================
router.post("/complete-login", async (req, res) => {
  try {
    const { phoneNumber, programmeName, specialisation } = req.body;

    // Validate input
    if (!phoneNumber || !programmeName || !specialisation) {
      return res.status(400).json({
        success: false,
        message: "Phone number, program name, and specialisation are required",
      });
    }

    // Find verified OTP record
    const otpRecord = await OTP.findOne({
      phoneNumber,
      isVerified: true,
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    // Update with program details
    otpRecord.programmeName = programmeName;
    otpRecord.specialisation = specialisation;
    await otpRecord.save();

    res.status(200).json({
      success: true,
      message: "Login completed successfully",
      data: {
        phoneNumber: otpRecord.phoneNumber,
        programmeName: otpRecord.programmeName,
        specialisation: otpRecord.specialisation,
      },
    });
  } catch (error) {
    console.error("Error completing login:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete login. Please try again.",
      error: error.message,
    });
  }
});

// =====================
// RESEND OTP - Resend OTP to phone number
// =====================
router.post("/resend", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Validate phone number
    if (!phoneNumber || phoneNumber.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit phone number",
      });
    }

    // Delete existing unverified OTPs
    await OTP.deleteMany({ phoneNumber, isVerified: false });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP to database
    const newOTP = new OTP({
      phoneNumber,
      otp,
      expiresAt,
    });

    await newOTP.save();

    // Log OTP to console
    console.log("=".repeat(50));
    console.log(`📱 RESENT OTP for ${phoneNumber}: ${otp}`);
    console.log(`⏰ Expires at: ${expiresAt.toLocaleString()}`);
    console.log("=".repeat(50));

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      expiresIn: 300,
    });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to resend OTP. Please try again.",
      error: error.message,
    });
  }
});

export default router;
