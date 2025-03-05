import Logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-[#212121] text-white p-3 fixed w-full lg:w-347 z-10 top-0">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-10">
        {/* Website Name and Logo (Always at the Start) */}
        <div className="flex items-center flex-shrink-0">
          <img src={Logo} alt="Logo icon" className="w-6 h-6 rounded-full" />
          <h1 className="text-2xl md:text-3xl font-mono font-bold tracking-wide ml-2 whitespace-nowrap">
            YinYang
          </h1>
        </div>

        {/* Buttons (Pushed to the End) */}
        <div className="flex gap-2 md:gap-6">
          <button className="bg-[#212121] text-[#acacaf] px-2 md:px-3 py-1 md:py-2 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition font-semibold text-sm md:text-base whitespace-nowrap">
            Sign Up to Chat
          </button>
          <button className="bg-[#212121] text-[#acacaf] px-2 md:px-3 py-1 md:py-2 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition font-semibold text-sm md:text-base whitespace-nowrap">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;