import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/me", {
        credentials: "include",
      });
      setIsAuthenticated(res.ok);
    } catch {
      setIsAuthenticated(false);
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, [location]); // re-check auth on every route change

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
