import { useState } from "react";

const characterFilters = [
  "Friendly",
  "Aggressive",
  "Mysterious",
  "Calm",
  "Prideful",
  "Wise",
  "Angry",
  "Competitive",
  "Sad",
  "Disappointed",
];

const CharacterFilterPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-[#212121] gap-9 pl-9 pr-9">
      <header className="text-white py-4 text-center w-fit ml-7 ">
        <h1 className="text-3xl font-bold">YinYang</h1>
      </header>

      <div className="flex flex-col items-start w-1/2 gap-6 pt-6 bg-[#414141] rounded-xl mx-auto px-4">
        <p className="text-xl text-white pl-4">Filters</p>

        <div className="flex flex-wrap gap-2 p-4 self-start">
          {characterFilters.map((filter, index) => (
            <FilterButtons key={index} filterName={filter} />
          ))}
        </div>

        <button className="text-2xl text-black p-4  ml-4 mb-5 rounded-2xl cursor-pointer bg-white">
          Filter
        </button>
      </div>
    </div>
  );
};

const FilterButtons = ({ filterName }: { filterName: string }) => {
  const [isAlive, setIsAlive] = useState(false);

  const toggleActive = () => {
    setIsAlive(!isAlive);
  };

  return (
    <button
      onClick={toggleActive}
      className={`border text-sm p-1 rounded-sm cursor-pointer transition-colors duration-300
        ${
          isAlive
            ? "border-[#F59E0B] text-[#F59E0B]"
            : "border-white text-white"
        }
        ${!isAlive && "hover:border-[#F59E0B] hover:text-[#F59E0B]"}`}
    >
      {filterName}
    </button>
  );
};
export default CharacterFilterPage;
