import Obito from "../../assets/gifs/Obito.gif";
import Luffy from "../../assets/gifs/luffy.gif";
import Mitsuri from "../../assets/gifs/mitsuri.gif";
import Todo from "../../assets/gifs/todo.gif";
import LuffyPortrait from "../../assets/luffy_potrait.jpeg";
import ObitoPotrait from "../../assets/obito_portrait.jpeg";

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
  const [currentGif, setcurrentGif] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setcurrentGif((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 1000);
    return () => clearInterval(intervalId);
  });
  return (
    <div className="ml-10 ">
      <p className="text-xl text-white flex items-start pb-5 pt-8 ">
        Top Choices
      </p>
      <div className="relative w-full h-75 flex justify-start items-start overflow-hidden flex-row ">
        <img
          id="gif-banner"
          src={gifs[currentGif]}
          alt="Animated Banner"
          className="h-full w-full rounded-2xl mr-4"
        />
        <div className="flex flex-row ">
          {characters.map((character) => (
            <BannerCards
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
      className="h-75 w-70 ml-10 mr-10 bg-[#313131] p-4 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col gap-7"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.3), rgba(49,49,49,1))`,
      }}
    >
      <div className="flex items-center justify-start gap-5">
        <img src={img} alt={name} className="h-12 w-12 rounded-full" />
        <h2 className="text-white font-bold text-xm w-fit align-middle">{name}</h2>
      </div>
      <p className="text-white font-bold text-center">{quote}</p>
      
    </div>
  );
};
export default SuggestionBanner;
