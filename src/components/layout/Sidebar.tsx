import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import DraftsIcon from "@mui/icons-material/Drafts";
import PublishIcon from "@mui/icons-material/Publish";
import LogoutIcon from "@mui/icons-material/Logout";

const items = [
  { label: "Home",      icon: <HomeIcon />,    path: "/admin/home" },
  { label: "Write",     icon: <CreateIcon />,  path: "/admin/writer" },
  { label: "Drafts",    icon: <DraftsIcon />,  path: "/admin/drafts" },
  { label: "Published", icon: <PublishIcon />, path: "/admin/published" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="h-screen flex flex-col">
      <style>{`
        .sidebar-root,
        .sidebar-root .ps-sidebar-container {
          background-color: #1F0954 !important;
          border: none !important;
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
        }
        .ps-sidebar-container {
          display: flex !important;
          flex-direction: column !important;
        }
        .sidebar-menu-grow {
          flex: 1;
        }
        .ps-menuitem-root .ps-menu-button {
          background-color: transparent !important;
          color: white !important;
        }
        .ps-menuitem-root .ps-menu-button:hover {
          background-color: transparent !important;
        }
        .active-item .ps-menu-button {
          border: 2px solid rgba(255, 255, 255, 0.4) !important;
          border-radius: 6px;
        }
        .logout-item .ps-menu-button:hover {
          border: 2px solid rgba(255, 80, 80, 0.5) !important;
          border-radius: 6px;
        }
        .logout-item .ps-menu-button {
          color: rgba(255, 150, 150, 0.9) !important;
        }
      `}</style>

      <Sidebar
        collapsed={collapsed}
        className="sidebar-root h-full"
        width="220px"
        collapsedWidth="64px"
      >
        {/* Logo + Title */}
        <div
          className="flex items-center gap-3 px-4 py-4 border-b border-[#3b3270] cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <img
            src="/logo.png"
            alt="Inscribe Logo"
            className="w-9 h-9 object-contain flex-shrink-0"
          />
          {!collapsed && (
            <span className="text-white text-lg font-bold whitespace-nowrap">
              Inscribe
            </span>
          )}
        </div>

        {/* Nav Items */}
        <Menu className="sidebar-menu-grow">
          {items.map(({ label, icon, path }) => (
            <MenuItem
              key={label}
              icon={icon}
              component={<Link to={path} />}
              className={`py-3 transition-all duration-200 ${
                location.pathname === path ? "active-item" : ""
              }`}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>

        {/* Profile — above logout */}
        <Link to="/admin/profile" className="border-t border-[#3b3270] px-3 py-3 flex items-center gap-3 hover:bg-[#2d1a6e] transition rounded-lg mx-1 no-underline">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-purple-300 text-[#1F0954] flex items-center justify-center font-bold text-sm flex-shrink-0">
            {user?.username?.charAt(0).toUpperCase() ?? "?"}
          </div>
          {/* Name + Email */}
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">{user?.username}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email}</p>
            </div>
          )}
        </Link>

        {/* Logout — pinned to bottom */}
        <Menu>
          <div className="border-t border-[#3b3270]">
            <MenuItem
              icon={<LogoutIcon />}
              className="py-3 transition-all duration-200 logout-item"
              component={
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLogoutModal(true);
                  }}
                />
              }
            >
              Logout
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1F0954] rounded-2xl p-6 w-[320px] shadow-xl border border-[#3b3270]">
            <h3 className="text-white font-bold text-lg mb-1">Logging out?</h3>
            <p className="text-gray-400 text-sm mb-6">
              You'll need to sign in again to access your account.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-1.5 text-sm text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowLogoutModal(false); logout(); }}
                className="px-5 py-1.5 text-sm bg-red-500/80 hover:bg-red-500 text-white font-semibold rounded-full transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSidebar;