import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaUserAlt,FaLock,FaEnvelope} from 'react-icons/fa';
import {RiArrowGoBackFill} from 'react-icons/ri'
import fire, { firestore }  from '../firebase/config';
import Admin from './Admin'

const Login = () =>{
      const [user,setUser] = useState('');
      const [email,setEmail] = useState('');
      const [pass,setPass] = useState('');
      const [err,setErr] = useState('');
      const [val,setVal] = useState('');
      const [forgetEmail,setForgetEmail] = useState('');
      const [forget,setForget] = useState(false);

      const handleLogin = (e) =>{
            e.preventDefault();
            setErr('');
                  fire.auth().setPersistence('session')
                  .then(() => {
                        fire
                        .auth()
                        .signInWithEmailAndPassword(email,pass)
                        .then((userCredential) => {
                              var user = userCredential.user;
                              if(!user.emailVerified){
                                    user.sendEmailVerification();
                                    setErr('You have to verifie your email first , check your inbox !');
                                    fire.auth().signOut();
                              }
                              else{
                                    setEmail('');
                                    setPass('');
                                    firestore.collection("Users").where("uid","==",user.uid).get().then((snap)=>{
                                          snap.forEach(doc => {
                                                doc.ref.update({
                                                      status : 'online'
                                                })
                                          });
                                    })
                              }
                        }).catch((err)=>{setErr(err.message)})
                  })
                  .catch((err)=>{setErr(err.message)});
      }

      const handleForget = (e)=>{
            e.preventDefault();
            setErr('');
            setVal('');
            fire
                  .auth()
                  .sendPasswordResetEmail(forgetEmail).then(()=>{
                  setVal('Check your inbox for further instructions')
            }).catch((err)=>{
                  setErr(err.message);
            })
      }

      useEffect(() =>{
            fire.auth().onAuthStateChanged((user)=>{
                  if(user){
                        setUser(user);
                        firestore.collection('Users').where('uid','==',user.uid).where('emailVerified','==',false).get().then((querySnapshot) => {
                              querySnapshot.docs.map((doc)=>{
                                    doc.ref.update({emailVerified:true});
                              });
                        })
                  }
                  else{
                        setUser('');
                  }
            });
      },[]);

      return(
            <>
            {user ? ( <Admin />) : (
            <div className="align">
                  <div className="grid">
                        <form className="form">
                        {forget ? (<React.Fragment>
                              <div className="form_field">
                                    <h3 style={{margin: '1rem auto'}}>Password Reset</h3>
                              </div>
                              <div className='form_field'>
                                    {val !== '' && <span style={{width: '100%',color: 'rgb(3 135 3)',padding: '1rem',borderRadius: '0.25rem',fontSize: '1rem',background: 'rgb(204 254 203)',fontWeight:'600'}}>{val}</span>}
                              </div>
                              <div className="form_field">
                                    <label htmlFor="forget"><FaEnvelope className="icon"></FaEnvelope></label>
                                    <input id='forget' value={forgetEmail} onChange={(e)=>{setForgetEmail(e.target.value)}} type="email" className="login_field login_input" placeholder="Email" required/>
                              </div>

                              <div className='form_field'>
                                    <span style={{color:'#ff3d3d'}}>{err}</span>
                              </div>
                              
                              <div className="form_field">
                                    <input onClick={handleForget} className="login_btn login_field" type="submit" value="Send mail" style={{fontFamily: 'Whitney bold',fontStyle: 'italic'}}/>
                              </div>
                              <div className='form_field'>
                                    <h4 style={{cursor:"pointer",margin:'auto'}} onClick={()=>{setForget(false);setVal('');setErr('')}}>Login</h4>
                              </div>
                        </React.Fragment>) : (<>
                        <div className="form_field">
                              <label htmlFor="user"><FaUserAlt className="icon"></FaUserAlt></label>
                              <input id="user" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="login_field login_input" placeholder="Email" required/>
                              </div>

                              <div className="form_field">
                              <label htmlFor="pass"><FaLock className="icon"></FaLock></label>
                              <input id='pass' value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" className="login_field login_input" placeholder="Password" required/>
                              </div>

                              <div className='form_field'>
                                    <span style={{color:'#ff3d3d'}}>{err}</span>
                              </div>
                              
                              <div className="form_field">
                              <input onClick={handleLogin} className="login_btn login_field" type="submit" value="Sign In" style={{fontFamily: 'Whitney bold',fontStyle: 'italic'}}/>
                              </div>
                              <div className="form_field" style={{    display: "block",textAlign: "center"}}>
                                    <p className="text--center" style={{float: "left",cursor:"pointer"}} onClick={()=>{setForget(true);setErr('')}}>Forget password ?</p>
                                    <Link to="/" style={{float: 'right',color:'#3d7eff'}}>Go back <RiArrowGoBackFill className="icon"></RiArrowGoBackFill></Link>

                              </div></>)}
                        </form>
                  </div>
            </div>)}
      </>
)
}

export default Login;