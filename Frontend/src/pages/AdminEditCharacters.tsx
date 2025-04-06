import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SmallBoxesBox from '../components/AdminEditCharactersComponents/SmallBoxes Box';
import { Navigate, useLocation } from 'react-router-dom';

interface Character {
    img: string;
    name: string;
    Id: number;
    details: string;
    usage: number;
}


function AdminEditCharacters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [inputVal, setInputVal] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const username = location.state?.username;
    if (!username) {
        return <Navigate to="/Login" replace />;
    }
    const token = localStorage.getItem('jwtToken');
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin/characters',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch characters');
                }
                const data = await response.json();
                // Transform the data to match the frontend structure
                const transformedData = data.map((char: any) => ({
                    img: char.charImg || "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352",
                    name: char.charName,
                    Id: char.charId,
                    details: char.charDescription,
                    usage: char.charUsage
                }));
                setCharacters(transformedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) {
        return (
            <div className='min-h-screen'>
                <NavBar admin={true} logged={true}/>
                <div className='pageContainer min-w-[800px] mx-auto flex items-center justify-center'>
                    <div className="text-white">Loading characters...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen'>
                <NavBar admin={true} logged={true}/>
                <div className='pageContainer min-w-[800px] mx-auto flex items-center justify-center'>
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen'>
            <NavBar admin={true} logged={true}/>
            <div className='pageContainer min-w-[800px] mx-auto' style={{display:'flex', gap:'50px', alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                <input 
                    type='search' 
                    onChange={(e) => {setInputVal(e.target.value)}} 
                    className='bg-[#2F2F2F] rounded-xl p-2 pl-4 outline-none mt-10' 
                    placeholder='Search Character'
                />
                <SmallBoxesBox characters={characters} inputValue={inputVal}/>
            </div>
        </div>
    );
}

export default AdminEditCharacters;