import { useState } from "react";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

function UsersSmallBoxesBox(props: { moderator:boolean, users:Array<{ img: string; name: string; Id: number; role:boolean }>  })
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


    const [users,setUsers] = useState(props.users);
    const updateUserRole = (Id:number, role:boolean)=>
    {
        var count = 0;
        users.map((user) =>
        {
            user.role ? count++ : "";
        })

       
        setUsers((users: { img: string; name: string; Id: number; role:boolean; }[]) =>
            users.map((item: { img: string; name: string; Id: number; role:boolean }) => 
            { 
                if(item.Id === Id)
                {
                    if(count>1)
                    {
                        count++;
                        return { ...item, role: role };
                    }
                    else
                    {
                        count++;
                        return { ...item, role: true };
                    }
                }
                else
                {
                   return item
                }
                
            })
            );

       
    }
    
    function filterUsers(users:Array<{ img: string; name: string; Id: number; role:boolean }>)
    {
        
        var filtered:Array<{ img: string; name: string; Id: number; role:boolean }> = users;
        if(props.moderator)
        {
            filtered = users.filter( user => user.role);
        }
        

        return filtered;
    }
    
    const numPerPage = 5;
    
    const [page,setPage] = useState(0);

    function pageIncrease()
    {
        if(page+1 < Math.max(1,filterUsers(users).length/numPerPage))
        {
            setPage(page+1);
            setDirection(1);
        }
        
    }

    function pageDecrease()
    {
        if(page >= Math.min(1,Math.ceil(filterUsers(users).length/numPerPage)))
        {
            setPage(page-1);
            setDirection(-1);
        }

    }

    return (
        

        <div className='w-[100%] flex flex-col gap-5 items-center'>
            
            <motion.div
                key={page} // Ensures re-animation on page change
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction} 
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-[80%] items-center grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
            >
                {filterUsers(users).slice(numPerPage*page,numPerPage*(page+1)).map((index)=>(
                    <UserCard user={index} onUpdate={updateUserRole} key={index.Id}/>
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

export default UsersSmallBoxesBox;
