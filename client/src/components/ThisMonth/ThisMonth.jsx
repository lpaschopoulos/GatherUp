import React, { useState } from 'react';
import moment from "moment";
import "./ThisMonth.css"; // Import your CSS styles with -month suffix
import DetailButton from "../Details/DetailButton";

function ThisMonth({ events }) {
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= endOfMonth;
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDetailButtonClick = (event) => {
    setSelectedEvent(events);
  };

  return (
    <div className="page-container-month">
        <div className="container-month one-month">
            <div className="card-grid-month">
                {thisMonthEvents.map((event) => (
                    <div key={event._id} class="myCard-month">
                        <div class="innerCard-month">
                            <div class="frontSide-month">
                                {typeof event.image === "string" && (
                                    <img src={event.image} alt={`img-${event._id}`} className="card-img-top-month" />
                                )}
                                <p>{moment(event.date).format("dddd, D MMMM YYYY")}</p>
                                <p>{event.city}</p>
                            </div>
                            <div class="backSide-month">
                                <p class="title-month">{event.title}</p>
                                <p><strong>Ticket Price: €</strong> {event.ticketPrice}</p>
                                <div className="card-footer-month">
                                <DetailButton event={event} onClick={handleDetailButtonClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}

export default ThisMonth;
