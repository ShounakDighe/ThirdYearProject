const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Database name
const dbName = 'MIT-Project';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Schema and Model
const fraudSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  name: { type: String, required: true } // Only these fields remain
});

const Fraud = mongoose.model('Fraud', fraudSchema);

// Routes
app.get('/results', async (req, res) => {
  try {
    const results = await Fraud.find();
    res.json({ results, dbName });
  } catch (err) {
    res.status(400).json({ error: 'Error fetching results', details: err.message });
  }
});

app.post('/detect', async (req, res) => {
  const { patientId, name } = req.body;

  const newFraud = new Fraud({
    patientId,
    name,
  });

  try {
    await newFraud.save();
    res.status(201).json(newFraud);
  } catch (err) {
    res.status(400).json({ error: 'Error saving fraud detection', details: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
