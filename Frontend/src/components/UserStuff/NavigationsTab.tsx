import { useState } from "react";

interface NavItem {
  label: string;
  key: string;
}

const NavigationTabs = ({
  chatList,
}: {
  chatList: { name: string; image: string }[];
}) => {
  const [activeTab, setActiveTab] = useState<string>("history");
  const [likedItems] = useState<string[]>([]);

  const tabs: NavItem[] = [
    { key: "history", label: "History" },
    { key: "favourite", label: "Favourite" },
  ];

  return (
    <div className="w-[300px] max-w-4xl mx-auto p-6 mb-10">
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
              <p className="text-lg font-medium text-white">
                Your characters list will appear here
              </p>
            )}
          </div>
        )}

        {activeTab === "favourite" && (
          <div className="text-center py-12">
            {likedItems.length === 0 ? (
              <div className="space-y-2">
                <p className="text-lg font-medium text-white">
                  You haven't liked any Characters yet.
                </p>
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

export default NavigationTabs;
