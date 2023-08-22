import React, { useContext, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { EventContext } from "../../Context/context";
import "../Today/Today.css";

function AllEvents() {
  const events = useContext(EventContext);

  // State to hold the selected filter
  const [selectedFilter, setSelectedFilter] = useState("date");

  // Sort the events based on the selected filter
  let sortedEvents = [...events];
  switch (selectedFilter) {
    case "date":
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "title":
      sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "city":
      sortedEvents.sort((a, b) => a.city.localeCompare(b.city));
      break;
    default:
      break;
  }
  const centerWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  };
  return (
    <div className="page-container-today">
      <div className="container-today one-today">
        <h3 className="section-title-today">All Events</h3>
        <div style={centerWrapperStyle}>

        <div className="search_container">
          <label className="search_label">
          <span className="search_description">Sort events by:</span>
          </label>

          {/* Dropdown filter */}
          <select
            className="search_dropdown"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="city">City</option>
          </select>
        </div>
        </div>
        <div className="card-grid-today">
          {sortedEvents.map((event) => (
            <div key={event._id} className="card-today custom-card-today">
              <Link to={`/events/${event._id}`}>
                {typeof event.image === "string" && (
                  <img
                    src={event.image}
                    alt={`img-${event._id}`}
                    className="card-img-top-today"
                  />
                )}
                <div className="card-body-today">
                  <h3 className="card-title-today">{event.title}</h3>
                  <p className="card-text-today">
                    <strong>Date and Time:</strong> 
                    {moment(event.date).format("dddd, Do MMMM YYYY, h:mm a")}
                  </p>
                  <p className="card-text-today">
                    <strong>City:</strong> {event.city}
                  </p>
                  <p className="card-text-today">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text-today">
                    <strong>Details:</strong> 
                    {event.details.length > 100
                      ? `${event.details.substring(0, 100)}... `
                      : event.details}
                  </p>
                  <p className="card-text-today">
                    <strong>Ticket Price: €</strong> {event.ticketPrice}
                  </p>
                  <p className="card-text-today">
                    <strong>Category:</strong> {event.categories}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllEvents;
