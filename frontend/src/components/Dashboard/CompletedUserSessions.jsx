import React, { useEffect, useState } from 'react';
import {
  CircularProgress, Snackbar, Alert, Box, Grid, Typography, IconButton, Tooltip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { apiGetUserCompletedSessions } from '../../services/api.service';

const CompletedUserSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserCompletedSessions();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    fetchUserCompletedSessions();
  };

  const fetchUserCompletedSessions = async () => {
    setLoading(true);
    try {
      const data = await apiGetUserCompletedSessions();
      setSessions(data);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error('fetchUserCompletedSessions Error:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h6" color="primary">Completed Sessions</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} sx={{ ml: 2 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User Role</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.id}</TableCell>
                  <TableCell>{session.Session.User.username}</TableCell>
                  <TableCell>{session.Session.User.email}</TableCell>
                  <TableCell>{session.Session.User.role}</TableCell>
                  <TableCell>{new Date(session.start_time).toLocaleString()}</TableCell>
                  <TableCell>{new Date(session.end_time).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Completed sessions fetched successfully!
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default CompletedUserSessions;