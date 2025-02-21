import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Moderator from './pages/Moderator'
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        {/* <Route path="/chat" element={<Chat />} /> */}
        {/* <Route path="/moderator" element={< Login/>} />*/}
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/Moderator" element={<Moderator/>}/>
      </Routes>
    </Router>
  );
}
export default App
