import React,{useEffect} from 'react'
import { FaExclamation } from 'react-icons/fa'
import {useHistory} from 'react-router-dom';

const Error = () => {
      const history = useHistory();
      useEffect(()=>{
            var interval = setTimeout(()=>{
                  history.push('/');
            },1000);
            return () => clearTimeout(interval);
      },[])
      
      return (
            <div style={{height:'90vh',display:'grid',alignItems:'center'}}>
                  <h2>Error <FaExclamation fontSize="30"/></h2>
                  {}
            </div>
      )
}

export default Error
