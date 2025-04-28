const Lead = require('../models/Lead');
const Attachment = require('../models/Attachment');
const pdfService = require('../services/pdfService');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

exports.importLead = async (req, res, next) => {
  try {
    const data = req.body;

    // Basic validation of required fields
    if (!data['$id'] || !data['$campaign_id'] || !data['$phone'] || !data['$entry_date'] || !data['PLZ']) {
      return res.status(400).json({ error: 'Missing required lead fields' });
    }

    // Prepare lead data
    const leadData = {
      externalId: data['$id'],
      campaignId: data['$campaign_id'],
      phone: data['$phone'],
      entryDate: new Date(data['$entry_date']),
      anrede: data['ANREDE'] || '',
      vorname: data['VORNAME'] || '',
      name: data['NAME'] || '',
      strasse: data['STRASSE'] || '',
      plz: data['PLZ'],
      ort: data['ORT'] || '',
      ai_immo_status: data['ai_immo_status'] || '',
      companyData: {
        firma: data['Firma'] || '',
        steuernummer: data['Steuernummer'] || '',
      },
      state: 'initial',
      testData: true,
    };

    // Check if lead already exists
    let lead = await Lead.findOne({ externalId: leadData.externalId });
    if (lead) {
      return res.status(409).json({ error: 'Lead already exists' });
    }

    // Save lead
    lead = new Lead(leadData);
    await lead.save();

    // Call PDF generation microservice
    const pdfBuffer = await pdfService.generatePDF(leadData);

    // Save PDF to filesystem
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    const fileName = `lead_${lead._id}.pdf`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    // Save attachment record
    const attachment = new Attachment({
      leadId: lead._id,
      fileName,
      filePath,
    });
    await attachment.save();

    // Update lead state
    lead.state = 'pdf_generated';
    await lead.save();

    res.status(201).json({ message: 'Lead imported and PDF generated successfully' });
  } catch (error) {
    logger.error('Error importing lead:', error);
    next(error);
  }
};
