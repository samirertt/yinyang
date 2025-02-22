import { useState } from "react";
import NavBar from "../components/NavBar";
import UsersSmallBoxesBox from "../components/AdminEditUsersComponents/UsersSmallBoxes Box";
function AdminEditUsers()
{
    const [toggleModerator,setToggleModerator] = useState(true);

    const users = [
        { img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 15, role:true }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'Darius', Id: 16, role:false }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 17, role:true }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 18, role:true }
        ,{ img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", name: 'garen', Id: 19, role:true }
    
    ];

    function filterUsers(users:Array<{ img: string; name: string; Id: number; role:boolean }>)
    {
        var filtered:Array<{ img: string; name: string; Id: number; role:boolean }> = users;
        if(toggleModerator)
        {
            filtered = users.filter( user => user.role);
        }


        return filtered;
    }
    

    return (
        <div>
            <NavBar admin={true} logged={true}/>
            <div className='pageContainer' style={{display:'flex', gap:'50px', alignItems:'center',justifyContent:'center',flexDirection:'column',justifySelf:'center'}}>
                <div className={`mt-10 grid grid-cols-2 gap-6`}>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'bg-[#ffffff]' :'border border-[#303136] bg-transparent text-[#ffffff]'}`} onClick={()=>setToggleModerator(true)}>{'Moderator'}</button>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'border border-[#303136] bg-transparent text-[#ffffff]' :'bg-[#ffffff]'}`} onClick={()=>setToggleModerator(false)}>{'User'}</button>
                </div>
                <UsersSmallBoxesBox users={filterUsers(users)}/>
            </div>
            
        </div>
    )
}

export default AdminEditUsers;