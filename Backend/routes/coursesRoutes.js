import { Router } from "express";
import mongoose from "mongoose";
import Course from "../models/courses.js";
import { initialCourses } from "../seedData.js";

const router = Router();

// @route   GET /api/courses/seed
// @desc    Seed initial 22 courses into MongoDB
router.get("/seed", async (req, res) => {
  try {
    await Course.deleteMany({});
    const inserted = await Course.insertMany(initialCourses);
    return res.json({ message: `Successfully seeded all ${inserted.length} official courses!`, count: inserted.length, courses: inserted });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/courses
// @desc    Get all courses with programType filtering and order sorting (auto-seeds all 45 programs)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const totalCount = await Course.countDocuments();
    const hasAllOfferings = totalCount >= 45;

    if (!hasAllOfferings || req.query.reset === "true") {
      await Course.deleteMany({});
      await Course.insertMany(initialCourses);
    }

    const { programType, categoryId, search } = req.query;
    const query = {};

    if (programType && programType !== "all") {
      query.programType = programType;
    }
    if (categoryId && categoryId !== "all") {
      query.categoryId = categoryId;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { categoryName: { $regex: search, $options: "i" } },
      ];
    }

    // ⚡ Sort strictly by order ascending (1 is Top priority), then newest
    const courses = await Course.find(query).sort({ order: 1, createdAt: -1 });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PATCH /api/courses/:id/priority
// @desc    Instantly set course priority order (e.g. 1 for Top)
router.patch("/:id/priority", async (req, res) => {
  try {
    const { order } = req.body;
    const targetOrder = Number(order) || 1;
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      { order: targetOrder },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Course not found" });
    res.json({ success: true, message: `Priority set to #${targetOrder}`, course: updated });
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

// @route   POST /api/courses/bulk-action
// @desc    Bulk update status or delete multiple courses
// @access  Public
router.post("/bulk-action", async (req, res) => {
  try {
    const { action, ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No course IDs provided" });
    }

    if (action === "delete") {
      const result = await Course.deleteMany({ _id: { $in: ids } });
      return res.json({ message: `Successfully deleted ${result.deletedCount} courses`, count: result.deletedCount });
    }

    let statusToSet = "Published";
    if (action === "publish") statusToSet = "Published";
    else if (action === "unpublish") statusToSet = "Draft";
    else if (action === "archive") statusToSet = "Archived";
    else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const result = await Course.updateMany(
      { _id: { $in: ids } },
      { $set: { status: statusToSet, visible: statusToSet === "Published" } }
    );
    return res.json({ message: `Updated ${result.modifiedCount} courses to ${statusToSet}`, count: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
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
    let updatedCourse = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    }
    if (!updatedCourse) {
      updatedCourse = await Course.findOneAndUpdate(
        { $or: [{ id: req.params.id }, { name: req.body.name || req.body.title }, { title: req.body.title || req.body.name }] },
        req.body,
        { new: true }
      );
    }
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
