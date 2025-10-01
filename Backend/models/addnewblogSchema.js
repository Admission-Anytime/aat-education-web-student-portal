import mongoose from "mongoose";
// schema defined
const addnewblogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  coverImage: { type: String },
 // sliderImage: { type: String },
}, { timestamps: true });

// export model
export default mongoose.model("Blog", addnewblogSchema);
 