import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Context";

export default function ProtectedRoute({ children }) {
  const { state } = useContext(Context);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/login" />;
}

