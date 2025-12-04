import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/**
 * ProtectedRoute
 * Handles route access based on:
 *  - Authentication (token presence)
 *  - Role-based routing (admin vs user)
 *  - Direct URL access protection
 */
export default function ProtectedRoute() {
  const { token, user } = useAuthStore();
  const location = useLocation();

  // 🚫 Not logged in → redirect to login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔐 Role-based redirects
  if (user.role === "admin") {
    // Admin trying to access user routes → redirect
    if (location.pathname.startsWith("/user")) {
      return <Navigate to="/admin-dashboard" replace />;
    }
  } else if (user.role === "user") {
    // User trying to access admin routes → redirect
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/user-dashboard" replace />;
    }
  }

  // ✅ Access granted
  return <Outlet />;
}
