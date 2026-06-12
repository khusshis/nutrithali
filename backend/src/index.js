const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'NutriThali API is running' });
});

// Ingredient Search Route
app.get('/api/v1/ingredients/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    
    const result = await db.query(
      'SELECT * FROM ingredients WHERE name ILIKE $1 ORDER BY name ASC LIMIT 10',
      [`%${q}%`]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
