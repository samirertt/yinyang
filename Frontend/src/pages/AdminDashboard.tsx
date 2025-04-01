import NavBar from "../components/NavBar";
import CharactersBarGraph from "../components/AdminDashboardComponents/CategoriesBarGraph";
import {Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function AdminDashboard()
{
const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/Login" replace />;
  }
  let username: string;
  let userId: number;
  
  try {
    const decoded: any = jwtDecode(token);
    const roles = decoded.roles || [];

    // Check if user has the "user" role
    if (!roles.includes("admin")) {
      return <Navigate to="/Login" replace />;
    }

    username = decoded.sub; // Typically, 'sub' is the username or subject
    userId = decoded.userId; // Assumes userId is included in the token

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
    <div>
      <NavBar admin={true} logged={username}/>
      <div className="w-[800px] h-full md:min-w-[100%] lg:min-w-[100%] flex flex-col items-center mt-20">
        <CharactersBarGraph />
      </div>
    </div>
  )
}

export default AdminDashboard;