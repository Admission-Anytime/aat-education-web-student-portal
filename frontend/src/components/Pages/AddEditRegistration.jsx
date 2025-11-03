import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  X,
  Mail,
  DollarSign,
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import SendMailForm from "./SendMailForm";
import FeeStructureGenerator from "./FeeStructureGenerator";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

const AddEditRegistration = ({ editingRegistration, onSubmit, onBack, registrationId }) => {
  // ✅ Utility functions
  const toPascalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const toCamelCase = (str) => str.charAt(0).toLowerCase() + str.slice(1);

  const capitalizeKeys = (obj) => {
    const newObj = {};
    for (const key in obj) newObj[toPascalCase(key)] = obj[key];
    return newObj;
  };

  const camelCaseKeys = (obj) => {
    const newObj = {};
    for (const key in obj) newObj[toCamelCase(key)] = obj[key];
    return newObj;
  };

  // ✅ Form state
  const [formData, setFormData] = useState({
    ProgrammeName: "",
    Specialisation: "",
    Session: "",
    RegistrationId: "",
    Photo: null,
    photoPreview: null,
    AadhaarCard: null,
    AadhaarNumber: "",
    AbcId: null,
    AbcIdNumber: "",
    DebId: null, // DebId should store the file object, not BedId
    DebIdNumber: "",
    StudentFirstName: "",
    StudentMiddleName: "",
    StudentLastName: "",
    Gender: "",
    DateOfBirth: "",
    Quota: "",
    QuotaDocument: null,
    Category: "",
    CategoryCertificate: null,
    SubCategory: "",
    SubCategoryDocument: null,
    Qualification: "",
    StudentPhone: "",
    WhatsappNo: "",
    StudentEmail: "",
    Grade: "",
    Program: "",
    CurrentHouseNo: "",
    CurrentStreet: "",
    CurrentArea: "",
    CurrentLandmark: "",
    CurrentCity: "",
    CurrentDistrict: "",
    CurrentState: "",
    CurrentPincode: "",
    CurrentCountry: "",
    PermanentHouseNo: "",
    PermanentStreet: "",
    PermanentArea: "",
    PermanentLandmark: "",
    PermanentCity: "",
    PermanentDistrict: "",
    PermanentState: "",
    PermanentPincode: "",
    PermanentCountry: "",
    SameAsCurrent: false,
    FatherFirstName: "",
    FatherMiddleName: "",
    FatherLastName: "",
    FatherEmail: "",
    FatherPhone: "",
    FatherWhatsapp: "",
    MotherFirstName: "",
    MotherMiddleName: "",
    MotherLastName: "",
    MotherEmail: "",
    MotherPhone: "",
    MotherWhatsapp: "",
    GuardianFirstName: "",
    GuardianMiddleName: "",
    GuardianLastName: "",
    ParentEmail: "",
    ParentPhone: "",
    Relationship: "",
    EmergencyName: "",
    EmergencyPhone: "",
    EmergencyRelationship: "",
    PreviousSchool: "",
    TenthBoard: "",
    TenthSchool: "",
    TenthSchoolAddress: "",
    TenthYear: "",
    TenthPercentage: "",
    TenthMarksheet: null,
    TwelfthBoard: "",
    TwelfthSchool: "",
    TwelfthSchoolAddress: "",
    TwelfthStream: "",
    TwelfthYear: "",
    TwelfthPercentage: "",
    TwelfthMarksheet: null,
    UgDiplomaInstitute: "",
    UgDiplomaCourse: "",
    UgDiplomaSpecialization: "",
    UgDiplomaYear: "",
    UgDiplomaPercentage: "",
    UgDiplomaMarksheet: null,
    UgCollege: "",
    UgCourse: "",
    UgSpecialization: "",
    UgYear: "",
    UgPercentage: "",
    UgMarksheet: null,
    PgDiplomaInstitute: "",
    PgDiplomaCourse: "",
    PgDiplomaSpecialization: "",
    PgDiplomaYear: "",
    PgDiplomaPercentage: "",
    PgDiplomaMarksheet: null,
    PgUniversity: "",
    PgCourse: "",
    PgSpecialization: "",
    PgYear: "",
    PgPercentage: "",
    PgMarksheet: null,
    Gpa: "",
    Interests: "",
    WhyApplying: "",
    SpecialNeeds: "",
    Medications: "",
    AgreeTerms: false,
    Status: "Pending",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [sectionChecked, setSectionChecked] = useState({});
  const [showMailForm, setShowMailForm] = useState(false);
  // ✅ New state for Fee Generator 
  const [showFeeGenerator, setShowFeeGenerator] = useState(false);
  const [feeGenerated, setFeeGenerated] = useState(false);
  const [errors, setErrors] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({
    "Student Information": false,
    "Student's Documents": false,
    "Mother's Information": false,
    "Father's Information": false,
    "Guardian Information": false,
    "10th Grade": false,
    "12th Grade": false,
    "UG Diploma": false,
    "UG": false,
    "PG Diploma": false,
    "PG": false,
    "Current Address": false,
    "Permanent Address": false,
  });

  const toggleSection = (sectionTitle) => {
    setCollapsedSections(prev => ({ ...prev, [sectionTitle]: !prev[sectionTitle] }));
  };

  // ✅ Sections
  const sections = [
    {
      title: "Student Information",
      fields: [
        "Photo",
        "RegistrationId",
        "ProgrammeName", // moved on top
        "Specialisation",
        "Session",

        "StudentFirstName",
        "StudentMiddleName",
        "StudentLastName",
        "Gender",
        "DateOfBirth",
        "Eligible Qualification",

        "MobileNo",
        "WhatsappNo",
        "StudentEmail",
      ],
    },
    {
      title: "Student's Documents",
      fields: [
        "AadhaarNumber",
        "AadhaarCard",
        "Quota",
        "QuotaDocument",
        "Category",
        "CategoryCertificate",
        "SubCategory",
        "SubCategoryDocument",
        "AbcIdNumber", // text input
        "AbcId", // file upload
        "DebIdNumber", // text input
        "DebId", // file upload
      ],
    },
    {
      title: "Father's Information",
      fields: [
        "FatherFirstName",
        "FatherMiddleName",
        "FatherLastName",
        "FatherEmail",
        "FatherPhone",
        "FatherWhatsapp",
      ],
    },
    {
      title: "Mother's Information",
      fields: [
        "MotherFirstName",
        "MotherMiddleName",
        "MotherLastName",
        "MotherEmail",
        "MotherPhone",
        "MotherWhatsapp",
      ],
    },
    {
      title: "Guardian Information",
      fields: [
        "GuardianFirstName",
        "GuardianMiddleName",
        "GuardianLastName",
        "GuardianEmail",
        "GuardianPhone",
        "RelationshipWithStudent",
      ],
    },

    {
      title: "Academic Details",
      fields: [],
    },
    {
      title: "10th Grade",
      fields: [
        "10thBoard",
        "10thSchool",
        "10thSchoolAddress",
        "10thYear",
        "10thPercentage",
        "10thMarksheet",
      ],
    },
    {
      title: "12th Grade",
      fields: [
        "12thBoard",
        "12thSchool",
        "12thSchoolAddress",
        "12thStream",
        "12thYear",
        "12thPercentage",
        "12thMarksheet",
      ],
    },
    {
      title: "UG Diploma",
      fields: [
        "UgDiplomaInstitute",
        "UgDiplomaCourse",
        "UgDiplomaSpecialization",
        "UgDiplomaYear",
        "UgDiplomaPercentage",
        "UgDiplomaMarksheet",
      ],
    },
    {
      title: "UG",
      fields: [
        "UgCollege",
        "UgCourse",
        "UgSpecialization",
        "UgYear",
        "UgPercentage",
        "UgMarksheet",
      ],
    },
    {
      title: "PG Diploma",
      fields: [
        "PgDiplomaInstitute",
        "PgDiplomaCourse",
        "PgDiplomaSpecialization",
        "PgDiplomaYear",
        "PgDiplomaPercentage",
        "PgDiplomaMarksheet",
      ],
    },
    {
      title: "PG",
      fields: [
        "PgUniversity",
        "PgCourse",
        "PgSpecialization",
        "PgYear",
        "PgPercentage",
        "PgMarksheet",
      ],
    },
    {
      title: "Communication Details",
      fields: [],
    },
    {
      title: "Current Address",
      fields: [
        "CurrentHouseNoOrFlatNo",
        "CurrentStreetNoOrName",
        "CurrentAreaOrLocality",
        "CurrentLandmark",
        "CurrentCity",
        "CurrentDistrict",
        "CurrentState",
        "CurrentPincode",
        "CurrentCountry",
      ],
    },
    {
      title: "Permanent Address",
      fields: [
        "PermanentHouseNoOrFlatNo",
        "PermanentStreetNoOrName",
        "PermanentAreaOrLocality",
        "PermanentLandmark",
        "PermanentCity",
        "PermanentDistrict",
        "PermanentState",
        "PermanentPincode",
        "PermanentCountry",
        "SameAsCurrent",
      ],
    },
    { title: "Consent & Status", fields: ["AgreeTerms", "Status"] },
  ];

  useEffect(() => {
    const initialState = {};
    sections.forEach((s) => (initialState[s.title] = false));
    setSectionChecked(initialState);
  }, []);

  useEffect(() => {
    const fetchRegistration = async () => {
      if (registrationId) {
        try {
          const res = await axios.get(`${BASE_URL}/api/registrations/${registrationId}`);
          const pascalCaseData = capitalizeKeys(res.data);
          setFormData((prev) => ({ ...prev, ...pascalCaseData }));
          if (res.data.Photo) {
            setFormData((prev) => ({
              ...prev,
              photoPreview: `${BASE_URL}/uploads/${res.data.Photo}`,
            }));
          }
        } catch (err) {
          console.error("Error fetching registration:", err);
          alert("Failed to load registration data.");
        }
      } else if (editingRegistration && editingRegistration._id) {
        const pascalCaseData = capitalizeKeys(editingRegistration);
        setFormData((prev) => ({ ...prev, ...pascalCaseData }));
        if (editingRegistration.Photo) {
          setFormData((prev) => ({
            ...prev,
              photoPreview: `${BASE_URL}/uploads/${editingRegistration.Photo}`,
          }));
        }
      }
    };

    fetchRegistration();
  }, [registrationId, editingRegistration]);

  // ✅ Handlers
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 5) {
        setErrors({ ...errors, photo: "File size must be less than 5MB" });
        return;
      }
      setFormData({
        ...formData,
        Photo: file,
        photoPreview: URL.createObjectURL(file),
      });
      setErrors({ ...errors, photo: null });
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, Photo: null, photoPreview: null });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });

    if (type === "file" && name === "Photo" && files[0]) {
      setPhotoPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSectionCheck = (title) => {
    setSectionChecked((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const getUncheckedSections = () =>
    sections.filter((s) => !sectionChecked[s.title]).map((s) => s.title);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "ProgrammeName",
      "CurrentHouseNo",
      "CurrentStreet",
      "CurrentArea",
      "CurrentDistrict",
      "CurrentPincode",
      "CurrentCountry",
      "TenthSchoolAddress",
      "TwelfthSchoolAddress",
    ];

    const emptyFields = requiredFields.filter(
      (f) => !formData[f] || formData[f].toString().trim() === ""
    );

    if (emptyFields.length > 0) {
      alert(
        "Please fill all required fields before submitting:\n" +
          emptyFields.map((f) => f.replace(/([A-Z])/g, " $1")).join(", ")
      );
      return;
    }

    try {
      const data = new FormData();
      const camelCaseData = camelCaseKeys(formData);
      Object.keys(camelCaseData).forEach((key) =>
        data.append(key, camelCaseData[key])
      );

      let res;
      if (editingRegistration && editingRegistration._id) {
        res = await axios.put(
          `${BASE_URL}/api/registrations/${editingRegistration._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        res = await axios.post(
          `${BASE_URL}/api/registrations`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      onSubmit(res.data);
      alert("Registration saved successfully!");
    } catch (err) {
      console.error(
        "Error saving registration:",
        err.response?.data || err.message
      );
      alert("Failed to save registration. Check console for details.");
    }
  };

  // ✅ Input Renderer
  const renderInput = (name, type = "text") => (
    <div key={name} className="relative">
      {name === "Status" ? (
        <>
          <label className="text-sm font-medium text-gray-700 mr-2">
            {name.replace(/([A-Z])/g, " $1")}
          </label>
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </>
      ) : type === "checkbox" ? (
        <>
          <label className="text-sm font-medium text-gray-700 mr-2">
            {name.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="checkbox"
            name={name}
            checked={formData[name]}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <label className="text-sm font-medium text-gray-700">
            {name === "UgDiplomaInstitute"
              ? "UG Diploma Institute"
              : name === "UgDiplomaCourse"
              ? "UG Diploma Course"
              : name === "UgDiplomaSpecialization"
              ? "UG Diploma Specialization"
              : name === "UgDiplomaYear"
              ? "UG Diploma Year"
              : name === "UgDiplomaPercentage"
              ? "UG Diploma Percentage"
              : name === "UgDiplomaMarksheet"
              ? "UG Diploma Marksheet"
              : name === "UgCollege"
              ? "UG College"
              : name === "UgCourse"
              ? "UG Course"
              : name === "UgSpecialization"
              ? "UG Specialization"
              : name === "UgYear"
              ? "UG Year"
              : name === "UgPercentage"
              ? "UG Percentage"
              : name === "UgMarksheet"
              ? "UG Marksheet"
              : name === "PgDiplomaInstitute"
              ? "PG Diploma Institute"
              : name === "PgDiplomaCourse"
              ? "PG Diploma Course"
              : name === "PgDiplomaSpecialization"
              ? "PG Diploma Specialization"
              : name === "PgDiplomaYear"
              ? "PG Diploma Year"
              : name === "PgDiplomaPercentage"
              ? "PG Diploma Percentage"
              : name === "PgDiplomaMarksheet"
              ? "PG Diploma Marksheet"
              : name === "PgUniversity"
              ? "PG University"
              : name === "PgCourse"
              ? "PG Course"
              : name === "PgSpecialization"
              ? "PG Specialization"
              : name === "PgYear"
              ? "PG Year"
              : name === "PgPercentage"
              ? "PG Percentage"
              : name === "PgMarksheet"
              ? "PG Marksheet"
              : name.replace(/([A-Z])/g, " $1")}
          </label>

          {type === "file" ? (
            <>
              <input
                type="file"
                name={name}
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer
                file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium
                file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {formData[name] && (
                <button
                  type="button"
                  onClick={() =>
                    window.open(URL.createObjectURL(formData[name]))
                  }
                  className="absolute top-0 right-0 text-blue-600 hover:underline text-sm"
                >
                  View
                </button>
              )}
              {name === "Photo" && showPhotoPreview && (
                <div className="mt-2 w-32 h-32 border border-gray-300 rounded-md flex items-center justify-center bg-gray-100">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
              )}
            </>
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          )}
        </>
      )}
    </div>
  );

  // ✅ Render Form
  return (
    <div className="bg-white rounded-lg  max-w-6xl mx-auto overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          {editingRegistration
            ? "Edit Registration Form"
            : "Add New Registration"}
        </h2>

        {/* --- MODIFIED: Button Group for Actions (Fee Generator added) --- */}
        <div className="flex space-x-3">
          {/* New 'Generate Fee' Button */}
          <button
            type="button"
            onClick={() => setShowFeeGenerator(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <DollarSign className="w-4 h-4 mr-1" /> Generate Fee
          </button>

          {/* Original 'Send Correction Mail' Button */}
          <button
            type="button"
            onClick={() => {
              if (feeGenerated) {
                alert("No correction mail can be sent after fee generation.");
              } else {
                setShowMailForm(true);
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Mail className="w-4 h-4 mr-1" /> Send Correction Mail
          </button>
        </div>
      </div>

      {/* --- New: Conditionally render the Fee Structure Generator component --- */}
      {showFeeGenerator && (
        <FeeStructureGenerator
          // You might pass relevant data (e.g., formData) and a close handler
          registrationData={formData}
          onClose={() => setShowFeeGenerator(false)}
        />
      )}

      {showMailForm && (
        <SendMailForm
          uncheckedSections={getUncheckedSections()}
          onClose={() => setShowMailForm(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            {/* Section Header with Verification Checkbox */}
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 pb-3 ${
                !["Current Address", "Permanent Address", "10th Grade", "12th Grade", "UG Diploma", "UG", "PG Diploma", "PG"].includes(section.title)
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
                {section.title}
              </h3>
              <div className="flex items-center space-x-4">
                {!["Current Address", "Permanent Address", "10th Grade", "12th Grade", "UG Diploma", "UG", "PG Diploma", "PG"].includes(section.title) && (
                  <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer p-1 bg-white rounded-lg ">
                    Verification Status:
                    <input
                      type="checkbox"
                      checked={sectionChecked[section.title] || false}
                      onChange={() => handleSectionCheck(section.title)}
                      className="h-5 w-5 ml-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </label>
                )}
                {section.title !== "Communication Details" && section.title !== "Student Information" && section.title !== "Consent & Status" && section.title !== "Academic Details" && (
                  <ChevronDown
                    className={`w-5 h-5 cursor-pointer transition-transform ${
                      collapsedSections[section.title] ? "rotate-180" : ""
                    }`}
                    onClick={() => toggleSection(section.title)}
                  />
                )}
              </div>
            </div>

            {section.title === "Student Information" ? (
              <div className="bg-gray-50 rounded-lg shadow-inner border border-gray-200 p-5 pt-5">
                <div className="flex gap-4">
                  {/* Left: Photo Upload */}
                  <div className="flex-shrink-0">
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
                            <p className="text-[10px] text-gray-500 mt-1">
                              Max 5MB
                            </p>
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
                    </div>
                  </div>
                  {/* Right: grid-cols-2 with Registration ID, Programme Name, Specialisation, Session */}
                  <div className="flex-1 grid grid-cols-2 gap-4 ml-4">
                    {[
                      "RegistrationId",
                      "ProgrammeName",
                      "Specialisation",
                      "Session",
                    ].map((f) => renderInput(f))}
                  </div>
                </div>
                {/* Other fields in grid-cols-3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {section.fields
                    .filter(
                      (f) =>
                        ![
                          "Photo",
                          "RegistrationId",
                          "ProgrammeName",
                          "Specialisation",
                          "Session",
                        ].includes(f)
                    )
                    .map((f) => {
                      if (
                        [
                          "TenthMarksheet",
                          "TwelfthMarksheet",
                          "UgDiplomaMarksheet",
                          "UgMarksheet",
                          "PgDiplomaMarksheet",
                          "PgMarksheet",
                          "AadhaarCard",
                          "AbcId",
                          "DebId",
                          "QuotaDocument",
                          "CategoryCertificate",
                          "SubCategoryDocument",
                        ].includes(f)
                      ) {
                        return renderInput(f, "file");
                      }

                      if (
                        ["Gender", "Quota", "Category", "SubCategory"].includes(
                          f
                        )
                      )
                        return renderInput(f, "select");

                      if (f === "DateOfBirth") return renderInput(f, "date");
                      if (f.includes("Email")) return renderInput(f, "email");
                      if (f.includes("Phone") || f.includes("WhatsappNo"))
                        return renderInput(f, "tel");
                      if (f === "AgreeTerms" || f === "SameAsCurrent")
                        return renderInput(f, "checkbox");

                      return renderInput(f);
                    })}
                </div>
              </div>
            ) : section.fields.length > 0 ? (
              !collapsedSections[section.title] && (
                <div
                  className={`grid gap-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200 p-5 ${
                    section.title === "Student's Documents"
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-3"
                  }`}
                >
                  {section.fields.map((f) => {
                    if (
                      [
                        "10thMarksheet",
                        "12thMarksheet",
                        "UgDiplomaMarksheet",
                        "UgMarksheet",
                        "PgDiplomaMarksheet",
                        "PgMarksheet",
                        "AadhaarCard",
                        "AbcId",
                        "DebId",
                        "QuotaDocument",
                        "CategoryCertificate",
                        "SubCategoryDocument",
                      ].includes(f)
                    )
                      return renderInput(f, "file");

                    if (
                      ["Gender", "Quota", "Category", "SubCategory"].includes(f)
                    )
                      return renderInput(f, "select");

                    if (f === "DateOfBirth") return renderInput(f, "date");
                    if (f.includes("Email")) return renderInput(f, "email");
                    if (f.includes("Phone") || f.includes("WhatsappNo"))
                      return renderInput(f, "tel");
                    if (f === "AgreeTerms" || f === "SameAsCurrent")
                      return renderInput(f, "checkbox");
                    return renderInput(f);
                  })}
                </div>
              )
            ) : null}
          </div>
        ))}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditRegistration;