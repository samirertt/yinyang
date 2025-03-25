import { useState, useEffect } from 'react';

interface UserModel {
    userId: number;
    username: string;
    password?: string;
    role: string;
    joinDate: string;
    image?: Uint8Array;
}

function UserCard(props: { onUpdate: (userId: number, currentRole: boolean) => void, user: UserModel }) {
    const [user, setUser] = useState(props.user);
    const [isModerator, setIsModerator] = useState(props.user.role === "MODERATOR");
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        setUser(props.user);
        setIsModerator(props.user.role === "MODERATOR");
        loadUserImage();
    }, [props.user]);

    const loadUserImage = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/users/${user.userId}/image`, {
                method: 'GET',
                headers: {
                    'Accept': 'image/jpeg, image/png, image/*',
                },
                credentials: 'include'
            });
            if (response.ok) {
                const blob = await response.blob();
                setImageUrl(URL.createObjectURL(blob));
            } else {
                setImageUrl("https://www.freeiconspng.com/uploads/computer-user-icon-28.png");
            }
        } catch (error) {
            console.error('Error loading user image:', error);
            setImageUrl("https://www.freeiconspng.com/uploads/computer-user-icon-28.png");
        }
    };

    const handleRole = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/users/${user.userId}/role`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsModerator(updatedUser.role === "MODERATOR");
                props.onUpdate(user.userId, !isModerator);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="gap-4 bg-[#2F2F2F] text-[#acacaf] p-6 rounded-xl shadow-md hover:bg-[#3A3A3A] transition flex flex-col items-center">
            <div className="flex flex-col items-center">
                <img 
                    src={imageUrl || "https://www.freeiconspng.com/uploads/computer-user-icon-28.png"} 
                    className="mb-4 rounded-full w-24 h-24 object-cover" 
                    alt={user.username}
                />
                <h3 className="text-xl font-bold text-[clamp(80%,16px,100%)]">{user.username}</h3>
                <p className="text-sm text-gray-400">ID: {user.userId}</p>
                <p className="text-sm text-gray-400">Joined: {formatDate(user.joinDate)}</p>
                <button 
                    className='mt-2 cursor-pointer rounded-xl p-3' 
                    style={{backgroundColor:'#4a4a4a'}} 
                    onClick={handleRole}
                >
                    {isModerator ? 
                        <img className='opacity-50 h-[30px] object-cover' src='https://www.svgrepo.com/show/154007/manager.svg' alt="Moderator" /> : 
                        <img className='opacity-50 h-[30px] object-cover' src='https://www.freeiconspng.com/uploads/computer-user-icon-28.png' alt="User" />
                    }
                </button>
            </div>
        </div>
    );
}

export default UserCard;