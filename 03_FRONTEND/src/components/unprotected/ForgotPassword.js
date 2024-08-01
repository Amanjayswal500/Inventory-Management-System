// external dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataUnprotected } from "../../utilities/apputils";


// internal dependencies
import { validateEmail } from "../../utilities/validators";

/** React component, representing the Forgot Password view of the application
 */
const ForgotPassword = () => {
  // declaring the state variables
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  /** This is a helper function to clear all the errors on the UI screen
   */
  const clearErrors = () => {
    setEmailError("");
  };

  /** Helper function to validate the input sent by the user
   *
   * @returns {Boolean} true if validation is success, false otherwise
   */
  const validateForm = () => {
    let isValid = true;

    // Clear previous error messages
    clearErrors();

    let result = null;

    // validating email
    result = validateEmail(email);
    if (result !== null) {
      isValid = false;
      setEmailError(result.message);
    }

    return isValid;
  };

  /** Event handler for doing the user submit click
   * @param {*} event
   */
  const emailVerification = async (event) => {
    // do not propagate the event
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    // validation was successful, attempting to make a call to the backend

    try {
      const method = "post";
      await fetchDataUnprotected(
        method,
        `users/forget-password`,
        { email: email }
      );
      // Reset Password link Sent successfull
      alert("Reset Link sent successfully, Please check you mail");
    } catch (error) {
      let response = error.response;
      if (response) {

        if (response.status === 422) {
          // 422 when validation failure happens,
          console.error("Validation failure: ", response.data.errors);
          setErrorMessage("Validation failure: ", response.data.errors);
        } else if (response.status === 500) {
          // 500 when unknown error occurs
          console.error("Internal Server Error", response.data.errors);
          setErrorMessage("Internal Server Error", response.data.errors);
        } else if (response.status === 404) {
          console.error("User Not Found", response.data.errors);
          setErrorMessage("User Not Found", response.data.errors);
        } else {
          // UNKOWN CASE
          console.error("CRAZY STUFF", response.data.errors);
          setErrorMessage("CRAZY STUFF", response.data.errors);
        }
      } else {
        setErrorMessage("Internal Server Error");
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Forgot Password</h1>

        <form id="form">
          <div style={{ fontSize: "12px", color: "red" }}>{errorMessage}</div>
          <div className="input-control">
            <div style={{ fontSize: "15px", color: "red" }}>{emailError}</div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          <input
            className="submit-button"
            type="button"
            value="Reset Password"
            onClick={emailVerification}
          />
          <div className="links" style={{ clear: "both", textAlign: "center" }}>
            <p>
              Already have an account ? <Link to="/signin">Sign In</Link>
            </p>
            <p>
              Don't have an account yet?
              <Link to="/signup">Create account</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
