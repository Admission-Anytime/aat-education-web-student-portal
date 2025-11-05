import React, { useEffect, useState } from "react";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/api";
const FEE_STRUCTURE_ENDPOINT = `${API_BASE_URL}/fee-structures`;

// --- HELPER FUNCTION TO CALCULATE TOTAL FEES ---
// This function must be outside the component or memoized if it were complex.
const feeFields = [
  "admissionFee",
  "registrationUniversityEnrollmentFee",
  "securityDeposit",
  "identityCardFee",
  "collegeUniformFee",
  "othersAdmissionFee",
  "tuitionFee",
  "developmentInfrastructureFee",
  "libraryFee",
  "laboratoryPracticalFee",
  "computerLabItFacilityFee",
  "othersAcademicFee",
  "examinationFee",
  "universityBoardAffiliationFee",
  "certificationConvocationFee",
  "hostelFee",
  "hostelMessFee",
  "hostelTransportFee",
  "monthlyFee", // Treating this as the total transport fee for the period
  "reAdmissionBacklogFee",
  "lateFeeFine",
  "miscellaneousCharges",
];

const calculateAllFees = (data) => {
  return feeFields.reduce((sum, key) => sum + (data[key] || 0), 0);
};

// --- FIELD LABEL MAPPING FOR PROPER FORMATTING ---
const fieldLabels = {
  admissionFee: "Registration Fee",//Admission Fee
  registrationUniversityEnrollmentFee:
    "University Enrollment Fee",// simplified label"Registration / University Enrollment Fee",

  securityDeposit: "Security Deposit",
  identityCardFee: "Identity Card Fee",
  collegeUniformFee: "College Uniform Fee",
  tuitionFee: "Tuition Fee",
  developmentInfrastructureFee: "Infrastructure Fee",
  libraryFee: "Library Fee",
  laboratoryPracticalFee: "Practical Fee",
  computerLabItFacilityFee: "Computer Lab Fee",
  examinationFee: "Examination Fee",
  universityBoardAffiliationFee: "University / Board Fee",
  certificationConvocationFee: "Convocation Fee",
  hostelFee: "Hostel Fee",
  hostelMessFee: "Mess Fee",
  hostelTransportFee: "Transport Fee",
  monthlyFee: "Total Transport Fee",
  reAdmissionBacklogFee: "Re-Admission / Backlog Fee",
  lateFeeFine: "Late Fee",
  miscellaneousCharges: "Miscellaneous Charges",
  othersAdmissionFee: "Others",
  othersAcademicFee: "Others",
  studentId: "Student ID",
  applicationNo: "Application No",
  studentName: "Student Name",
  academicSession: "Academic Session",
  courseProgram: "Course / Program",
  specialization: "Specialization",
  courseDuration: "Course Duration",
  yearSemester: "Year / Semester",
};

// --- FEE STRUCTURE COMPONENT ---

const FeeStructureGenerator = ({ registrationId = "REG12345", onBack }) => {
  const [feeStructure, setFeeStructure] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    admission: false,
    academic: false,
    exam: false,
    hostel: false,
    transport: false,
    special: false,
    payment: false,
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleMainSection = () => {
    setIsCollapsed(prev => !prev);
  };

  // Function to handle printing the fee structure
  const handlePrint = () => {
    if (!feeStructure) {
      alert("No fee structure available to print.");
      return;
    }

    // Generate printable HTML content
    const printableContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fee Structure - ${feeStructure.studentName || 'Student'}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .student-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 20px;
          }
          .info-item {
            display: flex;
            justify-content: space-between;
          }
          .fee-section {
            margin-bottom: 20px;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
          }
          .fee-section h3 {
            margin-top: 0;
            color: #555;
          }
          .fee-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .fee-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }
          .total {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
          }
          .scholarship {
            background-color: #e8f5e8;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .scholarship-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Fee Structure</h1>
          <p>Academic Session: ${feeStructure.academicSession || 'N/A'}</p>
        </div>

        <div class="student-info">
          <div class="info-item"><strong>Application No:</strong> ${feeStructure.applicationNo || 'N/A'}</div>
          <div class="info-item"><strong>Student ID:</strong> ${feeStructure.studentId || 'N/A'}</div>
          <div class="info-item"><strong>Student Name:</strong> ${feeStructure.studentName || 'N/A'}</div>
          <div class="info-item"><strong>Course/Program:</strong> ${feeStructure.courseProgram || 'N/A'}</div>
          <div class="info-item"><strong>Specialization:</strong> ${feeStructure.specialization || 'N/A'}</div>
          <div class="info-item"><strong>Year/Semester:</strong> ${feeStructure.yearSemester || 'N/A'}</div>
          <div class="info-item"><strong>Payment Plan:</strong> ${feeStructure.paymentPlan || 'N/A'}</div>
          ${feeStructure.paymentPlan === "Installments" ? `<div class="info-item"><strong>No. of Installments:</strong> ${feeStructure.numberOfInstallments || 1}</div>` : ''}
        </div>

        <div class="fee-section">
          <h3>1. One-Time Admission Fees</h3>
          <div class="fee-grid">
            <div class="fee-item"><span>Admission Fee:</span> ₹${(feeStructure.admissionFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Registration/Enrollment Fee:</span> ₹${(feeStructure.registrationUniversityEnrollmentFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Security Deposit:</span> ₹${(feeStructure.securityDeposit || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Identity Card Fee:</span> ₹${(feeStructure.identityCardFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>College Uniform Fee:</span> ₹${(feeStructure.collegeUniformFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Others:</span> ₹${(feeStructure.othersAdmissionFee || 0).toLocaleString()}</div>
          </div>
        </div>

        <div class="fee-section">
          <h3>2. Academic & Institutional Fees</h3>
          <div class="fee-grid">
            <div class="fee-item"><span>Tuition Fee:</span> ₹${(feeStructure.tuitionFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Development/Infrastructure Fee:</span> ₹${(feeStructure.developmentInfrastructureFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Library Fee:</span> ₹${(feeStructure.libraryFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Laboratory/Practical Fee:</span> ₹${(feeStructure.laboratoryPracticalFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Computer Lab/IT Facility Fee:</span> ₹${(feeStructure.computerLabItFacilityFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Others:</span> ₹${(feeStructure.othersAcademicFee || 0).toLocaleString()}</div>
          </div>
        </div>

        <div class="fee-section">
          <h3>3. Examination & Certification Fees</h3>
          <div class="fee-grid">
            <div class="fee-item"><span>Examination Fee:</span> ₹${(feeStructure.examinationFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>University/Board Affiliation Fee:</span> ₹${(feeStructure.universityBoardAffiliationFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Certification/Convocation Fee:</span> ₹${(feeStructure.certificationConvocationFee || 0).toLocaleString()}</div>
          </div>
        </div>

        <div class="fee-section">
          <h3>4. Accommodation & Transport Fees</h3>
          <div class="fee-grid">
            <div class="fee-item"><span>Hostel Fee:</span> ₹${(feeStructure.hostelFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Mess Fee:</span> ₹${(feeStructure.hostelMessFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Hostel Transport Fee:</span> ₹${(feeStructure.hostelTransportFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Total Transport Fee:</span> ₹${(feeStructure.monthlyFee || 0).toLocaleString()}</div>
          </div>
        </div>

        <div class="fee-section">
          <h3>5. Special/Conditional Fees</h3>
          <div class="fee-grid">
            <div class="fee-item"><span>Re-Admission/Backlog Fee:</span> ₹${(feeStructure.reAdmissionBacklogFee || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Late Fee/Fine:</span> ₹${(feeStructure.lateFeeFine || 0).toLocaleString()}</div>
            <div class="fee-item"><span>Miscellaneous Charges:</span> ₹${(feeStructure.miscellaneousCharges || 0).toLocaleString()}</div>
          </div>
        </div>

        ${feeStructure.scholarships && feeStructure.scholarships.length > 0 ? `
          <div class="scholarship">
            <h3>Scholarship Details</h3>
            ${feeStructure.scholarships.map(s => `<div class="scholarship-item"><span>${s.reason}:</span> ₹${(s.amount || 0).toLocaleString()}</div>`).join('')}
            <div class="scholarship-item"><strong>Total Scholarship:</strong> ₹${feeStructure.scholarships.reduce((sum, s) => sum + (s.amount || 0), 0).toLocaleString()}</div>
          </div>
        ` : ''}

        <div class="total">
          Total Payable Fee: ₹${(feeStructure.totalFee || 0).toLocaleString()}
        </div>

        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
          Status: ${feeStructure.status || 'N/A'} | Generated By: ${feeStructure.generatedBy || 'N/A'}
        </div>
      </body>
      </html>
    `;

    // Open a new window with the printable content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printableContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Initial state matching the comprehensive structure
  const initialFormData = feeFields.reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {
      studentId: "",
      applicationNo: "",
      studentName: "",
      academicSession: "",
      courseProgram: "",
      specialization: "",
      courseDuration: "",
      yearSemester: "",
      scholarships: [],
    }
  );

  const [formData, setFormData] = useState(initialFormData);

  // Effect to load data on mount
  useEffect(() => {
    if (registrationId) {
      fetchFeeStructure();
      fetchRegistration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationId]);

  // Fetches registration data using the API
  const fetchRegistration = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/registrations/${registrationId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Populate form data with registration details
      setFormData((prev) => ({
        ...prev,
        studentId: data.RegistrationId || data.registrationId || "",
        applicationNo: data.RegistrationId || data.registrationId || "",
        studentName: `${data.StudentFirstName || ""} ${data.StudentMiddleName || ""} ${data.StudentLastName || ""}`.trim(),
        academicSession: data.Session || "",
        courseProgram: data.ProgrammeName || "",
        specialization: data.Specialisation || "",
        yearSemester: "", // Not available in registration
        courseDuration: "", // Not available in registration
      }));
    } catch (error) {
      console.error("Error fetching registration:", error);
    }
  };

  // Fetches data using the API
  const fetchFeeStructure = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${FEE_STRUCTURE_ENDPOINT}/${registrationId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setFeeStructure(data);

      // Populate form data by merging fetched data with initial structure
      setFormData({
        ...initialFormData,
        ...data,
        numberOfInstallments: data.numberOfInstallments || 1,
        scholarships: data.scholarships || [],
        academicSession: data.academicSession ? data.academicSession.split('T')[0] : '',
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching fee structure:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // Submits data using the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = feeStructure ? "PUT" : "POST";
      const url = feeStructure
        ? `${FEE_STRUCTURE_ENDPOINT}/${registrationId}`
        : FEE_STRUCTURE_ENDPOINT;

      const payload = {
        ...formData,
        registrationId,
        generatedBy: "Admin", // You can get this from user context
        status: feeStructure ? "Draft - Updated by Admin" : "Draft",
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchFeeStructure(); // Re-fetch the updated structure
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving fee structure:", error);
      setIsLoading(false);
    }
  };

  // Calculates the final payable total based on current form data
  const calculateTotal = () => {
    const totalPreScholarship = calculateAllFees(formData);
    const scholarshipTotal = formData.scholarships
      ? formData.scholarships.reduce((sum, s) => sum + (s.amount || 0), 0)
      : 0;
    return Math.max(0, totalPreScholarship - scholarshipTotal);
  };

  const getSubTotal = (keys) => {
    return keys.reduce((sum, key) => sum + (formData[key] || 0), 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-lg text-gray-600">Loading fee structure...</p>
      </div>
    );
  }

  // Helper component for styled display of data
  const DataDisplayItem = ({ label, value, currency = false }) => (
    <div className="p-3 bg-gray-50 rounded-lg">
      <strong className="block text-sm font-medium text-gray-500">
        {label}
      </strong>
      <span className="block text-lg font-semibold text-gray-800 mt-1">
        {currency ? `₹${(value || 0).toLocaleString()}` : value || "N/A"}
      </span>
    </div>
  );

  const currencyInputClasses =
    "mt-1 block w-full border border-gray-300 rounded-lg p-3 transition focus:ring-indigo-500 focus:border-indigo-500";
  const textInputClasses =
    "mt-1 block w-full border border-gray-300 rounded-lg p-3 transition focus:ring-blue-500 focus:border-blue-500";

  const renderFeeSection = (title, color, feeKeys, totalLabel, sectionKey) => {
    const sectionTotal = getSubTotal(feeKeys);
    const isCollapsed = collapsedSections[sectionKey];
    return (
      <div
        className={`${
          color === "blue"
            ? "bg-blue-50 border-blue-200"
            : color === "green"
            ? "bg-green-50 border-green-200"
            : "bg-yellow-50 border-yellow-200"
        } p-6 rounded-xl border shadow-sm`}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3
            className={`text-xl font-bold ${
              color === "blue"
                ? "text-blue-800"
                : color === "green"
                ? "text-green-800"
                : "text-yellow-800"
            }`}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={() => toggleSection(sectionKey)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
          >
            {isCollapsed ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>
        {!isCollapsed && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {feeKeys.map((key) => (
                <div key={key}>
                <label className="block text-sm font-medium text-gray-700">
                  {fieldLabels[key] ||
                    key
                      .replace(/([A-Z])/g, " $1")
                      .replace("Fee", " Fee")
                      .trim()}
                </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className={currencyInputClasses}
                    min="0"
                  />
                </div>
              ))}
            </div>
            {totalLabel && (
              <div className="mt-4 pt-3 border-t border-dashed">
                <p className="font-bold text-lg text-gray-800">
                  {totalLabel}:{" "}
                  <span className="text-xl text-indigo-600">
                    ₹{sectionTotal.toLocaleString()}
                  </span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-3xl border border-gray-100 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-700 leading-tight">
            Fee Structure Management
          </h2>
          <button
            type="button"
            onClick={toggleMainSection}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
          >
            {isCollapsed ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>
        {!isEditing && (
          <div className="flex gap-4 mt-4 sm:mt-0">
            {feeStructure && (
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition duration-150 transform hover:scale-105 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
            >
              {feeStructure ? "Edit Fee Structure" : "Generate Initial Structure"}
            </button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* A. Student & Admission Reference Section */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
            <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
              Student & Admission Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.keys(initialFormData)
                .slice(0, 8)
                .map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {fieldLabels[key] ||
                        key
                          .replace(/([A-Z])/g, " $1")
                          .replace("Id", " ID")
                          .replace("No", " No")
                          .trim()}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className={textInputClasses}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* B. Core Fee Components (College-Related Charges) */}
          <div className="space-y-8">
            {renderFeeSection(
              "1. One-Time Admission Fees",
              "blue",
              [
                "admissionFee",
                "registrationUniversityEnrollmentFee",
                "securityDeposit",
                "identityCardFee",
                "collegeUniformFee",
                "othersAdmissionFee",
              ],
              "Sub-Total (One-Time)",
              "admission"
            )}

            {renderFeeSection(
              "2. Academic & Institutional Fees (Per Term)",
              "green",
              [
                "tuitionFee",
                "developmentInfrastructureFee",
                "libraryFee",
                "laboratoryPracticalFee",
                "computerLabItFacilityFee",
                "othersAcademicFee",
              ],
              "Sub-Total (Academic)",
              "academic"
            )}

            {renderFeeSection(
              "3. Examination & Certification Fees",
              "yellow",
              [
                "examinationFee",
                "universityBoardAffiliationFee",
                "certificationConvocationFee",
              ],
              "Sub-Total (Exam/Cert)",
              "exam"
            )}
          </div>

          {/* 4 & 5. Accommodation (Hostel) & Transport Fees */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 4. Accommodation (Hostel) Fees */}
            {renderFeeSection(
              "4. Accommodation (Hostel) Fees (Optional)",
              "blue",
              ["hostelFee", "hostelMessFee", "hostelTransportFee"],
              "Sub-Total (Hostel)",
              "hostel"
            )}

            {/* 5. Transport Fees (Optional) */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-xl font-bold text-green-800">
                  5. Transport Fees (Optional)
                </h3>
                <button
                  type="button"
                  onClick={() => toggleSection("transport")}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  {collapsedSections.transport ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </div>
              {!collapsedSections.transport && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {/*<div>
                      <label className="block text-sm font-medium text-gray-700">
                        Distance
                      </label>
                      <input
                        type="text"
                        name="distance"
                        value={formData.distance}
                        onChange={handleInputChange}
                        className={textInputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Zone
                      </label>
                      <input
                        type="text"
                        name="zone"
                        value={formData.zone}
                        onChange={handleInputChange}
                        className={textInputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className={textInputClasses}
                      />
                    </div>*/}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Transport Fee 
                      </label>
                      <input
                        type="number"
                        name="monthlyFee"
                        value={formData.monthlyFee}
                        onChange={handleInputChange}
                        className={currencyInputClasses}
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-dashed">
                    <p className="font-bold text-lg text-gray-800">
                      Sub-Total (Transport):{" "}
                      <span className="text-xl text-indigo-600">
                        ₹{formData.monthlyFee.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 6. Special / Conditional Fees */}
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-bold text-orange-800">
                6. Special / Conditional Fees
              </h3>
              <button
                type="button"
                onClick={() => toggleSection("special")}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
              >
                {collapsedSections.special ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </button>
            </div>
            {!collapsedSections.special && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Re-Admission Fee
                    </label>
                    <input
                      type="number"
                      name="reAdmissionBacklogFee"
                      value={formData.reAdmissionBacklogFee}
                      onChange={handleInputChange}
                      className={currencyInputClasses}
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      For rejoining or repeating semesters
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Late Fee / Fine

                    </label>
                    <input
                      type="number"
                      name="lateFeeFine"
                      value={formData.lateFeeFine}
                      onChange={handleInputChange}
                      className={currencyInputClasses}
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      For delayed payments or attendance issues
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Miscellaneous Charges
                    </label>
                    <input
                      type="number"
                      name="miscellaneousCharges"
                      value={formData.miscellaneousCharges}
                      onChange={handleInputChange}
                      className={currencyInputClasses}
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      For duplicate ID, bonafide certificate, etc.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-dashed">
                  <p className="font-bold text-lg text-gray-800">
                    Sub-Total (Conditional):{" "}
                    <span className="text-xl text-orange-600">
                      ₹
                      {getSubTotal([
                        "reAdmissionBacklogFee",
                        "lateFeeFine",
                        "miscellaneousCharges",
                      ]).toLocaleString()}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Payment and Scholarship Details */}
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-inner">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-bold text-purple-800">
                Payment & Scholarship Details
              </h3>
              <button
                type="button"
                onClick={() => toggleSection("payment")}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
              >
                {collapsedSections.payment ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </button>
            </div>
            {!collapsedSections.payment && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Plan
                </label>
                <select
                  name="paymentPlan"
                  value={formData.paymentPlan}
                  onChange={handleInputChange}
                  className={textInputClasses}
                >
                  <option value="One-time">One-time</option>
                  <option value="Installments">Installments</option>
                </select>
              </div>

              {formData.paymentPlan === "Installments" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Installments
                  </label>
                  <input
                    type="number"
                    name="numberOfInstallments"
                    value={formData.numberOfInstallments}
                    onChange={handleInputChange}
                    className={currencyInputClasses}
                    min="1"
                    max="12"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="scholarshipApplicable"
                    checked={formData.scholarshipApplicable}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-700">
                    Scholarship Applicable?
                  </span>
                </label>
              </div>

              {formData.scholarshipApplicable && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scholarships
                  </label>
                  {formData.scholarships.map((scholarship, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="number"
                        placeholder="Amount"
                        value={scholarship.amount}
                        onChange={(e) => {
                          const newScholarships = [...formData.scholarships];
                          newScholarships[index].amount =
                            parseFloat(e.target.value) || 0;
                          setFormData((prev) => ({
                            ...prev,
                            scholarships: newScholarships,
                          }));
                        }}
                        className={`${currencyInputClasses} flex-1`}
                        min="0"
                      />
                      <select
                        value={scholarship.reason}
                        onChange={(e) => {
                          const newScholarships = [...formData.scholarships];
                          newScholarships[index].reason = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            scholarships: newScholarships,
                          }));
                        }}
                        className={`${textInputClasses} flex-1`}
                      >
                        <option value="">Select Reason</option>
                        <option value="Merit Based 20%">Merit Based 20%</option>
                        <option value="Merit Based 40%">Merit Based 40%</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Staff">Staff</option>
                        <option value="Sports">Sports</option>
                        <option value="Ex Service Men">Ex Service Men</option>
                        <option value="Other">Other</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const newScholarships = formData.scholarships.filter(
                            (_, i) => i !== index
                          );
                          setFormData((prev) => ({
                            ...prev,
                            scholarships: newScholarships,
                          }));
                        }}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        scholarships: [
                          ...prev.scholarships,
                          { amount: 0, reason: "" },
                        ],
                      }));
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Add Scholarship
                  </button>
                </div>
              )}
            </div>
            )}
          </div>

          {/* Final Summary Card */}
          <div className="bg-indigo-100 p-6 rounded-xl border border-indigo-300 shadow-md">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">
              Grand Total Fee Calculation
            </h3>
            <p className="text-2xl font-extrabold text-indigo-700">
              Total Payable Fee: ₹{calculateTotal().toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Base Fee Sum: ₹{calculateAllFees(formData).toLocaleString()}
            </p>
            {formData.scholarships && formData.scholarships.length > 0 && (
              <p className="text-sm text-red-600">
                Less Scholarships: ₹
                {formData.scholarships
                  .reduce((sum, s) => sum + (s.amount || 0), 0)
                  .toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
            >
              {feeStructure ? "Update" : "Generate"} Fee Structure
            </button>
          </div>
        </form>
      ) : feeStructure ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DataDisplayItem
              label="Application No"
              value={feeStructure.applicationNo}
            />
            <DataDisplayItem
              label="Student ID"
              value={feeStructure.studentId}
            />
            <DataDisplayItem
              label="Student Name"
              value={feeStructure.studentName}
            />
            <DataDisplayItem
              label="Academic Session"
              value={feeStructure.academicSession}
            />
            <DataDisplayItem
              label="Course / Program"
              value={feeStructure.courseProgram}
            />
            <DataDisplayItem
              label="Specialization"
              value={feeStructure.specialization}
            />
            <DataDisplayItem
              label="Year / Semester"
              value={feeStructure.yearSemester}
            />
            <DataDisplayItem
              label="Payment Plan"
              value={feeStructure.paymentPlan}
            />
            {feeStructure.paymentPlan === "Installments" && (
              <DataDisplayItem
                label="No. of Installments"
                value={feeStructure.numberOfInstallments || 1}
              />
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-800 pt-4 border-t mt-6">
            Detailed Fee Breakdown
          </h3>

          {/* Display Table/List for Fees */}
          <div className="space-y-4">
            {/* 1. One-Time Admission Fees */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">
                1. One-Time Admission Fees
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                <DataDisplayItem
                  label="Admission Fee"
                  value={feeStructure.admissionFee}
                  currency
                />
                <DataDisplayItem
                  label="Registration / Enrollment Fee"
                  value={feeStructure.registrationUniversityEnrollmentFee}
                  currency
                />
                <DataDisplayItem
                  label="Security Deposit (Refundable)"
                  value={feeStructure.securityDeposit}
                  currency
                />
                <DataDisplayItem
                  label="Identity Card Fee"
                  value={feeStructure.identityCardFee}
                  currency
                />
                <DataDisplayItem
                  label="College Uniform Fee"
                  value={feeStructure.collegeUniformFee}
                  currency
                />
                <DataDisplayItem
                  label="Others"
                  value={feeStructure.othersAdmissionFee}
                  currency
                />
              </div>
            </div>

            {/* 2. Academic & Institutional Fees */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800 mb-2">
                2. Academic & Institutional Fees
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                <DataDisplayItem
                  label="Tuition Fee"
                  value={feeStructure.tuitionFee}
                  currency
                />
                <DataDisplayItem
                  label="Development / Infrastructure Fee"
                  value={feeStructure.developmentInfrastructureFee}
                  currency
                />
                <DataDisplayItem
                  label="Library Fee"
                  value={feeStructure.libraryFee}
                  currency
                />
                <DataDisplayItem
                  label="Laboratory / Practical Fee"
                  value={feeStructure.laboratoryPracticalFee}
                  currency
                />
                <DataDisplayItem
                  label="Computer Lab / IT Facility Fee"
                  value={feeStructure.computerLabItFacilityFee}
                  currency
                />
                <DataDisplayItem
                  label="Others"
                  value={feeStructure.othersAcademicFee}
                  currency
                />
              </div>
            </div>

            {/* 3. Examination & Certification Fees */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">
                3. Examination & Certification Fees
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                <DataDisplayItem
                  label="Examination Fee"
                  value={feeStructure.examinationFee}
                  currency
                />
                <DataDisplayItem
                  label="University / Board Affiliation Fee"
                  value={feeStructure.universityBoardAffiliationFee}
                  currency
                />
                <DataDisplayItem
                  label="Certification / Convocation Fee"
                  value={feeStructure.certificationConvocationFee}
                  currency
                />
              </div>
            </div>

            {/* 4 & 5. Accommodation & Transport Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-2">
                  4. Accommodation & Mess Fees
                </h4>
                <div className="space-y-2 text-sm">
                  <DataDisplayItem
                    label="Hostel Fee"
                    value={feeStructure.hostelFee}
                    currency
                  />
                  <DataDisplayItem
                    label="Mess Fee"
                    value={feeStructure.hostelMessFee}
                    currency
                  />
                  <DataDisplayItem
                    label="Hostel Transport Fee"
                    value={feeStructure.hostelTransportFee}
                    currency
                  />
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800 mb-2">
                  5. Transport Fees
                </h4>
                <div className="space-y-2 text-sm">
                  <DataDisplayItem label="Zone" value={feeStructure.zone} />
                  <DataDisplayItem
                    label="Total Transport Fee"
                    value={feeStructure.monthlyFee}
                    currency
                  />
                </div>
              </div>
            </div>

            {/* 6. Special / Conditional Fees */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-bold text-orange-800 mb-2">
                6. Special / Conditional Fees
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                <DataDisplayItem
                  label="Re-Admission / Backlog Fee"
                  value={feeStructure.reAdmissionBacklogFee}
                  currency
                />
                <DataDisplayItem
                  label="Late Fee / Fine"
                  value={feeStructure.lateFeeFine}
                  currency
                />
                <DataDisplayItem
                  label="Miscellaneous Charges"
                  value={feeStructure.miscellaneousCharges}
                  currency
                />
              </div>
            </div>
          </div>

          {/* Scholarship Details Section */}
          {feeStructure.scholarships &&
            feeStructure.scholarships.length > 0 && (
              <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500 shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Scholarship Details
                </h3>
                <div className="space-y-2">
                  {feeStructure.scholarships.map((scholarship, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white p-3 rounded-lg border"
                    >
                      <span className="font-medium text-gray-700">
                        {scholarship.reason}
                      </span>
                      <span className="font-bold text-green-600">
                        ₹{scholarship.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="mt-4 pt-3 border-t border-gray-300">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total Scholarship Amount:</span>
                      <span className="text-green-600">
                        ₹
                        {feeStructure.scholarships
                          .reduce((sum, s) => sum + (s.amount || 0), 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* Final Total Summary */}
          <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-xl mt-6">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-medium opacity-90">
                  Total Payable Fee
                </h3>
                <p className="text-4xl font-extrabold mt-1">
                  ₹{feeStructure.totalFee.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-sm italic mt-4 border-t border-indigo-400 pt-2 opacity-80">
              Status: {feeStructure.status} | Generated By:{" "}
              {feeStructure.generatedBy}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-dashed border-2 border-gray-300">
          <p className="text-gray-500 text-xl font-semibold">
            No fee structure generated yet for student {registrationId}.
          </p>
          <p className="text-gray-400 text-base mt-2">
            Click "Generate Initial Structure" above to create one now.
          </p>
        </div>
      )}
      </>
      )}
    </div>
  );
};

// Default export is mandatory for single-file React components
export default FeeStructureGenerator;
