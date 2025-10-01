import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  // Basic info
  type: { type: String, required: true }, // Undergraduate, Postgraduate, Diploma, Doctoral
  rating: { type: Number, required: true }, // e.g., 4.5
  title: { type: String, required: true }, // e.g., Bachelor of Computer Applications (BCA)
  description: { type: String, required: true }, // Short summary / description

  // Course overview for cards
  duration: { type: String, required: true }, // e.g., "3 Years"
  fees: { type: String, required: true }, // e.g., "₹2-6 Lakhs"
  career: [{ type: String }], // Career prospects for card and detailed page
  universities: [{ type: String }], // Top universities for card and detailed page

  // Detailed page info
  topics: [{ type: String }], // Key topics
  prerequisites: [{ type: String }], // Pre-requisites
  structure: [String], // much simpler Course structure
  visible: { type: Boolean, default: true },  // <-- added

}, { timestamps: true });

export default model("Course", CourseSchema);
