import express from "express";
import FeeStructure from "../models/FeeStructure.js";
import Registration from "../models/Registration.js";

const router = express.Router();

// Create fee structure for a registration
router.post("/", async (req, res) => {
  try {
    const {
      registrationId,
      // Student & Admission Reference
      studentId,
      applicationNo,
      studentName,
      academicSession,
      courseProgram,
      specialization,
      courseDuration,
      yearSemester,
      quotaType,
      category,
      subCategory,
      admissionType,
      admissionReferenceId,
      // Fee Components
      admissionFee,
      registrationUniversityEnrollmentFee,
      securityDeposit,
      identityCardFee,
      collegeUniformFee,
      tuitionFee,
      developmentInfrastructureFee,
      libraryFee,
      laboratoryPracticalFee,
      computerLabItFacilityFee,
      examinationFee,
      universityBoardAffiliationFee,
      certificationConvocationFee,
      hostelFee,
      hostelMessFee,
      hostelTransportFee,
      routeName,
      distance,
      zone,
      monthlyFee,
      duration,
      reAdmissionBacklogFee,
      lateFeeFine,
      miscellaneousCharges,
      // Payment & Scholarship
      paymentPlan,
      numberOfInstallments,
      scholarships,
      generatedBy,
      status,
      notes,
    } = req.body;

    // Check if registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Check if fee structure already exists
    const existingFeeStructure = await FeeStructure.findOne({ registrationId });
    if (existingFeeStructure) {
      return res.status(400).json({ message: "Fee structure already exists for this registration" });
    }

    const feeStructure = new FeeStructure({
      registrationId,
      studentId,
      applicationNo,
      studentName,
      academicSession,
      courseProgram,
      specialization,
      courseDuration,
      yearSemester,
      quotaType,
      category,
      subCategory,
      admissionType,
      admissionReferenceId,
      admissionFee: admissionFee || 0,
      registrationUniversityEnrollmentFee: registrationUniversityEnrollmentFee || 0,
      securityDeposit: securityDeposit || 0,
      identityCardFee: identityCardFee || 0,
      collegeUniformFee: collegeUniformFee || 0,
      tuitionFee: tuitionFee || 0,
      developmentInfrastructureFee: developmentInfrastructureFee || 0,
      libraryFee: libraryFee || 0,
      laboratoryPracticalFee: laboratoryPracticalFee || 0,
      computerLabItFacilityFee: computerLabItFacilityFee || 0,
      examinationFee: examinationFee || 0,
      universityBoardAffiliationFee: universityBoardAffiliationFee || 0,
      certificationConvocationFee: certificationConvocationFee || 0,
      hostelFee: hostelFee || 0,
      hostelMessFee: hostelMessFee || 0,
      hostelTransportFee: hostelTransportFee || 0,
      routeName,
      distance,
      zone,
      monthlyFee: monthlyFee || 0,
      duration,
      reAdmissionBacklogFee: reAdmissionBacklogFee || 0,
      lateFeeFine: lateFeeFine || 0,
      miscellaneousCharges: miscellaneousCharges || 0,
      paymentPlan: paymentPlan || "One-time",
      numberOfInstallments: numberOfInstallments || 1,
      scholarships: scholarships || [],
      generatedBy,
      status: status || "Draft",
      notes,
    });

    await feeStructure.save();

    res.status(201).json({
      message: "Fee structure created successfully",
      feeStructure,
    });
  } catch (error) {
    console.error("Error creating fee structure:", error);
    res.status(500).json({
      message: "Failed to create fee structure",
      error: error.message,
    });
  }
});

// Get fee structure by registration ID
router.get("/:registrationId", async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findOne({
      registrationId: req.params.registrationId,
    }).populate("registrationId");

    if (!feeStructure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    res.json(feeStructure);
  } catch (error) {
    console.error("Error fetching fee structure:", error);
    res.status(500).json({
      message: "Failed to fetch fee structure",
      error: error.message,
    });
  }
});

// Update fee structure
router.put("/:registrationId", async (req, res) => {
  try {
    const {
      // Student & Admission Reference
      studentId,
      applicationNo,
      studentName,
      academicSession,
      courseProgram,
      specialization,
      courseDuration,
      yearSemester,
      quotaType,
      category,
      subCategory,
      admissionType,
      admissionReferenceId,
      // Fee Components
      admissionFee,
      registrationUniversityEnrollmentFee,
      securityDeposit,
      identityCardFee,
      collegeUniformFee,
      tuitionFee,
      developmentInfrastructureFee,
      libraryFee,
      laboratoryPracticalFee,
      computerLabItFacilityFee,
      examinationFee,
      universityBoardAffiliationFee,
      certificationConvocationFee,
      hostelFee,
      hostelMessFee,
      hostelTransportFee,
      routeName,
      distance,
      zone,
      monthlyFee,
      duration,
      reAdmissionBacklogFee,
      lateFeeFine,
      miscellaneousCharges,
      // Payment & Scholarship
      paymentPlan,
      numberOfInstallments,
      scholarships,
      status,
      notes,
    } = req.body;

    const updateData = {
      studentId,
      applicationNo,
      studentName,
      academicSession,
      courseProgram,
      specialization,
      courseDuration,
      yearSemester,
      quotaType,
      category,
      subCategory,
      admissionType,
      admissionReferenceId,
      admissionFee,
      registrationUniversityEnrollmentFee,
      securityDeposit,
      identityCardFee,
      collegeUniformFee,
      tuitionFee,
      developmentInfrastructureFee,
      libraryFee,
      laboratoryPracticalFee,
      computerLabItFacilityFee,
      examinationFee,
      universityBoardAffiliationFee,
      certificationConvocationFee,
      hostelFee,
      hostelMessFee,
      hostelTransportFee,
      routeName,
      distance,
      zone,
      monthlyFee,
      duration,
      reAdmissionBacklogFee,
      lateFeeFine,
      miscellaneousCharges,
      paymentPlan,
      numberOfInstallments,
      scholarships,
      status,
      notes,
    };

    const feeStructure = await FeeStructure.findOneAndUpdate(
      { registrationId: req.params.registrationId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!feeStructure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    res.json({
      message: "Fee structure updated successfully",
      feeStructure,
    });
  } catch (error) {
    console.error("Error updating fee structure:", error);
    res.status(500).json({
      message: "Failed to update fee structure",
      error: error.message,
    });
  }
});

// Delete fee structure
router.delete("/:registrationId", async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findOneAndDelete({
      registrationId: req.params.registrationId,
    });

    if (!feeStructure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    res.json({ message: "Fee structure deleted successfully" });
  } catch (error) {
    console.error("Error deleting fee structure:", error);
    res.status(500).json({
      message: "Failed to delete fee structure",
      error: error.message,
    });
  }
});

// Get all fee structures with pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: "i" } },
        { courseProgram: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
        { applicationNo: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const feeStructures = await FeeStructure.find(query)
      .populate("registrationId", "studentFirstName studentLastName studentEmail registrationId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FeeStructure.countDocuments(query);

    res.json({
      feeStructures,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching fee structures:", error);
    res.status(500).json({
      message: "Failed to fetch fee structures",
      error: error.message,
    });
  }
});

export default router;
