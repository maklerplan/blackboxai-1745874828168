const express = require('express');
const router = express.Router();
const sipService = require('../services/sipService');
const { authenticateJWT } = require('../middleware/authMiddleware');
const logger = require('../utils/logger');

// Protect all SIP routes with authentication middleware
router.use(authenticateJWT);

// Get SIP configuration
router.get('/config', (req, res, next) => {
  try {
    sipService.validateSIPConfig();
    const config = sipService.getConfig();
    res.json(config);
  } catch (error) {
    logger.error('Error getting SIP configuration:', error);
    next(error);
  }
});

// Log a call
router.post('/calls', async (req, res, next) => {
  try {
    const callData = req.body;
    const result = await sipService.logCall(callData);
    res.json(result);
  } catch (error) {
    logger.error('Error logging call:', error);
    next(error);
  }
});

// Get call history
router.get('/calls', async (req, res, next) => {
  try {
    // Mock call history - in a real implementation, this would fetch from a database
    const mockCalls = [
      {
        id: '1',
        direction: 'outbound',
        number: '+491234567890',
        timestamp: new Date(),
        duration: 120,
        status: 'completed'
      },
      {
        id: '2',
        direction: 'inbound',
        number: '+491234567891',
        timestamp: new Date(Date.now() - 3600000),
        duration: 0,
        status: 'missed'
      },
      {
        id: '3',
        direction: 'outbound',
        number: '+491234567892',
        timestamp: new Date(Date.now() - 7200000),
        duration: 45,
        status: 'completed'
      }
    ];

    res.json(mockCalls);
  } catch (error) {
    logger.error('Error fetching call history:', error);
    next(error);
  }
});

// Get WebSocket URL for SIP client
router.get('/ws-url', (req, res, next) => {
  try {
    const wsUrl = sipService.getWebSocketUrl();
    res.json({ wsUrl });
  } catch (error) {
    logger.error('Error getting WebSocket URL:', error);
    next(error);
  }
});

// Format phone number to SIP URI
router.post('/format-uri', (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const sipUri = sipService.formatSIPUri(phoneNumber);
    res.json({ sipUri });
  } catch (error) {
    logger.error('Error formatting SIP URI:', error);
    next(error);
  }
});

module.exports = router;
