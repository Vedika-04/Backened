const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    const user_id = "vedika_joshi_0827CY221066";
    const email = "vedikajoshi220951@acropolis.in";
    const roll_number = "0827CY221066";

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

    const highest = alphabets.length
        ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
        : [];

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet: highest
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
