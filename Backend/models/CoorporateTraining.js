import mongoose from "mongoose";

const trainingProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courses: [String],
  color: String,
  bgGradient: String,
  iconName: String // Store icon name for React (like "Monitor", "Palette", etc.)
}, { timestamps: true });

export default mongoose.model("CoorporateTraining", trainingProgramSchema);
