function generateIdeasPrompt(categories) {
    return `
        You are an expert startup idea generator.

        Generate exactly 15 innovative startup ideas that COMBINE ALL of these categories together: ${categories.join(', ')}.

        Requirements for each idea:
        - Profitable: each idea must have clear revenue potential.
        - Unique: avoid generic concepts; focus on fresh, niche, or emerging opportunities.
        - Feasible to build within 3 months: ideas should be realistically deliverable by a solo founder or a small team in a short timeframe.
        - Each idea must clearly incorporate all of these categories: ${categories.join(', ')}. For each idea, explicitly explain how it incorporates each category.

        The ideas should solve genuine problems or unmet needs.

        Select ideas that maximize the user's strengths and have the greatest potential for success.

        ---

        Output instructions:

        Return exactly 15 startup ideas as a JSON array of strings.

        Each string should:
        1. Describe the startup concept in two to three sentences.
        2. Explain how it incorporates EACH of these categories: ${categories.join(', ')}.
        3. Show clear revenue potential.

        IMPORTANT:
        - Do NOT add markdown, asterisks, or any special formatting.
        - Respond ONLY with a valid JSON array of 15 startup ideas.
        - Do NOT include any extra text, explanations, or introductions.

        Example format:

        [
        "Idea 1 description: two to three sentence summary; Incorporates [Category 1] by ...; Incorporates [Category 2] by ...; ...",
        "Idea 2 description: ...",
        ...
        "Idea 15 description: ..."
        ]

        End of instructions.
    `;
}

function generateIdeaRefinePrompt(general_idea) {
    return `
        You are an expert at refining startup ideas.

        Your task is to generate a well-refined startup concept based on the following input: ${general_idea}

        Requirements for the idea:
        - Profitable: clearly define a revenue model and how the product will generate recurring revenue.
        - Buildable and Scalable: must be viable to build an MVP within 3 months using commonly available tools and scalable to over 100,000 users.
        - Specificity: refine the idea to focus on real and common problems within the space of ${general_idea}.
        - Marketable: should be positioned for a large target audience.

        Output Instructions:
        - Return the response ONLY in valid JSON format.
        - The top-level JSON must be an array with exactly one object inside.
        - Each object must contain the following keys:
        - "name": Unique, creative product name.
        - "summary": A 2-3 sentence overview of the product.
        - "features": A list of 3-5 concrete, specific product features.
        - "tech_stack": Languages, frameworks, tools, APIs, and integrations used to build the MVP.
        - "pricing": Two parts: (1) estimated MVP development cost, (2) suggested user pricing model.
            - for the estimated MVP development cost, breakdown the costs including costs for database management, backend instracture platforms, frontend deployment, and others as needed.
            include the softwares needed for each of the components as well

        Example output:

        [
            {
                "name": "ProductName",
                "summary": "This product helps ...",
                "features": [
                "Feature 1",
                "Feature 2"
                ],
                "tech_stack": [
                "React Native",
                "Node.js + Express",
                "PostgreSQL",
                "Stripe API"
                ],
                "pricing": {
                "development_cost": "$25,000",
                "user_pricing": "$10/month per user"
                }
            }
        ]
    `;  
}

module.exports = { generateIdeasPrompt, generateIdeaRefinePrompt };