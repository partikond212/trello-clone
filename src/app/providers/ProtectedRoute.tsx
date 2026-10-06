import React, { type FC } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (user === null && isLoading === false) {
    return <Navigate to="/user/auth" />;
  } else if (isLoading) {
    return <div>Загрузка....</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
