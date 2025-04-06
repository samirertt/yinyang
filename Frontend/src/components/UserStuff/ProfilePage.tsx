import { useLocation, useNavigate } from "react-router-dom";

import { useState, useRef } from "react";
import { ArrowLeft, Camera, Edit } from "lucide-react"; // Icon for uploading
import Footer from "../Footer";
import ProfileImage from "../profileimg";
import { useCharacterContext } from "./CharacterContext";

const Profile = () => {
  const location = useLocation();
  const { name, image_path } = location.state || {};
  const { avatar, setAvatar } = useCharacterContext();
  const fileInputRef = useRef(null);

  const [editableName, setEditableName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Step 1: Upload the image to Cloudinary via your backend
        const formData = new FormData();
        formData.append("file", file);
  
        // Send file to the backend API to upload to Cloudinary
        const response = await fetch("http://localhost:8080/api/upload/profile", {
          method: "POST",
          body: formData,
        });
  
        
        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }
  
        const data = await response.json();
        const imageUrl = data.url;  
  
    
        setAvatar(imageUrl);
  
      
        const username = "currentUsername"; 
  
        const userResponse = await fetch("http://localhost:8080/auth/update-profile/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, imageUrl }), 
        });
  
        if (!userResponse.ok) {
          throw new Error("Failed to update user profile image");
        }
  
        console.log("User profile updated with new image URL");
  
      } catch (error) {
        console.error("Error occurred during file upload or user update:", error);
      }
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
        {/* <img
          src={profileImage}
          alt={name}
          className="mt-23 rounded-full w-50 h-50  "
        /> */}
        {image_path === null ? (
        <img src={avatar} alt={name} className="mt-23 rounded-full w-50 h-50" />
      ) : (
        <div  className="w-20 h-20">
        <ProfileImage name={name} />
        </div>
      )}

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
