import { useState, useEffect } from "react";
import InviteUserModal from "../components/AdminUsers/InviteUserModal";
import UserTable from "../components/AdminUsers/UserTable";
import { useInviteStore } from "../store/inviteStore";
import { getUsers } from "../api/userApi";
import { UserPlus, RefreshCw, Users, UserCog } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const { invitations, fetchInvitations, loading: inviteLoading } = useInviteStore();
  const [open, setOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch Invitations
  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  // Fetch Registered Users
  const fetchRegisteredUsers = async () => {
    try {
      setLoadingUsers(true);
      const { data } = await getUsers();
      setRegisteredUsers(data);
    } catch (err) {
      toast.error("Failed to load registered users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  const handleRefreshAll = () => {
    fetchInvitations();
    fetchRegisteredUsers();
    toast.success("Data refreshed");
  };

  return (
    <div className="p-6 space-y-10">
      {/* HEADER */}
      <PageHeader
        title="User Management"
        subtitle="Manage invitations, onboard team members, and view registered user details."
        icon={<Users size={26} />}
        actions={
          <>
            <button
              onClick={handleRefreshAll}
              className="flex items-center gap-2 bg-[#EAE7DC] hover:bg-[#D6D3C9] text-[#2F2F2F] px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <RefreshCw size={16} /> Refresh
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-[#556B2F] hover:bg-[#445726] text-white px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <UserPlus size={16} /> Invite User
            </button>
          </>
        }
      />

      <section className="bg-white border border-[#E5E5E0] rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-[#2F2F2F] mb-4 flex items-center gap-2">
          <UserCog className="text-[#556B2F]" /> Registered Users
        </h2>
        {loadingUsers ? (
          <p className="text-center text-gray-500 py-8">Loading registered users...</p>
        ) : registeredUsers.length > 0 ? (
          <RegisteredUserTable users={registeredUsers} />
        ) : (
          <p className="text-center text-gray-500 py-8 italic">
            No registered users found.
          </p>
        )}
      </section>

      <section className="bg-white border border-[#E5E5E0] rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-[#2F2F2F] mb-4 flex items-center gap-2">
          <UserPlus className="text-[#556B2F]" /> Invitations
        </h2>
        {inviteLoading ? (
          <p className="text-center text-gray-500 py-8">Loading invitations...</p>
        ) : (
          <UserTable invitations={invitations} />
        )}
      </section>

      <InviteUserModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function RegisteredUserTable({ users }) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#556B2F]/10 text-[#2F2F2F] uppercase tracking-wide text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Pending</th>
            <th className="px-4 py-3 text-left">In Progress</th>
            <th className="px-4 py-3 text-left">Completed</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u._id}
              className="border-t border-[#EAE7DC] hover:bg-[#F9F8F4] transition"
            >
              <td className="px-4 py-3 font-medium text-[#2F2F2F]">{u.name}</td>
              <td className="px-4 py-3 text-[#555]">{u.email}</td>
              <td className="px-4 py-3 text-yellow-800">{u.pendingTasks}</td>
              <td className="px-4 py-3 text-blue-800">{u.inProgressTasks}</td>
              <td className="px-4 py-3 text-green-800 font-semibold">{u.completedTask}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
