import OpenAI from "openai";
import { generateIdeasPrompt, generateIdeaRefinePrompt } from "./prompts.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function HandleGenerateIdeaList(categories) {
  const prompt = generateIdeasPrompt(categories);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    // Parse JSON array from content expected to be a JSON string of ideas
    const ideas = JSON.parse(content);
    if (!Array.isArray(ideas)) {
      console.error("Parsed JSON is not an array:", ideas);
      return null;
    }
    return ideas;
  } catch (error) {
    console.error("OpenAI GPT-4-turbo API error:", error);
    return null;
  }
}

async function HandleRefineIdea(basic_idea) {
  const prompt = generateIdeaRefinePrompt(basic_idea);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    const ideas = JSON.parse(content);
    if (!Array.isArray(ideas)) {
      console.error("Parsed JSON is not an array:", ideas);
      return null;
    }
    return ideas;
  } catch (error) {
    console.error("OpenAI GPT-4-turbo API error:", error);
    return null;
  }
}

export { HandleGenerateIdeaList, HandleRefineIdea };
