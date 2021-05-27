import React from 'react'
import fire from '../firebase/config'
import Lightlogo from '../Shape_1.svg'
import {FaHome,FaUserFriends,FaBook,FaTachometerAlt,FaSignOutAlt} from 'react-icons/fa'
import Dashboard from './Admin/Dashboard'
import Team from './Admin/Team'
import Home from './Admin/Home'
import Books from './Admin/Books'
import {Link} from 'react-router-dom'

const Admin = () => {
      const [active,setActive] = React.useState('dashboard');

      const handleLogout = () =>{
            fire.auth().signOut();
      }

      const main = () =>{
            switch(active){
                  case 'Books':return(<Books/>);
                  case 'interface':return(<Home/>);
                  case 'Team':return(<Team/>);
                  default :return(<Dashboard/>);
            }
      }
      return(
            <div className='admin-container'>
                  <div className="app-container">
                        <div className='app-left'>
                              <div className="app-logo">
                                    <Link to='/'>
                                    <img src={Lightlogo} style={{cursor:'pointer'}} alt="logo" width="80"/>
                                    </Link>
                              </div>
                              <ul className="nav-list">
                                    <li className={active==='dashboard' ? 'nav-list-item active' : 'nav-list-item'}>
                                          <p className='nav-list-link' onClick={()=>setActive('dashboard')}>
                                                <FaTachometerAlt/>
                                                <a>Dashboard</a>
                                          </p>
                                    </li>
                                    <li className={active==='Books' ? 'nav-list-item active' : 'nav-list-item'}>
                                          <p  className='nav-list-link' onClick={()=>setActive('Books')}>
                                                <FaBook/>
                                                <a>Books</a>
                                          </p>
                                    </li>
                                    <li className={active==='interface' ? 'nav-list-item active' : 'nav-list-item'}>
                                          <p className='nav-list-link' onClick={()=>setActive('interface')}>
                                                <FaHome/>
                                                <a>Home interface</a>
                                          </p>
                                    </li>
                                    <li className={active==='Team' ? 'nav-list-item active' : 'nav-list-item'}>
                                          <p className='nav-list-link' onClick={()=>setActive('Team')}>
                                                <FaUserFriends/>
                                                <a>Team</a>
                                          </p>
                                    </li>
                                    <li className='nav-list-item'>
                                          <p className='nav-list-link' style={{color:'#fff',margin:0}} onClick={handleLogout}>
                                                <FaSignOutAlt style={{marginLeft:'2px',marginRight:'10px'}}/>
                                                <a>Logout</a>
                                          </p>
                                    </li>
                              </ul>
                        </div>
                        <div className='app-main'>
                              <div className="main-header-line">
                                    <h1>{active}</h1>
                              </div >
                              <div className='main-content'>
                                    {main()}
                              </div>
                                    
                        </div>
                        
                  </div>
            </div>)
}

export default Admin;