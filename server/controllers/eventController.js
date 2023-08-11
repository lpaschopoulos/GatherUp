const EventModel = require("../models/eventModel");

const postEvent = async (req, res) => {
  console.log(req.body)
  try {
      const eventData = {...req.body, categories: req.body.category };
      delete eventData.category;
      const event = await EventModel.create(eventData);
      res.send({ msg: "Event posted successfully", event });
  } catch (error) {
      console.log("Error posting event:", error);
      res.status(500).send({ error: "Failed to post event" });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.send(events);
  } catch (error) {
    console.log("Error getting all events:", error);
    res.status(500).send({ error: "Failed to get events" });
  }
};

const getOneEvent = async (req, res) => {
  try {
    const event = await EventModel.findOne({ _id: req.params.id });
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.send(event);
  } catch (error) {
    console.log("Error getting event:", error);
    res.status(500).send({ error: "Failed to get event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await EventModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.send({ msg: "Event updated successfully", event });
  } catch (error) {
    console.log("Error updating event:", error);
    res.status(500).send({ error: "Failed to update event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.findOneAndDelete({ _id: req.params.id });
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.send({ msg: "Event deleted successfully", event });
  } catch (error) {
    console.log("Error deleting event:", error);
    res.status(500).send({ error: "Failed to delete event" });
  }
};

const getAllUserEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ userId: req.params.userId }).lean();
    //const eventCount = events.length; // Get the count of events
    res.send(events);
  } catch (error) {
    console.log("Error in getting user's all events", error);
    res.status(500).send({ error: "Failed to get user's events" });
  }
};

const searchByCity = async (req, res) => {
  const { city } = req.params;
  try {
    const events = await EventModel.find({ location: city });
    res.send(events);
  } catch (error) {
    console.log("Error in searching events by city:", error);
    res.status(500).send({ error: "Failed to search events" });
  }
};

const getAllCategories = (req, res) => {
  try {
    const predefinedCategories = ['Art', 'Theater', 'Cinema', 'Concerts','MusicFest', 'Training', 'Seminars'];
    res.status(200).json(predefinedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};



module.exports = {
  postEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  deleteEvent,
  getAllUserEvents,
  searchByCity,
  getAllCategories,
};