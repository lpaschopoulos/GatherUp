import React, { useContext } from 'react';
import moment from "moment";
import "../Today/Today.css"
import { Link } from "react-router-dom";
import { EventContext } from '../../Context/context';

function Tomorrow() {
    const events = useContext(EventContext);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add one day for tomorrow
    const startOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    const startOfDayAfterTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1);

    const tomorrowsEvents = events?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= startOfTomorrow && eventDate < startOfDayAfterTomorrow;
    });

    return (
        <div className="page-container-today">
            <div className="container-today one-today">
                <h3 className="section-title-today">Tomorrow's Events:</h3>
                <div className="card-grid-today">
                    {tomorrowsEvents && tomorrowsEvents.map((event) => (
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
                                    <p className="card-text-today">                    <strong>Details:</strong>{" "}
                    {event.details.length > 100
                      ? `${event.details.substring(0, 100)}... `
                      : event.details}
                  </p>{" "}
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

export default Tomorrow;
