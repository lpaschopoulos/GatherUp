import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import CardsProfile from "../CardsProfile/CardsProfile";

function Profile() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    profileImage: "", // Add an empty string as a default value for profileImage
  });

  function handleCreateEvent() {
    console.log("Button clicked!");
    // Add the logic to navigate to the "Create Event" page
    navigate("/create");
  }

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
          } else {
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="profile">
      <div className="circle-container">
        {user.profileImage && ( // Check if user.profileImage exists before rendering the circle
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
        <h1 className="username">Welcome back {user.username}</h1>
        <button className="create-event-btn" onClick={handleCreateEvent}>
          Create New Event
        </button>
      </div>
      <div className="page-container">
        <CardsProfile />
      </div>
    </div>
  );
}

export default Profile;
