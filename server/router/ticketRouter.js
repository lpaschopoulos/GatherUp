const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/payment/ticket', async (req, res) => {
    const {
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
        firstName,
        lastName,
        email,
        contactNumber,
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

        let mailOptions = {
            from: 'yourEmail@gmail.com',
            to: email,
            subject: 'Your Ticket',
            text: `Hi ${firstName} ${lastName}, here is your ticket.` +
                (cardHolderName ? `\nCardholder: ${cardHolderName}` : '') +
                (cardNumber ? `\nPartial Card Number: **** **** **** ${String(cardNumber).slice(-4)}` : '') + // Only show the last 4 digits
                (expiryDate ? `\nExpiry Date: ${expiryDate}` : '') +
                (cvv ? `\nCVV: ***` : '') // Never include the actual CVV in any correspondence for security reasons
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
