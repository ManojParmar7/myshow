/*eslint-disable */
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {

  const checkdata = localStorage.getItem("auth");

  return checkdata ? <Outlet /> : <Navigate to="/login" />;


};

export default PrivateRoute;
