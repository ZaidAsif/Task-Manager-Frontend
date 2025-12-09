import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UploadCloud, Loader2 } from "lucide-react";
import api from "../api/axios";

export default function ConfirmInvitePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imgForm = new FormData();
    imgForm.append("image", file);

    try {
      const { data } = await api.post("/auth/upload-image", imgForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ ...formData, profileImage: data.imageURL });
      setPreview(data.imageURL);
    } catch (err) {
      setError("Image upload failed. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/invite/accept", {
        token,
        name: formData.name,
        password: formData.password,
        profileImage: formData.profileImage,
      });
      if (data.success) {
        navigate("/login", { state: { fromInvite: true } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F4F1DE]">
      
      {/* Left Section – PREMIUM Illustration Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EAE7DC] via-[#F4F1DE] to-[#E2DFD4]" />

        {/* Soft Glowing Shapes */}
        <div className="absolute -top-12 -left-12 w-72 h-72 bg-[#708D81]/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#556B2F]/20 rounded-full blur-3xl opacity-30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-12">
          <h1 className="text-4xl font-bold text-[#2F2F2F] mb-4">
            Welcome to TaskManager
          </h1>
          <p className="text-[#3B3B3B]/70 max-w-md leading-relaxed text-lg">
            You're just one step away from joining your team.  
            Complete your profile and start collaborating seamlessly.
          </p>

          <img
            src="/onboarding.png"
            alt="Onboarding Illustration"
            className="mt-10 w-4/5 max-w-md drop-shadow-xl rounded-lg transition-all duration-500 hover:scale-[1.03]"
          />
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F4F1DE] to-transparent opacity-70" />
      </div>

      {/* Right Side – Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-[#EAE7DC] shadow-xl rounded-2xl p-8">

          {/* Header */}
          <h2 className="text-3xl font-bold text-[#2F2F2F] text-center mb-2">
            Complete Your Registration
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Set up your credentials to activate your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                className="w-full border border-[#DCD8CE] rounded-lg px-4 py-3
                           focus:ring-2 focus:ring-[#708D81]/50 outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create password"
                  className="w-full border border-[#DCD8CE] rounded-lg px-4 py-3 pr-12
                             focus:ring-2 focus:ring-[#708D81]/50 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPwd ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  placeholder="Re-enter password"
                  className="w-full border border-[#DCD8CE] rounded-lg px-4 py-3 pr-12
                             focus:ring-2 focus:ring-[#708D81]/50 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirmPwd ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">
                Profile Image (optional)
              </label>

              <label className="flex items-center justify-center cursor-pointer border border-[#DCD8CE] rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-[#F8F7F2] transition">
                <UploadCloud size={18} className="mr-2 text-[#708D81]" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-20 w-20 rounded-full object-cover border border-[#EAE7DC] mt-3"
                />
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm text-center font-medium">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#556B2F] hover:bg-[#445726] text-white font-semibold py-3 rounded-lg transition 
                         flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              className="text-[#708D81] hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
