const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const { HandleGenerateIdeaList, HandleRefineIdea } = require('./api.js');

// Middleware to parse JSON body and enable CORS
app.use(cors());
app.use(express.json());

app.post('/api/submit-categories', (req, res) => {
  const categories = req.body.categories;
  console.log('Received categories:', categories);

  // Pass categories array to your ideas handler, example:
  const ideas = HandleGenerateIdeaList(categories);
  console.log("IDEAS", ideas);
  res.json({"ideas": ideas });
});

app.post('/api/refine-idea', async (req, res) => {
  try {
    const { basic_idea } = req.body.idea;

    const idea = HandleRefineIdea(basic_idea);
    console.log("IDEA", idea);
    res.json({"idea": idea})
    
  } catch (err) {
    console.error('Error in /api/refine-idea:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/', (req, res) => {
  console.log("SERVER IS RUNNING");
  res.json({ message: "Server is running!" }); // ✅ Send response
});

module.exports = app;
