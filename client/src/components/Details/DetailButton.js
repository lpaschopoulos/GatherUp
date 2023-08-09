import React from 'react';
import { useNavigate } from 'react-router-dom';

function DetailButton({ event, onClick }) {
    const navigate = useNavigate();
  
    const handleDetailClick = () => {
      if(onClick) {
        onClick(event);
      }
      navigate(`/events/${event._id}`);
    };
  
    return (
      <button className="details-button" onClick={handleDetailClick}>
        Details
      </button>
    );
  }
  

export default DetailButton;
