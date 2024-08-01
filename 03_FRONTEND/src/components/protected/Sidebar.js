import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import img1 from "../../images/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  // get the current location
  const location = useLocation();
  const activeLink = location.pathname;

  const [isOpen, setIsOpen] = useState(false); // Start with sidebar closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Remove user data from localStorage
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // getting the role value 
  const role = JSON.parse(localStorage.getItem("user")).role;

  const admin = role ? false : true;

  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src={img1} alt="" />
          <h2>
            INFO <span className="danger">SYS</span>
          </h2>
        </div>
      </div>

      <button onClick={toggleSidebar} className="hamburgor">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div className={`sidebar ${isOpen ? 'visible' : ''}`}>
        <button className="close" onClick={toggleSidebar}>
          <span className="material-icons-sharp">close</span>
        </button>
        <Link to="/Dashboard" className={activeLink === "/Dashboard" ? "active" : ""}>
          <span className="material-icons-sharp">grid_view</span>
          <h3>Dashboard</h3>
        </Link>
        <Link to="/history" className={activeLink === "/history" ? "active" : ""}>
          <span className="material-icons-sharp">history</span>
          <h3>History</h3>
        </Link>
        {admin ? (
          <Link to="/checkout" className={activeLink === "/checkout" ? "active" : ""}>
            <span className="material-icons-sharp">add_shopping_cart</span>
            <h3>Checkout</h3>
          </Link>
        ) : (
          <Link to="/admin_product" className={activeLink === "/admin_product" ? "active" : ""}>
            <span className="material-icons-sharp">shopping_cart</span>
            <h3>Add Product</h3>
          </Link>
        )}
        {!admin?(""):(<Link to="/Faq" className={activeLink === "/Faq" ? "active" : ""}>
         <span className="material-icons-sharp">help</span>
         <h3>Faq</h3>
        </Link>)}
        
        {admin ? (
          ""
        ) : (
          <Link to="/reports" className={activeLink === '/reports' ? "active" : ""}>
            <span className="material-icons-sharp">summarize</span>
            <h3>Reports</h3>
          </Link>
        )}
        <Link to="/" onClick={handleLogout}>
          <span className="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;