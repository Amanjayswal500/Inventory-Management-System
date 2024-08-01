// external dependencies
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataUnprotected } from "../../utilities/apputils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; import LoadingSpinner from './Loader';

// Internal dependencies
import { validateEmail, validatePassword } from "../../utilities/validators";

/** React component, representing the Sign-in view of the application
 */
function SignIn() {
  const navigate = useNavigate();
  // declaring the state variables
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  /** This is a helper function to clear all the errors on the UI screen
   */
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
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

    // validating the password
    result = validatePassword(password);
    if (result !== null) {
      isValid = false;
      setPasswordError(result.message);
    }

    return isValid;
  };

  /** Event handler for doing the user submit click
   * @param {*} event
   */
  const onLogin = async (event) => {
    // do not propagate the event
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // validation was successful, attempting to make a call to the backend

    try {
      const method = "post";
      const response = await fetchDataUnprotected(method, `users/login`, {
        email: email,
        password: password,
      });
      // Store token and user data in localStorage
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // const role = jwtDecode(response.data.token).user.roles;
      // take refrence of this how to get role form local storage
      const role = JSON.parse(localStorage.getItem("user")).role;

      if (role === 0) {
        navigate("/dashboard", { replace: true });
      } else if (role === 1) {
        navigate("/admin_dashboard", { replace: true });
      }
    } catch (error) {
      let response = error.response;
      if (response) {
        if (response.status === 422) {
          console.error("Validation failure: ", response.data.errors);
          setErrorMessage("Validation failure: ", response.data.errors);
        } else if (response.status === 401) {
          console.error("Incomplete verification", response.data.errors);
          setErrorMessage("Incomplete verification", response.data.errors);
        } else if (response.status === 403) {
          console.error("Invalid email or password", response.data.errors);
          setErrorMessage("Invalid email or password", response.data.errors);
        } else if (response.status === 500) {
          console.error("Internal Server Error", response.data.errors);
          setErrorMessage("Internal Server Error", response.data.errors);
        } else {
          console.error("Backend not working");
          setErrorMessage("Internal Server Error");
        }
      } else {
        setErrorMessage("Internal Server Error");
      }
    }
    finally {
      setLoading(false); // Hide loader after the process is complete
    }
  };

  return (
    <>
      <div className="container">
        <h1>Sign In</h1>
        <p>Explore this app as a test user:</p>
        {loading ? ( // Show loader if loading state is true
          <LoadingSpinner />
        ) : (
          <form id="form" action="/">
            <div className="errorMessage" >{errorMessage}</div>
            <div className="input-control">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="on"
              />
              <div id="emailError" className="error_sign_up">
                {emailError}
              </div>
            </div>
            <div className="input-control-password" >
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={passwordType}
              />
              <span className="eye-icon-signIn"
                onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}>
                <FontAwesomeIcon icon={passwordType === 'password' ? faEyeSlash : faEye} />
              </span>
              <div id="passwordError" className="error_sign_up">
                {passwordError}
              </div>
            </div>

            <button type="submit" onClick={onLogin}>
              Sign In
            </button>
            <div className="links">
              <Link to="/signup">Sign Up</Link>
              <Link to="/forgot">Forgot password</Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default SignIn;
