import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventCity: "",
    ticketPrice: "",
    eventDescription: "",
    eventTags: "",
    eventImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const inputValue = type === "file" ? files[0] : value;
    setEventData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the eventData to your backend or perform any other logic
    console.log("Event data submitted:", eventData);
  };

  return (
    <div className="formContainer">
      <div className="containerContent">
        <div id="formTitle">
          <h1>Create New Event</h1>
        </div>
        <form id="form" onSubmit={handleSubmit}>
          <div className="formInput-group">
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              placeholder="Enter Event Name"
            />
          </div>

          <div className="formInput-group">
            <label>Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
            />
          </div>

          <div className="formInput-group">
            <label>Event Location</label>
            <input
              type="text"
              name="eventLocation"
              value={eventData.eventLocation}
              onChange={handleChange}
              placeholder="Enter Event Location"
            />
          </div>

          <div className="formInput-group">
            <label>Event City</label>
            <input
              type="text"
              name="eventCity"
              value={eventData.eventCity}
              onChange={handleChange}
              placeholder="Enter Event City"
            />
          </div>

          <div className="formInput-group">
            <label>Ticket Price</label>
            <input
              type="text"
              name="ticketPrice"
              value={eventData.ticketPrice}
              onChange={handleChange}
              placeholder="Enter Ticket Price"
            />
          </div>

          <div className="formInput-group description">
            <label>Event Description</label>
            <textarea
              name="eventDescription"
              value={eventData.eventDescription}
              onChange={handleChange}
              placeholder="Enter Event Description"
              rows="4"
            />
          </div>

          <div className="formInput-group">
            <label>Tags</label>
            <input
              type="text"
              name="eventTags"
              value={eventData.eventTags}
              onChange={handleChange}
              placeholder="Enter Tags (comma separated)"
            />
          </div>

          <div className="formInput-group">
            <label>Upload Image</label>
            <input
              type="file"
              name="eventImage"
              onChange={handleChange}
            />
          </div>

          <div className="submitBtn-wrap">
            <button id="submitButton" type="submit">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
