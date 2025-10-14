import express from "express";
import TrainingProgram from "../models/CoorporateTraining.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const programs = await TrainingProgram.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching programs", error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const program = await TrainingProgram.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Error fetching program", error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const newProgram = new TrainingProgram(req.body);
    const savedProgram = await newProgram.save();
    res.status(201).json({ message: "Program created successfully", data: savedProgram });
  } catch (error) {
    res.status(400).json({ message: "Error creating program", error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedProgram = await TrainingProgram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, overwrite: true }
    );
    if (!updatedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json({ message: "Program replaced successfully", data: updatedProgram });
  } catch (error) {
    res.status(400).json({ message: "Error replacing program", error: error.message });
  }
});

/* PATCH — Update specific fields
 
router.patch("/:id", async (req, res) => {
  try {
    const patchedProgram = await TrainingProgram.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!patchedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json({ message: "Program updated successfully", data: patchedProgram });
  } catch (error) {
    res.status(400).json({ message: "Error updating program", error: error.message });
  }
});*/


router.delete("/:id", async (req, res) => {
  try {
    const deletedProgram = await TrainingProgram.findByIdAndDelete(req.params.id);
    if (!deletedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting program", error: error.message });
  }
});

export default router;
