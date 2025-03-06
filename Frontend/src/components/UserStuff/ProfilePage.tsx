import { useLocation, useNavigate } from "react-router-dom";

import { useState, useRef } from "react";
import { ArrowLeft, Camera, Edit } from "lucide-react"; // Icon for uploading

const Profile = ({
  chatList,
  likedList,
}: {
  chatList: { name: string; image: string }[];
  likedList: { name: string; image: string }[];
}) => {
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
        {/* Hidden file input */}
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
      <NavigationTabs chatList={chatList} likedList={likedList}/>
    </div>
  );
};

interface NavItem {
  label: string;
  key: string;
}

const NavigationTabs = ({
  chatList,
  likedList,
}: {
  chatList: { name: string; image: string }[];
  likedList: { name: string; image: string }[];
}) => {
  const [activeTab, setActiveTab] = useState<string>("history");
  const [likedItems] = useState<string[]>([]);

  const tabs: NavItem[] = [
    { key: "history", label: "History" },
    { key: "favourite", label: "Favourite" },
  ];
  console.log(likedList)
  return (
    <div className="w-[300px] max-w-4xl mx-auto p-6">
      <div className="flex space-x-8 justify-center border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-4 px-1 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-8">
        {activeTab === "history" && (
          <div className="space-y-4">
            {chatList && chatList.length > 0 ? (
              chatList.map((chat, index) => (
                <ChatCard
                  key={index}
                  name={chat.name}
                  image_path={chat.image}
                />
              ))
            ) : (
              <p className="text-white">
                Your characters list will appear here
              </p>
            )}
          </div>
        )}

        {activeTab === "favourite" && (
          <div className="text-center py-12">
            {likedItems.length === 0 ? (
              <div className="space-y-2">
                {likedList && chatList.length > 0 ? (
                  likedList.map((chat, index) => (
                    <ChatCard
                      key={index}
                      name={chat.name}
                      image_path={chat.image}
                    />
                  ))
                ) : (
                  <p className="text-lg font-medium text-white">
                    You haven't liked any Characters yet.
                  </p>
                )}
              </div>
            ) : (
              <div>Liked items list</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatCard = ({
  name,
  image_path,
}: {
  name: string;
  image_path: string;
}) => {
  return (
    <div className="relative w-full">
      <button className="w-full text-left p-2 text-[var(--white)] rounded hover:bg-[#3a3a3a] relative flex items-center justify-start gap-2">
        <img
          src={image_path}
          alt="Character"
          className=" bg-white rounded-full flex flex-row h-10 w-10 mr-2 "
        />
        <span>{name}</span>
      </button>
    </div>
  );
};

export default Profile;
