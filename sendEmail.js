const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'janvimehta3103@gmail.com',
        pass: 'cujcfrxivapdmtfy'
    }
});

// Function to send an email
const sendEmail = (to, subject, text, html) => {
    // Define the email options
    const mailOptions = {
        from: 'janvimehta3103@gmail.com', // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html // HTML body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Email sent: ' + info.response);
    });
};

// Export the sendEmail function
module.exports = sendEmail;
