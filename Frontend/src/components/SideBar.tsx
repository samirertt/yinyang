import React, { useState } from "react";
import SideBar from "../assets/SideBar.svg";
import Search from "../assets/Search.svg";
import NewChat from "../assets/NewChat.svg";
import Emi from "../assets/Emi.jpg";
import History from "../assets/History.svg";
import Pin from "../assets/Pin.svg";
import Cross from "../assets/Cross.svg";


// Define TypeScript interfaces for props (if needed)
interface SidebarProps {
  // Add any props here if needed
}

const Sidebar: React.FC<SidebarProps> = () => {
  // State to manage sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const chatList = [
    "Emilia Clarke",
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Sarah Williams"
  ];
  

  const filteredChats = chatList.filter((chat) =>
    chat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to toggle sidebar collapse
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex">
      {/* Show heading before toggle button when collapsed */}

      {/* Toggle Button (Only shown when sidebar is collapsed) */}
      {isCollapsed && (
        <button
        className="fixed z-30 h-15 rounded-lg px-5 text-token-text-secondary focus-visible:bg-token-surface-hover 
        focus-visible:outline-0 enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary no-draggable transition-all duration-1000 ease-in-out cursor-pointer"          
          aria-label="Toggle SideBar"
          data-testid="toggle-sidebar-button"
          onClick={toggleCollapse}
        >
          <img src={SideBar} alt="SideBar icon" className="w-5 h-5 cursor-pointer" />
        </button>
      )}

      
      {/* Sidebar Content (Only shown when sidebar is not collapsed) */}
      {!isCollapsed && (
        <div
        className={`z-[21] flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary max-md:!w-0 transition-all duration-1000 ease-in-out ${
          isCollapsed ? "w-0 opacity-0 transition-300" : "w-[230px] opacity-100 transition-300"
        }`}
          style={{ visibility: "visible", willChange: "auto", backgroundColor: "var(--gray-black)"}}
        >
          <div className="h-full w-[230px]">
            <div className="flex h-full min-h-0 flex-col">
              {/* Draggable Header */}
              <div className="draggable relative h-full w-full flex-1 items-start border-white/20 ">
                {/* Hidden Heading for Accessibility */}
                <h2
                  style={{
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    wordWrap: "normal",
                  }}
                >
                  Chat History
                </h2>

                {/* Navigation Section */}
                
                <nav className="flex h-full w-full flex-col px-3" aria-label="Chat History">
                  {/* Header Buttons */}
                  <div className="flex justify-between h-[60px] items-center md:h-header-height">
                    {/* Close Sidebar Button */}
                    <span className="flex" data-state="closed">
                      <button
                        className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:bg-token-surface-hover focus-visible:outline-0 enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary no-draggable cursor-pointer"
                        aria-label="Close SideBar"
                        data-testid="close-sidebar-button"
                        onClick={toggleCollapse}
                      >
                        <img src={SideBar} alt="SideBar icon" className="w-5 h-5 cursor-pointer"  />
                      </button>
                    </span>

                    {/* Action Buttons */}
                    <div className="flex">
                      {/* Search Button */}
                      <span className="flex" data-state="closed">
                      {searchOpen ? (
                      <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className="h-8 px-2 bg-[var(--gray-light)] text-[var(--gray-black)] rounded-xl w-[105px]"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        aria-label="Close Search"
                        className="h-8 cursor-pointer text-white"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchTerm("");
                        }}
                      >
                        <img src={Cross} alt="Close icon" className="w-5 h-5 cursor-pointer"  />
                      </button>
                    </div>
                    ) : (
                      <button
                        aria-label="Search"
                        className="h-10 px-2 cursor-pointer"
                        onClick={() => setSearchOpen(!searchOpen)}
                      >
                        <img src={Search} alt="Search icon" className="w-5 h-5" />
                      </button>
                    )}
                      </span>

                      {/* New Chat Button */}
                      <span className="flex" data-state="closed">
                        <button
                          aria-label="New chat"
                          data-testid="create-new-chat-button"
                          className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:bg-token-surface-hover focus-visible:outline-0 enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary cursor-pointer"
                        >
                          <img src={NewChat} alt="NewChat icon" className="w-5 h-5 cursor-pointer"  />
                        </button>
                      </span>
                    </div>
                  </div>

                  {/* Chat History Section */}
                  <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
                    <div className="group/sidebar">
                      <div className="bg-token-sidebar-surface-primary pt-0">
                        {/* Today's Chats */}
                        <div className="relative mt-5 first:mt-0 last:mb-5">
                          <div className="sticky bg-token-sidebar-surface-primary top-0 z-20">
                            <span className="flex h-9 items-center">
                              <h3 className="px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2 text-token-text-primary">
                                Chat History
                              </h3>
                            </span>
                          </div>
                          <ol>
                            {/* Chat Item */}
                            {filteredChats.map((chat, index) => (
                            <li key={index} className="p-2 hover:bg-[var(--gray-almost-black)] rounded-xl cursor-pointer">
                              {chat}
                            </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Right Sidebar (Adjusting width based on left sidebar state) */}
      <div
        className={`fixed z-40 top-15 right-0 transition-all duration-300 bg-[var(--page)] text-[var(--white)] border border-[var(--gray-black)] h-screen overflow-hidden ${
          isCollapsed ? "w-[300px]" : "w-[230px]"
        }`}
      >
         <div className="p-4 border-b border-[var(--gray-black)] flex flex-col items-center">
    <img
      src={Emi}
      alt="Avatar"
      className="w-38 h-38 rounded-full border-2 border-[var(--gray-black)]"
    />
    <h2 className="text-xl font-semibold mt-2 text-center">Emilia Clarke</h2>
  </div>

  <div className="px-4 py-3">
    <h3 className="text-xs font-semibold text-token-text-primary">Bio</h3>
    <p className="text-xm font-medium mt-1 text-justify">
      Emilia Clarke is a British actress best known as Daenerys Targaryen in Game of Thrones. A versatile and beloved talent, she continues to captivate audiences worldwide.
    </p>
  </div>

  <nav className="mt-4 space-y-2 font-semibold px-4 z-100">
    <button className="z-30 group flex items-center gap-3 w-full px-4 py-2 transition hover:bg-[var(--gray-almost-black)] rounded-xl cursor-pointer">
        <img
          src={NewChat}
          alt="New Chat icon"
          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 "
        />
        <span>New chat</span>
      </button>
      <button className="z-30 group flex items-center gap-3 w-full px-4 py-2 transition hover:bg-[var(--gray-almost-black)] rounded-xl cursor-pointer">
        <img
          src={History}
          alt="History icon"
          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
        />
        <span>History</span>
      </button>
      <button className="z-30 group flex items-center gap-3 w-full px-4 py-2 transition hover:bg-[var(--gray-almost-black)] rounded-xl cursor-pointer">
        <img
          src={Pin}
          alt="Pin icon"
          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
        />
        <span>Pinned messages</span>
      </button>
    </nav>
</div>
    </div>
  );
};

export default Sidebar;