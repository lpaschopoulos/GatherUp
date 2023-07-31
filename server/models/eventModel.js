const mongoose = require('mongoose');

// Define the schema for the events collection
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the image URL or file path
    required: true,
  },
  date: {
    type: Date, // You can include a date field if you want to store event dates
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String], // An array of strings representing tags
    default: [], // You can set a default empty array if needed
  },
  userId: String,
  // You can add more fields like organizer information, etc.
});

// Create a model based on the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
