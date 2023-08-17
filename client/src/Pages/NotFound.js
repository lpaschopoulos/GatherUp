import React from "react";
import emoji from "../assets/images/GatherUpLogo.jpg";

function NotFound() {
  return ( 
    <div className="error">
      <img src={emoji} alt="emoji" />
      <h1>OOPS!</h1>
      <h2>404 PAGE NOT FOUND.</h2>
      <p>Sorry, the page you are looking for does not exist or the link is broken.</p>
      <a href="/">Go to Homepage</a>
    </div>
   );
}

export default NotFound;