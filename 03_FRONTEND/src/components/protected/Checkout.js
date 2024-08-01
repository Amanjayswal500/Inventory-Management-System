import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../utilities/apputils";
import ConfirmationModal from "./Confirmbeforecheckout";

// Checkout component
const Checkout = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

   // Hook to navigate programmatically
  const navigate = useNavigate();

  // Effect to fetch cart items from localStorage when the component mounts
  useEffect(() => {
    const fetchCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setItems(cart);
    };
    fetchCartItems();
  }, []);

  // Handle checkout button click
  const handleCheckout = async () => {

    // If cart is empty, alert the user and return
    if (items.length === 0) {
      alert("Your Cart is empty. Please add products!!! ");
      return;
    }

    // Open the confirmation modal
    setIsModalOpen(true);
  };

  // Confirm checkout process
  const confirmCheckout = async () => {

    // Fetch userId from localStorage
    const userId = JSON.parse(localStorage.getItem("user")).id;

    // Convert items to JSON string
    const cart = JSON.stringify(items);


    try {
      // Make API call to add checkout
      await fetchData("post", "checkout/addcheckout", {
        user_id: userId,
        cart: cart
      });

      // Navigate to order summary page
      navigate('/order-summary', { state: { selectedProducts: items } });
    } catch (error) {
      console.log(error);
    }

    try {
      // Clear the cart from localStorage and update state
      localStorage.removeItem("cart");
      setItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }

    // Close the confirmation modal
    setIsModalOpen(false);
  };

  // Cancel checkout process
  const cancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Link to="/Dashboard" className="back-to-dashboard-btn">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
      </Link>

       {/* Checkout container */}
      <div className="checkout-container">
        <div className="items-container">
          <div className="checkout-heading">
            <span>Shopping Cart</span> <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <hr className="horizontal-line" />
          <div className="row-header">
            <div className="cell-product">Product</div>
            <div className="cell-name">Name</div>
            <div className="cell-price">Price</div>
            <div className="cell-quantity">Quantity</div>
          </div>

          {/* If cart is empty, show message, otherwise map through items */}
          {items.length === 0 ? (
            <p>Your cart is currently empty.</p>
          ) : (
            items.map((item) => (
              <Link to={`/product/${item.product._id}`} key={item.product._id}>
                <div key={item.product._id} className="check-name">
                  <img className="img-checkout" src={item.product.imageUrl} alt={item.product.name} />
                  <div className="checkout-name">{item.product.name}</div>
                  <div className="checkout-price">₹{item.product.price.toFixed(2)}</div>
                  <div className="checkout-quantity">{item.quantity}</div>
                </div>
              </Link>
            ))
          )}

          {/* Checkout button */}
          <div className="check-button">
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>

          </div>
        </div>
      </div>

       {/* Confirmation modal component */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmCheckout}
        onCancel={cancelCheckout}
      />
    </>
  );
};

export default Checkout;
