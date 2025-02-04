const FlashcardSet = require("../models/flashcardSet");
const User = require("../models/user");
const mongoose = require("mongoose");

/**
 * @module FlashcardSetController
 * @description Handles CRUD operations for flashcard sets.
 */

/**
 * Retrieves all flashcard sets from the database.
 * @async
 * @function getAllFlashcardSets
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with all flashcard sets or an error message.
 */
const getAllFlashcardSets = async (req, res) => {
  try {
    const flashcardSets = await FlashcardSet.find();
    res.json(flashcardSets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Retrieves a specific flashcard set by ID.
 * @async
 * @function getFlashcardSetById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the flashcard set or an error message.
 */
const getFlashcardSetById = async (req, res) => {
  try {
    const flashcardSetId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(flashcardSetId)) {
      return res
        .status(400)
        .json({ message: "Invalid Flashcard Set ID format" });
    }

    const flashcardSet = await FlashcardSet.findById(flashcardSetId);

    if (!flashcardSet) {
      return res.status(404).json({ message: "Flashcard set not found" });
    }

    res.json(flashcardSet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Creates a new flashcard set.
 * @async
 * @function createFlashcardSet
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing flashcard set data.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the created flashcard set or an error message.
 */
const createFlashcardSet = async (req, res) => {
  try {
    const { username, title, description } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: `User "${username}" not found` });
    }

    const newFlashcardSet = new FlashcardSet({
      userId: user._id,
      title: title,
      description: description,
    });

    const savedSet = await newFlashcardSet.save();
    return res.status(201).json(savedSet);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/**
 * Updates an existing flashcard set.
 * @async
 * @function updateFlashcardSet
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the flashcard set to update.
 * @param {Object} req.body - The request body containing updated data.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the updated flashcard set or an error message.
 */
const updateFlashcardSet = async (req, res) => {
  try {
    const flashcardSetId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(flashcardSetId)) {
      return res
        .status(400)
        .json({ message: "Invalid Flashcard Set ID format" });
    }

    const flashcardSet = await FlashcardSet.findById(flashcardSetId);
    if (!flashcardSet) {
      return res.status(404).json({ message: "Flashcard set not found" });
    }

    if (flashcardSet.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "Access denied: You can only update your own flashcard sets",
        });
    }

    if (req.body.title != null) {
      flashcardSet.title = req.body.title;
    }
    if (req.body.description != null) {
      flashcardSet.description = req.body.description;
    }

    const updatedFlashcardSet = await flashcardSet.save();
    res.json(updatedFlashcardSet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Deletes a flashcard set.
 * @async
 * @function deleteFlashcardSet
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the flashcard set to delete.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response confirming deletion or an error message.
 */
const deleteFlashcardSet = async (req, res) => {
  try {
    const flashcardSetId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(flashcardSetId)) {
      return res
        .status(400)
        .json({ message: "Invalid Flashcard Set ID format" });
    }

    const flashcardSet = await FlashcardSet.findById(flashcardSetId);
    if (!flashcardSet) {
      return res.status(404).json({ message: "Flashcard set not found" });
    }

    if (flashcardSet.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "Access denied: You can only delete your own flashcard sets",
        });
    }

    await flashcardSet.deleteOne();
    res.json({ message: "Flashcard set deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFlashcardSets,
  getFlashcardSetById,
  createFlashcardSet,
  updateFlashcardSet,
  deleteFlashcardSet,
};
