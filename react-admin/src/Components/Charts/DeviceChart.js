import React,{ useRef,useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    TimeScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
  } from 'chart.js';
import moment from 'moment'
import { useParams } from "react-router-dom"
import { Box} from "@mui/material";
import 'chartjs-adapter-date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import  Axios  from 'axios';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useAlert } from 'react-alert'
import { DateSort } from "../redux/auth/DeviceReducer";
ChartJS.register(
  ChartDataLabels,
    CategoryScale,
    TimeScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
  );

const DeviceChart = ( ) => {
  const chartRef = useRef();
  const chart = chartRef.current;
  console.log("ref",chart)
  const alert = useAlert()
  const theme = useTheme();
  const { id } = useParams();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const colors = tokens(theme.palette.mode);
  const [dateValue, setDateValue] = useState({
    filterDate: ""
  });
    const [data1, setData] = useState({
        labels: [],
        datasets: [
          {
            data:[],
          },
        ],
        datay:[]
    });
    // const set = inputRef1.current.value;
    // console.log("hiii",set)
      const  options1  =  {
        responsive:true,
        layout: {
            padding: {
            left: 50,
            right: 30,
            top: 30,
            bottom: 2
         }
      },
        plugins: {
          legend: {
            display: false,
          },
           tooltip: {
            
            callbacks: {
              label: function(context) {
              console.log("tool",context.dataset.data[context.dataIndex])
              return context.dataset.data[context.dataIndex];
            }
         }
           },
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: colors.grey[100],
            clamp: true,
            formatter: (value,context)=>{
              console.log("index",context.dataset.data[context.dataIndex])
              return context.dataset.data[context.dataIndex];
            }
          },
          title: {
              display: false,
          }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Battery Status in Percentage',
              color:colors.grey[100]
            },
            grid:{
              color:colors.grey[700],
            },
            ticks:{
              backdropColor:"rgba(255, 255, 255, 0.75)",
              color:colors.grey[100],
              beginAtZero: true,
              callback: (value,index) =>{
                return value + '%';
              }, 
            },
          },
          x: {
            display: true,
            type:"time",
        
            time:{
              unit: 'hour',
              // min: 1642033800000,
            },
            // min: 1642033800000,
            // min: (ctx) =>{
            //   if (inputRef1.current.value == null){
            //     return 1642033800000
            //   }else{
            //     console.log(ctx)
            //     return ctx.chart.data.labels[0]
            //   }
            // },
            // max: Date.now(),
            title: {
              display: true,
              text: 'Time',
              color:colors.grey[100],
            },
            grid:{
              color:colors.grey[700],
            },
            ticks:{
              backdropColor:"white",
              color:colors.grey[100],
              },
            },
      
        }
      }
     
   
    // console.log( "options",options.scales.x.time.unit)
    const authAxios = Axios.create({
      baseURL:"http://localhost:4001",
    // headers: {
    //   Authorization: `Bearer ${ JSON.parse(localStorage.getItem("token")).token}`
    // }
  })


    useEffect(()=> {
      console.log("chart123",chart)
       const fetchData= async()=> {
            const datSet2 = [];
            console.log("datS",datSet2) 
            const {data} = await authAxios.get(`/data/devicedata/${id}`)
        //     authAxios.post("/data/datetime",{filterDate:"2022-07-15"}).then(res => {
        //       console.log("hey123",res)
        //  })
            // const  {data} = await authAxios.post("/data/datetime",{filterDate:"2022-07-15"})
            console.log("fulldata",data.data)
            console.log("datSet",datSet2)
            data.map((val,index) =>{
                            var dat = Date.parse(val.datetime)
                            console.log("dat",dat)
                            datSet2.push(dat);
                     })
            setData({
                labels:datSet2,
                datasets: [
                  {
                    random: data.map(x => x.batterystatus),
                    data: data.map(x => x.batterystatus),
                    borderColor: 'rgb(54,162,235,1)',
                    backgroundColor: 'rgb(54,162,235,1)',
                    paddingBottom: "40px"
                  },
                ],
                datay:datSet2,
              })
         }
        fetchData();
    },[])

    const filterData = (e) =>{
      const dates2 = [...data1.labels]
      const dataPoints2 = [...data1.datasets[0].data];
      console.log("values",dates2)
      console.log("values2",dataPoints2)
      let value1 = inputRef1.current.value;

      // const offset = new Date().getTimezoneOffset();
      // const myData = Date.parse(value1) - offset * 60 * 1000;
      // const dateAsISO = new Date(myData).toISOString();
      let date1 =  Date.parse(value1)
      let value2 = inputRef2.current.value;
      console.log("value3",value1)
      console.log("value4",value2)
      // const myData1 = Date.parse(value2) - offset * 60 * 1000;
      // const dateAsISO1 = new Date(myData1).toISOString();
      let date2 =  Date.parse(value2)
      console.log("value1",date1)
      console.log("value2",date2)
      if(dates2.includes(date1) && dates2.includes(date2)){
      const indexstartdate = dates2.indexOf(date1);
      console.log("index1",indexstartdate)
      const indexenddate = dates2.indexOf(date2);
      console.log("index2",indexenddate)
  
      const filterDate = dates2.slice(indexstartdate, indexenddate + 1);
      const filterDataPoints = dataPoints2.slice(
        indexstartdate,
        indexenddate + 1
      );
  
      console.log("filter",filterDate,filterDataPoints);
  
      chart.config._config.data.labels = filterDate
      chart.config._config.options.scales.x.min = filterDate[indexstartdate]
      chart.config._config.options.scales.x.max = filterDate[indexenddate]
      chart.config._config.data.datasets[0].data = filterDataPoints
      chart.update();  
      }else{
        alert.show("date and time not in records")
      }
      
    }
const handleDate = (e) =>{
  // setDateValue((prevState) => ({
  //   ...prevState,
  //   [e.target.name]: e.target.value,
  // }))
  // e.preventDefault();
  // dispatch(login({ dateValue })); 

  const date = e.target.value
//   useEffect(()=> {
//   const fetchData= async()=> {
//   const {response} = await authAxios.post("/data/datetime",{filterDate:date})
//   console.log("dd3",response)
//   console.log("dd4",e.target.value)
//   setData({
//     labels:response.map(x => Date.parse(x.datetime)),
//     datasets: [
//       {
//         data: response.map(x => x.batterystatus),
//         borderColor: 'rgb(54,162,235,1)',
//         backgroundColor: 'rgb(54,162,235,1)',
//         paddingBottom: "40px"
//       },
//     ],
//   })
// }
// fetchData()
// })
}
  
    const handleChart = (e) => {
      // console.log("values",e)
      if(e.target.value === 'hour'){
        chart.config._config.options.scales.x.time.unit = e.target.value
        chart.update(); 
      }
      if(e.target.value === 'day'){
        chart.config._config.options.scales.x.time.unit = e.target.value
        chart.update();
      }
      if(e.target.value === 'week'){
        chart.config._config.options.scales.x.time.unit = e.target.value
        chart.update();
      }
      if(e.target.value === 'month'){
        chart.config._config.options.scales.x.time.unit = e.target.value
        chart.update();
      }
      if(e.target.value === 'quarter'){
        chart.config._config.options.scales.x.time.unit = e.target.value
        chart.update();
      }
      if(e.target.value === 'year'){
        chart.config._config.options.scales.x.time.unit = e.target.value
        chart.update();
      }
    };

    return (
      <Box sx={{paddingTop:"30px",paddingLeft:"80px"}}>
        <Box sx={{ height:"500px !important",width:"100% !important"}}>
        <Box sx={{paddingLeft:"120px",paddingBottom:"10px"}} >
        <input label= "date" type="date" name="filterDate"  onChange={handleDate} style={{height:"30px",width:"150px",marginLeft:"10px"}} ></input>
          <label>Start Date</label>
         
          <input type="datetime-local"  ref={inputRef1} style={{height:"30px",width:"150px",marginLeft:"10px"}} ></input>
          <label style={{"margin-left":"50px"}}>End Date</label>
          <input  type="datetime-local"  ref={inputRef2} style={{height:"30px",width:"150px",marginLeft:"10px"}} ></input>
          <button onClick={filterData} style={{height:"30px",width:"80px",marginLeft:"10px"}} >Filter</button>
        <select id="garden" name="blabla" onChange={handleChart} style={{height:"30px",width:"60px",marginLeft:"200px"}}>
  <option value="hour" >Hour</option>
  <option value="day" >Day</option>
  <option value="week" >Week</option>
  <option value="month" >Month</option>
  <option value="quarter" >Quarter</option>
  <option value="year" >Year</option>
</select>
    </Box >
            <Line ref={chartRef}  data={data1}  options={options1} />
         </Box>
         </Box>

    );
};


export default DeviceChart;