// Import from your backend folder
import { HandleGenerateIdeaList } from '../../backend/api.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const categories = req.body.categories;
    console.log('Received categories:', categories);

    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ error: 'Categories array is required' });
    }

    const ideas = await HandleGenerateIdeaList(categories);
    console.log("IDEAS", ideas);
    res.json({ ideas: ideas });
  } catch (error) {
    console.error('Error in /api/submit-categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}