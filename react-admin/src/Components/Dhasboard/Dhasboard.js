import React,{useState,useEffect}  from 'react';
import { useNavigate } from "react-router-dom"
import { Box, Button, Typography,IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetDeviceCount,GetDevices} from "../redux/auth/DeviceReducer";
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import StayCurrentLandscapeIcon from '@mui/icons-material/StayCurrentLandscape';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const Dhasboard = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  {count} = useSelector(
    (state) => ({
      ...state.device,
    })
  )
  const [value, setValue] = useState({
    device:count.device,
    activedevice:count.activedevice,
    inactivedevices:count.inactivedevices,
  });
  const name = "Jena"
useEffect(() => {
  dispatch(GetDeviceCount());
},[count])

useEffect(() => {
  setValue(count)
},[count])
const myFunction = (e,id) => {
    dispatch(GetDevices());
    navigate("/devices",{state: "device"})
  }
  const myFunction1 = (e,sam) => {
      navigate("/devices",{state: "active"})
    }
    const myFunction2 = (e,raj) => {
      navigate("/devices",{state: "inactive"})
    }
    return (
        <Box m="20px">
        {/* HEADER */}
        {/* <Device name={name} /> */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >Dashboard
      </Typography>
      <Typography variant="h5"  color={colors.greenAccent[400]}>
        Welcome to the Dashboard
      </Typography>
    </Box>

        </Box>
        <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
        >
              <Box width="100%" m="10px 0px ">
      <Box display="flex" justifyContent="center" >
  
          
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            onClick={myFunction}
          >
            Total Devices
          </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
          <Box sx={{paddingLeft:"140px", fontSize:"65px"}}>
          <StayCurrentLandscapeIcon sx={{ fontSize:"48px", color: colors.grey[100] }}/>
          </Box>
         
          <Typography
            variant="h2"
            fontWeight="bold"
            paddingTop="28px"
            paddingRight="145px"
            sx={{ color: colors.grey[100] }}
       
          >
          {value.device}
          </Typography>
          </Box>
      {/* </Box> */}
      </Box>
      </Box>
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
        >
              <Box width="100%" m="10px 0px ">
      <Box display="flex" justifyContent="center" >
  
          
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            onClick={myFunction1}
          >
            Active Devices
          </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
          <Box sx={{paddingLeft:"145px", fontSize:"60px"}}>
          <FormatIndentIncreaseIcon sx={{ fontSize:"40px", color: colors.grey[100] }}/>
          </Box>
         
          <Typography
            variant="h2"
            fontWeight="bold"
            paddingTop="25px"
            paddingRight="148px"
            sx={{ color: colors.grey[100] }}
          >
          {value.activedevice}
          </Typography>
          </Box>
      {/* </Box> */}
      </Box>
      </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
        >
              <Box width="100%" m="10px 0px ">
      <Box display="flex" justifyContent="center" >
  
          
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            onClick={myFunction2}
          >
            Inactive Devices
          </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
          <Box sx={{paddingLeft:"145px", fontSize:"60px"}}>
          <FormatIndentDecreaseIcon sx={{ fontSize:"40px", color: colors.grey[100] }}/>
          </Box>
         
          <Typography
            variant="h2"
            fontWeight="bold"
            paddingTop="25px"
            paddingRight="145px"
            sx={{ color: colors.grey[100] }}
          >
          {value.inactivedevices}
          </Typography>
          </Box>
      {/* </Box> */}
      </Box>
      </Box>
        </Box>
        </Box>
    );
};

export default Dhasboard ;
// export default ;