import mongoose from "mongoose";

// Define the Carousel or slider schema
// Title refers to image caption here
const carouselSchema = new mongoose.Schema(
  {
    imagename: String,
    title: String,
    description: String,
    visible: { type: Boolean, default: true }
  },
  { timestamps: true } // This adds createdAt and updatedAt fields automatically
);

const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;
// This model can be used to create, read, update, and delete carousel or slider items in the MongoDB database.