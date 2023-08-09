import React from "react";
import moment from "moment";
import "./ThisWeek.css"; // Import your CSS styles with -week suffix
import LetsGoButton from "../Details/LetsGoButton";


function ThisWeek({ events }) {


    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
  
    const thisMonthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= endOfMonth;
    });
    return (
        <div className="page-container-week">
            <div className="container-week one-week">
                <div className="card-grid-week">
                    {thisMonthEvents.map((event) => (
                        <div key={event._id} class="myCard">
                            <div class="innerCard">
                                <div class="frontSide">
                                    {typeof event.image === "string" && (
                                        <img src={event.image} alt={`img-${event._id}`} className="card-img-top-week" />
                                    )}
                                    <p>{moment(event.date).format("dddd, D MMMM YYYY")}</p>
                                    <p>{event.city}</p>
                                </div>
                                <div class="backSide">
                                    <p class="title">{event.title}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>Ticket Price: €</strong> {event.ticketPrice}</p>
                                    <div className="card-footer-week">
                                        <button className="details-button">Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
}

export default ThisWeek;
