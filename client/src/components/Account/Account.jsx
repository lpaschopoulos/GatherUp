import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import UserContext from "../../Context/context"
import { useParams } from 'react-router-dom';
import defaultUserImage from "../../assets/images/default-user-icon.jpg";
import { useNavigate } from "react-router-dom";

import "./Account.css";

function Account() {
  const { user, setUser } = useContext(UserContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [changes, setChanges] = useState({});

  
 
  const [userImage, setUserImage] = useState(() => localStorage.getItem("userImage") || null);
  const [loading, setLoading] = useState(true);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const [hasNewImage, setHasNewImage] = useState(false);
  console.log("User from context:", user);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simulate a click on the file input
    }
  };
  const handleGoToProfile= ()=>{
    navigate("/profile")
  }

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
  
        // Upload the image to Cloudinary using the /uploads route
        const response = await axios.post("http://localhost:3636/uploads", formData);
        const imageUrl = response.data.secureUrl; // Get the secure URL of the uploaded image
  
        // Use the received image URL to update the user's profile picture
        // by making another POST request to the /profilePic route
        await axios.post("http://localhost:3636/profilePic", {
          userId: user._id, // Assuming the user object has a property '_id' that represents the user ID
          profilePic: imageUrl, // Pass the secure URL as the profilePic
        });
  
        // Update the userImage state with the received image URL
        setUserImage(imageUrl);
        console.log('Image URL set:', imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  


  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3636/user/${userId}`);
        setUser(response.data.user);
        setUserImage(response.data.user.profilePic);
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);  // Also set loading to false on error for good UX
      }
    };
    if (user && user.profilePic) {
      setUserImage(user.profilePic);
   }
    
    fetchUserData(userId);
    console.log("Fetched user data:", user);

  }, [user]);

  const fileInputRef = useRef(null);

  const handleUpdateClick = async () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const updatedData = {
        userId: user._id
    };

    if (username !== user?.username && username.trim() !== "") {
        updatedData.username = username;
    }
    if (email !== user?.email && email.trim() !== "") {
        updatedData.email = email;
    }
    if (password.trim() !== "") {  // Only include this if the password is changed!
        updatedData.password = password; 
    }

    try {
        const response = await axios.put(`http://localhost:3636/user/${user._id}`, updatedData, { headers }); 

        if (response.status === 200) {
            console.log('User updated:', response.data);
            setUser(response.data);  // Update the user in the context with the returned updated user
            setPassword(""); // Clear the password field

        } else {
            console.error('Error updating user:', response.data.msg || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
  return (
    <div className="user-card-container">
      <div className="user-card">
        <div className="user-image-container">
          {userImage ? (
            <img
              src={typeof userImage === "string" ? userImage : URL.createObjectURL(userImage)}
              alt="User image"
              className="user-image"
              onClick={handleImageClick} // Add click event to trigger the file input
            />
          ) : (
            <div
              className="default-user-image"
              onClick={handleImageClick} // Add click event to trigger the file input
            >
              <img src={defaultUserImage} alt="Default user image" className="user-image" />
              {/*<span className="upload-text">Change Profile Picture</span>*/}
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="user-image-upload"
          />
        </div>
        <div className="user-details">
          <h3 className="user-name">{user?.username}</h3>
          <div className="user-inputs">
          <input
  type="text"
  placeholder="Username"
  className="user-input"
  value={username}
  onChange={handleUsernameChange}
/>
<input
  type="email"
  placeholder="Email"
  className="user-input"
  value={email}
  onChange={handleEmailChange}
/>
<input
  type="password"
  placeholder="Enter new password if you want to change it"
  className="user-input"
  value={password}
  onChange={handlePasswordChange}
/>
        </div>

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
            <button className="user-button-profile"onClick={handleGoToProfile}>Go to Profile</button>
            <button className="user-button-update" onClick={handleUpdateClick}>Update</button>
            <button className="user-button-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
