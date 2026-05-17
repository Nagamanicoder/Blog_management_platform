// pages/Login.tsx

import { useState } from "react";
import type { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import GoogleAuthButton from "../../components/GoogleAuthButton";
import logo from "../../assets/logo.png";
import login_img from "../../assets/login_img.png";

import { apiClient } from "../../utils/api/fetchClient";
import { ENDPOINTS } from "../../utils/api/endpoints";
import type { LoginRequest, LoginResponse } from "../../types/auth.types";
import { useAuth } from "../../context/AuthContext"; 

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await apiClient.post<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN,
        formData
      );

      login({ id: data.id, email: data.email, username: data.username }); 
      toast.success(data.message || "Login Successful");
      navigate("/admin/home");
    } catch (error: any) {
      toast.error(error.message || "Invalid Credentials");
    }
  };

  const handleGoogleSuccess = async (idToken: string) => {
    try {
      const data = await apiClient.post<LoginResponse>(
        ENDPOINTS.AUTH.GOOGLE_LOGIN,
        { id_token: idToken }
      );

      login({ id: data.id, email: data.email, username: data.username }); 
      toast.success(data.message || "Google Login Successful");
      navigate("/admin/home"); // 👈 redirect to dashboard
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      
      {/* LEFT */}
      <div className="flex-1 flex flex-col justify-center items-center px-10 bg-white">
        
        {/* HEADER */}
        <div className="flex items-center gap-2 mb-8">
          <Link to="/">
            <img src={logo} className="w-10 h-10" />
          </Link>
          <div>
            <p className="font-bold">INSCRIBE</p>
            <p className="text-xs opacity-70">Craft your digital literacy</p>
          </div>
        </div>

        {/* CARD */}
        <div className="w-[360px] bg-white p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          
          <h1 className="text-center font-bold text-lg mb-5">
            Return to Your Workspace
          </h1>

          <form onSubmit={handleLogin} className="space-y-3">
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-3 py-3 rounded-lg text-white font-semibold 
              bg-gradient-to-br from-slate-900 to-slate-700
              hover:shadow-lg hover:-translate-y-[1px] transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            No account?{" "}
            <Link className="text-teal-600 font-semibold" to="/signup">
              Signup
            </Link>
          </p>

          <div className="relative text-center my-6">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200" />
            <span className="relative bg-white px-3 text-xs text-gray-400">
              or
            </span>
          </div>

          <GoogleAuthButton
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google auth failed")}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <img
          src={login_img}
          className="w-full h-screen object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Login;