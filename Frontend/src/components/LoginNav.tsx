

const Navbar = () => {
  return (
    <nav className="bg-[#212121] text-white  p-4 fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Website Name */}
        <h1 className="text-3xl font-mono font-bold tracking-wide">YinYang</h1>



        {/* Buttons */}
        <div className="flex gap-4 ">
          <button className="bg-[#212121] text-[#acacaf] px-4 py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition inline-flex items-center gap-2 font-semibold">
            Sign Up to Chat
          </button>
          <button className="bg-[#212121] text-[#acacaf] px-4 py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition inline-flex items-center gap-2 font-semibold">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
