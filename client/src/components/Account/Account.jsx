import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";

function Account() {
  const [userImage, setUserImage] = useState(null);
  const [hasNewImage, setHasNewImage] = useState(false);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    // Set the userImage state only if a new image is selected
    if (imageFile) {
      setUserImage(URL.createObjectURL(imageFile));
      setHasNewImage(true);
  
      try {
        // Upload the image to the backend (e.g., using the axios.post method)
        // Replace "http://localhost:3636/upload-image" with the actual endpoint to upload the image on your backend
        const formData = new FormData();
        formData.append("image", imageFile);
  
        const response = await axios.post("http://localhost:3636/uploads", formData);
        const imageUrl = response.data.imageUrl; // Assuming the backend responds with the URL of the uploaded image
  
        // Use the received image URL directly and set it to the userImage state
        setUserImage(imageUrl);
  
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    // This function fetches the user's profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3636/user/{userId}");
        const { imageUrl } = response.data;
        setUserImage(imageUrl);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserProfile();
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
