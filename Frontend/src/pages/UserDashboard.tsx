import CharacterGrid from "../components/UserStuff/CharacterGrid";
import Footer from "../components/Footer";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";
import UserNavBar from "../components/UserStuff/UserNavBar";
import { Navigate, useLocation } from "react-router-dom";

interface UserCharacterSelectionProps {
  chatList: { name: string; image: string }[];
  handleDelete: (buttonName: string) => void;
  addChat: (characterName: string, characterImage: string) => void;
  addLikedList: (characterName: string, characterImage: string) => void;
}

const UserCharacterSelection = ({
  chatList,
  handleDelete,
  addChat,
  addLikedList
}: UserCharacterSelectionProps) => {
  const location = useLocation();
  const username = location.state?.username;

  // Redirect if no username (not logged in)
  if (!username) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <div className="bg-[#212121] flex flex-col min-h-screen px-4 sm:px-6 md:px-10 lg:px-40">
      <UserNavBar
        username={username}
        chatList={chatList}
        handleDelete={handleDelete}
      />
      <MainPage addChat={addChat} chatList={chatList} addLikedList={addLikedList} username={username} />
      <Footer />
    </div>
  );
};

interface MainPageProps {
  addChat: (characterName: string, characterImage: string) => void;
  chatList: { name: string; image: string }[];
  addLikedList: (characterName: string, characterImage: string) => void;
  username: string;
}

const MainPage: React.FC<MainPageProps> = ({ addChat, chatList, addLikedList, username }) => {
  return (
    <div className="flex flex-col items-center justify-between px-4 bg-[#212121]">
      <SuggestionBanner />
      <CharacterGrid
        onCharacterSelect={addChat}
        list={chatList}
        title="Featured"
        addLikedList={addLikedList}
        user={{ username }} // Update this to match the expected prop
      />
      <CharacterGrid
        onCharacterSelect={addChat}
        list={chatList}
        title="Favourites"
        addLikedList={null}
        user={{ username }} // Same here
      />
    </div>
  );
};

export default UserCharacterSelection;
