import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import decodeToken from "../formatter/decodeToken";
import Login from "./Login";

function RequireAuth({ allowedRoles = [] }) {
  const { auth } = useAuth();
  const decode = decodeToken(auth?.accessToken || undefined);
  const location = useLocation();
  const isAllowed = allowedRoles.includes(decode?.role || "");
  return isAllowed ? <Outlet /> : auth?.accessToken ? <Navigate to="/unauthorized" state={{ from: location }} /> : <Navigate to="/login" state={{ from: location }} />;
}

export default RequireAuth;
