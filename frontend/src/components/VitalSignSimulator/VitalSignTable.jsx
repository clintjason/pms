import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const VitalSignTable = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);

  /* useEffect(() => {
    fetchVitalSigns();
  }, []); */

  const fetchVitalSigns = () => {
    setLoading(true);
    axios.get('/api/vital-signs') // Replace with your API endpoint
      .then(response => {
        setVitalSigns(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vital signs:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Temperature (Type)</TableCell>
            <TableCell>Heart Rate (Type)</TableCell>
            <TableCell>Respiration Rate (Type)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vitalSigns?.map((vital) => (
            <TableRow key={vital.id}>
              <TableCell>{vital.id}</TableCell>
              <TableCell>{`${vital.temperature} (${vital.temperature_type})`}</TableCell>
              <TableCell>{`${vital.heart_rate} (${vital.heart_rate_type})`}</TableCell>
              <TableCell>{`${vital.respiration_rate} (${vital.respiration_rate_type})`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VitalSignTable;