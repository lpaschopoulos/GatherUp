import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

import './CityEvents.css';

function CityEvents({ events }) {
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    shuffleEvents();

    // Set an interval to shuffle the events every 5 seconds
    const interval = setInterval(() => {
      shuffleEvents();
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [events]);  // Only re-run the effect if the events prop changes

  const shuffleEvents = () => {
    const shuffled = [...events].sort(() => 0.5 - Math.random());
    setDisplayedEvents(shuffled.slice(0, 5));
  }

  const trimTitle = (title) => {
    const dotIndex = title.indexOf('.');
    const hyphenIndex = title.indexOf('-');
    const colonIndex = title.indexOf(':');

    // Create an array with the indices of the characters, filtering out the ones that don't exist
    const indices = [dotIndex, hyphenIndex, colonIndex].filter(index => index !== -1);

    // If none of the characters exist, return the whole title
    if (indices.length === 0) return title;

    // Find the smallest index among the characters
    const minIndex = Math.min(...indices);

    return title.slice(0, minIndex);  // Exclude the found character and return
};

const handleCardClick = (selectedEvent) => {
  console.log(selectedEvent._id);
  navigate(`/events/${selectedEvent._id}`);
};

return (
  <div className="city-events-section">
    <ul>
      {displayedEvents
        .filter(event => event.city.toLowerCase() !== "online" && event.location.toLowerCase() !== "online")
        .map((event) => (
          <li key={event.id} onClick={() => handleCardClick(event)}>
            <span className="event-city">{event.city}</span>
            <span className="event-name">{trimTitle(event.title)}</span>
            <span className="event-date">{moment(event.date).format("dddd, D MMMM YYYY")}</span>
          </li>
        ))}
    </ul>
  </div>
);
}

export default CityEvents;
