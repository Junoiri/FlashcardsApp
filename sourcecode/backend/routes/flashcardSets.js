const express = require('express');
const router = express.Router();
const flashcardSetController = require('../controllers/flashcardSetController');
const authorize = require('../auth/authorize');

/**
 * @swagger
 * components:
 *   schemas:
 *     FlashcardSet:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the flashcard set
 *         userId:
 *           type: string
 *           description: ID of the user who owns the flashcard set
 *         title:
 *           type: string
 *           description: Title of the flashcard set
 *         description:
 *           type: string
 *           description: Description of the flashcard set
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last updated date
 *       example:
 *         id: "63b9d3f1c9d7b45a6c5c234d"
 *         userId: "63b8e123c9d7b45a6c5c6789"
 *         title: "Biology Basics"
 *         description: "A set of flashcards covering the basics of biology"
 *         createdAt: "2023-01-01T10:00:00Z"
 *         updatedAt: "2023-01-02T12:00:00Z"
 */

/**
 * @swagger
 * /flashcardSets:
 *   get:
 *     summary: Get all flashcard sets
 *     tags: [FlashcardSets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all flashcard sets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FlashcardSet'
 *       500:
 *         description: Server error
 */
router.get('/', authorize(), flashcardSetController.getAllFlashcardSets);

/**
 * @swagger
 * /flashcardSets/{id}:
 *   get:
 *     summary: Get a flashcard set by ID
 *     tags: [FlashcardSets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the flashcard set
 *     responses:
 *       200:
 *         description: Flashcard set details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlashcardSet'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Flashcard set not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authorize(), flashcardSetController.getFlashcardSetById);

/**
 * @swagger
 * /flashcardSets:
 *   post:
 *     summary: Create a new flashcard set
 *     tags: [FlashcardSets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - title
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the flashcard set owner
 *               title:
 *                 type: string
 *                 description: Title of the flashcard set
 *               description:
 *                 type: string
 *                 description: Optional description of the flashcard set
 *             example:
 *               username: "johndoe"
 *               title: "Physics 101"
 *               description: "A beginner's guide to physics"
 *     responses:
 *       201:
 *         description: Flashcard set created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlashcardSet'
 *       400:
 *         description: Bad request
 */
router.post('/', authorize(), flashcardSetController.createFlashcardSet);

/**
 * @swagger
 * /flashcardSets/{id}:
 *   patch:
 *     summary: Update a flashcard set by ID
 *     tags: [FlashcardSets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the flashcard set
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the flashcard set
 *               description:
 *                 type: string
 *                 description: Updated description of the flashcard set
 *             example:
 *               title: "Updated Physics 101"
 *               description: "An updated guide to physics"
 *     responses:
 *       200:
 *         description: Flashcard set updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlashcardSet'
 *       400:
 *         description: Invalid ID format or bad request
 *       403:
 *         description: Access denied
 *       404:
 *         description: Flashcard set not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', authorize(), flashcardSetController.updateFlashcardSet);

/**
 * @swagger
 * /flashcardSets/{id}:
 *   delete:
 *     summary: Delete a flashcard set by ID
 *     tags: [FlashcardSets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the flashcard set
 *     responses:
 *       200:
 *         description: Flashcard set deleted successfully
 *       400:
 *         description: Invalid ID format
 *       403:
 *         description: Access denied
 *       404:
 *         description: Flashcard set not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authorize(), flashcardSetController.deleteFlashcardSet);

module.exports = router;
