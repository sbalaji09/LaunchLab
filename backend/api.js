const { execSync } = require('child_process');
const { generateIdeasPrompt } = require('./prompts.js');

function HandleGenerateIdeaList(categories) {
  const prompt = generateIdeasPrompt(categories);

  try {
    // Escape double quotes in the prompt to safely include in shell command
    const safePrompt = prompt.replace(/"/g, '\\"');
    const command = `ollama run mistral "${safePrompt}"`;

    // Run the command synchronously and get output as string
    const output = execSync(command, { encoding: "utf8" });

    // The output is expected to be a JSON array string of idea descriptions
    // Some LLMs add extra text or formatting, so cleanse it if necessary
    // Try to extract JSON array from output text using regex, fallback to direct parse
    const jsonMatch = output.match(/\[.*\]/s);
    const jsonString = jsonMatch ? jsonMatch[0] : output;

    const ideas = JSON.parse(jsonString);

    // Verify result is an array
    if (!Array.isArray(ideas)) {
      console.error("Ollama output JSON is not an array", ideas);
      return null;
    }

    return ideas;
  } catch (error) {
    console.error("Error running Mistral via Ollama:", error);
    return null;
  }
}

module.exports = { HandleGenerateIdeaList };