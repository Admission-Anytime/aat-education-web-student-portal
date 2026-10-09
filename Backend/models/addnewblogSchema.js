import mongoose from "mongoose";

const addnewblogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ["Draft", "Published"], default: "Published" },
    displayOrder: { type: Number, default: 0 },
    tag: { type: String, default: "Career" },
    category: { type: String, default: "Blogs" },
    author: { type: String, default: "Aayush Institute" },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    readTime: { type: String, default: "3 min read" },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    coverImage: { type: String, default: "/corporate_ai.jpg" },
    highlights: [{ type: String }],
    relatedLink: { type: String, default: "/Courses" },
  },
  { timestamps: true }
);

// Optimize query index for ordered blogs
addnewblogSchema.index({ displayOrder: 1, createdAt: -1 });

export default mongoose.model("Blog", addnewblogSchema);