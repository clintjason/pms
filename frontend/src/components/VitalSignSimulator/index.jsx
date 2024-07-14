import { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Snackbar, Alert } from '@mui/material';
import VitalSignTable from './VitalSignTable';
import VitalSignForm from './VitalSignForm';
import VitalSignChart from './VitalSignChart';
import { getAllVitalSigns } from '../../services/api.service';

const VitalSignSimulator = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVitalSigns();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    fetchVitalSigns();
  };

  const fetchVitalSigns = async () => {
    setLoading(true);
    try {
      const vitals = await getAllVitalSigns();
      console.log("Vitals", vitals)
      setVitalSigns(vitals);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("fetchVitalSigns Error: ", error);
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Vital Sign Chart
            </Typography>
          <VitalSignChart vitalSigns={vitalSigns} loading={loading} />
          </Paper>
        </Grid>
        {/* Vital Sign Simulator */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{mb:2}}>
              Vital Sign Simulator
            </Typography>
            <VitalSignForm />
          </Paper>
        </Grid>
        {/* Vital Sign Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <VitalSignTable vitalSigns={vitalSigns} onRefresh={handleRefresh} loading={loading} />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Vital signs fetched successfully!
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default VitalSignSimulator;