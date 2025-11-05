import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
  {
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
      unique: true,
    },
    // Student & Admission Reference Section
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    applicationNo: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    academicSession: {
      type: String,
      required: true,
      trim: true,
    },
    courseProgram: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      trim: true,
    },
    courseDuration: {
      type: String,
      trim: true,
    },
    yearSemester: {
      type: String,
      trim: true,
    },
    quotaType: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    admissionType: {
      type: String,
      trim: true,
    },
    admissionReferenceId: {
      type: String,
      trim: true,
    },
    // Core Fee Components
    // 1. One-Time Admission Fees
    admissionFee: {
      type: Number,
      default: 0,
    },
    registrationUniversityEnrollmentFee: {
      type: Number,
      default: 0,
    },
    securityDeposit: {
      type: Number,
      default: 0,
    },
    identityCardFee: {
      type: Number,
      default: 0,
    },
    collegeUniformFee: {
      type: Number,
      default: 0,
    },
    othersAdmissionFee: {
      type: Number,
      default: 0,
    },
    // 2. Academic & Institutional Fees
    tuitionFee: {
      type: Number,
      default: 0,
    },
    developmentInfrastructureFee: {
      type: Number,
      default: 0,
    },
    libraryFee: {
      type: Number,
      default: 0,
    },
    laboratoryPracticalFee: {
      type: Number,
      default: 0,
    },
    computerLabItFacilityFee: {
      type: Number,
      default: 0,
    },
    othersAcademicFee: {
      type: Number,
      default: 0,
    },
    // 3. Examination & Academic Certification Fees
    examinationFee: {
      type: Number,
      default: 0,
    },
    universityBoardAffiliationFee: {
      type: Number,
      default: 0,
    },
    certificationConvocationFee: {
      type: Number,
      default: 0,
    },
    // 4. Accommodation (Hostel) Fees
    hostelFee: {
      type: Number,
      default: 0,
    },
    hostelMessFee: {
      type: Number,
      default: 0,
    },
    hostelTransportFee: {
      type: Number,
      default: 0,
    },
    // 5. Transport Fees
    routeName: {
      type: String,
      trim: true,
    },
    distance: {
      type: String,
      trim: true,
    },
    zone: {
      type: String,
      trim: true,
    },
    monthlyFee: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      trim: true,
    },
    // 6. Special / Conditional Fees
    reAdmissionBacklogFee: {
      type: Number,
      default: 0,
    },
    lateFeeFine: {
      type: Number,
      default: 0,
    },
    miscellaneousCharges: {
      type: Number,
      default: 0,
    },
    // Payment and Scholarship
    paymentPlan: {
      type: String,
      enum: ["One-time", "Installments"],
      default: "One-time",
    },
    numberOfInstallments: {
      type: Number,
      default: 1,
      min: 1,
      max: 12,
    },
    scholarships: [
      {
        amount: {
          type: Number,
          default: 0,
        },
        reason: {
          type: String,
          trim: true,
        },
      },
    ],
    totalFee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Draft", "Generated", "Sent to Student", "Paid", "Finalized - Ready for Payment", "Draft - Updated by Admin"],
      default: "Draft",
    },
    generatedBy: {
      type: String,
      required: true,
      trim: true,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total fee before saving
feeStructureSchema.pre("save", function (next) {
  const feeFields = [
    'admissionFee', 'registrationUniversityEnrollmentFee', 'securityDeposit', 'identityCardFee', 'collegeUniformFee', 'othersAdmissionFee',
    'tuitionFee', 'developmentInfrastructureFee', 'libraryFee', 'laboratoryPracticalFee', 'computerLabItFacilityFee', 'othersAcademicFee',
    'examinationFee', 'universityBoardAffiliationFee', 'certificationConvocationFee',
    'hostelFee', 'hostelMessFee', 'hostelTransportFee',
    'monthlyFee',
    'reAdmissionBacklogFee', 'lateFeeFine', 'miscellaneousCharges'
  ];
  const total = feeFields.reduce((sum, key) => sum + (this[key] || 0), 0);
  const scholarshipTotal = this.scholarships ? this.scholarships.reduce((sum, s) => sum + (s.amount || 0), 0) : 0;
  this.totalFee = Math.max(0, total - scholarshipTotal);
  next();
});

// Index for faster queries
feeStructureSchema.index({ status: 1 });
feeStructureSchema.index({ createdAt: -1 });

const FeeStructure = mongoose.model("FeeStructure", feeStructureSchema);

export default FeeStructure;
