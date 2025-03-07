import { useLocation, useNavigate } from "react-router-dom";

import { useState, useRef } from "react";
import { ArrowLeft, Camera, Edit } from "lucide-react"; // Icon for uploading
import Footer from "../Footer";

const Profile = () => {
  const location = useLocation();
  const { name, image_path } = location.state || {};
  const [profileImage, setProfileImage] = useState(image_path);
  const fileInputRef = useRef(null);

  const [editableName, setEditableName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleNameChange = (event) => {
    setEditableName(event.target.value);
  };
  const saveName = () => {
    setIsEditing(false);
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#212121] flex flex-col items-center relative">
      <ArrowLeft
        className="absolute left-15 top-1/10 transform -translate-y-1/2 text-white cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h1 className="text-2xl sm:text-3xl text-white pb-4 sm:pb-5 sm:pt-8 text-center">
        Profile
      </h1>
      <div className="relative">
        <img
          src={profileImage}
          alt={name}
          className="mt-23 rounded-full w-50 h-50  "
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full  border-white shadow-lg"
        >
          <Camera size={20} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center mt-4 space-x-2">
        {isEditing ? (
          <input
            ref={nameInputRef}
            type="text"
            value={editableName}
            onChange={handleNameChange}
            onBlur={saveName}
            onKeyDown={(e) => e.key === "Enter" && saveName()}
            className="bg-transparent text-white text-2xl border-b border-white outline-none"
            autoFocus
          />
        ) : (
          <h2 className="text-white text-2xl">{editableName}</h2>
        )}

        {/* Edit Icon */}
        <button onClick={() => setIsEditing(true)}>
          <Edit
            className="text-gray-400 hover:text-white cursor-pointer"
            size={20}
          />
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
