import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  Calendar,
  GraduationCap,
  Heart,
  Shield,
  Check,
  AlertCircle,
  Upload,
  X,
  LogOut,
} from "lucide-react";

// Reusable Input Field Component (with error handling)
const InputField = ({
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
  whiteBg = false,
  label,
}) => (
  <div className="w-full">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
        whiteBg ? "bg-white" : ""
      } ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
      }`}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
        <span className="ml-1">{error}</span>
      </p>
    )}
    {label && (
      <p className="text-gray-600 text-xs mt-1">{label}</p>
    )}
  </div>
);

function RegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const preFilledData = location.state || {};

  const [formData, setFormData] = useState({
    programmeName: preFilledData.programmeName || "",
    specialisation: preFilledData.specialisation || "",
    registrationId: "",
    photo: null,
    photoPreview: null,
    aadhaarCard: null,
    abcId: null,
    bedId: null,
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    gender: "",
    dateOfBirth: "",
    quota: "",
    quotaDocument: null,
    category: "",
    categoryCertificate: null,
    subCategory: "",
    subCategoryDocument: null,
    qualification: "",
    studentPhone: preFilledData.phoneNumber || "",
    whatsappNo: preFilledData.phoneNumber || "",
    studentEmail: "",
    grade: "",
    program: "", // Not used in current UI, but kept in state
    // Current Address
    currentHouseNo: "",
    currentStreet: "",
    currentArea: "",
    currentLandmark: "",
    currentCity: "",
    currentDistrict: "",
    currentState: "",
    currentPincode: "",
    currentCountry: "",
    // Permanent Address
    permanentHouseNo: "",
    permanentStreet: "",
    permanentArea: "",
    permanentLandmark: "",
    permanentCity: "",
    permanentDistrict: "",
    permanentState: "",
    permanentPincode: "",
    permanentCountry: "",
    sameAsCurrent: false,
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherEmail: "",
    fatherPhone: "",
    fatherWhatsapp: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    motherEmail: "",
    motherPhone: "",
    motherWhatsapp: "",
    guardianFirstName: "",
    guardianMiddleName: "",
    guardianLastName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "",
    previousSchool: "",
    // 10th Grade
    tenthBoard: "",
    tenthSchool: "",
    tenthSchoolAddress: "",
    tenthYear: "",
    tenthPercentage: "",
    tenthMarksheet: null,
    // 12th Grade
    twelfthBoard: "",
    twelfthSchool: "",
    twelfthSchoolAddress: "",
    twelfthStream: "",
    twelfthYear: "",
    twelfthPercentage: "",
    twelfthMarksheet: null,
    // UG Diploma
    ugDiplomaInstitute: "",
    ugDiplomaCourse: "",
    ugDiplomaSpecialization: "",
    ugDiplomaYear: "",
    ugDiplomaPercentage: "",
    ugDiplomaMarksheet: null,
    // UG
    ugCollege: "",
    ugCourse: "",
    ugSpecialization: "",
    ugYear: "",
    ugPercentage: "",
    ugMarksheet: null,
    // PG Diploma
    pgDiplomaInstitute: "",
    pgDiplomaCourse: "",
    pgDiplomaSpecialization: "",
    pgDiplomaYear: "",
    pgDiplomaPercentage: "",
    pgDiplomaMarksheet: null,
    // PG
    pgUniversity: "",
    pgCourse: "",
    pgSpecialization: "",
    pgYear: "",
    pgPercentage: "",
    pgMarksheet: null,
    gpa: "", // Not used in current UI, but kept in state
    interests: "",
    whyApplying: "", // Not used in current UI, but kept in state
    emergencyName: "", // Not used in current UI, but kept in state
    emergencyPhone: "", // Not used in current UI, but kept in state
    emergencyRelationship: "", // Not used in current UI, but kept in state
    specialNeeds: "",
    medications: "",
    agreeTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user came from login
  useEffect(() => {
    if (preFilledData.phoneNumber && preFilledData.programmeName && preFilledData.specialisation) {
      setIsLoggedIn(true);
    } else {
      // If no pre-filled data, redirect to login
      navigate("/student-login", { replace: true });
    }
  }, [preFilledData, navigate]);

  // Handle logout
  const handleLogout = () => {
    navigate("/student-login");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error instantly when user starts typing/changing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please upload an image file.",
        }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Image size should be less than 5MB.",
        }));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result,
        }));
        setErrors((prev) => ({ ...prev, photo: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
      photoPreview: null,
    }));
    setErrors((prev) => ({ ...prev, photo: undefined }));
  };

  const handleAadhaarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          aadhaarCard: "Please upload an image or PDF file.",
        }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          aadhaarCard: "File size should be less than 5MB.",
        }));
        return;
      }

      // Set the file
      setFormData((prev) => ({
        ...prev,
        aadhaarCard: file,
      }));
      setErrors((prev) => ({ ...prev, aadhaarCard: undefined }));
    }
  };

  const handleAbcUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          abcId: "Please upload an image or PDF file.",
        }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          abcId: "File size should be less than 5MB.",
        }));
        return;
      }

      // Set the file
      setFormData((prev) => ({
        ...prev,
        abcId: file,
      }));
      setErrors((prev) => ({ ...prev, abcId: undefined }));
    }
  };

  const handleBedUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          bedId: "Please upload an image or PDF file.",
        }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          bedId: "File size should be less than 5MB.",
        }));
        return;
      }

      // Set the file
      setFormData((prev) => ({
        ...prev,
        bedId: file,
      }));
      setErrors((prev) => ({ ...prev, bedId: undefined }));
    }
  };

  const handleSubCategoryDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          subCategoryDocument: "Please upload an image or PDF file.",
        }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          subCategoryDocument: "File size should be less than 5MB.",
        }));
        return;
      }

      // Set the file
      setFormData((prev) => ({
        ...prev,
        subCategoryDocument: file,
      }));
      setErrors((prev) => ({ ...prev, subCategoryDocument: undefined }));
    }
  };

  // Handle "Same as Current Address" checkbox
  const handleSameAsCurrentChange = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      sameAsCurrent: isChecked,
      ...(isChecked && {
        permanentHouseNo: prev.currentHouseNo,
        permanentStreet: prev.currentStreet,
        permanentArea: prev.currentArea,
        permanentLandmark: prev.currentLandmark,
        permanentCity: prev.currentCity,
        permanentDistrict: prev.currentDistrict,
        permanentState: prev.currentState,
        permanentPincode: prev.currentPincode,
        permanentCountry: prev.currentCountry,
      }),
    }));

    // Clear permanent address errors if copying from current
    if (isChecked) {
      setErrors((prev) => ({
        ...prev,
        permanentHouseNo: undefined,
        permanentStreet: undefined,
        permanentArea: undefined,
        permanentCity: undefined,
        permanentDistrict: undefined,
        permanentState: undefined,
        permanentPincode: undefined,
        permanentCountry: undefined,
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    const requiredFields = [
      "programmeName",
      "specialisation",
      "registrationId",
      "studentFirstName",
      "studentMiddleName",
      "studentLastName",
      "gender",
      "dateOfBirth",
      "quota",
      "category",
      "subCategory",
      "qualification",
      "studentPhone",
      "whatsappNo",
      "studentEmail",
      "aadhaarCard",
      "currentHouseNo",
      "currentStreet",
      "currentArea",
      "currentCity",
      "currentDistrict",
      "currentState",
      "currentPincode",
      "currentCountry",
      "permanentHouseNo",
      "permanentStreet",
      "permanentArea",
      "permanentCity",
      "permanentDistrict",
      "permanentState",
      "permanentPincode",
      "permanentCountry",
      "fatherFirstName",
      "fatherMiddleName",
      "fatherLastName",
      "fatherEmail",
      "fatherPhone",
      "fatherWhatsapp",
      "motherFirstName",
      "motherMiddleName",
      "motherLastName",
      "motherEmail",
      "motherPhone",
      "motherWhatsapp",
      "guardianFirstName",
      "guardianMiddleName",
      "guardianLastName",
      "parentEmail",
      "parentPhone",
      "relationship",
      "tenthBoard",
      "tenthSchool",
      "tenthSchoolAddress",
      "tenthYear",
      "tenthPercentage",
      "twelfthBoard",
      "twelfthSchool",
      "twelfthSchoolAddress",
      "twelfthStream",
      "twelfthYear",
      "twelfthPercentage",
      "agreeTerms",
    ];

    // Add subCategoryDocument to required fields if subCategory is selected
    if (formData.subCategory) {
      requiredFields.push("subCategoryDocument");
    }

    requiredFields.forEach((field) => {
      if (field === "agreeTerms") {
        if (!formData.agreeTerms) {
          newErrors.agreeTerms = "You must agree to the terms.";
          isValid = false;
        }
      } else if (!formData[field]) {
        newErrors[field] = "This field is required.";
        isValid = false;
      }
    });

    // Photo validation - now optional
    // if (!formData.photo) {
    //   newErrors.photo = "Please upload a photo.";
    //   isValid = false;
    // }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.parentEmail && !emailRegex.test(formData.parentEmail)) {
      newErrors.parentEmail = "Invalid email format.";
      isValid = false;
    }
    if (formData.studentEmail && !emailRegex.test(formData.studentEmail)) {
      newErrors.studentEmail = "Invalid email format.";
      isValid = false;
    }
    if (formData.fatherEmail && !emailRegex.test(formData.fatherEmail)) {
      newErrors.fatherEmail = "Invalid email format.";
      isValid = false;
    }
    if (formData.motherEmail && !emailRegex.test(formData.motherEmail)) {
      newErrors.motherEmail = "Invalid email format.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted!");
    console.log("Form data:", formData);

    const isValid = validateForm();
    console.log("Form validation result:", isValid);
    console.log("Validation errors:", errors);

    if (!isValid) {
      console.log("Form validation failed. Errors:", errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    console.log("Form is valid, proceeding to submit...");
    setLoading(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        if (
          key !== "photo" &&
          key !== "photoPreview" &&
          key !== "tenthMarksheet" &&
          key !== "twelfthMarksheet" &&
          key !== "quotaDocument" &&
          key !== "categoryCertificate" &&
          key !== "ugDiplomaMarksheet" &&
          key !== "ugMarksheet" &&
          key !== "pgDiplomaMarksheet" &&
          key !== "pgMarksheet"
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append files
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }
      if (formData.aadhaarCard) {
        formDataToSend.append("aadhaarCard", formData.aadhaarCard);
      }
      if (formData.abcId) {
        formDataToSend.append("abcId", formData.abcId);
      }
      if (formData.bedId) {
        formDataToSend.append("bedId", formData.bedId);
      }
      if (formData.tenthMarksheet) {
        formDataToSend.append("tenthMarksheet", formData.tenthMarksheet);
      }
      if (formData.twelfthMarksheet) {
        formDataToSend.append("twelfthMarksheet", formData.twelfthMarksheet);
      }
      if (formData.quotaDocument) {
        formDataToSend.append("quotaDocument", formData.quotaDocument);
      }
      if (formData.categoryCertificate) {
        formDataToSend.append("categoryCertificate", formData.categoryCertificate);
      }
      if (formData.subCategoryDocument) {
        formDataToSend.append("subCategoryDocument", formData.subCategoryDocument);
      }
      if (formData.ugDiplomaMarksheet) {
        formDataToSend.append("ugDiplomaMarksheet", formData.ugDiplomaMarksheet);
      }
      if (formData.ugMarksheet) {
        formDataToSend.append("ugMarksheet", formData.ugMarksheet);
      }
      if (formData.pgDiplomaMarksheet) {
        formDataToSend.append("pgDiplomaMarksheet", formData.pgDiplomaMarksheet);
      }
      if (formData.pgMarksheet) {
        formDataToSend.append("pgMarksheet", formData.pgMarksheet);
      }

      // Send to backend
      const response = await axios.post(
        "api/registrations",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", response);

      // Set application ID from response
      setApplicationId(response.data.registration._id);
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting registration:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error message:", error.response?.data?.error);
      setLoading(false);

      // Handle error
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}\n\nDetails: ${error.response.data.error || 'No additional details'}`);
      } else {
        alert("Failed to submit registration. Please try again.");
      }
    }
  };

  

// removed duplicate early return; rendering logic continues below (if/submitted and main return)
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your application to Harmony Academy. We'll review your
            submission and contact you within 5-7 business days.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              Application ID:{" "}
              <strong className="text-blue-900">
                {applicationId || `HA-${Date.now().toString().slice(-6)}`}
              </strong>
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                programmeName: "",
                specialisation: "",
                registrationId: "",
                photo: null,
                photoPreview: null,
                studentFirstName: "",
                studentMiddleName: "",
                studentLastName: "",
                gender: "",
                dateOfBirth: "",
                quota: "",
                quotaDocument: null,
                category: "",
                categoryCertificate: null,
                subCategory: "",
                qualification: "",
                studentPhone: "",
                whatsappNo: "",
                studentEmail: "",
                 program: "",
                currentAddress: "",
                currentCity: "",
                currentState: "",
                currentZipCode: "",
                permanentAddress: "",
                permanentCity: "",
                permanentState: "",
                permanentZipCode: "",
                fatherFirstName: "",
                fatherMiddleName: "",
                fatherLastName: "",
                fatherEmail: "",
                fatherPhone: "",
                fatherWhatsapp: "",
                motherFirstName: "",
                motherMiddleName: "",
                motherLastName: "",
                motherEmail: "",
                motherPhone: "",
                motherWhatsapp: "",
                guardianFirstName: "",
                guardianMiddleName: "",
                guardianLastName: "",
                parentEmail: "",
                parentPhone: "",
                relationship: "",
                previousSchool: "",
                tenthBoard: "",
                tenthSchool: "",
                tenthSchoolAddress: "",
                tenthYear: "",
                tenthPercentage: "",
                tenthMarksheet: null,
                twelfthBoard: "",
                twelfthSchool: "",
                twelfthSchoolAddress: "",
                twelfthStream: "",
                twelfthYear: "",
                twelfthPercentage: "",
                twelfthMarksheet: null,
                ugDiplomaInstitute: "",
                ugDiplomaCourse: "",
                ugDiplomaSpecialization: "",
                ugDiplomaYear: "",
                ugDiplomaPercentage: "",
                ugDiplomaMarksheet: null,
                ugCollege: "",
                ugCourse: "",
                ugSpecialization: "",
                ugYear: "",
                ugPercentage: "",
                ugMarksheet: null,
                pgDiplomaInstitute: "",
                pgDiplomaCourse: "",
                pgDiplomaSpecialization: "",
                pgDiplomaYear: "",
                pgDiplomaPercentage: "",
                pgDiplomaMarksheet: null,
                pgUniversity: "",
                pgCourse: "",
                pgSpecialization: "",
                pgYear: "",
                pgPercentage: "",
                pgMarksheet: null,
                gpa: "",
                interests: "",
                whyApplying: "",
                emergencyName: "",
                emergencyPhone: "",
                emergencyRelationship: "",
                specialNeeds: "",
                medications: "",
                agreeTerms: false,
              });
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-[1.01]"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-extrabold mb-3 tracking-tight">
                    Student Registration Form
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Complete all sections to submit your application
                  </p>
                </div>
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                )}
              </div>
              {isLoggedIn && (
                <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-sm text-blue-100 mb-1">Logged in as:</p>
                  <p className="font-semibold text-lg">+91-{preFilledData.phoneNumber}</p>
                  <p className="text-sm text-blue-100 mt-2">
                    Program: <span className="font-medium text-white">{preFilledData.programmeName}</span> | 
                    Specialisation: <span className="font-medium text-white">{preFilledData.specialisation}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-12">
            {/* === Student Information === */}
            <section className="border-b pb-10 border-gray-200">
              <div className="flex items-center space-x-3 mb-8 pb-3 border-b-2 border-blue-500">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Student Information
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Personal and academic details
                  </p>
                </div>
              </div>

              {/* New Row: Programme Details & Photo Upload */}
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                {/* Left Column: Programme Name, Specialisation, Registration Id */}
                <div className="space-y-6">
                   <InputField
                    name="registrationId"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    placeholder="Registration ID *"
                    error={errors.registrationId}
                    label="Registration ID"
                  />
                  <div className="w-full">
                    <input
                      type="text"
                      name="programmeName"
                      placeholder="Programme Name *"
                      value={formData.programmeName}
                      onChange={handleInputChange}
                      disabled={isLoggedIn}
                      className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                        isLoggedIn
                          ? "bg-gray-100 cursor-not-allowed text-gray-700"
                          : errors.programmeName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                    {errors.programmeName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                        <span className="ml-1">{errors.programmeName}</span>
                      </p>
                    )}
                    <p className="text-gray-600 text-xs mt-1">Programme Name</p>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="specialisation"
                      placeholder="Specialisation *"
                      value={formData.specialisation}
                      onChange={handleInputChange}
                      disabled={isLoggedIn}
                      className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                        isLoggedIn
                          ? "bg-gray-100 cursor-not-allowed text-gray-700"
                          : errors.specialisation
                          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                    {errors.specialisation && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                        <span className="ml-1">{errors.specialisation}</span>
                      </p>
                    )}
                    <p className="text-gray-600 text-xs mt-1">Specialisation</p>
                  </div>
                 
                </div>

                {/* Right Column: Photo Upload */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Photo Upload */}
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photo *
                    </label>
                    {!formData.photoPreview ? (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label
                          htmlFor="photo-upload"
                          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                            errors.photo
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-gray-50"
                          }`}
                        >
                          <Upload
                            className={`w-8 h-8 mb-2 ${
                              errors.photo ? "text-red-500" : "text-gray-400"
                            }`}
                          />
                          <p
                            className={`text-xs ${
                              errors.photo ? "text-red-500" : "text-gray-600"
                            }`}
                          >
                            Click to upload
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">Max 5MB</p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative w-full h-40 border-2 border-gray-300 rounded-xl overflow-hidden">
                        <img
                          src={formData.photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {errors.photo && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                        <span className="ml-1">{errors.photo}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 1: First Name, Middle Name, Last Name */}
              <div className="grid md:grid-cols-3 gap-6">
                <InputField
                  name="studentFirstName"
                  value={formData.studentFirstName}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  error={errors.studentFirstName}
                  label="First Name"
                />
                <InputField
                  name="studentMiddleName"
                  value={formData.studentMiddleName}
                  onChange={handleInputChange}
                  placeholder="Middle Name *"
                  error={errors.studentMiddleName}
                  label="Middle Name"
                />
                <InputField
                  name="studentLastName"
                  value={formData.studentLastName}
                  onChange={handleInputChange}
                  placeholder="Last Name *"
                  error={errors.studentLastName}
                  label="Last Name"
                />
              </div>

              {/* Row 2: Gender, DOB, Quota, Quota Document */}
              <div className="grid md:grid-cols-4 gap-6 mt-6">
                <div className="w-full">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                      errors.gender
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Select Gender *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.gender}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-1">Gender</p>
                </div>
                <div className="w-full">
                <div className="relative">
  <input
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleInputChange}
    className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
      errors.dateOfBirth
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
    }`}
    style={{
      colorScheme: 'light',
      color: formData.dateOfBirth ? 'inherit' : 'transparent',
      position: 'relative',
      zIndex: 1,
      backgroundColor: 'transparent',
    }}
    onFocus={(e) => {
      e.target.style.color = 'inherit';
      const label = e.target.parentNode.querySelector('span');
      if (label) label.style.display = 'none';
    }}
    onBlur={(e) => {
      if (!e.target.value) {
        const label = e.target.parentNode.querySelector('span');
        if (label) label.style.display = 'block';
      }
    }}
  />
  {!formData.dateOfBirth && (
    <span
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-base"
      style={{
        zIndex: 0,
      }}
    >
      Date of Birth *
    </span>
  )}
</div>

{errors.dateOfBirth && (
  <p className="text-red-500 text-sm mt-1 flex items-center">
    <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
    <span className="ml-1">{errors.dateOfBirth}</span>
  </p>
)}
<p className="text-gray-600 text-xs mt-1">Date of Birth</p>

                </div>
                <div className="w-full">
                  <select
                    name="quota"
                    value={formData.quota}
                    onChange={handleInputChange}
                    className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                      errors.quota
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Quota *</option>
                    <option value="Ex Army">Ex Army</option>
                    <option value="Teacher Staff">Teacher Staff</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                  {errors.quota && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.quota}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-1">Quota</p>
                </div>
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="file"
                      name="quotaDocument"
                      id="quotaDocument"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Validate file size (max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            setErrors((prev) => ({
                              ...prev,
                              quotaDocument: "File size should be less than 5MB.",
                            }));
                            e.target.value = null;
                            return;
                          }
                          setFormData((prev) => ({
                            ...prev,
                            quotaDocument: file,
                          }));
                          setErrors((prev) => ({ ...prev, quotaDocument: undefined }));
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="quotaDocument"
                      className={`flex items-center border rounded-xl w-full text-sm transition-all cursor-pointer overflow-hidden ${
                        errors.quotaDocument
                          ? "border-red-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                        Choose File
                      </span>
                      <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                        {formData.quotaDocument ? formData.quotaDocument.name : "No file chosen"}
                      </span>
                    </label>

                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Quota Document (if applicable)
                  </p>
                  {errors.quotaDocument && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.quotaDocument}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Category, Category Certificate, Sub Category, Sub Category Certificate, Qualification */}
              <div className="grid md:grid-cols-5 gap-6 mt-6">
                <div className="w-full">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                      errors.category
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Select Category *</option>
                    <option value="Unreserved">Unreserved</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Reserved">OBC</option>
                    <option value="Reserved">ST</option>
                    <option value="Reserved">SC</option>
                    <option value="Reserved">EWS</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.category}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-1">Category</p>
                </div>
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="file"
                      name="categoryCertificate"
                      id="categoryCertificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Validate file size (max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            setErrors((prev) => ({
                              ...prev,
                              categoryCertificate: "File size should be less than 5MB.",
                            }));
                            e.target.value = null;
                            return;
                          }
                          setFormData((prev) => ({
                            ...prev,
                            categoryCertificate: file,
                          }));
                          setErrors((prev) => ({ ...prev, categoryCertificate: undefined }));
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="categoryCertificate"
                      className={`flex items-center border rounded-xl w-full text-sm transition-all cursor-pointer overflow-hidden ${
                        errors.categoryCertificate
                          ? "border-red-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                        Choose File
                      </span>
                      <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                        {formData.categoryCertificate ? formData.categoryCertificate.name : "No file chosen"}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Category Certificate (if applicable)
                  </p>
                  {errors.categoryCertificate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.categoryCertificate}</span>
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                      errors.subCategory
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Select Sub Category *</option>
                    <option value="ST">ST</option>
                    <option value="SC">SC</option>
                    <option value="OBC">OBC</option>
                  </select>
                  {errors.subCategory && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.subCategory}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-1">Sub Category</p>
                </div>
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="file"
                      name="subCategoryDocument"
                      id="subCategoryDocument"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleSubCategoryDocumentUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="subCategoryDocument"
                      className={`flex items-center border rounded-xl w-full text-sm transition-all cursor-pointer overflow-hidden ${
                        errors.subCategoryDocument
                          ? "border-red-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                        Choose File
                      </span>
                      <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                        {formData.subCategoryDocument ? formData.subCategoryDocument.name : "No file chosen"}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sub Category Certificate (if applicable)
                  </p>
                  {errors.subCategoryDocument && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.subCategoryDocument}</span>
                    </p>
                  )}
                </div>
                <InputField
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="Eligible Qualification*"
                  error={errors.qualification}
                  label="Eligible Qualification"
                />
              </div>

              {/* Row 4: Mobile No, Whatsapp No, Email ID */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="w-full">
                  <input
                    type="tel"
                    name="studentPhone"
                    placeholder="Mobile No *"
                    value={formData.studentPhone}
                    onChange={handleInputChange}
                    disabled={isLoggedIn}
                    className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                      isLoggedIn
                        ? "bg-gray-100 cursor-not-allowed text-gray-700"
                        : errors.studentPhone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                  {errors.studentPhone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.studentPhone}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-1">Mobile No</p>
                </div>
                <div className="w-full">
                  <input
                    type="tel"
                    name="whatsappNo"
                    placeholder="Whatsapp No *"
                    value={formData.whatsappNo}
                    onChange={handleInputChange}
                    disabled={isLoggedIn}
                    className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
                      isLoggedIn
                        ? "bg-gray-100 cursor-not-allowed text-gray-700"
                        : errors.whatsappNo
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                  {errors.whatsappNo && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.whatsappNo}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-1">WhatsApp No</p>
                </div>
                <InputField
                  name="studentEmail"
                  type="email"
                  value={formData.studentEmail}
                  onChange={handleInputChange}
                  placeholder="Email ID *"
                  error={errors.studentEmail}
                  label="Email ID"
                />
              </div>

              {/* Row 5: Aadhaar Card, ABC ID, and BED ID Upload */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Aadhaar Card *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleAadhaarUpload}
                      className="hidden"
                      id="aadhaar-upload"
                    />
                    <label
                      htmlFor="aadhaar-upload"
                      className={`flex items-center border rounded-xl w-full text-sm transition-all cursor-pointer overflow-hidden ${
                        errors.aadhaarCard
                          ? "border-red-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                        Choose File
                      </span>
                      <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                        {formData.aadhaarCard ? formData.aadhaarCard.name : "No file chosen"}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Images or PDF, Max 5MB
                  </p>
                  {errors.aadhaarCard && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.aadhaarCard}</span>
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload ABC ID
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleAbcUpload}
                      className="hidden"
                      id="abc-upload"
                    />
                    <label
                      htmlFor="abc-upload"
                      className={`flex items-center border rounded-xl w-full text-sm transition-all cursor-pointer overflow-hidden ${
                        errors.abcId
                          ? "border-red-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                        Choose File
                      </span>
                      <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                        {formData.abcId ? formData.abcId.name : "No file chosen"}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Images or PDF, Max 5MB (Optional)
                  </p>
                  {errors.abcId && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.abcId}</span>
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload BED ID
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleBedUpload}
                      className="hidden"
                      id="bed-upload"
                    />
                    <label
                      htmlFor="bed-upload"
                      className={`flex items-center border rounded-xl w-full text-sm transition-all cursor-pointer overflow-hidden ${
                        errors.bedId
                          ? "border-red-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                        Choose File
                      </span>
                      <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                        {formData.bedId ? formData.bedId.name : "No file chosen"}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Images or PDF, Max 5MB (Optional)
                  </p>
                  {errors.bedId && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.bedId}</span>
                    </p>
                  )}
                </div>
              </div>
             
            </section>

            {/* === Parent/Guardian Info === */}
            <section className="border-b pb-10 border-gray-200">
              <div className="flex items-center space-x-3 mb-8 pb-3 border-b-2 border-pink-500">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Parent / Guardian Information
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Family contact details
                  </p>
                </div>
              </div>

              {/* Father's Information */}
              <div className="mb-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    1
                  </span>
                  Father's Information
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="fatherFirstName"
                    value={formData.fatherFirstName}
                    onChange={handleInputChange}
                    placeholder="First Name *"
                    error={errors.fatherFirstName}
                    whiteBg={true}
                    label="First Name"
                  />
                  <InputField
                    name="fatherMiddleName"
                    value={formData.fatherMiddleName}
                    onChange={handleInputChange}
                    placeholder="Middle Name *"
                    error={errors.fatherMiddleName}
                    whiteBg={true}
                    label="Middle Name"
                  />
                  <InputField
                    name="fatherLastName"
                    value={formData.fatherLastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    error={errors.fatherLastName}
                    whiteBg={true}
                    label="Last Name"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6 mt-4">
                  <InputField
                    name="fatherEmail"
                    type="email"
                    value={formData.fatherEmail}
                    onChange={handleInputChange}
                    placeholder="Email *"
                    error={errors.fatherEmail}
                    whiteBg={true}
                    label="Email"
                  />
                  <InputField
                    name="fatherPhone"
                    type="tel"
                    value={formData.fatherPhone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    error={errors.fatherPhone}
                    whiteBg={true}
                    label="Phone Number"
                  />
                  <InputField
                    name="fatherWhatsapp"
                    type="tel"
                    value={formData.fatherWhatsapp}
                    onChange={handleInputChange}
                    placeholder="WhatsApp Number *"
                    error={errors.fatherWhatsapp}
                    whiteBg={true}
                    label="WhatsApp Number"
                  />
                </div>
              </div>

              {/* Mother's Information */}
              <div className="mb-8 bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  Mother's Information
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="motherFirstName"
                    value={formData.motherFirstName}
                    onChange={handleInputChange}
                    placeholder="First Name *"
                    error={errors.motherFirstName}
                    whiteBg={true}
                    label="First Name"
                  />
                  <InputField
                    name="motherMiddleName"
                    value={formData.motherMiddleName}
                    onChange={handleInputChange}
                    placeholder="Middle Name *"
                    error={errors.motherMiddleName}
                    whiteBg={true}
                    label="Middle Name"
                  />
                  <InputField
                    name="motherLastName"
                    value={formData.motherLastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    error={errors.motherLastName}
                    whiteBg={true}
                    label="Last Name"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6 mt-4">
                  <InputField
                    name="motherEmail"
                    type="email"
                    value={formData.motherEmail}
                    onChange={handleInputChange}
                    placeholder="Email *"
                    error={errors.motherEmail}
                    whiteBg={true}
                    label="Email"
                  />
                  <InputField
                    name="motherPhone"
                    type="tel"
                    value={formData.motherPhone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    error={errors.motherPhone}
                    whiteBg={true}
                    label="Phone Number"
                  />
                  <InputField
                    name="motherWhatsapp"
                    type="tel"
                    value={formData.motherWhatsapp}
                    onChange={handleInputChange}
                    placeholder="WhatsApp Number *"
                    error={errors.motherWhatsapp}
                    whiteBg={true}
                    label="WhatsApp Number"
                  />
                </div>
              </div>

              {/* Guardian's Information */}
              <div className="mb-8 bg-green-50 p-6 rounded-2xl border border-green-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    3
                  </span>
                  Guardian's Information
                </h4>
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <InputField
                    name="guardianFirstName"
                    value={formData.guardianFirstName}
                    onChange={handleInputChange}
                    placeholder="First Name *"
                    error={errors.guardianFirstName}
                    whiteBg={true}
                    label="First Name"
                  />
                  <InputField
                    name="guardianMiddleName"
                    value={formData.guardianMiddleName}
                    onChange={handleInputChange}
                    placeholder="Middle Name *"
                    error={errors.guardianMiddleName}
                    whiteBg={true}
                    label="Middle Name"
                  />
                  <InputField
                    name="guardianLastName"
                    value={formData.guardianLastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    error={errors.guardianLastName}
                    whiteBg={true}
                    label="Last Name"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    placeholder="Guardian Email *"
                    error={errors.parentEmail}
                    whiteBg={true}
                    label="Guardian Email"
                  />
                  <InputField
                    name="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    placeholder="Guardian Phone *"
                    error={errors.parentPhone}
                    whiteBg={true}
                    label="Guardian Phone"
                  />
                  <InputField
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    placeholder="Relationship (e.g., Father) *"
                    error={errors.relationship}
                    whiteBg={true}
                    label="Relationship"
                  />
                </div>
              </div>
            </section>

            {/* === Academic Background & Needs === */}
            <section className="border-b pb-10 border-gray-200">
              <div className="flex items-center space-x-3 mb-8 pb-3 border-b-2 border-green-500">
                <div className="bg-green-100 p-3 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Academic Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Educational background and qualifications
                  </p>
                </div>
              </div>

              {/* 1. 10th Grade / SSC */}
              <div className="mb-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    1
                  </span>
                  10th Grade / SSC (Required)
                </h4>
                <div className="grid md:grid-cols-4 gap-6 mb-4">
                  <InputField
                    name="tenthBoard"
                    value={formData.tenthBoard}
                    onChange={handleInputChange}
                    placeholder="Board Name (e.g., CBSE, ICSE) *"
                    error={errors.tenthBoard}
                    whiteBg={true}
                    label="Board Name"
                  />
                  <InputField
                    name="tenthSchool"
                    value={formData.tenthSchool}
                    onChange={handleInputChange}
                    placeholder="School Name *"
                    error={errors.tenthSchool}
                    whiteBg={true}
                    label="School Name"
                  />
                  <div className="md:col-span-2">
                    <InputField
                      name="tenthSchoolAddress"
                      value={formData.tenthSchoolAddress}
                      onChange={handleInputChange}
                      placeholder="School Address *"
                      error={errors.tenthSchoolAddress}
                      whiteBg={true}
                      label="School Address"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="tenthYear"
                    value={formData.tenthYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing *"
                    error={errors.tenthYear}
                    whiteBg={true}
                    label="Year of Passing"
                  />
                  <InputField
                    name="tenthPercentage"
                    value={formData.tenthPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA *"
                    error={errors.tenthPercentage}
                    whiteBg={true}
                    label="Percentage / CGPA"
                  />
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="file"
                        name="tenthMarksheet"
                        id="tenthMarksheet"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            tenthMarksheet: file,
                          }));
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="tenthMarksheet"
                        className="flex items-center border border-gray-300 rounded-xl w-full text-sm transition-all cursor-pointer hover:border-blue-500 overflow-hidden"
                      >
                        <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                          Choose File
                        </span>
                        <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                          {formData.tenthMarksheet ? formData.tenthMarksheet.name : "No file chosen"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Marksheet (Optional)
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. 12th Grade / HSC */}
              <div className="mb-8 bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  12th Grade / HSC (Required)
                </h4>
                <div className="grid md:grid-cols-4 gap-6 mb-4">
                  <InputField
                    name="twelfthBoard"
                    value={formData.twelfthBoard}
                    onChange={handleInputChange}
                    placeholder="Board Name *"
                    error={errors.twelfthBoard}
                    whiteBg={true}
                    label="Board Name"
                  />
                  <InputField
                    name="twelfthSchool"
                    value={formData.twelfthSchool}
                    onChange={handleInputChange}
                    placeholder="School / College Name *"
                    error={errors.twelfthSchool}
                    whiteBg={true}
                    label="School / College Name"
                  />
                  <div className="md:col-span-2">
                    <InputField
                      name="twelfthSchoolAddress"
                      value={formData.twelfthSchoolAddress}
                      onChange={handleInputChange}
                      placeholder="School / College Address *"
                      error={errors.twelfthSchoolAddress}
                      whiteBg={true}
                      label="School / College Address"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="twelfthStream"
                    value={formData.twelfthStream}
                    onChange={handleInputChange}
                    placeholder="Stream (Science, Commerce, Arts) *"
                    error={errors.twelfthStream}
                    whiteBg={true}
                    label="Stream"
                  />
                  <InputField
                    name="twelfthYear"
                    value={formData.twelfthYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing *"
                    error={errors.twelfthYear}
                    whiteBg={true}
                    label="Year of Passing"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    name="twelfthPercentage"
                    value={formData.twelfthPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA *"
                    error={errors.twelfthPercentage}
                    whiteBg={true}
                    label="Percentage / CGPA"
                  />
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="file"
                        name="twelfthMarksheet"
                        id="twelfthMarksheet"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            twelfthMarksheet: file,
                          }));
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="twelfthMarksheet"
                        className="flex items-center border border-gray-300 rounded-xl w-full text-sm transition-all cursor-pointer hover:border-purple-500 overflow-hidden"
                      >
                        <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                          Choose File
                        </span>
                        <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                          {formData.twelfthMarksheet ? formData.twelfthMarksheet.name : "No file chosen"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload Marksheet 
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. UG Diploma */}
              <div className="mb-8 bg-green-50 p-6 rounded-2xl border border-green-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    3
                  </span>
                  UG Diploma (If Applicable)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="ugDiplomaInstitute"
                    value={formData.ugDiplomaInstitute}
                    onChange={handleInputChange}
                    placeholder="Institute Name"
                    error={errors.ugDiplomaInstitute}
                    whiteBg={true}
                    label="Institute Name"
                  />
                  <InputField
                    name="ugDiplomaCourse"
                    value={formData.ugDiplomaCourse}
                    onChange={handleInputChange}
                    placeholder="Diploma Course Name"
                    error={errors.ugDiplomaCourse}
                    whiteBg={true}
                    label="Diploma Course Name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="ugDiplomaSpecialization"
                    value={formData.ugDiplomaSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization"
                    error={errors.ugDiplomaSpecialization}
                    whiteBg={true}
                    label="Specialization"
                  />
                  <InputField
                    name="ugDiplomaYear"
                    value={formData.ugDiplomaYear}
                    onChange={handleInputChange}
                    placeholder="Year of Completion"
                    error={errors.ugDiplomaYear}
                    whiteBg={true}
                    label="Year of Completion"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    name="ugDiplomaPercentage"
                    value={formData.ugDiplomaPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.ugDiplomaPercentage}
                    whiteBg={true}
                    label="Percentage / CGPA"
                  />
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="file"
                        name="ugDiplomaMarksheet"
                        id="ugDiplomaMarksheet"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            ugDiplomaMarksheet: file,
                          }));
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="ugDiplomaMarksheet"
                        className="flex items-center border border-gray-300 rounded-xl w-full text-sm transition-all cursor-pointer hover:border-green-500 overflow-hidden"
                      >
                        <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                          Choose File
                        </span>
                        <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                          {formData.ugDiplomaMarksheet ? formData.ugDiplomaMarksheet.name : "No file chosen"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload Marksheet (Optional)
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Under Graduate (UG) */}
              <div className="mb-8 bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    4
                  </span>
                  Under Graduate - UG (If Applicable)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="ugCollege"
                    value={formData.ugCollege}
                    onChange={handleInputChange}
                    placeholder="College / University Name"
                    error={errors.ugCollege}
                    whiteBg={true}
                    label="College / University Name"
                  />
                  <InputField
                    name="ugCourse"
                    value={formData.ugCourse}
                    onChange={handleInputChange}
                    placeholder="Course Name (B.Sc, B.Tech, B.Com)"
                    error={errors.ugCourse}
                    whiteBg={true}
                    label="Course Name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="ugSpecialization"
                    value={formData.ugSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization / Major"
                    error={errors.ugSpecialization}
                    whiteBg={true}
                    label="Specialization / Major"
                  />
                  <InputField
                    name="ugYear"
                    value={formData.ugYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing"
                    error={errors.ugYear}
                    whiteBg={true}
                    label="Year of Passing"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    name="ugPercentage"
                    value={formData.ugPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.ugPercentage}
                    whiteBg={true}
                    label="Percentage / CGPA"
                  />
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="file"
                        name="ugMarksheet"
                        id="ugMarksheet"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            ugMarksheet: file,
                          }));
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="ugMarksheet"
                        className="flex items-center border border-gray-300 rounded-xl w-full text-sm transition-all cursor-pointer hover:border-yellow-500 overflow-hidden"
                      >
                        <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                          Choose File
                        </span>
                        <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                          {formData.ugMarksheet ? formData.ugMarksheet.name : "No file chosen"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload Marksheet (Optional)
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. PG Diploma */}
              <div className="mb-8 bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    5
                  </span>
                  PG Diploma (If Applicable)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="pgDiplomaInstitute"
                    value={formData.pgDiplomaInstitute}
                    onChange={handleInputChange}
                    placeholder="Institute Name"
                    error={errors.pgDiplomaInstitute}
                    whiteBg={true}
                    label="Institute Name"
                  />
                  <InputField
                    name="pgDiplomaCourse"
                    value={formData.pgDiplomaCourse}
                    onChange={handleInputChange}
                    placeholder="Course Title"
                    error={errors.pgDiplomaCourse}
                    whiteBg={true}
                    label="Course Title"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="pgDiplomaSpecialization"
                    value={formData.pgDiplomaSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization"
                    error={errors.pgDiplomaSpecialization}
                    whiteBg={true}
                    label="Specialization"
                  />
                  <InputField
                    name="pgDiplomaYear"
                    value={formData.pgDiplomaYear}
                    onChange={handleInputChange}
                    placeholder="Year of Completion"
                    error={errors.pgDiplomaYear}
                    whiteBg={true}
                    label="Year of Completion"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    name="pgDiplomaPercentage"
                    value={formData.pgDiplomaPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.pgDiplomaPercentage}
                    whiteBg={true}
                    label="Percentage / CGPA"
                  />
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="file"
                        name="pgDiplomaMarksheet"
                        id="pgDiplomaMarksheet"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            pgDiplomaMarksheet: file,
                          }));
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="pgDiplomaMarksheet"
                        className="flex items-center border border-gray-300 rounded-xl w-full text-sm transition-all cursor-pointer hover:border-pink-500 overflow-hidden"
                      >
                        <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                          Choose File
                        </span>
                        <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                          {formData.pgDiplomaMarksheet ? formData.pgDiplomaMarksheet.name : "No file chosen"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload Marksheet (Optional)
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Post Graduate (PG) */}
              <div className="mb-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    6
                  </span>
                  Post Graduate - PG (If Applicable)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="pgUniversity"
                    value={formData.pgUniversity}
                    onChange={handleInputChange}
                    placeholder="University Name"
                    error={errors.pgUniversity}
                    whiteBg={true}
                    label="University Name"
                  />
                  <InputField
                    name="pgCourse"
                    value={formData.pgCourse}
                    onChange={handleInputChange}
                    placeholder="Course Name (M.Sc, M.Tech, MBA)"
                    error={errors.pgCourse}
                    whiteBg={true}
                    label="Course Name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="pgSpecialization"
                    value={formData.pgSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization"
                    error={errors.pgSpecialization}
                    whiteBg={true}
                    label="Specialization"
                  />
                  <InputField
                    name="pgYear"
                    value={formData.pgYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing"
                    error={errors.pgYear}
                    whiteBg={true}
                    label="Year of Passing"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    name="pgPercentage"
                    value={formData.pgPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.pgPercentage}
                    whiteBg={true}
                    label="Percentage / CGPA"
                  />
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="file"
                        name="pgMarksheet"
                        id="pgMarksheet"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            pgMarksheet: file,
                          }));
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="pgMarksheet"
                        className="flex items-center border border-gray-300 rounded-xl w-full text-sm transition-all cursor-pointer hover:border-indigo-500 overflow-hidden"
                      >
                        <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                          Choose File
                        </span>
                        <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
                          {formData.pgMarksheet ? formData.pgMarksheet.name : "No file chosen"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload Marksheet (Optional)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* === Contact Details === */}
            <section className="border-b  border-gray-200">
              <div className="flex items-center space-x-3 mb-8 pb-3 border-b-2 border-orange-500">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Communication Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Current and permanent address
                  </p>
                </div>
              </div>

              {/* Current Address */}
              <div className="mb-8 bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    1
                  </span>
                  Current Address
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="currentHouseNo"
                    value={formData.currentHouseNo}
                    onChange={handleInputChange}
                    placeholder="House / Flat No *"
                    error={errors.currentHouseNo}
                    whiteBg={true}
                    label="House / Flat No"
                  />
                  <InputField
                    name="currentStreet"
                    value={formData.currentStreet}
                    onChange={handleInputChange}
                    placeholder="Street / Road *"
                    error={errors.currentStreet}
                    whiteBg={true}
                    label="Street / Road"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="currentArea"
                    value={formData.currentArea}
                    onChange={handleInputChange}
                    placeholder="Area / Locality *"
                    error={errors.currentArea}
                    whiteBg={true}
                    label="Area / Locality"
                  />
                  <InputField
                    name="currentLandmark"
                    value={formData.currentLandmark}
                    onChange={handleInputChange}
                    placeholder="Landmark"
                    error={errors.currentLandmark}
                    whiteBg={true}
                    label="Landmark"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleInputChange}
                    placeholder="City *"
                    error={errors.currentCity}
                    whiteBg={true}
                    label="City"
                  />
                  <InputField
                    name="currentDistrict"
                    value={formData.currentDistrict}
                    onChange={handleInputChange}
                    placeholder="District *"
                    error={errors.currentDistrict}
                    whiteBg={true}
                    label="District"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="currentState"
                    value={formData.currentState}
                    onChange={handleInputChange}
                    placeholder="State *"
                    error={errors.currentState}
                    whiteBg={true}
                    label="State"
                  />
                  <InputField
                    name="currentPincode"
                    value={formData.currentPincode}
                    onChange={handleInputChange}
                    placeholder="Pincode *"
                    error={errors.currentPincode}
                    whiteBg={true}
                    label="Pincode"
                  />
                  <InputField
                    name="currentCountry"
                    value={formData.currentCountry}
                    onChange={handleInputChange}
                    placeholder="Country *"
                    error={errors.currentCountry}
                    whiteBg={true}
                    label="Country"
                  />
                </div>
              </div>

              {/* Permanent Address */}
              <div className="mb-8 bg-teal-50 p-6 rounded-2xl border border-teal-100">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      2
                    </span>
                    Permanent Address
                  </h4>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sameAsCurrent"
                      checked={formData.sameAsCurrent}
                      onChange={handleSameAsCurrentChange}
                      className="w-5 h-5 accent-teal-600 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Same as Current Address
                    </span>
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="permanentHouseNo"
                    value={formData.permanentHouseNo}
                    onChange={handleInputChange}
                    placeholder="House / Flat No *"
                    error={errors.permanentHouseNo}
                    whiteBg={true}
                    label="House / Flat No"
                  />
                  <InputField
                    name="permanentStreet"
                    value={formData.permanentStreet}
                    onChange={handleInputChange}
                    placeholder="Street / Road *"
                    error={errors.permanentStreet}
                    whiteBg={true}
                    label="Street / Road"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="permanentArea"
                    value={formData.permanentArea}
                    onChange={handleInputChange}
                    placeholder="Area / Locality *"
                    error={errors.permanentArea}
                    whiteBg={true}
                    label="Area / Locality"
                  />
                  <InputField
                    name="permanentLandmark"
                    value={formData.permanentLandmark}
                    onChange={handleInputChange}
                    placeholder="Landmark"
                    error={errors.permanentLandmark}
                    whiteBg={true}
                    label="Landmark"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="permanentCity"
                    value={formData.permanentCity}
                    onChange={handleInputChange}
                    placeholder="City *"
                    error={errors.permanentCity}
                    whiteBg={true}
                    label="City"
                  />
                  <InputField
                    name="permanentDistrict"
                    value={formData.permanentDistrict}
                    onChange={handleInputChange}
                    placeholder="District *"
                    error={errors.permanentDistrict}
                    whiteBg={true}
                    label="District"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="permanentState"
                    value={formData.permanentState}
                    onChange={handleInputChange}
                    placeholder="State *"
                    error={errors.permanentState}
                    whiteBg={true}
                    label="State"
                  />
                  <InputField
                    name="permanentPincode"
                    value={formData.permanentPincode}
                    onChange={handleInputChange}
                    placeholder="Pincode *"
                    error={errors.permanentPincode}
                    whiteBg={true}
                    label="Pincode"
                  />
                  <InputField
                    name="permanentCountry"
                    value={formData.permanentCountry}
                    onChange={handleInputChange}
                    placeholder="Country *"
                    error={errors.permanentCountry}
                    whiteBg={true}
                    label="Country"
                  />
                </div>
              </div>
            </section>
            {/* === Terms and Submission === */}
            <section className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border-2 border-gray-200">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-6 h-6 accent-blue-600 cursor-pointer"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-base text-gray-700 cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <span className="font-semibold text-blue-600 hover:text-blue-700 underline">
                    terms and conditions
                  </span>{" "}
                  required for application and confirm that all information
                  provided is accurate and complete. *
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-3 flex items-center ml-10 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 mr-2 inline shrink-0" />
                  <span>{errors.agreeTerms}</span>
                </p>
              )}
            </section>

            {/* === Submit Button === */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-2xl font-extrabold text-lg shadow-2xl shadow-blue-300 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Please review all information before submitting
              </p>
            </div>
          </form>
        </div>
      </div>
  
      </div>
  );
}

export default RegistrationForm;
