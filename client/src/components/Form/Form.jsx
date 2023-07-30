
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form({ addNewEvent }) {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTags, setEventTags] = useState("");
  const [eventImage, setEventImage] = useState(null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setEventImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", eventImage);
  
    try {
      const imageResponse = await axios.post("http://localhost:3636/uploads", formData);
      //setEventImage(imageResponse.data.data.secure_url);
      console.log("Image Upload Response:", imageResponse.data);
      const secureUrl = imageResponse.data.data.secure_url;
  
      const eventData = {
        title: eventName,
        date: eventDate,
        location: eventLocation,
        city: eventCity,
        ticketPrice,
        description: eventDescription,
        tags: eventTags.split(",").map((tag) => tag.trim()),
        image: secureUrl,
      };
  
      const newEventResponse = await axios.post("http://localhost:3636/events", eventData);
      console.log("Event Creation Response:", newEventResponse.data);
      if (newEventResponse.data.success) {
        // The event was successfully added to the server
        addNewEvent(newEventResponse.data.event);
  
        setEventName("");
        setEventDate("");
        setEventLocation("");
        setEventCity("");
        setTicketPrice("");
        setEventDescription("");
        setEventTags("");
        setEventImage(null);
  
        navigate("/profile");
      } else {
        // Handle any error message sent from the server
        console.error("Error adding the event:", newEventResponse.data.message);
      }
    } catch (error) {
      console.error("Error uploading image or adding event:", error);
    }
  };

  return (
    <div className="formContainer">
      <div className="containerContent">
        <div id="formTitle">
          <h1>Create New Event</h1>
        </div>
        <form id="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="formInput-group">
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter Event Name"
            />
          </div>

          <div className="formInput-group">
            <label>Event Date</label>
            <input
              type="date"
              name="eventDate"
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div className="formInput-group">
            <label>Event Location</label>
            <input
              type="text"
              name="eventLocation"
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Enter Event Location"
            />
          </div>

          <div className="formInput-group">
            <label>Event City</label>
            <input
              type="text"
              name="eventCity"
              onChange={(e) => setEventCity(e.target.value)}
              placeholder="Enter Event City"
            />
          </div>

          <div className="formInput-group">
            <label>Ticket Price</label>
            <input
              type="text"
              name="ticketPrice"
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder="Enter Ticket Price"
            />
          </div>

          <div className="formInput-group description">
            <label>Event Description</label>
            <textarea
              name="eventDescription"
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Enter Event Description"
              rows="4"
            />
          </div>

          <div className="formInput-group">
            <label>Tags</label>
            <input
              type="text"
              name="eventTags"
              onChange={(e) => setEventTags(e.target.value)}
              placeholder="Enter Tags (comma separated)"
            />
          </div>

          <div className="formInput-group">
            <label>Upload Image</label>
            <input
              type="file"
              name="eventImage"
              onChange={handleImageUpload}
            />
          </div>
          {eventImage && (
        <img
          className="uploadedImage"
          src={URL.createObjectURL(eventImage)}
          alt="Uploaded Event"
        />
      )}
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