const axios = require("axios");

const generateFlashcards = async (text) => {
  const apiKey = process.env.OPEN_AI;

  const prompt = `
  You are an assistant that creates short flashcards. From the text below, catch the most important concepts and:

  1. Write a "Question" about the main concept.
  2. Write a short "Explanation" (definition) which might include an example.

  Return the result as *valid JSON* containing:

  {
    "flashcardSet": {
      "title": "Extracted Flashcards",
      "description": "Generated from provided text",
      "createdAt": "${new Date().toISOString()}",
      "updatedAt": "${new Date().toISOString()}",
      "flashcards": [
        {
          "term": "string",
          "definition": "string",
          "createdAt": "${new Date().toISOString()}"
        }
      ]
    }
  }

  Text to transform:
  ${text}
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that creates educational flashcards.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    console.log("Raw response from OpenAI:", response.data);

    const content = response.data.choices[0].message.content;

    try {
      const flashcards = JSON.parse(content);
      return flashcards.flashcardSet.flashcards;
    } catch (jsonError) {
      console.error("Failed to parse JSON:", jsonError);
      throw new Error("Invalid JSON format received from OpenAI");
    }
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw new Error("Failed to generate flashcards");
  }
};

module.exports = generateFlashcards;
