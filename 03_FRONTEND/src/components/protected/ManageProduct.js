//external dependecies
import React, { useEffect, useState } from "react";
import { fetchData } from "../../utilities/apputils";
import { useNavigate } from "react-router-dom";
import Sidebar from "../protected/Sidebar";
import "../../index.css";
//internal dependecies
import {
  validateCategoryId,
  validateDescription,
  validateName,
  validatePrice,
  validateQuantity,
} from "../../utilities/validators";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [ProductNameError, setProductNameError] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPriceError, setProductPriceError] = useState("");

  const [productQuantity, setProductQuantity] = useState("");
  const [productQuantityError, setProductQuantityError] = useState("");

  const [productCategory, setProductCategory] = useState("");
  const [productCategoryError, setProductCategoryError] = useState("");

  const [categories, setCategories] = useState([]);

  const [prodcutStatus, setProdcutStatus] = useState("available");
  const [prodcutStatusError, setProdcutStatusError] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImageError, setProductImageError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const Fetchcategory = async () => {
    try {
      const category = await fetchData("get", "category/getallcategory");
      setCategories(category.data);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    Fetchcategory();
  }, []);

  /** This is a helper function to clear all the errors on the UI screen
   */
  const clearErrors = () => {
    setProductNameError("");
    setProductDescriptionError("");
    setProductPriceError("");
    setProductQuantityError("");
    setProductCategoryError("");
    setProdcutStatusError("");
    setProductImageError("");
    setErrorMessage("");
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

    // validating the  name
    result = validateName(productName);
    if (result !== null) {
      isValid = false;
      setProductNameError(result.message);
    }

    // validating the description
    result = validateDescription(productDescription);
    if (result !== null) {
      isValid = false;
      setProductDescriptionError(result.message);
    }

    // validating the price
    result = validatePrice(productPrice);
    if (result !== null) {
      isValid = false;
      setProductPriceError(result.message);
    }

    // validating quantity
    result = validateQuantity(productQuantity);
    if (result !== null) {
      isValid = false;
      setProductQuantityError(result.message);
    }

    // validating the  category id
    result = validateCategoryId(productCategory);
    if (result !== null) {
      isValid = false;
      setProductCategoryError(result.message);
    }

    return isValid;
  };

  /** Event handler for doing the user submit click
   * @param {*} event
   */
  const createProduct = async (event) => {
    // do not propagate the event
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    // validation was successful, attempting to make a call to the backend

    try {
      await fetchData("post", `product/createProduct`, {
        name: productName,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
        categoryId: productCategory,
        imageUrl: productImage,
        status: prodcutStatus,
      });
      alert("Product added Succesfully");
      navigate("/admin_dashboard");
    } catch (error) {
      let response = error.response;
      if (response) {
        if (response?.status === 422) {
          // 422 when validation failure happens,
          console.error("Validation failure: ", response.data.errors);
          setErrorMessage("Validation failure: ", response.data.errors);
        } else if (response?.status === 403) {
          // 403 when product alreday exist
          console.error("Product already exists", response.data.errors);
          setErrorMessage("Product  already exists", response.data.errors);
        } else if (response?.status === 400) {
          // 404 when a generic error message happened
          console.error("Error", response.data.errors);
          setErrorMessage("Errors", response.data.errors);
        } else if (response?.status === 401) {
          // 404 when a unatuhorized error message happened
          console.error("Unauthorized", response.data.errors);
          setErrorMessage("Unauthorized", response.data.errors);
        } else if (response?.status === 500) {
          // 500 when unknown error occurs
          console.error("Internal Server Error", response.data.errors);
          setErrorMessage("Internal Server Error", response.data.errors);
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

  useEffect(() => {});

  return (
    <div className="dash-container">
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="Add_product">
          <div className="new_product">
            <h2>Add New Product</h2>
            <div id="errorMessage" className="error_sign_up">
              {errorMessage}
            </div>
            <form onSubmit={createProduct} noValidate>
              <div className="div_of_input_element">
                <label className="label_price">Name:</label>
                <input
                  className="product_name"
                  type="text"
                  value={productName}
                  placeholder=" Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div id="ProductNameError" className="error_sign_up">
                {ProductNameError}
              </div>
              <div className="div_of_input_element">
                <label className="label_price">Description:</label>
                <textarea
                  className="product_desc"
                  value={productDescription}
                  placeholder=" Product Description"
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div id="productDescriptionError" className="error_sign_up">
                {productDescriptionError}
              </div>
              <div className="price_quantity">
                <div>
                  <label className="label_price_quantity">Price:</label>
                  <input
                    className="product_price"
                    type="number"
                    min="0"
                    value={productPrice}
                    placeholder=" Product Price"
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                  />
                </div>
                <div id="productPriceError" className="error_sign_up">
                  {productPriceError}
                </div>
                <div>
                  <label className="label_price_quantity">Quantity:</label>
                  <input
                    className="product_price"
                    type="number"
                    min="0"
                    value={productQuantity}
                    placeholder=" Product Quantity"
                    onChange={(e) => setProductQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div id="productQuantityError" className="error_sign_up">
                {productQuantityError}
              </div>
              <div className="div_of_input_element">
                <label className="label_price">Status:</label>
                <select
                  className="product_name"
                  onChange={(e) => setProdcutStatus(e.target.value)}
                >
                  <option value="available">Available</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <div id="prodcutStatusError" className="error_sign_up">
                {prodcutStatusError}
              </div>
              <div className="div_of_input_element">
                <label className="label_price">Category:</label>
                <select
                  className="product_name"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div id="productCategoryError" className="error_sign_up">
                {productCategoryError}
              </div>
              <div className="div_of_input_element">
                <label className="label_price">Product Image:</label>
                <input
                className="url"
                  type="text"
                  value={productImage}
                  placeholder=" Product Image URL"
                  onChange={(e) => setProductImage(e.target.value)}
                  required
                />
              </div>
              <div id="productImageError" className="error_sign_up">
                {productImageError}
              </div>
              <button className="add_product_btn" type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
