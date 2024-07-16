import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const PatientProfile = ({ patient }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color='primary' component="div" gutterBottom>
          Patient Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Full Name:</strong> {patient.fullname}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Age:</strong> {patient.age}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Gender:</strong> {patient.gender}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Phone Number:</strong> {patient.phone_number}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Address:</strong> {patient.address}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PatientProfile;