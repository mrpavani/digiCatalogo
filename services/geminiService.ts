
import { GoogleGenAI } from '@google/genai';

export async function generateDescription(productName: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Gere uma descrição de produto curta (2-3 frases), profissional e atraente para um catálogo de produtos digitais. O produto é: "${productName}". A descrição deve focar nos benefícios para o usuário.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "Não foi possível gerar a descrição. Por favor, tente novamente ou escreva manualmente.";
  }
}
