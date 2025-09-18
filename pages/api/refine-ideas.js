const { HandleRefineIdea } = require('../../backend/api.js');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { basic_idea } = req.body.idea || {};
    console.log('RECEIVED IDEA', basic_idea);
    
    if (!basic_idea) {
      return res.status(400).json({ error: 'basic_idea is required' });
    }

    const idea = await HandleRefineIdea(basic_idea);
    console.log("Refined IDEA", idea);
    res.json({ idea: idea });
  } catch (error) {
    console.error('Error in /api/refine-idea:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}