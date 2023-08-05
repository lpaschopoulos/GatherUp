
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat';
import CardsProfile from "../CardsProfile/CardsProfile";
import "./Profile.css";

function Profile() {
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
        })
        .catch((error) => {
          console.error("Error verifying user:", error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  function getMyEvents(userId) {
    console.log("Fetching events for user:", userId);
    axios
      .get("http://localhost:3636/events/user/" + userId)
      .then(({ data }) => {
        console.log('Events data:', data);
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }

  const handleCreateEvent = () => {
    console.log("Button clicked!");
    // Add the logic to navigate to the "Create Event" page
    navigate(`/create/${user._id}`);
  };

  const handleAddNewEvent = (eventData) => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
  };

  return (
    <div className="profile">
      <div className="circle-container">
        {user?.profileImage && (
          <div
            className={`circle${user.profileImage ? "" : " default-circle"}`}
            style={
              user.profileImage
                ? { backgroundImage: `url(${user.profileImage})` }
                : null
            }
          ></div>
        )}
      </div>
      <div className="user-info">
        <h1 className="username">Welcome back {user?.username}</h1>
        <button className="create-event-btn" onClick={handleCreateEvent}>
          Create New Event
        </button>
      </div>
      <div className="page-container">
        <CardsProfile events={events} addNewEvent={handleAddNewEvent} />
      </div>
    </div>
  );
}

export default Profile;
