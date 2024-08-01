import React from 'react';
import Sidebar from "./Sidebar";
import "../../index.css";

const Privacypolicy = () => {
  return (
    <div className="dash-container">
      <Sidebar />
      <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1>Privacy Policy</h1>
        <p>Last updated: JUN 01, 2024</p>

        <p>Welcome to our Inventory Mangement website. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at support@inventorysystem.com.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us when registering on the website, expressing an interest in obtaining information about us or our products and services, when participating in activities on the website (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise contacting us.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>

        <h2>3. Sharing Your Information</h2>
        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

        <h2>4. Security of Your Information</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

        <h2>5. Your Privacy Rights</h2>
        <p>You may review, change, or terminate your account at any time. If you are a resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.</p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>

        <p>If you have questions or comments about this policy, you may email us at support@inventorysystem.com.</p>
      </div>
    </div>
    </div>
  );
};

export default Privacypolicy;
