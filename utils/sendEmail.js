const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, // Sender's email address
      pass: process.env.EMAIL_PASSWORD, // Sender's email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender's email address
    to: options.email, // Recipient's email address
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.email}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email');
  }
};

module.exports = sendEmail;
