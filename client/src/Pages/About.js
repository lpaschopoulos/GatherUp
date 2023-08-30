import React from 'react';

const About = () => {
  const aboutContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'left',
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const sectionDescriptionStyle = {
    fontSize: '16px',
    marginBottom: '20px',
  };

  const listItemStyle = {
    fontSize: '14px',
    marginBottom: '8px',
  };

  return (
    <div style={aboutContainerStyle}>
      <h2 style={sectionTitleStyle}>About GatherUp</h2>
      <p style={sectionDescriptionStyle}>
        Welcome to GatherUp, your ultimate destination for discovering, sharing, and creating unforgettable events, festivals, and parties! With GatherUp, we've set out to revolutionize the way you plan and experience events, making it easier than ever to connect with the vibrant world of social gatherings around you.
      </p>
      <h3 style={sectionTitleStyle}>Our Mission</h3>
      <p style={sectionDescriptionStyle}>
        At GatherUp, our mission is to bring people together through the power of shared experiences. We believe that every event, no matter how big or small, has the potential to create lasting memories and forge new connections. Our platform is designed to empower event organizers and attendees alike, ensuring that every event is a seamless blend of excitement and enjoyment.
      </p>
      <h3 style={sectionTitleStyle}>What We Offer</h3>
      <ul style={sectionDescriptionStyle}>
        <li style={listItemStyle}>Event Creation and Management: Organizing an event has never been easier...</li>
        <li style={listItemStyle}>Discover Exciting Events: Looking for your next adventure? Browse through a diverse range of upcoming events right in your area...</li>
        <li style={listItemStyle}>Share and Connect: Share the magic of your events with the world...</li>
        <li style={listItemStyle}>Seamless RSVP and Ticketing: Say goodbye to complicated registration processes...</li>
        <li style={listItemStyle}>Engage and Communicate: Be part of a thriving event community...</li>
        <li style={listItemStyle}>Stay Informed: Never miss out on an event again...</li>
      </ul>
      <p style={sectionDescriptionStyle}>
        Connect with us and make every moment memorable, together. If you have any questions, suggestions, or feedback, don't hesitate to reach out to us. Let's keep gathering!
      </p>
    </div>
  );
};

export default About;
