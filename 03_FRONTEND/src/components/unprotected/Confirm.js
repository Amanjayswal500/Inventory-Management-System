import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { fetchDataUnprotected } from "../../utilities/apputils";


const Confirm = () => {
  const navigate = useNavigate();

  const [tokenError, setTokenError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const handleConfirm = async () => {
      try {
        // taking token from URL Params
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const method = 'get';
        await fetchDataUnprotected(method, `users/confirm-email?token=${token}`);
        setIsConfirmed(true);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect to login page after 2 seconds
      } catch (error) {
        console.error("Confirmation error:", error.response.data);
        // Handle different error responses as needed
        if (error.response.status === 404) {
          setTokenError("Invalid or expired token");
        } else {
          setTokenError("Internal Server Error");
        }
      }
    };

    // Confirm email when component mounts
    handleConfirm();
  }, [navigate]); // Empty dependency array ensures this effect runs only once



  return (
    <>
      <div className="container">
        <h1>Email Confirmation</h1>
        {isConfirmed ? (
          <div className="confirmation-message">
            <FaCheckCircle size={30} color="green" />
            <p>Email confirmed successfully!</p>
          </div>
        ) : (
          <div className="error_sign_up">
            {tokenError || "Verifying email..."}
          </div>
        )}
      </div>
    </>
  );
};

export default Confirm;
