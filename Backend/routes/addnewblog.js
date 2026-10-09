import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Blog from "../models/addnewblogSchema.js";

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const Upload = multer({ storage });

export const DEFAULT_BLOGS = [
  {
    displayOrder: 1,
    coverImage: "/corporate_ai.jpg",
    tag: "Career",
    category: "Blogs",
    title: "Top 7 High-Paying Tech Career Opportunities for Students in 2026",
    date: "12 Sep 2025",
    readTime: "4 min read",
    author: "Career Advisory Cell",
    shortDescription:
      "Discover high-demand IT careers spanning Full Stack, AI & Cloud Engineering with proven placement roadmaps and salary benchmarks.",
    longDescription:
      "The technology landscape in 2026 presents unprecedented opportunities for students and freshers. With the rapid evolution of generative AI, cloud-native architectures, and data engineering, organizations are actively seeking candidates with hands-on project exposure rather than purely theoretical credentials. Enrolling in structured certification programs with live lab mentorship bridges this skill gap effectively.",
    highlights: [
      "Full Stack Web & Cloud Architectures",
      "Hands-on AI-assisted software workflows",
      "100% placement support with 500+ corporate hiring partners",
      "Mock technical rounds & resume portfolio building",
    ],
    relatedLink: "/Courses",
    status: "Published",
  },
  {
    displayOrder: 2,
    coverImage: "/blog_distance_edu.jpg",
    tag: "Higher Education",
    category: "Blogs",
    title: "Benefits of Distance Education for Working Professionals",
    date: "10 Sep 2025",
    readTime: "3 min read",
    author: "Academic Advisory",
    shortDescription:
      "Learn how UGC-DEB entitled online degrees empower working adults to earn accredited qualifications without quitting their day jobs.",
    longDescription:
      "Balancing career growth with higher education is easier than ever with UGC-entitled distance and online learning. Professionals can pursue BCA, MCA, BBA, or MBA programs with flexible schedules, digital study materials, and proctored examinations. Recognized degrees unlock promotions, salary appraisals, and higher managerial appointments.",
    highlights: [
      "UGC-DEB recognized degree credentials",
      "Self-paced learning with weekend faculty support",
      "Cost-effective fee structures with EMI options",
      "Eligible for corporate promotions & government tests",
    ],
    relatedLink: "/UniversityCourses",
    status: "Published",
  },
  {
    displayOrder: 3,
    coverImage: "/blog_internships.jpg",
    tag: "Internship",
    category: "Blogs",
    title: "How Internships Help You Get Hired Faster",
    date: "08 Sep 2025",
    readTime: "3 min read",
    author: "Placement Cell",
    shortDescription:
      "Real-world project experience bridges the gap between classroom concepts and high-velocity corporate engineering standards.",
    longDescription:
      "Internships offer invaluable exposure to agile development workflows, sprint planning, pull request reviews, and production bug resolutions. Candidates with proven internship experience stand out significantly during campus placements and technical rounds, with many securing direct pre-placement offers (PPOs).",
    highlights: [
      "Work on live client deliverables and prototypes",
      "Mentorship from experienced senior tech leads",
      "Build a verified GitHub & live portfolio website",
      "Official certificate of completion & recommendation",
    ],
    relatedLink: "/LiveProject",
    status: "Published",
  },
  {
    displayOrder: 4,
    coverImage: "/blog_future_ai.jpg",
    tag: "Technology",
    category: "Blogs",
    title: "The Future of AI & How It's Changing the Job Market",
    date: "05 Sep 2025",
    readTime: "4 min read",
    author: "AI Innovation Lab",
    shortDescription:
      "Artificial intelligence is reshaping everyday workflows. Learn how developers and creators can leverage AI to multiply their output.",
    longDescription:
      "AI tools are not here to replace developers, but developers who understand AI-assisted tooling will outperform those who don't. From automated coding assistants to intelligent chatbots and predictive data models, incorporating AI into your skillset equips you for modern, high-value tech positions.",
    highlights: [
      "Integrating LLM APIs & automated workflows",
      "Copilot-assisted coding and debugging",
      "Data analysis & visualization using modern tools",
      "Future-proofing skills for next-gen roles",
    ],
    relatedLink: "/Courses",
    status: "Published",
  },
  {
    displayOrder: 5,
    coverImage: "/blog_it_skills.jpg",
    tag: "Web Development",
    category: "Blogs",
    title: "Full Stack Roadmap 2026: Frontend, Backend & System Design",
    date: "01 Oct 2025",
    readTime: "5 min read",
    author: "Full Stack Department",
    shortDescription:
      "Everything you need to know about mastering React 19, Node.js, databases, and modern cloud deployment in 2026.",
    longDescription:
      "Full-stack development continues to be the bedrock of modern software engineering. With the evolution of server components, TypeScript, and distributed microservices, engineers who can bridge the gap between user experience and reliable backend architecture command top tier compensation.",
    highlights: [
      "Modern React & Next.js architectures",
      "PostgreSQL, MongoDB, and Redis caching",
      "Dockerizing applications & cloud deployments",
      "100% placement track with top tech firms",
    ],
    relatedLink: "/Courses",
    status: "Published",
  },
  {
    displayOrder: 6,
    coverImage: "/blog_distance_edu.jpg",
    tag: "Design & UX",
    category: "Blogs",
    title: "Mastering UI/UX: From User Research to High-Converting Interfaces",
    date: "28 Sep 2025",
    readTime: "4 min read",
    author: "Design Studio Lead",
    shortDescription:
      "Explore the core fundamentals of UX research, Figma design systems, and rapid prototyping that employers look for.",
    longDescription:
      "Exceptional digital products rely on human-centric design. Learning user journey mapping, wireframing, component-driven design systems in Figma, and usability testing enables aspiring designers to create intuitive, accessible, and delightful digital experiences.",
    highlights: [
      "Figma components, variants & auto-layout",
      "User research & usability testing methods",
      "Building production-ready design systems",
      "Live portfolio creation & client feedback",
    ],
    relatedLink: "/Courses",
    status: "Published",
  },
];

// Helper: Auto-seed default blogs if collection is completely empty
async function checkAndAutoSeed() {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log("Seeding default blogs into MongoDB...");
      await Blog.insertMany(DEFAULT_BLOGS);
      console.log("Default blogs seeded successfully.");
    }
  } catch (err) {
    console.error("Auto-seed error:", err.message);
  }
}

// @GET /api/blogs - Get All Blogs sorted by displayOrder (1, 2, 3...) then latest createdAt
router.get("/", async (req, res) => {
  try {
    await checkAndAutoSeed();
    const blogs = await Blog.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Error fetching blogs", details: error.message });
  }
});

// @GET /api/blogs/:id - Get Single Blog by _id or displayOrder
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      const orderNum = Number(id);
      if (!isNaN(orderNum)) {
        blog = await Blog.findOne({ displayOrder: orderNum });
      }
    }
    if (!blog) {
      const match = DEFAULT_BLOGS.find(
        (b) => String(b.displayOrder) === String(id) || String(b.id) === String(id)
      );
      if (match) return res.json(match);
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Error fetching blog", details: error.message });
  }
});

// @POST /api/blogs/seed - Explicit endpoint to seed or restore default blogs
router.post("/seed", async (req, res) => {
  try {
    const { overwrite } = req.body || {};
    if (overwrite) {
      await Blog.deleteMany({});
    }
    const existing = await Blog.countDocuments();
    if (existing > 0 && !overwrite) {
      return res.json({
        message: "Blogs already exist. Set overwrite: true to replace all.",
        count: existing,
      });
    }
    const inserted = await Blog.insertMany(DEFAULT_BLOGS);
    res.status(201).json({
      message: "Default blogs seeded successfully!",
      count: inserted.length,
      blogs: inserted,
    });
  } catch (error) {
    console.error("Error seeding blogs:", error);
    res.status(500).json({ error: "Failed to seed blogs", details: error.message });
  }
});

// @PUT /api/blogs/reorder - Bulk update display order [{ id, displayOrder }, ...]
router.put("/reorder", async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items array is required" });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id || item._id },
        update: { $set: { displayOrder: Number(item.displayOrder) || 0 } },
      },
    }));

    if (bulkOps.length > 0) {
      await Blog.bulkWrite(bulkOps);
    }

    const updatedBlogs = await Blog.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ message: "Order updated successfully", blogs: updatedBlogs });
  } catch (error) {
    console.error("Reorder error:", error);
    res.status(500).json({ error: "Failed to reorder blogs", details: error.message });
  }
});

// @POST /api/blogs - Create New Blog
router.post("/", Upload.single("coverImage"), async (req, res) => {
  try {
    const {
      title,
      status,
      displayOrder,
      tag,
      category,
      author,
      date,
      readTime,
      shortDescription,
      longDescription,
      highlights,
      relatedLink,
      coverImageUrl,
    } = req.body;

    if (!title || !shortDescription || !longDescription) {
      return res.status(400).json({ error: "Title, short description and content are required" });
    }

    // Determine coverImage (file upload > manual URL > default fallback)
    let coverImage = "/corporate_ai.jpg";
    if (req.file) {
      coverImage = `/Uploads/${req.file.filename}`;
    } else if (coverImageUrl && coverImageUrl.trim()) {
      coverImage = coverImageUrl.trim();
    } else if (req.body.coverImage && typeof req.body.coverImage === "string") {
      coverImage = req.body.coverImage;
    }

    // Determine displayOrder: if not provided or 0, calculate next order
    let orderNum = Number(displayOrder);
    if (isNaN(orderNum) || orderNum <= 0) {
      const highest = await Blog.findOne().sort({ displayOrder: -1 }).select("displayOrder");
      orderNum = highest && highest.displayOrder ? highest.displayOrder + 1 : 1;
    }

    // Parse highlights if sent as string (from FormData)
    let parsedHighlights = [];
    if (Array.isArray(highlights)) {
      parsedHighlights = highlights;
    } else if (typeof highlights === "string") {
      try {
        parsedHighlights = JSON.parse(highlights);
      } catch {
        parsedHighlights = highlights
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    const newBlog = new Blog({
      title: title.trim(),
      status: status || "Published",
      displayOrder: orderNum,
      tag: tag || "Career",
      category: category || "Blogs",
      author: author || "Aayush Institute",
      date: date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      readTime: readTime || "3 min read",
      shortDescription: shortDescription.trim(),
      longDescription: longDescription.trim(),
      coverImage,
      highlights: parsedHighlights,
      relatedLink: relatedLink || "/Courses",
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Error creating blog", details: error.message });
  }
});

// @PUT /api/blogs/:id - Update Blog
router.put("/:id", Upload.single("coverImage"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const {
      title,
      status,
      displayOrder,
      tag,
      category,
      author,
      date,
      readTime,
      shortDescription,
      longDescription,
      highlights,
      relatedLink,
      coverImageUrl,
    } = req.body;

    if (title !== undefined) blog.title = title.trim();
    if (status !== undefined) blog.status = status;
    if (displayOrder !== undefined) blog.displayOrder = Number(displayOrder);
    if (tag !== undefined) blog.tag = tag;
    if (category !== undefined) blog.category = category;
    if (author !== undefined) blog.author = author;
    if (date !== undefined) blog.date = date;
    if (readTime !== undefined) blog.readTime = readTime;
    if (shortDescription !== undefined) blog.shortDescription = shortDescription.trim();
    if (longDescription !== undefined) blog.longDescription = longDescription.trim();
    if (relatedLink !== undefined) blog.relatedLink = relatedLink;

    if (req.file) {
      blog.coverImage = `/Uploads/${req.file.filename}`;
    } else if (coverImageUrl && coverImageUrl.trim()) {
      blog.coverImage = coverImageUrl.trim();
    } else if (req.body.coverImage && typeof req.body.coverImage === "string") {
      blog.coverImage = req.body.coverImage;
    }

    if (highlights !== undefined) {
      if (Array.isArray(highlights)) {
        blog.highlights = highlights;
      } else if (typeof highlights === "string") {
        try {
          blog.highlights = JSON.parse(highlights);
        } catch {
          blog.highlights = highlights
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
    }

    await blog.save();
    res.json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Error updating blog", details: error.message });
  }
});

// @DELETE /api/blogs/:id - Delete Blog
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
