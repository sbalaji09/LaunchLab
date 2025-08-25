function HandleGenerateIdeaList(metadata) {
    prompt = generateIdeasPrompt(metadata)
    ideas = LLMIdeas(prompt).ideas
    return ideas
}

function LLMIdeas(prompt) {
    return {"ideas": "test"}
}