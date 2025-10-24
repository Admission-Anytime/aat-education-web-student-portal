import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEditRegistration = ({ editingRegistration, onSubmit, onBack }) => {
  // Function to convert camelCase keys to PascalCase
  const toPascalCase = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const capitalizeKeys = (obj) => {
    const newObj = {};
    for (const key in obj) {
      const capKey = toPascalCase(key);
      newObj[capKey] = obj[key];
    }
    return newObj;
  };

  // Initialize form data with PascalCase keys
  const [formData, setFormData] = useState({
    ProgrammeName: "",
    Specialisation: "",
    RegistrationId: "",
    Photo: null,
    AadhaarCard: null,
    AbcId: null,
    BedId: null,
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
    Qualification: "",
    StudentPhone: "",
    WhatsappNo: "",
    StudentEmail: "",
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
    EmergencyName: "",
    EmergencyPhone: "",
    EmergencyRelationship: "",
    SpecialNeeds: "",
    Medications: "",
    AgreeTerms: false,
    Status: "Pending",
  });

  // Populate form if editing
  useEffect(() => {
    if (editingRegistration && editingRegistration._id) {
      const pascalCaseData = capitalizeKeys(editingRegistration);
      setFormData({ ...formData, ...pascalCaseData });
    }
  }, [editingRegistration]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      let res;
      if (editingRegistration && editingRegistration._id) {
        res = await axios.put(
          `http://localhost:4001/api/registrations/${editingRegistration._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        res = await axios.post(
          "http://localhost:4001/api/registrations",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      console.log("Server response:", res.data);
      onSubmit(res.data);
      alert("Registration saved successfully!");
    } catch (err) {
      console.error("Error saving registration:", err.response?.data || err.message);
      alert("Failed to save registration. Check console for details.");
    }
  };

  // Render input dynamically
  const renderInput = (name, type = "text") => (
    <div key={name}>
      <label className="block text-sm font-medium text-gray-700">
        {name.replace(/([A-Z])/g, " $1")}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          {name === "Quota" ? (
            <>
              <option value="">Select Quota</option>
              {["Ex Army", "Teacher Staff", "Not Applicable"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </>
          ) : name === "Category" ? (
            <>
              <option value="">Select Category</option>
              {["Unreserved", "Reserved"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </>
          ) : name === "SubCategory" ? (
            <>
              <option value="">Select SubCategory</option>
              {["ST", "SC", "OBC"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </>
          ) : (
            <>
              <option value="">Select Gender</option>
              {["Male", "Female", "Other"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </>
          )}
        </select>
      ) : type === "checkbox" ? (
        <input
          type="checkbox"
          name={name}
          checked={formData[name]}
          onChange={handleChange}
          className="h-4 w-4"
        />
      ) : type === "file" ? (
        <input
          type="file"
          name={name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      )}
    </div>
  );

  // Sections configuration
  const sections = [
     {
      title: "Student Info",
      fields: ["StudentFirstName", "StudentMiddleName", "StudentLastName", "Gender", "DateOfBirth", "StudentEmail", "StudentPhone", "WhatsappNo"],
    },
    {
      title: "Programme Information",
      fields: ["RegistrationId", "ProgrammeName", "Specialisation", "Qualification", "Quota", "Category", "SubCategory"],
    },
    {
      title: "Documents",
      fields: ["Photo", "AadhaarCard", "AbcId", "BedId", "QuotaDocument", "CategoryCertificate"],
    },
   
   
    {
      title: "Father's Info",
      fields: ["FatherFirstName", "FatherMiddleName", "FatherLastName", "FatherEmail", "FatherPhone", "FatherWhatsapp"],
    },
    {
      title: "Mother's Info",
      fields: ["MotherFirstName", "MotherMiddleName", "MotherLastName", "MotherEmail", "MotherPhone", "MotherWhatsapp"],
    },
    {
      title: "Guardian Info",
      fields: ["GuardianFirstName", "GuardianMiddleName", "GuardianLastName", "ParentEmail", "ParentPhone", "Relationship"],
    },
    { title: "Qualification Details", fields: [] },
    { title: "10th Grade", fields: ["TenthBoard", "TenthSchool", "TenthSchoolAddress", "TenthYear", "TenthPercentage", "TenthMarksheet"] },
    { title: "12th Grade", fields: ["TwelfthBoard", "TwelfthSchool", "TwelfthSchoolAddress", "TwelfthStream", "TwelfthYear", "TwelfthPercentage", "TwelfthMarksheet"] },
    { title: "UG Diploma", fields: ["UgDiplomaInstitute", "UgDiplomaCourse", "UgDiplomaSpecialization", "UgDiplomaYear", "UgDiplomaPercentage", "UgDiplomaMarksheet"] },
    { title: "UG", fields: ["UgCollege", "UgCourse", "UgSpecialization", "UgYear", "UgPercentage", "UgMarksheet"] },
    { title: "PG Diploma", fields: ["PgDiplomaInstitute", "PgDiplomaCourse", "PgDiplomaSpecialization", "PgDiplomaYear", "PgDiplomaPercentage", "PgDiplomaMarksheet"] },
    { title: "PG", fields: ["PgUniversity", "PgCourse", "PgSpecialization", "PgYear", "PgPercentage", "PgMarksheet"] },
    
     { title: "Consent & Status", fields: ["AgreeTerms", "Status"] },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {editingRegistration ? "Edit Registration Form" : "Add New Registration"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.fields.map((f) => {
                if (f === "Gender" || f === "Quota" || f === "Category" || f === "SubCategory") return renderInput(f, "select");
                if (f === "DateOfBirth") return renderInput(f, "date");
                if (f.includes("Email") || f === "ParentEmail") return renderInput(f, "email");
                if (f.includes("Phone") || f.includes("WhatsappNo") || f === "EmergencyPhone") return renderInput(f, "tel");
                if (f === "AgreeTerms") return renderInput(f, "checkbox");
                if (f === "Status") return (
                  <select
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    {["Pending","Approved","Rejected","Under Review"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                );
                if (f.includes("Marksheet") || f === "Photo" || f === "AadhaarCard" || f === "AbcId" || f === "BedId" || f === "QuotaDocument" || f === "CategoryCertificate") return renderInput(f, "file");
                return renderInput(f);
              })}
            </div>
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
