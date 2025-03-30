import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <p>GOOGLE DOCS CLONE</p>
      <nav className='nav'>
      <Button variant="contained" onClick={()=>{navigate("/login")}}>Login</Button>
      <Button variant="contained" onClick={()=>{navigate('/signup')}}>Signup</Button>
      </nav>
    </header>
  );
}

export default Header;
