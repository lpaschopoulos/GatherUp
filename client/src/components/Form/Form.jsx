import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import { useParams } from "react-router-dom";
import "./Form.css";

function Form({ addNewEvent }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { eventId } = useParams();
  const { userId } = useParams();
  console.log("userId:", userId);
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventLocation, setEventLocation] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [previousEventImage, setPreviousEventImage] = useState(null);
  const [hasNewImage, setHasNewImage] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3636/categories");
      setCategories(response.data);
      console.log("Fetched Categories:", response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    // Set the eventImage state only if a new image is selected
    if (imageFile) {
      setEventImage(imageFile);
      setHasNewImage(true);
    }
  };

  useEffect(() => {
    if (eventId) {
      // If eventId is present, we're in editing mode
      // Fetch the event data and populate the form fields
      axios
        .get(`http://localhost:3636/events/${eventId}`)
        .then(({ data }) => {
          setEventName(data.title);
          setEventDate(data.date);
          setEventLocation(data.location);
          setEventCity(data.city);
          setTicketPrice(data.ticketPrice);
          setEventDescription(data.details);
          setEventImage(data.image);
          setPreviousEventImage(data.image);
          setHasNewImage(false);
          setSelectedCategory(data.categories)
        })
        .catch((error) => {
          console.error("Error fetching event data:", error);
        });
    }
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasNewImage) {
      // If a new image is selected, proceed with image upload and form submission

      if (eventImage) {
        // Image is uploaded, proceed with form submission and image upload
        const formData = new FormData();
        formData.append("image", eventImage);

        try {
          // Upload the image to Cloudinary or your desired server
          const response = await axios.post(
            "http://localhost:3636/uploads",
            formData
          );
          const secureUrl = response.data.secureUrl;

          // Create the event data object
          const eventData = {
            title: eventName,
            date: eventDate,
            location: eventLocation,
            city: eventCity,
            ticketPrice,
            details: eventDescription,
            image: secureUrl,
            userId: userId,
            category: selectedCategory,
          };
          console.log("Event Data:", eventData);
          if (eventId) {
            // If eventId is present, we're in editing mode
            // Send a PUT or PATCH request to update the event
            await axios.put(
              `http://localhost:3636/events/${eventId}`,
              eventData
            );
          } else {
            // Create the event on the server
            await axios.post("http://localhost:3636/events", eventData);
          }

          // Reset form fields after successful event creation
          setEventName("");
          setEventDate("");
          setEventLocation("");
          setEventCity("");
          setTicketPrice("");
          setEventDescription("");
          setEventImage(null);
          setHasNewImage(false); // Reset hasNewImage state after submission
          setSelectedCategory("");

          // Navigate to the profile page or any other desired location after successful creation
          navigate("/profile");
        } catch (error) {
          console.error(
            "Error uploading image or adding/editing event:",
            error
          );
        }
      } else {
        // Image is not uploaded, show an error or handle it as needed
        console.error("Image is required.");
      }
    } else {
      // If no new image is selected, proceed with form submission without image upload

      // Create the event data object
      const eventData = {
        title: eventName,
        date: eventDate,
        location: eventLocation,
        city: eventCity,
        ticketPrice,
        details: eventDescription,
        image: previousEventImage, // Use the previous image URL for the event data
        userId: userId,
        category: selectedCategory,

      };

      try {
        if (eventId) {
          // If eventId is present, we're in editing mode
          // Send a PUT or PATCH request to update the event
          await axios.put(`http://localhost:3636/events/${eventId}`, eventData);
        } else {
          // Create the event on the server
          await axios.post("http://localhost:3636/events", eventData);
        }

        // Reset form fields after successful event creation
        setEventName("");
        setEventDate("");
        setEventLocation("");
        setEventCity("");
        setTicketPrice("");
        setEventDescription("");
        setEventImage(null);
        setHasNewImage(false); // Reset hasNewImage state after submission
        setSelectedCategory("");

        // Navigate to the profile page or any other desired location after successful creation
        navigate("/profile");
      } catch (error) {
        console.error("Error adding/editing event:", error);
      }
    }
  };

  const formattedEventDate = (dateString) => {
    const date = new Date(dateString);
    const offsetInMinutes = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offsetInMinutes * 60000);

    // Add 3 hours to the adjustedDate
    adjustedDate.setHours(adjustedDate.getHours() - 3);

    // Convert the adjustedDate to the format "YYYY-MM-DDTHH:mm"
    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
    const day = String(adjustedDate.getDate()).padStart(2, "0");
    const hours = String(adjustedDate.getHours()).padStart(2, "0");
    const minutes = String(adjustedDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="formContainer">
      <div className="containerContent">
        <div id="formTitle">
          <h1>Create New Event</h1>
        </div>
        <form id="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="formInput-group">
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter Event Name"
            />
          </div>

          <div className="formInput-group">
            <label>Event Date and Time</label>
            <input
              type="datetime-local"
              value={formattedEventDate(eventDate)}
              onChange={(e) => setEventDate(e.target.value)}
              lang="en"
            />
          </div>

          <div className="formInput-group">
            <label>Event Location</label>
            <input
              type="text"
              name="eventLocation"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Enter Event Location"
            />
          </div>

          <div className="formInput-group">
            <label>Event City</label>
            <input
              type="text"
              name="eventCity"
              value={eventCity}
              onChange={(e) => setEventCity(e.target.value)}
              placeholder="Enter Event City"
            />
          </div>

          <div className="formInput-group">
            <label>Ticket Price ( € )</label>
            <input
              type="text"
              name="ticketPrice"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder="Enter Ticket Price"
            />
          </div>

          <div className="formInput-group description">
            <label>Event Description</label>
            <textarea
              name="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Enter Event Description"
              rows="4"
            />
          </div>

            <div className="formInput-group">
              <label>Category</label>
              <select
  name="eventCategory"
  value={selectedCategory}
  onChange={(e) =>

   setSelectedCategory(e.target.value)}
>
  <option value="">Select a Category</option>
  {categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
            </div>


          <div className="formInput-group">
            <label>Upload Image</label>
            <input type="file" name="eventImage" onChange={handleImageUpload} />
          </div>

          {eventImage && (
            <img
              className="uploadedImage"
              src={
                typeof eventImage === "string"
                  ? eventImage
                  : URL.createObjectURL(eventImage)
              }
              alt="Uploaded Event"
            />
          )}

          <div className="submitBtn-wrap">
            <button id="submitButton" type="submit">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;