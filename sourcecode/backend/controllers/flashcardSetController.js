const FlashcardSet = require('../models/flashcardSet');
const User = require('../models/user')
const mongoose = require('mongoose');

const getAllFlashcardSets = async (req, res) => {
    try {
        const flashcardSets = await FlashcardSet.find();
        res.json(flashcardSets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getFlashcardSetById = async (req, res) => {
    try {
        const flashcardSetId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(flashcardSetId)) {
            return res.status(400).json({ message: 'Invalid Flashcard Set ID format' });
        }

        const flashcardSet = await FlashcardSet.findById(flashcardSetId);

        if (!flashcardSet) {
            return res.status(404).json({ message: 'Flashcard set not found' });
        }

        res.json(flashcardSet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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
        description: description
      });
  
      const savedSet = await newFlashcardSet.save();
      return res.status(201).json(savedSet);
  
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  const updateFlashcardSet = async (req, res) => {
    try {
        const flashcardSetId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(flashcardSetId)) {
            return res.status(400).json({ message: 'Invalid Flashcard Set ID format' });
        }

        const flashcardSet = await FlashcardSet.findById(flashcardSetId);
        if (!flashcardSet) {
            return res.status(404).json({ message: 'Flashcard set not found' });
        }

        if (flashcardSet.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied: You can only update your own flashcard sets' });
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

const deleteFlashcardSet = async (req, res) => {
    try {
        const flashcardSetId = req.params.id.trim(); 

        if (!mongoose.Types.ObjectId.isValid(flashcardSetId)) {
            return res.status(400).json({ message: 'Invalid Flashcard Set ID format' });
        }

        const flashcardSet = await FlashcardSet.findById(flashcardSetId);
        if (!flashcardSet) {
            return res.status(404).json({ message: 'Flashcard set not found' });
        }

        if (flashcardSet.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied: You can only delete your own flashcard sets' });
        }

        await flashcardSet.deleteOne();
        res.json({ message: 'Flashcard set deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    getAllFlashcardSets,
    getFlashcardSetById,
    createFlashcardSet,
    updateFlashcardSet,
    deleteFlashcardSet
};
