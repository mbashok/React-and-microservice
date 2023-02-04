import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";
import { NavLink, Link,useLocation } from "react-router-dom";
import {  tokens } from "../../theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from '@mui/icons-material/People';
import DeviceHubSharpIcon from '@mui/icons-material/DeviceHubSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import imge from "../image/stack.png"
import { keyframes } from '@mui/system';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Side= () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation()
if(location.pathname==='/'){
    return null;
  }
  return (
    <Box
      sx={{
        display: 'flex', height: '700px',
        "& .ps-sidebar-container": {
          background:  colors.primary[400],
          borderRight:  "none",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button": {
          marginRight: "10px !important",
          marginLeft: "10px !important",
          color: colors.primary[200],
          background:  colors.primary[400]
        },
        "& .ps-menu-button:hover": {
          backgroundColor: "#353935  !important",
          color: "#32de84 !important"
        },
        "& .active": {
          backgroundColor: "#6870fa !important",
        },
      }}
    >
      <Sidebar >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON  {colors.primary[400]}*/ }
            
              <Box   sx={{
       height: "80px",
       borderBottom:  "1px solid grey" ,
        }} >
              <Box
        component="img"
        sx={{
          height: "50px",
          width: "50px",
          marginTop: "10px",
          animation: `${spin} 1.5s infinite linear`,
        }}
        alt={imge}
        src={imge}
      />
              </Box>
          <Box  sx={{
       paddingTop: "30px" ,
        }}>
            <MenuItem
              active={true}
              icon={<DashboardIcon />}
              routerLink={<NavLink   to="/dash"  class="active" />}
            >Dashboard
        </MenuItem>
          </Box>
            <Box  >
            <MenuItem
              active={true}
              icon={<PeopleIcon />}
              routerLink={<NavLink  to="/consumers" class="active" />}
            > Consumers </MenuItem>

          </Box>
          <Box  >
            <MenuItem
              active={true}
              icon={<DeviceHubSharpIcon />}
              routerLink={<NavLink  to="/devices" state="device" class="active" />}
            > Devices </MenuItem>

          </Box>
          <Box  >
            <MenuItem
              active={true}
              icon={<SettingsIcon />}
              routerLink={<NavLink  to="/settings" class="active" />}
            > Settings </MenuItem>

          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Side;