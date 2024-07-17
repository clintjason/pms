import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress,
  Snackbar, Alert, Box, Grid, Typography, IconButton, Tooltip, Collapse, Button
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { apiGetAllUsers } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const UserTable = ({onRowClick}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleRowClick = (user) => {
    //e.preventDefault();
    //onRowClick(user);
    setExpandedRows((prevState) => ({
      ...prevState,
      [user.id]: !prevState[user.id]
    }));
  };

  const handleEdit = (user) => {
    navigate('/profile', { state: user });
  }

  const handleViewMedicalHistory = (user) => {
    console.log('The user-hey: ', user)
    navigate('/vital-sign-simulator', { state: user });
  }

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append('search', search);
      }
      const response = await apiGetAllUsers(params.toString());
      setUsers(response);
      console.log("User list: ", response);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error('fetchUsers Error:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h6" color="primary">All Users</Typography>
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
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <React.Fragment key={user?.id}>
                  <TableRow onClick={() => handleRowClick(user)} sx={{ cursor: 'pointer' }}>
                    <TableCell>{user?.id}</TableCell>
                    <TableCell>{user?.username}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{format(new Date(user?.createdAt), 'PPpp')}</TableCell>
                    <TableCell>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px'
                      }}>
                      <Button variant="contained" color="primary" type='submit' onClick={()=> handleEdit(user)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="primary" type='submit'>
                        Delete
                      </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedRows[user?.id]} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          {user?.role === 'doctor' && (
                            <Box>
                              <Typography variant="h6" gutterBottom component="div" color="primary">
                                Doctor Information
                              </Typography>
                              <Typography variant="body1"><strong>Full Name:</strong> {user.Doctor?.fullname}</Typography>
                              <Typography variant="body1"><strong>Specialization:</strong> {user.Doctor?.specialization}</Typography>
                              <Typography variant="body1"><strong>Phone Number:</strong> {user.Doctor?.phone_number}</Typography>
                              <Typography variant="body1"><strong>Address:</strong> {user.Doctor?.address}</Typography>
                            </Box>
                          )}
                          {user?.role === 'patient' && (
                            <Box>
                              <Typography variant="h6" gutterBottom color="primary" component="div">
                                Patient Information
                              </Typography>
                              <Typography variant="body1"><strong>Full Name:</strong> {user.Patient?.fullname}</Typography>
                              <Typography variant="body1"><strong>Age:</strong> {user.Patient?.age}</Typography>
                              <Typography variant="body1"><strong>Gender:</strong> {user.Patient?.gender}</Typography>
                              <Typography variant="body1"><strong>Phone Number:</strong> {user.Patient?.phone_number}</Typography>
                              <Typography variant="body1"><strong>Address:</strong> {user.Patient?.address}</Typography>
                              <Button variant="contained" color="primary" sx={{ mt:1 }} onClick={()=>handleViewMedicalHistory(user)}>
                                View Medical History
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Users fetched successfully!
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

export default UserTable;