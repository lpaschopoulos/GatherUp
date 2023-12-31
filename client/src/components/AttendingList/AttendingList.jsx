import axios from 'axios';
import React, { useState, useEffect } from "react";
import moment from "moment";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Link } from 'react-router-dom';

function AttendingEventsList({ userId }) {
    const [attendingEvents, setAttendingEvents] = useState([]);

    useEffect(() => {
        const fetchAttendingEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3636/user/${userId}/attending`);
                setAttendingEvents(response.data.events || []);
            } catch (error) {
                console.error(error.response?.data?.error || "Failed to fetch attending events");
            }
        };

        fetchAttendingEvents();
    }, [userId]);


    const unattendEvent = (eventId) => {
        const confirmUnattend = window.confirm("Do you really want to remove this event from your attending list?")
        if (confirmUnattend) {
            axios.delete(`http://localhost:3636/user/${userId}/attend/${eventId}`)
              .then(() => {
                // Remove the event from the attendingEvents state
                setAttendingEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId));
              })
              .catch((error) => {
                console.error("Error removing attendance:", error);
              });
        }
    };
    

    return (
        <div  className="page-container">
          <div className="container one">
            <h3 className="section-title"></h3>
            <div className="card-grid">
              {attendingEvents.map((event) => (
                event && <div key={event._id} className="card custom-card">
                          <Link to={`/events/${event._id}`}>

                  {typeof event.image === "string" && (
                    <img src={event.image} alt={`img-${event._id}`} className="card-img-top" />
                  )}
                  <div className="card-body">
                    <h3 className="card-title">{event.title}</h3>
                    <p className="card-text">
                      <strong>Date and Time:</strong>{" "}
                      {moment(event.date).format("dddd, Do MMMM YYYY, h:mm a")}
                    </p>                
                    <p className="card-text"><strong>City:</strong> {event.city}</p>
                    <p className="card-text"><strong>Location:</strong> {event.location}</p>
                    <p className="card-text-today">
                    <strong>Details:</strong>{" "}
                    {event.details.length > 100
                      ? `${event.details.substring(0, 100)}... `
                      : event.details}
                  </p>                    <p className="card-text"><strong>Ticket Price: €</strong> {event.ticketPrice}</p>
                    <p className="card-text-detail"><strong>Category:</strong> {event.categories}</p>
                  </div>
                  </Link>

                  <div className="card-footer">
                  <DeleteButton onDelete={()=>unattendEvent(event._id)}/>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}
export default AttendingEventsList;