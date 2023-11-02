import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = true; // Replace with your authentication logic

  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
