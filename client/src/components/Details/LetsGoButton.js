import React, { useState, useEffect } from 'react'; 
import SimplePopup from '../SimplePopup/SimplePopup';
import axios from "axios";

function LetsGoButton({ eventId, userId }) {
    const [showPopup, setShowPopup] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null); 

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleLetsGoClick = async () => {
        console.log("Button clicked!"); // check if the function is being triggered
        try {
            const response = await axios.post(`http://localhost:3636/user/${userId}/attend/${eventId}`);
            console.log("Response:", response); // inspect the response
            // Display success message 
            setShowPopup(true);
            const idt = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            setTimeoutId(idt);
        } catch (error) {
            console.error("Error during axios call:", error); // detailed error logging
        }
    };
    
    

    return (
        <div>
            <button className="going-button" onClick={handleLetsGoClick}>
                Let's Go
            </button>

            <SimplePopup 
                show={showPopup} 
                onClose={() => setShowPopup(false)}
                message="Thats not breaking the law. Im there!" 
            />
        </div>
    );
}

export default LetsGoButton;
