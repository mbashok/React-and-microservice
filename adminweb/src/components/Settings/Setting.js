import React,{useState} from 'react';
import "./settings.css"

const Setting = () => {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordInput, setPasswordInput] = useState({
        oldpassword:"",
        newpassword:""
    });
    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
    }
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
    const togglePassword1 =()=>{
        if(passwordType1==="password")
        {
         setPasswordType1("text")
         return;
        }
        setPasswordType1("password")
      }
    return (
        <div>
            <div className='con'>
                <div className='h'>Settings</div>
                </div>
             
                <div className='search2'>
                    <div className='hh'>Password</div>
                    <div className='hg'>Change password</div>
                    <form className='form2'> 
                    <div className='input-field'>
                        <input type={passwordType} onChange={handlePasswordChange} value={passwordInput.oldpassword}className='old'></input>
                        <span>Old Password</span>
                        <button className='ebt' onClick={togglePassword} type="button"> { passwordType==="password"? <i className="fa-regular fa-eye"></i> :<i class="fa-solid fa-eye-slash"></i>}</button>
                    </div>
                    <div className='input-field'>
                        <input type={passwordType1} onChange={handlePasswordChange}value={passwordInput.newpassword} className='new'></input>
                        <span>New Password</span>
                        <button className='ebt' onClick={togglePassword1}   type="button" > { passwordType1==="password"? <i className="fa-regular fa-eye"></i> :<i class="fa-solid fa-eye-slash"></i>
}</button>
                    </div>
                    <div className='hb'>hi</div>
                    <div className='bt6'>
                    <button type="submit" className="but6">Change Password </button>    
                    </div>
                </form>
               </div>
        </div>
    );
};

export default Setting;