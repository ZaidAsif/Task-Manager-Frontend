import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, uploadProfileImage } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { UserPlus, Mail, Lock, Image, KeyRound } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { loading, setLoading, error, setError } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    admin_JOIN_Code: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await uploadProfileImage(formData);
    console.log("Uploaded image URL:", data.imageURL);
    return data.imageURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Profile image is required");
      return;
    }

    try {
      setLoading(true);
      const profileImage = await handleUploadImage();

      await registerUser({ ...form, profileImage });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 UI starts here
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5] px-4">
      <div className="bg-white/70 backdrop-blur-lg border border-[#D6D3C9] shadow-lg p-8 rounded-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#556B2F]/10 p-3 rounded-full mb-3">
            <UserPlus className="text-[#556B2F]" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-[#2F2F2F]">Create Your Account</h2>
          <p className="text-sm text-[#666] mt-1">Join our workspace today</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-[#2F2F2F] flex items-center gap-2 mb-1">
              <UserPlus size={16} className="text-[#556B2F]" /> Full Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="border border-[#D6D3C9] w-full p-3 rounded-md focus:ring-2 focus:ring-[#556B2F]/40 focus:border-[#556B2F] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#2F2F2F] flex items-center gap-2 mb-1">
              <Mail size={16} className="text-[#556B2F]" /> Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="border border-[#D6D3C9] w-full p-3 rounded-md focus:ring-2 focus:ring-[#556B2F]/40 focus:border-[#556B2F] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#2F2F2F] flex items-center gap-2 mb-1">
              <Lock size={16} className="text-[#556B2F]" /> Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="border border-[#D6D3C9] w-full p-3 rounded-md focus:ring-2 focus:ring-[#556B2F]/40 focus:border-[#556B2F] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#2F2F2F] flex items-center gap-2 mb-1">
              <KeyRound size={16} className="text-[#556B2F]" /> Admin Join Code (Optional)
            </label>
            <input
              name="admin_JOIN_Code"
              placeholder="Enter code if admin"
              value={form.admin_JOIN_Code}
              onChange={handleChange}
              className="border border-[#D6D3C9] w-full p-3 rounded-md focus:ring-2 focus:ring-[#556B2F]/40 focus:border-[#556B2F] outline-none transition"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-[#2F2F2F] flex items-center gap-2 mb-2">
              <Image size={16} className="text-[#556B2F]" /> Profile Image
            </label>
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover mb-3 border border-[#D6D3C9]"
              />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="text-sm text-[#2F2F2F]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556B2F] text-white py-3 rounded-md font-semibold hover:bg-[#445726] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-[#555] mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#556B2F] font-medium hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
