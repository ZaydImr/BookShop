import React, { useEffect, useState } from 'react'
import fire, { firestore } from '../../firebase/config';
import AddUser from './AddUser';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const Team = () => {
      const [add,setAdd] = useState(false);
      const [search,setSearch]=useState('');
      const [users,setUsers] = useState([]);
      const [secUsers,setSecUsers] = useState([]);
      const history = useHistory();

      useEffect(()=>{
                  const unsub = firestore.collection('Users').orderBy('name').onSnapshot((snap)=>{
                  let users = [];
                  snap.forEach(doc => {
                        users.push({...doc.data()});
                  });
                  setUsers([...users]);
                  setSecUsers([...users]);
                  return () => unsub();
            });
      },[])

      
      const Search = () =>{
            if(search !=='') {
                  const newData = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
                  setSecUsers(newData);
            }
            else{
                  setSecUsers(users);
            }
      }

      const handleDelete=()=>{
            swal({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover your account!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                  }).then((willDelete) => {
                  if (willDelete) {
                        firestore.collection('Users').where('uid','==',fire.auth().currentUser.uid).get().then((querySnap)=>{querySnap.forEach((doc)=>{doc.ref.delete()})});
                        fire.auth().currentUser.delete().then(()=>{
                              swal("Poof! Your book has been deleted!", {
                                    icon: "success",
                              });
                        });
                        history.push('/login');
                  } else {
                        swal("Your account is safe!");
                  }
                  });
      }
      
      return (
            <div className='admin-book'>
                  {add&& <AddUser setAdd={setAdd} />}
                  <div className='' style={{display:'flex',flexDirection:'column',justifyContent :'center',padding:'.5rem',background:'#fff',borderRadius:'.5rem',maxWidth:'1000px',margin:'auto'}}>
                        <div  className="chart-container" style={{background:'#fff',padding:'0rem 0 .5rem 0'}}>
                              <input type="text" style={{width:'100%'}} placeholder='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}} onKeyUp={()=>{Search()}}/>
                              {add || ( <input type='button' value='Add user' onClick={()=>{setAdd(true)}} />)}
                              <input type='button' value='Delete account' onClick={()=>{handleDelete()}}/>
                        </div>
                        <table className='admin-book-table'>
                              <thead>
                                    <tr>
                                          <th>Avatar</th>
                                          <th>Fullname</th>
                                          <th>Email</th>
                                          <th>Verified account</th>
                                          <th>Reset password</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {secUsers.map((user)=>{
                                          const {photoUrl,name,email,emailVerified} = user;
                                          return<tr key={email}>
                                                <td style={{display:'flex',padding:'.25rem 0',justifyContent:'center',height:50}}><img src={photoUrl} alt={name} style={{maxWidth:50,maxHeight:50}}/></td>
                                                <td>{name}</td>
                                                <td>{email}</td>
                                                <td>{emailVerified.toString()}</td>
                                                <td>
                                                      <input type="button" value="reset" onClick={()=>{fire.auth().sendPasswordResetEmail(email).then(()=>{swal("The mail have been sent succesefuly!", {icon: "success"});});}}/>
                                                </td>
                                          </tr>
                                    })}
                              </tbody>
                              
                        </table>
                  </div>
                  
            </div>
      )
}

export default Team
