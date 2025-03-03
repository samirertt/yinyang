import Logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-[#212121] text-white p-3 fixed w-347 z-10 top-0">
      <div className="lg:max-w-8xl max-w-110  md:max-w-158 mx-auto flex justify-between items-center px-4 md:px-10">
        {/* Website Name and Logo (Always at the Start) */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo icon" className="w-6 h-6 rounded-full" />
          <h1 className="text-3xl font-mono font-bold tracking-wide ml-2">
            YinYang
          </h1>
        </div>

        {/* Buttons (Pushed to the End) */}
        <div className="flex gap-4 md:gap-6">
          <button className="bg-[#212121] text-[#acacaf] px-4 py-2 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition font-semibold">
            Sign Up to Chat
          </button>
          <button className="bg-[#212121] text-[#acacaf] px-4 py-2 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition font-semibold">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;