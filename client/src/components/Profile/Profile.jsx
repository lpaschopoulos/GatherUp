import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardsProfile from "../CardsProfile/CardsProfile";
import Username from "../Username/Username";
import AttendingEventsList from "../AttendingList/AttendingList";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            setUser(data);
          } else {
            navigate("/login");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error verifying user:", error);
          navigate("/login");
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  
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
        <Username userInfo={user} />
      </div>
      <div className="page-container">
        {user && (
          <>
            <CardsProfile userId={user._id} />
            <AttendingEventsList userId={user._id} />
          </>
        )}
      </div>
    </div>
  );
        }

export default Profile;
