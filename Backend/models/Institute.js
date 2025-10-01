import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  logo: { type: String } // store file path / URL
}, { timestamps: true });

export default mongoose.model("Institute", instituteSchema);
