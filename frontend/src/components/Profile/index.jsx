import { useEffect, useState } from 'react';
import { Container, Grid, Snackbar, Alert, Box, CircularProgress, Paper } from '@mui/material';
import PatientProfile from './PatientProfile';
import DoctorProfile from './DoctorProfile';
import UserProfile from './UserProfile';
import AvatarComponent from './AvatarComponent';
import { useSelector, useDispatch } from 'react-redux';
import { apiGetUser } from '../../services/api.service';
import { setUser as setUserReducer } from '../../reducers/userSlice';
import UpdateProfile from '../UpdateProfile';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state) => state.user?.user);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  console.log('Location: ', location);
  const userDataId = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (userDataId) {
        params.append('userId', userDataId);
      }
      const user = userDataId ? await apiGetUser(params.toString()) : await apiGetUser();
      console.log("User", user)
      //setUser(user);
      dispatch(setUserReducer(user));
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("fetchUser Error: ", error);
      setLoading(false);
      setError(error.message);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
 
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" mb={3} px={3}>
        <Grid item xs={12} sm={12} md={7}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {user && <AvatarComponent user={user} />}
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mb={3} px={3}>
        <Grid item xs={12} sm={12} md={7}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {user && <UserProfile user={user} />}
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mb={3} px={3}>
        {user && user?.role === 'patient' && (
          <Grid item xs={12} sm={12} md={7}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <PatientProfile patient={user.Patient} />
            </Paper>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="center" mb={3} px={3}>
        {user && user?.role === 'doctor' && (
          <Grid item xs={12} sm={8} md={7}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <DoctorProfile doctor={user.Doctor} />
            </Paper>
          </Grid>
        )}
      </Grid>
      {user && <UpdateProfile user={user} />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully!
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

export default Profile;