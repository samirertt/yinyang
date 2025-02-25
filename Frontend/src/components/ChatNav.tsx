const Navbar = () => {
  return (
    <nav className="bg-[#212121] text-white p-3 fixed w-315 z-50 top-0">
      <div className="max-w-8xl mx-auto flex justify-between items-center px-4 md:px-10">
        {/* Website Name (Always at the Start) */}
        <h1 className="text-3xl font-mono font-bold tracking-wide">YinYang</h1>

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
