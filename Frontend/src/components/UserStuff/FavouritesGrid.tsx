import { useEffect } from "react";
import { useCharacterContext } from "./CharacterContext";
import { Heart, MessageCircle } from "lucide-react";

function truncateText(text: string, maxCharsPerLine = 13, maxLines = 4) {
  const maxTotalChars = maxCharsPerLine * maxLines; // 10 * 3 = 30 characters max
  return text.length > maxTotalChars
    ? text.slice(0, maxTotalChars) + "..."
    : text;
}

const FavouritesGrid = () => {
  const { favourite, setFavourite, user, refreshFav, } = useCharacterContext();

  useEffect(() => {
    fetch(`http://localhost:8080/auth/favourites/user/${user.username}`) // Fetch from Spring Boot backend
      .then((response) => response.json())
      .then((data) => setFavourite(data))
      .catch((error) => console.error("Error fetching favourites:", error));
  }, [refreshFav]);

  return (
    <div className="space-y-0 bg-[#212121]  w-full">
      <p className="text-xl text-white mt-10 pl-8 text-center sm:text-left">
        Favourites
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 h-fit justify-items-center">
        {favourite.map((character) => (
          <div className="relative flex w-70 sm:w-fit  h-30  items-center p-4 rounded-lg bg-[#303030] hover:bg-[#454545] overflow-hidden cursor-pointer">
            <button >
              <Heart size={18} fill={"red"} />
            </button>

            <img
              src={character.charImg}
              alt={character.charName}
              className="w-20 h-25 rounded-2xl "
            />

            <div className="ml-4 flex-1">
              <h2 className="text-sm font-bold mb-1 text-white text-left">
                {character.charName}
              </h2>
              <p className="mb-2 text-white text-left text-xs">
                {truncateText(character.charDescription)}
              </p>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <MessageCircle size={14} className="text-gray-500" />
                Usage: {character.charUsage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesGrid;
