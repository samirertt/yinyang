import { useState } from "react";
import { Navigate } from "react-router-dom"; // Import useLocation hook
import AddCharacter from "../components/AddCharacter";
import EditCharacter from "../components/EditCharacter";
import RemoveCharacter from "../components/RemoveCharacter";
import LoginNav from "../components/LoginNav";
import { jwtDecode } from "jwt-decode";

const ManageCharacters = () => {
  const [activeTab, setActiveTab] = useState("add");

  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/Login" replace />;
  }
  let username: string;
  let userId: number;
  
  try {
    const decoded: any = jwtDecode(token);
    const roles = decoded.roles || [];

    // Check if user has the "user" role
    if (!roles.includes("moderator")) {
      return <Navigate to="/Login" replace />;
    }

    username = decoded.sub; // Typically, 'sub' is the username or subject
    userId = decoded.userId; // Assumes userId is included in the token

    // If userId is not in the token, this will be undefined; handle accordingly if needed
    if (userId === undefined) {
      console.error("userId not found in token");
      // Optionally redirect or set a default value
      return <Navigate to="/Login" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/Login" replace />;
  }

  return (
    <div className="flex flex-col items-center bg-[#212121] min-h-screen p-4 sm:p-6">
      <LoginNav username={username} />
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
