import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DeleteButton from "../DeleteButton/DeleteButton";
import "./CardsProfile.scss";
import EditButton from "../EditButton/EditButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CardsProfile({ userId, image }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      getMyEvents(userId);
    }
  }, [userId]);

  function getMyEvents(userId) {
    console.log("Fetching events for user:", userId);
    axios
      .get("http://localhost:3636/events/user/" + userId)
      .then(({ data }) => {
        console.log("Events data:", data);
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }

  const deleteEvent = (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete the event?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3636/events/${id}`)
        .then(() => {
          // Remove the event from the events state
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event._id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
        });
    }
  };

  return (
    <div className="page-container">
      <div className="container one">
        <h3 className="section-title">Your List of Events:</h3>
        <div className="card-grid">
          {events.map((event) => (
            <div key={event._id} className="card custom-card">
              <Link to={`/events/${event._id}`}>
                {typeof event.image === "string" && (
                  <img
                    src={event.image}
                    alt={`img-${event._id}`}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h3 className="card-title">{event.title}</h3>
                  <p className="card-text">
                    <strong>Date and Time:</strong>{" "}
                    {moment(event.date).format("dddd, Do MMMM YYYY, h:mm a")}
                  </p>
                  <p className="card-text">
                    <strong>City:</strong> {event.city}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text-today">
                    <strong>Details:</strong>{" "}
                    {event.details.length > 100
                      ? `${event.details.substring(0, 100)}... `
                      : event.details}
                  </p>{" "}
                  <p className="card-text">
                    <strong>Ticket Price: €</strong> {event.ticketPrice}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {event.categories}
                  </p>
                </div>
              </Link>

              <div className="card-footer">
                <DeleteButton onDelete={() => deleteEvent(event._id)} />
                <EditButton eventId={event._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsProfile;
