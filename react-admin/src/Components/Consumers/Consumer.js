import React,{useState,useEffect}  from 'react';
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { GetConsumers, DeleteConsumer} from "../redux/auth/ConsumerReducer";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const Consumer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const  {consumers} = useSelector(
    (state) => ({
      ...state.auth,
    })
  )
  // console.log("hey1",consumers)
  const [value, setValue] = useState([]);
  console.log("hey2",value)
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(GetConsumers());
},[])
useEffect(() => {
  setValue(consumers)
},[consumers])

 const  deleteconsumer = (id) => {
  if (window.confirm("Are you sure you want to delete the respective consumer ?")) {
  dispatch(DeleteConsumer({id}))
  alert(`Consumer is deleted Successfully`)
  dispatch(GetConsumers());
  }
      }

  const columns = [
    { field: "firstname", 
    headerName: "First Name", 
    flex: 0.4, 
    headerAlign: "center",
    align: "center", },
    { field: "lastname",
     headerName: "Last Name", 
    flex: 0.4, 
    headerAlign: "center",
    align: "center", },
    {
      field: "phone",
      headerName: "Phone Number",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex:0.6,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "state",
      headerName: "State",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Actions",
      renderCell: (cellValues)=>{
        return(
          <>
          <Link  to={`/editconsumer/${cellValues.row._id}`} className="linkb"><Button  className='buttonW'>Edit</Button> </Link>
          <Button className="buttonW" onClick={()=>{
            deleteconsumer(cellValues.row._id)
          }}>
            Delete
          </Button>
          </> )
      },
      cellClassName: "button-column-cell",
      flex:0.6,
    }
  ];
  return (
    <Box m="20px">
           <Box sx={{paddingTop:"20px",
        paddingLeft:"10px"}}>
        <Typography sx={{fontSize:[28, "!important"], color:colors.grey[100]}}    fontWeight="bold">Consumers</Typography>
    </Box>
      <Box
        m="20px 0 0 0"
        height="450px"
        sx={{
          "& .MuiDataGrid-virtualScrollerContent": {
            height: "360px !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            // width: "900px !important",
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            highlightOnHover:"none !important",
            pointerOnHover:"none !important",
          },
          "& .buttonW": {
            backgroundColor: colors.greenAccent[300],
            minWidth: "60px !important",
            marginRight: "10px !important",
          },
          "& .linkb": { 
            textDecoration: "none"
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
            // color: `${colors.grey[1000]} !important`
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
 scrollbarSize={1}
/>
      </Box>
    </Box>
  );
};

export default Consumer;