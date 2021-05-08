import React from 'react'
import back from '../assets/back.png'
import {FaSearch} from 'react-icons/fa'

const Header = () => {
      return (
            <div>
                  <div className="header">
                  <div className="header-txt">
                        <h2>Suupport Local Bookstores</h2>
                        <form className='admin-frm-input'>
                              <input type="text" placeholder='Search'  />
                              <button type='submit'>
                                    <FaSearch/>
                              </button>
                        </form>
                  </div>
                  <div className="header-img">
                        <img src={back}/>
                  </div>
                  
            </div>
            </div>
            
      )
}

export default Header
