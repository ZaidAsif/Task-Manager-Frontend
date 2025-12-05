import { useState, useEffect } from "react";
import InviteUserModal from "../components/AdminUsers/InviteUserModal";
import UserTable from "../components/AdminUsers/UserTable";
import { useInviteStore } from "../store/inviteStore";
import { UserPlus, RefreshCw } from "lucide-react";

export default function AdminUsers() {
  const { invitations, fetchInvitations, loading } = useInviteStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2F2F2F]">User Management</h1>
          <p className="text-sm text-[#666] mt-1">
            Manage team invitations, track status, and onboard collaborators.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => fetchInvitations()}
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
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E5E0] rounded-xl shadow-md p-4">
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading users...</p>
        ) : (
          <UserTable invitations={invitations} />
        )}
      </div>

      <InviteUserModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
