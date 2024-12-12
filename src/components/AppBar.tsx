import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../../public/logo-app-bar.png';
import { useIsMobile } from '../utils/useIsMobile';

const AppBarCustom: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  console.log(selectedMenu);

  const isMobile = useIsMobile();

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
  };

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
          <Box aria-label="menu" sx={{ mr: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: '50px', height: '50px', marginRight: '20px' }}
            />
          </Box>

          <Box>
            {!isMobile && (
              <Typography variant="h6" align="center">
                Rick and Morty
              </Typography>
            )}
          </Box>

          <Box>
            <Button
              color="inherit"
              onClick={() => handleMenuSelect('Personagens')}
            >
              Personagens
            </Button>
            <Button color="inherit" onClick={() => handleMenuSelect('Locais')}>
              Locais
            </Button>
            <Button
              color="inherit"
              onClick={() => handleMenuSelect('Episodios')}
            >
              Episódios
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarCustom;
