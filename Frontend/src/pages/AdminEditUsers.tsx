import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import UsersSmallBoxesBox from '../components/AdminEditUsersComponents/UsersSmallBoxes_Box';
import { Navigate, useLocation } from 'react-router-dom';

interface UserModel {
    userId: number;
    username: string;
    password?: string;
    role: string;
    joinDate: string;
    image?: Uint8Array;
}

function AdminEditUsers() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [moderator, setModerator] = useState(false);

    const location = useLocation();
    const username = location.state?.username;
    if (!username) {
        return <Navigate to="/Login" replace />;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log('Starting to fetch users...');
                const response = await fetch('http://localhost:8080/api/admin/users', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const text = await response.text();
                console.log('Raw response:', text);
                
                try {
                    const data = JSON.parse(text);
                    console.log('Successfully parsed users:', data);
                    setUsers(data);
                    setError(null);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    setError('Failed to parse server response. Please check server logs.');
                }
            } catch (error) {
                console.error('Error in fetchUsers:', error);
                setError('Failed to load users. Please check if the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return (
            <div className='min-h-screen bg-[#1a1a1a]'>
                <NavBar admin={true} logged={true} />
                <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-white'>
                    <h2 className='text-2xl mb-4'>Error</h2>
                    <p className='text-red-500'>{error}</p>
                    <p className='mt-2'>Please make sure the backend server is running at http://localhost:8080</p>
                    <p className='mt-2 text-gray-400'>Check the browser console for more details.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-[#1a1a1a]'>
            <NavBar admin={true} logged={true} />
            <div className='pageContainer min-w-[800px] mx-auto' style={{ display: 'flex', gap: '50px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div className='flex gap-4 mt-10'>
                    <button 
                        className={`px-4 py-2 rounded-xl text-white ${!moderator ? 'bg-[#4a4a4a]' : 'bg-[#2F2F2F]'}`}
                        onClick={() => setModerator(false)}
                    >
                        All Users
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-xl text-white ${moderator ? 'bg-[#4a4a4a]' : 'bg-[#2F2F2F]'}`}
                        onClick={() => setModerator(true)}
                    >
                        Moderators
                    </button>
                </div>
                {loading ? (
                    <div className="text-white flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                        <p>Loading users...</p>
                    </div>
                ) : (
                    <UsersSmallBoxesBox moderator={moderator} users={users} />
                )}
            </div>
        </div>
    );
}

export default AdminEditUsers;