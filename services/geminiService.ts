
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be caught by the App component and displayed to the user.
  throw new Error("API_KEY environment variable is not set. This application requires a valid API key to function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Helper to extract base64 data and mimeType from a data URL
const parseDataUrl = (dataUrl: string): { mimeType: string; data: string } | null => {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    return null;
  }
  return { mimeType: match[1], data: match[2] };
};

export const editImageWithPrompt = async (
  base64ImageDataUrl: string,
  prompt: string
): Promise<string> => {
  const imageParts = parseDataUrl(base64ImageDataUrl);

  if (!imageParts) {
    throw new Error("Invalid image data URL format.");
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: imageParts.data,
            mimeType: imageParts.mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates?.[0]?.content.parts ?? []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  // Check for safety ratings or other reasons for no content
  const generationBlocked = response.candidates?.[0]?.finishReason === 'SAFETY';
  if (generationBlocked) {
    throw new Error("Image generation was blocked due to safety policies. Please modify your prompt and try again.");
  }
  
  throw new Error("No image was generated in the response. The model may not have been able to fulfill the request.");
};
