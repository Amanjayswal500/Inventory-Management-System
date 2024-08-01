import React from 'react';
import "../../index.css";
import Sidebar from './Sidebar';

const Aboutus = () => {
  return (
    <div className="dash-container">
      <Sidebar />
    <div className="about-us-container">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>Discover more about our Mission, values, and team.</p>
      </div>
      <div className="content-section">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            At INFO SYS, Our mission is to harness the power of innovation, sustainability, and inclusivity to create positive change. We are dedicated to delivering exceptional products and services that improve lives and contribute to a better world. By staying true to our values and working collaboratively with our stakeholders, we believe we can achieve our vision of a brighter, more sustainable, and inclusive future for all.At INFO SYS, we are a dynamic and innovative company dedicated to revolutionizing the way businesses manage their inventory. Founded on the principles of efficiency, transparency, and technological advancement, our mission is to empower organizations with cutting-edge inventory management solutions that drive growth and operational excellence. With a diverse and passionate team of experts, we are committed to delivering top-notch products and services that cater to the unique needs of our clients. Our unwavering focus on customer satisfaction, integrity, and sustainability guides everything we do, ensuring that we not only meet but exceed the expectations of those we serve. At INFO SYS, we believe in creating lasting value through collaboration, innovation, and a steadfast commitment to a brighter, more sustainable future.
          </p>
        </div>
        <div className="team">
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src='https://img.freepik.com/free-vector/people-working-as-team-background-flat-style_23-2147767891.jpg' alt='Team'/>
              <h3>INVENTORY MANAGEMENT SYSTEM</h3>
              <p>INFO SYS</p>
            </div>
          </div>
        </div>
        <div className="values">
          <h2>Our Values</h2>
            <h2>Customer Satisfaction | Integrity | Innovation | Sustainability</h2>        
        </div>
      </div>
    </div>
    </div>
  );
}

export default Aboutus;
