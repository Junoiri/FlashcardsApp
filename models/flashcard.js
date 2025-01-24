const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  setId: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet', required: true }, 
  term: { type: String, required: true },
  definition: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
