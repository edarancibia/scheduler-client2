import { Navigate } from "react-router-dom";
import { useMemo } from "react";

const PrivateRoute = ({ Component }: { Component: React.FC }) => {
  const isAuthenticated = useMemo(() => !!localStorage.getItem("token"), []);

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
