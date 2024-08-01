const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../model/userModel");
const crypto = require("crypto");
require("dotenv").config({ path: "./04_BACKEND/.env" });

const {
  sendPasswordResetEmail,
  sendRegistrationEmail,
} = require("../services/emailService");

const {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateMobile,
  validateCity,
} = require("../services/validationService");

let isDebuggingOn = process.env.DEBUGGING_ON === "false" ? false : true;

class userContoller {
  /** Controller function to login user.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  422 when validation failure happens,
   *  401 when User needs to verify the email,
   *  403 when Invalid email or password,
   *  500 when Internal Server error occurs,
   *  201 when Login successful with JWT token in response
   */
  static async loginUser(req, res) {
    // getting all the user parameters from the request object
    const { email, password } = req.body;

    // starting validation on the backend
    isDebuggingOn
      ? console.log(
          "Request params recieved email, password : ",
          email,
          password
        )
      : " ";
    const validationResponses = {
      emailResponse: validateEmail(email),
      passwordResponse: validatePassword(password),
    };

    // checking each of the validation responses
    let returnMessage = "";
    let isValidationFail = false;
    for (const key in validationResponses) {
      let value = validationResponses[key];
      if (value !== null) {
        // adding the validation failure message to final return message if found
        returnMessage += value.message + " ";
        isValidationFail = true;
      }
    }
    if (isValidationFail) {
      // return a 422 status code when validation failure occurs
      return res.status(422).json({ errors: returnMessage });
    }

    try {
      // Find the user with the provided email
      const user = await User.findOne({ email });

      // If user not found, return error
      if (!user) {
        return res.status(403).json({ errors: "Invalid email or password" });
      }

      // If user has not verified email yet, return error
      if (!user.isEmailVerified) {
        return res
          .status(401)
          .json({ errors: "User needs to verify the email" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(403).json({ errors: "Invalid email or password" });
      }

      // Password is correct, generate JWT token
      const token = generateJWT(user);
      // console.log(token);

      // Send the token in response
      return res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.roles,
          phone: user.phone,
          city: user.city,
          shipping_address: user.shipping_address,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }

  /** Controller function to register user.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  422 when validation failure happens,
   *  409 when registration is incomplete
   *  403 when registration attempted on already registered email
   *  500 when unknown error occurs
   *  201 when registration successful
   */
  static async registerUser(req, res) {
    // getting all the user parameters from the request object
    const { email, password, firstName, lastName, phone, roles, city } =
      req.body;

    // starting validation on the backend
    isDebuggingOn
      ? console.log(
          "Request params recieved email, password, firstName, lastName, phone, roles, city: ",
          email,
          password,
          firstName,
          lastName,
          phone,
          roles,
          city
        )
      : " ";
    const validationResponses = {
      emailResponse: validateEmail(email),
      passwordResponse: validatePassword(password),
      firstNameResponse: validateFirstName(firstName),
      lastNameResponse: validateLastName(lastName),
      phoneResponse: validateMobile(phone),
      cityResponse: validateCity(city),
    };

    // checking each of the validation responses
    let returnMessage = "";
    let isValidationFail = false;
    for (const key in validationResponses) {
      let value = validationResponses[key];
      if (value !== null) {
        // adding the validation failure message to final return message if found
        returnMessage += value.message + " ";
        isValidationFail = true;
      }
    }

    if (isValidationFail) {
      // return a 422 status code when validation failure occurs
      return res.status(422).json({ errors: returnMessage });
    }

    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });

      // if exising User found by email
      if (existingUser) {
        if (existingUser.confirmEmailToken !== null) {
          // if user has not finished confirming email
          // return a 409 status code when user needs to confirm email yet
          return res.status(409).json({
            errors:
              "User needs to click on link sent on email to confirm email.",
          });
        } else {
          // if user has already FINISHED registration
          // return a 403 status code when user cannot register again with same email
          return res
            .status(403)
            .json({ errors: "Email already exists, sign in instead." });
        }
      }

      // this is a new email trying to register

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const confirmEmailToken = crypto.randomBytes(20).toString("hex");

      // Create a new user with the hashed password
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        roles,
        city,
        confirmEmailToken,
      });

      // try sending an email with the token
      await sendRegistrationEmail(email, confirmEmailToken, firstName);

      // try saving the new user details if email sent was successful
      await newUser.save();

      res.status(201).send({ message: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }

  /** Controller function to forget password.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  404 when User not found,
   *  422 when validation failed,
   *  200 when Password reset link sent,
   *  500 when Internal Server error occurs
   */
  static async forgetPassword(req, res) {
    //Getting email from the request object
    const { email } = req.body;

    // starting validation on the backend
    isDebuggingOn ? console.log("Request params recieved email: ", email) : " ";

    const validationResponses = validateEmail(email);
    // console.log(validationResponses);
    // checking the validation responses
    if (validationResponses !== null) {
      return res.status(422).json({ errors: validationResponses?.message });
    }

    try {
      // check if email exists
      const user = await User.findOne({ email });

      // If email not found
      if (!user) {
        return res.status(404).json({ errors: "User not found" });
      }

      // if email found we generate token and save it to DB with an expiry of 1 hour
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
      await user.save();
      // console.log(token);

      // sending reset link to email
      await sendPasswordResetEmail(user.email, token);
      res.status(200).json({ errors: "Password reset link sent" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }

  /** Controller function to reset password.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  422 when validation failure happens,
   *  401 when Invalid or expired token,
   *  400 when password is same as previous one used,
   *  500 when unknown error occurs,
   *  200 when reset successful
   */
  static async resetPassword(req, res) {
    // getting all the user parameters from the request object
    const { token, newPassword } = req.body;

    // starting validation on the backend
    isDebuggingOn
      ? console.log("Request params recieved password: ", newPassword)
      : " ";

    const validationResponses = validatePassword(newPassword);
    // console.log(validationResponses);
    // checking the validation responses
    if (validationResponses !== null) {
      return res.status(422).json({ errors: validationResponses?.message });
    }

    try {
      // check if token exists in DB
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      // console.log(user);

      // if token not found
      if (!user) {
        return res.status(401).json({ errors: "Invalid or expired token" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(newPassword, user.password);

      if (passwordMatch) {
        return res.status(400).json({
          errors: "New password must be different from the previous password",
        });
      }

      // If new password is differnet from previous one  ,create new password in DB
      // Hashing the password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      // Clearing the token from DB
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  /** Controller function to confirm user's email.
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *  404 when Invalid or expired token,
   *  500 when Internal Server error occurs,
   *  200 when Email verified successfully
   */
  static async confirmEmail(req, res) {
    console.log("Confirm Email Route Accessed");
    const { token } = req.query; // Extract token from URL query parameters
    // console.log(req.query);
    try {
      // Find user by confirmation token
      const user = await User.findOne({ confirmEmailToken: token });
      //console.log(user);
      // If user not found, return an error
      if (!user) {
        return res.status(404).json({ errors: "Invalid or expired token" });
      }

      // Update user's email verification status
      user.isEmailVerified = true;
      user.confirmEmailToken = null;
      await user.save();
      console.log("Verified SuccessFully!!");
      // Respond with a success message
      res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }
}

function generateJWT(user) {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      roles: user.roles,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });

  return token;
}

module.exports = userContoller;
