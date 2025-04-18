import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterInfo from "./CharacterInfo";
import { useCharacterContext } from "./CharacterContext";
import { motion } from "framer-motion";

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
  const { favourite } = useCharacterContext();

  const [direction, setDirection] = useState(1);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: "0%", opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const numPerPage = 8;

  const [page, setPage] = useState(0);

  function pageIncrease() {
    if (page + 1 <= Math.max(1, myList.length / numPerPage)) {
      setPage(page + 1);

      setDirection(1);
    }
  }

  function pageDecrease() {
    if (page > Math.min(1, Math.ceil(myList.length / numPerPage))) {
      setPage(page - 1);
      setDirection(-1);
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/auth/characters/all") // Fetch from Spring Boot backend
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
    console.log("Start:" + page);
  }, []);

  const checkIfLiked = (character: Character) => {
    
    return favourite.some(
      (fav) =>
        fav.charName.trim().toLowerCase() ===
        character.charName.trim().toLowerCase()
    );
  };
  

  return (
    <div className="space-y-0 bg-[#212121] px-4 sm:px-0">
      <p className="text-xl text-white mt-10 pl-8 text-center sm:text-left">
        {"Featured"}
      </p>

      <div className="flex items-center gap-10">
        <button
            className="bg-[#efefef] rounded-full p-[20px] "
            onClick={pageDecrease}
          >
            <img
              src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000"
              className="w-5"
              alt=""
            />
        </button>
        <motion.div
          key={page} // Ensures re-animation on page change
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 h-fit justify-items-center"
        >
          {characters
            .slice(numPerPage * page, numPerPage * (page + 1))
            .map((character) => (
              <CharacterInfo
                key={character.charId}
                character={character}
                liked={checkIfLiked(character)}
                onClick={() => goToChat(mappingCharacterInfo(character), 0)}
              />
            ))}
        </motion.div>
        <button
            className="bg-[#efefef] rounded-full p-[20px] "
            onClick={pageIncrease}
          >
            <img
              src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000"
              className="w-5 rotate-180"
              alt=""
            />
        </button>
      </div>
    </div>
  );
};

export default CharacterGrid;
