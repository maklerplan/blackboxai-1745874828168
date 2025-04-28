const OpenAI = require('openai');
const logger = require('../utils/logger');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateNote(prompt, context = '') {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates detailed notes about real estate leads and properties."
          },
          {
            role: "user",
            content: `${context}\n\n${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error('Error generating note with OpenAI:', error);
      throw new Error('Failed to generate note using AI');
    }
  }
