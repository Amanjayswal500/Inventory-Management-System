import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import "../../index.css";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleFaqClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="dash-container">
      <Sidebar />
      <div>
        <h2>INFO SYS Help Center | 24x7 Customer Care Support</h2>
        <p>
          The INFO SYS Help Centre page lists out various types of issues that you may have encountered so that there can be quick resolution and you can go back to shopping online. For example, you can get more information regarding transaction history, order information and much more. The page has various filters listed out on the left-hand side so that you can get your queries solved quickly, efficiently, and without a hassle. You can get the INFO SYS Help Centre number or even access Flipkart Help Centre support if you need professional help regarding various topics. The support executive will ensure speedy assistance so that your experience is positive and enjoyable. You can even inform your loved ones of the support page so that they can properly get their grievances addressed as well. Once you have all your queries addressed, you can pull out your shopping list and shop for all your essentials in one place.
        </p>
        <div className="faq">
          <div className="faq-item" onClick={() => handleFaqClick(0)}>
            <p className="faq-question">How do I get started with the Website?</p>
            <div className={`faq-answer ${activeIndex === 0 ? 'active' : ''}`}>
              <p>To get started, sign up for an account on our website. Once registered, you can log in and begin your shopping.</p>
            </div>
          </div>
          <div className="faq-item" onClick={() => handleFaqClick(1)}>
            <p className="faq-question">How do I reset my password?</p>
            <div className={`faq-answer ${activeIndex === 1 ? 'active' : ''}`}>
              <p>To reset your password, click on the "Forgot Password" link on the login page and follow the instructions. An email with a password reset link will be sent to your registered email address.</p>
            </div>
          </div>
          <div className="faq-item" onClick={() => handleFaqClick(2)}>
            <p className="faq-question">How do I place an order?</p>
            <div className={`faq-answer ${activeIndex === 2 ? 'active' : ''}`}>
              <p>To create a purchase order, go to the 'Dashboard' section and click on the product. Then, click on the 'Add to Cart' to add the products you wish to order, and specify the quantities. Then go to the 'Checkout' and click the 'checkout' button & place the purchase order to the supplier.</p>
            </div>
          </div>
          <div className="faq-item" onClick={() => handleFaqClick(3)}>
            <p className="faq-question">How do I remove the product from cart?</p>
            <div className={`faq-answer ${activeIndex === 3 ? 'active' : ''}`}>
              <p>First click on the product. Then, click on the 'Remove from Cart' to remove the products, and specify the quantities. Then go to the 'Checkout' and you can see that the specified product removed from your cart.</p>
            </div>
          </div>
          <div className="faq-item" onClick={() => handleFaqClick(4)}>
            <p className="faq-question">How do i check my transaction history?</p>
            <div className={`faq-answer ${activeIndex === 4 ? 'active' : ''}`}>
              <p>First click on the "History" from the menu and you can simply check your transaction history.</p>
            </div>
          </div>
          <div className="faq-item" onClick={() => handleFaqClick(5)}>
            <p className="faq-question">What should I do if I faced a technical issue?</p>
            <div className={`faq-answer ${activeIndex === 5 ? 'active' : ''}`}>
              <p>If you encounter a technical issue, please contact our support team by emailing support@inventorysystem.com or calling our support hotline at 1-800-555-1234. Provide as much detail as possible to help us resolve the issue quickly.</p>
            </div>
          </div>
        </div>
        <div>
            <br></br>
            <br></br>
            <h2>Support Team email: support@inventorysystem.com</h2>
        </div>
      </div>
    </div>
  );
};

export default Faq;
