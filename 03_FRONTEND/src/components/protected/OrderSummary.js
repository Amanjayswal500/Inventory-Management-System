import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../index.css";

/**
 * OrderSummary Component
 * This component displays a summary of the order, including the list of products, 
 * their quantities, prices, and the total cost including GST and other charges.
 */
const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve selected products from the state, default to an empty array if none are passed
  const selectedProducts = location.state?.selectedProducts || [];
  
  // Calculate the total price of all selected products
  const totalQuantity = selectedProducts.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = selectedProducts.reduce((total, item) => {
    const price = item.product.price || 0; // Ensure price is defined, defaulting to 0 if not
    return total + (price * item.quantity);
  }, 0);

  // Calculate additional charges
  const gst = totalPrice * 0.18;
  const handlingCharge = 5;
  const deliveryCharge = 0;
  const finalAmount = totalPrice + gst + handlingCharge + deliveryCharge;

  const handlePlaceOrder = () => {
    // Here, you can navigate to any blank page or route
    alert("order placed successfully");
    // navigate("/blank-page");
    navigate("/dashboard")
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p>Billing Address: [User's Address]</p>
      <p>Date: {new Date().toLocaleDateString()}</p>

      {/* Display list of selected products */}
      <div className="items">
        {selectedProducts.map((item, index) => (
          <div key={index} className="item">
            <img src={item.product.imageUrl} alt={item.product.name} className="product-image" />
            <div className="product-details">
              <p className="product-name">{item.product.name}</p>
              <p className="product-price">Price: ₹{item.product.price ? item.product.price.toFixed(2) : 'N/A'}</p>
              <p className="product-quantity">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Display total costs and charges */}    
      <div className="total">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
        <p>GST (18%): ₹{gst.toFixed(2)}</p>
        <p>Handling Charge: ₹{handlingCharge.toFixed(2)}</p>
        <p>Delivery Charge: <span className="free">FREE</span></p>
        <p>Final Amount: ₹{finalAmount.toFixed(2)}</p>
      </div>

      {/* Place Order button */}
      <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
      <p className="invoice-note">
        As per Section 31 of CGST Act read with Rules, invoice is issued at the point of delivering the goods.
      </p>
    </div>
  );
};

export default OrderSummary;
