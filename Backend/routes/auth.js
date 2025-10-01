// backend/routes/auth.js
import express from 'express'; // Import express
import User from "../models/User.js"; // Import User model
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const { sign } = jwt;  
dotenv.config();

const router = express.Router(); // Initialize the Express routerimport dotenv from "dotenv";

// Helper function to generate a JWT
const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user (password will be hashed by pre-save middleware)
    const user = await create({ email, password });

    // Respond with user details and a token
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
      message: 'Registration successful!',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists (and retrieve password as select: false is overridden by .select('+password'))
    const user = await findOne({ email }).select('+password'); // Explicitly select password for comparison
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Respond with user details and a token
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
      message: 'Login successful!',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;