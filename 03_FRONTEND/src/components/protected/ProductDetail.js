// external dependencies
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// internal dependency
import { fetchData } from "../../utilities/apputils";

// declaration of product detail component
const ProductDetail = () => {
  //   extracting query params
  const { id } = useParams();
  const navigate = useNavigate();

  //intializing the component state
  const [cartQuantity, setCartQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [storeQuantity, setStoreQuantity] = useState(1);
  const [showStoreModal, setShowStoreModal] = useState(false);

  // helper function to capitalize the first capitalizeFirstLetter,for better presentation
  const capitalizeFirstLetter = (text = "abc") => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  //   other helper function

  // getting the role value 
  const role = JSON.parse(localStorage.getItem("user")).role;

  const admin = role ? false : true;
  //handler code for decrementing the quantity
  const setDecrease = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity - 1);
    }
  };
  //handler code for incrementing  the quantity
  const setIncrease = () => {
    if (cartQuantity < product.quantity) {
      setCartQuantity(cartQuantity + 1);
    }
  };

  // when ID changes, call the backend and fetch the product details of this new product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchData("get", `product/GetProducts/${id}`);
        if (response !== null) {
          setProduct(response.data);
        } else {
          console.error("error", "UnAuthorized");
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (productData) => {
    // Add the selected product to the list of selected products
    if (cartQuantity <= 0) {
      alert("Quantity must be greater than 0 for adding to cart");
      return;
    }

    if (productData.quantity <= 0) {
      alert("This product is out of stock and cannot be added to the cart.");
      return;
    }
    // get the cart from localStorage or create an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existsIndex = cart.findIndex(item => item.product._id === productData._id);

    if (existsIndex !== -1) {
      // Update quantity if product already exists
      cart[existsIndex].quantity += cartQuantity;
    } else {
      // Add the product to the cart if it doesn't exist
      cart.push({ product: productData, quantity: cartQuantity });
    }

    // Save the updated cart back to localStorage 
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart successfully.");
  };

  // Function to handle the deletion of a product
  const handleDelete = async (productID) => {
    if (window.confirm('Are you sure you want to delete this product')) {
      try {
        await fetchData("delete", `product/deleteProducts/${productID}`);
        // Navigate to the dashboard after deletion
        navigate("/Dashboard");
        alert("product is deleted successfully");
      } catch (error) {
        // Log any errors during deletion
        console.error('error deleting product :', error);
      }
    }
  }

  // Function to handle adding a product to the store
  const handleAddToStore = (productData) => {
    setShowStoreModal(true);
  }

  // Function to handle the submission of the store addition form
  const handleStoreSubmit = async () => {
    try {
      const response = await fetchData("put", `product/updateProduct/${product._id}`, {
        quantity: product.quantity + storeQuantity
      });
      if (response !== null) {
        // Update the product state with the new data
        setProduct(response.data);
        setShowStoreModal(false);
        alert("Product quantity updated successfully.");
      } else {
        console.error("error", "UnAuthorized");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  // Function to handle removing a product from the cart
  const handleRemoveFromCart = (productData) => {
    // Get the cart from localStorage or create an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existsCartProduct = cart.filter(item => item.product._id !== productData._id);
    const selectedProduct = cart.filter(item => item.product._id === productData._id);

    if (selectedProduct.length > 0) {
      // Adjust the product quantity in the cart
      const originalQuantity = selectedProduct[0].quantity
      let newQuantity = 0
      if (originalQuantity > cartQuantity) {
        newQuantity = originalQuantity - cartQuantity
        existsCartProduct.push({ product: productData, quantity: newQuantity })
        localStorage.setItem('cart', JSON.stringify(existsCartProduct));
      } else {
        localStorage.setItem('cart', JSON.stringify(existsCartProduct));
      }
      alert("Removed from cart Successfully");
    } else {
      // user is trying to remove from cart an item which is not in the cart
      alert('This item is not in the cart. So it cannot be Removed');

      const removeButton = document.querySelector(`#remove-button-${productData._id}`);
      if (removeButton) {
        removeButton.disabled = true;
      }
    }
  };

  // If the product is not loaded yet, show a loading message
  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div id="product-container">
        <div className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <Link to="/Dashboard">Back to Dashboard</Link>
        </div>
        <div className="product-images">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product">
          <p className="product-name">{product.name}</p>
          <h3>
            Category: {capitalizeFirstLetter(product.categoryId?.categoryName)}
          </h3>
          <h3>Price : ₹ {product.price}</h3>
          <h3>Quantity : {product.quantity}</h3>
          <h2>DESCRIPTION</h2>
          <p className="desc">{product.description}</p>
          <div className="buttons">
            {admin ? (<button onClick={() => handleAddToCart(product)} className="add">
              Add to Cart
            </button>) : (<button onClick={() => handleAddToStore(product)} className="add">
              Add to Store
            </button>)}
            <span> </span>
            {admin ? (<button onClick={() => handleRemoveFromCart(product)} className="add">
              Remove from Cart
            </button>) : (<button onClick={() => handleDelete(product._id)} className="add">
              Delete from store
            </button>)}
          </div>

          <div className="change-button">
            {admin ? (<><button onClick={setDecrease} className="minus">-</button>
              <button className="value">{cartQuantity}</button>
              <button onClick={setIncrease} className="plus">+</button></>) : (null)}
          </div>
        </div>
      </div>
      {showStoreModal && (
        <div className="modal">
          <div className="modal-contents">
            <h2>Add Quantity to Store</h2>
            <input
              type="number"
              value={storeQuantity}
              onChange={(e) => setStoreQuantity(Math.max(1, e.target.value))}
              min="1"
            />
            <div className="modal-buttons">
              <button onClick={handleStoreSubmit} className="add-button">Add</button>
              <button onClick={() => setShowStoreModal(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
