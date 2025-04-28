const mongoose = require('mongoose');

const MaklerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  companyData: {
    firma: { type: String },
    steuernummer: { type: String },
    // Add other invoicing fields as needed
  },
  allowedPlz: [{ type: String }],
  subscriptionStatus: {
    type: String,
    enum: ['trial', 'active', 'expired', 'pending_payment'],
    default: 'trial',
  },
  testAbo: { type: Boolean, default: true },
  trialEndDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Makler', MaklerSchema);
