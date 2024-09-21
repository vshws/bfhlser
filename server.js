const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  // Validate that `data` is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid data format. Data should be an array.'
    });
  }

  // Filter numbers (convert to strings)
  const numbers = data.filter(item => !isNaN(item) && item.trim() !== '').map(String);

  // Filter single-character alphabets (case insensitive)
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

  // Find the highest alphabet (case insensitive)
  const highestAlphabet = alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' })).slice(0, 1);

  // Send the JSON response
  res.json({
    is_success: true,
    user_id: 'RA2111027010134',
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet
  });
});

const PORT =5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
