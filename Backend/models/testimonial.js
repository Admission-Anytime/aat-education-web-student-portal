import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String, // URL of profile picture
      required: false, // optional (in case you don’t want image)
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
      type: String, // The testimonial text
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false, // testimonials usually don’t need frequent edits
    },
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
