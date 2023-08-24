import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  

import { EventContext } from "../../Context/context";
import './Carousel.css';

function Carousel() {
  const allEvents = useContext(EventContext);
  const [slideIndex, setSlideIndex] = useState(0);

  // Filter events that are from today or later
  const todayOrLaterEvents = allEvents.filter(event => 
    new Date(event.date) >= new Date().setHours(0,0,0,0)
  );

  // Sort these events by date
  todayOrLaterEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Take the first 13 events
  const events = todayOrLaterEvents.slice(0, 13);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [slideIndex, events.length]);

  return (
    <div>
      <div className="slideshow-container">
        {events.map((event, index) => (
          <div
            key={event._id}
            className={`mySlides ${index === slideIndex ? 'active' : ''}`}
          >
            <Link to={`/events/${event._id}`}>
            <img src={event.image} alt={event.title} />
            </Link>
            <div className="caption">{event.title}</div>
          </div>
        ))}
      </div>
      <div className="toggle-container">
        {events.map((_, index) => (
          <span
            key={index}
            onClick={() => setSlideIndex(index)}
            className={`toggle ${index === slideIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
  
}

export default Carousel;
