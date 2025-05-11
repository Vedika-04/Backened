const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// GET route for /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    // Check if data is provided and is an array
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false });
    }
    
    // Your user information
    const user_id = "vedika_joshi_0827CY221066";
    const email = "vedikajoshi220951@acropolis.in";
    const roll_number = "0827CY221066";
    
    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
    
    // Find highest alphabet (case insensitive)
    let highest_alphabet = [];
    if (alphabets.length > 0) {
      const upperCaseAlphabets = alphabets.map(char => char.toUpperCase());
      const highestChar = upperCaseAlphabets.reduce((a, b) => a > b ? a : b);
      highest_alphabet = [alphabets[upperCaseAlphabets.indexOf(highestChar)]];
    }
    
    // Construct response
    const response = {
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;