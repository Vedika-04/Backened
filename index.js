const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: ['https://frontend-pi-six-81.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable pre-flight for all routes
app.options('*', cors());

app.use(bodyParser.json());

// GET endpoint
app.get('/bfhl', (req, res) => {
  try {
    return res.status(200).json({
      operation_code: 1
    });
  } catch (error) {
    console.error('Error in GET /bfhl:', error);
    return res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    // Validate input
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input. Data must be an array.'
      });
    }

    // Your user information
    const user_id = "vedika_joshi_0827CY221066";
    const email = "vedikajoshi220951@acropolis.in";
    const roll_number = "0827CY221066";

    // Process data
    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
    const alphabets = data.filter(item => 
      typeof item === 'string' && 
      item.length === 1 && 
      isNaN(item) && 
      /^[a-zA-Z]$/.test(item)
    );

    // Find highest alphabet (case insensitive)
    let highest_alphabet = [];
    if (alphabets.length > 0) {
      const sortedAlphabets = [...alphabets].sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      highest_alphabet = [sortedAlphabets[sortedAlphabets.length - 1]];
    }

    // Create response with is_success: true
    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in POST /bfhl:', error);
    return res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;