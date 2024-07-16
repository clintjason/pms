import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress,
  Snackbar, Alert, Box, Grid, Typography, IconButton, Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { apiGetAllPatients } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';

const PatientTable = ({onRowClick}) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRefresh = () => {
    fetchPatients();
  };

  const handleRowClick = (e, patient) => {
    e.preventDefault();
    onRowClick(patient);
  };

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append('search', search);
      }
      const response = await apiGetAllPatients(params.toString());
      setPatients(response);
      console.log("Patient list: ", response);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error('fetchPatients Error:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h6" color="primary">Patients</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            size="small"
          />
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
                <TableCell>Full Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients?.map((patient) => (
                <TableRow key={patient.patient_id} onClick={(e) => handleRowClick(e, patient)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{patient.patient_id}</TableCell>
                  <TableCell>{patient.fullname}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.phone_number}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Patients fetched successfully!
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

export default PatientTable;