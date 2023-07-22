const EventModel = require('../models/eventModel');

const homePageController = async (req, res) => {
  try {
    // Get the current date and time
    const currentDate = new Date();

    // Fetch events with a start time greater than the current date and time
    const events = await EventModel.find({ date: { $gt: currentDate } })
      .sort({ date: 1 }) // Sort the events in ascending order based on the start time
      .limit(10); // Fetch the first 10 events

    // Render or send the home page view with the filtered events data
    res.render('home', { events });
  } catch (error) {
    console.log("Error rendering home page:", error);
    res.status(500).send("Error rendering home page");
  }
};

module.exports = homePageController;

  