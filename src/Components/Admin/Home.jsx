import React,{useEffect,useState} from 'react'
import {firestore,storage} from '../../firebase/config'
import {FaPlus,FaTimes} from 'react-icons/fa'

const Home = () => {
      const [up,setUp] = useState(false);
      const [edit,setEdit] = useState(false);
      const [info,setInfo] = useState({
            ContactUsEmail:'',
            ContactUsPhoneNumber:'',
            OurStoryDescription:''
      });
      const [imgs,setImgs] = useState([]);

      const handleDeletePic =(imgUrl)=>{
            firestore.collection('imgs').where('imgUrl','==',imgUrl).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            doc.ref.delete();
            });});
            
            let pictureRef = storage.refFromURL(imgUrl);
            pictureRef.delete();

            getPics();
      }

      const getPics =()=>{
            const unsub = firestore.collection('imgs').onSnapshot((snap)=>{
                  let img = [];
                  snap.forEach(doc => {
                        img.push(doc.data().imgUrl);
                  });   
                  setImgs(img);
                  return () => unsub();})
      }

      const handleFile = (e) =>{
            setUp(true);
            let selected = e.target.files[0];
            var storageRef = storage.ref((Math.random()*10)+selected.name);
            let up = storageRef.put(selected);
            up.on('state_changed',() => {},() => {}, 
            () => {
                  up.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        firestore.collection('imgs').add({imgUrl:downloadURL});
                        getPics();
                        setUp(false);
            });
      });
      }

      const handleEdit=()=>{
            firestore.collection('Home').doc('llsTlUInAfU5De7MEUrJ').set({
                  ContactUsEmail:info.ContactUsEmail,
                  ContactUsPhoneNumber:info.ContactUsPhoneNumber,
                  OurStoryDescription:info.OurStoryDescription
            }).then(()=>{setEdit(false)})
      }


      useEffect(() =>{
            try{
                  const unsub = firestore.collection('Home').onSnapshot((snap)=>{
                  let info = {
                        ContactUsEmail:'',
                        ContactUsPhoneNumber:'',
                        OurStoryDescription:'',
                  };
                  snap.forEach(doc => {
                        info.ContactUsEmail = doc.data().ContactUsEmail;
                        info.ContactUsPhoneNumber = doc.data().ContactUsPhoneNumber;
                        info.OurStoryDescription = doc.data().OurStoryDescription;
                  });
                  setInfo(info)
                  return () => unsub();
                  })}catch(err){}
      },[edit]);
      
      useEffect(() =>{
            getPics();
      },[]);

      return (
            <div>
                  <div className="home-interface">
                        {edit||<div className="edit"></div>}
                        <div className='contact-input'> 
                              <div>
                                    <h4>Email :</h4>
                                    <input type="text"value={info.ContactUsEmail} onChange={(e)=>{setInfo({...info,ContactUsEmail:e.target.value})}} />
                              </div>
                              <div>
                                    <h4>Phone number :</h4>
                                    <input type="text"value={info.ContactUsPhoneNumber} onChange={(e)=>{setInfo({...info,ContactUsPhoneNumber:e.target.value})}} />
                              </div>
                        </div> 
                        <h4>Our story Description</h4>
                        <div><textarea value={info.OurStoryDescription} onChange={(e)=>{setInfo({...info,OurStoryDescription:e.target.value})}}></textarea></div>
                        {edit?(<div className="btn-val">
                              <input type="button" value="Validate" onClick={handleEdit}/>
                              <input type="button" value="Cancel" onClick={()=>setEdit(false)}/>
                        </div>):(<input type="button" value="edit" onClick={()=>setEdit(true)}/>)}
                        
                        <div className='contact-imgs' style={{marginTop:'2rem'}}>
                              <h4>Our office images :</h4>
                              <div className='contact-pics'>
                                    {imgs.map((item,i)=>{
                                          return (<div key={i} >
                                                            <FaTimes onClick={()=>handleDeletePic(item)}/>
                                                            <img src={item} alt='img' />
                                                </div>)
                                    })}
                                    <div style={{height:150,minWidth:100,display:'flex',alignItems:'center'}}>
                                          <label>
                                                <FaPlus className={up? 'rotate':''} style={{background:'white',padding:'.75rem',width:'1em',height:'1em',display:'block',color:'black',fontSize:'3rem',borderRadius:'50%',cursor:'pointer'}}/>
                                                <input id="file-input" type="file" accept="image/png, image/jpeg" onChange={handleFile}/>
                                          </label>
                                    </div>
                              </div>
                        </div>
                        
                        
                        
                        
                  </div>
            </div>
      )
}

export default Home
