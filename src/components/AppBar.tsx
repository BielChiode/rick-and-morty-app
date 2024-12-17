import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../../public/logo-app-bar.png';
import { useIsMobile } from '../utils/useIsMobile';
import { NavLink, useNavigate } from 'react-router';

const AppBarCustom: React.FC = () => {
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ width: '50px', height: '50px' }}
            />
          </NavLink>

          <Box>
            {!isMobile && (
              <Typography variant="h5" align="center">
                Rick and Morty
              </Typography>
            )}
          </Box>

          <Box>
            <Button color="inherit" onClick={() => navigate('/')}>
              Characters
            </Button>
            <Button color="inherit" onClick={() => navigate('/locations')}>
              Locations
            </Button>
            <Button color="inherit" onClick={() => console.log('/episodes')}>
              Episodes
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarCustom;
