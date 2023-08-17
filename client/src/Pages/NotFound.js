import React from "react";
import notfoundimage from "../assets/images/GatherUpLogo-removebg.png";

const centerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "70vh", // This will center the content vertically
};
const imageStyles = {
  width: "200px", // Adjust the width as needed
};

function NotFound() {
  return (
    <div className="not-found" style={centerStyles}>
      <a href="/">
      <img src={notfoundimage}  alt="NotFound" style={imageStyles} />
      </a>
      <h1>Oops! Something's Missing...</h1>
      <h2>404 PAGE NOT FOUND</h2>
      <p>We searched high and low, but couldn't find the page you're looking for.</p>
      <a href="/">Let's Get Back on Track</a>
    </div>
  );
}

export default NotFound;
