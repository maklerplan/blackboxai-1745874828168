const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// Protect all notes routes with authentication middleware
router.use(authenticateJWT);

// Create a new note (text, voice, or AI-generated)
router.post('/', notesController.createNote);

// Get all notes with optional filters
router.get('/', notesController.getNotes);

// Get a specific note by ID
router.get('/:id', notesController.getNoteById);

// Update a note
router.put('/:id', notesController.updateNote);

// Delete a note
router.delete('/:id', notesController.deleteNote);

// Generate note using AI
router.post('/generate', notesController.generateNoteWithAI);

// Convert voice to text and generate note
router.post('/voice', notesController.processVoiceNote);

// Improve existing note using AI
router.post('/:id/improve', notesController.improveNoteWithAI);

module.exports = router;
