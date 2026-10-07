const { GoogleGenerativeAI } = require('@google/generative-ai');

const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    // Initialize the client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model:"gemini-3.5-flash-lite"});
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Invalid Gemini response');
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw error;
  }
};

module.exports = {
  callGemini,
};