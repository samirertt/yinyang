import UserAvatar from "../UserStuff/UserAvatar";
import UserRecentChats from "../UserStuff/UserRecentChats";
import UserSearchBar from "./UserSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCharacterContext } from "./CharacterContext";
import { useNavigate } from "react-router-dom";

export interface UserNavBarProps {
  chatList: { name: string; image: string; chatId: number }[];
  handleDelete: (buttonName: string) => void;
  username: string;
}

const UserNavBar: React.FC<UserNavBarProps> = ({
  chatList,
  handleDelete,
  username,
}) => {
  const { avatar, setAvatar, user } = useCharacterContext();
  const [userChats, setUserChats] = useState<{ name: string; image: string; chatId: number; details?: string }[]>([]);
  const navigate = useNavigate();
  
  const updateActive = (character: any, newChatId: number) => {
    navigate("/Chat", {
      state: {
        character: character,
        chatId: newChatId,
        user: user
      },
      replace: true,
    });
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/${username}/profile-image`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.text();
        setAvatar(data);
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };
  
    if (username) {
      fetchAvatar();
    }
  }, [username]);

  // Helper to fetch character info by ID
  const getCharFromId = async (id: number): Promise<{ name: string; image: string; details: string } | undefined> => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`http://localhost:8080/admin/characters/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return { name: data.charName, image: data.charImg, details: data.charDescription };
      } else {
        console.log("Character Not Found!");
        return undefined;
      }
    } catch (error) {
      console.error("Error fetching character info:", error);
      return undefined;
    }
  };

  useEffect(() => {
    const getUserChats = async () => {
      if (!user?.userId) return;
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await fetch("http://localhost:8080/chat/getUserChats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user.userId }),
        });

        if (response.ok) {
          const data = await response.json();
          // For each chat, fetch character info
          const promises = data.map(async (chatItem: any) => {
            const character = await getCharFromId(chatItem.charId);
            if (character) {
              return {
                name: character.name ?? "N/A",
                image: character.image ?? "No Image",
                details: character.details ?? "N/A",
                chatId: chatItem.chatId,
              };
            }
            return null;
          });
          const resolvedChats = await Promise.all(promises);
          const chats = resolvedChats.filter(chat => chat !== null) as { name: string; image: string; details: string; chatId: number }[];
          setUserChats(chats);
        } else {
          console.error("Failed to fetch user chats:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    };
    getUserChats();
  }, [user?.userId]);

  return (
    <div className="mt-5 flex flex-col md:flex-row items-center justify-between bg-[#212121] ml-5 h-auto w-full">
      <div className="self-start">
        <UserRecentChats
          chatList={userChats}
          handleDelete={handleDelete}
          name={username}
          user_image={avatar}
          user={user}
          updateActive={updateActive}
        />
        <div className="ml-5 md:ml-2">
          {/* Provide a default value if username is not given */}
          <UserAvatar name={username || "Guest"} image_path={avatar} />
        </div>
      </div>

      {/* Right section - Search + Filter */}
      <div className="w-full md:w-[400px] order-2 ">
        <UserSearchBar />
      </div>
    </div>
  );
};

export default UserNavBar;
