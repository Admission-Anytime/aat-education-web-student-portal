import React, { useState } from "react";
import axios from "axios";
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
}) => (
  <div className="w-full">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-3 rounded-xl w-full transition-all focus:ring-2 focus:ring-opacity-50 ${
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
  </div>
);

function RegistrationForm() {
  const [formData, setFormData] = useState({
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
    category: "",
    subCategory: "",
    qualification: "",
    studentPhone: "",
    whatsappNo: "",
    studentEmail: "",
    grade: "",
    program: "", // Not used in current UI, but kept in state
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
    // 10th Grade
    tenthBoard: "",
    tenthSchool: "",
    tenthYear: "",
    tenthPercentage: "",
    tenthMarksheet: null,
    // 12th Grade
    twelfthBoard: "",
    twelfthSchool: "",
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
    // UG
    ugCollege: "",
    ugCourse: "",
    ugSpecialization: "",
    ugYear: "",
    ugPercentage: "",
    // PG Diploma
    pgDiplomaInstitute: "",
    pgDiplomaCourse: "",
    pgDiplomaSpecialization: "",
    pgDiplomaYear: "",
    pgDiplomaPercentage: "",
    // PG
    pgUniversity: "",
    pgCourse: "",
    pgSpecialization: "",
    pgYear: "",
    pgPercentage: "",
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
      "currentAddress",
      "currentCity",
      "currentState",
      "currentZipCode",
      "permanentAddress",
      "permanentCity",
      "permanentState",
      "permanentZipCode",
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
      "tenthYear",
      "tenthPercentage",
      "twelfthBoard",
      "twelfthSchool",
      "twelfthStream",
      "twelfthYear",
      "twelfthPercentage",
      "agreeTerms",
    ];

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
          key !== "twelfthMarksheet"
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append files
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }
      if (formData.tenthMarksheet) {
        formDataToSend.append("tenthMarksheet", formData.tenthMarksheet);
      }
      if (formData.twelfthMarksheet) {
        formDataToSend.append("twelfthMarksheet", formData.twelfthMarksheet);
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
                category: "",
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
                tenthYear: "",
                tenthPercentage: "",
                tenthMarksheet: null,
                twelfthBoard: "",
                twelfthSchool: "",
                twelfthStream: "",
                twelfthYear: "",
                twelfthPercentage: "",
                twelfthMarksheet: null,
                ugDiplomaInstitute: "",
                ugDiplomaCourse: "",
                ugDiplomaSpecialization: "",
                ugDiplomaYear: "",
                ugDiplomaPercentage: "",
                ugCollege: "",
                ugCourse: "",
                ugSpecialization: "",
                ugYear: "",
                ugPercentage: "",
                pgDiplomaInstitute: "",
                pgDiplomaCourse: "",
                pgDiplomaSpecialization: "",
                pgDiplomaYear: "",
                pgDiplomaPercentage: "",
                pgUniversity: "",
                pgCourse: "",
                pgSpecialization: "",
                pgYear: "",
                pgPercentage: "",
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
              <h2 className="text-4xl font-extrabold mb-3 tracking-tight">
                Student Registration Form
              </h2>
              <p className="text-blue-100 text-lg">
                Complete all sections to submit your application
              </p>
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
                    name="programmeName"
                    value={formData.programmeName}
                    onChange={handleInputChange}
                    placeholder="Programme Name *"
                    error={errors.programmeName}
                  />
                  <InputField
                    name="specialisation"
                    value={formData.specialisation}
                    onChange={handleInputChange}
                    placeholder="Specialisation *"
                    error={errors.specialisation}
                  />
                  <InputField
                    name="registrationId"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    placeholder="Registration ID *"
                    error={errors.registrationId}
                  />
                </div>

                {/* Right Column: Photo Upload & Preview */}
                <div className="flex justify-center items-start">
                  <div className="w-54">
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
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                            errors.photo
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-gray-50"
                          }`}
                        >
                          <Upload
                            className={`w-10 h-10 mb-2 ${
                              errors.photo ? "text-red-500" : "text-gray-400"
                            }`}
                          />
                          <p
                            className={`text-sm ${
                              errors.photo ? "text-red-500" : "text-gray-600"
                            }`}
                          >
                            Click to upload
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative w-full h-64 border-2 border-gray-300 rounded-xl overflow-hidden">
                        <img
                          src={formData.photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
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
                />
                <InputField
                  name="studentMiddleName"
                  value={formData.studentMiddleName}
                  onChange={handleInputChange}
                  placeholder="Middle Name *"
                  error={errors.studentMiddleName}
                />
                <InputField
                  name="studentLastName"
                  value={formData.studentLastName}
                  onChange={handleInputChange}
                  placeholder="Last Name *"
                  error={errors.studentLastName}
                />
              </div>

              {/* Row 2: Gender, DOB, Quota */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
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
                </div>
                <div className="w-full">
                  <InputField
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    placeholder="Date of Birth *"
                    error={errors.dateOfBirth}
                  />
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
                    <option value="">Select Quota *</option>
                    <option value="Ex Army">Ex Army</option>
                    <option value="Teacher Staff">Teacher Staff</option>
                  </select>
                  {errors.quota && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.quota}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Category, Sub Category, Qualification */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
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
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
                      <span className="ml-1">{errors.category}</span>
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
                </div>
                <InputField
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="Qualification *"
                  error={errors.qualification}
                />
              </div>

              {/* Row 4: Mobile No, Whatsapp No, Email ID */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <InputField
                  name="studentPhone"
                  type="tel"
                  value={formData.studentPhone}
                  onChange={handleInputChange}
                  placeholder="Mobile No *"
                  error={errors.studentPhone}
                />
                <InputField
                  name="whatsappNo"
                  type="tel"
                  value={formData.whatsappNo}
                  onChange={handleInputChange}
                  placeholder="Whatsapp No *"
                  error={errors.whatsappNo}
                />
                <InputField
                  name="studentEmail"
                  type="email"
                  value={formData.studentEmail}
                  onChange={handleInputChange}
                  placeholder="Email ID *"
                  error={errors.studentEmail}
                />
              </div>
              
              {/* Row 5: Grade */}
             
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
                  />
                  <InputField
                    name="fatherMiddleName"
                    value={formData.fatherMiddleName}
                    onChange={handleInputChange}
                    placeholder="Middle Name *"
                    error={errors.fatherMiddleName}
                  />
                  <InputField
                    name="fatherLastName"
                    value={formData.fatherLastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    error={errors.fatherLastName}
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
                  />
                  <InputField
                    name="fatherPhone"
                    type="tel"
                    value={formData.fatherPhone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    error={errors.fatherPhone}
                  />
                  <InputField
                    name="fatherWhatsapp"
                    type="tel"
                    value={formData.fatherWhatsapp}
                    onChange={handleInputChange}
                    placeholder="WhatsApp Number *"
                    error={errors.fatherWhatsapp}
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
                  />
                  <InputField
                    name="motherMiddleName"
                    value={formData.motherMiddleName}
                    onChange={handleInputChange}
                    placeholder="Middle Name *"
                    error={errors.motherMiddleName}
                  />
                  <InputField
                    name="motherLastName"
                    value={formData.motherLastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    error={errors.motherLastName}
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
                  />
                  <InputField
                    name="motherPhone"
                    type="tel"
                    value={formData.motherPhone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    error={errors.motherPhone}
                  />
                  <InputField
                    name="motherWhatsapp"
                    type="tel"
                    value={formData.motherWhatsapp}
                    onChange={handleInputChange}
                    placeholder="WhatsApp Number *"
                    error={errors.motherWhatsapp}
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
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="guardianFirstName"
                    value={formData.guardianFirstName}
                    onChange={handleInputChange}
                    placeholder="First Name *"
                    error={errors.guardianFirstName}
                  />
                  <InputField
                    name="guardianMiddleName"
                    value={formData.guardianMiddleName}
                    onChange={handleInputChange}
                    placeholder="Middle Name *"
                    error={errors.guardianMiddleName}
                  />
                  <InputField
                    name="guardianLastName"
                    value={formData.guardianLastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    error={errors.guardianLastName}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <InputField
                  name="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  placeholder="Parent Email *"
                  error={errors.parentEmail}
                />
                <InputField
                  name="parentPhone"
                  type="tel"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  placeholder="Parent Phone *"
                  error={errors.parentPhone}
                />
                <InputField
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  placeholder="Relationship (e.g., Father) *"
                  error={errors.relationship}
                />
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
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="tenthBoard"
                    value={formData.tenthBoard}
                    onChange={handleInputChange}
                    placeholder="Board Name (e.g., CBSE, ICSE) *"
                    error={errors.tenthBoard}
                  />
                  <InputField
                    name="tenthSchool"
                    value={formData.tenthSchool}
                    onChange={handleInputChange}
                    placeholder="School Name *"
                    error={errors.tenthSchool}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="tenthYear"
                    value={formData.tenthYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing *"
                    error={errors.tenthYear}
                  />
                  <InputField
                    name="tenthPercentage"
                    value={formData.tenthPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA *"
                    error={errors.tenthPercentage}
                  />
                  <div className="w-full">
                    <input
                      type="file"
                      name="tenthMarksheet"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormData((prev) => ({
                          ...prev,
                          tenthMarksheet: file,
                        }));
                      }}
                      className="border border-gray-300 p-2.5 rounded-xl w-full text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    />
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
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="twelfthBoard"
                    value={formData.twelfthBoard}
                    onChange={handleInputChange}
                    placeholder="Board Name *"
                    error={errors.twelfthBoard}
                  />
                  <InputField
                    name="twelfthSchool"
                    value={formData.twelfthSchool}
                    onChange={handleInputChange}
                    placeholder="School / College Name *"
                    error={errors.twelfthSchool}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="twelfthStream"
                    value={formData.twelfthStream}
                    onChange={handleInputChange}
                    placeholder="Stream (Science, Commerce, Arts) *"
                    error={errors.twelfthStream}
                  />
                  <InputField
                    name="twelfthYear"
                    value={formData.twelfthYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing *"
                    error={errors.twelfthYear}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    name="twelfthPercentage"
                    value={formData.twelfthPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA *"
                    error={errors.twelfthPercentage}
                  />
                  <div className="w-full">
                    <input
                      type="file"
                      name="twelfthMarksheet"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormData((prev) => ({
                          ...prev,
                          twelfthMarksheet: file,
                        }));
                      }}
                      className="border border-gray-300 p-2.5 rounded-xl w-full text-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Marksheet (Optional)
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
                  UG Diploma (Optional)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="ugDiplomaInstitute"
                    value={formData.ugDiplomaInstitute}
                    onChange={handleInputChange}
                    placeholder="Institute Name"
                    error={errors.ugDiplomaInstitute}
                  />
                  <InputField
                    name="ugDiplomaCourse"
                    value={formData.ugDiplomaCourse}
                    onChange={handleInputChange}
                    placeholder="Diploma Course Name"
                    error={errors.ugDiplomaCourse}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="ugDiplomaSpecialization"
                    value={formData.ugDiplomaSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization"
                    error={errors.ugDiplomaSpecialization}
                  />
                  <InputField
                    name="ugDiplomaYear"
                    value={formData.ugDiplomaYear}
                    onChange={handleInputChange}
                    placeholder="Year of Completion"
                    error={errors.ugDiplomaYear}
                  />
                  <InputField
                    name="ugDiplomaPercentage"
                    value={formData.ugDiplomaPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.ugDiplomaPercentage}
                  />
                </div>
              </div>

              {/* 4. Under Graduate (UG) */}
              <div className="mb-8 bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    4
                  </span>
                  Under Graduate (UG) (Optional)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="ugCollege"
                    value={formData.ugCollege}
                    onChange={handleInputChange}
                    placeholder="College / University Name"
                    error={errors.ugCollege}
                  />
                  <InputField
                    name="ugCourse"
                    value={formData.ugCourse}
                    onChange={handleInputChange}
                    placeholder="Course Name (B.Sc, B.Tech, B.Com)"
                    error={errors.ugCourse}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="ugSpecialization"
                    value={formData.ugSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization / Major"
                    error={errors.ugSpecialization}
                  />
                  <InputField
                    name="ugYear"
                    value={formData.ugYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing"
                    error={errors.ugYear}
                  />
                  <InputField
                    name="ugPercentage"
                    value={formData.ugPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.ugPercentage}
                  />
                </div>
              </div>

              {/* 5. PG Diploma */}
              <div className="mb-8 bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    5
                  </span>
                  PG Diploma (Optional)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="pgDiplomaInstitute"
                    value={formData.pgDiplomaInstitute}
                    onChange={handleInputChange}
                    placeholder="Institute Name"
                    error={errors.pgDiplomaInstitute}
                  />
                  <InputField
                    name="pgDiplomaCourse"
                    value={formData.pgDiplomaCourse}
                    onChange={handleInputChange}
                    placeholder="Course Title"
                    error={errors.pgDiplomaCourse}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="pgDiplomaSpecialization"
                    value={formData.pgDiplomaSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization"
                    error={errors.pgDiplomaSpecialization}
                  />
                  <InputField
                    name="pgDiplomaYear"
                    value={formData.pgDiplomaYear}
                    onChange={handleInputChange}
                    placeholder="Year of Completion"
                    error={errors.pgDiplomaYear}
                  />
                  <InputField
                    name="pgDiplomaPercentage"
                    value={formData.pgDiplomaPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.pgDiplomaPercentage}
                  />
                </div>
              </div>

              {/* 6. Post Graduate (PG) */}
              <div className="mb-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    6
                  </span>
                  Post Graduate (PG) (Optional)
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <InputField
                    name="pgUniversity"
                    value={formData.pgUniversity}
                    onChange={handleInputChange}
                    placeholder="University Name"
                    error={errors.pgUniversity}
                  />
                  <InputField
                    name="pgCourse"
                    value={formData.pgCourse}
                    onChange={handleInputChange}
                    placeholder="Course Name (M.Sc, M.Tech, MBA)"
                    error={errors.pgCourse}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="pgSpecialization"
                    value={formData.pgSpecialization}
                    onChange={handleInputChange}
                    placeholder="Specialization"
                    error={errors.pgSpecialization}
                  />
                  <InputField
                    name="pgYear"
                    value={formData.pgYear}
                    onChange={handleInputChange}
                    placeholder="Year of Passing"
                    error={errors.pgYear}
                  />
                  <InputField
                    name="pgPercentage"
                    value={formData.pgPercentage}
                    onChange={handleInputChange}
                    placeholder="Percentage / CGPA"
                    error={errors.pgPercentage}
                  />
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
                <div className="mb-4">
                  <InputField
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    placeholder="Street Address *"
                    error={errors.currentAddress}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleInputChange}
                    placeholder="City *"
                    error={errors.currentCity}
                  />
                  <InputField
                    name="currentState"
                    value={formData.currentState}
                    onChange={handleInputChange}
                    placeholder="State *"
                    error={errors.currentState}
                  />
                  <InputField
                    name="currentZipCode"
                    value={formData.currentZipCode}
                    onChange={handleInputChange}
                    placeholder="ZIP Code *"
                    error={errors.currentZipCode}
                  />
                </div>
              </div>

              {/* Permanent Address */}
              <div className="mb-6 bg-teal-50 p-6 rounded-2xl border border-teal-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  Permanent Address
                </h4>
                <div className="mb-4">
                  <InputField
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    placeholder="Street Address *"
                    error={errors.permanentAddress}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    name="permanentCity"
                    value={formData.permanentCity}
                    onChange={handleInputChange}
                    placeholder="City *"
                    error={errors.permanentCity}
                  />
                  <InputField
                    name="permanentState"
                    value={formData.permanentState}
                    onChange={handleInputChange}
                    placeholder="State *"
                    error={errors.permanentState}
                  />
                  <InputField
                    name="permanentZipCode"
                    value={formData.permanentZipCode}
                    onChange={handleInputChange}
                    placeholder="ZIP Code *"
                    error={errors.permanentZipCode}
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
