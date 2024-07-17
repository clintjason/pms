import {useEffect, useState} from 'react';
import {Typography, Box, Paper, Grid} from '@mui/material';
import Title from './Title';
import {apiGetStats} from '../../services/api.service';


export default function Stats() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStat();
  }, []);

  const getStat = async () => {
    try {
      const response = await apiGetStats();
      setStats(response);
      console.log("Stats: ", response);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error('getStat Error:', error);
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <>
      <Title>Statistics</Title>
      <Grid container spacing={2} justifyContent='center' >
        <Grid item xs={9} sm={3} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(112,194, 197)'
            }}
          >
            <Typography align="center" component="p" variant="h6" color='white'>
              Total Users
            </Typography>
            <Typography align="center" component="p" variant="h4" color='white'>
              {stats?.users}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9} sm={3} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(240,157, 63)'
            }}
          >
            <Typography align="center" component="p" variant="h6" color='white'>
              Total Patients
            </Typography>
            <Typography align="center" component="p" variant="h4" color='white'>
            {stats?.patients}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9} sm={3} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(112,194, 197)'
            }}
          >
            <Typography align="center" component="p" variant="h6" color='white'>
              Total Doctor
            </Typography>
            <Typography align="center" component="p" variant="h4" color='white'>
            {stats?.doctors}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9} sm={3} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(240,157, 63)'
            }}
          >
            <Typography align="center" component="p" variant="h6" color='white'>
              Vitals Signs
            </Typography>
            <Typography align="center" component="p" variant="h4" color='white'>
            {stats?.vitalSigns}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}