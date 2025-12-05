import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/**
 * PublicRoute
 * Redirects authenticated users (with valid token)
 * away from login/register to their proper dashboard.
 */
export default function PublicRoute({ children }) {
  const { user} = useAuthStore();
  let token = localStorage.getItem("token");
  console.log("PublicRoute - token:", token);
  console.log("PublicRoute - user:", user);

  if (token && user) {
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (user.role === "user") return <Navigate to="/user-dashboard" replace />;
  }

  // if not authenticated → render the public page
  return children;
}
