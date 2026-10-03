import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  categoryId: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  desc: { type: String },
  eligibility: { type: String },
  activeGrad: { type: String, default: "from-blue-600 to-indigo-600" },
  activeShadow: { type: String, default: "shadow-blue-500/30" },
  badgeColor: { type: String, default: "bg-blue-50 text-blue-700 border-blue-200/90" },
  iconColor: { type: String, default: "text-blue-600" },
  headerGrad: { type: String, default: "from-blue-600 via-indigo-600 to-cyan-500" }
}, { timestamps: true });

export default model("Category", CategorySchema);
