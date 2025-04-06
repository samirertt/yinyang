import friendlyImage from "../../assets/filter_image/friendly.jpeg";
import aggressiveImage from "../../assets/filter_image/aggressive.jpeg";
import calmImage from "../../assets/filter_image/calm.png";
import mysteriousImage from "../../assets/filter_image/mysterious.jpeg";
import pridefulImage from "../../assets/filter_image/prideful.jpeg";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import UserNavBar from "./UserNavBar";
import {UserNavBarProps} from "./UserNavBar"
import { jwtDecode } from "jwt-decode";

interface GridItem {
  title: string;
  icon: string;
  bgColor: string;
}

const FilterPage : React.FC<UserNavBarProps> = ({ chatList, handleDelete }) => {
  
  const categories: GridItem[] = [
    {
      title: "Friendly",
      icon: friendlyImage,
      bgColor: "bg-[#ffa500]",
    },
    {
      title: "Aggressive",
      icon: aggressiveImage,
      bgColor: "bg-[#dc143c]",
    },
    {
      title: "Calm",
      icon: calmImage,
      bgColor: "bg-[#4682b4]",
    },
    {
      title: "Mysterious",
      icon: mysteriousImage,
      bgColor: "bg-[#301934]",
    },
    {
      title: "Prideful",
      icon: pridefulImage,
      bgColor: "bg-[#b06239]",
    },
  ];
  const navigate = useNavigate();
  
  const token = localStorage.getItem("jwtToken");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  let username: string;
  let userId: number;

  // Decode token and handle potential errors
  try {
    const decoded: any = jwtDecode(token);
    const roles = decoded.roles || [];

    // Check if user has the "user" role
    if (!roles.includes("user")) {
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
    <div className="bg-[#212121] min-h-screen pt-5 px-4 sm:px-6 md:px-10 lg:px-40">
      <UserNavBar chatList={chatList} handleDelete={handleDelete} username={username} />
      <div className="w-auto mx-auto pl-20 pr-20 pb-20 mt-10">
        <div className="flex justify-center align-start relative">
          <ArrowLeft
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
            onClick={() => navigate(-1)}
          />

          <p className="text-2xl sm:text-3xl text-white pb-4 sm:pb-5 sm:pt-8 text-center">
            Filters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {categories.map((category) => (
            <FilterCards
              key={category.title} // Add a key for React list rendering
              icon={category.icon}
              title={category.title}
              bgColor={category.bgColor}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FilterCards = ({
  icon,
  title,
  bgColor,
}: {
  icon: string;
  title: string;
  bgColor: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the new page and pass data via state
    navigate("/UserDashBoard/FilterPage/FilterList", {
      state: { icon, title, bgColor },
    });
  };
  return (
    <div className="w-full ">
      <div
        className={`w-full h-20 md:h-28 ${bgColor} text-left rounded-lg transition-all duration-300 cursor-pointer flex items-center px-4 gap-5 overflow-hidden hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.6)]`}
        onClick={handleClick}
      >
        <h2 className=" text-sm md:text-2xl text-white">{title}</h2>

        <img
          src={icon}
          alt={title}
          className="w-15 h-15 md:w-20 md:h-20 rounded-xl transform rotate-45 ml-auto translate-y-8"
        />
      </div>
    </div>
  );
};

export default FilterPage;
