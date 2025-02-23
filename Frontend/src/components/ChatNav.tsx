

const Navbar = () => {
    return (
      <nav className="bg-[#212121] text-white  p-1 fixed w-1/1 max-w-[1200px] top-0 left-70 z-50">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          {/* Website Name */}
          <h1 className="text-3xl font-mono font-bold tracking-wide justify-start">YinYang</h1>
  
  
  
          {/* Buttons */}
          <div className="flex gap-6 justify-end">
            <button className="bg-[#212121] text-[#acacaf]  px-2 py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition inline-flex items-center gap-2 font-semibold">
              Sign Up to Chat
            </button>
            <button className="bg-[#212121] text-[#acacaf] px-0 py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition inline-flex items-center gap-2 font-semibold">
              Login
            </button>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  