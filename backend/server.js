const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON body and enable CORS
app.use(cors());
app.use(express.json());

app.get('/api/submit-categories', (req, res) => {
  const categories = req.body.categories;
  console.log('Received categories:', categories);
  const ideas = HandleGenerateIdeaList(req)
  res.json(ideas);
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
