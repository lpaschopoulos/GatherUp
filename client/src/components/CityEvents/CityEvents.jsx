import React from "react";

function CityEvents({ events }) {
  const shuffledEvents = [...events].sort(() => 0.5 - Math.random());
  const randomCityEvents = shuffledEvents.slice(0, 5); // Select 5 random events

  return (
    <div className="section">
      <ul>
        {randomCityEvents.map(event => (
          <li key={event.id}>
            <span className="event-city">{event.city}</span> - {event.name} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityEvents;
