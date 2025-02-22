import { useState } from 'react';
import NavBar from '../components/NavBar';
import SmallBoxesBox from '../components/AdminDashboardComponents/SmallBoxes Box';

function AdminDashboard()
{
    const arrayOfCharacters = [
        {
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Garen",
            Id:15,
            details:"Garen: Spin, ult, repeat. Garen players enjoy the simple things: free health, easy damage, and a point-and-click kill button. If you main Garen, you've clearly opted for minimal effort, maximum reward.",
            usage:15.5
        },
        {
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/f606418621ccec569ab1ec87e1084dfd8e45e5f1-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Darius",
            Id:16,
            details:"Darius: Five stacks, dunk, dominate. Darius players live for the stat-check, reveling in the easy kills and lane dominance. If you play Darius, you enjoy the feeling of being an unstoppable force, even if it requires minimal skill.",
            usage:12.5
        },{
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/55e7e901b1f69d72804665cfbeb1f4f59c8fa877-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Ahri",
            Id:17,
            details:"Ahri, the nine-tailed 'fox.' All they do is spam charm and run away. Zero skill, all kiting. Every Ahri player thinks they're a god, but they're just abusing mobility. Go back to your anime.",
            usage:9.5
        },
        {
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/6b3112e88d1135967c763e6362e7cfab680f58eb-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Sylas",
            Id:18,
            details:"Sylas, the chain-wielding usurper. Steals your ult, steals your dignity. Every Sylas player thinks they're a genius for pressing R, but they're just borrowing someone else's power. Overrated and annoying.",
            usage:25
        },
        {
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/4238fe90dd74b08a6e8172c31e3b1ae609afb3cd-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Lux",
            Id:19,
            details:"Lux, the lady of luminosity. Light binding, light beam, light everything. Every Lux player hides behind their range and spams abilities from a mile away. If you play Lux, you're probably scared of getting close. Go back to support.",
            usage:6.5
        },
        {
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/c2c5a55ccd6d6778ddb77ce8082196f94972988b-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Veigar",
            Id:20,
            details:"Veigar, the tiny master of evil. Infinite AP scaling, infinite frustration. Every Veigar player just farms Q until they can one-shot you with their ult. Little rat needs to be deleted from the game.",
            usage:5.5
        },
        {
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/64438d63b60f942297a010bf34ac30c2162ce98b-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Teemo",
            Id:21,
            details:"Teemo, the satanic squirrel. Invisible mushrooms, global taunt. Every Teemo player is a sadist who enjoys watching you suffer. If you play Teemo, you're a menace to society. Burn in mushroom hell.",
            usage:12.5
        },{
            img:"https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/8201aebd324836be730d1be4dd9d5d2e7aa4004c-496x560.jpg?auto=format&fit=fill&q=80&w=352",
            name:"Heimerdinger",
            Id:22,
            details:"Heimerdinger, the turret spammer. Place turrets, press E, watch your lane disappear. Every Heimerdinger player lacks the ability to play a real champion. Turret abusers, the lot of them.",
            usage:12.5
        }
        

    ]
    const [inputVal,setInputVal] = useState('');

    return(
        <div >
            <NavBar logged={true}/>
            <div className='pageContainer' style={{display:'flex', gap:'71px', alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <input type='search' onChange={(e)=>{setInputVal(e.target.value)}} className='bg-[#2F2F2F] rounded-xl p-2 pl-4 outline-none' placeholder='Search Character'></input>
                <SmallBoxesBox characters={arrayOfCharacters} inputValue={inputVal}/>
            </div>
        </div>
    )
}

export default AdminDashboard;