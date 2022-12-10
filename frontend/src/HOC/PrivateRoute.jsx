import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
const PrivateRoute = ({ children }) => {
  const {credData}=useContext(AuthContext)
  
  if (!credData.isAuth) {
    return <Navigate to="/signup" />;
  } else {
    return children;
  }
};

export default PrivateRoute;
