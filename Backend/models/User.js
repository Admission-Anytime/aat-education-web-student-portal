// backend/models/User.js
import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs'; // Import bcrypt for password hashing

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'], // Custom error message
    unique: true, // Ensures email is unique
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email', // Regex for email validation
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6, // Minimum password length
    select: false, // Don't return password when querying users
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Middleware to hash the password before saving the user
UserSchema.pre('save', async function (next) {
  // Only hash if the password has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt and hash the password
  const salt = await genSalt(10); // 10 rounds of hashing
  this.password = await hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password in the database
UserSchema.methods.matchPasswords = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

// Export the model
export default model('User', UserSchema);