import { useState } from "react";
import AddCharacter from "../components/AddCharacter";
import EditCharacter from "../components/EditCharacter";
import RemoveCharacter from "../components/RemoveCharacter";

const ManageCharacters = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="flex justify-center items-center h-screen " style={{ backgroundColor: "#212121" }}>
      <div className="w-full max-w-[900px] h-full rounded-lg shadow-lg p-8 flex flex-col">
        {/* Tabs */}
        <div className="flex justify-center border-b mb-6">
          {["add", "edit", "remove"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-8 mx-2 font-semibold transition-all duration-300 rounded-t-lg ${
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
        <div className="flex-grow flex items-center justify-center w-full " style={{ backgroundColor: "#212121" }}>
          {activeTab === "add" && <AddCharacter />}
          {activeTab === "edit" && <EditCharacter />}
          {activeTab === "remove" && <RemoveCharacter />}
        </div>
      </div>
    </div>
  );
};

export default ManageCharacters;
