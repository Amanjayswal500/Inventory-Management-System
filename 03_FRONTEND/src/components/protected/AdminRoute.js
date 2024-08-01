import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user ? user.role : null;
  
  return token && role === 1 ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminRoute;