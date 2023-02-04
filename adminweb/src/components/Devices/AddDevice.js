import React,{useState} from 'react';
import "./adddevice.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { CreateDevice} from "../redux/auth/DeviceReducer";

const AddDevice = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
    const [values, setValues] = useState({
      uid:"",
      modelno:"",
      manufacturingdate:"",
      softwareversion:"",
      batterycycle:"",
      batterystatus:"",
      battteryhealth:"",
      odo_reading:""
    });  
      const handleSubmit = (e) => {
        e.preventDefault();
          dispatch(CreateDevice({ values, navigate }),
          );
          alert(`Device Created Successfully`)
      };
      const onChange = (e) => {
        setValues((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    return (
        <div className='device'>
            <div className='deviceform'>
            <div className='ha'>Create Device</div>
            <form onSubmit={handleSubmit} className='container56' autoComplete="off">
                <div className='colum'>
              <div className="item">
              <label >UID<span>*</span></label>
              <input type="text"  name="uid" className='uid' 
        onChange={onChange} value={values.uid}
        required ></input>
          </div>
        <div className="item">
              <label >Modal No.<span>*</span></label>
              <input type="text" name="modelno" className='mn' 
        onChange={onChange} value={values.modelno} required></input>
        </div>
        <div className="item">
              <label >Manufacturing Date<span>*</span></label>
              <input type="date" name="manufacturingdate" className='md' value={values.manufacturingdate}
        onChange={onChange} required></input>
        </div>
        <div className="item">
              <label >Software Version<span>*</span></label>
              <input type="text" name="softwareversion" className='sv' value={values.softwareversion}
        onChange={onChange} required></input>
        </div>
        <div className="item">
              <label >Battery Status<span>*</span></label>
             <span class="valuePadding"> <input type="number"  max="100"  min="0" name="batterystatus" value={values.batterystatus} className='bs' 
        onChange={onChange} required></input>
        %</span>
        </div>
        <div className="item">
              <label >Battery Health<span>*</span></label>
              <input type="number"  max="100"  min="0" name="batteryhealth" value={values.batteryhealth} className='bh' 
        onChange={onChange} required></input>
        </div>
        <div className="item">
              <label >Battery Cycle<span>*</span></label>
              <input type="number"  max="100"  min="0" name="batterycycle" value={values.batterycycle} className='bc' 
        onChange={onChange} required></input>
        </div>
        <div className="item">
              <label >Odo Reading<span>*</span></label>
              <input type="number"  name="odo_reading"  className='od' value={values.odo_reading}
        onChange={onChange} required></input>
        </div>
     
  </div>
  <div className="btn">
              <button type="submit"  className="but5">Submit</button>
  </div>
            </form>
            </div>
            
        </div>
    );
};

export default AddDevice;