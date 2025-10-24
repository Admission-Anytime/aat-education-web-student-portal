 import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    // Programme Information
    programmeName: {
      type: String,
      required: true,
      trim: true,
    },
    specialisation: {
      type: String,
      required: true,
      trim: true,
    },
    registrationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
    // Student Photo
    photo: {
      type: String, // File path
      required: false, // Made optional for testing
      default: 'default-photo.jpg',
    },

    // Aadhaar Card
    aadhaarCard: {
      type: String, // File path
      required: true,
    },

    // ABC ID (Optional)
    abcId: {
      type: String, // File path
      required: false,
    },

    // BED ID (Optional)
    bedId: {
      type: String, // File path
      required: false,
    },

    // Student Personal Information
    studentFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    studentMiddleName: {
      type: String,
      required: true,
      trim: true,
    },
    studentLastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    quota: {
      type: String,
      required: true,
      enum: ["Ex Army", "Teacher Staff", "Not Applicable"],
    },
    quotaDocument: {
      type: String, // File path for quota-related document
      required: false,
    },
    category: {
      type: String,
      required: true,
      enum: ["Unreserved", "Reserved"],
    },
    categoryCertificate: {
      type: String, // File path for category certificate
      required: false,
    },
    subCategory: {
      type: String,
      required: true,
      enum: ["ST", "SC", "OBC"],
    },
    subCategoryDocument: {
      type: String, // File path for sub category document
      required: false,
    },
    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    // Student Contact Information
    studentPhone: {
      type: String,
      required: true,
      trim: true,
    },
    whatsappNo: {
      type: String,
      required: true,
      trim: true,
    },
    studentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
   
    program: {
      type: String,
      trim: true,
    },

    // Current Address
    currentHouseNo: {
      type: String,
      required: true,
      trim: true,
    },
    currentStreet: {
      type: String,
      required: true,
      trim: true,
    },
    currentArea: {
      type: String,
      required: true,
      trim: true,
    },
    currentLandmark: {
      type: String,
      trim: true,
    },
    currentCity: {
      type: String,
      required: true,
      trim: true,
    },
    currentDistrict: {
      type: String,
      required: true,
      trim: true,
    },
    currentState: {
      type: String,
      required: true,
      trim: true,
    },
    currentPincode: {
      type: String,
      required: true,
      trim: true,
    },
    currentCountry: {
      type: String,
      required: true,
      trim: true,
    },

    // Permanent Address
    permanentHouseNo: {
      type: String,
      required: true,
      trim: true,
    },
    permanentStreet: {
      type: String,
      required: true,
      trim: true,
    },
    permanentArea: {
      type: String,
      required: true,
      trim: true,
    },
    permanentLandmark: {
      type: String,
      trim: true,
    },
    permanentCity: {
      type: String,
      required: true,
      trim: true,
    },
    permanentDistrict: {
      type: String,
      required: true,
      trim: true,
    },
    permanentState: {
      type: String,
      required: true,
      trim: true,
    },
    permanentPincode: {
      type: String,
      required: true,
      trim: true,
    },
    permanentCountry: {
      type: String,
      required: true,
      trim: true,
    },

    // Father's Information
    fatherFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherMiddleName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherLastName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    fatherPhone: {
      type: String,
      required: true,
      trim: true,
    },
    fatherWhatsapp: {
      type: String,
      required: true,
      trim: true,
    },

    // Mother's Information
    motherFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    motherMiddleName: {
      type: String,
      required: true,
      trim: true,
    },
    motherLastName: {
      type: String,
      required: true,
      trim: true,
    },
    motherEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    motherPhone: {
      type: String,
      required: true,
      trim: true,
    },
    motherWhatsapp: {
      type: String,
      required: true,
      trim: true,
    },

    // Guardian's Information
    guardianFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    guardianMiddleName: {
      type: String,
      required: true,
      trim: true,
    },
    guardianLastName: {
      type: String,
      required: true,
      trim: true,
    },
    parentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    parentPhone: {
      type: String,
      required: true,
      trim: true,
    },
    relationship: {
      type: String,
      required: true,
      trim: true,
    },

    // Previous School
    previousSchool: {
      type: String,
      trim: true,
    },

    // 10th Grade / SSC
    tenthBoard: {
      type: String,
      required: true,
      trim: true,
    },
    tenthSchool: {
      type: String,
      required: true,
      trim: true,
    },
    tenthSchoolAddress: {
      type: String,
      required: true,
      trim: true,
    },
    tenthYear: {
      type: String,
      required: true,
      trim: true,
    },
    tenthPercentage: {
      type: String,
      required: true,
      trim: true,
    },
    tenthMarksheet: {
      type: String, // File path
    },

    // 12th Grade / HSC
    twelfthBoard: {
      type: String,
      required: true,
      trim: true,
    },
    twelfthSchool: {
      type: String,
      required: true,
      trim: true,
    },
    twelfthSchoolAddress: {
      type: String,
      required: true,
      trim: true,
    },
    twelfthStream: {
      type: String,
      required: true,
      trim: true,
    },
    twelfthYear: {
      type: String,
      required: true,
      trim: true,
    },
    twelfthPercentage: {
      type: String,
      required: true,
      trim: true,
    },
    twelfthMarksheet: {
      type: String, // File path
    },

    // UG Diploma (Optional)
    ugDiplomaInstitute: {
      type: String,
      trim: true,
    },
    ugDiplomaCourse: {
      type: String,
      trim: true,
    },
    ugDiplomaSpecialization: {
      type: String,
      trim: true,
    },
    ugDiplomaYear: {
      type: String,
      trim: true,
    },
    ugDiplomaPercentage: {
      type: String,
      trim: true,
    },
    ugDiplomaMarksheet: {
      type: String, // File path
    },

    // Under Graduate (Optional)
    ugCollege: {
      type: String,
      trim: true,
    },
    ugCourse: {
      type: String,
      trim: true,
    },
    ugSpecialization: {
      type: String,
      trim: true,
    },
    ugYear: {
      type: String,
      trim: true,
    },  
    ugPercentage: {
      type: String,
      trim: true,
    },
    ugMarksheet: {
      type: String, // File path
    },

    // PG Diploma (Optional)
    pgDiplomaInstitute: {
      type: String,
      trim: true,
    },
    pgDiplomaCourse: {
      type: String,
      trim: true,
    },
    pgDiplomaSpecialization: {
      type: String,
      trim: true,
    },
    pgDiplomaYear: {
      type: String,
      trim: true,
    },
    pgDiplomaPercentage: {
      type: String,
      trim: true,
    },
    pgDiplomaMarksheet: {
      type: String, // File path
    },

    // Post Graduate (Optional)
    pgUniversity: {
      type: String,
      trim: true,
    },
    pgCourse: {
      type: String,
      trim: true,
    },
    pgSpecialization: {
      type: String,
      trim: true,
    },
    pgYear: {
      type: String,
      trim: true,
    },
    pgPercentage: {
      type: String,
      trim: true,
    },
    pgMarksheet: {
      type: String, // File path
    },

    // Additional Information
    gpa: {
      type: String,
      trim: true,
    },
    interests: {
      type: String,
      trim: true,
    },
    whyApplying: {
      type: String,
      trim: true,
    },
    emergencyName: {
      type: String,
      trim: true,
    },
    emergencyPhone: {
      type: String,
      trim: true,
    },
    emergencyRelationship: {
      type: String,
      trim: true,
    },
    specialNeeds: {
      type: String,
      trim: true,
    },
    medications: {
      type: String,
      trim: true,
    },

    // Terms Agreement
    agreeTerms: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Application Status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Under Review"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Index for faster searches
registrationSchema.index({ registrationId: 1 });
registrationSchema.index({ studentEmail: 1 });
registrationSchema.index({ studentPhone: 1 });
registrationSchema.index({ createdAt: -1 });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
