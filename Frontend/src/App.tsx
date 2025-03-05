import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminEditCharacters from './pages/AdminEditCharacters';
import AdminEditUsers from './pages/AdminEditUsers';
import Login from './pages/Login';
import Moderator from './pages/Moderator';
import Chat from './pages/Chat';
import SignupPage from './pages/SignUpPage';
import UserDashboard from "./pages/UserDashboard";
import FilterPage from './components/UserStuff/FilterPage';
import FilterList from './components/UserStuff/FiterList';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicies';
import TermsOfService from './pages/terms';
import AdminDashboard from './pages/AdminDashboard';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/UserDashBoard/FilterPage/FilterList' element={<FilterList/>}/>
        <Route path='/UserDashboard/FilterPage' element={<FilterPage/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/SignUp" element={<SignupPage />} />
        <Route path="/AdminDashboard/Characters" element={<AdminEditCharacters/>}/>
        <Route path="/AdminDashboard/Edit" element={<AdminEditUsers/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/Moderator" element={<Moderator/>}/>
        <Route path="/AboutUs" element={<AboutUs/>}/>
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
        <Route path="/TermsOfService" element={<TermsOfService/>}/>
        <Route path="/" element={<UserDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;