// Import necessary modules and components from React, ReactDOM, and React Router
import React from 'react'
import { createRoot } from 'react-dom/client' // New method for creating the root
// import { BrowserRouter } from 'react-router-dom' // BrowserRouter for routing

import App from './App' // Main App component
import './index.css' // Global CSS file

// Find the root element in the HTML where the React app will be mounted
const rootElement = document.getElementById('root')
const root = createRoot(rootElement) // Create the root for rendering

// Render the app within React.StrictMode and BrowserRouter
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)