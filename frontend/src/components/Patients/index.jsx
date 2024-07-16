import { useEffect, useState } from 'react';
import { CssBaseline, Container, Grid, Paper, Typography, Snackbar, Alert } from '@mui/material';
import PatientTable from './PatientTable';
import { apiGetPatientVitalSigns } from '../../services/api.service';
import VitalSignTable from '../VitalSignSimulator/VitalSignTable';
import VitalSignChart from '../VitalSignSimulator/VitalSignChart';

export default function Patients() {
  const [patientId, setPatientId ]  = useState('');
  const [patientFullname, setPatientFullname ]  = useState('');
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const onRowClick = (patient) => {
    console.log("rowClick", patient);
    setPatientId(patient.patient_id);
    setPatientFullname(patient.fullname);
  };

  useEffect(() => {
    fetchPatientVitalSigns(patientId)
  },[patientId]);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchPatientVitalSigns = async (patientId) => {
    setLoading(true);
    try {
      const data = { patientId: patientId }
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

  const handleRefresh = () => {
    fetchPatientVitalSigns(patientId);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <PatientTable onRowClick={onRowClick} />
      </Container>
      <Container>
        <Typography variant="h6" color="primary">{"Vital Sign History of " + patientFullname}</Typography>
      </Container>
      <Container sx={{ my: 4, }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Vital Sign Chart
          </Typography>
          <VitalSignChart vitalSigns={vitalSigns} loading={loading} />
        </Paper>
      </Container>
      <Container>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <VitalSignTable vitalSigns={vitalSigns} onRefresh={handleRefresh} loading={loading} />
        </Paper>
      </Container>
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
    </>
  )
}