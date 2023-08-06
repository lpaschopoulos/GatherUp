import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardsProfile from "../CardsProfile/CardsProfile";
import Username from "../Username/Username";
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
          if (data._id) {
            setUser(data);
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
      <Username userInfo={user}/>
      </div>
      <div className="page-container">
      <CardsProfile userId={user?._id} />
      </div>
    </div>
  );
}

export default Profile;
