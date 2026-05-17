// pages/Signup.tsx

import { useState } from "react";
import type { ChangeEvent } from "react";

import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import GoogleAuthButton from "../../components/GoogleAuthButton";
import logo from "../../assets/logo.png";
import signin_img from "../../assets/signin_img.png";

import { apiClient } from "../../utils/api/fetchClient";
import { ENDPOINTS } from "../../utils/api/endpoints";

import type {
  SignupRequest,
  SignupResponse,
  GoogleAuthRequest,
} from "../../types/auth.types";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupRequest>({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await apiClient.post<SignupResponse>(
        ENDPOINTS.AUTH.REGISTER,
        formData
      );

      toast.success(data.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (idToken: string) => {
    const payload: GoogleAuthRequest = { id_token: idToken };

    try {
      const data = await apiClient.post<SignupResponse>(
        ENDPOINTS.AUTH.GOOGLE_LOGIN,
        payload
      );

      toast.success(data.message);
      navigate("/");
    } catch {
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      
      {/* LEFT */}
      <div className="flex-1 flex flex-col justify-center items-center px-10 bg-white">
        
        <div className="flex items-center gap-2 mb-8">
          <Link to="/">
            <img src={logo} className="w-10 h-10" />
          </Link>
          <div>
            <p className="font-bold">INSCRIBE</p>
            <p className="text-xs opacity-70">Craft your digital literacy</p>
          </div>
        </div>

        <div className="w-[360px] bg-white p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          
          <h1 className="text-center font-bold text-lg mb-5">
            Become an Inscriber
          </h1>

          <form onSubmit={handleSignup} className="space-y-3">
            
            <input
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 pr-10 border rounded-lg"
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
              className="w-full py-3 mt-3 rounded-lg text-white font-semibold 
              bg-gradient-to-br from-slate-900 to-slate-700"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link className="text-teal-600 font-semibold" to="/login">
              Login
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
            onError={() => toast.error("Google failed")}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <img
          src={signin_img}
          className="w-full h-screen object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Signup;