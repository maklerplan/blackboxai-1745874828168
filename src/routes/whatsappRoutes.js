const express = require('express');
const router = express.Router();
const whatsappService = require('../services/whatsappService');
const { authenticateJWT } = require('../middleware/authMiddleware');
const logger = require('../utils/logger');

// Protect all WhatsApp routes with authentication middleware
router.use(authenticateJWT);

// Send WhatsApp message
router.post('/send', async (req, res, next) => {
  try {
    const { phone, message, attachmentUrl } = req.body;
    const result = await whatsappService.sendMessage(phone, message, attachmentUrl);
    res.json(result);
  } catch (error) {
    logger.error('Error sending WhatsApp message:', error);
    next(error);
  }
});

// Send template message
router.post('/send-template', async (req, res, next) => {
  try {
    const { phone, templateName, components } = req.body;
    const result = await whatsappService.sendTemplate(phone, templateName, components);
    res.json(result);
  } catch (error) {
    logger.error('Error sending WhatsApp template:', error);
    next(error);
  }
});

// Send lead notification to Makler
router.post('/notify-makler', async (req, res, next) => {
  try {
    const { maklerId, leadId, pdfUrl } = req.body;
    
    // Get Makler and Lead details from database
    const Makler = require('../models/Makler');
    const Lead = require('../models/Lead');
    
    const [makler, lead] = await Promise.all([
      Makler.findById(maklerId),
      Lead.findById(leadId)
    ]);

    if (!makler || !lead) {
      return res.status(404).json({ error: 'Makler or Lead not found' });
    }

    const result = await whatsappService.sendLeadNotification(makler, lead, pdfUrl);
    res.json(result);
  } catch (error) {
    logger.error('Error sending WhatsApp lead notification:', error);
    next(error);
  }
});

// Get message history (mock endpoint - actual implementation would depend on WhatsApp Business API)
router.get('/history', async (req, res, next) => {
  try {
    // This is a mock response. In reality, you would fetch this from WhatsApp's API
    const mockHistory = [
      {
        id: '1',
        to: '491234567890',
        message: 'Test message 1',
        timestamp: new Date(),
        status: 'sent'
      },
      {
        id: '2',
        to: '491234567891',
        message: 'Test message 2',
        timestamp: new Date(Date.now() - 3600000),
        status: 'delivered',
        attachment: 'https://example.com/test.pdf'
      }
    ];

    res.json(mockHistory);
  } catch (error) {
    logger.error('Error fetching WhatsApp history:', error);
    next(error);
  }
});

module.exports = router;
