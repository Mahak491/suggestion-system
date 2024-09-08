const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());
let suggestions = [];

app.get('/suggestions', (req, res) => {
  res.json(suggestions);
});

app.post('/suggestions', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newSuggestion = {
    id: suggestions.length + 1, 
    title,
    description,
    votes: 0, 
  };

  suggestions.push(newSuggestion); 
  res.status(201).json(newSuggestion);
});


app.post('/suggestions/:id/vote', (req, res) => {
  const suggestionId = parseInt(req.params.id);
  const suggestion = suggestions.find(s => s.id === suggestionId);

  if (!suggestion) {
    return res.status(404).json({ message: 'Suggestion not found' });
  }

  suggestion.votes += 1; 
  res.json(suggestion); 
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
