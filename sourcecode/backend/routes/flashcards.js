const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');
const authorize = require('../auth/authorize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Flashcard:
 *       type: object
 *       required:
 *         - setId
 *         - term
 *         - definition
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the flashcard
 *         setId:
 *           type: string
 *           description: The ID of the flashcard set the flashcard belongs to
 *         term:
 *           type: string
 *           description: The term or question for the flashcard
 *         definition:
 *           type: string
 *           description: The answer or explanation for the flashcard
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the flashcard was created
 *       example:
 *         id: "63b9d3f1c9d7b45a6c5c234d"
 *         setId: "63b8e123c9d7b45a6c5c6789"
 *         term: "What is photosynthesis?"
 *         definition: "The process by which green plants convert sunlight into energy."
 *         createdAt: "2023-01-01T10:00:00Z"
 */

/**
 * @swagger
 * /flashcards:
 *   get:
 *     summary: Get all flashcards
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all flashcards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 *       500:
 *         description: Server error
 */
router.get('/', authorize(), flashcardController.getAllFlashcards);

/**
 * @swagger
 * /flashcards/set/{setId}:
 *   get:
 *     summary: Get flashcards by set ID
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: setId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the flashcard set
 *     responses:
 *       200:
 *         description: List of flashcards in the specified set
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: No flashcards found for the given set ID
 *       500:
 *         description: Server error
 */
router.get('/set/:setId', authorize(), flashcardController.getFlashcardsBySetId);

/**
 * @swagger
 * /flashcards/{id}:
 *   get:
 *     summary: Get a flashcard by ID
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the flashcard
 *     responses:
 *       200:
 *         description: Details of the requested flashcard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Flashcard not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authorize(), flashcardController.getFlashcardById);

/**
 * @swagger
 * /flashcards:
 *   post:
 *     summary: Create a new flashcard
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - setId
 *               - term
 *               - definition
 *             properties:
 *               setId:
 *                 type: string
 *                 description: The ID of the flashcard set
 *               term:
 *                 type: string
 *                 description: The term or question for the flashcard
 *               definition:
 *                 type: string
 *                 description: The answer or explanation for the flashcard
 *             example:
 *               setId: "63b8e123c9d7b45a6c5c6789"
 *               term: "What is photosynthesis?"
 *               definition: "The process by which green plants convert sunlight into energy."
 *     responses:
 *       201:
 *         description: Flashcard created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       400:
 *         description: Bad request
 */
router.post('/', authorize(), flashcardController.createFlashcard);

/**
 * @swagger
 * /flashcards/{id}:
 *   patch:
 *     summary: Update a flashcard by ID
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the flashcard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               term:
 *                 type: string
 *                 description: Updated term or question for the flashcard
 *               definition:
 *                 type: string
 *                 description: Updated answer or explanation for the flashcard
 *             example:
 *               term: "Updated term"
 *               definition: "Updated definition"
 *     responses:
 *       200:
 *         description: Flashcard updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       403:
 *         description: Access denied
 *       404:
 *         description: Flashcard not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', authorize(), flashcardController.updateFlashcard);

/**
 * @swagger
 * /flashcards/{id}:
 *   delete:
 *     summary: Delete a flashcard by ID
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the flashcard
 *     responses:
 *       200:
 *         description: Flashcard deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Flashcard not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authorize(), flashcardController.deleteFlashcard);

module.exports = router;
