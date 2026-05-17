import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AppLayout from "../components/layout/AppLayout";
import Drafts from "../pages/admin/Drafts";
import Home from "../pages/admin/Home";
import Published from "../pages/admin/Published";
import Writer from "../pages/admin/Writer";
import Profile from "../pages/admin/Profile";

import ChatWidget from "../components/ChatWidget/ChatWidget";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path="published" element={<Published />} />
          <Route path="writer" element={<Writer />} />
          <Route path="writer/:id" element={<Writer />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>

      <ChatWidget />
    </>
  );
};

export default AdminRoutes;