const Flashcard = require("../models/flashcard");
const FlashcardSet = require("../models/flashcardSet");
const extractTextFromPDF = require("../services/pdfService");
const generateFlashcards = require("../services/openaiService");

/**
 * @module FlashcardController
 * @description Handles CRUD operations for flashcards and automatic flashcard generation from PDFs.
 */

/**
 * Retrieves all flashcards from the database.
 * @async
 * @function getAllFlashcards
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with all flashcards or an error message.
 */
const getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Retrieves all flashcards belonging to a specific set.
 * @async
 * @function getFlashcardsBySetId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with flashcards or an error message.
 */
const getFlashcardsBySetId = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ setId: req.params.setId });
    if (flashcards.length === 0)
      return res
        .status(404)
        .json({ message: "No flashcards found for this set" });
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Retrieves a single flashcard by ID.
 * @async
 * @function getFlashcardById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the flashcard or an error message.
 */
const getFlashcardById = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard)
      return res.status(404).json({ message: "Flashcard not found" });
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Creates a new flashcard.
 * @async
 * @function createFlashcard
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the newly created flashcard or an error message.
 */
const createFlashcard = async (req, res) => {
  const flashcard = new Flashcard({
    setId: req.body.setId,
    term: req.body.term,
    definition: req.body.definition,
  });

  try {
    const newFlashcard = await flashcard.save();
    res.status(201).json(newFlashcard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Updates an existing flashcard.
 * @async
 * @function updateFlashcard
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the updated flashcard or an error message.
 */
const updateFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    const flashcardSet = await FlashcardSet.findById(flashcard.setId);
    if (!flashcardSet || flashcardSet.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied: You can only edit flashcards in your own sets",
      });
    }

    if (req.body.term != null) flashcard.term = req.body.term;
    if (req.body.definition != null) flashcard.definition = req.body.definition;

    const updatedFlashcard = await flashcard.save();
    res.json(updatedFlashcard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Deletes a flashcard.
 * @async
 * @function deleteFlashcard
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response confirming deletion or an error message.
 */
const deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    const flashcardSet = await FlashcardSet.findById(flashcard.setId);
    if (!flashcardSet || flashcardSet.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message:
          "Access denied: You can only delete flashcards in your own sets",
      });
    }

    await flashcard.remove();
    res.json({ message: "Flashcard deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Creates flashcards from a PDF file by extracting text and using AI to generate terms and definitions.
 * @async
 * @function createFlashcardsFromPDF
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the generated flashcards or an error message.
 */
const createFlashcardsFromPDF = async (req, res) => {
  try {
    const { setId } = req.body;
    if (!setId) {
      return res.status(400).json({ error: "Missing setId parameter." });
    }

    const pdfPath = req.file.path;
    const extractedText = await extractTextFromPDF(pdfPath);
    const flashcards = await generateFlashcards(extractedText);

    const savedFlashcards = await Flashcard.insertMany(
      flashcards.map((flashcard) => ({
        setId,
        term: flashcard.term,
        definition: flashcard.definition,
        createdAt: new Date(),
      }))
    );

    res
      .status(201)
      .json({ message: "Flashcards created", flashcards: savedFlashcards });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllFlashcards,
  getFlashcardsBySetId,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  createFlashcardsFromPDF,
};
