import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert, Box, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { format } from 'date-fns';

const VitalSignTable = ({vitalSigns, onRefresh, loading}) => {
  /* const [vitalSignsData, setVitalSignsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
 */
  /* useEffect(() => {
    fetchVitalSigns();
  }, []); */

  /* const handleClose = () => {
    setOpen(false);
  }; */

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  /* const fetchVitalSigns = async () => {
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
  }; */

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb:2 }}>
        <Grid item>
          <Typography variant="h6" color="primary">Vital Signs</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Heart Rate</TableCell>
              <TableCell>Respiration Rate</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vitalSigns?.map((vital) => (
              <TableRow key={vital.vital_sign_id}>
                <TableCell>{vital.vital_sign_id}</TableCell>
                <TableCell>{`${vital.temperature} (${vital.temperature_type})`}</TableCell>
                <TableCell>{`${vital.heart_rate}`}</TableCell>
                <TableCell>{`${vital.respiration_rate}`}</TableCell>
                <TableCell>{format(new Date(vital.createdAt), 'PPpp')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VitalSignTable;