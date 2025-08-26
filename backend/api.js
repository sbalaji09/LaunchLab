const { execSync } = require('child_process');
const { generateIdeasPrompt } = require('./prompts.js');

function HandleGenerateIdeaList(metadata) {
    const prompt = generateIdeasPrompt(metadata);
  
    try {
      // Call the Ollama CLI with the mistral model and prompt
      // Make sure you have mistral model downloaded: ollama pull mistral
        const command = `ollama run mistral "${prompt.replace(/"/g, '\\"')}"`;

        const output = execSync(command, { encoding: 'utf8' });
        console.log(output);
        // Parse the output JSON if your prompt returns JSON string
        const response = JSON.parse(output);

        // Assuming the response includes an "ideas" field that is your desired list
        return response.ideas;
    } catch (err) {
      console.error('Error running Mistral via Ollama:', err);
      return null;
    }
}

module.exports = { HandleGenerateIdeaList };