import UserAvatar from "../UserStuff/UserAvatar";
import Avatar from "../../assets/potrait/ana_de_armas.jpg";
import UserRecentChats from "../UserStuff/UserRecentChats";
import searchIcon from "../../MaginifyingGlass.png";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import { useState, SetStateAction } from "react";

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
    <div className="relative flex items-center w-full md:w-auto mr-15">
      {!isExpanded && (
        <img
          src={searchIcon}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-24 h-24 sm:w-10 sm:h-10 invert pointer-events-none"
          alt="SearchIcon"
        />
      )}
      <input
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={`transition-all duration-300 ease-in-out bg-[#212121] text-white rounded-lg px-10 py-2 outline-none focus:ring-2 focus:ring-gray-400 mr-4
            ${isExpanded ? "w-full md:w-80" : "w-10 cursor-pointer"}`}
        type="search"
        placeholder={isExpanded ? "Search" : ""}
      ></input>
      <Link to="/UserDashboard/FilterPage">
        <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#3a3a3a] transition-all">
          <Filter size={24} className="text-white hover:text-gray-300" />
        </button>
      </Link>
    </div>
  );
}

function UserNavBar(
  chatList: { name: string; image: string }[],
  handleDelete: (buttonName: string) => void
) {
  return (
    <div className="mt-5 flex flex-col md:flex-row items-center justify-between bg-[#212121] ml-5">
      <div className="self-start">
        <UserRecentChats chatList={chatList} handleDelete={handleDelete} />
      </div>
      <div className="items-center justify-between flex  w-full pl-10">
        <UserAvatar name="Ana De Armas" image_path={Avatar} />
        <SearchBar />
      </div>
    </div>
  );
}

export default UserNavBar;
