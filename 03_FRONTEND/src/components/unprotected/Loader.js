// Loader.js

import React from 'react';
import { Oval } from 'react-loader-spinner';
const LoadingSpinner = () => {
  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //   <Oval
    //     height={80}
    //     width={80}
    //     color="#4fa94d"
    //     wrapperStyle={{}}
    //     wrapperClass=""
    //     visible={true}
    //     ariaLabel='oval-loading'
    //     secondaryColor="#4fa94d"
    //     strokeWidth={2}
    //     strokeWidthSecondary={2}
    //   />
    // </div>
    <div className="loader">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    </div>
  );
}

export default LoadingSpinner;
