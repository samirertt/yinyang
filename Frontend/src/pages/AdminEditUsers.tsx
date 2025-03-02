import { useState } from "react";
import NavBar from "../components/NavBar";
import UsersSmallBoxesBox from "../components/AdminEditUsersComponents/UsersSmallBoxes Box";





/*
 TO DO: 
 Fix the updating of the users array. It does not update users after we switch the page for some reason. 
 */




function AdminEditUsers()
{
    const [toggleModerator,setToggleModerator] = useState(false);

    const allUsers = [
        { img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 15, role:true }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'Darius', Id: 16, role:false }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 17, role:true }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 18, role:true }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 19, role:true }
    
    ];
    const [users,setUsers] = useState(allUsers);
    

    function filterUsers(users:Array<{ img: string; name: string; Id: number; role:boolean }>)
    {
        
        var filtered:Array<{ img: string; name: string; Id: number; role:boolean }> = users;
        if(toggleModerator)
        {
            filtered = users.filter( user => user.role);
        }
        

        return filtered;
    }
    
    const updateUsers = (id: number, newRole: boolean) => {
        setUsers((prevItems: { img: string; name: string; Id: number; role:boolean; }[]) =>
          prevItems.map((item: { img: string; name: string; Id: number; role:boolean }) => (item.Id === id ? { ...item, role: newRole } : item))
        );
        users.map((item)=>
            {
                
                item.Id===id ? console.log(item): "";
            })
        
      };

    function handleModerator()
    {
        setToggleModerator(true);
    }

    function handleUser()
    {
        setToggleModerator(false);
    }

    return (
        <div>
            <NavBar admin={true} logged={true}/>
            <div className='w-full flex flex-col gap-10 items-center'>
                <div className={`mt-10 flex gap-6`}>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'bg-[#ffffff]' :'border border-[#303136] bg-transparent text-[#ffffff]'}`} onClick={handleModerator}> {'Moderator'}</button>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'border border-[#303136] bg-transparent text-[#ffffff]' :'bg-[#ffffff]'}`} onClick={handleUser}> {'User'}</button>
                </div>
                <UsersSmallBoxesBox onUpdate={updateUsers} users={filterUsers(users)}/>
            </div>
            
        </div>
    )
}

export default AdminEditUsers;