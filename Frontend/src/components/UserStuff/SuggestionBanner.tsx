import Obito from "../../assets/gifs/Obito.gif";
import Luffy from "../../assets/gifs/luffy.gif";
import Mitsuri from "../../assets/gifs/mitsuri_updated.gif";
import Todo from "../../assets/gifs/todo.gif";
import LuffyPortrait from "../../assets/potrait/luffy_potrait.jpeg";
import ObitoPotrait from "../../assets/potrait/obito_portrait.jpeg";
import { useEffect, useState } from "react";

const SuggestionBanner = () => {
  const characters = [
    {
      name: "Monkey D. Luffy",
      img: LuffyPortrait,
      quote:
        "Oi! You! Want to join my crew and sail the Grand Line with me?! I’m gonna be the Pirate King, and it’s gonna be so much fun! So, are you in?",
    },
    {
      name: "Uchiha Obito",
      img: ObitoPotrait,
      quote:
        "You know, it’s rare to find someone who’s still got that much hope in the world. But let’s see how long that lasts. You want to talk about your ideals or would you rather see the true power of reality?",
    },
  ];
  const gifs = [Obito, Luffy, Mitsuri, Todo];
  const [currentGif, setCurrentGif] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentGif((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gifs.length]);

  return (
    <div className="mx-2 sm:mx-4 md:ml-10 flex flex-col gap-5 w-fit ">
      <p className="text-lg sm:text-xl text-white pb-4 sm:pb-5 pt-6 sm:pt-8 self-start">
        Top Choices
      </p>
      <div className="relative w-full  flex flex-col md:flex-row justify-start items-start overflow-hidden gap-4 md:gap-0">
        <img
          id="gif-banner"
          src={gifs[currentGif]}
          alt="Animated Banner"
          className="h-40 sm:h-60 md:h-80 w-full md:w-[550px] object-cover rounded-2xl mr-0 md:mr-4"
        />

        {/* Blurry Full-Width Background Card */}
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <div className="w-full h-40 sm:h-60 md:h-75 bg-[#313131] opacity-30 blur-3xl rounded-2xl"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-0 relative z-10">
          {characters.map((character) => (
            <BannerCards
              key={character.name}
              name={character.name}
              img={character.img}
              quote={character.quote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BannerCards = ({
  name,
  img,
  quote,
}: {
  name: string;
  img: string;
  quote: string;
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      className=" md:w-73 md:min-h-80 bg-[#313131] p-4 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col gap-4 sm:gap-7 mx-0 md:mx-2"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.3), rgba(49,49,49,1))`,
      }}
    >
      <div className="flex items-center justify-start gap-3 sm:gap-5">
        <img
          src={img}
          alt={name}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
        />
        <h2 className="text-white font-bold text-sm sm:text-base md:text-lg">
          {name}
        </h2>
      </div>
      <p className="text-white font-bold text-sm sm:text-base text-center">
        {quote}
      </p>
    </div>
  );
};

export default SuggestionBanner;
