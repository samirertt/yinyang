import CharacterGrid from "../components/UserStuff/CharacterGrid";
import { useState } from "react";

import Footer from "../components/Footer";
import SuggestionBanner from "../components/UserStuff/SuggestionBanner";
import UserNavBar from "../components/UserStuff/UserNavBar";


function UserCharactertSelection() {
  const [chatList, setChatList] = useState<{ name: string; image: string }[]>(
    []
  );

  const addChat = (characterName: string, characterImage: string) => {
    if (!chatList.some((chat) => chat.name === characterName)) {
      setChatList((prevChats) => [
        ...prevChats,
        { name: characterName, image: characterImage },
      ]);
    }
  };

  const handleDelete = (buttonName: string) => {
    setChatList((prevChat) =>
      prevChat.filter((chat) => chat.name !== buttonName)
    );
  };

  return (
    <div className="bg-[#212121] flex flex-col h-screen px-2 sm:px-4 md:px-6 ">
      {UserNavBar(chatList, handleDelete)}

      <div className=" items-center justify-between px-15">
      <SuggestionBanner />

      
      <CharacterGrid onCharacterSelect={addChat} />
      </div>
      <Footer/>
    </div>
  );
}

export default UserCharactertSelection;


