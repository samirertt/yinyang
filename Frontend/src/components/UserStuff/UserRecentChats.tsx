import { useState } from "react";
import YinYang from "../../assets/yinyang.png";
const UserRecentChats = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 text-[var(--white)] bg-[var(--gray-darker)] px-4 py-2 rounded hover:bg-[var(--gray-medium-dark)"
      >
        Chat History
      </button>

      {isOpen && (
        <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--gray-black)] border-r border-[var(--gray-medium-dark)] shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-[var(--gray-darker)] text-[var(--white)] px-2 py-1 rounded hover:bg-[var(--gray-medium-dark)]"
        >
          ✖
        </button>

        <div className="w-full h-full p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-30 h-30 mb-8 mt-10">
              <img
                src={YinYang}
                alt="User"
                className="flex items-center gap-2 pt-3"
              />
              <h2 className="text-lg font-semibold text-[var(--white)]">
                YinYang
              </h2>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left p-2 bg-[var(--gray-darker)] text-[var(--white)] rounded hover:bg-[var(--gray-medium-dark)]">
              Teca
            </button>
            <button className="w-full text-left p-2 bg-[var(--gray-darker)] text-[var(--white)] rounded hover:bg-[var(--gray-medium-dark)]">
              AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRecentChats;
