import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Handle sign out logic here (e.g., clearing auth tokens)
    console.log('User signed out');
    navigate('/signin');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Are you sure you want to sign out?
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Box>
  );
}