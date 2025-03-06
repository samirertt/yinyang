import { useLocation, useNavigate } from "react-router-dom";
import CharacterGrid from "./CharacterGrid";
import { ArrowLeft } from "lucide-react";
import UserNavBar, { UserNavBarProps } from "./UserNavBar";

const FilterList: React.FC<UserNavBarProps> = ({ chatList, handleDelete,username }) => {
  const location = useLocation();
  const { icon, title, bgColor } = location.state;

  const navigate = useNavigate();
  return (
    <div className="bg-[#212121] min-h-screen pt-5 px-4 sm:px-6 md:px-10 lg:px-40">
      <UserNavBar chatList={chatList} handleDelete={handleDelete} username={username}/>
      <div
        className={`bg-gradient-to-b ${bgColor} from-[#yourColor] to-black rounded-t-4xl w-full h-45 md:h-90 relative overflow-hidden mt-25`}
      >
        <div
          className="absolute top-6 left-6 md:top-10 md:left-10 text-white text-4xl rounded-full h-10 w-10 cursor-pointer flex items-center justify-center hover:bg-[#818181]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </div>

        <h1 className=" text-4xl md:text-6xl text-white absolute bottom-4 left-10">
          {title}
        </h1>

        <img
          src={icon}
          alt={title}
          className="w-20 h-20 md:w-30 md:h-30 rounded-xl transform rotate-45 absolute right-10 bottom-4 translate-x-4 translate-y-4"
        />
      </div>

      <CharacterGrid />
    </div>
  );
};

export default FilterList;
