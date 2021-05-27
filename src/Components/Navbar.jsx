import React, { useState,useEffect } from 'react'
import { FaBars,FaSignInAlt} from 'react-icons/fa'
import { social } from '../data'
import logo from '../logo3.svg'
import logo2 from '../logo2.svg'
import {Link,useHistory} from 'react-router-dom'

const Navbar = () => {
  const history = useHistory();
  const [top,setTop] = React.useState(true);
  const [showLinks,setShowLinks] = useState(false);

  useEffect(()=>{
    let event ;
    window.removeEventListener('scroll',event);
    event = window.addEventListener('scroll',()=>{
            if(window.scrollY<=1){
                  setTop(true);
                }
            else
                  setTop(false);
      })
      window.removeEventListener('scroll',event);
},[])

  const handleClick = ()=>{
    if(window.location.pathname!=='/'){
      history.push('/');
    }
    setShowLinks(false);
  }

  return (
    <nav className={(top && window.location.pathname==='/')  ? 'nav bluue' : 'nav'} >
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to="/" id="aa" >
          {(top && window.location.pathname==='/')  ? (<img src={logo2} alt='logo' className='logo'/>   ) : (<img src={logo} alt='logo' className='logo'/>   )}
          </Link>
          <div style={{display:'flex'}}>
          <button className={(top && window.location.pathname==='/')  ? 'nav-toggle white' : 'nav-toggle '} onClick={()=>{setShowLinks(!showLinks)}}><FaBars /></button>
          <Link  to='/login'><button className={(top && window.location.pathname==='/') ? 'nav-toggle iconLogin white' : 'nav-toggle iconLogin '}  onClick={()=>{setShowLinks(!showLinks)}}><FaSignInAlt/></button></Link>
          </div>
        </div>
        <div className={`links-container ${showLinks && ' show-container'}`}>
          <ul className='links'>
            <li>
              {window.location.pathname ==='/' ? (<a href='/#' onClick={()=>{handleClick();document.getElementById('botNav').scrollIntoView();}}>Home</a>) :(<Link to='/' onClick={()=>{setShowLinks(false);}}>Home</Link>)}
              
            </li>
            <li>
              <Link to='/books' onClick={()=>{setShowLinks(false)}}>Books</Link>
            </li>
            <li>
              <a href='/#About' onClick={()=>{handleClick()}}>About</a>
            </li>
            <li>
              <a href='/#Contact' onClick={()=>{handleClick()}}>Contact</a>
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
