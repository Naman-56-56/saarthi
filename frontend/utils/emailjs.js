// utils/emailjs.js
import emailjs from 'emailjs-com';

/**
 * Send email using EmailJS from frontend
 * @param {string} to_email - Recipient email address
 * @param {string} otp - OTP code
 * @returns {Promise}
 */
export function sendOtpEmail(email, passcode, time) {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    {
      email,
      passcode,
      time
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
}
