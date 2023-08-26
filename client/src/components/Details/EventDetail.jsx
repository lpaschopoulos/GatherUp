import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import LetsGoButton from "./LetsGoButton";
import { UserContext } from '../../Context/context';

import "./EventDetail.css"
import BuyTicket from './BuyTicket';

function EventDetail() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { eventId } = useParams();
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);  // <-- Initialize the loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // <-- Set loading to true when fetching starts
        const response = await axios.get(`http://localhost:3636/events/${eventId}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
      setLoading(false);  // <-- Set loading to false when fetching ends
    };

    fetchData();
  }, [eventId]);

  if (loading) {  // <-- Check the loading state
    return <div>Loading...</div>;
  }

  if (!events) {
    return <div>No events found.</div>;
  }

  const goToMap = () => {
    navigate('/near-you', { state: { focusedEventId: eventId } });
  };
  

  return (
    <div className="page-container-detail">
      <div className="container-detail one-detail">
        <h3 className="section-title-detail">Event Details:</h3>
        <div className="card-grid-detail">
          <div key={events._id} className="card-detail custom-card-detail">
            {typeof events.image === "string" && (
              <img src={events.image} alt={`img-${events._id}`} className="card-img-top-detail" />
            )}
            <div className="card-body-detail">
              <h3 className="card-title-detail">{events.title}</h3>
              <p className="card-text-detail">
                <strong>Date and Time:</strong>{" "}
                {moment(events.date).format("dddd, Do MMMM YYYY, h:mm a")}
              </p>                
              <p className="card-text-detail"><strong>City:</strong> {events.city}</p>
              <p className="card-text-detail"><strong>Location:</strong> {events.location}</p>
              <p className="card-text-detail"><strong>Details:</strong> {events.details}</p>
              <p className="card-text-detail"><strong>Ticket Price: €</strong> {events.ticketPrice}</p>
              <p className="card-text-detail"><strong>Category:</strong> {events.categories}</p>
            </div>

            <div className="card-footer-detail">
  {user && user._id && <LetsGoButton eventId={eventId} userId={user._id} />}
  <button onClick={goToMap} className="map-button">Map</button>

  <BuyTicket/>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
