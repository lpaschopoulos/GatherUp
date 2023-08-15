import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import {UserContext} from "../../Context/context";
import { useParams } from "react-router-dom";
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
  const [eventsCount, setEventsCount] = useState(0);
  const [attendsCount, setAttendsCount] = useState(0);

  const [userImage, setUserImage] = useState(
    () => localStorage.getItem("userImage") || null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const handleGoToProfile = () => {
    navigate("/profile");
  };

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
        const response = await axios.post(
          "http://localhost:3636/uploads",
          formData
        );
        const imageUrl = response.data.secureUrl; // Get the secure URL of the uploaded image

        // Use the received image URL to update the user's profile picture
        // by making another POST request to the /profilePic route
        await axios.post("http://localhost:3636/profilePic", {
          userId: user._id, // Assuming the user object has a property '_id' that represents the user ID
          profilePic: imageUrl, // Pass the secure URL as the profilePic
        });

        // Update the userImage state with the received image URL
        setUserImage(imageUrl);
        console.log("Image URL set:", imageUrl);

        setUser((prevUser) => ({
          ...prevUser,
          profilePic: imageUrl,
        }));


      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const fetchEventsCount = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3636/events/user/${userId}`
      );
      const events = response.data;
      setEventsCount(events.length);
    } catch (error) {
      console.error("Error fetching events count:", error);
    }
  };


  const fetchAttendsCount = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3636/user/${userId}/attending`
      );
      const attends = response.data.events;
      console.log('Response from attending:', response.data);

      setAttendsCount(attends.length);
    } catch (error) {
      console.error("Error fetching attends count:", error);
    }
};


useEffect(() => {
  if (user) {
    setUsername(user.username);
    setEmail(user.email);
    setUserImage(user.profilePic);
  }
  // Fetch data for events and attends count
  const fetchData = async () => {
    try {
      await fetchEventsCount(userId);
      await fetchAttendsCount(userId);
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      setError(err.message || "An error occurred."); 
      setLoading(false);
    }
  };

  fetchData();
}, [user, userId]);


  const fileInputRef = useRef(null);

  const handleUpdateClick = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const updatedData = {
      userId: user._id,
    };

    if (username !== user?.username && username.trim() !== "") {
      //keeping the username to the input field and also be able to make changes
      updatedData.username = username;
    }
    if (email !== user?.email && email.trim() !== "") {
      updatedData.email = email;
    }
    if (password.trim() !== "") {
      // Only include this if the password is changed!
      updatedData.password = password;
    }

    try {
      const response = await axios.put(
        `http://localhost:3636/user/${user._id}`,
        updatedData,
        { headers }
      );

      if (response.status === 200) {
        console.log("User updated:", response.data);
        setUser(response.data); // Update the user in the context with the returned updated user
        setPassword(""); // Clear the password field
      } else {
        console.error(
          "Error updating user:",
          response.data.msg || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = async () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    // If the user does not confirm the delete action, simply return
    if (!isConfirmed) {
      return;
    }

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.delete(
        `http://localhost:3636/user/${user._id}`,
        {
          headers: headers,
          data: { userId: user._id }, // Sending userId in request body for backend check
        }
      );

      if (response.status === 200) {
        console.log("User deleted:", response.data);
        // Clear user from local context or state
        setUser(null);
        // Clear token
        localStorage.removeItem("token");
        // Redirect to login or home page
        window.location = "/login"; // Change this to your login or home route
      } else {
        console.error(
          "Error deleting user:",
          response.data.msg || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="user-card-container">
      <div className="user-card">
      <h3 className="user-name">{user?.username}</h3>

        <div className="user-image-container">
          {userImage ? (
            <img
              src={
                typeof userImage === "string"
                  ? userImage
                  : URL.createObjectURL(userImage)
              }
              alt="User image"
              className="user-image"
              onClick={handleImageClick} // Add click event to trigger the file input
            />
          ) : (
            <div
              className="default-user-image"
              onClick={handleImageClick} // Add click event to trigger the file input
            >
              <img
                src={defaultUserImage}
                alt="Default user image"
                className="user-image"
              />
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
              <p className="user-stat-value">{eventsCount}</p>
            </div>
             <div className="user-stat">
              <p className="user-stat-label">Events Attending</p>
              <p className="user-stat-value">{attendsCount}</p>
            </div>

          </div>
          <div className="user-buttons">
            <button className="user-button-profile" onClick={handleGoToProfile}>
              Go to Profile
            </button>
            <button className="user-button-update" onClick={handleUpdateClick}>
              Update
            </button>
            <button className="user-button-delete" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;