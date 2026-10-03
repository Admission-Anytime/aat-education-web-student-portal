import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, default: "Admin" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Admin" },
  status: { type: String, default: "active", enum: ["active", "pending", "suspended"] },
  phone: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("AdminLogin", adminSchema);

