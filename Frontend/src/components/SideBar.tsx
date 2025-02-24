import React, { useState } from "react";
import SideBar from "../assets/SideBar.svg";
import Search from "../assets/Search.svg";
import NewChat from "../assets/NewChat.svg";
import ChatNav from "../components/ChatNav";

// Define TypeScript interfaces for props (if needed)
interface SidebarProps {
  // Add any props here if needed
}

const Sidebar: React.FC<SidebarProps> = () => {
  // State to manage sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          className="fixed z-30 h-15 rounded-lg px-5 text-token-text-secondary focus-visible:bg-token-surface-hover focus-visible:outline-0 enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary no-draggable"
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
          className={`z-[21] flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary max-md:!w-0 transition-all duration-300 ${
            isCollapsed ? "w-0" : "w-[260px]"
          }`}
          style={{ visibility: "visible", willChange: "auto", backgroundColor: "var(--gray-black)"}}
        >
          <div className="h-full w-[260px]">
            <div className="flex h-full min-h-0 flex-col">
              {/* Draggable Header */}
              <div className="draggable relative h-full w-full flex-1 items-start border-white/20">
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
                  <div className="flex justify-between flex h-[60px] items-center md:h-header-height">
                    {/* Close Sidebar Button */}
                    <span className="flex" data-state="closed">
                      <button
                        className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:bg-token-surface-hover focus-visible:outline-0 enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary no-draggable"
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
                        <button
                          aria-label="Search"
                          className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:bg-token-surface-hover focus-visible:outline-0 enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary"
                        >
                        <img src={Search} alt="Search icon" className="w-5 h-5 cursor-pointer"  />
                        </button>
                      </span>

                      {/* New Chat Button */}
                      <span className="flex" data-state="closed">
                        <button
                          aria-label="New chat"
                          data-testid="create-new-chat-button"
                          className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:bg-token-surface-hover focus-visible:outline-0 enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary"
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
                            <li className="relative" data-testid="history-item-0">
                              <div
                                draggable="true"
                                className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative screen-arch:bg-transparent"
                                style={{ "--item-background-color": "var(--sidebar-surface-tertiary)" } as React.CSSProperties}
                              >
                                <a
                                  className="flex items-center gap-2 p-2 screen-arch:motion-safe:group-active:scale-[98%] screen-arch:motion-safe:group-active:transition-transform screen-arch:motion-safe:group-active:duration-100"
                                  href="/c/67ba25b6-219c-8009-9c65-5022d9f2adf7"
                                  data-discover="true"
                                  style={{ maskImage: "var(--sidebar-mask)" }}
                                >
                                  <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto" title="Textarea Message Alignment">
                                    Emilia Clarke
                                  </div>
                                </a>
                              </div>
                            </li>
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
      </div>
  );
};

export default Sidebar;