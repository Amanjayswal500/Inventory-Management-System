const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Helper function to send a password reset email.
 * @param {string} email - The recipient's email address.
 * @param {string} token - The password reset token.
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if the email could not be sent.
 */
async function sendPasswordResetEmail(email, token) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Link',
    text: `Use this link to reset your password: http://localhost:3000/reset?token=${token}`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Error sending password reset email');
  }
}

/**
 * Helper function to send a registration confirmation email.
 * @param {string} email - The recipient's email address.
 * @param {string} confirmEmailToken - The email confirmation token.
 * @param {string} firstName - The recipient's first name.
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if the email could not be sent.
 */
async function sendRegistrationEmail(email, confirmEmailToken, firstName) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Confirmation',
    html: `
      <p>Dear ${firstName},</p>
      <p>Thank you for registering with us. Please click the following link to confirm your email and complete the registration process:</p>
      <p><a href="http://localhost:3000/confirm-email?token=${confirmEmailToken}"><b>Confirm Email</b></a></p>
      <p>If you didn't register with us, you can safely ignore this email.</p>
      <p>If you already have an account, you can <a href="http://localhost:3000/login"><b>login here</b></a>.</p>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw new Error('Error sending registration email');
  }
}

module.exports = { sendPasswordResetEmail, sendRegistrationEmail };
