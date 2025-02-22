import UserCard from "./UserCard";

function UsersSmallBoxesBox(props: { users:Array<{ img: string; name: string; Id: number; role:boolean }>  })
{
    const users = props.users;

    
    return (
        <div className="grid grid-cols-4 gap-6 w-[75%]">
            {users.map((index)=>(
                <UserCard key={index.Id} {...index}/>
            ))}
        </div>
    )
}

export default UsersSmallBoxesBox;
