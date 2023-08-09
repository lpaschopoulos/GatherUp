import React from 'react';
import './Modal.css';

function Modal({ onClose }) {
    const handleBackdropClick = () => {
        onClose();
    };

    const handleModalContentClick = (event) => {
        event.stopPropagation();  // Prevents the click event from reaching the backdrop
    };

    return (
        <div className="modal" onClick={handleBackdropClick}>
            <div className="modal-content" onClick={handleModalContentClick}>
                <h2>Successfully Added!</h2>
                <p>That's not breaking the law. I'm there!</p>
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}


export default Modal;
