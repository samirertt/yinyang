import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterInfo from "./CharacterInfo";
import { useCharacterContext } from "./CharacterContext";

export interface Character {
  charImg: string;
  charName: string;
  charId: number; // Using uppercase "Id" to match your format
  charDescription: string;
  charUsage: number;
}

interface CharacterGridProps {
  onCharacterSelect: (
    characterName: string,
    characterImg: string,
    characterDetails: string,
    chatId: number
  ) => void;
  list: { name: string; image: string; details: string }[];
  user: { username: string; userId: number };
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  onCharacterSelect,
  list,
  user,
}) => {
  const [myList, setMyList] = useState(list);
  const navigate = useNavigate();

  
  
  //used for simplicity
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
    id: number
  ) => {
    onCharacterSelect(character.name, character.img, character.details, id);

    if (!myList.some((chat) => chat.name === character.name)) {
      const temp = myList;
      temp.push({
        name: character.name,
        image: character.img,
        details: character.details,
      });
      setMyList(temp);
    }

    navigate("/Chat", {
      state: {
        character: character,
        historyList: myList,
        user: user, // Pass user data here
        chatId: 0, // Pass chatId data here (if it's 0 then a new chat is created)
      },
      replace: true,
    });
  };

  const [characters, setCharacters] = useState<Character[]>([]);
  const {favourite} = useCharacterContext();

  

  useEffect(() => {
    fetch("http://localhost:8080/auth/characters/all") // Fetch from Spring Boot backend
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const checkIfLiked = (character:Character) => {
    return favourite.some((fav) => fav.charName === character.charName);
  };

  return (
    <div className="space-y-0 bg-[#212121] px-4 sm:px-0">
      <p className="text-xl text-white mt-10 pl-8 text-center sm:text-left">
        {"Featured"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 h-fit justify-items-center">
        {characters.map((character) => (
          <CharacterInfo
            character={character}
            liked = {checkIfLiked(character)}
            onClick={() => goToChat(mappingCharacterInfo(character), 0)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterGrid;
