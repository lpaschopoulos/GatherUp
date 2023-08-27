import React from 'react';
import { useNavigate } from "react-router-dom";

import "./BuyTicket.css"

function BuyTicket({eventTitle}) {
    const navigate = useNavigate();
    const label = "Buy Ticket";

    const handleRedirect = () => {
        navigate(`/tickets?eventTitle=${eventTitle}`);
    };

    return (
        <button className="buy-ticket-button" onClick={handleRedirect}>
            {label}
        </button>
    );
}

export default BuyTicket;
