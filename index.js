const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Your personal information
const USER_ID = "vedika_joshi_0827CY221066";
const EMAIL = "vedikajoshi220951@acropolis.in";
const ROLL_NUMBER = "0827CY221066";

// Root endpoint - works for both local and deployed
app.get('/', (req, res) => {
  res.status(200).json({
    status: "Server is running",
    deployed_frontend: "https://frontend-pi-six-81.vercel.app",
    deployed_backend: "https://bfhl-backend-bu7d.onrender.com",
    endpoints: {
      GET: '/bfhl',
      POST: '/bfhl'
    },
    your_info: {
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER
    }
  });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input format. Expected { data: [] }"
      });
    }

    const numbers = [];
    const alphabets = [];

    data.forEach(item => {
      const strItem = String(item).trim();
      if (!isNaN(strItem)) {
        numbers.push(strItem);
      } else if (/^[a-zA-Z]$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
      }
    });

    let highest_alphabet = [];
    if (alphabets.length > 0) {
      const sorted = [...alphabets].sort((a, b) => 
        b.localeCompare(a, undefined, { sensitivity: 'base' })
      );
      highest_alphabet = [sorted[0]];
    }

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

// Handle all other routes
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    available_endpoints: {
      GET: ['/', '/bfhl'],
      POST: ['/bfhl']
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});