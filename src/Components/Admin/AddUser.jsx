import React,{useState} from 'react'
import fire,{firestore, storage} from '../../firebase/config';
import {ImSpinner10} from 'react-icons/im'

const AddUser = ({setAdd}) => {
      const types = ['image/png','image/jpeg'];
      const [file,setFile] =  useState(null);
      const [addClick,setAddClick] = useState(true);
      const [err,setErr] = useState('');
      const [valid,setValid]= useState('');
      const [repass,setRepass]= useState('');
      const [user,setUser] = useState({email:'',password:'',displayName: '',photoURL: ''});

      const handleClick=(e)=>{
            const validFname = new RegExp('^(([a-zA-Z]{2,15}){1}(\\s([a-zA-Z]{2,15}))+)$');
            const validEmial = new RegExp('^(([^<>()\\[\\]\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')

            setErr('');
            e.preventDefault();
            if(!validFname.test(user.displayName)){
                  setErr('Fullname invalid !!');
                  return;
            }
            else if(!validEmial.test(user.email)){
                  setErr('Email invalid !!');
                  return;
            }
            else if(user.password!==repass){
                  setErr('Passwords don\'t match !!');
                  return;
            }
            else if(file == null){
                  setErr('Choose an image up there !!');
                  return;
            }
            else{
            setAddClick(false);
            try{
                  fire.auth().createUserWithEmailAndPassword(user.email,user.password)
                        .then((userCredential) => {
                              var storageRef = storage.ref('Users/'+(Math.random()*10)+file.name);
                              let up = storageRef.put(file);
                              up.on('state_changed',() => {},() => {}, 
                              () => {
                                    up.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                          setUser({...user,photoURL:downloadURL});
                                          var userr = userCredential.user;
                                          firestore.collection("Users").add({
                                                name: user.displayName,
                                                email:user.email,
                                                photoUrl:downloadURL,
                                                emailVerified : userr.emailVerified,
                                                uid:userr.uid
                                          }).catch((error) => {
                                                setErr(error.message); setAddClick(true);
                                          });
                                          userr.sendEmailVerification().then(setValid('Check your inbox for verification')).catch((err)=>{ setErr(err.message);});
                                                let ent = setInterval(()=>{
                                                      handleReset();
                                                      setAdd(false);
                                                      setValid('');
                                                      clearInterval(ent);
                                                },3000);
                                                setAddClick(true);
                                          }).catch((err)=>{ setErr(err.message); setAddClick(true);});});
                              }).catch((error) => {setErr(error.message); setAddClick(true);});
                        }catch(err){setErr(err.message); setAddClick(true);}
            }
            
            
      }
      const handleReset =()=>{
            setErr('');
            setUser({email:'',password:'',displayName:'',photoURL:''});
      }
      const handleFile = (e) =>{
            let selected = e.target.files[0];
            setFile(selected);
      }

      return (
            <form className='admin-team' onSubmit={handleClick}>
                  <h4>Add user</h4>
                  <div className='team-inputs'>
                        <input autoFocus type='text'value={user.displayName} onChange={(e)=>setUser({...user,displayName:e.target.value})} placeholder='Fullname'/>
                        <input type='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='Email'/>
                        <input type='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='Password'/>
                        <input type='password' value={repass} onChange={(e)=>setRepass(e.target.value)} placeholder='Re-password'/>
                  </div>
                  <input type='file' accept="image/png, image/jpeg" onChange={handleFile} style={{paddingTop:'.5rem'}}/>
                  <div className='admin-frm-btn'>
                              {valid && (<><span style={{display:'inline-block',color:'green',fontSize:14,margin:5}}>{valid}</span><br/></>)}
                              {err && (<><span style={{display:'inline-block',color:'red',fontSize:14,margin:5}}>{err}</span><br/></>)}
                              {addClick?(<><input type="submit" value="Add"/>
                              <input type="reset" value="Reset" onClick={handleReset}  />
                              <input type="button" value="Cancel" onClick={()=>setAdd(false)}/></>):(
                                    <><ImSpinner10 className='rotate'/></>
                              )}
                        </div>
            </form>
      )
}

export default AddUser
