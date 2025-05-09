import { useState } from 'react';
import CharacterCard from "./CharacterCard";
import { motion } from "framer-motion";


function SmallBoxesBox(props: { inputValue: any; characters:Array<{ img: string; name: string; Id: number; details: string; usage:number; }>  })
{
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

    const searchVal= props.inputValue;
    
    const characters = props.characters;
    const numPerPage = 8;
    
    const [page,setPage] = useState(0);

    function filterArr(arr:Array<{ img: string; name: string; Id: number; details: string; usage:number; }>)
    {
        var bar:Array<{ img: string; name: string; Id: number; details: string; usage:number; }> = arr;
        if(searchVal!=='')
            {
                
                bar = arr.filter(item => item.name.toLowerCase().includes(searchVal.toLowerCase()));
                
            }

        
        return bar;
    }

    function pageIncrease()
    {
        if(page+1 < Math.max(1,filterArr(characters).length/numPerPage))
        {
            setPage(page+1);
            setDirection(1);
        }
        
    }

    function pageDecrease()
    {
        if(page >= Math.min(1,Math.ceil(filterArr(characters).length/numPerPage)))
        {
            setPage(page-1);
            setDirection(-1);
        }

    }

    function sortCharArray(arr:Array<{ img: string; name: string; Id: number; details: string; usage:number; }>)
    {
        
        for(var i in arr)
        {
            for(var j in arr)
            {   
                if(arr[i].usage>arr[j].usage)
                {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
                else if(arr[i].Id<arr[j].Id && arr[i].usage==arr[j].usage)
                {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        return arr;
    }
    return (
        <div className='flex flex-col gap-5 items-center'>


            <motion.div
                key={page} // Ensures re-animation on page change
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction} 
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6"
            >
                {sortCharArray(filterArr(characters).slice(numPerPage*page,numPerPage*(page+1))).map((index)=>(
                    <CharacterCard key={index.Id} {...index}/>
                ))}
            </motion.div>

            
            <div className='flex gap-3 items-center'>
                <button className='bg-[#efefef] rounded-full p-[20px] ' onClick={pageDecrease}> 
                   <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5' alt="" />
                </button>
                <button className='bg-[#efefef] rounded-full p-[20px] ' onClick={pageIncrease}> 
                   <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5 rotate-180' alt="" />
                </button>
            </div>
            
        </div>
    )
}

export default SmallBoxesBox;
