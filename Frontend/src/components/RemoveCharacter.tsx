import { useState, useEffect } from "react";

interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  characteristics: string;
}

const RemoveCharacter = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Simulated database fetch (Replace with API call if needed)
  useEffect(() => {
    const fetchCharacters = async () => {
      const data: Character[] = [
        {
          id: "1",
          name: "John Doe",
          image: "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-black-panther-civil-war.webp",
          description: "A skilled warrior from Wakanda.",
          characteristics: "Agile, Strong, Tactical",
        },
        {
          id: "2",
          name: "Jane Smith",
          image: "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-spider-man-miles-morales.webp",
          description: "The young and talented Spider-Man.",
          characteristics: "Fast, Intelligent, Acrobat",
        },
        {
          id: "3",
          name: "Alice Johnson",
          image: "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-iron-man-infinity-war.webp",
          description: "A genius billionaire in a suit of armor.",
          characteristics: "Inventor, Charismatic, Genius",
        },
        {
          id: "4",
          name: "Michael Brown",
          image: "https://playcontestofchampions.com/wp-content/uploads/2023/07/champion-silk.webp",
          description: "A stealthy and swift hero.",
          characteristics: "Agile, Silent, Deadly",
        },
        {
          id: "5",
          name: "Black Widow",
          image: "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-black-widow-deadly-origin.webp",
          description: "A deadly assassin and spy.",
          characteristics: "Martial Artist, Strategic, Stealthy",
        },
        {
          id: "6",
          name: "Doctor Strange",
          image: "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-doctor-strange.webp",
          description: "The Sorcerer Supreme with mystical powers.",
          characteristics: "Magical, Wise, Powerful",
        },
      ];
      setCharacters(data);
    };
    fetchCharacters();
  }, []);

  const handleDelete = () => {
    if (!selectedCharacter) return;

    setCharacters((prevCharacters) =>
      prevCharacters.filter((char) => char.id !== selectedCharacter.id)
    );

    setIsPopupOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-white mb-6">Remove Characters</h2>

      {/* Character List - Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-[#2F2F2F] text-[#acacaf] p-6 rounded-xl shadow-md cursor-pointer hover:bg-[#3A3A3A] transition flex flex-col items-center"
            onClick={() => {
              setSelectedCharacter(character);
              setIsPopupOpen(true);
            }}
          >
            <img src={character.image} alt={character.name} className="w-28 h-28 rounded-full mb-4" />
            <h3 className="text-xl font-bold">{character.name}</h3>
            <p className="text-sm text-gray-400">ID: {character.id}</p>
          </div>
        ))}
      </div>

      {/* Confirmation Popup */}
      {isPopupOpen && selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-96 text-center">
            <img src={selectedCharacter.image} alt={selectedCharacter.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">
              Are you sure you want to remove {selectedCharacter.name}?
            </h3>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveCharacter;
