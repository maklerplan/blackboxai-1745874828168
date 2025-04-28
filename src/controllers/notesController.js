const Note = require('../models/Note');
const openaiService = require('../services/openaiService');
const logger = require('../utils/logger');

exports.createNote = async (req, res, next) => {
  try {
    const { text, leadId, maklerId, source } = req.body;
    
    const note = new Note({
      text,
      leadId,
      maklerId,
      source: source || 'manual'
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    logger.error('Error creating note:', error);
    next(error);
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    const { leadId, maklerId, source } = req.query;
    const query = {};

    if (leadId) query.leadId = leadId;
    if (maklerId) query.maklerId = maklerId;
    if (source) query.source = source;

    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .populate('leadId', 'vorname name')
      .populate('maklerId', 'fullName');

    res.json(notes);
  } catch (error) {
    logger.error('Error fetching notes:', error);
    next(error);
  }
};

exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('leadId', 'vorname name')
      .populate('maklerId', 'fullName');

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    logger.error('Error fetching note by ID:', error);
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { text, leadId, maklerId } = req.body;
    
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { text, leadId, maklerId },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    logger.error('Error updating note:', error);
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    logger.error('Error deleting note:', error);
    next(error);
  }
};

exports.generateNoteWithAI = async (req, res, next) => {
  try {
    const { prompt, context, leadId, maklerId } = req.body;

    const generatedText = await openaiService.generateNote(prompt, context);

    const note = new Note({
      text: generatedText,
      leadId,
      maklerId,
      source: 'ai',
      aiGenerated: true
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    logger.error('Error generating note with AI:', error);
    next(error);
  }
};

exports.processVoiceNote = async (req, res, next) => {
  try {
    const { audioUrl, transcription, leadId, maklerId } = req.body;

    // Use OpenAI to summarize and structure the transcription
    const summarizedText = await openaiService.summarizeVoiceNote(transcription);

    const note = new Note({
      text: summarizedText,
      leadId,
      maklerId,
      source: 'voice',
      audioUrl,
      metadata: {
        originalTranscription: transcription
      }
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    logger.error('Error processing voice note:', error);
    next(error);
  }
};

exports.improveNoteWithAI = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const improvedText = await openaiService.improveNote(note.text);

    note.text = improvedText;
    note.aiGenerated = true;
    await note.save();

    res.json(note);
  } catch (error) {
    logger.error('Error improving note with AI:', error);
    next(error);
  }
};
