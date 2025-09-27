// mail.js - Node.js email sender using nodemailer

const nodemailer = require('nodemailer');

// Configure transporter for SendGrid (recommended for free tier)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // This is literally the string 'apikey'
    pass: process.env.SENDGRID_API_KEY // Store your SendGrid API key in .env
  }
});

/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} html - HTML body (optional)
 */
async function sendMail({ to, subject, text, html }) {
  const mailOptions = {
    from: process.env.DEFAULT_FROM_EMAIL || 'your_verified_sender@example.com',
    to,
    subject,
    text,
    html
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
