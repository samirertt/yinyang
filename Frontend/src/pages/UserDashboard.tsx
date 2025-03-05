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
    <div className="bg-[#212121] flex flex-col min-h-screen px-4 sm:px-6 md:px-10 lg:px-40">
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

      <CharacterGrid onCharacterSelect={addChat} title="Featured"/>
      <CharacterGrid onCharacterSelect={addChat} title="Favourites"/>
    </div>
  );
};
export default UserCharacterSelection;
