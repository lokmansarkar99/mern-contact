//Importing Modules
import express from "express";
import mongoose from "mongoose";
import { Contact } from "./ContactModal.js";
import bodyParser from "body-parser";
import cors from 'cors';
const app = express();

// Middleware to parse incoming JSON requests and make the data available in req.body
app.use(bodyParser.json());

// Enable CORS (Cross-Origin Resource Sharing) for all origins with specified HTTP methods and credentials support
app.use(cors({
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
  credentials: true // Allow cookies to be sent with requests
}));

// Connect to the MongoDB database using Mongoose
// The connection string includes the username, password, and cluster address
mongoose
  .connect(
    "mongodb+srv://sagorislammitasa:fwjiUzWgUJ99no9w@cluster0.anld3zd.mongodb.net/", // MongoDB Atlas connection string
    { dbName: "mern_contact" } // Options object with the database name to connect to
  )
  .then(() => {
    // Callback function executed when the connection is successful
    console.log("mongoDB Connected"); // Log a success message
  })
  .catch((err) => {
    // Callback function executed when there is an error connecting to the database
    console.log(err); // Log the error message
  });

// Get All Contacts
app.get("/", async (req, res) => {
  try {
    // Find all contacts and sort them by creation date in descending order
    let contact = await Contact.find().sort({ createdAt: -1 });
    res.json({ message: "All Contacts", contact });
  } catch (error) {
    // Send an error message if there is an issue
    res.json({ message: error.message });
  }
});

// Add Contact
// Define a POST route for the root path
app.post("/", async (req, res) => {
  // Destructure the name, email, and phone from the request body
  const { name, email, phone} = req.body;

  try {
    // Check if a contact with the same email already exists in the database
    let existingContact = await Contact.findOne({ email });
    if (existingContact) {
      // If a contact with the same email exists, return a 400 status code with an error message
      return res
        .status(400)
        .json({ message: "Contact with this email already exists." });
    }

    else{
      // If no contact with the same email exists, create a new contact in the database
    let contact = await Contact.create({ name, email, phone });
    // Return a success message along with the created contact
    res.json({ message: "Contact Saved Successfully..!", contact });
    }
  } catch (error) {
    // If there's an error, return a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
});

// Edit Contact
app.put("/:id", async (req, res) => {
  // Extract the contact ID from the request parameters
  const id = req.params.id;
  // Extract the updated contact data from the request body
  const updatedData = req.body;

  try {
    // Find the contact by ID in the database
    let contact = await Contact.findById(id);
    // If the contact does not exist, return an error message
    if (!contact) {
      return res.json({ message: "Contact does not exist..!!" });
    }
    // Update the contact data in the database and return the updated contact
    let data = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    // Send a success message with the updated contact data
    res.json({ message: "Contact has been updated", data });
  } catch (error) {
    // If an error occurs, send an error message
    res.json({ message: error.message });
  }
});

// Delete Contact
// Route handler for DELETE requests to the endpoint "/:id"
app.delete("/:id", async (req, res) => {
  // Extract the "id" parameter from the request
  const id = req.params.id;
  try {
    // Attempt to find a contact by the given ID in the database
    let contact = await Contact.findById(id);
    
    // If no contact is found, send a JSON response with an error message
    if (!contact) {
      return res.json({ message: "Contact not exist..!!" });
    } else {
      // If contact is found, delete it from the database
      await contact.deleteOne();
      // Send a JSON response indicating successful deletion
      res.json({ message: "Your Contact has been deleted..!!" });
    }
  } catch (error) {
    // Catch any errors that occur during the process and send a JSON response with the error message
    res.json({ message: error.message });
  }
});

// Get Single Contact by ID
// Endpoint to fetch a specific contact by ID
app.get("/:id", async (req, res) => {
  const id = req.params.id; // Extract ID parameter from request
  
  try {
    let contact = await Contact.findById(id); // Attempt to find contact by ID in database
    if (!contact) {
      // If contact is not found, return 404 error
      return res.status(404).json({ message: "Contact not found" });
    }
    // If contact is found, return it as JSON response
    res.json({ contact });
  } catch (error) {
    // If an error occurs during database operation, return 500 error
    res.status(500).json({ message: error.message });
  }
});

// Start server on port 2000
app.listen(2000, () => {
  console.log("Server is running on port 2000");
});