import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { LogOut, LayoutDashboard, ListChecks, Users, FileText, UserCircle, } from "lucide-react";

const Sidebar = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // const navItems = [
  //   { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  //   { to: "/tasks", label: "Tasks", icon: <ListChecks size={18} /> },
  // ];

  let adminNavItems;
  if (user?.role === "admin") {
    adminNavItems = [
      { to: "/admin-dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { to: "/admin-tasks", label: "Tasks", icon: <ListChecks size={18} /> },
      { to: "/admin-users", label: "Users", icon: <Users size={18} /> },
      { to: "/admin-reports", label: "Reports", icon: <FileText size={18} /> },
      { to: "/admin-profile", label: "Profile", icon: <UserCircle size={18} /> },
    ]
  }

  const navItems = adminNavItems;

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-[#708D81] text-[#F4F1DE] transition-all duration-300 flex flex-col sticky top-0 h-screen`}
    >
      {/* Logo Section */}
      <div className="p-4 font-bold text-lg flex justify-between items-center border-b border-[#5D7A6E]">
        {!collapsed && <span>TaskManager</span>}
        <button
          className="text-[#F4F1DE]/70 text-2xl hover:text-[#F4F1DE]"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 mt-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-[#5D7A6E] text-[#F4F1DE]"
                  : "text-[#F4F1DE]/80 hover:bg-[#5D7A6E]/70 hover:text-[#F4F1DE]"
              }`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-[#5D7A6E]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-[#F4F1DE]/80 hover:text-[#F4F1DE]"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
