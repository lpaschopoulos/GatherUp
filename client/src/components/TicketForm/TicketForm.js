import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import "./TicketForm.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const eventId = queryParams.get('eventId');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    if (isSubmitted) {
      formRef.current.reset();
      setIsSubmitted(false);
      navigate('/');
    }
  }, [isSubmitted]);
  const handleSubmitPay = async (event) => {
    console.log("Form submitted");
    event.preventDefault();

    const ticketData = {
      // cardHolderName: event.target['cardholder-name'].value,
      // cardNumber: event.target['card-number'].value,
      // expiryDate: event.target['expiry-date'].value,
      // cvv: event.target['cvv'].value,
      eventId:eventId,
      firstName: event.target["first-name"].value,
      lastName: event.target["last-name"].value,
      email: event.target["email"].value,
      contactNumber: event.target["contact-number"].value,
      // message: event.target["message"].value,
    };

    try {
      const response = await axios.post(
        'http://localhost:3636/payment/ticket',
        ticketData
      );
      if (response.data.success) {
        alert('Ticket sent successfully');
        setIsSubmitted(true);
      } else {
        alert('Failed to send ticket');
      }
    } catch (error) {
      alert('An error occurred while processing your request');
    }

    if (isSubmitted) {
      formRef.current.reset();
      setIsSubmitted(false);
    }
  };
  return (
    <div className="form-container">
      <div className="modal-pay">
        <form className="form-pay" onSubmit={handleSubmitPay} ref={formRef}>
          {/* <div className="payment--options-pay">
                        <button name="paypal" type="button">
                        </button>
                        <button name="apple-pay" type="button">
                        </button>
                        <button name="google-pay" type="button">
                        </button>
                    </div>
                    <div className="separator-pay">
                        <hr className="line-pay" />
                        <p>or pay using credit card</p>
                        <hr className="line-pay" />
                    </div> */}
          <div className="credit-card-info--form-pay">
            <div className="input_container-pay">
              <label htmlFor="cardholder_name" className="input_label-pay">
                Card holder full name
              </label>
              <input
                id="cardholder_name"
                className="input_field-pay"
                type="text"
                name="cardholder-name"
                placeholder="Enter your full name"
              />
            </div>
            <div className="input_container-pay">
              <label htmlFor="card_number" className="input_label-pay">
                Card Number
              </label>
              <input
                id="card_number"
                className="input_field-pay"
                type="number"
                name="card-number"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="input_container-pay">
              <label htmlFor="expiry_date" className="input_label-pay">
                Expiry Date / CVV
              </label>

              <div className="split-pay">
                <input
                  id="expiry_date"
                  className="input_field-pay"
                  type="text"
                  name="expiry-date"
                  placeholder="01/23"
                />
                <input
                  id="cvv"
                  className="input_field-pay"
                  type="number"
                  name="cvv"
                  placeholder="CVV"
                />
              </div>
              <hr className="line-pay" />
              <p>Credentials on the ticket</p>
              <div className="form-tickets">
                <div className="flex-tickets">
                  <label>
                    <input
                      className="input-tickets"
                      type="text"
                      name="first-name"
                      placeholder=""
                      required
                    />
                    <span>First Name</span>
                  </label>
                  <label>
                    <input
                      className="input-tickets"
                      type="text"
                      name="last-name"
                      placeholder=""
                      required
                    />
                    <span>Last Name</span>
                  </label>
                </div>
                <label>
                  <input
                    className="input-tickets"
                    type="email"
                    name="email"
                    placeholder=""
                    required
                  />
                  <span>email</span>
                </label>
                <label>
                  <input
                    className="input-tickets"
                    type="tel"
                    name="contact-number"
                    placeholder=""
                    required
                  />
                  <span>contact number</span>
                </label>
                {/* <label>
                  <textarea
                    className="input01-tickets"
                    name="message"
                    placeholder=""
                    rows="3"
                  ></textarea>
                  <span>message</span>
                </label> */}
              </div>
            </div>
          </div>
          <button type="submit" className="purchase--btn-pay">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;