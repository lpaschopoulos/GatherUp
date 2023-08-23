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
  const [isChecked, setChecked] = useState(false);
  const handleToggle = () => setChecked(prevState => !prevState);


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
      <div className="page-container">
        <div className="user-info">
          <Username userInfo={user} isChecked={isChecked} onToggle={handleToggle} />
        </div>
        <div className="cards-profile-container">
          {user && (
            <div className="cards-profile-scroll">
              {isChecked ? <AttendingEventsList userId={user._id} /> : <CardsProfile userId={user._id} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
