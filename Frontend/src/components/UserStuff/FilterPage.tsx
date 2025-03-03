import friendlyImage from "../../assets/filter_image/friendly.jpeg";
import aggressiveImage from "../../assets/filter_image/aggressive.jpeg";
import calmImage from "../../assets/filter_image/calm.png";
import mysteriousImage from "../../assets/filter_image/mysterious.jpeg";
import pridefulImage from "../../assets/filter_image/prideful.jpeg";


interface GridItem {
  title: string;
  icon: string;
  bgColor: string;
}

const FilterPage = () => {
  

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
      bgColor: "bg-[#ba55d3]",
    },
  ];

  return (
    <div className="bg-[#212121] ">
      <div className="w-auto mx-auto pl-20 pr-20 pb-20">
        <div className="flex mb-6 ">
          
        <p className="text-lg sm:text-xl text-white pb-4 sm:pb-5 sm:pt-8 self-start">Filters</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {categories.map((category) => (
            <FilterCards
              icon={category.icon}
              title={category.title}
              bgColor={category.bgColor}
            />
          ))}
        </div>
      </div>
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
  return (
    <div className="w-full overflow-hidden">
      {/* Card */}
      <div
        className={`w-full h-28 ${bgColor} text-left rounded-lg transition-colors cursor-pointer flex items-center px-4 gap-5 overflow-hidden`}
      >
        {/* Text on the left */}
        <h2 className="text-2xl text-white">{title}</h2>

        {/* Image on the right, rotated 90 degrees */}
        <img
          src={icon}
          alt={title}
          className="w-20 h-20 rounded-xl transform rotate-45 ml-auto translate-y-8 "
        />
      </div>
    </div>
  );
};

export default FilterPage;
