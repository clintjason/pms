import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, InputAdornment, TextField, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const UserProfile = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" color="primary" component="div" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Username:</strong> {user?.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
          </Grid>
          <Grid item xs={12} sx={{mt:1}}>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={user?.password}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UserProfile;