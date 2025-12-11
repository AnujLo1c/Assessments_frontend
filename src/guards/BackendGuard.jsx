import { Navigate, Outlet } from "react-router-dom";
import { useBackend } from "../context/BackendContext";

export function BackendGuard() {
  const { backendReady } = useBackend();

  if (!backendReady) return <Navigate to="/loading" replace />;
  return <Outlet />;
}
