import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const aiService = {
  async getJobSuggestions(workerSkills: string[], jobDescriptions: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Worker Skills: ${workerSkills.join(', ')}\n\nJobs:\n${jobDescriptions.join('\n---\n')}`,
        config: {
          systemInstruction: "You are a job matching assistant for Wera Platform. Given a worker's skills and a list of job descriptions, suggest the top 3 matches with a brief reason for each."
        }
      });
      return response.text;
    } catch (error) {
      console.error('AI Matching Error:', error);
      return 'Unable to generate suggestions at this time.';
    }
  },

  async generateSoftSkillsQuestion(previousQuestions: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Previous questions asked: ${previousQuestions.join(' | ')}`,
        config: {
          systemInstruction: "You are a soft skills assessor for Wera Workers in Kenya. Generate a realistic, scenario-based question to assess a worker's soft skills (e.g., communication, conflict resolution, time management). The question should be culturally relevant to Kenya. Return ONLY the question text.",
          temperature: 0.8
        }
      });
      return response.text;
    } catch (error) {
      console.error('AI Question Generation Error:', error);
      return 'How would you handle a client who is unhappy with your work?';
    }
  },

  async evaluateSoftSkillsResponse(question: string, userResponse: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Question: ${question}\nWorker's Response: ${userResponse}`,
        config: {
          systemInstruction: "Evaluate the worker's response to the soft skills question. Provide a score from 0 to 100 and a brief feedback. Return the result in JSON format with keys 'score' (number) and 'feedback' (string).",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING }
            },
            required: ["score", "feedback"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error('AI Evaluation Error:', error);
      return { score: 50, feedback: "Unable to evaluate at this time. Please try again." };
    }
  }
};
