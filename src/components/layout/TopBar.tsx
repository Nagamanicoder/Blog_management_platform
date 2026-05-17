import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Topbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-[50px] py-[10px] bg-white text-[#0e0e0f] border-b border-gray-200">
      
      {/* LEFT: BRAND */}
      <div className="flex items-center gap-[10px]">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-[40px] w-[40px]"
          />
        </Link>

        <div>
          <p className="font-bold leading-none">INSCRIBE</p>
          <p className="text-[12px] opacity-70 leading-none">
            Craft your digital literacy
          </p>
        </div>
      </div>

      {/* RIGHT: LINKS */}
      <ul className="flex gap-[20px] list-none">
        <li>
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-[#333] font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </li>

        <li>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-[#101010] text-[#f9f8f8] font-medium hover:bg-orange-500 transition"
          >
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;