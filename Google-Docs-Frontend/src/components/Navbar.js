import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function Navbar(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username , setUsername] = useState('');
  const [sharemessage, setShareMessage] = useState('');
  const logout = async()=>{
     const response = await axios.get('http://localhost:3002/logout',{ withCredentials: true });
     console.log("logout");
     navigate('/login');
  }
  const handleShare = async () => {
    const response = await axios.post('http://localhost:3002/share',{username, documentId:props.document._id});
    setShareMessage(response.data.message);
    setUsername('');
    // handleClose();
  };

  const handleOpen = () => {
    console.log("true");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='documentNavbar'>
       <div className='nav1'>
         <img src='/logo.png' className='logo' />
         <h1 id="document-title">{props.document ?( props.document.title ):("Loading...")  }</h1>
        </div>
       <div className='nav1'>
         <Button className="btns" variant="contained" onClick={handleOpen}>Share</Button>
         <Button className="btns" variant="contained" onClick={logout}>Logout</Button>
       </div>
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the username of the person you want to share this document with:
          </DialogContentText>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="username-input"
          />
          {sharemessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleShare} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
