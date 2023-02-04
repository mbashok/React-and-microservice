import React,{ useState } from 'react';
import { NavLink,Link } from "react-router-dom";
import imge from "../image/stack.png"
import "./sidebar.css"
const Sidebar = ({children}) => {
    const [show, setShow] = useState(false);

    return (
              <div className={show ? 'space-toggle' : null}>
               <header className={`header ${show ? 'space-toggle' : null}`}>
           <div className='header-toggle' onClick={() => setShow(!show)}>
           <i className='fas fa-bars' ></i>
           </div>
        </header>
        <aside className= {`sidebar ${show ? 'show' : null}`} >
          <nav className='nav'>
            <div className='nav1'>
              <Link to='/' >
           <img src={imge} alt={imge} className="rotate"/>
              </Link>
              </div>
              <div className='nav-list'>
              <div className='nav-list-item' >
              <NavLink to='/add' className='nav-logo' activeclassname="active" >
              <i className="fa-solid fa-chart-simple"></i>
              <span className='nav-link-name'>Dashboard</span>
              </NavLink>
              </div>
              <div className='nav-list-item' >
              <NavLink to='/consumers' className='nav-logo' activeclassname="active">
              <i className="fa-solid fa-user-group"></i>
              <span className='nav-link-name'>Consumers</span>
              </NavLink>
              </div>
              <div className='nav-list-item' >
              <NavLink to='/devices' className='nav-logo' activeclassname="active">
              <i className="fa-solid fa-bag-shopping"></i>
              <span className='nav-link-name'>Devices</span>
              </NavLink>
              </div>
              <div className='nav-list-item' >
              <NavLink to='/add3' className='nav-logo' activeclassname="active">
              <i className="fa-solid fa-gear"></i>
              <span className='nav-link-name'>Settings</span>
              </NavLink>
              </div>
              <div className='nav-list-item' >
              <NavLink to='/add4' className='nav-logo' activeclassname="active">
              <i className="fa-solid fa-user"></i>
              <span className='nav-link-name'>Login</span>
              </NavLink>
              </div>
              <div className='nav-list-item' >
              <NavLink to='/add5' className='nav-logo' activeclassname="active">
              <i className="fa-solid fa-user-plus"></i>
              <span className='nav-link-name'>Register</span>
              </NavLink>
              </div>
             </div>
          </nav>
         </aside>

         <main>{children}</main>
         </div>
    );
};

export default Sidebar;