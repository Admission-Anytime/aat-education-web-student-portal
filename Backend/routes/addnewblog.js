import express from "express";
import multer from "multer";
import Blog from "../models/addnewblogSchema.js";
const router = express.Router();
const BASE_URL = process.env.BASE_URL ;
// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const Upload = multer({ storage });

// @POST Create Blog
router.post("/", Upload.single("coverImage"), async (req, res) => {
  try {
    console.log("Body received:", req.body);
    console.log("File received:", req.file);

    const { title, status, shortDescription, longDescription } = req.body;

    if (!title || !shortDescription || !longDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBlog = new Blog({
      title,
      status,
      shortDescription,
      longDescription,
      coverImage: req.file ? req.file.path : null,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error); // ✅ log full error
    res.status(500).json({ error: "Error creating blog", details: error.message });
  }
});

//@DELETE Delete Blog BY Dynamic Id /api/blogs/:id
router.delete("/:id", async (req, res) => {
  try {
    console.log("Trying to delete:", req.params.id); // 👈 debug
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message); // 👈 log the actual cause
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// @GET Get All Blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

export default router;
