const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @module AuthService
 * @description Handles user authentication, including registration and login.
 */

/**
 * Registers a new user in the system.
 * 
 * @async
 * @function register
 * @param {Object} userData - User registration details.
 * @param {string} userData.username - The username of the new user.
 * @param {string} userData.email - The email of the new user.
 * @param {string} userData.password - The plaintext password of the new user.
 * @param {string} [userData.role="user"] - The role of the user (default: "user").
 * @returns {Object} The newly created user object.
 */
exports.register = async ({ username, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    username,
    email,
    passwordHash,
    role: role || "user",
  });

  return newUser;
};

/**
 * Authenticates a user by verifying credentials and generating a JWT token.
 * 
 * @async
 * @function login
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The plaintext password of the user.
 * @returns {string} A JWT token if authentication is successful.
 */
exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token valid for 1 hour
    }
  );

  return token;
};
