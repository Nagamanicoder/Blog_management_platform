import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AuthRoutes; 