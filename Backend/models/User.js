import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    default: "password123",
  },
  role: {
    type: String,
    enum: ['staff', 'alumni', 'student', 'admin'],
    default: 'student',
  },
  phone: { type: String },
  department: { type: String, default: "Academic Faculty" },
  course: { type: String },
  memberId: { type: String },
  batch: { type: String }, // e.g. "2022-2024" for Alumni
  company: { type: String }, // e.g. Current employer for Alumni
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvedBy: { type: String },
  approvedAt: { type: Date },
  avatar: { type: String },
  image: { type: String },
  designation: { type: String, default: "Faculty Instructor" },
  qualification: { type: String },
  experience: { type: String },
  bio: { type: String },
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (this.status === 'active') {
    this.isApproved = true;
  } else if (this.status === 'pending') {
    this.isApproved = false;
  }
  next();
});

export default model('User', UserSchema);