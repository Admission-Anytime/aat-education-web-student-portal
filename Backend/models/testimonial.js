import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String, // URL or filename of profile picture
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
