import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import CardsProfile from "../CardsProfile/CardsProfile";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    _id: "",
    username: "",
    profileImage: "", // Add an empty string as a default value for profileImage
  });

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
  }, []);

  // Function to handle the "Create New Event" button click
  function handleCreateEvent() {
    // Add the logic to navigate to the "Create Event" page
    navigate("/create-event");
  }

  return (
    <div className="profile">
      <div className="top-left">
        {user.profileImage && ( // Check if user.profileImage exists before rendering the circle
          <div
            className={`circle${user.profileImage ? "" : " default-circle"}`}
            style={user.profileImage ? { backgroundImage: `url(${user.profileImage})` } : null}
          ></div>
        )}
        <div>
          <h1 className="username">Welcome back {user.username}</h1>
          <button className="create-event-btn" onClick={handleCreateEvent}>
            Create New Event
          </button>
        </div>
      </div>
      <div className="page-container">
        <CardsProfile />
      </div>
    </div>
  );
}

export default Profile;
