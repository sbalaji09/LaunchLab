const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json

// Sample POST endpoint
app.post('/api/posts', (req, res) => {
  const postData = req.body;
  // Save postData to database or process it here
  res.status(201).json({ message: 'Post created', data: postData });
});

// Sample GET endpoint
app.get('/api/posts', (req, res) => {
  // Fetch posts from database or static data
  res.json([{ title: 'First Post', content: 'Hello world' }]);
});

app.get('/api/ideas', (req, res) => {
    const ideas = HandleGenerateIdeaList(req)
    res.json(ideas);
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
