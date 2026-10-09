import dns from "node:dns";
// Fix for MongoDB Atlas querySrv ECONNREFUSED on Windows / ISP DNS
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

import express from "express";
import webpack from "webpack";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
//following imports for authentication
import cookieParser from "cookie-parser";
import cors from "cors";
import process from 'process';
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js"; // import the router
import { signup, login, logout } from "./Controller/SignUpController.js";
import dotenv from "dotenv";
import addnewblog from "./routes/addnewblog.js";
import multer from "multer";
 import carouselRoutes from "./routes/carouselRoutes.js";
import aboutsectionRoutes from "./routes/aboutsectionRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import instituteRoutes from "./routes/instituteRoutes.js";
import newsRoutes from "./routes/news.js"
import testimonialRoutes from "./routes/testimonialRoutes.js" 
import subscribeRoutes from "./routes/subscribeRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js"; // path must be correct
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { MongoClient } from "mongodb";
 import Course from "./models/courses.js"; // <-- Make sure the path is correct
 import { initialCourses } from "./seedData.js";
 // Define __filename and __dirname in ES module
 import footerRoutes from './routes/footerRoutes.js';
 import Footer from './models/Footer.js';
import inquiryRoutes from "./routes/InquiryRoutes.js";
import siteSettingsRoutes from "./routes/siteSettingsRoutes.js";
import Admin from "./models/AdminLogin.js"; // <-- important!3
import bcrypt from "bcryptjs"; // <-- important!3
import AdminLogin from "./routes/AdminLogin.js"; // <-- important!3
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
// Define port from .env 
const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGODB_URI || process.env.MONGO_URI;
//middleware express instantiated
const app = express();
//middleware to ftech data
app.use(express.urlencoded({ extended: true })); // optional for form data 
/*Routes for SignUp
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", logout);*/

app.use(express.json());
 
app.use("/Uploads", express.static("Uploads"));
// Courses Routes
app.use("/api/courses", coursesRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/site-settings", siteSettingsRoutes);
 


app.use("/api/subscribers", subscribeRoutes);//subscribe us
//footer routes 
app.use('/api/footer', footerRoutes);

//connection with frontend ======CORS======
app.use(cookieParser());

const configuredOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

const allowedOriginsList = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOriginsList.includes(origin) ||
      origin.endsWith(".vercel.app") ||
      origin.includes("aayushinstitute") ||
      process.env.NODE_ENV !== "production"
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true
}));

app.use(express.json());

 

 
app.use("/api/blogs", addnewblog);
// route

//Mount newsupdates routes

app.use("/api/news", newsRoutes);
// Use testimonial routes
app.use("/api/testimonials", testimonialRoutes);
// 2. Use Routes
app.use("/api/carousel", carouselRoutes);
// use Routes for about section
app.use("/api/about", aboutsectionRoutes);
/* serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/
// Serve static images in Uploads folder
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

/*app.post("/api/blogs", upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "sliderImage", maxCount: 1 }
]), async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      status: req.body.status,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      coverImage: req.files.coverImage[0].path, // Cloudinary URL
      sliderImage: req.files.sliderImage[0].path // Cloudinary URL
    });

    await blog.save();
    res.json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Error creating blog" });
  }
});*/

// Example test route

 // Routes
app.use("/api/institute", instituteRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("CORS is working fine!");
});

app.use(cookieParser()); //extract token cereated in cookies while creaating a blog by Blog.create(blogData) 

//Mongo DB Connection
mongoose.connect(MONGO_URL)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    try {
      const courseCount = await Course.countDocuments();
      if (courseCount === 0) {
        console.log("🌱 Database has 0 courses. Auto-seeding initial Aayush Institute courses...");
        const inserted = await Course.insertMany(initialCourses);
        console.log(`✅ Auto-seeded ${inserted.length} courses into MongoDB successfully!`);
      } else {
        console.log(`ℹ️ MongoDB already has ${courseCount} courses.`);
      }
    } catch (seedErr) {
      console.error("⚠️ Auto-seeding courses note:", seedErr.message);
    }
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    // Keep server running even if DB is reconnecting
  });

 
/*const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const email = "admin@example.com";
    const password = "password123";

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("⚠️ Admin already exists:", email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashed });
    await newAdmin.save();

    console.log("✅ Admin created:", email, "Password:", password);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin(); */



// inquiry & student admission Routes
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/user/admin/admission", inquiryRoutes);
app.use("/api/auth", AdminLogin); // all /signup, /login, /logout routes go here



  //Cloudinary connection
  cloudinary.config({ 
   CLOUD_NAME: process.env.CLOUD_NAME, 
    CLOUD_API_KEY: process.env.CLOUD_API_KEY, 
  CLOUD_SECRET_KEY: process.env.CLOUD_SECRET_KEY 
});

console.log("Connected to cloudinary");





app.use("/", instituteRoutes);
// institute routes
// Array of all 9 courses






app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

