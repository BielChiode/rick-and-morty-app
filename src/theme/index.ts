import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4',
      dark: '#008c9e',
      light: '#62efff',
    },
    secondary: {
      main: '#00ffaa',
      dark: '#00c88a',
      light: '#64ffb3',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#212121',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#424242',
          borderRadius: '4px',
          color: '#ffffff',
          ':hover': {
            backgroundColor: '#4f4f4f',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#616161',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

export default theme;
