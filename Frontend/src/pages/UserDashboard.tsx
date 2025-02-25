import UserAvatar from "../components/UserStuff/UserAvatar";
import Avatar from "../assets/Avatar.png";
import UserRecentChats from "../components/UserStuff/UserRecentChats";
import CharacterGrid from "../components/UserStuff/CharacterGrid";
import { useState, SetStateAction } from "react";
import searchIcon from "../MaginifyingGlass.png";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setIsExpanded(false);
    }
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative flex items-center ">
      {!isExpanded && (
        <img
          src={searchIcon}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 invert pointer-events-none"
          alt="SearchIcon"
        ></img>
      )}
      <input
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={`transition-all duration-300 ease-in-out bg-[#212121] text-white rounded-lg px-10 py-2 outline-none focus:ring-2 focus:ring-gray-400
          ${isExpanded ? "w-64" : "w-10 cursor-pointer"}`}
        type="search"
        placeholder={isExpanded ? "Search" : ""}
      ></input>
    </div>
  );
}

function UserCharactertSelection() {
  const [chatList, setChatList] = useState<{ name: string; image: string }[]>([]);


  const addChat = (characterName: string, characterImage: string) => {
    if (!chatList.some(chat => chat.name === characterName)) {
      setChatList((prevChats) => [...prevChats, { name: characterName, image: characterImage }]);
    }
  };

  const handleDelete = (buttonName: string) => {
    setChatList((prevChat) =>
      prevChat.filter((name) => name.name !== buttonName)
    );
  };
  return (
    <div className="bg-[#212121] ">
      <div className="flex flex-col bg-[#212121]">
        <UserRecentChats chatList={chatList} handleDelete={handleDelete}/>
      </div>
      <div className="mt-5 items-center ml-25 mr-25 h-screen ">
        <div className="flex justify-between items-center w-full px-4 py-2 bg-[#212121] ">
          <div className="flex items-center ">
            <UserAvatar name="John Doe" image_path={Avatar} />
          </div>

          <div className="flex items-center">
            <SearchBar />
          </div>
        </div>
        <SuggestionBanner/>
        <CharacterGrid onCharacterSelect={addChat}/>
      </div>
    </div>
  );
}

export default UserCharactertSelection;
