import { useNavigate } from "react-router-dom";

interface NavbarProps {
  username: string | null;  // Update type to allow null (if not logged in)
}

const Navbar = ({ username }: NavbarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { state: { username } });
  };

  const handleBackLogin = () => {
    navigate("/Login", { state: { username } });
  };

  return (
    <nav className="bg-[#212121] text-white p-3 fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center px-4 md:px-10">
        {/* Title (Centered) */}
        <h1 onClick={handleBackLogin} className="text-2xl md:text-3xl font-mono font-bold cursor-pointer">
          YinYang
        </h1>

        <div className="flex items-center gap-3 ml-auto">
          {/* Conditionally render either the username or sign-in button */}
          {username ? (
            <span className="text-sm md:text-base text-[#acacaf] font-semibold">
              {username}
            </span>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="bg-[#212121] text-[#acacaf] px-2 md:px-3 py-1 md:py-2 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition font-semibold text-sm md:text-base whitespace-nowrap"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
