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
import { MongoClient } from "mongodb";
 import Course from "./models/courses.js"; // <-- Make sure the path is correct
 // Define __filename and __dirname in ES module
 import footerRoutes from './routes/footerRoutes.js';
 import Footer from './models/Footer.js';
import inquiryRoutes from "./routes/InquiryRoutes.js";
import Admin from "./models/AdminLogin.js"; // <-- important!3
import bcrypt from "bcryptjs"; // <-- important!3
import AdminLogin from "./routes/AdminLogin.js"; // <-- important!3
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Define port from .env 
const port = process.env.PORT ;
dotenv.config();
const MONGO_URL = process.env.MONGO_URI
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
 


app.use("/api/subscribers", subscribeRoutes);//subscribe us
//footer routes 
app.use('/api/footer', footerRoutes);

//connection with frontend ======CORS======
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",   // frontend (Vite)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
//app.use("/uploads", express.static("/Uploads"));

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
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop the server if MongoDB connection fails
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



// inquiry Routes
app.use("/api/inquiry", inquiryRoutes);
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






app.listen(4001, () => {
  console.log(`Server is running on port ${port}`);
});

