import React from 'react'
import { FaExclamation } from 'react-icons/fa'

const Error = () => {
      const fun = () =>{
            var interval = setTimeout(()=>{
                  
            },3000);
            return () => clearTimeout(interval);
      }
      
      return (
            <div style={{height:'90vw',display:'grid',alignItems:'center'}}>
                  <h2>Error Page <FaExclamation fontSize="30"/></h2>
                  {}
            </div>
      )
}

export default Error
