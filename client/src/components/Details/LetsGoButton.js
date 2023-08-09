import React, { useState, useEffect } from 'react'; 
import SimplePopup from '../SimplePopup/SimplePopup';

function LetsGoButton() {
    const [showPopup, setShowPopup] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null); 

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleLetsGoClick = () => {
        setShowPopup(true);

        const idt = setTimeout(() => {
            setShowPopup(false);
        }, 3000);
        setTimeoutId(idt);
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
