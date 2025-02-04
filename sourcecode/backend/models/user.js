const mongoose = require("mongoose");

/**
 * @module UserModel
 * @description Mongoose model for storing user accounts.
 */

/**
 * User Schema
 * @typedef {Object} User
 * @property {string} username - The unique username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} passwordHash - The hashed password of the user for authentication.
 * @property {string} role - The role of the user (`user` or `admin`), default is `user`.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
