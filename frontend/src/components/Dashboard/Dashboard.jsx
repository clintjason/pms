import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stats from './Stats';
import CompletedSessions from './CompletedSessions';

export default function DefaultDashboard () {
  return (
    <Grid container spacing={3}>
      {/* Recent Deposits */}
      <Grid container sx={{ mt: 4, mb: 4, px: 3}}>
        <Stats />
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <CompletedSessions />
        </Paper>
      </Grid>
    </Grid>
  )
}