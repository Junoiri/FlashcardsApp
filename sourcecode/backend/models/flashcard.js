const mongoose = require("mongoose");

/**
 * @module FlashcardModel
 * @description Mongoose model for storing flashcards.
 */

/**
 * Flashcard Schema
 * @typedef {Object} Flashcard
 * @property {mongoose.Schema.Types.ObjectId} setId - The ID of the associated flashcard set.
 * @property {string} term - The term for the flashcard.
 * @property {string} definition - The definition of the term.
 * @property {Date} createdAt - Timestamp indicating when the flashcard was created (default: current date/time).
 */
const flashcardSchema = new mongoose.Schema({
  setId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlashcardSet",
    required: true,
  },
  term: { type: String, required: true },
  definition: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
