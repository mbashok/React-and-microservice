import React,{useState,useEffect} from 'react';
import { Box, Container, Button, Typography,TextField} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import {makeStyles } from "@mui/styles"
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { GetDeviceById, UpdateDevice} from "../redux/auth/DeviceReducer";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          display: "none"
      }
  }
}));
const EditDevice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const classes = useStyles();
  
  const { devicesid } = useSelector((state) => ({ ...state.device }));
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    uid:devicesid.uid,
    modelno:devicesid.modelno,
    manufacturingdate:devicesid.manufacturingdate,
    softwareversion:devicesid.softwareversion,
    batterycycle:devicesid.batterycycle,
    batterystatus:devicesid.batterystatus,
    batteryhealth:devicesid.batteryhealth,
    odo_reading:devicesid.odo_reading
  }); 
  console.log("uid",values.uid)
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(GetDeviceById(id));
    }
  }, [id]);
  useEffect(() => {
    setValues(devicesid)
  },[devicesid])
  const handleSubmit = (e) => {
    e.preventDefault();
        dispatch(UpdateDevice({ id, values, navigate }));
        alert("Device Updated Successfully")
      // handleClear();
    }
  
      const onChange = (e) => {
        setValues((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    return (
      <Box sx={{marginTop:"40px",width:"100%", textAlign:"center !important",position:"fixed",display:"flex",justifyContent:"space-around"}}>
          <Container fixed>
        <Box sx={{paddingTop:"10px",paddingBottom:"8px",fontWeight:"bolder",height:"50px !important",backgroundColor: colors.primary[400], borderBottom:`1px solid ${colors.grey[100]}`}}>
            <Typography sx={{fontSize:[24, "!important"]}}>Update Device</Typography>
            </Box>
            <form onSubmit={handleSubmit} autoComplete="off">
            <Box  sx={{ backgroundColor: colors.primary[400], paddingTop:"40px", display: "flex",flexDirection:"row", flexWrap:"wrap" , gap:"20px"  }}>
                <Box sx={{paddingTop:"5px",width:"500px !important" }}>
                <Typography sx={{fontSize:[16, "!important"] , display:"inline-block", paddingTop:"6px",width:"150px",textAlign: "right",marginRight: "20px" }}>UID</Typography>
                <TextField id="outlined-basic" required onChange={onChange} name="uid" value={values.uid} variant="outlined" size="small"  sx={{ minWidth:"280px "}} />
                </Box>
                <Box sx={{ paddingTop:"5px",paddingLeft:"10px",width:"500px !important" }}>
                <Typography sx={{fontSize:[16, "!important"],      display:"inline-block", paddingTop:"6px",width:"150px",textAlign: "right",marginRight: "20px"}}>Modal Number</Typography>
                <TextField id="outlined-basic" required  onChange={onChange} name="modelno" value={values.modelno} variant="outlined"size="small" sx={{ minWidth:"280px", marginRight: "10px" }} />
                </Box>
                <Box sx={{paddingTop:"5px",width:"500px !important"}}>
                <Typography sx={{fontSize:[16, "!important"], display:"inline-block", paddingTop:"6px", maxwidth:"50px", textAlign: "right",marginRight: "20px"}}>Manufacturing Date</Typography>
                <TextField id="outlined-basic"  type="date" onChange={onChange} name="manufacturingdate" value={values.manufacturingdate} required variant="outlined"size="small" sx={{ maxWidth:"160px", marginRight: "120px"}} />
                </Box>
                <Box sx={{paddingTop:"5px",width:"500px !important"}}>
                <Typography sx={{fontSize:[16, "!important"], display:"inline-block", paddingTop:"6px", maxwidth:"50px", textAlign: "right",marginRight: "20px"}}>Software Version</Typography>
                <TextField id="outlined-basic" required onChange={onChange} name="softwareversion" value={values.softwareversion} variant="outlined"size="small" sx={{ maxWidth:"100px", marginRight: "140px"}} />
                </Box>
                <Box sx={{paddingTop:"5px",width:"500px !important"}}>
                <Typography sx={{fontSize:[16, "!important"], display:"inline-block", paddingTop:"6px", maxwidth:"50px", textAlign: "right",marginRight: "20px"}}>Battery Status</Typography>
                <TextField id="outlined-basic" type="number" onChange={onChange} name="batterystatus" value={values.batterystatus} InputProps={{ classes: { input: classes.inputStyle } ,inputProps: { min: "0", max: "100" },
              endAdornment:<InputAdornment position="end">%</InputAdornment>, }}   required variant="outlined"size="small" sx={{ maxWidth:"70px", marginRight: "150px"}} />
                </Box>
                <Box sx={{paddingTop:"5px",width:"500px !important"}}>
                <Typography sx={{fontSize:[16, "!important"], display:"inline-block", paddingTop:"6px", maxwidth:"50px", textAlign: "right",marginRight: "20px"}}>Battery Health</Typography>
                <TextField id="outlined-basic"  type="number" onChange={onChange} name="batteryhealth" value={values.batteryhealth} required variant="outlined"size="small" sx={{ maxWidth:"70px", marginRight: "155px"}} />
                </Box>
                <Box sx={{paddingTop:"5px",width:"500px !important"}}>
                <Typography sx={{fontSize:[16, "!important"], display:"inline-block", paddingTop:"6px", maxwidth:"50px", textAlign: "right",marginRight: "20px"}}>Battery Cycle</Typography>
                <TextField id="outlined-basic" required onChange={onChange} name="batterycycle" value={values.batterycycle} variant="outlined"size="small" sx={{ maxWidth:"100px", marginRight: "110px"}} />
                </Box>
                <Box sx={{paddingTop:"5px",width:"500px !important"}}>
                <Typography sx={{fontSize:[16, "!important"], display:"inline-block", paddingTop:"6px", maxwidth:"50px", textAlign: "right",marginRight: "20px"}}>Odo Reading</Typography>
                <TextField id="outlined-basic" required onChange={onChange} name="odo_reading" value={values.odo_reading} variant="outlined"size="small" sx={{ maxWidth:"100px", marginRight: "120px" }} />
                </Box>
                <Box  m="30px" sx={{ paddingLeft:"480px", paddingBottom:"10px", paddingTop:"20px"}}>
              <Button type="submit"  variant="contained" sx={{backgroundColor:"#1f1f1f",  "&:hover": { backgroundColor: "#1f1f1f", }}}>
                Update Device
              </Button>
             
            </Box>
                </Box>
            </form>
              
                </Container>
        </Box>
    );
};

export default EditDevice;