
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildMysteryPrompt } from '../prompts/mysteryPrompt.js';

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function generateMystery(input) {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error(
      'Mystery generation is not configured. Add GEMINI_API_KEY to server/.env.'
    );
    error.status = 503;
    throw error;
  }

  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.8,
    },
  });

  const maxAttempts = 3;
  let response;

  // Retry if Gemini is temporarily unavailable
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Gemini generation attempt ${attempt}/${maxAttempts}`);

      response = await model.generateContent(
        buildMysteryPrompt(input)
      );

      break;
    } catch (error) {
      const status = error.status;

      if (![429, 500, 502, 503, 504].includes(status)) {
        throw error;
      }

      if (attempt === maxAttempts) {
        const finalError = new Error(
          'Gemini is currently busy. Please wait a minute and try again.'
        );
        finalError.status = 503;
        throw finalError;
      }

      console.log('Gemini is temporarily unavailable. Retrying...');
      await delay(attempt * 3000);
    }
  }

  const text = response.response
    .text()
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '');

  try {
    return JSON.parse(text);
  } catch {
    const error = new Error(
      'The AI returned an incomplete case file. Please try again.'
    );
    error.status = 502;
    throw error;
  }
}
