import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import VitalSignTable from './VitalSignTable';
import VitalSignForm from './VitalSignForm';
import Chart from '../Dashboard/Chart';

const VitalSignSimulator = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Chart />
          </Paper>
        </Grid>
        {/* Vital Sign Simulator */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Vital Sign Simulator
            </Typography>
            <VitalSignForm />
          </Paper>
        </Grid>
        {/* Vital Sign Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <VitalSignTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VitalSignSimulator;