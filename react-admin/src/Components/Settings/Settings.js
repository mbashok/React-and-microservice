import React,{useState} from 'react';
import { Box,Button,InputAdornment,Typography,TextField,IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const Settings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);    
    return (
        <Box m="20px">
           <Box sx={{paddingTop:"20px",
        paddingLeft:"10px", paddingBottom:"15px"}}>
        <Typography sx={{fontSize:[28, "!important"], color:colors.grey[100]}}    fontWeight="bold">Settings</Typography>
    </Box>
   
<Box sx={{ backgroundColor: colors.primary[400], m:"10px !important"}} >
    <Box sx={{ height:"100px", paddingLeft:"20px",  borderBottom:`1px solid ${colors.grey[100]}` }} >
    <Typography sx={{fontSize:[24, "!important"], fontWeight:"Bold", paddingTop:"10px"}}>Password</Typography>
    <Typography sx={{fontSize:[16, "!important"]}}>Change Password</Typography>
    </Box>
    <Box sx={{ height:"235px", paddingLeft:"20px",paddingTop:"20px", borderBottom:`1px solid ${colors.grey[200]}` }} >
    <TextField id="filled-basic" label="Old Password" type={showPassword ? "text" : "password"} variant="filled"  
  InputProps={{ // <-- This is where the toggle button is added.
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}
sx={{ marginTop:"30px", width:"100%", paddingRight:"35px"}} />
    <TextField id="filled-basic" label="New Password" type={showPassword1 ? "text" : "password"} variant="filled"  
  InputProps={{ // <-- This is where the toggle button is added.
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword1}
        >
          {showPassword1 ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }} sx={{ marginTop:"30px",width:"100%", paddingRight:"35px"}} />
    </Box>
    <Box sx={{ height:"100px", 
     textAlign:"end !important"
}} >
 <Button sx={{backgroundColor:colors.primary[1000],color:colors.primary[900],marginRight:"35px", marginTop:"35px","&:hover": { backgroundColor: colors.primary[1000] }   }}>Change Password</Button>
    </Box>
</Box>
    </Box>
    );
};

export default Settings;