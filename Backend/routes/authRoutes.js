// routes/authRoutes.js
import express from "express";
import { signup, login, logout } from "../Controller/SignUpController.js";

const router = express.Router();

// Define routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
