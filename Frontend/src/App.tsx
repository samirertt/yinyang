import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditUsers from './pages/AdminEditUsers';
import Login from './pages/Login';
import Moderator from './pages/Moderator';
import Chat from './pages/Chat';
import SignupPage from './pages/SignUpPage';
import UserDashboard from "./pages/UserDashboard";
import FilterPage from './components/UserStuff/FilterPage';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/SignUp" element={<SignupPage />} />
        <Route path="/AdminDashboard/Characters" element={<AdminDashboard/>}/>
        <Route path="/AdminDashboard/Edit" element={<AdminEditUsers/>}/>
        <Route path="/Moderator" element={<Moderator/>}/>
        <Route path="/UserDashboard" element={<UserDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;