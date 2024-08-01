const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth"); // Import middleware for verifying JWT tokens
const router = express.Router();  // Create an instance of the express router
const User = require("../model/userModel");

// Route to handle user login, register and confirm email 
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/confirm-email", userController.confirmEmail);

// Route to handle forgot password and reset password functionality
router.post("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);

// Export the router to be used in other parts of the application
module.exports = router;
