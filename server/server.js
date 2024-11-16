// Importing Modules
import express from 'express';
import mongoose from 'mongoose';
import { Contact } from './ContactModal.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to parse incoming JSON requests and make the data available in req.body
app.use(bodyParser.json());

// Enable CORS (Cross-Origin Resource Sharing) for all origins with specified HTTP methods and credentials support
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(process.env.MONGO_URI) // Use MONGO_URI from the .env file
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log(err);
  });

// Get All Contacts
app.get('/', async (req, res) => {
  try {
    // Find all contacts and sort them by creation date in descending order
    let contact = await Contact.find().sort({ createdAt: -1 });
    res.json({ message: 'All Contacts', contact });
  } catch (error) {
    // Send an error message if there is an issue
    res.json({ message: error.message });
  }
});

// Add Contact
app.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    let existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res
        .status(400)
        .json({ message: 'Contact with this email already exists.' });
    } else {
      let contact = await Contact.create({ name, email, phone });
      res.json({ message: 'Contact Saved Successfully..!', contact });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit Contact
app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.json({ message: 'Contact does not exist..!!' });
    }
    let data = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: 'Contact has been updated', data });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete Contact
app.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.json({ message: 'Contact not exist..!!' });
    } else {
      await contact.deleteOne();
      res.json({ message: 'Your Contact has been deleted..!!' });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Get Single Contact by ID
app.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server on port 2000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
