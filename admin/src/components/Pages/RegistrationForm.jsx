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
    ChevronRight
} from 'lucide-react';




function RegistrationForm() {

    const [formData, setFormData] = useState({
        studentFirstName: '',
        studentLastName: '',
        studentEmail: '',
        studentPhone: '',
        dateOfBirth: '',
        grade: '',
        program: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        parentFirstName: '',
        parentLastName: '',
        parentEmail: '',
        parentPhone: '',
        relationship: '',
        previousSchool: '',
        gpa: '',
        interests: '',
        whyApplying: '',
        emergencyName: '',
        emergencyPhone: '',
        emergencyRelationship: '',
        specialNeeds: '',
        medications: '',
        agreeTerms: false,
    });

    // const [formData, setFormData] = useState < FormData > ({
    //     studentFirstName: '',
    //     studentLastName: '',
    //     studentEmail: '',
    //     studentPhone: '',
    //     dateOfBirth: '',
    //     grade: '',
    //     program: '',
    //     address: '',
    //     city: '',
    //     state: '',
    //     zipCode: '',
    //     parentFirstName: '',
    //     parentLastName: '',
    //     parentEmail: '',
    //     parentPhone: '',
    //     relationship: '',
    //     previousSchool: '',
    //     gpa: '',
    //     interests: '',
    //     whyApplying: '',
    //     emergencyName: '',
    //     emergencyPhone: '',
    //     emergencyRelationship: '',
    //     specialNeeds: '',
    //     medications: '',
    //     agreeTerms: false,
    // });

    const [currentSection, setCurrentSection] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value, type } = e.target;
    //     setFormData(prev => ({
    //       ...prev,
    //       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    //     }));
    //   };



    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    //   const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setSubmitted(true);
    //   };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };


    const sections = [
        'Student Information',
        'Contact Details',
        'Parent/Guardian',
        'Academic Background',
        'Additional Information'
    ];

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your application to Harmony Academy. We'll review your submission and contact you within 5-7 business days.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            <strong>Application ID:</strong> HA-{Date.now().toString().slice(-6)}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSubmitted(false); setFormData({
                                studentFirstName: '', studentLastName: '', studentEmail: '', studentPhone: '', dateOfBirth: '', grade: '', program: '',
                                address: '', city: '', state: '', zipCode: '', parentFirstName: '', parentLastName: '', parentEmail: '', parentPhone: '', relationship: '',
                                previousSchool: '', gpa: '', interests: '', whyApplying: '', emergencyName: '', emergencyPhone: '', emergencyRelationship: '',
                                specialNeeds: '', medications: '', agreeTerms: false
                            })
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    {/* <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Harmony Academy</h1>
                            <p className="text-blue-600 font-medium">Excellence in Education Since 1985</p>
                        </div>
                    </div> */}

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-2 overflow-x-auto">
                        {sections.map((section, index) => (
                            <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index <= currentSection
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className={`text-sm font-medium ${index <= currentSection ? 'text-blue-600' : 'text-gray-500'
                                    }`}>
                                    {section}
                                </span>
                                {index < sections.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-gray-300" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                        <h2 className="text-3xl font-bold mb-2">Apply Now for 2024-2025</h2>
                        <p className="text-blue-100">Join our community of learners and discover your potential</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Student Information */}
                        {currentSection === 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <User className="w-6 h-6 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-gray-900">Student Information</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            name="studentFirstName"
                                            value={formData.studentFirstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            name="studentLastName"
                                            value={formData.studentLastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Grade Applying For *</label>
                                        <select
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select Grade</option>
                                            <option value="kindergarten">Kindergarten</option>
                                            <option value="1st">1st Grade</option>
                                            <option value="2nd">2nd Grade</option>
                                            <option value="3rd">3rd Grade</option>
                                            <option value="4th">4th Grade</option>
                                            <option value="5th">5th Grade</option>
                                            <option value="6th">6th Grade</option>
                                            <option value="7th">7th Grade</option>
                                            <option value="8th">8th Grade</option>
                                            <option value="9th">9th Grade</option>
                                            <option value="10th">10th Grade</option>
                                            <option value="11th">11th Grade</option>
                                            <option value="12th">12th Grade</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Interest</label>
                                    <select
                                        name="program"
                                        value={formData.program}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Program (Optional)</option>
                                        <option value="stem">STEM Academy</option>
                                        <option value="arts">Arts & Humanities</option>
                                        <option value="sports">Athletic Excellence</option>
                                        <option value="ib">International Baccalaureate</option>
                                        <option value="general">General Education</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Contact Details */}
                        {currentSection === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Student Email</label>
                                        <input
                                            type="email"
                                            name="studentEmail"
                                            value={formData.studentEmail}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="student@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Student Phone</label>
                                        <input
                                            type="tel"
                                            name="studentPhone"
                                            value={formData.studentPhone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Home Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="123 Main Street"
                                    />
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="City"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="State"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="12345"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Parent/Guardian Information */}
                        {currentSection === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Heart className="w-6 h-6 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-gray-900">Parent/Guardian Information</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            name="parentFirstName"
                                            value={formData.parentFirstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Parent first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            name="parentLastName"
                                            value={formData.parentLastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Parent last name"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="parentEmail"
                                            value={formData.parentEmail}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="parent@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                        <input
                                            type="tel"
                                            name="parentPhone"
                                            value={formData.parentPhone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship to Student *</label>
                                    <select
                                        name="relationship"
                                        value={formData.relationship}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Relationship</option>
                                        <option value="mother">Mother</option>
                                        <option value="father">Father</option>
                                        <option value="guardian">Legal Guardian</option>
                                        <option value="grandparent">Grandparent</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <h4 className="font-medium text-amber-800 mb-2">Emergency Contact</h4>
                                    <p className="text-sm text-amber-700 mb-4">Please provide an emergency contact (different from above)</p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-amber-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                name="emergencyName"
                                                value={formData.emergencyName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                                placeholder="Emergency contact name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-amber-700 mb-2">Phone *</label>
                                            <input
                                                type="tel"
                                                name="emergencyPhone"
                                                value={formData.emergencyPhone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-amber-700 mb-2">Relationship *</label>
                                        <input
                                            type="text"
                                            name="emergencyRelationship"
                                            value={formData.emergencyRelationship}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                            placeholder="e.g., Aunt, Uncle, Family Friend"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Academic Background */}
                        {currentSection === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <GraduationCap className="w-6 h-6 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-gray-900">Academic Background</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Previous School</label>
                                        <input
                                            type="text"
                                            name="previousSchool"
                                            value={formData.previousSchool}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Current or most recent school"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current GPA (if applicable)</label>
                                        <input
                                            type="text"
                                            name="gpa"
                                            value={formData.gpa}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="e.g., 3.5"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Academic Interests & Hobbies</label>
                                    <textarea
                                        name="interests"
                                        value={formData.interests}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Tell us about your favorite subjects, hobbies, and extracurricular activities..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to attend Harmony Academy?</label>
                                    <textarea
                                        name="whyApplying"
                                        value={formData.whyApplying}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Share what draws you to our school and what you hope to achieve here..."
                                    />
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                                        <Upload className="w-5 h-5 mr-2" />
                                        Required Documents
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <span className="text-sm font-medium text-gray-700">Official Transcripts</span>
                                            </div>
                                            <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Upload
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <span className="text-sm font-medium text-gray-700">Letter of Recommendation</span>
                                            </div>
                                            <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Upload
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <span className="text-sm font-medium text-gray-700">Birth Certificate</span>
                                            </div>
                                            <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-blue-600 mt-3">
                                        You can upload documents now or email them to admissions@harmonyacademy.edu
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Additional Information */}
                        {currentSection === 4 && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs or Accommodations</label>
                                    <textarea
                                        name="specialNeeds"
                                        value={formData.specialNeeds}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Please describe any learning differences, disabilities, or accommodations needed..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications or Medical Conditions</label>
                                    <textarea
                                        name="medications"
                                        value={formData.medications}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="List any medications or medical conditions we should be aware of..."
                                    />
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-medium text-gray-800 mb-4">Terms and Conditions</h4>
                                    <div className="text-sm text-gray-600 space-y-2 mb-4">
                                        <p>By submitting this application, I acknowledge that:</p>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>All information provided is accurate and complete</li>
                                            <li>I understand the school's policies and procedures</li>
                                            <li>I authorize Harmony Academy to contact references and previous schools</li>
                                            <li>I understand that submission does not guarantee acceptance</li>
                                            <li>There is a non-refundable application fee of $75</li>
                                        </ul>
                                    </div>

                                    <label className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            name="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            I agree to the terms and conditions stated above and confirm that all information provided is accurate. *
                                        </span>
                                    </label>
                                </div>

                                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                                    <h4 className="font-medium text-emerald-800 mb-2">What Happens Next?</h4>
                                    <div className="text-sm text-emerald-700 space-y-2">
                                        <p>1. <strong>Application Review:</strong> We'll review your application within 5-7 business days</p>
                                        <p>2. <strong>Interview Process:</strong> Qualified candidates will be invited for a student/family interview</p>
                                        <p>3. <strong>School Visit:</strong> We'll arrange a campus tour and shadow day</p>
                                        <p>4. <strong>Decision:</strong> Admission decisions are typically made within 2-3 weeks</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-8 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
                                disabled={currentSection === 0}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${currentSection === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Previous
                            </button>

                            {currentSection < sections.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={() => setCurrentSection(prev => prev + 1)}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                >
                                    <span>Next</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!formData.agreeTerms}
                                    className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${formData.agreeTerms
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Submit Application</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Contact Information Footer */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions? We're Here to Help</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                        <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Admissions Office</p>
                                <p className="text-gray-600">(555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Email Us</p>
                                <p className="text-gray-600">admissions@harmonyacademy.edu</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Office Hours</p>
                                <p className="text-gray-600">Mon-Fri, 8 AM - 5 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;

