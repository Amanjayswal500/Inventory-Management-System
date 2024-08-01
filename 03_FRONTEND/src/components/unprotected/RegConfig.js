import React from 'react'
import { Link } from 'react-router-dom';

import img1 from '../../images/conf.png';

const RegConfig = () => {
  return (
    <div className="container">
    <div className="popup">
      <img src={img1} alt=""/>
      <h1>Registration Confirmed!</h1>
      <p>Thank you for registering,</p>
      <p>You can now log in to your account.</p>
      <Link to="/signin">Login Here</Link>
    </div>
  </div>
  )
}

export default RegConfig
