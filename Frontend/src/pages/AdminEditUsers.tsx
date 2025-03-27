import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import UsersSmallBoxesBox from "../components/AdminEditUsersComponents/UsersSmallBoxes_Box";
import { Navigate, useLocation } from "react-router-dom";
import { adminService, User } from "../services/adminService";

function AdminEditUsers()
{
    const [toggleModerator,setToggleModerator] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const username = location.state?.username;
    if (!username) {
        return <Navigate to="/Login" replace />;
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    function handleModerator()
    {
        setToggleModerator(true);
    }

    function handleUser()
    {
        setToggleModerator(false);
    }

    const handleRoleToggle = async (userId: number) => {
        try {
            const updatedUser = await adminService.toggleUserRole(userId);
            setUsers(users.map(user => 
                user.userId === userId ? updatedUser : user
            ));
        } catch (err) {
            console.error('Error toggling user role:', err);
        }
    };

    if (loading) {
        return (
            <div>
                <NavBar admin={true} logged={true}/>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-white">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <NavBar admin={true} logged={true}/>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-red-500">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar admin={true} logged={true}/>
            <div className='w-full min-w-[800px] flex flex-col gap-10 items-center'>
                <div className={`mt-10 flex gap-6`}>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'bg-[#ffffff]' :'border border-[#303136] bg-transparent text-[#ffffff]'}`} onClick={handleModerator}> {'Moderator'}</button>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'border border-[#303136] bg-transparent text-[#ffffff]' :'bg-[#ffffff]'}`} onClick={handleUser}> {'User'}</button>
                </div>
                <UsersSmallBoxesBox 
                    users={users} 
                    moderator={toggleModerator}
                    onRoleToggle={handleRoleToggle}
                />
            </div>
            
        </div>
    )
}

export default AdminEditUsers;