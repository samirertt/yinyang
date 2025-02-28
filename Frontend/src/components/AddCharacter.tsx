import { useState, useRef } from "react";

const AddCharacter = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [characteristics, setCharacteristics] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }
    console.log("Character Added:", { name, image, details, characteristics });
    setName("");
    setImage(null);
    setPreview(null);
    setDetails("");
    setCharacteristics("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md w-full  h-full mt-20 bg-[#212121] flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        {/* Character Name & Image Row */}
        <div className="flex gap-6 items-start mb-6">
          {/* Character Name */}
          <div className="w-1/2">
            <label className="block text-[#acacaf] font-semibold mb-2">Character Name</label>
            <input
              type="text"
              placeholder="Enter Character Name"
              className="border p-2 w-full rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* Character Image Upload */}
          <div className="w-1/2 flex flex-col items-center">
            <label className="block text-[#acacaf] font-semibold mb-2">Character Image</label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={handleImageChange}
              ref={fileInputRef}
              required
            />
            <label
              htmlFor="fileInput"
              className="bg-[#2F2F2F] text-[#acacaf] px-4 py-3 rounded-md cursor-pointer hover:bg-[#3A3A3A] transition font-semibold"
            >
              Select Image
            </label>
            {preview && (
              <div className="mt-4 flex flex-col items-center">
                <img src={preview} alt="Character Preview" className="w-24 h-24 object-cover rounded-md shadow-md" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 text-red-400 hover:text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Details & Characteristics */}
        <div>
          <label className="block text-[#acacaf] font-semibold">Character Details</label>
          <textarea
            placeholder="Enter details about the character..."
            className="border p-2 w-full rounded-md h-24 resize-none"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-[#acacaf] font-semibold mt-4">Character Characteristics</label>
          <textarea
            placeholder="Enter traits, abilities, or personality..."
            className="border p-2 w-full rounded-md h-24 resize-none"
            value={characteristics}
            onChange={(e) => setCharacteristics(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="mt-4 bg-[#2F2F2F] text-[#acacaf] px-4 py-2 rounded-md cursor-pointer hover:bg-[#3A3A3A] transition font-semibold w-full">
          Add Character
        </button>
      </form>

      {/* Character Preview Card */}
      {name && preview && (
      <div className="mt-6 p-4 rounded-lg shadow-md bg-[#2F2F2F] w-full max-w-md text-[#acacaf]">
        <h2 className="font-bold text-xl mb-2">Character Preview</h2>
        <div className="flex items-center gap-4 overflow-hidden">
          <img src={preview} alt="Character Preview" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
          <div className="overflow-hidden">
            <h3 className="text-lg font-semibold truncate">{name}</h3>
            <p className="text-sm break-words line-clamp-3">{details}</p>
            <p className="text-xs text-gray-400 mt-1 break-words line-clamp-2">{characteristics}</p>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default AddCharacter;
