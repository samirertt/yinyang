import { SetStateAction, useState } from 'react';
import "./Styles/NavBar.css";

function NavBar()
{
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
        <div className="navBarContainer" style={{display:'flex', gap:'10px',padding:'10px'}}>
            <a style={{color:'white'}} href="http://localhost:5173">character.ai</a>
            <button style={{backgroundColor:'white'}}>Sign Up to Chat</button>
            <button style={{backgroundColor:'transparent',border:'1px solid #303136'}}>Login</button>
            <input value={inputValue} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} className={isExpanded ? 'expanded' : ''} type="search" style={{backgroundColor:'#202024',position:'relative',marginLeft:'auto',color:'white'}} placeholder="Search"></input>
        </div>
    )
}

export default NavBar;
