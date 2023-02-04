import React,{useState,useEffect}  from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetConsumers, DeleteConsumer} from "../redux/auth/ConsumerReducer";
import DataTable,{ createTheme } from "react-data-table-component"
import "./consumer.css"
const Consumers = () => {
  const [search, setsearch] = useState('');
  const  {consumers} = useSelector(
    (state) => ({
      ...state.auth,
    })
  )
  console.log("hey1",consumers)
  const [value, setValue] = useState();
  console.log("hey2",value)
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(GetConsumers());
},[])
useEffect(() => {
  setValue(consumers)
},[consumers])
useEffect(() => {
  const result = consumers.filter(o=>Object.keys(o).some(k=>
    String(o[k]).toLowerCase().includes(search.toLowerCase())))
  setValue(result)
},[search])

 const  deleteconsumer = (id) => {
  if (window.confirm("Are you sure you want to delete the respective consumer ?")) {
  dispatch(DeleteConsumer({id}))
  alert(`Consumer is deleted Successfully`)
  dispatch(GetConsumers());
  }
      }
      const columns=[
        {
            name:"First Name",
            selector:(row) => row.firstname,
            sortable: true, 
            minWidth: "150px",  
        },
        {
            name:"Last Name",
            selector:(row) => row.lastname,
            minWidth: "150px"     
        },
        {
            name:"Password",
            selector:(row) => row.password,
            minWidth: "150px"    
        },
        {
            name:"Phone No.",
            selector:(row) => row.phone,
            minWidth: "150px"    
        },
        {
            name:"Email",
            selector:(row) => row.email,
            minWidth: "200px",   
        },
        {
            name:"City",
            selector:(row) => row.city,
            minWidth: "150px"    
        },
        {
            name:"State",
            selector:(row) => row.state,
            minWidth: "150px"    
        },
        {
            name:"Zipcode",
            selector:(row) => row.zipcode,
            minWidth: "150px"    
        },
        {
            name:"Action", 
            cell:(row)=>{
              return (<>
            
                <Link  to={`/add3/${row._id}`}><button onClick={row} className='but2'>Edit</button> </Link>
                <button  className='but3'   onClick={() => deleteconsumer(row._id)}>Delete</button>
            </>);
            }
        }
      ]  
      // createTheme('solarized', {
      //   action: {
      //     button: 'rgba(0,0,0,.54)',
      //     hover: 'rgba(0,0,0,.08)',
      //   },
      // });
 

      const customStyles = {
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
                backgroundColor: '#292b2c',
                color:"white"
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
    // const conditionalRowStyles = [
    //   {
    //     when: row =>  console.log("hii",row.index),
       
    //     style: {
    //       backgroundColor: 'green',
    //       color: 'white',
    //       '&:hover': {
    //         cursor: 'pointer',
    //       },
    //     },
    //   },
    // ];
    return (
        <div>
             <div className='con'>
                <div className='h'>Consumers</div>
                <div className='h2'> <Link to="/add2">
                    <button  className='but1'>Add Consumer</button>
                    </Link> 
                </div>
                </div>
                <div className='search1'>
                    <div className='searchbar'>
                <i className='fa fa-search'></i>
                <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" className="searchname" placeholder="Search Consumers"/>
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
        // conditionalRowStyles={conditionalRowStyles}
        />
               </div>
                 </div> 
       
     
    );
};
export default Consumers;