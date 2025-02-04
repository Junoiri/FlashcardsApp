const authService = require("../services/authService");

/**
 * @module AuthController
 * @description Handles user authentication and registration.
 */

/**
 * Registers a new user.
 * @async
 * @function register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success status and user data or an error message.
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await authService.register({
      username,
      email,
      password,
      role,
    });
    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Logs in a user and returns an authentication token.
 * @async
 * @function login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success status and JWT token or an error message.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
