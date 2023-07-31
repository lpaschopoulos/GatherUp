import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import dateFormat from 'dateformat';
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
              {event.image && (
                <img src={event.image} alt={`img-${index}`} title="card image" />
              )}              <div className="card-body">
                <h3 className="title-card">{event.title}</h3>
                <p className="date">Date: {dateFormat(event.date,"dddd, dS mmmm yyyy") }</p>
                <p className="city">City:{event.city}</p>
                <p className="location">Location: {event.location}</p>
                <p className="details">Details:{event.description}</p>
                
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
