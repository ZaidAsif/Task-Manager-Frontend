import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F1DE]">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col">
        <Topbar />
<main className="flex-1 overflow-y-auto overflow-x-auto px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
