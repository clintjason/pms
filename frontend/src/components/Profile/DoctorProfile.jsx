import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const DoctorProfile = ({ doctor }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="primary" component="div" gutterBottom>
          Doctor Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Full Name:</strong> {doctor?.fullname}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Specialization:</strong> {doctor?.specialization}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Phone Number:</strong> {doctor?.phone_number}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Address:</strong> {doctor?.address}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DoctorProfile;