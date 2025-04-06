import UserAvatar from "../UserStuff/UserAvatar";
import Avatar from "../../assets/potrait/ana_de_armas.jpg";
import UserRecentChats from "../UserStuff/UserRecentChats";
import UserSearchBar from "./UserSearch";




export interface UserNavBarProps {
  chatList: { name: string; image: string }[];
  handleDelete: (buttonName: string) => void;
  username?: string;
 
}

const UserNavBar: React.FC<UserNavBarProps> = ({
  chatList,
  handleDelete,
  username,
  
}) => {
  return (
    <div className="mt-5 flex flex-col md:flex-row items-center justify-between bg-[#212121] ml-5 h-auto w-full">
      <div className="self-start">
        <UserRecentChats
          chatList={chatList}
          handleDelete={handleDelete}
          name={username}
          user_image={Avatar}
        />
        <div className="ml-5 md:ml-2">
          {/* Provide a default value if username is not given */}
          <UserAvatar name={username || "Guest"} image_path={Avatar} />
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
