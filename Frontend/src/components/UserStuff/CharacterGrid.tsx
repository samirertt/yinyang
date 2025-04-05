import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function truncateText(text: string, maxCharsPerLine = 13, maxLines = 4) {
  const maxTotalChars = maxCharsPerLine * maxLines; // 10 * 3 = 30 characters max
  return text.length > maxTotalChars
    ? text.slice(0, maxTotalChars) + "..."
    : text;
}

export interface Character{
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
  title: string;
  list: { name: string; image: string; details: string }[];
  user: { username: string; userId: number };
}

const CharacterGrid : React.FC<CharacterGridProps> = ({ onCharacterSelect, title, list, user }
  ) => {
  
  const [myList, setMyList] = useState(list);
  const navigate = useNavigate();


  //used for simplicity
  const mappingCharacterInfo = (character:Character)=> {
    return{
    img: character.charImg,
    name: character.charName,
    details: character.charDescription,
    usage: character.charUsage,
    Id: character.charId,
  };
  }
  const goToChat = ( character: { img: string; name: string; details: string; usage: number; Id: number; }, id: number) => {
    onCharacterSelect(character.name, character.img,character.details,id);

    
    

    if (!myList.some((chat) => chat.name === character.name)) {
      const temp = myList;
      temp.push({ name: character.name, image: character.img, details:character.details});
      setMyList(temp);
    }

    navigate("/Chat", { 
      state: {
        character: character,
        historyList: myList,
        user: user, // Pass user data here
        chatId:0  // Pass chatId data here (if it's 0 then a new chat is created)
      }, 
      replace: true 
    });
  }
  


  const [characters,setCharacters] = useState<Character[]>([]);

  console.log(characters);
  useEffect(() => {
    fetch("http://localhost:8080/auth/characters/all") // Fetch from Spring Boot backend
        .then((response) => response.json())
        .then((data) => setCharacters(data))
        .catch((error) => console.error("Error fetching characters:", error));
}, []);

  return (
    <div className="space-y-0 bg-[#212121] px-4 sm:px-0">
      <p className="text-xl text-white mt-10 pl-8 text-center sm:text-left">{title}</p>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 h-fit justify-items-center">
        {characters.map((character) => (
          <CharacterInfo
            key={character.charId}
            img_path={character.charImg}
            name={character.charName}
            details={character.charDescription}
            usage={character.charUsage}
            onClick={() => goToChat(mappingCharacterInfo(character),0)}
          />
        ))}
      </div>
    </div>
  );
};

const CharacterInfo = ({
  img_path,
  name,
  details,
  usage,
  onClick,
 
}: {
  img_path: string;
  name: string;
  details: string;
  usage: number;
  onClick: () => void;
  
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };
   
  return (
    <div
      className="relative flex w-70 sm:w-fit  h-30  items-center p-4 rounded-lg bg-[#303030] hover:bg-[#454545] overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <button
        className={`absolute top-2 right-2 hover:text-red-500 ${
          isLiked ? "text-red-500" : "text-gray-500"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike();
        }}
      >
        <Heart size={18} fill={isLiked ? "red " : "none"} />
      </button>

      <img src={img_path} alt={name} className="w-20 h-25 rounded-2xl " />

      <div className="ml-4 flex-1">
        <h2 className="text-sm font-bold mb-1 text-white text-left">{name}</h2>
        <p className="mb-2 text-white text-left text-xs">
          {truncateText(details)}
        </p>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <MessageCircle size={14} className="text-gray-500" />
          Usage: {usage}
        </span>
      </div>
    </div>
  );
};

export default CharacterGrid;
