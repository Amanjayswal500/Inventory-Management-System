const PN_REQUIRED = "FN_REQUIRED";
const PN_INVALID_CHARACTERS = "FN_INVALID_CHARACTERS";
const PN_INVALID_LENGTH = "FN_INVALID_LENGTH";

const DESCRIPTION_REQUIRED = "DESCRIPTION_REQUIRED";
const DESCRIPTION_INVALID_LENGTH = "DESCRIPTION_INVALID_LENGTH";

const PRICE_REQUIRED = "PRICE_REQUIRED";
const PRICE_INVALID_FORMAT = "PRICE_INVALID_FORMAT";
const PRICE_NEGATIVE_VALUE = "PRICE_NEGATIVE_VALUE";

const QUANTITY_REQUIRED = "QUANTITY_REQUIRED";
const QUANTITY_INVALID_FORMAT = "QUANTITY_INVALID_FORMAT";

const STATUS_REQUIRED = "STATUS_REQUIRED";
const STATUS_INVALID_VALUE = "STATUS_INVALID_VALUE";

const CATEGORY_ID_REQUIRED = "CATEGORY_ID_REQUIRED";
const CATEGORY_ID_INVALID_FORMAT = "CATEGORY_ID_INVALID_FORMAT";

const IMAGE_URL_REQUIRED = "IMAGE_URL_REQUIRED";
const IMAGE_URL_INVALID_FORMAT = "IMAGE_URL_INVALID_FORMAT";

/** Validator function for validating product name
 *
 * @param {*} name
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateName(name) {
  if (!name || name.trim() === "") {
    return { message: "Product name is required.", code: PN_REQUIRED };
  }
  if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
    return {
      message: "Product name can only contain letters, numbers, and spaces.",
      code: PN_INVALID_CHARACTERS,
    };
  }
  if (name.length < 2 || name.length > 30) {
    return {
      message: "Product name must be between 2 and 30 characters.",
      code: PN_INVALID_LENGTH,
    };
  }
  return null; // No errors
}

/** Validator function for validating description
 *
 * @param {*} description
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateDescription(description) {
  if (!description || description.trim() === "") {
    return { message: "Description is required.", code: DESCRIPTION_REQUIRED };
  }
  // validation for description length
  if (description.length < 2 || description.length > 255) {
    return {
      message: "Description must be between 2 and 255 characters.",
      code: DESCRIPTION_INVALID_LENGTH,
    };
  }
  return null;
}

/** Validator function for validating price
 *
 * @param {*} price
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validatePrice(price) {
  if (!price || price.trim() === "") {
    return { message: "Price is required.", code: PRICE_REQUIRED };
  }
  // validation for price format
  if (isNaN(parseFloat(price)) || !isFinite(price)) {
    return { message: "Invalid price format.", code: PRICE_INVALID_FORMAT };
  }
  // Check if the price is negative
  if (parseFloat(price) < 0) {
    return { message: "Price cannot be negative.", code: PRICE_NEGATIVE_VALUE };
  }
  return null;
}

/** Validator function for validating quantity
 *
 * @param {*} quantity
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateQuantity(quantity) {
  if (!quantity || quantity.trim() === "") {
    return { message: "Quantity is required.", code: QUANTITY_REQUIRED };
  }
  // validation for quantity format
  if (!Number.isInteger(Number(quantity))) {
    return {
      message: "Invalid quantity format.",
      code: QUANTITY_INVALID_FORMAT,
    };
  }
  return null;
}

/** Validator function for validating status
 *
 * @param {*} status
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateStatus(status) {
  if (!status || status.trim() === "") {
    return { message: "Status is required.", code: STATUS_REQUIRED };
  }
  // Specific validation for status values
  if (!["0", "1"].includes(status)) {
    return {
      message:
        "Invalid status value. Status must be 0 (Available), 1 (Out_Of_Stock).",
      code: STATUS_INVALID_VALUE,
    };
  }
  return null;
}

/** Validator function for validating category Id
 *
 * @param {*} categoryId
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateCategoryId(categoryId) {
  if (!categoryId || categoryId.trim() === "") {
    return { message: "Category ID is required.", code: CATEGORY_ID_REQUIRED };
  }
  // validation for category ID format
  const categoryIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!categoryIdRegex.test(categoryId)) {
    return {
      message: "Invalid category ID format.",
      code: CATEGORY_ID_INVALID_FORMAT,
    };
  }
  return null;
}

/** Validator function for validating Image URL
 *
 * @param {*} ImageUrl
 * @returns {*} An object with code, message specifying the error, null if no error
 */
function validateImageUrl(imageUrl) {
  if (!imageUrl || imageUrl.trim() === "") {
    return { message: "Image URL is required.", code: IMAGE_URL_REQUIRED };
  }
  // Regular expression to check if the URL ends with a common image extension
  if (!/\.(jpeg|jpg|gif|png)$/.test(imageUrl.toLowerCase())) {
    return {
      message:
        "Invalid image URL format. Supported formats are JPEG, JPG, GIF, and PNG.",
      code: IMAGE_URL_INVALID_FORMAT,
    };
  }
  return null; // No errors
}

export {
  validateName,
  validateDescription,
  validatePrice,
  validateQuantity,
  validateStatus,
  validateCategoryId,
  validateImageUrl,
};
