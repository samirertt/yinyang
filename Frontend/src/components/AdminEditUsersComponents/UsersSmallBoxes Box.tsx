
import UserCard from "./UserCard";

function UsersSmallBoxesBox(props: { onUpdate: (arg0: number, arg1: boolean) => void,users:Array<{ img: string; name: string; Id: number; role:boolean }>  })
{
    const users = props.users;
    const updateUserRole = (Id:number, role:boolean)=>
    {
        props.onUpdate(Id,role);
        
    }
    
    return (
        <div className="w-[80%] items-center grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 ">
            {users.map((index)=>(
                <UserCard user={index} onUpdate={updateUserRole} key={index.Id}/>
            ))}
        </div>
    )
}

export default UsersSmallBoxesBox;
