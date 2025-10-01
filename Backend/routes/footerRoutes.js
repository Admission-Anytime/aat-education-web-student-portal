
import express from "express";
import Footer from "../models/Footer.js";  // adjust path if needed

const router = express.Router();

/**
 * @desc Get footer data
 * @route GET /api/footer
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const footer = await Footer.findOne(); // only one footer doc
    res.json(footer || {});
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

/**
 * @desc Create footer (first time only)
 * @route POST /api/footer
 * @access Admin
 */
router.post("/", async (req, res) => {
  try {
    const footer = new Footer(req.body);
    await footer.save();
    res.status(201).json(footer);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
});

/**
 * @desc Update footer (replace content)
 * @route PUT /api/footer/:id
 * @access Admin
 */
router.put("/:id", async (req, res) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!footer) return res.status(404).json({ message: "Footer not found" });
    res.json(footer);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
});

/**
 * @desc Delete footer
 * @route DELETE /api/footer/:id
 * @access Admin
 */
router.delete("/:id", async (req, res) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) return res.status(404).json({ message: "Footer not found" });
    res.json({ message: "Footer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;

