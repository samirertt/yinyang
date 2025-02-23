import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard'
import AdminEditUsers from './pages/AdminEditUsers';
import Login from './pages/Login'
import Moderator from './pages/Moderator'
import Chat from './pages/Chat';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        {/* */}
        {/* <Route path="/moderator" element={< Login/>} />*/}
        <Route path="/Login" element={<Login />} />
        <Route path="/Chat" element={<Chat />} /> 
        <Route path="/AdminDashboard/Characters" element={<AdminDashboard/>}/>
        <Route path="/AdminDashboard/Edit" element={<AdminEditUsers/>}/>
        <Route path="/Moderator" element={<Moderator/>}/>
      </Routes>
    </Router>
  );
}
export default App
