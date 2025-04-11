import { useEffect, useState } from "react";
import { useCharacterContext } from "./CharacterContext";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

function truncateText(text: string, maxCharsPerLine = 13, maxLines = 4) {
  const maxTotalChars = maxCharsPerLine * maxLines; // 10 * 3 = 30 characters max
  return text.length > maxTotalChars
    ? text.slice(0, maxTotalChars) + "..."
    : text;
}

const FavouritesGrid = () => {
  const { favourite, setFavourite, user, refreshFav, } = useCharacterContext();
  
  

  useEffect(() => {
    if (!user?.username) return;
    fetch(`http://localhost:8080/auth/favourites/user/${user.username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setFavourite(data))
      .catch((error) =>
        console.error("Error fetching favourites:", error)
      );

      
  }, [user.username, refreshFav]);
  
  useEffect(()=>
  {
    if(favourite.length <= numPerPage)
      {
        console.log(favourite.length)
        setPage(0);
      }
  },[favourite]);

  const [direction,setDirection] = useState(1);
  
      const variants = {
          enter: (direction:number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
          }),
          center: { x: "0%", opacity: 1 },
          exit: (direction:number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
          }),
        };
  
  
      const numPerPage = 8;
      
      const [page,setPage] = useState(0);
      
      function pageIncrease()
      {
          if(page+1 <= Math.max(1,favourite.length/numPerPage))
          {
            setPage(page+1);
            setDirection(1);
            console.log("Right BTN:" + page); 
          }
          else
            console.log("no: Right BTN:" + page); 
      }
  
      function pageDecrease()
      {
          if(page > Math.min(0,Math.ceil(favourite.length/numPerPage)))
          {
              setPage(page-1);
              setDirection(-1);
              console.log("Left BTN:" + page); 
          }
          else
            console.log("no: Left BTN:" + page); 
  
      }


  return (
    <div className="space-y-0 bg-[#212121]  w-full">
      <p className="text-xl text-white mt-10 pl-8 text-center sm:text-left">
        Favourites
      </p>

      <div className="flex items-center flex gap-10">
        {favourite.length > numPerPage ? 
          <div className="flex items-center flex gap-10">
            <button className='bg-[#efefef] rounded-full p-[20px] ' onClick={pageDecrease}> 
              <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5' alt="" />
            </button>
            <motion.div 
              key={page} // Ensures re-animation on page change
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction} 
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className=" w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-fit justify-items-center"
            >
                {favourite.slice(numPerPage*page,numPerPage*(page+1)).map((character) => (
                  <div key={character.charId} className="relative flex w-70 sm:w-fit  h-30  items-center p-4 rounded-lg bg-[#303030] overflow-hidden ">
                    <button className="absolute right-3 top-3" >
                      <Heart size={18} fill={"red"} />
                    </button>
                
                    <img
                      src={character.charImg}
                      alt={character.charName}
                      className="w-20 h-25 rounded-2xl "
                    />
    
                    <div className="ml-4 flex-1">
                      <h2 className="text-sm font-bold mb-1 text-white text-left">
                        {character.charName}
                      </h2>
                      <p className="mb-2 text-white text-left text-xs">
                        {truncateText(character.charDescription)}
                      </p>
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <MessageCircle size={14} className="text-gray-500" />
                        Usage: {character.charUsage}
                      </span>
                    </div>
                  </div>
            ))}
            </motion.div>
            <button className='bg-[#efefef] rounded-full p-[20px]' onClick={pageIncrease}> 
              <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5 rotate-180' alt="" />
            </button>
          </div>
           : 
           <div className="flex items-center flex gap-10">
            <button className='bg-[#efefef] rounded-full p-[20px] opacity-0' onClick={()=>{}}> 
              <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5' alt="" />
            </button>
            <motion.div 
              key={page} // Ensures re-animation on page change
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction} 
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className=" w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-fit justify-items-center"
            >
                {favourite.slice(numPerPage*page,numPerPage*(page+1)).map((character) => (
                  <div key={character.charId} className="relative flex w-70 sm:w-fit  h-30  items-center p-4 rounded-lg bg-[#303030] overflow-hidden ">
                    <button className="absolute right-3 top-3" >
                      <Heart size={18} fill={"red"} />
                    </button>
                
                    <img
                      src={character.charImg}
                      alt={character.charName}
                      className="w-20 h-25 rounded-2xl "
                    />
    
                    <div className="ml-4 flex-1">
                      <h2 className="text-sm font-bold mb-1 text-white text-left">
                        {character.charName}
                      </h2>
                      <p className="mb-2 text-white text-left text-xs">
                        {truncateText(character.charDescription)}
                      </p>
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <MessageCircle size={14} className="text-gray-500" />
                        Usage: {character.charUsage}
                      </span>
                    </div>
                  </div>
            ))}
            </motion.div>
            <button className='bg-[#efefef] rounded-full p-[20px] opacity-0' onClick={()=>{}}> 
              <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5 rotate-180' alt="" />
            </button>
          </div> 
        }
        
      </div>
    </div>
  );
};

export default FavouritesGrid;
