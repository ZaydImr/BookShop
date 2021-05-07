import {useState,useEffect} from 'react'
import {storage} from './config'

const useStorage = (file) => {
      const [error,setError] = useState(null);
      const [url,setUrl] = useState(null);

      useEffect(()=>{
            const storageRef = storage.ref((Math.random()*10)+file.name);
            storageRef.put(file).on('state_changed', (snap)=>{},(err)=>{
                  setError(err);
            },async () => {
                  const url =  await storageRef.getDownloadURL();
                  setUrl(url);
            })
      },[File]);

      return {url,error}
}

export default useStorage;