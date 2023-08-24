import React, { useState, useEffect } from "react";
import axios from "axios";
import ThisMonth from "../../components/ThisMonth/ThisMonth";
import ComingSoon from "../../components/ComingSoon/ComingSoon";
import CityEvents from "../../components/CityEvents/CityEvents";
import Search from "../../components/Search/Search";
import Carousel from "../../components/Carousel/Carousel";

import "./HomePage.scss"
function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3636/events/")  // Replace with your actual API endpoint
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);



  return (    
  
  <div className="section">
  <div className="search-input">
    <Search/>
  </div>

  <div className="custom-section">
<Carousel/>
  </div>
      
      <div className="section-month">
        <h2>What's Hot</h2>
        
        <ul>
          <ThisMonth events={events} />
        </ul>
      </div>

      <div className="section-soon">
        <h2>Coming Soon</h2>
        <ul>
        <ComingSoon events={events}/>
        </ul>
      </div>

<div className="section-city">
  <h2>Only in the City</h2>
  <ul>
  <CityEvents events={events}/>
  </ul>
</div>
</div>
  );
}

export default HomePage;
