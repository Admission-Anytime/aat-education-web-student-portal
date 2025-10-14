import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  program: { type: String, required: true },
  state: { type: String },
  city: { type: String },
  consent: { type: Boolean, default: false },
}, { timestamps: true });

const Inquiry = mongoose.model("InquirySaved", inquirySchema);
export default Inquiry;
