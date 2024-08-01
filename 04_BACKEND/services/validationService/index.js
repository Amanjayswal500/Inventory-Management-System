const {
  validateFirstName,
  validateLastName,
  validateCity,
  validateEmail,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
} = require("./userModelValidators");

const {
  validateProductName,
  validateDescription,
  validatePrice,
  validateQuantity,
  validateStatus,
  validateCategoryId,
  validateImageUrl,
} = require("./producModelValidators");

module.exports = {
  validateFirstName,
  validateLastName,
  validateCity,
  validateEmail,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
  validateProductName,
  validateDescription,
  validatePrice,
  validateQuantity,
  validateStatus,
  validateCategoryId,
  validateImageUrl,
};
