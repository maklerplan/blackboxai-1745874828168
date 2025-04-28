const axios = require('axios');
const logger = require('../utils/logger');

class WhatsAppService {
  constructor() {
    this.apiKey = process.env.WHATSAPP_API_KEY;
    this.baseUrl = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v17.0';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  }

  async sendMessage(to, message, attachmentUrl = null) {
    try {
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: this.formatPhoneNumber(to),
        type: "text",
        text: {
          body: message
        }
      };

      if (attachmentUrl) {
        payload.type = "document";
        payload.document = {
          link: attachmentUrl
        };
      }

      const response = await axios.post(
        `${this.baseUrl}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info('WhatsApp message sent successfully:', {
        to,
        messageId: response.data.messages[0].id
      });

      return response.data;
    } catch (error) {
      logger.error('Error sending WhatsApp message:', error);
      throw new Error('Failed to send WhatsApp message');
    }
  }

  async sendTemplate(to, templateName, components = []) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: this.formatPhoneNumber(to),
          type: "template",
          template: {
            name: templateName,
            language: {
              code: "de"
            },
            components
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info('WhatsApp template message sent successfully:', {
        to,
        template: templateName,
        messageId: response.data.messages[0].id
      });

      return response.data;
    } catch (error) {
      logger.error('Error sending WhatsApp template:', error);
      throw new Error('Failed to send WhatsApp template');
    }
  }

  formatPhoneNumber(phone) {
    // Remove any non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Ensure number starts with country code
    if (!cleaned.startsWith('49')) {
      cleaned = '49' + cleaned;
    }
    
    return cleaned;
  }

  async sendLeadNotification(makler, lead, pdfUrl) {
    try {
      const message = `Neuer Lead verfügbar!\n\n` +
        `Name: ${lead.vorname} ${lead.name}\n` +
        `PLZ: ${lead.plz}\n` +
        `Ort: ${lead.ort}\n\n` +
        `Details finden Sie im angehängten PDF.`;

      return await this.sendMessage(makler.phone, message, pdfUrl);
    } catch (error) {
      logger.error('Error sending lead notification via WhatsApp:', error);
      throw new Error('Failed to send lead notification via WhatsApp');
    }
  }
}

module.exports = new WhatsAppService();
