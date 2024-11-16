// Importing mongoose library and the mongo object from mongoose
import mongoose, { mongo } from "mongoose";

// Defining a schema for the contact collection
const contactSchema = new mongoose.Schema({
    // Name field of type String, required
    name: {
        type: String,
        require: true
    },
    // Email field of type String, required
    email: {
        type: String,
        require: true
    },
    // Phone field of type String, required
    phone: {
        type: String,
        require: true
    },
    // createdAt field of type Date, defaulting to the current date/time
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Creating a mongoose model named "Contact" using the contactSchema
export const Contact = mongoose.model("Contact", contactSchema);
