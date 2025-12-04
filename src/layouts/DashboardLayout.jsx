import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F4F1DE] text-[#2F2F2F]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
