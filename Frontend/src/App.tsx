import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminEditCharacters from "./pages/AdminEditCharacters";
import AdminEditUsers from "./pages/AdminEditUsers";
import Login from "./pages/Login";
import Moderator from "./pages/Moderator";
import Chat from "./pages/Chat";
import SignupPage from "./pages/SignUpPage";
import FilterPage from "./components/UserStuff/FilterPage";
import FilterList from "./components/UserStuff/FiterList";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicies";
import TermsOfService from "./pages/terms";
import AdminDashboard from "./pages/AdminDashboard";
import UserCharacterSelection from "./pages/UserDashboard";
import Profile from "./components/UserStuff/ProfilePage";
import UserSettings from "./components/UserStuff/Settings";
const App: React.FC = () => {

  const [chatList, setChatList] = useState<{ name: string; image: string }[]>(
    []
  );
  const handleDelete = (buttonName: string) => {
    setChatList((prevChat) =>
      prevChat.filter((chat) => chat.name !== buttonName)
    );
  };
  const addChat = (characterName: string, characterImage: string) => {
    if (!chatList.some((chat) => chat.name === characterName)) {
      setChatList((prevChats) => [
        ...prevChats,
        { name: characterName, image: characterImage },
      ]);
    }
    
  };

  useEffect(() => {
    if (chatList.length > 0) {
      console.log("Array updated, proceeding with the next step...");
      console.log(chatList);
    }
  }, [chatList]); 

  return (
    <Router>
      <Routes>
        <Route
          path="/UserDashBoard/FilterPage/FilterList"
          element={
            <FilterList  chatList={chatList} handleDelete={handleDelete} />
          }
        />
        <Route
          path="/UserDashboard/FilterPage"
          element={
            <FilterPage chatList={chatList} handleDelete={handleDelete} />
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/SignUp" element={<SignupPage />} />
        <Route
          path="/AdminDashboard/Characters"
          element={<AdminEditCharacters />}
        />
        <Route path="/AdminDashboard/Edit" element={<AdminEditUsers />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Moderator" element={<Moderator />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route
          path="/"
          element={
            <UserCharacterSelection
              chatList={chatList}
              handleDelete={handleDelete}
              addChat={addChat}
            />
          }
        />
        <Route path="/UserDashboard/Profile" element={<Profile chatList={chatList}/>}/>
        <Route path="/UserDashboard/Settings" element={<UserSettings/>}/>
      </Routes>
    </Router>
  );
};

export default App;
