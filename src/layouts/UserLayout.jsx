import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#F4F1DE]">
      
      {/* FIXED SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen z-20">
        <Sidebar role="user" />
      </div>

      {/* MAIN CONTENT OFFSET BY SIDEBAR WIDTH */}
      <div className="flex-1 flex flex-col ml-62 overflow-hidden">
        {/* adjust ml-56 to your sidebar width */}
        
        <Topbar />

        <main className="flex-1 overflow-y-auto overflow-x-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
