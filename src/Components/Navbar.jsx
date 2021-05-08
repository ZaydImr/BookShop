import React, { useState } from 'react'
import { FaBars,FaSignInAlt} from 'react-icons/fa'
import { social } from '../data'
import logo from '../logo3.svg'
import logo2 from '../logo2.svg'
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [top,setTop] = React.useState(true);
  const [showLinks,setShowLinks] = useState(false);

  React.useEffect(()=>{
    const event = window.addEventListener('scroll',()=>{
          if(window.scrollY<=1)
                setTop(true)
          else
                setTop(false);
    })
    return ()=> window.removeEventListener('scroll',event);
},[])

  return (
    <nav className={(top && window.location.href==='http://localhost:3000/')  ? 'nav bluue' : 'nav'} >
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to="/" style={{height: '40px'}}>
          {(top && window.location.href==='http://localhost:3000/')  ? (<img src={logo2} alt='logo' className='logo'/>   ) : (<img src={logo} alt='logo' className='logo'/>   )}
          </Link>
          <div>
          <button className={(top && window.location.href==='http://localhost:3000/')  ? 'nav-toggle white' : 'nav-toggle '} onClick={()=>{setShowLinks(!showLinks)}}><FaBars /></button>
          <Link  to='/login'><button className={(top && window.location.href==='http://localhost:3000/') ? 'nav-toggle iconLogin white' : 'nav-toggle iconLogin '}  onClick={()=>{setShowLinks(!showLinks)}}><FaSignInAlt/></button></Link>
          </div>
        </div>
        <div className={`links-container ${showLinks && ' show-container'}`}>
          <ul className='links'>
            <li>
              <Link to='/' onClick={()=>{setShowLinks(!showLinks)}}>Home</Link>
            </li>
            <li>
              <Link to='books' onClick={()=>{setShowLinks(!showLinks)}}>Books</Link>
            </li>
            <li>
              <a href='/#About' onClick={()=>{setShowLinks(!showLinks)}}>About</a>
            </li>
            <li>
              <a href='/#Contact' onClick={()=>{setShowLinks(!showLinks)}}>Contact</a>
            </li>
          </ul>
        </div>
        <ul className='social-icons'>
          {social.map((ico)=>{
            return<li key={ico.id}>{ico.id !==4 ? (<a target="_blank" rel="noreferrer" href={ico.url}>{ico.icon}</a>) : (<Link to={ico.url} className="iconLogin">{ico.icon}</Link>) }</li>
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar