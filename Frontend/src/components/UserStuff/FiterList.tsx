import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Character } from "./CharacterGrid";
import { ArrowLeft } from "lucide-react";
import UserNavBar, { UserNavBarProps } from "./UserNavBar";
import { useEffect, useState } from "react";
import CharacterInfo from "./CharacterInfo";
import { useCharacterContext } from "./CharacterContext";
import { jwtDecode } from "jwt-decode";
import { goToChat, mappingCharacterInfo } from "./constants";

const FilterList: React.FC<UserNavBarProps> = ({ }) => {
  const { user, chatList, addChat, favourite } = useCharacterContext();
  const location = useLocation();
  const { icon, title, bgColor } = location.state;

  const navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/${title}`);

        if (!response.ok) throw new Error("Failed to fetch characters");

        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [title]);

  const token = localStorage.getItem("jwtToken");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  let username: string;
  let userId: number;

  // Decode token and handle potential errors
  try {
    const decoded: any = jwtDecode(token);
    const roles = decoded.roles || [];

    // Check if user has the "user" role
    if (!roles.includes("user")) {
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

  const checkIfLiked = (character: Character) => {
    return favourite.some(
      (fav) =>
        fav.charName.trim().toLowerCase() ===
        character.charName.trim().toLowerCase()
    );
  };
  return (
    <div className="bg-[#212121] min-h-screen pt-5 px-4 sm:px-6 md:px-10 lg:px-40">
      <UserNavBar
        chatList={chatList}
        username={username}
      />
      <div
        className={`bg-gradient-to-b from-[#yourColor] to-black rounded-t-4xl w-full h-45 md:h-90 relative overflow-hidden mt-25`}
      style={{backgroundColor: bgColor}}
      >
        <div
          className="absolute top-6 left-6 md:top-10 md:left-10 text-white text-4xl rounded-full h-10 w-10 cursor-pointer flex items-center justify-center hover:bg-[#818181]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </div>

        <h1 className=" text-4xl md:text-6xl text-white absolute bottom-4 left-10">
          {title}
        </h1>

        <img
          src={icon}
          alt={title}
          className="w-20 h-20 md:w-30 md:h-30 rounded-xl transform rotate-45 absolute right-10 bottom-4 translate-x-4 translate-y-4"
        />
      </div>

      <div className="pt-6 h-fit">
        {characters.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full text-white py-10">
            <p className="text-lg">No new characters added</p>
            {/* You can add an icon or illustration here if you want */}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {characters.map((character) => (
              <CharacterInfo
                character={character}
                liked={checkIfLiked(character)}
                onClick={() =>
                  goToChat(
                    mappingCharacterInfo(character),
                    0,
                    addChat,
                    user,
                    navigate,
                    chatList
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterList;
