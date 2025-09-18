const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware to parse JSON body and enable CORS
app.use(cors());
app.use(express.json());

const { HandleGenerateIdeaList, HandleRefineIdea } = require('./api.js');

// API routes
app.post('/api/submit-categories', async (req, res) => {
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
});

app.post('/api/refine-idea', async (req, res) => {
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
});

// Root endpoint
app.get('/', (req, res) => {
  console.log("SERVER IS RUNNING");
  res.json({ message: "Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express API for Vercel
module.exports = app;
