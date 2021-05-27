import React, { useState } from 'react'
import back from '../assets/back.png'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
      const [search,setSearch] = useState("");
      return (
            <div>
                  <div className="header">
                  <div className="header-txt">
                        <h2>Support Local Bookstores</h2>
                        <Link to='/books'>
                        <form className='admin-frm-input'>
                              <input type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}  />
                              <button type='submit'>
                                    <FaSearch/>
                              </button>
                              
                        </form>
                        </Link>
                  </div>
                  <div className="header-img">
                        <img src={back} alt='back'/>
                  </div>
            </div>
            </div>
            
      )
}

export default Header
