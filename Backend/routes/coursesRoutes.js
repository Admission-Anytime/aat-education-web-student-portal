import { Router } from "express";
import Course from "../models/courses.js";

const router = Router();

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Public
router.post("/", async (req, res) => {
  const {
    type,
    rating,
    title,
    description,
    duration,
    fees,
    career,
    universities,
    topics,
    prerequisites,
    structure,
  } = req.body;

  const newCourse = new Course({
    type,
    rating,
    title,
    description,
    duration,
    fees,
    career,
    universities,
    topics,
    prerequisites,
    structure,
  });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { visible } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { visible },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: "Could not update visibility" });
  }
});
export default router;
