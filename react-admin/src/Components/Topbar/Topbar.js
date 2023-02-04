import { Box, IconButton, useTheme,Select,MenuItem,ListItemIcon,ListItemText,SvgIcon,Link } from "@mui/material";
import { useContext } from "react";
import {  useDispatch } from "react-redux";
import { ColorModeContext, tokens } from "../../theme";
import { Logout } from "../redux/auth/ConsumerReducer";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { useProSidebar } from "react-pro-sidebar";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { collapseSidebar } = useProSidebar();
  const dispatch = useDispatch();
  const handleLogout = () => {
      dispatch(Logout());
    };
  if(window.location.pathname==='/'){
    return null;
  }
  return (
    <Box display="flex" justifyContent="space-between" borderBottom="1px solid grey" height="50px" >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
      > <IconButton onClick={() => collapseSidebar()}>
      <MenuIcon />
      </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
          <Select  
         displayEmpty
         renderValue={(value) => {
           return (
             <Box sx={{ display: "flex", gap: 1,  textDecoration:"none !important", border: "none !important" }}>
               <SvgIcon >
                 <PersonOutlinedIcon />
               </SvgIcon>
             </Box>
           );
         }}
        sx={{textDecoration:"none !important", border: "none !important", boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }}} >
       <Link href="/"  sx={{color:colors.primary[1000], textDecoration:"none !important"}}> <MenuItem onClick={handleLogout}  >Logout</MenuItem></Link>
      </Select>
      </Box>
    </Box>
  );
};

export default Topbar;