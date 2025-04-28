const { Configuration, OpenAIApi } = require('openai');
const logger = require('../utils/logger');

class OpenAIService {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateNote(prompt, context = '') {
    try {
      const completion = await this.openai.createChatCompletion({
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

      return completion.data.choices[0].message.content;
    } catch (error) {
      logger.error('Error generating note with OpenAI:', error);
      throw new Error('Failed to generate note using AI');
    }
  }

  async improveNote(existingNote) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that improves and expands real estate notes with more details and professional language."
          },
          {
            role: "user",
            content: `Please improve and expand the following note with more professional language and details:\n\n${existingNote}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.data.choices[0].message.content;
    } catch (error) {
      logger.error('Error improving note with OpenAI:', error);
      throw new Error('Failed to improve note using AI');
    }
  }

  async summarizeVoiceNote(transcription) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes and structures voice transcriptions into clear, professional real estate notes."
          },
          {
            role: "user",
            content: `Please summarize and structure the following voice transcription into a clear, professional note:\n\n${transcription}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.data.choices[0].message.content;
    } catch (error) {
      logger.error('Error summarizing voice note with OpenAI:', error);
      throw new Error('Failed to summarize voice note using AI');
    }
  }
}

module.exports = new OpenAIService();
