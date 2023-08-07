import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../../Context/context"
import { useParams } from 'react-router-dom';

import "./Account.css";

function Account() {

  const { userId } = useParams();


  const { user, setUser } = useContext(UserContext);
  const [userImage, setUserImage] = useState(null);
  const [hasNewImage, setHasNewImage] = useState(false);
  console.log("User from context:", user);


  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    // Set the userImage state only if a new image is selected
    if (imageFile) {
      setUserImage(URL.createObjectURL(imageFile));
      setHasNewImage(true);
  
      try {
        // Upload the image to the backend using the axios.post method
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("userId", user._id);  // Assuming the user object has a property '_id' that represents the user ID
        
        const response = await axios.post("http://localhost:3636/profilePic", formData);
        const imageUrl = response.data.secureUrl;  // Assuming the backend responds with the secure URL of the uploaded image under the 'secureUrl' property
  
        // Use the received image URL directly and set it to the userImage state
        setUserImage(imageUrl);
  
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };


  useEffect(() => {
    // Replace 'userId' with the actual user ID
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3636/user/${userId}`);
        setUser(response.data.user);
        setUserImage(response.data.user.profilePic);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData('userId');  // Pass the correct userId here
  }, []);

  return (
    <div className="user-card-container">
      <div className="user-card">
        <div className="user-image-container">
          {userImage && (
            <img
              src={typeof userImage === "string" ? userImage : URL.createObjectURL(userImage)}
              alt="User image"
              className="user-image"
            />
          )}
          <input
            type="file"
            onChange={handleImageUpload}
            className="user-image-upload"
          />
        </div>
        <div className="user-details">
          <h3 className="user-name">Danny McLoan</h3>
          <p className="user-role">Senior Journalist</p>

          <div className="user-stats-container">
            <div className="user-stat">
              <p className="user-stat-label">Events Created</p>
              <p className="user-stat-value">41</p>
            </div>
            <div className="user-stat">
              <p className="user-stat-label">Followers</p>
              <p className="user-stat-value">976</p>
            </div>
            <div className="user-stat">
              <p className="user-stat-label">Rating</p>
              <p className="user-stat-value">8.5</p>
            </div>
          </div>
          <div className="user-buttons">
            <button className="user-button">Chat</button>
            <button className="user-button">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
