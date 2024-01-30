/*eslint-disable */
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ShowsContext from "../context/shows/showsContext";

const PrivateRoute = () => {
  const { allUsers, auth,  } = useContext(ShowsContext);

  const isAuthorized = allUsers.some(user => user.id == auth.id || user.email == auth.id);

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
