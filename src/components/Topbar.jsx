import { Menu } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Topbar = ({ onMenuToggle }) => {
  const { user } = useAuthStore();

  return (
    <header className="h-14 bg-[#F4F1DE] flex items-center justify-between px-4 border-b border-[#E0DDCF]">
      {/* <button onClick={onMenuToggle} className="md:hidden text-[#708D81] hover:text-[#5D7A6E]">
        <Menu size={22} />
      </button> */}
      <h1 className="text-[#3E3E2B] font-medium tracking-wide text-sm sm:text-base">
        Welcome back, <span className="font-semibold">{user?.name?.split(" ")[0]}</span>
      </h1>
      <img
        src={user?.profileImage || "/default-avatar.png"}
        alt="avatar"
        className="w-9 h-9 rounded-full object-cover border border-[#708D81]/30"
      />
    </header>
  );
};

export default Topbar;
