const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const Event = require('../models/eventModel'); 

router.post('/payment/ticket', async (req, res) => {
    const {
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
        firstName,
        lastName,
        email,
        eventTitle,
        contactNumber,
        eventId,
        message
    } = req.body;

    // Validate the incoming data
    // ... your validation logic here

    // Process payment
    // ... your payment logic here

    try {
        // Send ticket via email
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
// Assuming EventModel is your Mongoose model
const event = await Event.findById(eventId, 'title ticketPrice'); // 'title ticketPrice' is optional but specifies only to fetch these fields

if (!event) {
  return res.status(404).json({ success: false, message: 'Event not found' });
}

const eventTitle = event.title;
const ticketPrice = event.ticketPrice;
console.log(eventTitle)


        let mailOptions = {
            from: 'yourEmail@gmail.com',
            to: email,
            subject: 'Your Ticket',
            html: `
            <div style="border: 2px solid black; padding: 20px; width: 400px; margin: auto;">
              <h1 style="text-align: center;">Your Ticket</h1>
              <hr />
              <div style="background-color: #f9f9f9; padding: 15px;">
                <p><strong>Event:</strong> ${eventTitle}</p>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Contact:</strong> ${contactNumber}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Price: €</strong> ${ticketPrice}</p>
                ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
                </div>
              <hr />
              <hr />
              <p style="text-align: center;">Thank you for your purchase!</p>
            </div>
          `
          
                // (cardHolderName ? `\nCardholder: ${cardHolderName}` : '') +
                // (cardNumber ? `\nPartial Card Number: **** **** **** ${String(cardNumber).slice(-4)}` : '') + // Only show the last 4 digits
                // (expiryDate ? `\nExpiry Date: ${expiryDate}` : '') +
                // (cvv ? `\nCVV: ***` : '') // Never include the actual CVV in any correspondence for security reasons
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true });
        return true;
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
        return false;
    }
});

module.exports = router;
