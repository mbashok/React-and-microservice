import React,{useState,useContext,useEffect } from 'react';
import { setConsumer } from "./Components/redux/auth/ConsumerReducer";
import {  useDispatch, useSelector } from "react-redux";
import {  BrowserRouter as Router,Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Side from "./Components/Sidebar/Side";
import Login from './Components/Login/Login';
import Dashboard from "./Components/Dhasboard/Dhasboard";
import Consumer from './Components/Consumers/Consumer';
import Device from './Components/Devices/Device'
import AddDevice from './Components/Devices/AddDevice';
import EditDevice from './Components/Devices/EditDevice';
import Settings from './Components/Settings/Settings';
import DeviceChart from './Components/Charts/DeviceChart';
import DeviceDatetimeChart from './Components/Charts/DeviceDatetimeChart';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();
  const loginconsumer= JSON.parse(localStorage.getItem("token"));
  
  useEffect(() =>{
    dispatch(setConsumer(loginconsumer))
}) 


  return (
    
    <Router>

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Side  />
          <main className="content">
          <Topbar />
            <Routes >
            <Route  path="/" element={<Login />}/> 
                <Route  path="/dash" element={ <Dashboard />} />
                <Route  path="/consumers" element={<Consumer/>}/>
                <Route  path="/devices" element={<Device/>}/>
                <Route  path="/settings" element={<Settings/>}/>
                <Route path='/adddevice' element={<AddDevice />} />
                <Route  path='/editdevice/:id' element={<EditDevice />} />
                <Route  path='/devicechart/:id' element={<DeviceDatetimeChart />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </Router>
  );
}
export default App;
