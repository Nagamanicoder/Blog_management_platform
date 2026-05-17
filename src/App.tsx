import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import AdminRoutes from "./routes/adminRoutes";
import BlogDetail from "./pages/admin/BlogDetail";



const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
      
      <Toaster position="top-right" />
    </>
  );
};

export default App;