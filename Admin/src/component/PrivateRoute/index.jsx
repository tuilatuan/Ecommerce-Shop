import React from "react";
import tokenMethod from "../../utils/token";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirecPath = "/" }) => {
  if (!!!tokenMethod.get()) {
    return <Navigate to={redirecPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
