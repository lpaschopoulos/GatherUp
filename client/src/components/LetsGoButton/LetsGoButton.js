import React, { useState, useEffect } from 'react';  // Remember to import useEffect
import Modal from '../Modal/Modal';

function LetsGoButton() {
    const [showModal, setShowModal] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);  // New state for timeout ID

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleLetsGoClick = () => {
        setShowModal(true);

        const id = setTimeout(() => {
            setShowModal(false);
        }, 3000);
        setTimeoutId(id);
    };

    return (
        <div>
            <button className="going-button" onClick={handleLetsGoClick}>
                Let's Go
            </button>

            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default LetsGoButton;
