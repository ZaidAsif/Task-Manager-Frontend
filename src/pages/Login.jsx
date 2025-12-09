import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { loginUser } from "../api/authApi";
import { LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setLoading, loading, setError, error } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const { data } = await loginUser(form);
      console.log("Login successful, received data:", data);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);

      if (data.user.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F1DE]">
{/* Left: Illustration Section */}
<div className="hidden md:flex w-1/2 relative overflow-hidden">

  {/* Soft gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#EAE7DC] via-[#F4F1DE] to-[#E0DDD2]" />

  {/* Decorative blurred shape for premium look */}
  <div className="absolute -top-10 -left-10 w-60 h-60 bg-[#556B2F]/20 rounded-full blur-3xl opacity-40" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#708D81]/20 rounded-full blur-3xl opacity-30" />

  {/* Illustration */}
  <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
    <img
      src="login-illustration.png"
      alt="Team collaboration illustration"
      className="w-[80%] max-w-[550px] object-contain drop-shadow-2xl rounded-2xl 
                 transition-all duration-500 hover:scale-[1.03]"
    />
  </div>

  {/* Bottom soft fade */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F4F1DE] to-transparent opacity-70" />
</div>


      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-[#EAE7DC] shadow-xl rounded-2xl p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#556B2F]/10 p-3 rounded-full mb-3">
              <LogIn className="text-[#556B2F]" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-1 text-center">
              Log in to manage your projects and stay productive.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 text-sm py-2 px-3 rounded mb-4 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-[#2F2F2F] flex items-center gap-2 mb-1">
                <Mail size={16} className="text-[#556B2F]" /> Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="border border-[#D6D3C9] w-full p-4 rounded-md focus:ring-2 focus:ring-[#556B2F]/40 focus:border-[#556B2F] outline-none transition text-[#2F2F2F]"
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
                className="border border-[#D6D3C9] w-full p-4 rounded-md focus:ring-2 focus:ring-[#556B2F]/40 focus:border-[#556B2F] outline-none transition text-[#2F2F2F]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#556B2F] text-white py-3 rounded-md font-semibold hover:bg-[#445726] transition-all duration-200 disabled:opacity-60 shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-[#444] mt-6">
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
    </div>
  );
};

export default Login;
