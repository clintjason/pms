import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { Outlet, Link as RouterLink, NavLink } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useSelector } from 'react-redux';
import '../../index.css';

export const MainListItems = () => {
  const userRole = useSelector((state) => state.auth?.user?.role);

  return (
    <>
      <ListItemButton component={NavLink} to="/" exact="true" activeclassname="active-link">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/vital-sign-simulator" activeclassname="active-link">
        <ListItemIcon>
          <SettingsInputAntennaIcon />
        </ListItemIcon>
        <ListItemText primary="Vital Sign Simulator" />
      </ListItemButton>
      {(userRole === 'doctor' || userRole === 'admin') &&
      <ListItemButton component={NavLink} to="/patients" activeclassname="active-link">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItemButton>
      }
      {userRole === 'admin' &&
      <ListItemButton component={NavLink} to="/users" activeclassname="active-link">
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      }
      <ListItemButton component={NavLink} to="/alerts" activeclassname="active-link">
        <ListItemIcon>
          <EmergencyShareIcon />
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItemButton>
    </>
  )
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Additional Support
    </ListSubheader>
    <ListItemButton component={NavLink}  to="/helpful-resources" activeclassname="active-link">
      <ListItemIcon>
        <ErrorOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Helpful Resources" />
    </ListItemButton>
    <ListItemButton component={NavLink}  to="/questions" activeclassname="active-link">
      <ListItemIcon>
        <HelpOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Questions" />
    </ListItemButton>
  </React.Fragment>
);