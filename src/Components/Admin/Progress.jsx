import React, { useEffect } from 'react'
import useStorage from '../../firebase/useStorage'

const Progress = ({file,setFile,setUrl,data,setData})=>{
      const {url} = useStorage(file);
      useEffect(()=>{
            if(url){
                  setUrl(url);
                  setFile(null);
                  setData({...data,imgUrl:url});
            }
      },[url,setFile])
      return(
            <></>
      )
}

export default Progress;