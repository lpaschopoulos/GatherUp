import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import LetsGoButton from "./LetsGoButton";

import "./EventDetail.css"
import BuyTicket from './BuyTicket';

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null); // Adjust this to handle a single event

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3636/events/${eventId}`);
        setEvent(response.data); // Adjusted this too
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchData();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container-detail">
      <div className="container-detail one-detail">
        <h3 className="section-title-detail">Event Details:</h3>
        <div className="card-grid-detail">
          <div key={event._id} className="card-detail custom-card-detail">
            {typeof event.image === "string" && (
              <img src={event.image} alt={`img-${event._id}`} className="card-img-top-detail" />
            )}
            <div className="card-body-detail">
              <h3 className="card-title-detail">{event.title}</h3>
              <p className="card-text-detail">
                <strong>Date and Time:</strong>{" "}
                {moment(event.date).format("dddd, Do MMMM YYYY, h:mm a")}
              </p>                
              <p className="card-text-detail"><strong>City:</strong> {event.city}</p>
              <p className="card-text-detail"><strong>Location:</strong> {event.location}</p>
              <p className="card-text-detail"><strong>Details:</strong> {event.details}</p>
              <p className="card-text-detail"><strong>Ticket Price: €</strong> {event.ticketPrice}</p>
              <p className="card-text-detail"><strong>Category:</strong> {event.tags}</p>
            </div>
            <div className="card-footer-detail">
<LetsGoButton/>
<BuyTicket/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
