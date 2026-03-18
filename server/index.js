const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, initDb } = require('./database');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

initDb();

// Endpoints for Form Entries
app.post('/api/entries', (req, res) => {
  const { title, description, content, category } = req.body;
  const sql = `INSERT INTO entries (title, description, content, category) VALUES (?, ?, ?, ?)`;
  db.run(sql, [title, description, content, category], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID, message: 'Entry saved successfully' });
  });
});

app.get('/api/entries', (req, res) => {
  const sql = 'SELECT * FROM entries ORDER BY created_at DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Chat Proxy Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, provider } = req.body; // provider can be 'ollama' or 'onyx'

  if (provider === 'ollama') {
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3', // Default to llama3 or user model
        prompt: message,
        stream: false
      });
      res.json({ reply: response.data.response });
    } catch (error) {
      res.status(500).json({ error: 'Ollama service unavailable: ' + error.message });
    }
  } else if (provider === 'onyx') {
    // Placeholder for Onyx integration
    res.json({ reply: 'Onyx integration is coming soon. Please use Ollama for now.' });
  } else {
    res.status(400).json({ error: 'Invalid provider' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
