const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const { HandleGenerateIdeaList } = require('./api.js');

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

app.get('/', (req, res) => {
  console.log("SERVER IS RUNNING");
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
