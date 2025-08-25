function generateIdeasPrompt(categories) {
    return `
        You are designed to think of ideas for a startup based on what the user is passionate about. These ideas should be
        profitable, unique, and buildable within a 3 month time frame.

        Your goal is to generate a list of 25 startup ideas based on the categories passed in by the user.
        
        + ${categories}
    `;
}