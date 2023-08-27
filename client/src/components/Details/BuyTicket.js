import React from 'react';
import { useNavigate } from "react-router-dom";

import "./BuyTicket.css"

function BuyTicket({eventId }) {
    const navigate = useNavigate();
    const label = "Buy Ticket";

    const handleRedirect = () => {
        navigate(`/tickets?eventId=${eventId }`);
    };

    return (
        <button className="buy-ticket-button" onClick={handleRedirect}>
            {label}
        </button>
    );
}

export default BuyTicket;
