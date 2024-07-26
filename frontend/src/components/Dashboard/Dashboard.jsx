import {Paper, Grid, Typography} from '@mui/material';
import Stats from './Stats';
import CompletedSessions from './CompletedSessions';
import CompletedUserSessions from './CompletedUserSessions';
import { useSelector } from 'react-redux';

export default function DefaultDashboard () {
  const user = useSelector((state) => state.auth?.user);

  return (
    <Grid container spacing={3}>
      <Typography variant="h2" color="primary" p={3}>Welcome {user?.username}!</Typography>
      <Grid container sx={{ mt: 4, mb: 4, px: 3}}>
      {user?.role === 'admin' && <Stats />}
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          {user?.role === 'admin' ? <CompletedSessions />
          :
            <CompletedUserSessions />
          }
        </Paper>
      </Grid>
    </Grid>
  )
}