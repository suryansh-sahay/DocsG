import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, useTheme,
  useMediaQuery, Avatar, Drawer, List, ListItem, ListItemText, Tooltip, Menu, MenuItem
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Header({ isDarkMode, toggleDarkMode, isLoggedIn = false }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const drawerContent = (
    <List sx={{ width: 200 }}>
      {!isLoggedIn ? (
        <>
          <ListItem button onClick={() => { navigate('/login'); setDrawerOpen(false); }}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => { navigate('/signup'); setDrawerOpen(false); }}>
            <ListItemText primary="Signup" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button onClick={() => { navigate('/profile'); setDrawerOpen(false); }}>
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem button onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => { alert('Logging out...'); setDrawerOpen(false); }}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Google Docs Clone
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Tooltip title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            {isMobile ? (
              <>
                <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                  {drawerContent}
                </Drawer>
              </>
            ) : (
              !isLoggedIn ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'primary.main'
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/signup')}
                    sx={{ fontWeight: 600 }}
                  >
                    Signup
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={handleAvatarClick}>
                    <Avatar alt="User Avatar" src="/user-avatar.png" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={() => { handleCloseMenu(); navigate('/profile'); }}>Profile</MenuItem>
                    <MenuItem onClick={() => { handleCloseMenu(); navigate('/settings'); }}>Settings</MenuItem>
                    <MenuItem onClick={() => { handleCloseMenu(); alert('Logging out...'); }}>Logout</MenuItem>
                  </Menu>
                </>
              )
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
