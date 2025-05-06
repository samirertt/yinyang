import UserAvatar from "../UserStuff/UserAvatar";
import UserRecentChats from "../UserStuff/UserRecentChats";
import UserSearchBar from "./UserSearch";
import { useEffect } from "react";
import axios from "axios";
import { useCharacterContext } from "./CharacterContext";




export interface UserNavBarProps {
  chatList: { name: string; image: string }[];
  handleDelete: (buttonName: string) => void;
  username: string;
 
}

const UserNavBar: React.FC<UserNavBarProps> = ({
  chatList,
  handleDelete,
  username,

  
}) => {

  const { avatar, setAvatar } = useCharacterContext();
  
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/${username}/profile-image`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.text(); // <- use .text() because you expect a string, not JSON
        setAvatar(data); // data is now the URL string
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };
  
    if (username) {
      fetchAvatar();
    }
  }, [username]);
  

  return (
    <div className="mt-5 flex flex-col md:flex-row items-center justify-between bg-[#212121] ml-5 h-auto w-full">
      <div className="self-start">
        <UserRecentChats
          chatList={chatList}
          handleDelete={handleDelete}
          name={username}
          user_image={avatar}
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
