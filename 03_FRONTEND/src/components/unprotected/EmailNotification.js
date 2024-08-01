import React from 'react';
import { Link } from 'react-router-dom';

// EmailNotification component to remind the user to check their email
const EmailNotification = () => {
  return (
    <div className="email-container">
      {/* Heading to indicate the user hasn't checked their email */}
      <h2>Ooops! It seems like you haven't checked your Email</h2>
      <p>To access your account, please take a moment to check your Email.</p>
      <p>If you didn't receive an email, please go through the following points:</p>

      {/* List of steps to ensure the user receives the email */}
      <ul className="flex-vertically">
        <li>
          <b>Complete Form:</b> Ensure all required fields are filled out accurately.
        </li>
        <li>
          <b>Verify Email:</b> Check your inbox for a verification email and click the link provided.
        </li>
        <li>
          <b>Agree to Terms:</b> Review and accept our terms and conditions.
        </li>
        <li>
          <b>Need Assistance?:</b> Don't hesitate to reach out to our support team if you need help.
        </li>
      </ul>
      <p>Thank you for choosing us. We look forward to having you fully onboarded!</p>

      {/* Button to navigate the user to the SignUp page */}
      <Link to="/SignUp">
        <button type="submit" className="button-email-notification">
          Complete Your Registration
        </button>
      </Link>
    </div>
  );
};

export default EmailNotification;
