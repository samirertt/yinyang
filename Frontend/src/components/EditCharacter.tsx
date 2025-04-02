import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Character {
  charId: number;
  charName: string;
  charImg: string;
  charDescription: string;
  charPersonality: string;
  charPrompt: string;
  charUsage: number;
}

const EditCharacter = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newDescription, setNewDescription] = useState("");
  const [newCharacteristics, setNewCharacteristics] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:8080/moderator/characters');
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching characters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size should be less than 5MB");
        setIsError(true);
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage("Please upload a valid image file");
        setIsError(true);
        return;
      }
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsError(false);
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharacter) return;

    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      let imageUrl = selectedCharacter.charImg; // Keep existing image if no new image selected

      if (newImage) {
        // Convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(newImage);
        
        reader.onload = async () => {
          imageUrl = reader.result as string;
          
          const updatedCharacter = {
            ...selectedCharacter,
            charName: newName,
            charImg: imageUrl,
            charDescription: newDescription,
            charPersonality: newCharacteristics,
            charPrompt: `You are ${newName}. ${newCharacteristics}`
          };

          const response = await fetch(`http://localhost:8080/moderator/characters/${selectedCharacter.charId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCharacter),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update character');
          }

          // Update local state
          setCharacters(prevCharacters =>
            prevCharacters.map(char =>
              char.charId === selectedCharacter.charId ? updatedCharacter : char
            )
          );

          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2000);
          setIsPopupOpen(false);
          setSelectedCharacter(null);
          setNewName("");
          setNewImage(null);
          setImagePreview("");
          setNewDescription("");
          setNewCharacteristics("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        };
      } else {
        // If no new image, update without changing the image
        const updatedCharacter = {
          ...selectedCharacter,
          charName: newName,
          charDescription: newDescription,
          charPersonality: newCharacteristics,
          charPrompt: `You are ${newName}. ${newCharacteristics}`
        };

        const response = await fetch(`http://localhost:8080/moderator/characters/${selectedCharacter.charId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCharacter),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update character');
        }

        // Update local state
        setCharacters(prevCharacters =>
          prevCharacters.map(char =>
            char.charId === selectedCharacter.charId ? updatedCharacter : char
          )
        );

        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
        setIsPopupOpen(false);
        setSelectedCharacter(null);
        setNewName("");
        setNewImage(null);
        setImagePreview("");
        setNewDescription("");
        setNewCharacteristics("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while updating the character');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-white text-center">Loading characters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-red-500 text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-white mb-6">Edit Characters</h2>

      {/* Success Message */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
        >
          <div className="bg-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Success!</p>
            <p className="text-sm opacity-90">Character updated successfully</p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
        >
          <div className="bg-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm opacity-90">{errorMessage}</p>
          </div>
        </motion.div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50]"></div>
            <p className="text-white font-semibold">Processing...</p>
            <p className="text-gray-400 text-sm">Please wait while we save your changes</p>
          </div>
        </motion.div>
      )}

      {/* Character List - Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {characters.map((character) => (
          <div
            key={character.charId}
            className="bg-[#2F2F2F] text-[#acacaf] p-6 rounded-xl shadow-md cursor-pointer hover:bg-[#3A3A3A] transition flex flex-col items-center"
            onClick={() => {
              setSelectedCharacter(character);
              setNewName(character.charName);
              setNewImage(null);
              setImagePreview(character.charImg);
              setNewDescription(character.charDescription);
              setNewCharacteristics(character.charPersonality);
              setIsPopupOpen(true);
            }}
          >
            <img src={character.charImg} alt={character.charName} className="w-28 h-28 rounded-full mb-4" />
            <h3 className="text-xl font-bold">{character.charName}</h3>
            <p className="text-sm text-gray-400">ID: {character.charId}</p>
          </div>
        ))}
      </div>

      {/* Edit Popup */}
      {isPopupOpen && selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-96 text-center">
            <img 
              src={imagePreview || selectedCharacter.charImg} 
              alt={newName} 
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" 
            />
            <h3 className="text-xl font-semibold text-white mb-2">
              Editing: {selectedCharacter.charName}
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
                  required
                />

                {/* Image Upload */}
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-[#2F2F2F] text-[#acacaf] px-4 py-2 rounded-md cursor-pointer hover:bg-[#3A3A3A] transition"
                  >
                    Change Image
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-red-400 hover:text-red-500 text-sm"
                    >
                      Remove Image
                    </button>
                  )}
                </div>

                {/* Description Input */}
                <textarea
                  placeholder="Character Description"
                  className="bg-[#2F2F2F] text-[#acacaf] border border-[#3A3A3A] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-none"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  required
                ></textarea>

                {/* Characteristics Input */}
                <textarea
                  placeholder="Characteristics"
                  className="bg-[#2F2F2F] text-[#acacaf] border border-[#3A3A3A] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-none"
                  value={newCharacteristics}
                  onChange={(e) => setNewCharacteristics(e.target.value)}
                  rows={3}
                  required
                ></textarea>
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
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
