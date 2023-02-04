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
import {  useSelector,useDispatch } from "react-redux";
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

const DeviceDatetimeChart = ( ) => {
  const chartRef = useRef();
  const chart = chartRef.current;
  console.log("ref",chart)
  const alert = useAlert()
  const theme = useTheme();
  const { id }= useParams();
  const colors = tokens(theme.palette.mode);
  const [dateValue, setDateValue] = useState({
    filterDate: null
  });
  console.log("datevalue",dateValue.filterDate)
  const [dayValue, setDayValue] = useState({
    filterDate: null
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
    const [data, setData1] = useState({
      labels: [],
      datasets: [
        {
          data:[],
        },
      ],
      datay:[]
  });
  console.log("data1234",data.datay)
  console.log("labels12",data.labels)
    const HandleDate = async(e) =>{
      // e.preventDefault();
      setDateValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
       
        }  
        const HandleDay = async(e) =>{
          // e.preventDefault();
          setDayValue((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }  
       
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
              label: (context)=> {
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
            min: 0 ,
            max: 100,
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
            },
            min: (ctx) =>{
              var dat1 = Date.parse(dateValue.filterDate)
              const db1 =  dat1 - 19800000
              return db1
            },
            max: (ctx) =>{
              var dat1 = Date.parse(dateValue.filterDate)
              const db2 =  dat1 + 66540000
              return db2
            },
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
      const authAxios = Axios.create({
        baseURL:"http://localhost:4001",
      // headers: {
      //   Authorization: `Bearer ${ JSON.parse(localStorage.getItem("token")).token}`
      // }
    })

    useEffect(()=> {
      console.log("chart123",chart)
            const datSet1 = [];
            console.log("datS",datSet1) 
            const fetchData= async()=> {
              const response = await authAxios.post(`/data/device/${id}`, {
                filterDate: dateValue.filterDate,
              });
            console.log("data",response)
            console.log("datSet",datSet1)
            response.data.map((val,index) =>{
                            var dat = Date.parse(val.datetime)
                            console.log("dat",dat)
                            datSet1.push(dat); 
                     })
            setData({
                labels:datSet1,
                datasets: [
                  {
                    data: response.data.map(x => x.batterystatus),
                    borderColor: 'rgb(54,162,235,1)',
                    backgroundColor: 'rgb(54,162,235,1)',
                    paddingBottom: "40px"
                  },
                ],
                datay:datSet1,
              })
            }
        fetchData();
    },[dateValue])
    const HandleSubmit = () =>{
      chart.config._config.data.labels = data.labels
      console.log("labels",data.labels)
      chart.config._config.data.datasets[0].data = data.datay
      const data123 = [50,90,80,80,90]
      console.log("dataset",data123)
      console.log("datasets",data.datay)
      chart.config._config.options.scales.x.time.unit = 'day'
      const dab1 = Date.parse(dayValue.filterDate)
        const dc1 =  dab1 - 19800000
      chart.config._config.options.scales.x.min = dc1
      var date = new Date(dayValue.filterDate);
      const dab2 = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      const dc2 = Date.parse(dab2)
      chart.config._config.options.scales.x.max = dc2
      // const dab2 = Date.parse(dayValue.filterDate)
      // const dc2 =  dab2 + 19800000

      chart.update();
      console.log("ref",chart)
    }
    useEffect(()=> {
      console.log("chart123",chart)
            const datSet2 = [];
            const datSet3 = [];
          
            const fetchData= async()=> {
              const response = await authAxios.post(`/data/day/${id}`, {
                filterDate: dayValue.filterDate,
              });
              console.log("data",response)
              console.log("datS",datSet3) 
            console.log("datSet",datSet2)
            response.data.map((val,index) =>{
                            var dat = Date.parse(val.datetime)
                            var dat2 = val.batterystatus
                            console.log("dat",dat)
                            console.log("dat2",dat2)
                            datSet2.push(dat);
                     })
            setData1({
                labels:datSet2,
                datay: response.data.map(x => x.batterystatus),
              })
            }
            fetchData();

        console.log( "fetch",fetchData())
            // var dat1 = Date.parse(dayValue.filterDate)
            // const db1 =  dat1 - 19800000
            // console.log("dt1",dat1)
            // chart.config._config.options.scales.x.min = db1
            // // chart.config._config.options.scales.x.max = filterDate[indexenddate]
            // // chart.config._config.options.scales.x.time.unit = "day"
            // chart.update();  
    },[dayValue])
 

    return (
      <Box sx={{paddingTop:"30px",paddingLeft:"80px"}}>
        <Box sx={{ height:"500px !important",width:"100% !important"}}>
        <Box sx={{paddingLeft:"120px",paddingBottom:"10px"}} >
          {/* <form onSubmit={submit} > */}
          <label>Date</label>
          <input type="date" onChange={HandleDate} name="filterDate" style={{height:"30px",width:"150px",marginLeft:"10px"}} ></input>
          <label style={{height:"30px",width:"150px",marginLeft:"10px"}} >Data by MonthWise</label>
          <input type="month" onChange={HandleDay}  name="filterDate" style={{height:"30px",width:"150px",marginLeft:"10px"}}></input>
         
          <button onClick={HandleSubmit} style={{height:"30px",width:"150px",marginLeft:"10px"}} > Submit</button>
          {/* <button   onClick={Handleclick} style={{height:"30px",width:"150px",marginLeft:"10px"}} > Submit</button> */}
          {/* </form> */}
    </Box >
            <Line ref={chartRef}  data={data1}  options={options1} />
         </Box>
         </Box>

    );
};

export default DeviceDatetimeChart;