const axios = require('axios');
const logger = require('../utils/logger');

const PDF_MICROSERVICE_URL = process.env.PDF_MICROSERVICE_URL;

exports.generatePDF = async (leadData) => {
  try {
    const response = await axios.post(PDF_MICROSERVICE_URL, leadData, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // PDF buffer
  } catch (error) {
    logger.error('PDF generation failed:', error);
    throw new Error('PDF generation failed');
  }
};
