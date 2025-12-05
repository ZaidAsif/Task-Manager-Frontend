import { useState } from "react";
import { useInviteStore } from "../../store/inviteStore";
import { X, Mail, UserPlus } from "lucide-react";

export default function InviteUserModal({ open, onClose }) {
  const { inviteUser, loading } = useInviteStore();
  const [form, setForm] = useState({ email: "", speciality: "" });

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await inviteUser(form);
    if (success) {
      setForm({ email: "", speciality: "" });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-[#556B2F]"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="text-[#556B2F]" />
          <h2 className="text-xl font-semibold text-[#2F2F2F]">
            Invite New User
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2F2F2F] mb-1">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-3 text-[#556B2F]/60"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="user@example.com"
                required
                className="pl-9 w-full border border-[#D6D3C9] rounded-md p-2.5 focus:ring-2 focus:ring-[#556B2F]/40 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2F2F2F] mb-1">
              Speciality
            </label>
            <input
              type="text"
              name="speciality"
              value={form.speciality}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer, UI Designer"
              required
              className="w-full border border-[#D6D3C9] rounded-md p-2.5 focus:ring-2 focus:ring-[#556B2F]/40 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556B2F] text-white py-2.5 rounded-md font-medium hover:bg-[#445726] transition"
          >
            {loading ? "Sending Invite..." : "Send Invitation"}
          </button>
        </form>
      </div>
    </div>
  );
}
