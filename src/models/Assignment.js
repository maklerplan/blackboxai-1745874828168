const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  maklerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Makler', required: true },
  assignmentDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['sent', 'pending', 'failed', 'completed'],
    default: 'pending',
  },
  historyLog: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
