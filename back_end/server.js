require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.get('/weather/:city', async (req, res) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&units=metric&appid=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(500).json({ message: 'Server error: no response from server' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

app.get('/forecast/:city', async (req, res) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${req.params.city}&units=metric&appid=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(500).json({ message: 'Server error: no response from server' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});