import UserAvatar from "../components/UserStuff/UserAvatar";
import Avatar from "../assets/Avatar.png";
import UserRecentChats from "../components/UserStuff/UserRecentChats";
import CharacterGrid from "../components/UserStuff/CharacterGrid";
import { useState, SetStateAction } from "react";
import searchIcon from "../MaginifyingGlass.png";
import Footer from "../components/Footer";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";

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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-8 sm:h-8 invert pointer-events-none"
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
    </div>
  );
}

function UserCharactertSelection() {
  const [chatList, setChatList] = useState<{ name: string; image: string }[]>(
    []
  );

  const addChat = (characterName: string, characterImage: string) => {
    if (!chatList.some((chat) => chat.name === characterName)) {
      setChatList((prevChats) => [
        ...prevChats,
        { name: characterName, image: characterImage },
      ]);
    }
  };

  const handleDelete = (buttonName: string) => {
    setChatList((prevChat) =>
      prevChat.filter((chat) => chat.name !== buttonName)
    );
  };

  return (
    <div className="bg-[#212121] min-h-screen px-2 sm:px-4 md:px-6 ">
      {/* Recent Chats Section */}
      <div className="flex flex-col bg-[#212121]">
        <UserRecentChats chatList={chatList} handleDelete={handleDelete} />
      </div>

      {/* Avatar and Search Bar */}
      <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-4 py-4 bg-[#212121] ml-5">
        <UserAvatar name="John Doe" image_path={Avatar} />
        <SearchBar />
      </div>

      {/* Suggestion Banner */}
      <SuggestionBanner />

      {/* Character Grid */}
      <CharacterGrid onCharacterSelect={addChat} />
      <Footer/>
    </div>
  );
}

export default UserCharactertSelection;
