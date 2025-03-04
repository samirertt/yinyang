import { useState } from 'react';
function UserCard(props: {onUpdate: (arg0: number, arg1: boolean) => void, user:{ img: string; name: string; Id: number; role:boolean }})
{
    const character = {
        img:props.user.img,
        name:props.user.name,
        Id:props.user.Id,
        role:props.user.role
    }
    const [charRole,setCharRole] = useState(props.user.role);


    const handleRole = () =>
    {
        charRole ? setCharRole(false) : setCharRole(true);
        
        props.onUpdate(character.Id, charRole);
    }   

    
    return(
        <div className="gap-4 bg-[#2F2F2F] text-[#acacaf] p-6 rounded-xl shadow-md  hover:bg-[#3A3A3A] transition flex flex-col items-center">
            <div className="flex flex-col items-center">
                <img src={character.img} className="mb-4 rounded-full " style={{backgroundColor:'red'}} />
                <h3 className="text-xl font-bold text-[clamp(80%,16px,100%)]">{character.name}</h3>
                <p className="text-sm text-gray-400">ID: {character.Id}</p>
                <button className='mt-2 cursor-pointer rounded-xl p-3' style={{backgroundColor:'#4a4a4a'}} onClick={handleRole}>{charRole ? <img className='opacity-50 h-[30px] object-cover' src='https://www.svgrepo.com/show/154007/manager.svg'></img> : <img className='opacity-50 h-[30px] object-cover' src='https://www.freeiconspng.com/uploads/computer-user-icon-28.png'></img>}</button>
            </div>
            
          </div>
    )


}

export default UserCard;