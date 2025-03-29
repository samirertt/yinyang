import CharacterGrid from "../components/UserStuff/CharacterGrid";
import Footer from "../components/Footer";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";
import UserNavBar from "../components/UserStuff/UserNavBar";
import { Navigate, useLocation } from "react-router-dom";


interface UserCharacterSelectionProps {
  chatList: { name: string; image: string; details: string }[];
  handleDelete: (buttonName: string) => void;
  addChat: (
    characterName: string,
    characterImage: string,
    characterDetails: string
  ) => void;
}

const UserCharacterSelection = ({
  chatList,
  handleDelete,
  addChat,
}: UserCharacterSelectionProps) => {
  const location = useLocation();
  const user = location.state?.user;

  
  
  // Redirect if no username (not logged in)
  if (!user) {
    return <Navigate to="/Login" replace />;
  }
  

  return (
    <div className="bg-[#212121] flex flex-col min-h-screen px-4 sm:px-6 md:px-10 lg:px-40">
      <UserNavBar
        username={user.username}
        chatList={chatList}
        handleDelete={handleDelete}
      />
      <MainPage addChat={addChat} chatList={chatList} Username={user.username} UserId={user.userId} />
      <Footer />
    </div>
  );
};

interface MainPageProps {
  addChat: (
    characterName: string,
    characterImage: string,
    characterDetails: string
  ) => void;
  chatList: { name: string; image: string; details: string }[];
  Username: string;
  UserId: number;
}

const MainPage: React.FC<MainPageProps> = ({ addChat, chatList, Username, UserId }) => {
  return (
    <div className="flex flex-col items-center justify-between px-4 bg-[#212121]">
      <SuggestionBanner />
      <CharacterGrid
        onCharacterSelect={addChat}
        list={chatList}
        title="Featured"
        user={{ username:Username, userId:UserId }} // Update this to match the expected prop
      />
      <CharacterGrid
        onCharacterSelect={addChat}
        list={chatList}
        title="Favourites"
        user={{ username:Username,userId:UserId }} // Same here
      />
    </div>
  );
};

export default UserCharacterSelection;
