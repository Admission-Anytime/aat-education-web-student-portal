import { Schema, model } from "mongoose";

const inquirySchema = new Schema({
    name: { type: String, required: true },
    admissionId: { type: String },
    fatherName: { type: String, default: "N/A" },
    className: { type: String },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    program: { type: String, default: "" },
    course: { type: String },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    message: { type: String },
    status: { type: String, default: "Pending" }, // "Approved", "Pending", "Waiting", "Rejected", "New", "Enrolled"
    session: { type: String, default: "2024-25" },
    consent: { type: Boolean, default: true },
    notes: { type: String },
    qualification: { type: String, default: "" },
    degree: { type: String, default: "" },
    passingYear: { type: String, default: "" },
    careerDomain: { type: String, default: "" },
    preferredRole: { type: String, default: "" },
    inquiryType: { type: String, default: "Admission" } // "Placement Support", "Admission", "General Lead"
}, { timestamps: true });

// Pre-save hook to ensure admissionId exists
inquirySchema.pre("save", function(next) {
    if (!this.admissionId) {
        const year = new Date().getFullYear();
        const rand = Math.floor(100 + Math.random() * 900);
        this.admissionId = `ADM-${year}-${rand}`;
    }
    if (!this.course && this.program) {
        this.course = this.program;
    }
    if (!this.className && (this.course || this.program)) {
        this.className = this.course || this.program;
    }
    next();
});

export default model("Inquiry", inquirySchema);
