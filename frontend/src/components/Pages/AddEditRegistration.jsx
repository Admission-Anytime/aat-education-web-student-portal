import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEditRegistration = ({ editingRegistration, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    // Programme Info
    programmeName: "",
    specialisation: "",
    registrationId: "",
    program: "",
    qualification: "",
    quota: "",
    category: "",
    subCategory: "",

    // Student Info
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    gender: "",
    dateOfBirth: "",
    studentEmail: "",
    studentPhone: "",
    whatsappNo: "",

    // Current Address
    currentAddress: "",
    currentCity: "",
    currentState: "",
    currentZipCode: "",

    // Permanent Address
    permanentAddress: "",
    permanentCity: "",
    permanentState: "",
    permanentZipCode: "",

    // Father's Info
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherEmail: "",
    fatherPhone: "",
    fatherWhatsapp: "",

    // Mother's Info
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    motherEmail: "",
    motherPhone: "",
    motherWhatsapp: "",

    // Guardian Info
    guardianFirstName: "",
    guardianMiddleName: "",
    guardianLastName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "",

    // Previous School
    previousSchool: "",

    // 10th Grade
    tenthBoard: "",
    tenthSchool: "",
    tenthYear: "",
    tenthPercentage: "",
    tenthMarksheet: "",

    // 12th Grade
    twelfthBoard: "",
    twelfthSchool: "",
    twelfthStream: "",
    twelfthYear: "",
    twelfthPercentage: "",
    twelfthMarksheet: "",

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

    // Additional Info
    gpa: "",
    interests: "",
    whyApplying: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    specialNeeds: "",
    medications: "",

    // Terms & Status
    agreeTerms: false,
    status: "Pending",
  });

  // Populate form if editing
  useEffect(() => {
    if (editingRegistration && editingRegistration._id) {
      setFormData({ ...formData, ...editingRegistration });
    }
  }, [editingRegistration]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // If you have file inputs, append them manually, e.g.:
    // data.append('photo', selectedPhotoFile);
    // data.append('tenthMarksheet', selectedTenthFile);
    // data.append('twelfthMarksheet', selectedTwelfthFile);

    let res;
    if (editingRegistration && editingRegistration._id) {
      // Use PUT for full update
      res = await axios.put(
        `http://localhost:4001/api/registrations/${editingRegistration._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      // Use POST for new registration
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
          {["Male","Female","Other"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <input
          type="checkbox"
          name={name}
          checked={formData[name]}
          onChange={handleChange}
          className="h-4 w-4"
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

  // All sections and fields
  const sections = [
    { title: "Programme Information", fields: ["programmeName","specialisation","registrationId","program","qualification","quota","category","subCategory"] },
    { title: "Student Info", fields: ["studentFirstName","studentMiddleName","studentLastName","gender","dateOfBirth","studentEmail","studentPhone","whatsappNo"] },
    { title: "Current Address", fields: ["currentAddress","currentCity","currentState","currentZipCode"] },
    { title: "Permanent Address", fields: ["permanentAddress","permanentCity","permanentState","permanentZipCode"] },
    { title: "Father's Info", fields: ["fatherFirstName","fatherMiddleName","fatherLastName","fatherEmail","fatherPhone","fatherWhatsapp"] },
    { title: "Mother's Info", fields: ["motherFirstName","motherMiddleName","motherLastName","motherEmail","motherPhone","motherWhatsapp"] },
    { title: "Guardian Info", fields: ["guardianFirstName","guardianMiddleName","guardianLastName","parentEmail","parentPhone","relationship"] },
     { title: "10th Grade", fields: ["tenthBoard","tenthSchool","tenthYear","tenthPercentage","tenthMarksheet"] },
    { title: "12th Grade", fields: ["twelfthBoard","twelfthSchool","twelfthStream","twelfthYear","twelfthPercentage","twelfthMarksheet"] },
    { title: "UG Diploma", fields: ["ugDiplomaInstitute","ugDiplomaCourse","ugDiplomaSpecialization","ugDiplomaYear","ugDiplomaPercentage"] },
    { title: "UG", fields: ["ugCollege","ugCourse","ugSpecialization","ugYear","ugPercentage"] },
    { title: "PG Diploma", fields: ["pgDiplomaInstitute","pgDiplomaCourse","pgDiplomaSpecialization","pgDiplomaYear","pgDiplomaPercentage"] },
    { title: "PG", fields: ["pgUniversity","pgCourse","pgSpecialization","pgYear","pgPercentage"] },
     { title: "Consent & Status", fields: ["agreeTerms","status"] },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {editingRegistration ? "Edit Registration" : "Add New Registration"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.fields.map((f) => {
                if (f === "gender") return renderInput(f, "select");
                if (f === "dateOfBirth") return renderInput(f, "date");
                if (f.includes("Email") || f === "parentEmail") return renderInput(f, "email");
                if (f.includes("Phone") || f.includes("whatsappNo") || f === "emergencyPhone") return renderInput(f, "tel");
                if (f === "agreeTerms") return renderInput(f, "checkbox");
                if (f === "status") return (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    {["Pending","Approved","Rejected","Under Review"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                );
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
