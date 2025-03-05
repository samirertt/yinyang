import { useLocation, useNavigate } from "react-router-dom";
import { UserNavBarProps } from "./UserNavBar";
import CharacterGrid from "./CharacterGrid";
import { ArrowLeft } from "lucide-react";
import UserNavBar from "./UserNavBar";

const FilterList: React.FC<UserNavBarProps> = ({ chatList, handleDelete }) => {
  const location = useLocation();
  const { icon, title, bgColor } = location.state;

  const navigate = useNavigate();
  return (
    <div className="bg-[#212121] min-h-screen flex flex-col">
      <UserNavBar chatList={chatList} handleDelete={handleDelete}/>
      <div
        className={`bg-gradient-to-b ${bgColor} from-[#yourColor] to-black rounded-t-4xl w-full h-90 relative overflow-hidden mt-25`}
      >
        <div
          className="absolute top-10 left-10 text-white text-4xl rounded-full h-10 w-10 cursor-pointer flex items-center justify-center hover:bg-[#818181]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </div>

        <h1 className="text-6xl text-white absolute bottom-4 left-10">
          {title}
        </h1>

        <img
          src={icon}
          alt={title}
          className="w-30 h-30 rounded-xl transform rotate-45 absolute right-10 bottom-4 translate-x-4 translate-y-4"
        />
      </div>

      <CharacterGrid />
    </div>
  );
};

export default FilterList;
