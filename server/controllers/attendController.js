const UserEvent = require("../models/usereventModel");

const addUserEvent = async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        // Check if the user is already attending the event
        const existingEntry = await UserEvent.findOne({ userId, eventId });
        if (existingEntry) {
            return res.status(400).send({ msg: 'User is already attending this event.' });
        }

        // Create a new entry
        const userEvent = new UserEvent({ userId, eventId });
        await userEvent.save();

        res.send({ msg: 'Successfully added to attending list.', userEvent });
    } catch (error) {
        console.log("Error adding event to user's attending list:", error);
        res.status(500).send({ error: 'Failed to add event to attending list.' });
    }
};

const removeUserEvent = async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        const result = await UserEvent.findOneAndDelete({ userId, eventId });
        if (!result) {
            return res.status(404).send({ msg: 'No such entry found.' });
        }

        res.send({ msg: 'Successfully removed from attending list.' });
    } catch (error) {
        console.log("Error removing event from user's attending list:", error);
        res.status(500).send({ error: 'Failed to remove event from attending list.' });
    }
};


const fetchUserEvents = async (req, res) => {
    const { userId } = req.params;


    if (!userId || userId === 'undefined') {
        return res.status(400).json({ error: 'userId is required' });
    }
    
    
    try {
        const userEvents = await UserEvent.find({ userId }).populate('eventId');
        if (!userEvents || userEvents.length === 0) {
            return res.status(404).send({ msg: 'No events found for this user.', events: [] });
        }

        // Extracting populated events
        const events = userEvents.map(ue => ue.eventId);
        res.send({ msg: 'Successfully fetched events.', events });
    } catch (error) {
        console.log("Error fetching events a user is attending:", error);
        res.status(500).send({ error: 'Failed to fetch events.' });
    }
};


module.exports = {
    fetchUserEvents,
    removeUserEvent,
    addUserEvent,
  };