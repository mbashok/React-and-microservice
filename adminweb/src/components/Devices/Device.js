import React,{useState,useEffect}  from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetDevices, DeleteDevice} from "../redux/auth/DeviceReducer";
import DataTable,{ createTheme } from "react-data-table-component"
import "./device.css"
const Device = () => {
  const [search, setsearch] = useState('');
  const  {devices} = useSelector(
    (state) => ({
      ...state.device,
    })
  )
  console.log("hey1",devices)
  const [value, setValue] = useState();
  console.log("hey2",value)
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(GetDevices());
},[])
useEffect(() => {
  setValue(devices)
},[devices])
useEffect(() => {
  const result = devices.filter(o=>Object.keys(o).some(k=>
    String(o[k]).toLowerCase().includes(search.toLowerCase())))
  setValue(result)
},[search])

 const  deletedevice = (id) => {
  if (window.confirm("Are you sure you want to delete this device ?")) {
  dispatch(DeleteDevice({id}))
  alert(`Device is deleted Successfully`)
  dispatch(GetDevices());
  }
      }
      const columns=[
        {
            name:"UID",
            selector:(row) => row.uid,
            sortable: true, 
            minWidth: "150px",  
        },
        {
            name:"Model No",
            selector:(row) => row.modelno,
            minWidth: "150px"     
        },
        {
            name:"Manufacturing Date",
            selector:(row) => row.manufacturingdate,
            minWidth: "170px"    
        },
        {
            name:"Software Version",
            selector:(row) => row.softwareversion,
            minWidth: "150px"    
        },
        {
            name:"Battery Status",
            selector:(row) => row.batterystatus,
            minWidth: "100px",   
        },
        {
            name:"Battery Health",
            selector:(row) => row.batteryhealth,
            minWidth: "100px"    
        },
        {
            name:"Battery Cycle",
            selector:(row) => row.batterycycle,
            minWidth: "100px"    
        },
        {
            name:"Odo Reading",
            selector:(row) => row.odo_reading,
            minWidth: "150px"    
        },
        {
            name:"Action", 
            cell:(row)=>{
              return (<>
                <Link  to={`/edit-device/${row._id}`}><button onClick={row} className='but2'>Edit</button> </Link>
                <button  className='but3'   onClick={() => deletedevice(row._id)}>Delete</button>
            </>);
            }
        }
      ]  
      createTheme('solarized', {
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
        },
      });
      const customStyles = {
        table: {
          style: {
            // color: theme.text.primary,
            backgroundColor: "Black",
          },
        },
        rows: {
            style: (row) => ({
                minHeight: '72px',
                justifyContent: 'center', // override the row height
                backgroundColor:  row.index % 2 === 0 ?  "#000000": '#ffffff',
            }),
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells #FFA500
                paddingRight: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                // backgroundColor: '#292b2c',
                backgroundColor: 'lightblue',
                color:"#08386d"
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize: '14px',
            },
        },
    };

    return (
        <div>
             <div className='con'>
                <div className='h'>Devices</div>
                <div className='h2'>
                   <Link to="/add-device"><button className='bt1'>Add Devices</button> </Link> 
                </div>
                </div>
             
                <div className='search1'>
                    {/* <div className='hey'>hey</div> */}
                    <div className='searchbar'>
                <i className='fa fa-search'></i>
                <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" className="searchname" placeholder="Search Devices"/>
                </div>
                </div>
               <div className="Tab">
        <DataTable 
        columns={columns} 
        data={value} 
        pagination 
        fixedHeader 
        fixedHeaderScrollHeight='500px'
        highlightOnHover
        pointerOnHover
        autowidth
        bordered
        theme="solarized"
        customStyles={customStyles} 
        />
               </div>
                 </div>
       
     
    );
};
export default Device;