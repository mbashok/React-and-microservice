import  React,{ useState, useEffect} from 'react'
import {  useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { login,reset } from "../redux/auth/ConsumerReducer";
import { Box,Card,Typography,CardContent,TextField,Button } from '@mui/material';
import { useAlert } from 'react-alert'
import PersonIcon from '@mui/icons-material/Person';
import {makeStyles } from "@mui/styles"
import imge from "../image/th.jpg"
const useStyles = makeStyles((theme) => ({
    inputStyle: {
        backgroundImage: `url(${imge})`,height:"100vh",  
        backgroundSize: 'cover',
        backgroundRepeat:"no-repeat"
    }
}));

const Login = () => {
    const alert = useAlert()
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const {  isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
      const [formValue, setFormValue] = useState({
        email: "",
        password: ""
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
          dispatch(login({ formValue }));  
      }; 
      useEffect(() => {
        if (isError) {
            alert.show("Invalid email or password")
        }
    
        if (isSuccess ) {
          navigate("/dash")
          // window.location.reload();
          // console.log("reload")
        }
    
        dispatch(reset())
      }, [ isError, isSuccess, message, navigate, dispatch])
    const onChange = (e) => {
      setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
    return (
      
        <Box className={classes.inputStyle}>
        <Box sx={{display:"flex",justifyContent:"center",height:"100%"}}>
        <Card sx={{height: "370px",
marginTop: "auto",
marginBottom: "auto",
width: "500px", backgroundColor:"rgba(0,0,0,0.5) !important;"}}>
        <CardContent>
        <Typography sx={{ fontSize: 24,textAlign:"center", paddingTop:"10px" }}  gutterBottom>
          Login In
        </Typography>
        </CardContent>
        <form onSubmit={handleSubmit}>
        <Box  sx={{  paddingTop:"20px", display: "flex",flexDirection:"row", flexWrap:"wrap" , gap:"20px",color:"black !important",  "& .MuiInputBase-root": {
          color: "black !important"
        }  }}>
      
                <Box sx={{paddingTop:"5px",width:"500px !important",paddingLeft:"100px" }}>
                    <Box sx={{ display:"inline-block",width:"45px",backgroundColor:"#FFC312",height:"36px",paddingRight:"10px",paddingLeft:"5px",paddingTop:"7px"}}>
               <PersonIcon sx={{fontSize: 24 }}/>
                </Box>
                <TextField  placeholder="Email" required name="email"  onChange={onChange} variant="outlined" size="small"  sx={{ minWidth:"260px " ,backgroundColor:"white" }}/>
                </Box>
                <Box sx={{paddingTop:"5px",width:"500px !important",paddingLeft:"100px" }}>
                    <Box sx={{ display:"inline-block", width:"45px",backgroundColor:"#FFC312",height:"37px",paddingRight:"10px",paddingLeft:"10px",paddingTop:"10px"}}>
                    <i class="fa-solid fa-key"></i>
                </Box>
                <TextField  placeholder="password" required type="password" name="password"  onChange={onChange} variant="outlined" size="small"  sx={{ minWidth:"260px " ,backgroundColor:"white"}} />
                </Box>
                </Box> 
                <Box sx={{ height:"100px", 
     textAlign:"center !important"
}} >
      {/* <button
      onClick={() => {
        alert.show('Oh look, an alert!')
      }}
    ></button> */}
 <Button  type="submit"  sx={{backgroundColor:"#FFC312",color:"black", fontWeight:"bold", marginTop:"65px","&:hover": { backgroundColor: "#FFC312" }   }}>Login</Button>
    </Box>
        </form>
            </Card>
        </Box>
      </Box>
    //   </Paper>
    );
};

export default Login;