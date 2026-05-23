import { GoogleGenerativeAI } from "@google/generative-ai";

// Il est fortement recommandé d'utiliser une variable d'environnement pour la clé API
// VITE_GEMINI_API_KEY=votre_cle_ici
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateLessonPlan = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error("Clé API Gemini manquante. Veuillez configurer VITE_GEMINI_API_KEY.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erreur lors de la génération avec Gemini:", error);
    throw error;
  }
};
