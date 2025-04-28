const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true }, // "$id"
  campaignId: { type: String, required: true }, // "$campaign_id"
  phone: { type: String, required: true },
  entryDate: { type: Date, required: true },
  anrede: { type: String },
  vorname: { type: String },
  name: { type: String },
  strasse: { type: String },
  plz: { type: String, required: true },
  ort: { type: String },
  ai_immo_status: { type: String },
  companyData: {
    firma: { type: String },
    steuernummer: { type: String },
    // Add other invoicing fields as needed
  },
  state: {
    type: String,
    enum: ['initial', 'pdf_pending', 'pdf_generated', 'assigned', 'completed', 'error_pdf', 'unassigned'],
    default: 'initial',
  },
  testData: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
