import React,{useState,useEffect} from 'react';
import "./adddevice.css"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { GetDeviceById, UpdateDevice} from "../redux/auth/DeviceReducer";

const EditDevice = () => {
  const dispatch = useDispatch();
  const { devicesid } = useSelector((state) => ({ ...state.device }));
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    uid:devicesid.uid,
    modelno:devicesid.modelno,
    manufacturingdate:devicesid.manufacturingdate,
    softwareversion:devicesid.softwareversion,
    batterycycle:devicesid.batterycycle,
    batterystatus:devicesid.batterystatus,
    batteryhealth:devicesid.battteryhealth,
    odo_reading:devicesid.odo_reading
  }); 
  useEffect(() => {
    if (id) {
      dispatch(GetDeviceById(id));
    }
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
        dispatch(UpdateDevice({ id, values, navigate }));
        alert("Device Updated Successfully")
      // handleClear();
    }
  
      const onChange = (e) => {
        setValues((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    return (
        <div className='device'>
            <div className='deviceform'>
            <div className='ha'></div>
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

export default EditDevice;