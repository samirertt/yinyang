import { useState, useEffect } from "react";

interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  characteristics: string;
}

const EditCharacter = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCharacteristics, setNewCharacteristics] = useState("");
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

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharacter) return;

    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.id === selectedCharacter.id
          ? {
              ...char,
              name: newName,
              image: newImage,
              description: newDescription,
              characteristics: newCharacteristics,
            }
          : char
      )
    );

    setIsPopupOpen(false);
    setSelectedCharacter(null);
    setNewName("");
    setNewImage("");
    setNewDescription("");
    setNewCharacteristics("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-white mb-6">Edit Characters</h2>

      {/* Character List - Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-[#2F2F2F] text-[#acacaf] p-6 rounded-xl shadow-md cursor-pointer hover:bg-[#3A3A3A] transition flex flex-col items-center"
            onClick={() => {
              setSelectedCharacter(character);
              setNewName(character.name);
              setNewImage(character.image);
              setNewDescription(character.description);
              setNewCharacteristics(character.characteristics);
              setIsPopupOpen(true);
            }}
          >
            <img src={character.image} alt={character.name} className="w-28 h-28 rounded-full mb-4" />
            <h3 className="text-xl font-bold">{character.name}</h3>
            <p className="text-sm text-gray-400">ID: {character.id}</p>
          </div>
        ))}
      </div>

      {/* Edit Popup */}
      {isPopupOpen && selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-96 text-center">
            <img src={newImage} alt={newName} className="w-24 h-24 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Editing: {selectedCharacter.name}
            </h3>
            <form onSubmit={handleEdit}>
              <div className="space-y-3">
                {/* Name Input */}
                <input
                  type="text"
                  placeholder="New Character Name"
                  className="bg-[#2F2F2F] text-[#acacaf] border border-[#3A3A3A] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />

                {/* Image URL Input */}
                <input
                  type="text"
                  placeholder="New Image URL"
                  className="bg-[#2F2F2F] text-[#acacaf] border border-[#3A3A3A] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />

                {/* Description Input */}
                <textarea
                  placeholder="Character Description"
                  className="bg-[#2F2F2F] text-[#acacaf] border border-[#3A3A3A] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-none"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                ></textarea>

                {/* Characteristics Input */}
                <input
                  type="text"
                  placeholder="Characteristics (comma-separated)"
                  className="bg-[#2F2F2F] text-[#acacaf] border border-[#3A3A3A] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  value={newCharacteristics}
                  onChange={(e) => setNewCharacteristics(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#212121] text-[#acacaf] px-4 py-2 rounded-md hover:bg-[#2F2F2F] transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCharacter;
