import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'; // <-- useContext was missing in the import
import { useParams } from 'react-router-dom';
import moment from 'moment';
import LetsGoButton from "./LetsGoButton";
import UserContext from '../../Context/context';

import "./EventDetail.css"
import BuyTicket from './BuyTicket';

function EventDetail() {
  const { user } = useContext(UserContext);

  const { eventId } = useParams();
  const [events, setEvents] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3636/events/${eventId}`);
        setEvents(response.data); 
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchData();
  }, [eventId]);

  if (!events) {
    return <div>Loading...</div>;
  }

  if (!user || !user._id) {
    return <div>Please login to view details.</div>;
  }

  const userId = user._id;

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
              <LetsGoButton eventId={eventId} userId={userId} />
              <BuyTicket/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
