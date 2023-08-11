import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { EventContext } from "../../Context/context";
import "../Today/Today.css";

function UpcomingEvents() {
  const events = useContext(EventContext);

  const today = new Date();

  //checking for events that are scheduled between the start and end of the next month.
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0); //events that are scheduled specifically in the next month.

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= nextMonthStart && eventDate <= nextMonthEnd;
  });

  return (
    <div className="page-container-today">
      <div className="container-today one-today">
        <h3 className="section-title-today">Upcoming Events</h3>
        <div className="card-grid-today">
          {upcomingEvents.map((event) => (
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
                    <strong>Date and Time:</strong>{" "}
                    {moment(event.date).format("dddd, Do MMMM YYYY, h:mm a")}
                  </p>
                  <p className="card-text-today">
                    <strong>City:</strong> {event.city}
                  </p>
                  <p className="card-text-today">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text-today">
                    <strong>Details:</strong>{" "}
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

export default UpcomingEvents;
