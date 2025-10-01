import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  icon: String,
  number: String,
  label: String,
});

const aboutSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    statistics: [statSchema],
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
