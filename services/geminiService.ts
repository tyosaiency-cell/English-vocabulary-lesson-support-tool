import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AiLessonData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const lessonSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    matchingGame: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          definition: { type: Type.STRING },
        },
        required: ["word", "definition"],
      },
    },
    story: {
      type: Type.STRING,
      description: "A short story (150-200 words) containing all unknown words. Target words must be wrapped in <span class='highlight'>...</span> tags.",
    },
    clozeTest: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["question", "answer", "options"],
      },
    },
    advice: {
      type: Type.STRING,
      description: "Encouraging advice in Japanese for the student.",
    },
  },
  required: ["matchingGame", "story", "clozeTest", "advice"],
};

export const generateLessonContent = async (words: string[]): Promise<AiLessonData> => {
  const promptText = `
    You are a professional Junior High School English Teacher in Japan.
    Target Audience: Japanese Junior High School Students (CEFR A2 level).
    
    Task: Create learning materials based on the following unknown words: ${JSON.stringify(words)}.
    
    Requirements:
    1. **Matching Game**: Create pairs of (Word - Japanese Definition).
    2. **Story**: Write a short story (150-200 words) containing all unknown words.
       - **CRITICAL**: Wrap unknown words in <span class="highlight">targetWord</span>.
       - No full translation.
    3. **Cloze Test**: Create fill-in-the-blank questions based on the story sentences.
    4. **Advice**: Write a short, encouraging paragraph (in Japanese) giving specific tips on how to remember these words or usage advice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AiLessonData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};