const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  leadId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lead',
    required: false 
  },
  maklerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Makler',
    required: false 
  },
  source: { 
    type: String,
    enum: ['manual', 'ai', 'voice'],
    default: 'manual'
  },
  audioUrl: {
    type: String,
    required: false
  },
  aiGenerated: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: Map,
    of: String,
    default: {}
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Note', NoteSchema);
