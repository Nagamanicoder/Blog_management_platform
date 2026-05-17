import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10 bg-[#f5f6f8] border-t border-gray-200">
      <div className="flex flex-col items-center gap-4">
        
        <p className="text-gray-600 text-sm">
          Designed and Built by{" "}
          <span className="font-semibold text-black">E Nagamani</span>
        </p>

        <div className="flex gap-6">
          <a href="https://github.com/Nagamanicoder" className="text-gray-500 hover:text-black">
            <FaGithub  size={20} />
          </a>

          <a href="https://www.linkedin.com/in/e-nagamani" className="text-gray-500 hover:text-black">
            <FaLinkedin size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;