import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import UpdatePatientProfileForm from './UpdatePatientProfileForm';
import UpdateDoctorProfileForm from './UpdateDoctorProfileForm';
import UpdateUserForm from './UpdateUserForm';
import UpdateAvatarForm from './UpdateAvatarForm';
import ResetPasswordForm from './ResetPasswordForm';

const UpdateProfile = ({user}) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UpdateUserForm user={user} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UpdateAvatarForm user={user} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ResetPasswordForm user={user} />
          </Paper>
        </Grid>
      {user && user?.role === 'patient' && (
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UpdatePatientProfileForm user={user} />
          </Paper>
        </Grid>
      )}
      {user && user?.role === 'doctor' && (
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UpdateDoctorProfileForm user={user} />
          </Paper>
        </Grid>
      )}
      </Grid>
    </Container>
  );
};

export default UpdateProfile;