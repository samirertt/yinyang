import { SetStateAction, useState } from 'react';
import "./Styles/NavBar.css";
import "../../public/MaginifyingGlass.png";

function NavBar(props: { logged: any; })
{
    const [isLogged, setIsLogged] = useState(props.logged);  

    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const searchIcon = '../../public/MaginifyingGlass.png';

    const handleFocus = () => {
      setIsExpanded(true);

    };

    const handleBlur = () => {
      if (inputValue.trim() === '') {
        setIsExpanded(false);
        
      }
    };

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setInputValue(e.target.value);
    };
    
    return (
        <div className="navBarContainer" style={{display:'flex', gap:'20px',padding:'10px',alignContent:'center'}}>
            <a style={{color:'white',fontWeight:'bolder',fontSize:'24px'}} href="http://localhost:5173">Yinyang</a>

            {!isLogged && (
              <div className="loggedOut" style={{display:'flex', gap:'20px',padding:'10px'}}>
              <button style={{backgroundColor:'white'}}>Sign Up to Chat</button>
              <button style={{backgroundColor:'transparent',border:'1px solid #303136',color:'white'}}>Login</button>
            </div>)}
            {isLogged && (
              <div style={{color:'white',fontSize:'24px',fontWeight:'bold',alignContent:'center',justifyContent:'center'}} className="loggedIn">
              Hello, User!
            </div>)}
            
            <div id='searchBtnContainer' style={{position:'relative',marginLeft:'auto'}}>
              {!isExpanded && (<img src={searchIcon} style={{maxWidth:'50px',padding:'0',width:'100%',height:'50px',pointerEvents:'none',position:'absolute', left:'19px', top:'9px',filter:'invert(1)'}}></img>)}
              <input value={inputValue} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} className={isExpanded ? 'expanded' : ''} type="search" style={{outline:'none',backgroundColor:'#202024',color:'white', backgroundImage:searchIcon}} placeholder={isExpanded ? 'Search' : ''}></input>
            </div>
        </div>
    )
}

export default NavBar;
