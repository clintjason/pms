import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { CssBaseline, Badge, Box, Container, IconButton, MenuItem, Menu, Toolbar, Divider, Avatar, List, ListItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems, secondaryListItems } from './listItems';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { apiLogout } from '../../services/api.service';
import store from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutReducer } from '../../reducers/authSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        {'PMS '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Dashboard() {
  const notifications = useSelector((state) => state.notifications.notifications);
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [audio] = useState(new Audio('../../level-up-191997.mp3'));

  // Access the auth slice from the Redux store
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      setSnackbarMessage(latestNotification.message);
      setOpenSnackbar(true);
      audio.play();
    }
  }, [notifications]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    // Navigate to profile or perform other tasks
    navigate('/profile')
    handleMenuClose();
  };

  const handleLogoutClick = async () => {
    // Perform logout tasks
    try {
      const result = await apiLogout({
        userId: store.getState().auth.user.id,
      })
      console.log("Logout", result);
      dispatch(logoutReducer());
      navigate('/signin')
    } catch (error) {
      console.error("handleLogoutClick Error: ", error.message)
    }
    handleMenuClose();
  };

  const handleNotificationClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClearNotifications = () => {
    dispatch(clearNotifications());
    handleDialogClose();
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleAvatarClick}>
            <Avatar alt={`${user?.username}'s Avatar`} src={user?.avatar}  sx={{ width: 32, height: 32 }} />
          </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: '15px', '& .MuiMenu-paper': { minWidth: '150px' } }}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Toolbar>
          <Snackbar
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            message={snackbarMessage}
            autoHideDuration={6000}
          />

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Notifications</DialogTitle>
            <DialogContent>
              <List>
                {notifications?.map((notification, index) => (
                  <ListItem key={index}>{notification.message}</ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClearNotifications} color="primary">Clear</Button>
              <Button onClick={handleDialogClose} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Let the dynamic content come in here */}
            <Outlet /> 
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </>
  );
}