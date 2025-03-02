import { useState } from "react";
import AddCharacter from "../components/AddCharacter";
import EditCharacter from "../components/EditCharacter";
import RemoveCharacter from "../components/RemoveCharacter";
import LoginNav from "../components/LoginNav";

const ManageCharacters = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="flex flex-col items-center bg-[#212121] min-h-screen p-4 sm:p-6">
      <LoginNav />
      <div className="w-full max-w-[900px] h-full mt-10 sm:mt-20 rounded-lg shadow-lg p-4 sm:p-8 flex flex-col bg-[#212121]">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center border-b mb-6">
          {["add", "edit", "remove"].map((tab) => (
            <button
              key={tab}
              className={`py-2 sm:py-3 px-4 sm:px-8 mx-1 sm:mx-2 text-sm sm:text-base font-semibold transition-all duration-300 rounded-t-lg ${
                activeTab === tab
                  ? "border-b-4 border-white text-[#acacaf]"
                  : "text-[#acacaf] hover:bg-[#2F2F2F]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-grow flex items-center justify-center w-full p-4 sm:p-6 bg-[#212121]">
          {activeTab === "add" && <AddCharacter />}
          {activeTab === "edit" && <EditCharacter />}
          {activeTab === "remove" && <RemoveCharacter />}
        </div>
      </div>
    </div>
  );
};

export default ManageCharacters;
