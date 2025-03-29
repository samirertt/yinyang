import NavBar from "../components/NavBar";
import CharactersBarGraph from "../components/AdminDashboardComponents/CategoriesBarGraph";
import { useLocation, Navigate } from "react-router-dom";

function AdminDashboard()
{
  const location = useLocation();
  const username = location.state?.username; // Fallback to 'Guest' if username is not available
  // Redirect if no username (not logged in)
  if (!username) {
    return <Navigate to="/Login" replace />;
  }
    const allCategories = [
        {
          title: "Friendly",
          bgColor: "#ffa500",
          usage:12.5,
          characters:2
        },
        {
          title: "Aggressive",
          bgColor: "#dc143c",
          usage:22.5,
          characters:3
        },
        {
          title: "Calm",
          bgColor: "#4682b4",
          usage:25,
          characters:3
        },
        {
          title: "Mysterious",
          bgColor: "#301934",
          usage:10,
          characters:2
        },
        {
          title: "Prideful",
          bgColor: "#b06239",
          usage:40,
          characters:5
        },
      ];
    const userCount=[
        {
            year:2022,
            count:20
        },
        {
            year:2023,
            count:50
        },
        {
            year:2024,
            count:120
        },
        {
            year:2025,
            count:250
        }
    ]

    return(
        <div >
            <NavBar admin={true} logged={username}/>
            <div className="w-[800px] h-full md:min-w-[100%] lg:min-w-[100%] flex flex-col items-center mt-20">
                <CharactersBarGraph userCount={userCount} categories={allCategories}/>
            </div>
        </div>
    )
}

export default AdminDashboard;