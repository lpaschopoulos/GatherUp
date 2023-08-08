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
  categories: {
    type: String,
    // enum: ['Art', 'Theater', 'Cinema', 'Concerts'], // Add your specific categories here
    required: true,
  },
  userId: String,
  // You can add more fields like organizer information, etc.
});

// Create a model based on the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
