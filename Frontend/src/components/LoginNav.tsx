import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#212121] text-white p-3 sm:p-4 fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* Website Name */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-wide">
          YinYang
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            className="bg-[#212121] text-[#acacaf] px-3 py-2 sm:px-4 sm:py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
            onClick={() => navigate("/SignUp")}
          >
            <span className="sm:hidden">Sign Up</span>
            <span className="hidden sm:inline">Sign Up to Chat</span>
          </button>
          <button
            className="bg-[#212121] text-[#acacaf] px-3 py-2 sm:px-4 sm:py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;