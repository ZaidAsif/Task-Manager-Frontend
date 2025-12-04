import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { loginUser } from "../api/authApi";
import { LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setLoading, loading, setError, error } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const { data } = await loginUser(form);
      console.log("Login successful, received data:", data);
      setToken(data.token);
      console.log("Fetched user" , data.user);
      setUser(data.user);
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
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
            <LogIn className="text-[#556B2F]" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-[#2F2F2F]">Welcome Back</h2>
          <p className="text-sm text-[#666] mt-1">Log in to manage your tasks</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-[#2F2F2F] flex items-center gap-2 mb-1">
              <Mail size={16} className="text-[#556B2F]" /> Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="border border-[#D6D3C9] w-full p-3 rounded-md focus:ring-2 focus:ring-[#556B2F]/40 focus:border-[#556B2F] outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556B2F] text-beige py-3 rounded-md text-white font-semibold hover:bg-[#445726] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-[#555] mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#556B2F] font-medium hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
