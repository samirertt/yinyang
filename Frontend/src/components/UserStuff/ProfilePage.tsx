import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Camera, Edit } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../Footer";
import ProfileImage from "../profileimg";
import { useCharacterContext } from "./CharacterContext";

const Profile = () => {
  const location = useLocation();
  const { name, image_path } = location.state || {};
  const { avatar, setAvatar } = useCharacterContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [editableName, setEditableName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string>(image_path || avatar || "");
  const [newImage, setNewImage] = useState<File | null>(null);

  const token = localStorage.getItem("jwtToken");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

  const handleImageUpload = async () => {
    if (!newImage) return;

    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append('file', newImage);

      const uploadResponse = await fetch('http://localhost:8080/api/upload/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult.url;

      setAvatar(imageUrl);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while uploading the image');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableName(event.target.value);
  };

  const saveName = async () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the username
    // For now, we'll just update the local state
  };

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col items-center relative">
      <ArrowLeft
        className="absolute left-15 top-1/10 transform -translate-y-1/2 text-white cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h1 className="text-2xl sm:text-3xl text-white pb-4 sm:pb-5 sm:pt-8 text-center">
        Profile
      </h1>

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
            <p className="text-sm opacity-90">Profile updated successfully</p>
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

      <div className="relative">
        {imagePreview ? (
          <img 
            src={imagePreview} 
            alt={editableName} 
            className="mt-23 rounded-full w-50 h-50 object-cover" 
          />
        ) : (
          <div className="w-50 h-50">
            <ProfileImage name={editableName} />
          </div>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full border-white shadow-lg hover:bg-gray-700 transition"
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

        <button onClick={() => setIsEditing(true)}>
          <Edit
            className="text-gray-400 hover:text-white cursor-pointer"
            size={20}
          />
        </button>
      </div>

      {newImage && (
        <button
          onClick={handleImageUpload}
          className="mt-4 bg-[#4CAF50] text-white px-4 py-2 rounded-md hover:bg-[#45a049] transition"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
