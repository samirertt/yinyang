import { useState, SetStateAction } from "react";
import { Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";

const UserSearchBar = () => {
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
        <div className="relative flex items-center ">
          {!isExpanded && (
            <Search
              size={20}
              className="absolute left-3 sm:left-auto sm:right-9 md:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white "
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
      <FilterButton />
    </div>
  );
};

const FilterButton = () => {

    
  return (
    <Link to="/UserDashboard/FilterPage" className="shrink-0">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a3a3a] transition-all cursor-pointer ">
          <Filter size={18} className="text-white " />
          <span className="text-white text-sm hidden md:inline">Filter</span>
        </button>
      </Link>
  );
};
export default UserSearchBar;
