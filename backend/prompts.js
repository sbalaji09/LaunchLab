function generateIdeasPrompt(categories) {
    return `
        You are an expert startup idea generator.

        Your task is to generate exactly 15 innovative startup ideas that COMBINE ALL of these categories together: ${categories.join(', ')}.

        Requirements for each idea:
        - **Profitable**: Each idea must have clear revenue potential.
        - **Unique**: Avoid generic concepts; focus on fresh, niche, or emerging opportunities.
        - **Feasible to Build Within 3 Months**: Ideas should be realistically deliverable by a solo founder or a small team in a short timeframe.
        - **Combines ALL Categories**: Every single idea MUST meaningfully incorporate elements from ALL ${categories.length} categories: ${categories.join(', ')}. For each idea, explicitly explain how it incorporates each category.

        The ideas should solve genuine, current problems or unmet needs in the world.

        Select ideas that maximize the user's strengths and have the greatest potential for success.

        ---

        **Output instructions:**

        Return EXACTLY 15 startup ideas as a JSON array. Each idea should be a detailed string that:
        1. Describes the startup concept
        2. Explains how it incorporates EACH of these categories: ${categories.join(', ')}
        3. Shows clear revenue potential

        Format: ["Idea 1: [Concept description] - Incorporates [Category 1] by [explanation], [Category 2] by [explanation], etc.", "Idea 2: [Concept description] - Incorporates...", ...]

        Respond with ONLY valid JSON array format - no markdown syntax, no introductory text, no explanations outside the JSON array.

        End of instructions.
    `;
}

module.exports = { generateIdeasPrompt };