import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import UsersSmallBoxesBox from "../components/AdminEditUsersComponents/UsersSmallBoxes_Box";
import { Navigate, useLocation } from "react-router-dom";

interface User {
    userId: number;
    username: string;
    roles: string[];
    userImg?: string;
}

function AdminEditUsers()
{
    const [toggleModerator,setToggleModerator] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(''); // 🔍 New: search state

    const location = useLocation();
    const username = location.state?.username;
    if (!username) {
        return <Navigate to="/Login" replace />;
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem("jwtToken");
        
        if (!token) {
            console.error('No JWT token found, redirecting to login...');
            setError('Unauthorized access. Please log in again.');
            window.location.href = '/login';
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Raw user data from backend:', JSON.stringify(data, null, 2));
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
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                console.error('No token found');
                return;
            }

            console.log('Toggling role for user:', userId); // Debug log
            const response = await fetch(`http://localhost:8080/admin/users/${userId}/toggle-role`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            
            if (response.status === 401) {
                console.error('Unauthorized - Please log in again');
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to toggle user role: ${errorText}`);
            }
            
            console.log('Role toggled successfully'); // Debug log
            await fetchUsers(); // Refresh the user list
        } catch (err) {
            console.error('Error toggling user role:', err);
            setError(err instanceof Error ? err.message : 'Failed to toggle user role');
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <NavBar admin={true} logged={true} />
            <div className='w-full min-w-[800px] flex flex-col gap-10 items-center'>
                <div className={`mt-10 flex gap-6`}>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'bg-[#ffffff]' :'border border-[#303136] bg-transparent text-[#ffffff]'}`} onClick={handleModerator}> {'Moderator'}</button>
                    <button className={`transition-colors duration-500 ease-in-out text-[#2f2f2f] px-[20px] py-[10px] rounded-xl ${toggleModerator ? 'border border-[#303136] bg-transparent text-[#ffffff]' :'bg-[#ffffff]'}`} onClick={handleUser}> {'User'}</button>
                </div>

                <div className="flex flex-col items-center w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search username"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mt-1 bg-[#2F2F2F] rounded-xl p-2 pl-4 outline-none"
                    />
                </div>

                <UsersSmallBoxesBox 
                    users={filteredUsers} 
                    moderator={toggleModerator}
                    onRoleToggle={handleRoleToggle}
                />
            </div>
        </div>
    );
}

export default AdminEditUsers;
