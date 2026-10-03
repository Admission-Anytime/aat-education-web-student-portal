import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Upload,
    FileText,
    Heart,
    Shield,
    Send,
    Check,
    ChevronRight,
    AlertCircle,
    Loader2,
    Building2,
    Bus,
    Home,
    Printer,
    Camera,
    Sparkles
} from 'lucide-react';
import { admissionApi, ERP_BASE_URL } from '../../services/api';

function RegistrationForm() {
    const initialFormData = {
        // 1. Student Personal Details
        firstName: '',
        midName: '',
        lastName: '',
        StudentClass: '10th',
        gender: 'Male',
        dob: '',
        email: '',
        phone: '',
        altphone: '',
        aadhar: '',
        bloodGroup: 'B+',
        category: 'General',
        religion: 'Hinduism',
        nationality: 'Indian',

        // 2. Parent / Guardian Details
        fatherFirstName: '',
        fatherLastName: '',
        fatherPhone: '',
        fatherEmail: '',
        fatherOccupation: '',
        motherFirstName: '',
        motherLastName: '',
        motherPhone: '',

        // 3. Residential Address
        currentHouseNo: '',
        currentLocality: '',
        currentCity: '',
        currentState: '',
        currentPinCode: '',

        // 4. Academic Background
        previousSchoolName: '',
        previousSchoolLastClass: '',

        // 5. Facilities & Requirements
        transportRequired: 'No',
        hostelRequired: 'No',

        // Acceptance
        agreeTerms: false
    };

    const [formData, setFormData] = useState(initialFormData);
    const [currentSection, setCurrentSection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [photoStatus, setPhotoStatus] = useState({ student: '', father: '', mother: '' });

    // Photo files & previews
    const [photos, setPhotos] = useState({
        student: null,
        father: null,
        mother: null
    });
    const [photoPreviews, setPhotoPreviews] = useState({
        student: '',
        father: '',
        mother: ''
    });

    const sections = [
        { label: 'Student Details', icon: User },
        { label: 'Contact & Address', icon: MapPin },
        { label: 'Parent Details', icon: Heart },
        { label: 'Academic & Facility', icon: GraduationCap },
        { label: 'Photos & Submit', icon: Shield }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errorMessage) setErrorMessage('');
    };

    const handlePhotoChange = (type, e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPhotos((prev) => ({ ...prev, [type]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreviews((prev) => ({ ...prev, [type]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate current step before proceeding to next
    const validateSection = (sectionIndex) => {
        if (sectionIndex === 0) {
            if (!formData.firstName.trim() || !formData.lastName.trim()) {
                setErrorMessage('Please enter First Name and Last Name.');
                return false;
            }
            if (!formData.StudentClass) {
                setErrorMessage('Please select a class/course.');
                return false;
            }
            if (!formData.dob) {
                setErrorMessage('Please provide Date of Birth.');
                return false;
            }
        } else if (sectionIndex === 1) {
            if (!formData.email.trim() || !formData.phone.trim()) {
                setErrorMessage('Please provide valid Student Email and Phone number.');
                return false;
            }
            if (!formData.currentCity.trim() || !formData.currentState.trim() || !formData.currentPinCode.trim()) {
                setErrorMessage('Please fill in City, State, and PIN code.');
                return false;
            }
        } else if (sectionIndex === 2) {
            if (!formData.fatherFirstName.trim()) {
                setErrorMessage("Please enter Father's First Name.");
                return false;
            }
            if (!formData.fatherPhone.trim()) {
                setErrorMessage("Please enter Father's contact number.");
                return false;
            }
        }
        setErrorMessage('');
        return true;
    };

    const handleNext = () => {
        if (validateSection(currentSection)) {
            setCurrentSection((prev) => Math.min(sections.length - 1, prev + 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        setErrorMessage('');
        setCurrentSection((prev) => Math.max(0, prev - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!formData.agreeTerms) {
            setErrorMessage('You must confirm and agree to the declarations before submitting.');
            return;
        }

        setIsSubmitting(true);

        // Prepare exact JSON payload expected by the ERP backend API
        const payload = {
            firstName: formData.firstName.trim(),
            midName: formData.midName.trim(),
            lastName: formData.lastName.trim(),
            StudentClass: formData.StudentClass,
            gender: formData.gender,
            dob: formData.dob,
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            altphone: formData.altphone.trim(),
            aadhar: formData.aadhar.trim(),
            bloodGroup: formData.bloodGroup,
            category: formData.category,
            religion: formData.religion,
            nationality: formData.nationality.trim() || 'Indian',
            fatherFirstName: formData.fatherFirstName.trim(),
            fatherLastName: formData.fatherLastName.trim(),
            fatherPhone: formData.fatherPhone.trim(),
            fatherEmail: formData.fatherEmail.trim(),
            fatherOccupation: formData.fatherOccupation.trim(),
            motherFirstName: formData.motherFirstName.trim(),
            motherLastName: formData.motherLastName.trim(),
            motherPhone: formData.motherPhone.trim(),
            currentHouseNo: formData.currentHouseNo.trim(),
            currentLocality: formData.currentLocality.trim(),
            currentCity: formData.currentCity.trim(),
            currentState: formData.currentState.trim(),
            currentPinCode: formData.currentPinCode.trim(),
            previousSchoolName: formData.previousSchoolName.trim(),
            previousSchoolLastClass: formData.previousSchoolLastClass.trim(),
            transportRequired: formData.transportRequired,
            hostelRequired: formData.hostelRequired
        };

        try {
            // Main Registration API POST
            const result = await admissionApi.submitRegistration(payload);
            setSubmissionResult(result);

            // Optional Photo Uploads (if user uploaded photos)
            const photoUploadPromises = [];
            const newPhotoStatus = { student: '', father: '', mother: '' };

            if (photos.student) {
                photoUploadPromises.push(
                    admissionApi.uploadPhoto('student-pic', photos.student)
                        .then(() => { newPhotoStatus.student = 'uploaded'; })
                        .catch((err) => { newPhotoStatus.student = 'failed: ' + err.message; })
                );
            }
            if (photos.father) {
                photoUploadPromises.push(
                    admissionApi.uploadPhoto('father-pic', photos.father)
                        .then(() => { newPhotoStatus.father = 'uploaded'; })
                        .catch((err) => { newPhotoStatus.father = 'failed: ' + err.message; })
                );
            }
            if (photos.mother) {
                photoUploadPromises.push(
                    admissionApi.uploadPhoto('mother-pic', photos.mother)
                        .then(() => { newPhotoStatus.mother = 'uploaded'; })
                        .catch((err) => { newPhotoStatus.mother = 'failed: ' + err.message; })
                );
            }

            if (photoUploadPromises.length > 0) {
                await Promise.allSettled(photoUploadPromises);
                setPhotoStatus(newPhotoStatus);
            }

            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Registration failed:', error);
            let displayErr = error.message || 'Failed to submit registration form.';
            if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
                displayErr = `Connection Error: Unable to reach backend at ${ERP_BASE_URL}. Please ensure the ERP server is running and your domain is allowed in CORS.`;
            }
            setErrorMessage(displayErr);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setPhotos({ student: null, father: null, mother: null });
        setPhotoPreviews({ student: '', father: '', mother: '' });
        setSubmitted(false);
        setSubmissionResult(null);
        setCurrentSection(0);
        setErrorMessage('');
    };

    // Success Screen
    if (submitted) {
        const registrationData = submissionResult?.data || {};
        const regId = registrationData._id || 'AAY-' + Date.now().toString().slice(-6);
        const status = registrationData.status || 'Pending';
        const createdDate = registrationData.createdAt
            ? new Date(registrationData.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
            : new Date().toLocaleDateString('en-IN');

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 py-12">
                <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 max-w-2xl w-full p-8 sm:p-10 text-center relative overflow-hidden">
                    {/* Header badge */}
                    <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

                    <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
                    </div>

                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Admission Application Submitted</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                        Welcome, {registrationData.firstName || formData.firstName}!
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6">
                        Your admission registration has been successfully received by the Aayush Institute Admission Office.
                    </p>

                    {/* Registration Receipt Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 text-left shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
                            <div>
                                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Application Number</span>
                                <p className="text-lg sm:text-xl font-bold font-mono text-blue-700">{regId}</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Application Status</span>
                                <div>
                                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                                        ● {status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-slate-500 text-xs">Student Name:</span>
                                <p className="font-semibold text-slate-800">
                                    {formData.firstName} {formData.midName ? `${formData.midName} ` : ''}{formData.lastName}
                                </p>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs">Applying For Class/Course:</span>
                                <p className="font-semibold text-slate-800">{formData.StudentClass}</p>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs">Registered Email:</span>
                                <p className="font-semibold text-slate-800 break-all">{formData.email}</p>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs">Primary Contact:</span>
                                <p className="font-semibold text-slate-800">{formData.phone}</p>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs">Date & Time:</span>
                                <p className="font-semibold text-slate-800">{createdDate}</p>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs">Hostel / Transport:</span>
                                <p className="font-semibold text-slate-800">
                                    Hostel: {formData.hostelRequired} | Transport: {formData.transportRequired}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps Notification */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left text-xs sm:text-sm text-blue-900">
                        <p className="font-semibold mb-1">What Happens Next?</p>
                        <p className="text-blue-800">
                            Our academic counselors will verify your submitted details and contact you within 24 to 48 working hours on your registered phone number (<strong>{formData.phone}</strong>) for batch allotment and fee scheduling.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-all flex items-center justify-center space-x-2 shadow-sm"
                        >
                            <Printer className="w-4 h-4 text-slate-500" />
                            <span>Print Application</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                        >
                            <Send className="w-4 h-4" />
                            <span>Submit Another Application</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 py-6 sm:py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                {/* Form Card Header */}
                <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white rounded-t-3xl shadow-xl p-6 sm:p-10 relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 text-xs font-semibold rounded-full">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Academic Session 2026 - 2027</span>
                        </span>
                        <span className="text-xs text-blue-200 font-mono">Official Online Admission Portal</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                        Aayush Institute of Professional Studies
                    </h1>
                    <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
                        Fill in your student profile and academic details below. All submitted registrations are synchronized directly with our ERP Admission Department.
                    </p>

                    {/* Multi-step Stepper Indicator */}
                    <div className="mt-8 pt-6 border-t border-blue-700/50">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {sections.map((sec, idx) => {
                                const isPassed = idx < currentSection;
                                const isCurrent = idx === currentSection;

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            if (idx <= currentSection) setCurrentSection(idx);
                                        }}
                                        className={`flex items-center space-x-2 p-2 rounded-xl text-left transition-all ${
                                            isCurrent
                                                ? 'bg-white/20 text-white font-semibold ring-1 ring-white/40'
                                                : isPassed
                                                ? 'bg-blue-800/40 text-blue-200 hover:bg-white/10'
                                                : 'text-blue-300/60 opacity-60 cursor-not-allowed'
                                        }`}
                                    >
                                        <div
                                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                                isPassed
                                                    ? 'bg-emerald-500 text-white'
                                                    : isCurrent
                                                    ? 'bg-white text-blue-900 shadow-sm'
                                                    : 'bg-blue-800 text-blue-300'
                                            }`}
                                        >
                                            {isPassed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs truncate font-medium">{sec.label}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Form Body Container */}
                <div className="bg-white rounded-b-3xl shadow-xl border-x border-b border-slate-200 p-6 sm:p-10">

                    {/* Global Error Banner */}
                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 text-red-800 text-sm animate-shake">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-semibold">Notice</p>
                                <p className="text-red-700">{errorMessage}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* ========================================================
                            SECTION 1: STUDENT PERSONAL DETAILS
                        ======================================================== */}
                        {currentSection === 0 && (
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Student Personal Information</h3>
                                            <p className="text-xs text-slate-500">Provide official identity details as per Aadhar / Matriculation</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Step 1 of 5</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g. Rahul"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            name="midName"
                                            value={formData.midName}
                                            onChange={handleInputChange}
                                            placeholder="Optional"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g. Kumar"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Class / Course Applying For <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="StudentClass"
                                            value={formData.StudentClass}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                        >
                                            <optgroup label="School Education">
                                                <option value="9th">9th Standard</option>
                                                <option value="10th">10th Standard (Matric)</option>
                                                <option value="11th">11th Standard</option>
                                                <option value="12th">12th Standard (Intermediate)</option>
                                            </optgroup>
                                            <optgroup label="Professional & University Programs">
                                                <option value="Full Stack Development">Full Stack Development</option>
                                                <option value="Python Development">Python Programming & AI</option>
                                                <option value="Web Development">Web Development</option>
                                                <option value="App Development">Mobile App Development</option>
                                                <option value="UI/UX Design">UI/UX Design Master</option>
                                                <option value="Digital Marketing">Digital Marketing Professional</option>
                                                <option value="Tally Accounting">Tally Prime & GST Accounting</option>
                                                <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                                                <option value="BBA">BBA (Bachelor of Business Admin)</option>
                                                <option value="MCA / MBA">MCA / MBA Support</option>
                                            </optgroup>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Gender <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Date of Birth <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Aadhar Number
                                        </label>
                                        <input
                                            type="text"
                                            name="aadhar"
                                            value={formData.aadhar}
                                            onChange={handleInputChange}
                                            maxLength={12}
                                            placeholder="12-digit UIDAI"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Blood Group
                                        </label>
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                        >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                        >
                                            <option value="General">General</option>
                                            <option value="OBC">OBC</option>
                                            <option value="SC">SC</option>
                                            <option value="ST">ST</option>
                                            <option value="EWS">EWS</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Religion
                                        </label>
                                        <select
                                            name="religion"
                                            value={formData.religion}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                        >
                                            <option value="Hinduism">Hinduism</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Christianity">Christianity</option>
                                            <option value="Sikhism">Sikhism</option>
                                            <option value="Buddhism">Buddhism</option>
                                            <option value="Jainism">Jainism</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ========================================================
                            SECTION 2: CONTACT & RESIDENTIAL ADDRESS
                        ======================================================== */}
                        {currentSection === 1 && (
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Contact & Residential Address</h3>
                                            <p className="text-xs text-slate-500">Official communication and dispatch address</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Step 2 of 5</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Student Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="student@example.com"
                                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Primary Phone (WhatsApp) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                maxLength={10}
                                                placeholder="10-digit Mobile"
                                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Alternate Phone
                                        </label>
                                        <div className="relative">
                                            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                            <input
                                                type="tel"
                                                name="altphone"
                                                value={formData.altphone}
                                                onChange={handleInputChange}
                                                maxLength={10}
                                                placeholder="Alternate mobile"
                                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center space-x-1.5">
                                        <Home className="w-4 h-4 text-blue-600" />
                                        <span>Current Residential Address</span>
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                House / Flat / Plot No.
                                            </label>
                                            <input
                                                type="text"
                                                name="currentHouseNo"
                                                value={formData.currentHouseNo}
                                                onChange={handleInputChange}
                                                placeholder="e.g. H-12, Flat 301"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Locality / Sector / Street
                                            </label>
                                            <input
                                                type="text"
                                                name="currentLocality"
                                                value={formData.currentLocality}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Sector 4, Kankarbagh"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                City <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="currentCity"
                                                value={formData.currentCity}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="e.g. Patna"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                State <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="currentState"
                                                value={formData.currentState}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="e.g. Bihar"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                PIN Code <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="currentPinCode"
                                                value={formData.currentPinCode}
                                                onChange={handleInputChange}
                                                required
                                                maxLength={6}
                                                placeholder="e.g. 800001"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ========================================================
                            SECTION 3: PARENT / GUARDIAN DETAILS
                        ======================================================== */}
                        {currentSection === 2 && (
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Parent / Guardian Details</h3>
                                            <p className="text-xs text-slate-500">Primary parent contact information for academic updates</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Step 3 of 5</span>
                                </div>

                                {/* Father Details */}
                                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                    <h4 className="text-sm font-bold text-slate-900 mb-3 text-blue-900">Father's Information</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Father's First Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fatherFirstName"
                                                value={formData.fatherFirstName}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="e.g. Ramesh"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Father's Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fatherLastName"
                                                value={formData.fatherLastName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Kumar"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Father's Phone <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="fatherPhone"
                                                value={formData.fatherPhone}
                                                onChange={handleInputChange}
                                                required
                                                maxLength={10}
                                                placeholder="Father's 10-digit phone"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Father's Email
                                            </label>
                                            <input
                                                type="email"
                                                name="fatherEmail"
                                                value={formData.fatherEmail}
                                                onChange={handleInputChange}
                                                placeholder="father@example.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Father's Occupation
                                            </label>
                                            <input
                                                type="text"
                                                name="fatherOccupation"
                                                value={formData.fatherOccupation}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Business / Salaried"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mother Details */}
                                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                    <h4 className="text-sm font-bold text-slate-900 mb-3 text-blue-900">Mother's Information</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Mother's First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="motherFirstName"
                                                value={formData.motherFirstName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Sunita"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Mother's Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="motherLastName"
                                                value={formData.motherLastName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Devi"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Mother's Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="motherPhone"
                                                value={formData.motherPhone}
                                                onChange={handleInputChange}
                                                maxLength={10}
                                                placeholder="Mother's phone"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ========================================================
                            SECTION 4: ACADEMIC BACKGROUND & FACILITIES
                        ======================================================== */}
                        {currentSection === 3 && (
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Academic Background & Facilities</h3>
                                            <p className="text-xs text-slate-500">Prior schooling and campus accommodation preferences</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Step 4 of 5</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Previous School / College Name
                                        </label>
                                        <input
                                            type="text"
                                            name="previousSchoolName"
                                            value={formData.previousSchoolName}
                                            onChange={handleInputChange}
                                            placeholder="e.g. ABC Public School"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Previous School Last Class Passed
                                        </label>
                                        <input
                                            type="text"
                                            name="previousSchoolLastClass"
                                            value={formData.previousSchoolLastClass}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 9th or 10th"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                                        />
                                    </div>
                                </div>

                                {/* Facilities Needed */}
                                <div className="pt-2">
                                    <h4 className="text-sm font-bold text-slate-800 mb-3">Campus Facilities Required:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        
                                        {/* Transport Option */}
                                        <div className={`p-4 rounded-2xl border transition-all ${
                                            formData.transportRequired === 'Yes' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/50'
                                        }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <Bus className="w-5 h-5 text-blue-600" />
                                                    <span className="font-semibold text-sm text-slate-900">Institute Bus / Transport</span>
                                                </div>
                                                <span className="text-xs font-bold text-slate-500">{formData.transportRequired}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">Daily pick and drop route across key city stops.</p>
                                            <div className="flex items-center space-x-4 text-xs font-semibold">
                                                <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="transportRequired"
                                                        value="Yes"
                                                        checked={formData.transportRequired === 'Yes'}
                                                        onChange={handleInputChange}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span>Yes, Required</span>
                                                </label>
                                                <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="transportRequired"
                                                        value="No"
                                                        checked={formData.transportRequired === 'No'}
                                                        onChange={handleInputChange}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span>No, Not Required</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Hostel Option */}
                                        <div className={`p-4 rounded-2xl border transition-all ${
                                            formData.hostelRequired === 'Yes' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/50'
                                        }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <Building2 className="w-5 h-5 text-indigo-600" />
                                                    <span className="font-semibold text-sm text-slate-900">Hostel Accommodation</span>
                                                </div>
                                                <span className="text-xs font-bold text-slate-500">{formData.hostelRequired}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">Furnished student hostel with mess & Wi-Fi.</p>
                                            <div className="flex items-center space-x-4 text-xs font-semibold">
                                                <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="hostelRequired"
                                                        value="Yes"
                                                        checked={formData.hostelRequired === 'Yes'}
                                                        onChange={handleInputChange}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span>Yes, Required</span>
                                                </label>
                                                <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="hostelRequired"
                                                        value="No"
                                                        checked={formData.hostelRequired === 'No'}
                                                        onChange={handleInputChange}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span>No, Not Required</span>
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ========================================================
                            SECTION 5: PHOTOS (OPTIONAL) & SUBMISSION DECLARATION
                        ======================================================== */}
                        {currentSection === 4 && (
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Photos & Final Submission</h3>
                                            <p className="text-xs text-slate-500">Upload optional photos and verify your submission</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Step 5 of 5</span>
                                </div>

                                {/* Optional Photo Upload Cards */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                        Photographs (Optional - You can also submit later during counseling)
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        
                                        {/* Student Photo */}
                                        <div className="border border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 text-center bg-slate-50/60 transition-all flex flex-col items-center justify-center">
                                            {photoPreviews.student ? (
                                                <div className="relative mb-2">
                                                    <img
                                                        src={photoPreviews.student}
                                                        alt="Student Preview"
                                                        className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm"
                                                    />
                                                    <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5">
                                                        <Check className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-blue-100/60 text-blue-600 flex items-center justify-center mb-2">
                                                    <Camera className="w-6 h-6" />
                                                </div>
                                            )}
                                            <span className="text-xs font-bold text-slate-800">Student Photo</span>
                                            <p className="text-[11px] text-slate-400 mb-2">Passport size (JPG, PNG)</p>
                                            <label className="cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-800 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
                                                <span>{photoPreviews.student ? 'Change Photo' : 'Select Photo'}</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handlePhotoChange('student', e)}
                                                />
                                            </label>
                                        </div>

                                        {/* Father Photo */}
                                        <div className="border border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 text-center bg-slate-50/60 transition-all flex flex-col items-center justify-center">
                                            {photoPreviews.father ? (
                                                <div className="relative mb-2">
                                                    <img
                                                        src={photoPreviews.father}
                                                        alt="Father Preview"
                                                        className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm"
                                                    />
                                                    <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5">
                                                        <Check className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-indigo-100/60 text-indigo-600 flex items-center justify-center mb-2">
                                                    <Camera className="w-6 h-6" />
                                                </div>
                                            )}
                                            <span className="text-xs font-bold text-slate-800">Father's Photo</span>
                                            <p className="text-[11px] text-slate-400 mb-2">Passport size (Optional)</p>
                                            <label className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
                                                <span>{photoPreviews.father ? 'Change Photo' : 'Select Photo'}</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handlePhotoChange('father', e)}
                                                />
                                            </label>
                                        </div>

                                        {/* Mother Photo */}
                                        <div className="border border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 text-center bg-slate-50/60 transition-all flex flex-col items-center justify-center">
                                            {photoPreviews.mother ? (
                                                <div className="relative mb-2">
                                                    <img
                                                        src={photoPreviews.mother}
                                                        alt="Mother Preview"
                                                        className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm"
                                                    />
                                                    <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5">
                                                        <Check className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-purple-100/60 text-purple-600 flex items-center justify-center mb-2">
                                                    <Camera className="w-6 h-6" />
                                                </div>
                                            )}
                                            <span className="text-xs font-bold text-slate-800">Mother's Photo</span>
                                            <p className="text-[11px] text-slate-400 mb-2">Passport size (Optional)</p>
                                            <label className="cursor-pointer text-xs font-semibold text-purple-600 hover:text-purple-800 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
                                                <span>{photoPreviews.mother ? 'Change Photo' : 'Select Photo'}</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handlePhotoChange('mother', e)}
                                                />
                                            </label>
                                        </div>

                                    </div>
                                </div>

                                {/* Terms & Conditions Declaration */}
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 space-y-2.5">
                                    <p className="font-bold text-slate-800 text-sm">Declaration & Undertaking:</p>
                                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                                        <li>I hereby declare that all information furnished in this registration form is accurate, complete, and true to the best of my knowledge.</li>
                                        <li>I understand that submitting this registration initiates my application review with the Aayush Institute Admission Committee.</li>
                                        <li>All original testimonials, mark sheets, and identity proofs will be presented during document verification.</li>
                                    </ul>

                                    <label className="flex items-start space-x-3 pt-3 mt-3 border-t border-slate-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onChange={handleInputChange}
                                            required
                                            className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                        />
                                        <span className="text-xs font-semibold text-slate-800 select-none">
                                            I agree to the terms and institutional policies of Aayush Institute and authorize the admission team to contact me. *
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Navigation / Action Bar */}
                        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={currentSection === 0 || isSubmitting}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                                    currentSection === 0
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                }`}
                            >
                                Previous
                            </button>

                            {currentSection < sections.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition flex items-center space-x-2 shadow-sm hover:shadow"
                                >
                                    <span>Next Step</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!formData.agreeTerms || isSubmitting}
                                    className={`px-8 py-3 rounded-xl text-sm font-bold transition flex items-center space-x-2 shadow-md ${
                                        formData.agreeTerms && !isSubmitting
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/20'
                                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Submitting Registration...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Submit Admission Form</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Admission Helpline Footer Card */}
                <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span>Admission Helpdesk & Counseling Support</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <p className="font-semibold text-slate-800">Helpline Phone</p>
                            <p className="text-slate-600 mt-0.5">+91 98765 43210 / 0612-2345678</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <p className="font-semibold text-slate-800">Email Admissions</p>
                            <p className="text-slate-600 mt-0.5">admission@aayushinstitute.com</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <p className="font-semibold text-slate-800">Counseling Hours</p>
                            <p className="text-slate-600 mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RegistrationForm;
