import React,{useState,useEffect}  from 'react';
import { Box,Button, Typography, Grid} from "@mui/material";
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { GetDevices, DeleteDevice} from "../redux/auth/DeviceReducer";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const Device = (props) => {
  const  userId  = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const  {devices,activedevices,inactivedevices} = useSelector(
    (state) => ({
      ...state.device,
    })
  )
  console.log("hey3",devices)
  const [value, setValue] = useState([]);
  console.log("hey2",value)
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(GetDevices());
},[])
useEffect(() => {

    if(userId.state == "device"){
      setValue(devices)
    }
  else if(userId.state== "active"){
    setValue(activedevices)
  }
  else if(userId.state== "inactive"){
    setValue(inactivedevices)
  }
},[])
console.log("window",window.name)
 const  deletedevice = (id) => {
  if (window.confirm("Are you sure you want to delete the respective device ?")) {
  dispatch(DeleteDevice({id}))
  alert(`Device is deleted Successfully`)
  dispatch(GetDevices());
  }
      }

  const columns = [
    { field: "uid", headerName: "UID", flex: 0.4, headerAlign: "center",
    align: "center", cellClassName: "name-column--cell", },
    { field: "modelno", headerName: "Model No", flex: 0.4, headerAlign: "center",
    align: "center", },
    {
      field: "manufacturingdate",
      headerName: "Manufacturing Date",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "softwareversion",
      headerName: "Software Version",
      flex:0.6,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "batterystatus",
      headerName: "Battery Status",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "batteryhealth",
      headerName: "Battery Health",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "batterycycle",
      headerName: "Battery Cycle",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
        field: "odo_reading",
        headerName: "Odo Reading",
        flex: 0.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "Actions",
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues)=>{
          return(
            <>
            <Link  to={`/editdevice/${cellValues.row._id}`} className="linkb"><Button  className='buttonW'>Edit</Button> </Link>
            <Button className="buttonW" onClick={()=>{
              deletedevice(cellValues.row._id)
            }}>
              Delete
            </Button>
            <Link  to={`/devicechart/${cellValues.row._id}`} className="linkb"><Button  className='buttonW'>Chart</Button> </Link>
            </> )
        },
        flex:1,
      }
  ];
  return (
    <Box m="20px">
           <Box sx={{paddingTop:"20px",
        paddingLeft:"10px" ,
        "& .linkb": { 
          textDecoration: "none !important"
        }}}>
          <Grid container spacing={1}>
           <Grid xs={11} sx={{paddingLeft:"10px"}}>
        <Typography sx={{fontSize:[28, "!important"], color:colors.grey[100]}}    fontWeight="bold" >Devices{props.name}</Typography>
        </Grid>
        <Grid xs={1} sx={{alignItems:"center !important"}}>
        <Link  to={`/adddevice`} className="linkb"><Button sx={{backgroundColor:colors.blueAccent[700],color:"white",marginTop:"10px",
      "&:hover": { backgroundColor: colors.blueAccent[700] }, textDecoration: "none !important"  }}>Add Device</Button></Link> 
        </Grid>
        </Grid>
    </Box>
      <Box
        m="20px 0 0 0"
        height="450px"
        sx={{
          "& .MuiDataGrid-virtualScrollerContent": {
            height: "360px !important",
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .buttonW": {
            backgroundColor: colors.greenAccent[300],
            "&:hover": { backgroundColor: colors.greenAccent[300] }  ,
            minWidth: "60px !important",
            marginRight: "10px !important",
          },
          "& .linkb": { 
            textDecoration: "none !important"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[300],
            borderBottom: "none",
            color: `${colors.grey[1000]} !important`,
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[300],
          },
          "& .MuiDataGrid-sortIcon": {
            color: `${colors.grey[1000]} !important`,
          },
          "& .MuiInputBase-root .MuiSvgIcon-root": {
            color: `${colors.grey[1000]} !important`,
          },
          "& .MuiToolbar-root": {
            color: `${colors.grey[1000]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiSvgIcon-root": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-menuIcon .MuiSvgIcon-root": {
            color: `${colors.grey[1000]} !important`, 
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            transition : "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiTablePagination-actions .MuiSvgIcon-root": {
            color: `${colors.grey[1000]} !important`,
          },
        }}
      >
        <DataGrid
        style={{ flexGrow: 1 }}
        getRowId={row => row._id}
        rows={value}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        components={{ Toolbar: GridToolbar }}
/>
      </Box>
    </Box>
  );
};

export default Device;