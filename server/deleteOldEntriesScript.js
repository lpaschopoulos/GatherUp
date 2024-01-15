const cron = require('node-cron');
const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('./models/eventModel');

// Connect to MongoDB
mongoose.connect(process.env.MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Schedule a cron job to run every day at midnight
cron.schedule('0 22 * * *', async () => {
    try {
        // Calculate the date 2 months ago
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

        // Find and delete events older than 2 months based on the date field
        const deletedEvents = await Event.deleteMany({ date: { $lt: twoMonthsAgo } });

        console.log('Deleted old events. Count:', deletedEvents.deletedCount);
    } catch (error) {
        console.error('Error deleting old events:', error);
    }
});



