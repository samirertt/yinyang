import CharacterGrid from "../components/UserStuff/CharacterGrid";
import Footer from "../components/Footer";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";
import UserNavBar from "../components/UserStuff/UserNavBar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FavouritesGrid from "../components/UserStuff/FavouritesGrid";
import { useEffect } from "react";



interface UserCharacterSelectionProps {
  chatList: { name: string; image: string; details: string }[];
  handleDelete: (buttonName: string) => void;
  addChat: (
    characterName: string,
    characterImage: string,
    characterDetails: string
  ) => void;
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      userId: number;
    }>
  >;
  user:{ username: string; userId: number };
}

const UserCharacterSelection = ({
  chatList,
  handleDelete,
  addChat,
  setUser,
  user,
}: UserCharacterSelectionProps) => {
  const navigate = useNavigate();

  // If no token, redirect to login
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
  if (!token) {
    navigate("/Login");
    return;
  }


  let userId: number;

  // Decode token and handle potential errors
  try {
    const decoded: any = jwtDecode(token);
    const roles = decoded.roles || [];

    // Check if user has the "user" role
    if (!roles.includes("user")) {
      navigate("/Login");
      return;
    }


    userId = decoded.userId; // Assumes userId is included in the token

    setUser({
      username: decoded.sub,
      userId: decoded.userId,
    });
    
  
    // If userId is not in the token, this will be undefined; handle accordingly if needed
    if (userId === undefined) {
      console.error("userId not found in token");
      // Optionally redirect or set a default value
      navigate("/Login");
      return;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    navigate("/Login");
    return;
  }
},[]);
  

  

  return (
    <div className="bg-[#212121] flex flex-col min-h-screen px-4 sm:px-6 md:px-10 lg:px-40">
      <UserNavBar
        username={user.username}
        chatList={chatList}
        handleDelete={handleDelete}
      />
      <MainPage
        addChat={addChat}
        chatList={chatList}
        username={user.username}
        userId={user.userId}
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
      <FavouritesGrid />
    </div>
  );
};

export default UserCharacterSelection;
