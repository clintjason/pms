import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/vital-sign-simulator">
      <ListItemIcon>
        <SettingsInputAntennaIcon />
      </ListItemIcon>
      <ListItemText primary="Vital Sign Simulator" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/patients">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Patients" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/users">
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/alerts">
      <ListItemIcon>
        <EmergencyShareIcon />
      </ListItemIcon>
      <ListItemText primary="Alerts" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Additional Support
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ErrorOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Helpful Resources" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HelpOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Questions" />
    </ListItemButton>
  </React.Fragment>
);