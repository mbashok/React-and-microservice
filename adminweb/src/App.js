import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Device from './components/Devices/Device';
import AddDevice from './components/Devices/AddDevice';
import EditDevice from './components/Devices/EditDevice';
import Consumers from './components/Consumers/Consumers';
import Setting from './components/Settings/Setting';

function App() {
  return (
   
        <>
      <Router>
      <Sidebar >
        <Routes>
        <Route exact path="/add" element ={<Home />} /> 
        <Route exact path="/consumers" element ={<Consumers />} /> 
        <Route exact path="/devices" element ={<Device />} /> 
        <Route exact path="/add-device" element ={<AddDevice />} /> 
        <Route exact path="/edit-device/:id" element ={<EditDevice />} /> 
        <Route exact path="/add3" element ={<Setting />} /> 
        <Route exact path="/add4" element ={<Register />} /> 
        <Route exact path="/add5" element ={<Login />} /> 
        </Routes> 
        </Sidebar>
      </Router>
      </>
     
  );
}

export default App;
