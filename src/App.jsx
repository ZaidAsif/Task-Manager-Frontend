import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// 🔐 Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// 🧭 Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// 🧱 Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminTasks from "./pages/AdminTask";
import AdminUsers from "./pages/AdminUsers";
import AdminProfile from "./pages/AdminProfile";

// 🧱 User Pages
import UserDashboard from "./pages/UserDashboard";

// 🧩 Route Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminReports from "./pages/AdminReports";

// 👥 Mock Pages (placeholders)
const Users = () => <div className="p-6">👥 Users Management Page (Admin)</div>;
const Reports = () => <div className="p-6">📑 Reports Export Page (Admin)</div>;
const Tasks = () => <div className="p-6">🧾 My Tasks Page (User)</div>;

export default function App() {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser(); // rehydrates user if token is present
  }, []);

  return (
    <Routes>
      {/* 🌐 Public Routes (login/register) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* 🔒 Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* 👑 Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-tasks" element={<AdminTasks />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-reports" element={<AdminReports />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
        </Route>

        {/* 🙋‍♂️ User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Route>

      {/* 🚫 Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
