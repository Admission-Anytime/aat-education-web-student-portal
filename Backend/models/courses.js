import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  // Basic info (Student-Portal & Academic)
  type: { type: String, default: "Professional" }, // Professional, Technical, Certification, University
  rating: { type: Number, default: 4.8 },
  title: { type: String }, // e.g. UI/UX Designing
  description: { type: String }, // Short summary / description

  // Course overview
  duration: { type: String, default: "6 Months" }, // e.g. "6 Months", "1 Year"
  fees: { type: String, default: "Contact for fee" },
  career: [{ type: String }],
  universities: [{ type: String }],

  // ERP & Messbee specific fields
  mode: { type: String, default: "Classroom" }, // Hybrid, Classroom, Online
  instructor: {
    name: { type: String, default: "Arjun Mehta" },
    avatar: { type: String, default: "AM" }
  },
  enrollments: { type: Number, default: 96 },
  status: { type: String, default: "Published" }, // Published, Draft, Coming Soon, Archived
  admissions: { type: String, default: "Active Admissions" }, // Active Admissions, Upcoming, Closed
  categoryName: { type: String, default: "Software & Web" }, // e.g. Design & Media, Software & Web, Digital Marketing, AI, Data & Cloud

  // Detailed page info
  topics: [{ type: String }],
  prerequisites: [{ type: String }],
  structure: [String],
  visible: { type: Boolean, default: true },

  // School-Web Portal specific fields
  name: { type: String },
  categoryId: { type: String, default: "software" },
  subgroup: { type: String },
  oneLiner: { type: String },
  image: { type: String },
  popular: { type: Boolean, default: false },
  path: { type: String },
  skills: [{ type: String }],
  level: { type: String, default: "Beginner to Advanced" },
  eligibility: { type: String },
  careerAreas: { type: String },
  details: { type: String },
  features: [{ type: String }],
  certification: { type: String, default: "Certificate" },
  scholarship: { type: String, default: "Up to 50%" },
  batchSchedule: { type: String, default: "Weekday & Weekend Batches" },

  // Program & Order customization
  order: { type: Number, default: 99 }, // 1 = Top Priority (#1 rank), 2 = 2nd, etc.
  programType: {
    type: String,
    enum: ["course", "corporate", "university", "liveproject"],
    default: "course",
  },
  badge: { type: String }, // e.g. "ENTERPRISE", "UGC Entitled", "Live Project", "Govt. Recognized"
  degrees: { type: String }, // For University programs (e.g. "BBA, MBA, PGDBM")
  suitableFor: { type: String }, // For Corporate training (e.g. "Management, HR, IT teams")
  delivery: { type: String, default: "On-Site / Online / Hybrid" },
}, { timestamps: true });

// Ensure title <-> name and description <-> oneLiner sync automatically
CourseSchema.pre("save", function(next) {
  if (!this.title && this.name) this.title = this.name;
  if (!this.name && this.title) this.name = this.title;
  if (!this.description && (this.oneLiner || this.details)) {
    this.description = this.oneLiner || this.details;
  }
  if (!this.oneLiner && this.description) this.oneLiner = this.description;
  if (!this.details && this.description) this.details = this.description;
  if (!this.categoryName && this.subgroup) this.categoryName = this.subgroup;
  next();
});

export default model("Course", CourseSchema);
