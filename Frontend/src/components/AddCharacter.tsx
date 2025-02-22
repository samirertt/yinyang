import { useState, useRef } from "react";

const AddCharacter = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [characteristics, setCharacteristics] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to file input

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
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    console.log("Character Added:", { name, image, details, characteristics });

    // Reset fields after submission
    setName("");
    setImage(null);
    setPreview(null);
    setDetails("");
    setCharacteristics("");

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6 rounded-lg shadow-md w-full h-full" style={{ backgroundColor: "#212121" }}>
      {/* Character Image Upload */}
      <div>
        <label className="block text-[#acacaf] font-semibold mb-4">Character Image</label>
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="fileInput"
          onChange={handleImageChange}
          ref={fileInputRef} // Attach ref
          required
        />

    {/* Upload Button */}
    <label
        htmlFor="fileInput"
        className="bg-[#212121] text-[#acacaf] px-4 py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition inline-flex items-center gap-2 font-semibold"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" />
        </svg>
        Select Image
    </label>

        {/* Preview & Remove Button */}
        {preview && (
          <div className="mt-4 flex flex-col items-center">
            <img src={preview} alt="Character Preview" className="w-32 h-32 object-cover rounded-md shadow-md mb-2" />
            
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-[#212121] text-[#acacaf] px-4 py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition inline-flex items-center gap-2 font-semibold"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      {/* Character Name */}
      <div>
        <label className="block mt-4 text-[#acacaf] font-semibold ">Character Name</label>
        <input
          type="text"
          placeholder="Enter Character Name"
          className="border p-2 w-full rounded-md max-w-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Character Details */}
      <div>
        <label className="block mt-4 text-[#acacaf] font-semibold">Character Details</label>
        <textarea
          placeholder="Enter details about the character..."
          className="border p-2 w-full rounded-md h-24 resize-none"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
      </div>

      {/* Character Characteristics */}
      <div>
        <label className="block mt-4 text-[#acacaf] font-semibold">Character Characteristics</label>
        <textarea
          placeholder="Enter traits, abilities, or personality..."
          className="border p-2 w-full rounded-md h-24 resize-none"
          value={characteristics}
          onChange={(e) => setCharacteristics(e.target.value)}
          required
        />
      </div>

    {/* Submit Button */}
    <div>
    <button type="submit" className="bg-[#212121] text-[#acacaf] px-4 py-3 rounded-md cursor-pointer hover:bg-[#2F2F2F] transition inline-flex items-center gap-2 font-semibold">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M6 12H18M12 6V18" />
        </svg>
        Add Character
    </button>
    </div>

    </form>
  );
};

export default AddCharacter;
