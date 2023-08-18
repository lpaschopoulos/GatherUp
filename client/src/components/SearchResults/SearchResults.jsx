import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

import moment from 'moment';
import { EventContext } from '../../Context/context';
import '../../Pages/Today/Today.css';

function SearchResults() {
  const events = useContext(EventContext);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const category = new URLSearchParams(location.search).get('category');

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    let filtered = events;

    // Filter by category first
    if (category) {
      filtered = filtered.filter(event => event.categories.toLowerCase() === category.toLowerCase());
    }

    // If there's a searchQuery, further filter the events
    if (searchQuery) {
      filtered = filtered.filter(event => {
        const eventDetails = event.title.toLowerCase() +
                            event.city.toLowerCase() +
                            event.categories.toLowerCase();
        return eventDetails.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredEvents(filtered);
    console.log(location.search);
}, [searchQuery, category, events]);

console.log(events.map(event => event.categories));



  return (
    <div className="page-container-today">
      <div className="container-today one-today">
        <h3 className="section-title-today">Search Results for: {searchQuery}</h3>
        <div className="card-grid-today">
          {filteredEvents.map((event) => (
            <div key={event._id} className="card-today custom-card-today">
              <Link to={`/events/${event._id}`}>
                {typeof event.image === 'string' && (
                  <img
                    src={event.image}
                    alt={`img-${event._id}`}
                    className="card-img-top-today"
                  />
                )}
                <div className="card-body-today">
                  <h3 className="card-title-today">{event.title}</h3>
                  <p className="card-text-today">
                    <strong>Date and Time:</strong>{' '}
                    {moment(event.date).format('dddd, Do MMMM YYYY, h:mm a')}
                  </p>
                  <p className="card-text-today">
                    <strong>City:</strong> {event.city}
                  </p>
                  <p className="card-text-today">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text-today">
                    <strong>Details:</strong>{' '}
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

export default SearchResults;
