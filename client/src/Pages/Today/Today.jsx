import React, { useContext } from 'react';
import moment from "moment";
import "./Today.css"; // Import your CSS styles with -week suffix
import { Link } from "react-router-dom";
import { EventContext } from '../../Context/context';

function Today() {
    const events = useContext(EventContext);

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today at 00:00:00
    const startOfTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Start of next day at 00:00:00
    
    const todaysEvents = events?.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfToday && eventDate < startOfTomorrow; // Check if event is on or after the start of today and before the start of tomorrow
    });


return (
    <div className="page-container-today">
        <div className="container-today one-today">
            <h3 className="section-title-today">Today's Events:</h3>
            <div className="card-grid-today">
                {todaysEvents && todaysEvents.map((event) => (
                    <div key={event._id} className="card-today custom-card-today">
        <Link to={`/events/${event._id}`}>
                            {typeof event.image === "string" && (
                                <img src={event.image} alt={`img-${event._id}`} className="card-img-top-today" />
                            )}
                            <div className="card-body-today">
                                <h3 className="card-title-today">{event.title}</h3>
                                <p className="card-text-today">
                                    <strong>Date and Time:</strong>{" "}
                                    {moment(event.date).format("dddd, Do MMMM YYYY, h:mm a")}
                                </p>
                                <p className="card-text-today"><strong>City:</strong> {event.city}</p>
                                <p className="card-text-today"><strong>Location:</strong> {event.location}</p>
                                <p className="card-text-today"><strong>Details:</strong> {event.details}</p>
                                <p className="card-text-today"><strong>Ticket Price: €</strong> {event.ticketPrice}</p>
                                <p className="card-text-today"><strong>Category:</strong> {event.categories}</p>
                            </div>

                        </Link>

                            </div>
                ))}
            </div>
        </div>
    </div>
);

    
}

export default Today;
