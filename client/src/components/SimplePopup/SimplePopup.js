import React from 'react';
import "./SimplePopup.css"

function SimplePopup({ show, onClose, message }) {
    if (!show) {
        return null;
    }

    return (
        <div className="simple-popup">
            <div className="simple-popup-content">
                <p>{message}</p>
                <button onClick={onClose} className='close-popup-button'>Close</button>
            </div>
        </div>
    );
}

export default SimplePopup;
