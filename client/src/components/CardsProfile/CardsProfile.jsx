import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat';
import DeleteButton from "../DeleteButton/DeleteButton";
import "./CardsProfile.scss";
import EditButton from "../EditButton/EditButton";

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
        <h3 className="section-title">Your List of Events:</h3>
        <div className="card-grid">
          {events.map((event, index) => (
            <div key={index} className="card custom-card">
              {event.image && (
                <img src={event.image} alt={`img-${index}`} className="card-img-top" />
              )}
              <div className="card-body">
                <h3 className="card-title">{event.title}</h3>
                <p className="card-text"><strong>Date:</strong> {dateFormat(event.date, "dddd, dS mmmm yyyy")}</p>
                <p className="card-text"><strong>City:</strong> {event.city}</p>
                <p className="card-text"><strong>Location:</strong> {event.location}</p>
                <p className="card-text"><strong>Details:</strong> {event.description}</p>
                <p className="card-text"><strong>Ticket Price: €</strong> {event.ticketPrice}</p>
                <p className="card-text"><strong>Tags:</strong> {event.tags}</p>
              </div>
              <div className="card-footer">
                <DeleteButton/>
                <EditButton/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsProfile;
