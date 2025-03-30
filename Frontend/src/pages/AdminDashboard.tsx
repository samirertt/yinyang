import NavBar from "../components/NavBar";
import CharactersBarGraph from "../components/AdminDashboardComponents/CategoriesBarGraph";
import { useLocation, Navigate } from "react-router-dom";

function AdminDashboard()
{
  const location = useLocation();
  const username = location.state?.username; 
  if (!username) {
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