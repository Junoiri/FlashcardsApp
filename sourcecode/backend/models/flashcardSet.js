const mongoose = require("mongoose");

/**
 * @module FlashcardSetModel
 * @description Mongoose model for storing flashcard sets.
 */

/**
 * Flashcard Set Schema
 * @typedef {Object} FlashcardSet
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user who owns the flashcard set.
 * @property {string} title - The title of the flashcard set.
 * @property {string} [description] - A brief description of the flashcard set (optional).
 * @property {Date} createdAt - Timestamp indicating when the flashcard set was created (default: current date/time).
 * @property {Date} updatedAt - Timestamp indicating the last update of the flashcard set (default: current date/time).
 */
const flashcardSetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FlashcardSet", flashcardSetSchema);
