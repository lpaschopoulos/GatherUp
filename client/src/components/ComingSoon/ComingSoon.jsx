import React from "react";
import "./ComingSoon.css"; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ComingSoon({ events }) {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const handleCardClick = (selectedEvent) => {
    console.log(selectedEvent._id);

    navigate(`/events/${selectedEvent._id}`);
};


  const comingSoonEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate > nextMonth;
  });

  return (
    <div className="event-list-soon">
      <div className="cards-container-soon">
        {comingSoonEvents.map(event => (
          <article key={event._id} className="card-soon" onClick={() => handleCardClick(event)}>
            <div className="temporary_text-soon">
              {typeof event.image === "string" && (
                <img src={event.image} alt={`img-${event._id}`} className="card-img-top-week" />
              )}    
            </div>
            <div className="card_content-soon">
              <span className="card_title-soon">{event.title}</span>
              <p className="card_subtitle-soon"><strong>{event.city}</strong> </p>
              <p className="card_description-soon">{event.location}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ComingSoon;
