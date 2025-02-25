import { useState } from "react";
import YinYang from "../../assets/yinyang.png";
import { Trash2, Menu, X } from "lucide-react";

type Chat = {
  name: string;
  image: string;
};


//This is the chat history of the user
const UserRecentChats = ({
  chatList,
  handleDelete,
}: {
  chatList: Chat[];
  handleDelete: (name: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 text-[var(--white)] px-4 py-2 rounded hover:bg-[#3a3a3a]"
      >
        <Menu
          size={24}
          className="text-white hover:text-gray-300 cursor-pointer"
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--gray-black)] border-r border-[var(--gray-medium-dark)] shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-[var(--gray-darker)] text-[var(--white)] px-2 py-1 rounded hover:bg-[var(--gray-medium-dark)]"
        >
          <X />
        </button>

        <div className="w-full h-full p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-10 h-10 mb-8 mt-10">
              <img
                src={YinYang}
                alt="User"
                className="flex items-center gap-2 pt-3"
              />
              <h2 className="text-lg font-semibold text-[var(--white)] ">
                YinYang
              </h2>
            </div>
          </div>

          <div
            style={{
              maxHeight: "300px",
              overflowY: "scroll",
              padding: "10px",
              scrollbarWidth: "none",
            }}
          >
            {chatList.map((chat, index) => (
              <ChatCard
                key={index}
                name={chat.name}
                image_path={chat.image}
                onDelete={() => handleDelete(chat.name)}
              />
            ))}
          </div>

          <div className="flex flex-col">
            <button>Settings</button>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
//This is are the cards that show the info of the character interacted with
const ChatCard = ({
  name,
  image_path,
  onDelete,
}: {
  name: string;
  image_path: string;
  onDelete: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowConfirm(false);
      }}
    >
      <button className="w-full text-left p-2 text-[var(--white)] rounded hover:bg-[#3a3a3a] relative flex items-center justify-start">
        <img
          src={image_path}
          alt="Character"
          className=" bg-white rounded-full flex flex-row h-10 w-10 mr-2 "
        />
        <span>{name}</span>
      </button>

      {isHovered && !showConfirm && (
        <button
          onClick={() => setShowConfirm(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 p-1 rounded-full hover:bg-red-600 transition-all"
        >
          <Trash2 size={16} className="text-white" />
        </button>
      )}

      {showConfirm && (
        <div
          className=" absolute top-0 bg-gray-800 text-white text-sm p-2 rounded shadow-lg  ml-2 "
          onClick={onDelete}
        >
          <p>You will remove your chat with this character.</p>
        </div>
      )}
    </div>
  );
};
export default UserRecentChats;
