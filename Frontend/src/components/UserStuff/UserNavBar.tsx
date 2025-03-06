import UserAvatar from "../UserStuff/UserAvatar";
import Avatar from "../../assets/potrait/ana_de_armas.jpg";
import UserRecentChats from "../UserStuff/UserRecentChats";
import searchIcon from "../../MaginifyingGlass.png";
import { useState, SetStateAction } from "react";
import { Heart } from "lucide-react";

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => setIsExpanded(true);
  const handleBlur = () => {
    if (inputValue.trim() === "") setIsExpanded(false);
  };
  const handleChange = (e: { target: { value: SetStateAction<string> } }) =>
    setInputValue(e.target.value);

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative flex-1">
        <div className="relative flex items-center">
          {!isExpanded && (
            <img
              src={searchIcon}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 invert pointer-events-none"
              alt="SearchIcon"
            />
          )}
          <input
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`transition-all duration-300 ease-in-out bg-[#212121] text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-gray-400 w-full ${
              isExpanded ? "pl-10" : "pl-10 cursor-pointer"
            }`}
            type="search"
            placeholder={isExpanded ? "Search" : ""}
          />
        </div>
      </div>
      <Link to="/UserDashboard/FilterPage" className="shrink-0">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a3a3a] transition-all cursor-pointer">
          <Filter size={18} className="text-white" />
          <span className="text-white text-sm hidden md:inline">Filter</span>
        </button>
      </Link>
    </div>
  );
}

export interface UserNavBarProps {
  chatList: { name: string; image: string }[];
  handleDelete: (buttonName: string) => void;
  username?: string;
}

const UserNavBar: React.FC<UserNavBarProps> = ({
  chatList,
  handleDelete,
  username,
}) => {
  return (
    <div className="mt-5 flex flex-col md:flex-row items-center justify-between bg-[#212121] ml-5 h-auto w-full">
      {/* <div className="self-start"> */}
        <UserRecentChats chatList={chatList} handleDelete={handleDelete} />
        <div className="md:ml-2">
          {/* Provide a default value if username is not given */}
          <UserAvatar name={username || "Guest"} image_path={Avatar} />
        </div>
      </div>
      
      {/* Right section - Search + Filter */}
      <div className="w-full md:w-[400px] order-2">
        <SearchBar />
      </div>
    </div>
  );
};

export default UserNavBar;
