import { createTheme } from '@mui/material/styles';
//green light: rgb(112,194, 197)
//green medium: rgb(87,178, 182)
//green darkest: rgb(39,104, 119)
//rgb(39,104, 119)
//orange: rgb(240,157, 63)
//orange darker : rgb(213,95, 35)

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(112,194, 197)', // Your primary color
    },
    secondary: {
      main: 'rgb(240,157, 63)', // Your secondary color
    },
    error: {
      main: '#f44336', // Your error color
    },
    background: {
      default: '#f4f6f8', // Your background color
    },
    text: {
      primary: '#333333', // Your primary text color
      secondary: '#555555', // Your secondary text color
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      backgroundColor: 'rgb(87,178, 182)'
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgb(112,194, 197)', // Default color for links
          '&:hover': {
            color: 'rgb(87,178, 182)', // Hover color for links
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff', // Default text color for buttons
          backgroundColor: 'rgb(112,194, 197)', // Default background color for buttons
          '&:hover': {
            backgroundColor: 'rgb(87,178, 182)',
            transform: 'scaleY(1.05)'
          },
        },
      },
    },
  },
});

export default theme;
