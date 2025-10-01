import { Schema, model } from "mongoose";

const inquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    program: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    consent: { type: Boolean, required: true },
}, { timestamps: true });

export default model("Inquiry", inquirySchema);
