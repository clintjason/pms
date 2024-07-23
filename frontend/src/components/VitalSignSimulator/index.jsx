import { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Snackbar, Alert } from '@mui/material';
import VitalSignTable from './VitalSignTable';
import VitalSignForm from './VitalSignForm';
import VitalSignChart from './VitalSignChart';
import { apiGetPatientVitalSigns } from '../../services/api.service';
import { useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';

const VitalSignSimulator = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patientIdFromUrl = searchParams.get('patient_Id');
  const patientId = useSelector((state) => state.auth?.user?.id);

  useEffect(() => {
    fetchPatientVitalSigns(patientId);
  }, [patientId, patientIdFromUrl]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    fetchPatientVitalSigns(patientId);
  };

  const fetchPatientVitalSigns = async (patientId) => {
    setLoading(true);
    try {
      console.log("PatientID in Vitals: ", patientId);
      const data = { patientId: patientIdFromUrl ? patientIdFromUrl : patientId }
      const vitals = await apiGetPatientVitalSigns(data);
      console.log("Vitals", vitals)
      setVitalSigns(vitals);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("fetchPatientVitalSigns Error: ", error);
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
        {!patientIdFromUrl &&
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{mb:2}}>
              Vital Sign Simulator
            </Typography>
            <VitalSignForm />
          </Paper>
        </Grid>
        }
        {/* Vital Sign Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <VitalSignTable vitalSigns={vitalSigns} onRefresh={handleRefresh} loading={loading} />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Patient Vital signs fetched successfully!
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