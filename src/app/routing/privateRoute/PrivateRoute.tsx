import type { ReactNode } from "react";
import { useAuth } from "../../../shared/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth?.user === null)
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  return children;
};
