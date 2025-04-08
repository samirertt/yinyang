import CharacterGrid from "../components/UserStuff/CharacterGrid";
import Footer from "../components/Footer";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";
import UserNavBar from "../components/UserStuff/UserNavBar";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FavouritesGrid from "../components/UserStuff/FavouritesGrid";
import { useCharacterContext } from "../components/UserStuff/CharacterContext";

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
  const token = localStorage.getItem("jwtToken");

  const {setUser} = useCharacterContext();
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  let username: string;
  let userId: number;

  // Decode token and handle potential errors
  try {
    const decoded: any = jwtDecode(token);
    const roles = decoded.roles || [];

    // Check if user has the "user" role
    if (!roles.includes("user")) {
      return <Navigate to="/Login" replace />;
    }

    username = decoded.sub; // Typically, 'sub' is the username or subject
    userId = decoded.userId; // Assumes userId is included in the token

    

    setUser({username: username, userId: userId});
    
    // If userId is not in the token, this will be undefined; handle accordingly if needed
    if (userId === undefined) {
      console.error("userId not found in token");
      // Optionally redirect or set a default value
      return <Navigate to="/Login" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/Login" replace />;
  }

  return (
    <div className="bg-[#212121] flex flex-col min-h-screen px-4 sm:px-6 md:px-10 lg:px-40">
      
      <UserNavBar
        username={username}
        chatList={chatList}
        handleDelete={handleDelete}
        
      />
      <MainPage
        addChat={addChat}
        chatList={chatList}
        username={username}
        userId={userId}
      />
      <Footer />
    </div>
  );
};

// Update MainPageProps to use lowercase prop names for consistency
interface MainPageProps {
  addChat: (
    characterName: string,
    characterImage: string,
    characterDetails: string
  ) => void;
  chatList: { name: string; image: string; details: string }[];
  username: string;
  userId: number;
}

const MainPage: React.FC<MainPageProps> = ({
  addChat,
  chatList,
  username,
  userId,
}) => {
  return (
    <div className="flex flex-col items-center justify-between px-4 bg-[#212121]">
      <SuggestionBanner />
      <CharacterGrid
        onCharacterSelect={addChat}
        list={chatList}
        user={{ username, userId }}
      />
      <FavouritesGrid/>
    </div>
  );
};

export default UserCharacterSelection;