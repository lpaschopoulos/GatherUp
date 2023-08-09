import React from 'react';
import "./BuyTicket.css"

function BuyTicket() {
    const url = "https://www.example.com";
    const label = "Buy Ticket";

    const handleRedirect = () => {
        window.location.href = url;
    };

    return (
        <button className="buy-ticket-button" onClick={handleRedirect}>
            {label}
        </button>
    );
}

export default BuyTicket;
