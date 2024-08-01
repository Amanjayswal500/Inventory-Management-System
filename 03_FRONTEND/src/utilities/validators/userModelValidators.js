const FN_REQUIRED = "FN_REQUIRED";
const FN_INVALID_CHARACTERS = "FN_INVALID_CHARACTERS";
const FN_INVALID_LENGTH = "FN_INVALID_LENGTH";

const LN_REQUIRED = "LN_REQUIRED";
const LN_INVALID_CHARACTERS = "LN_INVALID_CHARACTERS";
const LN_INVALID_LENGTH = "LN_INVALID_LENGTH";

const CITY_REQUIRED = "CITY_REQUIRED";
const CITY_INVALID_LENGTH = "CITY_INVALID_LENGTH";

const EMAIL_REQUIRED = "EMAIL_REQUIRED";
const EMAIL_INVALID_FORMAT = "EMAIL_INVALID_FORMAT";

const MOBILE_REQUIRED = "MOBILE_REQUIRED";
const MOBILE_INVALID_FORMAT = "MOBILE_INVALID_FORMAT";

const PASSWORD_REQUIRED = "PASSWORD_REQUIRED";
const PASSWORD_INVALID_FORMAT = "PASSWORD_INVALID_FORMAT";

const CONFIRM_REQUIRED = "CONFIRM_REQUIRED";
const CONFIRM_MISMATCH = "CONFIRM_MISMATCH";

/** Validator function for validating first name
 * 
 * @param {*} firstName 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateFirstName(firstName) {
  if (!firstName || firstName.trim() === "") {
    return { message: "First name is required.", code: FN_REQUIRED };
  }
  if (!/^[a-zA-Z]+$/.test(firstName)) {
    return { message: "First name can only contain letters.", code: FN_INVALID_CHARACTERS };
  }
  if (firstName.length < 2 || firstName.length > 30) {
    return { message: "First name must be between 2 and 30 characters.", code: FN_INVALID_LENGTH };
  }
  return null; // No errors
}

/** Validator function for validating last name
 * 
 * @param {*} lastName 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateLastName(lastName) {
  if (!lastName || lastName.trim() === "") {
    return { message: "Last name is required.", code: LN_REQUIRED };
  }
  if (!/^[a-zA-Z]+$/.test(lastName)) {
    return { message: "Last name can only contain letters.", code: LN_INVALID_CHARACTERS };
  }
  if (lastName.length < 2 || lastName.length > 30) {
    return { message: "Last name must be between 2 and 30 characters.", code: LN_INVALID_LENGTH };
  }
  return null;
}

/** Validator function for validating city parameter
 * 
 * @param {*} city 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateCity(city) {
  if (!city || city.trim() === "") {
    return { message: "City is required.", code: CITY_REQUIRED };
  }
  if (city.length < 2 || city.length > 50) {
    return { message: "City must be between 2 and 50 characters.", code: CITY_INVALID_LENGTH };
  }
  return null;
}

/** Validator function for validating email ID
 * 
 * @param {*} email 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateEmail(email) {
  if (!email || email.trim() === "") {
    return { message: "Email is required.", code: EMAIL_REQUIRED };
  }
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { message: "Invalid email format.", code: EMAIL_INVALID_FORMAT };
  }
  return null;
}

/** Validator function for validating mobile number
 * 
 * @param {*} mobile 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateMobile(mobile) {
  if (!mobile || mobile.trim() === "") {
    return { message: "Mobile number is required.", code: MOBILE_REQUIRED };
  }
	
  const mobileRegex = /^\d{10}$/; // Allows 10 digits
  if (!mobileRegex.test(mobile)) {
    return { message: "Invalid mobile number format.", code: MOBILE_INVALID_FORMAT };
  }
  return null;
}

/** Validator function for validating password
 * 
 * @param {*} password 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validatePassword(password) {
  if (!password || password.trim() === "") {
    return { message: "Password is required.", code: PASSWORD_REQUIRED };
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])([^\s]){6,20}$/;
  if (!passwordRegex.test(password)) {
    return {
      message:
        "Password must be between 6 and 20 characters, and contain at least one uppercase letter, lowercase letter, number, and special character.",
      code: PASSWORD_INVALID_FORMAT,
    };
  }
  return null;
}

/** Validator function for validating confirm password
 * 
 * @param {*} confirmPassword
 * @param {*} password 
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateConfirmPassword(confirmPassword, password) {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return { message: "Confirm password is required.", code: CONFIRM_REQUIRED };
  }
  if (confirmPassword !== password) {
    return { message: "Passwords do not match.", code: CONFIRM_MISMATCH };
  }
  return null;
}


export {
  validateFirstName,
  validateLastName,
  validateCity,
  validateEmail,
  validateMobile,
  validatePassword,
  validateConfirmPassword
};
