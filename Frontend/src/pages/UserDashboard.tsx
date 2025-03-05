import CharacterGrid from "../components/UserStuff/CharacterGrid";
import Footer from "../components/Footer";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";
import UserNavBar from "../components/UserStuff/UserNavBar";

interface UserCharacterSelectionProps {
  chatList: { name: string; image: string }[];
  handleDelete: (buttonName: string) => void;
  addChat: (characterName: string, characterImage: string) => void;
}

const UserCharacterSelection = ({
  chatList,
  handleDelete,
  addChat,
}: UserCharacterSelectionProps) => {
  
  return (
    <div className="bg-[#212121] flex flex-col h-full px-2 sm:px-4 md:px-6 ">
      <UserNavBar chatList={chatList} handleDelete={handleDelete} />

      <MainPage addChat={addChat} />
      <Footer />
    </div>
  );
};

interface MainPageProps {
  addChat: (characterName: string, characterImage: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ addChat }) => {
  return (
    <div className=" items-center justify-between px-15 bg-[#212121]">
      <SuggestionBanner />

      <CharacterGrid onCharacterSelect={addChat} />
    </div>
  );
};
export default UserCharacterSelection;
