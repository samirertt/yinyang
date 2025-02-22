import UserAvatar from "../components/UserStuff/UserAvatar";
import Avatar from "../assets/Avatar.png";
import UserRecentChats from "../components/UserStuff/UserRecentChats";


function UserCharactertSelection() {
  return (
    <div className="bg-[#212121]">
      <div className="flex flex-col bg-[#212121]">
        <UserRecentChats />
      </div>
      <div className="mt-20">
      <UserAvatar name="Ustaz" image_path={Avatar}/>
      </div>
      
    </div>
  );
}

export default UserCharactertSelection;
