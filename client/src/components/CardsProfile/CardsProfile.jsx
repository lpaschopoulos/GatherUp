import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import "./CardsProfile.scss";

function CardsProfile() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Fetch the list of events from the backend when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:3636/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const addNewEvent = (eventData) => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
  };

  return (
    <div className="page-container">
      <div className="container one">
        <h3 style={{ paddingLeft: "25px" }}>Your List of Events:</h3>
        <div className="grid-cards">
          {events.map((event, index) => (
            <div key={index} className="card">
              <img src={event.eventImage} alt={`img-${index}`} title="card image" />
              <div className="card-body">
                <h3 className="title-card">{event.title}</h3>
                <p>{event.description}</p>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                {/* Add other event properties you want to display */}
              </div>
              <div className="card-footer">
                <a href="#">Click here</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsProfile;
