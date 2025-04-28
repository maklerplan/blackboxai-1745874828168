const logger = require('../utils/logger');

class SIPService {
  constructor() {
    this.sipConfig = {
      server: process.env.SIP_SERVER,
      port: process.env.SIP_PORT || 5060,
      username: process.env.SIP_USERNAME,
      password: process.env.SIP_PASSWORD,
      realm: process.env.SIP_REALM,
      wsServers: process.env.SIP_WS_SERVERS
    };
  }

  getConfig() {
    return {
      uri: `sip:${this.sipConfig.username}@${this.sipConfig.realm}`,
      password: this.sipConfig.password,
      wsServers: this.sipConfig.wsServers,
      register: true,
      registerExpires: 300,
      sessionDescriptionHandlerFactoryOptions: {
        constraints: {
          audio: true,
          video: false
        }
      }
    };
  }

  async logCall(callData) {
    try {
      // Here you would typically save call data to your database
      // For now, we'll just log it
      logger.info('Call logged:', {
        from: callData.from,
        to: callData.to,
        duration: callData.duration,
        timestamp: callData.timestamp,
        status: callData.status
      });

      return {
        success: true,
        message: 'Call logged successfully'
      };
    } catch (error) {
      logger.error('Error logging call:', error);
      throw new Error('Failed to log call');
    }
  }

  validateSIPConfig() {
    const requiredFields = ['server', 'username', 'password', 'realm', 'wsServers'];
    const missingFields = requiredFields.filter(field => !this.sipConfig[field]);

    if (missingFields.length > 0) {
      const error = new Error(`Missing required SIP configuration: ${missingFields.join(', ')}`);
      logger.error('SIP configuration validation failed:', error);
      throw error;
    }

    return true;
  }

  getWebSocketUrl() {
    if (!this.sipConfig.wsServers) {
      throw new Error('WebSocket servers not configured for SIP');
    }
    return this.sipConfig.wsServers;
  }

  formatSIPUri(phoneNumber) {
    // Remove any non-digit characters and ensure proper SIP URI format
    const cleaned = phoneNumber.replace(/\D/g, '');
    return `sip:${cleaned}@${this.sipConfig.realm}`;
  }
}

module.exports = new SIPService();
