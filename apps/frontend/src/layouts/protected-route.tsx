import { Navigate } from "react-router";
import { useAuthStore } from "../store/use-auth-store";
import type { JSX } from "react";


interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
