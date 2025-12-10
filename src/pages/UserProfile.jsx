import { useEffect, useState } from "react";
import { getProfile, updateProfile, uploadProfileImage } from "../api/userApi";
import { Camera, Save, UserCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setProfile(data.user);
      setForm({
        name: data.user.name || "",
        email: data.user.email || "",
      });
      setPreview(data.user.profileImage || null);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setPreview(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let updatedPayload = { ...form };

      if (file) {
        const { data } = await uploadProfileImage(file);
        updatedPayload.profileImage = data.imageURL;
      }

      await updateProfile(updatedPayload);
      toast.success("Profile updated successfully!");
      fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!profile)
    return (
      <p className="text-center text-gray-500 mt-10">Loading profile...</p>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="View and update your personal information."
        icon={<UserCircle2 size={26} />}
      />

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow border border-[#E5E5E0] p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={preview || "/default-avatar.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border border-[#D6D3C9]"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-1 bg-[#556B2F] text-white p-2 rounded-full cursor-pointer hover:bg-[#445726] transition"
              >
                <Camera size={16} />
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#2F2F2F]">
                {form.name}
              </h2>
              <p className="text-sm text-gray-500">{form.email}</p>
              <p className="text-xs text-gray-400 italic mt-1">
                {profile.role === "admin"
                  ? "Administrator"
                  : "Registered User"}
              </p>
            </div>
          </div>

          {/* Info Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#2F2F2F] mb-1 block">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-[#D6D3C9] rounded-md p-2.5 focus:ring-2 focus:ring-[#556B2F]/40 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#2F2F2F] mb-1 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                disabled
                className="w-full border border-[#D6D3C9] rounded-md p-2.5 bg-gray-100 text-gray-600"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#556B2F] text-white px-5 py-2.5 rounded-md hover:bg-[#445726] transition disabled:opacity-60"
            >
              <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
