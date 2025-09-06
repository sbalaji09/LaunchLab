const { execSync } = require('child_process');
const { generateIdeasPrompt, generateIdeaRefinePrompt } = require('./prompts.js');

function HandleGenerateIdeaList(categories) {
  const prompt = generateIdeasPrompt(categories);

  try {
    // Escape double quotes in the prompt to safely include in shell command
    const safePrompt = prompt.replace(/"/g, '\\"');
    const command = `ollama run mistral "${safePrompt}"`;

    // Run the command synchronously and get output as string
    const output = execSync(command, { encoding: "utf8" });

    console.log("Raw LLM output:", output);

    // Try to extract JSON array from output text using regex
    const jsonMatch = output.match(/\[.*\]/s);
    const jsonString = jsonMatch ? jsonMatch[0] : output;

    // Validate extracted string is parsable JSON
    try {
      const ideas = JSON.parse(jsonString);
      if (!Array.isArray(ideas)) {
        console.error("Parsed JSON is not an array:", ideas);
        return null;
      }
      // Success: return parsed ideas array
      return ideas;
    } catch (parseError) {
      console.error("Failed to parse JSON string:", parseError);
      // Optionally log or process the faulty jsonString further here
      return null;
    }
  } catch (error) {
    console.error("Error running Mistral via Ollama:", error);
    return null;
  }
}

function HandleRefineIdea(basic_idea) {
  const prompt = generateIdeaRefinePrompt(basic_idea);
  try {
    // Escape double quotes in the prompt to safely include in shell command
    const safePrompt = prompt.replace(/"/g, '\\"');
    const command = `ollama run mistral "${safePrompt}"`;

    // Run the command synchronously and get output as string
    const output = execSync(command, { encoding: "utf8" });

    console.log("Raw LLM output:", output);

    // Try to extract JSON array from output text using regex
    const jsonMatch = output.match(/\[.*\]/s);
    const jsonString = jsonMatch ? jsonMatch[0] : output;

    // Validate extracted string is parsable JSON
    try {
      const ideas = JSON.parse(jsonString);
      if (!Array.isArray(ideas)) {
        console.error("Parsed JSON is not an array:", ideas);
        return null;
      }
      // Success: return parsed ideas array
      return ideas;
    } catch (parseError) {
      console.error("Failed to parse JSON string:", parseError);
      // Optionally log or process the faulty jsonString further here
      return null;
    }
  } catch (error) {
    console.error("Error running Mistral via Ollama:", error);
    return null;
  }
}

module.exports = { HandleGenerateIdeaList, HandleRefineIdea };