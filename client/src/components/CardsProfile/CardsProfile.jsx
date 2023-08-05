import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DeleteButton from "../DeleteButton/DeleteButton";
import "./CardsProfile.scss";
import EditButton from "../EditButton/EditButton";

function CardsProfile() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          if (data._id) {
            setUser(data);
            getMyEvents(data._id);
          } else {
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  function getMyEvents(userId) {
    console.log("Fetching events for user:", userId); 
    axios.get("http://localhost:3636/events/user/" + userId).then(({ data }) => {
        console.log('Events data:', data);
        setEvents(data);
    }).catch((error) => {
        console.error("Error fetching events:", error);
    });
};


  const addNewEvent = (eventData) => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
  };

  return (
    <div className="page-container">
      <div className="container one">
        <h3 className="section-title">Your List of Events:</h3>
        <div className="card-grid">
          {events.map((event) => (
            <div key={event._id} className="card custom-card">
              {event.image && (
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
                <p className="card-text"><strong>Details:</strong> {event.description}</p>
                <p className="card-text"><strong>Ticket Price: €</strong> {event.ticketPrice}</p>
                <p className="card-text"><strong>Tags:</strong> {event.tags}</p>
              </div>
              <div className="card-footer">
                <DeleteButton/>
                <EditButton/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsProfile;