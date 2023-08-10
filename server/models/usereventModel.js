const mongoose = require('mongoose');

const userEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Using ObjectId type to reference User
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId, // Using ObjectId type to reference Event
        ref: 'Event',
        required: true
    },
    attendingDate: {  // Optional: You can store the date when a user decided to attend an event
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const UserEvent = mongoose.model('UserEvent', userEventSchema);

module.exports = UserEvent;
