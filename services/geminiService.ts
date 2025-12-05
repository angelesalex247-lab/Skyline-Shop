import { GoogleGenAI, Chat } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize client only if key is present to avoid immediate crashes, 
// though the app structure ensures we check before calling.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const createShoppingAssistant = (): Chat | null => {
  if (!ai) return null;

  const productContext = MOCK_PRODUCTS.map(p => 
    `ID: ${p.id}, Name: ${p.title}, Price: $${p.price}, Category: ${p.category}, Description: ${p.description}`
  ).join('\n');

  const systemInstruction = `You are "Sky", a helpful and enthusiastic AI shopping assistant for Skyline Shop. 
  
  Here is our current product catalog:
  ${productContext}

  Rules:
  1. Only recommend products from this catalog.
  2. If a user asks for something we don't have, politely suggest a similar category if available, or state we don't carry it.
  3. Keep answers concise (under 80 words) unless detailed comparison is asked.
  4. Use emojis occasionally to be friendly.
  5. Format prices clearly (e.g., $199.99).
  
  Your goal is to help users find the perfect item and encourage them to add it to their cart.`;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });
};