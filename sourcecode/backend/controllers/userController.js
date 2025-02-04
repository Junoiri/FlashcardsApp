const User = require("../models/user");

/**
 * @module UserController
 * @description Handles CRUD operations for user management.
 */

/**
 * Retrieves all users from the database.
 * @async
 * @function getAllUsers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with a list of all users or an error message.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Retrieves a user by their ID.
 * @async
 * @function getUserById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the user object or an error message.
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Creates a new user.
 * @async
 * @function createUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the newly created user object or an error message.
 */
const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Updates an existing user by their ID.
 * @async
 * @function updateUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the updated user object or an error message.
 */
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.username != null) user.username = req.body.username;
    if (req.body.email != null) user.email = req.body.email;
    if (req.body.passwordHash != null)
      user.passwordHash = req.body.passwordHash;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Deletes a user by their ID.
 * @async
 * @function deleteUser
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the user to delete.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response confirming deletion or an error message.
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
