import { useState, SetStateAction, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Character } from "./CharacterGrid";
import { useCharacterContext } from "./CharacterContext";

const UserSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);

  const { user, chatList, addChat } = useCharacterContext();

  const navigate = useNavigate();

  const handleFocus = () => setIsExpanded(true);
  const handleBlur = () => {
    if (inputValue.trim() === "") setIsExpanded(false);
  };
  const handleChange = (e: { target: { value: SetStateAction<string> } }) =>
    setInputValue(e.target.value);

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      fetch(`http://localhost:8080/auth/characters/search?name=${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data);
        })
        .catch((error) => {
          console.error("Error fetching characters:", error);
        });
    } else {
      setCharacters([]); // Clear results when query is empty
    }
  }, [inputValue]);

  const mappingCharacterInfo = (character: Character) => {
    return {
      img: character.charImg,
      name: character.charName,
      details: character.charDescription,
      usage: character.charUsage,
      Id: character.charId,
    };
  };

  const goToChat = (
    character: {
      img: string;
      name: string;
      details: string;
      usage: number;
      Id: number;
    },
    Id: number
  ) => {
    addChat(character.name, character.img, character.details, Id);

    if (!chatList.some((chat) => chat.name === character.name)) {
      const temp = chatList;
      temp.push({
        name: character.name,
        image: character.img,
        details: character.details,
      });
    }

    navigate("/Chat", {
      state: {
        character: character,
        historyList: chatList,
        user: user, // Pass user data here
        chatId: 0, // Pass chatId data here (if it's 0 then a new chat is created)
      },
      replace: true,
    });
  };

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

      {isExpanded && inputValue.trim().length > 0 && (
      <div className="absolute right-60 top-30 bg-[#313131] rounded-lg shadow-lg z-30 w-70 overflow-hidden">
        <div className="overflow-y-auto max-h-60 transition-all ">
          {characters.length === 0 ? (
            <p className="text-white text-center p-2">No characters found</p>
          ) : (
            <ul className="space-y-2 p-2">
              {characters.map((character) => (
                <li
                  key={character.charId}
                  className="flex items-center gap-3 p-2 hover:bg-[#414141] rounded-lg "
                  onMouseDown={() =>
                    goToChat(mappingCharacterInfo(character), 0)
                  } 
                >
                  <img
                    src={character.charImg}
                    alt={character.charName}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <h3 className="text-white">{character.charName}</h3>
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
      )}

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
